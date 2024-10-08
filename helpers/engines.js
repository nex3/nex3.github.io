import markdown from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import markdownItFootnote from "markdown-it-footnote";
import markdownPrismJs from "@11ty/eleventy-plugin-syntaxhighlight/src/markdownSyntaxHighlightOptions.js";

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
  .use(markdownItFootnote)
  .set({ highlight: markdownPrismJs() });
