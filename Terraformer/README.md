# Terraformer

> To terraform a system is to change more than its surface. It is to make its
> parts, relationships, boundaries, and consequences visible enough to shape
> deliberately.

Terraformer is an experiment in that idea. It aims to describe software as a
world of identifiable systems: things with names, roles, relationships,
evidence, and limits. A name can point toward meaning, but a name alone is not
meaning. A registry can describe a capability, but description is not
permission. A connection can be visible without being authorized. An intention
to act is not the act itself.

This distinction is the project's starting philosophy: **make claims explicit,
keep authority bounded, and treat the unknown as unknown.**

## Meaning Before Assumption

Terraformer's vocabulary and registries are attempts to give concepts stable
identities and relationships. Tokens can be collected; candidate systems can
be named; relationships can be drawn into a graph. These are maps, not proof
that the territory has been understood. Where evidence is absent, the corpus
marks semantics as unresolved rather than silently promoting a guess into a
fact.

The same principle applies to Terraformer itself. A system should be able to
describe what it believes, where that belief came from, what remains uncertain,
and which boundaries constrain its next action. Self-description is a
foundation for self-understanding, not a substitute for it.

## Identity Is Not Authority

Terraformer separates identification from capability and capability from
permission. Registering a system does not prove that it exists on the host.
Describing a tool does not install it. Recognizing a network does not authorize
a connection. Generating code does not execute it. These distinctions appear
throughout the registry and policy data as explicit authority and execution
gates.

The intended operating model is volatile by default: prompts and intermediate
work should remain temporary, while durable changes should require a deliberate
user decision. A generated artifact is something to inspect and download, not
an implicit edit to the repository. This is a design direction, not a guarantee
that every path in the current prototype enforces it.

## A System Still Becoming

The repository contains a large generated vocabulary and metadata corpus, a
system graph, JSON registries, and a substantial Node.js runtime prototype.
Together they explore how systems might be named, connected, qualified, and
reconciled. Their scale should not be confused with completeness: many entries
remain unresolved or provisional, the graph reports isolated systems, and
artifacts carry different version markers.

The runtime prototype has access to local files, network APIs, child processes,
and worker threads. Its policy declarations are not an operating-system
sandbox, and its safeguards have not been independently verified here. Treat
the JavaScript corpus as source code, not harmless data; do not execute files
you have not reviewed.

Telegram is currently represented by capability and admission stubs, not a
working Bot API or MTProto client. The previous GitHub Pages prompt was only a
visual preview; it was not connected to Copilot or Telegram.

## Local Entry Point

Run the canonical Node.js entrypoint directly:

```sh
node site/terraformer.js
```

By default, it prints an invocation descriptor and does not start a server or
load the compatibility monolith. Use `--describe` to print the entrypoint's
system description. The legacy Pages generator is retained as
`site/terraformer.github.pages.js`, with an unchanged backup at
`site/terraformer.github.pages.backup.js`; neither is part of the Node runtime
entrypoint. GitHub Pages publication uses the repository root on `main`; the
root `CNAME` owns the custom-domain declaration. Pages publication is a delivery
projection and is not the canonical Terraformer source.

## The Measure of Progress

Terraformer is not complete because it can name many things. Progress means
that its claims become traceable, its relationships testable, its uncertainty
legible, and its actions reviewable. Each new capability should preserve the
difference between describing a system and authorizing it to act.

The aspiration is a system that can explain itself without mistaking its own
records for truth, and can help make changes without taking control away from
the person who asked.