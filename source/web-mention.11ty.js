import * as fs from "node:fs";
import { promisify } from "node:util";

import li from "li";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { mf2 } from "microformats-parser";
import YAML from "yaml";

export const data = { permalink: false };

/**
 * Returns the set of links defined directly inside {@link post}, but *not* in
 * nested h-entries.
 */
function linksFromPostBody(post, url) {
  const container = JSDOM.fragment(`<div>${post.content}</div>`, {
    url,
  }).firstElementChild;
  return [...container.querySelectorAll("a[href]:not(.h-entry a[href])")].map(
    (a) => a.href,
  );
}

/** Returns the links to h-entries embedded in {@link post}. */
function embedLinks(post, baseUrl) {
  const { items } = mf2(post.content, { baseUrl: baseUrl });
  return items
    .filter((item) => item.type.length === 1 && item.type[0] === "h-entry")
    .flatMap((item) => [
      ...(item.properties.url ?? []),
      ...(item.properties["repost-of"] ?? []),
    ]);
}

/** If {@link url} supports WebMentions, returns the associated endpoint. */
async function getWebMentionEndpoint(url) {
  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    console.error(`Error fetching ${url}:`);
    console.error(error);
    return undefined;
  }
  if (!response.ok) return undefined;

  return (
    li.parse(response.headers.get("link") ?? "")["webmention"] ??
    new JSDOM(await response.text(), { url }).window.document.querySelector(
      "link[rel=webmention]",
    )?.href
  );
}

/**
 * Checks whether any blog posts have new WebMentions that need to be sent out.
 */
async function checkWebMentions(data) {
  if (!process.env["CHECK_WEB_MENTIONS"]) return;

  console.log("Checking webmentions...");
  const last = data["web-mention"]["last-check"];
  const now = new Date();
  const pairs = [];
  for (const post of data.collections.blog) {
    if (last < (post.data.updated ?? post.data.date)) {
      const url = new URL(post.url, data.site.url).toString();
      const links = new Set(
        [
          ...(post.data.repost ? [] : linksFromPostBody(post, url)),
          ...embedLinks(post, url),
        ]
          .map((url) => new URL(url, data.site.url).toString())
          .filter(
            (url) =>
              !url.startsWith("about:blank") &&
              !url.startsWith(post.data.site.url),
          ),
      );

      for (const link of links) {
        pairs.push([post.data.repost ? data.site.url : url, link]);
      }
    }
  }
  if (pairs.length === 0) return;

  for (const [source, target] of pairs) {
    const endpoint = await getWebMentionEndpoint(target);
    if (!endpoint) continue;

    console.log(
      `Sending web mention from ${source} to ${endpoint} for ${target}`,
    );
    const response = await fetch(endpoint, {
      method: "POST",
      body: new URLSearchParams([
        ["source", source],
        ["target", target],
      ]),
    });
    console.log(`${response.status} ${response.statusText}`);
  }

  const yaml = YAML.parse(
    fs.readFileSync("source/data/web-mention.yml", "utf8"),
  );
  yaml["last-check"] = now;
  fs.writeFileSync("source/data/web-mention.yml", YAML.stringify(yaml), "utf8");
}

export default async function (data) {
  await checkWebMentions(data);
  return "";
}
