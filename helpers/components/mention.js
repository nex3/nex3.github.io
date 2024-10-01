import { createUnpairedComponentPlugin } from "./base.js";

const knownMentions = {};
for (const person of [
  {
    name: "Liz",
    nickname: "JhoiraArtificer",
    url: "https://seaslug.garden/",
    uid: "https://seaslug.garden/",
    logo: "https://seaslug.garden/wp-content/uploads/2024/09/lizseal-1024x1024.webp",
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
      options.logo ??= person.logo;
    } else if (!options.name && !options.nickname) {
      options.name ??= text;
    }

    return liquidEngine.renderFile("components/mention", {
      text,
      ...options,
    });
  },
);
