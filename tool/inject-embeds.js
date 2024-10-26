import * as fs from "node:fs";
import { URL } from "node:url";

import { glob } from "glob";
import fetch from "node-fetch";

import { backloggdTag } from "./inject/backloggd.js";
import { cohostTag } from "./inject/cohost.js";
import { hEntryToTag } from "./inject/h-entry.js";
import { letterboxdTag } from "./inject/letterboxd.js";
import { tumblrTag } from "./inject/tumblr.js";

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

    case "www.backloggd.com":
    case "backloggd.com":
      return await backloggdTag(url);

    case "tumblr.com":
    case "www.tumblr.com":
      return await tumblrTag(url);

    default:
      if (url.hostname.endsWith(".tumblr.com")) return await tumblrTag(url);

      const response = await fetch(url);
      const html = await response.text();
      const result = await hEntryToTag(html, url);
      if (result) return result;
      throw new Error(`Unsupported URL "${url}" in ${blog}`);
  }
}

for (const blog of await glob("source/blog/*.md")) {
  const fullText = fs.readFileSync(blog, "utf8");
  const index = indexAfterFrontMatter(fullText);
  const text = fullText.substring(index);

  const injectableLink = /^\n(https?:\/\/[^\n]+)\n$/gm;
  const matches = [...text.matchAll(injectableLink)];
  if (matches.length === 0) continue;

  let result = "";
  let lastMatch;
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    result += text.substring(
      lastMatch ? lastMatch.index + lastMatch[0].length - 1 : 0,
      match.index + 1,
    );
    result += await tagForUrl(new URL(match[1]), blog);
    lastMatch = match;
  }
  result += text.substring(lastMatch.index + lastMatch[0].length - 1);

  fs.writeFileSync(blog, fullText.substring(0, index) + result, "utf8");
}
