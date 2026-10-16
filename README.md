# Venado Partners, Landing Page (HTML/CSS/JS)

Design stage only. Nothing here touches the existing WordPress site.
Workflow: **PDF → HTML/CSS/JS → review → WordPress conversion.**

## Files

| File | What it is |
|---|---|
| `index.html` | The page. Semantic HTML5, one section per PDF row. |
| `styles.css` | All styling. Tokens at the top, then base, layout, components, sections, responsive, motion. |
| `script.js` | Vanilla JS: sticky header, mobile nav, scroll reveals, asset class switcher, form validation, footer year. |
| `venado-logo-light.png` | The lockup with the wordmark in paper, for dark surfaces. Used in the header and the footer. |
| `venado-logo.png` | Same lockup for light surfaces. Not placed on the page any more — the header is a dark bar in both of its states — but kept for decks, documents, and anywhere the page is not. |
| `venado-antler.svg` | The antler mark on its own, in the foil gradient. Favicon, and the mark above the relief band quote. |
| `venado-antler-512.png`, `-180.png`, `-favicon.png` | Raster versions of the mark on the brand ink, for the tab icon and the iOS home screen. |
| `img/` | The photography, described below. |
| `img/_placeholder-originals/` | The drawn relief and site-plan plates the page used before the photography. Kept as a fallback; delete them when you are sure. |
| `venado-partners-preview.html` | Single self-contained file (CSS, JS, logos, and images inlined) for emailing or hosting a quick preview. Rebuild it with `node .claude/build-preview.js`. |
| `.claude/serve.js` | Dependency-free static server for local preview: `node .claude/serve.js`, then `http://localhost:4192`. |

## The image set

Real photography, sourced from Unsplash under the
[Unsplash License](https://unsplash.com/license) (free to use commercially, no
permission needed, attribution appreciated but not required). Every file is
downloaded and served locally, cropped to its slot's aspect ratio, and re-encoded
with mozjpeg. The whole set is **1.9 MB**, and only `hero.jpg` is eager: everything
below the fold is `loading="lazy"`.

| File | Pixels | Ratio | Where it goes | Photographer |
|---|---|---|---|---|
| `hero.jpg` | 2400×1400 | 12:7 | hero background | [Frankie Lopez](https://unsplash.com/photos/a-city-with-a-road-and-a-sunset-1f0XqnWeMtE) |
| `terrain-wide.jpg` | 2000×900 | 20:9 | full-bleed relief band | [Point3D Commercial Imaging Ltd.](https://unsplash.com/photos/a-large-area-with-buildings-and-roads-SRoA10H6hmc) |
| `aerial-industrial.jpg` | 1400×1050 | 4:3 | Asset Classes, feature tile | [Marcin Jozwiak](https://unsplash.com/photos/aerial-view-of-vehicles-in-parking-area-oh0DITWoHi4) |
| `aerial-retail.jpg` | 1100×825 | 4:3 | Asset Classes, supporting tile | [Point3D Commercial Imaging Ltd.](https://unsplash.com/photos/an-aerial-view-of-a-large-building-n7KV1aMl0c0) |
| `aerial-residential.jpg` | 1100×825 | 4:3 | Asset Classes, supporting tile | [Chris Grant](https://unsplash.com/photos/aerial-view-of-residential-complex-lakes-and-green-spaces-2lttQjUSX1Q) |
| `row-infrastructure.jpg` | 1140×840 | 19:14 | Advantage, Dirt row | [Troy Mortier](https://unsplash.com/photos/excavator-dumping-soil-into-dump-truck-eKY6_9W_iqY) |
| `row-commercial.jpg` | 1140×840 | 19:14 | Advantage, Build row | [Roman Serdyuk](https://unsplash.com/photos/photo-of-gray-metal-structure-during-daytime-wFFw_xUTXOY) |
| `row-restoration.jpg` | 1140×840 | 19:14 | Advantage, Protect row | [Andrew Bright](https://unsplash.com/photos/building-under-construction-with-scaffolding-and-protective-sheeting-_pB5YW9lVnA) |
| `contact-field.jpg` | 1900×1100 | 19:11 | contact background | [EJ Yao](https://unsplash.com/photos/several-cranes-above-the-buildings-D46mXLsQRJw) |
| `plat-base.jpg` | 760×912 | 5:6 | under the hero plat linework | [Ravisankar S](https://unsplash.com/photos/aerial-view-of-agricultural-fields-and-construction-site-development-plots-G_Xd4FOfTE8) |

These are placeholders for the client's own work. Swap any file for a project shot
at the same ratio and nothing on the page reflows; update the `width`/`height`
attributes in `index.html` to the new pixel size so the browser still reserves the
right box.

**How the crops were chosen.** The hero is mirrored so the sun sits on the right,
where the overlay is lightest, and the headline sits on the darkened left. The
Asset Classes tiles are composed so the subject stays above the copy block, which
survives both the tall feature crop and the short supporting crop. `plat-base.jpg`
is an aerial of surveyed land divided into lots, so the gold plat linework reads as
an overlay on real parcels rather than decoration.

**The Advantage row keeps a graphic treatment.** Photography beat the drawn plates
here, but three unrelated stock shots do not read as one set, so `.adv__media`
desaturates them slightly and lays a warm bronze wash under each. That holds the
row together and ties it to the palette. Real project photography can drop straight
in; the treatment will flatter it too.

## Palette

Sampled from the logo file, not invented:

| Token | Hex | Where it comes from |
|---|---|---|
| `--ink` | `#1C2B1C` | the VENADO wordmark, a deep forest |
| `--champagne` | `#CFB26A` | the PARTNERS lettering |
| `--bronze` / `--amber` / `--gold-hi` / `--gold-pale` | `#7C4810` `#BC8F1E` `#F9BF4B` `#FDE28A` | the antler gradient, dark base to bright tip |
| `--paper` | `#EFF0EE` | the lockup background |

`--foil` is the antler gradient rebuilt as a CSS gradient. It carries the primary CTA, the eyebrow rules, the scroll progress bar, the section top edges, the stage tag, and the plat linework. Change these four or five values in `:root` and the whole page re-skins.

## Preview

Open `index.html` in a browser, or serve the folder:

```bash
node .claude/serve.js
```

Then `http://localhost:4192`. Any static server works; the page has no build step.

## Section rhythm

Light and dark alternate on purpose, and no two adjacent sections use the same layout device.

| Section | Field | Device |
|---|---|---|
| Header | dark in both states: transparent over the hero, deep forest with a blur once stuck | paper lockup, mono links, gold CTA |
| Hero | dark, full-bleed image | asymmetric split, oversized display type, plat card |
| What We Do | paper | sticky intro + numbered typographic list, no imagery |
| Asset Classes | tinted paper | featured tile plus two supporting tiles, image and text overlay |
| Relief band | dark, full-bleed image | one line, nothing else |
| The Venado Advantage | paper | three equal cards, treated photo over an oversized word |
| Contact | darkest, image field | split copy and a floating glass panel |

## Navigation

One page, so every link is an in-page anchor. The order follows the brief:
**Home → What We Do → Asset Classes → Venado Advantage → Contact.**

| Link | Where it is | Destination |
|---|---|---|
| Brandmark | header, footer | `#top` (hero) |
| Skip to content | first tab stop | `#main` |
| What We Do | header, mobile menu, footer | `#what-we-do` |
| Asset Classes | header, mobile menu, footer | `#asset-classes` |
| Venado Advantage | header, mobile menu, footer | `#advantage` |
| Bring us a deal | header CTA, mobile menu | `#contact` |
| Bring us a site. Bring us a deal. | hero CTA | `#contact` |
| What we do | hero secondary CTA | `#what-we-do` |
| Contact | footer | `#contact` |
| Venado Commercial | header, footer | `/` — **the one placeholder**, tagged `data-todo="venado-commercial-url"` |
| Phone, email | contact block | `tel:` and `mailto:`, both on placeholder values |

Contact has no separate item in the header list by design: the gold CTA is the
Contact destination, and it carries into the mobile menu as a full-width button.

The Asset Class tiles are not links. The brief defines no per-asset-class pages and
none exist in the project, so they stay as content. Give each tile an `<a>` when
there is somewhere for it to go.

Behaviour worth knowing:

- `html { scroll-behavior: smooth }` handles the animation, and
  `[id] { scroll-margin-top: calc(var(--header-h) + 20px) }` keeps every target clear
  of the fixed header. Both back off under `prefers-reduced-motion`.
- Any link click closes the mobile menu, not only the ones inside it — the brandmark
  sits above the overlay and stays tappable while it is open.
- Arriving on `/#advantage` directly, or refreshing there, re-applies the landing
  after the webfonts settle. Without that the browser jumps early and stops ~60px short.
- The mobile menu is centred with auto margins and scrolls if it has to, so the CTA
  stays reachable on short viewports.

## Section map, PDF to page

| PDF row (page 2) | Page section |
|---|---|
| Hero: headline + one-line positioning | `#top`, "Prime ground. Proven execution." plus the full positioning statement |
| What We Do: three pillars | `#what-we-do`, Fee Development / Acquisitions / Development |
| Asset Classes | `#asset-classes`, Industrial / Retail / Residential & Multifamily |
| The Venado Advantage | `#advantage`, Infrastructure / Commercial / Restoration, one reference each |
| Contact: direct line to the principals | `#contact`, "Bring us a site. Bring us a deal." |

## Placeholders to replace before launch

1. Phone number `(000) 000 0000` and `hello@venadopartners.com` in `#contact`.
2. The logo files here are traced out of a 234px raster, and `venado-antler.svg` is the
   antler mark redrawn as a vector in the foil gradient, not the supplied artwork itself.
   Drop the real vector lockup and the real antler file in over the top of both before
   launch so they stay crisp on retina and at large sizes. The mark is referenced in three
   places: the three `<link rel="icon">` tags in `<head>`, and the `.band__mark` image.
3. The photography is Unsplash, licensed and fine to ship, but it is stock. Replace each
   file with the client's own project shots at the same ratio when they arrive.
4. The two "Venado Commercial" links (header and footer) point to `/` and are tagged
   `data-todo="venado-commercial-url"`. Grep for that attribute and set both to the
   Commercial home once the rebrand lands. Every other link on the page resolves.
5. The contact form has no endpoint. Wire it at WordPress conversion (Gravity Forms, WPForms, or a POST handler).

## WordPress conversion notes

- Sections are independent and map cleanly to ACF flexible content blocks or a page-builder section each.
- All color and type values are CSS custom properties in `:root`. Theme options can override them.
- No build step, no framework, no jQuery. Two fonts from Google Fonts, self-host them if you want the extra performance.
