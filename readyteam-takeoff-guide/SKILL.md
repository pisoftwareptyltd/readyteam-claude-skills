---
name: readyteam-takeoff-guide
description: Show the user how to measure an item's quantity from a plan in ReadyTeam (takeoff) with an on-screen guide in their Chrome tab - in Cost Assistant click the takeoff icon in an item's Qty, + Measurement, choose the UOM, upload their plan PDF (Upload Plan, Plan Name, Process), wait for it to load, choose the Area tool and draw on the plan. The user does the clicking, uploading and drawing; the guide points at each control. Use right after selections (readyteam-selection-guide, or onboarding), or when the user asks how to do a takeoff, measure from plans, upload plans or use the Area tool in ReadyTeam.
---

# ReadyTeam: guide the user to measure from a plan (takeoff)

The user does the takeoff themselves, with their own plan. You put a guide on their ReadyTeam page. The guide is one script (in the "Guide script" section at the end of this skill) that points at each control, puts the cursor in the fields, and moves on by itself. **Do not take screenshots step by step, do not upload a plan, and do not draw for the user.**

Where it lives: the project's **Cost Assistant** grid.

- Each **item**'s **Qty** cell has two icons: the **takeoff** (ruler) icon and a calculator. The takeoff icon opens **Takeoff Measurement**: the project's measurements (name, UOM, total, label, with tick boxes), **Clear**, **+ Measurement** and **Process**.
- **+ Measurement** opens **Create Measurement**: **Measurement** (already filled with the item's name) and **UOM** (m2, m, m3, Each). **Add** creates it, links it to the item (the item's UOM becomes the measurement's UOM), and opens the **takeoff screen** by itself.
- The takeoff screen: a toolbar along the top (Cursor, Ruler, Angle, Arc, Mark, **Area**, Line, Polygon, Count, Deduct, Text, Style, Undo), **Upload Plan** and the plan list on the left, the measurements on the right (the new one with its total, starting at 0), **Estimated (Ex)** and **Close** at the top right.
- **Upload Plan**: "Click to select a file" (a PDF), **Plan Name** (required), **Plan Date** (optional), then **Process**. The plan takes a little while to upload and show.
- **Area** measures a surface (m2): with Area on, the user clicks around the area's corners on the plan to draw its shape; the measurement's total goes up. **Line** is for lengths (m), **Count** for Each.
- **Close** returns to the grid; the item's Qty follows the measurement.
- **Process** in Takeoff Measurement opens the takeoff screen for the ticked measurements (an item's own measurement is ticked when it has one).

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
- **Do the work yourself.** Once the user has given a file or a choice, do every ReadyTeam click, upload, typing and navigation yourself. Reuse what you already have in this chat (the logo, the brand colours, the company name, earlier answers) instead of asking again. Ask only for what you cannot get or decide: files only the user has and real choices.
- **Keep going; don't ask twice.** Once the user has started, carry on by yourself: no "Shall we start?", "Ready for the next step?", "Shall I import?" or "Shall I save?" questions, and never ask the same thing twice in different words. Say in one line what you are about to do and do it. Ask only when you truly cannot go on without the user:
  - you need a file only they have (ask once, see "Files");
  - a real choice the file or the screen cannot answer (for example rows ReadyTeam rejected);
  - something failed, or they must act themselves (sign in, click through an on-screen guide).
  The user can type **stop**, **pause** or a change at any time; then stop and follow what they say.

## Steps

**Right after the selection guide** (the usual way, also in onboarding): the create-project, estimation, allowance, specification or selection skill loads this guide too and calls `window.__rtTakeoffGuide.afterSelections()`. It waits, hidden, until the selection guide is finished (the user clicks Done or Skip there), then takes over by itself. Nothing else to do here until the user replies: go to step 5.

**On its own** (the estimate is in):

1. Load the Claude in Chrome tools in one ToolSearch call if they are deferred, including `javascript_tool`. Use the ReadyTeam tab that is already open, on whichever ReadyTeam site the user is using (https://app.readyteam.ai/ or https://ready-team-staging.web.app/); stay on that site. If a login page shows, ask the user to sign in there, then ask as buttons: **I've signed in** · **I need help signing in**.
2. Make sure the tab shows the project's **Cost Assistant** with estimate rows. If not, ask which project and open its Cost Assistant.
3. Run the full text of the guide script below, unchanged, in that tab with `javascript_tool`.
4. Tell the user in two or three plain lines:
   "I've put a guide on your ReadyTeam screen. Click the ruler icon in an item's Qty, add a measurement, upload your plan PDF, then choose Area and draw on the plan. Have your plan PDF ready. Tell me when you've finished, or if you get stuck."
5. Then ask, as buttons: "Tell me when you've finished." Options: **I'm done** · **I'm stuck** · **Skip this part**. Wait for the user. Do not poll or take screenshots while they work. Uploading and drawing take time.
6. When they reply, run `window.__rtTakeoffGuide && window.__rtTakeoffGuide.status()` once with `javascript_tool`:
   - `finished: true`: tell the user the measured total (`total` and `uom`) and that the item's Qty now follows it; they can open the ruler icon again to add or change measurements.
   - `waitingForSelections: true`: the selection step isn't finished yet; help with that first.
   - not finished: ask what they see, or take one screenshot, and explain the next step in plain words (for example, the plan is still uploading, or Area isn't selected). Run the script again if they want the guide back (it restarts cleanly).

## The steps the guide shows

1. **Takeoff icon**: if no category is open, points at a category's arrow. If the **Qty** column is scrolled out of view to the side, it highlights the grid's scroll bar and tells the user which way to scroll (a two-finger sideways swipe, Shift + mouse wheel, or the scroll bar, which a Mac hides until you scroll) until Qty shows. Then it points at an item's ruler icon in **Qty**.
2. **+ Measurement**: points at **+ Measurement** in Takeoff Measurement. If the item already has a measurement ticked, it adds that **Process** opens it on the takeoff screen instead.
3. **UOM**: in Create Measurement, the name is already filled in; puts the cursor in **UOM** ("m2 for areas like floors and walls, m for lengths, m3 for volumes, Each for counts"), then points at **Add**.
4. **Upload Plan**: on the takeoff screen, points at **Upload Plan** (skipped if a plan is already open; if plans are listed on the left but none is open, it points at the plan to click).
5. **Plan file and name**: points at "Click to select a file" ("choose your plan PDF"), then puts the cursor in **Plan Name**, then points at **Process** (while the file is still loading, "wait until Process turns bright orange").
6. **Wait**: "Uploading your plan..." while ReadyTeam shows "Your request is being processed", until the plan opens. The plan counts as open when the plan list on the left has an active entry with the plan's picture, or the zoom at the bottom reads more than 0 %.
7. **Measurement and tool**: "Your plan is ready. You are measuring **<measurement>** (<unit>), shown on the right." It points at the tool that fits the unit: **Area** for m2 (Polygon for odd shapes), **Line** for m, **Count** for Each.
8. **Draw, then Close**: explains how to draw with the chosen tool (**Area**: press and hold at one corner, drag to the opposite corner, let go; **Polygon**: click each corner; **Line**: click start, each turn and end; **Count**: click each thing). As soon as the user draws on the plan, it says "Drawn" and points at **Close** (top right) to save it to the item. When the takeoff screen closes, it finishes: the item's Qty shows the measured total.

Tips never cover the plan while drawing: they sit below the measurement panel on the right (or top right, under the toolbar, if there is no room).

## Rules

- Never upload a file, draw, or change measurements for the user.
- Do not click **Clear** in Takeoff Measurement (it clears ticked measurements) or delete plans or measurements.
- The guide closes with its Close guide button or Escape (Escape is left to ReadyTeam while a ReadyTeam window is open).

## Status

Plan upload to Close checked live on P1058 (Nov 2026, test plan, item 1.1, measurement in m2): after Process the plan is drawn on a full-screen canvas, so the old size-based check never saw it and the guide stayed on "Uploading" then "Upload Plan" (where users got stuck); the plan list entry `.item.active` with the uploaded image, and the zoom (`.zoom-slider span`, 0 before a plan, 100 after), are reliable. The measurement shows in the right panel (`.group-header`, name and unit); opened from an estimate it cannot be changed (ReadyTeam warns "You cannot change the takeoff group when accessing this from an estimate"), so the user does not pick it. Area is a press-and-drag rectangle. The panel total does **not** change while the screen is open (it updates after Close), so the guide notices drawing from mouse presses on the canvas while a drawing tool is on. After Close the item's Qty updated at once (47.98 then 93.70 m2). Not handled: in the Takeoff Measurement list, a measurement already ticked for the item may be scrolled out of view, so the guide can't always say to click Process instead of + Measurement. Scroll-to-Qty step checked live on P1059 (Nov 2026, window 1078 px wide): after opening a category, scrolling the grid fully right makes the guide see Qty as off to the left with no ruler icons in view; scrolling back shows Qty and 2 icons again. The bar is `.ag-body-horizontal-scroll-viewport` (650 px wide, beside the pinned Description column) and is hidden on a Mac until scrolled. Checked on a live estimate (P1058, item 1.1, Nov 2026), up to the Upload Plan popup: the Qty takeoff icon is an `img` whose file name contains "takeoff"; the popups are `lib-select-takeoff-group` (Takeoff Measurement), `lib-takeoff-group` (Create Measurement, UOM is an `ng-select`), `lib-takeoff-dialogue` (the takeoff screen), `lib-takeoff-plan-upload` (Upload Plan, `input[type=file][accept=.pdf]`, Plan Name input); toolbar tools are `a.item` and the active one's parent has the `active` class; the measurement's total is a number input in the right panel's row for that measurement. That run created a measurement "Home Owners Warranty Insurance" (m2) on item 1.1, which changed its UOM from m to m2. Also checked live with the guide on screen: steps 1 to 5 found their controls (ruler icon, + Measurement, UOM with the cursor in it and the tip to its left, Upload Plan, the file area); Process in Takeoff Measurement with the item's measurement ticked opens the takeoff screen. **Not yet seen:** the plan after upload and drawing with Area. The guide treats "a plan is showing" as a canvas, image or embedded page wider than 300px in the middle of the takeoff screen, or a plan in the left list; on the first real run, note whether it detects the upload and the total, and update the guide script if needed. `window.__rtTakeoffGuide.check()` lists what the guide can see.

## Guide script

```js
// ReadyTeam "measure from a plan" (takeoff) guide.
// Run once in the ReadyTeam tab on the project's Cost Assistant (or call afterSelections() to follow the selection guide).
// Check progress afterwards with: window.__rtTakeoffGuide.status()
(() => {
  if (window.__rtTakeoffGuide && window.__rtTakeoffGuide.stop) window.__rtTakeoffGuide.stop();

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
  const btnIn = (root, re) => root && [...root.querySelectorAll('button, a, [role=button]')].find((b) => visible(b) && re.test(clean(b.innerText)));
  const host = (tag) => [...document.querySelectorAll(tag)].map((h) => h.closest('mat-dialog-container') || h).find(visible) || null;

  // The popups and screens, from the top-most down.
  const uploadDlg = () => host('lib-takeoff-plan-upload');
  const createDlg = () => host('lib-takeoff-group');
  const takeoffScreen = () => host('lib-takeoff-dialogue');
  const listDlg = () => host('lib-select-takeoff-group');

  // Cost Assistant grid.
  const grid = () => [...document.querySelectorAll('.ag-root-wrapper')].find((g) => visible(g) && !g.closest('mat-dialog-container') && g.querySelector('.ag-cell[col-id="qty"], .ag-header-cell[col-id="qty"]')) || null;
  const rowsLoaded = () => { const g = grid(); return !!(g && g.querySelector('.ag-row')); };
  const isGroupRow = (row) => !!row && row.classList.contains('ag-row-group');
  // The grid's scroll bar at the bottom, and the visible part of the scrolling columns.
  // On a Mac the bar is hidden until you scroll (ag-scrollbar-invisible), so use its box, not its visibility.
  const hScroll = () => { const g = grid(); const v = g && g.querySelector('.ag-body-horizontal-scroll-viewport'); return v && v.getBoundingClientRect().width > 20 ? v : null; };
  const colsBox = () => { const g = grid(); const v = g && (g.querySelector('.ag-body-horizontal-scroll-viewport') || g.querySelector('.ag-center-cols-viewport') || g); return v.getBoundingClientRect(); };
  // An element is really visible in the grid: on screen and not scrolled out sideways behind the grid's edge.
  const inGrid = (el) => { const a = el.getBoundingClientRect(), b = colsBox(); return a.left >= b.left - 2 && a.right <= b.right + 2; };
  const takeoffIcons = () => { const g = grid(); return g ? [...g.querySelectorAll('.ag-row .ag-cell[col-id="qty"] img')].filter((i) => /takeoff/i.test(i.getAttribute('src') || '') && visible(i) && inView(i) && inGrid(i) && !isGroupRow(i.closest('.ag-row'))) : []; };
  // Items are showing (a category is open) on screen.
  const itemRowsShown = () => { const g = grid(); return !!g && [...g.querySelectorAll('.ag-row')].some((r) => !isGroupRow(r) && visible(r) && inView(r)); };
  // Where the Qty column is: 'in' (showing), 'left' or 'right' (scrolled out of view that way).
  const qtyWhere = () => {
    const g = grid();
    const h = g && [...g.querySelectorAll('.ag-header-cell[col-id="qty"]')].find(visible);
    if (!h) { const v = g && g.querySelector('.ag-body-horizontal-scroll-viewport'); return v && v.scrollLeft > 0 && v.scrollLeft + v.clientWidth >= v.scrollWidth - 2 ? 'left' : 'right'; }
    const a = h.getBoundingClientRect(), b = colsBox();
    if (a.left >= b.right - 20) return 'right';
    if (a.right <= b.left + 20) return 'left';
    return inGrid(h) ? 'in' : (a.right > b.right ? 'right' : 'left');
  };
  const closedArrow = () => { const g = grid(); return g && [...g.querySelectorAll('.ag-row-group .ag-group-contracted')].find((e) => visible(e) && inView(e)); };

  // Create Measurement.
  const uomSelect = () => { const d = createDlg(); return d && [...d.querySelectorAll('ng-select, mat-select, select')].find(visible); };
  const uomValue = () => { const u = uomSelect(); const v = u && u.querySelector('.ng-value, .mat-mdc-select-value-text'); return v ? clean(v.innerText) : (u && u.value) || ''; };
  const uomOpen = () => !!document.querySelector('ng-dropdown-panel');

  // Takeoff screen.
  const tool = (name) => { const s = takeoffScreen(); return s && [...s.querySelectorAll('a.item')].find((a) => visible(a) && clean(a.innerText).toLowerCase() === name); };
  const toolActive = (name) => { const t = tool(name); return !!(t && t.parentElement && t.parentElement.classList.contains('active')); };
  const toolbar = () => { const t = tool('area'); return t && (t.closest('.menu, ul') || t.parentElement); };
  const uploadPlanBtn = () => btnIn(takeoffScreen(), /upload plan/i);
  // The plan is open: the plan list on the left has an active entry with the plan's picture,
  // or the zoom at the bottom shows more than 0 %. (The plan itself is drawn on a full-screen canvas,
  // so its size or position says nothing.)
  const planShowing = () => {
    const s = takeoffScreen();
    if (!s) return false;
    if ([...s.querySelectorAll('.item.active img')].some((i) => /\/uploads/.test(i.getAttribute('src') || '') && visible(i))) return true;
    const z = s.querySelector('.zoom-slider span');
    return !!(z && (parseFloat(z.textContent) || 0) > 0);
  };
  // Plans are listed on the left but none is open.
  const planListItems = () => { const s = takeoffScreen(); return s ? [...s.querySelectorAll('.item')].filter((e) => visible(e) && [...e.querySelectorAll('img')].some((i) => /\/uploads/.test(i.getAttribute('src') || ''))) : []; };
  // ReadyTeam's "Your request is being processed" overlay while the plan uploads.
  const processing = () => { const s = takeoffScreen(); return !!(s && /request is being processed/i.test(s.innerText)); };
  // The measurement being measured (right panel): its row, name and unit.
  const measureRow = () => { const s = takeoffScreen(); return s && [...s.querySelectorAll('.group-header')].find(visible); };
  const measureName = () => { const r = measureRow(); return r ? clean(r.innerText).replace(/\s*\b(m2|m3|m|each|no|nr|lm)\s*$/i, '') : ''; };
  const measureUom = () => { const r = measureRow(); const m = r && clean(r.innerText).match(/\b(m2|m3|m|each|no|nr|lm)\s*$/i); return m ? m[1].toLowerCase() : ''; };
  // Which tool fits the unit, and how to draw with it.
  const toolFor = (u) => (u === 'm' || u === 'lm') ? 'line' : (u === 'each' || u === 'no' || u === 'nr') ? 'count' : 'area';
  const drawHow = (name) => name === 'line'
    ? 'click where the length starts, then click at each turn and where it ends'
    : name === 'count' ? 'click once on each thing you are counting'
    : name === 'polygon' ? 'click each corner of the shape, and finish back at the first corner'
    : 'press and hold at one corner of the area, drag to the opposite corner, then let go';
  const drawTools = ['area', 'line', 'polygon', 'count', 'deduct', 'ruler', 'arc'];
  const activeTool = () => drawTools.find((n) => toolActive(n)) || '';
  // The measurement's total in the right panel (the newest / first one).
  const totals = () => { const s = takeoffScreen(); return s ? [...s.querySelectorAll('.group-header input[type=number], input[type=number]')].filter((i) => visible(i) && i.getBoundingClientRect().left > innerWidth / 2) : []; };
  const total = () => { const t = totals(); return t.length ? Math.max(...t.map((i) => parseFloat(i.value) || 0)) : 0; };
  const totalRowUom = () => { const t = totals().find((i) => (parseFloat(i.value) || 0) === total()); const row = t && t.closest('.group-header'); const m = row && clean(row.innerText).match(/\b(m2|m3|m|each)\b/i); return m ? m[1] : ''; };

  // Upload Plan.
  const fileInput = () => { const d = uploadDlg(); return d && d.querySelector('input[type=file]'); };
  const fileArea = () => { const f = fileInput(); if (!f) return null; let x = f.parentElement; for (let i = 0; i < 3 && x && x.getBoundingClientRect().height < 60; i++) x = x.parentElement; return x; };
  const fileChosen = () => { const f = fileInput(); const d = uploadDlg(); return !!(f && f.files && f.files.length) || !!(d && /\.pdf\b/i.test(d.innerText)); };
  const planName = () => { const d = uploadDlg(); return d && [...d.querySelectorAll('input')].find((i) => visible(i) && /plan name/i.test(i.placeholder || '')); };

  // Overlay elements.
  const style = document.createElement('style');
  style.textContent =
    '@keyframes rtTakeoffPulse{0%,100%{outline-color:' + ORANGE + '}50%{outline-color:#ffc38a}}' +
    '#rt-takeoff-tip button{font:inherit;border-radius:6px;padding:6px 12px;cursor:pointer}';
  const spot = document.createElement('div');
  Object.assign(spot.style, {
    position: 'fixed', zIndex: Z, pointerEvents: 'none', borderRadius: '6px',
    outline: '3px solid ' + ORANGE, outlineOffset: '2px',
    animation: 'rtTakeoffPulse 1.4s ease-in-out infinite', transition: 'all .15s ease', display: 'none',
  });
  const tip = document.createElement('div');
  tip.id = 'rt-takeoff-tip';
  Object.assign(tip.style, {
    position: 'fixed', zIndex: Z + 1, maxWidth: '300px', background: '#fff', color: '#1f2328',
    borderRadius: '10px', padding: '12px 14px', boxShadow: '0 8px 24px rgba(0,0,0,.25)',
    font: '14px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif', borderTop: '4px solid ' + ORANGE,
  });
  document.body.append(style, spot, tip);

  let step = 'icon';
  let finished = false;
  let waitingForSelections = false;
  let shownKey = '';
  let uploadSeen = false;
  let uploadClosedAt = 0;
  let focusedFor = '';
  let focusUntil = 0;
  let lastTotal = 0;
  let lastUom = '';
  let drewAt = 0;        // when the user last drew on the plan with a drawing tool
  let drewCount = 0;
  let drewOnScreen = false; // drew during this visit to the takeoff screen

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

  // Next to a target: preferred side first, then right, left, above, below.
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
      above: () => (r.top - gap - t.height >= gap) && [clampLeft(r.left), r.top - gap - t.height],
      below: () => (r.bottom + gap + t.height <= vh - gap) && [clampLeft(r.left), r.bottom + gap],
    };
    for (const o of [side, 'right', 'left', 'above', 'below'].filter(Boolean)) {
      const p = opts[o] && opts[o]();
      if (p) { tip.style.left = p[0] + 'px'; tip.style.top = p[1] + 'px'; return; }
    }
    tip.style.left = clampLeft(r.left) + 'px';
    tip.style.top = clampTop(r.bottom + gap) + 'px';
  }

  // On the takeoff screen: top right, under the toolbar and left of the measurements panel, away from the plan.
  function placeOnScreen() {
    // Below the measurement panel on the right, so the plan stays clear; if there is no room, top-right under the toolbar.
    const t = tip.getBoundingClientRect(), gap = 12;
    const s = takeoffScreen();
    const search = s && [...s.querySelectorAll('input')].find((i) => /search measurement/i.test(i.placeholder || '') && visible(i));
    if (search) {
      const sr = search.getBoundingClientRect();
      // The measurement and its shapes listed under the search box.
      const rows = [...s.querySelectorAll('.group-header, .group-item, .item')].filter((e) => { const r = e.getBoundingClientRect(); return visible(e) && r.left > innerWidth / 2 && r.top >= sr.top && r.top < innerHeight * 0.7; });
      const bottom = Math.max(sr.bottom, ...rows.map((r) => r.getBoundingClientRect().bottom));
      if (bottom + gap + t.height < innerHeight - gap) {
        tip.style.top = bottom + gap + 'px';
        tip.style.left = Math.max(gap, Math.min(sr.left, innerWidth - t.width - gap)) + 'px';
        return;
      }
    }
    const bar = toolbar();
    const top = bar ? bar.getBoundingClientRect().bottom + gap : 90;
    const right = search ? search.getBoundingClientRect().left - gap - 40 : innerWidth - gap;
    tip.style.top = top + 'px';
    tip.style.left = Math.max(gap, right - t.width) + 'px';
  }


  function highlight(el) {
    if (!el) { spot.style.display = 'none'; return; }
    const r = el.getBoundingClientRect();
    Object.assign(spot.style, { display: 'block', top: r.top - 3 + 'px', left: r.left - 3 + 'px', width: r.width + 6 + 'px', height: r.height + 6 + 'px' });
  }

  function focusOnce(id, el) {
    if (focusedFor !== id) { focusedFor = id; focusUntil = Date.now() + 1500; }
    const i = el && (el.matches('input, textarea') ? el : el.querySelector('input'));
    if (i && Date.now() < focusUntil && document.activeElement !== i) { try { i.focus({ preventScroll: true }); } catch (e) { /* no focus */ } }
  }

  function go(id) { if (step === id) return; step = id; shownKey = ''; }

  function finish() {
    finished = true;
    spot.style.display = 'none';
    // The panel total only updates after the takeoff screen closes, so after drawing don't quote the old figure.
    render('<b>Done.</b> ' + (drewCount ? 'Your measurement is saved, and the item\'s <b>Qty</b> now shows the measured total (it can take a few seconds to update). ' :
      lastTotal ? 'You measured <b>' + lastTotal + (lastUom ? ' ' + lastUom : '') + '</b>, and the item\'s Qty follows it. ' : '') +
      'To measure more, click the ruler icon in an item\'s <b>Qty</b> again.', [{ label: 'Close', primary: true, onClick: stop }]);
    place(null);
    setTimeout(stop, 15000);
  }

  function tick() {
    if (finished) return;

    // afterSelections(): stay hidden until the selection guide is finished.
    if (waitingForSelections) {
      const g = window.__rtSelGuide;
      const st = g && g.status ? g.status() : null;
      tip.style.display = 'none';
      spot.style.display = 'none';
      if (!st || st.closedByUser) return stop();
      if (!st.finished) return;
      try { g.stop(); } catch (e) { /* already gone */ }
      waitingForSelections = false;
      tip.style.display = '';
      shownKey = '';
    }

    const head = (k) => '<div style="font-size:12px;color:#57606a;margin-bottom:4px">Takeoff · step ' + k + ' of 8</div>';
    const close = { label: 'Close guide', onClick: stop };
    const done = { label: 'Done', primary: true, onClick: finish };
    const t = total();
    if (t > 0) { lastTotal = Math.round(t * 100) / 100; lastUom = totalRowUom() || lastUom; }

    // Upload Plan popup.
    const up = uploadDlg();
    if (up) {
      uploadSeen = true;
      uploadClosedAt = 0;
      if (!fileChosen()) {
        go('file');
        highlight(fileArea());
        render(head(5) + 'Click <b>Click to select a file</b> and choose your <b>plan PDF</b>.', [close]);
        place(up, 'left');
      } else if (!planName() || !clean(planName().value)) {
        go('name');
        const n = planName();
        highlight(n);
        focusOnce('name', n);
        render(head(5) + 'Type a <b>Plan Name</b>, for example <b>Ground Floor</b>. The Plan Date is optional.', [close]);
        place(up, 'left');
      } else {
        go('process');
        const p = btnIn(up, /^process$/i);
        highlight(p);
        render(head(5) + (p && p.disabled ? 'Your file is loading. Wait until <b>Process</b> turns bright orange, then click it.' : 'Click <b>Process</b> to upload your plan.'), [close]);
        place(up, 'left');
      }
      return;
    }

    // Create Measurement popup.
    const cr = createDlg();
    if (cr) {
      const u = uomSelect();
      if (!uomValue() && !uomOpen()) {
        go('uom');
        highlight(u);
        focusOnce('uom', u);
        render(head(3) + 'The name is filled in for you. Now choose the <b>UOM</b>:<ul style="margin:6px 0 0 18px;padding:0"><li><b>m2</b> for areas like floors and walls</li><li><b>m</b> for lengths</li><li><b>m3</b> for volumes</li><li><b>Each</b> for counts</li></ul>', [close]);
        place(cr, 'left');
      } else if (uomOpen()) {
        go('uom');
        highlight(u);
        render(head(3) + 'Pick the unit from the list: <b>m2</b> for areas, <b>m</b> lengths, <b>m3</b> volumes, <b>Each</b> counts.', [close]);
        place(cr, 'left');
      } else {
        go('add');
        const a = btnIn(cr, /^add$/i);
        highlight(a);
        render(head(3) + 'Click <b>Add</b>. The takeoff screen opens by itself.', [close]);
        place(cr, 'left');
      }
      return;
    }

    // Takeoff screen.
    const s = takeoffScreen();
    if (s) {
      if (uploadSeen && !uploadClosedAt) uploadClosedAt = Date.now();
      const plan = planShowing();
      if (!plan) {
        if (processing() || (uploadClosedAt && Date.now() - uploadClosedAt < 120000)) {
          go('wait');
          spot.style.display = 'none';
          render(head(6) + '<b>Uploading your plan...</b> This can take a minute. It will show here when it\'s ready.', [close]);
          placeOnScreen();
          return;
        }
        const items = planListItems();
        if (items.length) {
          go('open-plan');
          highlight(items[0]);
          render(head(6) + 'Your plan is in the list on the left. Click it to open it.', [close]);
          place(items[0], 'right');
          return;
        }
        go('upload');
        const b = uploadPlanBtn();
        highlight(b);
        render(head(4) + 'Click <b>Upload Plan</b> to add your plan PDF.', [close]);
        place(b, 'right');
        return;
      }
      uploadClosedAt = 0;
      const want = toolFor(measureUom());
      const cur = activeTool();
      const name = measureName();
      const what = name ? '<b>' + name + '</b>' + (measureUom() ? ' (' + measureUom() + ')' : '') : 'this item';
      // Drawn: show how to save it.
      if (drewOnScreen && cur) {
        go('drawn');
        const c = btnIn(s, /^close$/i);
        highlight(c);
        render(head(8) + '<b>Drawn.</b> Draw more shapes to add to ' + what + ', or click <b>Close</b> (top right) to save the measurement to the item.' +
          '<div style="margin-top:6px;color:#57606a">The total on the right updates after you close. Made a mistake? Click <b>Undo</b>.</div>', [close]);
        placeOnScreen();
        return;
      }
      if (!cur) {
        go('area');
        const tl = tool(want);
        highlight(tl);
        render(head(7) + '<b>Your plan is ready.</b> You are measuring ' + what + ', shown on the right. Click <b>' + want.charAt(0).toUpperCase() + want.slice(1) + '</b> in the toolbar at the top.' +
          (want === 'area' ? '<div style="margin-top:6px;color:#57606a">For an odd-shaped area, use <b>Polygon</b>. For a length, use <b>Line</b>.</div>' : ''), [close]);
        placeOnScreen();
        return;
      }
      go('draw');
      spot.style.display = 'none';
      render(head(8) + '<b>Draw on the plan</b> for ' + what + ': ' + drawHow(cur) + '.' +
        '<div style="margin-top:6px;color:#57606a">Made a mistake? Click <b>Undo</b>.</div>', [close]);
      placeOnScreen();
      return;
    }
    // Left the takeoff screen after drawing: the measurement is saved to the item.
    if (drewOnScreen) {
      drewOnScreen = false;
      return finish();
    }
    uploadSeen = false;
    uploadClosedAt = 0;

    // Takeoff Measurement list.
    const ld = listDlg();
    if (ld) {
      go('add-measurement');
      const b = btnIn(ld, /measurement/i);
      highlight(b);
      const ticked = [...ld.querySelectorAll('.ag-row')].some((r) => r.querySelector('.ag-checked, input[type=checkbox]:checked'));
      render(head(2) + 'Click <b>+ Measurement</b> to add a new measurement for this item.' +
        (ticked ? '<div style="margin-top:6px;color:#57606a">This item already has a measurement ticked. To measure it on your plan instead, click <b>Process</b>.</div>' : ''), [close]);
      place(b, 'above');
      return;
    }

    if (!grid() || !rowsLoaded()) {
      spot.style.display = 'none';
      render('Open the project\'s <b>Cost Assistant</b> to measure from a plan.', [close]);
      place(null);
      return;
    }

    // Step 1: an item's takeoff icon, opening a category first if none is open.
    go('icon');
    const icon = takeoffIcons()[0];
    const counter = lastTotal ? '<div style="margin-top:6px;color:#1a7f37">Last measurement: ' + lastTotal + (lastUom ? ' ' + lastUom : '') + '. Measure another, or click Done.</div>' : '';
    if (!icon && itemRowsShown() && qtyWhere() !== 'in') {
      // Items are open but the Qty column is off to the side: show the user how to scroll to it.
      const dir = qtyWhere();
      const bar = hScroll();
      highlight(bar || grid());
      render(head(1) + '<b>Now let\'s measure from your plan.</b> First scroll the grid to the <b>' + dir + '</b> until you see the <b>Qty</b> column.' +
        '<div style="margin-top:6px;color:#57606a">Point at the item rows, then swipe ' + dir + ' with two fingers on your trackpad, or hold <b>Shift</b> and turn your mouse wheel. ' +
        'You can also drag the scroll bar at the bottom of the grid (it appears when you move over it).</div>' + counter,
        lastTotal ? [done, close] : [{ label: 'Skip', onClick: finish }, close]);
      place(bar || grid(), 'above');
      return;
    }
    if (!icon && itemRowsShown()) {
      // Qty is showing but no item row with a ruler icon is on screen: scroll down to an item.
      const h = grid() && grid().querySelector('.ag-header-cell[col-id="qty"]');
      highlight(h);
      render(head(1) + 'The <b>Qty</b> column is here. Scroll down to an item\'s row (not a category) to see its <b>ruler icon</b>.' + counter,
        lastTotal ? [done, close] : [{ label: 'Skip', onClick: finish }, close]);
      place(h, 'below');
      return;
    }
    if (!icon) {
      const arrow = closedArrow();
      highlight(arrow ? (arrow.closest('.ag-cell') || arrow) : null);
      render(head(1) + '<b>Now let\'s measure from your plan.</b> Open a category with its arrow to see its items.' + counter,
        lastTotal ? [done, close] : [close]);
      place(arrow ? (arrow.closest('.ag-cell') || arrow) : null, 'right');
      return;
    }
    highlight(icon);
    render(head(1) + (lastTotal ? '' : '<b>Now let\'s measure from your plan.</b> ') + 'Click the <b>ruler icon</b> in an item\'s <b>Qty</b>.' +
      (lastTotal ? '' : '<div style="margin-top:6px;color:#57606a">Have your plan PDF ready.</div>') + counter,
      lastTotal ? [done, close] : [{ label: 'Skip', onClick: finish }, close]);
    place(icon, 'right');
  }

  const onKey = (e) => { if (e.key === 'Escape' && !document.querySelector('mat-dialog-container')) stop(); };
  // Notice drawing: a press and release on the plan canvas while a drawing tool is on.
  let downAt = null;
  const onDown = (e) => { const s = takeoffScreen(); downAt = (s && e.target && e.target.tagName === 'CANVAS' && s.contains(e.target) && activeTool()) ? { x: e.clientX, y: e.clientY, tool: activeTool() } : null; };
  const onUp = (e) => {
    if (!downAt) return;
    const moved = Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y);
    if (moved > 8 || downAt.tool !== 'area') { drewAt = Date.now(); drewCount++; drewOnScreen = true; shownKey = ''; }
    downAt = null;
  };
  addEventListener('pointerdown', onDown, true);
  addEventListener('pointerup', onUp, true);
  addEventListener('mousedown', onDown, true);
  addEventListener('mouseup', onUp, true);
  const timer = setInterval(tick, 250);
  addEventListener('keydown', onKey, true);

  function stop() {
    clearInterval(timer);
    removeEventListener('keydown', onKey, true);
    removeEventListener('pointerdown', onDown, true); removeEventListener('pointerup', onUp, true);
    removeEventListener('mousedown', onDown, true); removeEventListener('mouseup', onUp, true);
    style.remove(); spot.remove(); tip.remove();
    if (!finished) window.__rtTakeoffGuide.closedByUser = true;
  }

  window.__rtTakeoffGuide = {
    stop,
    closedByUser: false,
    // Run right after the selection guide: wait until it is finished, then start by itself.
    afterSelections: () => {
      waitingForSelections = true;
      tip.style.display = 'none';
      spot.style.display = 'none';
      return 'Takeoff guide waiting for the selection guide';
    },
    status: () => ({ step, finished, waitingForSelections, total: lastTotal, uom: lastUom, drewShapes: drewCount, closedByUser: window.__rtTakeoffGuide.closedByUser, url: location.href }),
    check: () => 'grid:' + !!grid() + ' icons:' + takeoffIcons().length + ' list:' + !!listDlg() + ' create:' + !!createDlg() + ' uom:' + JSON.stringify(uomValue()) +
      ' screen:' + !!takeoffScreen() + ' uploadBtn:' + !!uploadPlanBtn() + ' plan:' + planShowing() + ' area:' + !!tool('area') + ' areaOn:' + toolActive('area') +
      ' upload:' + !!uploadDlg() + ' file:' + fileChosen() + ' total:' + total() + ' tool:' + activeTool() + ' measuring:' + JSON.stringify(measureName() + ' ' + measureUom()) + ' drew:' + drewCount,
  };
  tick();
  return 'ReadyTeam takeoff guide started: ' + (rowsLoaded() ? 'estimate rows found' : 'waiting for Cost Assistant rows');
})();
```
