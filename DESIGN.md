# Design direction: portfolio redesign

**Goal:** the site should read as **clean, elegant and authoritative**. A hiring manager looking for an SRE / DevOps engineer should see someone careful and calm who has run production systems.

**Principles**

1. **Quiet confidence.** Use whitespace, a strict type scale and one accent color. No gradients, glows or busy motion.
2. **Serif for authority, sans for clarity, mono for labels.** Each typeface has one job. Don't mix their roles.
3. **Proof before adjectives.** Lead with concrete facts (300+ publishers, 1,300+ tests, a 6-node Talos cluster), set as serif figures over an ink rule. Don't repeat the same figure across sections. Avoid words like "passionate" or "rockstar".
4. **Left-aligned, editorial layout.** Use a readable measure and a clear reading order. Don't center blocks of text.
5. **Calm motion.** One short load sequence and nothing else moving on its own:
   - **Hero:** the two name lines rise in 0.7s. Everything else settles in 0.5s, staggered 60ms, so the hero is done within about 0.9s.
   - **Videos:** autoplay muted and looping while at least a quarter of the video is on screen, on every device, and pause when scrolled away (no wasted bandwidth). With reduced motion they rest on their first frame and play only in fullscreen.
   - **Tiles and images:** no scroll-triggered entrances and no pulsing skeletons. Tiles render at rest.
   - **Logos:** a static row.
   - **Status dot:** only the persistent availability dot pulses.
   - Everything respects `prefers-reduced-motion`.

---

## Typography

Every family is free (SIL Open Font License) and on Google Fonts, so `next/font/google` can self-host all of them.

Three families (decided 2026-10-25, after a typography review):

| Role | Family | Axes loaded | Used for |
|---|---|---|---|
| **Serif** (display and editorial) | **Newsreader** (Production Type) | `wght` 200–800, `opsz` 6–72; roman only | Name, h1, h2, h3, leads, figures, email |
| **Sans** (default) | **Hanken Grotesk** | `wght` 100–900; roman only | Body copy, UI, nav, buttons, captions, facts |
| **Mono** | **Geist Mono** | `wght` 100–900 | Uppercase labels, tile meta, stack lists |
| **Code** (only on pages with code) | **DM Mono** | 400 | Code blocks, terminal snippets, inline `code` |

### Why Newsreader replaces Libre Baskerville and Crimson Pro

- **Optical sizes.** Newsreader has a real `opsz` axis, so with `font-optical-sizing: auto` the 128px name uses its fine display cut and the 20–24px leads use its sturdier text cut. Baskerville was drawn for body text and looked wide, heavy and bookish at 112px.
- **One serif instead of two.** Baskerville and Crimson Pro have different x-heights and stress, and they clashed when stacked. Now the name and the lead are one voice.
- **Better figures.** Newsreader's lining figures look handsome at 36–96px. Monospace figures at display size read as a developer template.
- **Fixes a collision.** At Baskerville's tight leading, the "g" in Miguel touched the dots in Guijarro.

Rejected: Source Serif 4 (reads as documentation), Instrument Serif (one weight, no optical sizes, overused), Fraunces (too playful), Playfair (fashion Didone).

### Why Hanken Grotesk replaces TWK Lausanne

TWK Lausanne (Weltkern) is a commercial neo-grotesk. Hanken Grotesk is the closest free match:

- Similar neutral Swiss skeleton, open apertures and an even texture at text sizes.
- Variable weight 100–900 **with true italics**. Lausanne's main draw is a full italic set at every weight, and most free grotesks (Geist, Instrument Sans) don't have true italics.
- Slightly warm and humane, so it sits well next to the serif.

Runner-ups: **Inter Tight** is the closest in spirit but reads as a developer default. **Schibsted Grotesk** has more character but is less neutral.

### Rules

- **Newsreader carries all the authority.** Use it for the name, the h1/h2/h3, the leads, the email and every figure. Never synthesize bold or italic (`font-synthesis: none`).
- **Variable weights are tuned per role and ease off in dark mode**, because light text on dark reads heavier. They live in CSS variables (`--w-display` and friends) set in `globals.css`.
- **Geist Mono is for small uppercase labels** (`0.08em` tracking) and the 13px tile meta. Not for figures.
- **DM Mono is only for code.** If a page has no code, don't load it there.
- Hanken Grotesk sets body text at 17px with line-height 1.65 and a maximum measure of 65ch. Leads cap at `32em`.
- Headings use `text-wrap: balance`. `p`, `dt`, `dd`, `li` and `figcaption` use `text-wrap: pretty`. Use non-breaking spaces inside units and pairs ("3&nbsp;weeks", "Terraform&nbsp;/&nbsp;OpenTofu", "25&nbsp;s").
- Use curly apostrophes (’) in all copy.
- **The Google-served files have their extra OpenType features stripped.** Don't write `ss`, `cv`, `case` or `onum` settings; they do nothing. Figures use `lining-nums proportional-nums`.

### Type scale (rem, 16px root)

The serif steps are component classes in `globals.css` (`.type-display`, `.type-statement`, `.type-h1`, `.type-h2`, `.type-h3`, `.type-lead`, `.type-metric`). They aren't Tailwind `fontSize` tokens, so `tailwind-merge` never mistakes them for text colors inside `cn()`.

| Class | Size (phone → 1440px) | Font | Weight light / dark | Line-height | Tracking | Used for |
|---|---|---|---|---|---|---|
| `.type-statement` | `clamp(2.75rem, 1.6rem + 3.6vw, 4.5rem)`, 44 → 72px | Newsreader | 340 / 320 | 1.12 | -0.022em | The hero sentence |
| `.type-display` | `clamp(4.5rem, 2.6rem + 6vw, 8rem)`, 72 → 128px | Newsreader | 340 / 320 | 1.04 | -0.028em | Reserved for a name-only headline (not used today) |
| `.type-h1` | `clamp(2.5rem, 1.75rem + 2.5vw, 4rem)`, 40 → 64px | Newsreader | 360 / 340 | 1.04 | -0.025em | Case-study title |
| `.type-h2` | `clamp(2rem, 1.55rem + 1.4vw, 2.75rem)`, 32 → 44px | Newsreader | 380 / 360 | 1.08 | -0.02em | Every section head, GitHub tile |
| `.type-h3` | `clamp(1.375rem, 1.3rem + 0.3vw, 1.5rem)`, 22 → 24px | Newsreader | 450 | 1.25 | -0.01em | Case-study decision titles |
| `.type-lead` | `clamp(1.25rem, 1.1rem + 0.45vw, 1.5rem)`, 20 → 24px | Newsreader | 400 / 380 | 1.4 | -0.005em | Hero lead, About, case-study intro, email |
| `.type-metric` | `clamp(2.25rem, 1.9rem + 1.25vw, 3rem)`, 36 → 48px | Newsreader | 350 / 330 | 1 | -0.02em | Proof strip, case-study stats |
| body | `1.0625rem` | Hanken 400 | | 1.65 | 0 | Skills, case-study prose |
| small | `0.9375rem` | Hanken 400 (500 for UI) | | 1.35–1.6 | 0 | Captions, nav, buttons, figure labels |
| meta | `0.8125rem` | Geist Mono 400 | | 1.4 | 0 | Tile meta, stack line |
| `.text-label` | `0.75rem` uppercase | Geist Mono 500 | | 1.4 | 0.08em | See below |

**Where `label` appears:** the logo-row heading, the eyebrows on typographic tiles, and the footer's legal line. Section heads never get an eyebrow.

---

## Color

The palette is cool ink on paper with one deep accent. A status green appears only on the availability dot. It's an SRE detail: a single "operational" signal.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#F5F6F7` | `#0E1114` | Page background |
| `--surface` | `#FFFFFF` | `#171D23` | Cards, media frames |
| `--ink` | `#111418` | `#E8EBEE` | Headings, primary text |
| `--muted` | `#5B6470` | `#8B95A1` | Secondary text, captions |
| `--rule` | `#CAD0D7` | `#2E3640` | Hairlines, borders (about 1.5:1 on paper, so they still register on average displays) |
| `--accent` | `#1E4A8A` | `#9DB8E3` | Links, focus ring, active-nav dot (distinct from ink, about 8.5:1 on paper) |
| `--primary` / `--on-primary` | `#23395B` / `#F5F6F7` | `#E8EBEE` / `#0E1114` | The primary button: navy in light mode, inverted ink in dark mode, because pale blue reads as soft |
| `--status` | `#2F855A` | `#5FD39A` | The availability dot only |

- `--ink` and `--muted` on `--paper` and `--surface` meet WCAG AA in both themes.
- Use the accent sparingly: links, one primary button per view, the focus ring. Never as a large background block.
- No drop shadows. Media frames use a 1px inset border in `--rule` instead.
- No texture or grain overlays.
- **Dark-mode media:** photos and videos dim to 88% brightness and return to full brightness on hover.

---

## Layout and spacing

The layout is adapted from rachelchen.tech, measured on 2026-10-25 at a 1512px viewport. Her site works because **one 12-column grid governs everything**: the side rails, the hero, the facts row and the project columns all snap to the same column lines.

### Reference: how rachelchen.tech distributes the page

| Element | Measured |
|---|---|
| Frame | 12 columns of ~106px, `16px` gutter, `24px` page margin at ≥1200px (`16px` below). Full-bleed, no max-width. |
| Zones | **Left rail** cols 1–2 (name at the top, nav) · **content** cols 3–10 (8 columns, 961px) · **right rail** cols 11–12 (one utility button). The rails sit on a fixed layer, so they stay put while the content scrolls. |
| Shared top line | `--content-start: 240px`. The nav's first link and the hero headline's top share that line, which locks rail and content together. |
| Hero | Libre Baskerville at 64/80px with `-0.03em` tracking, spanning all 8 content columns (40px below 769px). |
| Facts row | A nested 8-column grid: "Currently" spans 2, "Previously" spans 4, and the last 2 stay empty. Labels are 15px at 55% ink, values 15px at 80% ink. |
| Project grid | 2 columns of 472px (4 sub-columns each), `16px` gap across, `32px` down. Each column is its **own vertical stack**, so rows never line up and the eye reads down a column. Most thumbnails are 16:9, and a few taller ones (1.45, 1.27) create the stagger. |
| Card | Media with a 1px **inset** border (no shadow, no radius), then an 8px gap, then a 14–15px caption: `Title` (100% ink) ` / ` (25%) `Type Year` (45%). |
| Type contrast | Almost everything is either 64px serif or 15px sans. The jump between the two sizes does the work. |
| Color | One ink color at opacity steps (25/40/45/55/80/100%) plus one accent, used only for the active nav dot. |
| Below 1024px | The rails collapse into a top nav bar with a bottom border, and the content spans all 12 columns. |

### Our grid

**Frame**

- 12 columns, `16px` gutter, page margin `16px`, or `24px` at ≥1200px. Cap the frame at `90rem` (1440px) and center it, so the content doesn't stretch on very wide screens.
- **≥1024px:**
  - **Left rail** (cols 1–2): "Miguel Guijarro" at the top, then a sticky section nav (Skills, Projects, About, Contact, then Case study as a page link) starting at `--content-start`. Highlight the current section with an `--accent` dot (scroll-spy).
  - **Content** (cols 3–10).
  - **Right rail** (cols 11–12): the pulsing status dot with "Open to US-remote roles", and "Copy email". This is the page's one availability signal; other sections don't repeat it.
  - **Theme toggle:** a text button under "Copy email" that names the other theme ("Dark mode ☾" / "Light mode ☼"). On phones it's an icon button next to the status in the top bar.
    - It saves `theme` in localStorage. With no saved choice, the site follows the system setting.
    - An inline script in `<head>` (`(landing)/theme.ts`) applies the saved class before first paint, so there's no flash.
    - The label and icon swap through `.when-light` / `.when-dark` in CSS, so the server HTML never mismatches.
- `--content-start: clamp(128px, 15vh, 200px)`: the first nav link and the top of the hero sentence share that line. Shorter screens pull it up so the proof strip stays in the first view (on a 1440×900 laptop the figures start at about y=710).
- Both rails set `15px / leading-6`, so the header row (name, status) shares one baseline. The nav list uses `leading-5` with a `12px` gap.
- **Below 1024px:** the rails become a top bar (name, status, section links) with a `1px` `--rule` bottom border, and the content spans all 12 columns.

**Inside the content area** (an 8-column subgrid)

- **Hero sentence** (chosen 2026-10-25 from four explorations, after rachelchen.tech):
  - "Miguel Guijarro is an SRE who builds for fun." in `.type-statement`, across all 8 columns.
  - On desktop it breaks after "SRE", so it reads as two lines; on phones it wraps naturally.
  - It starts on the `--content-start` line, level with the first nav link.
  - There's no eyebrow and no portrait; the sentence says who and what.
- **Facts row** (her "Currently / Previously" pattern, kept short and without dates), 15px Hanken with `--muted` terms, spanning 2 / 4 / 2 columns:
  - Currently: Building Smartops in Mexico City.
  - Previously: Nearly two years at Amazon, across AWS and Kindle.
  - Citizenship: US and Mexican. Work authorization is the first thing a US-remote screener looks for.
- **Proof strip:** closes the hero. Four `.type-metric` figures, 2 columns each (2×2 on phones), each with its own `1px` `--ink` top rule. Only figures already stated on the site, and each label starts with the noun its figure counts: "~2 / Years at Amazon…", "300+ / Publishers hit by a defect; the fix was built 3 weeks earlier", "6 / Nodes in a Talos Kubernetes lab…", "1,300+ / Tests against real Postgres and Redis".
- **Section heads:** `.type-h2` in 5 columns, with an optional `--muted` note in the last 3 sharing the title's last baseline. Notes are only for information the title doesn't already say; none are used today.
- **Skills:** each row puts the category (Hanken 15px `--muted`) in 2 columns and the skills in 6, baseline-aligned. Rows are in SRE priority order: Containers & Orchestration, Infrastructure & Cloud, Observability, CI/CD, Languages, AI & Automation.

**Spacing** (8px base, 4px half-step)

- Scale: 4 / 8 / 12 / 16 / 24 / 32 / 40 / 48 / 56 / 64 / 96 / 128px.
- **Hero:** the rows are spaced explicitly, not with one grid gap:
  - sentence → facts `40px`
  - facts → actions `40px`
  - actions → proof `64px`
  - figure → label `12px`
- **Logos:** pulled up into the hero (`-mt-8` against the main gap) so they read as its credentials line. `24px` from label to marks.
- **Sections:** `96px` gap, the hairline, then `56px` (`lg:pt-14`), which is about 160px from the last line to the next title. Phones use `80px` and `40px`.
- **Inside sections:** title → grid `48px`, title → skills list `32px`, title → lead `24px`, lead → grid `48px`. Contact uses `24px` steps throughout.
- **Grid:** `40px` between rows.
- **Footer:** `32px` vertical padding, with the name and legal line on one baseline.
- Text columns cap at `65ch`.

**Radius**

- **Media:** square corners, with a 1px inset border in `--rule` (`box-shadow: inset 0 0 0 1px var(--rule)` on an `::after` layer).
- **Buttons:** `6px`.
- **Tags:** `999px`.

### Project grid

**Current (decided 2026-10-25): React Grid Layout stays for now.** The items, their layouts, dragging and vertical compaction are unchanged. Only the tiles and spacing follow this system:

- **Tile:** a `figure`. Square media with an inset `--rule` hairline, a `10px` gap, then the caption **under** the media in a fixed `64px` block, so media edges line up across a row.
- **Caption:** the title in Hanken 15px/500 at 1.35 line-height (two lines at most), then the meta on its own line in Geist Mono 13px `--muted`.
- **Caption budget:** about 55 characters for narrow tiles, so the key figure is never clipped. Move descriptors into the meta. Captions must match what the media shows (e.g. the AWS video's slide title).
- **Links:** a tile with a link makes its **title** the link (underline plus a small ↗). There are no floating icon buttons on the media.
- **Tile types:**
  - `image` and `video`.
  - `feature`: a typographic preview of the case study on the apricot gradient.
    - **Content:** a two-beat `.type-h2` headline, one sentence per line ("Isolated by the database. / Stateless by design.", distilled from the first two reliability decisions), then a row of the page's own stats: 123 API operations, 38 row-level security policies, 19 versioned migrations.
    - **No tests stat:** "1,300+ tests" is left out because the hero proof strip already shows it.
    - **Phones:** the stats drop out because the tile is too short.
    - **Caption:** the case-study title, with meta "Smartops · Architecture & reliability".
    - **Shared content:** the headline, title and stats come from `case-studies/manufacturing-platform/content.ts`, which the page also reads, so the tile and page never drift apart.
  - `link`: a typographic panel pointing elsewhere (the GitHub tile).
  - The two typographic panels are clickable as a whole through `PanelLink`, which ignores the click that ends a drag. The caption title stays the accessible link.
- **Order:** rows pair one 3-column tile with one 1-column tile, strongest work first:
  1. case study + Amazon shout-out
  2. Talos lab + AWS video
  3. SAT agent + Smartops C4
  4. database demo + "More projects on GitHub", which closes the last row
- **Grid props:**
  - `margin={[16, 40]}`, and `containerPadding={[0, 0]}` so tiles align with the content columns.
  - Row height is 210px on desktop, which gives the 3-column tiles 16:9 media.
  - Phones use 120px rows and a derived single-column layout: desktop reading order, videos 2 rows tall (16:9), images 3 rows (about square).
- **Breakpoints** measure the grid's own width, which is now the 8 content columns: `lg: 700` (4 columns), `md: 460` (2 columns), `sm: 0` (1 column).
- **Dragging:** at rest a tile is flat. While dragged it scales to 1.02 and gets the page's only drop shadow, because it really is on its own layer. The "Drag to rearrange" tooltip appears after 1.6s.
- **Videos:** native `<video>` elements that autoplay as described under Calm motion. The fullscreen control appears on hover or focus (it's always visible on touch screens). Fullscreen turns the sound on.
- **Images open full size** in a lightbox (`components/cards/lightbox.tsx`). It was reviewed by a UI/UX agent on 2026-10-25, and its findings are applied.
  - **Opening:** click the image itself (`cursor-zoom-in`; a press that travels more than 6px is a grid drag and is ignored), or use the bottom-right ⤢ button, the same control as the video's fullscreen button. The button shows on hover or focus, is always visible and 44px on touch screens, and is named "View full size: <tile title>".
  - **Layout:**
    - Solid `--paper`; the header and the image share one gutter (16px on phones, 48px on desktop).
    - Top-left caption: the tile's title (two lines at most), then its mono meta. It labels the dialog (`aria-labelledby`); the alt text stays on the image only.
    - Top-right "Close ×": 44px tall (36px on desktop) with a 6px-radius focus ring, layered above the image so it gets hover.
  - **The image:**
    - A plain `<img>` reusing the exact file the tile loaded, so it's instant from cache. Tile images load at quality 90 so screenshot text stays legible.
    - Rendered at its own pixel size, so it's only ever shrunk, never upscaled.
    - Framed by the tiles' 1px `--rule` hairline (an outline).
    - Not dimmed in dark mode.
  - **Closing:** Esc (one press), any click, or Close.
  - **Motion:** it fades in over 200ms and out over 160ms (`@starting-style` plus `allow-discrete`; the component waits 160ms before unmounting). It's instant under reduced motion, and also in browsers without `overlay` support.
  - **Behavior:**
    - A modal `<dialog>` in the top layer: the page behind it is inert, and focus moves to Close and returns to the trigger.
    - Scroll lock is reference-counted, and `scrollbar-gutter: stable` keeps the page from shifting.
    - Presses and focus events stop at the dialog, so they never start a grid drag or open the tile's tooltip.
- **Tile tooltip** ("Drag to rearrange", after 1.6s):
  - It never opens on keyboard focus, because keyboard users can't drag, and while open it made Radix swallow the lightbox's first Esc.
  - It stays quiet while the pointer is over a button or link.
- **Native drag is off** on every link and image inside a tile (`draggable={false}`, plus `-webkit-user-drag: none` for Safari). A native link or image drag swallows the mouse events the grid needs, which froze the page mid-drag.

**Proposed later: a static two-column grid for vertical reading.** It's not built yet. This is the spec if we replace React Grid Layout:

- **Two columns** on desktop (4 subgrid columns each). Each column is an independent vertical stack. Captions sit **below** the media, never on top of it.
- **Read order equals priority.** Author one ordered list. At ≥640px, assign items to the left or right column. Below 640px, render the same list in a single column, in priority order. Our captions are full sentences, so unlike her site we drop to one column on phones.
- **Stagger with aspect ratios, not random placement.** Use 16:9 for video, 4:3 for screenshots and landscape photos, 4:5 for portrait images. Open the right column with a tall item, so the two columns never share a row line. Keep the column bottoms within about one card of each other.
- **Card caption:** `Title` in Hanken 15px/500 `--ink`, then ` / ` in `--rule`, then mono meta (type · year or stack) in `--muted`. Long titles wrap to two lines at most.
- **No drag and no random layout.** The layout is fixed and identical on every visit.
- **Starting assignment:**

  Numbers give the priority, which is also the single-column order on phones.

  | Left column | Right column |
  |---|---|
  | 1 · Case study, 16:9 | 2 · Amazon shout-out, 4:5 |
  | 3 · SmartOps C4 diagram, 4:5 | 4 · Talos lab, 4:3 |
  | 5 · AWS technical excellence (video), 16:9 | 6 · Talk to your databases (video), 16:9 |
  | 7 · SAT AI agent (video), 16:9 | |

- **Implementation:** a CSS grid (`grid-cols-2 gap-x-4 gap-y-8`) with two `flex flex-col gap-8` stacks, which is the technique her site uses. React Grid Layout's fixed `rowHeight` crops media, and its breakpoint compaction reorders items, which is why this would eventually replace it.

### Section treatment

| Section | Direction |
|---|---|
| **Hero** | The `.type-statement` sentence, the Currently / Previously / Citizenship row, the case-study button and GitHub/LinkedIn links, then the proof strip. The shared actions and proof strip live in `_components/hero-parts.tsx`. |
| **Logos** | A static row of four marks on the content grid (2 columns each). Grayscale at 60% opacity, heights tuned by eye for equal weight (Amazon h-6, AWS h-7, ClimateAi h-8, Tec h-9), with a `label` heading. |
| **Skills** | An 8-column definition list: category in 2 columns, skills in 6, a hairline between rows. No section note. |
| **Projects** | React Grid Layout, as described in Project grid. The case-study tile leads. No section note. |
| **About** | Heading "About" (matching the nav), a short `.type-lead` paragraph built from facts already on the page, then three photos filling the row (the meetup spans 2 columns). |
| **Contact** | Heading "Contact" (matching the nav), the email at lead size with a "Copy email" outline button, then GitHub and LinkedIn. No filler lead. |
| **Footer** | Spans all 12 columns: name and role on the left, the legal name as a `label` on the right. No status dot. |

**The case study page** (`/case-studies/manufacturing-platform`) is the hero button's destination, so it shares the landing page's frame:
- The same 12-column frame and rails. The left rail has Architecture, Decisions, Testing and Contact, then "Back to portfolio".
- **Cover** (after rachelchen.tech's project pages):
  - The same apricot `GradientPanel` and headline as the homepage tile, set in `.type-h1`, so opening the card reads as the tile growing into the page.
  - 16:9 (4:3 on phones), on the `--content-start` line above the title.
  - No stats, because the page's stat row follows right below.
  - No arrow, because it isn't a link.
  - Hidden in print.
- `.type-h1` title, `.type-lead` intro, and `.type-metric` stats under ink rules.
- `.type-h2` section heads, and `.type-h3` decision titles with a 17px "why" and a 15px muted "what".
- The stack as one mono line.
- The diagram is drawn in token colors so it works in both themes.
- It ends with the same Contact section and footer.
- In print, the rails, contact and footer drop out and a byline appears.

---

## Favicon

- **Mark:** a gradient circle in the case-study panel's apricot mesh (`src/app/icon.svg`).
- **`favicon.ico`:** 16 and 32px, rendered from the same SVG, for browsers without SVG favicons.
- **`apple-icon.png`:** 180px, the circle on `--paper` with margin, because iOS fills transparency with black.
- **Wiring:** Next.js generates the `<link>` tags from these file names, so no metadata code is needed.

---

## Components

- **Button (primary):** `--primary` background, `--on-primary` text, Hanken 500 at 15px, `6px` radius, 48px tall in the hero. Hover goes to 90% opacity.
- **Button (secondary):** transparent with a `1px` `--rule` border and `--ink` text. Hover changes the border to `--ink`.
- **Link:** `--ink` text with a `1px` underline in `--rule`, offset 4px. On hover the underline turns `--accent`.
- **Tag:** Geist Mono at 12px, `--muted` text, `1px` `--rule` border, pill-shaped. Use only where a list can't be written as plain mono text.
- **Project card:** square-cornered media with a 1px inset `--rule` border, a 10px gap, then the fixed 64px caption (see Project grid). On hover, images scale to 1.03 over 700ms inside their frame. The title is the link.
- **Typographic panel:** a mesh gradient after rachelchen.tech's project images, with a `label` eyebrow and a ↗ that nudges on hover. Clickable as a whole.
  - **Surface:** soft radial washes over a diagonal base, with a fine grain at 14% in overlay blend (`GradientPanel`; `.gradient-*` and `.panel-grain` in `globals.css`).
  - **Tones:** each card gets its own, the way her projects do. `apricot` (rose and lilac drifts) for the case study, `periwinkle` (lilac and blue) for GitHub.
  - **Text:** each tone carries its own ink (`--panel-ink`), with labels at 72%. Her white type fails contrast on pastel at 15px, so the panels use deep ink.
  - **Theme:** the panel looks the same in both themes, like a photo; in dark mode only the gradient layer dims to 90%.
  - **Hover:** the oversized gradient layer drifts and scales slowly (1s).
- **Metric:** a `1px` `--ink` top rule, a `.type-metric` figure, then a Hanken `small` caption in `--muted`, 12px below.
- **Status line:** an 8px `--status` dot, then Hanken 15px `--ink` text. Only the right-rail and mobile-bar instance pulses (off under reduced motion).
- **Focus:** a `2px` `--accent` outline with a `2px` offset on every interactive element.

---

## Implementation notes (Next 15 + Tailwind 3)

`src/app/fonts.ts`:

```ts
import { Geist_Mono, Hanken_Grotesk, Newsreader } from "next/font/google";

export const serif = Newsreader({ subsets: ["latin"], axes: ["opsz"], style: ["normal"], variable: "--font-serif", display: "swap", fallback: ["Georgia", "serif"] });
export const sans = Hanken_Grotesk({ subsets: ["latin"], style: ["normal"], variable: "--font-sans", display: "swap" });
export const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
```

- `layout.tsx` puts `fontVariables` (all three `.variable` classes) on `<html>`. Three preloaded files, with no unused italics or bold.
- In `tailwind.config.ts`, `font-display` and `font-editorial` both point at `var(--font-serif)`. The colors are `rgb(var(--token) / <alpha-value>)`, so opacity modifiers work.
- In `globals.css`:
  - Color tokens, `--content-start` and the `--w-*` weights live on `:root`, with dark values under `.dark` and `@media (prefers-color-scheme: dark)` (`:root:not(.light)`).
  - `html` sets `font-kerning: normal; font-synthesis: none` (no `optimizeLegibility`).
  - The serif scale is the `.type-*` component classes.
