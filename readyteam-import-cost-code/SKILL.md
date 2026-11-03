---
name: readyteam-import-cost-code
description: Import a client's COST CODES spreadsheet into ReadyTeam (Import Your Data > Contacts > Cost Code) using Claude in Chrome. Use when the user gives an Excel/CSV of cost codes (Code, Description, Category Code, Category Description) and asks to import or load them into ReadyTeam. Enters the rows into the importer grid and clicks Import Data.
---

# ReadyTeam: import a spreadsheet through Import Your Data

You operate the ReadyTeam web app in the user's Chrome (Claude in Chrome tools). The user is already signed in. Never type or ask for a password; if a login page appears, stop and ask the user to sign in.

## Before you start

1. Get the file path of the sheet (.xlsx or .csv) and which module it is for. Verified module: **Cost Code**. Other modules under Import Your Data (Trade Type, Contractor / Supplier, Client, Cost Assistant, Job Assistant, Timeclock, ...) are expected to work the same way, but their column names differ: read the grid's column headers at step 6 and map by header name.
2. Read the sheet. Check its columns match the target grid. For Cost Code the grid columns are:
   **Description, Code, Category Code, Category Description.**
   If the sheet uses other headings, map them (e.g. "Cost Code" -> Code, "Category" -> Category Description) and tell the user the mapping. If a column is missing, ask before guessing.
3. Count the data rows (exclude the header and blank rows). Tell the user: "I will enter N rows into <module> and click Import Data." Get a yes before the final Import Data click, unless the user already said to go ahead.
4. The ReadyTeam address is **https://app.readyteam.ai/** (use it unless the user names another; the test site is https://ready-team-staging.web.app/dashboard and must only be used when the user says so). Using the Claude in Chrome tools (load them in one ToolSearch call if they are deferred), call `tabs_context_mcp`, open a new tab, and navigate to that address. If the page shows a login screen, stop and ask the user to sign in in that tab, then continue. Do the work in that tab.
   - If no shell is available to copy to the clipboard (for example in a plain chat), tell the user and use the cell-by-cell fallback in step 7, or ask them to paste the prepared rows themselves.

## Steps

1. Click the user/company block at the **bottom-left** of the sidebar (your name and email). A menu opens: View Profile, System Setting, **Import Your Data**, Help, Sign Out. Click **Import Your Data**.
2. A table titled "<Company> / Import Your Data" opens with folders: Integration, Contacts, Cost Assistant, Job Assistant, Optional, Timeclock. Click the arrow on the folder that holds the module (Cost Code is under **Contacts**).
3. On the module's row, click the **upload icon** in the Tools column. (Trade Type has no upload icon.)
4. In the dialog, choose **Upload Excel file** and click **Continue**. (Other choices, Template Library and Sync From Xero, are not used here. "Download Sample" gives a sample sheet.)
5. Wait a few seconds until the full-screen importer grid appears. It says "Drag and drop or upload a file to get started".
6. Click **Manually enter data**. The grid becomes an empty editable table. Note its column headers.
7. Enter every row from the sheet into the grid. **Fastest method (tested, 96 rows in one go):** build a tab-separated file of the data rows (no header) with columns in the **grid's** column order (for Cost Code: Description, Code, Category Code, Category Description; the sheet's own order may differ, e.g. Code first), copy it to the clipboard (`pbcopy < file.tsv` on Mac), click the first Description cell, and press cmd+v. The whole block lands at once and leading zeros ("01.00", "01") are kept.
   - If paste does not work, fall back to typing cell by cell (click a cell, type, Tab) and use the **+** at the bottom-left to add rows.
   - The importer is an embedded widget, so page text may not show its cells. Rely on screenshots and zoom to verify; scroll to the last rows and compare them with the sheet.
8. When all rows are in, check the counter at the top right of the grid ("N Records") and the **All / Valid / Invalid** tabs.
   - Records must equal the number of rows you entered.
   - Open the **Invalid** tab. If there are invalid rows, fix them from the sheet's values if the cause is clear (typo, wrong column, missing required value); otherwise stop and report the rows and the on-screen messages to the user.
9. Click the black **Import Data** button at the top right.
10. When the import finishes, the importer popup **closes automatically**. Confirm by screenshot that the Import Your Data table is visible again, and report: module, rows entered, and the new "Last Date Imported" for that module.

## Rules

- **Use UTF-8 for the clipboard on Mac:** `LC_ALL=en_US.UTF-8 pbcopy < file`. Without it, characters like ®, – and curly quotes are garbled. Paste only once: pasting again into a grid that already has rows adds records; if a paste went wrong, close the grid (black X, Confirm) and restart.

- **Clipboard check:** copy the prepared rows to the clipboard immediately before pasting, and after pasting verify the first cell and the record count. If the grid shows anything that is not from the sheet (for example an email address or other stray text), do not click Import Data: close the grid (black X, then Confirm) or overwrite the rows, and tell the user without repeating the stray text.

- One module per run. If the user has several sheets, finish one import fully before starting the next.
- Do not click Cancel, Close, delete rows or Actions/Transform options unless needed to fix an invalid row.
- Never click Import Data while the Invalid tab still has rows, unless the user explicitly says to import anyway.
- If the popup does not close after Import Data, take a screenshot, read any error text, and report it. Do not click Import Data a second time (it could import duplicates).
- Do not paste file contents back into chat. Report counts and a few example rows.
- Keep a short running log: module, rows entered so far, validation counts.

## Status of this skill

Verified: steps 1 to 8 for Cost Code (paste of 96 rows gave "96 Records, Valid 96, Invalid 0"), and the Import Data click (progress bar "Import Data running on Cost Code", then the popup closes by itself and the Import Your Data table returns). Quirks seen: the Manually enter data button sometimes needs a second click (check by screenshot); the Tools-column upload icon moves right when the table is wider, so locate it by screenshot, not fixed coordinates; the importer may repeat identical codes without flagging them, so mention any duplicate codes in the sheet to the user before importing.
