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

    return liquidEngine.renderFile("generic-post", {
      contents: stripIndent(contents).trim(),
      url,
      name: options.name,
      time,
      tags,
      author: options.author,
      authorUrl: options.authorUrl,
      authorAvatar: options.authorAvatar,
      authorAvatarAlt: options.authorAvatarAlt,
      inReplyUrl: options.inReplyUrl,
      inReplyName: options.inReplyName,
      inReplyAuthor: options.inReplyAuthor,
    });
  },
);
