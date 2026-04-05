// js/ats.js
// ATS Scorer panel — renders the form, calls the API, displays results.

const ATSPanel = (() => {

  function render() {
    const panel = document.getElementById('panel-ats');

    // Build industry and experience dropdowns from data files
    const industryOptions = INDUSTRIES.map(i =>
      `<option value="${i.value}">${i.label}</option>`
    ).join('');

    const levelOptions = EXPERIENCE_LEVELS.map(l =>
      `<option value="${l.value}" ${l.value === 'mid' ? 'selected' : ''}>${l.label}</option>`
    ).join('');

    panel.innerHTML = `
      <div class="grid-2">
        <div class="field">
          <label class="field-label" for="atsIndustry">Industry</label>
          <select id="atsIndustry">${industryOptions}</select>
        </div>
        <div class="field">
          <label class="field-label" for="atsLevel">Experience level</label>
          <select id="atsLevel">${levelOptions}</select>
        </div>
      </div>

      <div class="field">
        <label class="field-label" for="jdText">Job description</label>
        <textarea id="jdText" placeholder="Paste the full job description here..."></textarea>
      </div>

      <div class="field">
        <label class="field-label" for="resumeText">Your resume summary <span style="font-weight:400;text-transform:none;letter-spacing:0;">(optional — improves accuracy)</span></label>
        <textarea id="resumeText" style="min-height:90px;" placeholder="Paste a short summary or bullets from your resume..."></textarea>
      </div>

      <div class="btn-row">
        <button class="btn btn-primary" id="atsBtn">Analyze ↗</button>
        <button class="btn" id="atsClearBtn">Clear</button>
        <span id="atsSpinner" style="display:none;"><span class="spinner"></span></span>
      </div>
      <div id="atsError" class="error-msg"></div>

      <div id="atsResult" style="display:none;" class="card" style="margin-top:1.25rem;">
        <div class="score-wrap">
          <div class="score-ring" id="scoreRing">
            <span class="score-num" id="scoreNum">—</span>
            <span class="score-label">/ 100</span>
          </div>
          <div class="score-meta">
            <div class="verdict" id="scoreVerdict"></div>
            <div class="advice"  id="scoreAdvice"></div>
          </div>
        </div>

        <div class="divider"></div>

        <div class="kw-section">
          <h4>Keywords found</h4>
          <div class="kw-grid" id="kwFound"></div>
        </div>
        <div class="kw-section" style="margin-top:1rem;">
          <h4>Keywords missing — add these to your resume</h4>
          <div class="kw-grid" id="kwMissing"></div>
        </div>

        <div class="divider"></div>

        <div class="section-label">AI analysis</div>
        <div class="stream-text" id="atsAnalysis"></div>
      </div>
    `;

    document.getElementById('atsBtn').addEventListener('click', run);
    document.getElementById('atsClearBtn').addEventListener('click', clear);
  }

  async function run() {
    const jd      = document.getElementById('jdText').value.trim();
    const resume  = document.getElementById('resumeText').value.trim();
    const industry = document.getElementById('atsIndustry').value;
    const level    = document.getElementById('atsLevel').value;
    const errEl    = document.getElementById('atsError');

    errEl.textContent = '';
    if (!jd) { errEl.textContent = 'Please paste a job description first.'; return; }

    const btn = document.getElementById('atsBtn');
    btn.disabled = true;
    document.getElementById('atsSpinner').style.display = 'inline';
    document.getElementById('atsResult').style.display = 'none';

    const systemPrompt = `You are an expert ATS analyst and resume coach. 
Respond with valid JSON only. No markdown, no preamble, no explanation outside the JSON.`;

    const userPrompt = `Analyze this job description for a ${level} ${industry} role.
${resume ? `\nCandidate resume summary:\n${resume}\n` : ''}
Job description:
${jd}

Return a JSON object with exactly this shape:
{
  "score": <integer 0–100>,
  "verdict": "<short verdict, max 8 words>",
  "advice": "<1 actionable sentence>",
  "found": ["keyword", ...],
  "missing": ["keyword", ...],
  "analysis": "<2–3 sentence professional assessment of fit>"
}

Rules:
- "found" = important JD keywords commonly present in strong ${level} ${industry} resumes
- "missing" = important JD keywords absent from the candidate's profile (or likely absent if no resume was provided)
- Score honestly. No resume provided = assume average candidate.
- Keep "found" and "missing" to 6–10 items each.`;

    try {
      const data = await API.callJSON(systemPrompt, userPrompt);
      displayResult(data);
    } catch (err) {
      errEl.textContent = err.message;
    } finally {
      btn.disabled = false;
      document.getElementById('atsSpinner').style.display = 'none';
    }
  }

  function displayResult(d) {
    document.getElementById('scoreNum').textContent = d.score;

    const ring = document.getElementById('scoreRing');
    ring.className = 'score-ring ' + (d.score >= 75 ? 'high' : d.score >= 55 ? 'mid' : 'low');

    document.getElementById('scoreVerdict').textContent = d.verdict;
    document.getElementById('scoreAdvice').textContent  = d.advice;

    document.getElementById('kwFound').innerHTML =
      (d.found || []).map(k => `<span class="kw-tag found">✓ ${k}</span>`).join('');

    document.getElementById('kwMissing').innerHTML =
      (d.missing || []).map(k => `<span class="kw-tag missing">✗ ${k}</span>`).join('');

    document.getElementById('atsAnalysis').textContent = d.analysis;
    document.getElementById('atsResult').style.display = 'block';
  }

  function clear() {
    document.getElementById('jdText').value      = '';
    document.getElementById('resumeText').value  = '';
    document.getElementById('atsResult').style.display = 'none';
    document.getElementById('atsError').textContent    = '';
  }

  return { render };

})();
