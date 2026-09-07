(() => {
  'use strict';
  const dialog = document.querySelector('.zup-checkout');
  const frame = dialog?.querySelector('iframe');
  let opener;
  document.querySelectorAll('[data-checkout]').forEach(link => link.addEventListener('click', event => {
    if (!dialog || event.ctrlKey || event.metaKey || event.shiftKey || typeof dialog.showModal !== 'function') return;
    event.preventDefault(); opener = link; frame.src = link.href; dialog.showModal(); document.body.classList.add('zup-modal-open');
    dialog.querySelector('[data-close]').focus();
  }));
  dialog?.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('close', () => { frame.removeAttribute('src'); document.body.classList.remove('zup-modal-open'); opener?.focus(); });
  const items = [...document.querySelectorAll('#faq details')];
  if (items.length) {
    const schema = document.createElement('script'); schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:items.map(x => ({'@type':'Question',name:x.querySelector('summary').textContent,acceptedAnswer:{'@type':'Answer',text:x.querySelector('p').textContent}}))});
    document.head.appendChild(schema);
  }
})();
