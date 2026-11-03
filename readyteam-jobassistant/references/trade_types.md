# Trade Types — Official List

This is the fixed, authoritative list of Trade Type values. Any value found in a
user's source sheet for a "Trade Type" (or similarly named) column must be mapped
to the closest matching entry below. Never invent a new trade type and never pass
a source value through unchanged unless it's already an exact match.

```
Accountant, Acoustic Engineer, Aircon Contractor, Alucobond, Appliances Trade,
Arboricultural Consultant, Architect, Audio Visual, Blinds & Curtains Contractor,
Brick Cleaner, Bricky, Bushfire Consultant, Car Wash, Carpenter, Carpet Cleaning,
Caulking Contractor, Certifier, Cleaner _ External, Cleaner _ Internal,
Concrete Cutter Trade, Concrete Pump, Concrete Scanner, Concreter,
Construction Manager, Consultants, Council, Courier / Freight company,
Damp Proofing, Demolition, Dilapidation Consult, Draftmen, Drainer,
Driveway Contractor, Earth Works Trade, Eaves Carpenter, Electrician,
Energy Assessor / EER, Fencing, Fire Door Services, Fire Place Installer,
Fix Out Carpenter, Floor Sander, Flooring Trade, Flyscreen Contractor,
Frame Carpenter, Garage Contractor, Geo Engineer, Glass Installer, Govt Body,
Handrail Contractor, Handyman, Hydraulic Engineer, Insulation Contractor,
Insurance, Interior Design Trade, IT Trade, Joinery, Landscaper, Lawyer,
Locksmith, Mechanic, Metal Roofer, Mirror Contractor, Painter, Pest Control,
Photographer, Plasterer / Gyproker, Plumber, Pool Trade, Renderer, Roofer,
Rubbish Removal, Scaffolder, Screw Pier Subbie, Sealing Trade,
Sediment Fence supplier, Shower Screen / Glazier Contractor, Site Cut,
Skylight Contractor, Solar Contractor, Splashback Contractor, Stairs Contractor,
Steel Fabricator, Stone Trade, Stormwater Pits, Structural Engineer,
Subfloor Ventilation Trade, Surface Repairer Trade, Surveyors,
Termite Contractor, Tile Roofer, Tiler, Toolbox Trade, Traffic Controller,
Underpinning Trade, Wardrobe Contractor, Waste Disposal, Water Proofer,
Welding Trade, Windows Installer, Appliances Supplier, Asbestos Removal,
Blind And Shutters Supplier, Brick Supplier, Cladding Supplier,
Concrete Supplier, Crane Supplier, Door Supplier, Earth Works Suppliers,
Equipment Supplier, Fence Hire Supplier, Fire Place Supplier, Fitout Supplier,
Flooring Supplier, Frame And Truss Supplier, Gas Supplier, Gift Supplier,
Hardware Supplier, Hire Shop Supplier, Insulation Supplier, Joinery Supplier,
Landscape Suppler, Metal Supplier, Paint Supplier, Party Wall Supplier,
Pergola Supplier, Plaster Board Supplier, Plumbing Supplier,
Rendering Supplier, Rubbish Removal Supplier, Security Supplier,
Shade Cloths, Signage Supplier, Skylight Supplier, Stonemason Supplier,
Storage, Timber Supplier, Toilet Hire Supplier, Tool Supplier,
Trailer Supplier, Under Floor Heating Supplier, Uniform Suppliers,
Waffle & Steel Suppliers, Water Tank Supplier, Waterproofing Supplier,
Whs Supplier, Window Supplier, Tile Supplier, Garage Door Supplier
```

## Matching rules
- Case-insensitive, ignore extra whitespace/punctuation differences.
- Prefer exact match first, then closest synonym (e.g. "AC Contractor" → "Aircon Contractor",
  "Air Conditioning" → "Aircon Contractor", "Painting" → "Painter").
- "X-New" or "X-New-Workflow" style suffixes in a source sheet (workflow variants) should
  still map to the base trade type "X" if "X" is the closest official entry.
- **If the source row has no Trade Type value at all**, infer one from the task's
  Description text when the trade is clearly implied (e.g. Description "Install
  aircon ductwork" → "Aircon Contractor"; "Pour driveway concrete" → "Concreter" or
  "Driveway Contractor", whichever reads closer; "Fit skirting boards" → "Fix Out
  Carpenter"). Only infer when reasonably confident — don't force a trade type onto
  generic/administrative rows (e.g. "Site meeting", "Client sign-off") that don't
  imply one.
- Note every inferred (not source-provided) Trade Type in your summary to the user
  as "Inferred from description," separate from the "Needs Review" (unmatched) list,
  so they can spot-check your reasoning.
- If a source value has no reasonable match, leave the cell blank and add it to the
  "Needs Review" note at the end of the conversion (do not guess wildly).
