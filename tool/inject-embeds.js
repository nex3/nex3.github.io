import * as fs from "node:fs";
import { URL } from "node:url";

import { glob } from "glob";
import { cohostTag } from "./inject/cohost.js";
import { letterboxdTag } from "./inject/letterboxd.js";

function indexAfterFrontMatter(string) {
  const boundary = /^---/gm;
  if (!boundary.exec(string)) return 0;

  while (true) {
    const match = boundary.exec(string);
    if (!match) return 0;
    const index = match.index + match[0].length;
    if (string.charAt(index) !== "\n") continue;
    return index + 1;
  }
}

async function tagForUrl(url, blog) {
  switch (url.hostname) {
    case "cohost.org":
      return await cohostTag(url);

    case "letterboxd.com":
    case "boxd.it":
      return await letterboxdTag(url);

    default:
      throw new Error(`Unsupported URL "${url}" in ${blog}`);
  }
}

for (const blog of await glob("source/blog/*.md")) {
  const fullText = fs.readFileSync(blog, "utf8");
  const index = indexAfterFrontMatter(fullText);
  const text = fullText.substring(index);

  const injectableLink = /^\n(https?:\/\/[^\n]+)\n$/gm;
  while (true) {
    const match = injectableLink.exec(text);
    if (!match) break;

    const replacement = await tagForUrl(new URL(match[1]), blog);
    fs.writeFileSync(
      blog,
      fullText.substring(0, index + match.index + 1) +
        replacement +
        fullText.substring(index + match.index + match[0].length - 1),
      "utf8",
    );
  }
}
