# ReadyTeam Claude skills

Claude skills for onboarding a company into ReadyTeam. They import a client's data through ReadyTeam's **Import Your Data** screen using Claude in Chrome.

## What you need

- **Claude Code** (desktop app Code tab, or the `claude` terminal app).
- **Claude in Chrome** extension installed and connected, with Chrome open.
- Signed in to ReadyTeam in Chrome (https://app.readyteam.ai/).
- Your import files (.xlsx or .csv) saved on your computer.

## 1. Install the skills

Copy this prompt into Claude Code and send it:

```text
Install the ReadyTeam Claude skills for me.

1. Download https://github.com/pisoftwareptyltd/readyteam-claude-skills (main branch) into a new temporary folder. Use git clone if git is available, otherwise download https://github.com/pisoftwareptyltd/readyteam-claude-skills/archive/refs/heads/main.zip and unzip it.
2. Copy every top-level folder that contains a SKILL.md into ~/.claude/skills/ (create the folder if needed). If a skill with the same name already exists there, replace it with the new version.
3. Do not copy README.md or any other files, and do not change the skill files.
4. Delete the temporary folder.
5. List the installed skills. These six must be there: readyteam-onboarding, readyteam-import-cost-code, readyteam-import-catalogues, readyteam-import-cost-assistant, readyteam-import-job-assistant, readyteam-estimation. Tell me if any is missing.
6. Check whether the Claude in Chrome tools are available, and tell me if they are not.
7. Tell me to start a new chat so the skills load.
```

Then start a **new chat**.

## 2. Start onboarding

In the new chat, copy this prompt, fill in the parts in `< >`, and send it. Write `none` for any file you don't have.

```text
Use the readyteam-onboarding skill to onboard my company into ReadyTeam.

Company: <company name>
Site: https://app.readyteam.ai/

Files:
1. Cost codes: <full path to file>
2. Catalogues (optional): <full path to file, or none>
3. Cost Assistant: <full path to file, or none>
4. Job Assistant: <full path to file, or none>
5. Estimates (one per project): <full paths to files, or none>

I am signed in to ReadyTeam in Chrome. Show me the plan first, then ask me before each Import Data click.
```

To continue an onboarding you started earlier, send:

```text
Use the readyteam-onboarding skill to resume onboarding for <company name>. Check the progress log and continue from the first step that is not done.
```

## Steps

`readyteam-onboarding` checks the other skills are installed, asks for anything missing, and runs the steps in this order:

| # | Step | Skill |
|---|---|---|
| 1 | Cost Code | `readyteam-import-cost-code` |
| 2 | Catalogues (optional) | `readyteam-import-catalogues` |
| 3 | Cost Assistant | `readyteam-import-cost-assistant` |
| 4 | Job Assistant | `readyteam-import-job-assistant` |
| 5 | Estimation, one per estimate file | `readyteam-estimation` |

Each skill can also be used on its own, for example: "Use readyteam-import-cost-code to import <path to file>".

## Update

To get the latest version of the skills, send the install prompt again and start a new chat.
