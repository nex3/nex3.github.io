let articles = document.querySelectorAll("article:not(article *)");
if (articles.length === 0) articles = [document.querySelector("main")];
if (!articles[0]) articles = [];

for (const article of articles) {
  const images = article.querySelectorAll(`
    figure:not(.no-popup) > a > img,
    .blog-prose > a > img,
    .blog-prose > p > a > img,
    .image-gallery a > img
  `);
  if (images.length === 0) continue;

  const links = [...images].map((image) => image.parentElement);
  let lightbox;
  lightbox = GLightbox({
    elements: links.map((link, i) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        lightbox.openAt(i);
      });

      const result = { href: link.href };

      const figure = images[i].parentElement.parentElement;
      if (figure.tagName === "FIGURE") {
        caption = figure.children[1];
        if (caption && caption.tagName === "FIGCAPTION") {
          result.description = caption.innerHTML;
        }
      }

      return result;
    }),
  });
}

for (const form of document.querySelectorAll(".wm-form")) {
  form.addEventListener("submit", async (e) => {
    if (e.defaultPrevented) return;
    e.preventDefault();
    const url = e.target.querySelector("input[type=url]");
    const submit = e.target.querySelector("input[type=submit]");
    const fieldset = e.target.querySelector("fieldset");

    // No point in awaiting this, we can't see any information from it anyway
    // thanks to `mode: 'no-cors'`. We have to construct `new FormData()` before
    // we disable the fieldset or those entries won't be available.
    fetch(e.target.action, {
      method: e.target.method,
      mode: "no-cors",
      body: new FormData(e.target),
    });

    url.value = "";
    submit.value = "Sent!";
    fieldset.disabled = true;
    setTimeout(() => {
      fieldset.disabled = false;
      submit.value = "Send";
    }, 2000);
  });
}

// If the browser has autoplay disabled for whatever reason, allow the user to
// request play via the video controls.
for (const video of document.querySelectorAll(
  "video[autoplay]:not([controls])",
)) {
  if (video.paused) {
    const callback = () => {
      video.play();
      video.removeEventListener("click", callback);
    };
    video.addEventListener("click", callback);
  }
}
