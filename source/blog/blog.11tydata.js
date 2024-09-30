export const layout = "blog";
export const tags = ["blog"];
export const date = "git created";
export const author = "Natalie";

/**
 * Removes leading id (e.g. `001-`) from blog filenames.
 */
function getBlogSlug(page) {
  return page.fileSlug.replace(/^(\d*-)/, "");
}

export const permalink = (data) =>
  data.repost ? false : `/blog/${getBlogSlug(data.page)}/index.html`;
