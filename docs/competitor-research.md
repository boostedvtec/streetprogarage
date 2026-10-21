# Competitor research and action plan

Research date: 2026-10-21. Method: public pages fetched with a page reader, plus web searches. Observed facts are separated from judgement. Several sites returned little text (some render client-side), so this is a qualitative comparison of what was readable, not a ranking. No traffic, rating or conversion figures were available and none are claimed.

## Matrix

| Competitor | Observed (facts) | Opportunity (judgement) | What Street PRO Garage should learn | Implemented |
|---|---|---|---|---|
| **Johnson Tuning** (johnsontuning.com) | Headline "Repeatable power." Dealer badges (MoTeC, EcuTek, COBB, HP Tuners). Nav: Shop, Services, Contact, Book now. Customer builds listed as text, no build images in the readable text. No prices shown ("after you submit details"). No customer reviews on the page. Instagram/Facebook only as footer icons. | Credibility is carried by dealer badges, not evidence. Builds are not visual. No price anchor. | Lead with real builds and results, and publish estimated prices. Do not lean on logos alone. | Projects redesigned as case studies with real photos and dyno graphs. Estimated prices kept on home and tuning pages. |
| **DigiTune** (digitune.co.uk) | MX-5 and Motorsport Electronics niche. Published "from" prices (£170 full tune, £110 basic). Clear 4-step remote process with a link to a full process page. Three named testimonials with a "read more reviews" link. No dyno graphs or project showcase on the page. | Excellent process clarity and price transparency, but no visual proof of results. | Explain remote tuning as a simple numbered journey, state what the customer needs, keep prices visible. Add the evidence DigiTune lacks. | New "How it works" journey on /tuning (steps, what you need, after you pay). Reviews section built, hidden until real reviews are supplied. |
| **Two Step Performance** (twostepperformance.com, US e-tune product page) | E-tune sold as a product: standard $499.99, priority $699.99, flex fuel extra. Process described as starter map, datalog, revisions. States hardware needed. "Sales are final." 26 reviews; most five-star, a few one- to three-star citing slow replies and revision counts, with a reviewer asking for typical timelines. | Transparent but exposes the risk of vague turnaround. Customers want to know timelines and what hardware they need. | State requirements up front and set expectations on revisions and timing. Do not over-promise. | "What you need" panel on /tuning. Revision and 14-day wording reused from the existing guide. No turnaround promises added. |
| **CPL Racing** (UK Hondata distributor) | Search result describes dyno tuning for all setups, mail order and engine machining; stocks Hondata products. Page itself could not be fetched. | Distributor-led, parts-first. Unclear from what was readable whether remote tuning is offered. | Make remote and dyno tuning, wiring and diagnostics the lead, with parts as an extension. | Parts stays a secondary nav item. Services lead the homepage. |
| **MB's Automotives** (mbsautomotives.co.uk) | Only the page title was readable: "ECU Remapping, Coding & Performance Upgrades, Slough / West London". The brief says it shows a Google Reviews link, but that could not be verified. | Not assessed beyond the title. | Use real third-party review links, as the brief suggests, once StreetProGarage has its own. | Reviews config ready for a Google reviews URL (see `src/lib/social-proof.ts`). |

Also noted from searches: UK results for JDM/K-series remote e-tuning and custom loom makers were thin; general forum and retailer content dominated. Judgement: a specialist JDM, remote, wiring and diagnostics offer with real project evidence is under-served online, but this is an impression from a small sample, not a market study.

## Where StreetProGarage can stand out (judgement)

1. Evidence over badges: real builds, real dyno graphs, real wiring work, all on one page per project.
2. Transparent estimated prices beside a plain-English remote process.
3. Wiring and diagnostics presented as specialist services, with a clear "what to send us" path.
4. The interactive VE/VVT map as a technical trust signal, clearly labelled as example data.

## Prioritised plan and status

1. Projects and dyno results: done (case-study layout, filters by make, method and service).
2. Tuning, wiring, diagnostics, dyno pages: done (shared photo header, remote journey section, real-installs strip, diagnostics intake, tuning vs rental).
3. Reviews and Instagram: built. Reviews need real content and a Google URL. Instagram profile verified as `@streetprogarage`; gallery links to the profile.
4. SEO, mobile, QA: canonical URLs added to indexable pages; production build and browser checks run.
