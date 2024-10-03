import { JSDOM } from "jsdom";
import fetch from "node-fetch";
import * as prettier from "prettier";

export async function letterboxdTag(maybeRedirectUrl) {
  const reviewResponse = await fetch(maybeRedirectUrl);
  const url = reviewResponse.url;
  const { document } = new JSDOM(await reviewResponse.text(), { url }).window;

  const [, username, , filmSlug] = new URL(url).pathname.split("/");

  const dateLinks = document.querySelector(".date-links");
  const reviewMonth = dateLinks
    .querySelector("a:nth-child(1)")
    .textContent.trim();
  const reviewDay = dateLinks
    .querySelector("a:nth-child(2)")
    .textContent.trim();
  const reviewYear = dateLinks
    .querySelector("a:nth-child(3)")
    .textContent.trim();

  const args = {
    film: document.querySelector(".film-title-wrapper > a").textContent.trim(),
    year: document.querySelector(".film-title-wrapper .metadata").textContent,
    authorDisplayName: document
      .querySelector(".person-summary a.name span:first-child")
      .textContent.trim(),
    date: `${reviewDay} ${reviewMonth} ${reviewYear}`,
    avatar: new URL(
      document.querySelector(".avatar img").getAttribute("src"),
      url,
    ).toString(),
    supporter: document.querySelector(".badge.-patron")
      ? "patron"
      : usernameLink.querySelector(".badge.-pro")
        ? "pro"
        : null,
  };

  const ratingEl = document.querySelector(".rating");
  if (ratingEl) {
    const match = ratingEl.getAttribute("class")?.match(/rated-large-([0-9]+)/);
    if (match) args.rating = parseInt(match[1]) / 2;
  }

  const filmUrl = new URL(`https://letterboxd.com/film/${filmSlug}`);
  const filmResponse = await fetch(filmUrl);
  if (filmResponse) {
    const image = new JSDOM(await filmResponse.text(), {
      url: filmUrl,
    }).window.document.querySelector(".backdrop-wrapper");
    const urlString = image?.dataset["backdrop"];
    if (urlString) {
      args.image = new URL(urlString, reviewResponse.url);
    }
  }

  const posterUrl = new URL(
    `https://letterboxd.com/ajax/poster/film/${filmSlug}/hero/300x450/`,
  );
  const posterResponse = await fetch(posterUrl);
  if (posterResponse) {
    const poster = new JSDOM(await posterResponse.text(), {
      url: posterUrl,
    }).window.document.querySelector(".image:not(.hidden)");
    const urlString = poster?.getAttribute("src");
    if (urlString) {
      args.poster = new URL(urlString, reviewResponse.url);
    }
  }

  return (
    "{% letterboxd " +
    JSON.stringify(url.toString()) +
    ",\n" +
    Object.entries(args)
      .map(([name, value]) => `    ${name}: ${JSON.stringify(value)}`)
      .join(",\n") +
    " %}\n" +
    (
      await prettier.format(
        document.querySelector(".review.body-text > div > div").innerHTML,
        { parser: "html", printWidth: 78 },
      )
    )
      .trim()
      .replaceAll(/^/gm, "  ") +
    "\n{% endletterboxd %}"
  );
}
