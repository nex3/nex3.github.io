---
title: Using the StoryGraph
tags: [web]
---

I've moved all my book reviews, both archival and ongoing, onto [the StoryGraph]
(link also available in the header along with my other media review accounts).
If you want to see what I think about books, go give it a follow; if I recognize
you, I'll follow you back. As with my other reviews, I'll only be cross-posting
the ones I think are particularly good, so you'll have to go to the source if
you want to see everything.

[the StoryGraph]: https://app.thestorygraph.com/profile/nex3

I've been searching for a really good book tracking website for a long time, and
StoryGraph is _good enough_. I used Goodreads for a number of years, despite
finding its Amazon ownership intensely distasteful, because at the time I
started tracking books it was the only option with any amount of traction. In
addition to (and possibly because of) its position in the evil empire of
booksellers, it didn't seem to have developed a single new feature since 2013.
In particular, it had no way to look through one's own books by genre or do
other cross-referencing tasks that are a major part of what makes these sites
valuable to me.

About a year ago, I migrated everything to BookWyrm on a friend's suggestion. It
solved the Amazon issue handily, but was a step back on almost every other
front. The UI is so bad that it actively discouraged me from tracking books as I
read them; it's ridden with subtle differences between different ways of marking
books as reading or read or writing reviews that do or don't show up as separate
posts on its inexplicable Fediverse backend, and the frontend itself offers no
affordances for basic things like indicating that it's processing a request you
made. Its database is itself deeply messy, often with half a dozen versions of a
single book with none being marked as canonical and no clear path to helping the
admins unify them. On top of all that, it provided exactly none of the features
I felt Goodreads was missing, if anything making it harder to organize and
cross-reference a collection.

StoryGraph improves on all of these issues. It's not Amazon, and in fact
explicitly marketed around the fact that it's better than Goodreads which gives
me at least a faint hope that whoever runs it would find it politically
infeasible to sell out too badly. Its interface is silly in places (it's
possible to rate a book up to 5.75 stars due to idiosynratic the way it handles
intermediate scores) but entirely functional. And its collection view allows
enough cross-referencing to satisfy my general needs.

The thing I don't entirely understand is this:
[Letterboxd](https://letterboxd.com/) has existed for fifteen years now. It's
well-known, it's widely referenced, and it's _excellent_ from a UI standpoint.
Its ability to collate and cross-reference films is smooth and universal: every
film links its director, its year, and its cast and crew, and clicking on any of
these brings you to a standard "film list" view that covers all of the films
that fit the same criterion. This view is compact but also powerful, allowing
you to further filter by decade, genre, and whether or not you've watched it (or
reviewed it, or rated it, etc).

I don't understand why this hasn't been adopted as the universal bar for what a
functional media browsing UI looks like. Compare Letterboxd's listing of films
by a director to Storygraph's listing of books by an author:

<div class="image-gallery">
  {%- image "/assets/334/letterboxd.png",
        alt: "Letterboxd's list of films by Norman McLaren" -%}
  {%- endimage -%}
  {%- image "/assets/334/storygraph.png",
        alt: "Storygraph's list of books Stephen Graham Jones" -%}
  {%- endimage -%}
</div>

Look how much more compact Letterboxd is. Look how many ways you can customize
the view! Most of the interactions that take up half the real estate in
StoryGraph are accessible through the hover interface in Letterboxd, and all the
metadata for each book is just a click away. This isn't going to put me off the
website by any means, but it's baffling to me why other websites don't just rip
off Letterboxd's design here. It's flat-out better!
