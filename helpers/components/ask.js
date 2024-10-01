import { createPairedComponentPlugin } from "./base.js";
import { stripIndent } from "../type.js";

export default createPairedComponentPlugin(
  "ask",
  (liquidEngine, contents, text, options) => {
    return liquidEngine.renderFile("components/ask", {
      contents: stripIndent(contents).trim(),
      text,
      ...options,
    });
  },
);
