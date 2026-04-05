// data/prompts.js
// Add, edit, or remove prompt templates here.
// Each object: { title, desc, text }

const PROMPTS = [
  {
    title: 'Resume tailoring',
    desc: 'Rewrite your resume bullets to match a specific job description.',
    text: `I'm applying for [JOB TITLE] at [COMPANY]. Here is the job description:

[PASTE JD HERE]

Here are my current resume bullets:

[PASTE YOUR BULLETS HERE]

Rewrite my bullets to match the JD keywords and required skills. Keep them truthful, quantified where possible, and in past-tense action verb format. Do not invent experience I don't have.`,
  },
  {
    title: 'Cover letter',
    desc: 'Generate a tailored cover letter under 300 words.',
    text: `Write a professional cover letter for [JOB TITLE] at [COMPANY].

My background: [2–3 sentences about your experience and skills]
Key achievement: [your strongest relevant achievement with a number if possible]
Why this company: [1 sentence — be specific, not generic]

Requirements:
- Under 300 words
- Confident but not arrogant
- No clichés ("I am a team player", "I am passionate about...")
- Open with something specific, not "I am writing to apply for..."`,
  },
  {
    title: 'LinkedIn headline',
    desc: 'Craft a punchy headline that gets recruiter attention.',
    text: `Write 5 LinkedIn headline options for someone with the following background:

Current title: [YOUR CURRENT TITLE]
Skills: [YOUR TOP 3–4 SKILLS]
Looking for: [ROLE OR INDUSTRY YOU'RE TARGETING]
One differentiator: [SOMETHING THAT SETS YOU APART]

Requirements:
- Under 220 characters each
- Keyword-rich (for recruiter search)
- Specific — no vague words like "passionate" or "driven"
- Each option should have a different angle`,
  },
  {
    title: 'Salary negotiation',
    desc: 'Word-for-word script to negotiate your offer.',
    text: `I received a job offer for [JOB TITLE] at [COMPANY]. The offer is:
- Base salary: [OFFER AMOUNT]
- Other compensation: [BONUS / EQUITY / BENEFITS if any]

My research shows the market rate is [MARKET RATE] for this role in [CITY].
I have [X years of experience] and my key leverage is: [YOUR STRONGEST POINT].
My target salary is [TARGET AMOUNT].

Write me a polite, confident salary negotiation email. Make it:
- Grateful but not grovelling
- Specific about the number I'm asking for
- Brief (under 150 words)
- Ending with an open question, not a demand`,
  },
  {
    title: 'Cold outreach to recruiter',
    desc: 'A short LinkedIn message that gets responses.',
    text: `Write a LinkedIn message to a recruiter or hiring manager at [COMPANY] about [JOB TITLE OR TYPE OF ROLE] opportunities.

My background in one sentence: [YOUR SENTENCE]
Why this company specifically: [BE SPECIFIC — product, mission, recent news]

Requirements:
- Under 100 words
- Human, not salesy
- Low-friction ask at the end (e.g., "would you be open to a 15-min call?" not "I'd love to join your team")
- No attachments mentioned`,
  },
  {
    title: 'LinkedIn summary (About section)',
    desc: 'Write a compelling About section that tells your story.',
    text: `Write a LinkedIn About section for someone with this background:

Career story: [2–3 sentences about your journey and what led you here]
Core expertise: [YOUR TOP SKILLS / SPECIALIZATIONS]
Current focus: [WHAT YOU'RE WORKING ON OR LOOKING FOR]
One personal detail: [SOMETHING HUMAN — hobby, motivation, value]

Requirements:
- 150–220 words
- Written in first person
- Start with a hook — not "I am a [title]"
- End with a clear CTA or what you're open to`,
  },
];
