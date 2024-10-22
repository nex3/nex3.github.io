---
tags: [web, article]
title: A Non-Technical Intro to Webmentions
updated: 2024-10-22T07:36:39Z
---

I keep bringing up "Webmentions" in the context of discussing [the sociable web]
and advocating for more people to adopt more social technologies on their
websites, but I always run into a wall: there's no good place to link people to
so they can understand more about what that means. All the existing explanations
I've found are deep in the weeds of *how* Webmentions work on a technical level,
which isn't a very helpful place to start for people who just want to post.

[the sociable web]: /blog/a-sociable-web

I want to fill that gap with this post, and give people who don't know the ins
and outs of HTTP a working understanding of *what* Webmentions do and how to get
them up and running for your site. To that end:

**Webmentions are a way to let a website know that you linked to it.**

That's it! At it's core, it's just that simple. If a website supports
Webmentions, you tell it "Hey, here's the URL of a page with a link to you", it
double-checks that the link actually exists, and then it does what it pleases
with that information.

## What can you do with Webmentions?

### Notifications

The simplest thing you can do is just look at the Webmentions you receive like a
notifications feed on a social media site, and appreciate that people like what
you're up to. I get all my Webmentions delivered to me as an RSS feed (more on
that below), and I'll always check out the links to see what people are saying.

{% image '/assets/088/recent-mentions.webp' %}
===
My Webmention notification feed on webmention.io
{% endimage %}

In addition to being the easiest to set up, I think this is actually the most
useful thing to do with Webmentions. Having a way to see when people reply to
your posts makes [conversation] possible and seeing people's appreciation
encourages [performance]. Even if you never go beyond using Webmentions as pure
notifications, it's a great way to become more interconnected.

[conversation]: /blog/a-sociable-web#conversation
[performance]: /blog/a-sociable-web#performance

### Replies as comments

If someone makes a post on their blog that's replying to yours and sends you a
Webmention, you can display that reply like a comment underneath your post. This
is pretty common for out-of-the-box Webmention plugins, like [this one for
WordPress][][^wordpress]. You can see it in action on {% mention Liz %}'s
WordPress blog where [my reply on this blog] shows up [as a comment on hers],
with my avatar and the original posting date and everything.

[this one for WordPress]: https://wordpress.org/plugins/webmention/
[Liz's WordPress blog]: https://seaslug.garden/?p=69
[my reply on this blog]: /blog/10-official-years-of-type-1/
[as a comment on hers]: https://seaslug.garden/?p=69#comment-63

[^wordpress]: WordPress has been the talk of the town lately for the
  WordPress.com CEO's non-stop heinous antics, so I hesitate to give it a
  full-throated endorsement. That said, it's by far the easiest way I know of to
  get up and running with all the IndieWeb technology from zero baseline
  knowledge, and fortunately the engine itself is open source so it's unlikely
  to collapse completely. Just maybe choose a hosting provider that's not
  WordPress.com.

<div class="image-gallery">
  {%- image '/assets/088/reply-to-liz.webp' -%}
    ===
    My post replying to Liz
  {%- endimage -%}
  {%- image '/assets/088/comment-on-lizs-blog.webp' -%}
    ===
    My post as a reply on Liz's blog
  {%- endimage -%}
</div>

Making this work nicely requires a bit of setup on the part of the page that
contains the link, though. A computer isn't smart enough to take any old webpage
and figure out which parts of it are the author's name, the author's avatar, the
text of the reply, and so on. In order for all of that to work nicely, the
linking page needs to use [`h-entry` metadata] to explicitly indicate all this
information. Fair warning: `h-entry` is unavoidably a *bit* technical to set up.
since it requires editing HTML. That said, some blog hosts like [micro.blog] do
support it out of the box, and others like WordPress have [plugins to handle it
for you].

[`h-entry` metadata]: /blog/reblogging-posts-with-h-entry/#structured-post-data-with-h-entry
[micro.blog]: https://micro.blog/
[plugins to handle it for you]: https://wordpress.org/themes/sempress/

Even if a page is mentioned by something without any metadata, it can still
display a link back; it just won't have much additional information. Here's what
a bare, metadata-free mention looks like on my blog:

{% image '/assets/088/dante-mention.png', alt: "mentioned on blog.dante.cool" %}
{% endimage %}

### Reposts and likes

In addition to replies, which are basically reposts or links with additional
content, Webmentions + `h-entry` can express a number of other relationships
between posts. (Technical moment: which relationship you express depends on
which `class` attribute you put on the link. For example, `<a
class="u-in-reply-to" href="...">` indicates that you're replying to the linked
post. A link without a class is just treated as a generic mention.)

* Reposts (`class="u-repost-of"`): This usually indicates that you're reposting
  some or all of the content of another post with minimal additional content of
  your own. This is modeled on the Twitter retweet more than the Tumblr reblog,
  which I think is better expressed as a reply.

* Likes (`class="u-like-of"`): This indicates that you're expressing
  appreciation of a post, also usually without additional content. You might,
  for example, have a page on your website that's just there to contain "like"
  links. I personally don't use this one, because I find commenting to be a more
  personal way of expressing my appreciation, even if it's just a little
  ":yeah:".

There are more relationships between pages that aren't as widely supported, like
RSVPs to events, reviews of media, translations of posts, and so on. But these
are the main ones, especially if you're coming at it from a social angle.

## How do I send Webmentions?

Some sites that support Webmentions will provide you a handy text box into which
you can paste the URL of a page which links to the page you're on. My blog has
this at the bottom of each page, for example. But not all pages have a form for
this, and even if they did it would get pretty annoying to do manually all the
time.

Blog software and plugins that support Webmentions will usually automatically
handle this for you, sending them out every time you make a post (or edit it, so
that websites know to update any Webmentions they display). But if it doesn't,
don't despair—webmention.app has your back. It takes a bit of doing, but you can
set it up to [send Webmentions every time your RSS feed updates][wm-rss][^wmapp-auth],
which will work with just about any blog under the sun.

[wm-rss]: https://webmention.app/docs#using-ifttt-to-trigger-checks

[^wmapp-auth]: This documentation includes adding `&token=...` to the hook URL.
  You can get a token by signing into webmention.app with a GitHub URL, but I
  don't think you really need to. Without a token, you can only make four
  requests per URL per hour, but if you're only sending one request per page
  anyways that won't matter. So you should be able to safely leave off the
  `&token=...` bit.

## How do I receive Webmentions?

Okay, this bit is unavoidably at least a little bit technical. Unless your blog
platform supports Webmentions out-of-the-box or through a plugin, you're going
to have to edit some HTML. But don't worry! I'll guide you through it.

I use [webmention.io] to receive Webmentions, and I recommend it. It's got a
straightforward, sensible UI—the only wrinkle is that its signin process may not
be what you're used to. But I'll guide you through that as well.

[webmention.io]: https://webmention.io

1. Choose an email address that you're okay exposing to the world. If you don't
   want to use your primary email, [Fastmail] and [Proton] both provide free
   accounts.

   [Fastmail]: https://fastmail.com/
   [Proton]: https://proton.me/mail

2. Let's say your domain name is `me.example.org` and your email is
   `me@example.org`. Add the following to your website's HTML:

   ```html
   <link rel="me" href="mailto:me@example.org">
   <link rel="webmention" href="https://webmention.io/me.example.org/webmention">
   ```

   If possible, these should go just before the `</head>` in your HTML. That
   said, if you can't edit your layout directly, these should work anywhere on
   the page. They won't be visible; they're just there to tell computers

   * this is an email address that belongs to the person who runs this website, and
   * this is the URL to which to send Webmentions for this page.

   The only real constraint is that they need to be on both the root page of
   your site *and* on each page that you want to receive Webmentions.

3. Go to [webmention.io], type in your site's base URL under "Web Sign-In", and
   click "Sign In". It's important that you don't include a path in the URL
   (good: `https://example.org/`, bad: `https://example.org/blog/my-post`).
   Otherwise the URL for the `<link rel="webmention">` we added above won't be
   correct.

4. This will take you through a sign-in flow where a login code will be emailed
   to the email you put on your website above, which verifies that you are in
   fact the person who owns this website.

5. Once you're signed in, you'll be redirected to [webmention.io/dashboard]. I
   recommend bookmarking this, because for whatever reason there's not an easy
   way to get there from the main page without signing in all over again.

   [webmention.io/dashboard]: https://webmention.io/dashboard

Once you're at the dashboard, you're good to go—webmentions will be visible
there, or you can get them in your feed reader by going to "Settings > Mentions
Feed" and copying the `mentions.atom` URL into your feed reader[^mentions.html].

[^mentions.html]: There's also a `mentions.html` URL, but you can ignore that.
  It uses an `h-entry` based feed format that's pretty cool, but not at all
  widely supported whereas Atom is pretty much universal.

### Webmentions from other websites

Whether you're using your blog's built-in Webmention support, webmention.io, or
some other system, you can use the [brid.gy] app to convert replies and comments
on a bunch of other social websites into Webmentions on your site. I do this for
the Fediverse, and you can see for example a bunch of Fediverse discussion below
[this post]. It's sometimes a little shaky, especially because it doesn't always
preserve threading accurately, but it works!

[brid.gy]: https://brid.gy/
[this post]: /blog/seattle-cohost-wake/

It looks like brid.gy can also act as a Webmention plugin for Tumblr, WordPress,
Blogger, and Medium. I haven't tried this personally, so I can't vouch for it.
But it might work great!

## Go out there and get mentioned!

I really recommend getting Webmentions set up. It does involve a bit of silly
rigamarole, it's true, but it's worth it to become part of the sociable web. And
the more people start using this, the more it'll become a valuable feature for
blogging platforms to support without any hassle. And now at least it'll be a
bit demystified for those who want to understand what it's all about without
reading W3C specifications.
