import { createPairedComponentPlugin } from "./base.js";
import { stripIndent } from "../type.js";

export default createPairedComponentPlugin(
  "image",
  (liquidEngine, contents, url, options) => {
    const [description, caption] = stripIndent(contents)
      .split("===")
      .map((text) => text.trim())
      .map((text) => (text === "" ? undefined : text));

    return liquidEngine.renderFile("components/image", {
      description,
      caption,
      url,
      link: options?.link,
      alt: options?.alt,
      title: options?.title,
      style: options?.style,
    });
  },
);
