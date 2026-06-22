---
repost: true
tags: [language, code]
commentary:
- really cool post about about all the complexities involved in Arabic fonts
- and this one dude in Cairo tirelessly working to address them all
---

{% genericPost "https://lr0.org/blog/p/arabic/",
    title: "An interactive introduction to the terrific experience of rendering Arabic typography and its technical debt",
    date: "2026-06-10",
    tags: ["#History", "#Programming"],
    author: "lr0",
    authorAvatar: "https://lr0.org/media/images/about_pfp.png" %}
  <p>The history deserves recording because most people outside the small world
  of Arabic font engineering don't know it, and it is wonderful. Classical
  Arabic typography, by which I mean the manuscript tradition that the early
  printers of Istanbul and Bulaq spent their careers chasing, justifies a line
  of text without stretching the spaces between words at all. Stretched spaces
  are the Latin convention, and in Arabic they produce an effect the scribes
  would have found simply ugly. Instead the scribe extends the letterforms
  themselves along the baseline, using what is called <em>taṭwīl</em> or, in the
  modern technical vocabulary, <em>kashida</em>: the connecting strokes between
  certain pairs of letters can be lengthened, sometimes lavishly, to carry a
  line out to the margin. A well-set page of Naskh from the seventeenth century
  has every line flush at both margins, and the result is the dense, regular
  weave that anyone who has spent time with a good manuscript Qurʾān will
  recognise on sight.</p>

  <p><em>[...]</em></p>

  <p>The one great exception is Amiri, the Naskh face that Khaled Hosny, an
  Egyptian doctor by training who taught himself OpenType tooling over the
  course of about a decade, built and released under the SIL Open Font License
  in 2011 and has polished continuously since. The name is the lineage: Amiri
  revives the typeface of al-Maṭbaʿa al-Amīriyya, the Bulaq Press face that set
  the 1924 Cairo Qurʾān, which means the best free Arabic font of the digital
  era is a one-man reconstruction of the best government-funded font of the
  metal era, and I never get tired of saying that sentence. And it is
  engineered, not merely drawn. The required ligatures are done with care; the
  1.0 rewrite, in 2022, reimplemented the <em>allāh</em> ligature to be more
  cautious about when it fires. The mark stacking holds up under fully vowelled
  text. And since that rewrite the font carries a <em>curvilinear kashida</em>:
  feed it elongations and it substitutes graded, swelling curved strokes, in
  four sizes, the way the pen would. Scroll back to the mockup card at the top
  of the page; those curves are Amiri's own work, performed live in your
  browser. If you are reading an Arabic text rendered well on the open web in
  2026, there is a respectable chance you are reading Amiri. The rest of the
  ecosystem (Scheherazade New from SIL International, Reem Kufi also by Hosny,
  the various Noto Arabic faces Google commissioned) fills in around it.</p>
{% endgenericPost %}

