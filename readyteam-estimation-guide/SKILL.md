---
name: readyteam-estimation-guide
description: Show the user how to start the estimate for a ReadyTeam project with an on-screen guide in their Chrome tab - open the project's Cost Assistant and choose Copy from project (pick a project in the popup), Import from Excel, or Import from data setup. The user does the clicking; the guide moves on by itself. Use after a project has been created (for example right after readyteam-create-project-guide or in onboarding), or when the user asks how to start, copy or import an estimate for a project.
---

# ReadyTeam: guide the user to start a project's estimate

The user starts the estimate themselves. You ask which way they want to start it, then put a guide on their ReadyTeam page. The guide is one script (in the "Guide script" section at the end of this skill) that highlights each control and moves on by itself as the user clicks. **Do not take screenshots step by step and do not click for the user.**

Where it lives: open the project, then **Estimations > Cost Assistant**. A new project's Cost Assistant shows **Quick Start** with these options:

- **Copy from project** (most used): copies the estimate of another project. A popup opens: choose the **Project**, tick what to copy (Plans, Takeoff Group, Takeoff Measurements, Quantities, Estimate Category Statuses, Specifications), click **Continue**.
- **Import from Excel**: opens the importer. **Upload file** (or drag the file in) or **Manually enter data**, check the rows, then **Import Data** at the top right.
- **Import from data setup**: a popup lists the company's own Cost Assistant items (the ones imported during onboarding). Tick the groups or items to add, click **Add**.

(Quick Start also has Create a blank estimate and the ReadyTeam templates. Mention them only if the user asks for something else.)

## Steps

1. Load the Claude in Chrome tools in one ToolSearch call if they are deferred, including `javascript_tool`. Use the ReadyTeam tab that is already open (for example from the create-project guide). If a login page shows, ask the user to sign in and reply "done".
2. Make sure the tab shows the project (its page with the **Estimations** section) or that project's Cost Assistant. If it is on another page, ask the user which project, or open the project they just created. No popup should be open.
3. Ask the user, in plain words, one question:
   "How would you like to start this project's estimate?
   1. **Copy from another project**: reuse an estimate you already have in ReadyTeam.
   2. **Import from Excel**: upload your estimate spreadsheet.
   3. **Import from data setup**: pick items from your company's Cost Assistant list."
   Wait for the answer.
4. Run the full text of the guide script below, unchanged, in that tab with `javascript_tool`, then run `window.__rtEstGuide.choose('copy')` (or `'excel'` or `'datasetup'`, matching their answer). The guide highlights that option; if the user clicks a different one, it follows them.
5. Tell the user in two or three plain lines, without waiting for anything else:
   "I've put a guide on your ReadyTeam screen. Follow the orange highlight: it shows you where to click, one step at a time. Tell me when your estimate is in, or if you get stuck."
   For Excel, add: "When the importer opens, upload your file there and click Import Data at the top right. Or attach the file here and I can do the import for you."
6. Wait for the user. Do not poll or take screenshots while they work.
7. When they reply, run `window.__rtEstGuide && window.__rtEstGuide.status()` once with `javascript_tool`:
   - `finished: true`: take one screenshot to confirm the estimate is showing in Cost Assistant, and tell the user in a line what came in (for example "Your estimate was copied from P1004").
   - `unsure: true`: the popup or importer closed after Continue / Add / Import, but the page did not change as expected. Take one screenshot, tell the user what you see, and help from there.
   - not finished: ask what they see, or take one screenshot, and explain the next step in plain words. Run the script again if they want the guide back (it restarts cleanly).

## If the user wants you to do it

Only when the user asks:

- **Import from Excel** with a file attached here: follow Part 2 of `readyteam-estimation` (read it from `https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-estimation/SKILL.md` if it is not installed), starting at Import from Excel in this project's Cost Assistant. Ask before clicking Import Data.
- **Copy from project** or **Import from data setup**: open the popup, make the choices the user gave you, show them what you picked, and click Continue / Add only after they say yes.

## If the script can't run

If `javascript_tool` is not available or is refused, do not keep retrying. Give the user the steps for their chosen option as a short numbered list in plain words (open the project, Cost Assistant, then the option's steps from the list above), and ask them to tell you when the estimate is in.

## Rules

- Never pick the project, tick boxes, upload, or click Continue / Add / Import Data for the user, unless they ask you to.
- Do not change anything else in ReadyTeam.
- Starting an estimate twice adds the items twice. If Cost Assistant already shows an estimate (no Quick Start), tell the user and ask before adding more.
- The guide closes with the Close guide button or Escape, and removes itself 15 seconds after the estimate is in.

## Status

Tested live on a project (Nov 2026), up to but not including the final click: from the project page the guide points at Estimations > Cost Assistant; on Quick Start it points at the chosen option; it follows the user into each option (Copy From Project popup: Project dropdown, then the copy checkboxes, then Continue; data setup popup: item list, then Add; Excel importer: a tip in the bottom-left corner, since the importer is an embedded Flatfile window the guide cannot point inside); Cancel, Close or closing the importer goes back to the choice. Popup selectors: `lib-cost-assistant-project-copy` and `lib-template-map-dialogue` (their boxes are `display: contents`, so the guide checks the surrounding `mat-dialog-container`), `iframe#flatfile_iframe` for the importer.

**Not yet seen:** what Cost Assistant shows after Continue / Add / Import Data. The guide treats "Quick Start is gone" as done and points at **Continue Estimate** if that button turns on. On the first real run, note what happens after each option and update the guide script if needed. `window.__rtEstGuide.check()` lists which controls the guide can see on the current screen.

## Guide script

```js
// ReadyTeam "start your estimate" guide.
// Run once in the ReadyTeam tab, then call window.__rtEstGuide.choose('copy' | 'excel' | 'datasetup').
// It highlights each control and moves on by itself as the user clicks.
// Check progress afterwards with: window.__rtEstGuide.status()
(() => {
  if (window.__rtEstGuide && window.__rtEstGuide.stop) window.__rtEstGuide.stop();

  const Z = 2147483000;
  const ORANGE = '#ff7a00';
  const CARD = { copy: /^copy from project$/i, excel: /^import from excel$/i, datasetup: /^import from data setup$/i };
  const NAME = { copy: 'Copy from project', excel: 'Import from Excel', datasetup: 'Import from data setup' };

  const clean = (t) => (t || '').replace(/\*/g, '').replace(/\s+/g, ' ').trim();
  const visible = (el) => {
    if (!el || !el.getBoundingClientRect) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return false;
    const s = getComputedStyle(el);
    return s.visibility !== 'hidden' && s.display !== 'none';
  };
  const leaf = (re, root, minTop) => [...(root || document).querySelectorAll('p, span, div, h1, h2, h3, h4, h5, a, button')]
    .find((e) => visible(e) && re.test(clean(e.innerText)) && ![...e.children].some((c) => re.test(clean(c.innerText))) &&
      (minTop === undefined || e.getBoundingClientRect().top >= minTop));

  // What is on screen.
  // The popup components have no box of their own (display: contents), so check their dialog container.
  const inOpenDialog = (sel) => [...document.querySelectorAll(sel)]
    .find((h) => visible(h.closest('mat-dialog-container') || h)) || null;
  const copyDialog = () => inOpenDialog('lib-cost-assistant-project-copy');
  const setupDialog = () => inOpenDialog('lib-template-map-dialogue');
  const importer = () => [...document.querySelectorAll('iframe#flatfile_iframe, iframe[src*="flatfile"]')].find(visible) || null;
  const quickStart = () => !!leaf(/^quick start$/i) && !!leaf(CARD.copy);

  function findButton(re, root) {
    const els = [...(root || document).querySelectorAll('button, a, [role=button], .btn')].filter(visible);
    const hits = els.filter((e) => re.test(clean(e.innerText || e.getAttribute('aria-label'))));
    hits.sort((a, b) => clean(a.innerText).length - clean(b.innerText).length);
    return hits[0] || null;
  }

  // The project page's Estimations > Cost Assistant card (not the small link in the top bar).
  function findCostAssistantCard() {
    const t = leaf(/^cost assistant$/i, document, 120);
    if (!t) return null;
    let el = t;
    for (let k = 0; k < 5 && el.parentElement; k++) {
      const r = el.getBoundingClientRect();
      if (r.width > 250 && r.height > 40) return el;
      el = el.parentElement;
    }
    return t;
  }

  function findCard(key) {
    const t = leaf(CARD[key]);
    return t ? (t.closest('.group, [class*=rounded-lg]') || t) : null;
  }

  function findChoices() {
    const cards = Object.keys(CARD).map(findCard).filter(Boolean);
    if (!cards.length) return null;
    return cards[0].closest('.grid, [class*=grid]') || cards[0].parentElement.parentElement;
  }

  // The box around all the checkboxes in a popup.
  function checkboxList(d) {
    const l = d ? [...d.querySelectorAll('label')].filter(visible) : [];
    if (!l.length) return null;
    let box = l[0].parentElement;
    while (box && !box.contains(l[l.length - 1])) box = box.parentElement;
    return box;
  }

  const continueEstimate = () => {
    const b = findButton(/^continue estimate$/i);
    return b && !b.disabled && !/pointer-events-none|disabled/.test(b.className) ? b : null;
  };

  // Steps: each has an id, a finder and a text.
  const S = {
    open: { find: findCostAssistantCard,
      text: () => 'Click <b>Cost Assistant</b> under Estimations to start this project\'s estimate.' },
    choose: { find: () => (choice ? findCard(choice) : findChoices()), light: () => !choice,
      text: () => choice === 'excel' && Date.now() - excelClickedAt < 20000
        ? 'Opening the Excel importer. This can take a few seconds...'
        : choice
        ? 'Click <b>' + NAME[choice] + '</b>.'
        : 'Choose how to start the estimate: <b>Copy from project</b>, <b>Import from Excel</b> or <b>Import from data setup</b>.' },
    copyProject: { find: () => { const d = copyDialog(); return d && (d.querySelector('ng-select') || null); }, light: () => true, beside: copyDialog,
      text: () => 'Choose the <b>Project</b> whose estimate you want to copy. You can type to search.' },
    copyWhat: { find: () => checkboxList(copyDialog()), next: true, beside: copyDialog,
      text: () => 'Tick what to copy. The usual picks are already ticked: Takeoff Group, Quantities, Estimate Category Statuses and Specifications. Tick <b>Plans</b> or <b>Takeoff Measurements</b> too if you want those.' },
    copyGo: { find: () => findButton(/^continue$/i, copyDialog()),
      text: () => 'Click <b>Continue</b> to copy the estimate.' },
    setupPick: { find: () => { const d = setupDialog(); return d && (d.querySelector('ag-grid-angular, [role=grid], [role=treegrid]') || null); }, next: true, light: () => true,
      text: () => 'Tick the groups or items you want in this estimate. Tick the box at the top to take everything. Use the arrows to open a group.' },
    setupGo: { find: () => findButton(/^add$/i, setupDialog()),
      text: () => 'Click <b>Add</b> to put them in the estimate.' },
    excel: { find: () => null, corner: true,
      text: () => 'In the importer: click <b>Upload file</b> (or drag your Excel file in), check the rows, fix any marked red, then click <b>Import Data</b> at the top right.' },
    continueEst: { find: continueEstimate,
      text: () => 'Click <b>Continue Estimate</b>.' },
    wait: { find: () => null,
      text: () => 'Loading your estimate...' },
  };
  const ORDER = {
    copy: ['open', 'choose', 'copyProject', 'copyWhat', 'copyGo'],
    datasetup: ['open', 'choose', 'setupPick', 'setupGo'],
    excel: ['open', 'choose', 'excel'],
  };

  // Overlay elements.
  const style = document.createElement('style');
  style.textContent =
    '@keyframes rtEstPulse{0%,100%{outline-color:' + ORANGE + '}50%{outline-color:#ffc38a}}' +
    '#rt-est-tip button{font:inherit;border-radius:6px;padding:6px 12px;cursor:pointer}';
  const spot = document.createElement('div');
  Object.assign(spot.style, {
    position: 'fixed', zIndex: Z, pointerEvents: 'none', borderRadius: '8px',
    boxShadow: '0 0 0 9999px rgba(0,0,0,0.35)', outline: '3px solid ' + ORANGE, outlineOffset: '2px',
    animation: 'rtEstPulse 1.4s ease-in-out infinite', transition: 'all .15s ease', display: 'none',
  });
  const tip = document.createElement('div');
  tip.id = 'rt-est-tip';
  Object.assign(tip.style, {
    position: 'fixed', zIndex: Z + 1, maxWidth: '330px', background: '#fff', color: '#1f2328',
    borderRadius: '10px', padding: '12px 14px', boxShadow: '0 8px 24px rgba(0,0,0,.25)',
    font: '14px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif', borderTop: '4px solid ' + ORANGE,
  });
  document.body.append(style, spot, tip);

  let choice = null;        // what the user picked: copy | excel | datasetup
  let step = 'open';
  let finished = false;
  let unsure = false;
  let confirmedAt = 0;      // Continue / Add clicked, or the importer closed
  let closedImporter = false;
  let wasOpen = null;       // which popup was open last tick
  let missingSince = 0;
  let shownKey = '';
  let lastButton = '';
  let excelClickedAt = 0;

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

  function place(target, corner, beside) {
    const t = tip.getBoundingClientRect();
    const vw = innerWidth, vh = innerHeight, gap = 12;
    let top, left;
    if (target && beside) {  // next to the popup, so the tip never covers it or its dropdown
      const b = (beside.closest('mat-dialog-container') || beside).getBoundingClientRect();
      const r = target.getBoundingClientRect();
      top = Math.max(gap, Math.min(r.top, vh - t.height - gap));
      if (b.left - gap - t.width >= gap) left = b.left - gap - t.width;
      else if (b.right + gap + t.width <= vw - gap) left = b.right + gap;
      else return place(target);
      tip.style.top = top + 'px';
      tip.style.left = left + 'px';
      return;
    }
    if (corner) {  // over the importer: bottom left, out of the way of its buttons
      tip.style.top = vh - t.height - 56 + 'px';
      tip.style.left = '24px';
      return;
    }
    if (target) {
      const r = target.getBoundingClientRect();
      top = r.bottom + gap + t.height < vh ? r.bottom + gap : r.top - gap - t.height;
      if (top < gap) {
        top = Math.max(gap, Math.min(r.top, vh - t.height - gap));
        left = r.left - gap - t.width >= gap ? r.left - gap - t.width : r.right + gap;
      } else {
        left = r.left;
      }
    } else {
      top = 24;
      left = (vw - t.width) / 2;
    }
    tip.style.top = Math.max(gap, top) + 'px';
    tip.style.left = Math.max(gap, Math.min(left, vw - t.width - gap)) + 'px';
  }

  function go(id) {
    if (step === id) return;
    step = id;
    missingSince = 0;
    shownKey = '';
  }

  function finish(sure) {
    finished = true;
    unsure = !sure;
    spot.style.display = 'none';
    render(sure
      ? '<b>Done.</b> Your estimate is in Cost Assistant. You can now review the items, quantities and prices.'
      : '<b>Nearly there.</b> If your estimate isn\'t showing yet, tell Claude what you see.',
      [{ label: 'Close', primary: true, onClick: stop }]);
    place(null);
    setTimeout(stop, 15000);
  }

  // Remember which dialog button was clicked last (Continue / Add vs Cancel / Close).
  const onClick = (e) => {
    const b = e.target.closest && e.target.closest('button, .btn, [role=button]');
    if (!b) return;
    const t = clean(b.innerText);
    if (/^(continue|add)$/i.test(t) && b.closest('mat-dialog-container')) { lastButton = 'confirm'; confirmedAt = Date.now(); }
    else if (/^(cancel|close)$/i.test(t) && b.closest('mat-dialog-container')) lastButton = 'cancel';
    // A click on a Quick Start card sets the path the user really took.
    for (const k of Object.keys(CARD)) {
      const c = findCard(k);
      if (c && c.contains(e.target)) { choice = k; if (k === 'excel') excelClickedAt = Date.now(); }
    }
  };

  function tick() {
    if (finished) return;
    const open = copyDialog() ? 'copy' : setupDialog() ? 'datasetup' : importer() ? 'excel' : null;

    if (open) {
      choice = open;
      if (open === 'copy') {
        const sel = copyDialog().querySelector('ng-select');
        const picked = sel && sel.querySelector('.ng-value');
        if (!['copyProject', 'copyWhat', 'copyGo'].includes(step)) go('copyProject');
        if (step === 'copyProject' && picked) go('copyWhat');
      } else if (open === 'datasetup') {
        if (!['setupPick', 'setupGo'].includes(step)) go('setupPick');
      } else {
        go('excel');
      }
    } else if (wasOpen) {
      // A popup or the importer just closed.
      if (wasOpen === 'excel') { confirmedAt = Date.now(); closedImporter = true; }
      else if (lastButton !== 'confirm') confirmedAt = 0;
      lastButton = '';
      if (confirmedAt) go('wait');
    }
    wasOpen = open;

    if (!open) {
      if (confirmedAt) {
        const waited = Date.now() - confirmedAt;
        if (continueEstimate()) go('continueEst');
        else if (!quickStart()) { if (waited > 800) return finish(true); }
        else if (closedImporter && waited > 3000) {
          // Importer closed but Quick Start is still there: nothing imported, back to the choice.
          confirmedAt = 0; closedImporter = false; go('choose');
        } else if (!closedImporter && waited > 10000) return finish(false);
      } else {
        go(quickStart() ? 'choose' : 'open');
      }
    }

    const s = S[step];
    const list = ORDER[choice || 'copy'];
    const n = list.indexOf(step);
    const head = n >= 0
      ? '<div style="font-size:12px;color:#57606a;margin-bottom:4px">Step ' + (n + 1) + ' of ' + list.length + (choice ? ' · ' + NAME[choice] : '') + '</div>'
      : '';
    const buttons = [];
    if (s.next) {
      const nextId = list[n + 1];
      buttons.push({ label: 'Next', primary: true, onClick: () => nextId && go(nextId) });
    }
    buttons.push({ label: 'Close guide', onClick: stop });

    const target = s.find();
    if (target) {
      missingSince = 0;
      const r = target.getBoundingClientRect();
      Object.assign(spot.style, {
        display: 'block', top: r.top - 4 + 'px', left: r.left - 4 + 'px',
        width: r.width + 8 + 'px', height: r.height + 8 + 'px',
        // No dimming on lists and dropdowns, so they stay easy to read.
        boxShadow: s.light && s.light() ? 'none' : '0 0 0 9999px rgba(0,0,0,0.35)',
      });
      if (r.top < 0 || r.bottom > innerHeight) target.scrollIntoView({ block: 'center', behavior: 'smooth' });
      render(head + s.text(), buttons);
      place(target, false, s.beside && s.beside());
    } else {
      spot.style.display = 'none';
      if (s.corner) {
        render(head + s.text(), buttons);
        place(null, true);
        return;
      }
      missingSince = missingSince || Date.now();
      const lost = Date.now() - missingSince > 2500;
      render(head + s.text() + (lost ? '<div style="margin-top:6px;color:#57606a">I can\'t point to it right now. Look for it on the screen and follow this tip.</div>' : ''), buttons);
      place(null);
    }
  }

  const onKey = (e) => { if (e.key === 'Escape') stop(); };
  const timer = setInterval(tick, 150);
  addEventListener('keydown', onKey, true);
  document.addEventListener('click', onClick, true);

  function stop() {
    clearInterval(timer);
    removeEventListener('keydown', onKey, true);
    document.removeEventListener('click', onClick, true);
    style.remove(); spot.remove(); tip.remove();
    if (!finished) window.__rtEstGuide.closedByUser = true;
  }

  window.__rtEstGuide = {
    stop,
    closedByUser: false,
    choose: (c) => { if (CARD[c]) { choice = c; shownKey = ''; } return 'Guide set to ' + (NAME[c] || 'any option'); },
    status: () => ({ step, choice, finished, unsure, closedByUser: window.__rtEstGuide.closedByUser, url: location.href }),
    check: () => Object.keys(S).map((k) => k + ':' + (S[k].find() ? 'found' : '-')).join(' '),
  };
  tick();
  return 'ReadyTeam estimate guide started: ' + (quickStart() ? 'on Cost Assistant Quick Start' : findCostAssistantCard() ? 'Cost Assistant card found' : 'Cost Assistant not found yet');
})();
```
