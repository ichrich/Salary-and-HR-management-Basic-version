(() => {
  'use strict';
  const config = window.ZUP_BASIC;
  if (!config) return;
  document.querySelectorAll('[data-route]').forEach(link => {
    const route = config.routes[link.dataset.route];
    if (route) link.href = route;
  });
  document.querySelectorAll('[data-price]').forEach(node => {
    node.textContent = new Intl.NumberFormat('ru-RU').format(config.prices[node.dataset.price]) + ' ₽';
  });

  // Reuse the live site's basket; do not create a second invoice backend.
  const dialog = document.getElementById('zup-checkout');
  const frame = document.getElementById('zup-checkout-frame');
  let opener;
  document.querySelectorAll('[data-checkout]').forEach(link => {
    link.href = config.checkout;
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || typeof dialog.showModal !== 'function') return;
      event.preventDefault();
      opener = link;
      frame.src = config.checkout;
      dialog.showModal();
      document.body.classList.add('zup-modal-open');
      dialog.querySelector('[data-close]').focus();
    });
  });
  document.getElementById('zup-checkout-fallback').href = config.checkout;
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    frame.removeAttribute('src');
    document.body.classList.remove('zup-modal-open');
    opener?.focus();
  });

  // The data matches the visible FAQ; no invisible SEO-only questions.
  const schema = document.createElement('script');
  schema.type = 'application/ld+json';
  schema.textContent = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [...document.querySelectorAll('#faq details')].map(item => ({
      '@type': 'Question', name: item.querySelector('summary').textContent,
      acceptedAnswer: { '@type': 'Answer', text: item.querySelector('p').textContent }
    }))
  });
  document.head.appendChild(schema);
})();
