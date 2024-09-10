const truncate = require('truncate-html');

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

/**
 * Truncates an HTML string without breaking tags.
 *
 * @see https://github.com/oe/truncate-html
 */
function truncateHTML(html, words) {
  return truncate(html, words, {byWords: true, keepWhitespaces: true});
}

module.exports = function pagesPlugin(eleventyConfig) {
  // filters...
  eleventyConfig.addLiquidFilter("getBlogSlug", getBlogSlug);
  eleventyConfig.addLiquidFilter("truncateHTML", truncateHTML);
  eleventyConfig.addLiquidFilter("replaceInternalLinks", replaceInternalLinks);
};
