import { JSDOM } from "jsdom";
import escapeHtml from "escape-html";

/**
 * Returns a version of {@link post} where embeds are simplified into a format
 * with basic inline CSS.
 *
 * If there's only a single embed and no other content, this replaces the post's
 * metadata with that of the embed.
 */
export function simplifyEmbeds(post) {
  if (!post.content.includes("embed")) return post;

  const data = { ...post.data };
  let url = post.url;
  const container = JSDOM.fragment(
    `<div>${post.content}</div>`,
  ).firstElementChild;

  const embeds = container.querySelectorAll(".embed");
  const replaceDataWithEmbed =
    embeds.length === 1 &&
    container.childElementCount === 1 &&
    container.firstElementChild.classList.contains("embed");
  for (const embed of embeds) {
    let prose = embed.querySelector(".embed-prose").innerHTML;

    const image = embed.querySelector(".embed-image");
    if (image) {
      if (image.classList.contains("embed-image-horizontal")) {
        image.style.display = "block";
        image.style.width = "100%";
        image.style.marginBottom = "1rem";
      } else {
        image.style.float = "left";
        image.style.maxWidth = "150px";
        image.style.marginTop = "1rem";
        image.style.marginRight = "1rem";
        image.style.borderRadius = "75px";
      }
    }

    const title = embed.querySelector(".embed-title");
    const link = embed.querySelector(".embed-link");
    if (replaceDataWithEmbed) {
      if (title) data.title = title.textContent;
      if (link) url = link.href;
      if (image) prose = image.outerHTML + " " + prose;
    } else {
      if (title) {
        let titleHtml = "<h1>";
        if (link) titleHtml += `<a href="${link.href}">`;
        titleHtml += escapeHtml(title.textContent);
        if (link) titleHtml += "</a>";
        titleHtml += "</h1>";
        prose = titleHtml + "\n" + prose;
      }
      if (image) prose = image.outerHTML + "\n" + prose;
      prose = `
        <div style="
          padding: 0.75rem;
          margin: 1rem 0.2rem 1.15rem;
          border-radius: 0.5rem;
          box-shadow:
            0px 4px 5px rgba(0, 0, 0, 0.14),
            0px 1px 10px rgba(0, 0, 0, 0.12),
            0px 2px 4px rgba(0, 0, 0, 0.2);
        ">${prose}</div>
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

export default function embedPlugin(eleventyConfig) {
  eleventyConfig.addLiquidFilter("simplifyEmbeds", simplifyEmbeds);
  eleventyConfig.addLiquidFilter("simplifyContent", simplifyContent);
}
