---
name: readyteam-import-cost-assistant
description: Import a client's COST ASSISTANT spreadsheet (estimate items with Group, Description, Type, Qty, Unit Cost, UOM) into ReadyTeam (Import Your Data, Cost Assistant, Cost Assistant) using Claude in Chrome. Use when the user gives an Excel/CSV of cost assistant items and asks to import or load them into ReadyTeam. Enters the rows into the importer grid and clicks Import Data.
---

# ReadyTeam: import Cost Assistant items

You operate the ReadyTeam web app in the user's Chrome (Claude in Chrome tools). The user must be signed in. Never type or ask for a password; if a login page appears, stop and ask the user to sign in.

The ReadyTeam address is **the ReadyTeam site the user is using**: either **https://app.readyteam.ai/** (live) or **https://ready-team-staging.web.app/** (test). Use the one from onboarding, or the one already open in a Chrome tab (check `tabs_context_mcp`), or the one the user names; if none, use https://app.readyteam.ai/. Stay on that same site for every step and never switch to the other one.

## Asking the user

- **Buttons for every question with set answers.** When this chat has a multiple-choice question tool (for example `AskUserQuestion`, or an "ask the user" tool that shows options), use it for every question whose answers you can list: one question per call, 2 to 4 short options (a few words each, the recommended one first), each with a one-line description. The user can still type their own answer. Without such a tool, end the message with a short numbered list of the same options and say they can reply with the number.
- **Files: say exactly what and how.** When you need a file, say which file, what it looks like, and how to attach it: "Tap **+** below the message box, then **Upload a file**, and choose your <file> (.xlsx or .csv)." Ask it as a button question with options such as **I've attached it**, **I don't have one** and **Skip**. Claude cannot show an upload button in the chat; the **+** is the upload.
- **Do the work yourself.** Once the user has given a file or a choice, do every ReadyTeam click, upload, typing and navigation yourself. Reuse what you already have in this chat (the logo, the brand colours, the company name, earlier answers) instead of asking again. Ask only for what you cannot get or decide: files only the user has, real choices, and one yes before anything is saved, imported or uploaded.
- **One yes, as a button.** Before a save, import or upload, show what will change and ask once, with options such as **Go ahead**, **Show me first** and **Not now**.

## Before you start

1. Get the sheet's file path (.xlsx or .csv). Read it.
2. The importer grid has these columns, in this order:
   **Group, Description, Type, Qty, Unit Cost (Ex), UOM.**
   Map the sheet's headings to these by name (the sheet's own column order may differ) and tell the user the mapping. If a column is missing, ask before guessing. Leave a cell empty rather than inventing a value.
3. Count the data rows (no header, no blank rows). Tell the user: "I will enter N rows into Cost Assistant and click Import Data." Get a yes before clicking Import Data, unless they already said to go ahead.
4. Load the Chrome tools in one ToolSearch call, call `tabs_context_mcp`, open a new tab, and go to the ReadyTeam address. If a login screen appears, ask the user to sign in in that tab.

## Steps

1. Click your name/company block at the **bottom-left** of the sidebar. A menu opens; click **Import Your Data**. (If the menu does not open, click again after the page finishes loading.)
2. In the "<Company> / Import Your Data" table, click the arrow next to the **Cost Assistant** folder. One sub-row, **Cost Assistant**, appears.
3. Click the **upload icon** in that row's Tools column. (Locate it by screenshot; its position moves with the table width.)
4. In the dialog choose **Upload Excel file** (the other choice is Template Library, not used) and click **Continue**.
5. Wait up to ~15 seconds for the full-screen importer grid. At first it may look blank; wait until the headers and "Drag and drop or upload a file to get started" appear.
6. Click **Manually enter data** (it sometimes needs a second click; check by screenshot that the empty editable grid shows).
7. Fill the grid. **Fastest method:** build a tab-separated file of the data rows (no header) in the grid's column order (Group, Description, Type, Qty, Unit Cost (Ex), UOM), copy it to the clipboard (`pbcopy < file.tsv` on Mac), click the first Group cell, press cmd+v. Fall back to typing cell by cell if paste is not possible. Keep values exactly as in the sheet; keep numbers plain (no currency symbols or thousands separators).
8. Check the counter at the top right: "N Records" must equal the rows you entered, and the **Invalid** tab must be empty. Scroll to the last rows and compare with the sheet. Fix clear typos; if the cause is unclear, stop and report the rows and on-screen messages.
9. Click the black **Import Data** button (top right). A progress card "Import Data running on Cost Assistant" appears, then the popup closes by itself and the Import Your Data table returns.
10. Report: module, rows entered, and that the popup closed. Do not click Import Data a second time.

## Rules

- **Use UTF-8 for the clipboard on Mac:** `LC_ALL=en_US.UTF-8 pbcopy < file`. Without it, characters like ®, – and curly quotes are garbled. Paste only once: pasting again into a grid that already has rows adds records; if a paste went wrong, close the grid (black X, Confirm) and restart.

- **Clipboard check:** copy the prepared rows to the clipboard immediately before pasting, and after pasting verify the first cell and the record count. If the grid shows anything that is not from the sheet (for example an email address or other stray text), do not click Import Data: close the grid (black X, then Confirm) or overwrite the rows, and tell the user without repeating the stray text.

- Never click Import Data while the Invalid tab has rows unless the user explicitly says to import anyway.
- To leave the grid early, use the black X at the top right and **Confirm** the "Close Window" prompt (unsaved rows are lost).
- Do not paste the file contents into chat; report counts and a few example rows.
- One module per run.

## Notes from the app's sample file

The sample from Download Sample has the headings **Category Description, Description, Type, Qty, UOM, UnitCost Ex**. Map them as: Category Description -> Group, UnitCost Ex -> Unit Cost (Ex). Its first data row is a group-only row (Category Description filled, everything else empty); paste it as is. **Type** and **UOM** are dropdown cells in the grid (Type values like "Material"); pasted text is accepted when it matches an existing option.

## Status

Verified on the staging site with the app's sample file (4 rows): the paste landed in the right columns and the grid showed "4 Records, Valid 4, Invalid 0". Import Data was then clicked: a progress card "Import Data running on Cost Assistant" showed, and within ~15 seconds the popup closed by itself and the Import Your Data table returned (no popup message was seen, but the Cost Assistant row in the Import Your Data table then showed Import Status "Completed", so confirm success from that column). Tell the user what actually happened so this skill can be updated.
