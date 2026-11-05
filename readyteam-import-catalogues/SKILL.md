---
name: readyteam-import-catalogues
description: Import a client's CATALOGUES spreadsheet (catalogue categories and their items) into ReadyTeam (Import Your Data, Optional, Catalogues) using Claude in Chrome. Use when the user gives an Excel/CSV of catalogue categories and items (Category, Description, Unit Cost, Supplier, UOM, Qty) and asks to import or load catalogues into ReadyTeam. Fills the two importer tabs and clicks Import Data.
---

# ReadyTeam: import Catalogues

You operate the ReadyTeam web app in the user's Chrome (Claude in Chrome tools). The user must be signed in. Never type or ask for a password; if a login page appears, stop and ask the user to sign in.

The ReadyTeam address is **the ReadyTeam site the user is using**: either **https://app.readyteam.ai/** (live) or **https://ready-team-staging.web.app/** (test). Use the one from onboarding, or the one already open in a Chrome tab (check `tabs_context_mcp`), or the one the user names; if none, use https://app.readyteam.ai/. Stay on that same site for every step and never switch to the other one.

## Asking the user

- **Every question is buttons. No exceptions.** Ask every question, including yes/no checks, "is this the right company?", "are you signed in?" and "ready for the next step?", with the chat's multiple-choice question tool (`AskUserQuestion`, or an "ask the user" tool that shows options). If that tool is listed but not loaded yet (deferred), load it with ToolSearch first (`select:AskUserQuestion`), before your first question. One question per call, 2 to 4 short options (a few words each, the recommended one first), each with a one-line description; the user can still type their own answer.
  - Never ask in plain text. Never write "Reply yes", "reply done", "tell me the right name" or "type ..." as the way to answer. Put the question in the tool, not in your message.
  - Example: "The top of your screen shows the company **Claude Testing**. Is that the company we're setting up?" Options: **Yes, that's it** · **No, it's a different company**. If they pick the second, ask them to switch company in ReadyTeam (top of the screen) and then ask, as buttons: **I've switched** · **I need help**.
  - Only if this chat truly has no such tool: end the message with a short numbered list of the options and say they can reply with the number.
- **Files: say exactly what and how.** When you need a file, say which file, what it looks like, and how to attach it: "Tap **+** below the message box, then **Upload a file**, and choose your <file> (.xlsx or .csv)." Ask it as a button question with options such as **I've attached it**, **I don't have one** and **Skip**. Claude cannot show an upload button in the chat; the **+** is the upload.
- **Do the work yourself.** Once the user has given a file or a choice, do every ReadyTeam click, upload, typing and navigation yourself. Reuse what you already have in this chat (the logo, the brand colours, the company name, earlier answers) instead of asking again. Ask only for what you cannot get or decide: files only the user has, real choices, and one yes before anything is saved, imported or uploaded.
- **One yes, as a button.** Before a save, import or upload, show what will change and ask once, with options such as **Go ahead**, **Show me first** and **Not now**.

## Before you start

1. Get the sheet's file path (.xlsx or .csv). Read it.
2. The importer has **two tabs**, filled in this order:
   - **Catalogues Category**: one column, **Catalogues Category**. Only category names go here.
   - **Catalogues Items**: all the line items. Columns: **Category, Photo, Description, Unit Cost (Ex), Supplier, UOM, Qty** (this is the order the staging grid showed; the owner's screenshot showed Category, Description, Photo, Unit Cost (Ex), UOM, Supplier, Qty). **The order can differ, so read the header row in the grid and build the pasted columns in exactly that order.**
   Build both from the sheet: the category list is the unique Category values (keep first-appearance order); the items tab is one row per item. Map headings by name and tell the user the mapping. Leave **Photo** empty unless the sheet has an image URL for it. Leave other missing cells empty rather than inventing values.
   **Category rules (from the owner):** on the items tab, Category is a **dropdown whose options are the categories entered on the first tab**. A category that does not match an option is removed (cell left empty). **Category is required to import**, so any item left without a category will be Invalid and block Import Data: report those items to the user and ask what to do (add the missing category on the first tab, or leave the item out).
3. Count the categories and items. Tell the user: "I will enter C categories and N items into Catalogues and click Import Data." Get a yes before clicking Import Data, unless they already said to go ahead.
4. Load the Chrome tools in one ToolSearch call, call `tabs_context_mcp`, open a new tab, and go to the ReadyTeam address. If a login screen appears, ask the user to sign in in that tab.

## Steps

1. Click your name/company block at the **bottom-left** of the sidebar. A menu opens; click **Import Your Data**. (If the menu does not open, click again after the page finishes loading.)
2. In the "<Company> / Import Your Data" table, click the arrow next to the **Optional** folder. Its sub-rows include Recipes, **Catalogues**, Selections Questions, Specification, Project, Labels, UOM.
3. Click the **upload icon** in the **Catalogues** row's Tools column. (Locate it by screenshot.) This dialog has no Download Sample button.
4. Choose **Upload Excel file** (the other choice is Template Library, not used) and click **Continue**.
5. Wait up to ~15 seconds for the importer grid. The first tab, **Catalogues Category**, shows "Drag and drop or upload a file to get started".
6. On **Catalogues Category**, click **Manually enter data** (it sometimes needs a second click), click the first cell, and paste the category names (one per row). Fast method: write them to a text file and `pbcopy < file.txt` on Mac, then cmd+v. Fall back to typing.
7. Open the **Catalogues Items** tab (next to Catalogues Category), click **Manually enter data** if the empty-state prompt shows, click the first Category cell, and paste the item rows as tab-separated text in the grid's own column order (leave Photo empty). Paste **once**. Keep numbers plain. Do this only after the category tab is filled, because the Category dropdown reads from it.
8. On each tab check the counter at the top right ("N Records" matches) and that the **Invalid** tab is empty. Scroll to the last rows and compare with the sheet. Every Category on the items tab must match a category from the first tab; rows with a red or empty Category are Invalid. Fix clear typos (for example case or extra spaces); if the cause is unclear, stop and report.
9. Click the black **Import Data** button (top right). Wait for the progress card to finish; the popup then closes by itself and the Import Your Data table returns.
10. Report: categories and items entered, and that the popup closed. Do not click Import Data a second time.

## Rules

- **Paste once.** Pasting a second time into a grid that already has rows adds records (it produced 1,178 records from 639 rows). If a paste went wrong, close the grid (black X, Confirm) and restart from the dialog; do not paste over.
- **Use UTF-8 for the clipboard on Mac:** `LC_ALL=en_US.UTF-8 pbcopy < file`. Without it, characters like ®, – and curly quotes turn into garbage (24 of 639 sample rows were affected). After pasting, check a row that has such a character.

- **Clipboard check:** copy the prepared rows to the clipboard immediately before pasting, and after pasting verify the first cell and the record count. If the grid shows anything that is not from the sheet (for example an email address or other stray text), do not click Import Data: close the grid (black X, then Confirm) or overwrite the rows, and tell the user without repeating the stray text.

- Never click Import Data while an Invalid tab has rows unless the user explicitly says to import anyway.
- To leave the grid early, use the black X at the top right and **Confirm** the "Close Window" prompt (unsaved rows are lost).
- Do not paste the file contents into chat; report counts and a few example rows.
- One module per run.

## Raw exports

A client's catalogue file may be a raw database export instead of a clean sheet (the sample had 999 rows and 16 columns such as `_id`, `description`, `categoryId`, `qty`, `unitCost_ex`, `attachment`, plus about 350 completely blank rows). Use only: category name (`categoryId`/category) -> Category, `description` -> Description, `unitCost_ex` -> Unit Cost (Ex), `qty` -> Qty. Drop blank rows and rows without a description (category-only rows still add to the category list). `attachment` holds file metadata, not an image URL, so leave Photo empty. Supplier and UOM are empty unless the sheet has them. Tell the user how many rows were dropped.

## Status

Verified by hand on the staging site: menu, Optional > Catalogues, dialog, Continue, both tabs and their columns (the items column order above comes from the owner's full-size screenshot). Filled both tabs on staging from the raw sample: 168 categories (168 valid), then 639 items (639 valid, 0 invalid). Import Data was then clicked (639 items, 168 categories): the popup closed within a few seconds, and the Catalogues row in the Import Your Data table showed Import Status "Completed" after about 45 seconds. A large import can take that long, so wait up to a minute and re-check the Import Status column before reporting. Tell the user what actually happened so this skill can be updated.
