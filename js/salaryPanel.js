// js/salaryPanel.js
// Renders the Salary Benchmark Guide panel from data/salary.js

const SalaryPanel = (() => {

  const SCALE_MIN = 40000;
  const SCALE_MAX = 270000;

  function fmt(n) {
    return '$' + Math.round(n / 1000) + 'K';
  }

  function barStyle(min, max) {
    const left  = ((min - SCALE_MIN) / (SCALE_MAX - SCALE_MIN) * 100).toFixed(1);
    const width = ((max - min)       / (SCALE_MAX - SCALE_MIN) * 100).toFixed(1);
    return `left:${left}%;width:${width}%`;
  }

  function renderCards(key) {
    const data = SALARY_DATA[key];
    if (!data) return;

    document.getElementById('salaryGrid').innerHTML = data.roles.map(r => `
      <div class="sc-card">
        <div class="sc-header">
          <span class="sc-role">${r.role}</span>
          <span class="sc-industry">${data.label}</span>
        </div>
        <div class="sc-range">
          <span class="sc-low">${fmt(r.min)}</span>
          <span class="sc-arrow">→</span>
          <span class="sc-high">${fmt(r.max)}</span>
          <span class="sc-unit">CAD/yr</span>
        </div>
        <div class="sc-bar-track">
          <div class="sc-bar-fill" style="${barStyle(r.min, r.max)}"></div>
        </div>
        <div class="sc-tags">
          ${r.tags.map(t => `<span class="sc-tag">${t}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  function render() {
    const panel = document.getElementById('panel-salary');
    const keys  = Object.keys(SALARY_DATA);

    const tabButtons = keys.map((key, i) =>
      `<button class="tab salary-ind-tab${i === 0 ? ' active' : ''}" data-key="${key}">${SALARY_DATA[key].label}</button>`
    ).join('');

    panel.innerHTML = `
      <p class="salary-note">
        Estimated ranges — Canadian market (CAD). Always verify with current postings on
        <a href="https://glassdoor.ca" target="_blank">Glassdoor</a>,
        <a href="https://linkedin.com/salary" target="_blank">LinkedIn Salary</a>, or
        <a href="https://levels.fyi" target="_blank">Levels.fyi</a> before negotiating.
      </p>
      <div class="tabs salary-ind-tabs" style="flex-wrap:wrap;">${tabButtons}</div>
      <div id="salaryGrid" class="sc-grid"></div>
    `;

    panel.querySelectorAll('.salary-ind-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        panel.querySelectorAll('.salary-ind-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCards(btn.dataset.key);
      });
    });

    renderCards(keys[0]);
  }

  return { render };

})();
