import { createPairedComponentPlugin } from "./base.js";
import { stripIndent } from "../type.js";

export default createPairedComponentPlugin(
  "backloggd",
  (liquidEngine, contents, url, options) => {
    const [_, author] = url.match(
      /^https:\/\/www\.backloggd\.com\/u\/([^\/]+)/,
    );
    const date = new Date(Date.parse(options.date));

    return liquidEngine.renderFile("components/backloggd", {
      contents: stripIndent(contents).trim(),
      author,
      url,
      ...options,
      date,
    });
  },
);
