import { JSDOM } from "jsdom";
import fetch from "node-fetch";
import * as prettier from "prettier";

export async function backloggdTag(url) {
  const reviewResponse = await fetch(url);
  const { document } = new JSDOM(await reviewResponse.text(), { url }).window;

  /** Resolves {@link local} as a string relative to {@link url}. Null-safe. */
  function resolveUrl(local) {
    if (!local) return local;
    return new URL(local, url).toString();
  }

  const args = {};
  args.avatar = resolveUrl(
    document.querySelector("#avatar img")?.getAttribute("src"),
  );
  args.backer = !!document.querySelector(".review-card .backer-badge");

  const gameLink = document.querySelector(".review-game-link");
  args.game = gameLink.textContent;
  const gameUrl = (args.gameUrl = resolveUrl(gameLink.getAttribute("href")));

  const dateText = document
    .querySelector(".review-bottom-bar > :last-child")
    .textContent.trim();
  if (!dateText.startsWith("Reviewed on")) {
    throw new Error(`Unexpected date text "${dateText}"`);
  }
  args.date = new Date(
    Date.parse(dateText.substring("Reviewed on ".length)),
  ).toISOString();

  let poster = resolveUrl(
    document.querySelector(".game-cover img")?.getAttribute("src"),
  );
  if (poster && !poster.includes("/no_image-")) args.poster = poster;

  const stars = document.querySelector(".stars-top");
  args.rating = stars
    ? parseInt(stars.style["width"].slice(0, -1)) / 20
    : undefined;

  const statusLink = document.querySelector(".game-status a");
  args.status = statusLink?.textContent.trim();
  args.statusUrl = statusLink
    ? resolveUrl(statusLink.getAttribute("href"))
    : undefined;

  const platformLink = document.querySelector(".review-platform");
  args.platform = platformLink?.textContent.trim();
  args.platformUrl = platformLink
    ? resolveUrl(platformLink.getAttribute("href"))
    : undefined;

  const gameResponse = await fetch(gameUrl);
  const gameDocument = new JSDOM(await gameResponse.text(), { url: gameUrl })
    .window.document;

  const image = gameDocument.querySelector("#artwork-high-res");
  if (image)
    args.image = new URL(image.getAttribute("src"), gameUrl).toString();

  return (
    "{% backloggd " +
    JSON.stringify(url.toString()) +
    ",\n" +
    Object.entries(args)
      .filter(([_, value]) => value)
      .map(([name, value]) => `    ${name}: ${JSON.stringify(value)}`)
      .join(",\n") +
    " %}\n" +
    (
      await prettier.format(
        document.querySelector(".review-body > div > div > div").innerHTML,
        { parser: "html", printWidth: 78 },
      )
    )
      .trim()
      .replaceAll(/^/gm, "  ") +
    "\n{% endbackloggd %}"
  );
}
