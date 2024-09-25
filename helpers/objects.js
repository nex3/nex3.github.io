/** Returns a copy of {@link array} with {@link items} removed. */
function omit(array, ...items) {
  return (array ?? []).filter((item) => !items.includes(item));
}

export default function objectsPlugin(eleventyConfig) {
  eleventyConfig.addLiquidFilter("omit", omit);
}
