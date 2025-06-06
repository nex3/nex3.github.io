import escapeHtml from "escape-html";
import { mf2 } from "microformats-parser";
import sanitizeHtml from "sanitize-html";

import { truncateHTML } from "../../helpers/type.js";
import { findEntry, stripInitialEmbeds } from "../../helpers/embed.js";

export const layout = "blog";
export const tags = ["blog"];
export const date = "git created";
export const author = "Natalie";

/**
 * Removes leading id (e.g. `001-`) from blog filenames.
 */
function getBlogSlug(page) {
  return page.fileSlug.replace(/^(\d*-)/, "");
}

export function permalink(data) {
  return `/blog/${getBlogSlug(data.page)}/index.html`;
}

export async function webMentions() {
  const { url } = this.page;
  if (!url) return [];

  const perPage = 50;
  const endpoint =
    `https://webmention.io/api/mentions.jf2` +
    `?wm-property[]=in-reply-to` +
    `&wm-property[]=repost-of` +
    `&wm-property[]=mention-of` +
    `&per-page=${perPage}` +
    `&sort-dir=up` +
    `&target=https://nex-3.com${escape(url)}`;
  const allMentions = [];

  for (let page = 0; ; page++) {
    const response = await fetch(`${endpoint}&page=${page}`);
    if (!response.ok) {
      console.error(
        `${response.status} ${response.statusText} fetching ${endpoint}`,
      );
      break;
    }
    const { children } = await response.json();
    allMentions.push(
      ...children.filter(
        (mention) =>
          // Don't show self-mentions
          !mention.url.startsWith("https://nex-3.com/") &&
          // Don't show transparent reposts, but do show ones that add content.
          (mention["wm-property"] !== "repost-of" || "content" in mention),
      ),
    );
    if (children.length < perPage) break;
  }

  for (const mention of allMentions) {
    if (typeof mention.author === "string") {
      mention.author = { type: "card", name: mention.author };
    }

    if (mention.author.name === "") delete mention.author;
    if (mention.author) {
      if (mention.author.url === "") delete mention.author.url;
      mention.author.photo ??= mention.author.logo;
      if (typeof mention.author.photo === "string") {
        if (mention.author.photo === "") {
          delete mention.author.photo;
        } else {
          mention.author.photo = { value: mention.author.photo };
        }
      }
    }

    if (mention.content?.html) {
      mention.content.html = sanitizeHtml(mention.content.html, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        allowedClasses: {
          "*": [/^(p|u|dt|h|e)-/],
        },
        // Remove internal links
        transformTags: {
          a: (tagName, attribs) =>
            attribs.href?.startsWith("#")
              ? { tagName, attribs: {} }
              : { tagName, attribs },
        },
        // Filter out footnote returns. transformTags runs before
        // exclusiveFilter so these won't have hrefs.
        exclusiveFilter: (frame) =>
          frame.tag === "a" && !frame.attribs.href && frame.text === "↩︎",
      });
    } else if (mention.content?.text) {
      mention.content.html = escapeHtml(mention.content.text);
    }

    if (
      mention.content?.html &&
      (mention["wm-property"] === "repost-of" ||
        mention["wm-property"] === "mention-of")
    ) {
      mention.content.html = truncateHTML(mention.content.html, 72);
    }

    for (const prop of ["wm-received", "published", "updated"]) {
      if (mention[prop]) {
        mention[prop] = new Date(Date.parse(mention[prop]));
      }
    }
  }

  allMentions.sort((mention1, mention2) => {
    const date1 = mention1.published ?? mention1["wm-received"];
    const date2 = mention2.published ?? mention2["wm-received"];
    if (date1 && date2) {
      return date1 - date2;
    }
    if (date1) return -1;
    if (date2) return 1;
    return 0;
  });

  return allMentions;
}
