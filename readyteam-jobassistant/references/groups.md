# Groups (Categories) — Fallback List

Used **only when the source sheet has no category/group/phase/section column**
(or that column is empty for a row). If the source already provides a
category, keep the source value as-is — do not replace it with this list.

Ordered list (this is also the construction sequence — keep this order in the
output):

1. Pre Sale
2. Building Approval
3. Site Setup
4. Slab
5. Sales
6. Frame
7. Lining
8. Fixout
9. PC
10. PreConstructions
11. Lockup

## Assignment rules
- Assign each task to exactly one group, chosen from the list above, by
  reading its Description (e.g. "Construction Fence" / "Site Toilet" →
  Site Setup; "Slab Pour" → Slab; "Frame Inspection" → Frame; "Plasterboard"
  → Lining; "Cabinets" / "Tiling" → Fixout; "Council Approval" → Building
  Approval).
- Use the exact spelling above (e.g. "PreConstructions", "Fixout", "PC").
- Never invent a new group. If no group is a reasonable fit, put the task
  under the nearest preceding task's group; if it is the first task, leave
  Group blank and add it to the "Needs Review" list.
- Keep tasks in their original source order within a group. If a task's
  inferred group would break the group order (e.g. a Slab task appearing
  after a Frame task), keep the source row order and flag it in
  "Needs Review" rather than reordering silently.
- Emit a section header row (Group filled, all other columns blank) at the
  start of each group that has at least one task. Skip groups with no tasks.
- Report to the user that groups were inferred from this fallback list, so
  they can spot-check them.
