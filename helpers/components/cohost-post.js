import { createPairedComponentPlugin } from "./base.js";
import { stripIndent } from "../type.js";

export default createPairedComponentPlugin(
  "cohostPost",
  (liquidEngine, contents, url, options) => {
    const tags = (options.tags ?? "")
      .split(",")
      .map((tag) => tag.trim().replace(/^#/, ""))
      .filter((tag) => tag.length > 0);
    const author = url.match(/^https:\/\/cohost\.org\/([^\/]+)/)[1];
    const time = new Date(Date.parse(options.time));

    return liquidEngine.renderFile("cohost-post", {
      contents: stripIndent(contents).trim(),
      url,
      avatarShape: options.avatarShape ?? "circle",
      author,
      authorDisplayName: options.displayName,
      time,
      tags,
      commentCount: options.commentCount ?? 0,
    });
  },
);
