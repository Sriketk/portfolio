---
title: Solo Builder Era
type: eras
created: 2026-06-02
last_updated: 2026-06-02
related: [[ally-financial-era]], [[queens-era]], [[quit-ally]], [[move-to-nyc]], [[cobalt]], [[design-cant-be-faked]], [[great-things-not-done-alone]]
sources: [raw/dump.md]
---

The roughly eight-month stretch from when Sriket quit Ally Financial through his move to New York City in January 2026. He spent it building a startup alone in Charlotte — initially as a learning vehicle, eventually as a real product called [[cobalt]]. The era ends with him concluding that great things are never done alone (see [[great-things-not-done-alone]]).

## How it started

Sriket initially quit his job with no business plan — the goal was just to learn as much as possible and post on Twitter. The business followed: he was thinking about moving to NYC and noticed there was no good tool to look at all his finances and answer "how much runway do I have if I quit my job and move now?" The realization that such a tool was both useful and a perfect thing to build and scale and learn from converted the open-ended sabbatical into a startup.

## The scope of his ignorance

When he started, his honest self-assessment was that he didn't know how to do anything. He knew how to set up a database. He didn't know what an ORM was. He didn't know how to do auth. He didn't know how to do most of what a real product requires.

## The design lesson

The hardest skill to develop was design. Sriket frames it sharply: "You can't fake design. It either looks good or it doesn't." Design is a compromise of many small details — subtle background, subtle text-to-width ratio — none of which are big-bang fixes. It cannot be parallelized: he had to stare at a screen for five minutes straight to understand why something looked bad, with no background agents running, no distractions. By the end of the era he believed the practice had paid off — he could tell why things looked off much more easily, and he considered that a skill. See [[design-cant-be-faked]].

## Cobalt

He started [[cobalt]] in August 2025 (possibly June 2025 — his own memory is fuzzy on the exact start). Initial state was complete uncertainty — he'd never handled a webhook before. The build became an aggressive education: he learned auth setup, Sentry, PostHog, deployment dashboards. He learned to use AI in production; the AI SDK arriving during this period was, to him, "a revolution" — the simplest API he'd worked with for AI agents and endpoints.

He pushes back on the "software is super cheap to produce" narrative — to him it remains very expensive. Simple features still take weeks. He rewrote the Cobalt app many times, swapping services along the way. He migrated from Supabase to Postgres specifically to learn RLS. He learned Next.js caching, built a Next.js API, used it to build a mobile app (also new to him), built an MCP, learned how to build effective agents, learned to use virtual bash and let agents write code rather than only call tools — and learned why that pattern was better.

Theo (T3GG) on YouTube was a continuous source of education through this period. The "Next Faster" episode landed hard — Sriket dates his love of fast websites to that moment. He got into Sentry-driven performance debugging — LCP, FCP, the full Core Web Vitals stack.

## Cost and capacity

Sriket grew up middle class, and money was never the gating constraint on this gamble. The constraints he describes are time, energy, and lack of community. Charlotte offered no startup scene — no events, no one to talk to. He'd sit in his apartment all day building, then go to the gym. This sets up the [[move-to-nyc]] decision.

## What the era proved

Two things, in his view:
- He could learn and ship across the full stack of a real product, including auth, design, mobile, AI, and performance.
- He had hit the ceiling of what solo-in-Charlotte could do for him — the next step required other people and a denser environment (see [[great-things-not-done-alone]] and [[queens-era]]).
