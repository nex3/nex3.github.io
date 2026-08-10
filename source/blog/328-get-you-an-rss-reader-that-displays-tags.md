---
title: Get You an RSS Reader that Displays Tags
tags: [rss]
commentary:
- "if you can see this in your RSS reader, it supports tags!"
- "I'm so proud of you"
- you are a scholar among fools
- "if you're just seeing this on my website... that's fine. that's fine too"
---

I'm sure all of you have already read my [Apologia for RSS] (the very first post
on this blog!) and I'm sure you're all reading this in an RSS reader you've
chosen for one reason or another. But does your RSS reader show you *everything*
a post contains, or is it hiding the deepest, juiciest quips and chatter from
you?

[Apologia for RSS]: ./apologia-for-rss

I've been [on Tumblr] since its heyday back in 2011, and it's now the only
social media I can really say I use regularly[^tumblr]. One of the aspects of
its culture I appreciate tremendously is the concept of "chatting in the tags".
Tags in Tumblr are snippets of text attached to both posts and reblogs, but only
the original instance. If you reblog a post, that reblog doesn't include the
tags of whoever you reblogged it from.

[on Tumblr]: http://nex3.tumblr.com

[^tumblr]: I can't say I *recommend* it, since the owners (as for all profitable
    social media) regularly do heinous shit like banning trans women for talking
    about how often they ban trans women. Their sole virtue is that they're less
    eager to fuck up the good things they have going than the rest of the social
    media bourgeoisie.

Although tags were presumably intended primarily for cross-referencing posts on
the same topic, Tumblr culture has adopted them as a way of writing *sotto voce*
commentary on posts, visible only to people who are following you specifically
without escaping into the larger network. Sometimes people use this to be funny,
sometimes to relay anecdotes, sometimes to be catty. Universally, it gives a
window into the personality of the person you chose to follow, above and beyond
just their curatorial decisions about what to post.

Even on one's own posts, tag chatter provides a means of adding a bit of
commentary that's tangential to the post itself, of a different tone, or a
little more personal than they want escaping into the wider network.

One of Tumblr's virtues, and in fact one of the main reasons I still use it at
all, is that it provides RSS feeds for every user. These are the main way I read
the website at all! What's more, these feeds actually contain that user's tags.
For the technically-minded among you, the feed entry looks like this:

```xml
<item>
  <title>
    gonna be a lover for a minute, reblog and put in the tags the last movie that you LOVED like&hellip;
  </title>
  <description>
    <p><a class="tumblr_blog" href="https://perfectday1972.tumblr.com/post/792148193180827649/gonna-be-a-lover-for-a-minute-reblog-and-put-in">perfectday1972</a>:</p><blockquote><p>gonna be a lover for a minute, reblog and put in the tags the last movie that you LOVED like intensely loved like 5 stars on letterboxd LOVED</p></blockquote>
  </description>
  <link>https://www.tumblr.com/nex3/824507509470625792</link>
  <guid>https://www.tumblr.com/nex3/824507509470625792</guid>
  <pubDate>Sun, 09 Aug 2026 14:40:35 -0700</pubDate>
  <category>PlayTime</category>
  <category>although todayhat was a rewatch</category>
  <category>most recent new one was Chimes at Midnight</category>
</item>
```

Those `<category>` elements are the tags. Neat! But totally useless in practice
unless a reader actually displays them.

My blog, the one you're reading right now, has tags as well. Not only that, I
use them for chatter just like on Tumblr! And, naturally, they're included in my
feed as well. But I worry that people who subscribe to that feed won't see them,
because most RSS readers hide them entirely.

### A Half-Hearted Recommendation

My current RSS reader is [NewsBlur]. There are things I like a lot about it,
like the ability to [natively convert emails to feeds], a solid mobile app, and
of course the ability to see tags. There are also things I don't like so much,
like the awkward UI[^ui] and the willingness to capitulate to the mania *du
jour* and add LLM features.

[NewsBlur]: https://newsblur.com
[natively convert emails to feeds]: https://www.newsblur.com/features/newsletters

[^ui]: I really liked the UI of the late great Google Reader, and I don't
    entirely understand why more readers don't just copy it wholesale. I have
    yet to find one that does and also meets my other criteria[^implement].

[^implement]: I must not implement an RSS reader. Implementing an RSS reader is
    the time-killer. Implementing an RSS reader is the little-death that brings
    total obliteration. I will face my ideal RSS reader. I will let it pass over
    and through me. And when it has gone past I will turn the inner eye to see
    its path. Where the ideal RSS reader has gone there will be nothing. Only I
    will remain.

Its failings aside, NewsBlur is still the best reader software I've found after
a decent amount of searching, and I'd much rather put up with its foibles than
lose out on the ability to see what my friends have to say about their posts and
reblogs. If you feel the same way, I'd recommend giving it a try. It's entirely
fine!

Even if you don't, I encourage you to reach out and file a feature request with
whatever reader you do use to add some way of seeing tags. If enough people want
it, then maybe it'll even happen!
