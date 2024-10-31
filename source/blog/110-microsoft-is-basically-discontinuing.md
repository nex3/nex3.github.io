---
tags: [windows]
---

{% genericPost 'https://azhdarchid.com/microsoft-is-basically-discontinuing-windows-what-will-happen-then/',
    title: 'Microsoft is basically discontinuing Windows. What will happen, then?',
    date: '2024-10-19T03:24Z',
    author: 'Bruno Dias',
    authorUrl: 'https://azhdarchid.com/',
    authorAvatar: 'https://files.mastodon.social/cache/accounts/avatars/113/137/356/490/834/242/original/9e26d2b89b009f4a.png',
    quote: true,
    reply: true %}
  <p>First, it just won't run on the majority of hardware that currently runs Windows 10. This isn't just, like, ancient hardware; I have a desktop gaming PC that is perfectly fine to play current-gen AAA games on; it's what I played <em>Cyberpunk 2077</em> on and that was totally okay. But somehow it doesn't meet Win11 requirements because of the CPU; it has a Ryzen 5 1600X in it, a CPU from 2017 that is apparently still actively being manufactured.</p>
<p>[...]</p>
<p>Second, win11 is unsecurable, because they implemented a feature (recall) that is just constantly screen recording everything you do on the computer, creating a sort of one-stop-shop for compromising literally anything. It functionally means that you can't be sure your computer hasn't, say, saved a password in plaintext (effectively) just because you had the 'show password' switch flipped once.</p>
<p>Those two things make win11 untenable for probably the majority of its users. Hardware compatibility will stop a ton of people on older or lower end personal machines. Individuals, small businesses, the public school in your town that hasn't had money for new computers in five or ten years. Recall being a major security flaw will, I fucking hope, give pause to a ton of institutional users. Is a computer with Win11 even legal to use in some restrictive settings like government offices, militaries, or hospitals?</p>
{% endgenericPost %}

{% genericPost 'https://shelraphen.com/community-roundup-week-of-2024-10-13-19/',
    date: '2024-10-19',
    author: 'Shel Raphen',
    author: "Shel Raphen",
    authorUrl: "https://shelraphen.com/author/shel/",
    authorAvatar: "https://shelraphen.com/content/images/2024/09/IMG_1092-1.jpeg",
    inReplyTo: 'https://azhdarchid.com/microsoft-is-basically-discontinuing-windows-what-will-happen-then/',
    quote: true,
    reply: true %}
  <p>We have really been struggling with this at work. The advantage of Windows over Macs used to be that it was highly customizable and excellent for Enterprise systems with a lot of users. It also used to have cheap and free licenses for "learning institutions" which is a category Microsoft has slowly been shrinking to include fewer and fewer institutions causing already under-funded public institutions to have to spend exorbitant amounts of money on windows licenses that they can't even use because the Recall feature is a violation of federal laws regarding computer security for certain public institutions. It's totally a disaster. We've had brand new windows 11 machines for our patrons to use just sitting in the back for nearly a year now because our IT department can't figure out how to essentially hack windows to comply with federal security regulations and every time they get it usable, a new update reverts everything because in Windows 11 you can't customize which updates you accept it's all just a bundle. Our IT guys are also just complaining that the ability to make the computers locked down enough to be for public use really does not exist in windows 11 in the way it used to in older versions of windows.</p>
{% endgenericPost %}

I've been worrying about this as well. I consider myself at least moderately a
Linux sicko—I've had at least one daily driver Linux desktop consistently since
before college, although most of that time it's been my work device—and I'm
_still_ not excited about switching over full-time. The hegemony gets me coming
and going: I don't want to switch away because there's just too much software
that assumes everyone has access to Windows[^1], and if I do switch all the
support will be worse because the userbase is so much smaller and more
fragmented than Windows.

I think the lack of fragmentation is an underappreciated benefit of the Windows
ecosystem. There's no concept of "distributions" or different ways to set up
core services, so even when the solution to a given problem is as obscure in
Windows as it is in Linux (which I think happens more often than the popular
imagination credits), there's only _one_ obscure solution that will work on
every computer[^2]. In order to be comparably "easy" in a practical sense, Linux
actually needs its solution to each problem to be *substantially simpler* than
on Windows to make up for the fragmentation gap.

What I'm loosely planning to do if Bruno's [Scenario 1] plays out is to set up a
Linux partition on my (currently Windows-only) personal desktop and use that as
my primary personal computer. I mostly use that computer for Plex, games, and
miscellaneous web browsing anyway, so as long as games have Linux support
(ideal) or a decent Proton story (livable) this will be fine. For modding or
games that just can't function on Linux, I'll have a Windows partition where I
keep the absolute bare minimum of credentials and personal data. This outcome
sucks, but at least it sucks in the direction of me taking more control over my
digital life.

[Scenario 1]: https://azhdarchid.com/microsoft-is-basically-discontinuing-windows-what-will-happen-then/#scenario-1-we-all-just-shrug-our-shoulders-about-it

[^1]: For example, all the From Software modding infrastructure is built on
  Windows-only .NET GUI libraries. It's possible to get it working through WINE
  or Proton, but it's a huge pain—I know because I've done a bunch of work to
  get my mods working for Proton users, despite not using it myself.

[^2]: Different major OS versions complicate this a bit, but there's rarely more
  than two Windows versions in wide use and plenty of solutions work across
  both at any given time.
