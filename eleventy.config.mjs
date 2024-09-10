import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import markdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import markdownItAttrs from "markdown-it-attrs";
import rssPlugin from "@11ty/eleventy-plugin-rss";
import yaml from "js-yaml";

import datesPlugin from "./helpers/dates.js";
import pagesPlugin from "./helpers/pages.js";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(datesPlugin);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(pagesPlugin);

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

  eleventyConfig.addPassthroughCopy({ assets: "assets", static: "" });
  eleventyConfig.setUseGitIgnore(false);

  return {
    dir: {
      input: "./",
      output: "_site",
      layouts: "layouts",
      includes: "includes",
      data: "data",
    },
    passthroughFileCopy: true,
  };
}