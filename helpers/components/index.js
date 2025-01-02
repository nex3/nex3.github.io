import askPlugin from "./ask.js";
import backloggdPlugin from "./backloggd.js";
import cohostPostPlugin from "./cohost-post.js";
import genericPostPlugin from "./generic-post.js";
import imagePlugin from "./image.js";
import letterboxdPlugin from "./letterboxd.js";
import mentionPlugin from "./mention.js";
import posterListPlugin from "./poster-list.js";

export default function (eleventyConfig) {
  askPlugin(eleventyConfig);
  backloggdPlugin(eleventyConfig);
  cohostPostPlugin(eleventyConfig);
  genericPostPlugin(eleventyConfig);
  imagePlugin(eleventyConfig);
  letterboxdPlugin(eleventyConfig);
  mentionPlugin(eleventyConfig);
  posterListPlugin(eleventyConfig);
}
