const {
  format: formatBase,
  formatDistanceToNow: formatDistanceBase,
} = require("date-fns");

/**
 * Returns the formatted date string in the given format.
 *
 * @see https://date-fns.org/docs/format
 */
function format(date, pattern = "d MMMM yyyy") {
  return formatBase(new Date(date), pattern);
}

/**
 * Returns the distance between the given date and now in words.
 *
 * @see https://date-fns.org/docs/formatDistanceToNow
 */
function formatDistanceToNow(date) {
  return formatDistanceBase(new Date(date));
}

module.exports = function datesPlugin(eleventyConfig) {
  // filters...
  eleventyConfig.addLiquidFilter("format", format);
  eleventyConfig.addLiquidFilter("formatDistanceToNow", formatDistanceToNow);
};
