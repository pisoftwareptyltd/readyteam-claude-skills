---
name: readyteam-links-guide
description: Set up a company's quote presentation in ReadyTeam (Settings > Cost Assistant > Links > Quote Presentation template) using Claude in Chrome - set the cover page from the user's own image, or make one for them in the PROPOSAL style from their logo, brand colours and project photos, upload it with Cover Photo after a yes, then an on-screen tour of each section (Cover Section, Quote Section, Company Profile) and each page's settings. Use as onboarding step 5 (after the Cost Assistant import, before Job Assistant), or when the user asks about Links, quote presentations, the quote cover page or quote settings in ReadyTeam.
---

# ReadyTeam: quote presentation (Links) setup

Two parts: you set the **cover page** (with the user's yes), then you put an **on-screen tour** on their ReadyTeam page that walks them through each page of the presentation and its settings. The tour is one script (in the "Tour script" section at the end of this skill); it points at each page and explains its settings, and the user does the clicking. **Do not change any setting for the user.**

## Asking the user

- **Every question is buttons. No exceptions.** Ask every question, including yes/no checks, "is this the right company?", "are you signed in?" and "ready for the next step?", with the chat's multiple-choice question tool (`AskUserQuestion`, or an "ask the user" tool that shows options). If that tool is listed but not loaded yet (deferred), load it with ToolSearch first (`select:AskUserQuestion`), before your first question. One question per call, 2 to 4 short options (a few words each, the recommended one first), each with a one-line description; the user can still type their own answer.
  - Never ask in plain text. Never write "Reply yes", "reply done", "tell me the right name" or "type ..." as the way to answer. Put the question in the tool, not in your message.
  - Example: "The top of your screen shows the company **Claude Testing**. Is that the company we're setting up?" Options: **Yes, that's it** · **No, it's a different company**. If they pick the second, ask them to switch company in ReadyTeam (top of the screen) and then ask, as buttons: **I've switched** · **I need help**.
  - Only if this chat truly has no such tool: end the message with a short numbered list of the options and say they can reply with the number.
- **Files: the file must arrive with a message, not a button.** A button answer can never carry a file, so never offer an **I've attached it** button. Ask for a file in two parts:
  1. Ask as buttons: "Do you have your <file> (<what it looks like>) ready?" Options such as **Yes, I'll attach it** · **I don't have one** · **Skip this step** (optional steps only).
  2. If they pick **Yes, I'll attach it**: reply in plain words, "Tap **+** below the message box, choose **Upload a file**, pick your <file>, then press **Send**. I'll wait for it." Then **end your turn and wait**. Do nothing else: no next step, no other question.
  - When the next message arrives, check that the file is really there (an attachment or uploaded file in that message or earlier in the chat). If it is not, say "I didn't get the file yet" and repeat part 2. Never move on, and never start the next step, while a file you asked for is missing.
  - If the file is already in this chat, use it and don't ask.
- **Do the work yourself.** Once the user has given a file or a choice, do every ReadyTeam click, upload, typing and navigation yourself. Reuse what you already have in this chat (the logo, the brand colours, the company name, earlier answers) instead of asking again. Ask only for what you cannot get or decide: files only the user has, real choices, and one yes before anything is saved, imported or uploaded.
- **One yes, as a button.** Before a save, import or upload, show what will change and ask once, with options such as **Go ahead**, **Show me first** and **Not now**.

## Where it lives

- Company template (used by new projects): **Settings (gear, top right) > Cost Assistant > Links**. The **Links Template** list has **Quote Presentation** (and others such as Quote Esign). Open **Quote Presentation**: its pages grid shows the sections **Cover Section**, **Quote Section** and **Company Profile** (each with a Visible tick, preview, edit and delete). Expand **Cover Section** and click **Cover Page** to open the editor.
- One project's presentation: the project page > **2 Quote Presentations > Links** > the link (for example LINKS-<PROJECT>-001). Same editor. (The ⓘ on the Links card opens a ReadyTeam product demo: close it.)
- The editor has three columns: **Categories** (sections and pages, each page with a tick that shows or hides it, and **+ Add Links**), **Settings** (**Options** and **eSign** tabs) and **View** (live preview). Bottom: **Full Preview**, and in a project also **PDF**, **Audit Trail** and **Save As Template**. Top right: **Close**.

The pages and their settings:

| Section | Page | Settings (Options) |
|---|---|---|
| Cover Section | Cover Page | Top / Center / Bottom. **Cover Photo** (top right of the View) uploads the cover image |
| Quote Section | Quote Summary | Show Categories, Show Categories Totals, Show Breakdown; intro text box |
| Quote Section | Quote Items | Categories Total, Include GST in Categories, Include quoted line items for each category, Recipe Item, Qty, UOM, Unit Cost (Ex), Price, $0 Items |
| Quote Section | Specifications | Selection Item, Categories Total, General Notes, Inclusions, Exclusions, Digital Key |
| Quote Section | Allowances | Markup Percentage, Type, $0 Items, Price (Ex), Price (Inc), Price (Inc & Markup) |
| Quote Section | Selection Options | Qty, Height, Depth, Width, Length, Colour, SKU, Total Cost (Ex), Variation (Ex), Supplier |
| Quote Section | Architecture Plan | No settings: upload a file, text, Save |
| Company Profile | Company Profile | No settings: upload a file (a PDF), text, Save |

## How to talk to the user

Plain words, one question at a time. Never show file paths, code or tool names unless they ask.

## Steps

### 1. Open the template

Load the Claude in Chrome tools in one ToolSearch call if they are deferred, including `find`, `computer`, `javascript_tool` and `file_upload`. In the ReadyTeam tab (on whichever ReadyTeam site the user is using, https://app.readyteam.ai/ or https://ready-team-staging.web.app/; stay on that site): Settings (gear) > Cost Assistant > **Links** > **Quote Presentation**, expand **Cover Section**, click **Cover Page**. Take one screenshot so you can describe the current cover. (If the user asked about one project's presentation, open it from that project instead.)

### 2. The cover page

Make it yourself first; don't start with a question.

1. **Gather what you have, without asking:**
   - the **logo**: the file from brand setup if it is in this chat;
   - the two **brand colours**: the codes from brand setup, or read them yourself from Settings > Company Profile > Company Branding (the values of the Primary Color and Secondary Color fields);
   - the **company name**: as shown in ReadyTeam (for example the company switcher at the bottom of the left sidebar).
   Only if there is no logo in this chat, ask once, as buttons: "To make your quote cover I can use your logo. Do you have it ready?" Options: **Yes, I'll attach it** · **Make it without a logo** · **I have my own cover**. For **Yes, I'll attach it** or **I have my own cover**, tell them to tap **+**, choose **Upload a file**, pick the image and press **Send**, then end your turn and wait for the message with the file (check it is really attached before going on).
2. **Make the cover** with the **Cover script** below (Python with Pillow; `pip install pillow` if missing):
   `python3 cover.py --out cover.png --company "<name>" --primary "<#hex>" --secondary "<#hex>" --logo <logo>` (leave out `--logo` if there is none). It makes an A4 portrait page: a white strip with the company name down the left, a brand-colour block with **PROPOSAL** (change with `--title`), the logo in a corner triangle, and three hexagons in brand-colour tints with a simple house outline. Leave out `--project`, `--client` and `--date` for the company template (it is used for every project).
3. **Show it and ask once.** Send the cover image to the user and ask, as buttons:
   "Here's a cover for your quotes, made from your logo and colours. Shall I use it?"
   Options: **Use this cover** · **Add my project photos** · **Use my own cover** · **No cover for now**.
   - **Add my project photos**: "Attach up to 3 photos of your work (for example a house, a kitchen, a bathroom): tap **+**, then **Upload a file**." Options: **I've attached them** · **Use the cover without photos**. Run the script again with `--photo` for each, show it, and ask the same question again.
   - **Use my own cover**: "Attach your cover image (ideally A4 portrait, 1414 x 2000 pixels): tap **+**, then **Upload a file**." Use it as it is; if it is a PDF, convert its first page to PNG; if it is over about 5MB, resize it to 1414 x 2000 or smaller. Show it and ask **Use this cover?** again.
   - **No cover for now**: keep the current cover and go to the tour.
   - Typed changes (another colour, another title such as QUOTE): make them, show it, and ask again.

### 3. Upload the cover, after "Use this cover"

On the Cover Page, the **Cover Photo** button (top right of the View) holds an image file input (`input[type=file][accept="image/*"]`). Find it with `find` or `read_page` and upload the cover with `file_upload`. **Do not click Cover Photo**: that opens a file window you cannot use. Take one screenshot and check the View shows the new cover. If it doesn't, wait a few seconds and look again; if it still doesn't, tell the user what you see.

### 4. The tour

Run the full text of the **Tour script** below, unchanged, in that tab with `javascript_tool`. Then tell the user in two or three plain lines:

"I've put a guide on your ReadyTeam screen. It goes through each page of your quote and explains its settings: click each page it points to, tick what your clients should see, and click Next page. Tell me when you're done, or if you get stuck."

Then ask, as buttons, so the user can tell you when they are done: "Tell me when you've been through the pages." Options: **I'm done** · **I'm stuck** · **Skip the tour**. Do not poll or take screenshots while they work. When they reply, run `window.__rtLinksGuide && window.__rtLinksGuide.status()` once: `finished: true` or all eight pages in `seen` means the tour is done; otherwise ask where they are and help. Remind them that **Company Profile** is where their company profile PDF goes, if it is empty.

### 5. Close

Once they are done, close the editor yourself (**Close**, top right) and say in one line what was set (the cover, and that the tour is done). In onboarding, the next step is Job Assistant.

## Rules

- Only upload the cover the user gave you or approved. Never untick or tick settings, delete pages or sections, or click Request Signature or Save As Template for the user.
- Changes to the company template apply to new projects' quotes; existing projects keep their own presentation.

## Status

Checked live (Nov 2026) on a project's presentation (P1058) and the company template (Settings > Cost Assistant > Links > Quote Presentation): both open the same editor (`lib-links`) with the same sections, pages and settings, and **Cover Photo** wraps `input[type=file][accept="image/*"]`. The tour was run on screen: it found the three columns, explained the Cover Page and Quote Summary, moved on with Next page, pointed at the section arrow and the page names, and followed the user when they jumped ahead to another page. **Not yet done live:** uploading a cover with Cover Photo. On the first real run, check the cover shows in the View and in Full Preview.

## Cover script

Save as `cover.py` and run as shown in step 2.

```python
# Make a ReadyTeam quote-presentation cover page (A4 portrait PNG, 1414 x 2000)
# in the "PROPOSAL" style: brand-colour block, logo corner, company name down the side,
# project photos in hexagons (or brand-colour hexagons when there are no photos).
#
# python3 make_cover.py --out cover.png --company "Acme Homes" --primary "#f2a900" --secondary "#0b2f6b"
#        [--logo logo.png] [--photo a.jpg --photo b.jpg --photo c.jpg]
#        [--title PROPOSAL] [--project "14 Gosford Ave"] [--client "Sam Lee"] [--date "November 2026"]
import argparse, math, os, subprocess
from PIL import Image, ImageDraw, ImageFont, ImageOps

W, H = 1414, 2000

p = argparse.ArgumentParser()
p.add_argument('--out', required=True)
p.add_argument('--company', default='')
p.add_argument('--primary', default='#f2a900')
p.add_argument('--secondary', default='#0b2f6b')
p.add_argument('--logo')
p.add_argument('--photo', action='append', default=[])
p.add_argument('--title', default='PROPOSAL')
p.add_argument('--project', default='')
p.add_argument('--client', default='')
p.add_argument('--date', default='')
a = p.parse_args()


def rgb(h):
    h = h.strip().lstrip('#')
    if len(h) == 3:
        h = ''.join(c * 2 for c in h)
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def lum(c):
    def ch(v):
        v /= 255
        return v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = c
    return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b)


def on(c):  # readable text colour on a background
    return (17, 17, 17) if lum(c) > 0.4 else (255, 255, 255)


def mix(c, d, t):
    return tuple(round(x + (y - x) * t) for x, y in zip(c, d))


def font(size, heavy=True):
    names = (['Montserrat-ExtraBold', 'Montserrat-Black', 'Poppins-ExtraBold', 'Poppins-Bold', 'Montserrat-Bold',
              'LiberationSans-Bold', 'Arial Bold', 'DejaVuSans-Bold'] if heavy else
             ['Montserrat-Medium', 'Poppins-Medium', 'LiberationSans-Regular', 'Arial', 'DejaVuSans'])
    for n in names:
        try:
            return ImageFont.truetype(n + '.ttf', size)
        except OSError:
            pass
        try:
            path = subprocess.run(['fc-match', '-f', '%{file}', n.replace('-', ':style=')],
                                  capture_output=True, text=True, timeout=5).stdout
            if path and os.path.exists(path) and (not heavy or 'bold' in path.lower() or 'black' in path.lower()):
                return ImageFont.truetype(path, size)
        except (OSError, subprocess.SubprocessError):
            pass
    return ImageFont.load_default(size)


P, S = rgb(a.primary), rgb(a.secondary)
if lum(P) < lum(S) and lum(S) > 0.35:  # the big block reads best in the lighter brand colour
    P, S = S, P
WHITE = (255, 255, 255)
img = Image.new('RGB', (W, H), WHITE)
d = ImageDraw.Draw(img)

strip = int(W * 0.185)          # white strip on the left with the company name
block_bottom = int(H * 0.825)   # bottom of the brand-colour block

# Brand block and the corner triangle (white stripe, then secondary colour), as in the example.
d.rectangle([strip, 0, W, block_bottom], fill=P)
d.polygon([(int(W * 0.69), 0), (W, 0), (W, int(H * 0.215))], fill=WHITE)
d.polygon([(int(W * 0.745), 0), (W, 0), (W, int(H * 0.14)), (int(W * 0.865), int(H * 0.14))], fill=S)

# Title and underline.
title = a.title.upper()
size = 150
f = font(size)
while d.textlength(title, font=f) > W * 0.53 and size > 60:
    size -= 6
    f = font(size)
tx, ty = strip + int(W * 0.01), int(H * 0.055)
d.text((tx, ty), title, font=f, fill=on(P))
tb = d.textbbox((tx, ty), title, font=f)
d.rectangle([tx, tb[3] + 28, tx + int(W * 0.44), tb[3] + 34], fill=mix(S, (0, 0, 0), 0.2))

# Logo in the corner.
if a.logo:
    try:
        lg = Image.open(a.logo).convert('RGBA')
        box = (int(W * 0.13), int(H * 0.085))
        lg.thumbnail(box, Image.LANCZOS)
        cx, cy = int(W * 0.905), int(H * 0.06)
        img.paste(lg, (cx - lg.width // 2, cy - lg.height // 2), lg)
    except OSError:
        pass

# No logo: the company's initials in the corner instead, so it never sits empty.
if not a.logo and a.company:
    initials = ''.join(w[0] for w in a.company.replace('&', ' ').split() if w[:1].isalnum())[:3].upper()
    fi = font(96)
    tw = d.textlength(initials, font=fi)
    d.text((int(W * 0.905 - tw / 2), int(H * 0.06) - 58), initials, font=fi, fill=on(S))

# Company name, rotated, down the left strip, letter-spaced and underlined.
if a.company:
    name = ' '.join(a.company.upper())
    fs = 52
    fn = font(fs, heavy=False)
    while d.textlength(name, font=fn) > H * 0.5 and fs > 22:
        fs -= 2
        fn = font(fs, heavy=False)
    tw = int(d.textlength(name, font=fn)) + 20
    layer = Image.new('RGBA', (tw, fs + 30), (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    ld.text((10, 0), name, font=fn, fill=(17, 17, 17, 255))
    ld.rectangle([10, fs + 14, tw - 10, fs + 18], fill=(17, 17, 17, 255))
    layer = layer.rotate(90, expand=True)
    img.paste(layer, (int(strip * 0.5) - layer.width // 2, int(H * 0.045)), layer)


def hexagon(cx, cy, r):
    return [(cx + r * math.cos(math.radians(60 * i)), cy + r * math.sin(math.radians(60 * i))) for i in range(6)]


def put_photo(path, pts, fallback):
    xs, ys = [p[0] for p in pts], [p[1] for p in pts]
    bx, by = int(math.floor(min(xs))), int(math.floor(min(ys)))
    bw, bh = int(math.ceil(max(xs))) - bx + 1, int(math.ceil(max(ys))) - by + 1
    mask = Image.new('L', (W, H), 0)
    ImageDraw.Draw(mask).polygon(pts, fill=255)
    if path:
        try:
            ph = ImageOps.fit(Image.open(path).convert('RGB'), (bw, bh), Image.LANCZOS)
            canvas = img.copy()  # anything outside the photo stays as the page, so edges never show a dark line
            canvas.paste(ph, (bx, by))
            img.paste(canvas, (0, 0), mask)
            return
        except OSError:
            pass
    img.paste(Image.new('RGB', (W, H), fallback), (0, 0), mask)


photos = (a.photo + [None, None, None])[:3]
r1 = W * 0.29
hexes = [
    (hexagon(W * 0.47, H * 0.465, r1), mix(S, WHITE, 0.15)),
    (hexagon(W * 0.92, H * 0.335, W * 0.20), mix(S, WHITE, 0.35)),
    (hexagon(W * 0.84, H * 0.615, W * 0.125), mix(S, WHITE, 0.55)),
]
for (pts, col), ph in zip(hexes, photos):
    put_photo(ph, pts, col)

# Simple house outline in the big hexagon when there is no photo.
if not photos[0]:
    cx, cy, s = W * 0.47, H * 0.48, W * 0.15
    line = on(mix(S, WHITE, 0.15))
    d.line([(cx - s, cy), (cx, cy - s * 0.85), (cx + s, cy)], fill=line, width=14, joint='curve')
    d.rectangle([cx - s * 0.75, cy, cx + s * 0.75, cy + s], outline=line, width=14)
    d.rectangle([cx - s * 0.18, cy + s * 0.45, cx + s * 0.18, cy + s], outline=line, width=12)

# Project details under the block.
lines = [t for t in (a.project, a.client and ('Prepared for ' + a.client), a.date) if t]
y = block_bottom + int(H * 0.035)
for i, t in enumerate(lines):
    fl = font(54 if i == 0 else 38, heavy=(i == 0))
    d.text((strip + int(W * 0.01), y), t, font=fl, fill=(17, 17, 17) if i == 0 else (87, 96, 106))
    y += 78 if i == 0 else 58

img.save(a.out, optimize=True)
print(os.path.abspath(a.out), img.size, os.path.getsize(a.out))
```

## Tour script

```js
// ReadyTeam "quote presentation" tour: shows each page of the Links editor and explains its settings.
// Run once in the ReadyTeam tab with the Quote Presentation editor open (the Links editor with Categories / Settings / View).
// Check progress afterwards with: window.__rtLinksGuide.status()
(() => {
  if (window.__rtLinksGuide && window.__rtLinksGuide.stop) window.__rtLinksGuide.stop();

  const Z = 2147483000;
  const ORANGE = '#ff7a00';

  // Each page, the section it sits in, how to recognise it in the View, and what its settings do.
  const PAGES = [
    { name: 'Cover Page', section: 'Cover Section', view: 'cover',
      text: '<b>Cover Page</b> is the first page your client sees. <b>Cover Photo</b> (top right of the preview) changes the cover image.' +
        '<ul style="margin:6px 0 0 18px;padding:0"><li><b>Top / Center / Bottom</b>: where the cover\'s content sits. Try each and watch the preview.</li></ul>' },
    { name: 'Quote Summary', section: 'Quote Section', view: /^quote summary$/i,
      text: '<b>Quote Summary</b>: the price by category, with an intro text box at the top.' +
        '<ul style="margin:6px 0 0 18px;padding:0"><li><b>Show Categories</b>: list each category</li><li><b>Show Categories Totals</b>: the price per category</li><li><b>Show Breakdown</b>: the totals breakdown at the end</li></ul>' },
    { name: 'Quote Items', section: 'Quote Section', view: /^quote items$/i,
      text: '<b>Quote Items</b>: the detailed list. Tick what your client should see:' +
        '<ul style="margin:6px 0 0 18px;padding:0"><li><b>Categories Total</b>, <b>Include GST in Categories</b></li><li><b>Include quoted line items for each category</b>: show the items, not just categories</li><li><b>Recipe Item</b>, <b>Qty</b>, <b>UOM</b>, <b>Unit Cost (Ex)</b>, <b>Price</b></li><li><b>$0 Items</b>: also show items with no price</li></ul>' },
    { name: 'Specifications', section: 'Quote Section', view: /^specifications?$/i,
      text: '<b>Specifications</b>: what each item includes (from each item\'s Specification).' +
        '<ul style="margin:6px 0 0 18px;padding:0"><li><b>Selection Item</b>: show the chosen product</li><li><b>Categories Total</b></li><li><b>General Notes</b>, <b>Inclusions</b>, <b>Exclusions</b>, <b>Digital Key</b>: which notes to show (Internal Notes are never shown)</li></ul>' },
    { name: 'Allowances', section: 'Quote Section', view: /^allowances$/i,
      text: '<b>Allowances</b>: the PC and PS items.' +
        '<ul style="margin:6px 0 0 18px;padding:0"><li><b>Type</b>: show PC or PS</li><li><b>Markup Percentage</b>, <b>$0 Items</b></li><li><b>Price (Ex)</b>, <b>Price (Inc)</b>, <b>Price (Inc &amp; Markup)</b>: which price to show</li></ul>' },
    { name: 'Selection Options', section: 'Quote Section', view: /^selection options$/i,
      text: '<b>Selection Options</b>: the products chosen for each item, with photos. Your client can use <b>Change Product</b>.' +
        '<ul style="margin:6px 0 0 18px;padding:0"><li><b>Qty</b>, <b>Height</b>, <b>Depth</b>, <b>Width</b>, <b>Length</b>, <b>Colour</b>, <b>SKU</b></li><li><b>Total Cost (Ex)</b>, <b>Variation (Ex)</b>, <b>Supplier</b></li></ul>' },
    { name: 'Architecture Plan', section: 'Quote Section', view: /^architecture plan$/i,
      text: '<b>Architecture Plan</b>: no settings. Upload the plan file (<b>Click to select a file</b>), add any text, then click <b>Save</b>. In a template you can leave it empty and add each project\'s plan in the project.' },
    { name: 'Company Profile', section: 'Company Profile', view: /^company profile$/i,
      text: '<b>Company Profile</b>: no settings. Upload your company profile PDF (who you are, past work), add any text, then click <b>Save</b>. It goes at the end of every quote.' },
  ];

  const clean = (t) => (t || '').replace(/\s+/g, ' ').trim();
  const visible = (el) => {
    if (!el || !el.getBoundingClientRect) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return false;
    const s = getComputedStyle(el);
    return s.visibility !== 'hidden' && s.display !== 'none';
  };
  const leaf = (root, re, test) => root && [...root.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, button, a, label')]
    .find((e) => visible(e) && re.test(clean(e.innerText)) && ![...e.children].some((c) => re.test(clean(c.innerText))) && (!test || test(e)));

  const editor = () => [...document.querySelectorAll('lib-links')].find((e) => e.querySelector('*') && visible(e.firstElementChild || e)) || null;
  // The three columns, found by their header text.
  const column = (title) => {
    const e = editor();
    const h = leaf(e, new RegExp('^' + title + '$', 'i'), (x) => x.getBoundingClientRect().top < 130);
    if (!h) return null;
    let x = h;
    while (x.parentElement && x.getBoundingClientRect().height < innerHeight * 0.5 &&
      x.parentElement.getBoundingClientRect().width < innerWidth * 0.85) x = x.parentElement;
    return x;
  };
  const catCol = () => column('Categories');
  const setCol = () => column('Settings');
  const viewCol = () => column('View');

  const pageRow = (name) => { const c = catCol(); const t = leaf(c, new RegExp('^' + name + '$', 'i')); return t ? (t.closest('.group-item-list') || t.parentElement) : null; };
  const sectionRow = (name) => { const c = catCol(); const t = leaf(c, new RegExp('^' + name + '$', 'i')); return t ? (t.parentElement || t) : null; };
  const coverPhotoBtn = () => leaf(viewCol() || editor(), /^cover photo$/i);
  const current = () => {
    if (!editor()) return -1;
    if (coverPhotoBtn()) return 0;
    const v = viewCol();
    if (!v) return -1;
    const vr = v.getBoundingClientRect();
    for (let i = 1; i < PAGES.length; i++) {
      const h = leaf(v, PAGES[i].view, (x) => x.getBoundingClientRect().top < vr.top + 160);
      if (h) return i;
    }
    return -1;
  };

  // Overlay elements.
  const style = document.createElement('style');
  style.textContent =
    '@keyframes rtLinksPulse{0%,100%{outline-color:' + ORANGE + '}50%{outline-color:#ffc38a}}' +
    '#rt-links-tip button{font:inherit;border-radius:6px;padding:6px 12px;cursor:pointer}';
  const spot = document.createElement('div');
  Object.assign(spot.style, {
    position: 'fixed', zIndex: Z, pointerEvents: 'none', borderRadius: '6px',
    outline: '3px solid ' + ORANGE, outlineOffset: '2px',
    animation: 'rtLinksPulse 1.4s ease-in-out infinite', transition: 'all .15s ease', display: 'none',
  });
  const tip = document.createElement('div');
  tip.id = 'rt-links-tip';
  Object.assign(tip.style, {
    position: 'fixed', zIndex: Z + 1, maxWidth: '340px', background: '#fff', color: '#1f2328',
    borderRadius: '10px', padding: '12px 14px', boxShadow: '0 8px 24px rgba(0,0,0,.25)',
    font: '14px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif', borderTop: '4px solid ' + ORANGE,
  });
  document.body.append(style, spot, tip);

  let target = 0;        // the page the tour is on
  let seen = new Set();  // pages the user has looked at
  let finished = false;
  let shownKey = '';

  function render(html, buttons) {
    const key = html + '|' + buttons.map((b) => b.label).join(',');
    if (key === shownKey) return;
    shownKey = key;
    tip.innerHTML = html + '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:10px"></div>';
    const row = tip.lastChild;
    for (const b of buttons) {
      const el = document.createElement('button');
      el.textContent = b.label;
      Object.assign(el.style, b.primary
        ? { background: ORANGE, color: '#fff', border: '1px solid ' + ORANGE }
        : { background: '#fff', color: '#1f2328', border: '1px solid #d0d7de' });
      el.onclick = (e) => { e.preventDefault(); e.stopPropagation(); b.onClick(); };
      row.append(el);
    }
  }

  function highlight(el) {
    if (!el) { spot.style.display = 'none'; return; }
    const r = el.getBoundingClientRect();
    Object.assign(spot.style, { display: 'block', top: r.top - 3 + 'px', left: r.left - 3 + 'px', width: r.width + 6 + 'px', height: r.height + 6 + 'px' });
  }

  // Next to the Categories column for "click this page", over the bottom of the View when explaining settings.
  function placeBeside(el) {
    const t = tip.getBoundingClientRect(), gap = 12;
    const c = catCol();
    const r = el ? el.getBoundingClientRect() : { top: 120 };
    const left = c ? c.getBoundingClientRect().right + gap : 320;
    tip.style.left = Math.min(left, innerWidth - t.width - gap) + 'px';
    tip.style.top = Math.max(gap, Math.min(r.top, innerHeight - t.height - 80)) + 'px';
  }
  function placeInView() {
    const t = tip.getBoundingClientRect(), gap = 16;
    const v = viewCol();
    const vr = v ? v.getBoundingClientRect() : { left: innerWidth / 2, right: innerWidth, bottom: innerHeight - 60 };
    tip.style.left = Math.max(gap, vr.right - t.width - gap) + 'px';
    tip.style.top = Math.max(gap, Math.min(vr.bottom, innerHeight - 70) - t.height - gap) + 'px';
  }

  function go(i) { target = Math.max(0, Math.min(PAGES.length - 1, i)); shownKey = ''; }

  function finish() {
    finished = true;
    spot.style.display = 'none';
    render('<b>That\'s your quote presentation.</b> Settings you tick save as you go; use <b>Save</b> on pages with a file or text. ' +
      'Use <b>Full Preview</b> at the bottom right to see it as your client will, then click <b>Close</b>.', [{ label: 'Close', primary: true, onClick: stop }]);
    placeInView();
    setTimeout(stop, 20000);
  }

  function tick() {
    if (finished) return;
    const head = (i) => '<div style="font-size:12px;color:#57606a;margin-bottom:4px">Quote presentation · page ' + (i + 1) + ' of ' + PAGES.length + '</div>';
    const close = { label: 'Close guide', onClick: stop };

    if (!editor()) {
      spot.style.display = 'none';
      render('Open the <b>Quote Presentation</b> to start: Settings > Cost Assistant > <b>Links</b> > <b>Quote Presentation</b>, then click <b>Cover Page</b>.', [close]);
      tip.style.left = Math.max(12, (innerWidth - 340) / 2) + 'px';
      tip.style.top = '24px';
      return;
    }

    const cur = current();
    const fresh = cur >= 0 && !seen.has(cur);  // a page the user opened that the tour hasn't explained yet
    if (cur >= 0) seen.add(cur);
    if (fresh && cur !== target) go(cur);
    const p = PAGES[target];

    // The tour's page is open: explain its settings.
    if (cur >= 0 && cur === target) {
      const s = setCol();
      highlight(cur === 0 ? (s || coverPhotoBtn()) : s);
      const last = target === PAGES.length - 1;
      const buttons = [];
      if (target > 0) buttons.push({ label: 'Back', onClick: () => go(target - 1) });
      buttons.push(last ? { label: 'Finish', primary: true, onClick: finish } : { label: 'Next page', primary: true, onClick: () => go(target + 1) });
      buttons.push(close);
      render(head(target) + PAGES[target].text +
        '<div style="margin-top:6px;color:#57606a">The tick next to a page in Categories shows or hides that page in the quote. <b>eSign</b> (next to Options) holds the signing settings.</div>',
        buttons);
      placeInView();
      return;
    }

    // Point at the next page to open, opening its section first if needed.
    const row = pageRow(p.name);
    if (row && visible(row)) {
      highlight(row);
      render(head(target) + 'Click <b>' + p.name + '</b> (its name, not the tick box).', [{ label: 'Skip page', onClick: () => go(target + 1) }, close]);
      placeBeside(row);
      return;
    }
    const sec = sectionRow(p.section);
    highlight(sec);
    render(head(target) + 'Open <b>' + p.section + '</b> with the arrow on its left to see its pages.', [close]);
    placeBeside(sec);
  }

  const onKey = (e) => { if (e.key === 'Escape') stop(); };
  const timer = setInterval(tick, 250);
  addEventListener('keydown', onKey, true);

  function stop() {
    clearInterval(timer);
    removeEventListener('keydown', onKey, true);
    style.remove(); spot.remove(); tip.remove();
    if (!finished) window.__rtLinksGuide.closedByUser = true;
  }

  window.__rtLinksGuide = {
    stop,
    closedByUser: false,
    status: () => ({ page: PAGES[target].name, pageNumber: target + 1, total: PAGES.length, seen: [...seen].map((i) => PAGES[i].name), finished, closedByUser: window.__rtLinksGuide.closedByUser }),
    check: () => 'editor:' + !!editor() + ' categories:' + !!catCol() + ' settings:' + !!setCol() + ' view:' + !!viewCol() + ' current:' + (current() >= 0 ? PAGES[current()].name : '-') +
      ' coverPhoto:' + !!coverPhotoBtn(),
  };
  tick();
  return 'ReadyTeam quote presentation tour started: ' + (editor() ? 'editor open' : 'waiting for the Quote Presentation editor');
})();
```
