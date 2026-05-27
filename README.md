# danmcd.io — site mock

A 5-page editorial personal site for Dan McDermott (danmcd.io). Static HTML + CSS. Designed to be picked up by Claude Code and turned into the production site.

## Audience and positioning

**Audience:** Solo experts — senior independent consultants and executive coaches — who are trying to build a *productized practice* rather than continuing to sell their time. Usually $150K–$700K in annual revenue, working solo or with a few freelancers.

**Voice:** Editorial, confident, occasionally dry/funny. Anti–"LinkedIn guru." Comedy register dialed to "smart, dry, occasional grin" — not loud.

**Reference class:** Kai Davis, Jonathan Stark, Philip Morgan (for the indie-consultant confidence) — but more modern, more visual, with photos and video presence because Dan does livestreams, webinars, and stand-up.

## Site structure

| File | Purpose |
|---|---|
| `index.html` | Home — hero, opt-in, "what you'll get", live/video, work-with-me, prose bio, testimonials, second opt-in |
| `writing.html` | Publication archive — list of essays with date, title, excerpt |
| `work.html` | Two paid offers + a free option (the newsletter) + FAQ |
| `about.html` | Long-form bio, chapter by chapter (UN → cleantech → S&G v1 → KK → Vouris → S&G v2) |
| `now.html` | /now page (Derek Sivers tradition) — current focus, updated periodically |
| `styles.css` | All shared styles — single source of truth for design tokens |

## Design system

All design tokens are CSS custom properties at the top of `styles.css`. Change them once, everything updates.

```css
--ink: #1a1f1a         /* primary text */
--body: #2d3530        /* body text */
--muted: #5a635c       /* secondary text */
--accent: #1f4d3a      /* deep forest green — primary accent */
--paper: #f7f4ec       /* warm cream background */
--paper-deep: #efeae0  /* secondary background */
--highlight: #c8a35a   /* warm gold — used on dark opt-in CTAs */
```

**Fonts:** Playfair Display (serif, headlines) and Inter (sans, body). Loaded from Google Fonts in each HTML head.

**To swap the accent color** (e.g., to terracotta `#b8472d`), change `--accent` in `styles.css`. That's it.

## Photos — where to put them

A folder is set up at `assets/images/`. Three placeholder slots in the HTML:

1. **Hero portrait** (`index.html`, the `.photo.portrait` block) — 4:5 aspect ratio. Head-and-shoulders.
2. **Environmental shot** (`index.html`, the "Live & on camera" section) — 16:9 aspect ratio. On stage, mid-livestream, at a desk.
3. **Casual / personality** (`index.html`, the prose bio section) — 1:1 square. Walking, laughing, candid.
4. **About-page portrait** (`about.html`) — 4:5 aspect ratio. Different from the hero photo.

Each placeholder has an HTML comment showing the exact `<img>` tag to swap in. For example:

```html
<div class="photo portrait" data-placeholder>
  <!-- Replace with: <img src="assets/images/hero-portrait.jpg" alt="Dan McDermott portrait" /> -->
  [ Hero photo — head & shoulders ]
</div>
```

To activate a photo: replace the entire `<div class="photo ...">` block with a `<div class="photo portrait"><img src="..." alt="..." /></div>` block, and remove the `data-placeholder` attribute.

## What still needs to be done

This is a complete *visual mock*. To turn it into a production site, Claude Code (or you) will need to:

### Required
1. **Add real photos** (4 placeholders, see above).
2. **Wire up the opt-in form** to a real email provider. Each `.optin-form` is a `<form>` with `action="#"` — point those at Beehiiv, ConvertKit, Mailchimp, or whatever you choose. Use the same form action across all four opt-ins on the site.
3. **Replace placeholder essay content** in `writing.html` with real essays (or remove items and start fresh).
4. **Confirm productized offer details** in `work.html` — name, scope, price are placeholder-realistic but not final.
5. **Wire up the resume PDF link** in the footer (`assets/Dan-McDermott-Resume.pdf` — drop the file there).
6. **Configure the LinkedIn URL** in every footer (`https://linkedin.com/in/danmcdermott` is a placeholder until you confirm the handle).
7. **Wire up the video block** in `index.html` — currently a static placeholder with play icon. Either embed YouTube/Vimeo, or link to a video page.

### Optional but recommended
8. Add a favicon at `assets/favicon.ico`.
9. Add Open Graph meta tags to each page for better link previews.
10. Add analytics (Plausible, Fathom, or GA4).
11. Set up redirects so `danmcd.me` points to `danmcd.io`.

## Notes on copy

All copy was drafted as a starting point — not final. Lines to scrutinize and edit:

- **Hero h1:** "I help solo experts build a productized practice." Anchors the entire site. If this isn't the right framing, change it here first, then propagate.
- **Newsletter promise:** "One essay a week on positioning, productizing, pricing, AI workflows, and the lean operations that hold it all together. No fluff, no funnels."
- **Productized offer name:** "The Signature Offer Sprint" — Dan should pressure-test the name.
- **Price point:** $7,500 was used as a placeholder; revisit before launch.
- **/now page content** — meant as a template; rewrite to current reality before publishing.

## Voice cheat sheet for Claude

When extending or rewriting copy, the voice rules:

- **Plain language, confident posture.** No "we empower," no "transform your business."
- **Specific over generic.** "Coached 1,000 marketers at Kopywriting Kourse" beats "extensive coaching experience."
- **Names named.** Use real client names where defensible. They do credibility work nothing else can.
- **Dry humor allowed.** Lines like "Two ways to work together. One is free." and "If you want a menu of twelve services, I'm not your guy" set the register. Don't go louder than that.
- **Anti-LinkedIn-guru.** No emoji-heavy headlines, no "Here's what nobody tells you about…", no growth-hack energy.
- **Em dashes are fine.** So are sentence fragments. Both feel like a person wrote it.

## Responsive behavior

Single breakpoint at 820px. Below that:
- Top bar stacks vertically
- All two-column grids collapse to single column
- Opt-in form button goes full-width below the input
- Hero photo stacks below the text

Tested in render only; verify in browser at multiple widths before launch.

## File tree

```
danmcd-site/
├── README.md           ← you are here
├── styles.css          ← all shared styles
├── index.html          ← home
├── writing.html        ← essay archive
├── work.html           ← work with me
├── about.html          ← long bio
├── now.html            ← /now page
└── assets/
    └── images/         ← drop photos here
```
