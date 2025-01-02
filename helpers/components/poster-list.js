import { createUnpairedComponentPlugin } from "./base.js";

// Letterboxd scrape (make sure all posters are loaded):
//
// navigator.clipboard.writeText($$(".poster-container .poster").map(poster => {
//   const year = poster.dataset.filmReleaseYear;
//   const json = JSON.stringify([
//     year
//         ? `${poster.dataset.filmName} (${year})`
//         : poster
//             .querySelector('a.frame')
//             .dataset
//             .originalTitle
//             .replace(/\) [★½].*/, ')'),
//     `https://letterboxd.com${poster.dataset.filmLink}`,
//     poster.querySelector('img.image').src,
//   ], undefined, 1).replaceAll('\n', '');
//   return json.substring(2, json.length - 1);
// }).join(",\n  "));

// Backloggd scrape:
//
//
// navigator.clipboard.writeText($$(".game-cover").map(cover => {
//   const json = JSON.stringify([
//     cover.getElementsByClassName("game-text-centered")[0].innerText,
//     cover.getElementsByClassName("cover-link")[0].href,
//     cover.getElementsByClassName("card-img")[0].src
//   ], undefined, 1).replaceAll('\n', '');
//   return json.substring(2, json.length - 1);
// }).join(",\n  "));

export default createUnpairedComponentPlugin(
  "posterList",
  async (liquidEngine, ...posters) => {
    const options = posters.pop();

    const posterObjects = [];
    for (let i = 0; i < posters.length; i += 3) {
      posterObjects.push({
        name: posters[i],
        url: posters[i + 1],
        image: posters[i + 2],
      });
    }

    return (
      await liquidEngine.renderFile("components/poster-list", {
        posters: posterObjects,
      })
    ).trim();
  },
);
