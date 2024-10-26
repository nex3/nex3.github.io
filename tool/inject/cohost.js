import * as fs from "node:fs";

import * as cheerio from "cheerio";
import fetch from "node-fetch";
import * as prettier from "prettier";

export async function cohostTag(url) {
  const author = url.pathname.split("/")[1];

  const response = await fetch(url);
  const $ = cheerio.load(await response.text(), { baseUrl: url });
  const posts = $("[data-postid] > article");
  if (posts.length !== 1) {
    throw new Error(`URL "${url}" in ${blog} has ${posts.length} posts.`);
  }

  const post = $(posts[0]);
  const avatar = post.find("img.mask");
  const avatarShape = [...avatar.attr("class").split(" ")]
    .filter((klass) => klass.startsWith("mask-"))[0]
    .substring(5);
  const displayName = post.find(".co-project-display-name").text();
  const time = new Date(post.find("time").attr("datetime"));
  const tags = [...post.find(".co-tags a")].map((a) => $(a).text()).join(", ");
  const commentCount = parseInt(
    post.find(".co-thread-footer a.text-sm").text().split(" ")[0],
  );
  const prose = post.find(".co-prose");
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

  for (const mention of [...prose.find('[data-testid="mention"]')].map($)) {
    mention.attr("class", "co-mention");
    mention.attr("data-testid", null);
  }

  const contents = prose.html().replaceAll("<!-- -->", "");

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
