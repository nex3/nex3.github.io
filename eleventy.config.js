import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import markdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import markdownItAttrs from "markdown-it-attrs";
import rssPlugin from "@11ty/eleventy-plugin-rss";
import * as sass from "sass";
import yaml from "js-yaml";

import componentsPlugin from "./helpers/components/index.js";
import datesPlugin from "./helpers/dates.js";
import pagesPlugin from "./helpers/pages.js";
import typePlugin from "./helpers/type.js";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(componentsPlugin);
  eleventyConfig.addPlugin(datesPlugin);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(pagesPlugin);
  eleventyConfig.addPlugin(typePlugin);

  eleventyConfig.setLiquidParameterParsing("builtin");

  eleventyConfig.addLiquidFilter("absoluteUrl", rssPlugin.absoluteUrl);
  eleventyConfig.addLiquidFilter(
    "getNewestCollectionItemDate",
    rssPlugin.getNewestCollectionItemDate,
  );
  eleventyConfig.addLiquidFilter("dateToRfc3339", rssPlugin.dateToRfc3339);
  eleventyConfig.addLiquidFilter(
    "htmlToAbsoluteUrls",
    rssPlugin.convertHtmlToAbsoluteUrls,
  );

  eleventyConfig.addDataExtension("yml, yaml", (contents) =>
    yaml.load(contents),
  );

  eleventyConfig.addTemplateFormats("xml", { key: "liquid" });

  const markdownItOptions = {
    html: true,
    linkify: true,
  };

  const md = markdownIt(markdownItOptions)
    .use(markdownItFootnote)
    .use(markdownItAttrs)
    .use(function (md) {
      // Recognize Mediawiki links ([[text]])
      md.linkify.add("[[", {
        validate: /^\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/,
        normalize: (match) => {
          const parts = match.raw.slice(2, -2).split("|");
          parts[0] = parts[0].replace(/.(md|markdown)\s?$/i, "");
          match.text = (parts[1] || parts[0]).trim();
          match.url = `/notes/${parts[0].trim()}/`;
        },
      });
    });

  eleventyConfig.addFilter("markdownify", (string) => {
    return md.render(string);
  });

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPassthroughCopy({
    "source/assets": "assets",
    static: ".",
    "node_modules/glightbox/dist/js/glightbox.js": "assets/lightbox.js",
    "node_modules/glightbox/dist/css/glightbox.css": "assets/lightbox.css",
  });
  eleventyConfig.setUseGitIgnore(false);

  // TODO: use https://github.com/kentaroi/eleventy-sass once the
  // require-module issue is fixed.
  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: async function (inputContent) {
      const result = sass.compileString(inputContent);
      return async () => result.css;
    },
  });

  return {
    dir: {
      input: "source",
      output: "_site",
      layouts: "layouts",
      includes: "includes",
      data: "data",
    },
    passthroughFileCopy: true,
  };
}
