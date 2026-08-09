import { TZDate } from "@date-fns/tz";
import {
  format as formatBase,
  formatDistanceToNow as formatDistanceBase,
} from "date-fns";
import * as chrono from "chrono-node";

const timezone = "America/Los_Angeles";

/**
 * Parses the given date string from a wide array of human-friendly formats.
 */
export function parse(date) {
  if (date instanceof Date || date instanceof TZDate) return date;
  return new TZDate(chrono.parseDate(date, { timezone }), timezone);
}

/**
 * Overrides Liquid's built in dateToRfc3339 filter to parse any date format
 * Chrono supports.
 */
function dateToRfc3339(date) {
  let s = parse(date).toISOString();

  // remove milliseconds
  let split = s.split(".");
  split.pop();

  return split.join("") + "Z";
}

/**
 * Returns the formatted date string in the given format.
 *
 * @see https://date-fns.org/docs/format
 */
function format(date, pattern = "d MMMM yyyy") {
  return formatBase(parse(date), pattern);
}

/**
 * Returns the distance between the given date and now in words.
 *
 * @see https://date-fns.org/docs/formatDistanceToNow
 */
function formatDistanceToNow(date) {
  return formatDistanceBase(parse(date));
}

export default function datesPlugin(eleventyConfig) {
  // filters...
  eleventyConfig.addLiquidFilter("dateToRfc3339", dateToRfc3339);
  eleventyConfig.addLiquidFilter("format", format);
  eleventyConfig.addLiquidFilter("formatDistanceToNow", formatDistanceToNow);
}
