---
name: "readyteam-jobassistant"
description: >
  Converts a user-supplied Excel project/task sheet into the Readyteam job
  template format (columns are Group, Description, Duration (Days), Offset
  (Days), Predecessors, Workchain, Assign Client, labels, User, Trade
  Types), normalizing the "labels", "User", and "Trade Types" columns
  against fixed reference lists. Only use this skill when the user
  explicitly says "Readyteam" or otherwise names this skill directly — do
  not trigger on generic mentions of job sheets, schedules, or Excel
  conversion.
---

# Readyteam-Jobassistant

Converts a messy/raw user-supplied Excel sheet of construction project tasks into
the fixed Readyteam template format, and normalizes three columns against
predefined official value lists.

**Trigger condition:** only run this skill when the user explicitly says
"Readyteam" (any casing/spelling close to it) or otherwise names this skill.
Do not trigger just because someone uploads an Excel sheet or mentions job
scheduling in general.

## Target template

The output must match `assets/template.xlsx` — a single sheet named `data` with
these columns, in this exact order:

| Column | Notes |
|---|---|
| Group | Phase/section name (e.g. "Pre Sale", "NSW Approval"). Taken from the source's category/group column when present; otherwise assigned from `references/groups.md`. Section header rows have a Group value but all other columns blank. |
| Description | Free text — the task name. |
| Duration (Days) | Integer. |
| Offset (Days) | Integer. |
| Predecessors | Free text — references another row's Description. |
| Workchain | Free text — typically mirrors Predecessors unless the source distinguishes them. |
| Assign Client | Boolean (True/False). |
| labels | Normalized against `references/labels.md`. Multiple allowed, comma-separated. |
| User | Normalized against `references/users.md`. Single value. |
| Trade Types | Normalized against `references/trade_types.md`. Single value, can be blank. |

Section/group header rows (Group filled, everything else blank) should be
preserved as-is when they exist in the structure — they represent a phase
divider, not a task.

## Workflow

1. **Read the user's source file.** Use the xlsx skill's reading approach to
   inspect all sheets/columns — column names and order will likely differ
   from the template, and there may be extra/missing columns.

2. **Map columns to the template.** Match source columns to the target
   columns above by name/meaning (e.g. "Task Name" → Description, "Days" →
   "Duration (Days)", "Assigned To" → User, "Trade" → Trade Types, "Category"/"Phase"/"Section" → Group).
   If a source column can't be confidently mapped to any target column,
   leave the corresponding template cells blank rather than guessing, and
   list the unmapped column in your summary to the user.

3. **Set Group (category).**
   - If the source has a category/group/phase/section column, use those
     values as given.
   - If the source has **no** such column (or a row's value is empty), assign
     the Group from the fallback list in `references/groups.md` — Pre Sale,
     Building Approval, Site Setup, Slab, Sales, Frame, Lining, Fixout, PC,
     PreConstructions, Lockup — following the assignment rules there.

4. **Normalize the three list-driven columns:**
   - `labels` → see `references/labels.md`
   - `User` → see `references/users.md` (includes a code-mapping table for
     internal codes like `PROJECTMANAGER`, `MASTER`, etc.)
   - `Trade Types` → see `references/trade_types.md`. If the source has no
     Trade Type for a row, infer one from the Description when a trade is
     clearly implied — see the inference rule in that reference file.

   For each cell, find the closest official match using the matching rules
   in the relevant reference file. Never invent new values. If genuinely
   unmatched, leave blank and record it in a "Needs Review" list.

5. **Preserve everything else as given** — Duration, Offset, Assign Client —
   with light type-cleanup only (e.g. ensure Duration/Offset are integers,
   Assign Client is a real boolean not a string).

6. **Predecessors & Workchain — always set when the source has the data:**
   - If the source has a column that identifies which task a row depends on
     (however named — "Predecessor", "Depends On", "After", "Previous Task",
     etc.), map it into **Predecessors**. Match it to the exact Description
     text of the referenced row in your output, not the source's raw label,
     so the reference resolves correctly in the new sheet.
   - **Workchain typically mirrors Predecessors** in this template (see the
     sample data). If the source has no separate Workchain column, set
     Workchain equal to the resolved Predecessors value rather than leaving
     it blank. Only diverge from Predecessors if the source clearly gives a
     distinct Workchain value.
   - The first task in a chain (no predecessor) should have both
     Predecessors and Workchain blank — don't force a value.
   - If a row's stated predecessor can't be matched to any Description in
     the output, leave Predecessors/Workchain blank for that row and flag it
     in your "Needs Review" summary rather than guessing which row it means.

7. **Write the output** as a new .xlsx file using the same single-sheet
   `data` layout and column order as `assets/template.xlsx`. Use the xlsx
   skill for correct formatting/writing. Save to
   `/mnt/user-data/outputs/` and present it to the user.

8. **Report back:**
   - Any source columns you couldn't map.
   - Whether Groups were assigned from the fallback list (no category in the
     source), and any rows that were hard to place.
   - Any cell values you couldn't confidently match to an official list value
     (the "Needs Review" list from step 4).
   - Any Trade Types you inferred from the Description rather than pulled
     from the source data, so the user can spot-check them.
   - Any Predecessors references you couldn't resolve to a row.
   - Any assumption you made about the User code-mapping table, so the user
     can confirm it or correct it for next time.

## Notes

- If the user's source sheet is very different in shape from anything seen
  before (e.g. no clear task/description rows, wildly different columns),
  ask one clarifying question rather than guessing at the whole structure.
- If the user gives corrections to the User code-mapping table or asks you
  to add new synonyms for trade types/labels, update the relevant reference
  file so future conversions in this skill are more accurate.
