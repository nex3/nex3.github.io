---
tags: [android, enshittification]
---

{% genericPost "https://nex-3.com/blog/so-apparently-you-cant/",
    date: "2024-10-07T09:20:57Z",
    tags: "#android, #enshittification",
    author: "Natalie",
    authorAvatar: "/assets/avatar.webp",
    authorUrl: "https://nex-3.com/",
    reply: true %}
  <p>
    so apparently you can't add a bookmark of a particular page to your home
    screen on Android if that page happens to be on a site that supports being a
    progressive web app. it'll just always take you to the site root
  </p>
{% endgenericPost %}

{% genericPost "https://app.commentbox.io/5765991539671040-proj?id=commentbox&url=https%3A%2F%2Fnex-3.com%2Fblog%2Fso-apparently-you-cant%2F%23commentbox&tlc_param=tlc&background_color=&text_color=&subtext_color=&sort_order=oldest#dd4fe67e3a48c37a5acfc318ed14c462",
    date: "2024-10-08T12:29:53.518Z",
    author: "effika",
    inReplyUrl: "https://nex-3.com/blog/so-apparently-you-cant/",
    inReplyAuthor: "Natalie" %}
  <p>The solution I use: turn on Airplane mode, then try to load the site. Firefox will, of course, be unable to load it, but you can still add a shortcut to the homescreen. Doing it this way means you block the PWA manifest that it's loading that takes away all the reasons you loaded it in a web win the first place.</p>

  <p>If that doesn't work, you can also put a rule in uBlock to block it, clear all the caches/cookies, and try again. If you need that rule let me know I will grab it.</p>
{% endgenericPost %}

holy shit it worked
