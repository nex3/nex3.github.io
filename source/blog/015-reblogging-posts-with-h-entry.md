---
author: Natalie
title: Reblogging posts with h-entry
date: 2024-09-25 23:38:00 -8
tags: [meta, web]
---

{% genericPost "https://nex-3.com/blog/once-i-add-the/",
    time: "2024-09-20T07:06:00Z",
    tags: "#meta",
    author: "Natalie",
    authorUrl: "/",
    authorAvatar: "/assets/avatar.webp" %}
  <p>
    Once I add the ability to embed arbitrary blog posts from other blogs on
    here it's over. I'm gonna be reblogging like a wild animal. Y'all are gonna
    have your eyes blown clean outta your heads.
  </p>
{% endgenericPost %}

Thrilled to announce that I now have this up and running, at least in its most
basic aspect. The embed above is automatically generated *and* pulled down
directly from the source post. Nothing in this is specific to my blog; I can
also do it with someone else's. By way of example, please enjoy this post from
my beautiful wife:

{% genericPost "https://seaslug.garden/?p=44",
    time: "2024-09-15",
    tags: "#books, #research",
    author: "Liz",
    authorUrl: "https://seaslug.garden/",
    authorAvatar: "https://secure.gravatar.com/avatar/f94a6251673cc4e2d5871c9c30e802b1" %}
  <p>there is a very specific feeling of relief upon realizing I don’t need to hurry to finish a library book before it’s due, because I <em>definitely</em> will want to buy a copy for future reference and cross-checking.</p>

  <p>(the book in question is <em><a href="https://press.uchicago.edu/ucp/books/book/chicago/G/bo37630225.html" data-type="link" data-id="https://press.uchicago.edu/ucp/books/book/chicago/G/bo37630225.html">Gossip Men: J. Edgar Hoover, Joe McCarthy, Roy Cohn, and the Politics of Insinuation</a></em> by Christopher M. Elias)</p>
  </p>
{% endgenericPost %}

## Injecting embeds

Here's what the embed looks like in my blog source right now:

{% raw %}
```liquid
{% genericPost "https://nex-3.com/blog/once-i-add-the/",
    time: "2024-09-20T07:06:00Z",
    tags: "#meta",
    author: "Natalie",
    authorUrl: "/",
    authorAvatar: "/assets/avatar.webp" %}
  <p>
    Once I add the ability to embed arbitrary blog posts from other blogs on
    here it's over. I'm gonna be reblogging like a wild animal. Y'all are gonna
    have your eyes blown clean outta your heads.
  </p>
{% endgenericPost %}
```
{% endraw %}

I have a template for the embed, some CSS to style it, and a little custom
Liquid tag to bring it all together. But the real magic is in how I generate the
`genericPost` in the first place. Here's what the original source looks like
before I run my [embed injector] on it:

[embed injector]: https://github.com/nex3/nex3.github.io/blob/main/tool/inject-embeds.js

```liquid
 
https://nex-3.com/blog/once-i-add-the/


```

That's it! Just a URL surrounded by empty lines. The injector pulls down the
webpage, extracts critical information about the blog post, and replaces the URL
with a call to `genericPost`. My Letterboxd and Cohost embeds work the same way,
with their own custom templates and metadata that let me match the style of the
original websites.

## Structured post data with h-entry

But I did say that this wasn't specific to my blog. With Letterboxd and Cohost,
I've just hard-coded their HTML structure. I can't rely on that if I want to get
information from any old blog, though. They all use different HTML structures!

So instead, I'm making use of the [h-entry microformat]. This is a tiny little
specification that defines a way to mark up an existing post to indicate
metadata in the existing HTML structure. At its simplest, it's just a few class
names annotated with the HTML. Here's the simplified HTML for the post above:

[h-entry microformat]: https://microformats.org/wiki/h-entry

```html
<article class="h-entry">
  <p class="attribution">
    <a href="/blog/once-i-add-the/" rel="canonical" class="u-url">
      Posted
      <time datetime="2024-09-20T07:06:00Z" class="dt-published">
        20 September 2024
      </time>
      by
      <span class="p-author h-card">
        <span class="p-name">Natalie</span>
        <data class="p-url" value="/"></data>
        <data class="p-logo" value="/assets/avatar.webp"></data>
      </span>
    </a>
  </p>

  <div class="e-content">
    <p>
      Once I add the ability to embed arbitrary blog posts from other
      blogs on here it's over. I'm gonna be reblogging like a wild animal.
      Y'all are gonna have your eyes blown clean outta your heads.
    </p>
  </div>

  <ol class="tags"><li><a href="/tag/meta" class="p-category">meta</a></li></ol>
</article>
```

Here are the special class names I'm using:

* `h-entry` wraps the entire thing, indicating that it's a post.
* `u-url` goes on a link and indicates the post's canonical URL.
* `dt-published` goes on a [`<time>` element] and indicates when the post was
  made.
* `p-author` can just be the author's name, but I've made it into a whole
  [h-card] with the following metadata:
  * `p-name` is my name.
  * `p-url` is my personal URL, which is to say this website.
  * `p-logo` is the URL of my avatar, so people reblogging me have something to
    show by my posts.
* `p-name` isn't used here because this post is untitled, but if it had a title
  that would be the class for it.
* `e-content` is the HTML content of the post itself.
* `p-category` is the name of a tag associated with the post.

[`<time>` element]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time
[h-card]: https://microformats.org/wiki/h-card

Of these, only `h-entry`, `u-url`, and `e-content` are _really_ critical. There
are a handful of other features defined in the spec, including a way to indicate
which post you're replying to, that you should check out if you're interested.
But these are the most critical.

## Make your posts rebloggable!

You should do this too! If you can edit your blog's post layout, it's extremely
easy. Just add those classes to the appropriate places, and you're off to go. If
you don't already have an HTML element for some piece of information, you can
add invisible `<data>` tags like I did above to provide the info to consumers
without changing the way your post looks to readers.

Even if your blog doesn't allow you to edit the layout, if you can add HTML to
the posts you can do this by hand. There's no need to use the specific
`<article>` or `<p>` tags I do above... just divs will work. You can even make
your rebloggable content different than the original, which I'm planning to do
to avoid having my embeds look too weird if they get reblogged.

If you end up adding h-entry support, or even better if you end up making use of
mine, drop me a comment and let me know!
