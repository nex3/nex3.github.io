---
title: "Becoming a Video Game Scientist Part 1: Archipelago"
tags: [article, dark souls 3, modding]
---

The bulk of my hobby time for the past six months or so has been spent not
playing video games, nor yet creating them, but autopsying them. Layer by layer
I peel them apart, examining every cartilaginous connection and noting down how
each muscle pulls on the bone structure beneath. I am building on the work of
those who came before me, a great berth of knowledge at my back and many fine
tools at my hands without which my task would be too overwhelming to
contemplate. I give back to this world by crystallizing the knowledge I find
into forms that may be re-used and built upon long into the future.

In plainer terms, I've been spending a lot of time reverse-engineering From
Software games.

## 2023: Dipping my Toes

A couple years ago, my friends and I learned about [Archipelago], a system of
interconnected game mods and related tooling which supports what they call a
"multiworld randomizer". You may already be familiar with the concept of
randomizer mods, in which the items within a game are shuffled about at random
while still tracking enough game logic to ensure that the game can be completed.
They're popular as ways to bring fresh life to games one has already played many
times over, and can be particularly fun to play in a racing context where the
strategy around figuring out how to proceed can be more complex than even the
game mechanics themselves.

[Archipelago]: https://archipelago.gg/

A multiworld randomizer takes this concept and expands it beyond the boundaries
of a single game. Archipelago is able to randomize items across many games and
connect them all through the internet, so that a *Hollow Knight* player in
Minneapolis can find bombs for a *Link to the Past* player in Seattle, which
lets them blast through a wall and find a *Super Mario World* player's ability
to run. The possibilities are limited only by the imaginations and hacking
abilities of a community of volunteer developers.

My little group quickly decided we wanted to give this a try. Looking through
the list of available games, much shorter then than it is now, the one that
appealed to me most was *Dark Souls III*. I consider the From Software oeuvre to
be largely masterpieces, and while DS3 isn't my favorite[^sek], it was the one
that was available at the time.

[^sek]: That honor belongs to *Sekiro: Shadows Die Twice*. This was also the first
    one I played, but after replaying most of them numerous times I still have
    no hesitation putting this in my top slot.

### The Old Mod

Unfortunately, the implementation of the game was not very good. No shade on the
dev—modding with these games is difficult, as I was soon to discover. They use a
totally idiosyncratic game engine that was originally built for *Demon's Souls*
and has haphazardly accrued new features ever since; the whole thing is a mass
of many different custom file formats all held together with
difficult-to-decompile (and in some cases intentionally obscured) C++ code. But
the player experience was not so great.

The core problem was this: because it was so difficult to figure out how to do
anything at runtime in these games, the only thing the mod was really able to
influence was the moment the player received an item. They could see which items
the player was getting and replace them with something else. What's more, this
didn't work with items purchased from a shop.

The core principle of a randomizer is the separation of "items" from
"locations". A location is a place or situation in a game that gives the player
something; the item is the thing the player gets. Archipelago works by knowing
all the items and locations in each game, and assigning new items to each
location. This poses a problem when all you know is which item you received:
unless that item is unique across the entire game, you have no idea which
location it came from. The *Dark Souls III* mod's solution to this was simple:
only unique items could be randomized.[^progressive]

[^progressive]: There actually was another workaround that could optionally be
    used. For certain classes of items, like upgrade items, the randomizer would
    *count* how many the player received over the course of their run, and with
    each successive item give the player a different item. It would keep track
    of how many Titanite Shards were guaranteed to be available before a certain
    point in the game to know where it was safe to put items that unlocked
    progression. This technique didn't play very well, but it was certainly
    clever.

The other critical problem was that the mod had no way of telling the player
what item they were receiving for another player's game. Foreign items, as
they're known, were simply replaced with Prism Stones in the local player's
game. Many was the time I'd hear a player say "wow Natalie, thanks for that!"
only to have to ask them what I'd even given them.

### The New Mod

It didn't take much of this before my mental wheels began to turn. Thanks to my
previous work [dissecting enemy AI] for Elden Ring, I was familiar with the
basics of how From Software games were assembled. I had also done a fair amount
of *Sekiro* randomizer playthroughs using [thefifthmatt's randomizer], which
operated entirely statically: rather than injecting a mod into the game which
messed with items during play, it created new variations of the game's files
which stored which items existed where.

[dissecting enemy AI]: https://web.archive.org/web/20241111053456/https://cohost.org/nex3/tagged/AI%20Deep%20Dive
[thefifthmatt's randomizer]: https://www.nexusmods.com/sekiro/mods/543

Imagine all the data in the game laid out in a giant spreadsheet[^excel]. Each
item has its own row with all the information about it, each enemy type has its
own row with all of its stats, and so on. The static randomizer works by
rearranging cells in this spreadsheet and using a small off-the-shelf mod to
inject the new data into the game. The result is that any item can be moved to
any location, including shops and locations that originally held non-unique
items, without any extra reverse-engineering required.

[^excel]: I haven't ever heard this explicitly verified by an employee, but
    rumor has it that From Software literally does just use a big Excel
    spreadsheet for all this data internally before it gets serialized into a
    more efficient format for including in the game.

I put the pieces together and realized that you could do the same thing for
Archipelago. It couldn't all be done by statically modifying data files, since
at the very least you'd need to tell the Archipelago server which locations you
found and receive items from other players. But you could statically add new
items which included in their metadata which Archipelago locations they appeared
at, and for foreign items you could even give them proper names like "Michelle's
Amulet Jewel" so the player could see what they were and who they were for. Then
the existing item-handling function would be able to distinguish any location in
the game[^shops] and swap in the correct item.

[^shops]: ...except for locations in shops. Those still didn't work.

Once I'd had this idea, I knew I couldn't just let it sit stagnant in the back
of my mind. I forked the DS3 Archipelago mod and thefifthmatt's randomizer and I
set to work. It wasn't long before I had a proof of concept up and running: a
DS3 Archipelgo mod that used a variant of thefifthmatt's static randomizer to
load all the Archipelago metadata into the game items themselves. It worked
as-is with existing DS3 Archipelago worlds, and as an added bonus it could
randomize enemies as well (a feature we got for free from the existing static
randomizer).

I could have left it there, submitted a pull request, and let the existing
maintainer do with it what he wanted. But by this point he was largely inactive,
and I've always found it difficult to let progress go unmade when I can clearly
see how to do it. So rather than th end of my story, this is just the beginning.

*To be continued in Part 2: Ghidra*
