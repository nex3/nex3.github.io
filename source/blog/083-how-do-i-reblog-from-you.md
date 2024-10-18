---
tags: [ask, web, meta]
---

{% ask 'Obspogon',
    title: 'How do I reblog from you, webmention style?',
    url: 'https://obspogon.neocities.org/',
    avatar: 'https://obspogon.neocities.org/pics/profile.jpg' %}
  I want to test out webmentions since I added h-card markup to my blog 
  thanks to your posts. How do I reblog a post from you? What HTML and 
  classes do I use? I'm using a static site generator.
{% endask %}

I'll make a more thorough post about this at some point, but the short answer is
that all you _really_ need to do is tell my Webmention receiver the URL to your
post and the URL to the post it's reblogging. You can do that manually by
pasting the link to your post in the little webmention form beneath each of
mine, or automatically by hooking up your blog's RSS feed to [webmention.app].

[webmention.app]: https://webmention.app/docs#using-ifttt-to-trigger-checks

The only bit of markup that can help here is adding either `class="u-repost-of"`
or `class="u-in-reply-to"`[^likes] on your post to indicate what it's reposting
or replying to. Use `u-repost-of` if it's just a plain repost without any
additions, and `u-in-reply-to` if you're adding any additional content. You can
put these on:

[^likes]: Technically you can also do `class="u-like-of"` to indicate a like but
  that's not something that makes a lot of sense in a static site context.

* A simple `<a>` tag whose `href` is my post.
* The root element of an [`h-card`](https://microformats.org/wiki/h-card) that
  provides more metadata about my post.
* The root element of an [`h-entry`](https://microformats.org/wiki/h-card) fully
  embeds my post in your blog. (This is technically non-standard but it's what I
  do and it seems to work with everything I've tested.)

I've set up my site so that it hides Webmention likes and reposts, but displays
replies as comments below the post. See [this post] for an example of that in
action.

[this post]: https://nex-3.com/blog/i-should-write-a-novel/
