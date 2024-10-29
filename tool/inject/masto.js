import "dotenv/config";
import escapeHtml from "escape-html";
import { createRestAPIClient } from "masto";
import fetch from "node-fetch";
import * as prettier from "prettier";

const masto = createRestAPIClient({
  url: "https://mastodon.social",
  accessToken: process.env["MASTO_TOKEN"],
});

export async function mastoTag(url) {
  const urlString = url.toString();

  const head = await fetch(urlString, {
    method: "HEAD",
    headers: {
      Accept:
        'application/ld+json; profile="https://www.w3.org/ns/activitystreams"',
    },
  });
  if (
    !head.ok ||
    !head.headers.get("Content-Type").startsWith("application/activity+json")
  ) {
    return null;
  }

  const response = await masto.v2.search.fetch({
    q: urlString,
    type: "statuses",
    resolve: true,
  });
  if (!response.statuses) return null;
  const status = response.statuses[0];

  const args = {};
  args.url = url.toString();
  args.author = status.account.displayName;
  args.authorUrl = status.account.url;
  args.authorAvatar = status.account.avatar;
  args.date = new Date(Date.parse(status.createdAt));

  let content = status.content;
  if (status.mediaAttachments.length > 1) {
    content += '<div class="image-gallery">';
  }
  for (const attachment of status.mediaAttachments) {
    switch (attachment.type) {
      case "image":
        content += `
          <a href="${escapeHtml(attachment.remote_url ?? attachment.url)}>
            <img
              src="${escapeHtml(attachment.preview_url ?? attachment.url)}"
              ${
                attachment.description
                  ? `alt="${escapeHtml(attachment.description)}"`
                  : ""
              }
            >
          </a>
        `;
        break;

      case "gifv":
      case "video":
        content += `
          <video
            src="${escapeHtml(attachment.url)}"
            ${
              attachment.preview_url
                ? `poster="${escapeHtml(attachment.preview_url)}"`
                : ""
            }
              ${
                attachment.description
                  ? `title="${escapeHtml(attachment.description)}"`
                  : ""
              }
            ${
              attachment.type === "gifv"
                ? "autoplay muted loop playsinline"
                : "controls"
            }
          ></video>
        `;
        break;

      case "audio":
        content += `
          <audio
            src="${escapeHtml(attachment.url)}"
            ${
              attachment.description
                ? `title="${escapeHtml(attachment.description)}"`
                : ""
            }
            controls
          ></audio>
        `;
        break;
    }
  }
  if (status.mediaAttachments.length > 1) {
    content += "</div>";
  }

  return (
    `{% genericPost ${JSON.stringify(urlString)},\n` +
    Object.entries(args)
      .filter(([_, value]) => value)
      .map(([name, value]) => `    ${name}: ${JSON.stringify(value)}`)
      .join(",\n") +
    " %}\n" +
    (
      await prettier.format(content, {
        parser: "html",
        printWidth: 78,
      })
    )
      .trim()
      .replaceAll(/^/gm, "  ") +
    "\n{% endgenericPost %}"
  );
}
