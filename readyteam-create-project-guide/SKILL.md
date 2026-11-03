---
name: readyteam-create-project-guide
description: Show the user how to create a project in ReadyTeam with an on-screen guide that highlights each button and field in their Chrome tab (Add Project, Project Name, Document Prefix, Home Address, Client, Create Project). The user does the clicking and typing; the guide moves on by itself. Use when the user asks how to create a project, wants to be shown or walked through creating a project, or after ReadyTeam onboarding imports are finished.
---

# ReadyTeam: guide the user to create a project

The user creates the project themselves. You only put a guide on their ReadyTeam page. The guide is one script (`scripts/guide.js` in this skill) that highlights each control and moves to the next one by itself as the user clicks and types. **Do not take screenshots step by step and do not click or type for the user.** That is what makes this fast.

If this skill is not installed, read the script from:
`https://raw.githubusercontent.com/pisoftwareptyltd/readyteam-claude-skills/main/readyteam-create-project-guide/scripts/guide.js`

## Steps

1. Load the Claude in Chrome tools in one ToolSearch call if they are deferred, including `javascript_tool`. Use the ReadyTeam tab that is already open (for example from onboarding); otherwise call `tabs_context_mcp`, open a new tab and go to **https://app.readyteam.ai/** (the staging site only if the user says so). If a login page shows, ask the user to sign in and reply "done".
2. Make sure the tab is on the ReadyTeam dashboard (the page with the orange **+ Add Project** button in the left sidebar). Navigate there if needed. No Create Project dialog should be open.
3. Read `scripts/guide.js` and run its full text, unchanged, in that tab with `javascript_tool`. It returns "ReadyTeam guide started: ...".
4. Tell the user in two or three plain lines, without waiting for anything else:
   "I've put a guide on your ReadyTeam screen. Follow the orange highlight: it shows you where to click and what to type, one step at a time. Tell me when your project is created, or if you get stuck."
5. Wait for the user. Do not poll or take screenshots while they work.
6. When they reply, run `window.__rtGuide && window.__rtGuide.status()` once with `javascript_tool`:
   - `finished: true`: the project was created. Take one screenshot to confirm the project page opened, and tell the user the project name shown.
   - not finished: ask what they see, or take one screenshot to understand where they are, and explain the next step in plain words. Run the script again if they want the guide back (it restarts cleanly).

## The steps the guide shows

1. Click **+ Add Project**.
2. Type the **Project Name**.
3. Type a **Document Prefix**: short (max 20 characters), no spaces, unique across their projects, for example the project initials.
4. Type the **Home Address** and pick it from the list if one appears.
5. Choose the **Client** (optional, Next skips it).
6. Click **Create Project**.

If ReadyTeam says the prefix is already used, tell the user to change it slightly (for example add 2 at the end) and click Create Project again. The guide stays on that step until the dialog closes.

## If the script can't run

If `javascript_tool` is not available or is refused, do not keep retrying. Give the user the six steps above as a short numbered list in plain words, and ask them to tell you when the project is created.

## Rules

- Never type into the form or click Create Project for the user, unless they ask you to.
- Do not change anything else in ReadyTeam.
- The guide closes with the Close guide button or Escape, and removes itself 15 seconds after the project is created.

## Status

Tested only on a mock page that mimics the Create New Project dialog. On the first real run, note whether each step found its button or field (a step that cannot find its control shows "I can't point to it right now"), and update `scripts/guide.js` selectors if needed.
