import fetch from "node-fetch";

import { mf2 } from "microformats-parser";
import * as prettier from "prettier";

/// If {@link items} has a single h-card, returns its value.
function getCard(items) {
  const cards = items.filter(
    (item) => item.type.length === 1 && item.type[0] === "h-card",
  );
  if (cards.length != 1) return null;
  return cards[0];
}

/// Resolves {@link url} relative to {@link base}.
///
/// If {@link url} is undefined or null, returns it as-is.
function resolveUrl(url, base) {
  if (!url) return url;
  return new URL(url, base).toString();
}

/**
 * Returns the h-entry in {@link items} with URL {@link urlToFind}.
 *
 * Returns null if there is no matching entry and throws an error if it's
 * ambiguous.
 */
function findEntry(items, urlToFind, baseUrl) {
  const candidates = items.filter(
    (item) =>
      item.type.includes("h-entry") &&
      (item.properties.url ?? []).some(
        (url) => resolveUrl(url, baseUrl) == urlToFind,
      ),
  );
  if (candidates.length < 2) return candidates[0] ?? null;
  throw new Error(
    `URL ${url} has multiple top-level h-entries with matching URL`,
  );
}

/**
 * If {@link entry} is a reply, tries to create a tag for the post it's replying
 * to.
 *
 * This builds one directly from the source URL if possible, from {@link items}
 * if the original post embedded it, or else gives up and returns nothing.
 */
async function previousEntryToTag(entry, items, baseUrl) {
  // TODO: de-duplicate replies so that if we fetch multiple pages that embed
  // replies we don't include all of them.

  const results = [];
  for (const replyUrlUnresolved of entry.properties["in-reply-to"] ?? []) {
    const replyUrl = resolveUrl(replyUrlUnresolved, baseUrl);
    const response = await fetch(replyUrl);
    const html = await response.text();
    if (/\bh-entry\b/.test(html)) {
      results.push(await hEntryToTag(html, replyUrl));
      continue;
    }

    const replyEntry = findEntry(items, replyUrl, baseUrl);
    if (replyEntry) {
      results.push(parsedHEntryToTag(replyEntry, items, replyUrl, baseUrl));
    }
  }

  return results.map(result => `${result}\n\n`).join('');
}

export async function hEntryToTag(html, url) {
  const { items } = mf2(html, { baseUrl: url.toString() });
  return parsedHEntryToTag(findEntry(items, url, url), items, url, url);
}

async function parsedHEntryToTag(entry, items, url, baseUrl) {
  const previous = await previousEntryToTag(entry, items, baseUrl);

  const args = {};
  args.name = entry.properties.name?.[0];
  args.time = entry.properties.published?.[0];
  args.tags = entry.properties.category
    ?.map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
    ?.join(", ");

  let author = entry.properties.author?.[0] ?? getCard(items);
  if (typeof author === "string") {
    author = { type: ["h-card"], properties: { name: [author] } };
  }
  args.author =
    author?.properties?.nickname?.[0] ?? author?.properties?.name?.[0];
  args.authorUrl = resolveUrl(author?.properties?.url?.[0], baseUrl);
  args.authorAvatar =
    author?.properties?.photo?.[0] ?? author?.properties?.logo?.[0];
  if (typeof args.authorAvatar === "object") {
    args.authorAvatarAlt = args.authorAvatar.alt;
    args.authorAvatar = args.authorAvatar.value;
  }

  let inReplyTo = entry.properties["in-reply-to"]?.[0];
  if (typeof inReplyTo === "string") {
    inReplyTo = { type: ["h-cite"], properties: { url: [inReplyTo] } };
  }
  args.inReplyUrl = resolveUrl(inReplyTo?.properties?.url?.[0], baseUrl);
  args.inReplyName = inReplyTo?.properties?.name?.[0];
  args.inReplyAuthor = inReplyTo?.properties?.author?.[0];

  return previous + (
    "{% genericPost " +
    JSON.stringify(resolveUrl(entry.properties.url?.[0], baseUrl) ?? url) +
    ",\n" +
    Object.entries(args)
      .filter(([_, value]) => value)
      .map(([name, value]) => `    ${name}: ${JSON.stringify(value)}`)
      .join(",\n") +
    " %}\n" +
    (
      await prettier.format(entry.properties.content?.[0]?.html ?? "", {
        parser: "html",
        printWidth: 78,
      })
    )
      .trim()
      .replaceAll(/^/gm, "  ") +
    "\n{% endgenericPost %}"
  );
}
