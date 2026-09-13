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
})();
