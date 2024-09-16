let articles = document.querySelectorAll("article");
if (articles.length === 0) articles = [document.querySelector("main")];
if (!articles[0]) articles = [];

for (const article of articles) {
  const images = article.querySelectorAll("figure > a > img, :scope > a > img");
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
        if (caption.tagName === "FIGCAPTION") {
          result.description = caption.innerHTML;
        }
      }

      return result;
    }),
  });
}
