# ReadyTeam Claude skills

Claude skills for onboarding a company into ReadyTeam. They import a client's data through ReadyTeam's **Import Your Data** screen using Claude in Chrome.

You will need:

- Google Chrome with the **Claude in Chrome** extension (Claude helps you set it up if it is missing).
- A ReadyTeam login (https://app.readyteam.ai/).
- Your files: cost codes, and if you have them, catalogue, Cost Assistant, job template and estimate files.

## Start here (copy and paste)

Open Claude, start a new chat, paste this, and send it. Nothing to fill in: Claude installs the skills, then asks what you want to do, one question at a time.

```text
Install the ReadyTeam skills for me, then help me use them. I am not technical: use plain words, ask me one simple question at a time, and tell me exactly what to click or attach.

1. Install the skills from https://github.com/pisoftwareptyltd/readyteam-claude-skills
   - If you can run commands on my computer (for example in Claude Code): download that repository (main branch) into a temporary folder, copy every top-level folder that contains a SKILL.md into ~/.claude/skills/ (replace older versions with the same name), and delete the temporary folder.
   - If you cannot install skills yourself: tell me in simple steps how to add skills in Claude's settings, give me the download link https://github.com/pisoftwareptyltd/readyteam-claude-skills/raw/main/downloads/readyteam-all-skills.zip (or one link per skill from https://github.com/pisoftwareptyltd/readyteam-claude-skills/tree/main/downloads if one zip with several skills is not accepted), and wait until I say done.
   - Then check these six are installed: readyteam-onboarding, readyteam-import-cost-code, readyteam-import-catalogues, readyteam-import-cost-assistant, readyteam-import-job-assistant, readyteam-estimation. Tell me if any is missing.
   - Stop here and tell me the install is finished before doing anything else.

2. Then ask me what I want to do now:
   - Set up my whole company (all steps in order), or
   - Import just one file (cost codes, catalogue, Cost Assistant, job template, or one project estimate).

3. Do it. New skills may only load in a new chat, so in this chat read the instructions straight from GitHub and follow them exactly:
   - Whole setup: https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-onboarding/SKILL.md
   - One file: https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/<skill-name>/SKILL.md for the matching skill.
   Do one step at a time: tell me which step it is, ask for that step's file only, show me what you found, ask me before importing, tell me the result, and ask me before starting the next step.
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
| Create one project from an estimate | Readyteam estimation: create a project from my estimate. |

Then attach your file when Claude asks for it.

## Without installing

If you do not want to install anything, paste this instead. Claude reads the instructions from GitHub for this chat only, so paste it again in every new chat:

```text
Help me set up my company in ReadyTeam.

Read the onboarding instructions at https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-onboarding/SKILL.md and follow them exactly. Whenever they name another ReadyTeam skill that is not installed, read it from https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/<skill-name>/SKILL.md before doing that step.

I am not technical. Do one step at a time and tell me which step it is. Ask me one simple question at a time, tell me exactly what to click or attach, and ask me before each import and before each new step.
```

## Steps

`readyteam-onboarding` loads each step's skill (installed, or read from this repo), asks for your files, and runs the steps in this order:

| # | Step | Skill |
|---|---|---|
| 1 | Cost Code | `readyteam-import-cost-code` |
| 2 | Catalogues (optional) | `readyteam-import-catalogues` |
| 3 | Cost Assistant | `readyteam-import-cost-assistant` |
| 4 | Job Assistant | `readyteam-import-job-assistant` |
| 5 | Estimation, one per estimate file | `readyteam-estimation` |

## For maintainers

After changing any skill, rebuild the zips in `downloads/` before committing:

```bash
sh scripts/build-downloads.sh
```
