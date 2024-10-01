import cohostPostPlugin from "./cohost-post.js";
import genericPostPlugin from "./generic-post.js";
import imagePlugin from "./image.js";
import letterboxdPlugin from "./letterboxd.js";
import mentionPlugin from "./mention.js";

export default function (eleventyConfig) {
  cohostPostPlugin(eleventyConfig);
  genericPostPlugin(eleventyConfig);
  imagePlugin(eleventyConfig);
  letterboxdPlugin(eleventyConfig);
  mentionPlugin(eleventyConfig);
}
