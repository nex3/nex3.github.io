import { createPairedComponentPlugin } from "./base.js";
import { stripIndent } from "../type.js";

export default createPairedComponentPlugin(
  "genericPost",
  (liquidEngine, contents, url, options) => {
    const tags = (options.tags ?? "")
      .split(",")
      .map((tag) => tag.trim().replace(/^#/, ""))
      .filter((tag) => tag.length > 0);
    const time = options.time ? new Date(Date.parse(options.time)) : undefined;

    return liquidEngine.renderFile("components/generic-post", {
      ...options,
      contents: stripIndent(contents).trim(),
      url,
      time,
      tags,
    });
  },
);
