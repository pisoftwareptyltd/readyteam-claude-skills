---
name: readyteam-create-project-guide
description: Show the user how to create a project in ReadyTeam with an on-screen guide that highlights each button and field in their Chrome tab (Add Project, Project Name, Document Prefix, Home Address, Client, Create Project). The user does the clicking and typing; the guide moves on by itself. Use when the user asks how to create a project, or wants to be shown or walked through creating a project, or as part of ReadyTeam onboarding.
---

# ReadyTeam: guide the user to create a project

The user creates the project themselves. You only put a guide on their ReadyTeam page. The guide is one script (in the "Guide script" section at the end of this skill) that highlights each control and moves to the next one by itself as the user clicks and types. **Do not take screenshots step by step and do not click or type for the user.** That is what makes this fast.

## Asking the user

- **Buttons for every question with set answers.** When this chat has a multiple-choice question tool (for example `AskUserQuestion`, or an "ask the user" tool that shows options), use it for every question whose answers you can list: one question per call, 2 to 4 short options (a few words each, the recommended one first), each with a one-line description. The user can still type their own answer. Without such a tool, end the message with a short numbered list of the same options and say they can reply with the number.
- **Files: say exactly what and how.** When you need a file, say which file, what it looks like, and how to attach it: "Tap **+** below the message box, then **Upload a file**, and choose your <file> (.xlsx or .csv)." Ask it as a button question with options such as **I've attached it**, **I don't have one** and **Skip**. Claude cannot show an upload button in the chat; the **+** is the upload.
- **Do the work yourself.** Once the user has given a file or a choice, do every ReadyTeam click, upload, typing and navigation yourself. Reuse what you already have in this chat (the logo, the brand colours, the company name, earlier answers) instead of asking again. Ask only for what you cannot get or decide: files only the user has, real choices, and one yes before anything is saved, imported or uploaded.
- **One yes, as a button.** Before a save, import or upload, show what will change and ask once, with options such as **Go ahead**, **Show me first** and **Not now**.

## Steps

The project guide, the estimate guide and the allowance guide run back to back on screen: once the project is created, the estimate guide opens the project's **Cost Assistant** by itself and asks the user, on screen, how to start the estimate; once the estimate is in, the allowance guide takes over to set allowances (PC / PS); when the user clicks Done there, the specification guide takes over to add specifications to items; and when the user clicks Done there, the selection guide takes over to add selections (question + product) to items; and after that, the takeoff guide takes over to measure an item's quantity from the user's plan. The user does not have to come back to the chat in between.

1. Load the Claude in Chrome tools in one ToolSearch call if they are deferred, including `javascript_tool`. Use the ReadyTeam tab that is already open (for example from onboarding); otherwise call `tabs_context_mcp`, open a new tab and go to **https://app.readyteam.ai/** (the staging site only if the user says so). If a login page shows, ask the user to sign in and reply "done".
2. Make sure the tab is on the ReadyTeam dashboard (the page with the orange **+ Add Project** button in the left sidebar). Navigate there if needed. No Create Project dialog should be open.
3. Run the full text of the guide script below, unchanged, in that tab with `javascript_tool`. It returns "ReadyTeam guide started: ...".
4. Unless the user asked only for a project with no estimate, also load the estimate guide so it follows on by itself: get the guide script from the `readyteam-estimation-guide` skill (or read it from `https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-estimation-guide/SKILL.md` if that skill is not installed), run its full text unchanged in the same tab, then run `window.__rtEstGuide.afterProject()`. It stays hidden until the project is created. Then do the same with the allowance guide: get the guide script from `readyteam-allowance-guide` (or read it from `https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-allowance-guide/SKILL.md`), run it unchanged in the same tab, then run `window.__rtAllowGuide.afterEstimate()`. It stays hidden until the estimate is in. Then the same with the specification guide: get its script from `readyteam-specification-guide` (or `https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-specification-guide/SKILL.md`), run it unchanged, then run `window.__rtSpecGuide.afterAllowances()`. Last, the selection guide: get its script from `readyteam-selection-guide` (or `https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-selection-guide/SKILL.md`), run it unchanged, then run `window.__rtSelGuide.afterSpecifications()`. Finally the takeoff guide: get its script from `readyteam-takeoff-guide` (or `https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-takeoff-guide/SKILL.md`), run it unchanged, then run `window.__rtTakeoffGuide.afterSelections()`.
5. Tell the user in two or three plain lines, without waiting for anything else:
   "I've put a guide on your ReadyTeam screen. Follow the orange highlight: it shows you where to click and what to type, one step at a time. Once your project is created, it opens Cost Assistant, asks how you'd like to start the estimate, then helps you set allowances, add specifications and selections, and measure from your plan (have your plan PDF ready). Tell me when you're done, or if you get stuck."
   (Without the estimate guide, say "Tell me when your project is created" instead of the last two sentences.)
6. Then ask, as buttons: "Tell me when you've finished." Options: **I'm done** · **I'm stuck** · **Skip this part**. Wait for the user. Do not poll or take screenshots while they work.
7. When they reply, run `JSON.stringify({project: window.__rtGuide && window.__rtGuide.status(), estimate: window.__rtEstGuide && window.__rtEstGuide.status(), allowance: window.__rtAllowGuide && window.__rtAllowGuide.status(), specification: window.__rtSpecGuide && window.__rtSpecGuide.status(), selection: window.__rtSelGuide && window.__rtSelGuide.status(), takeoff: window.__rtTakeoffGuide && window.__rtTakeoffGuide.status()})` once with `javascript_tool`:
   - project not finished (`estimate.waitingForProject: true`, or `project.finished: false`): ask what they see, or take one screenshot, and explain the next step in plain words. Run both scripts again (and `afterProject()`) if they want the guide back; they restart cleanly.
   - project created (`estimate.waitingForProject: false`, or `project.finished: true`): the project name is in `estimate.projectName`. From here, follow step 7 of `readyteam-estimation-guide` on the `estimate` status (estimate in, unsure, or still in progress). Once the estimate is in (`allowance.waitingForEstimate: false`), follow step 6 of `readyteam-allowance-guide` on the `allowance` status; once allowances are done (`specification.waitingForAllowances: false`), follow step 6 of `readyteam-specification-guide` on the `specification` status; once specifications are done (`selection.waitingForSpecifications: false`), follow step 6 of `readyteam-selection-guide` on the `selection` status; once selections are done (`takeoff.waitingForSelections: false`), follow step 6 of `readyteam-takeoff-guide` on the `takeoff` status.
   - only the project guide was run and it is `finished: true`: take one screenshot to confirm the project page opened and tell the user the project name. Then, unless onboarding is running this step (it does the next step itself), offer: "Would you like help starting this project's estimate?" On a yes, use `readyteam-estimation-guide` in the same tab.

## The steps the guide shows

1. Click **+ Add Project**.
2. Type the **Project Name**.
3. Type a **Document Prefix**: short (max 20 characters), no spaces, unique across their projects, for example the project initials.
4. Type the **Home Address** and pick it from the list if one appears.
5. Choose the **Client** (optional, Next skips it).
6. Click **Create Project**.

If ReadyTeam says the prefix is already used, tell the user to change it slightly (for example add 2 at the end) and click Create Project again. The guide stays on that step until the dialog closes.

## If the script can't run

If `javascript_tool` is not available or is refused, do not keep retrying. Give the user the six steps above as a short numbered list in plain words, and ask them to tell you when the project is created.

## Rules

- Never type into the form or click Create Project for the user, unless they ask you to.
- Do not change anything else in ReadyTeam.
- The guide closes with the Close guide button or Escape, and removes itself 15 seconds after the project is created.
- On a typing step the guide puts the cursor in the field; on a dropdown step its tip sits to the left (or above), so the list stays visible.

## Status

Checked on the live Create New Project dialog (Nov 2026), up to but not including Create Project: every step finds its control; each typing step puts the cursor in its field (Project Name, Document Prefix, Home Address, Client); the tip sits left of the dialog, or above the field when there is no room, so the address suggestions and the Client list open below it unobstructed; Cancel sends the guide back to step 1. Not yet run with a real Create Project click: on the first real run, note whether the guide reaches "Done" and the project dashboard opens.

## Guide script

```js
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
      text: 'Type the <b>Home Address</b> of the job. If a list of addresses appears, pick the right one.', next: true, side: 'left' },
    { find: () => findField(/client/i, scope()),
      text: 'Optional: choose the <b>Client</b> for this project, or click Next to skip.', next: true, side: 'left' },
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
  let focusedStep = -1;
  let focusUntil = 0;
  let projectName = '';  // what the user typed, so the estimate guide can find the project

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

  // Dropdowns and side 'left' steps: tip beside the dialog, so an open list stays visible.
  function place(target, side) {
    if (target && (side === 'left' || isDropdown(target)) && placeAside(target, dialog())) return;
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

    if (d) {
      const f = findField(/project ?name/i, d);
      const i = f && (f.matches('input') ? f : f.querySelector('input'));
      if (i && clean(i.value)) projectName = clean(i.value);
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
        // No dimming on dropdown steps, so the open list stays easy to read.
        boxShadow: s.side === 'left' || isDropdown(target) ? 'none' : '0 0 0 9999px rgba(0,0,0,0.35)',
      });
      // Put the cursor in the field when the step starts, so the user can type straight away.
      // Keep trying for a moment (the dialog moves focus itself when it opens), then leave it to the user.
      if (s.next) {
        if (focusedStep !== step) { focusedStep = step; focusUntil = Date.now() + 1500; }
        if (Date.now() < focusUntil && !target.contains(document.activeElement)) focusField(target);
      }
      if (r.top < 0 || r.bottom > innerHeight) target.scrollIntoView({ block: 'center', behavior: 'smooth' });
      render(head + s.text, buttons);
      place(target, s.next ? 'left' : s.side);  // typing steps: tip beside or above, never over the next field
    } else {
      missingSince = missingSince || Date.now();
      spot.style.display = 'none';
      const lost = Date.now() - missingSince > 2500;
      render(head + s.text + (lost ? '<div style="margin-top:6px;color:#57606a">I can\'t point to it right now. Look for it on the screen and follow this tip.</div>' : ''), buttons);
      place(null);
    }
  }

  // Escape closes the guide, but not when it is closing a dropdown or list in the dialog.
  const onKey = (e) => {
    if (e.key !== 'Escape') return;
    if (e.target && e.target.closest && e.target.closest('mat-dialog-container, .cdk-overlay-pane, .ng-dropdown-panel, .pac-container, input, textarea')) return;
    stop();
  };
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
    status: () => ({ step: step + 1, total: steps.length, finished, projectName, closedByUser: window.__rtGuide.closedByUser, url: location.href }),
  };
  tick();
  return 'ReadyTeam guide started: ' + (steps[0].find() ? 'Add Project button found' : 'Add Project button not found yet');
})();
```