(() => {
  'use strict';

  const clip = (text, size = 92) => {
    const clean = (text || '').replace(/\s+/g, ' ').trim();
    return clean.length > size ? clean.slice(0, size).replace(/\s+\S*$/, '') + '…' : clean;
  };

  function buildExplorer(items, anchor) {
    if (items.length < 2) return;
    const layout = document.createElement('div');
    layout.className = 'zup-content-layout';
    const nav = document.createElement('nav');
    nav.className = 'zup-content-nav';
    nav.setAttribute('aria-label', 'Содержание страницы');
    nav.setAttribute('role', 'tablist');
    nav.setAttribute('aria-orientation', 'vertical');
    const panels = document.createElement('div');
    const activators = [];
    panels.className = 'zup-content-panels';
    anchor.before(layout);
    layout.append(nav, panels);

    items.forEach((panel, index) => {
      const heading = panel.querySelector('h2');
      const title = panel.dataset.contentTitle || heading?.textContent.trim() || `Раздел ${index + 1}`;
      const preview = panel.dataset.contentPreview || clip(panel.querySelector('p')?.textContent);
      const panelId = panel.id || `content-panel-${index + 1}`;
      const tabId = `content-tab-${index + 1}`;
      panel.id = panelId;
      panel.classList.add('zup-content-panel');
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tabId);

      const tab = document.createElement('button');
      tab.type = 'button';
      tab.id = tabId;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', panelId);
      tab.textContent = title;
      nav.append(tab);

      const accordion = document.createElement('button');
      accordion.type = 'button';
      accordion.className = 'zup-accordion-trigger';
      accordion.setAttribute('aria-controls', panelId);
      accordion.innerHTML = `<span>${title}${preview ? `<small>${preview}</small>` : ''}</span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>`;
      panel.prepend(accordion);
      panels.append(panel);

      const activate = () => {
        items.forEach((other, otherIndex) => {
          const active = otherIndex === index;
          other.classList.toggle('is-active', active);
          other.querySelector('.zup-accordion-trigger')?.setAttribute('aria-expanded', String(active));
          nav.children[otherIndex].setAttribute('aria-selected', String(active));
          nav.children[otherIndex].tabIndex = active ? 0 : -1;
        });
      };
      activators[index] = activate;
      tab.addEventListener('click', activate);
      accordion.addEventListener('click', () => {
        if (!panel.classList.contains('is-active')) activate();
      });
      tab.addEventListener('keydown', event => {
        if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const last = items.length - 1;
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? last : (index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
        nav.children[next].click();
        nav.children[next].focus();
      });
    });
    items[0].classList.add('is-active');
    items.forEach((panel, index) => {
      panel.querySelector('.zup-accordion-trigger')?.setAttribute('aria-expanded', String(index === 0));
      nav.children[index].setAttribute('aria-selected', String(index === 0));
      nav.children[index].tabIndex = index === 0 ? 0 : -1;
      document.querySelectorAll(`a[href="#${panel.id}"]`).forEach(link => link.addEventListener('click', activators[index]));
    });
    const hashIndex = items.findIndex(panel => `#${panel.id}` === window.location.hash);
    if (hashIndex > 0) activators[hashIndex]();
  }

  document.querySelectorAll('main[data-content-sections]').forEach(main => {
    const items = [...main.children].filter(node => node.matches?.('.zup-section:not(.zup-final)'));
    if (items.length) buildExplorer(items, items[0]);
  });

  document.querySelectorAll('[data-long-content]').forEach(content => {
    const nodes = [...content.children];
    const firstHeading = nodes.find(node => node.tagName === 'H2');
    if (!firstHeading) return;
    const marker = document.createElement('span');
    marker.hidden = true;
    firstHeading.before(marker);
    const groups = [];
    let panel;
    nodes.forEach(node => {
      if (node.tagName === 'H2') {
        panel = document.createElement('section');
        panel.dataset.contentTitle = node.textContent.trim();
        groups.push(panel);
      }
      if (panel) panel.append(node);
    });
    if (groups.length > 1) {
      buildExplorer(groups, marker);
      marker.remove();
    }
  });

  const primaryBuy = document.querySelector('[data-checkout]') || document.querySelector('[data-primary-buy]');
  const demoUrl = document.body.dataset.demoUrl || 'https://hrm.demo.1c.ru/corp/ru_RU/';

  const cart = document.createElement('a');
  cart.className = 'zup-float-action zup-float-cart';
  cart.href = primaryBuy?.href || '#order';
  cart.setAttribute('aria-label', 'Перейти к покупке');
  cart.innerHTML = '<svg aria-hidden="true" viewBox="0 0 32 32"><path d="M3 5h4l3 15h14l4-11H9M12 26a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0Zm14 0a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0Z"/></svg>';
  const phone = document.createElement('a');
  phone.className = 'zup-float-action zup-float-phone';
  phone.href = 'tel:88005556277';
  phone.setAttribute('aria-label', 'Позвонить 8 800 555-62-77');
  phone.innerHTML = '<svg aria-hidden="true" viewBox="0 0 32 32"><path d="M8 4 4 7c0 10 11 21 21 21l3-4-6-5-3 3c-4-2-7-5-9-9l3-3Z"/></svg>';
  document.body.append(cart, phone);

  const demo = document.createElement('dialog');
  demo.className = 'zup-demo-dialog';
  demo.setAttribute('aria-labelledby', 'demo-title');
  const closeIcon = '<svg class="zup-close-icon fa-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M5 5l14 14M19 5 5 19"/></svg>';
  demo.innerHTML = '<div class="zup-dialog-head"><h2 id="demo-title">Демо 1С:ЗУП</h2><button class="zup-demo-close-top" type="button" data-demo-close aria-label="Закрыть демо">' + closeIcon + '</button></div><p class="zup-demo-note">Выберите пользователя из списка. Пароль для демонстрационной базы не требуется.</p><iframe title="Демонстрационная база 1С:ЗУП" allow="clipboard-read; clipboard-write"></iframe><div class="zup-demo-footer"><button class="zup-demo-close-bottom" type="button" data-demo-close>' + closeIcon + '<span>Закрыть</span></button></div>';
  document.body.append(demo);
  const demoFrame = demo.querySelector('iframe');
  let demoOpener;
  const openDemo = source => {
    demoOpener = source;
    demoFrame.src = demoUrl;
    if (typeof demo.showModal === 'function') demo.showModal();
    else window.location.href = demoUrl;
    document.body.classList.add('zup-modal-open');
  };
  document.querySelectorAll('[data-demo]').forEach(button => button.addEventListener('click', event => {
    event.preventDefault();
    openDemo(event.currentTarget);
  }));
  demo.querySelectorAll('[data-demo-close]').forEach(button => button.addEventListener('click', () => demo.close()));
  demo.addEventListener('close', () => {
    demoFrame.removeAttribute('src');
    document.body.classList.remove('zup-modal-open');
    demoOpener?.focus();
  });
  cart.addEventListener('click', event => {
    if (!primaryBuy) return;
    event.preventDefault();
    primaryBuy.click();
  });
})();
