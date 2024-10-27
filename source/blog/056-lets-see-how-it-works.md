---
tags: [rss, web]
---

{% genericPost "https://postnow.site/",
    title: "An Annoying thing about feed readers",
    date: "2024-10-08T20:15:09-0500",
    tags: "#rss",
    author: "bcj",
    reply: true %}
  <p>
    I've put some effort into making my site look as close to not bad as I know
    and to make things from friends I reply to look distinct and then feedbin
    just presents it as largely-unstyled text. Hmm, I guess technically my own
    feed is probably missing most of that styling now that I think about it
  </p>
  
  <p>
    My friends have spent time making their pages look actually good and then
    unless I click through I don't get to see that.
  </p>
  
  <p>I guess I could consider a deeper look at alternative feed readers</p>
{% endgenericPost %}

yeah I add inline styles and everything to make my embeds look nice in the
pared-down feed reader rendering, and my reader just strips everything. not even
a token effort to allowlist safe styles. it _will_ load iframes though! insane
