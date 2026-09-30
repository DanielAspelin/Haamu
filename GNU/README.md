# GNU Manual Corpus

This directory is a versioned, provenance-preserving corpus of GNU documentation.

## Governing rules

1. Prefer authoritative GNU/FSF upstream documentation and original Texinfo or package documentation sources.
2. Verify each manual's actual documentation license before importing its content.
3. Preserve upstream identity, version, source URL, retrieval date, source format and cryptographic hash.
4. Markdown is a derived transparent projection. It does not replace the authoritative upstream representation.
5. Never silently rewrite an imported version. Upstream changes create a new versioned snapshot.
6. Record every transformation used to derive Markdown and make reconstruction deterministic where practical.
7. Do not infer that all GNU manuals use the same license.
8. Corpus completeness is false until an explicit audited coverage specification has been satisfied.

## Intended lifecycle

discover → verify license → capture source → hash → transform → validate → qualify → checkpoint

The corpus is developed incrementally so that provenance and licensing remain inspectable at every checkpoint.
