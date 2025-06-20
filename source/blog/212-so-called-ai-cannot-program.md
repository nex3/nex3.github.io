---
title: 'So-Called "AI" Cannot Program'
tags: [so-called ai, article]
---

I contend that it is impossible for so-called "AI", by which I mean the crop of
convolutional neural network-based pattern-filling tools that is currently in
the throes of a hype cycle that puts crypto and NFTs to shame, to meaningfully
do programming. As more and more of the mind bogglingly rich tech oligarchs lead
their followers into the delusion that these tools are useful in any way
remotely comparable to their cost, I think it's worth taking the time to
articulate exactly why this is, even if it's already intuitively clear to the
more thoughtful practitioners of the craft.

We must begin, as always, with a clarity of the term under discussion.
"Programming", in its broadest sense, is the act of making a computer do
something—but "do something" is itself vague, so we'll need to dig a little
deeper into that. To understand it, please bear with me as I establish some
useful terminology.

## A Brief Meander into the Philosophy of Language

Let's talk about syntax and semantics. If you're a programmer, you may be
familiar with these terms as they're used to discuss programming languages. If
you're not, that's fine too. I'll do my best to explain them in brief.

Syntax and semantics are two related ways of talking about an abstract
structure. Although the concepts were originally developed to describe human
languages, they can be used by analogy for all sorts of things, which is what
I'm building up to here. They're very useful particularly for understanding how
humans[^1] relate to those structures and relate those structures to the world
as they understand it.

[^1]: I'm using "humans" here as a shorthand for "sentient beings with minds
      remotely comparable to humans", because humans are the only such beings
      known to exist. I'd use "people" instead but it doesn't have an adjectival
      form nearly as graceful as the adjective "human". For whatever it's worth,
      I think the same thing would apply to any non-human species or even
      digital sentience, which to be clear is very much still the domain of
      science fiction and is not a realistic end state for the branch of neural
      network technology that I'm discussing here.

"Syntax" is simply the structure itself, in all the technical detail of how it
fits together. The syntax of a human language is the way its words and sentences
fit together, what's "allowed" and "not allowed" by the subtle and mercurial
rules we all internalized as children (or adults, for second languages and
beyond). In English, "ran boy" is not a valid sentence due to the language's
semantics, although most native speakers would probably guess that it means "the
boy ran". Noam Chompsky wrote "colorless green ideas sleep furiously" as an
example of a sentence that is syntactically valid despite being nonsense.

The fact that that sentence is nonsense is the domain of "semantics". Semantics
are the human interpretation of a structure, the meaning we ascribe to it and to
the best of our ability share with those around us. For example, although the
syntax of the sentences "みんなさんはピッコロさんを大好きだよ！" and "Everyone
loves Piccolo!"[^2] are completely different, their meaning—their semantic
content—is exactly the same. And that meaning is something that humans bring to
them, not something that is in any way intrinsically associated with those
particular wiggly lines in that particular order.

[^2]: Thanks to {% mention 'Cassie' %} for providing these example sentences.
      All the languages I know well enough to create examples in have annoyingly
      similar syntax to English, which makes them unsuitable for this example.

Although syntax is a very useful concept in its own right, in this post I really
want to focus on semantics. So remember: semantics is meaning, and specifically
it's meaning applied to a structure from outside by humans.

## A Better Definition of Programming

Let's go back and use our newfound understanding of semantics to improve our
definition of "programming". Programming is the act of making a computer enact a
semantic task. The computer's silicon internals, its RAM and hard disk and even
its pixels, are the syntax here. It has no intrinsic meaning, just a set of ones
and zeros and a very complex set of rules for transforming them. The semantics
are the human interpretation of what it's doing and why, the understanding of
those numbers and pixels as a map to the nearest ramen joint or a simulation of
a puppygirl begging for treats.

At this point, the easy way out would be to stop here and say "LLMs aren't
sentient and thus they can't produce semantics and thus it doesn't count as
programming, end of blog post." But that's not what I'm trying to say here.
After all, if a human tells an LLM "write me a puppygirl virtual pet", the human
is still there to apply semantics even if the neural network has no mind to
understand any part of that[^3].

[^3]: This is the footnote where any other author would explain Searle's Chinese
      Room thought experiment. I'm not going to do that. The Chinese Room pisses
      me off. Searle pisses me off. If you ask me to elaborate one-on-one I
      will, but you're buying the drinks.

The problem is that, although this is a good bird's-eye-view understanding of
what programming is, it doesn't capture some of the most important aspects of
the actual practice of writing code. Despite what dramatizations would have you
believe, when a human sits down to write a puppygirl virtual pet, they don't
just start typing as fast as their fingers can move and stop when they have a
good girl who wants walkies. Most of the time one "spends programming" is
actually spent thinking[^4], not typing.

[^4]: Unless your compiler is [really fucking slow], in which case maybe you
      spend most of your time waiting. I got a lot of reading done at my first
      programming internship.

[really fucking slow]: https://xkcd.com/303/

There are broadly two categories of thing one might think about when
programming. The first is what I'll call scut work: the tedious and annoying
process of trying to figure out how to get things up and running, why stuff that
you expect to work isn't, and how to use that damn API which looks like it was
designed by someone whom you personally wronged and is out for revenge. You can
even extend this into the realm of pure typing to include writing boilerplate,
which may be more or less of a factor depending on the details of a given
project.

Scut work, I will grudgingly admit, is something that LLMs can be useful for. I
contend that their use is not at all worth the costs, not just in narrow terms
of the environmental and moral externalities of creating and operating such
tools relative to the alternatives, but also in broader terms that I'll
elaborate on below. But this is not covered by my stronger point that LLMs can't
program, because scut work is not the true heart of programming.

The true heart of programming is the second category of things a programmer
might think about: the semantics of the program.

## Semantic Refinement

The inevitable outcome when someone sits down with some to write a program with
some high-level semantic goal is, one way or another, hitting a wall. This can
come in various forms: perhaps they run their code and see behavior they didn't
expect, or they get a compiler error, or they can't figure out how best to name
their classes. Whatever the symptoms, the cause is the same: they've run into
the limits of their initial understanding of what they were trying to do.

The preface to the first edition of Abelson and Sussman's seminal introductory
programming textbook _Structure and Interpretation of Computer Programs_
famously says "We want to establish the idea that a computer language is not
just a way of getting a computer to perform operations but rather that it is a
novel formal medium for expressing ideas about methodology. Thus, programs must
be written for people to read, and only incidentally for machines to execute." A
program is an expression of semantic "ideas about methodology" in a syntax
rigorous enough for that methodology to both be unambiguously understood by
other humans *and* to be executed swiftly and automatically by a machine.

That level of rigor is far beyond what humans use to think about the world
around them or the problems they're trying to solve, and it's the impact of the
programmer's human semantic understanding on the computer language's need for
rigor that creates the inevitable wall. But unlike the scut work, climbing that
wall isn't a tedious chore. It's absolutely logically necessary. It is
intrinsically the process of refining your loose semantic model to close some
gap you didn't even know was there.

This is the beauty of programming, the core thing that makes it (as A&S say) a
truly novel medium for communication, beyond even the mathematical rigor that
prefigured it. Because a program will not work[^5] until it is a reasonably
faithful syntactic representation of the programmer's semantic ideas,
programming is a forcing function for making loose semantic ideas rigorous—to
refine them. The code then is merely a static representation of the current best
refinement of the semantics, if I may further abuse human language.

[^5]: Depending on the laxity of the programming language, it may still _run_,
      but it won't work in the sense of doing what it's supposed to do. It would
      just be the programming equivalent of "colorless green ideas sleep
      furiously"—syntactically valid but devoid of meaning.

Let's use this to produce a new, even better definition of programming.
Programming is the iterative refinement of a semantic task to the point of
sufficient rigor that it can be executed mechanically.

## Bringing it Back to So-Called "AI"

A human programmer isn't being paid to type, or even to do the scut
work—although being able to do the scut work as well is essential, in the same
way that a carpenter needs steady hands even though their job isn't holding
their hands still. A programmer is paid to refine semantics. They are asked to
have a clear semantic understanding of the goal to be achieved and to make
choices about what achieving that goal really means in practice.

Avoiding this work by handing it off to an LLM means avoiding making those
choices. These programs *cannot* choose, not just in a philosophical sense, but
in a practical one. They are pattern-generators. Even granting the assumption
that the technology will advance substantially beyond where it is today and be
able to create large-scale programs that run, they will always produce the most
likely syntactic structure given their inputs. In the best case, this will force
the program's semantics to look like the average semantics of every similar
program in the LLM's inputs. More likely, they'll produce a set of abstractions
that are superficially applicable but subtly unsuited to the specifics of the
task at hand.

Here's the thing: if a task was so similar to existing programs that the average
structure would work, even with a few tweaks, the existing programs could have
been used instead! There are many well-established means of abstracting and
re-using repeated structures in programming. The entire industry is built on
layers and layers of abstractions created from tasks that humans realized had
enough in common to create a shared semantic base. LLMs bring nothing of value
to this process—when all is said and done, they're just a fancy copy/paste
operation, and like any copy/paste operation they may be quick do in the moment
but they leave you with so many copies of essentially the same thing that they
become impossible to maintain.

This brings me back to why LLMs are bad for scut work, too. The sheer
unpleasantness of programming scut work is what drives the creation of all these
abstractions. The C programming language exists because tracking pointers by
hand in assembly is exhausting. C++ exists because writing boilerplate for
objects in C is exhausting. Java exists because handling memory management in
C++ is exhausting. And on and on—every innovation in tooling, frameworks, and
programming languages is driven by the desire to reduce scut work. To shrug and
say "I'll just use an LLM for it" is to stagnate those innovations, because LLMs
make nothing better in their passing. They only paper over what is already bad.
