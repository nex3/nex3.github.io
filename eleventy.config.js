import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import markdownIt from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import markdownItFootnote from "markdown-it-footnote";
import markdownItNamedHeadings from "markdown-it-named-headings";
import rssPlugin from "@11ty/eleventy-plugin-rss";
import * as sass from "sass";
import yaml from "js-yaml";
import syntaxHighlightPlugin from "@11ty/eleventy-plugin-syntaxhighlight";
import * as cheerio from "cheerio";

import cacheBusterPlugin from "eleventy-auto-cache-buster";
import componentsPlugin from "./helpers/components/index.js";
import datesPlugin from "./helpers/dates.js";
import embedPlugin from "./helpers/embed.js";
import objectsPlugin from "./helpers/objects.js";
import pagesPlugin from "./helpers/pages.js";
import typePlugin from "./helpers/type.js";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(cacheBusterPlugin);
  eleventyConfig.addPlugin(componentsPlugin);
  eleventyConfig.addPlugin(datesPlugin);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(embedPlugin);
  eleventyConfig.addPlugin(objectsPlugin);
  eleventyConfig.addPlugin(pagesPlugin);
  eleventyConfig.addPlugin(syntaxHighlightPlugin);
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

  eleventyConfig.addTransform("unescape-newlines", function (content) {
    return content.replaceAll("&#10;", "\n");
  });

  eleventyConfig.addTransform("fix-ds3-links", function (content) {
    if (!this.page.inputPath.startsWith("./source/ds3/")) {
      return content;
    }

    const $ = cheerio.load(content, null, false);
    for (const a_ of $("a")) {
      const a = $(a_);
      const href = a.attr("href");
      let match = href?.match(
        /^\/(?:games|tutorial)\/Dark%20Souls%20III\/(.*)\/en(#.*)?$/,
      );
      if (match) {
        a.attr("href", "/ds3/" + match[1] + (match[2] ?? ""));
      } else if (href?.startsWith("/")) {
        a.attr("href", `https://archipelago.gg${href}`);
      } else if (href == "../player-options") {
        a.attr(
          "href",
          `https://archipelago.gg/game/Dark%20Souls%20III/player-options`,
        );
      }
    }
    return $.html();
  });

  const markdownItOptions = {
    html: true,
    linkify: true,
  };

  const md = markdownIt(markdownItOptions)
    .use(markdownItAttrs)
    .use(markdownItFootnote)
    .use(markdownItNamedHeadings);

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
