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

// Existing SSI mobile sidebar hooks, made safe when previewed without includes.
function w3_open() {
  const menu = document.getElementById('mySidebar');
  if (!menu) return;
  menu.style.right = '0';
  menu.style.display = 'block';
  const veil = document.getElementById('Veil');
  veil.hidden = false;
  veil.style.display = 'block';
  document.getElementById('zup-menu-toggle')?.setAttribute('aria-expanded', 'true');
  menu.querySelector('button')?.focus();
}
function w3_close() {
  const menu = document.getElementById('mySidebar');
  if (menu) { menu.style.right = '-600px'; menu.style.display = 'none'; }
  const veil = document.getElementById('Veil');
  if (veil) { veil.hidden = true; veil.style.display = 'none'; }
  document.getElementById('zup-menu-toggle')?.setAttribute('aria-expanded', 'false');
  document.getElementById('zup-menu-toggle')?.focus();
}
function filterContent(input) {
  const query = input.value.trim().toLocaleLowerCase('ru');
  document.querySelectorAll('#mySidebar .msg a').forEach(link => {
    link.style.display = link.textContent.toLocaleLowerCase('ru').includes(query) ? '' : 'none';
  });
}
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && document.getElementById('zup-menu-toggle')?.getAttribute('aria-expanded') === 'true') w3_close();
});
