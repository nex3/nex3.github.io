import { JSDOM } from "jsdom";
import * as crypto from "node:crypto";

const newlinePlaceholder = crypto.randomBytes(20).toString("hex");

/**
 * Edits the given JS to make it safe to inject directly into Markdown without
 * causing it to be parsed as meaningful whitespace.
 */
export function markdownSafe(html) {
  const fragment = JSDOM.fragment(`<div>${html}</div>`);
  escapeNewlines(fragment);
  return fragment.childNodes[0].innerHTML
    .replaceAll("\n", " ")
    .replaceAll(newlinePlaceholder, "&#10;");
}

/** HTML-escapes newlines in all text node transitive children of `node`. */
function escapeNewlines(node) {
  for (const child of node.childNodes) {
    if (child.nodeType === node.TEXT_NODE) {
      child.textContent = child.textContent.replaceAll(
        "\n",
        newlinePlaceholder,
      );
    } else if (child.hasChildNodes()) {
      escapeNewlines(child);
    }
  }
}

/**
 * Removes leading id (e.g. `001-`) from blog filenames.
 */
function getBlogSlug(page) {
  return page.fileSlug.replace(/^(\d*-)/, "");
}

/**
 * Appends full page URL to internal links (for embedding in another page).
 */
function replaceInternalLinks(content, url) {
  return content.replace(/href="#/g, `href="${url}#`);
}

export default function pagesPlugin(eleventyConfig) {
  // filters...
  eleventyConfig.addLiquidFilter("getBlogSlug", getBlogSlug);
  eleventyConfig.addLiquidFilter("markdownSafe", markdownSafe);
  eleventyConfig.addLiquidFilter("replaceInternalLinks", replaceInternalLinks);
}
