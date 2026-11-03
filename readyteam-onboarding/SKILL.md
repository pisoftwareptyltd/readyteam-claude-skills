---
name: readyteam-onboarding
description: Onboard a company into ReadyTeam end to end by running the import skills in the right order - Cost Code, Catalogues (optional), Cost Assistant, Job Assistant, then one Readyteam estimation per estimate file. Use when the user says "onboarding", "onboard <company>", "start ReadyTeam setup", "import all my data", or gives several ReadyTeam import files at once (cost codes, catalogues, cost assistant, job template, estimates). Also use to resume an onboarding that was started earlier.
---

# ReadyTeam onboarding

This skill does not import anything itself. It runs the other ReadyTeam skills one after another, in a fixed order, and keeps track of what is done. Each step's own skill holds the real instructions; follow that skill fully for its step.

## Step 0: check the skills are installed

These skills must be available. Check your skill list before doing anything else:

| Skill | Needed for |
|---|---|
| `readyteam-import-cost-code` | Step 1 |
| `readyteam-import-catalogues` | Step 2 |
| `readyteam-import-cost-assistant` | Step 3 |
| `readyteam-import-job-assistant` | Step 4 |
| `readyteam-estimation` | Step 5 |

Helpers (used only when a client sheet is not in ReadyTeam's format yet): `cost-code` (converts a cost-code sheet), `readyteam-jobassistant` (converts a job/task sheet).

If a required skill is missing, stop and tell the user exactly which one, and ask them to install it from the ReadyTeam skills zip and start a new chat. Do not try to do a missing step from memory. A missing helper is not a blocker: say so, and ask the user for a sheet that is already in the import format.

## Step 0b: collect the files

Ask the user for the company name and, for each step, the file (or "none"):

1. Cost codes sheet (required)
2. Catalogues sheet (optional)
3. Cost Assistant sheet (required unless the user says they have none)
4. Job Assistant / job template sheet (required unless the user says they have none)
5. Estimate files, one per project (optional, can be several)

Ask which site to use: **https://app.readyteam.ai/** by default, the staging site only if the user says so. Use the same site for every step.

Then show the plan back in one short table (step, file, row count, or "skipped") and get a yes before Step 1.

## The order and why

Run the steps strictly in this order. Later steps use what earlier steps created.

1. **Cost Code** - `readyteam-import-cost-code`. Everything else refers to cost codes. If the sheet is not in the Code / Description / Category Code / Category Description format and `cost-code` is installed, convert it with `cost-code` first.
2. **Catalogues** (optional) - `readyteam-import-catalogues`. Skip when the user has no catalogue file.
3. **Cost Assistant** - `readyteam-import-cost-assistant`. After cost codes (and catalogues, if any).
4. **Job Assistant** - `readyteam-import-job-assistant`. If the sheet is not in the job template format and `readyteam-jobassistant` is installed, convert it with that first. Its User, Trade Types and Label values must already exist in the company; the import skill explains how non-matching values are handled.
5. **Estimation** - `readyteam-estimation`, once per estimate file (it creates the project and loads its estimate into the project's Cost Assistant). Last, because it needs steps 1 and 3 done.

## Rules between steps

- Finish one step completely (import done and confirmed) before starting the next. The import skills each handle one module per run.
- Each import skill asks for a yes before clicking Import Data. Keep that, unless the user said at the start to go ahead for all steps.
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
