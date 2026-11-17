/* Progressive enhancement: no library, no perpetual animation or scroll handler. */
(() => {
  'use strict';
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.body;
  let observer;
  const running = new Set();
  const reduced = () => preference.matches;
  const animate = (element, frames, options = {}) => {
    if (!element || reduced() || !element.animate) return;
    const animation = element.animate(frames, { duration: 240, easing: 'cubic-bezier(.22,1,.36,1)', ...options });
    running.add(animation);
    animation.finished.catch(() => {}).finally(() => running.delete(animation));
  };
  const show = element => {
    element.classList.add('is-visible');
    observer?.unobserve(element);
    // Entrance delays must not affect later hover/focus transitions.
    setTimeout(() => element.style.removeProperty('--motion-delay'), 1000);
  };
  const candidates = '.section-head,.studio>.grid>div,.studio-copy,.values>div,.steps>article,.project,.product,.philosophy-copy,.botanical,.ritual,.intro>h2,.intro-copy,.cabin,.day-explorer,.features>article,.how-grid>article,.pricing>article,.order-steps>article,.story-art,.story-copy,.slow>.shell,.closing>.shell,.cta>.shell,.pizza-cta>.shell,.contact>.grid>div,.contact form';
  try {
    if (!reduced() && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) show(entry.target); });
      }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
      const seen = new Set();
      document.querySelectorAll(candidates).forEach(element => {
        if (element.closest('[data-motion]')) return;
        element.dataset.motion = '';
        const position = [...element.parentElement.children].indexOf(element);
        const delay = element.matches('.product,.features>article,.pricing>article,.steps>article,.how-grid>article,.order-steps>article') ? Math.min(position, 3) * 65 : 0;
        element.style.setProperty('--motion-delay', delay + 'ms');
        // Initially visible content is never hidden, avoiding a late-load flash.
        if (element.getBoundingClientRect().top < innerHeight - 20) element.classList.add('is-visible');
        else observer.observe(element);
        seen.add(element);
      });
      root.classList.add('motion-ready');
      document.addEventListener('focusin', event => {
        const target = event.target.closest?.('[data-motion]');
        if (target) show(target);
      });
    }
    // Hero copy gets one brief entrance, only when loaded promptly.
    if (!reduced() && performance.now() < 1500) {
      const hero = document.querySelector('.hero h1');
      animate(hero, [{ opacity: .35, translate: '0 10px' }, { opacity: 1, translate: '0 0' }], { duration: 550 });
    }
    // Animate feedback after its real value has changed; never invent intermediate numbers.
    const feedback = '#quiz-question,#guided-result,#booking-result,#board-status,#checkout-status,#summary-percent,#cover-name,#cover-count,#cart-total,#dock-total,.price b';
    const feedbackObserver = new MutationObserver(records => {
      const elements = new Set(records.map(record => record.target.nodeType === 1 ? record.target : record.target.parentElement));
      elements.forEach(element => {
        if (!element.hidden && element.textContent.trim()) animate(element, [{ opacity: .45, translate: '0 5px' }, { opacity: 1, translate: '0 0' }], { duration: 220 });
      });
    });
    document.querySelectorAll(feedback).forEach(element => feedbackObserver.observe(element, { childList: true, characterData: true, subtree: true }));
    // Filtered items re-enter without delaying the filter itself.
    const filterObserver = new MutationObserver(records => {
      records.forEach(record => {
        const element = record.target;
        if (!element.hidden) {
          if (element.hasAttribute('data-motion')) show(element);
          animate(element, [{ opacity: .25, translate: '0 8px' }, { opacity: 1, translate: '0 0' }], { duration: 280 });
        }
      });
    });
    document.querySelectorAll('.project,.menu-card').forEach(element => filterObserver.observe(element, { attributes: true, attributeFilter: ['hidden'] }));
    // New task cards keep their current layout (board/list), and animate once.
    const board = document.getElementById('board');
    if (board) new MutationObserver(records => {
      if (records.some(record => record.addedNodes.length)) {
        board.querySelectorAll('.task').forEach((task, i) => animate(task, [{ opacity: .45, translate: '0 6px' }, { opacity: 1, translate: '0 0' }], { duration: 220, delay: Math.min(i, 3) * 25 }));
      }
    }).observe(board, { childList: true });
    // Smooth cover changes without changing a case-study image's dimensions.
    const cover = document.querySelector('.forma .hero-image img');
    cover?.addEventListener('load', () => animate(cover, [{ opacity: .5 }, { opacity: 1 }], { duration: 360 }));
    // Native details work without JS; only the revealed copy is enhanced.
    document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', () => {
      if (detail.open) animate(detail.querySelector('p'), [{ opacity: .25, translate: '0 -4px' }, { opacity: 1, translate: '0 0' }], { duration: 200 });
    }));
    // Change of product view / time of day: soft entry, no blocking interaction.
    document.querySelectorAll('[data-day],[data-view]').forEach(button => button.addEventListener('click', () => {
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      animate(panel, [{ opacity: .5, translate: '0 5px' }, { opacity: 1, translate: '0 0' }], { duration: 220 });
    }));
  } catch (error) {
    // A motion enhancement must never make the page inaccessible.
    root.classList.remove('motion-ready');
    observer?.disconnect();
  }
  preference.addEventListener('change', () => {
    if (reduced()) {
      observer?.disconnect();
      root.classList.remove('motion-ready');
      running.forEach(animation => animation.cancel());
      document.querySelectorAll('[data-motion]').forEach(element => element.classList.add('is-visible'));
    }
  });
  addEventListener('pageshow', event => {
    if (event.persisted) document.querySelectorAll('[data-motion]').forEach(show);
  });
})();
