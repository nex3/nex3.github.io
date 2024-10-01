import { JSDOM } from "jsdom";
import escapeHtml from "escape-html";
import { mf2 } from "microformats-parser";

/** Converts the MF2 metadata for an h-card item to invisible HTML. */
function serializeHCard(item) {
  var html = `<div class="p-author ${item.type[0]}">`;
  for (const property of [
    "p-name",
    "p-nickname",
    "u-url",
    "u-uid",
    "u-logo",
    "u-photo",
  ]) {
    const unprefixed = property.split("-")[1];
    for (const value of item.properties[unprefixed] ?? []) {
      html += `<data class="${property}" value=${escapeHtml(value)}></data>`;
    }
  }
  return html + "</div>";
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
    let prose = entry.properties.content?.[0]?.html ?? "";

    let author = entry.properties.author?.[0];
    if (typeof author === "string") {
      author = { type: ["h-card"], properties: { name: [author] } };
    }
    let authorName = author.properties.name?.[0];
    let authorNickname = author.properties.nickname?.[0];
    let authorUrl = author.properties.url?.[0];
    let authorLogo = author.properties.logo?.[0];
    let authorPhoto = author.properties.logo?.[0];

    let image = entry.properties.featured?.[0];
    let imageHtml;
    if (image) {
      imageHtml = `
        <img
          src="${image}"
          width="150"
          style="
            float: left;
            width: auto;
            max-width: 150px;
            margin-top: 1rem;
            margin-right: 1rem;
          "
          ${
            replaceDataWithEmbed && entry.properties.featured?.[0]
              ? 'class="u-featured"'
              : ""
          }
        >
      `.replaceAll(/[ \n]+/g, " ");
    } else {
      image = author?.properties?.photo?.[0] ?? author?.properties?.logo?.[0];

      if (image) {
        imageHtml = `
          <img src="${image}" width="64" style="
            float: left;
            width: auto;
            max-width: 64px;
            margin-top: 1rem;
            margin-right: 1rem;
            border-radius: 32px;
          ">
        `.replaceAll(/[ \n]+/g, " ");
      }
    }

    const title = entry.properties.name?.[0];
    const link = entry.properties.url?.[0];
    if (replaceDataWithEmbed) {
      if (title) data.title = title;
      if (link) url = link;
      if (imageHtml) prose = imageHtml + " " + prose;
      if (authorName) {
        data.author = {
          name: authorName,
          url: authorUrl,
        };
      }
    } else {
      const urlClass = entry.properties["repost-of"]?.[0]
        ? "u-url u-repost-of"
        : "u-url";
      if (title) {
        let titleHtml = '<h1 class="p-name">';
        if (link) titleHtml += `<a class="${urlClass}" href="${link}">`;
        titleHtml += escapeHtml(title);
        if (link) titleHtml += "</a>";
        titleHtml += "</h1>";
        prose = titleHtml + "\n" + prose;
      }
      if (imageHtml) prose = imageHtml + "\n" + prose;
      prose = `
        <div class="h-entry" style="
          padding: 0.75rem;
          margin: 1rem 0.2rem 1.15rem;
          border-radius: 0.5rem;
          box-shadow:
            0px 4px 5px rgba(0, 0, 0, 0.14),
            0px 1px 10px rgba(0, 0, 0, 0.12),
            0px 2px 4px rgba(0, 0, 0, 0.2);
        ">
          ${
            link && !title
              ? `<data class="${urlClass}" value="${link}"></data>`
              : ""
          }
          ${author ? serializeHCard(author) : ""}
          <div class="e-content">${prose}</div>
        </div>
      `.replaceAll(/[ \n]+/g, " ");
    }

    const template = new JSDOM().window.document.createElement("template");
    template.innerHTML = prose;
    embeds[i].replaceWith(template.content);
  }
  return { data, url, date: post.date, content: container.innerHTML };
}

/** Like {@link simplifyEmbeds}, but only returns the content. */
export function simplifyContent(content) {
  return simplifyEmbeds({ content }).content;
}

export default function embedPlugin(eleventyConfig) {
  eleventyConfig.addLiquidFilter("simplifyEmbeds", simplifyEmbeds);
  eleventyConfig.addLiquidFilter("simplifyContent", simplifyContent);
}
