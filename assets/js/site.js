/* ==========================================================================
   THE ESCAPE CO. — site behaviour
   Injects chrome (header / footer / WhatsApp), animates, renders data-driven
   sections and wires every enquiry to WhatsApp.
   ========================================================================== */

(function () {
  "use strict";

  const ESC = window.ESC;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const wa = (msg) => ESC.waLink(msg);
  const icon = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 4.54 0 8.23 3.69 8.23 8.23 0 4.55-3.69 8.24-8.23 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.17 1.72 2.63 4.17 3.69.58.25 1.04.4 1.39.51.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.4"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="16" rx="1.5"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    route: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="18" r="2.4"/><path d="M8.4 6H14a3 3 0 0 1 0 6h-4a3 3 0 0 0 0 6h5.6"/></svg>',
  };

  /* ------------------------------------------------------------------ chrome */
  const NAV = [
    ["journeys.html", "Journeys"],
    ["destinations.html", "Destinations"],
    ["services.html", "Experiences"],
    ["journal.html", "Journal"],
    ["about.html", "About"],
  ];

  function here() {
    const p = location.pathname.split("/").pop() || "index.html";
    return p === "" ? "index.html" : p;
  }

  const LOGO = `
  <svg class="brand__mark" viewBox="0 0 100 100" aria-hidden="true">
    <defs><linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f3eee2"/><stop offset="1" stop-color="#93a79d"/></linearGradient></defs>
    <circle cx="50" cy="50" r="47" fill="none" stroke="url(#lg1)" stroke-width="1.4"/>
    <circle cx="50" cy="50" r="41" fill="none" stroke="url(#lg1)" stroke-width=".5" stroke-dasharray="2 4" opacity=".65"/>
    <path d="M28 62 41 38l7 12 5-8 12 20Z" fill="url(#lg1)" opacity=".92"/>
    <path d="M32 70h36" stroke="#f3eee2" stroke-width="1.2" opacity=".5"/>
    <path d="M50 16 55 42 50 36 45 42Z" fill="#ec6d35"/>
    <path d="M16 50 42 45 36 50 42 55Z" fill="#ec6d35" opacity=".85"/>
    <path d="M84 50 58 45 64 50 58 55Z" fill="#ec6d35" opacity=".85"/>
    <path d="M50 84 55 58 50 64 45 58Z" fill="#ec6d35" opacity=".55"/>
  </svg>`;

  function mountHeader() {
    const mount = $("#site-header");
    if (!mount) return;
    const cur = here();
    const links = NAV.map(([href, label]) =>
      `<a href="${href}"${href === cur ? ' aria-current="page"' : ""}>${label}</a>`).join("");
    mount.outerHTML = `
    <header class="hdr" id="hdr">
      <div class="hdr__in">
        <a class="brand" href="index.html">
          ${LOGO}
          <span class="brand__type"><b>THE ESCAPE CO.</b><i>SIKKIM · INDIA</i></span>
        </a>
        <nav class="nav" aria-label="Primary">${links}</nav>
        <div class="hdr__cta">
          <a class="btn btn--orange btn--sm" href="contact.html">Plan your trip ${icon.arrow}</a>
          <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="mmenu"><span></span><span></span></button>
        </div>
      </div>
    </header>
    <div class="mmenu" id="mmenu" aria-hidden="true">
      <div>
        ${[["journeys.html", "Journeys", "01"], ["destinations.html", "Destinations", "02"], ["trekking.html", "Trekking", "03"],
           ["motorcycle.html", "Motorcycle", "04"], ["services.html", "Experiences", "05"], ["journal.html", "Journal", "06"],
           ["about.html", "About", "07"], ["contact.html", "Contact", "08"]]
          .map(([h, l, n]) => `<a class="mmenu__link" href="${h}"><span>${n}</span>${l}</a>`).join("")}
      </div>
      <div class="mmenu__foot">
        <p>${esc(ESC.site.phoneDisplay)} · ${esc(ESC.site.email)}</p>
        <p class="small muted">${esc(ESC.site.regions)}</p>
      </div>
    </div>`;

    const hdr = $("#hdr"), burger = $("#burger"), menu = $("#mmenu");
    const onScroll = () => hdr.classList.toggle("is-stuck", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const close = () => {
      burger.classList.remove("is-open"); menu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false"); menu.setAttribute("aria-hidden", "true");
      document.body.classList.remove("is-locked");
    };
    burger.addEventListener("click", () => {
      const open = !menu.classList.contains("is-open");
      burger.classList.toggle("is-open", open);
      menu.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-hidden", String(!open));
      document.body.classList.toggle("is-locked", open);
    });
    $$(".mmenu__link", menu).forEach((a) => a.addEventListener("click", close));
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  function mountFooter() {
    const mount = $("#site-footer");
    if (!mount) return;
    mount.outerHTML = `
    <footer class="ftr" id="site-footer">
      <div class="wrap">
        <div class="ftr__top">
          <div class="ftr__brand">
            <a class="brand" href="index.html">${LOGO}
              <span class="brand__type"><b>THE ESCAPE CO.</b><i>GO WHERE YOU FEEL ALIVE.</i></span></a>
            <p>Adventure travel and expeditions from Sikkim. Motorcycle journeys, Himalayan treks and
               road trips across the Eastern Himalaya, Northeast India and Nepal.</p>
          </div>
          <div>
            <h2>Explore</h2>
            <ul>
              <li><a href="journeys.html">All journeys</a></li>
              <li><a href="trekking.html">Trekking expeditions</a></li>
              <li><a href="motorcycle.html">Motorcycle expeditions</a></li>
              <li><a href="destinations.html">Destinations</a></li>
              <li><a href="journal.html">The Escape Journal</a></li>
            </ul>
          </div>
          <div>
            <h2>Company</h2>
            <ul>
              <li><a href="about.html">About us</a></li>
              <li><a href="services.html">Experiences</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="contact.html#faq">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h2>Connect</h2>
            <ul>
              <li><a href="${ESC.site.phoneHref}">${esc(ESC.site.phoneDisplay)}</a></li>
              <li><a href="mailto:${esc(ESC.site.email)}">${esc(ESC.site.email)}</a></li>
              <li><a href="${ESC.site.instagramUrl}" target="_blank" rel="noopener">@${esc(ESC.site.instagram)}</a></li>
              <li><a href="${wa("Hello The Escape Co., I'd like to plan a journey. Could you share some options?")}" target="_blank" rel="noopener">WhatsApp us</a></li>
            </ul>
          </div>
        </div>
        <div class="ftr__bot">
          <p>© ${new Date().getFullYear()} The Escape Co. · Sikkim, India · All rights reserved.</p>
          <p><a href="#top">Back to top ↑</a></p>
        </div>
      </div>
    </footer>
    <a class="wa-fab" href="${wa("Hello The Escape Co., I'd like to know more about your journeys.")}"
       target="_blank" rel="noopener" aria-label="Chat with The Escape Co. on WhatsApp">
      ${icon.wa}<span>WhatsApp</span>
    </a>`;
  }

  /* ------------------------------------------------------------------ motion */
  function motion() {
    const io = "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
          });
        }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 })
      : null;

    const watch = () => {
      $$("[data-reveal], [data-stagger]").forEach((el) => {
        if (el.classList.contains("is-in")) return;
        if (io) io.observe(el); else el.classList.add("is-in");
      });
    };
    watch();
    document.addEventListener("esc:rendered", watch);

    /* parallax */
    const px = $$("[data-parallax]");
    if (px.length && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      let raf = 0;
      const run = () => {
        raf = 0;
        const vh = innerHeight;
        px.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) return;
          const speed = parseFloat(el.dataset.parallax) || 0.12;
          const off = (r.top + r.height / 2 - vh / 2) * -speed;
          el.style.transform = `translate3d(0,${off.toFixed(2)}px,0)`;
        });
      };
      const onS = () => { if (!raf) raf = requestAnimationFrame(run); };
      window.addEventListener("scroll", onS, { passive: true });
      window.addEventListener("resize", onS);
      run();
    }

    /* counters */
    $$("[data-count]").forEach((el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      let started = false;
      const ob = new IntersectionObserver((es) => {
        es.forEach((e) => {
          if (!e.isIntersecting || started) return;
          started = true;
          const t0 = performance.now(), dur = 1400;
          const tick = (t) => {
            const p = Math.min(1, (t - t0) / dur);
            const v = Math.round(target * (1 - Math.pow(1 - p, 3)));
            el.textContent = v + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          ob.disconnect();
        });
      }, { threshold: 0.4 });
      ob.observe(el);
    });
  }

  /* -------------------------------------------------------------- renderers */
  function experiencesHTML(list) {
    return list.map((e, i) => `
      <article class="exp" data-reveal>
        <a class="exp__media" href="${e.link}" aria-label="${esc(e.title)}">
          <img src="${e.image}" alt="${esc(e.title)}" loading="lazy" width="800" height="1000">
          <span class="exp__no">${e.no} / 05</span>
        </a>
        <div class="exp__body">
          <h3 class="exp__title"><a href="${e.link}">${esc(e.title)}</a></h3>
          <p class="exp__text">${esc(e.text)}</p>
          <a class="exp__more" href="${e.link}">Explore ${icon.arrow}</a>
        </div>
      </article>`).join("");
  }

  function destinationsHTML(list) {
    return list.map((d) => `
      <a class="dest" href="destination.html?d=${d.slug}" data-reveal="scale">
        <img src="${d.image}" alt="${esc(d.name)}" loading="lazy" width="1400" height="1000">
        <div class="dest__body">
          <div>
            <h3 class="dest__name">${esc(d.name)}</h3>
            <p class="dest__meta">${esc(d.kicker)} · ${ESC.journeys.filter((j) => j.destination === d.slug).length} journeys</p>
          </div>
          <span class="dest__go" aria-hidden="true">${icon.arrow}</span>
        </div>
      </a>`).join("");
  }

  function journeyCard(j) {
    const typeLabel = j.type === "trek" ? "Trek" : j.type === "moto" ? "Motorcycle" : "Road journey";
    return `
      <article class="jcard" data-reveal>
        <a class="jcard__media" href="tour.html?t=${j.slug}" aria-label="${esc(j.title)}">
          <img src="${j.image}" alt="${esc(j.title)} — ${esc(j.region)}" loading="lazy" width="800" height="550">
          <span class="jcard__type">${typeLabel}${j.badge ? " · " + esc(j.badge) : ""}</span>
        </a>
        <div class="jcard__body">
          <h3 class="jcard__title"><a href="tour.html?t=${j.slug}">${esc(j.title)}</a></h3>
          <p class="jcard__meta">
            <span>${icon.pin}${esc(j.region)}</span>
            <span>${icon.clock}${esc(j.duration)}</span>
          </p>
          <p class="small muted">${esc(j.subtitle)}</p>
          <div class="jcard__foot">
            <span class="jcard__price"><b>${esc(j.price)}</b></span>
            <a class="jcard__go" href="tour.html?t=${j.slug}">View ${icon.arrow}</a>
          </div>
        </div>
      </article>`;
  }

  function renderJourneyGrid(mount, filter, opts) {
    if (!mount) return;
    const o = opts || {};
    let list = ESC.journeys.slice();
    if (o.type) list = list.filter((j) => j.type === o.type);
    if (o.destination) list = list.filter((j) => j.destination === o.destination);
    if (o.featured) list = list.filter((j) => j.featured);
    if (o.limit) list = list.slice(0, o.limit);
    mount.innerHTML = list.map(journeyCard).join("");
    document.dispatchEvent(new Event("esc:rendered"));
  }

  function whyHTML() {
    return ESC.why.map((w) => `
      <div class="why__item" data-reveal>
        <span class="why__num">${w.n}</span>
        <h3 class="why__title">${esc(w.t)}</h3>
        <p class="why__text">${esc(w.d)}</p>
      </div>`).join("");
  }

  function testimonialsHTML() {
    return ESC.testimonials.map((t) => `
      <figure class="post" data-reveal>
        <span class="quote-mark" aria-hidden="true"></span>
        <blockquote class="lede">${esc(t.q)}</blockquote>
        <figcaption class="small muted" style="margin-top:14px">${esc(t.n)} — ${esc(t.c)}</figcaption>
      </figure>`).join("");
  }

  function faqHTML() {
    return `<div class="acc" id="faqList">` + ESC.faq.map((f, i) => `
      <div class="acc__item">
        <button class="acc__q" aria-expanded="false" aria-controls="fa-${i}">${esc(f.q)}<i></i></button>
        <div class="acc__a" id="fa-${i}"><div>${esc(f.a)}</div></div>
      </div>`).join("") + `</div>`;
  }

  function bindAccordions(root) {
    $$(".acc__item", root || document).forEach((item) => {
      const btn = $(".acc__q", item), panel = $(".acc__a", item);
      if (!btn || !panel || btn.dataset.bound) return;
      btn.dataset.bound = "1";
      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") === "true";
        $$(".acc__item", root || document).forEach((o) => {
          $(".acc__q", o).setAttribute("aria-expanded", "false");
          $(".acc__a", o).style.height = "0px";
        });
        if (!open) {
          btn.setAttribute("aria-expanded", "true");
          panel.style.height = panel.scrollHeight + "px";
        }
      });
    });
  }

  /* ------------------------------------------------------------- SVG charts */
  function routeSVG(name) {
    const pts = name.slice();
    const n = pts.length, W = 1000, H = 300, pad = 118;
    const step = (W - pad * 2) / Math.max(1, n - 1);
    const ys = [0.42, 0.24, 0.34, 0.18, 0.30, 0.12, 0.26];
    const P = pts.map((p, i) => ({ x: pad + i * step, y: H * (ys[i % ys.length] || 0.4), label: p }));
    let d = `M ${P[0].x} ${P[0].y}`;
    for (let i = 1; i < P.length; i++) {
      const a = P[i - 1], b = P[i], mx = (a.x + b.x) / 2;
      d += ` C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
    }
    const dots = P.map((p, i) => `
      <g>
        <circle class="route-dot" cx="${p.x}" cy="${p.y}" r="6" fill="#ec6d35" style="animation-delay:${i * .22}s"/>
        <circle cx="${p.x}" cy="${p.y}" r="13" fill="none" stroke="#ec6d35" stroke-width="1" opacity=".35"/>
        <text x="${p.x}" y="${p.y + (i % 2 ? -26 : 40)}" fill="#cfc9bb" font-size="19"
              font-family="Inter,sans-serif" text-anchor="middle" letter-spacing=".04em">${esc(p.label)}</text>
      </g>`).join("");
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Route: ${esc(pts.join(' to '))}">
      <defs><linearGradient id="rg" x1="0" x2="1"><stop offset="0" stop-color="#ec6d35" stop-opacity=".25"/><stop offset="1" stop-color="#ec6d35"/></linearGradient></defs>
      <path d="${d}" fill="none" stroke="url(#rg)" stroke-width="1.6" class="route-dash"/>
      ${dots}
    </svg>`;
  }

  function elevSVG(arr) {
    if (!arr || !arr.length) return "";
    const W = 1000, H = 250, pad = 96;
    const max = Math.max.apply(null, arr), min = Math.min.apply(null, arr);
    const span = Math.max(1, max - min);
    const step = (W - pad * 2) / Math.max(1, arr.length - 1);
    const P = arr.map((v, i) => ({
      x: pad + i * step,
      y: H - pad - ((v - min) / span) * (H - pad * 2),
      v: v,
    }));
    let line = `M ${P[0].x} ${P[0].y}`;
    for (let i = 1; i < P.length; i++) {
      const a = P[i - 1], b = P[i], mx = (a.x + b.x) / 2;
      line += ` C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`;
    }
    const area = line + ` L ${P[P.length - 1].x} ${H - pad} L ${P[0].x} ${H - pad} Z`;
    const dots = P.map((p, i) => `<circle cx="${p.x}" cy="${p.y}" r="4.5" fill="#f3eee2"/>
      <text x="${p.x}" y="${H - 12}" fill="#93a79d" font-size="16" font-family="Inter,sans-serif" text-anchor="middle">D${i + 1}</text>`).join("");
    const ticks = [min, Math.round((min + max) / 2), max].map((v, i) => {
      const y = H - pad - ((v - min) / span) * (H - pad * 2);
      return `<line x1="${pad - 8}" x2="${W - pad}" y1="${y}" y2="${y}" stroke="#f3eee2" stroke-opacity=".08"/>
              <text x="${pad + 4}" y="${y - 8}" fill="#93a79d" font-size="16" font-family="Inter,sans-serif" text-anchor="start">${v.toLocaleString()} ft</text>`;
    }).join("");
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Elevation profile">
      <defs><linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ec6d35" stop-opacity=".42"/><stop offset="1" stop-color="#ec6d35" stop-opacity="0"/></linearGradient></defs>
      ${ticks}
      <path class="elev__area" d="${area}"/>
      <path class="elev__line" d="${line}"/>
      ${dots}
    </svg>`;
  }

  /* ------------------------------------------------------------ detail page */
  function renderJourneyDetail() {
    const root = $('[data-page="journey"]');
    if (!root) return;
    const slug = new URLSearchParams(location.search).get("t");
    const j = ESC.journey(slug) || ESC.journeys[0];

    document.title = `${j.title} — ${j.region} | The Escape Co.`;
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", j.intro.slice(0, 155));

    const gallery = (j.gallery && j.gallery.length ? j.gallery : [j.image]);
    const typeLabel = j.type === "trek" ? "Trekking expedition" : j.type === "moto" ? "Motorcycle expedition" : "Road journey";

    root.innerHTML = `
      <section class="cover">
        <img src="${j.image}" alt="${esc(j.title)} — ${esc(j.region)}" width="1920" height="1080">
        <div class="cover__in">
          <p class="phero__crumb"><a href="index.html">Home</a> / <a href="journeys.html">Journeys</a> / <span>${esc(j.title)}</span></p>
          <p class="eyebrow">${typeLabel} · ${esc(j.region)}</p>
          <h1 class="cover__title">${esc(j.title)}</h1>
          <p class="cover__sub">
            <span>${icon.pin}${esc(j.region)}</span>
            <span>${icon.clock}${esc(j.duration)}</span>
            <span>${icon.route}${esc(j.distance)}</span>
            <span>${icon.up}${esc(j.maxElevation)}</span>
          </p>
        </div>
      </section>

      <div class="wrap section">
        <div class="detail">
          <div class="detail__main">
            <section>
              <p class="eyebrow">Overview</p>
              <h2 class="h-md" style="margin:14px 0 18px;max-width:20ch">${esc(j.subtitle)}</h2>
              <p class="lede">${esc(j.intro)}</p>
            </section>

            <dl class="meta-strip" style="margin-top:44px">
              <div class="meta-strip__item"><dt>Duration</dt><dd>${esc(j.duration)}</dd></div>
              <div class="meta-strip__item"><dt>Start / End</dt><dd>${esc(j.start)} → ${esc(j.end)}</dd></div>
              <div class="meta-strip__item"><dt>Distance</dt><dd>${esc(j.distance)}</dd></div>
              <div class="meta-strip__item"><dt>Max elevation</dt><dd>${esc(j.maxElevation)}</dd></div>
              <div class="meta-strip__item"><dt>Difficulty</dt><dd>${esc(j.difficulty)}</dd></div>
              <div class="meta-strip__item"><dt>Best season</dt><dd style="font-size:1rem">${esc(j.season)}</dd></div>
            </dl>

            <section style="margin-top:52px">
              <p class="eyebrow">Highlights</p>
              <ul class="checklist" style="margin-top:18px">
                ${j.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}
              </ul>
            </section>

            <section style="margin-top:64px">
              <div class="sec-head" style="margin-bottom:26px">
                <div><p class="eyebrow">Day by day</p><h2 class="h-lg" style="margin-top:12px">The itinerary</h2></div>
              </div>
              <div class="itin">
                ${j.itinerary.map((d) => `
                  <div class="itin__day">
                    <div class="itin__n">${esc(d.day)}<em>DAY</em></div>
                    <div><h3 class="itin__title">${esc(d.title)}</h3><p class="itin__text">${esc(d.text)}</p></div>
                  </div>`).join("")}
              </div>
            </section>

            <section style="margin-top:64px">
              <p class="eyebrow">Route</p>
              <div class="routebox" style="margin-top:16px">${routeSVG(j.route)}</div>
            </section>

            <section style="margin-top:28px">
              <p class="eyebrow">Elevation profile</p>
              <div class="elev" style="margin-top:16px">${elevSVG(j.elevation)}</div>
            </section>

            <section style="margin-top:64px">
              <p class="eyebrow">Photographs</p>
              <div class="gal" style="margin-top:18px">
                ${gallery.map((g) => `<a href="${g}" target="_blank" rel="noopener"><img src="${g}" alt="${esc(j.title)} photograph" loading="lazy" width="700" height="525"></a>`).join("")}
              </div>
            </section>

            <section style="margin-top:64px" class="cols-2">
              <div>
                <p class="eyebrow">What's included</p>
                <ul class="checklist" style="margin-top:16px">${j.inclusions.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
              </div>
              <div>
                <p class="eyebrow">Not included</p>
                <ul class="checklist checklist--x" style="margin-top:16px">${j.exclusions.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
              </div>
            </section>

            <section style="margin-top:64px">
              <p class="eyebrow">Accommodation</p>
              <p class="lede" style="margin-top:14px">${esc(j.accommodation)}</p>
            </section>

            <section style="margin-top:56px" class="cols-3">
              <div><p class="eyebrow eyebrow--orange" style="margin-bottom:12px">Important</p>
                <ul class="prose" style="font-size:.9rem;color:var(--sage)">${j.important.map((x) => `<li style="padding-left:18px;position:relative;margin-top:8px">— ${esc(x)}</li>`).join("")}</ul></div>
              <div><p class="eyebrow eyebrow--orange" style="margin-bottom:12px">Safety</p>
                <p style="font-size:.9rem;color:var(--sage)">${esc(j.safety)}</p></div>
              <div><p class="eyebrow eyebrow--orange" style="margin-bottom:12px">Cancellation</p>
                <p style="font-size:.9rem;color:var(--sage)">${esc(j.cancellation)}</p></div>
            </section>

            <section style="margin-top:64px" class="cta-inline">
              <div class="routebox" style="padding:clamp(24px,4vw,44px);display:flex;gap:24px;flex-wrap:wrap;align-items:center;justify-content:space-between">
                <div>
                  <h3 class="h-md" style="max-width:18ch">Ready when you are.</h3>
                  <p class="small muted" style="margin-top:10px">Send us your dates — we reply with availability, a day-wise plan and a quote.</p>
                </div>
                <div style="display:flex;gap:10px;flex-wrap:wrap">
                  <a class="btn btn--wa" href="${ESC.enquiry(j)}" target="_blank" rel="noopener">${icon.wa} Enquire on WhatsApp</a>
                  <a class="btn btn--ghost" href="contact.html?t=${j.slug}">Use the form</a>
                </div>
              </div>
            </section>
          </div>

          <aside class="detail__side">
            <div class="bookcard">
              <p class="eyebrow eyebrow--orange">From</p>
              <p class="bookcard__price" style="margin-top:8px">${esc(j.price)}<small>per traveller · twin sharing</small></p>
              <div class="bookcard__list">
                <div><span>Duration</span><b>${esc(j.duration)}</b></div>
                <div><span>Group size</span><b>${esc(j.groupSize)}</b></div>
                <div><span>Difficulty</span><b>${esc(j.difficulty)}</b></div>
                <div><span>Start / End</span><b>${esc(j.start)}</b></div>
                <div><span>Season</span><b>${esc(j.season)}</b></div>
              </div>
              <a class="btn btn--wa btn--block" href="${ESC.enquiry(j)}" target="_blank" rel="noopener">${icon.wa} Book this expedition</a>
              <a class="btn btn--ghost btn--block" href="contact.html?t=${j.slug}">Request a quote</a>
              <p class="bookcard__fine">No online payment. We confirm availability and send a written itinerary before any deposit.</p>
            </div>
            <div class="bookcard">
              <p class="eyebrow eyebrow--orange">Talk to a human</p>
              <p style="margin-top:12px;font-size:.92rem;color:var(--cream-dim)">Planning is a conversation, not a checkout. Call or message and you'll speak to someone who has driven or walked this route.</p>
              <a class="link-arrow" style="margin-top:16px" href="${ESC.site.phoneHref}">${esc(ESC.site.phoneDisplay)} ${icon.arrow}</a>
            </div>
          </aside>
        </div>
      </div>

      <section class="section section--tight" style="border-top:1px solid var(--line)">
        <div class="wrap">
          <div class="sec-head">
            <div><p class="eyebrow">More like this</p><h2 class="h-lg" style="margin-top:12px">Other journeys</h2></div>
            <a class="link-arrow" href="journeys.html">All journeys ${icon.arrow}</a>
          </div>
          <div class="jgrid" id="related"></div>
        </div>
      </section>`;

    const related = ESC.journeys.filter((x) => x.slug !== j.slug && (x.type === j.type || x.destination === j.destination)).slice(0, 3);
    $("#related").innerHTML = related.map(journeyCard).join("");
    document.dispatchEvent(new Event("esc:rendered"));
  }

  /* -------------------------------------------------------- destination page */
  function renderDestinationDetail() {
    const root = $('[data-page="destination"]');
    if (!root) return;
    const slug = new URLSearchParams(location.search).get("d");
    const d = ESC.destination(slug) || ESC.destinations[0];
    const list = ESC.journeys.filter((j) => j.destination === d.slug);

    document.title = `${d.name} — ${d.tagline} | The Escape Co.`;
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", d.intro.slice(0, 155));

    root.innerHTML = `
      <section class="phero" style="min-height:62svh;display:grid;align-items:end">
        <div class="phero__media"><img src="${d.image}" alt="${esc(d.name)}" width="1920" height="1080"></div>
        <div class="phero__in" style="padding-bottom:clamp(30px,5vw,60px)">
          <p class="phero__crumb"><a href="index.html">Home</a> / <a href="destinations.html">Destinations</a> / <span>${esc(d.name)}</span></p>
          <p class="eyebrow">${esc(d.kicker)}</p>
          <h1 class="phero__title h-xl">${esc(d.name)}</h1>
          <p class="phero__sub lede">${esc(d.tagline)}</p>
        </div>
      </section>

      <div class="wrap section">
        <div class="split" style="align-items:start">
          <div>
            <p class="eyebrow">The region</p>
            <p class="lede" style="margin-top:18px">${esc(d.intro)}</p>
            <dl class="meta-strip" style="margin-top:38px">
              ${d.stats.map((s) => `<div class="meta-strip__item"><dt>${esc(s.k)}</dt><dd style="font-size:1.05rem">${esc(s.v)}</dd></div>`).join("")}
            </dl>
          </div>
          <div>
            <p class="eyebrow">Experiences</p>
            <div class="pill-list" style="margin-top:16px">
              ${d.experience.map((x) => `<span class="pill">${esc(x)}</span>`).join("")}
            </div>
          </div>
        </div>

        <section style="margin-top:64px">
          <div class="sec-head"><div><p class="eyebrow">Where we go</p><h2 class="h-lg" style="margin-top:12px">Places & regions</h2></div></div>
          ${d.regions.map((r) => `
            <div class="region" data-reveal>
              <div class="region__head"><h3 class="region__title">${esc(r.name)}</h3>
                <span class="small muted">${r.places.length} places</span></div>
              <div class="pill-list">${r.places.map((p) => `<span class="pill">${esc(p)}</span>`).join("")}</div>
            </div>`).join("")}
        </section>
      </div>

      <section class="section section--tight" style="border-top:1px solid var(--line);background:var(--ink-2)">
        <div class="wrap">
          <div class="sec-head">
            <div><p class="eyebrow">Journeys</p><h2 class="h-lg" style="margin-top:12px">${esc(d.name)} expeditions</h2></div>
            <a class="link-arrow" href="journeys.html">All journeys ${icon.arrow}</a>
          </div>
          <div class="jgrid">${list.map(journeyCard).join("")}</div>
        </div>
      </section>`;
    document.dispatchEvent(new Event("esc:rendered"));
  }

  /* ----------------------------------------------------------------- journal */
  const IMG = {
    "hero-kanchenjunga": "assets/img/hero-kanchenjunga.webp",
    "yumthang": "assets/img/yumthang.webp",
    "gurudongmar": "assets/img/gurudongmar.webp",
    "goechala": "assets/img/goechala.webp",
    "dzongri": "assets/img/dzongri.webp",
    "meghalaya-roots": "assets/img/meghalaya-roots.webp",
    "darjeeling": "assets/img/darjeeling.webp",
    "road": "assets/img/road.webp",
    "moto": "assets/img/moto.webp",
    "monastery": "assets/img/monastery.webp",
    "nepal": "assets/img/nepal.webp",
  };
  const artDate = (s) => new Date(s).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  const articles = (window.ESCAPE_JOURNAL || []).slice().sort((a, b) => (a.date < b.date ? 1 : -1));

  function renderJournal() {
    const mount = $("#journalGrid");
    if (!mount) return;
    const cats = ["All"].concat(Array.from(new Set(articles.map((a) => a.category))));
    const bar = $("#journalFilters");
    if (bar) {
      bar.innerHTML = cats.map((c, i) =>
        `<button class="filter" data-cat="${esc(c)}" aria-pressed="${i === 0}">${esc(c)}</button>`).join("");
    }
    const draw = (cat) => {
      const list = cat === "All" ? articles : articles.filter((a) => a.category === cat);
      mount.innerHTML = list.map((a, i) => `
        <article class="post${i === 0 && cat === "All" ? " post--feature" : ""}" data-reveal>
          <a class="post__media" href="article.html?a=${a.slug}" aria-label="${esc(a.title)}">
            <img src="${IMG[a.image] || IMG.road}" alt="${esc(a.title)}" loading="lazy" width="1200" height="750">
          </a>
          <div class="post__body">
            <span class="post__cat">${esc(a.category)}</span>
            <h3 class="post__title"><a href="article.html?a=${a.slug}">${esc(a.title)}</a></h3>
            <p class="post__excerpt">${esc(a.excerpt)}</p>
            <p class="post__meta"><span>${artDate(a.date)}</span><span>${a.readTime} min read</span></p>
          </div>
        </article>`).join("");
      document.dispatchEvent(new Event("esc:rendered"));
    };
    draw("All");
    if (bar) {
      bar.addEventListener("click", (e) => {
        const b = e.target.closest("[data-cat]");
        if (!b) return;
        $$("[data-cat]", bar).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        draw(b.dataset.cat);
      });
    }
  }

  function renderArticle() {
    const root = $("#article");
    if (!root) return;
    const slug = new URLSearchParams(location.search).get("a");
    const a = articles.find((x) => x.slug === slug) || articles[0];
    document.title = `${a.title} | The Escape Journal`;
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", a.excerpt);

    const block = (b) => {
      if (b.type === "h2") return `<h2>${esc(b.text)}</h2>`;
      if (b.type === "quote") return `<blockquote>${esc(b.text)}</blockquote>`;
      if (b.type === "note") return `<div class="note"><b>Field note</b>${esc(b.text)}</div>`;
      if (b.type === "list") return `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
      return `<p>${esc(b.text)}</p>`;
    };

    root.innerHTML = `
      <section class="phero" style="padding-bottom:0;background:var(--ink)">
        <div class="phero__in">
          <p class="phero__crumb"><a href="index.html">Home</a> / <a href="journal.html">Journal</a> / <span>${esc(a.category)}</span></p>
          <p class="eyebrow">${esc(a.category)} · ${a.readTime} min read</p>
          <h1 class="article-head h-xl" style="margin-top:16px">${esc(a.title)}</h1>
          <p class="lede" style="margin-top:22px">${esc(a.excerpt)}</p>
          <p class="small muted" style="margin-top:18px">${artDate(a.date)} · The Escape Co.</p>
        </div>
      </section>
      <div class="wrap" style="margin-top:clamp(28px,4vw,52px)">
        <img src="${IMG[a.image] || IMG.road}" alt="${esc(a.title)}" style="width:100%;aspect-ratio:16/8;object-fit:cover" width="1600" height="800">
      </div>
      <div class="wrap section">
        <div class="article-body prose">
          ${a.body.map(block).join("")}
        </div>
        <div class="routebox" style="margin:56px auto 0;max-width:720px;display:flex;gap:20px;flex-wrap:wrap;justify-content:space-between;align-items:center">
          <div><h3 class="h-md">Want to see it yourself?</h3>
            <p class="small muted" style="margin-top:8px">Tell us your dates and we'll build the route around them.</p></div>
          <a class="btn btn--wa" href="${wa("Hello The Escape Co., I read your journal piece \"" + a.title + "\" and I'd like to plan a journey.")}" target="_blank" rel="noopener">${icon.wa} Plan with us</a>
        </div>
      </div>
      <section class="section section--tight" style="border-top:1px solid var(--line)">
        <div class="wrap">
          <div class="sec-head"><div><p class="eyebrow">Keep reading</p><h2 class="h-lg" style="margin-top:12px">More from the journal</h2></div>
            <a class="link-arrow" href="journal.html">All articles ${icon.arrow}</a></div>
          <div class="journal-grid">
            ${articles.filter((x) => x.slug !== a.slug).slice(0, 3).map((x) => `
              <article class="post">
                <a class="post__media" href="article.html?a=${x.slug}"><img src="${IMG[x.image] || IMG.road}" alt="${esc(x.title)}" loading="lazy" width="800" height="500"></a>
                <div class="post__body">
                  <span class="post__cat">${esc(x.category)}</span>
                  <h3 class="post__title"><a href="article.html?a=${x.slug}">${esc(x.title)}</a></h3>
                  <p class="post__meta"><span>${artDate(x.date)}</span><span>${x.readTime} min</span></p>
                </div>
              </article>`).join("")}
          </div>
        </div>
      </section>`;
  }

  /* ------------------------------------------------------------ enquiry form */
  function bindEnquiry() {
    const form = $("#enquiryForm");
    if (!form) return;

    const sel = form.querySelector('[name="journey"]');
    if (sel) {
      const groups = { trek: "Trekking expeditions", tour: "Road journeys", moto: "Motorcycle expeditions" };
      let html = `<option value="">— Select a journey —</option>`;
      Object.keys(groups).forEach((t) => {
        html += `<optgroup label="${groups[t]}">` +
          ESC.journeys.filter((j) => j.type === t).map((j) => `<option value="${j.slug}">${esc(j.title)} — ${esc(j.duration)}</option>`).join("") +
          `</optgroup>`;
      });
      sel.innerHTML = html;
      const pre = new URLSearchParams(location.search).get("t");
      if (pre) sel.value = pre;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(form);
      const val = (k) => String(f.get(k) || "").trim();
      const j = ESC.journey(val("journey"));
      const lines = [
        "Hello The Escape Co., I'd like to enquire about a journey.",
        "",
        `Name: ${val("name")}`,
        `Phone: ${val("phone")}`,
        val("email") ? `Email: ${val("email")}` : "",
        `Destination: ${val("destination")}`,
        `Journey: ${j ? j.title + " (" + j.duration + ")" : val("journey") || "Not sure yet"}`,
        `Preferred dates: ${val("dates") || "Flexible"}`,
        `Travellers: ${val("travellers")}`,
        `Experience type: ${val("experience")}`,
        val("notes") ? `Additional requirements: ${val("notes")}` : "",
        "",
        "Please share the itinerary, availability and pricing.",
      ].filter(Boolean);
      window.open(wa(lines.join("\n")), "_blank", "noopener");
      const ok = $("#formOk");
      if (ok) { ok.classList.add("is-on"); ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
      form.querySelectorAll("input, select, textarea").forEach((el) => { if (el.type !== "submit") el.value = ""; });
    });
  }

  /* --------------------------------------------------------------- bootstrap */
  function boot() {
    mountHeader();
    mountFooter();
    motion();

    /* data mounts */
    const m = (id) => document.getElementById(id);
    if (m("expGrid")) m("expGrid").innerHTML = experiencesHTML(ESC.experiences);
    if (m("destGrid")) m("destGrid").innerHTML = destinationsHTML(ESC.destinations);
    if (m("whyGrid")) m("whyGrid").innerHTML = whyHTML();
    if (m("testimonialsGrid")) m("testimonialsGrid").innerHTML = testimonialsHTML();
    if (m("faqBox")) { m("faqBox").innerHTML = faqHTML(); bindAccordions(m("faqBox")); }

    if (m("featuredGrid")) renderJourneyGrid(m("featuredGrid"), null, { featured: true, limit: 6 });
    if (m("trekGrid")) renderJourneyGrid(m("trekGrid"), null, { type: "trek" });
    if (m("motoGrid")) renderJourneyGrid(m("motoGrid"), null, { type: "moto" });

    /* filterable catalogue */
    const cat = m("catalogueGrid");
    if (cat) {
      const tabs = m("catalogueFilters");
      const state = { type: "all", destination: "all" };
      const draw = () => {
        let list = ESC.journeys.slice();
        if (state.type !== "all") list = list.filter((j) => j.type === state.type);
        if (state.destination !== "all") list = list.filter((j) => j.destination === state.destination);
        cat.innerHTML = list.length
          ? list.map(journeyCard).join("")
          : `<p class="lede">No journeys match that combination yet — <a class="headline-link" href="contact.html">tell us what you're after</a> and we'll build it.</p>`;
        const c = m("catalogueCount");
        if (c) c.textContent = `${list.length} ${list.length === 1 ? "journey" : "journeys"}`;
        document.dispatchEvent(new Event("esc:rendered"));
      };
      if (tabs) {
        tabs.addEventListener("click", (e) => {
          const b = e.target.closest("[data-type]");
          if (!b) return;
          state.type = b.dataset.type;
          $$("[data-type]", tabs).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
          draw();
        });
      }
      const dsel = m("destinationFilter");
      if (dsel) {
        dsel.innerHTML = `<option value="all">All destinations</option>` +
          ESC.destinations.map((d) => `<option value="${d.slug}">${esc(d.name)}</option>`).join("");
        dsel.addEventListener("change", () => { state.destination = dsel.value; draw(); });
      }
      draw();
    }

    renderJourneyDetail();
    renderDestinationDetail();
    renderJournal();
    renderArticle();
    bindEnquiry();

    /* accordions present in static markup */
    bindAccordions(document);

    /* smooth in-page anchors */
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (id.length < 2) return;
        const t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        t.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", id);
      });
    });

    document.dispatchEvent(new Event("esc:rendered"));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
