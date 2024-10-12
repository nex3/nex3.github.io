import { JSDOM } from "jsdom";
import escapeHtml from "escape-html";
import { mf2 } from "microformats-parser";

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
  const container = JSDOM.fragment(
    `<div>${post.content}</div>`,
  ).firstElementChild;

  data.image ??= container.querySelector("img[src]")?.src;

  if (!post.content.includes("h-entry")) return { ...post, data };

  let url = post.url;
  const { items } = mf2(post.content, {
    baseUrl: new URL(url, "https://nex-3.com/").toString(),
  });

  const embeds = container.querySelectorAll(".h-entry");
  const replaceDataWithEmbed =
    embeds.length === 1 &&
    container.childElementCount === 1 &&
    container.firstElementChild.classList.contains("h-entry");
  const entries = items.filter(
    (item) => item.type.length === 1 && item.type[0] === "h-entry",
  );
  if (embeds.length != entries.length) {
    throw new Error(
      `JSDOM and mf2 detected a different number of h-entries for ${url}`,
    );
  }

  for (let i = 0; i < embeds.length; i++) {
    const entry = entries[i];
    const embed = embeds[i];
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
        if (embed.classList.contains(klass)) classes.push(klass);
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
                    ${
                      embed.classList.contains("ask-wrapper")
                        ? "asked"
                        : "wrote"
                    }:
                  </p>
                `
              : ""
          }
          ${link && !title ? `<data class="u-url" value="${link}"></data>` : ""}
          <div class="e-content">${prose}</div>
        </blockquote>
      `.replaceAll(/[ \n]+/g, " ");
    }

    const template = new JSDOM().window.document.createElement("template");
    template.innerHTML = prose;
    embed.replaceWith(template.content);
  }
  return { data, url, date: post.date, content: container.innerHTML };
}

/** Like {@link simplifyEmbeds}, but only returns the content. */
export function simplifyContent(content) {
  return simplifyEmbeds({ content }).content;
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
