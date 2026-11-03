# Labels — Official List

Fixed, authoritative list of values for the "labels" column (a row may have
zero, one, or more labels — some source sheets separate multiple labels with
commas, slashes, or semicolons):

```
CALLUP, ORDER, ACTIVITY, INVOICE, VARIATION, PO, STOPPAGE, MILESTONE, BOOKED,
CONFIRMED, SENT, NO EMAIL, IN PROGRESS, COMPLETED, ON HOLD, DELAYED,
SCHEDULED, PENDING, APPROVED, REJECTED, UNDER REVIEW, CLIENT, PRICE LIST,
FIXED PRICE, ALLOWANCE, TAKEOFF, RFQ, BUILDMACRO, SELF, URGENT,
HIGH PRIORITY, NORMAL, LOW PRIORITY
```

## Matching rules
- Always output labels in UPPERCASE, matching the list exactly.
- Case-insensitive matching against source values (e.g. "invoice" → "INVOICE",
  "in progress" → "IN PROGRESS", "purchase order" → "PO").
- A row can have multiple labels — preserve all that have a confident match,
  comma-separated, in the "labels" cell.
- A row can also have zero labels — leave blank, don't force a match.
- If a source label has no reasonable match, drop it and note it in the
  "Needs Review" summary rather than inventing a new label.
