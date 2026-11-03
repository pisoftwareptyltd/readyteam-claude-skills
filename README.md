# ReadyTeam Claude skills

Claude skills for onboarding a company into ReadyTeam. They import a client's data through ReadyTeam's **Import Your Data** screen using Claude in Chrome.

## Start here (copy and paste)

Open Claude, start a new chat, paste this, and send it. Nothing to fill in: Claude asks for everything it needs, one question at a time.

```text
Help me set up my company in ReadyTeam.

Read the onboarding instructions at https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-onboarding/SKILL.md and follow them exactly. Whenever they name another ReadyTeam skill that is not installed, read it from https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/<skill-name>/SKILL.md before doing that step.

I am not technical. Ask me one simple question at a time, tell me exactly what to click or attach, and ask me before each import.
```

You will need:

- Google Chrome with the **Claude in Chrome** extension (Claude helps you set it up if it is missing).
- A ReadyTeam login (https://app.readyteam.ai/).
- Your files: cost codes, and if you have them, catalogue, Cost Assistant, job template and estimate files.

If the chat stops partway, start a new chat and paste:

```text
Help me continue setting up my company in ReadyTeam. Read https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-onboarding/SKILL.md, follow it, and continue from the first step that is not done yet. I am not technical, so ask me one simple question at a time.
```

## Install the skills (optional, Claude Code)

The prompt above works without installing anything. To install the skills in Claude Code instead, paste:

```text
Install the ReadyTeam Claude skills: download https://github.com/pisoftwareptyltd/readyteam-claude-skills (main branch) into a temporary folder, copy every top-level folder that contains a SKILL.md into ~/.claude/skills/ (replace older versions with the same name), delete the temporary folder, and confirm these six are installed: readyteam-onboarding, readyteam-import-cost-code, readyteam-import-catalogues, readyteam-import-cost-assistant, readyteam-import-job-assistant, readyteam-estimation. Then tell me to start a new chat.
```

After that, a new chat only needs: "Help me set up my company in ReadyTeam."

## Steps

`readyteam-onboarding` loads each step's skill (installed, or read from this repo), asks for your files, and runs the steps in this order:

| # | Step | Skill |
|---|---|---|
| 1 | Cost Code | `readyteam-import-cost-code` |
| 2 | Catalogues (optional) | `readyteam-import-catalogues` |
| 3 | Cost Assistant | `readyteam-import-cost-assistant` |
| 4 | Job Assistant | `readyteam-import-job-assistant` |
| 5 | Estimation, one per estimate file | `readyteam-estimation` |

Each skill can also be used on its own, for example: "Use readyteam-import-cost-code to import <path to file>".
