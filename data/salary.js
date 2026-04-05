// data/salary.js
// Canadian market (CAD). Update figures as needed.
// Each industry key must match a value in INDUSTRIES (data/industries.js).

const SALARY_DATA = {
  software: {
    label: 'Software Engineering',
    roles: [
      { role: 'Junior Developer',            range: '$65,000 – $85,000' },
      { role: 'Mid Software Engineer',        range: '$90,000 – $120,000' },
      { role: 'Senior Software Engineer',     range: '$125,000 – $160,000' },
      { role: 'Staff / Principal Engineer',   range: '$160,000 – $210,000' },
      { role: 'Engineering Manager',          range: '$140,000 – $185,000' },
      { role: 'VP of Engineering',            range: '$185,000 – $260,000' },
    ],
  },
  data: {
    label: 'Data & Analytics',
    roles: [
      { role: 'Data Analyst',                 range: '$60,000 – $85,000' },
      { role: 'Senior Data Analyst',          range: '$85,000 – $110,000' },
      { role: 'Data Scientist',               range: '$90,000 – $125,000' },
      { role: 'Senior Data Scientist',        range: '$120,000 – $160,000' },
      { role: 'ML Engineer',                  range: '$110,000 – $155,000' },
      { role: 'Data Engineering Lead',        range: '$140,000 – $185,000' },
    ],
  },
  product: {
    label: 'Product Management',
    roles: [
      { role: 'Associate PM',                 range: '$75,000 – $95,000' },
      { role: 'Product Manager',              range: '$95,000 – $130,000' },
      { role: 'Senior PM',                    range: '$130,000 – $165,000' },
      { role: 'Principal PM',                 range: '$155,000 – $195,000' },
      { role: 'Director of Product',          range: '$160,000 – $210,000' },
    ],
  },
  marketing: {
    label: 'Marketing',
    roles: [
      { role: 'Marketing Coordinator',        range: '$45,000 – $60,000' },
      { role: 'Digital Marketing Specialist', range: '$60,000 – $80,000' },
      { role: 'Marketing Manager',            range: '$75,000 – $100,000' },
      { role: 'Senior Marketing Manager',     range: '$100,000 – $130,000' },
      { role: 'Head of Marketing',            range: '$125,000 – $165,000' },
      { role: 'VP Marketing / CMO (SMB)',     range: '$155,000 – $220,000' },
    ],
  },
  finance: {
    label: 'Finance & Accounting',
    roles: [
      { role: 'Financial Analyst',            range: '$60,000 – $80,000' },
      { role: 'Senior Financial Analyst',     range: '$80,000 – $105,000' },
      { role: 'Finance Manager',              range: '$100,000 – $135,000' },
      { role: 'Controller',                   range: '$120,000 – $160,000' },
      { role: 'Director of Finance',          range: '$145,000 – $190,000' },
      { role: 'CFO (SMB)',                    range: '$160,000 – $240,000' },
    ],
  },
  design: {
    label: 'UX / Design',
    roles: [
      { role: 'Junior UX Designer',           range: '$55,000 – $75,000' },
      { role: 'UX / Product Designer',        range: '$80,000 – $110,000' },
      { role: 'Senior Product Designer',      range: '$110,000 – $145,000' },
      { role: 'Lead / Principal Designer',    range: '$140,000 – $175,000' },
      { role: 'Design Manager',               range: '$130,000 – $170,000' },
    ],
  },
  sales: {
    label: 'Sales',
    roles: [
      { role: 'SDR / BDR',                    range: '$45,000 – $65,000 + commission' },
      { role: 'Account Executive (SMB)',       range: '$70,000 – $100,000 OTE' },
      { role: 'Account Executive (Mid-Market)',range: '$100,000 – $150,000 OTE' },
      { role: 'Enterprise AE',                range: '$140,000 – $220,000 OTE' },
      { role: 'Sales Manager',                range: '$110,000 – $155,000 OTE' },
    ],
  },
  hr: {
    label: 'HR & People Ops',
    roles: [
      { role: 'HR Coordinator',               range: '$48,000 – $65,000' },
      { role: 'HR Generalist',                range: '$65,000 – $85,000' },
      { role: 'HR Manager',                   range: '$85,000 – $115,000' },
      { role: 'Talent Acquisition Lead',      range: '$90,000 – $120,000' },
      { role: 'Director of People',           range: '$130,000 – $175,000' },
    ],
  },
  ops: {
    label: 'Operations',
    roles: [
      { role: 'Operations Coordinator',       range: '$50,000 – $68,000' },
      { role: 'Operations Manager',           range: '$75,000 – $105,000' },
      { role: 'Senior Operations Manager',    range: '$105,000 – $135,000' },
      { role: 'Director of Operations',       range: '$130,000 – $175,000' },
      { role: 'COO (SMB)',                    range: '$155,000 – $230,000' },
    ],
  },
  legal: {
    label: 'Legal',
    roles: [
      { role: 'Legal Assistant / Clerk',      range: '$45,000 – $65,000' },
      { role: 'Paralegal',                    range: '$55,000 – $80,000' },
      { role: 'In-house Counsel (Junior)',     range: '$90,000 – $130,000' },
      { role: 'Senior Counsel',               range: '$130,000 – $175,000' },
      { role: 'General Counsel (SMB)',        range: '$165,000 – $240,000' },
    ],
  },
};
