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

export async function hEntryToTag(html, url) {
  const { items } = mf2(html, { baseUrl: url.toString() });

  const entries = items.filter(
    (item) => item.type.length === 1 && item.type[0] === "h-entry",
  );
  if (entries.length == 0) return null;
  if (entries.length > 1) {
    throw new Error(`URL ${url} has multiple top-level h-entries`);
  }
  const entry = entries[0];

  const args = {};
  args.name = entry.properties.name?.[0];
  args.time = entry.properties.published?.[0];
  args.tags = entry.properties.category?.map((tag) => `#${tag}`)?.join(", ");

  let author = entry.properties.author?.[0] ?? getCard(items);
  if (typeof author === "string") {
    author = { type: ["h-card"], properties: { name: [author] } };
  }
  args.author =
    author?.properties?.nickname?.[0] ?? author?.properties?.name?.[0];
  args.authorUrl = author?.properties?.url?.[0];
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
  args.inReplyUrl = inReplyTo?.properties?.url?.[0];
  args.inReplyName = inReplyTo?.properties?.name?.[0];
  args.inReplyAuthor = inReplyTo?.properties?.author?.[0];

  return (
    "{% genericPost " +
    JSON.stringify(entry.properties.url?.[0] ?? url) +
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
