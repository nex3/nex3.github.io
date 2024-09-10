---
title: Apologia for RSS
author: Natalie
date: 2024-09-09 13:00:00 -8
updated: 2024-09-09 20:05:00 -8
---

RSS[^1] was the original federated social media. RSS invented the "share" verb.
RSS is easy, simple, and sustainable. RSS never died.

I'm sure a chunk of you already know what RSS is. Probably some don't. RSS is a
protocol (really just a text format) for listing the posts on a website in a
machine-readable way. Readers of your website post its RSS feed URL into their
feed reader software, this reader periodically checks it for new posts, and it
presents all the posts in a single unified list with useful features like
"marking stuff as read". (Podcasts still[^2] use the same technology.)

Back in the day, everything had RSS. Any site that had anything that mapped kind
of onto "posts", from blogs to webcomics to the nascent social media sites,
would expose an RSS feed as well because not to do so was to cut themselves off
from what was at the time a massive audience. Even Twitter had RSS for a long
time. This was great as a user, because you could easily read stuff from all
across the web in a single place. It was great as an author, because your
self-hosted blog wasn't intrinsically harder for people to read than anything
else anywhere on the internet. It was a kind of federation, but one that didn't
require each node to rack up server costs and DevOps time. If you could host a
simple XML file that only updated when you made a post, that's all you needed.

If you're reading this, even if you used RSS a bit in its heyday, you may think
"oh I can see why that would be useful" but you don't yet understand. All of
this is just preamble. What _really_ makes RSS spectacular is the ability to
share[^3] posts across feeds. Each post comes with a unique identifier as well
as authorship information, which means my feed can just _contain_ a post from my
friend that I think my readers would be interested in. It can contain any post
from anywhere on the internet! Before Twitter had "retweets" and every website
had a "share on social media" button on every page, RSS had post embedding.

Not that most feed readers really took advantage of that, because there wasn't a
particularly tight feedback loop between _reading_ and _authoring_ an RSS feed.
The one major exception was the late lamented Google Reader, the first
high-profile victim of Google's now-infamous penchant for devouring its
children. Google Reader provided its own feed for each user, and for a moment
there was a vibrant culture[^4] of sharing blog posts with friends and
commenting and discussing. I want this back. I want to be able to share
_anything_ from _anywhere_, I want to see the fruits of my friends' excellent
taste, and I want to be able to have a conversation about it.

I may not be able to do that yet (although I _am_ hoping this blog can be
something like that eventually). But I can and do use RSS, as I have
continuously since the mid-2000s. You can too! These days I'm using
[NewsBlur](https://newsblur.com), but I've also heard good things about
[Feedbin](https://feedbin.com/) as well if you want something a little simpler.
(I used to use Feedly, but it went all-in on LLM shit so I can't endorse it.)
RSS may not quite be Cohost, but it's a way to interact with the web that's not
just sustainable, but whose very existence makes it easier to make a web that
isn't at the mercy of corporate cartels.

[^1]:
    Throughout this post I'm going to use "RSS" to refer to the concept of
    semi-static machine readable news feeds in general. Atom is definitely the
    better actual format, but RSS is the more recognizable term.

[^2]:
    Unless you get them through something like Spotify, in which case they
    aren't really "podcasts", just sparkling audio shows.

[^3]:
    I believe this was originally added with the intent that there would be
    dedicated "feed aggregators", some of which did actually exist. I never
    found this particularly useful, but I absolutely valued having people I
    knew personally curate posts that I would later see.

[^4]:
    I maintain to this day that if Google had expanded this existing small but
    well-loved proto-social-media product, adding the ability to include
    locations (via Maps) and videos (via YouTube) and websites (via Search) and
    expanding the authoring tools for plain posts, it would have been _wildly_
    more successful than burning it to the ground and trying to create Google+
    from whole cloth. Then again, it's probably for the best that they didn't.
