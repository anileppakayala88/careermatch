// js/interviewPanel.js
// Renders the Interview Prep panel. Uses API.callStream for live feedback.

const InterviewPanel = (() => {

  function render() {
    const panel = document.getElementById('panel-interview');

    const universalQs = UNIVERSAL_QUESTIONS.map((q, i) => `
      <div class="q-row">
        <span class="q-text">${q}</span>
        <button class="btn q-btn" onclick="InterviewPanel.practiceQuestion(${i})">Practice ↗</button>
      </div>
    `).join('');

    panel.innerHTML = `
      <p style="font-size:14px;color:var(--color-text-sub);margin-bottom:1.25rem;line-height:1.6;">
        Paste an interview question to get a model STAR-method answer, 
        or paste your draft answer to get specific coaching feedback.
        <strong>STAR</strong> = Situation → Task → Action → Result.
      </p>

      <div class="field">
        <label class="field-label" for="interviewInput">Question or draft answer</label>
        <textarea id="interviewInput" placeholder="e.g. Tell me about a time you led a project under a tight deadline...&#10;&#10;Or paste your draft answer here for feedback."></textarea>
      </div>

      <div class="btn-row">
        <button class="btn btn-primary" id="interviewBtn">Get feedback ↗</button>
        <span id="intSpinner" style="display:none;"><span class="spinner"></span></span>
      </div>
      <div id="intError" class="error-msg"></div>

      <div id="intResult" style="display:none;margin-top:1.25rem;" class="card">
        <div class="stream-text" id="intAnalysis"></div>
      </div>

      <div class="divider" style="margin-top:2rem;"></div>
      <div class="section-label" style="margin-bottom:12px;">Universal questions</div>
      <div id="universalQs">${universalQs}</div>
    `;

    document.getElementById('interviewBtn').addEventListener('click', run);
  }

  async function run() {
    const input = document.getElementById('interviewInput').value.trim();
    const errEl = document.getElementById('intError');
    errEl.textContent = '';

    if (!input) { errEl.textContent = 'Please enter a question or draft answer.'; return; }

    const btn = document.getElementById('interviewBtn');
    btn.disabled = true;
    document.getElementById('intSpinner').style.display = 'inline';

    const analysisEl = document.getElementById('intAnalysis');
    analysisEl.textContent = '';
    document.getElementById('intResult').style.display = 'block';

    const systemPrompt = `You are a senior career coach helping candidates prepare for job interviews.
Be direct, specific, and constructive. Use plain text — no markdown headers or bullet symbols.`;

    const userPrompt = `The candidate wrote:

${input}

If this looks like a raw interview question: provide a model STAR-method answer structure with coaching notes on what to include.
If this looks like a draft answer: critique it specifically. What's strong, what's weak, what to add or cut.

Keep your response under 250 words. Be direct.`;

    try {
      await API.callStream(systemPrompt, userPrompt, chunk => {
        analysisEl.textContent += chunk;
      });
    } catch (err) {
      errEl.textContent = err.message;
      document.getElementById('intResult').style.display = 'none';
    } finally {
      btn.disabled = false;
      document.getElementById('intSpinner').style.display = 'none';
    }
  }

  // Called by universal question buttons
  function practiceQuestion(index) {
    const q = UNIVERSAL_QUESTIONS[index];
    document.getElementById('interviewInput').value = q;
    Tabs.switchTo('interview');
    run();
  }

  return { render, practiceQuestion };

})();
