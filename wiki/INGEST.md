# Wiki Ingest Protocol — for Claude Code

This document tells you (Claude Code) how to convert raw dumps in `raw/` into curated articles in `wiki/`. The human runs you with a prompt like "ingest raw/foo.md" — follow this protocol exactly.

## Inputs

- One or more files under `raw/` — could be journal entries, brain dumps, chat exports, voice-note transcripts, lists, anything.
- Existing wiki state in `wiki/` — never overwrite blindly; merge with care.

## Outputs

- New or updated article files under `wiki/<type>/<slug>.md`.
- Updated `wiki/_index.md` with one line per touched article.
- Updated `wiki/_backlinks.json` reflecting new cross-references.
- A short summary message back to the human listing what changed and what you skipped (and why).

## Step-by-step

### 1. Read context first

Before touching the raw dump:
- Read `wiki/SCHEMA.md` — query workflow + taxonomy.
- Read `wiki/_index.md` — what already exists.
- Read `wiki/_backlinks.json`.

Do not skip. If you don't know what exists, you'll create duplicates.

### 2. Read the raw dump in full

No skimming. Get a complete mental model. Identify:
- Places (cities, neighborhoods, specific spots)
- Time periods, life phases, eras
- Decisions with reasoning attached
- Recurring themes, philosophies, ideas
- Projects, things built, things shipped

**Do NOT extract**: named individuals. No `people/` taxonomy exists. If a person matters to context, fold them anonymously into the relevant era/decision/project article (e.g. "a mentor at the time encouraged..."). Never create a file about a specific person.

### 3. Plan article changes BEFORE writing

Produce an internal plan with three buckets:

- **Create**: new articles needed. Pick `type` from taxonomy. Pick a kebab-case slug. Avoid duplicates with existing index.
- **Update**: existing articles that need new sections, facts, or cross-references.
- **Skip**: raw material the human said is private, or that is too thin to warrant an article (one passing mention ≠ article).

If the plan is large (>8 articles touched), show the plan to the human and pause for approval before writing.

### 4. Write articles

Each article uses this exact frontmatter:

```markdown
---
title: <Human Title Case>
type: <eras|places|projects|decisions|ideas>
created: <YYYY-MM-DD, today's date if new>
last_updated: <YYYY-MM-DD>
related: [[other-slug]], [[another-slug]]
sources: [<raw filename(s) you drew from>]
---

One-sentence definition: who/what/when/why-it-matters.

## <Thematic section>

Prose. Encyclopedic tone. Third person ("Sriket"). Direct quotes preserved when they carry weight.

## <Another section>
...
```

Rules:
- **Thematic sections, not chronological.** "Sriket's relationship to Houston" beats "2003, 2004, 2005."
- **About the role in Sriket's life**, not the thing itself. "Houston" = Sriket's Houston, not Wikipedia's.
- **15 lines minimum.** Below that, fold into a parent article instead of standing alone.
- **60–100 lines for eras and complex decisions.** 20–30 for single-reference people.
- **Use `[[slug]]` for every cross-reference.** Every named entity that has (or could have) its own article gets a wikilink.
- **Quote sparingly but precisely** when raw source has a vivid line. Use blockquotes.
- **Never invent facts.** Only write what the raw dump supports. Gaps = leave them.

### 5. Update `_index.md`

For each created or substantially updated article, ensure an entry exists in the right section:

```markdown
- [[queens-era]] — Sriket's life in NYC starting 2024; software era. also: nyc, new york, queens
```

`also:` aliases help future queries match user phrasing to the right article.

Keep sections sorted alphabetically within their group.

### 6. Update `_backlinks.json`

For every `[[link]]` you wrote or removed, update the reverse map:

```json
{
  "houston": ["queens-era", "charlotte-years", "mom"],
  "mom": ["queens-era", "houston"]
}
```

Keys = article slugs. Values = sorted list of slugs that link TO that key. If a slug has zero backlinks, omit the key.

### 7. Report

After writing, give the human a tight summary:

```
Created: 3 (eras/queens-era, places/queens, people/roommate-x)
Updated: 2 (eras/charlotte-years +section "leaving", people/mom +1 link)
Skipped: 1 paragraph about <topic> — flagged sensitive; left for manual review
Backlinks: +6, -0
```

Then list any open questions ("the raw mentions 'L' but doesn't say who — left out").

## Invariants — never violate

- **Never commit `raw/`.** It is gitignored. Treat it as private even within the session.
- **Never write to `wiki/` from a raw fact the human did not explicitly include.** If unsure whether something is public, ask.
- **Never edit `SCHEMA.md` or `INGEST.md` during ingest.** Those are governance; change separately.
- **Never delete an existing article.** Mark deprecated in frontmatter instead, ask the human.
- **Idempotency.** Running ingest twice on the same dump should not produce duplicate sections or duplicate index entries.

## When the human says "ingest <file>"

Default behavior:
1. Read SCHEMA + index + backlinks.
2. Read the file.
3. Produce the plan (Create/Update/Skip) and show it.
4. If ≤8 articles touched and no privacy ambiguity, proceed without pausing.
5. Otherwise, pause and confirm.
6. Write articles, update index, update backlinks.
7. Report.
