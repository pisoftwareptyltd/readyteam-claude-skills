---
name: "readyteam-estimation"
description: "Create a ReadyTeam project and load its estimate into Cost Assistant from one estimate file via Claude in Chrome. Use only when the user says \"Readyteam estimation\" or names this skill."
---

# ReadyTeam Estimation: project + Cost Assistant from one estimate document

You operate the ReadyTeam web app in the user's Chrome (Claude in Chrome tools). The user is already signed in. Never type or ask for a password; if a login page appears, stop and ask the user to sign in.

One document = ONE project (not a project list; for lists use project-import). Do one project per run.

## Asking the user

- **Every question is buttons. No exceptions.** Ask every question, including yes/no checks, "is this the right company?", "are you signed in?" and "ready for the next step?", with the chat's multiple-choice question tool (`AskUserQuestion`, or an "ask the user" tool that shows options). If that tool is listed but not loaded yet (deferred), load it with ToolSearch first (`select:AskUserQuestion`), before your first question. One question per call, 2 to 4 short options (a few words each, the recommended one first), each with a one-line description; the user can still type their own answer.
  - Never ask in plain text. Never write "Reply yes", "reply done", "tell me the right name" or "type ..." as the way to answer. Put the question in the tool, not in your message.
  - Example: "The top of your screen shows the company **Claude Testing**. Is that the company we're setting up?" Options: **Yes, that's it** · **No, it's a different company**. If they pick the second, ask them to switch company in ReadyTeam (top of the screen) and then ask, as buttons: **I've switched** · **I need help**.
  - Only if this chat truly has no such tool: end the message with a short numbered list of the options and say they can reply with the number.
- **Files: say exactly what and how.** When you need a file, say which file, what it looks like, and how to attach it: "Tap **+** below the message box, then **Upload a file**, and choose your <file> (.xlsx or .csv)." Ask it as a button question with options such as **I've attached it**, **I don't have one** and **Skip**. Claude cannot show an upload button in the chat; the **+** is the upload.
- **Do the work yourself.** Once the user has given a file or a choice, do every ReadyTeam click, upload, typing and navigation yourself. Reuse what you already have in this chat (the logo, the brand colours, the company name, earlier answers) instead of asking again. Ask only for what you cannot get or decide: files only the user has, real choices, and one yes before anything is saved, imported or uploaded.
- **One yes, as a button.** Before a save, import or upload, show what will change and ask once, with options such as **Go ahead**, **Show me first** and **Not now**.

## Before you start

1. Get the file path of the estimate document. Read all of it.
2. Extract the **project details**:
   - **Project Name** (required)
   - **Home Address** (required). If it is not in the document, ASK the user. Do not invent one.
   - **Client** (optional). If the document has a client, note the name. If none, create the project without a client; the user adds it later.
3. Extract the **estimate lines** (cost items: description, code/category, qty, unit, rate, totals, whatever the document has). Then remove the document's own item numbers from them (see **Item numbers** below).
4. Tell the user a short summary: project name, address, client (or "none"), number of estimate lines, how many category and item names had a number removed (with two examples, before and after), then get a yes before clicking Create Project, unless they already said go ahead.
5. Address: **the ReadyTeam site the user is using**: either **https://app.readyteam.ai/** (live) or **https://ready-team-staging.web.app/** (test). Use the one from onboarding, or the one already open in a Chrome tab (check `tabs_context_mcp`), or the one the user names; if none, use https://app.readyteam.ai/. Stay on that same site for every step and never switch to the other one. Load the Claude in Chrome tools in one ToolSearch call if deferred, call `tabs_context_mcp`, open a new tab and navigate there. Work in that tab.

## Part 1: Create the project

1. On the Dashboard, click the orange **+ Add Project** button at the top of the left sidebar (above Search Project).
2. The **Create New Project** dialog opens. Left side lists **Companies**; leave the default (already selected) company unless the user names another.
3. Fill:
   - **Project Name\*** = project name from the document.
   - **Document Prefix\*** = short code derived from the project name (e.g. initials or first letters, uppercase, no spaces). **Maximum 20 characters.** It must be **unique**: ReadyTeam refuses a prefix already used by another project.
   - **Home Address\*** = address from the document (or the one the user gave).
   - **Select Client** dropdown: pick the client if it exists in the list. If the document has no client, leave it empty. If the document has a client that is not in the list, tell the user and leave it empty unless they tell you to use **+ Create Client**.
4. Click **Create Project**.
5. If it fails with a duplicate prefix error, change the prefix slightly (append 2, 3, ... or alter a letter), keep it within 20 characters, and click Create Project again. Repeat until it succeeds. Tell the user the final prefix used.
6. On success the new project's dashboard opens (title like "P1000 - <Project Name>", status Draft).

## Part 2: Cost Assistant import

1. On the project dashboard, scroll to the **Estimations** section and click the **Cost Assistant** card. (The toolbar link "Cost Assistant", top left, also works.)
2. The **Quick Start** page opens. Click **Import from Excel** ("Upload your custom templates"). Do not use Create a blank estimate, Copy from project, Import from data setup, or the Readyteam Template cards.
3. The flat-file importer opens. Click **Manually enter data**. (It sometimes needs a second click; check by screenshot.) Note the grid's column headers and map the estimate lines to them by header name. Tell the user the mapping. If a required column has no source in the document, ask.
4. Enter every estimate line into the grid, using the names with item numbers removed. Fastest: build a tab-separated block (no header) in the grid's column order, copy it to the clipboard (`pbcopy < file.tsv` on Mac), click the first cell, and press cmd+v. Fallback: type cell by cell (click a cell, type, Tab) and use the **+** at the bottom-left to add rows. The importer is an embedded widget, so verify with screenshots/zoom, not page text.
5. Check the "N Records" counter and the **All / Valid / Invalid** tabs. Records must equal the lines you entered. Fix invalid rows when the cause is clear; otherwise stop and report them.
6. Click the **Import Data** button (top right of the importer). Wait for it to finish, take a screenshot, and report the result. Do not click it twice.

## Item numbers

ReadyTeam numbers groups and items itself, so the document's own numbering must not be imported. Estimates often put a number in front of category (group) and item names, for example "1. Preliminaries", "1.1 Site establishment", "2.03 - Excavation", "A1) Demolition", "(b) Skip bin", "Item 4: Scaffold", "#12 Downpipes".

- Remove a **leading** number or code and the separator after it (space, ".", ")", ":", "-", "–") from Group and Description. Keep the rest of the name exactly as written.
  - "1. Preliminaries" becomes "Preliminaries"; "1.1 Site establishment" becomes "Site establishment"; "2.03 - Excavation" becomes "Excavation"; "Item 4: Scaffold" becomes "Scaffold".
- Remove it only when it is numbering: it is at the very start and the other lines follow the same pattern (1, 1.1, 1.2, 2, 2.1 ...). Do **not** remove numbers that are part of the name, for example "2 x 4 timber framing", "90mm PVC pipe", "3 Phase power", "Level 2 slab", "Stage 1 handover", "10mm plasterboard".
- A separate item-number column (No., Item No., Ref, #, Line) is not mapped to any grid column. Leave it out.
- Never touch numbers in Qty, Unit Cost or other number columns.
- If you are not sure whether a number is numbering or part of the name, keep it, and list those lines for the user in the summary.

## Rules

- Never guess a missing address. Ask.
- No client in the document = create without a client; do not block.
- Do not click Cancel/Close or delete anything unless fixing an invalid row.
- Never import while the Invalid tab has rows unless the user says so.
- If something fails after Import Data, report the error text and do not retry blindly (duplicates).
- Do not paste the document contents back into chat; report counts and a few example rows.

## Status of this skill

Verified from the user's walkthrough: Add Project button, Create New Project dialog fields and rules, Estimations > Cost Assistant, Quick Start > Import from Excel. **Not yet verified:** the flat-file import grid's exact columns, required fields, any dropdowns, and the post-import screen. On the first run, read the grid headers on screen and confirm the mapping with the user, then update this section.