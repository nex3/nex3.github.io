---
tags: [meta, rss, web, ask]
---

{% ask "RECCANTI",
    title: "RSS feeds for embeds",
    url: "https://reccanti.art/",
    avatar: "https://reccanti.art/_next/static/media/preview.28eafa35.png" %}
  I was trying to parse the content field of your RSS (Atom?) feed, and
  I noticed I get a sort of flat structure for embedded posts like this:

  ```html
  <img src="..." width="64" style=" float: left; width: auto; max-width: 64x; margin-top: 1rem; margin-right: 1rem; border-radius: 32px; ">
  <div class="npf_row">
    <div class="npf_col">
      <figure class="tmblr-full">
        <a class="post_media_photo_anchor" data-big-photo="..." data-big-photo-height="680" data-big-photo-width="669">
          <img class="post_media_photo image" src="..." srcset="..." sizes="..." alt="image">
        </a>
      </figure>
    </div>
  </div>
  <p> have you heard about the <b><a href="https://itch.io/b/2672/sickos-selection-1">Sicko’s Selection</a></b>? me and 14 other adult artists/authors put together a bundle of artbooks, novellas, and comics for you to enjoy! there’s over $75 worth of our hot hot smut in here, and you get it for just $15! </p>
  <p> i, for one, have offered up Poker Night with the Arizona Dogs, AND if it reaches its stretch goal of $5000, i’ll be premiering another new artbook a few weeks ahead of its planned release! </p>
  <p> <b><a href="https://itch.io/b/2672/sickos-selection-1">so what are you waiting for, sicko?? go get your porn!</a></b> </p>
  ```

  I'm having a hard time figuring out how to render this out as an embed
  with the current markup and was wondering if you had any ideas?

  Also, I think the max-width on the avatar is incorrect. It's currently
  64x, not 64px

  Anyway, I'm really excited about all the stuff you're doing with
  h-entry, webmentions, and things like that. I hope I can integrate
  some of that stuff into my blog eventually!
{% endask %}

Thank you for giving me a reason to make an ask component. 🙂

When I include a repost like this in my Atom feed, I treat it as though the post
I'm reblogging is itself in the feed, rather than a wrapper that contains that
post. Generally speaking, As such, most of the metadata (author name, link,
title if it has one) is in the rest of the feed entry rather than in the HTML
contents. I don't create embeds directly from feeds—I always go to the source
web page and create the embed from that—but if I were to do so, I'd treat all
that metadata the same way I treat [h-entry metadata] for sites.

[h-entry metadata]: https://microformats.org/wiki/h-entry

I also _always_ wrap the things I'm embedding in some extra markup to get the
nice little boxes and floating avatars and responsive design going. You can even
edit the HTML a bit! It's your website, you aren't tethered to the specific code
the stuff you're embedding uses.

Thanks for the tip on the 64x, I fixed it this afternoon!
