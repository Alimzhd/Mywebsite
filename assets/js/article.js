/* ==========================================================================
   REDAWN — Halaman artikel
   ========================================================================== */

(() => {
  "use strict";

  const UI = window.RedawnUI;
  if (!UI) return;

  const { $, $$, DATA, byId, catLabel, escapeHtml, articleUrl, formatTime, fullTime } = UI;

  const params = new URLSearchParams(location.search);
  const requested = params.get("id");
  const article = byId.get(requested) || DATA.articles[0];
  if (!article) return;

  const slugify = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 60);

  const setText = (sel, value) => {
    const el = $(sel);
    if (el) el.textContent = value;
  };

  /* ------------------------------------------------------------------------
     Metadata dokumen
     ------------------------------------------------------------------------ */

  document.title = `${article.title} — Redawn News`;

  const canonical = new URL(articleUrl(article.id), location.href).href;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", article.deck);

  const setMeta = (selector, attr, value) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };
  setMeta('meta[property="og:title"]', "content", article.title);
  setMeta('meta[property="og:description"]', "content", article.deck);
  setMeta('meta[property="og:image"]', "content", `assets/img/covers/${article.id}.svg`);
  setMeta('meta[property="og:url"]', "content", canonical);
  setMeta('meta[name="twitter:title"]', "content", article.title);
  setMeta('meta[name="twitter:description"]', "content", article.deck);

  /* ------------------------------------------------------------------------
     Header artikel
     ------------------------------------------------------------------------ */

  const catEls = $$("[data-a-cat]");
  catEls.forEach((catEl) => {
    catEl.textContent = catLabel(article.cat);
    catEl.dataset.cat = article.cat;
    catEl.setAttribute("href", `index.html#${article.cat === "jabodetabek" ? "nasional" : article.cat}`);
  });

  $$(".chip-nav[data-cat]").forEach((chip) => {
    const active = chip.dataset.cat === article.cat;
    chip.classList.toggle("is-active", active);
    if (active) chip.setAttribute("aria-current", "page");
  });

  const activeChip = $(".chip-nav.is-active");
  const navBlob = document.getElementById("nav-blob");
  const navScroller = document.getElementById("category-scroller");

  function positionCategoryBlob(animate = true) {
    if (!activeChip || !navBlob || !navScroller) return;
    if (!animate) navBlob.style.transition = "none";
    navBlob.style.width = `${activeChip.offsetWidth}px`;
    navBlob.style.transform = `translate(${activeChip.offsetLeft}px, -50%)`;
    navBlob.classList.add("is-ready");
    if (!animate) requestAnimationFrame(() => (navBlob.style.transition = ""));
  }

  if (activeChip && navBlob) {
    requestAnimationFrame(() => {
      positionCategoryBlob(false);
      if (navScroller) {
        const left = activeChip.offsetLeft - navScroller.clientWidth / 2 + activeChip.offsetWidth / 2;
        navScroller.scrollTo({ left, behavior: "auto" });
      }
    });

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        positionCategoryBlob(false);
        if (navScroller) {
          const left = activeChip.offsetLeft - navScroller.clientWidth / 2 + activeChip.offsetWidth / 2;
          navScroller.scrollTo({ left, behavior: "auto" });
        }
      });
    }
    window.addEventListener("resize", () => {
      positionCategoryBlob(false);
      if (navScroller) {
        const left = activeChip.offsetLeft - navScroller.clientWidth / 2 + activeChip.offsetWidth / 2;
        navScroller.scrollTo({ left, behavior: "auto" });
      }
    }, { passive: true });
  }

  setText("[data-a-title]", article.title);
  setText("[data-a-deck]", article.deck);
  $$("[data-a-author]").forEach((el) => (el.textContent = article.author));
  $$("[data-a-role]").forEach((el) => (el.textContent = article.role));
  setText("[data-a-read]", `${article.read} menit baca`);
  setText("[data-a-views]", `${new Intl.NumberFormat("id-ID").format(article.views)} pembaca`);

  const initials = article.author
    .replace(/^(Prof\.|Dr\.)\s*/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  $$("[data-a-avatar]").forEach((avatarEl) => {
    avatarEl.textContent = initials;
  });

  const timeEl = $("[data-a-time]");
  if (timeEl) {
    timeEl.textContent = formatTime(article.date);
    timeEl.setAttribute("datetime", article.date);
    timeEl.setAttribute("title", fullTime(article.date));
  }

  const cover = $("[data-a-cover]");
  if (cover) {
    cover.src = `assets/img/covers/${article.id}.svg`;
    cover.alt = article.caption || article.title;
    cover.style.viewTransitionName = `hero-${article.id}`;
  }
  setText("[data-a-caption]", article.caption || article.title);

  const shareUrl = canonical;
  const shareTitle = encodeURIComponent(article.title);
  $$("[data-share-url]").forEach((el) => (el.dataset.url = shareUrl));

  $$("[data-share-network]").forEach((el) => {
    const network = el.dataset.shareNetwork;
    const targets = {
      x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      mail: `mailto:?subject=${shareTitle}&body=${encodeURIComponent(shareUrl)}`,
    };
    if (targets[network]) el.setAttribute("href", targets[network]);
  });

  const copyBtn = $("[data-copy-link]");
  copyBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      UI.toast("Tautan artikel disalin", "link");
    } catch {
      UI.toast("Tidak dapat menyalin tautan", "info");
    }
  });

  $$("[data-a-save]").forEach((saveBtn) => {
    saveBtn.dataset.save = article.id;
    saveBtn.addEventListener("click", () => UI.syncSavedUI());
  });

  /* ------------------------------------------------------------------------
     Body
     ------------------------------------------------------------------------ */

  const bodyEl = $("[data-a-body]");
  let headings = [];

  if (bodyEl) {
    const blocks = article.body || [];
    const readAlso = DATA.articles.find((a) => a.id !== article.id && a.cat === article.cat) ||
      DATA.articles.find((a) => a.id !== article.id);

    const html = blocks.map((block, index) => {
      if (block.type === "p") {
        const after = index === 1 && readAlso
          ? `<aside class="read-also">
               <span class="read-also__label">Baca juga</span>
               <a href="${articleUrl(readAlso.id)}">${escapeHtml(readAlso.title)}</a>
               <svg class="icon" aria-hidden="true"><use href="#i-arrow-right"/></svg>
             </aside>`
          : "";
        return `<p>${escapeHtml(block.text)}</p>${after}`;
      }
      if (block.type === "h2") {
        const id = slugify(block.text);
        headings.push({ id, text: block.text });
        return `<h2 id="${id}">${escapeHtml(block.text)}</h2>`;
      }
      if (block.type === "h3") return `<h3>${escapeHtml(block.text)}</h3>`;
      if (block.type === "list") {
        return `<ul>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
      }
      if (block.type === "quote") {
        return `<blockquote><p>\u201c${escapeHtml(block.text)}\u201d</p>${
          block.cite ? `<cite>${escapeHtml(block.cite)}</cite>` : ""
        }</blockquote>`;
      }
      if (block.type === "facts") {
        return `<aside class="fact-box">
          <div class="fact-box__title"><svg class="icon icon--sm" aria-hidden="true"><use href="#i-info"/></svg>${escapeHtml(
            block.title
          )}</div>
          <ul>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </aside>`;
      }
      if (block.type === "note") {
        return `<p class="article-note">${escapeHtml(block.text)}</p>`;
      }
      if (block.type === "figure") {
        return `<figure><img src="${escapeHtml(block.src)}" alt="${escapeHtml(
          block.alt || ""
        )}" loading="lazy" /><figcaption>${escapeHtml(block.caption || "")}</figcaption></figure>`;
      }
      return "";
    }).join("");
    bodyEl.innerHTML = html;

    const note = document.createElement("p");
    note.className = "article-note article-note--demo";
    note.innerHTML =
      "<strong>Catatan demo:</strong> Redawn News adalah purwarupa desain. Seluruh berita, nama, dan angka pada halaman ini bersifat fiktif.";
    bodyEl.append(note);
  }

  /* ------------------------------------------------------------------------
     Tag + TOC
     ------------------------------------------------------------------------ */

  const tagWrap = $("[data-a-tags]");
  if (tagWrap) {
    tagWrap.innerHTML = (article.tags || [])
      .map((tag) => `<a class="chip chip--sm" href="index.html#terbaru">#${escapeHtml(tag)}</a>`)
      .join("");
  }

  const tocMarkup = headings
    .map((h, i) => `<a href="#${h.id}" data-toc-link="${h.id}"${i === 0 ? ' class="is-active"' : ""}>${escapeHtml(h.text)}</a>`)
    .join("");

  $$("[data-a-toc]").forEach((toc) => {
    toc.innerHTML = tocMarkup;
    toc.hidden = headings.length === 0;
  });

  $$("[data-toc-wrap]").forEach((el) => {
    if (!headings.length) el.hidden = true;
  });

  if (headings.length) {
    const links = $$("[data-toc-link]");
    const targets = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean);
    if (targets.length) {
      let ticking = false;

      const syncToc = () => {
        ticking = false;
        const band = window.innerHeight * 0.32;
        let current = targets[0];
        targets.forEach((el) => {
          if (el.getBoundingClientRect().top <= band) current = el;
        });
        const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        if (atBottom) current = targets[targets.length - 1];
        links.forEach((link) => link.classList.toggle("is-active", link.dataset.tocLink === current.id));
      };

      const requestSync = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(syncToc);
      };

      window.addEventListener("scroll", requestSync, { passive: true });
      window.addEventListener("resize", requestSync, { passive: true });
      syncToc();

      links.forEach((link) => {
        link.addEventListener("click", () => {
          const details = link.closest("details");
          if (details) details.open = false;
        });
      });
    }
  }

  /* ------------------------------------------------------------------------
     Artikel terkait
     ------------------------------------------------------------------------ */

  const relatedEl = $("[data-a-related]");
  if (relatedEl) {
    const pool = DATA.articles.filter((a) => a.id !== article.id);
    const sameCat = pool.filter((a) => a.cat === article.cat);
    const picked = [...sameCat, ...pool.filter((a) => a.cat !== article.cat)].slice(0, 3);

    relatedEl.innerHTML = picked
      .map(
        (a) => `
        <article class="card">
          <div class="card__media">
            <img src="assets/img/covers/${a.id}.svg" alt="" loading="lazy" />
            <div class="card__flag"><span class="chip chip--cat chip--sm" data-cat="${a.cat}">${escapeHtml(
          catLabel(a.cat)
        )}</span></div>
          </div>
          <div class="card__body">
            <h3 class="card__title"><a class="stretched-link" href="${articleUrl(a.id)}">${escapeHtml(a.title)}</a></h3>
            <div class="card__meta"><span>${a.read} menit baca</span><span class="meta__dot"></span><span>${formatTime(
          a.date
        )}</span></div>
          </div>
        </article>`
      )
      .join("");
  }

  /* ------------------------------------------------------------------------
     JSON-LD
     ------------------------------------------------------------------------ */

  const jsonLd = document.getElementById("article-jsonld");
  if (jsonLd) {
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: article.title,
      description: article.deck,
      image: [`assets/img/covers/${article.id}.svg`],
      datePublished: article.date,
      dateModified: DATA.updated,
      author: { "@type": "Person", name: article.author },
      publisher: { "@type": "Organization", name: "Redawn News" },
      mainEntityOfPage: canonical,
      articleSection: catLabel(article.cat),
      keywords: (article.tags || []).join(", "),
    });
  }

  UI.syncSavedUI();
  UI.hydrateTimes();
})();
