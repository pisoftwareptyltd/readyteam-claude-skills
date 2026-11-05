---
name: readyteam-selection-guide
description: Show the user how to add a selection to an item in a ReadyTeam project's estimate with an on-screen guide in their Chrome tab - in Cost Assistant click an item's + icon, choose Selection, open a selection question category, tick a question, Continue, tick the product (selection item), Continue. The user does the choosing; the guide points at each control. Use right after specifications (readyteam-specification-guide, or onboarding), or when the user asks how to add selections, selection questions or selection items (products like roof tiles or appliances) to items in ReadyTeam.
---

# ReadyTeam: guide the user to add selections

The user makes the selections themselves. You put a guide on their ReadyTeam page. The guide is one script (in the "Guide script" section at the end of this skill) that points at each control and moves on by itself. **Do not take screenshots step by step and do not choose for the user.**

Where it lives: the project's **Cost Assistant** grid.

- Each **item** row has a **+** icon next to its drag handle. Its menu: Specification, Recipe, **Selection**, Edit, Duplicate, Delete.
- **Selection** opens the item's window on the **Selection** tab: a three-step wizard on the left, **1 Selection Question → 2 Selection Items → 3 Selected Item** (done steps turn green).
- **1 Selection Question**: a grid of question **categories** (Roofing, Window, Door Frames & Screens, External Doors, ...). The arrow opens a category; each **question** (Roof Type, Gutter Colour, ...) has a tick box. **+ Question** adds a new one. Then **Continue**.
- **2 Selection Items**: product **cards** (photo, name, "Included in contract"), each with a tick box; also **Enter manually** and **Import from URL**. At the bottom, **Use Selected Item Price as Unit Cost** (ticked by default): when ticked, the item's Unit Cost becomes the chosen product's price, so a $0 product sets the item's unit cost to $0. Then **Continue**.
- **Continue on step 1 already saves the question** on the item (its Selection Question column shows it), even if the user stops before picking a product.
- **3 Selected Item**: the chosen product's details (SKU, colour, sizes, Qty, Variation) and a red **Clear Item** button. The selection is saved by now; **Close** returns to the grid, where the item's **Selection Question** column shows the question.

## Asking the user

- **Every question is buttons. No exceptions.** Ask every question, including yes/no checks, "is this the right company?", "are you signed in?" and "ready for the next step?", with the chat's multiple-choice question tool (`AskUserQuestion`, or an "ask the user" tool that shows options). If that tool is listed but not loaded yet (deferred), load it with ToolSearch first (`select:AskUserQuestion`), before your first question. One question per call, 2 to 4 short options (a few words each, the recommended one first), each with a one-line description; the user can still type their own answer.
  - Never ask in plain text. Never write "Reply yes", "reply done", "tell me the right name" or "type ..." as the way to answer. Put the question in the tool, not in your message.
  - Example: "The top of your screen shows the company **Claude Testing**. Is that the company we're setting up?" Options: **Yes, that's it** · **No, it's a different company**. If they pick the second, ask them to switch company in ReadyTeam (top of the screen) and then ask, as buttons: **I've switched** · **I need help**.
  - Only if this chat truly has no such tool: end the message with a short numbered list of the options and say they can reply with the number.
- **Files: the file must arrive with a message, not a button.** A button answer can never carry a file, so never offer an **I've attached it** button. Ask for a file in two parts:
  1. Ask as buttons: "Do you have your <file> (<what it looks like>) ready?" Options such as **Yes, I'll attach it** · **I don't have one** · **Skip this step** (optional steps only).
  2. If they pick **Yes, I'll attach it**: reply in plain words, "Tap **+** below the message box, choose **Upload a file**, pick your <file>, then press **Send**. I'll wait for it." Then **end your turn and wait**. Do nothing else: no next step, no other question.
  - When the next message arrives, check that the file is really there (an attachment or uploaded file in that message or earlier in the chat). If it is not, say "I didn't get the file yet" and repeat part 2. Never move on, and never start the next step, while a file you asked for is missing.
  - If the file is already in this chat, use it and don't ask.
- **Do the work yourself.** Once the user has given a file or a choice, do every ReadyTeam click, upload, typing and navigation yourself. Reuse what you already have in this chat (the logo, the brand colours, the company name, earlier answers) instead of asking again. Ask only for what you cannot get or decide: files only the user has, real choices, and one yes before anything is saved, imported or uploaded.
- **One yes, as a button.** Before a save, import or upload, show what will change and ask once, with options such as **Go ahead**, **Show me first** and **Not now**.

## Steps

**Right after the specification guide** (the usual way, also in onboarding): the create-project, estimation, allowance or specification skill loads this guide too and calls `window.__rtSelGuide.afterSpecifications()`. It waits, hidden, until the specification guide is finished (the user clicks Done or Skip there), then takes over by itself. Nothing else to do here until the user replies: go to step 5.

**On its own** (the estimate is in):

1. Load the Claude in Chrome tools in one ToolSearch call if they are deferred, including `javascript_tool`. Use the ReadyTeam tab that is already open, on whichever ReadyTeam site the user is using (https://app.readyteam.ai/ or https://ready-team-staging.web.app/); stay on that site. If a login page shows, ask the user to sign in there, then ask as buttons: **I've signed in** · **I need help signing in**.
2. Make sure the tab shows the project's **Cost Assistant** with estimate rows. If not, ask which project and open its Cost Assistant.
3. Run the full text of the guide script below, unchanged, in that tab with `javascript_tool`. Then load the takeoff guide so it follows on when the user clicks Done: get the guide script from `readyteam-takeoff-guide` (or read it quietly, with a web fetch or shell download and never in a browser tab, from `https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-takeoff-guide/SKILL.md`), run it unchanged in the same tab, then run `window.__rtTakeoffGuide.afterSelections()`.
4. Tell the user in two or three plain lines:
   "I've put a guide on your ReadyTeam screen. Click the + on an item, choose Selection, pick a question, then the product, clicking Continue after each. Click Done in the guide when you've finished, or tell me if you get stuck."
5. Then ask, as buttons: "Tell me when you've finished." Options: **I'm done** · **I'm stuck** · **Skip this part**. Wait for the user. Do not poll or take screenshots while they work.
6. When they reply, run `window.__rtSelGuide && window.__rtSelGuide.status()` once with `javascript_tool`:
   - `finished: true`: if the takeoff guide was loaded, also run `window.__rtTakeoffGuide && window.__rtTakeoffGuide.status()` and follow step 6 of `readyteam-takeoff-guide`. Tell the user how many items got a selection (`savedCount`, items that reached Selected Item) and that they can change one with + > Selection (Clear Item, then choose again). If `priceKept` is true for any, remind them the item's unit cost now follows the product price.
   - `waitingForSpecifications: true`: the specification step isn't finished yet; help with that first.
   - not finished: ask what they see, or take one screenshot, and explain the next step in plain words. Run the script again if they want the guide back (it restarts cleanly).

## The steps the guide shows

1. **Open an item**: opens the first category if none is open, then points at an item's **+**.
2. **Selection**: points at **Selection** in the menu. (If the window opened on another tab, it points at the **Selection** tab.)
3. **Question**: points at a category arrow ("open a question category"), then at the questions ("tick the question"), then at **Continue**.
4. **Product**: points at the product cards ("tick the product"), with a warning about **Use Selected Item Price as Unit Cost**, then at **Continue**.
5. **Done for this item**: on Selected Item, points at **Close**. Back to step 1 for the next item, counting items done, with **Done** to finish.

Tips sit in the empty left column under the wizard steps (or above Continue), so they never cover the grid, the cards or the buttons.

## If the user wants you to do it

Only when the user asks, and only with the item, question and product they name: open the item's + > Selection, open the category, tick the question, Continue, tick the product, ask them whether to keep **Use Selected Item Price as Unit Cost** ticked, Continue, then Close. Show the user what you set.

## Rules

- Never tick a question or product, or change the price tick box, unless the user asks you to.
- Do not click **Clear Item**, Delete or Duplicate, and do not change anything else on the item.
- The guide closes with its Close guide button or Escape (Escape is left to ReadyTeam while the item window is open).

## Status

Checked on a live estimate (P1058, item 1.1, Nov 2026) by going through the wizard once with sample data (question Roof Type, product Monier CSR Concrete): the + is a `.mat-mdc-menu-trigger` in the item row's `drag-column` cell; the window is `lib-line-item-processed-details`; step 1 is an ag-grid of question categories (`.ag-row-group`) and questions (level-1 rows with tick boxes); step 2 has "Enter manually" and product cards with `input.checkbox`; step 3 has a **Clear Item** button; Continue is `button.btn-success`. Going through step 2 with the price box ticked set the item's Unit Cost from $5,500.00 to $0.00 (the product price). Also checked live with the guide on screen (item 1.2): it followed the user to that item's +, highlighted Selection, the category arrow, the questions, Continue, the product cards with the price warning, and Continue again, and went back to step 1 when the window was closed. (That run saved the question Roof Vent on item 1.2 with no product; its unit cost was not changed.) **Not yet run** to the Selected Item screen with the guide on screen. On the first real run, note whether each step finds its control and whether `savedCount` goes up. `window.__rtSelGuide.check()` lists what the guide can see.

## Guide script

```js
// ReadyTeam "add selections" guide.
// Run once in the ReadyTeam tab on the project's Cost Assistant (or call afterSpecifications() to follow the specification guide).
// Check progress afterwards with: window.__rtSelGuide.status()
(() => {
  if (window.__rtSelGuide && window.__rtSelGuide.stop) window.__rtSelGuide.stop();

  const Z = 2147483000;
  const ORANGE = '#ff7a00';

  const clean = (t) => (t || '').replace(/\s+/g, ' ').trim();
  const visible = (el) => {
    if (!el || !el.getBoundingClientRect) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return false;
    const s = getComputedStyle(el);
    return s.visibility !== 'hidden' && s.display !== 'none';
  };
  const inView = (el) => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth; };
  const leafIn = (root, re) => root && [...root.querySelectorAll('p, span, div, button, label, a')]
    .find((e) => visible(e) && re.test(clean(e.innerText)) && ![...e.children].some((c) => re.test(clean(c.innerText))));
  const isChecked = (row) => !!row && (row.classList.contains('ag-row-selected') ||
    !!row.querySelector('.ag-checkbox-input-wrapper.ag-checked, input[type=checkbox]:checked'));

  // Cost Assistant grid (outside the item window).
  const mainGrid = () => [...document.querySelectorAll('.ag-root-wrapper')]
    .find((g) => visible(g) && !g.closest('mat-dialog-container') && g.querySelector('.ag-cell[col-id="drag-column"], .ag-header-cell[col-id="drag-column"]')) || null;
  const rowsLoaded = () => { const g = mainGrid(); return !!(g && g.querySelector('.ag-row')); };
  const isGroupRow = (row) => !!row && row.classList.contains('ag-row-group');
  const itemPluses = () => {
    const g = mainGrid();
    if (!g) return [];
    return [...g.querySelectorAll('.ag-row .ag-cell[col-id="drag-column"] .mat-mdc-menu-trigger')]
      .filter((e) => visible(e) && inView(e) && !isGroupRow(e.closest('.ag-row')));
  };
  const closedArrowIn = (g) => g && [...g.querySelectorAll('.ag-row-group .ag-group-contracted')].find((e) => visible(e) && inView(e));
  const menu = () => [...document.querySelectorAll('.mat-mdc-menu-panel')].find(visible) || null;
  const selMenuItem = () => { const m = menu(); return m && [...m.querySelectorAll('.mat-mdc-menu-item, [role=menuitem], button')].find((b) => /^selections?$/i.test(clean(b.innerText))); };

  // The item window and the Selection wizard inside it.
  const itemDialog = () => [...document.querySelectorAll('lib-line-item-processed-details')]
    .map((h) => h.closest('mat-dialog-container') || h).find(visible) || null;
  const onSelTab = () => !!leafIn(itemDialog(), /^selection question$/i) && !!leafIn(itemDialog(), /^selected item$/i);
  const tabBtn = () => { const d = itemDialog(); return d && [...d.querySelectorAll('button, [role=tab]')].find((b) => visible(b) && /^selection$/i.test(clean(b.innerText))); };
  const qGrid = () => { const d = itemDialog(); return d && [...d.querySelectorAll('.ag-root-wrapper')].find(visible); };
  const clearBtn = () => { const d = itemDialog(); return d && [...d.querySelectorAll('button')].find((b) => visible(b) && /clear item/i.test(clean(b.innerText))); };
  const manualTile = () => leafIn(itemDialog(), /^enter manually$/i);
  const continueBtn = () => { const d = itemDialog(); return d && [...d.querySelectorAll('button')].find((b) => visible(b) && /^continue$/i.test(clean(b.innerText))); };
  const closeBtn = () => { const d = itemDialog(); return d && [...d.querySelectorAll('button')].find((b) => visible(b) && /^close$/i.test(clean(b.innerText))); };
  const stepperBox = () => { const a = leafIn(itemDialog(), /^selection question$/i), b = leafIn(itemDialog(), /^selected item$/i); if (!a || !b) return null; let x = a.parentElement; while (x && !x.contains(b)) x = x.parentElement; return x; };

  // Which wizard step is showing.
  const wizardStep = () => {
    if (!onSelTab()) return null;
    if (clearBtn()) return 'selected';
    if (manualTile()) return 'items';
    if (qGrid()) return 'question';
    return null;
  };

  // Step 1: questions are the rows inside a category (level 1 or deeper); categories are level 0, even empty ones.
  const rowLevel = (r) => { const m = String(r.className).match(/ag-row-level-(\d+)/); return m ? +m[1] : 0; };
  const questionRows = () => { const g = qGrid(); return g ? [...g.querySelectorAll('.ag-center-cols-container .ag-row')].filter((r) => visible(r) && rowLevel(r) >= 1) : []; };
  const questionTicked = () => questionRows().some(isChecked);
  const questionsBox = () => {
    const rows = questionRows().filter(inView);
    if (!rows.length) return null;
    const top = Math.min(...rows.map((r) => r.getBoundingClientRect().top));
    const bottom = Math.max(...rows.map((r) => r.getBoundingClientRect().bottom));
    const g = qGrid().getBoundingClientRect();
    return { getBoundingClientRect: () => ({ left: g.left, right: g.right, width: g.width, top, bottom, height: bottom - top }) };
  };

  // Step 2: product cards, the price tick box, and whether a product is ticked.
  const priceLabel = () => leafIn(itemDialog(), /use selected item price as unit cost/i);
  const priceBox = () => { const l = priceLabel(); let x = l; for (let i = 0; i < 3 && x; i++) { const c = x.querySelector && x.querySelector('input[type=checkbox]'); if (c) return c; x = x.parentElement; } return null; };
  const cardBoxes = () => { const d = itemDialog(); const p = priceBox(); return d ? [...d.querySelectorAll('input[type=checkbox]')].filter((c) => visible(c) && c !== p && !c.closest('.ag-root-wrapper')) : []; };
  const productTicked = () => cardBoxes().some((c) => c.checked);
  const cardsArea = () => {
    const m = manualTile(), boxes = cardBoxes();
    if (!m) return null;
    let x = m.parentElement;
    while (x && boxes.length && !boxes.every((b) => x.contains(b))) x = x.parentElement;
    return x || m;
  };

  // Overlay elements.
  const style = document.createElement('style');
  style.textContent =
    '@keyframes rtSelPulse{0%,100%{outline-color:' + ORANGE + '}50%{outline-color:#ffc38a}}' +
    '#rt-sel-tip button{font:inherit;border-radius:6px;padding:6px 12px;cursor:pointer}';
  const spot = document.createElement('div');
  Object.assign(spot.style, {
    position: 'fixed', zIndex: Z, pointerEvents: 'none', borderRadius: '6px',
    outline: '3px solid ' + ORANGE, outlineOffset: '2px',
    animation: 'rtSelPulse 1.4s ease-in-out infinite', transition: 'all .15s ease', display: 'none',
  });
  const tip = document.createElement('div');
  tip.id = 'rt-sel-tip';
  Object.assign(tip.style, {
    position: 'fixed', zIndex: Z + 1, maxWidth: '280px', background: '#fff', color: '#1f2328',
    borderRadius: '10px', padding: '12px 14px', boxShadow: '0 8px 24px rgba(0,0,0,.25)',
    font: '14px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif', borderTop: '4px solid ' + ORANGE,
  });
  document.body.append(style, spot, tip);

  let step = 'item';
  let finished = false;
  let waitingForSpecifications = false;
  let shownKey = '';
  let wasOpen = false;
  let reachedSelected = false;
  let priceWasTicked = false;
  let savedCount = 0;
  let priceKept = 0;

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

  // Next to a target: right, else left, above, below.
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
      above: () => (r.top - gap - t.height >= gap) && [clampLeft(r.right - t.width), r.top - gap - t.height],
      below: () => (r.bottom + gap + t.height <= vh - gap) && [clampLeft(r.left), r.bottom + gap],
    };
    for (const o of [side, 'right', 'left', 'above', 'below'].filter(Boolean)) {
      const p = opts[o] && opts[o]();
      if (p) { tip.style.left = p[0] + 'px'; tip.style.top = p[1] + 'px'; return; }
    }
    tip.style.left = clampLeft(r.left) + 'px';
    tip.style.top = clampTop(r.bottom + gap) + 'px';
  }

  // In the item window: the empty left column under the wizard steps.
  function placeInLeftColumn() {
    const s = stepperBox();
    if (!s) return place(null);
    const r = s.getBoundingClientRect(), t = tip.getBoundingClientRect(), gap = 12;
    const width = Math.max(200, Math.min(280, r.width + 40));
    tip.style.maxWidth = width + 'px';
    tip.style.left = Math.max(gap, r.left - 8) + 'px';
    tip.style.top = Math.max(gap, Math.min(r.bottom + 16, innerHeight - t.height - 70)) + 'px';
  }

  // Highlight a box, clipped to the visible part of its scroll area (and the window) so it never spills out.
  const scrollParent = (el) => { let x = el && el.parentElement; while (x && x !== document.body) { const o = getComputedStyle(x).overflowY; if (/(auto|scroll)/.test(o) && x.scrollHeight > x.clientHeight) return x; x = x.parentElement; } return null; };
  function highlight(el, clip) {
    if (!el) { spot.style.display = 'none'; return; }
    const r = el.getBoundingClientRect();
    const c = (clip || (el.nodeType ? scrollParent(el) : null));
    const cr = c ? c.getBoundingClientRect() : { top: 0, left: 0, bottom: innerHeight, right: innerWidth };
    const top = Math.max(r.top, cr.top, 0), bottom = Math.min(r.bottom, cr.bottom, innerHeight);
    const left = Math.max(r.left, cr.left, 0), right = Math.min(r.right, cr.right, innerWidth);
    if (bottom - top < 4 || right - left < 4) { spot.style.display = 'none'; return; }
    Object.assign(spot.style, { display: 'block', top: top - 3 + 'px', left: left - 3 + 'px', width: right - left + 6 + 'px', height: bottom - top + 6 + 'px' });
  }

  function go(id) { if (step === id) return; step = id; shownKey = ''; }

  function finish() {
    finished = true;
    spot.style.display = 'none';
    tip.style.maxWidth = '320px';
    render('<b>Done.</b> ' + (savedCount ? savedCount + ' item' + (savedCount > 1 ? 's have' : ' has') + ' a selection now. ' : '') +
      'To change one later, click its <b>+</b>, choose <b>Selection</b>, then <b>Clear Item</b> and choose again.', [{ label: 'Close', primary: true, onClick: stop }]);
    place(null);
    setTimeout(stop, 15000);
  }

  function tick() {
    if (finished) return;

    // afterSpecifications(): stay hidden until the specification guide is finished.
    if (waitingForSpecifications) {
      const g = window.__rtSpecGuide;
      const st = g && g.status ? g.status() : null;
      tip.style.display = 'none';
      spot.style.display = 'none';
      if (!st || st.closedByUser) return stop();
      if (!st.finished) return;
      try { g.stop(); } catch (e) { /* already gone */ }
      waitingForSpecifications = false;
      tip.style.display = '';
      shownKey = '';
    }

    const d = itemDialog();
    const head = (k) => '<div style="font-size:12px;color:#57606a;margin-bottom:4px">Selections · step ' + k + ' of 5</div>';
    const close = { label: 'Close guide', onClick: stop };
    const done = { label: 'Done', primary: true, onClick: finish };

    // Item window closed: count it if the wizard reached Selected Item.
    if (!d && wasOpen) {
      if (reachedSelected) { savedCount++; if (priceWasTicked) priceKept++; }
      reachedSelected = false;
      priceWasTicked = false;
      go('item');
    }
    wasOpen = !!d;

    if (d) {
      const w = wizardStep();
      if (!onSelTab()) {
        go('tab');
        const t = tabBtn();
        highlight(t);
        tip.style.maxWidth = '280px';
        render(head(2) + 'Click the <b>Selection</b> tab.', [close]);
        place(t, 'below');
        return;
      }

      if (w === 'question') {
        go('question');
        const arrow = closedArrowIn(qGrid());
        if (!questionRows().length) {
          highlight(arrow ? (arrow.closest('.ag-cell') || arrow) : qGrid());
          render(head(3) + '<b>Pick a selection question.</b> Click the arrow next to a category (for example <b>Roofing</b>) to see its questions.', [close]);
        } else if (!questionTicked()) {
          highlight(questionsBox(), qGrid() && qGrid().querySelector('.ag-body-viewport, .ag-body'));
          render(head(3) + 'Tick the <b>question</b> this item is about, for example <b>Roof Type</b> or <b>Gutter Colour</b>.' +
            '<div style="margin-top:6px;color:#57606a">Not in the list? Use <b>+ Question</b> at the bottom.</div>', [close]);
        } else {
          highlight(continueBtn());
          render(head(3) + 'Question picked. Click <b>Continue</b>.', [close]);
        }
        placeInLeftColumn();
        return;
      }

      if (w === 'items') {
        go('items');
        const p = priceBox();
        priceWasTicked = !!(p && p.checked);
        const warn = '<div style="margin-top:6px;color:#9a6700"><b>Note:</b> with <b>Use Selected Item Price as Unit Cost</b> ticked (bottom left), this item\'s unit cost becomes the product\'s price. Untick it to keep your current price.</div>';
        if (!productTicked()) {
          highlight(cardsArea());
          render(head(4) + 'Tick the <b>product</b> to use (the box at the top right of its card). Or use <b>Enter manually</b> / <b>Import from URL</b>.' + (priceWasTicked ? warn : ''), [close]);
        } else {
          highlight(continueBtn());
          render(head(4) + 'Product picked. Click <b>Continue</b>.' + (priceWasTicked ? warn : ''), [close]);
        }
        placeInLeftColumn();
        return;
      }

      if (w === 'selected') {
        go('selected');
        reachedSelected = true;
        const c = closeBtn();
        highlight(c);
        render(head(5) + '<b>Selection saved</b> for this item. Click <b>Close</b> to go back to your estimate.' +
          '<div style="margin-top:6px;color:#57606a">Picked the wrong one? <b>Clear Item</b> lets you choose again.</div>', [close]);
        placeInLeftColumn();
        return;
      }

      spot.style.display = 'none';
      render(head(3) + 'Loading...', [close]);
      placeInLeftColumn();
      return;
    }
    tip.style.maxWidth = '320px';

    if (!mainGrid() || !rowsLoaded()) {
      spot.style.display = 'none';
      render('Open the project\'s <b>Cost Assistant</b> to add selections.', [close]);
      place(null);
      return;
    }

    const sm = selMenuItem();
    if (sm) {
      go('menu');
      highlight(sm);
      render(head(2) + 'Choose <b>Selection</b>.', [close]);
      place(sm, 'right');
      return;
    }

    // Step 1: an item's +, opening a category first if none is open.
    go('item');
    const plus = itemPluses()[0];
    const counter = savedCount ? '<div style="margin-top:6px;color:#1a7f37">' + savedCount + ' item' + (savedCount > 1 ? 's' : '') + ' done. Add another, or click Done.</div>' : '';
    if (!plus) {
      const arrow = closedArrowIn(mainGrid());
      highlight(arrow ? (arrow.closest('.ag-cell') || arrow) : null);
      render(head(1) + '<b>Now let\'s add selections.</b> Open a category with its arrow to see its items.' + counter,
        savedCount ? [done, close] : [close]);
      place(arrow ? (arrow.closest('.ag-cell') || arrow) : null, 'right');
      return;
    }
    highlight(plus);
    render(head(1) + (savedCount ? '' : '<b>Now let\'s add selections</b> (products your client chooses, like roof tiles or appliances). ') +
      'Click the <b>+</b> on the item.' + counter,
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
    if (!finished) window.__rtSelGuide.closedByUser = true;
  }

  window.__rtSelGuide = {
    stop,
    closedByUser: false,
    // Run right after the specification guide: wait until it is finished, then start by itself.
    afterSpecifications: () => {
      waitingForSpecifications = true;
      tip.style.display = 'none';
      spot.style.display = 'none';
      return 'Selection guide waiting for the specification guide';
    },
    status: () => ({ step, finished, waitingForSpecifications, savedCount, priceKept: priceKept > 0, itemOpen: !!itemDialog(), closedByUser: window.__rtSelGuide.closedByUser, url: location.href }),
    check: () => 'grid:' + !!mainGrid() + ' rows:' + rowsLoaded() + ' pluses:' + itemPluses().length + ' menu:' + !!menu() + ' selItem:' + !!selMenuItem() +
      ' dialog:' + !!itemDialog() + ' selTab:' + onSelTab() + ' wizard:' + wizardStep() + ' questions:' + questionRows().length + ' qTicked:' + questionTicked() +
      ' cards:' + cardBoxes().length + ' pTicked:' + productTicked() + ' priceBox:' + !!priceBox() + ' continue:' + !!continueBtn() + ' close:' + !!closeBtn(),
  };
  tick();
  return 'ReadyTeam selection guide started: ' + (rowsLoaded() ? 'estimate rows found' : 'waiting for Cost Assistant rows');
})();
```
