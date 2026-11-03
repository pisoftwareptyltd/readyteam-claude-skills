---
name: readyteam-onboarding
description: Onboard a company into ReadyTeam end to end by running the import skills in the right order - Cost Code, Catalogues (optional), Cost Assistant, Job Assistant, then one Readyteam estimation per estimate file. Use when the user says "onboarding", "onboard <company>", "set up my company in ReadyTeam", "start ReadyTeam setup", "import all my data", or gives several ReadyTeam import files at once (cost codes, catalogues, cost assistant, job template, estimates). Also use to resume an onboarding that was started earlier.
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
| `readyteam-import-cost-code` | Step 1 |
| `readyteam-import-catalogues` | Step 2 |
| `readyteam-import-cost-assistant` | Step 3 |
| `readyteam-import-job-assistant` | Step 4 |
| `readyteam-estimation` | Step 5 |

Use the installed skill when it is in your skill list. When it is not installed, read it from GitHub instead and follow it exactly as if it were installed:

`https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/<skill-name>/SKILL.md`

Use any web fetch tool you have; if none works, open the URL in the Claude in Chrome tab and read the page text. Only if a step's instructions can be found neither way, stop and tell the user that part of the setup could not be loaded. Never do a step from memory.

Also check that the Claude in Chrome tools are available, because every step uses them. If they are not, tell the user in simple steps to install the Claude in Chrome extension in Google Chrome, sign in to it with the same Claude account, keep Chrome open, and then reply "done". Do not continue until the tools work.

## Step 0b: start

1. Greet the user in one line and show the five steps as a short numbered list in plain words (cost codes, catalogue (optional), Cost Assistant, job template, project estimates). Say you will do them **one at a time** and check with them after each one.
2. Ask the company name.
3. Use **https://app.readyteam.ai/**. Do not ask about the site; use the staging site only if the user mentions it. Open ReadyTeam in a new Chrome tab. If it shows a login page, ask the user to sign in there and reply "done".

Do **not** ask for all the files up front. Ask for each file only when its step starts.

## Each step, one at a time

Do the steps one by one, never several together. For every step, go through this in order and wait for the user where it says so:

1. **Announce it:** "Step N of 5: <step name>." Say in one or two plain sentences what this step adds to ReadyTeam and why it comes now.
2. **Ask for the file:** "Please attach your <file> file." For an optional step, add "or say skip". Wait. If they skip, mark it skipped and go to the next step.
3. **Check the file:** read it and tell them what you found: number of rows, two or three example rows, and anything you had to change or could not use. Ask any question the step's skill needs answered.
4. **Get a yes:** "I will now import N rows into <step name>. Shall I go ahead?" Wait for a yes.
5. **Import:** follow the step's skill. While it runs, give a short update at each stage (opening Import Your Data, entering the rows, checking for errors, importing).
6. **Report:** say what was imported (rows, and the "Completed" status) or what went wrong, in plain words. Update the progress log.
7. **Move on:** show progress (for example "Done: 1, 2. Next: 3 of 5, Cost Assistant") and ask "Ready for the next step?" Wait for a yes before announcing the next step.

For Estimation, treat each estimate file as its own round of items 2 to 6 (one project at a time), then ask whether there is another estimate.

## The order and why

Run the steps strictly in this order. Later steps use what earlier steps created.

1. **Cost Code** - `readyteam-import-cost-code`. Everything else refers to cost codes.
2. **Catalogues** (optional) - `readyteam-import-catalogues`. Skip when the user has no catalogue file.
3. **Cost Assistant** - `readyteam-import-cost-assistant`. After cost codes (and catalogues, if any).
4. **Job Assistant** - `readyteam-import-job-assistant`. Its User, Trade Types and Label values must already exist in the company; the import skill explains how non-matching values are handled.
5. **Estimation** - `readyteam-estimation`, once per estimate file (it creates the project and loads its estimate into the project's Cost Assistant). Last, because it needs steps 1 and 3 done.

## Rules between steps

- Finish one step completely (import done and confirmed) before starting the next. The import skills each handle one module per run.
- Get a yes before every Import Data click and before every new step, even if the user said "go ahead" earlier. The user should always know which step is running.
- **Stop on failure.** If a required step fails or its Invalid tab cannot be cleared, stop the flow, report what happened, and ask the user. Do not continue to later steps on top of a failed one. A failed optional step (Catalogues) may be skipped if the user agrees.
- Never re-run a step that already imported, unless the user asks: importing twice creates duplicates.
- Use the same browser tab and site throughout; if a login page appears, ask the user to sign in.

## Progress log

Keep a progress log so onboarding can resume in a later chat. If you can write files, keep `readyteam-onboarding-<company>.md` in the user's working folder; otherwise post the log in chat after each step. Update it after every step:

```
Company: <name>   Site: <url>   Started: <date>
1 Cost Code       - done, 96 rows, <date>
2 Catalogues      - skipped (no file)
3 Cost Assistant  - done, 40 rows
4 Job Assistant   - failed: 2 invalid rows (User), waiting on user
5 Estimation      - pending: 3 files
```

When resuming, read the log (or ask the user for it), confirm with the user which steps are already done in ReadyTeam, and continue from the first step that is not done.

## Finish

When all steps are done or skipped, give a short summary: each step with rows imported or "skipped", projects created by Estimation (name and prefix), and anything the user must follow up on (removed trade types, users left empty, items left out).
