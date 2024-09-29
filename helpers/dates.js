import {TZDate} from "@date-fns/tz";
import {
  format as formatBase,
  formatDistanceToNow as formatDistanceBase,
} from "date-fns";

const timezone = "America/Los_Angeles";

/**
 * Returns the formatted date string in the given format.
 *
 * @see https://date-fns.org/docs/format
 */
function format(date, pattern = "d MMMM yyyy") {
  return formatBase(new TZDate(date, timezone), pattern);
}

/**
 * Returns the distance between the given date and now in words.
 *
 * @see https://date-fns.org/docs/formatDistanceToNow
 */
function formatDistanceToNow(date) {
  return formatDistanceBase(new TZDate(date, timezone));
}

export default function datesPlugin(eleventyConfig) {
  // filters...
  eleventyConfig.addLiquidFilter("format", format);
  eleventyConfig.addLiquidFilter("formatDistanceToNow", formatDistanceToNow);
}
