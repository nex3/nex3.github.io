import * as fs from "node:fs";
import { URL } from "node:url";

import { glob } from "glob";
import { JSDOM } from "jsdom";
import fetch from "node-fetch";

function indexAfterFrontMatter(string) {
  const boundary = /^---/gm;
  if (!boundary.exec(string)) return 0;

  while (true) {
    const match = boundary.exec(string);
    if (!match) return 0;
    const index = match.index + match[0].length;
    if (string.charAt(index) !== "\n") continue;
    return index + 1;
  }
}

for (const blog of await glob("source/blog/*.md")) {
  const fullText = fs.readFileSync(blog, "utf8");
  const index = indexAfterFrontMatter(fullText);
  const text = fullText.substring(index);

  const injectableLink = /\n\n(https?:\/\/[^\n]+)\n\n/g;
  while (true) {
    const match = injectableLink.exec(text);
    if (!match) break;

    const url = new URL(match[1]);
    if (url.host !== "cohost.org") {
      throw new Error(`Unsupported URL "${url}" in ${blog}`);
    }

    const response = await fetch(url);
    const { document } = new JSDOM(await response.text(), { url }).window;
    const posts = document.querySelectorAll("[data-postid] > article");
    if (posts.length !== 1) {
      throw new Error(`URL "${url}" in ${blog} has ${posts.length} posts.`);
    }

    const post = posts[0];
    const avatar = post.querySelector("img.mask");
    const maskShape = [...avatar.classList]
      .filter((klass) => klass.startsWith("mask-"))[0]
      .substring(5);
    const displayName = post.querySelector(
      ".co-project-display-name",
    ).textContent;
    const time = post.querySelector("time").dateTime;
    const tags = [...post.querySelectorAll(".co-tags a")]
      .map((a) => a.textContent)
      .join(", ");
    const commentCount = parseInt(
      post
        .querySelector(".co-thread-footer a.text-sm")
        .textContent.split(" ")[0],
    );
    const prose = post.querySelector(".co-prose");
    if (!prose) {
      throw new Error(
        `URL "${url}" in ${blog} doesn't have content. You may need to be ``logged in to view it.`,
      );
    }

    for (const mention of prose.querySelectorAll('[data-testid="mention"]')) {
      mention.setAttribute("class", "co-mention");
      mention.removeAttribute("data-testid");
    }

    const contents = prose.innerHTML.replaceAll("<!-- -->", "");

    let replacement =
      "{% cohostPost " +
      [url.href, maskShape, displayName, time, tags, commentCount]
        .map(JSON.stringify)
        .join(", ") +
      " %}\n" +
      contents.replaceAll(/^/gm, "  ") +
      "\n{% endcohostPost %}";

    fs.writeFileSync(
      blog,
      fullText.substring(0, index + match.index + 2) +
        replacement +
        fullText.substring(index + match.index + match[0].length - 2),
      "utf8",
    );
  }
}
