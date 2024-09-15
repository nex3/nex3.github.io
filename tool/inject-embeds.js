import * as fs from "node:fs";
import { URL } from "node:url";

import { glob } from "glob";
import { JSDOM } from "jsdom";
import fetch from "node-fetch";

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

for (const blog of await glob("source/blog/*.md")) {
  const fullText = fs.readFileSync(blog, "utf8");
  const index = indexAfterFrontMatter(fullText);
  const text = fullText.substring(index);

  const injectableLink = /^\n(https?:\/\/[^\n]+)\n$/gm;
  while (true) {
    const match = injectableLink.exec(text);
    if (!match) break;

    const url = new URL(match[1]);
    if (url.host !== "cohost.org") {
      throw new Error(`Unsupported URL "${url}" in ${blog}`);
    }
    const author = url.pathname.split("/")[1];

    const response = await fetch(url);
    const { document } = new JSDOM(await response.text(), { url }).window;
    const posts = document.querySelectorAll("[data-postid] > article");
    if (posts.length !== 1) {
      throw new Error(`URL "${url}" in ${blog} has ${posts.length} posts.`);
    }

    const post = posts[0];
    const avatar = post.querySelector("img.mask");
    const avatarShape = [...avatar.classList]
      .filter((klass) => klass.startsWith("mask-"))[0]
      .substring(5);
    const displayName = post.querySelector(
      ".co-project-display-name",
    ).textContent;
    const time = post.querySelector("time").dateTime;
    const tags = [...post.querySelectorAll(".co-tags a")]
      .map((a) => a.textContent)
      .join(", ");
    const commentCount = parseInt(
      post
        .querySelector(".co-thread-footer a.text-sm")
        .textContent.split(" ")[0],
    );
    const prose = post.querySelector(".co-prose");
    if (!prose) {
      throw new Error(
        `URL "${url}" in ${blog} doesn't have content. You may need to be logged in to view it.`,
      );
    }

    const avatarPath = `${import.meta.dirname}/../source/assets/cohost/${author}.jpg`;
    if (!fs.existsSync(avatarPath)) {
      const response = await fetch(avatar.getAttribute("src"));
      fs.writeFileSync(
        avatarPath,
        new Uint8Array(await response.arrayBuffer()),
      );
    }

    for (const mention of prose.querySelectorAll('[data-testid="mention"]')) {
      mention.setAttribute("class", "co-mention");
      mention.removeAttribute("data-testid");
    }

    const contents = prose.innerHTML.replaceAll("<!-- -->", "");

    const args = { avatarShape, displayName, time, tags, commentCount };
    if (args.avatarShape === "circle") delete args.avatarShape;
    if (args.tags === "") delete args.tags;
    if (args.commentCount === 0) delete args.commentCount;

    let replacement =
      "{% cohostPost " +
      JSON.stringify(url.href) +
      ",\n" +
      Object.entries(args)
        .map(([name, value]) => `    ${name}: ${JSON.stringify(value)}`)
        .join(",\n") +
      " %}\n" +
      contents.replaceAll(/^/gm, "  ") +
      "\n{% endcohostPost %}";

    fs.writeFileSync(
      blog,
      fullText.substring(0, index + match.index + 1) +
        replacement +
        fullText.substring(index + match.index + match[0].length - 1),
      "utf8",
    );
  }
}
