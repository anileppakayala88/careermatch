// js/app.js
// Entry point — initializes all modules when the DOM is ready.
// This is the only file that knows about all other modules.

document.addEventListener('DOMContentLoaded', () => {

  // --- API key status indicator ---
  document.getElementById('apiKey').addEventListener('input', function () {
    const status = document.getElementById('keyStatus');
    if (this.value.startsWith('sk-ant')) {
      status.textContent = '✓ set';
      status.classList.add('ok');
    } else {
      status.textContent = 'not set';
      status.classList.remove('ok');
    }
  });

  // --- Render the default (ATS) panel immediately ---
  ATSPanel.render();

  // --- Register lazy renders for other tabs ---
  // These only run the first time each tab is clicked, keeping initial load fast.
  Tabs.onFirstActivate('prompts',   () => PromptsPanel.render());
  Tabs.onFirstActivate('salary',    () => SalaryPanel.render());
  Tabs.onFirstActivate('interview', () => InterviewPanel.render());
  Tabs.onFirstActivate('workflow',  () => WorkflowPanel.render());

  // --- Initialize tab switching ---
  Tabs.init();

});
