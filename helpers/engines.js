import markdown from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import markdownItFootnote from "markdown-it-footnote";

/**
 * Returns Markdown engine with custom configuration and plugins.
 *
 * @see https://github.com/markdown-it/markdown-it
 * @see https://github.com/arve0/markdown-it-attrs
 */
export const markdownEngine = markdown({
  html: true,
  typographer: false,
})
  .use(markdownItAttrs)
  .use(markdownItFootnote);
