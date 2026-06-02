---
name: wiki-ingest
description: Convert raw life-story dumps in `raw/` into curated wiki articles under `wiki/`. Use when the user says "ingest", "process raw", "add to wiki", "intake this dump", or names a file in `raw/`. Updates `_index.md` and `_backlinks.json`. Never creates `people/` articles.
---

You are running the wiki-ingest skill. This skill turns messy raw dumps into a clean, curated, queryable wiki following the Karpathy / Farzapedia pattern. Be precise, idempotent, and conservative — the human reviews everything you write.

## Inputs

- One or more files under `raw/`. Named by the user, or all of `raw/*.md` if they say "ingest everything".
- Existing wiki state in `wiki/`.

## Outputs

- New or updated articles in `wiki/<type>/<slug>.md`.
- Updated `wiki/_index.md`.
- Updated `wiki/_backlinks.json`.
- A short report summarizing what changed.

## Required reading order

Before touching the raw dump, in this order:

1. `wiki/SCHEMA.md` — query workflow + article conventions
2. `wiki/_index.md` — what already exists; avoid duplicates
3. `wiki/_backlinks.json` — current reverse graph
4. The raw file(s) named by the user, in full

Do not skim. Build a complete mental model before planning.

## Taxonomy (strict)

Allowed `type` values and folders:

- `eras/` — major life phases ("Houston childhood", "college", "queens era")
- `places/` — cities, neighborhoods, locations that mattered
- `projects/` — things built or shipped
- `decisions/` — inflection points with reasoning preserved
- `ideas/` — intellectual positions, philosophies, beliefs

**No `people/` taxonomy.** Never create an article about a named individual. If a person is essential context, fold them into the relevant era/decision/project article anonymously by role: "a childhood best friend", "my manager at the time", "younger twin brothers". Names from raw can appear inline as flavor but should not become the subject of an article.

## Planning step

Before writing any file, produce an internal plan with three buckets:

- **Create**: new articles needed. Pick `type` from taxonomy. Pick a kebab-case slug. Check against `_index.md` to avoid duplicates.
- **Update**: existing articles that need new sections, facts, or cross-references from this raw dump.
- **Skip**: raw material too thin to warrant an article, or flagged sensitive. Note the reason.

**If the plan touches >8 articles OR there is any privacy ambiguity, show the plan to the user and pause for approval before writing.** Otherwise proceed.

## Article format

Every article uses this exact frontmatter shape:

```markdown
---
title: <Human Title Case>
type: <eras|places|projects|decisions|ideas>
created: <YYYY-MM-DD, today's date if new>
last_updated: <YYYY-MM-DD>
related: [[other-slug]], [[another-slug]]
sources: [<raw filename(s)>]
---

One-sentence definition: who/what/when/why-it-matters.

## <Thematic section>

Prose. Encyclopedic tone. Third person ("Sriket"). Direct quotes preserved when they carry weight.

## <Another section>
...
```

### Writing rules

- **Thematic sections, not chronological.** "Sriket's relationship to Houston" beats "2003, 2004, 2005."
- **About the role in Sriket's life**, not the thing itself. "Charlotte" = Sriket's Charlotte, not Wikipedia's Charlotte.
- **Length targets**:
  - 20–30 lines for single-reference items
  - 40–60 lines for typical era / project articles
  - 60–100 lines for foundational eras and complex decisions
  - Minimum viable article: 15 lines. Below that, fold into a parent article instead of standing alone.
- **Use `[[slug]]` for every cross-reference.** Every named place, project, decision, or idea that has (or could have) its own article gets a wikilink.
- **Quote sparingly but precisely.** When raw has a vivid line, preserve it as a blockquote.
- **Polish raw prose into clean encyclopedic English** — fix typos, run-ons, missing apostrophes. Preserve meaning, voice, and direct quotes verbatim.
- **Never invent facts.** Only write what the raw dump supports. Gaps stay gaps.

## Updating `_index.md`

For each created or substantially updated article, ensure an entry exists in the right section:

```markdown
- [[queens-era]] — Sriket's life in NYC starting January 2026; bootstrap era. also: nyc, new york, queens, woodside
```

`also:` aliases help future queries match user phrasing to the right article. Keep sections sorted alphabetically by slug within their group.

## Updating `_backlinks.json`

For every `[[link]]` you wrote, update the reverse map:

```json
{
  "houston": ["queens-era", "charlotte-era"],
  "charlotte-era": ["high-school-charlotte", "ally-financial", "decision-to-quit"]
}
```

Keys = article slugs. Values = sorted list of slugs that link to that key. Omit keys with zero backlinks.

Re-derive these from scratch if the existing file is suspect rather than incrementally patching it — full re-scan of `wiki/**/*.md` for `[[...]]` is cheap.

## Reporting back

After writing, give the user a tight summary:

```
Created: 3 (eras/queens-era, places/woodside, projects/cobalt)
Updated: 2 (eras/charlotte-era +"leaving for NYC", ideas/build-with-others +1 link)
Skipped: 1 paragraph about <topic> — flagged sensitive; left for manual review
Backlinks: +6 edges, -0
```

Then list any open questions: "raw mentions Y but didn't elaborate — left thin", "ambiguous date for X — used 'circa 2024'".

## Invariants — never violate

- **Never commit `raw/`.** It is gitignored. Treat its contents as private even within session output. Don't paste raw verbatim in your reply.
- **Never write to `wiki/` from a fact the user did not include in raw.** No inference from outside knowledge. Wikipedia-style facts about real places/companies are fine as context, but anything about Sriket comes only from raw.
- **Never edit `SCHEMA.md` or `INGEST.md`** during ingest. Those are governance; change separately.
- **Never delete an existing article.** Mark `deprecated: true` in frontmatter and ask the user instead.
- **Idempotency.** Running ingest twice on the same raw file must not duplicate sections or index entries. Check existing article content before appending.
- **No `people/` articles.** Ever.

## Default flow when user says "ingest <file>"

1. Read SCHEMA + index + backlinks.
2. Read the file(s).
3. Build plan (Create / Update / Skip).
4. If ≤8 articles touched and no privacy ambiguity → proceed.
5. Otherwise → show plan, pause for approval.
6. Write articles, update index, update backlinks.
7. Report diff and open questions.

Use the Edit and Write tools. Use Read on existing wiki articles before updating to avoid clobbering. Use Bash + grep to verify backlinks accuracy after writing.
