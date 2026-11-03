// ReadyTeam "create your first project" guide.
// Run once in the ReadyTeam tab. It highlights each control and moves on by
// itself as the user clicks and types; no screenshots are needed.
// Check progress afterwards with: window.__rtGuide.status()
(() => {
  if (window.__rtGuide && window.__rtGuide.stop) window.__rtGuide.stop();

  const Z = 2147483000;
  const ORANGE = '#ff7a00';

  const clean = (t) => (t || '').replace(/\*/g, '').replace(/\s+/g, ' ').trim();
  const visible = (el) => {
    if (!el || !el.getBoundingClientRect) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return false;
    const s = getComputedStyle(el);
    return s.visibility !== 'hidden' && s.display !== 'none' && s.opacity !== '0';
  };

  // The Create New Project dialog, if it is open.
  const dialog = () =>
    [...document.querySelectorAll('mat-dialog-container, [role=dialog], .modal.show, .cdk-overlay-pane')]
      .filter(visible)
      .find((d) => /create new project/i.test(d.innerText)) || null;
  const scope = () => dialog() || document;

  const FIELD_SEL =
    'input:not([type=hidden]):not([type=checkbox]):not([type=radio]), textarea, select, mat-select, [role=combobox], ng-select';

  function findButton(re, root) {
    const els = [...(root || document).querySelectorAll(
      'button, a, [role=button], [mat-button], [mat-raised-button], [mat-flat-button], .btn'
    )].filter(visible);
    const hits = els.filter((e) => re.test(clean(e.innerText || e.getAttribute('aria-label'))));
    hits.sort((a, b) => clean(a.innerText).length - clean(b.innerText).length);
    return hits[0] || null;
  }

  // Find a form field by its placeholder, aria-label, form control name or label text.
  function findField(re, root) {
    root = root || document;
    const box = (i) => i.closest('mat-form-field') || i;
    for (const i of [...root.querySelectorAll(FIELD_SEL)].filter(visible)) {
      const t = [i.placeholder, i.getAttribute('aria-label'), i.getAttribute('formcontrolname'),
        i.getAttribute('data-placeholder'), i.name, i.id].map(clean).join(' | ');
      if (re.test(t)) return box(i);
    }
    const labels = [...root.querySelectorAll('label, mat-label, span, div, p, h4, h5, h6')]
      .filter((e) => visible(e) && clean(e.innerText).length < 40 && re.test(clean(e.innerText)));
    for (const l of labels) {
      if (l.htmlFor) {
        const i = document.getElementById(l.htmlFor);
        if (visible(i)) return box(i);
      }
      let p = l;
      for (let k = 0; k < 4 && p; k++) {
        const i = [...p.querySelectorAll(FIELD_SEL)].find(visible);
        if (i) return box(i);
        p = p.parentElement;
      }
    }
    return null;
  }

  const steps = [
    { find: () => findButton(/add project$/i),
      text: 'Click <b>+ Add Project</b> to start a new project.' },
    { find: () => findField(/project ?name/i, scope()),
      text: 'Type the <b>Project Name</b>.', next: true },
    { find: () => findField(/prefix/i, scope()),
      text: 'Type a short <b>Document Prefix</b>, for example the project initials. Up to 20 letters, no spaces, and different from your other projects.', next: true },
    { find: () => findField(/address/i, scope()),
      text: 'Type the <b>Home Address</b> of the job. If a list of addresses appears, pick the right one.', next: true },
    { find: () => findField(/client/i, scope()),
      text: 'Optional: choose the <b>Client</b> for this project, or click Next to skip.', next: true },
    { find: () => findButton(/^create project$/i, scope()),
      text: 'Click <b>Create Project</b>.' },
  ];

  // Overlay elements.
  const style = document.createElement('style');
  style.textContent =
    '@keyframes rtGuidePulse{0%,100%{outline-color:' + ORANGE + '}50%{outline-color:#ffc38a}}' +
    '#rt-guide-tip button{font:inherit;border-radius:6px;padding:6px 12px;cursor:pointer}';
  const spot = document.createElement('div');
  Object.assign(spot.style, {
    position: 'fixed', zIndex: Z, pointerEvents: 'none', borderRadius: '8px',
    boxShadow: '0 0 0 9999px rgba(0,0,0,0.35)', outline: '3px solid ' + ORANGE, outlineOffset: '2px',
    animation: 'rtGuidePulse 1.4s ease-in-out infinite', transition: 'all .15s ease', display: 'none',
  });
  const tip = document.createElement('div');
  tip.id = 'rt-guide-tip';
  Object.assign(tip.style, {
    position: 'fixed', zIndex: Z + 1, maxWidth: '320px', background: '#fff', color: '#1f2328',
    borderRadius: '10px', padding: '12px 14px', boxShadow: '0 8px 24px rgba(0,0,0,.25)',
    font: '14px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif', borderTop: '4px solid ' + ORANGE,
  });
  document.body.append(style, spot, tip);

  let step = 0;
  let finished = false;
  let missingSince = 0;
  let dialogSeen = false;
  let urlAtOpen = '';
  let closedSince = 0;
  let shownKey = '';

  function render(html, buttons) {
    const key = html + '|' + buttons.map((b) => b.label).join(',');
    if (key === shownKey) return;
    shownKey = key;
    tip.innerHTML = html + '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:10px"></div>';
    const row = tip.lastChild;
    for (const b of buttons) {
      const el = document.createElement('button');
      el.textContent = b.label;
      Object.assign(el.style, b.primary
        ? { background: ORANGE, color: '#fff', border: '1px solid ' + ORANGE }
        : { background: '#fff', color: '#1f2328', border: '1px solid #d0d7de' });
      el.onclick = (e) => { e.preventDefault(); e.stopPropagation(); b.onClick(); };
      row.append(el);
    }
  }

  function place(target) {
    const t = tip.getBoundingClientRect();
    const vw = innerWidth, vh = innerHeight, gap = 12;
    let top, left;
    if (target) {
      const r = target.getBoundingClientRect();
      top = r.bottom + gap + t.height < vh ? r.bottom + gap : r.top - gap - t.height;
      if (top < gap) top = Math.min(vh - t.height - gap, r.bottom + gap);
      left = r.left;
    } else {
      top = 24;
      left = (vw - t.width) / 2;
    }
    tip.style.top = Math.max(gap, top) + 'px';
    tip.style.left = Math.max(gap, Math.min(left, vw - t.width - gap)) + 'px';
  }

  function go(n) {
    step = n;
    missingSince = 0;
    shownKey = '';
  }

  function finish() {
    finished = true;
    spot.style.display = 'none';
    render('<b>Done.</b> Your project is created. You can now open it and add the estimate, schedule and team.',
      [{ label: 'Close', primary: true, onClick: stop }]);
    place(null);
    setTimeout(stop, 15000);
  }

  function tick() {
    if (finished) return;
    const d = dialog();

    // Track the dialog: open moves past step 1, closing either finishes or restarts.
    if (d && !dialogSeen) {
      dialogSeen = true;
      urlAtOpen = location.href;
      closedSince = 0;
      if (step === 0) go(1);
    }
    if (!d && dialogSeen) {
      closedSince = closedSince || Date.now();
      if (location.href !== urlAtOpen || step === steps.length - 1) {
        if (Date.now() - closedSince > 600) return finish();
      } else if (Date.now() - closedSince > 1200) {
        dialogSeen = false;
        go(0);
      }
    } else {
      closedSince = 0;
    }

    const s = steps[step];
    const target = s.find();
    const head = '<div style="font-size:12px;color:#57606a;margin-bottom:4px">Step ' + (step + 1) + ' of ' + steps.length + '</div>';
    const buttons = [];
    if (s.next) buttons.push({ label: 'Next', primary: true, onClick: () => go(Math.min(step + 1, steps.length - 1)) });
    buttons.push({ label: 'Close guide', onClick: stop });

    if (target) {
      missingSince = 0;
      const r = target.getBoundingClientRect();
      Object.assign(spot.style, {
        display: 'block', top: r.top - 4 + 'px', left: r.left - 4 + 'px',
        width: r.width + 8 + 'px', height: r.height + 8 + 'px',
      });
      if (r.top < 0 || r.bottom > innerHeight) target.scrollIntoView({ block: 'center', behavior: 'smooth' });
      render(head + s.text, buttons);
      place(target);
    } else {
      missingSince = missingSince || Date.now();
      spot.style.display = 'none';
      const lost = Date.now() - missingSince > 2500;
      render(head + s.text + (lost ? '<div style="margin-top:6px;color:#57606a">I can\'t point to it right now. Look for it on the screen and follow this tip.</div>' : ''), buttons);
      place(null);
    }
  }

  const onKey = (e) => { if (e.key === 'Escape') stop(); };
  const timer = setInterval(tick, 150);
  addEventListener('keydown', onKey, true);

  function stop() {
    clearInterval(timer);
    removeEventListener('keydown', onKey, true);
    style.remove(); spot.remove(); tip.remove();
    if (!finished) window.__rtGuide.closedByUser = true;
  }

  window.__rtGuide = {
    stop,
    closedByUser: false,
    status: () => ({ step: step + 1, total: steps.length, finished, closedByUser: window.__rtGuide.closedByUser, url: location.href }),
  };
  tick();
  return 'ReadyTeam guide started: ' + (steps[0].find() ? 'Add Project button found' : 'Add Project button not found yet');
})();
