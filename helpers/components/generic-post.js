import { createPairedComponentPlugin } from "./base.js";
import { viaOptions } from "./mention.js";
import { stripIndent } from "../type.js";

export default createPairedComponentPlugin(
  "genericPost",
  (liquidEngine, contents, url, options) => {
    const tags = (options.tags ?? "")
      .split(",")
      .map((tag) => tag.trim().replace(/^#/, ""))
      .filter((tag) => tag.length > 0);
    const date = options.date ? new Date(Date.parse(options.date)) : undefined;
    const via = options.via ? viaOptions(options) : undefined;

    return liquidEngine.renderFile("components/generic-post", {
      ...options,
      contents: stripIndent(contents).trim(),
      url,
      date,
      tags,
      via,
    });
  },
);
