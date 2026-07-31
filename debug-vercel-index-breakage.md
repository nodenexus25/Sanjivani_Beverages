# Debug Session: vercel-index-breakage
- **Status**: [OPEN]
- **Issue**: `index.html` works inconsistently after deployment to Vercel; homepage boot is failing and the main bottle transform / motion behavior does not initialize as expected.
- **Debug Server**: `http://127.0.0.1:7777/event`
- **Log File**: `.dbg/trae-debug-log-vercel-index-breakage.ndjson`

## Reproduction Steps
1. Deploy the current site to Vercel.
2. Open the deployed homepage.
3. Observe whether the hero loads, whether scrolling initializes correctly, and whether the bottle animation and related motion effects run.

## Hypotheses & Verification
| ID | Hypothesis | Likelihood | Effort | Evidence |
|----|------------|------------|--------|----------|
| A | Asset path case mismatches or URL issues break deployed homepage assets on Linux/Vercel. | High | Low | Pending |
| B | A runtime error in `index.html` stops the boot sequence before GSAP / LocomotiveScroll initialization completes. | High | Low | Pending |
| C | The debug fetch/reporting code interferes with production boot or hides the real failure point. | Medium | Low | Pending |
| D | The LocomotiveScroll + `ScrollTrigger` desktop setup is initializing in an invalid state and never binds the bottle transform sequence. | High | Medium | Pending |
| E | Recent age-gate or markup edits introduced malformed DOM / script structure that breaks later homepage initialization. | Medium | Low | Pending |

## Log Evidence
- Static asset audit: all homepage `media/*` references in `index.html` match exact on-disk filenames.
- Inline script syntax check (`node --check`) passed after instrumentation and fix hardening.
- Local pre-fix logs from `.dbg/trae-debug-log-vercel-index-breakage.ndjson`:
  - `hero-init-deferred-by-age-gate`
  - `index-page-boot` with `hasGSAP=true`, `hasScrollTrigger=true`, `hasLocomotiveScroll=true`
  - `hero-mode-sync` with `requestedMode=desktop`, `nextMode=desktop`
  - `desktop-hero-init-entry`
  - `desktop-hero-post-init-refresh` with `scrollTriggerCount=4`

## Hypothesis Status
| ID | Hypothesis | Status | Evidence |
|----|------------|--------|----------|
| A | Asset path case mismatches or URL issues break deployed homepage assets on Linux/Vercel. | Rejected for homepage media refs | Exact path audit matched all homepage `media/*` references. |
| B | A runtime error in `index.html` stops the boot sequence before GSAP / LocomotiveScroll initialization completes. | Rejected for local repro / inconclusive for Vercel | Inline script syntax passed; local repro reached desktop hero init and refresh. |
| C | The debug fetch/reporting code interferes with production boot or hides the real failure point. | Confirmed as deployment noise | Old localhost debug posts were shipping in `index.html` and shared `script.js`; gated to localhost only. |
| D | The LocomotiveScroll + `ScrollTrigger` desktop setup is initializing in an invalid state and never binds the bottle transform sequence. | Mitigated / likely environment-sensitive | Added library guards, static fallback, and post-age-gate re-init to avoid bad locked-state initialization. |
| E | Recent age-gate or markup edits introduced malformed DOM / script structure that breaks later homepage initialization. | Not confirmed as structural break | Local logs show successful deferred init after age gate. |

## Verification Conclusion
- Implemented hardening changes:
  1. Desktop hero init is deferred until after the age gate closes.
  2. Desktop hero re-initializes after the age gate unlocks scrolling.
  3. Missing animation libraries no longer hard-crash the homepage; the page falls back cleanly instead.
  4. Localhost debug posting is disabled in production for both `index.html` and shared `script.js`.
- Awaiting user verification on deployed Vercel build before cleanup of current debug instrumentation.
