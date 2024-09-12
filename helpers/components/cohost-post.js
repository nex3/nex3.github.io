import { createPairedComponentPlugin } from "./base.js";
import { stripIndent } from "../type.js";

export default createPairedComponentPlugin(
  "cohostPost",
  (
    liquidEngine,
    contents,
    url,
    avatarShape,
    authorDisplayName,
    timeString,
    tagString,
    commentCount,
  ) => {
    const tags = tagString
      .split(",")
      .map((tag) => tag.trim().replace(/^#/, ""));
    const author = url.match(/^https:\/\/cohost\.org\/([^\/]+)/)[1];
    const time = new Date(Date.parse(timeString));

    return liquidEngine.renderFile("cohost-post", {
      contents: stripIndent(contents).trim(),
      url,
      avatarShape,
      author,
      authorDisplayName,
      time,
      tags,
      commentCount,
    });
  },
);
