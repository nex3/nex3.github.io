import { createPairedComponentPlugin } from "./base.js";
import { stripIndent } from "../type.js";

export default createPairedComponentPlugin(
  "image",
  (liquidEngine, description, url, alt, style) =>
    liquidEngine.renderFile("image", {
      description: stripIndent(description).trim(),
      url,
      alt,
      style,
    }),
);
