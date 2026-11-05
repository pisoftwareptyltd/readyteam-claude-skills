---
name: readyteam-brand-setup
description: Set up a company's branding in ReadyTeam from its logo using Claude in Chrome - upload the logo the user attaches and set the Primary Color and Secondary Color taken from that logo (System Setting > Company Profile > Company Branding), then save after the user says yes. Use when the user wants to add their logo or brand colours, set up branding or brand setup in ReadyTeam, gives a logo for ReadyTeam, or as the first step of ReadyTeam onboarding.
---

# ReadyTeam: brand setup from the company logo

The user gives you their logo. You upload it to ReadyTeam and set the two brand colours from the logo's own colours. ReadyTeam uses the logo and colours on the company's documents and screens.

Where it lives: **Settings (gear icon, top right) > Company Profile > Company Branding**. The page has:

- the **logo**: a round picture with a camera icon; .jpg or .png, smaller than 2MB;
- **Primary Color** and **Secondary Color** (both required): a text field for the colour code, with a colour circle beside it;
- the **Update Company Profile** button, which saves.

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

## How to talk to the user

The user is usually not technical. Use plain words, ask one question at a time, and never show file paths, code or tool names unless they ask.

## Steps

### 1. Get the logo

If the logo is already in this chat (attached earlier), use it and don't ask. Otherwise ask, as buttons:

"Do you have your company logo ready? A .png with a clear background works best; any image is fine."
Options: **Yes, I'll attach it** · **Use the logo already in ReadyTeam** (only colours) · **I don't have one**.

- **Yes, I'll attach it**: reply in plain words, "Tap **+** below the message box, choose **Upload a file**, pick your logo, then press **Send**. I'll wait for it." Then end your turn and wait. When the next message comes, check the image is really attached; if not, say "I didn't get the logo yet" and repeat this line. Do not go on to colours, saving or any other step without it.
- **Use the logo already in ReadyTeam**: open Company Branding (step 4), take the logo from the round picture (screenshot or its image link), and continue from step 2 with it, skipping the upload in step 5.
- **I don't have one**: ask as buttons: **Skip branding for now** · **I'll find my logo**. Skip only on **Skip branding for now**; on **I'll find my logo**, wait for it as above.

If the user can only paste a link to their logo or website, ask them to save the image and attach it instead: the upload needs a file they shared with this chat.

Once you have the logo, go straight on through steps 2 to 7 without stopping: work out the colours, open Company Branding, upload, fill the colours, then ask once in step 7.

### 2. Work out the colours

Run the **Logo script** at the end of this skill on the attached file with Python (it needs Pillow: `pip install pillow` if it is missing; add `--break-system-packages` if pip asks). Pass the logo's path and a folder you can write to, for example the session's outputs folder:

```
python3 logo_colors.py "<logo file>" "<outputs folder>"
```

It prints:

- `primary` and `secondary`: the suggested colour codes;
- `logo_colours`: the logo's main colours with their share of the logo, background left out;
- `upload_file`: the file to upload. It is the original file when that is already a .jpg or .png under 2MB; otherwise a converted copy (`logo-readyteam.png` or `.jpg`) saved in the folder you passed.

How it picks: **Primary** is the logo's main colour (the largest colourful area; a black or grey logo uses its main dark colour). **Secondary** is the next colour that is clearly different. A one-colour logo gets white as the secondary (dark grey if the logo is very light). A plain background around the logo is ignored.

If Python cannot run, look at the logo yourself and choose the two colours the same way, giving them as #rrggbb codes. If the logo is not .jpg/.png or is 2MB or bigger and you cannot convert it, ask the user for a .png or .jpg under 2MB.

Look at the logo yourself as well, to check the script's choice makes sense (for example, a photo-style logo can give odd colours). If it doesn't, choose better ones from `logo_colours`.

### 3. Don't ask yet

Go straight on: open Company Branding, upload the logo and fill in the two colours yourself (steps 4 to 6). Nothing is saved until **Update Company Profile** is clicked, so the user sees the result and answers once, in step 7.

### 4. Open Company Branding

1. Load the Claude in Chrome tools in one ToolSearch call if they are deferred, including `find`, `read_page`, `form_input`, `file_upload` and `computer`. Use the ReadyTeam tab that is already open (for example from onboarding); otherwise call `tabs_context_mcp`, open a new tab and go to **the ReadyTeam site the user is using**: either **https://app.readyteam.ai/** (live) or **https://ready-team-staging.web.app/** (test). Use the one from onboarding, or the one already open in a Chrome tab (check `tabs_context_mcp`), or the one the user names; if none, use https://app.readyteam.ai/. Stay on that same site for every step and never switch to the other one. If a login page shows, ask the user to sign in there, then ask as buttons: **I've signed in** · **I need help signing in**.
2. Click the **Settings** gear icon at the top right of the header (an image with the tooltip "Settings").
3. In the System Setting panel, click **Company Profile**, then **Company Branding**.
4. Take one screenshot and check the Company Branding page shows the logo circle, Primary Color, Secondary Color and Update Company Profile. Note the colours and logo already there, so you can tell the user what changes.

### 5. Upload the logo

Find the logo's file input with `find` or `read_page` (an `input type=file` with `accept=image/*` covering the round picture; it is invisible, so look for the file input itself). Upload `upload_file` to it with `file_upload`. **Do not click the picture or the camera icon**: that opens a file window you cannot use.

Then take one screenshot and check the round picture now shows the logo. If an error appears (wrong type, too big), fix the file as in step 2 and try once more; if it still fails, tell the user what ReadyTeam said.

### 6. Set the two colours

Find the two colour text fields (placeholders "Pick a primary color" and "Pick a secondary color"). For each one, set the code with `form_input`. Each field also has a colour input next to it (type=color); set that to the same code if it does not follow by itself.

Then take one screenshot and check both fields show the new codes and both colour circles show the new colours. If a field didn't take the value, click into it, select all, type the code, and press Tab.

### 7. Save, after a yes

Tell the user in two lines what is on the screen now: the logo, and the colours you picked with their names (for example "Primary #ff7a01, orange, the main colour of your logo; Secondary #1b2a4b, dark navy"). Then ask once, as buttons:

"Shall I save your logo and these colours?"
Options: **Save it** · **Use different colours** · **Not now**.

- **Use different colours**: ask, as buttons, with the logo's other main colours from `logo_colours` as options (for example **Navy and white** · **Orange and black**), or let them type codes or colour names (turn a colour name into a #rrggbb code and say which you used). Fill them in, then ask **Save it?** again.
- **Not now**: leave the page as it is and say nothing was saved.

Wait for **Save it**, even if they said "go ahead" earlier.

On a yes, click **Update Company Profile**. Take one screenshot:

- a success message, or the page shows the new logo and colours with no error: tell the user the branding is saved, with the two codes;
- an error (red text under a field, or an error message): tell the user in plain words what ReadyTeam said, fix it, and ask again before clicking Update again.

Leave the settings panel open on Company Branding so the user can see the result, unless they ask you to close it.

## Rules

- Only change the logo and the two colours. Do not touch Company Details, Bank Details or any other setting.
- Keep the logo file and the two colour codes for the rest of the chat: the quote presentation step uses them for the cover page without asking again.
- Never click Update Company Profile without the user's yes in this chat.
- Only upload the logo the user gave in this chat (or the converted copy made from it). Never upload anything else.
- If the user says "colours only" or "logo only", do just that part and leave the other as it is.
- If a step's button or field can't be found, take one screenshot, tell the user what you see, and ask before trying something else. Do not keep clicking around in settings.

## Status

Page layout and selectors were checked on the live Company Branding page (Nov 2026): gear `img[mattooltip=Settings]`; panel `.system-settings-panel`; menu rows `.list-box` with the texts "Company Profile" and "Company Branding"; logo `input[type=file][accept="image/*"]` inside `.profile-image-container`; colours `input[placeholder="Pick a primary color"]` / `input[placeholder="Pick a secondary color"]`, each with an `input[type=color]` beside it; button "Update Company Profile". Not yet run end to end with a save. On the first real run, note whether `form_input` alone updates the colour fields and whether the save shows a success message, and update steps 6 and 7 if needed.

## Logo script

Save this as `logo_colors.py` and run it as shown in step 2.

```python
# Pick ReadyTeam brand colours from a logo, and make sure the file can be uploaded.
# Usage: python3 logo_colors.py <logo file> [<folder for a converted copy>]
import colorsys, json, os, sys
from collections import Counter
from PIL import Image

src = sys.argv[1]
out_dir = sys.argv[2] if len(sys.argv) > 2 else os.path.dirname(os.path.abspath(src))

img = Image.open(src)
img.load()
rgba = img.convert('RGBA')

# 1. Upload file: ReadyTeam takes .jpg or .png under 2MB.
upload = src
ext = os.path.splitext(src)[1].lower()
if ext not in ('.png', '.jpg', '.jpeg') or os.path.getsize(src) >= 2 * 1024 * 1024:
    up = rgba.copy()
    up.thumbnail((1000, 1000))
    upload = os.path.join(out_dir, 'logo-readyteam.png')
    up.save(upload, optimize=True)
    if os.path.getsize(upload) >= 2 * 1024 * 1024:
        upload = os.path.join(out_dir, 'logo-readyteam.jpg')
        bg = Image.new('RGB', up.size, (255, 255, 255))
        bg.paste(up, mask=up.split()[3])
        bg.save(upload, quality=88)

# 2. Colours: visible pixels only, minus a plain background.
small = rgba.copy()
small.thumbnail((200, 200))
w, h = small.size
px = small.load()
opaque = [px[x, y][:3] for y in range(h) for x in range(w) if px[x, y][3] >= 128]
if not opaque:
    sys.exit('No visible pixels in the logo')

def dist(a, b):
    return sum((p - q) ** 2 for p, q in zip(a, b)) ** 0.5

edge = [px[x, y] for x in range(w) for y in (0, h - 1)] + [px[x, y] for y in range(h) for x in (0, w - 1)]
edge_opaque = [p[:3] for p in edge if p[3] >= 128]
background = None
if len(edge_opaque) > 0.6 * len(edge):  # solid background around the logo
    background = Counter(edge_opaque).most_common(1)[0][0]

# Group similar colours (anti-aliased edges, JPEG noise); each group keeps its most common exact colour.
groups = []  # [rgb, count]
for rgb, n in Counter(opaque).most_common():
    for g in groups:
        if dist(rgb, g[0]) < 48:
            g[1] += n
            break
    else:
        groups.append([rgb, n])
total = len(opaque)

colours = []
for rgb, n in sorted(groups, key=lambda g: -g[1]):
    if background and dist(rgb, background) < 48:
        continue
    if n / total < 0.02:
        continue
    _, light, sat = colorsys.rgb_to_hls(*(c / 255 for c in rgb))
    colours.append({'hex': '#%02x%02x%02x' % rgb, 'rgb': rgb, 'share': round(n / total, 3),
                    'saturation': round(sat, 2), 'lightness': round(light, 2)})

def colourful(c):
    return c['saturation'] >= 0.25 and 0.12 <= c['lightness'] <= 0.9

def near_white(c):
    return c['lightness'] > 0.92

# Primary: the biggest colourful colour; if the logo has none, its biggest dark/grey colour.
cands = [c for c in colours if colourful(c)] or [c for c in colours if not near_white(c)] or colours
primary = max(cands, key=lambda c: c['share']) if cands else None
# Secondary: the next colour clearly different from the primary.
rest = [c for c in colours if primary and c is not primary and dist(c['rgb'], primary['rgb']) > 70 and not near_white(c)]
secondary = max(rest, key=lambda c: c['share'] * (1.5 if colourful(c) else 1)) if rest else None

if primary is None:
    primary_hex, secondary_hex = '#222222', '#ffffff'
else:
    primary_hex = primary['hex']
    if secondary:
        secondary_hex = secondary['hex']
    else:  # one-colour logo: pair it with white, or dark grey if the logo is very light
        secondary_hex = '#ffffff' if primary['lightness'] < 0.75 else '#222222'

print(json.dumps({
    'upload_file': os.path.abspath(upload),
    'primary': primary_hex,
    'secondary': secondary_hex,
    'background_ignored': ('#%02x%02x%02x' % background) if background else None,
    'logo_colours': [{k: c[k] for k in ('hex', 'share')} for c in colours],
}, indent=1))
```
