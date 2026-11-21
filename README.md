# The Escape Co. — website

A static, production-ready website for **The Escape Co.** — adventure travel and expeditions from Sikkim, India.
No build step, no framework, no dependencies. Open `index.html` through a local server and it runs.

---

## Run it

```bash
cd escappeco
python3 -m http.server 8099
# open http://127.0.0.1:8099
```

A server (rather than double-clicking the file) is recommended so relative paths and fonts behave exactly as they will in production.

---

## What's inside

```
index.html            Home — hero, experiences, destinations, featured journeys,
                      philosophy, why us, testimonials, Instagram, CTA
journeys.html         Full catalogue with filter by experience + destination
trekking.html         Trekking expeditions (Dzongri, Goechala)
motorcycle.html       Motorcycle expeditions
services.html         The four experience types + "Beyond the tourist trail"
destinations.html     Destination directory
destination.html      Destination detail template  (?d=sikkim|nepal|meghalaya|north-bengal)
tour.html             Journey/trek detail template  (?t=dzongri-trek …)
journal.html          The Escape Journal listing
article.html          Article template              (?a=<slug>)
about.html            About us
contact.html          Enquiry form + FAQ
404.html              Not-found page

assets/
  css/site.css        Design system, layout, motion keyframes, responsive rules
  js/data.js          ALL content: journeys, destinations, why, FAQ, testimonials
  js/journal-data.js  ALL journal articles
  js/site.js          Chrome injection, motion, renderers, WhatsApp wiring
  img/                Photography (WebP) + favicon
```

---

## Editing content

### Add or change a journey
Everything is in `assets/js/data.js` → the `journeys` array. Copy an existing object and change the fields:

```js
J({
  slug: "new-trek",              // becomes tour.html?t=new-trek
  type: "trek",                  // "trek" | "tour" | "moto"
  destination: "sikkim",         // matches a destination slug
  title: "New Trek",
  subtitle: "One line under the title",
  image: "assets/img/dzongri.webp",
  region: "West Sikkim, India",
  duration: "5 days / 4 nights",
  start: "Yuksom", end: "Yuksom",
  distance: "Approx. 45 km",
  maxElevation: "13,000 ft · 3,960 m",
  difficulty: "Moderate",
  season: "April – June · September – November",
  intro: "Two or three sentences.",
  highlights: ["One", "Two"],
  itinerary: [{ day: "01", title: "Yuksom → Tshoka", text: "What happens." }],
  route: ["Siliguri", "Yuksom", "Tshoka"],     // drawn as the route map
  elevation: [600, 5700, 9700],                // ft per day, drawn as a profile
  accommodation: "…",
  inclusions: [], exclusions: [], important: [],
  safety: "…", cancellation: "…",
  price: "On request"
})
```

The card, the detail page, the route map, the elevation chart, the WhatsApp links and the enquiry form's journey dropdown all update automatically.

### Add a journal article
`assets/js/journal-data.js` — `window.ESCAPE_JOURNAL` is an array of objects:

```js
{ slug, title, category, excerpt, date, readTime, image, body: [ {type:"p", text:"…"} ] }
```

`image` is one of the tokens in `IMG` inside `site.js` (`dzongri`, `goechala`, `nepal`, `moto`, `road`, `monastery`, `darjeeling`, `yumthang`, `gurudongmar`, `meghalaya-roots`, `hero-kanchenjunga`).

Supported block types: `p`, `h2`, `quote`, `list` (with `items`), `note`.

---

## WhatsApp — how the booking flow works

Number: **+91 85095 29181** → `wa.me/918509529181`, configured once in `data.js` (`site.wa`).

Every enquiry path opens a WhatsApp chat with a pre-written message:

| Trigger | Message |
|---|---|
| Journey page "Book this expedition" / "Enquire on WhatsApp" | "Hello The Escape Co., I'm interested in your **Dzongri Trek**. Please share the itinerary, availability and pricing." |
| Floating WhatsApp button | General enquiry |
| Enquiry form submit | Structured message with name, phone, email, destination, selected journey, dates, travellers, experience type and notes |
| Article page CTA | Reference to the article read |

The form does **not** store anything and there is no backend. On submit it opens `wa.me` with the message, then shows a confirmation block with a direct fallback link. To also collect enquiries by email or into a CRM, add a backend endpoint in `bindEnquiry()` in `site.js`.

---

## Design notes

- Palette: deep teal / near-black `#0a1214`, teal `#1d4341`, cream `#f3eee2`, warm orange `#ec6d35` — taken from the brand guide (RAW · REAL · REFINED).
- Type: **Anton** (display), **Inter** (body), **Instrument Serif** italic (accents). Loaded from Google Fonts; system fallbacks apply offline.
- Motion: hero line-mask reveal, Ken Burns hero zoom, infinite marquee, scroll-reveal (IntersectionObserver), parallax bands, animated route dashes, pulsing WhatsApp ring, hover image scale. All keyframes live at the end of `site.css` (section 23) and are disabled automatically under `prefers-reduced-motion`.
- Content is visible without JavaScript (`html.js` guard) — animations only hide elements once JS is confirmed.

---

## Before going live — checklist

1. **Replace the testimonials** in `data.js` (`testimonials`) with real, attributed reviews. The three currently there are sample layout copy.
2. **Prices** are all "On request". Add real figures to `price` per journey when departures are confirmed.
3. **Add the real domain** and update `canonical` / `og:url` tags (currently `https://theescapeco.in/...`).
4. **Google Analytics / Plausible** — no tracking is installed. Add your snippet before `</head>`.
5. **Instagram feed** — the strip currently uses six of your own photographs as placeholders; swap for a live embed (Instagram Basic Display / a widget) when the account token is available.
6. **Google Maps** — the contact page intentionally omits a map until the business address is finalised.
7. **Legal pages** — the cancellation policy text per journey is a sensible default, not legal advice. Add a Terms page and a Privacy page.
8. **Deploy** — it's static: Netlify / Vercel / Cloudflare Pages / GitHub Pages all work by dragging the folder in. Enable HTTPS (SSL) at that step; add `robots.txt` + `sitemap.xml` (included) and submit to Google Search Console.

---

## Credits

Photography sourced from Wikimedia Commons under their respective free licences (CC BY / CC BY-SA / public domain) and colour-graded for this site. Source file pages are listed for attribution in `.shots/../assets/img/CREDITS.md`.
