---
name: readyteam-specification-guide
description: Show the user how to add specifications to items in a ReadyTeam project's estimate with an on-screen guide in their Chrome tab - in Cost Assistant click an item's + icon, choose Specification, pick a note (General Notes, Inclusions, Exclusions, Internal Notes, Digital Key), type it, and close (it saves itself). The user does the typing; the guide points and puts the cursor in the editor. Use right after allowances (readyteam-allowance-guide, or onboarding), or when the user asks how to add specifications, inclusions, exclusions or notes to items in ReadyTeam.
---

# ReadyTeam: guide the user to add specifications

The user writes the specifications themselves. You put a guide on their ReadyTeam page. The guide is one script (in the "Guide script" section at the end of this skill) that points at each control, puts the cursor in the editor, and moves on by itself. **Do not take screenshots step by step and do not type specifications for the user.**

Where it lives: the project's **Cost Assistant** grid.

- Each **item** row has a **+** icon next to its drag handle (category rows have one too; it is for items here). It opens a menu: **Specification**, Recipe, Selection, Edit, Duplicate, Delete.
- **Specification** opens the item's window on the **Specifications** tab (tabs: Lineitem, Calculator, Specifications, Selection, ...).
- Left: the notes list, each with a **Client Access** tick (whether the client sees it): **General Notes**, **Inclusions**, **Exclusions**, **Internal Notes** (client access off), **Digital Key**; **+ Note** adds another.
- Right: a text editor (bold, lists, links, images) with an **AI** button that can help draft.
- It saves by itself (**Autosaved** badge); **Save** saves now. **Close** returns to the grid with the specification stored.

## Steps

**Right after the allowance guide** (the usual way, also in onboarding): the create-project, estimation or allowance skill loads this guide too and calls `window.__rtSpecGuide.afterAllowances()`. It waits, hidden, until the allowance guide is finished (the user clicks Done there), then takes over by itself. Nothing else to do here until the user replies: go to step 5.

**On its own** (the estimate is in):

1. Load the Claude in Chrome tools in one ToolSearch call if they are deferred, including `javascript_tool`. Use the ReadyTeam tab that is already open. If a login page shows, ask the user to sign in and reply "done".
2. Make sure the tab shows the project's **Cost Assistant** with estimate rows. If not, ask which project and open its Cost Assistant.
3. Run the full text of the guide script below, unchanged, in that tab with `javascript_tool`. Then load the selection guide so it follows on when the user clicks Done: get the guide script from `readyteam-selection-guide` (or read it from `https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-selection-guide/SKILL.md`), run it unchanged in the same tab, then run `window.__rtSelGuide.afterSpecifications()`.
4. Tell the user in two or three plain lines:
   "I've put a guide on your ReadyTeam screen. Click the + on an item, choose Specification, pick a note such as Inclusions, and type it. It saves by itself when you close it. Click Done in the guide when you've finished, or tell me if you get stuck."
5. Wait for the user. Do not poll or take screenshots while they work.
6. When they reply, run `window.__rtSpecGuide && window.__rtSpecGuide.status()` once with `javascript_tool`:
   - `finished: true`: tell the user how many items got a specification (`savedCount`, items closed with text in a note) and that they can open any item's + > Specification to change it. If the selection guide was loaded, also run `window.__rtSelGuide && window.__rtSelGuide.status()` and follow step 6 of `readyteam-selection-guide`.
   - `waitingForAllowances: true`: the allowance step isn't finished yet; help with that first (the user clicks Done in the allowance guide).
   - not finished: ask what they see, or take one screenshot, and explain the next step in plain words. Run the script again if they want the guide back (it restarts cleanly).

## The steps the guide shows

1. **Open an item**: opens the first category if none is open, then points at an item's **+**: "Click + on the item you want to describe".
2. **Specification**: points at **Specification** in the menu.
3. **Pick a note**: points at the notes list: General Notes, Inclusions, Exclusions, Internal Notes (only you see it), Digital Key. (If the window opened on another tab, it first points at the **Specifications** tab.)
4. **Type**: puts the cursor in the editor, with the tip in the editor's bottom-right corner (clear of the toolbar): "Type the specification. The AI button can help you draft it." Next.
5. **Close**: points at **Close**: "It's saved automatically. Click Close to go back to your estimate." Back to step 1 for the next item, with **Done** to finish.

## If the user wants you to do it

Only when the user asks, and only with text they give you (or a draft they approve): open the item's + > Specification, choose the note they name, type the text into the editor, check the Autosaved badge, then Close. Show the user what you entered.

## Rules

- Never type a specification or untick Client Access unless the user asks you to.
- Do not change anything else on the item (Lineitem, Calculator, prices).
- Do not click Delete or Duplicate in the + menu.
- The guide closes with its Close guide button or Escape (Escape is left to ReadyTeam while the item window is open).

## Status

Checked on a live estimate (P1058, Nov 2026), without typing: the + is a `.mat-mdc-menu-trigger` in the item row's `drag-column` cell; the menu items are `.mat-mdc-menu-item`; the item window is `lib-line-item-processed-details` in a `mat-dialog-container`, its tabs are buttons (the selected one has a `shadow` class), the editor is Quill (`.ql-editor`), and the notes are rows of a small grid. Also checked live with the guide on screen (without typing): steps 1 to 5 find their controls (+, Specification, notes list, editor with the cursor put in it, Close), and closing the window returns to step 1. **Not yet run** with a user typing. On the first real run, note whether each step finds its control and whether `savedCount` goes up. `window.__rtSpecGuide.check()` lists what the guide can see.

## Guide script

```js
// ReadyTeam "add specifications" guide.
// Run once in the ReadyTeam tab on the project's Cost Assistant (or call afterAllowances() to follow the allowance guide).
// Check progress afterwards with: window.__rtSpecGuide.status()
(() => {
  if (window.__rtSpecGuide && window.__rtSpecGuide.stop) window.__rtSpecGuide.stop();

  const Z = 2147483000;
  const ORANGE = '#ff7a00';
  const NOTE_RE = /^(general notes|inclusions|exclusions|internal notes|digital key)$/i;

  const clean = (t) => (t || '').replace(/\s+/g, ' ').trim();
  const visible = (el) => {
    if (!el || !el.getBoundingClientRect) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return false;
    const s = getComputedStyle(el);
    return s.visibility !== 'hidden' && s.display !== 'none';
  };
  const inView = (el) => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth; };

  // What is on screen.
  const grid = () => [...document.querySelectorAll('.ag-root-wrapper')].find((g) => visible(g) && g.querySelector('.ag-header-cell[col-id="drag-column"], .ag-cell[col-id="drag-column"]')) || null;
  const rowsLoaded = () => { const g = grid(); return !!(g && g.querySelector('.ag-row')); };
  const isGroupRow = (row) => !!row && row.classList.contains('ag-row-group');
  const itemDialog = () => [...document.querySelectorAll('lib-line-item-processed-details')]
    .map((h) => h.closest('mat-dialog-container') || h).find(visible) || null;
  const menu = () => [...document.querySelectorAll('.mat-mdc-menu-panel')].find(visible) || null;
  const specMenuItem = () => { const m = menu(); return m && [...m.querySelectorAll('.mat-mdc-menu-item, [role=menuitem], button')].find((b) => /^specifications?$/i.test(clean(b.innerText))); };

  // The + of item rows (not categories) that are on screen.
  const itemPluses = () => {
    const g = grid();
    if (!g) return [];
    return [...g.querySelectorAll('.ag-row .ag-cell[col-id="drag-column"] .mat-mdc-menu-trigger')]
      .filter((e) => visible(e) && inView(e) && !isGroupRow(e.closest('.ag-row')));
  };
  const closedArrow = () => { const g = grid(); return g && [...g.querySelectorAll('.ag-row-group .ag-group-contracted')].find((e) => visible(e) && inView(e)); };

  // Inside the item window.
  const tabBtn = (re) => { const d = itemDialog(); return d && [...d.querySelectorAll('button, [role=tab]')].find((b) => visible(b) && re.test(clean(b.innerText))); };
  const onSpecTab = () => { const d = itemDialog(); return !!(d && [...d.querySelectorAll('*')].some((e) => e.children.length === 0 && NOTE_RE.test(clean(e.textContent)) && visible(e))); };
  const notesList = () => {
    const d = itemDialog();
    if (!d) return null;
    const names = [...d.querySelectorAll('*')].filter((e) => e.children.length === 0 && NOTE_RE.test(clean(e.textContent)) && visible(e));
    if (!names.length) return null;
    let box = names[0].parentElement;
    while (box && box !== d && !box.contains(names[names.length - 1])) box = box.parentElement;
    return box;
  };
  const editor = () => { const d = itemDialog(); return d && [...d.querySelectorAll('.ql-editor, [contenteditable=true]')].find(visible); };
  const editorBox = () => { const e = editor(); return e && (e.closest('.ql-container') || e).parentElement || e; };
  const closeBtn = () => { const d = itemDialog(); return d && [...d.querySelectorAll('button')].find((b) => visible(b) && /^close$/i.test(clean(b.innerText))); };
  const hasText = () => { const e = editor(); return !!(e && clean(e.innerText).length > 0 && !e.classList.contains('ql-blank')); };

  // Overlay elements.
  const style = document.createElement('style');
  style.textContent =
    '@keyframes rtSpecPulse{0%,100%{outline-color:' + ORANGE + '}50%{outline-color:#ffc38a}}' +
    '#rt-spec-tip button{font:inherit;border-radius:6px;padding:6px 12px;cursor:pointer}';
  const spot = document.createElement('div');
  Object.assign(spot.style, {
    position: 'fixed', zIndex: Z, pointerEvents: 'none', borderRadius: '6px',
    outline: '3px solid ' + ORANGE, outlineOffset: '2px',
    animation: 'rtSpecPulse 1.4s ease-in-out infinite', transition: 'all .15s ease', display: 'none',
  });
  const tip = document.createElement('div');
  tip.id = 'rt-spec-tip';
  Object.assign(tip.style, {
    position: 'fixed', zIndex: Z + 1, maxWidth: '320px', background: '#fff', color: '#1f2328',
    borderRadius: '10px', padding: '12px 14px', boxShadow: '0 8px 24px rgba(0,0,0,.25)',
    font: '14px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif', borderTop: '4px solid ' + ORANGE,
  });
  document.body.append(style, spot, tip);

  let step = 'item';
  let finished = false;
  let waitingForAllowances = false;
  let shownKey = '';
  let wasOpen = false;
  let typedInThisItem = false;
  let savedCount = 0;
  let focusedFor = '';
  let focusUntil = 0;

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

  // side: 'right' | 'left' | 'below' | 'above' preferred; falls back to whatever fits.
  function place(target, side) {
    const t = tip.getBoundingClientRect();
    const vw = innerWidth, vh = innerHeight, gap = 12;
    const clampTop = (y) => Math.max(gap, Math.min(y, vh - t.height - gap));
    const clampLeft = (x) => Math.max(gap, Math.min(x, vw - t.width - gap));
    if (!target) { tip.style.top = '24px'; tip.style.left = clampLeft((vw - t.width) / 2) + 'px'; return; }
    const r = target.getBoundingClientRect();
    const opts = {
      right: () => (r.right + gap + t.width <= vw - gap) && [r.right + gap, clampTop(r.top)],
      left: () => (r.left - gap - t.width >= gap) && [r.left - gap - t.width, clampTop(r.top)],
      below: () => (r.bottom + gap + t.height <= vh - gap) && [clampLeft(r.left), r.bottom + gap],
      above: () => (r.top - gap - t.height >= gap) && [clampLeft(r.left), r.top - gap - t.height],
    };
    const order = [side, 'right', 'left', 'above', 'below'].filter(Boolean);
    for (const o of order) {
      const p = opts[o] && opts[o]();
      if (p) { tip.style.left = p[0] + 'px'; tip.style.top = p[1] + 'px'; return; }
    }
    tip.style.left = clampLeft(r.left) + 'px';
    tip.style.top = clampTop(r.bottom + gap) + 'px';
  }

  // Tip in the bottom-right corner inside a box, clear of its toolbar and of where text starts.
  function placeInsideCorner(box) {
    if (!box) return place(null);
    const t = tip.getBoundingClientRect(), r = box.getBoundingClientRect(), gap = 16;
    tip.style.left = Math.max(gap, Math.min(r.right - t.width - gap, innerWidth - t.width - gap)) + 'px';
    tip.style.top = Math.max(gap, Math.min(r.bottom - t.height - gap, innerHeight - t.height - gap)) + 'px';
  }

  function highlight(el) {
    if (!el) { spot.style.display = 'none'; return; }
    const r = el.getBoundingClientRect();
    Object.assign(spot.style, { display: 'block', top: r.top - 3 + 'px', left: r.left - 3 + 'px', width: r.width + 6 + 'px', height: r.height + 6 + 'px' });
  }

  function go(id) { if (step === id) return; step = id; shownKey = ''; }

  function finish() {
    finished = true;
    spot.style.display = 'none';
    render('<b>Done.</b> ' + (savedCount ? savedCount + ' item' + (savedCount > 1 ? 's have' : ' has') + ' a specification now. ' : '') +
      'To change one later, click its <b>+</b> and choose <b>Specification</b>.', [{ label: 'Close', primary: true, onClick: stop }]);
    place(null);
    setTimeout(stop, 15000);
  }

  function tick() {
    if (finished) return;

    // afterAllowances(): stay hidden until the allowance guide is finished.
    if (waitingForAllowances) {
      const g = window.__rtAllowGuide;
      const st = g && g.status ? g.status() : null;
      tip.style.display = 'none';
      spot.style.display = 'none';
      if (!st || st.closedByUser) return stop();
      if (!st.finished) return;
      try { g.stop(); } catch (e) { /* already gone */ }
      waitingForAllowances = false;
      tip.style.display = '';
      shownKey = '';
    }

    const d = itemDialog();
    const head = (k) => '<div style="font-size:12px;color:#57606a;margin-bottom:4px">Specifications · step ' + k + ' of 5</div>';
    const close = { label: 'Close guide', onClick: stop };
    const done = { label: 'Done', primary: true, onClick: finish };

    // Item window closed: count it if a note had text, and go back to step 1.
    if (!d && wasOpen) {
      if (typedInThisItem) savedCount++;
      typedInThisItem = false;
      go('item');
    }
    wasOpen = !!d;

    if (d) {
      if (hasText()) typedInThisItem = true;
      if (!onSpecTab()) {
        go('tab');
        const t = tabBtn(/^specifications?$/i);
        highlight(t);
        render(head(3) + 'Click the <b>Specifications</b> tab.', [close]);
        place(t, 'below');
        return;
      }
      if (step === 'item' || step === 'menu' || step === 'tab') go('note');

      if (step === 'note') {
        const list = notesList();
        highlight(list);
        render(head(3) + 'Pick a note on the left: <b>General Notes</b>, <b>Inclusions</b>, <b>Exclusions</b>, <b>Internal Notes</b> (only your team sees it) or <b>Digital Key</b>. The tick shows if your client can see it.',
          [{ label: 'Next', primary: true, onClick: () => go('type') }, close]);
        place(list, 'right');
        return;
      }
      if (step === 'type') {
        const box = editorBox();
        const ed = editor();
        highlight(box);
        if (focusedFor !== 'type') { focusedFor = 'type'; focusUntil = Date.now() + 1500; }
        if (ed && Date.now() < focusUntil && document.activeElement !== ed) { try { ed.focus({ preventScroll: true }); } catch (e) { /* no focus */ } }
        render(head(4) + 'Type the specification here. Use the <b>AI</b> button if you want help drafting it.' +
          (hasText() ? '<div style="margin-top:6px;color:#1a7f37">Saving automatically as you type.</div>' : ''),
          [{ label: 'Next', primary: true, onClick: () => go('close') }, close]);
        placeInsideCorner(box);
        return;
      }
      // step === 'close'
      const c = closeBtn();
      highlight(c);
      render(head(5) + 'Your specification is saved automatically. Click <b>Close</b> to go back to your estimate.' +
        '<div style="margin-top:6px;color:#57606a">Want another note on this item? Pick it on the left first.</div>',
        [{ label: 'Back', onClick: () => go('note') }, close]);
      place(c, 'below');
      return;
    }
    focusedFor = '';

    if (!grid() || !rowsLoaded()) {
      spot.style.display = 'none';
      render('Open the project\'s <b>Cost Assistant</b> to add specifications.', [close]);
      place(null);
      return;
    }

    const sm = specMenuItem();
    if (sm) {
      go('menu');
      highlight(sm);
      render(head(2) + 'Choose <b>Specification</b>.', [close]);
      place(sm, 'right');
      return;
    }

    // step 1: an item's +, opening a category first if none is open.
    go('item');
    const plus = itemPluses()[0];
    const counter = savedCount ? '<div style="margin-top:6px;color:#1a7f37">' + savedCount + ' item' + (savedCount > 1 ? 's' : '') + ' done. Add another, or click Done.</div>' : '';
    if (!plus) {
      const arrow = closedArrow();
      highlight(arrow ? (arrow.closest('.ag-cell') || arrow) : null);
      render(head(1) + '<b>Now let\'s add specifications.</b> Open a category with its arrow to see its items.' + counter,
        savedCount ? [done, close] : [close]);
      place(arrow ? (arrow.closest('.ag-cell') || arrow) : null, 'right');
      return;
    }
    highlight(plus);
    render(head(1) + (savedCount ? '' : '<b>Now let\'s add specifications.</b> ') + 'Click the <b>+</b> on the item you want to describe.' + counter,
      savedCount ? [done, close] : [{ label: 'Skip', onClick: finish }, close]);
    place(plus, 'right');
  }

  const onKey = (e) => { if (e.key === 'Escape' && !itemDialog() && !menu()) stop(); };
  const timer = setInterval(tick, 200);
  addEventListener('keydown', onKey, true);

  function stop() {
    clearInterval(timer);
    removeEventListener('keydown', onKey, true);
    style.remove(); spot.remove(); tip.remove();
    if (!finished) window.__rtSpecGuide.closedByUser = true;
  }

  window.__rtSpecGuide = {
    stop,
    closedByUser: false,
    // Run right after the allowance guide: wait until it is finished, then start by itself.
    afterAllowances: () => {
      waitingForAllowances = true;
      tip.style.display = 'none';
      spot.style.display = 'none';
      return 'Specification guide waiting for the allowance guide';
    },
    status: () => ({ step, finished, waitingForAllowances, savedCount, itemOpen: !!itemDialog(), closedByUser: window.__rtSpecGuide.closedByUser, url: location.href }),
    check: () => 'grid:' + !!grid() + ' rows:' + rowsLoaded() + ' pluses:' + itemPluses().length + ' menu:' + !!menu() + ' specItem:' + !!specMenuItem() +
      ' dialog:' + !!itemDialog() + ' specTab:' + onSpecTab() + ' notes:' + !!notesList() + ' editor:' + !!editor() + ' close:' + !!closeBtn(),
  };
  tick();
  return 'ReadyTeam specification guide started: ' + (rowsLoaded() ? 'estimate rows found' : 'waiting for Cost Assistant rows');
})();
```
