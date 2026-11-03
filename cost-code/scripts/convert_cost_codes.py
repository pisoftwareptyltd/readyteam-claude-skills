#!/usr/bin/env python3
"""
Convert a client's cost-code spreadsheet into ReadyTeam's cost-code format:
Code | Description | Category Code | Category Description

Client sheets typically have two columns per row:
  - a category column, e.g. "00 - PRE-CONSTRUCTION"
  - a code column, e.g. "0.1 Engineering Fees"

This script splits each into a leading numeric code and a trailing
free-text description, and drops rows that aren't real line items
(section-header repeats, admin/total rows with no numeric category).

Usage:
    python convert_cost_codes.py INPUT.xlsx OUTPUT.xlsx \
        --sheet "Costs" --category-col "CostCategory" --code-col "CostCode"

If --sheet / --category-col / --code-col are omitted, the script uses
the first sheet and its first two columns.
"""
import argparse
import re
import openpyxl
from openpyxl.styles import Font

CODE_RE = re.compile(r'^(\d+(?:\.\d+)*)\s*[-\u2013\u2014]?\s*(.*)$')
CATEGORY_RE = re.compile(r'^(\d+)\s*-\s*(.*)$')


def clean(s):
    """Normalize whitespace/NBSP so codes and descriptions aren't polluted
    by the messy spacing real client sheets tend to have."""
    if s is None:
        return ''
    return re.sub(r'\s+', ' ', str(s).replace('\xa0', ' ')).strip()


def convert_rows(rows):
    """rows: iterable of (category_raw, code_raw) tuples, header already stripped.
    Returns (output_rows, stats) where output_rows are
    (item_code, item_description, category_code, category_description)."""
    out = []
    stats = {'skipped_header_rows': 0, 'skipped_no_category_code': 0}

    for cat_raw, code_raw in rows:
        cat = clean(cat_raw)
        code_str = clean(code_raw)
        if not cat and not code_str:
            continue

        m = CATEGORY_RE.match(cat)
        if m:
            cat_code, cat_desc = m.group(1), m.group(2).strip()
        else:
            cat_code, cat_desc = '', cat

        # A row where the code column just repeats the category column is a
        # section-header row, not an actual line item. Skip it.
        if code_str == cat:
            stats['skipped_header_rows'] += 1
            continue

        # Rows with no numeric category (totals, margin, flat-rate settings
        # rows some templates tack on at the bottom) aren't cost codes.
        if not cat_code:
            stats['skipped_no_category_code'] += 1
            continue

        cm = CODE_RE.match(code_str)
        if cm:
            item_code, item_desc = cm.group(1), cm.group(2).strip()
        else:
            item_code, item_desc = '', code_str

        out.append((item_code, item_desc, cat_code, cat_desc))

    return out, stats


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('input')
    ap.add_argument('output')
    ap.add_argument('--sheet', default=None, help='Sheet name (default: first sheet)')
    ap.add_argument('--category-col', default=None, help='Header name of the category column (default: 1st column)')
    ap.add_argument('--code-col', default=None, help='Header name of the code column (default: 2nd column)')
    args = ap.parse_args()

    wb = openpyxl.load_workbook(args.input, data_only=True)
    ws = wb[args.sheet] if args.sheet else wb.worksheets[0]

    all_rows = list(ws.iter_rows(values_only=True))
    header = [clean(h) for h in all_rows[0]]

    if args.category_col and args.code_col:
        cat_idx = header.index(args.category_col)
        code_idx = header.index(args.code_col)
    else:
        cat_idx, code_idx = 0, 1

    data_rows = [(r[cat_idx], r[code_idx]) for r in all_rows[1:]]

    out_rows, stats = convert_rows(data_rows)

    out_wb = openpyxl.Workbook()
    out_ws = out_wb.active
    out_ws.title = "Sheet 1"
    out_ws.append(['Code', 'Description', 'Category Code', 'Category Description'])
    for c in out_ws[1]:
        c.font = Font(bold=True)
    for r in out_rows:
        out_ws.append(r)

    widths = [12, 45, 15, 35]
    for col, width in zip('ABCD', widths):
        out_ws.column_dimensions[col].width = width

    out_wb.save(args.output)

    print(f"Converted {len(out_rows)} cost code rows -> {args.output}")
    print(f"Skipped {stats['skipped_header_rows']} section-header repeat rows, "
          f"{stats['skipped_no_category_code']} non-cost-code rows (totals/admin).")


if __name__ == '__main__':
    main()
