import * as cheerio from "cheerio";
import fetch from "node-fetch";
import * as prettier from "prettier";

export async function backloggdTag(url) {
  const reviewResponse = await fetch(url);
  const $ = cheerio.load(await reviewResponse.text(), { baseUrl: url });

  /** Resolves {@link local} as a string relative to {@link url}. Null-safe. */
  function resolveUrl(local, baseUrl = url) {
    if (!local) return local;
    return new URL(local, baseUrl).toString();
  }

  const args = {};
  args.avatar = resolveUrl($("#avatar img").attr("src"));
  args.backer = !!$(".review-card .backer-badge").length;

  const gameLink = $(".review-game-link");
  args.game = gameLink.text();
  const gameUrl = (args.gameUrl = resolveUrl(gameLink.attr("href")));

  const dateText = $(".review-bottom-bar > :last-child").text().trim();
  if (!dateText.startsWith("Reviewed on")) {
    throw new Error(`Unexpected date text "${dateText}"`);
  }
  args.date = new Date(
    Date.parse(dateText.substring("Reviewed on ".length)),
  ).toISOString();

  let poster = resolveUrl($(".game-cover img").attr("src"));
  if (poster && !poster.includes("/no_image-")) args.poster = poster;

  const stars = $(".stars-top");
  args.rating = stars.length
    ? parseInt(stars.css().width.slice(0, -1)) / 20
    : undefined;

  const statusLink = $(".game-status a");
  args.status = statusLink.text().trim() || undefined;
  args.statusUrl = resolveUrl(statusLink.attr("href"));

  const platformLink = $(".review-platform");
  args.platform = platformLink.text().trim() || undefined;
  args.platformUrl = resolveUrl(platformLink.attr("href"));

  const gameResponse = await fetch(gameUrl);
  const game$ = cheerio.load(await gameResponse.text(), { baseUrl: gameUrl });
  const image = game$("#artwork-high-res");
  args.image = resolveUrl(image.attr("src"), gameUrl);

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
      await prettier.format($(".review-body > div > div > div").html(), {
        parser: "html",
        printWidth: 78,
      })
    )
      .trim()
      .replaceAll(/^/gm, "  ") +
    "\n{% endbackloggd %}"
  );
}
