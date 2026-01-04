export function permalink(data) {
  const match = data.page.fileSlug.match(/^(?:en_)?(.*?)(?:_en)?$/);
  return match[1] === 'Dark Souls III' ? `/ds3/info/index.html` : `/ds3/${match[1]}/index.html`;
}

export const layout = "ds3";
