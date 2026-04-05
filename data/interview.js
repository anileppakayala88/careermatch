// data/interview.js
// Universal questions shown in the Interview Prep panel.
// Add industry-specific question sets as needed.

const UNIVERSAL_QUESTIONS = [
  'Tell me about yourself.',
  'What is your greatest professional achievement?',
  'Describe a time you handled conflict on a team.',
  'Why are you leaving your current role?',
  'Where do you see yourself in 5 years?',
  'Tell me about a time you failed and what you learned.',
  'How do you prioritize when you have competing deadlines?',
  'Why do you want to work here specifically?',
  'Describe a situation where you had to influence without authority.',
  'What does your ideal work environment look like?',
  'Tell me about a time you had to learn something quickly.',
  'How do you handle ambiguity or unclear requirements?',
];

// Industry-specific questions — extend as needed
const INDUSTRY_QUESTIONS = {
  software: [
    'Walk me through your approach to debugging a production issue.',
    'How do you decide when to refactor vs. ship and iterate?',
    'Tell me about the most technically complex project you have shipped.',
    'How do you approach code review — as a reviewer and as an author?',
  ],
  data: [
    'How do you validate that your analysis is correct before presenting?',
    'Tell me about a time a stakeholder disagreed with your data findings.',
    'Walk me through how you would build a dashboard from scratch.',
    'How do you explain a complex statistical concept to a non-technical audience?',
  ],
  product: [
    'How do you prioritize features when everything is urgent?',
    'Tell me about a product decision you made with incomplete data.',
    'How do you define success for a new feature?',
    'Describe a time you had to say no to a stakeholder request.',
  ],
  marketing: [
    'Walk me through a campaign you owned end-to-end.',
    'How do you measure the ROI of a brand awareness campaign?',
    'Tell me about a time a campaign underperformed and what you did.',
    'How do you stay current with platform algorithm changes?',
  ],
};
