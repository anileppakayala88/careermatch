// js/tabs.js
// Handles tab switching. Fires an optional onActivate callback
// so each panel can lazily render its content the first time it's shown.

const Tabs = (() => {

  // Map of tabId -> callback to run once when tab first activates
  const _onActivate = {};

  function init() {
    document.querySelectorAll('.tab[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => switchTo(btn.dataset.tab));
    });
  }

  /**
   * Register a callback that fires the first time a tab is activated.
   * @param {string}   tabId
   * @param {function} fn
   */
  function onFirstActivate(tabId, fn) {
    _onActivate[tabId] = { fn, called: false };
  }

  function switchTo(tabId) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    // Update panels
    document.querySelectorAll('.panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `panel-${tabId}`);
    });

    // Fire first-activate callback if registered
    const entry = _onActivate[tabId];
    if (entry && !entry.called) {
      entry.fn();
      entry.called = true;
    }
  }

  return { init, switchTo, onFirstActivate };

})();
