---
tags: [computer power and human reason, so-called ai]
---

I probably should have read [*Computer Power and Human Reason*] years ago, when
all this hype really started getting going. Honestly I should probably have read
it in college when I was first getting into programming! But the next best time
is now, so I borrowed: my mom's inscribed copy a few months ago (which to be
fair she has also never read) and got started.

[*Computer Power and Human Reason*]: https://en.wikipedia.org/wiki/Computer_Power_and_Human_Reason

A lot of the first few chapters is fairly straightforward for anyone who has a
basic grounding in computer science. Weizenbaum[^1] is walking an odd line where
he's trying to explain concepts like "turing machines" and "assembly languages"
to a lay audience without sacrificing either rigor or a relatively academic
tone. I'm curious how well this works for someone who genuinely has no prior
exposure to this material; to me, all of this is review of the basics of the
field, and so ended up feeling a little boring.

[^1]: Yes, it _is_ weird to refer to him this way.

But then I got to this section which blew my socks clean off my feet (emphasis
mine):

> The idea that a person can write a program that embodies anything he
> "thoroughly understands" is at least equally problematical. Understanding
> something always means understanding it at a certain level. An actuary uses
> some fairly sophisticated mathematical tools whose fundamentals he almost
> certainly doesn't understand or care anything about. Everyone who makes change
> uses arithmetic, but very few people know or care much about the beautiful
> axiomatic system on which arithmetic is based. In effect, we all constantly
> use subroutines whose input-output behavior we believe we know, but whose
> details we need not and rarely do think about. To understand something
> sufficiently well to be able to program it for a computer does not mean to
> understand it to its ultimate depth. There can be no such ultimate
> understanding in practical affairs. **Programming is rather a test of
> understanding. In this respect it is like writing; often when we think we
> understand something and attempt to write about it, our very act of
> composition reveals our lack of understanding even to ourselves.** Our pen
> writes the word "because" and suddenly stops. We thought we understood the
> "why" of something, but discover that we don't. We begin a sentence with
> "obviously," and then see that what we meant to write is not obvious at all.
> Sometimes we connect two clauses with the word "therefore," only to then see
> that our chain of reasoning is defective. Programming is like that. It is,
> after all, writing too. But in ordinary writing we sometimes obscure our lack
> of understanding, our failures in logic, by unwittingly appealing to the
> immense flexibility of natural language and to its inherent ambiguity. The
> very eloquence that natural language permits sometimes illuminates our words
> and seems (falsely, to be sure) to illuminate our undeserving logic just as
> brightly. An interpreter of programming-language texts, a computer, is immune
> to the seductive influence of mere eloquence. And words like "obviously" are
> not represented in the primitive vocabularies of any computers. A computer is
> a merciless critic. Therefore the assertion that one understands a thing
> sufficiently well to be able to program it is, first of all, an assertion that
> one understands it in very particular terms. In any case, it can be no more
> than a boast that may well be falsified by experience.
>
> The other side of the coin is the belief that one cannot program anything
> unless one thoroughly understands it. This misses the truth that programming
> is, again like any form of writing, more often than not experimental. **One
> programs, just as one writes, not because one understands, but in order to
> come to understand.** Programming is an act of design. To write a program is
> to legislate the laws for a world one first has to create in imagination. Only
> rarely does any designer, be he an architect, a novelist, or whatever, have so
> coherent a picture of the world emergent in his imagination that he can
> compose its laws without criticism from that world itself. That is precisely
> what the computer may provide.[^2]

[^2]: Weizenbaum, Joseph. _Computer Power and Human Reason_. W. H. Freeman and
    Company, 1976, pp. 107-109.

It is beyond my capacity to express how strange it was to see [exactly the same
argument I made] articulated nearly fifty years earlier, without coding LLMs as
a motivating factor, _by my own grandfather_. Maybe it's obvious to anyone who
takes seriously the SICP principle that "computer language [...] is a novel
formal medium for expressing ideas about methodology", although even that line
was written eight years after *Computer Power and Human Reason* and may in fact
have been inspired by it (both works came out of MIT, after all).

[exactly the same argument I made]: https://nex-3.com/blog/so-called-ai-cannot-program/

But even if it is obvious, it still strikes me as a shockingly prescient point
to choose to emphasize at a point where automatically converting a vague
high-level natural language description[^nlp] into a full program was still
science fiction. As I argued in my earlier post, the act of programming is
critical to developing a human understanding of the logic being programmed, and
a misunderstanding of this point is critical to the failures that lead people to
believe that LLM-generated code could be useful for anything more than a
band-aid over a gaping lack of suitable abstractions. Weizenbaum made this
point, as far as I'm aware, long before anyone else.

[^nlp]: On that subject, Weizenbaum says:

    > [M]any professional programmers believe that their craft is difficult
    > because the languages with which they must deal have rigid syntactical
    > rules. There is > therefore a persistent cry for natural-language, e.g.,
    > English, programming systems. Programmers who hold to this believe have
    > probably never tackled a truly difficult problem, and have therefore never
    > felt the need for really deep criticism from the computer.[^3]

[^3]: _Ibid_., 109.
