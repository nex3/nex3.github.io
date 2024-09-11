const { createPairedComponentPlugin } = require("./base");
const { stripIndent } = require("../type");

module.exports = createPairedComponentPlugin(
  "image",
  (liquidEngine, description, url, alt, style) =>
    liquidEngine.renderFile("image", {
      description: stripIndent(description).trim(),
      url,
      alt,
      style,
    }),
);
