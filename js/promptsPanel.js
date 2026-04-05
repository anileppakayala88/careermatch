// js/promptsPanel.js
// Renders the AI Prompt Templates panel from data/prompts.js

const PromptsPanel = (() => {

  function render() {
    const panel = document.getElementById('panel-prompts');

    const cards = PROMPTS.map((p, i) => `
      <div class="card prompt-card">
        <h4>${p.title}</h4>
        <p>${p.desc}</p>
        <div class="prompt-body">${escapeHtml(p.text)}</div>
        <button class="btn" id="copyBtn-${i}" onclick="PromptsPanel.copy(${i})">Copy prompt</button>
      </div>
    `).join('');

    panel.innerHTML = `
      <p class="prompt-intro">
        Copy any prompt → open <a href="https://claude.ai" target="_blank">Claude.ai</a> or 
        <a href="https://chatgpt.com" target="_blank">ChatGPT</a> (both free) → paste → fill in the [brackets].
      </p>
      ${cards}
    `;
  }

  function copy(index) {
    const p = PROMPTS[index];
    navigator.clipboard.writeText(p.text).then(() => {
      const btn = document.getElementById(`copyBtn-${index}`);
      btn.textContent = 'Copied!';
      setTimeout(() => { btn.textContent = 'Copy prompt'; }, 2000);
    });
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  return { render, copy };

})();
