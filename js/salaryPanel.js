// js/salaryPanel.js
// Renders the Salary Benchmark Guide panel from data/salary.js

const SalaryPanel = (() => {

  function render() {
    const panel = document.getElementById('panel-salary');

    const industryOptions = Object.entries(SALARY_DATA).map(([key, val]) =>
      `<option value="${key}">${val.label}</option>`
    ).join('');

    panel.innerHTML = `
      <p class="salary-note">
        Estimated ranges — Canadian market (CAD). Always verify with current postings on 
        <a href="https://glassdoor.ca" target="_blank">Glassdoor</a>, 
        <a href="https://linkedin.com/salary" target="_blank">LinkedIn Salary</a>, or 
        <a href="https://levels.fyi" target="_blank">Levels.fyi</a> before negotiating.
      </p>

      <div class="field">
        <label class="field-label" for="salaryIndustry">Industry</label>
        <select id="salaryIndustry"></select>
      </div>

      <div id="salaryTable" class="card"></div>
    `;

    const sel = document.getElementById('salaryIndustry');
    sel.innerHTML = industryOptions;
    sel.addEventListener('change', renderTable);
    renderTable();
  }

  function renderTable() {
    const key  = document.getElementById('salaryIndustry').value;
    const data = SALARY_DATA[key];
    if (!data) return;

    document.getElementById('salaryTable').innerHTML =
      data.roles.map(r => `
        <div class="salary-row">
          <span class="salary-role">${r.role}</span>
          <span class="salary-range">${r.range} CAD</span>
        </div>
      `).join('');
  }

  return { render };

})();
