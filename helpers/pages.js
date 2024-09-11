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
  eleventyConfig.addLiquidFilter("replaceInternalLinks", replaceInternalLinks);
}
