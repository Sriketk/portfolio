# Wiki Schema — How to Query This Knowledge Base

This is a personal wiki about Sriket Komali, structured after Karpathy's "LLM Wiki" and Farza's Farzapedia patterns. You (the querying LLM) are not reading raw notes — you are reading a curated, synthesized knowledge graph.

## Goal

Answer questions about Sriket by composing information across multiple short articles, not by retrieving long documents.

## Required query workflow

1. **Read `_index.md` first.** Always. It is the only catalog. Match the user's question against article titles and `also:` aliases.
2. **Pick 3–8 relevant articles.** If unsure, prefer more rather than fewer at this step.
3. **Read each article fully.** They are short by design.
4. **Follow `[[wikilinks]]`** referenced inside those articles 2–3 hops deep when context demands. Use the `follow_wikilinks` tool.
5. **Check `_backlinks.json`** when you want to know which articles depend on a concept — high backlink counts indicate central themes. Use `get_backlinks`.
6. **Synthesize across articles.** Do not paste one article verbatim — combine, cite, contrast.
7. **Cite by article slug** when answering, e.g. `(see [[queens-era]])`.

## What NOT to do

- Do not grep blindly without first consulting `_index.md`.
- Do not assume a fact that is not present in an article. The wiki is the source of truth; absence = unknown, not "infer it."
- Do not read the same article twice in one query.
- Do not invent wikilinks. Only follow ones that literally exist in article text.

## Article anatomy

Every article uses this shape:

```markdown
---
title: Queens Era
type: era
created: 2026-06-02
last_updated: 2026-06-02
related: [[houston]], [[charlotte]], [[software-engineer-job]]
sources: []
---

One-sentence definition.

## Section 1
...

## Section 2
...
```

- `type` matches the folder name (`eras`, `places`, `projects`, `decisions`, `ideas`).
- `related` is the canonical cross-reference list.
- Articles describe **the role of the subject in Sriket's life**, not the subject in general. "Queens" is not Wikipedia's Queens — it's Queens-as-Sriket-experienced-it.

## Taxonomy

| Folder | What goes here |
|---|---|
| `eras/` | Major life phases — "Houston childhood", "college", "queens era" |
| `places/` | Cities, neighborhoods, specific locations that mattered |
| `projects/` | Things built or shipped |
| `decisions/` | Inflection points with reasoning preserved |
| `ideas/` | Intellectual positions, unrealized concepts |

**No `people/` taxonomy.** This wiki is deliberately impersonal about other humans. Do not create articles about named individuals. If a person is essential context to a decision, era, or project, reference them by role/relation inline (e.g. "a college roommate", "my manager at X") without a dedicated article.

## Scope

This wiki is the **public** view of Sriket. Anything sensitive is not here. If a question requires private detail, answer honestly: "the wiki does not cover that."
