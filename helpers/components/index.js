import cohostPostPlugin from "./cohost-post.js";
import imagePlugin from "./image.js";

export default function (eleventyConfig) {
  cohostPostPlugin(eleventyConfig);
  imagePlugin(eleventyConfig);
}
