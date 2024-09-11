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

/**
 * Truncates an HTML string without breaking tags.
 *
 * @see https://github.com/oe/truncate-html
 */
function truncateHTML(html, words) {
  return truncate(html, words, { byWords: true, keepWhitespaces: true });
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
  eleventyConfig.addLiquidFilter("truncateHTML", truncateHTML);
  eleventyConfig.addLiquidFilter("markdown", markdown);
  eleventyConfig.addLiquidFilter("markdownInline", markdownInline);
}
