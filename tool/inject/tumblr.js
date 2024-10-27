import npf2html from "npf2html";
import * as prettier from "prettier";
import * as tumblr from "tumblr.js";

const client = new tumblr.Client({
  consumer_key: "9IaWmGX1cUa1qbxpGyxbG6LbYxlCI2P3jZJzh2COOKneaktQo2",
});

/**
 * Chooses the ideally-sized avatar from those available. Returns null if there
 * is no avatar.
 */
function getAvatar(blog) {
  if (!blog.avatar) return null;

  let highestRes;
  for (const avatar of blog.avatar) {
    if (avatar.width > 128) continue;
    highestRes ??= avatar;
    if (avatar.width > highestRes.avatar) highestRes = avatar;
  }

  return (highestRes ?? blog.avatar[0]).url;
}

/** Returns the title of {@link post}. */
function getTitle(post) {
  if (!post) return null;
  if (post.title) return post.title;
  if (post.type !== "blocks") return null;

  const firstBlock = post.content[0];
  return firstBlock.type === "text" && firstBlock.subtype === "heading1"
    ? firstBlock.text
    : null;
}

function postContent(post) {
  if (post.body) return post.body;

  let contents = "";
  for (const block of post.content) {
    if (block.type === "text") {
      const text = escapeHtml(block.text).replaceAll("\n", "<br>");
    }
  }
}

export async function tumblrTag(url) {
  const urlString = url.toString();
  let match =
    urlString.match(
      /^https?:\/\/(?:www\.)?tumblr\.com\/([^\/]+)\/([0-9]+)(\/|$)/,
    ) ??
    urlString.match(/^https?:\/\/([^.]+)\.tumblr\.com\/post\/([0-9]+)(\/|$)/);
  if (!match) {
    throw new Error(`Couldn't parse Tumblr URL ${urlString}`);
  }

  const author = match[1];
  const id = match[2];
  const response = await client.blogPosts(author, { id, npf: true });

  // TODO: if !response.is_blocks_post_format, render a legacy post. Otherwise
  // we'll lose some formatting here.

  const blog = response.blog;
  const post = response.posts[0];

  const args = {};
  args.url = post.post_url;
  args.title = getTitle(post);
  args.author = author;
  args.authorUrl = blog.url;
  args.authorAvatar = getAvatar(blog);
  args.date = new Date(post.timestamp);
  args.inReplyUrl = post.parent_post_url;
  args.inReplyTitle = getTitle(post?.trail?.at(-1));
  args.inReplyAuthor = post?.trail?.at(-1)?.blog?.name;

  // We could pull tags here, but the strong Tumblr expectation is that tags are
  // not visible on reblogs.

  return (
    `{% genericPost ${JSON.stringify(urlString)},\n` +
    Object.entries(args)
      .filter(([_, value]) => value)
      .map(([name, value]) => `    ${name}: ${JSON.stringify(value)}`)
      .join(",\n") +
    " %}\n" +
    (
      await prettier.format(
        npf2html(post.content, {
          layout: post.layout,
          askingAvatar: post.asking_avatar,
        }),
        {
          parser: "html",
          printWidth: 78,
        },
      )
    )
      .trim()
      .replaceAll(/^/gm, "  ") +
    "\n{% endgenericPost %}"
  );
}
