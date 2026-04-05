// data/salary.js
// Canadian market (CAD). Update figures as needed.
// Each industry key must match a value in INDUSTRIES (data/industries.js).

const SALARY_DATA = {
  software: {
    label: 'Software Engineering',
    roles: [
      { role: 'Junior Developer',            min: 65000,  max: 85000,  tags: ['JavaScript', 'Python', 'entry-level', 'remote'] },
      { role: 'Mid Software Engineer',        min: 90000,  max: 120000, tags: ['React', 'Node.js', '3–5 years', 'hybrid'] },
      { role: 'Senior Software Engineer',     min: 125000, max: 160000, tags: ['system design', 'cloud', '5+ years', 'hybrid'] },
      { role: 'Staff / Principal Engineer',   min: 160000, max: 210000, tags: ['architecture', 'mentorship', 'distributed'] },
      { role: 'Engineering Manager',          min: 140000, max: 185000, tags: ['leadership', 'agile', 'team building'] },
      { role: 'VP of Engineering',            min: 185000, max: 260000, tags: ['strategy', 'OKRs', 'executive'] },
    ],
  },
  data: {
    label: 'Data & Analytics',
    roles: [
      { role: 'Data Analyst',                 min: 60000,  max: 85000,  tags: ['SQL', 'Python', 'Excel', 'Power BI'] },
      { role: 'Senior Data Analyst',          min: 85000,  max: 110000, tags: ['SQL', 'Tableau', 'stakeholders'] },
      { role: 'Data Scientist',               min: 90000,  max: 125000, tags: ['Python', 'ML', 'statistics', 'remote'] },
      { role: 'Senior Data Scientist',        min: 120000, max: 160000, tags: ['deep learning', 'MLflow', '5+ years'] },
      { role: 'ML Engineer',                  min: 110000, max: 155000, tags: ['PyTorch', 'MLOps', 'TensorFlow', 'remote'] },
      { role: 'Data Engineering Lead',        min: 140000, max: 185000, tags: ['Spark', 'dbt', 'Airflow'] },
    ],
  },
  product: {
    label: 'Product Management',
    roles: [
      { role: 'Associate PM',                 min: 75000,  max: 95000,  tags: ['roadmap', 'entry-level', 'agile'] },
      { role: 'Product Manager',              min: 95000,  max: 130000, tags: ['roadmap', 'stakeholders', 'agile'] },
      { role: 'Senior PM',                    min: 130000, max: 165000, tags: ['strategy', 'OKRs', '5+ years'] },
      { role: 'Principal PM',                 min: 155000, max: 195000, tags: ['vision', 'leadership', '8+ years'] },
      { role: 'Director of Product',          min: 160000, max: 210000, tags: ['executive', 'strategy', 'team'] },
    ],
  },
  marketing: {
    label: 'Marketing',
    roles: [
      { role: 'Marketing Coordinator',        min: 45000,  max: 60000,  tags: ['social media', 'content', 'entry-level'] },
      { role: 'Digital Marketing Specialist', min: 60000,  max: 80000,  tags: ['SEO', 'Google Ads', 'analytics'] },
      { role: 'Marketing Manager',            min: 75000,  max: 100000, tags: ['campaigns', 'brand', 'team lead'] },
      { role: 'Senior Marketing Manager',     min: 100000, max: 130000, tags: ['strategy', 'budget', '5+ years'] },
      { role: 'Head of Marketing',            min: 125000, max: 165000, tags: ['leadership', 'growth', 'executive'] },
      { role: 'VP Marketing / CMO (SMB)',     min: 155000, max: 220000, tags: ['CMO', 'brand', 'executive'] },
    ],
  },
  finance: {
    label: 'Finance & Accounting',
    roles: [
      { role: 'Financial Analyst',            min: 60000,  max: 80000,  tags: ['Excel', 'financial modeling', 'CFA'] },
      { role: 'Senior Financial Analyst',     min: 80000,  max: 105000, tags: ['Excel', 'forecasting', 'CPA'] },
      { role: 'Finance Manager',              min: 100000, max: 135000, tags: ['budgeting', 'team lead', 'CPA'] },
      { role: 'Controller',                   min: 120000, max: 160000, tags: ['GAAP', 'CPA', 'reporting'] },
      { role: 'Director of Finance',          min: 145000, max: 190000, tags: ['strategy', 'CPA', '8+ years'] },
      { role: 'CFO (SMB)',                    min: 160000, max: 240000, tags: ['executive', 'CPA', 'M&A'] },
    ],
  },
  design: {
    label: 'UX / Design',
    roles: [
      { role: 'Junior UX Designer',           min: 55000,  max: 75000,  tags: ['Figma', 'user research', 'entry-level', 'remote'] },
      { role: 'UX / Product Designer',        min: 80000,  max: 110000, tags: ['Figma', 'prototyping', 'user research'] },
      { role: 'Senior Product Designer',      min: 110000, max: 145000, tags: ['Figma', 'design systems', '5+ years'] },
      { role: 'Lead / Principal Designer',    min: 140000, max: 175000, tags: ['leadership', 'design systems', 'strategy'] },
      { role: 'Design Manager',               min: 130000, max: 170000, tags: ['leadership', 'team', 'Figma'] },
    ],
  },
  sales: {
    label: 'Sales',
    roles: [
      { role: 'SDR / BDR',                    min: 45000,  max: 65000,  tags: ['cold calling', 'CRM', 'entry-level', 'remote'] },
      { role: 'Account Executive (SMB)',       min: 70000,  max: 100000, tags: ['SaaS', 'CRM', 'closing', 'OTE'] },
      { role: 'Account Executive (Mid-Market)',min: 100000, max: 150000, tags: ['SaaS', 'negotiation', '3+ years', 'OTE'] },
      { role: 'Enterprise AE',                min: 140000, max: 220000, tags: ['enterprise', 'strategic', '5+ years', 'OTE'] },
      { role: 'Sales Manager',                min: 110000, max: 155000, tags: ['leadership', 'coaching', 'CRM', 'OTE'] },
    ],
  },
  hr: {
    label: 'HR & People Ops',
    roles: [
      { role: 'HR Coordinator',               min: 48000,  max: 65000,  tags: ['HRIS', 'onboarding', 'entry-level'] },
      { role: 'HR Generalist',                min: 65000,  max: 85000,  tags: ['HRBP', 'benefits', 'compliance'] },
      { role: 'HR Manager',                   min: 85000,  max: 115000, tags: ['HRBP', 'team lead', 'Workday'] },
      { role: 'Talent Acquisition Lead',      min: 90000,  max: 120000, tags: ['recruiting', 'sourcing', 'ATS'] },
      { role: 'Director of People',           min: 130000, max: 175000, tags: ['strategy', 'culture', 'executive'] },
    ],
  },
  ops: {
    label: 'Operations',
    roles: [
      { role: 'Operations Coordinator',       min: 50000,  max: 68000,  tags: ['logistics', 'Excel', 'entry-level'] },
      { role: 'Operations Manager',           min: 75000,  max: 105000, tags: ['process improvement', 'lean', 'team lead'] },
      { role: 'Senior Operations Manager',    min: 105000, max: 135000, tags: ['KPIs', 'strategy', '5+ years'] },
      { role: 'Director of Operations',       min: 130000, max: 175000, tags: ['strategy', 'executive', 'P&L'] },
      { role: 'COO (SMB)',                    min: 155000, max: 230000, tags: ['executive', 'strategy', 'leadership'] },
    ],
  },
  legal: {
    label: 'Legal',
    roles: [
      { role: 'Legal Assistant / Clerk',      min: 45000,  max: 65000,  tags: ['legal research', 'filing', 'entry-level'] },
      { role: 'Paralegal',                    min: 55000,  max: 80000,  tags: ['litigation', 'contracts', 'research'] },
      { role: 'In-house Counsel (Junior)',     min: 90000,  max: 130000, tags: ['contracts', 'compliance', 'JD'] },
      { role: 'Senior Counsel',               min: 130000, max: 175000, tags: ['M&A', 'litigation', 'JD'] },
      { role: 'General Counsel (SMB)',        min: 165000, max: 240000, tags: ['executive', 'strategy', 'JD'] },
    ],
  },
};
