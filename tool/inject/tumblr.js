import npf2html from "npf2html";
import * as prettier from "prettier";
import * as tumblr from "tumblr.js";
import "dotenv/config";

const client = new tumblr.Client({
  consumer_key: "9IaWmGX1cUa1qbxpGyxbG6LbYxlCI2P3jZJzh2COOKneaktQo2",
  consumer_secret: process.env.TUMBLR_CONSUMER_SECRET,
  token: process.env.TUMBLR_TOKEN,
  token_secret: process.env.TUMBLR_TOKEN_SECRET,
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

/** Returns the URL for a trail {@link entry}. */
function getUrl(entry) {
  return `https://www.tumblr.com/${entry.blog.name}/${entry.post.id}`;
}

/**
 * Returns the posting date for a trail {@link entry}.
 *
 * There's no way to find the date for a deleted post in a reblog chain, so in
 * that case this will return undefined.
 */
async function getDate(entry) {
  if (entry.timestamp) return new Date(entry.timestamp * 1000);

  try {
    const response = await client.blogPosts(entry.blog.name, {
      id: entry.post.id,
      npf: true,
    });
    return new Date(response.posts[0].timestamp * 1000);
  } catch (_) {
    return undefined;
  }
}

async function singlePost(entry, genericPostArgs = {}) {
  const args = { ...(genericPostArgs ?? {}) };

  args.title = getTitle(entry);
  args.author = entry.blog.name;
  args.authorUrl = entry.blog.url;
  args.authorAvatar = getAvatar(entry.blog);
  args.date = await getDate(entry);

  // We could pull tags here, but the strong Tumblr expectation is that tags are
  // not visible on reblogs.

  return (
    `{% genericPost ${JSON.stringify(getUrl(entry))},\n` +
    Object.entries(args)
      .filter(([_, value]) => value)
      .map(([name, value]) => `    ${name}: ${JSON.stringify(value)}`)
      .join(",\n") +
    " %}\n" +
    (
      await prettier.format(
        npf2html(entry.content, {
          // These are only available from the main post we use to create a
          // synthetic entry.
          layout: entry.post.layout,
          askingAvatar: entry.post.asking_avatar,
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

  const response = await client.blogPosts(match[1], {
    id: match[2],
    npf: true,
  });

  // TODO: if !response.is_blocks_post_format, render a legacy post. Otherwise
  // we'll lose some formatting here.

  const results = [
    await singlePost({
      blog: response.blog,
      post: response.posts[0],
      content: response.posts[0].content,
    }),
  ];

  let inReplyUrl = undefined;
  let inReplyAuthor = undefined;
  let inReplyTitle = undefined;

  const trail = [...response.posts[0].trail];
  for (let i = 1; i < trail.length; i++) {
    const entry = trail[i];

    const args = {};
    if (i === trail.length - 1 && response.blog.name != entry.blog.name) {
      args.via = response.blog.name;
      args.viaDate = new Date(response.posts[0].timestamp * 1000);
      args.viaUrl = response.posts[0].post_url;
      args.viaAuthorUrl = response.blog.url;
      args.viaAuthorAvatar = getAvatar(response.blog);
    }

    args.inReplyUrl = inReplyUrl;
    args.inReplyAuthor = inReplyAuthor;
    args.inReplyTitle = inReplyTitle;
    results.push(await singlePost(entry, { genericPostArgs: args }));

    inReplyUrl = getUrl(entry);
    inReplyAuthor = entry.blog.name;
    inReplyTitle = getTitle(entry);
  }

  return results.join("\n\n");
}
