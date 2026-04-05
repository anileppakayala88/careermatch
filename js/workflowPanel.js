// js/workflowPanel.js
// Renders the Daily Workflow panel. Pure static content — no API calls.

const WorkflowPanel = (() => {

  const STEPS = [
    {
      title: 'Check your job alert emails',
      body: 'Set up alerts on Indeed, LinkedIn, and 1–2 specialist portals. Each morning, scan subject lines only — don\'t click everything. Pick the best 1–2 postings.',
      time: '5 min',
    },
    {
      title: 'Shortlist ruthlessly',
      body: 'Apply only to roles where you meet 70%+ of the requirements. Applying to 20 mismatched roles wastes time that would be better spent tailoring 2 strong applications.',
      time: '5 min',
    },
    {
      title: 'Run the ATS Scorer',
      body: 'Paste the job description into the ATS tab. Check your score. Note every red keyword — those need to appear naturally in your resume and cover letter before you apply.',
      time: '3 min',
    },
    {
      title: 'Tailor your resume and cover letter',
      body: 'Use the AI Prompts tab. Paste a prompt into Claude.ai or ChatGPT (both free). Review the output carefully — edit anything that doesn\'t sound like you.',
      time: '15 min',
    },
    {
      title: 'Read everything out loud',
      body: 'This is non-negotiable. If a sentence sounds unnatural, rewrite it. Recruiters can tell when a human didn\'t write something. Your documents must sound like you.',
      time: '10 min',
    },
    {
      title: 'Submit and track',
      body: 'Apply on the portal. Immediately log: role, company, date, ATS score, portal, status. Set a 7-day follow-up reminder. Consistency compounds — your tracker shows you what works.',
      time: '5 min',
    },
  ];

  const DECISION = [
    { score: '75–100',  label: 'Strong match — generate docs and apply today.', cls: 'green' },
    { score: '55–74',   label: 'Good fit — address missing keywords first.',     cls: 'amber' },
    { score: 'Below 55',label: 'Stretch role — only apply if you can genuinely bridge the gaps.', cls: 'red' },
  ];

  const MISTAKES = [
    'Never add keywords you cannot defend in an interview. ATS gets you in — the interview exposes you.',
    'Don\'t mass-apply with one generic resume. 3 tailored applications beat 30 generic ones.',
    'Don\'t forget to follow up after 7 days. One polite email dramatically increases response rates.',
    'Don\'t skip the application tracker. You will lose track of versions, deadlines, and contacts.',
  ];

  function render() {
    const panel = document.getElementById('panel-workflow');

    const stepCards = STEPS.map((s, i) => `
      <div class="step-card card" style="display:flex;gap:16px;align-items:flex-start;">
        <div class="step-num">${i + 1}</div>
        <div style="flex:1;">
          <h4 style="font-size:14px;font-weight:600;margin-bottom:4px;">${s.title}</h4>
          <p style="font-size:13px;color:var(--color-text-sub);line-height:1.55;margin-bottom:4px;">${s.body}</p>
          <span style="font-size:11px;color:var(--color-text-hint);font-weight:500;">${s.time}</span>
        </div>
      </div>
    `).join('');

    const decisionCards = DECISION.map(d => `
      <div class="decision-card ${d.cls}">
        <div class="d-score">${d.score}</div>
        <div class="d-label">${d.label}</div>
      </div>
    `).join('');

    const mistakeList = MISTAKES.map(m => `
      <div style="padding:9px 0;border-bottom:1px solid var(--color-border);font-size:13px;color:var(--color-text-sub);line-height:1.5;">
        ${m}
      </div>
    `).join('');

    panel.innerHTML = `
      <p class="workflow-intro">
        A structured 45-minute daily system that consistently outperforms mass-applying. 
        Quality over quantity — always.
      </p>

      ${stepCards}

      <div class="divider" style="margin-top:1.5rem;"></div>
      <div class="section-label" style="margin-bottom:12px;">ATS score decision guide</div>
      <div class="decision-grid">${decisionCards}</div>

      <div class="divider"></div>
      <div class="section-label" style="margin-bottom:12px;">Common mistakes</div>
      <div>${mistakeList}</div>

      <div class="divider"></div>
      <div class="section-label" style="margin-bottom:12px;">Weekly targets</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;">
        ${[
          ['5–8', 'Applications / week'],
          ['70%+', 'Min ATS score to apply'],
          ['7 days', 'Follow-up window'],
          ['10–15%', 'Normal response rate'],
        ].map(([num, lbl]) => `
          <div style="background:var(--color-bg);border:1px solid var(--color-border);border-radius:var(--border-radius-md,10px);padding:1rem;text-align:center;">
            <div style="font-size:20px;font-weight:600;margin-bottom:4px;">${num}</div>
            <div style="font-size:12px;color:var(--color-text-sub);line-height:1.4;">${lbl}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  return { render };

})();
