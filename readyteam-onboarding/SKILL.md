---
name: readyteam-onboarding
description: Onboard a company into ReadyTeam end to end by running the ReadyTeam skills in the right order - Brand setup (logo and colours), Cost Code, Catalogues (optional), Cost Assistant, Job Assistant, then the first project: Create Project, Estimation (start its estimate in Cost Assistant) and Allowances (PC / PS), Specifications and Selections guides. Use when the user says "onboarding", "onboard a company", "set up my company in ReadyTeam", "start ReadyTeam setup", "import all my data", or gives several ReadyTeam files at once (logo, cost codes, catalogues, cost assistant, job template). Also use to resume an onboarding that was started earlier.
---

# ReadyTeam onboarding

This skill does not import anything itself. It runs the other ReadyTeam skills one after another, in a fixed order, and keeps track of what is done. Each step's own skill holds the real instructions; follow that skill fully for its step.

## How to talk to the user

The user is usually not technical. They may start with only a pasted prompt and nothing else.

- Use plain words. No file paths, code, tool names or skill names unless they ask.
- Ask **one question at a time** and wait for the answer.
- When you need a file, ask them to attach it to the chat (or drag it in). Accept a file path too if they give one.
- When they must do something (sign in, install the Chrome extension), tell them exactly what to click, in short numbered steps.

## Step 0: get the step instructions

Each step's instructions live in its own skill:

| Skill | Needed for |
|---|---|
| `readyteam-brand-setup` | Step 1 |
| `readyteam-import-cost-code` | Step 2 |
| `readyteam-import-catalogues` | Step 3 |
| `readyteam-import-cost-assistant` | Step 4 |
| `readyteam-import-job-assistant` | Step 5 |
| `readyteam-create-project-guide` | Step 6 |
| `readyteam-estimation-guide` | Step 7 |
| `readyteam-allowance-guide` | Step 8 |
| `readyteam-specification-guide` | Step 9 |
| `readyteam-selection-guide` | Step 10 |

Use the installed skill when it is in your skill list. When it is not installed, read it from GitHub instead and follow it exactly as if it were installed:

`https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/<skill-name>/SKILL.md`

Use any web fetch tool you have; if none works, open the URL in the Claude in Chrome tab and read the page text. Only if a step's instructions can be found neither way, stop and tell the user that part of the setup could not be loaded. Never do a step from memory.

Also check that the Claude in Chrome tools are available, because every step uses them. If they are not, tell the user in simple steps to install the Claude in Chrome extension in Google Chrome, sign in to it with the same Claude account, keep Chrome open, and then reply "done". Do not continue until the tools work.

## Step 0b: start

1. Greet the user in one line and show the ten steps as a short numbered list in plain words (your logo and brand colours, cost codes, catalogue (optional), Cost Assistant, job template, create your first project, start its estimate, set its allowances, add specifications, add selections). Say you will do them **one at a time** and check with them after each one.
2. Use **https://app.readyteam.ai/**. Do not ask about the site; use the staging site only if the user mentions it. Open ReadyTeam in a new Chrome tab. If it shows a login page, ask the user to sign in there and reply "done".

Do **not** ask for the company name. Everything goes into the company the user is signed in to. Read its name from ReadyTeam (for example the "<Company> / Import Your Data" title) and use it only for the progress log.

Do **not** ask for all the files up front. Ask for each file only when its step starts.

## Each step, one at a time

Do the steps one by one, never several together. For every step, go through this in order and wait for the user where it says so:

1. **Announce it:** "Step N of 10: <step name>." Say in one or two plain sentences what this step adds to ReadyTeam and why it comes now.
2. **Ask for the file:** "Please attach your <file> file." For an optional step, add "or say skip". Wait. If they skip, mark it skipped and go to the next step.
3. **Check the file:** read it and tell them what you found: number of rows, two or three example rows, and anything you had to change or could not use. Ask any question the step's skill needs answered.
4. **Get a yes:** "I will now import N rows into <step name>. Shall I go ahead?" Wait for a yes.
5. **Import:** follow the step's skill. While it runs, give a short update at each stage (opening Import Your Data, entering the rows, checking for errors, importing).
6. **Report:** say what was imported (rows, and the "Completed" status) or what went wrong, in plain words. Update the progress log.
7. **Move on:** show progress (for example "Done: 1, 2. Next: 3 of 10, Catalogues") and ask "Ready for the next step?" Wait for a yes before announcing the next step.

Steps 1 and 6 to 10 are not imports, so for points 2 to 6 follow their own skills instead: Brand setup asks for the logo, shows the colours it picked and asks before saving; the Create Project, Estimation, Allowance, Specification and Selection guides need no file: they put an on-screen guide in ReadyTeam and the user does the clicking. Points 1 and 7 still apply.

## The order and why

Run the steps strictly in this order. Later steps use what earlier steps created.

1. **Brand setup** (skip if no logo) - `readyteam-brand-setup`. The company's logo and colours go on first, so everything made later (documents, estimates, the first project) already carries the brand. Ask for the logo; if the user has none to hand, skip it and offer it again at the end.
2. **Cost Code** - `readyteam-import-cost-code`. Everything after it refers to cost codes.
3. **Catalogues** (optional) - `readyteam-import-catalogues`. Skip when the user has no catalogue file.
4. **Cost Assistant** - `readyteam-import-cost-assistant`. After cost codes (and catalogues, if any).
5. **Job Assistant** - `readyteam-import-job-assistant`. Its User, Trade Types and Label values must already exist in the company; the import skill explains how non-matching values are handled.
6. **Create Project** (guide) - `readyteam-create-project-guide`. The user creates their first project with the on-screen guide. Ask: "Shall I show you how to create your first project, start its estimate, set its allowances, and add specifications and selections?" If they say skip, also skip steps 7 to 10.
7. **Estimation** (guide) - `readyteam-estimation-guide`. Runs straight on from step 6 with no stop in between: the create-project skill loads both guides together, and once the project is created the estimation guide opens its Cost Assistant by itself and asks on screen how to start the estimate: Copy from project, Import from Excel, or Import from data setup (the Cost Assistant items from step 4). Announce steps 6 to 10 together, and report all five when the user replies. After step 6, because it uses the project from step 6 and the data from steps 2 to 4.
8. **Allowances** (guide) - `readyteam-allowance-guide`. Runs straight on from step 7: once the estimate is in, the allowance guide opens a category, scrolls the grid to the Allowance column by itself, and shows how to double-click an item's Allowance cell and choose PC (Prime Cost) or PS (Provisional Sum). The create-project skill loads it with the other guides. After step 7, because it needs the estimate.
9. **Specifications** (guide) - `readyteam-specification-guide`. Runs straight on when the user clicks Done in the allowance guide: it points at an item's + > Specification, the notes list (General Notes, Inclusions, Exclusions, Internal Notes, Digital Key), puts the cursor in the editor, and shows that closing the window saves it.
10. **Selections** (guide) - `readyteam-selection-guide`. Runs straight on when the user clicks Done (or Skip) in the specification guide: item + > Selection, open a question category, tick a question, Continue, tick the product, Continue. It warns that **Use Selected Item Price as Unit Cost** changes the item's unit cost to the product's price. Last.

## Rules between steps

- Finish one step completely (import done and confirmed) before starting the next. The skills each handle one thing per run.
- Get a yes before every Import Data click, every save, and before every new step, even if the user said "go ahead" earlier. The user should always know which step is running.
- **Stop on failure.** If a required step fails or its Invalid tab cannot be cleared, stop the flow, report what happened, and ask the user. Do not continue to later steps on top of a failed one. A failed optional step (Brand setup, Catalogues, Create Project, Estimation, Allowances, Specifications, Selections) may be skipped if the user agrees.
- Never re-run a step that already imported, unless the user asks: importing twice creates duplicates, creating the project twice gives two projects, and starting the estimate twice adds its items twice.
- Use the same browser tab and site throughout; if a login page appears, ask the user to sign in.

## Progress log

Keep a progress log so onboarding can resume in a later chat. If you can write files, keep `readyteam-onboarding-<company>.md` (company name as shown in ReadyTeam) in the user's working folder; otherwise post the log in chat after each step. Update it after every step:

```
Company: <name from ReadyTeam>   Site: <url>   Started: <date>
1 Brand setup     - done, logo + #ff7a00 / #1b2a4b, <date>
2 Cost Code       - done, 96 rows, <date>
3 Catalogues      - skipped (no file)
4 Cost Assistant  - done, 40 rows
5 Job Assistant   - failed: 2 invalid rows (User), waiting on user
6 Create Project  - not started
7 Estimation      - not started
8 Allowances      - not started
9 Specifications  - not started
10 Selections     - not started
```

When resuming, read the log (or ask the user for it), confirm with the user which steps are already done in ReadyTeam, and continue from the first step that is not done.

## Finish

When all steps are done or skipped, give a short summary: each step with what was done (rows imported, colours set, project created, how the estimate was started, allowances set, items given specifications or selections) or "skipped", and anything the user must follow up on (removed trade types, users left empty, items left out).

If Brand setup was skipped, offer it once more: "Would you like to add your logo and brand colours now?" On a yes, use `readyteam-brand-setup` in the same tab.
