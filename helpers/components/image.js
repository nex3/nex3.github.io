import { createPairedComponentPlugin } from "./base.js";
import { stripIndent } from "../type.js";

export default createPairedComponentPlugin(
  "image",
  (liquidEngine, description, url, options) => {
    description = stripIndent(description).trim();
    if (description.length === 0) description = undefined;
    return liquidEngine.renderFile("image", {
      description,
      url,
      alt: options?.alt,
      style: options?.style,
    });
  },
);
