---
tags: [web, article]
title: A Sociable Web
---

The process of building out this site has inevitably involved design choices
about how to engage with various technologies and the various forms other
people's web presence takes. It's a truism that you can't solve social problems
with technology, but social media has made it just as clear that technology does
*shape* the social dynamics that emerge in the spaces it mediates. This drives
me to wonder: as more of my friends and friends-of-friends move to individual
websites and blogs, what social dynamics does this give rise to? And what
different technical approaches could improve those dynamics?

I think it's most interesting to come to this question from the social direction
rather than the technological. We need to have a set of social goals for
interacting on the internet, and with that understanding firmly in hand we can
start interrogating the way technology can create or fight against those goals.
My ultimate goal is to articulate a clear vision of a way to interact with
people's websites that's not just a fun pastime or an informative research
process, but that can meet social needs—to imagine what I'll call a "sociable
web".

## Sociable Web not Social Network

I'm using the term "sociable web" as a conscious contrast to "social network".
Social networks have unavoidably shaped our understanding of what form of
socialization is possible online, and I don't even think it's always been for
the worse. But now they are fragmenting and rotting, and whatever was good about
them—their casual usability, the massive network effect of "all your friends are
here"—is falling away like so much decayed flesh. I want to envision something
new, and I find often that a new name can help.

### "Web" versus "Network"

I'm not interested in a "network" in the sense either of a single centralized
company *or* a decentralized collection of nodes like the Fediverse that is
nevertheless tightly coupled technologically. I don't think either of these
forms are sustainable in a capitalist world. They are either fed by boundless
venture capital coffers which eventually transition into exploitative
relationships with their userbase, or they're built on the backs of massive
amounts of unpaid labor. The conditions under which these networks are produced
then run downstream and affect their social dynamics.

So, I'm interested in socialization that uses as its foundation the web itself.
Where anyone can participate just by having a website. Where the existing
networks are, to some degree, part of it _already_ by virtue of being accessible
over HTTPS.

### "Sociable" versus "Social"

"Social" is unopinionated. "Social" is throwing a bunch of people into a room
and seeing what happens. A party can be social, but so can a witch hunt.
"Social" is thinking about the technology as primary and allowing the social
dynamics to fall out from that. When things are built to be merely "social",
they force the real humans who use them into a free-for-all that only a
libertarian could love.

I want more than that. I want things to be _sociable_, to be friendly, to be
fun. I don't mean to try to avoid conflict entirely, which is neither possible
nor truly desirable. But to envision a sociable web is to envision a place where
interactions that make your world richer are easy to realize, and those that
make your life worse easy to curtail. I want to be able to chat in public
without the world overhearing, to meet new people without and be able to block
creeps, and to have conversations without being dogpiled.

## Social Pillars

The first step towards understanding what a sociable web could be is to
understand the social goals we're trying to achieve. Social media, for all its
doomed flaws, is a huge part of millions of people's lives for a reason, and
it's not *just* because of its exploitative monopolization of users' attention.
It meets real needs people have for connection and communication in a space
that's decoupled[^1] from physical proximity. If we can identify the healthy
interactions and cut them away from the rotten habitat that is for now their
only home, we can start building a web that is genuinely for us.

### Conversation

This is the core of what it means to socialize: saying things, having people
hear them, and having people say things back. If you're not saying anything,
you're just a lurker—not a bad thing to be, but also not a participant in a
social dynamic. If no one hears you, you're just a diary. And if no one
responds, then you might as well be.

Conversation, like the libertarian "social", is unopinionated. It can be vapid
or it can be enlightening; it can be uplifting or it can be miserable. But this
flexibility is also an asset: when conversation can be both silly and serious,
comic and tragic, it gives people room to bring their whole selves (or whatever
slices or performances of themselves that they want) into the space. This is one
reason I make a point of [posting jokes] on this blog, even when they're
[incredibly dumb].

[posting jokes]: /blog/in-a-kosher-household-youll/
[incredibly dumb]: blog/monsterfuckers-when-the/

Conversations are also (at least in physical reality) local. Even when
conversing in a public space or a crowded party, most of the time you're just
talking with a small number of people. People may drop in and out, but there's
no expectation that everyone in the room will hear everything you say.

Without a doubt, conversation the fundamental building block of human
interaction. Without conversation, you have nothing. Silence. Void.

#### ...and Technology

I see conversation as one of the key failures of the old-school "blogosphere".
You could post all you want, but there was no way to actually turn those posts
into a conversation. Comment sections met this need to a degree, but without the
ability to make a long-form response to a long-form post *and have the original
author actually see it* a culture of back-and-forth never blossomed.

The classic blog form also felt, for better or for worse, like it had to be
long-form and serious—another failure of conversation. I think part of this was
just a problem of snowballing cultural precedent, part of it is issues with
[performance] that I'll get into below, and part of it is a vicious cycle with
the inability to reply in kind. Small posts are compelling to write in large
part because they're an invitation to people to interact with the author,
especially in a casual way. Once that interaction is curtailed, there's less
reason to write small posts; if you write fewer small posts, you'll build up
less of a network of people who will interact casually.

[performance]: #performance

Tumblr, to its credit, did solve both of these problems. Its original stated
goal was to be a blogging platform that encouraged smaller posts, but critically
it also supported reposts[^2]—and in doing so, ended up metamorphosing from its
blog-oriented origins into an out-and-out social media site.

I think this is the critical distinction, in fact, between the era of blogs and
the era of social media. Blogs are built around just saying things, where social
media is built around conversation. So how can we bring conversation back to
individual websites, which are tied to the blog form at least inasmuch as they
aren't part of a tightly-coupled network?

It won't surprise those of you who read [my post on h-entry] that I think
reblogging is a key part of the answer. Having a way to interact with people
that keeps the context of the conversation intact *and* encourages other people
to participate without blasting it everywhere is extremely valuable. But equally
valuable is making sure that the conversation is visible to the existing
participants. If I can only see replies from people I'm already following,
conversation is stifled. I think WebMentions are the best solution for this that
currently exists, and I'm planning a more thorough non-technical introduction to
them for a future post.

[my post on h-entry]: /blog/reblogging-posts-with-h-entry/

### Performance

Although talking with people is the most important way of being sociable, I
think there's another modality that's subtler but still very relevant:
*performing* for people. I mean "performance" in a very broad sense, covering
anything that's fundamentally about creating something for others to appreciate.
This can be a long, well-reasoned essay or a silly offhand joke; it can be
visual art, a poem, or [a css crime]. I call it "performance" because my heart
is in the theater, and because a critical aspect is not just the creation itself
but the two-way dynamic between the creator and the audience.

[a css crime]: https://cohost.org/rc/tagged/css%20crimes

To be able to see the joy or catharsis or edification your creation brings to
people in real time is tremendously heady. At its best, it allows the creator to
see their work through new eyes and appreciate it all the more. It can be
inspirational, motivational, and even open up whole new avenues of creation—for
example, I would have never started helping Zandra with [_Her Majesty the
Prince_] if she hadn't treated it as a performance she was writing live, chapter
by chapter.

[_Her Majesty the Prince_]: https://www.scribblehub.com/series/982373/her-majesty-the-prince/

The potency of performance can be turned to harm, though. The desire for
applause can wrap itself around your heart until *everything* starts to feel
like a performance. Performances can be a great joy and a source of profound
connection, and having room for them is crucial. But they cannot be the bread
and butter of social interaction. Any healthy social situation must have plenty of room for simple
conversations with no thought of an audience beyond the participants.

#### ...and Technology

Performance is the handle by which social media grabs hold of your attention and refuses ever to let go. Performance is the food it feeds you as you scroll your infinite timeline, and the heart of the skinner box it uses to keep you posting forever. This is harmful. Cohost absolutely made the right call by dramatically minimizing this effect by removing metrics such as like counts for posts and follower counts for people.

But like many vital nutrients, while too much focus on performance is toxic, you need at least some to thrive. And this is something that individual web sites struggle with[^analytics]. You can implement anonymous "likes" like Medium's claps or BearBlog's up arrow, but without faces attached this feels impersonal. And attaching a face while still making "liking" a post simple and quick all but requires some sort of centralized account[^wm-likes].

[^analytics]: Adding analytics seems at first blush like a solution to this, albeit one that's usually quite invasive. But I think it doesn't address the core issue, because it only measures passive behavior, not active feedback. It's the difference between reading ticket sale numbers in an office and hearing the applause on stage.

[^wm-likes]: The Webmention protocol combined with h-entry can explicitly express a "like", but to like a post you must establish a long-lived link to it on a site you control which is absolutely not simple. You could make a generalized "Webmention like" app that's just designed to do this, and it would be usable enough as a browser extension or dedicated button, but that's basically just reinventing a centralized account. 

I think comments are a critical part of the solution here. Even a simple "hell yeah" or "love this!" comment feels personal, and there are plenty of comment systems that make posting without an account relatively painless. And "making a comment" feels enough weightier than "liking a post" that a small signup flow reads as less egregious, even if the end purpose is the same.

Reposts are even more valuable as a form of "applause". Not only do they bring a post to a new audience, but they're the strongest possible endorsement. Nothing makes me feel more like my writing is appreciated than seeing it show up in a friend's link roundup, and I think the roundups people like [Dante](https://blog.dante.cool/link-roundup-8-ghouls-and-goblins-and-games/), [Shel](https://shelraphen.com/community-roundup-week-of-2024-10-06-11/), [Nicky](https://nickyflowers.com/blog/post_101424.html), and many more have been doing are among the most valuable contributions to building a sustainable culture for a sociable web.

And I do think culture is the critical factor for nourishing performance without letting it become toxic. For sure, there are technological aspects as well: Webmentions are crucial for allowing an author to actually *see* reposts, and h-entry makes it far easier to create a repost *and* adds a lot of ezpressive power to Webmentions. But none of that matters if we don't establish a culture where we tell people when we appreciate their posts and share them if we think our friends will appreciate them as well.

### Meeting People

#### ...and Technology

### Avoiding People

#### ...and Technology

[^1]: To a degree. Language barriers, time zones, networks of existing friends,
      and barriers to technological access all put some pressure even on the
      internet to make friends with people physically close to you. But at the
      very least it expands "close" from "your city" to something more like
      "your country" or even "your hemisphere".

[^2]: To the best of my knowledge Tumblr introduced the concept of "reposting",
      although I haven't done any research to verify this so I'm putting that
      statement down here in an uncertain footnote instead of in the main text.
