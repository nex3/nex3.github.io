---
reply: /blog/i-was-all-set-to-set/
tags: [meta, web, tumblr]
---

{% genericPost "/blog/i-was-all-set-to-set/",
    time: "2024-09-29T23:49:49Z",
    author: "Natalie",
    authorUrl: "/",
    authorAvatar: "/assets/avatar.webp" %}
  <p>
    I was all set to set up a custom Tumblr scraper so I could reblog art and
    stuff on here, but it turns out Tumblr already uses
    <a href="http://localhost:8080/blog/reblogging-posts-with-h-entry"
      >the h-entry microformat</a
    >
    out of the box! I don't have to do anything special at all! Except maybe to
    handle reblog chains, but that's something I should really do anyway.
  </p>
{% endgenericPost %}

## oops I lied

Actually it's just the theme {% mention "Taylor Titmouse", url: "https://taylor-titmouse.tumblr.com/", avatar: "https://64.media.tumblr.com/0068dc4475ce27fcf43893ab2d588ba4/a93b7dffadf65372-98/s128x128u_c1/d7224872c887550bae06b7777617227a37f13cc4.pnj" %} was using that has the right metadata. There's no way to get it for any arbitrary tumblr post. I'll have to write that custom scraper after all 😩

At least this post motivated me to come up with some sort of a story for reposts!
