import { createPairedComponentPlugin } from "./base.js";
import { stripIndent } from "../type.js";

export default createPairedComponentPlugin(
  "letterboxd",
  (liquidEngine, contents, url, options) => {
    const [_, author, filmSlug] = url.match(
      /^https:\/\/letterboxd\.com\/([^\/]+)\/film\/([^\/]+)\//,
    );
    const date = new Date(Date.parse(options.date));

    return liquidEngine.renderFile("components/letterboxd", {
      contents: stripIndent(contents).trim(),
      author,
      filmSlug,
      authorDisplayName: options.authorDisplayName,
      rating: options.rating,
      film: options.film,
      year: options.year,
      date: date,
      poster: options.poster,
      avatar: options.avatar,
      image: options.image,
      supporter: options.supporter,
    });
  },
);
