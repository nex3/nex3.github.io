export function permalink(data) {
  const match = data.page.fileSlug.match(/^(?:en_)?(.*?)(?:_en)?$/);
  return match[1] === "Dark Souls III"
    ? `/ds3-preview/info/index.html`
    : `/ds3-preview/${match[1]}/index.html`;
}

export const layout = "ds3";
