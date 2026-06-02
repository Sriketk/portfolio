---
name: wiki-query
description: Answer questions about Sriket by navigating the curated wiki at `wiki/`. Use when the user asks "ask the wiki", "look up in my wiki", "what does the wiki say about X", or any question that should be grounded in the wiki rather than inferred. Enforces the index-first → wikilinks → backlinks → synthesize discipline.
---

You are running the wiki-query skill. Answer the user's question by composing information across multiple short wiki articles. Do not freelance.

## Required workflow

1. **Read `wiki/_index.md` first.** Always. Match the user's question against article titles and `also:` aliases. Identify 3–8 candidate articles. When in doubt, prefer more candidates at this step.

2. **Read each candidate article in full.** They are short by design (15–100 lines).

3. **Follow `[[wikilinks]]`** that appear in those articles 2–3 hops deep when the question demands it. Use Read on the linked article paths (`wiki/<type>/<slug>.md`).

4. **Check `wiki/_backlinks.json`** when you want to know which articles depend on a concept. High backlink count = central topic. Use this to discover articles you missed in step 1.

5. **Synthesize across articles.** Do not paste one article verbatim. Combine, cite, contrast. Identify tensions or contradictions if present.

6. **Cite by article slug.** Use the form `(see [[queens-era]])` in your answer. The user can look up any cited slug.

## What NOT to do

- Do not grep blindly without first consulting `_index.md`. The index is the only catalog.
- Do not invent facts. If the wiki does not cover something, say "the wiki does not cover that." Absence of information is not license to infer.
- Do not read the same article twice in one query.
- Do not invent wikilinks. Only follow links that literally exist in article text.
- Do not read raw dumps in `raw/`. The wiki is the only knowledge surface. Raw is private and may contain content deliberately excluded from the wiki.

## Answer shape

Default to a tight synthesis with citations:

> Sriket moved to Queens in January 2026 after eight months of building solo (see [[queens-era]], [[decision-to-quit]]). His move was driven by frustration with Charlotte's lack of startup community (see [[charlotte-era]]) and the pull of NYC's tech density (see [[queens-era]]). He bootstraps deliberately rather than raising — a stance formed from observing tech Twitter horror stories (see [[bootstrap-philosophy]]).

If the question asks for an opinion or projection that the wiki does not directly cover, ground your inference in cited articles and flag it as inference: "Based on [[ideas/great-things-not-done-alone]] and [[queens-era]], it follows that..."

## Edge cases

- **Question is too broad** ("tell me about Sriket"): read `_index.md`, pick the 3 highest-backlinked articles, synthesize a one-paragraph overview, then offer to go deeper on any thread.
- **Question has no matching article**: say so explicitly. Suggest related articles that DO exist. Do not fabricate.
- **Contradiction between articles**: surface it. "The wiki carries a tension here: [[X]] suggests A, while [[Y]] suggests B."

## Tools to use

- `Read` — articles, index, backlinks
- `Bash` + `grep` only as fallback if index lookup fails

Never write to `wiki/` from this skill. Query-only.
