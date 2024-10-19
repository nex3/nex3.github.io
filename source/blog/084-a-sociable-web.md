---
tags: [web, article]
title: A Sociable Web
date: 2024-10-19T03:27:07Z
---

The process of building out this site has inevitably involved design choices
about how to engage with various technologies and other people's web presences.
It's a truism that you can't solve social problems with technology, but social
media has made it just as clear that technology does *shape* the social dynamics
that emerge in the spaces it mediates. This drives me to wonder: as more of my
friends and friends-of-friends move to individual websites and blogs, what
social dynamics does this give rise to? And what different technical designs
could improve those dynamics?

I think it's most interesting to approach this question from the social
direction rather than the technological. Our first priority should be a set of
social goals for interacting on the internet, and only with that understanding
firmly in hand can we start usefully interrogating the way technology gives rise
to or fights against the sort of interactions we want. My ultimate aim is to
articulate a clear vision of a way to interact with people's websites that's not
just a pastime or a research process, but that can meet social needs—to imagine
what I'll call a "sociable web".

## Sociable Web not Social Network

I'm using the term "sociable web" as a conscious contrast to "social network".
Social networks have unavoidably shaped our understanding of what form of
socialization is possible online, and I don't even think it's always been for
the worse. But now they are fragmenting and rotting, and whatever was good about
them—their casual usability, the massive network effect of "all your friends are
here"—is falling away like so much decayed flesh. I want to envision something
new, and when doing so I often find that a new name can help.

### "Web" versus "Network"

I'm not interested in a "network" in the sense either of a single company
overseeing many users *or* a decentralized collection of nodes like the
Fediverse that is nevertheless tightly coupled technologically. I don't think
either of these forms are sustainable in a capitalist world. They are either fed
by boundless venture capital coffers which inevitably move to capitalize their
userbase, or they're built on the backs of massive amounts of unpaid labor and
poorly-understood power structures. The exploitative conditions under which
these networks are produced run downstream and affect their social dynamics.

I'm interested in a social form that uses as its foundation the web itself.
Where anyone can participate just by having a website. Where the existing
networks are, to some degree, part of that form _already_ simply by virtue of
being accessible over HTTPS.

### "Sociable" versus "Social"

"Social" is unopinionated. "Social" is throwing a bunch of people into a room
and seeing what happens. A party can be social, but so can a witch hunt.
"Social" is thinking about the technology as primary and allowing the social
dynamics to fall out from that. When things are built to be merely "social",
they force the real humans who use them into chaotic interactions both healthy
and harmful, a freeze peach nightmare that only a libertarian could love.

I want more than that. I want things to be _sociable_, to be friendly, to be
fun. I don't mean to try to avoid conflict entirely, which is neither possible
nor truly desirable. But to envision a sociable web is to envision a place where
interactions that make your world richer are easy to realize, and those that
make your life worse easy to curtail. I want to be able to chat in public
without the world overhearing, to meet new people and be able to block creeps,
and to have conversations without being drowned in a sea of bad faith.

## Social Pillars

The first step towards understanding what a sociable web could be is to
understand the social goals we're trying to achieve. Social media, for all its
doomed flaws, is a huge part of millions of people's lives for a reason, and
it's not *just* because it exploitatively monopolizes its users' attention. It
meets real needs people have for connection and communication in a space that's
decoupled[^decoupled] from physical proximity. If we can identify the healthy
interactions and cut them away from the rotten habitat that is (for now) their
only home, we can start building a web that is genuinely for us.

[^decoupled]: To a degree. Language barriers, time zones, networks of existing
  friends, and barriers to technological access all put some pressure even on
  the internet to make friends with people physically close to you. But at the
  very least it expands "close" from "your city" to something more like "your
  country" or even "your hemisphere".

### Conversation 💬

This is the core of what it means to socialize: saying things, having people
hear them, and listening to responses. If you're not saying anything, you're
just a lurker—not a bad thing to be, but also not a participant in a social
dynamic. If no one hears you, you're just writing a diary. And if no one
responds, then you might as well be. Conversation is the fundamental building
block of human interaction. Without conversation, you have nothing. Silence.
Void.

Conversation, like the libertarian "social", is unopinionated. It can be vapid
or it can be enlightening; it can be uplifting or it can be miserable. But this
flexibility is also an asset: when conversation can be both silly and serious,
comic and tragic, it gives people room to bring their whole selves (or whatever
slices or performances of themselves that they want) into the space. This is one
reason I make a point of [posting jokes] on this blog, even when they're
[incredibly dumb].

[posting jokes]: /blog/in-a-kosher-household-youll/
[incredibly dumb]: /blog/monsterfuckers-when-the/

Conversations are also (at least in physical reality) local. Even when
conversing in a public space or a crowded party, most of the time you're just
talking with a small number of people. People may drop in and out, but there's
no expectation that everyone in the room will hear everything you say.

#### ...and Technology

I see conversation as one of the key failures of the old-school "blogosphere".
You could post all you wanted, but the means of actually turning those posts
into a conversation was extremely limited. Comment sections met this need to a
degree, but without the ability to make a long-form response to a long-form post
*and have the original author actually see it* a culture of back-and-forth never
blossomed.

The classic blog form also felt, for better or for worse, like it had to be
long-form and serious—another failure of conversation. I think part of this was
just a problem of snowballing cultural precedent, part of it was a failure of
[performance] (which I'll get into below), and part of it was a vicious cycle
with the inability to reply in kind. Small posts are compelling to write because
they function as an invitation to casually interact with the author. Once that
interaction is curtailed, there's far less reason to write small posts; if you
write fewer small posts, you'll build up less of a network of people who will
interact casually.

[performance]: #performance

Tumblr, to its credit, did solve both of these problems. Its original stated
goal was to be a blogging platform that encouraged smaller posts, but it _also_
supported reposts[^repost-origin]—and in doing so, ended up metamorphosing from
its blog-oriented origins into an out-and-out social media site. I think this is
the critical distinction, in fact, between the era of blogs and the era of
social media. Blogs are built around a one-way flow of writing, where social
media is built around conversation. So how can we bring conversation back to
individual websites, which are tied to the blog form at least inasmuch as they
aren't part of a tightly-coupled network?

[^repost-origin]: To the best of my knowledge Tumblr introduced the concept of
  "reposting", although I haven't done any research to verify this so I'm
  putting that statement down here in an uncertain footnote rather than boldly
  stating it in the main text.

It won't surprise those of you who read [my post on h-entry] that I think
reposting is a key part of the answer. Having a way to interact with people that
keeps the context of the conversation intact *and* encourages other people to
participate is extremely valuable. But equally valuable is making sure that the
conversation is visible to the existing participants. If I can only see replies
from people I'm already following, conversation is stifled. I think Webmentions
are the best solution for this that currently exists, and I'm planning a more
thorough non-technical introduction to them for a future post.

[my post on h-entry]: /blog/reblogging-posts-with-h-entry/

### Performance 🎭

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
and butter of social interaction. Any healthy social situation must have plenty
of room for simple conversations with no thought of an audience beyond the
participants.

#### ...and Technology

Performance is the handle by which social media grabs hold of your attention and
refuses ever to let go. Performance is the food it feeds you as you scroll your
infinite timeline, and the heart of the Skinner box it uses to keep you posting
forever. This is harmful. Cohost absolutely made the right call in dramatically
minimizing this effect by removing metrics such as like counts for posts and
follower counts for people.

But like many vital nutrients, while an overwhelming focus on performance is
toxic, you need some to thrive. And this is something that individual web sites
struggle with[^analytics]. You can implement anonymous "likes" like Medium's
claps or BearBlog's up arrow, but without names and faces this feels hollow and
impersonal. And attaching an identity while still making "liking" a post simple
and quick all but requires some sort of centralized account[^wm-likes].

[^analytics]: Adding analytics seems at first blush like a solution to this,
  albeit one that's usually quite invasive. But I think it doesn't address the
  core issue, because it only measures passive behavior, not active feedback.
  It's the difference between reading ticket sale numbers in an office and
  hearing the applause on stage.

[^wm-likes]: The Webmention protocol combined with h-entry can explicitly
  express a "like", but to like a post you must establish a long-lived link to
  it on a site you control which is absolutely not simple. You could make a
  generalized "Webmention like" app that's just designed to do this, and it
  would be usable enough as a browser extension or dedicated button, but that's
  basically just reinventing a centralized account.

I think comments are a critical part of the solution here. Even a simple "hell
yeah" or "love this!" comment feels personal, and there are plenty of comment
systems that make posting without an account relatively painless. And "making a
comment" feels enough weightier than "liking a post" that a small signup flow
reads as less egregious, even if the end purpose is the same.

Reposts are even more valuable as a form of "applause". Not only do they bring a
post to a new audience, but they're the strongest possible endorsement. Nothing
makes me feel more like my writing is appreciated than seeing it show up in a
friend's link roundup, and I think the roundups people like [Dante], [Shel],
[Nicky], [Caoimhe], and many more have been doing are among the most valuable
contributions to building a sustainable culture for a sociable web.

[Dante]: https://blog.dante.cool/link-roundup-8-ghouls-and-goblins-and-games/
[Shel]: https://shelraphen.com/community-roundup-week-of-2024-10-06-11/
[Nicky]: https://nickyflowers.com/blog/post_101424.html
[Caoimhe]: https://oakreef.ie/bog/what-im-reading-2

And I do think culture is the deciding factor for nourishing performance without
letting it become toxic. For sure, there are technological aspects as well:
Webmentions are crucial for allowing an author to actually *see* reposts,
h-entry makes it far easier to create a repost *and* adds a lot of expressive
power to Webmentions, and the generally slower pace of web-based posting limits
the potential for performance to become toxic. But none of that matters if we don't
establish a culture where we tell people when we appreciate their posts and
share them if we think our friends will appreciate them as well.

### Meeting People 👋

Hanging out with your friends is lovely, but friends don't come from nowhere.
Everyone wonderful in your life (other than blood relatives) was once a stranger
to you, and there was a moment when you first met them. In order for a social
context to fully function, to be more than just a group chat, there must be a
way to build new relationships with people you don't already know—to have that
moment of meeting and to give it room to grow.

There are two parts to this that are equally important. First, you have to have
a way to actually literally see new people in your daily social experiences. If
you're only ever interacting with the same group of friends, you'll never meet
anyone new. There needs to be some amount of circulation: being introduced to
friends-of-friends, going to a party, joining a hobby group for something you're
interested in. What are the analogues for these the digital world?

But merely interacting with new people isn't enough. Building an actual
relationship with someone requires a capacity for balance. There must be a way
to break the [parasocial] asymmetry of merely "following" someone and to instead
put yourselves on equal terms. That's not to say that you have to do this with
everyone, or that it has to be explicit—it's rarely explicit in person. But if
there are structural barriers from moving from "acquaintance" or "fan" to
"friend", then all you'll ever be or have is groupies.

[parasocial]: https://en.wikipedia.org/wiki/Parasocial_interaction

#### ...and Technology

I have met the substantial majority of my friends, including many people I
consider "in-person friends", either directly through social media or
transitively through other friends whom I met through social media. My life would
be immeasurably different if I'd never created a Twitter account, and most of
that difference would be the connections I would have never established with
people who are now beloved friends. But despite all that, I don't think social
media is actually very successful at making it possible to meet people.

There were *specific historical contexts* in which it worked well, to be sure.
The little slice of queer Twitter I was part of in the mid-10s, after the most
vicious of the cancel wars but before the algorithmic timeline got really bad,
was one of those contexts. I'm sure over the years and across the communities
there were many more. These were never perfect—I have come to strongly believe
that knowing for sure when someone unfollows you or doesn't follow back is
intrinsically corrosive to real friendship—but they did function.

But those contexts were always contingent, small loopholes that were doomed to
close. The structure of social media, the arc upon which it bends, pulls towards
a world where parasocial relationships are everything, because parasocial
relationships are profitable[^parasocial-fediverse]. The parasocial structure
already mirrors the distribution of content for profit, and so is far easier to
Midas-touch into the gold standard of the internet era: advertising. [X dot com]
is no longer the hot new kid on the block; it has far fewer users than TikTok,
Instagram, and YouTube, all of which are fundamentally about *sharing media*
rather than communicating. The only outlier is Facebook, which itself has fan
pages and a deeply pernicious algorithm.

[^parasocial-fediverse]: One might hope that the fediverse would avoid this
  issue by not having a profit motive. It certainly is *better*, to the degree
  that it explicitly avoids an algorithmic timeline—although I would contend
  that the global and local timelines pull in the opposite direction. But it (or
  at least all its most popular instantiations) is so heavily influenced by the
  structure of Twitter that it inherits its failures as well. And just so we're
  clear: even classic Twitter was never good, it was just *not yet bad enough*
  to completely preclude pockets of valuable community from forming.

[X dot com]: https://cohost.org/nex3/post/6732896-there-are-two-wolves

This is one place where I think the classic blog structure fares a little better
in one key respect: it's very easy to have a balanced relationship with someone.
You "follow" someone via RSS or just checking their blog periodically, and this
leaves no trace other than the comments or other conversations you explicitly
choose to have. It _can_ be parasocial—or at least it could back in the day when
there existed very popular blogs with huge followings—but if a blogger
appreciates a particular set of comments or reposts they can easily follow the
creator's blog, post a few comments of their own, and gracefully unfollow if it
doesn't click.

The crucial problem for blogs is the circulation. You need to be able to
actually *see* other people in order to meet them. Friends' reposts and link
roundups (which are functionally the same thing) can help you find new blogs to
follow, although there's currently not a great equivalent of "hobby
groups"[^aggregator]. Comments can help you actually connect with new people
you've found, although this really only works if they connect back to the
commenter's own web presence, which many out-of-the-box comment solutions
frustratingly don't support. I'm sure forbidding homepage links mitigates spam
to some degree, but I think it's actively detrimental to establishing new
connections, and I encourage everyone to search out comment apps that have a
place to fill in the commenter's website (as am I at the moment—there's a lot
not to like about CommentBox but this tops the list for me).

Having people repost and respond to your posts is also an excellent way to get a
sense of them, because you're seeing them in their native habitat, as it were:
on their own blog, writing primarily for their audience. But this does require
actually being notified when those reposts happen, which requires the use of a
technology like Webmentions on both ends of the interaction.

[^aggregator]: Back in the day there was a concept of "feed aggregators", often
  focused on a particular topic, which would take a bunch of RSS feeds—sometimes
  _just_ posts tagged with a particular topic—and combine them into one output
  feed. I'd love to see this become a thing again. {% mention 'Blackle' %}'s
  [Sortition Social] is the only one I know of right now, although it's not at
  all topic-specific.

[Sortition Social]: https://suricrasia.online/sortition/

### Avoiding People 🫤

The final pillar is I think the most difficult all around: in a healthy social
space it must be possible not just to have healthy interactions, but to avoid
unhealthy ones. This is, interestingly, something that's not even entirely
solved in person—I imagine that the delicate dance of navigating which of your
feuding friends to invite to which parties is a tale as old as the concept of a
party itself. But in person you can at least always walk away when someone you
can't stand walks up, and if someone is being belligerent enough you can toss
them out on their ear.

A healthy social space has to be resilient to both small-scale interpersonal
conflict and large-scale bad actors to avoid collapsing under the weight of
humans being inevitably human. At the same time, it has to be acknowledged that
a perfect solution here isn't possible—someone with a big enough grudge and
enough VPNs can harass you through the most robust defense, and it'll never be
possible to just edit someone out of your life or community no matter how much
they piss you off.

#### ...and Technology

Just like in person, I don't know that any digital platform has come up with a
really robust solution here. The state of the art, I suppose, is mutes ("I can't
see you") and blocks ("...and you can't see me either") for smaller conflicts
and thoughtful human moderation along with suspensions, bans, and IP bans for
bigger problems. Unfortunately, all of that depends intrinsically on having a
centralized platform.

Even the Fediverse, for all its Twitter mimicry, struggles with this issue.
Mutes work fine, blocks *mostly* work but only on the assumption that other
instances play by the rules. Bans only sort of half work—in email terms, you can
ban someone from making an account on your server or emailing anyone on your
server, and you can ask politely that no one forward anything from your server
to them. All of these cross-server conventions are enforced by the extremely
coarse-grained threat of defederation, which *itself* relies on intermediate
servers that are not defederated to play nicely. To a degree, it all comes down
to little fiefdoms screaming at each other.

And that's still worlds more than you can do on an independent site. Most
comment services provide the means of blocking someone from commenting on your
blog, but unless it's self-hosted that's the limit. Anything more than that
(like making sure they can't cause problems for other people) is up to the
comment software's moderation staff, if they have any. If you run your own
server and know the IP of someone who's a problem, you can *probably* IP-ban
them, but there's no other way to block them from looking at your site (and even
an IP ban is easy to circumvent). There is some intrinsic protection just by
virtue of how relatively low-bandwidth the communication channels on individual
websites are—it's a lot harder for someone to dogpile you when sending you a
message isn't just two taps away for all their followers—but that only goes so
far. I don't know if there's a great solution here, especially given that no
public presence will ever be truly safe from dedicated harassment.

Smaller-scale avoidance is somewhat easier. RSS readers could in principle
filter out reposts from people you don't want to see—the only one I know for
sure has this feature is [Inoreader] (and then only with a paid account), but
it's not hard to envision. If all my dreams come true and blogs do truly have a
wide resurgence, maybe this will become a valuable differentiating feature. And
again, the fact that blogs are much less of a firehose than social media means
that it's that much easier to periodically just wince and scroll past a repost
of someone you dislike.

[Inoreader]: https://www.inoreader.com

## Can we do it?

Is a sociable web even something that's possible to create? In 2024, it's easy
to despair at computers in general or the internet in particular being usable
for anything good at all, and yet here you are reading my words, hoping to make
some sort of connection with me or with my ideas. I believe in the power of
those connections. It may be true that no corner of the world is safe from the
corrosive power of capitalism, but so too is no corner of the world impervious
to human flourishing.

I think we can do it. In fact, I think we will—but whether that starts now or
years from now depends on us. What precisely a sociable web will look like, I'm
not sure. That's why here I've chosen to focus on the social goals first and
make the technology secondary. But I *do* believe that enough technology exists
today to at least take a stab at it, and I want you to join me in that.

The deepest virtue of independent websites communicating with loosely-coupled
conventions and protocols isn't anything technical. It's the fact that you can
_just do it_. You don't need a platform to exist, you don't even need anyone
else to be doing the same thing (although it's more fun that way). You can write
a blog and people can read it via RSS or just by loading it up every now and
then[^girlfriend]. You can hook up as much IndieWeb technology as you
want[^tech], or just focus on the cultural aspect by writing link roundups and
leaving comments on the stuff you read.

[^girlfriend]: I learned recently that this is how my girlfriend has been
  reading this blog and it blew my mind. I have since promised to give her a
  personalized introduction to feed readers.
  
[^tech]: If anyone wants help with this by the way: open invitation. I would
  love to get more people up and running with `h-entry` and Webmentions.

The crucial part is that you participate, and help to shape the web you want to
exist in. Don't just let the dictates of some megaplatform constrain the way you
connect with people. You have the power to make the web a place for people.
