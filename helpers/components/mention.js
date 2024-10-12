import { createUnpairedComponentPlugin } from "./base.js";

const knownMentions = {};
for (const person of [
  {
    name: "Christa",
    nickname: "OhPoorPup",
    url: "https://soundretro.co/",
    uid: "https://soundretro.co/",
  },
  {
    name: "Liz",
    nickname: "JhoiraArtificer",
    url: "https://seaslug.garden/",
    uid: "https://seaslug.garden/",
    photo:
      "https://seaslug.garden/wp-content/uploads/2024/09/lizseal-1024x1024.webp",
  },
  {
    name: "Lydia",
    nickname: "lydz",
    url: "https://lydz.gay/",
    uid: "https://lydz.gay/",
    photo: "https://lydz.gay/img/fsJohDi4CF-100.png",
  },
  {
    name: "Rose",
    nickname: "holomancy",
    url: "https://holomancy.neocities.org/",
    uid: "https://holomancy.neocities.org/",
    photo:
      "https://files.mastodon.social/accounts/avatars/113/168/433/261/726/485/original/8721d4919e0a65d7.png",
  },
  {
    name: "Stelle",
    nickname: "subspaceskater",
    url: "https://subspaceskater.com/",
    uid: "https://subspaceskater.com/",
    photo:
      "https://64.media.tumblr.com/6ba2d5140aaa120f51da07e0a0f8c57b/b67a552f15ed86e0-35/s96x96u_c1/a2251fda11d2ff229c9bd891905aaa9356d96e10.jpg",
  },
]) {
  if (person.name) knownMentions[person.name] = person;
  if (person.nickname) knownMentions[person.nickname] = person;
}

export default createUnpairedComponentPlugin(
  "mention",
  (liquidEngine, text, options) => {
    options ??= {};

    if ((options.name ?? options.nickname ?? text) in knownMentions) {
      const person = knownMentions[options.name ?? options.nickname ?? text];
      options.name ??= person.name;
      options.url ??= person.url;
      options.nickname ??= person.nickname;
      options.photo ??= person.photo;
    } else if (!options.name && !options.nickname) {
      options.name ??= text;
    }

    return liquidEngine.renderFile("components/mention", {
      text,
      ...options,
    });
  },
);
