---
name: readyteam-allowance-guide
description: Show the user how to set allowances on a ReadyTeam project's estimate with an on-screen guide in their Chrome tab - in Cost Assistant, expand a category, scroll to the Allowance column, and pick PC (Prime Cost) or PS (Provisional Sum) from each item's dropdown. The user does the choosing; the guide scrolls and points. Use right after the estimate is in (readyteam-estimation-guide, or onboarding), or when the user asks how to set allowances, PC or PS items in ReadyTeam.
---

# ReadyTeam: guide the user to set allowances

The user sets the allowances themselves. You put a guide on their ReadyTeam page. The guide is one script (in the "Guide script" section at the end of this skill) that points at each control, scrolls the grid to the Allowance column for the user, and moves on by itself. **Do not take screenshots step by step and do not choose allowances for the user.**

Where it lives: the project's **Cost Assistant** grid.

- Rows are grouped by **category** (1 Preliminaries, 2 Professional Fees, ...). The arrow left of a category opens it and shows its items.
- The **Allowance** column is far to the right (after Client Price (Inc)), so the grid must scroll sideways. The Description column stays pinned on the left.
- On an **item** row, **double-click** the Allowance cell ("-- Select Item --") to open its dropdown: blank, **PC (Prime Cost)**, **PS (Provisional Sum)**. Category rows have no allowance.
- **PC (Prime Cost)**: an allowance for items not chosen yet, for example tiles, tapware or appliances. **PS (Provisional Sum)**: an allowance for work whose cost isn't known yet, for example rock removal. Leave other items blank.

## Asking the user

- **Every question is buttons. No exceptions.** Ask every question, including yes/no checks, "is this the right company?", "are you signed in?" and "ready for the next step?", with the chat's multiple-choice question tool (`AskUserQuestion`, or an "ask the user" tool that shows options). If that tool is listed but not loaded yet (deferred), load it with ToolSearch first (`select:AskUserQuestion`), before your first question. One question per call, 2 to 4 short options (a few words each, the recommended one first), each with a one-line description; the user can still type their own answer.
  - Never ask in plain text. Never write "Reply yes", "reply done", "tell me the right name" or "type ..." as the way to answer. Put the question in the tool, not in your message.
  - Example: "The top of your screen shows the company **Claude Testing**. Is that the company we're setting up?" Options: **Yes, that's it** · **No, it's a different company**. If they pick the second, ask them to switch company in ReadyTeam (top of the screen) and then ask, as buttons: **I've switched** · **I need help**.
  - Only if this chat truly has no such tool: end the message with a short numbered list of the options and say they can reply with the number.
- **Files: say exactly what and how.** When you need a file, say which file, what it looks like, and how to attach it: "Tap **+** below the message box, then **Upload a file**, and choose your <file> (.xlsx or .csv)." Ask it as a button question with options such as **I've attached it**, **I don't have one** and **Skip**. Claude cannot show an upload button in the chat; the **+** is the upload.
- **Do the work yourself.** Once the user has given a file or a choice, do every ReadyTeam click, upload, typing and navigation yourself. Reuse what you already have in this chat (the logo, the brand colours, the company name, earlier answers) instead of asking again. Ask only for what you cannot get or decide: files only the user has, real choices, and one yes before anything is saved, imported or uploaded.
- **One yes, as a button.** Before a save, import or upload, show what will change and ask once, with options such as **Go ahead**, **Show me first** and **Not now**.

## Steps

**Right after the estimate guide** (the usual way, also in onboarding): the create-project or estimation skill loads this guide too and calls `window.__rtAllowGuide.afterEstimate()`. It waits, hidden, until the estimate guide reports the estimate in, then takes over on screen by itself. Nothing else to do here until the user replies: go to step 5.

**On its own** (the estimate is already in):

1. Load the Claude in Chrome tools in one ToolSearch call if they are deferred, including `javascript_tool`. Use the ReadyTeam tab that is already open, on whichever ReadyTeam site the user is using (https://app.readyteam.ai/ or https://ready-team-staging.web.app/); stay on that site. If a login page shows, ask the user to sign in there, then ask as buttons: **I've signed in** · **I need help signing in**.
2. Make sure the tab shows the project's **Cost Assistant** with estimate rows (not Quick Start). If not, ask which project and open its Cost Assistant.
3. Run the full text of the guide script below, unchanged, in that tab with `javascript_tool`. Then load the specification guide so it follows on when the user clicks Done: get the guide script from `readyteam-specification-guide` (or read it quietly, with a web fetch or shell download and never in a browser tab, from `https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-specification-guide/SKILL.md`), run it unchanged in the same tab, then run `window.__rtSpecGuide.afterAllowances()`. Do the same with the selection guide (from `readyteam-selection-guide`, or `https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-selection-guide/SKILL.md`), then run `window.__rtSelGuide.afterSpecifications()`. Do the same with the takeoff guide (from `readyteam-takeoff-guide`, or `https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-takeoff-guide/SKILL.md`), then run `window.__rtTakeoffGuide.afterSelections()`.
4. Tell the user in two or three plain lines:
   "I've put a guide on your ReadyTeam screen. It opens a category and scrolls to the Allowance column for you. Double-click an item's Allowance cell and choose PC (Prime Cost) or PS (Provisional Sum). Click Done in the guide when you've finished, or tell me if you get stuck."
5. Then ask, as buttons: "Tell me when you've finished." Options: **I'm done** · **I'm stuck** · **Skip this part**. Wait for the user. Do not poll or take screenshots while they work.
6. When they reply, run `window.__rtAllowGuide && window.__rtAllowGuide.status()` once with `javascript_tool`:
   - `finished: true`: tell the user how many allowances are set (`setCount`, counting the rows on screen) and that they can change any of them later the same way. If the specification guide was loaded, also run `window.__rtSpecGuide && window.__rtSpecGuide.status()` and follow step 6 of `readyteam-specification-guide`.
   - `waitingForEstimate: true`: the estimate isn't in yet; help with the estimate guide first.
   - not finished: ask what they see, or take one screenshot, and explain the next step in plain words. Run the script again if they want the guide back (it restarts cleanly).

## The steps the guide shows

1. **Open a category**: points at the arrow of the first closed category (skipped if one is already open).
2. **Pick an allowance**: scrolls the grid to the Allowance column by itself and highlights an item's Allowance cell: "Double-click the Allowance cell, then choose PC or PS".
3. **Choose**: while a dropdown is open, the tip moves left of (or above) the cell so the list stays visible: "Choose PC (Prime Cost) or PS (Provisional Sum), or leave it blank".
4. Back to step 2 after each choice, showing how many allowances are set, with **Done** to finish. Opening another category: the guide follows.

## If the user wants you to do it

Only when the user asks, and only for the items they name with the allowance they name: scroll to the Allowance column, double-click that item's cell, choose the option, and check it shows. Show the user what you set.

## Rules

- Never choose an allowance for the user unless they ask you to.
- Do not change any other column (quantities, prices, markup).
- The guide closes with the Close guide button or Escape. While a cell is being edited, Escape is left to ReadyTeam: the first press closes the list, the second cancels the edit, and the guide stays open.
- The tip sits above the grid, lined up with the Allowance column, so it never covers the item names or the dropdown list.

## Status

Checked on a live estimate (P1058, Nov 2026), without choosing anything: categories are ag-grid group rows (`.ag-row-group`, arrow `.ag-group-contracted`); the Allowance column is `col-id="allowance_type_id"`, reached by scrolling `.ag-body-horizontal-scroll-viewport`; a double-click opens an inline rich-select editor (`.ag-cell-inline-editing`) with the list in a popup; the options are blank, PC (Prime Cost), PS (Provisional Sum). Also checked live: the guide points at the first category arrow, scrolls to the Allowance column by itself once a category is opened, follows the dropdown, and returns to step 2 after Escape. **Not yet run** with a user actually choosing PC or PS. On the first real run, note whether the guide finds each control, and whether the count goes up after a choice. `window.__rtAllowGuide.check()` lists what the guide can see.

## Guide script

```js
// ReadyTeam "set your allowances" guide.
// Run once in the ReadyTeam tab on the project's Cost Assistant (or call afterEstimate() to follow the estimate guide).
// Check progress afterwards with: window.__rtAllowGuide.status()
(() => {
  if (window.__rtAllowGuide && window.__rtAllowGuide.stop) window.__rtAllowGuide.stop();

  const Z = 2147483000;
  const ORANGE = '#ff7a00';
  const COL = 'allowance_type_id';
  const EMPTY = /^(-- ?select item ?--)?$/i;

  const clean = (t) => (t || '').replace(/\s+/g, ' ').trim();
  const visible = (el) => {
    if (!el || !el.getBoundingClientRect) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return false;
    const s = getComputedStyle(el);
    return s.visibility !== 'hidden' && s.display !== 'none';
  };
  const inView = (el) => {
    const r = el.getBoundingClientRect();
    return r.right > 0 && r.left < innerWidth && r.bottom > 0 && r.top < innerHeight;
  };

  // The Cost Assistant grid.
  const grid = () => [...document.querySelectorAll('.ag-root-wrapper')].find((g) => visible(g) && g.querySelector('.ag-header-cell[col-id="' + COL + '"]')) || null;
  const rowsLoaded = () => { const g = grid(); return !!(g && g.querySelector('.ag-row')); };
  const hScroll = () => { const g = grid(); return g && g.querySelector('.ag-body-horizontal-scroll-viewport'); };
  const header = () => { const g = grid(); return g && g.querySelector('.ag-header-cell[col-id="' + COL + '"]'); };

  const isGroupRow = (row) => !!row && row.classList.contains('ag-row-group');
  // Allowance cells of item rows (not categories) that are on screen.
  const itemCells = () => {
    const g = grid();
    if (!g) return [];
    return [...g.querySelectorAll('.ag-center-cols-container .ag-cell[col-id="' + COL + '"]')]
      .filter((c) => visible(c) && !isGroupRow(c.closest('.ag-row')));
  };
  const editingCell = () => { const g = grid(); return g && g.querySelector('.ag-cell-inline-editing[col-id="' + COL + '"], .ag-cell-popup-editing[col-id="' + COL + '"]'); };
  const dropdownList = () => [...document.querySelectorAll('.ag-rich-select-list, .ag-rich-select, .ag-select-list, .ag-popup')].find(visible) || null;

  // The arrow of a closed category, and whether any category is open.
  const closedArrow = () => {
    const g = grid();
    if (!g) return null;
    return [...g.querySelectorAll('.ag-row-group .ag-group-contracted')].find((e) => visible(e) && inView(e)) || null;
  };
  const anyOpen = () => itemCells().length > 0 || (() => { const g = grid(); return !!(g && [...g.querySelectorAll('.ag-row')].some((r) => !isGroupRow(r) && visible(r))); })();

  // Scroll the grid sideways so the Allowance column is in view.
  function showColumn() {
    const vp = hScroll(), h = header(), g = grid();
    if (!vp || !h || !g) return false;
    const gr = g.getBoundingClientRect(), hr = h.getBoundingClientRect();
    const pinned = g.querySelector('.ag-pinned-left-header');
    const leftEdge = gr.left + (pinned ? pinned.getBoundingClientRect().width : 0);
    if (hr.left >= leftEdge && hr.right <= gr.right) return true;
    vp.scrollLeft += hr.left - leftEdge - 160;
    return false;
  }

  const setCount = () => itemCells().filter((c) => !EMPTY.test(clean(c.innerText))).length;
  const firstEmptyCell = () => itemCells().find((c) => EMPTY.test(clean(c.innerText)) && inView(c)) || itemCells().find(inView) || null;

  // Overlay elements.
  const style = document.createElement('style');
  style.textContent =
    '@keyframes rtAllowPulse{0%,100%{outline-color:' + ORANGE + '}50%{outline-color:#ffc38a}}' +
    '#rt-allow-tip button{font:inherit;border-radius:6px;padding:6px 12px;cursor:pointer}';
  const spot = document.createElement('div');
  Object.assign(spot.style, {
    position: 'fixed', zIndex: Z, pointerEvents: 'none', borderRadius: '6px',
    outline: '3px solid ' + ORANGE, outlineOffset: '2px',
    animation: 'rtAllowPulse 1.4s ease-in-out infinite', transition: 'all .15s ease', display: 'none',
  });
  const tip = document.createElement('div');
  tip.id = 'rt-allow-tip';
  Object.assign(tip.style, {
    position: 'fixed', zIndex: Z + 1, maxWidth: '320px', background: '#fff', color: '#1f2328',
    borderRadius: '10px', padding: '12px 14px', boxShadow: '0 8px 24px rgba(0,0,0,.25)',
    font: '14px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif', borderTop: '4px solid ' + ORANGE,
  });
  document.body.append(style, spot, tip);

  let step = 'expand';
  let finished = false;
  let waitingForEstimate = false;
  let shownKey = '';
  let missingSince = 0;

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

  // Tip to the left of the target, else above it, else below; never over a dropdown list.
  function place(target, avoid) {
    const t = tip.getBoundingClientRect();
    const vw = innerWidth, vh = innerHeight, gap = 12;
    const clampTop = (y) => Math.max(gap, Math.min(y, vh - t.height - gap));
    if (!target) {
      tip.style.top = '24px';
      tip.style.left = Math.max(gap, (vw - t.width) / 2) + 'px';
      return;
    }
    const r = target.getBoundingClientRect();
    const a = avoid ? avoid.getBoundingClientRect() : r;
    const left = Math.min(r.left, a.left), top = Math.min(r.top, a.top);
    let x, y;
    if (left - gap - t.width >= gap) { x = left - gap - t.width; y = clampTop(r.top); }
    else if (top - gap - t.height >= gap) { y = top - gap - t.height; x = Math.max(gap, Math.min(r.left, vw - t.width - gap)); }
    else if (Math.max(r.right, a.right) + gap + t.width <= vw - gap) { x = Math.max(r.right, a.right) + gap; y = clampTop(r.top); }
    else { y = clampTop(Math.max(r.bottom, a.bottom) + gap); x = Math.max(gap, Math.min(r.left, vw - t.width - gap)); }
    tip.style.top = y + 'px';
    tip.style.left = x + 'px';
  }

  // Tip above the grid, lined up with the column, so it covers neither the item names nor the dropdown list.
  function placeAboveGrid(col, avoid) {
    const g = grid();
    if (!g || !col) return place(col, avoid);
    const t = tip.getBoundingClientRect();
    const gr = g.getBoundingClientRect(), c = col.getBoundingClientRect();
    const vw = innerWidth, gap = 12;
    const y = gr.top - gap - t.height;
    if (y < gap) return place(col, avoid);
    tip.style.top = y + 'px';
    tip.style.left = Math.max(gap, Math.min(c.left, vw - t.width - gap)) + 'px';
  }

  function highlight(el, pad) {
    if (!el) { spot.style.display = 'none'; return; }
    const r = el.getBoundingClientRect();
    pad = pad || 3;
    Object.assign(spot.style, {
      display: 'block', top: r.top - pad + 'px', left: r.left - pad + 'px',
      width: r.width + pad * 2 + 'px', height: r.height + pad * 2 + 'px',
    });
  }

  function go(id) {
    if (step === id) return;
    step = id;
    missingSince = 0;
    shownKey = '';
  }

  function finish() {
    finished = true;
    spot.style.display = 'none';
    const n = setCount();
    render('<b>Done.</b> ' + (n ? n + ' allowance' + (n > 1 ? 's are' : ' is') + ' set on the rows shown.' : 'You can set allowances any time from this Allowance column.') +
      ' You can change them later the same way.', [{ label: 'Close', primary: true, onClick: stop }]);
    place(null);
    setTimeout(stop, 15000);
  }

  function tick() {
    if (finished) return;

    // afterEstimate(): stay hidden until the estimate guide reports the estimate in.
    if (waitingForEstimate) {
      const g = window.__rtEstGuide;
      const st = g && g.status ? g.status() : null;
      tip.style.display = 'none';
      spot.style.display = 'none';
      if (!st || st.closedByUser) return stop();
      if (!st.finished || st.unsure || !rowsLoaded()) return;
      try { g.stop(); } catch (e) { /* already gone */ }
      waitingForEstimate = false;
      tip.style.display = '';
      shownKey = '';
    }

    if (!grid() || !rowsLoaded()) {
      spot.style.display = 'none';
      render('Open the project\'s <b>Cost Assistant</b> to set allowances. (Waiting for the estimate rows to load...)',
        [{ label: 'Close guide', onClick: stop }]);
      place(null);
      return;
    }

    const editing = editingCell();
    if (editing) go('choose');
    else if (step === 'choose') go('pick');
    else if (step === 'expand' && anyOpen()) go('pick');
    else if (step === 'pick' && !anyOpen()) go('expand');

    const n = setCount();
    const head = (k) => '<div style="font-size:12px;color:#57606a;margin-bottom:4px">Allowances · step ' + k + ' of 3</div>';
    const close = { label: 'Close guide', onClick: stop };
    const done = { label: 'Done', primary: true, onClick: finish };

    if (step === 'expand') {
      const arrow = closedArrow();
      const row = arrow && arrow.closest('.ag-row');
      highlight(arrow ? (arrow.closest('.ag-cell') || arrow) : null);
      render(head(1) + '<b>Now let\'s set your allowances.</b> Click the arrow next to a category to open it and see its items.',
        [close]);
      place(arrow ? (arrow.closest('.ag-cell') || row) : null);
      return;
    }

    if (step === 'choose') {
      const list = dropdownList();
      highlight(editing);
      render(head(3) + 'Choose <b>PC (Prime Cost)</b> for items not chosen yet (like tiles or tapware), or <b>PS (Provisional Sum)</b> for work whose cost isn\'t known yet. Leave it blank for normal items.',
        [close]);
      placeAboveGrid(editing, list);
      return;
    }

    // step === 'pick'
    const colShown = showColumn();
    const cell = colShown ? firstEmptyCell() : null;
    if (!cell) {
      missingSince = missingSince || Date.now();
      highlight(header());
      render(head(2) + (colShown
        ? 'Open a category with the arrow on the left to see its items, then double-click an item\'s <b>Allowance</b> cell.'
        : 'Scrolling to the <b>Allowance</b> column...'), n ? [done, close] : [close]);
      placeAboveGrid(header());
      return;
    }
    missingSince = 0;
    highlight(cell);
    render(head(2) + 'This is the <b>Allowance</b> column. <b>Double-click</b> an item\'s Allowance cell to open its list.' +
      (n ? '<div style="margin-top:6px;color:#1a7f37">' + n + ' allowance' + (n > 1 ? 's' : '') + ' set so far. Set any others, or click Done.</div>'
        : '<div style="margin-top:6px;color:#57606a">Only items that are allowances need one; leave the rest blank.</div>'),
      [done, close]);
    placeAboveGrid(cell);
  }

  // Escape closes the guide, unless it is closing a dropdown.
  const onKey = (e) => { if (e.key === 'Escape' && !editingCell()) stop(); };
  const timer = setInterval(tick, 200);
  addEventListener('keydown', onKey, true);

  function stop() {
    clearInterval(timer);
    removeEventListener('keydown', onKey, true);
    style.remove(); spot.remove(); tip.remove();
    if (!finished) window.__rtAllowGuide.closedByUser = true;
  }

  window.__rtAllowGuide = {
    stop,
    closedByUser: false,
    // Run right after the estimate guide: wait for the estimate, then start by itself.
    afterEstimate: () => {
      waitingForEstimate = true;
      tip.style.display = 'none';
      spot.style.display = 'none';
      return 'Allowance guide waiting for the estimate';
    },
    status: () => ({ step, finished, waitingForEstimate, setCount: grid() ? setCount() : 0, closedByUser: window.__rtAllowGuide.closedByUser, url: location.href }),
    check: () => 'grid:' + !!grid() + ' rows:' + rowsLoaded() + ' closedCategory:' + !!closedArrow() + ' anyOpen:' + anyOpen() +
      ' header:' + !!header() + ' itemCells:' + itemCells().length + ' editing:' + !!editingCell() + ' set:' + (grid() ? setCount() : 0),
  };
  tick();
  return 'ReadyTeam allowance guide started: ' + (rowsLoaded() ? 'estimate rows found' : 'waiting for Cost Assistant rows');
})();
```
