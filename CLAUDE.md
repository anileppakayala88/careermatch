# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CareerMatch is a client-side-only web app — no build step, no dependencies, no backend. Users bring their own Anthropic API key; it's entered in the UI and never persisted.

## Running Locally

No install or build required. To avoid `file://` CORS issues with the Anthropic API:

```bash
python -m http.server 8000
# Open http://localhost:8000
```

Or just open `index.html` directly in a browser (streaming may be restricted on `file://`).

## Architecture

**Single-page application using vanilla JS IIFE modules.** Every `.js` file wraps its code in an immediately-invoked function expression and exposes a public object:

```javascript
const ModuleName = (() => {
  function publicMethod() { ... }
  return { publicMethod };
})();
```

**Script load order matters** — `index.html` loads scripts in strict sequence:
1. `data/` files (global data constants)
2. `js/api.js` and `js/tabs.js` (core utilities)
3. Panel modules (`js/ats.js`, `js/promptsPanel.js`, etc.)
4. `js/app.js` last (entry point)

**Initialization flow:**
- `app.js` runs on `DOMContentLoaded`, validates the API key input, immediately renders the ATS panel (default tab), then registers lazy-render callbacks for other tabs via `Tabs.onFirstActivate(tabName, callback)`.
- Each panel renders exactly once — on first tab click. Subsequent visits show the already-rendered DOM.

**API layer (`js/api.js`):**
- `API.callStream(messages, onChunk)` — streams tokens via SSE; used by Interview Prep
- `API.callJSON(messages)` — collects full response, strips markdown fences, parses JSON; used by ATS Scorer
- Model is hardcoded to `claude-sonnet-4-20250514`; header `anthropic-dangerous-direct-browser-access: true` enables browser-to-API calls

**Data files** are plain JS globals that panel modules read directly:
- `INDUSTRIES` — shared dropdown values used by both ATS scorer and salary guide
- `SALARY_DATA[industryKey]` — keyed by `INDUSTRIES` values
- `PROMPTS` — array of `{ title, desc, text }` objects
- `INTERVIEW_DATA` — universal + industry-specific question banks

## Adding Features

**New industry:** add to `data/industries.js` + matching key in `data/salary.js`.

**New prompt template:** add `{ title, desc, text }` object to `data/prompts.js`.

**New tab/panel:**
1. Add `<button class="tab" data-tab="mytab">` and `<div id="panel-mytab" class="panel">` in `index.html`
2. Create `js/myPanel.js` with a `render()` export
3. Load the script in `index.html` before `app.js`
4. Register in `app.js`: `Tabs.onFirstActivate('mytab', () => MyPanel.render())`

## CSS Design System

`css/style.css` uses CSS custom properties for all colors, spacing, and radii. No external fonts or frameworks. Max content width is 860px. Component classes follow a BEM-like pattern (`.api-key-bar`, `.score-ring`, `.btn-primary`).
