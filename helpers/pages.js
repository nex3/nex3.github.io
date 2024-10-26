import * as crypto from "node:crypto";

import * as cheerio from "cheerio";
import { compile as initHtmlToText } from "html-to-text";
import fetch from "node-fetch";

import { simplifyEmbeds } from "./embed.js";
import { truncateText } from "./type.js";

const newlinePlaceholder = crypto.randomBytes(20).toString("hex");

/**
 * Edits the given JS to make it safe to inject directly into Markdown without
 * causing it to be parsed as meaningful whitespace.
 */
export function markdownSafe(html) {
  // This is probably possible to do cleaner with the raw parse5 or htmlparser2
  // API.
  const $ = cheerio.load(html, null, false);
  escapeNewlines($.root()[0]);
  return $.html().replaceAll("\n", " ").replaceAll(newlinePlaceholder, "&#10;");
}

/** HTML-escapes newlines in all text node transitive children of `node`. */
function escapeNewlines(node) {
  for (const child of node.children) {
    if (child.nodeType === 3) {
      // text node
      child.data = child.data.replaceAll("\n", newlinePlaceholder);
    } else if (child.children?.length) {
      escapeNewlines(child);
    }
  }
}

/**
 * Appends full page URL to internal links (for embedding in another page).
 */
function replaceInternalLinks(content, url) {
  return content.replace(/href="#/g, `href="${url}#`);
}

const htmlToText = initHtmlToText({
  wordwrap: false,
  selectors: [
    { selector: "img", format: "skip" },
    { selector: "a", options: { ignoreHref: true } },
    { selector: "figure", format: "skip" },
    { selector: "details", format: "skip" },
  ],
});

/**
 * Converts data about the current page into useful metadata for OpenGraph tags.
 */
function metadata(collections, site, title) {
  // TODO - Do this better when 11ty/eleventy#3458 is fixed.
  let content = "";
  if (!this.page.data?.description) {
    const matchingEntries = collections.all.filter(
      (collectionEntry) => collectionEntry.page === this.page,
    );
    if (matchingEntries.length === 1) {
      const entry = matchingEntries[0];
      content = entry.content;
    }
  }

  const data = { ...this.page.data };
  if (title) data.title = title;
  const page = simplifyEmbeds({ ...this.page, data, content });

  let desc =
    this.page.data?.description ?? truncateText(htmlToText(page.content), 150);
  if (!desc || desc === "") desc = site.desc;

  return {
    page,
    title: page.data?.title ? `${site.title} • ${page.data.title}` : site.title,
    desc,
    image: page.data.image ?? "/assets/avatar.webp",
    type: page.data?.["og-type"] ?? "website",
  };
}

export default function pagesPlugin(eleventyConfig) {
  eleventyConfig.addLiquidFilter("markdownSafe", markdownSafe);
  eleventyConfig.addLiquidFilter("metadata", metadata);
  eleventyConfig.addLiquidFilter("replaceInternalLinks", replaceInternalLinks);
}
