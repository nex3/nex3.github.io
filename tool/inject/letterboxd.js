import * as cheerio from "cheerio";
import fetch from "node-fetch";
import * as prettier from "prettier";

export async function letterboxdTag(maybeRedirectUrl) {
  const reviewResponse = await fetch(maybeRedirectUrl);
  const url = reviewResponse.url;
  const $ = cheerio.load(await reviewResponse.text(), { baseUrl: url });

  const [, username, , filmSlug] = new URL(url).pathname.split("/");

  const dateLinks = $(".date-links");
  const reviewMonth = dateLinks.find("a:nth-child(1)").text().trim();
  const reviewDay = dateLinks.find("a:nth-child(2)").text().trim();
  const reviewYear = dateLinks.find("a:nth-child(3)").text().trim();

  const args = {
    film: $(".-film .name a").text().trim(),
    year: $(".-film .releasedate a").text(),
    authorDisplayName: $(".person-summary a.name span:first-child")
      .text()
      .trim(),
    date: `${reviewDay} ${reviewMonth} ${reviewYear}`,
    avatar: new URL($(".avatar img").attr("src"), url).toString(),
    supporter:
      $(".badge.-patron").length > 0
        ? "patron"
        : $(".badge.-pro").length > 0
          ? "pro"
          : null,
  };

  const ratingEl = $(".rating");
  if (ratingEl) {
    const match = ratingEl.attr("class")?.match(/rated-large-([0-9]+)/);
    if (match) args.rating = parseInt(match[1]) / 2;
  }

  const filmUrl = new URL(`https://letterboxd.com/film/${filmSlug}`);
  const filmResponse = await fetch(filmUrl);
  if (filmResponse) {
    const text = await filmResponse.text();
    const image = cheerio.load(text, {
      baseUrl: filmUrl,
    })(".backdrop-container #backdrop");
    console.log({image: image.html()});
    const urlString = image.data("backdrop");
    if (urlString) args.image = new URL(urlString, filmUrl);
  }

  const filmId = $("[data-film-id]").data("film-id");
  args.poster = "https://a.ltrbxd.com/resized/film-poster/" +
    filmId.toString().split('').join('/') +
    `/${filmId}-${filmSlug}-0-150-0-225-crop.jpg`;

  return (
    "{% letterboxd " +
    JSON.stringify(url.toString()) +
    ",\n" +
    Object.entries(args)
      .map(([name, value]) => `    ${name}: ${JSON.stringify(value)}`)
      .join(",\n") +
    " %}\n" +
    (
      await prettier.format($(".review .body-text > div > div").html(), {
        parser: "html",
        printWidth: 78,
      })
    )
      .trim()
      .replaceAll(/^/gm, "  ") +
    "\n{% endletterboxd %}"
  );
}
