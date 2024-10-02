import * as fs from "node:fs";

import { JSDOM } from "jsdom";
import fetch from "node-fetch";
import * as prettier from "prettier";

export async function cohostTag(url) {
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
    post.querySelector(".co-thread-footer a.text-sm").textContent.split(" ")[0],
  );
  const prose = post.querySelector(".co-prose");
  if (!prose) {
    throw new Error(
      `URL "${url}" in ${blog} doesn't have content. You may need to be logged in to view it.`,
    );
  }

  const avatarPath = `${import.meta.dirname}/../../source/assets/cohost/${author}.jpg`;
  if (!fs.existsSync(avatarPath)) {
    const response = await fetch(avatar.getAttribute("src"));
    fs.writeFileSync(avatarPath, new Uint8Array(await response.arrayBuffer()));
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

  return (
    "{% cohostPost " +
    JSON.stringify(url.href) +
    ",\n" +
    Object.entries(args)
      .map(([name, value]) => `    ${name}: ${JSON.stringify(value)}`)
      .join(",\n") +
    " %}\n" +
    (await prettier.format(contents, { parser: "html", printWidth: 78 }))
      .trim()
      .replaceAll(/^/gm, "  ") +
    "\n{% endcohostPost %}"
  );
}
