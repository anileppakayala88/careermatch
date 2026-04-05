# CareerMatch — AI Job Search Toolkit

A free, open-source job search toolkit powered by the Anthropic Claude API.  
No backend. No sign-up. No data collected. Runs entirely in your browser.

**Live demo:** [your-username.github.io/careermatch](https://your-username.github.io/careermatch)

---

## Features

| Tab | What it does |
|---|---|
| **ATS Scorer** | Paste a job description → get a score, keyword gap analysis, and AI fit assessment |
| **AI Prompts** | Copy-paste prompt templates for resumes, cover letters, salary negotiation, LinkedIn |
| **Salary Guide** | Canadian market salary ranges by role and industry |
| **Interview Prep** | Live AI coaching on your answers using the STAR method |
| **Workflow** | A structured 45-minute daily job search system |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/careermatch.git
cd careermatch
```

### 2. Open locally

```bash
# No build step needed — just open index.html in your browser
open index.html
```

### 3. Get an API key

Get a free Anthropic API key at [console.anthropic.com](https://console.anthropic.com).  
Paste it into the key bar at the top of the app.

---

## Deploy to GitHub Pages (free)

1. Push the repo to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, `/ (root)` folder
4. Your site is live at `https://your-username.github.io/careermatch`

---

## Project Structure

```
careermatch/
├── index.html          # Entry point — loads all scripts
├── css/
│   └── style.css       # All styles
├── data/
│   ├── industries.js   # Industry + experience level lists
│   ├── prompts.js      # AI prompt templates
│   ├── salary.js       # Salary benchmark data
│   └── interview.js    # Interview questions
└── js/
    ├── api.js           # Anthropic API calls (callStream, callJSON)
    ├── tabs.js          # Tab switching logic
    ├── app.js           # Entry point — wires everything together
    ├── ats.js           # ATS Scorer panel
    ├── promptsPanel.js  # AI Prompts panel
    ├── salaryPanel.js   # Salary Guide panel
    ├── interviewPanel.js# Interview Prep panel
    └── workflowPanel.js # Daily Workflow panel
```

---

## How to Extend

### Add a new industry
Edit `data/industries.js` — add an entry to `INDUSTRIES` and a matching key in `data/salary.js`.

### Add a new prompt template
Edit `data/prompts.js` — add an object with `title`, `desc`, and `text`.

### Add a new panel/tab
1. Add a button in `index.html`: `<button class="tab" data-tab="mytab">My Tab</button>`
2. Add a panel div: `<div id="panel-mytab" class="panel"></div>`
3. Create `js/myPanel.js` with a `render()` function
4. Load it in `index.html` before `app.js`
5. Register it in `app.js`: `Tabs.onFirstActivate('mytab', () => MyPanel.render())`

---

## API Usage Notes

- Uses `claude-sonnet-4-20250514` (configurable in `js/api.js`)
- ATS Scorer uses `callJSON()` — prompts Claude to return structured JSON
- Interview Prep uses `callStream()` — streams tokens live to the UI
- Your API key is never stored — it lives only in the browser's memory for the session

---

## Contributing

Issues, PRs, and suggestions welcome.  
See a missing industry, outdated salary, or useful prompt? Open a PR.

---

## License

MIT — free to use, fork, and modify.
