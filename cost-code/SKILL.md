---
name: cost-code
description: Convert a client/contractor's cost-code spreadsheet (e.g. Buildertrend export, or any sheet with a category column and a code column) into ReadyTeam's cost-code format — Code, Description, Category Code, Category Description. Use this whenever the user uploads a client cost-code sheet and asks to convert, reformat, or prep it "for import", or mentions cost codes needing to match ReadyTeam's format.
---

# Cost Code Converter

Client cost-code sheets (e.g. exported from Buildertrend) usually come as two
columns per row — a category and a code — both written as `"<number> -
<text>"` or `"<number> <text>"`, e.g.:

| CostCategory | CostCode |
|---|---|
| 00 - PRE-CONSTRUCTION | 0.1 Engineering Fees |
| 01 - PRELIMINARIES | 1.10 Long Service Levy |

ReadyTeam's cost-code format splits both columns into number + text and lays them
out as four columns:

| Code | Description | Category Code | Category Description |
|---|---|---|---|
| 0.1 | Engineering Fees | 00 | PRE-CONSTRUCTION |
| 1.10 | Long Service Levy | 01 | PRELIMINARIES |

## How to convert

1. Look at the uploaded sheet first (view a few rows) to identify:
   - which sheet has the actual cost codes (client files sometimes have
     multiple tabs, e.g. a "Costs" tab and a "Variance" tab — only convert
     the cost-code tab unless told otherwise)
   - the header names of the category column and the code column
2. Run the bundled script rather than re-deriving the regex logic by hand —
   it already handles the messy real-world cases (NBSP characters, `" - "`
   vs `" "` separators, inconsistent spacing):

   ```bash
   python3 scripts/convert_cost_codes.py INPUT.xlsx OUTPUT.xlsx \
       --sheet "Costs" --category-col "CostCategory" --code-col "CostCode"
   ```

   If the input's first two columns are already category/code with a header
   row, you can drop `--sheet`/`--category-col`/`--code-col` and it'll use
   the first sheet and first two columns by default.
3. The script prints how many rows it converted and how many it skipped, and
   why (see "What gets dropped" below). Report those numbers back to the user
   so he can spot-check anything unexpected.
4. Save the output under `/mnt/user-data/outputs/`, present it, and don't
   re-describe every row in the reply — the file speaks for itself.

## What gets dropped, and why

- **Section-header repeat rows** — rows where the code column just repeats
  the category column verbatim (e.g. category `"01 - PRELIMINARIES"` and
  code also `"01 - PRELIMINARIES"`). These are section dividers baked into
  the source sheet, not real line items.
- **Rows with no numeric category** — totals, margin lines, "GST 10%",
  flat-rate settings rows some templates tack onto the bottom of the cost
  code list. These aren't cost codes and don't fit the 4-column format.

Don't silently "fix" other oddities in the source data (duplicate codes,
inconsistent numbering, typos in descriptions) — carry them through as-is
and mention anything that looks like a genuine data-quality issue so
The user can decide whether to clean it up.

## If the source format is different

Not every client sheet will be a clean two-column category/code layout. If
the input already has separate code/description/category columns, or uses a
different scheme entirely, adapt the approach rather than forcing the
script: read the sheet, figure out how codes and descriptions are encoded,
and produce the same four-column `Code | Description | Category Code |
Category Description` output by whatever means fits — the script is a
shortcut for the common case, not a strict requirement.
