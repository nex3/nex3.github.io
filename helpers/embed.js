import * as cheerio from "cheerio";
import escapeHtml from "escape-html";
import { mf2 } from "microformats-parser";

/**
 * Returns the h-entry in {@link items} with URL {@link urlToFind}.
 *
 * Returns null if there is no matching entry and throws an error if it's
 * ambiguous.
 */
export function findEntry(items, urlToFind, baseUrl) {
  let candidates = items.filter(
    (item) =>
      item.type.includes("h-entry") &&
      (item.properties.url ?? []).some(
        (url) => new URL(url, baseUrl).toString() == urlToFind,
      ),
  );
  if (candidates.length === 0) {
    candidates = items.filter((item) => item.type.includes("h-entry"));
  }
  if (candidates.length < 2) return candidates[0] ?? null;
  throw new Error(
    `URL ${url} has multiple top-level h-entries with matching URL`,
  );
}

/** Converts the MF2 metadata for an h-card item to HTML. */
function serializeHCard(item) {
  var html = `<strong class="p-author ${item.type[0]}">`;

  for (const property of ["p-nickname", "u-uid", "u-logo", "u-photo"]) {
    if (property === "p-nickname" && !item.properties.name?.[0]) {
      continue;
    }

    const unprefixed = property.split("-")[1];
    for (let value of item.properties[unprefixed] ?? []) {
      if (typeof value === "object") value = value.value;
      value = escapeHtml(value.toString());
      html += `<data class="${property}" value="${value}"></data>`;
    }
  }

  const url = item.properties.url?.[0];
  if (url) html += `<a class="u-url" href="${escapeHtml(url)}">`;
  html +=
    '<span class="p-name">' +
    escapeHtml(item.properties.name?.[0] ?? item.properties.nickname?.[0]) +
    "</span>";
  if (url) html += "</a>";
  return html + "</strong>";
}

/**
 * Returns a version of {@link post} where embeds are simplified into a format
 * with basic inline CSS.
 *
 * If there's only a single embed and no other content, this replaces the post's
 * metadata with that of the embed.
 */
export function simplifyEmbeds(post) {
  const data = { ...post.data };
  const $ = cheerio.load(post.content, null, false);

  data.image ??= $("img[src]")?.attr("src");

  if (!$(".h-entry").length) return { ...post, data };

  let url = post.url;
  const { items } = mf2(post.content, {
    baseUrl: new URL(url, "https://nex-3.com/").toString(),
  });

  $(".remove-from-simplified").replaceWith(
    "<p><em>(Removed from simplified view)</em></p>",
  );

  const embeds = $(".h-entry:not(.h-entry *)");
  const replaceDataWithEmbed =
    embeds.length === 1 &&
    $.root().children().length === 1 &&
    $.root().children().first().hasClass("h-entry");
  const entries = items.filter(
    (item) => item.type.length === 1 && item.type[0] === "h-entry",
  );
  if (embeds.length != entries.length) {
    throw new Error(
      `Cheerio and mf2 detected a different number of h-entries for ${url}`,
    );
  }

  for (let i = 0; i < embeds.length; i++) {
    const entry = entries[i];
    const embed = $(embeds[i]);
    let prose = entry.properties.content?.[0]?.html ?? "";

    let author = entry.properties.author?.[0];
    if (typeof author === "string") {
      author = { type: ["h-card"], properties: { name: [author] } };
    }
    let authorName = author.properties.name?.[0];
    let authorNickname = author.properties.nickname?.[0];
    let authorUrl = author.properties.url?.[0];
    let authorLogo = author.properties.logo?.[0];
    if (typeof authorLogo === "object") authorLogo = authorLogo.url;
    let authorPhoto = author.properties.photo?.[0];
    if (typeof authorPhoto === "object") authorLogo = authorLogo.url;

    const title = entry.properties.name?.[0];
    const link = entry.properties.url?.[0];
    if (replaceDataWithEmbed) {
      if (title) data.title = title;
      if (link) url = link;
      if (authorName) {
        data.author = {
          name: authorName,
          url: authorUrl,
        };
      }
    } else {
      if (title) {
        let titleHtml = '<h1 class="p-name">';
        if (link) titleHtml += `<a class="u-url" href="${link}">`;
        titleHtml += escapeHtml(title);
        if (link) titleHtml += "</a>";
        titleHtml += "</h1>";
        prose = titleHtml + "\n" + prose;
      }

      const classes = ["h-entry"];
      for (const klass of ["u-repost-of", "u-in-reply-to"]) {
        if (embed.hasClass(klass)) classes.push(klass);
      }
      prose = `
        <blockquote class="${classes.join(" ")}" style="
          padding: 0.75rem;
          margin: 1rem 0.2rem 1.15rem;
          border-radius: 0.5rem;
          box-shadow:
            0px 4px 5px rgba(0, 0, 0, 0.14),
            0px 1px 10px rgba(0, 0, 0, 0.12),
            0px 2px 4px rgba(0, 0, 0, 0.2);
        ">
          ${
            author
              ? `
                  <p>
                    ${serializeHCard(author)}
                    ${embed.hasClass("ask-wrapper") ? "asked" : "wrote"}:
                  </p>
                `
              : ""
          }
          ${link && !title ? `<data class="u-url" value="${link}"></data>` : ""}
          <div class="e-content">${prose}</div>
        </blockquote>
      `.replaceAll(/[ \n]+/g, " ");
    }

    embed.replaceWith(prose);
  }

  // Simplify figures by removing value-add elements that often render poorly in
  // RSS readers.
  $("figure figcaption :is(.h-cite, details)").remove();

  return { data, url, date: post.date, content: $.html() };
}

/**
 * Like {@link simplifyEmbeds}, but only returns the content and strips any
 * initial embeds it contains.
 */
export function simplifyContent(content, baseUrl = "https://nex-3.com/") {
  return simplifyEmbeds({ content: stripInitialEmbeds(content, baseUrl) })
    .content;
}

/**
 * Removes any h-entry or h-cite embeds from the beginning of {@link content}.
 */
export function stripInitialEmbeds(content, baseUrl) {
  if (!content.includes("h-entry") && !content.includes("h-cite")) {
    return content;
  }

  const $ = cheerio.load(content, null, false);
  for (const child of $.root().children().toArray().map($)) {
    if (!child.is(".h-entry, .h-cite")) break;

    // Don't omit URL-less embeds like asks, because they don't have a
    // canonical location elsewhere.
    const { items } = mf2($.html(child), { baseUrl });
    const urls = items[0]?.properties?.url;
    if (!urls) break;

    const fragment = cheerio.load("", null, false);
    for (const url of urls) {
      fragment.root().append(
        $("<link>")
          .attr("href", url)
          .attr(
            "class",
            child
              .attr("class")
              .replace(/(\s|^)+(?!u-)([^\s\\]|\\[a-fA-F0-9]{1,6} ?)+/g, ""),
          ),
      );
    }
    child.replaceWith(fragment);
  }

  return $.html();
}

/** Returns url of the last h-entry {@link content}. */
function lastLink(content, url) {
  const { items } = mf2(content, {
    baseUrl: new URL(url || null, "https://nex-3.com/").toString(),
  });
  return items
    .filter((item) => item.type.length === 1 && item.type[0] === "h-entry")
    .at(-1).properties.url[0];
}

export default function embedPlugin(eleventyConfig) {
  eleventyConfig.addLiquidFilter("lastLink", lastLink);
  eleventyConfig.addLiquidFilter("simplifyEmbeds", simplifyEmbeds);
  eleventyConfig.addLiquidFilter("simplifyContent", simplifyContent);
}
