---
name: readyteam-import-job-assistant
description: Import a client's JOB ASSISTANT (job template / schedule tasks) spreadsheet into ReadyTeam (Import Your Data, Job Assistant, Job Assistant) using Claude in Chrome. Use when the user gives an Excel/CSV of job template tasks (Group, Description, Duration, Offset, Predecessors, Workchain, Assign Client, labels, User, Trade Types) and asks to import or load them into ReadyTeam. Enters the rows into the importer grid and clicks Import Data.
---

# ReadyTeam: import Job Assistant items

You operate the ReadyTeam web app in the user's Chrome (Claude in Chrome tools). The user must be signed in. Never type or ask for a password; if a login page appears, stop and ask the user to sign in.

The ReadyTeam address is **the ReadyTeam site the user is using**: either **https://app.readyteam.ai/** (live) or **https://ready-team-staging.web.app/** (test). Use the one from onboarding, or the one already open in a Chrome tab (check `tabs_context_mcp`), or the one the user names; if none, use https://app.readyteam.ai/. Stay on that same site for every step and never switch to the other one.

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

## Before you start

1. Get the sheet's file path (.xlsx or .csv). Read it. If the sheet is not already in ReadyTeam's job template format, tell the user and map its columns by name in step 2.
2. The importer tab is **Job Assistant Items**. Its columns, in this order, are:
   **Group, Description, Workchain, Duration (Days), Predecessors, Assign Client, Offset (Days), User, Trade Types, Label.**
   Map the sheet's headings to these by name (the sheet may use "labels" for Label, and a different column order) and tell the user the mapping. Reorder the data to the grid's order before pasting.
3. Count the data rows (no header, no blank rows). Tell the user: "I will enter N rows into Job Assistant and click Import Data." Get a yes before clicking Import Data, unless they already said to go ahead.
4. Load the Chrome tools in one ToolSearch call, call `tabs_context_mcp`, open a new tab, and go to the ReadyTeam address. If a login screen appears, ask the user to sign in in that tab.

## Steps

1. Click your name/company block at the **bottom-left** of the sidebar. A menu opens; click **Import Your Data**. (If the menu does not open, click again after the page finishes loading.)
2. In the "<Company> / Import Your Data" table, click the arrow next to the **Job Assistant** folder. One sub-row, **Job Assistant**, appears.
3. Click the **upload icon** in that row's Tools column. (Locate it by screenshot.)
4. In the dialog choose **Upload Excel file** (the other choice is Template Library, not used) and click **Continue**.
5. Wait up to ~20 seconds for the importer grid (this one can be slow). Wait until the headers and "Drag and drop or upload a file to get started" appear.
6. Click **Manually enter data** (it sometimes needs a second click; confirm by screenshot).
7. Confirm the headers match the ten columns above (scroll the grid right if needed). Build a tab-separated file of the data rows (no header) in the grid's column order, copy it to the clipboard (`pbcopy < file.tsv` on Mac), click the first Group cell, press cmd+v. Fall back to typing cell by cell if paste is not possible.
   - Keep Predecessors exactly as in the sheet (row references), and keep Duration and Offset as plain numbers.
   - Leave a cell empty rather than inventing a value.
8. Check the counter at the top right: "N Records" must equal the rows you entered, and the **Invalid** tab must be empty. Scroll to the last rows and compare with the sheet. Fix clear typos; if the cause is unclear, stop and report the rows and on-screen messages.
9. Click the black **Import Data** button (top right). Wait for the progress card to finish; the popup then closes by itself and the Import Your Data table returns.
10. Report: module, rows entered, and that the popup closed. Do not click Import Data a second time.

## Rules

- **Use UTF-8 for the clipboard on Mac:** `LC_ALL=en_US.UTF-8 pbcopy < file`. Without it, characters like ®, – and curly quotes are garbled. Paste only once: pasting again into a grid that already has rows adds records; if a paste went wrong, close the grid (black X, Confirm) and restart.

- **Clipboard check:** copy the prepared rows to the clipboard immediately before pasting, and after pasting verify the first cell and the record count. If the grid shows anything that is not from the sheet (for example an email address or other stray text), do not click Import Data: close the grid (black X, then Confirm) or overwrite the rows, and tell the user without repeating the stray text.

- Never click Import Data while the Invalid tab has rows unless the user explicitly says to import anyway.
- To leave the grid early, use the black X at the top right and **Confirm** the "Close Window" prompt (unsaved rows are lost).
- Do not paste the file contents into chat; report counts and a few example rows.
- One module per run.

## Known validation trap: User and Trade Types

**User**, **Trade Types**, **Label**, **Workchain** and **Predecessors** are dropdown cells with fixed options. Pasted text that does not match an option exactly turns red and counts as Invalid, and the **Import Data button stays greyed out** while any row is invalid.

- The sheets use role codes in User; the grid's User options are display names: **Accounts, Admin, Client, Owner (Super Admin), Project Manager, Sales, Site Supervisor**. Codes are rejected as typed. Confirmed mapping (from the owner):

  | Sheet value | Enter in User |
  |---|---|
  | MASTER | Owner (Super Admin) |
  | PROJECTMANAGER | Project Manager |
  | SITESUPERVISOR | Site Supervisor |
  | CLIENT | Client |
  | ACCOUNTS | Accounts |
  | ADMIN, SALES | Admin, Sales |
  | EMPLOYEE (no matching option) | leave empty, and tell the user |

  For any other code, open the User dropdown and use the option that clearly matches; if none does, ask the user.
- **Trade Types and Label** must match the company's existing options. For Trade Types, if a value does not match an option, **remove it (leave the cell empty)** (rule from the owner; on staging "Electrician" was accepted and "Aircon-New", "Aircon-New-Workflow" were not). Say which values you removed. For Label, "PO" and "INVOICE" were accepted; handle a non-matching label the same way and report it.
- Open each dropdown once to read the real options before pasting. Apply the mapping when you build the tab-separated file.
- After pasting, open the **Invalid** tab, list each invalid cell and value, and report them. Only click Import Data once Invalid is 0.

## Status

Verified by hand on the staging site: menu, folder, upload icon, dialog, Continue, all ten grid columns, and pasting the app's sample (8 rows). Pasted as is: 2 valid, 6 invalid. With the User mapping and Trade Types removal above: **8 records, 8 valid, 0 invalid**. Import Data was then clicked: a progress card "Import Data running on Job Assistant" showed, the popup closed by itself in ~15 seconds, and about 20 seconds later the Job Assistant row in the Import Your Data table showed Import Status "Completed" (the status can lag, so wait ~30 seconds before reporting). Tell the user what actually happened so this skill can be updated.
