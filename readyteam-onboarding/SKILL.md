---
name: readyteam-onboarding
description: Onboard a company into ReadyTeam end to end by running the ReadyTeam skills in the right order - Brand setup (logo and colours), Cost Code, Catalogues (optional), Cost Assistant, Quote Presentation (Links template - cover page and each page's settings), Job Assistant, then the first project: Create Project, Estimation (start its estimate in Cost Assistant) and Allowances (PC / PS), Specifications, Selections and Takeoff guides. Use when the user says "onboarding", "onboard a company", "set up my company in ReadyTeam", "start ReadyTeam setup", "import all my data", or gives several ReadyTeam files at once (logo, cost codes, catalogues, cost assistant, job template). Also use to resume an onboarding that was started earlier.
---

# ReadyTeam onboarding

This skill does not import anything itself. It runs the other ReadyTeam skills one after another, in a fixed order, and keeps track of what is done. Each step's own skill holds the real instructions; follow that skill fully for its step.

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

## How to talk to the user

The user is usually not technical. They may start with only a pasted prompt and nothing else.

- Use plain words. No file paths, code, tool names or skill names unless they ask.
- Ask **one question at a time**, as buttons (see "Asking the user"), and wait for the answer.
- When you need a file, say exactly which file and how to attach it (**+** below the message box, then **Upload a file**). Accept a file path too if they give one.
- When they must do something (sign in, install the Chrome extension), tell them exactly what to click, in short numbered steps.

## Step 0: get the step instructions

Each step's instructions live in its own skill, at the full address below. Use these exact addresses; do not build an address yourself.

| Step | Skill | Address |
|---|---|---|
| Step 1 | `readyteam-brand-setup` | https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-brand-setup/SKILL.md |
| Step 2 | `readyteam-import-cost-code` | https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-import-cost-code/SKILL.md |
| Step 3 | `readyteam-import-catalogues` | https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-import-catalogues/SKILL.md |
| Step 4 | `readyteam-import-cost-assistant` | https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-import-cost-assistant/SKILL.md |
| Step 5 | `readyteam-links-guide` | https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-links-guide/SKILL.md |
| Step 6 | `readyteam-import-job-assistant` | https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-import-job-assistant/SKILL.md |
| Step 7 | `readyteam-create-project-guide` | https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-create-project-guide/SKILL.md |
| Step 8 | `readyteam-estimation-guide` | https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-estimation-guide/SKILL.md |
| Step 9 | `readyteam-allowance-guide` | https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-allowance-guide/SKILL.md |
| Step 10 | `readyteam-specification-guide` | https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-specification-guide/SKILL.md |
| Step 11 | `readyteam-selection-guide` | https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-selection-guide/SKILL.md |
| Step 12 | `readyteam-takeoff-guide` | https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-takeoff-guide/SKILL.md |
| Progress page | (template) | https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-onboarding/progress-page.html |

**Read all twelve now, before Step 1** (quietly, see below), so nothing is missing later. **Always use these latest versions**, even when a skill with the same name is installed: installed copies can be out of date and must not change the steps or their order. Use an installed copy only for a step whose address could not be read.

**Never make up the plan.** The twelve steps, their order and how each one works come only from this skill and the step skills above. If a step's instructions cannot be read and no installed copy exists, do not skip the step, merge steps, collect files in advance or improvise: tell the user in one plain line that this step could not start right now and offer, as buttons, **Try again** · **Skip this step** · **Take a break**.

**Load instructions quietly, in the background.** The user must never see this loading happen, because a page of raw instructions looks like something suspicious is going on.

- Read them only with a background tool: a web fetch tool (for example `WebFetch`), or a download from the shell (for example `curl -sL <address>`). Read the next step's instructions before you start that step, while the user is answering or waiting.
- **Never open these addresses in Chrome**, or in any browser tab or window the user can see. The Chrome tab is only for ReadyTeam.
- Do not show, paste, quote or summarise the instructions to the user, and do not mention GitHub, links, files, skills or "loading instructions". If you need to say anything, say "Getting the next step ready."
- If loading fails, try the other background way once. If it still fails, tell the user in one plain line that this step could not start right now and offer, as buttons, **Try again** · **Skip this step** · **Take a break**. Never do a step from memory.

Also check that the Claude in Chrome tools are available, because every step uses them. If they are not, tell the user in simple steps to install the Claude in Chrome extension in Google Chrome, sign in to it with the same Claude account, keep Chrome open, and then ask as buttons: **Done** · **I need help**. Do not continue until the tools work.

## Step 0b: start

1. Greet the user in one line. Make the **progress page** (below) and tell them it shows the twelve steps and where they're up to. Then show the whole plan once, as a short numbered list of the twelve step names with the **What** line from "What to tell the user at each step" (one line each), so they know the full journey before it starts. Say you will do them **one at a time**, explain each one before it starts, and keep going by yourself, asking only when you need a file or a real choice, and that they can type **stop** or **pause** any time. If the user said in their message that they are continuing an earlier setup or want to start from a later step, start there; otherwise go straight on to step 1 without asking.
2. **Pick the ReadyTeam site.** ReadyTeam runs on two sites: **https://app.readyteam.ai/** (live) and **https://ready-team-staging.web.app/** (test). Use whichever one the user is using, in this order:
   - the site the user names in the chat (a link, "staging", "test site", "live");
   - otherwise a Chrome tab that already has one of the two sites open (check `tabs_context_mcp`): use that site, and that tab if it is signed in;
   - otherwise https://app.readyteam.ai/.

   Do not ask about the site. Remember it as **the ReadyTeam site** and use it for every step, every link and every new tab; never switch to the other site part way. Tell the other skills which site it is when they say to open ReadyTeam. Open ReadyTeam in a new Chrome tab on that site (or use the signed-in tab). If it shows a login page, ask the user to sign in there and reply, as buttons: **I've signed in** · **I need help signing in**.

Do **not** ask the user to type the company name. Everything goes into the company the user is signed in to. Read its name from ReadyTeam (for example the company shown at the top of the screen, or the "<Company> / Import Your Data" title) and check it once, as buttons: "The top of your screen shows the company **<Company>**. Is that the company we're setting up?" Options: **Yes, that's it** · **No, it's a different company**. If it is a different company, tell them to switch company at the top of the ReadyTeam screen, then ask as buttons: **I've switched** · **I need help**, and read the name again. Use the name for the progress page and log.

Do **not** ask for all the files up front. Ask for each file only when its step starts.

**The first step is always Step 1, Brand setup.** Right after the company check, give Step 1's opening block and ask for the logo. Never ask for cost codes, or any other step's file, before Brand setup is finished (logo uploaded, colours set and saved) or the user chose **Skip branding for now**. Before asking for any file, check the progress page: the step you are on must be the first one that is not **done** or **skipped**.

## Each step, one at a time

Do the steps one by one, never several together. For every step, go through this in order and wait for the user where it says so (hard rule):

- **Never mention, announce or ask for the next step's file until the current step is finished:** its work done in ReadyTeam (or skipped by the user's own choice) and its result reported. Then go straight on to the next step without asking.
- **A step is never done just because a question was answered.** For Brand setup, done means the logo is uploaded, the colours are filled in and **Update Company Profile** was clicked (or the user chose to skip it).
- Before each step, load that step's skill (installed, or read quietly in the background) and follow it, starting from its first step. Never do a step from this summary alone.


1. **Explain it before doing anything.** Start every step with this block, using that step's lines from "What to tell the user at each step" below (plain words, you may adjust them to what you already know about the company):

   > **Step N of 12: <step name>**
   > **What:** <what this step sets up in ReadyTeam>
   > **Why now:** <why it comes at this point>
   > **What I need from you:** <the file or choice, or "nothing, I'll show you on screen">
   > **What I'll do:** <what Claude does in ReadyTeam, in one line>

   Mark the step **now** on the progress page. Do not ask "Shall we start this step?": the block itself starts it. If the step needs a file, the file question (point 2) is the only question, in the same message as the block. If it needs no file, go straight on.
2. **Ask for the file, once** (see "Files" above), right under the opening block, as buttons: "Do you have your <file> (<what it looks like, for example .xlsx or .csv with Code and Description columns>) ready?" Options: **Yes, I'll attach it** · **I don't have one** · **Skip this step** (optional steps only). On **Yes, I'll attach it**, tell them to tap **+**, **Upload a file**, pick the file and press **Send**, then end your turn and wait for the message with the file. If they skip, mark it skipped, say so in one line, and go straight on to the next step. If the file is already in this chat, use it and don't ask.
3. **Check the file:** read it and tell them in a few lines what you found: number of rows, two or three example rows, and anything you had to change or could not use. Ask only if the step's skill needs a real choice the file cannot answer (as buttons).
4. **Say it and carry on:** "Importing N rows into <step name> now." Do not ask for a yes; the user gave the file for this. (Ask only if the user told you earlier to check with them before imports.)
5. **Do it, saying what is happening:** follow the step's skill and do all the ReadyTeam work yourself. Before each stage, give one plain line of what you are doing and why (for example "Opening Import Your Data, where ReadyTeam takes in your cost codes." "Entering your 96 rows." "Checking ReadyTeam found no errors before importing."). Keep it to one line per stage.
6. **Report:** say what was done (for an import: rows and the "Completed" status) or what went wrong, in plain words, and where they can see it in ReadyTeam (for example "Settings > Cost Code"). Then one line on what this unlocks for the next step. Update the progress page (and the progress log).
7. **Move on by yourself:** one line, "Done: 1, 2. Next: step 3 of 12, Catalogues.", then start the next step's opening block in the same message. Do not ask "Shall we move on?". If the user types **pause** or **stop**, stop and say they can come back any time and continue from the progress page.

Steps 1, 5 and 7 to 12 are not imports, so for points 2 to 6 follow their own skills instead: Brand setup asks for the logo, then uploads it, sets the colours and saves; Quote Presentation asks for the user's cover image (and makes one only if they ask) and uploads it, then tours each page's settings on screen; the Create Project, Estimation, Allowance, Specification, Selection and Takeoff guides need no file from you (Takeoff uses the user's plan PDF, which they upload in ReadyTeam themselves): they put an on-screen guide in ReadyTeam and the user does the clicking. Points 1 and 7 still apply. The on-screen guides are the one place the user does the clicking, so there Claude waits for **I'm done** · **I'm stuck** · **Skip this part**.

## What to tell the user at each step

Use these lines in each step's opening block (point 1 above). Keep them short and plain.

| # | Step | What | Why now | What I need from you | What I'll do |
|---|---|---|---|---|---|
| 1 | Brand setup | Puts your logo and brand colours on ReadyTeam. | It goes first so everything made later (quotes, documents, your first project) already carries your brand. | Your logo image. | Upload the logo, pick your two brand colours from it, show you, and save when you say so. |
| 2 | Cost Codes | Loads your list of cost codes, the codes every cost and budget is tracked against. | Everything after this (catalogues, estimates, jobs) refers to these codes. | Your cost code spreadsheet (code and description columns). | Check the file, show you what's in it, and import it when you say so. |
| 3 | Catalogues (optional) | Loads your catalogue of products and materials with prices and suppliers. | Estimates can pick items from it, so it goes in before the Cost Assistant items. | Your catalogue spreadsheet, if you have one. | Check the file, show you what's in it, and import it when you say so. |
| 4 | Cost Assistant | Loads your standard estimate items (groups, descriptions, quantities, unit costs). | It uses the cost codes from step 2, and it is what you'll build your quotes from. | Your Cost Assistant spreadsheet. | Check the file, show you what's in it, and import it when you say so. |
| 5 | Quote Presentation | Sets up how your quote looks to clients: the cover page and each page's settings. | Your quote pages show the items from step 4, and new projects use this layout. | Your cover image (or I can make one from your logo and colours if you ask). | Put your cover on your quote layout, then show you each page and its settings on screen. |
| 6 | Job Assistant | Loads your job template: the tasks, durations and order used to schedule a build. | It comes after the setup data, so tasks can link to your users and trade types. | Your job template spreadsheet. | Check the file, show you what's in it, and import it when you say so. |
| 7 | Create Project | Shows you how to create your first project. | All your setup is in, so the project can use it. | Nothing. You click; I guide you on screen. | Put a guide on your ReadyTeam screen that shows each click. |
| 8 | Estimation | Shows you how to start that project's estimate. | It needs the project from step 7 and the items from step 4. | Nothing. You choose how to start; I guide you. | Open Cost Assistant for the project and guide you through the three ways to start. |
| 9 | Allowances | Shows you how to mark items as PC (Prime Cost) or PS (Provisional Sum). | It needs the estimate from step 8. | Nothing. | Guide you to an item's Allowance and the PC / PS choice. |
| 10 | Specifications | Shows you how to add notes on what an item includes. | They appear in the quote, so they go on the estimate items. | Nothing. | Guide you to an item's Specification and its notes. |
| 11 | Selections | Shows you how to give an item a product choice for your client. | It builds on the same estimate items. | Nothing. | Guide you through Selection, the question and the product. |
| 12 | Takeoff | Shows you how to measure quantities straight from your plan. | Last, because it fills in the quantities of items you've set up. | Your plan PDF, which you upload in ReadyTeam yourself. | Guide you through uploading the plan and drawing an area on it. |

Steps 7 to 12 run back to back on screen, so give their opening block together once (one short block listing the six), then let the on-screen guide lead.

## The order and why

Run the steps strictly in this order. Later steps use what earlier steps created.

1. **Brand setup** - `readyteam-brand-setup`. The company's logo and colours go on first, so everything made later (documents, estimates, the first project) already carries the brand. Follow `readyteam-brand-setup` from its step 1: it asks for the logo, then Claude uploads it, sets the two colours in Company Branding, saves, and shows the result. Only when the user picks **I don't have one** and then **Skip branding for now**, skip it (say so, mark it skipped) and offer it again at the end. Keep the logo file and the two colour codes: step 5 can reuse them for a cover page.
2. **Cost Code** - `readyteam-import-cost-code`. Everything after it refers to cost codes.
3. **Catalogues** (optional) - `readyteam-import-catalogues`. Skip when the user has no catalogue file.
4. **Cost Assistant** - `readyteam-import-cost-assistant`. After cost codes (and catalogues, if any).
5. **Quote Presentation** (skip if the user wants) - `readyteam-links-guide`. Sets up the company's quote presentation template (Settings > Cost Assistant > Links > Quote Presentation): the cover page (the user's own image, asked for first; one made from their logo and brand colours only if they ask), then an on-screen tour of each section's pages and their settings. After Cost Assistant, because the Quote pages show the Cost Assistant data; before the first project, because new projects use this template.
6. **Job Assistant** - `readyteam-import-job-assistant`. Its User, Trade Types and Label values must already exist in the company; the import skill explains how non-matching values are handled.
7. **Create Project** (guide) - `readyteam-create-project-guide`. The user creates their first project with the on-screen guide. Do not ask whether to show it; go straight on. If the user says they want to skip it, also skip steps 8 to 12.
8. **Estimation** (guide) - `readyteam-estimation-guide`. Runs straight on from step 7 with no stop in between: the create-project skill loads both guides together, and once the project is created the estimation guide opens its Cost Assistant by itself and asks on screen how to start the estimate: Copy from project, Import from Excel, or Import from data setup (the Cost Assistant items from step 4). Announce steps 7 to 12 together, and report all six when the user replies. After step 7, because it uses the project from step 7 and the data from steps 2 to 4.
9. **Allowances** (guide) - `readyteam-allowance-guide`. Runs straight on from step 8: once the estimate is in, the allowance guide opens a category, scrolls the grid to the Allowance column by itself, and shows how to double-click an item's Allowance cell and choose PC (Prime Cost) or PS (Provisional Sum). The create-project skill loads it with the other guides. After step 8, because it needs the estimate.
10. **Specifications** (guide) - `readyteam-specification-guide`. Runs straight on when the user clicks Done in the allowance guide: it points at an item's + > Specification, the notes list (General Notes, Inclusions, Exclusions, Internal Notes, Digital Key), puts the cursor in the editor, and shows that closing the window saves it.
11. **Selections** (guide) - `readyteam-selection-guide`. Runs straight on when the user clicks Done (or Skip) in the specification guide: item + > Selection, open a question category, tick a question, Continue, tick the product, Continue. It warns that **Use Selected Item Price as Unit Cost** changes the item's unit cost to the product's price.
12. **Takeoff** (guide) - `readyteam-takeoff-guide`. Runs straight on when the user clicks Done (or Skip) in the selection guide: the ruler icon in an item's Qty, + Measurement, UOM, Add (the takeoff screen opens), Upload Plan (their plan PDF, Plan Name, Process), wait for the plan, Area, then draw on the plan. Tell the user to have their plan PDF ready. Last.

## Rules between steps

- Finish one step completely (import done and confirmed) before starting the next. The skills each handle one thing per run.
- Do not ask for a yes before imports, saves, uploads or new steps; say in one line what you are doing and do it. The user always knows which step is running from the opening block and the progress page, and can type **stop** at any time. If the user asked you to check with them first, do that instead.
- **Stop on failure.** If a required step fails or its Invalid tab cannot be cleared, stop the flow, report what happened, and ask the user. Do not continue to later steps on top of a failed one. A failed optional step (Brand setup, Catalogues, Quote Presentation, Create Project, Estimation, Allowances, Specifications, Selections, Takeoff) may be skipped if the user agrees.
- Never re-run a step that already imported, unless the user asks: importing twice creates duplicates, creating the project twice gives two projects, and starting the estimate twice adds its items twice.
- Use the same browser tab and site throughout; if a login page appears, ask the user to sign in.

## Progress page

A ReadyTeam-branded page beside the chat that shows the twelve steps and where the user is up to. It is the template `progress-page.html` in this skill's folder (if the skill is not installed, read it quietly in the background from `https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-onboarding/progress-page.html`, the same way as the step instructions: never in a browser tab). The page draws itself from the JSON block at its top (`<script id="setup-data">`): edit only that block, never the rest.

- **At the start**, when this chat can publish pages (an Artifact or page-publishing tool): copy the template to a file such as `readyteam-setup.html`, set `company` (as shown in ReadyTeam), `started` (today's date, for example 5 November 2026) and `"sample": false`, set step 1 to `"now"` and every other step to `"todo"`, and publish it. Give the user one line about it; do not paste its link unless they ask.
- **After every step**, edit the block and publish the same file again (same page and link): the finished step gets `"done"` (or `"skipped"`, or `"failed"` when it stopped and needs the user) and a short `note` with the result (for example "96 cost codes in 12 categories imported"); the next step gets `"now"` and, while it waits on the user, a `waiting` line (for example "accept the cover page in the chat.").
- States: `done`, `skipped`, `now`, `failed`, `todo`. The page counts done and skipped steps itself, shows the first `todo` after the current step as **Next**, and says "You're ready" when every step is done or skipped.
- When the chat cannot publish pages, skip the page and keep the progress log below in the chat.

## Progress log

Keep a progress log so onboarding can resume in a later chat. If you can write files, keep `readyteam-onboarding-<company>.md` (company name as shown in ReadyTeam) in the user's working folder; otherwise post the log in chat after each step. Update it after every step:

```
Company: <name from ReadyTeam>   Site: <url>   Started: <date>
1 Brand setup        - done, logo + #ff7a00 / #1b2a4b, <date>
2 Cost Code          - done, 96 rows, <date>
3 Catalogues         - skipped (no file)
4 Cost Assistant     - done, 40 rows
5 Quote Presentation - done, cover made from logo, settings toured
6 Job Assistant      - failed: 2 invalid rows (User), waiting on user
7 Create Project     - not started
8 Estimation         - not started
9 Allowances         - not started
10 Specifications    - not started
11 Selections        - not started
12 Takeoff           - not started
```

When resuming, read the progress page or the log (or ask the user for it), confirm with the user which steps are already done in ReadyTeam, and continue from the first step that is not done. A log from before the Quote Presentation step existed has Job Assistant as step 5: map it by step name, not number.

## Finish

**Celebrate first.** As soon as the last step is finished (the takeoff guide's Done, or the last remaining step done or skipped), in the ReadyTeam tab:

1. Run the full text of the **Celebration script** below, unchanged, with `javascript_tool`.
2. Then run `window.__rtCelebrate({ company: "<company name>", colors: ["<primary #hex>", "<secondary #hex>"], lines: [<3 to 5 short lines of what was set up>] })`. Use the brand colours from step 1 (leave `colors` out if branding was skipped). Lines are plain and short, for example "Logo and brand colours saved", "96 cost codes imported", "412 Cost Assistant items imported", "Quote cover page set", "First project created and measured". Leave skipped steps out of the lines.

It shows a confetti shower over ReadyTeam and a "You're all set, <company>!" message with those lines and a **Start using ReadyTeam** button that closes it (Escape or a click outside also close it). If the user has reduced motion turned on, it shows the message without confetti. Mark every step on the progress page and republish it: when all steps are done or skipped, the progress page shows "You're ready" with its own confetti.

Then, in the chat, give a short summary: each step with what was done (rows imported, colours set, cover page set, project created, how the estimate was started, allowances set, items given specifications or selections, area measured) or "skipped", and anything the user must follow up on (removed trade types, users left empty, items left out).

If Brand setup was skipped, offer it once more: "Would you like to add your logo and brand colours now?" On a yes, use `readyteam-brand-setup` in the same tab.

## Celebration script

```js
// ReadyTeam onboarding celebration: a confetti shower and a "You're all set" message on the ReadyTeam page.
// Run once in the ReadyTeam tab, then call window.__rtCelebrate({ company, lines, colors }).
(() => {
  if (window.__rtCelebrateStop) window.__rtCelebrateStop();

  window.__rtCelebrate = (opts = {}) => {
    if (window.__rtCelebrateStop) window.__rtCelebrateStop();
    const Z = 2147483600;
    const CORAL = '#E8604C';
    const colors = [...(opts.colors || []).filter((c) => /^#[0-9a-f]{3,8}$/i.test(c || '')), CORAL, '#FF7A00', '#151515', '#B1B1B1', '#FFC38A', '#FFFFFF'];
    const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Confetti canvas over the whole page; clicks pass through it.
    const cv = document.createElement('canvas');
    Object.assign(cv.style, { position: 'fixed', inset: '0', width: '100vw', height: '100vh', zIndex: Z, pointerEvents: 'none' });
    const ctx = cv.getContext('2d');
    const dpr = Math.min(2, devicePixelRatio || 1);
    const size = () => { cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    size();
    addEventListener('resize', size);

    const parts = [];
    const burst = (n, fromTop) => {
      for (let i = 0; i < n; i++) {
        const side = Math.random() < 0.5 ? -1 : 1;
        parts.push(fromTop ? {
          x: Math.random() * innerWidth, y: -20 - Math.random() * innerHeight * 0.5,
          vx: (Math.random() - 0.5) * 2, vy: 2 + Math.random() * 3,
        } : {
          // From the two bottom corners, up and inwards.
          x: side < 0 ? -10 : innerWidth + 10, y: innerHeight * (0.65 + Math.random() * 0.2),
          vx: -side * (6 + Math.random() * 8), vy: -(10 + Math.random() * 9),
        });
        Object.assign(parts[parts.length - 1], {
          w: 6 + Math.random() * 7, h: 8 + Math.random() * 10, r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
          sway: Math.random() * Math.PI * 2, c: colors[Math.floor(Math.random() * colors.length)], round: Math.random() < 0.25,
        });
      }
    };
    let raf = 0;
    const start = performance.now();
    const frame = (now) => {
      const age = now - start;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (const p of parts) {
        p.vy = Math.min(p.vy + 0.18, 6);
        p.vx *= 0.985;
        p.sway += 0.05;
        p.x += p.vx + Math.sin(p.sway) * 0.8;
        p.y += p.vy;
        p.r += p.vr;
        if (p.y > innerHeight + 30) continue;
        ctx.save();
        ctx.globalAlpha = age > 6500 ? Math.max(0, 1 - (age - 6500) / 1500) : 1;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.c;
        if (p.c.toUpperCase() === '#FFFFFF') { ctx.strokeStyle = '#E5E5E5'; ctx.lineWidth = 1; }
        if (p.round) { ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2); ctx.fill(); }
        else { ctx.fillRect(-p.w / 2, -p.h / 4, p.w, p.h / 2 * (0.6 + Math.abs(Math.cos(p.r)) * 0.8)); }
        ctx.restore();
      }
      if (age < 8000) raf = requestAnimationFrame(frame);
      else cv.remove();
    };
    if (!calm) {
      document.body.append(cv);
      burst(150, false);
      burst(120, true);
      setTimeout(() => burst(110, true), 900);
      setTimeout(() => burst(90, false), 1800);
      raf = requestAnimationFrame(frame);
    }

    // The message card.
    const wrap = document.createElement('div');
    Object.assign(wrap.style, {
      position: 'fixed', inset: '0', zIndex: Z - 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(21,21,21,.35)', padding: '16px', opacity: '0', transition: 'opacity .35s ease',
      font: '15px/1.5 Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    });
    const lines = (opts.lines || []).slice(0, 6);
    wrap.innerHTML =
      '<div role="dialog" aria-modal="true" aria-labelledby="rt-cel-h" style="background:#fff;color:#151515;max-width:440px;width:100%;border-radius:14px;' +
      'box-shadow:0 20px 60px rgba(0,0,0,.3);border-top:6px solid ' + CORAL + ';padding:26px 26px 20px;transform:translateY(12px) scale(.97);transition:transform .35s ease">' +
      '<div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#6F6F6F;font-weight:600">ReadyTeam setup complete</div>' +
      '<h2 id="rt-cel-h" style="margin:6px 0 8px;font:700 34px/1.1 \'Barlow Condensed\',\'Arial Narrow\',Arial,sans-serif;color:#151515">You’re all set' + (opts.company ? ',<br>' + esc(opts.company) : '') + '!</h2>' +
      '<p style="margin:0 0 12px;color:#3a3a3a">' + esc(opts.message || 'Your company is set up in ReadyTeam and your first project is under way.') + '</p>' +
      (lines.length ? '<ul style="margin:0 0 16px;padding:0;list-style:none">' + lines.map((l) =>
        '<li style="display:flex;gap:10px;align-items:flex-start;padding:5px 0;border-top:1px solid #F0F0F0"><span style="flex:none;width:18px;height:18px;border-radius:50%;background:' + CORAL +
        ';color:#fff;font-size:12px;line-height:18px;text-align:center;margin-top:2px">✓</span><span>' + esc(l) + '</span></li>').join('') + '</ul>' : '') +
      '<div style="display:flex;justify-content:flex-end"><button type="button" style="font:inherit;font-weight:600;background:' + CORAL +
      ';color:#fff;border:0;border-radius:8px;padding:9px 18px;cursor:pointer">' + esc(opts.button || 'Start using ReadyTeam') + '</button></div></div>';
    document.body.append(wrap);
    requestAnimationFrame(() => { wrap.style.opacity = '1'; wrap.firstChild.style.transform = 'none'; });

    const stop = () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', size);
      removeEventListener('keydown', onKey, true);
      cv.remove();
      wrap.remove();
      window.__rtCelebrateStop = null;
      window.__rtCelebrated = true;
    };
    const onKey = (e) => { if (e.key === 'Escape') stop(); };
    addEventListener('keydown', onKey, true);
    wrap.querySelector('button').onclick = stop;
    wrap.addEventListener('click', (e) => { if (e.target === wrap) stop(); });
    wrap.querySelector('button').focus();
    window.__rtCelebrateStop = stop;
    return 'Celebration showing';
  };
  return 'ReadyTeam celebration ready: call window.__rtCelebrate({ company, lines, colors })';
})();
```
