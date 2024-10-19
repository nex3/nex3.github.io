import * as crypto from "node:crypto";
import { URL } from "node:url";

import truncate from "truncate-html";
import { markdownEngine } from "./engines.js";

/**
 * Strips leading whitespace from each line of a string,
 * based on the whitespace of the first line.
 *
 * @see https://github.com/sindresorhus/strip-indent
 * @see https://github.com/jamiebuilds/min-indent
 */
export function stripIndent(contents) {
  // Find leading whitespace of first line (ignoring initial newlines)
  const match = /^[\n\r]*([ \t]*)(?=\S)/.exec(contents);
  if (match?.[1]?.length) {
    // Strip leading whitespace based on first line
    return contents.replaceAll(
      new RegExp(`^[ \\t]{${match[1].length}}`, "gm"),
      "",
    );
  }
  return contents;
}

const linkPlaceholder = crypto.randomBytes(20).toString("hex");

/**
 * Truncates an HTML string without breaking tags. If a link URL is passed, add
 * it as a "read more" after the truncation.
 *
 * @see https://github.com/oe/truncate-html
 */
export function truncateHTML(html, words, ...named) {
  const options = Object.fromEntries(named);
  return truncate(html, words, {
    byWords: true,
    ellipsis: options.link ? `${linkPlaceholder}` : "…",
    keepWhitespaces: true,
  }).replace(
    linkPlaceholder,
    `<a href="${options.link}" class="read-more" title="Read More">…</a>`,
  );
}

/** Truncates text without breaking words. */
export function truncateText(text, words) {
  const regexp = /[ \n—]+/g;
  let match;
  for (let i = 0; i < words; i++) {
    match = regexp.exec(text);
    if (!match) return text;
  }

  return text.substring(0, match.index) + "…";
}

/** Returns the hostname of the given URL. */
function urlHostname(url) {
  if (typeof url === "string") url = new URL(url);
  return url.hostname;
}

/** Returns whether the given URL is for this site. */
function isSiteUrl(url) {
  url = url.toString();
  if (!url.startsWith("http://") && !url.startsWith("https://")) return true;
  return url.startsWith("https://nex-3.com");
}

/**
 * Renders block of Markdown into HTML.
 */
function markdown(content) {
  return markdownEngine.render(stripIndent(content));
}

/**
 * Renders single line of Markdown into HTML, without wrapping `<p>`.
 */
function markdownInline(content) {
  return markdownEngine.renderInline(content);
}

export default function typePlugin(eleventyConfig) {
  eleventyConfig.addLiquidFilter("isSiteUrl", isSiteUrl);
  eleventyConfig.addLiquidFilter("markdown", markdown);
  eleventyConfig.addLiquidFilter("markdownInline", markdownInline);
  eleventyConfig.addLiquidFilter("truncateHTML", truncateHTML);
  eleventyConfig.addLiquidFilter("truncateText", truncateText);
  eleventyConfig.addLiquidFilter("urlHostname", urlHostname);
}
