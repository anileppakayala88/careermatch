// js/api.js
// All communication with the Anthropic API lives here.
// Other modules call these functions — they never fetch directly.

const API = (() => {

  const ENDPOINT = 'https://api.anthropic.com/v1/messages';
  const MODEL    = 'claude-sonnet-4-20250514';

  function getKey() {
    return document.getElementById('apiKey').value.trim();
  }

  /**
   * callStream — sends a message and streams the response token by token.
   *
   * @param {string}   systemPrompt  — sets Claude's role/behavior
   * @param {string}   userPrompt    — the actual user message
   * @param {function} onChunk       — called with each text chunk as it arrives
   * @returns {Promise<string>}      — resolves with the full response text
   */
  async function callStream(systemPrompt, userPrompt, onChunk) {
    const key = getKey();
    if (!key) throw new Error('Please enter your Anthropic API key at the top of the page.');

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1000,
        stream: true,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error ${response.status}`);
    }

    const reader  = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer    = '';
    let fullText  = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop(); // keep incomplete line for next chunk

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6);
        if (data === '[DONE]') return fullText;

        try {
          const obj = JSON.parse(data);
          if (obj.type === 'content_block_delta' && obj.delta?.text) {
            fullText += obj.delta.text;
            onChunk(obj.delta.text);
          }
        } catch (_) {
          // Malformed SSE line — skip silently
        }
      }
    }

    return fullText;
  }

  /**
   * callJSON — like callStream but collects the full response and parses JSON.
   * Useful when you need structured data back (e.g. ATS scorer).
   *
   * @param {string} systemPrompt
   * @param {string} userPrompt
   * @returns {Promise<object>}
   */
  async function callJSON(systemPrompt, userPrompt) {
    let raw = '';
    await callStream(systemPrompt, userPrompt, chunk => { raw += chunk; });
    // Strip markdown code fences if the model wraps its JSON
    const clean = raw.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  }

  // Public interface
  return { callStream, callJSON };

})();
