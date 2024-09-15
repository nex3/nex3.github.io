---
author: Natalie
date: 2024-09-13 23:23:00 -8
tags:
- meta
- cohost
- cohost repost
---

I added the ability to automatically pull down and embed Cohost posts. I just
paste the URL on its own line and my automation takes care of the rest (checking
it in so it doesn't need to make a separate request each time the build runs).
Hopefully this will be the first of many sites I do that with: I want to see if
I can integrate the notion of the Tumblr-style "reblog" with a more traditional
site-specific blog structure.

In celebration, please enjoy a post I still think back on and chuckle:

{% cohostPost "https://cohost.org/nex3/post/580430-breaking-in-an",
    displayName: "Natalie",
    time: "2022-12-09T21:15:20.292Z",
    commentCount: 3 %}
  <p><strong>Breaking:</strong> In an effort to push video game enthusiasts to take graphical fidelity less seriously, the Academy of the English Language issued a ruling today that the term "4K" will be officially pronounced "forkie". This ruling is effective immediately for governmental sources, but non-government entities have until the third of February to update their materials before facing fines from the FCC, CRTC, Ofcom, or other relevant regulatory body.</p>
  <p>Immediately afterwards, California-based studio 2K Games issued a press release saying "Fuck dude we really dodged a bullet there. Goddamn can you imagine"</p>
{% endcohostPost %}

