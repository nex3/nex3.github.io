const { createPairedComponentPlugin } = require("./base");
const { stripIndent } = require("../type");

module.exports = createPairedComponentPlugin(
  "image",
  function (liquidEngine, description, url, alt, style) {
    console.log(description);
    return liquidEngine.renderFile("image", {
      description: stripIndent(description).trim(),
      url,
      alt,
      style,
    });
  },
);
