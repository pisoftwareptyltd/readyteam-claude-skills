# User (Role) List — Official List

Fixed, authoritative list of values for the "User" column:

```
Owner (Super Admin), Admin, Project Manager, Site Supervisor, Sales, Accounts, Client
```

## Known internal code mapping
The template's example data uses internal system codes rather than the friendly
names above. When a source sheet contains these codes (or close variants),
map them as follows:

| Source code / variant        | Official value           |
|-------------------------------|---------------------------|
| MASTER                         | Owner (Super Admin)      |
| ADMIN                          | Admin                    |
| PROJECTMANAGER / PM            | Project Manager          |
| SITESUPERVISOR / SUPERVISOR    | Site Supervisor          |
| SALES                          | Sales                    |
| ACCOUNTS                       | Accounts                 |
| CLIENT                         | Client                   |
| EMPLOYEE                       | *No confident match — flag for user review* |

This mapping table is a starting assumption based on the sample template. If the
user's real source sheets use different internal codes, ask them once, then add
the confirmed mapping back into this table for future conversions.

## Matching rules
- Case-insensitive, ignore spacing/punctuation.
- Prefer exact match, then the code-mapping table above, then closest synonym.
- If nothing reasonably matches, leave blank and flag in the "Needs Review" note.
