import { createPairedComponentPlugin } from "./base.js";
import { viaOptions } from "./mention.js";
import { stripIndent } from "../type.js";

export default createPairedComponentPlugin(
  "image",
  (liquidEngine, contents, url, options) => {
    const [description, caption] = stripIndent(contents)
      .split("===")
      .map((text) => text.trim())
      .map((text) => (text === "" ? undefined : text));
    const via = options.via ? viaOptions(options) : undefined;

    return liquidEngine.renderFile("components/image", {
      ...options,
      description,
      caption,
      url,
      via,
    });
  },
);
