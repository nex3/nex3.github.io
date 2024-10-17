import { createUnpairedComponentPlugin } from "./base.js";

const knownMentions = {};
for (const person of [
  {
    givenName: "Blackle",
    familyName: "Mori",
    name: "Blackle Mori",
    url: "https://www.blackle-mori.com/",
    uid: "https://www.blackle-mori.com/",
    photo:
      "https://lethargic.talkative.fish/fileserver/01M8H3ETEZ71CY4QX9DW4TB7JM/attachment/original/01HR0N5F2THMKKF4MXF3M2PBXW.png",
  },
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
  {
    name: "Zandra",
    nickname: "ZandraVandra",
    url: "https://zandravandra.com/",
    uid: "https://zandravandra.com/",
    photo:
      "https://zandravandra.com/images/1000/10809271/zandravatar_blurry.jpg",
  },
]) {
  if (person.name) knownMentions[person.name] = person;
  if (person.givenName) knownMentions[person.givenName] = person;
  if (person.nickname) knownMentions[person.nickname] = person;
}

/** A map from JS-style field names to their h-card equivalents. */
const jsToHCard = {
  name: "p-name",
  givenName: "p-given-name",
  familyName: "p-family-name",
  nickname: "p-nickname",
  url: "u-url",
  uid: "u-uid",
  photo: "u-photo",
};

export default createUnpairedComponentPlugin(
  "mention",
  async (liquidEngine, text, options) => {
    const textClasses = [];
    const urlClasses = [];
    const additionalData = [];

    const person =
      knownMentions[
        options.name ?? options.nickname ?? options.givenName ?? text
      ] ?? (options.name || options.nickname ? {} : { name: text });

    const url = options.url ?? person.url;
    for (const [jsProp, hCardProp] of Object.entries(jsToHCard)) {
      const value = options[jsProp] ?? person[jsProp];
      if (!value) continue;
      if (text === value) {
        textClasses.push(hCardProp);
      } else if (url === value) {
        urlClasses.push(hCardProp);
      } else {
        additionalData.push([hCardProp, value]);
      }
    }

    return (
      await liquidEngine.renderFile("components/mention", {
        text,
        url,
        textClasses,
        urlClasses,
        additionalData,
      })
    ).trim();
  },
);
