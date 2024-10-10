---
tags: [ask, web]
---

{% ask 'Ryan',
    url: 'https://fools-pyrite.com/',
    avatar: 'https://fools-pyrite.com/img/profile.png' %}
  Have you played with [WebC](https://www.11ty.dev/docs/languages/webc/)? Like a lot of 11ty stuff they're not super well documented, but they seem like a good way to do code reuse without having to send JS to the browser (unlike web components or HTMX or things like that). I recently ported my blog over and while there's some weirdness that I had to get over, they're a good experience overall.
{% endask %}

I haven't seen this, and it does look pretty cool. I appreciate a take on the
web component idea that's legitimately built around running on the server and
sending down normal HTML. That said, while I'm *also* not a huge fan of web
components as a dev pattern either. I tend to pass a bunch of parameters to my
components and that's intrinsically kind of messy with HTML.

I'm also rotating in my mind the possibility of pulling some of my embed logic
out into re-usable packages, and if I do that I'd like to make them as
general-purpose as possible. The less I can lock them into the Eleventy
ecosystem, the happier I am, and this seems *very* tightly bound to 11ty.
