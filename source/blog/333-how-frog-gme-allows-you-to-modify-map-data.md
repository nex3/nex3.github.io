---
tags: [for frog the bell tolls]
---

{% genericPost "https://www.fourisland.com/blog/kaeru-disassembly-terrain",
    title: "How Frog Game Allows You To Modify Map Data",
    date: "2026-07-24T15:07:39Z-0400",
    tags: "#projects, #kaeru, #video games",
    author: "Hatkirby",
    quote: true %}
  <p>
    <img
      src="https://www.fourisland.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTY1LCJwdXIiOiJibG9iX2lkIn19--bfd9b21fa8646873c29efecfe867b1cf30640391/tree_boundary.png"
      width="640"
      height="256"
      alt="Two adjacent overworld screens. There are two trees in the center."
    />
  </p>
  
  <p>
    It might look like two trees, but it's actually one. The borders of a
    top-down map are the same logical space as the borders in the adjacent maps,
    so those two trees actually represent the same object. It would be a
    finnicky edge case for the game to have to write two terrain edits to memory
    specifically when <em>this</em> tree gets destroyed. Instead, both trees are
    assigned the same global coordinates:
  </p>
  
  <ul>
    <li>
      Left tree is on map (14, 2) at tile (9, 3). Global coordinates are (14 * 9
      + 9, 2 * 7 + 3) = (135, 17).
    </li>
    <li>
      Right tree is on map (15, 2) at tile (0, 3). Global coordinates are (15 *
      9 + 0, 2 * 7 + 3) = (135, 17).
    </li>
  </ul>
{% endgenericPost %}

Hatkirby has been writing a very intriguing series of posts on
reverse-engineering *For Frog the Bell Tolls*, a lovely and underappreciated gem
of the Game Boy's library. This is actually just the most recent post; you can
read the whole series [here] (start at the bottom and work your way up). This
has a lot in common with my own currently-on-hold reverse engineering projects,
and it's interesting to see a lot of the same problems tackled for a very
different piece of software with very different tools for working with it.

[here]: https://www.fourisland.com/tags/kaeru
