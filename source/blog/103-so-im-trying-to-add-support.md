---
tags: [meta, code, mastodon]
---

So I'm trying to add support for automatically embedding Fediverse posts on this
blog, right? And yeah I could use the Mastodon API for it, but I'd really rather
be able to make it work with _anything_ that speaks ActivityPub. So okay, I look
up [the ActivityPub spec]. It's a bit confusing, but I figure out how to at make
a GET request for an ActivityPub resource: just add `Content-Type:
application/ld+json; profile="https://www.w3.org/ns/activitystreams"`. I can
even make a request for one of my statuses and it works! Fantastic!

[the ActivityPub spec]: https://www.w3.org/TR/activitypub/

Just to verify, I make a request to another server, and that's where things
start getting hairy. Instead of a nice JSON representation of the post, I get
back a 401 Unauthorized with a body that says "Request not signed". This is a
public post, but after some digging it turns out Mastodon (and by extension
ActivityPub as a whole) has a ["secure mode"] where _all_ requests have to be
signed.

["secure mode"]: https://docs.joinmastodon.org/spec/security/#http

Signed by what though? This is a distributed system—there's no central authority
to distribute authorization in the first place.

To answer that I looked in the spec. I searched for "signature" and found
nothing particularly relevant. Eventually I found the [Authentication and
Authorization] section, which says "Unfortunately at the time of
standardization, there are no strongly agreed upon mechanisms for
authentication." Well, shit. Clearly _some people_ agree enough for it to be
implemented, but I guess not enough for it to be actually specified!

[Authentication and Authorization]: https://www.w3.org/TR/activitypub/#authorization

This does, mercifully, link to [a wiki page] that purports to lay out "some
possible directions" and, under the [Server to Server] section, seems to
describe the scheme that [this StackOverflow post] describes as "an odd,
somewhat well-known ActivityPub quirk"[^1]. This wiki page may not be an official
specification, but at the very least it describes the `publicKey` field that I
can see in the actor JSON on Mastodon.social.

[a wiki page]: https://www.w3.org/wiki/ActivityPub/Primer/Authentication_Authorization
[Server to Server]: https://www.w3.org/wiki/ActivityPub/Primer/Authentication_Authorization#Server_to_Server
[this StackOverflow post]: https://stackoverflow.com/questions/75025657/activitypub-mastodon-how-to-get-an-actor#answer-76396982

[^1]: For those who are curious, the authorization scheme is essentially as
  follows: when one ActivityPub server makes an authorized request to another,
  it includes a cryptographic signature of some of that request's headers using
  an actor's private key. The actor may be the signed-in user, but when
  requesting public data it can also be an "instance actor" representing the
  instance as a whole. This request also includes the URL of the actor so the
  receiving instance can fetch its public key and verify the signature.

  This is all fundamentally busywork. Because the whole thing is decentralized,
  the receiving instance has no choice but to trust whatever public key a new
  requesting instance provides. All this scheme really does is prove that
  someone making requests runs a server somewhere that speaks basic ActivityPub,
  and even then this constraint only exists for ActivityPub requests—HTTP
  requires no authentication at all.

```json
{
  "id": "https://mastodon.social/users/nex3",
  "type": "Person",
  /* ... */
  "publicKey": {
    "id": "https://mastodon.social/users/nex3#main-key",
    "owner": "https://mastodon.social/users/nex3",
    "publicKeyPem": "-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----\n"
  }
}
```

Or does it? The `publicKey` link there points to
<https://web-payments.org/vocabs/security#publicKey>, a URL that at time of
writing is refusing HTTPS connections entirely. Naturally I looked it up on
archive.org, only to find that [the specification for the `publicKey` field] is
not only totally different from what I'm observing in the wild, its one-sentence
specification is essentially useless: "A public key property is used to specify
a URL that contains information about a public key." The example included
*doesn't even have a `publicKey` field*.

[the specification for the `publicKey` field]: https://web.archive.org/web/20221218063101/https://web-payments.org/vocabs/security#publicKey

```json
{
  "@context": "https://w3id.org/security/v1",
  "@id": "https://payswarm.example.com/i/bob/keys/1",
  "@type": "Key",
  "owner": "https://payswarm.example.com/i/bob",
  "publicKeyPem": "-----BEGIN PRIVATE KEY-----\nMIIBG0BA...OClDQAB\n-----END PRIVATE KEY-----\n"
}
```

Okay, so there's functionally no specification for the data format. That's fine,
I can probably reverse-engineer it from the live example in combination with the
spec for how to make authenticated requests. A spec which is [handily linked]
from that same wiki page. But nothing can be easy: that link has a prominent
sidebar which reads "This is an older version of an Internet-Draft whose latest
revision state is 'Replaced'."

[handily linked]: https://tools.ietf.org/html/draft-cavage-http-signatures-08

So is the ActivityPub authorization "specification" _intentionally_ using an
outdated version of HTTP signatures, or should I use the latest version instead?
The wiki page doesn't say, so I just have to guess. Presumably there are plenty
of implementations out there that use the version that was (I'm assuming?)
current at the time the spec was written, so I'll start with that. It describes
how to link back to the actor's public key (although *not* what format that key
should be in), which headers to sign, and how to create a signature given a
choice of algorithm.

On the subject of algorithms, it says "Valid values for this parameter can be
found in the Signature Algorithms registry located at
http://www.iana.org/assignments/signature-algorithms and MUST NOT be marked
"deprecated"." An astute observer will note that that link is completely dead.
In fact, even the Internet Archive doesn't seem to have a real copy of it. As
far as I can tell, this spec is linking to a document that _never existed_.

Okay, so much for the outdated HTTP signature specification. Fortunately, it was
eventually published as the real-ass [RFC 9421] which makes reference to the
real name of the IANA registry, ["HTTP Message Signature"], although
inexplicably does not include a link to it. Unfortunately, the RFC's structure
for HTTP signatures is totally incompatible with the older draft's, so it's
still entirely unclear which one Mastodon instances want.

[RFC 9421]: https://www.rfc-editor.org/rfc/rfc9421.html
["HTTP Message Signature"]: https://www.iana.org/assignments/http-message-signature/http-message-signature.xhtml

At this point, I have two major outstanding questions:

* What is the correct format for the public key with which I'm supposed to sign
  requests?

* Should I use the outdated draft HTTP Signature format, or the one from RFC
  9421?

At this point, I don't think there's any way to answer these questions other
than to read through an existing implementation's code, which is a treat I'll
save myself for some other day.
