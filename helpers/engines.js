const markdown = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItFootnote = require("markdown-it-footnote");
const path = require("path");

/**
 * Returns Markdown engine with custom configuration and plugins.
 *
 * @see https://github.com/markdown-it/markdown-it
 * @see https://github.com/arve0/markdown-it-attrs
 */
module.exports.markdownEngine = markdown({
  html: true,
  typographer: false,
})
  .use(markdownItAttrs)
  .use(markdownItFootnote);
