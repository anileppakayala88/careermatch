// js/trackerPanel.js
// Job Application Tracker — logs applications to localStorage.

const TrackerPanel = (() => {

  const STORAGE_KEY = 'careermatch_applications';

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }

  function save(apps) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  }

  function addApplication(entry) {
    const apps = load();
    apps.unshift({ id: Date.now(), ...entry });
    save(apps);
  }

  function deleteApplication(id) {
    save(load().filter(a => a.id !== id));
  }

  function renderTable() {
    const apps = load();
    const tbody = document.getElementById('trackerTbody');
    if (!tbody) return;

    if (apps.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="tracker-empty">No applications yet. Add one above.</td></tr>`;
      return;
    }

    tbody.innerHTML = apps.map(a => {
      const scoreHtml = a.atsScore !== ''
        ? `<span class="tracker-score ${scoreClass(a.atsScore)}">${a.atsScore}</span>`
        : '<span class="tracker-score-na">—</span>';
      const statusClass = `tracker-status tracker-status-${a.status.toLowerCase().replace(/\s+/g, '-')}`;
      return `
        <tr>
          <td>${escHtml(a.role)}</td>
          <td>${escHtml(a.company)}</td>
          <td>${escHtml(a.dateApplied)}</td>
          <td>${scoreHtml}</td>
          <td><span class="${statusClass}">${escHtml(a.status)}</span></td>
          <td><button class="btn tracker-del-btn" data-id="${a.id}" title="Delete">✕</button></td>
        </tr>`;
    }).join('');

    tbody.querySelectorAll('.tracker-del-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        deleteApplication(Number(btn.dataset.id));
        renderTable();
      });
    });
  }

  function scoreClass(score) {
    const n = parseInt(score, 10);
    if (isNaN(n)) return '';
    if (n >= 75) return 'score-high';
    if (n >= 50) return 'score-mid';
    return 'score-low';
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function render() {
    const panel = document.getElementById('panel-tracker');

    panel.innerHTML = `
      <div class="card tracker-form-card">
        <div class="section-label">Log Application</div>
        <div class="grid-2">
          <div class="field">
            <label class="field-label" for="trRole">Role / Title</label>
            <input type="text" id="trRole" placeholder="e.g. Frontend Developer" />
          </div>
          <div class="field">
            <label class="field-label" for="trCompany">Company</label>
            <input type="text" id="trCompany" placeholder="e.g. Acme Corp" />
          </div>
        </div>
        <div class="grid-3-tracker">
          <div class="field">
            <label class="field-label" for="trDate">Date Applied</label>
            <input type="text" id="trDate" placeholder="e.g. 2024-04-05" />
          </div>
          <div class="field">
            <label class="field-label" for="trScore">ATS Score (0–100)</label>
            <input type="text" id="trScore" placeholder="e.g. 82" />
          </div>
          <div class="field">
            <label class="field-label" for="trStatus">Status</label>
            <select id="trStatus">
              <option>Applied</option>
              <option>Phone Screen</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
              <option>Withdrawn</option>
            </select>
          </div>
        </div>
        <div class="btn-row">
          <button id="trAddBtn" class="btn btn-primary">Add Application</button>
          <span id="trError" class="error-msg"></span>
        </div>
      </div>

      <div class="tracker-table-wrap">
        <table class="tracker-table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Company</th>
              <th>Date Applied</th>
              <th>ATS Score</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="trackerTbody"></tbody>
        </table>
      </div>
    `;

    renderTable();

    document.getElementById('trAddBtn').addEventListener('click', () => {
      const role    = document.getElementById('trRole').value.trim();
      const company = document.getElementById('trCompany').value.trim();
      const date    = document.getElementById('trDate').value.trim();
      const score   = document.getElementById('trScore').value.trim();
      const status  = document.getElementById('trStatus').value;
      const err     = document.getElementById('trError');

      if (!role || !company) {
        err.textContent = 'Role and Company are required.';
        return;
      }
      err.textContent = '';

      addApplication({ role, company, dateApplied: date || '—', atsScore: score, status });
      renderTable();

      document.getElementById('trRole').value    = '';
      document.getElementById('trCompany').value = '';
      document.getElementById('trDate').value    = '';
      document.getElementById('trScore').value   = '';
      document.getElementById('trStatus').value  = 'Applied';
    });
  }

  return { render };

})();
