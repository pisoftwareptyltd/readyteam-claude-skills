---
name: readyteam-estimation-guide
description: Show the user how to start the estimate for a ReadyTeam project with an on-screen guide in their Chrome tab - open the project's Cost Assistant (by itself right after a project is created) and ask on screen to choose Copy from project (pick a project in the popup), Import from Excel, or Import from data setup. The user does the clicking; the guide moves on by itself. Use after a project has been created (for example right after readyteam-create-project-guide or in onboarding), or when the user asks how to start, copy or import an estimate for a project.
---

# ReadyTeam: guide the user to start a project's estimate

The user starts the estimate themselves. You put a guide on their ReadyTeam page; it asks them on screen which way to start, then walks them through it. The guide is one script (in the "Guide script" section at the end of this skill) that highlights each control and moves on by itself as the user clicks. **Do not take screenshots step by step and do not click for the user.**

Where it lives: open the project, then **Estimations > Cost Assistant**. A new project's Cost Assistant shows **Quick Start** with these options:

- **Copy from project** (most used): copies the estimate of another project. A popup opens: choose the **Project**, tick what to copy (Plans, Takeoff Group, Takeoff Measurements, Quantities, Estimate Category Statuses, Specifications), click **Continue**.
- **Import from Excel**: opens the importer. **Upload file** (or drag the file in) or **Manually enter data**, check the rows, then **Import Data** at the top right.
- **Import from data setup**: a popup lists the company's own Cost Assistant items (the ones imported during onboarding). Tick the groups or items to add, click **Add**.

(Quick Start also has Create a blank estimate and the ReadyTeam templates. Mention them only if the user asks for something else.)

## Asking the user

- **Buttons for every question with set answers.** When this chat has a multiple-choice question tool (for example `AskUserQuestion`, or an "ask the user" tool that shows options), use it for every question whose answers you can list: one question per call, 2 to 4 short options (a few words each, the recommended one first), each with a one-line description. The user can still type their own answer. Without such a tool, end the message with a short numbered list of the same options and say they can reply with the number.
- **Files: say exactly what and how.** When you need a file, say which file, what it looks like, and how to attach it: "Tap **+** below the message box, then **Upload a file**, and choose your <file> (.xlsx or .csv)." Ask it as a button question with options such as **I've attached it**, **I don't have one** and **Skip**. Claude cannot show an upload button in the chat; the **+** is the upload.
- **Do the work yourself.** Once the user has given a file or a choice, do every ReadyTeam click, upload, typing and navigation yourself. Reuse what you already have in this chat (the logo, the brand colours, the company name, earlier answers) instead of asking again. Ask only for what you cannot get or decide: files only the user has, real choices, and one yes before anything is saved, imported or uploaded.
- **One yes, as a button.** Before a save, import or upload, show what will change and ask once, with options such as **Go ahead**, **Show me first** and **Not now**.

## Steps

**Right after the Create Project guide** (the usual way, also in onboarding): `readyteam-create-project-guide` loads this guide together with its own and calls `window.__rtEstGuide.afterProject()`. This guide then waits, hidden, until the project is created; opens the new project's **Cost Assistant** by itself (or, if ReadyTeam is not on the new project, points to it in the project list); and shows the choice on screen. Nothing else to do here until the user replies: go to step 7.

**On its own** (the project already exists):

1. Load the Claude in Chrome tools in one ToolSearch call if they are deferred, including `javascript_tool`. Use the ReadyTeam tab that is already open, on whichever ReadyTeam site the user is using (https://app.readyteam.ai/ or https://ready-team-staging.web.app/); stay on that site. If a login page shows, ask the user to sign in and reply "done".
2. Make sure the tab shows the project (its page with the **Estimations** section) or that project's Cost Assistant. If it is on another page, ask the user which project and open it. No popup should be open.
3. Run the full text of the guide script below, unchanged, in that tab with `javascript_tool`. Then load the allowance guide so it follows on once the estimate is in: get the guide script from `readyteam-allowance-guide` (or read it quietly, with a web fetch or shell download and never in a browser tab, from `https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-allowance-guide/SKILL.md`), run it unchanged in the same tab, then run `window.__rtAllowGuide.afterEstimate()`. Do the same with the specification guide (from `readyteam-specification-guide`, or `https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-specification-guide/SKILL.md`), then run `window.__rtSpecGuide.afterAllowances()`; and the selection guide (from `readyteam-selection-guide`, or `https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-selection-guide/SKILL.md`), then `window.__rtSelGuide.afterSpecifications()`; and the takeoff guide (from `readyteam-takeoff-guide`, or `https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-takeoff-guide/SKILL.md`), then `window.__rtTakeoffGuide.afterSelections()`. Do not ask in chat which option they want: on Quick Start the guide shows the question on screen, with a button for each option (**Copy from project**, **Import from Excel**, **Import from data setup**) and the three cards highlighted. (If the user already told you which option they want, run `window.__rtEstGuide.choose('copy')`, `'excel'` or `'datasetup'` to point straight at it.)
4. Tell the user in two or three plain lines, without waiting for anything else:
   "I've put a guide on your ReadyTeam screen. Choose how you'd like to start the estimate, then follow the orange highlight one step at a time. Once the estimate is in, it helps you set allowances, add specifications and selections, and measure from your plan. Tell me when you're done, or if you get stuck."
5. If they pick **Import from Excel**, you may add: "When the importer opens, upload your file and click Import Data at the top right. Or attach the file here and I can do the import for you."
6. Then ask, as buttons: "Tell me when you've finished." Options: **I'm done** · **I'm stuck** · **Skip this part**. Wait for the user. Do not poll or take screenshots while they work.
7. When they reply, run `window.__rtEstGuide && window.__rtEstGuide.status()` once with `javascript_tool`:
   - `finished: true`: take one screenshot to confirm the estimate is showing in Cost Assistant, and tell the user in a line what came in (for example "Your estimate was copied from P1004"). If the allowance guide was loaded, also run `window.__rtAllowGuide && window.__rtAllowGuide.status()` and follow step 6 of `readyteam-allowance-guide`.
   - `unsure: true`: the popup or importer closed after Continue / Add / Import, but the page did not change as expected. Take one screenshot, tell the user what you see, and help from there.
   - `waitingForProject: true`: the project isn't created yet; help with the Create Project guide.
   - not finished: ask what they see, or take one screenshot, and explain the next step in plain words. Run the script again if they want the guide back (it restarts cleanly).

## If the user wants you to do it

Only when the user asks:

- **Import from Excel** with a file attached here: follow Part 2 of `readyteam-estimation` (if it is not installed, read it quietly with a web fetch or shell download from `https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-estimation/SKILL.md`; never open it in a browser tab or show it to the user), starting at Import from Excel in this project's Cost Assistant. Ask before clicking Import Data.
- **Copy from project** or **Import from data setup**: open the popup, make the choices the user gave you, show them what you picked, and click Continue / Add only after they say yes.

## If the script can't run

If `javascript_tool` is not available or is refused, do not keep retrying. Give the user the steps for their chosen option as a short numbered list in plain words (open the project, Cost Assistant, then the option's steps from the list above), and ask them to tell you when the estimate is in.

## Rules

- Never pick the project, tick boxes, upload, or click Continue / Add / Import Data for the user, unless they ask you to.
- Do not change anything else in ReadyTeam.
- Starting an estimate twice adds the items twice. If Cost Assistant already shows an estimate (no Quick Start), tell the user and ask before adding more.
- The guide closes with the Close guide button or Escape, and removes itself 15 seconds after the estimate is in.
- On a dropdown or typing step the guide puts the cursor in the field and keeps its tip to the left (or above), so the list stays visible.

## Status

Tested live on a project (Nov 2026), up to but not including the final click: from the project page the guide points at Estimations > Cost Assistant; on Quick Start it points at the chosen option; it follows the user into each option (Copy From Project popup: Project dropdown, then the copy checkboxes, then Continue; data setup popup: item list, then Add; Excel importer: a tip in the bottom-left corner, since the importer is an embedded Flatfile window the guide cannot point inside); Cancel, Close or closing the importer goes back to the choice. Popup selectors: `lib-cost-assistant-project-copy` and `lib-template-map-dialogue` (their boxes are `display: contents`, so the guide checks the surrounding `mat-dialog-container`), `iframe#flatfile_iframe` for the importer.

**Not yet tested live:** the hand-off from the Create Project guide (`afterProject()`: wait hidden, open the new project's Cost Assistant by clicking its card, or point to the project in the list; then the on-screen choice with one button per option). **Not yet seen:** what Cost Assistant shows after Continue / Add / Import Data. The guide treats "Quick Start is gone" as done and points at **Continue Estimate** if that button turns on. On the first real run, note what happens after each option and update the guide script if needed. `window.__rtEstGuide.check()` lists which controls the guide can see on the current screen.

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

  const costAssistantLeaf = () => leaf(/^cost assistant$/i, document, 120);

  // The new project in the left project list, by the name typed in the Create Project guide.
  function findProjectInList() {
    if (!projectName) return null;
    const name = projectName.toLowerCase();
    const hit = [...document.querySelectorAll('a, li, p, span, div')].find((e) => visible(e) &&
      e.getBoundingClientRect().left < 400 && e.getBoundingClientRect().top > 100 &&
      clean(e.innerText).toLowerCase().includes(name) && clean(e.innerText).length < name.length + 40 &&
      ![...e.children].some((c) => clean(c.innerText).toLowerCase().includes(name)));
    return hit ? (hit.closest('a, li, [class*=cursor-pointer]') || hit) : null;
  }

  // Click a Quick Start option for the user when they press its button in the tip.
  function pickOption(k) {
    const t = leaf(CARD[k]);
    if (!t) return;
    choice = k;
    if (k === 'excel') excelClickedAt = Date.now();
    shownKey = '';
    t.click();
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

  // Dropdowns and text fields: the tip goes beside them, and the cursor goes into them.
  const DROPDOWN_SEL = 'ng-select, mat-select, select, [role=combobox], [aria-autocomplete], [aria-haspopup=listbox]';
  const isDropdown = (el) => !!el && (el.matches(DROPDOWN_SEL) || !!el.querySelector(DROPDOWN_SEL));
  const TYPE_SEL = 'input:not([type=hidden]):not([type=checkbox]):not([type=radio]):not([type=file]):not([type=color]), textarea, select';
  function focusField(target) {
    const i = target.matches(TYPE_SEL) ? target : [...target.querySelectorAll(TYPE_SEL)].find(visible);
    if (!i || i.disabled || i.readOnly || document.activeElement === i) return;
    try {
      i.focus({ preventScroll: true });
      if (i.setSelectionRange && /^(text|search|)$/.test(i.type || '')) i.setSelectionRange(i.value.length, i.value.length);
    } catch (e) { /* field cannot take focus */ }
  }

  // The box around all the checkboxes in a popup.
  function checkboxList(d) {
    const l = d ? [...d.querySelectorAll('label')].filter(visible) : [];
    if (!l.length) return null;
    let box = l[0].parentElement;
    while (box && !box.contains(l[l.length - 1])) box = box.parentElement;
    return box;
  }

  // Allowances: in the Cost Assistant grid (ag-grid), column "Allowance" (col-id allowance_type_id).
  const allowanceHeader = () => [...document.querySelectorAll('.ag-header-cell[col-id=allowance_type_id]')].find(visible) || null;
  const hasEstimateGrid = () => !!document.querySelector('.ag-header-cell[col-id=allowance_type_id]') && !quickStart();
  const itemRows = () => [...document.querySelectorAll('.ag-center-cols-container .ag-row:not(.ag-row-group)')].filter(visible);
  const findCollapsed = () => {
    const icon = [...document.querySelectorAll('.ag-group-contracted')].find(visible);
    return icon ? (icon.closest('.ag-cell') || icon) : null;
  };
  const editingCell = () => document.querySelector('.ag-cell-inline-editing[col-id=allowance_type_id], .ag-cell-popup-editing[col-id=allowance_type_id]');
  function allowanceCell() {
    for (const r of itemRows()) {
      const c = r.querySelector('[col-id=allowance_type_id]');
      if (c && visible(c)) return c;
    }
    return null;
  }
  // Scroll the grid sideways so the Allowance column is in view (the column is far to the right).
  function scrollToAllowance() {
    const h = document.querySelector('.ag-header-cell[col-id=allowance_type_id]');
    if (!h) return;
    const left = parseFloat(h.style.left) || 0;
    for (const v of document.querySelectorAll('.ag-body-horizontal-scroll-viewport, .ag-center-cols-viewport')) {
      v.scrollLeft = Math.max(0, left - 300);
    }
  }

  const continueEstimate = () => {
    const b = findButton(/^continue estimate$/i);
    return b && !b.disabled && !/pointer-events-none|disabled/.test(b.className) ? b : null;
  };

  // Steps: each has an id, a finder and a text.
  const S = {
    open: { find: findCostAssistantCard, light: () => autoOpen,
      text: () => autoOpen
        ? '<b>Your project is created.</b> Opening <b>Cost Assistant</b> to start its estimate...'
        : 'Click <b>Cost Assistant</b> under Estimations to start this project\'s estimate.' },
    openProject: { find: findProjectInList,
      text: () => '<b>Your project is created.</b> Click <b>' + projectName.replace(/</g, '&lt;') + '</b> in the project list to open it.' },
    choose: { find: () => (choice ? findCard(choice) : findChoices()), light: () => !choice,
      text: () => choice === 'excel' && Date.now() - excelClickedAt < 20000
        ? 'Opening the Excel importer. This can take a few seconds...'
        : choice
        ? 'Click <b>' + NAME[choice] + '</b>.'
        : '<b>Your project is ready.</b> How would you like to start its estimate? Choose one option:' +
          '<ul style="margin:6px 0 0 18px;padding:0">' +
          '<li><b>Copy from project</b>: reuse the estimate of another project</li>' +
          '<li><b>Import from Excel</b>: upload your estimate spreadsheet</li>' +
          '<li><b>Import from data setup</b>: pick items from your company Cost Assistant</li></ul>' },
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
    allowExpand: { find: findCollapsed,
      text: () => '<b>Your estimate is in.</b> Now set your <b>allowances</b>. Click the arrow next to a category to open it and see its items.' },
    allowCell: { find: () => editingCell() || (allowanceSet ? allowanceHeader() : allowanceCell() || allowanceHeader()), light: () => true, aside: true,
      text: () => editingCell()
        ? 'Choose <b>PC (Prime Cost)</b> or <b>PS (Provisional Sum)</b> for this item. Choose the empty line if it is not an allowance.'
        : allowanceSet
        ? 'Saved. Do the same for any other item that is an allowance: <b>double-click</b> its Allowance cell. Open other categories with their arrows. Click <b>Done</b> when you have finished.'
        : 'This is the <b>Allowance</b> column. For each item that is an allowance, <b>double-click</b> its cell and choose PC (Prime Cost) or PS (Provisional Sum).' },
  };
  const ORDER = {
    copy: ['open', 'choose', 'copyProject', 'copyWhat', 'copyGo'],
    datasetup: ['open', 'choose', 'setupPick', 'setupGo'],
    excel: ['open', 'choose', 'excel'],
    allow: ['allowExpand', 'allowCell'],
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
  let focusedStep = '';
  let focusUntil = 0;
  let waitingForProject = false;  // set by afterProject(): sleep until the Create Project guide finishes
  let projectName = '';
  let autoOpen = false;           // after the project is created, open Cost Assistant for the user
  let autoSince = 0;
  let openClickedAt = 0;
  let allowStage = false;         // estimate is in: guide the allowances
  let allowanceSet = false;       // the user has set at least one allowance
  let allowancesDone = false;
  let wasEditing = false;

  function render(html, buttons) {
    const key = html + '|' + buttons.map((b) => b.label).join(',');
    if (key === shownKey) return;
    shownKey = key;
    tip.innerHTML = html + '<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end;margin-top:10px"></div>';
    const row = tip.lastChild;
    for (const b of buttons) {
      const el = document.createElement('button');
      el.textContent = b.label;
      Object.assign(el.style, b.primary
        ? { background: ORANGE, color: '#fff', border: '1px solid ' + ORANGE }
        : { background: '#fff', color: '#1f2328', border: '1px solid #d0d7de' });
      if (b.block) Object.assign(el.style, { width: '100%', textAlign: 'left', fontWeight: '600' });
      el.onclick = (e) => { e.preventDefault(); e.stopPropagation(); b.onClick(); };
      row.append(el);
    }
  }

  function placeAside(target, box) {
    const t = tip.getBoundingClientRect();
    const r = target.getBoundingClientRect();
    const b = (box || target).getBoundingClientRect();
    const vw = innerWidth, vh = innerHeight, gap = 12;
    const clampTop = (y) => Math.max(gap, Math.min(y, vh - t.height - gap));
    let top, left;
    if (b.left - gap - t.width >= gap) { top = clampTop(r.top); left = b.left - gap - t.width; }
    else if (r.top - gap - t.height >= gap) { top = r.top - gap - t.height; left = Math.max(gap, Math.min(r.left, vw - t.width - gap)); }
    else if (b.right + gap + t.width <= vw - gap) { top = clampTop(r.top); left = b.right + gap; }
    else return false;
    tip.style.top = top + 'px';
    tip.style.left = left + 'px';
    return true;
  }

  function place(target, corner, beside) {
    // Dropdowns and popup steps: tip to the left of the popup (or above), never over the list.
    if (target && (beside || isDropdown(target)) && placeAside(target, beside && (beside.closest('mat-dialog-container') || beside))) return;
    const t = tip.getBoundingClientRect();
    const vw = innerWidth, vh = innerHeight, gap = 12;
    let top, left;
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
      ? (allowStage
        ? '<b>Done.</b> Your estimate is in Cost Assistant' + (allowancesDone ? ' and your allowances are set.' : '. You can set allowances any time in the Allowance column.')
        : '<b>Done.</b> Your estimate is in Cost Assistant. You can now review the items, quantities and prices.')
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

    // afterProject(): stay hidden until the Create Project guide reports the project created.
    if (waitingForProject) {
      const g = window.__rtGuide;
      const st = g && g.status ? g.status() : null;
      if (!st || st.closedByUser) return stop();  // project guide closed: nothing to follow on from
      tip.style.display = 'none';
      spot.style.display = 'none';
      if (!st.finished) return;
      projectName = st.projectName || '';
      try { g.stop(); } catch (e) { /* already gone */ }
      waitingForProject = false;
      autoOpen = true;
      autoSince = Date.now();
      tip.style.display = '';
      go('open');
    }

    if (allowStage) {
      // Allowances: open a category, then the Allowance column (scrolled into view for the user).
      const editing = !!editingCell();
      if (wasEditing && !editing) allowanceSet = true;
      wasEditing = editing;
      if (itemRows().length) {
        if (step !== 'allowCell') { go('allowCell'); scrollToAllowance(); }
      } else {
        go('allowExpand');
      }
    } else {
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
        else if (!quickStart()) { if (waited > 800) { allowStage = true; confirmedAt = 0; closedImporter = false; } }
        else if (closedImporter && waited > 3000) {
          // Importer closed but Quick Start is still there: nothing imported, back to the choice.
          confirmedAt = 0; closedImporter = false; go('choose');
        } else if (!closedImporter && waited > 10000) return finish(false);
      } else if (quickStart()) {
        autoOpen = false;
        go('choose');
      } else if (hasEstimateGrid()) {
        // The project already has an estimate: go straight to allowances.
        allowStage = true;
      } else if (autoOpen) {
        // Open the new project's Cost Assistant for the user; if the project page isn't showing, point to the project.
        const lf = costAssistantLeaf();
        if (lf) {
          go('open');
          if (Date.now() - openClickedAt > 4000) { openClickedAt = Date.now(); lf.click(); }
        } else if (Date.now() - autoSince > 3000 && findProjectInList()) {
          go('openProject');
        } else {
          go('open');
        }
      } else {
        go('open');
      }
    }
    }

    const s = S[step];
    const list = step.startsWith('allow') ? ORDER.allow : ORDER[choice || 'copy'];
    const n = list.indexOf(step);
    const head = n >= 0
      ? '<div style="font-size:12px;color:#57606a;margin-bottom:4px">Step ' + (n + 1) + ' of ' + list.length + (step.startsWith('allow') ? ' · Allowances' : choice ? ' · ' + NAME[choice] : '') + '</div>'
      : '';
    const buttons = [];
    if (s.next) {
      const nextId = list[n + 1];
      buttons.push({ label: 'Next', primary: true, onClick: () => nextId && go(nextId) });
    }
    if (step === 'allowCell') buttons.push({ label: 'Done', primary: true, onClick: () => { allowancesDone = true; finish(true); } });
    if (step === 'allowExpand') buttons.push({ label: 'Skip allowances', onClick: () => finish(true) });
    if (step === 'choose' && !choice) {
      for (const k of Object.keys(CARD)) buttons.push({ label: NAME[k], block: true, onClick: () => pickOption(k) });
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
        boxShadow: (s.light && s.light()) || isDropdown(target) ? 'none' : '0 0 0 9999px rgba(0,0,0,0.35)',
      });
      // Put the cursor in a dropdown or text field when the step starts, so the user can type straight away.
      // Keep trying for a moment (popups move focus themselves when they open), then leave it to the user.
      if (focusedStep !== step) { focusedStep = step; focusUntil = Date.now() + 1500; }
      if (Date.now() < focusUntil && !target.contains(document.activeElement)) focusField(target);
      if (r.top < 0 || r.bottom > innerHeight) target.scrollIntoView({ block: 'center', behavior: 'smooth' });
      render(head + s.text(), buttons);
      place(target, false, s.beside ? s.beside() : s.aside ? target : null);
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

  // Escape closes the guide, but not when it is closing something in ReadyTeam (a dropdown, grid editor or popup).
  const onKey = (e) => {
    if (e.key !== 'Escape') return;
    const t = e.target && e.target.closest ? e.target : null;
    if (t && t.closest('.ag-root-wrapper, .ag-popup, .ag-rich-select-list, mat-dialog-container, .ng-dropdown-panel, ng-select, input, textarea')) return;
    if (editingCell() || copyDialog() || setupDialog()) return;
    stop();
  };
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
    // Run right after the Create Project guide: wait for the project, then open its Cost Assistant by itself.
    // Start at the allowances (the project's estimate is already in).
    allowances: () => { allowStage = true; shownKey = ''; return 'Guide set to allowances'; },
    afterProject: () => {
      waitingForProject = true;
      tip.style.display = 'none';
      spot.style.display = 'none';
      return 'Estimate guide waiting for the project to be created';
    },
    status: () => ({ step, choice, finished, unsure, waitingForProject, projectName, allowStage, allowanceSet, allowancesDone, closedByUser: window.__rtEstGuide.closedByUser, url: location.href }),
    check: () => Object.keys(S).map((k) => k + ':' + (S[k].find() ? 'found' : '-')).join(' '),
  };
  tick();
  return 'ReadyTeam estimate guide started: ' + (quickStart() ? 'on Cost Assistant Quick Start' : findCostAssistantCard() ? 'Cost Assistant card found' : 'Cost Assistant not found yet');
})();
```
