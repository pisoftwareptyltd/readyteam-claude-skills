# ReadyTeam Claude skills

Claude skills for onboarding a company into ReadyTeam. They import a client's data through ReadyTeam's **Import Your Data** screen using Claude in Chrome.

## Install

Install every folder in this repo as a skill. Each folder holds one skill (a `SKILL.md`, sometimes with scripts or references). Then start a new chat.

## Use

Say **"start onboarding"** (or "onboard <company>"). `readyteam-onboarding` checks the other skills are installed, asks for your files, and runs the steps in this order:

| # | Step | Skill |
|---|---|---|
| 1 | Cost Code | `readyteam-import-cost-code` |
| 2 | Catalogues (optional) | `readyteam-import-catalogues` |
| 3 | Cost Assistant | `readyteam-import-cost-assistant` |
| 4 | Job Assistant | `readyteam-import-job-assistant` |
| 5 | Estimation, one per estimate file | `readyteam-estimation` |

Each skill can also be used on its own.
