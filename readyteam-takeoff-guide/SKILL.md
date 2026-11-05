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
- **Do the work yourself.** Once the user has given a file or a choice, do every ReadyTeam click, upload, typing and navigation yourself. Reuse what you already have in this chat (the logo, the brand colours, the company name, earlier answers) instead of asking again. Ask only for what you cannot get or decide: files only the user has, real choices, and one yes before anything is saved, imported or uploaded.
- **One yes, as a button.** Before a save, import or upload, show what will change and ask once, with options such as **Go ahead**, **Show me first** and **Not now**.

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

1. **Takeoff icon**: opens the first category if none is open, then points at an item's ruler icon in **Qty**.
2. **+ Measurement**: points at **+ Measurement** in Takeoff Measurement. If the item already has a measurement ticked, it adds that **Process** opens it on the takeoff screen instead.
3. **UOM**: in Create Measurement, the name is already filled in; puts the cursor in **UOM** ("m2 for areas like floors and walls, m for lengths, m3 for volumes, Each for counts"), then points at **Add**.
4. **Upload Plan**: on the takeoff screen, points at **Upload Plan** (skipped if a plan is already showing).
5. **Plan file and name**: points at "Click to select a file" ("choose your plan PDF"), then puts the cursor in **Plan Name**, then points at **Process**.
6. **Wait**: "Uploading your plan..." until it shows.
7. **Area**: points at **Area** in the toolbar.
8. **Draw**: "Click each corner of the area on the plan to draw its shape"; when the measurement's total goes above 0, it shows the total and points at **Close**.

Tips never cover the plan while drawing: they sit in the top-right corner, under the toolbar.

## Rules

- Never upload a file, draw, or change measurements for the user.
- Do not click **Clear** in Takeoff Measurement (it clears ticked measurements) or delete plans or measurements.
- The guide closes with its Close guide button or Escape (Escape is left to ReadyTeam while a ReadyTeam window is open).

## Status

Checked on a live estimate (P1058, item 1.1, Nov 2026), up to the Upload Plan popup: the Qty takeoff icon is an `img` whose file name contains "takeoff"; the popups are `lib-select-takeoff-group` (Takeoff Measurement), `lib-takeoff-group` (Create Measurement, UOM is an `ng-select`), `lib-takeoff-dialogue` (the takeoff screen), `lib-takeoff-plan-upload` (Upload Plan, `input[type=file][accept=.pdf]`, Plan Name input); toolbar tools are `a.item` and the active one's parent has the `active` class; the measurement's total is a number input in the right panel's row for that measurement. That run created a measurement "Home Owners Warranty Insurance" (m2) on item 1.1, which changed its UOM from m to m2. Also checked live with the guide on screen: steps 1 to 5 found their controls (ruler icon, + Measurement, UOM with the cursor in it and the tip to its left, Upload Plan, the file area); Process in Takeoff Measurement with the item's measurement ticked opens the takeoff screen. **Not yet seen:** the plan after upload and drawing with Area. The guide treats "a plan is showing" as a canvas, image or embedded page wider than 300px in the middle of the takeoff screen, or a plan in the left list; on the first real run, note whether it detects the upload and the total, and update the guide script if needed. `window.__rtTakeoffGuide.check()` lists what the guide can see.

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
  const takeoffIcons = () => { const g = grid(); return g ? [...g.querySelectorAll('.ag-row .ag-cell[col-id="qty"] img')].filter((i) => /takeoff/i.test(i.getAttribute('src') || '') && visible(i) && inView(i) && !isGroupRow(i.closest('.ag-row'))) : []; };
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
  const planShowing = () => {
    const s = takeoffScreen();
    if (!s) return false;
    const vw = innerWidth;
    const big = [...s.querySelectorAll('canvas, img, svg, object, embed, iframe')].some((e) => {
      if (!visible(e)) return false;
      const r = e.getBoundingClientRect();
      return r.width > 300 && r.height > 200 && r.left > 200 && r.right < vw - 200;
    });
    return big;
  };
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
    const t = tip.getBoundingClientRect(), gap = 12;
    const bar = toolbar();
    const top = bar ? bar.getBoundingClientRect().bottom + gap : 90;
    const panel = takeoffScreen() && [...takeoffScreen().querySelectorAll('input')].find((i) => /search measurement/i.test(i.placeholder || ''));
    const right = panel ? panel.getBoundingClientRect().left - gap - 40 : innerWidth - gap;
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
    render('<b>Done.</b> ' + (lastTotal ? 'You measured <b>' + lastTotal + (lastUom ? ' ' + lastUom : '') + '</b>, and the item\'s Qty follows it. ' : '') +
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
        render(head(5) + 'Click <b>Process</b> to upload your plan.', [close]);
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
      if (t > 0) {
        go('drawn');
        highlight(btnIn(s, /^close$/i));
        render(head(8) + 'Measured <b>' + lastTotal + (lastUom ? ' ' + lastUom : '') + '</b>. Draw more shapes to add to it, or click <b>Close</b> (top right) to save it to the item.', [done, close]);
        placeOnScreen();
        return;
      }
      if (!planShowing()) {
        if (uploadClosedAt && Date.now() - uploadClosedAt < 120000) {
          go('wait');
          spot.style.display = 'none';
          render(head(6) + '<b>Uploading your plan...</b> This can take a minute. It will show here when it\'s ready.', [close]);
          placeOnScreen();
          return;
        }
        go('upload');
        const b = uploadPlanBtn();
        highlight(b);
        render(head(4) + 'Click <b>Upload Plan</b> to add your plan PDF. If your plan is already in the list below, click it to open it.', [close]);
        place(b, 'right');
        return;
      }
      if (!toolActive('area')) {
        go('area');
        highlight(tool('area'));
        render(head(7) + 'Your plan is ready. Click <b>Area</b> in the toolbar at the top.' +
          '<div style="margin-top:6px;color:#57606a">Measuring a length? Use <b>Line</b> instead.</div>', [close]);
        placeOnScreen();
        return;
      }
      go('draw');
      spot.style.display = 'none';
      render(head(8) + '<b>Draw on the plan:</b> click each corner of the area, one after another, and finish back at the first corner. The total appears on the right.' +
        '<div style="margin-top:6px;color:#57606a">Made a mistake? Use <b>Undo</b>.</div>', [close]);
      placeOnScreen();
      return;
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
  const timer = setInterval(tick, 250);
  addEventListener('keydown', onKey, true);

  function stop() {
    clearInterval(timer);
    removeEventListener('keydown', onKey, true);
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
    status: () => ({ step, finished, waitingForSelections, total: lastTotal, uom: lastUom, closedByUser: window.__rtTakeoffGuide.closedByUser, url: location.href }),
    check: () => 'grid:' + !!grid() + ' icons:' + takeoffIcons().length + ' list:' + !!listDlg() + ' create:' + !!createDlg() + ' uom:' + JSON.stringify(uomValue()) +
      ' screen:' + !!takeoffScreen() + ' uploadBtn:' + !!uploadPlanBtn() + ' plan:' + planShowing() + ' area:' + !!tool('area') + ' areaOn:' + toolActive('area') +
      ' upload:' + !!uploadDlg() + ' file:' + fileChosen() + ' total:' + total(),
  };
  tick();
  return 'ReadyTeam takeoff guide started: ' + (rowsLoaded() ? 'estimate rows found' : 'waiting for Cost Assistant rows');
})();
```
