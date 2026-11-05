# ReadyTeam Claude skills

Claude skills for onboarding a company into ReadyTeam. They import a client's data through ReadyTeam's **Import Your Data** screen using Claude in Chrome.

You will need:

- Google Chrome with the **Claude in Chrome** extension (Claude helps you set it up if it is missing).
- A ReadyTeam login (https://app.readyteam.ai/, or the test site https://ready-team-staging.web.app/). Claude uses whichever one you are signed in to.
- Your files: your company logo, cost codes, and if you have them, catalogue, Cost Assistant and job template files. Estimate files are imported separately with readyteam-estimation.
- For branding, Claude uploads your logo and sets your Primary and Secondary colours from it.

## Start here (copy and paste)

Open Claude, start a new chat, paste this, and send it. Nothing to fill in: Claude installs the skills (you may need to click "Save skill" on each one), then starts the onboarding one step at a time.

```text
Install the ReadyTeam skills for me, then help me use them. I am not technical: use plain words, ask me one simple question at a time, and tell me exactly what to click or attach.

1. Install these fourteen skills: readyteam-onboarding, readyteam-brand-setup, readyteam-import-cost-code, readyteam-import-catalogues, readyteam-import-cost-assistant, readyteam-links-guide, readyteam-import-job-assistant, readyteam-create-project-guide, readyteam-estimation-guide, readyteam-allowance-guide, readyteam-specification-guide, readyteam-selection-guide, readyteam-takeoff-guide, readyteam-estimation. Each one is a file at https://github.com/pisoftwareptyltd/readyteam-claude-skills/raw/main/downloads/<skill-name>.skill
   Use the first way that works for you:
   a. If you can run commands on my computer and have a ~/.claude folder (Claude Code): download https://github.com/pisoftwareptyltd/readyteam-claude-skills (main branch) into a temporary folder, copy every top-level folder that contains a SKILL.md into ~/.claude/skills/ (replace older versions with the same name), and delete the temporary folder.
   b. If you can download files and share files with me in this chat: download the fourteen .skill files and share all fourteen with me. Tell me to click "Save skill" on each one, and wait until I say done.
   c. Otherwise: give me the fourteen download links above and tell me in simple steps how to add a skill in Claude's settings. Wait until I say done.
   Then tell me in one line that the install is finished and which skills are installed. If any is missing, say which one.

2. Then start the ReadyTeam onboarding. New skills may only load in a new chat, so in this chat read https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-onboarding/SKILL.md and follow it exactly, reading any step's skill from https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/<skill-name>/SKILL.md when you reach that step. Read these quietly in the background (web fetch or download), never in a browser tab, and never show them to me. Use whichever ReadyTeam site I am using (https://app.readyteam.ai/ or https://ready-team-staging.web.app/) and stay on it.
   Do one step at a time: tell me which step it is, what it does and why, ask for that step's file only, tell me what you found and the result, then go on to the next step by yourself. Only ask me when you need a file or a real choice; I will type stop or pause if I want you to wait. If I only want to import one file, do just that step.
```

## After the skills are installed

Start a new chat and just say what you want. No links needed:

| You want to | Say |
|---|---|
| Set up your whole company | Help me set up my company in ReadyTeam. |
| Continue a setup that stopped | Help me continue setting up my company in ReadyTeam. |
| Import cost codes only | Import my cost codes into ReadyTeam. |
| Import a catalogue only | Import my catalogue into ReadyTeam. |
| Import Cost Assistant items only | Import my Cost Assistant items into ReadyTeam. |
| Import a job template only | Import my job template into ReadyTeam. |
| Add your logo and brand colours | Set up my company branding in ReadyTeam. |
| Set up your quote presentation and cover page | Set up my quote presentation in ReadyTeam. |
| Show me how to create a project | Show me how to create a project in ReadyTeam. |
| Show me how to start a project's estimate | Show me how to start the estimate for my project in ReadyTeam. |
| Show me how to set allowances (PC / PS) | Show me how to set allowances on my project's estimate in ReadyTeam. |
| Show me how to add specifications to items | Show me how to add specifications to my project's items in ReadyTeam. |
| Show me how to add selections to items | Show me how to add selections to my project's items in ReadyTeam. |
| Show me how to measure from a plan (takeoff) | Show me how to do a takeoff from my plan in ReadyTeam. |
| Create one project from an estimate | Readyteam estimation: create a project from my estimate. |

Then attach your file when Claude asks for it.

## Without installing

If you do not want to install anything, paste this instead. Claude reads the instructions from GitHub for this chat only, so paste it again in every new chat:

```text
Help me set up my company in ReadyTeam.

Read the onboarding instructions and follow them exactly. Before you start, read the latest version of all of these (even if skills with the same names are installed, which may be old), and use only these for the steps and their order. Step 1 is always my logo and brand colours. If any of them cannot be read, tell me; do not make up your own plan:

https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-onboarding/SKILL.md
https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-brand-setup/SKILL.md
https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-import-cost-code/SKILL.md
https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-import-catalogues/SKILL.md
https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-import-cost-assistant/SKILL.md
https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-links-guide/SKILL.md
https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-import-job-assistant/SKILL.md
https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-create-project-guide/SKILL.md
https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-estimation-guide/SKILL.md
https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-allowance-guide/SKILL.md
https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-specification-guide/SKILL.md
https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-selection-guide/SKILL.md
https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-takeoff-guide/SKILL.md

Read these instructions quietly in the background (web fetch or download). Never open them in Chrome or any browser tab, never show or quote them to me, and do not mention GitHub or links. Use the browser only for ReadyTeam.

I use ReadyTeam at https://app.readyteam.ai/ or https://ready-team-staging.web.app/. Use whichever one I am signed in to or have open in Chrome, and stay on that same site for every step.

I am not technical. Do one step at a time: before each step tell me which step it is, what it does and why. Then keep going by yourself from step to step. Only ask me when you need a file from me or a real choice, never the same question twice, and tell me exactly what to click or attach. I will type stop or pause if I want you to wait.

Ask every question as clickable buttons (the AskUserQuestion tool; load it first if needed), even yes/no questions. Never ask me to type "yes" or "done".
```

## Steps

`readyteam-onboarding` loads each step's skill (installed, or read from this repo), asks for your files, and runs the steps in this order:

| # | Step | Skill |
|---|---|---|
| 1 | Brand setup: logo and colours (skip if no logo) | `readyteam-brand-setup` |
| 2 | Cost Code | `readyteam-import-cost-code` |
| 3 | Catalogues (optional) | `readyteam-import-catalogues` |
| 4 | Cost Assistant | `readyteam-import-cost-assistant` |
| 5 | Quote Presentation (Links): cover page (yours, or one made from your logo and colours), then a tour of each page's settings | `readyteam-links-guide` |
| 6 | Job Assistant | `readyteam-import-job-assistant` |
| 7 | Create Project (on-screen guide) | `readyteam-create-project-guide` |
| 8 | Estimation (on-screen guide): Copy from project, Import from Excel or Import from data setup | `readyteam-estimation-guide` |
| 9 | Allowances (on-screen guide): PC (Prime Cost) or PS (Provisional Sum) per item | `readyteam-allowance-guide` |
| 10 | Specifications (on-screen guide): item + > Specification, notes such as Inclusions and Exclusions | `readyteam-specification-guide` |
| 11 | Selections (on-screen guide): item + > Selection, question, then product | `readyteam-selection-guide` |
| 12 | Takeoff (on-screen guide): Qty ruler icon, + Measurement, upload your plan, Area, draw | `readyteam-takeoff-guide` |

Steps 7 to 12 run back to back on screen: the project guide hands over to the estimate guide, then the allowance, specification, selection and takeoff guides, with no stop in between. Have your plan PDF ready for step 12.

`readyteam-estimation` is not part of onboarding: use it on its own to have Claude create a project and load its estimate from one estimate file.

## For maintainers

After changing any skill, rebuild the zips in `downloads/` before committing:

```bash
sh scripts/build-downloads.sh
```
