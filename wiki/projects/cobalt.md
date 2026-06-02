---
title: Cobalt
type: projects
created: 2026-06-02
last_updated: 2026-06-02
related: [[solo-builder-era]], [[queens-era]], [[design-cant-be-faked]], [[bootstrap-philosophy]]
sources: [raw/dump.md]
---

Sriket's solo startup, an AI tool for personal finances. Started around June or August 2025 — his own memory is fuzzy on the exact date. Cobalt is the vehicle through which most of his post-Ally learning happened, and its evolution traces his shift from Next.js to sync-engine architectures.

## Origin

Sriket initially quit Ally without a startup in mind (see [[quit-ally]]) — the plan was to learn and post on Twitter. The Cobalt idea surfaced while he was thinking about moving to NYC: there was no good tool to look at all your finances and answer "how much runway do I have if I quit and move right now?" He realized the tool was both useful and a perfect thing to build, scale, and learn from.

## Stack journey

The technical history of Cobalt is also Sriket's technical education:

- Started on Supabase. Migrated to Postgres specifically to learn RLS.
- Built on Next.js. Learned Next.js caching deeply. Built the Next.js API for it.
- Built a mobile app on top of it — Sriket had never built a mobile app before this.
- Built an MCP server as part of the project.
- Learned to use the AI SDK, which arrived during this period and which Sriket calls "a revolution" — the simplest API he'd worked with for AI agents and endpoints.
- Learned to use virtual bash and let agents write code rather than only call tools.
- Tooling: Sentry (also used for LCP/FCP debugging), PostHog, deployment dashboards.
- In NYC, rewrote the entire app from Next.js to TanStack to enable client-side server routing with Zero (the sync engine from the Replicache team) paired with Hono. See [[queens-era]].

## What it taught

The product is the curriculum:
- Auth setup from scratch.
- Webhook handling (he'd never handled a webhook before).
- Database design and RLS.
- Performance engineering (LCP, FCP, Core Web Vitals).
- Design as an unfakeable, unparallelizable practice (see [[design-cant-be-faked]]).
- Building effective agents.

Sriket pushes back on the popular framing that software is super cheap to produce. His honest experience: simple features still take weeks, and good code requires repeated rewrites.

## Position in his life

Cobalt is the central artifact of [[solo-builder-era]] and the technical anchor of the early [[queens-era]]. It is bootstrapped, by design — see [[bootstrap-philosophy]]. As of June 2026, with Sriket looking to join a team (see [[great-things-not-done-alone]]), Cobalt's future is an open question the wiki does not yet resolve.
