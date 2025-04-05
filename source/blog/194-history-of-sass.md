---
tags: [ask, code, sass]
---

{% ask "Lindsay Michael",
    title: "History of SASS" %}
  I am a student writing a short paper about SASS and have run into a bit of a
  black hole when it comes to the development of the language. Beyond a few
  archived blog posts, I can't find a whole lot about the conceptualization or
  development of the language. Would you have any pointers toward that
  information? I'm curious about how the idea for the preprocessor came up and
  how the development team came together.
{% endask %}

I guess there isn't much about this up anywhere particularly easy to find, is
there? Sure, let's get into the history.

## It All Starts with Haml

So, before Sass ([not SASS](https://sassnotsass.com/)), there was
[Haml](https://haml.info/). Haml was created way back in the summer of 2006 by
[Hampton Catlin][][^name], when Ruby on Rails had lit the web development world
on fire and everyone was rushing to invent cool new ways of writing
server-side-rendered web applications with light [AJAX] support. Rails used YAML
for its configuration and Hampton liked the terseness and indentation, so (as he
once described to me) he took a template written in [ERB][] (the dominant
templating language at the time) and just deleted redundant characters until he
got something that felt more [DRY]. After some tweaks, the result looked
essentially like modern Haml:

[^name]: Did Hampton call it "Haml" because it sounded kind of like his name
         combined with "HTML", and then come up with an acronym after the fact?
         Absolutely yes.

```haml
%section.container
  %h1= post.title
  %h2= post.subtitle
  .content
    = post.content
```

[Hampton Catlin]: https://en.wikipedia.org/wiki/Hampton_Lintorn-Catlin
[AJAX]: https://en.wikipedia.org/wiki/Ajax_(programming)
[ERB]: https://en.wikipedia.org/wiki/ERuby
[DRY]: https://en.wikipedia.org/wiki/Don%27t_repeat_yourself

That fall, just as Haml was released to the public, I was in college taking a
Software Design and Development course[^1] in which the instructor encouraged us
to get involved with open source projects. Rails being the big thing at the
time, I hung out on the mailing list[^2] looking for good opportunities to dip
my toes in. When Haml got announced, it was a perfect opportunity: it was still
small and easy to understand, and it had a number of clear tasks that needed
doing. I started sending patches, and pretty quickly (at least in part by virtue
of having a lot more free time between classes than Hampton did with a full-time
job), I became the *de facto* lead developer.

[^1]: This course was taught by [Gayle Laakman McDowell] when she was still at
      Google, a few years before she ended up hitting it big writing interview
      and career advice books. I haven't actually read any of those books, but
      her class was fantastic.

[Gayle Laakman McDowell]: https://en.wikipedia.org/wiki/Gayle_Laakmann_McDowell

[^2]: Back then, instead of Discord servers or subreddits, open source projects
      had email lists. They might have had IRC channels too, but those were
      really just for support; any discussions or announcements happened over
      email lists because they could be easily archived and searched and didn't
      require any particular kind of account. If you're thinking "but Discord
      doesn't solve any of those problems either", you're right!

## Sass Emerges

Haml quickly becomes quite popular in the Rails world. Writing HTML closing tags
by hand kinda sucks, it turns out, and we're not the last to try to solve this
in various ways (although we may have been the first). Hampton is a big ideas
guy, and he's always excited to find another big thing to dig into. By this
point we're working together pretty closely, so at some point in late 2006 he
messages me about his idea for "Haml for CSS", which he wants to call "Sass".

That was the original pitch Hampton sold to me: just like Haml was basically
just a different syntax for HTML (or more accurately, for ERB, since it did
include the ability to inject Ruby code), Sass was going to be just a different
syntax for CSS. The first draft didn't even have variables, although by the time
it was actually released[^3] we had added them (at the time called "constants").
Hampton drafted some examples of how the language would look and wrote [a quick
prototype], which I ended up [totally refactoring] shortly thereafter. As for
Haml, I did most of the coding work for Sass.

[a quick prototype]: https://github.com/sass/ruby-sass/commit/fa5048ba405619273e474a50400c7243fbff54fe
[totally refactoring]: https://github.com/sass/ruby-sass/commit/015a1b191d06cf418b519e33d98f86970e0512ac

It also looked dramatically different than the indented syntax does today:

[^3]: For a long time, Sass was actually distributed as part of the Haml
      RubyGem, until the release of Sass 3.3.0 in 2014 on its own. This was
      initially a naked attempt on our part to promote our new language by
      piggybacking on the initial popularity of Haml, although ironically Sass
      quickly overshadowed its older sibling.

```
!color = #fff

body
  :margin 0
  :font 0.85em "Lucida Grande", "Trebuchet MS", Verdana, sans-serif
  :color = !color
  :background url(/images/global_bg.gif)
```

Initially, we were a lot less concerned with making the syntax look at all like
CSS than we were with making it feel like Haml. Haml distinguished each syntax a
line could have using its initial character, so we used `:` as the initial
character for properties in Sass. Haml used `=` to indicate that the contents of
a tag should come from a Ruby expression, so Sass used `=` to indicate that it
should come from a Sass expression and didn't parse it at all otherwise.

Looking back, a lot of these design choices seem quaint (perhaps even
wrongheaded) in retrospect. But there was already an idea here that would become
critical to the entire concept of "preprocessors" and what Sass would eventually
become: *there was no Ruby code in the stylesheets at all*. We knew from the
beginning that we wanted to support user-defined constants[^4], but rather than
just having people assign Ruby variables and inject Ruby code, we knew from the
beginning we wanted a syntax that was specific to Sass.

[^4]: CSS custom properties didn't exist yet[^5], and the absence of a way to
      abstract out and name repeated values was keenly felt by anyone writing
      CSS to any more than a cursory extent

[^5]: They didn't exist yet because they were largely inspired by Sass,
    something I will go to my grave extremely proud of.

## The Rails Mindset

To understand where we were coming from, we have to go back again to Haml and
the context it emerged in. The early Rails world was hard to describe in a
modern context, because the web development ecosystem it existed in was orders
of magnitude smaller. Rails in 2006 had vastly fewer users in an absolute sense
than React does today, or even something smaller like Vue.js. But it had *all*
the mindshare. Everyone who was at all interested in the cutting edge of web
technology was either using Rails or building another framework that was a
reaction to Rails.

And this wasn't just because Rails had good PR (although without a doubt that
contributed). Rails was the first really popular open-source existence proof
that web development could be simultaneously _architecturally-sound software
development_, unlike tools like PHP or Perl which at the time were tightly
coupled to the [CGI] mode of page-by-page rendering; and also _lightweight and
developer-oriented_, unlike tools like ASP.NET or whatever Java people were
doing at the time. It made people sit up and take web development seriously, and
led to a huge boom in thought and discussions and articles[^6] about how best to
structure these applications.

[CGI]: https://en.wikipedia.org/wiki/Common_Gateway_Interface

[^6]: Rails' ascent coincided with the apex of blogging culture, which
      contributed to this intellectual atmosphere as well. There were a handful
      of people who could regularly write essays about web development that
      would then be read by essentially everyone influential. In a kind of sad
      poetry, the Rails community itself contained the seeds of the downfall of
      this culture: Twitter was created that same year in the Rails shop Odeo,
      and went on to be the tentpole for the social media culture that
      obliterated the ubiquity of personal blogs.

Haml was heavily influenced by these discussions. In particular, it took the
idea of "thin views" very seriously. Rails followed a Model/View/Controller
architecture, where the template framed as a "view" of the underlying data. It
was only supposed to be responsible for displaying the data, not manipulating it
or even really getting it into a form that was easy to display. To that end,
Hampton intentionally made it annoying to write complex logic in Haml. For the
first few releases, Haml didn't even have a way of writing Ruby statements that
didn't emit values to HTML specifically to encourage people to put all that
logic in the model or controller instead.

So when we were designing Sass, making sure it wasn't too powerful in the wrong
ways was at the top of our minds. We didn't want people just dumping a bunch of
code in their stylesheets, because if views should only express the translation
from a code object into a document structure, then stylesheets should only
express styles. So when we decided to add constants, we chose to invent our own
little expression language that was particularly suited to the needs of CSS
rather than just embedding Ruby expressions and calling it a day. This had its
own practical benefits as well: it allowed us to add first-class support for CSS
types that didn't have literal Ruby equivalents, like dimensions (`10px`,
`50%`), colors, and unquoted strings.

## The Preprocessor is Born

I think this was the key insight that caused Sass to create the class of _CSS
preprocessor_ rather than just being a template system. CSS template systems had
existed before this, at least to the extent that people were running CSS through
ERB (and surely also PHP and so on). But no one writing those was thinking much
about how their language design would feed back into the quality and
maintainability of stylesheets written in that language. Sass was, even if at
the time it was awkward and not fully fleshed-out.

And even as limited as it was, people got really excited about it! It's hard to
overstate how valuable constants in CSS were alone, and the core Haml fanbase
liked having an indented way to write it. We spent the next year largely just
making iterative improvements—adding features like comments, `@import`[^7],
support for @-rules, and just generally tightening up various corners of the
language.

I was still the primary developer of the language, and most of the design
direction was coming from Hampton and me talking to one another[^8]. I was still
in college, I had only learned to program at all a few years prior, and I was
having the time of my life writing code that actual people out in the world were
not just using but enjoying. I was majoring in computer science, but my actual
classwork didn't involve much code, and I've always just really _liked_ the
process of writing it and the feeling of contributing something to the world.

Through all this time, we were almost exclusively interacting over the internet.
Hampton was at the time living in Toronto; I was (and still am) in Seattle. His
company, the now-defunct Unspace Interactive, did fly me out to a few
conferences over the years where we were able to spend time together in person,
but those were mostly *not* heavily technical discussions. We collaborated over
instant messenger (probably Google Chat at the time?), email, and issue
trackers.

An important aside: in retrospect, this whole situation was more than slightly
exploitative. I was writing (and continue to write!) code that was being used by
corporations to make a profit without seeing any remuneration, either
commensurate to that profit or to my labor. This certainly wasn't Hampton's
fault, or his company's—it's the unfortunate nature of open source in a
capitalist world. I'm still proud of the work I did, and I don't regret doing
it, but I think it's worth mentioning that I can't wholeheartedly endorse that
people take the same path of doing a lot of labor for no compensation. I was
very lucky to have the stability to spend so much time and energy on this _and_
to work on a project and at a time when that would lead to a lot of future
career opportunities..

[^7]: One of my deepest regrets is how messy we made the semantics of `@import`
      initially. This was the downside of coming from a Ruby context—we
      essentially copied Ruby's `require` system, which did little more than
      evaluate a file in the global scope. We didn't even think to copy the part
      where it wouldn't load the same file twice. I'm _still_ paying down the
      technical debt from that nearly-20-year-old design decision.

[^8]: At times I may not have kept him as looped-in as I ought to have. Sorry,
      Hampton!

## The next level

Anyway! I wasn't the only person working on Sass at the time. In addition to
Hampton's occasional code contributions, we were getting a _lot_ of patches from
users. Before GitHub existed[^9], Hampton ran an issue-tracking tool called
[Trac] that allowed people to upload patch files that we'd then land in the
[Subversion] project. It was not great! GitHub has done some nasty stuff in the
years since[^10], and the long-term effects of centralizing open source
developments in a single corporation's hands are not great, but at the time it
felt like a breath of fresh air coming from within our community.

[^9]: Sass actually migrated from Hampton's self-hosted SVN repository onto
      GitHub during this time period. We were one of the earliest projects to do
      so, even in the Ruby world that made up most of GitHub's early adopters.
      [My GitHub user ID] is 188; [Hampton's] is 111.

[My GitHub user ID]: https://api.github.com/users/nex3
[Hampton's]: https://api.github.com/users/hamptonmakes
[Trac]: https://trac.edgewall.org/
[Subversion]: https://subversion.apache.org/

[^10]: Defense contracting and nonconsensualy training large language models on
       their users' code being the two that stick out most in my mind, although
       the cofounder [getting ousted for sexual harassment] is also pretty
       damning. Fun fact: the "TOML" format that Rust uses for its config files
       is not only named after this guy, he's still involved with its
       development! Gross!

[getting ousted for being a sex pest]: https://www.wired.com/2014/04/tom-pw/

One such contribution was from one Garry Hill[^11], and would go on to shape the
future of the language: [the addition of mixins] in April 2008. Although mixins
were very limited initially—they didn't even have parameters in their first
release!—they represented a broader level of abstraction than had been possible
before in stylesheets at all. While Haml was still just another syntax for HTML,
mixins cemented the idea that Sass was in a totally different tier of
expressiveness relative to vanilla CSS, and they opened the door for a cascade
of iterative improvements that would shape Sass into what it is now.

[^11]: There are a few "Garry Hill"s currently working in tech who I can find on
       the internet, but I can't definitively identify any of them as the person
       who submitted this change. He showed up, added mixins, and left without a
       trace. Garry, if you see this, let me know what you're up to these days!

[the addition of mixins]: https://github.com/sass/ruby-sass/commit/917bd658c5e9f6c8e2d3e8e7e7cdab45919b3856

In June 2008, we added the first built-in Sass function, `hsl()`. In August, we
added mixin parameters, booleans, `@if`, `@for`, `@while`. In October, we
started allowing "constants" to be reassigned (and, correspondingly, started
calling them "variables" instead). All of these made Sass less of just an
alternative stylesheet syntax and more of a language in its own right. Although
it would take another two years to add `@function`, we were already tossing
around the idea.

## The SCSS era

Concurrently, there were a couple important things brewing. I had begun working
closely with [Chris Eppstein], who had created [Compass][][^12]. He started
submitting a number of pull requests to Sass, and we pretty quickly decided to
bring him on as a core team member. By this point Hampton was mostly focused on
other projects, so Chris and I made most of the major design decisions together
for the next few years.

[Chris Eppstein]: https://github.com/chriseppstein
[Compass]: https://github.com/Compass/compass

[^12]: Compass is defunct now, but it was the first framework written for Sass.
       It started out as a port of Blueprint after Chris failed to convince the
       team to use Sass natively[^13], but it eventually grew to be a broader
       framework with flexible tools for layout and browser compatibility. It
       eventually faded from relevance along with Ruby, and especially because
       browsers' native support for layout and tools like autoprefixer rendered
       most of its functionality outmoded.

[^13]: They ended up reversing their course on this later on, of course.

Several of those decisions were strongly influenced by our first real
competitor: [Less], first released in May 2009. At the time also written in
Ruby, Less was clearly heavily inspired by Sass, but advertised one[^14] key
distinguishing feature: it claimed to be[^15] a superset of CSS. It quickly
boomed in popularity, and was even threatening to displace Sass as the most
popular preprocessor. We took this as a clear sign that the desire for the power
of a preprocessor had far outstripped the desire for a different syntax for CSS,
and we set about designing and building the SCSS syntax, which would go on to
release with Ruby Sass 3.0.0 a year later in May 2010.

[Less]: https://lesscss.org/

[^14]: There was actually another feature that was also frequently cited by
       users as a benefit: in Less you could use any style rule whose selector
       was just a CSS class as a mixin, rather than declaring mixins using a
       different syntax. We considered this an anti-feature, both because it
       treated class names as a uniquely special type of selector, and because
       the lack of separation between style rules intended as mixins and style
       rules intended as styles made it inherently risky for stylesheet
       libraries to change _any_ styles without potentially breaking people
       using it in ways they hadn't intended. We instead took a different
       approach to the goal of "re-using existing style rules" by creating [the
       `@extend` rule].

[the `@extend` rule]: https://sass-lang.com/documentation/at-rules/extend/

[^15]: The early versions of Less were more than a little haphazard in their
       support of the CSS spec. I would eventually dig pretty deeply through its
       implementation in the process of making a Less-to-SCSS transpiler, and I
       found plenty of places where it would fail to parse valid CSS correctly,
       or even just choke on it. I'll admit that it irked me how popular it was
       despite this, given how much time we'd put into aligning Sass with the
       CSS spec at that point.

The addition of SCSS led to a number of additional changes to the way we thought
about the design of the syntax. We were committed to being as close to a
superset of CSS as possible[^16], and in pursuit of that we wanted to make the
new syntax feel more "CSS-y". We'd already changed the indented declaration
syntax to allow `color: blue` rather than `:color blue`, but with SCSS we
decided to remove the distinction between "script" values (written `property =
expression`) and "literal" values (written `property: expression`). This in turn
committed us to being able to parse all expression-level CSS as SassScript,
which led to a cascade of other small changes.

[^16]: There are still a few edge cases where technically valid, meaningful CSS
       is interpreted differently by Sass. We're working on removing `@import`
       and the use of `/` as division outside `calc()`, but the last case—Sass
       interpolation syntax in custom property values—will for better or worse
       always prevent us from being a _true_ superset.

We also became much more concerned with avoiding forwards-incompatibilies with
new CSS syntax that could theoretically be added in the future. We changed the
variable character from `!` to `$` to avoid conflicting with the existing CSS
`!important` syntax, replaced the `||=` assignment operator with `!default`,
introduced `@mixin` and `@include`[^17], and expanded the scope of what could be
interpolated. Sass 3.0.0 was really the first modern-looking release of the
language. It laid a lot of groundwork for the future, and also made a lot of
decisions that I would eventually spend a bunch of time undoing.

[^17]: Previously in the indented syntax, mixins were declared with `=` and
       included with `+`, following the Haml style of syntax being determined by
       the first character on a line. You can [still use single characters in
       the indented syntax], although these days I find them needlessly
       line-noisey.

[still valid in the indented syntax]: https://sass-lang.com/playground/#eJwzMLTNzazIzONSUEjOz8kvslIoSk3h4krJLAOKaIOlAL4yCrM=

## Road to Dart Sass

Over the next few years, development slowed on Ruby Sass. I had graduated
college and started programming full-time, which substantially diminished the
amount of time and energy I had for programming projects that weren't my day
job. Hampton was busy with Wikimedia, and most of Chris's spare programming time
was wrapped up in Compass. We certainly made progress, gradually introducing
many of the major features that still exist today like lists, maps, user-defined
functions, more advanced mixins, and on and on.

In 2012, driven by the waning popularity of Ruby in the face of the rise of
Node.js, Hampton—then working at Moovweb—launched a project to create a more
widely-usable Sass implementation written in C++. This would become [LibSass],
which was initially written largely by Hampton's Moovweb colleague [Aaron Leung]
before eventually being maintained by [Michael Mifsud] and [Marcel Greter]. I
can't give a tremendous amount of detail on the internal development process
here, because I never worked on it myself, but I can talk about how it was used.

[LibSass]: https://sass-lang.com/libsass/
[Aaron Leung]: https://github.com/akhleung
[Michael Mifsud]: https://github.com/xzyfer
[Marcel Greter]: https://github.com/mgreter

LibSass was quickly adopted by the Node.js community through the [`node-sass`]
wrapper package. This turned out to be a bit of a double-edged sword for Sass as
a language: on the one hand, `node-sass` was vastly faster and easier to get up
and running (even given the headaches of building a C++ Node.js plugin[^18])
than Ruby Sass, which was doubtlessly crucial for the continued popularity of
Sass as the web development center of gravity shifted away from Ruby and towards
Node in the early 2010s; on the other hand, poor communication between the Sass
core team and the LibSass maintainers led to it being essentially a black-box
reimplementation whose internal diverged _massively_ from Ruby Sass, which ended
up making LibSass fairly buggy, largely incompatible, and increasingly difficult
to add new features to.

[`node-sass`]: http://npmjs.com/package/node-sass

[^18]: Inexplicably, this process _still_ uses a tool [named after a racial
       slur]. This industry can be a nightmare sometimes.

[named after a racial slur]: https://github.com/nodejs/node-gyp

It was clear that something needed to change. By the middle of the decade, Ruby
was clearly not meeting our needs anymore, so we sat down and tried to figure
out what came next. We considered a number of possibilities:

* Leaning into LibSass and declaring it the official implementation moving
  forward. Although this had the obvious benefit of an existing implementation,
  the reality was that we'd probably need to rewrite the whole thing from the
  ground up anyway.

* Using Rust, which was at the time still quite young. I did do a bit of work to
  prototype this, and came to the conclusion that the recursive object structure
  of ASTs didn't play nicely at all with Rust's memory management schema. It
  would also likely force us to write our own garbage collector for Sass objects
  rather than relying on the native language's, adding a lot of complexity in
  exchange for native-code speeds we weren't sure we even needed.

* JavaScript, which had the sizable benefit of being the new *lingua franca* of
  the web (and being much more likely to hold that position than Ruby thanks to
  its monopoly on the browser). The biggest drawback here was that, while the V8
  JS engine was substantially faster than Ruby, we weren't sure we could get the
  performance we wanted.

* Dart, which we ended up settling on. Despite being quite obscure at the time,
  Dart had a number of advantages: it had its own VM that could run code close
  to native speed, it was easy to distribute cross-platform Dart executables,
  and it could compile to JS for even easier distribution and a high level of
  pluggability. I was also working on the Dart team at the time, so I could much
  more easily justify using some of my work hours on writing a new
  implementation of Sass than I could for any other language.

I spent 2016 and 2017 working on Dart Sass, using all the lessons I'd learned
from Ruby Sass to improve the structure of the code and using the substantial
corpus of test cases that Chris and the LibSass team had built up to verify its
behavior. In March 2018, we released Dart Sass 1.0.0, and in April we
[deprecated Ruby Sass]. In October 2020, [LibSass followed suit].

[deprecated Ruby Sass]: https://sass-lang.com/blog/ruby-sass-is-deprecated/
[LibSass followed suit]: https://sass-lang.com/blog/libsass-is-deprecated/

In 2019, I had the opportunity to start a dedicated CSS/Sass infrastructure team
at Google, which has included [Jennifer Thakar], [Awjin Ahn] (who has since
moved on to Peregrine), [Carlos "Goodwine"], and [Pamela Lozano], all of whom
have made numerous contributions to Sass (Jen in particular is responsible for
the migrator tool). Beyond that point, the history is too recent for me to put
in context effectively, but hopefully it will be easier to find information from
the last few years.

[Jennifer Thakar]: http://github.com/jathak
[Awjin Ahn]: https://github.com/awjin
[Carlos "Goodwine"]: https://github.com/goodwine
[Pamela Lozano]: https://github.com/pamelalozano16

I'm sure this is a bit more information than you bargained for, but as I was
writing this post I realized that a lot of this information has never been
written down in any kind of unified way before, so I appreciate you giving me
the impetus to do so.
