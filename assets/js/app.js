/* ==========================================================================
   REDAWN — UI layer
   Vanilla JS, tanpa dependensi. Semua fitur punya fallback tanpa JS.
   ========================================================================== */

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  const DATA = window.REDAWN || { articles: [], categories: {}, topics: [] };
  const CATS = DATA.categories || {};
  const byId = new Map(DATA.articles.map((a) => [a.id, a]));

  const STORAGE = {
    theme: "redawn:theme",
    saved: "redawn:saved",
    recent: "redawn:recent",
    poll: "redawn:poll:ai",
  };

  const safeParse = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  };

  const safeSet = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage penuh / diblokir */
    }
  };

  const escapeHtml = (str = "") =>
    String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const articleUrl = (id) => `detail-putin-trump.html?id=${encodeURIComponent(id)}`;

  const formatTime = (iso) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    const diff = Date.now() - d.getTime();
    const mins = Math.round(diff / 60000);
    if (mins >= 0 && mins < 1) return "Baru saja";
    if (mins >= 1 && mins < 60) return `${mins} menit lalu`;
    const hours = Math.round(mins / 60);
    if (hours >= 1 && hours < 24) return `${hours} jam lalu`;
    return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(d);
  };

  const fullTime = (iso) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return `${new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d)} · ${new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit" }).format(d)} WIB`;
  };

  const catLabel = (key) => CATS[key] || key;

  /* ------------------------------------------------------------------------
     Toast
     ------------------------------------------------------------------------ */

  let toastRegion = $(".toast-region");
  if (!toastRegion) {
    toastRegion = document.createElement("div");
    toastRegion.className = "toast-region";
    toastRegion.setAttribute("role", "status");
    toastRegion.setAttribute("aria-live", "polite");
    document.body.append(toastRegion);
  }

  function toast(message, icon = "check") {
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#i-${icon}"/></svg><span>${escapeHtml(message)}</span>`;
    toastRegion.append(el);
    const remove = () => {
      el.classList.add("is-leaving");
      el.addEventListener("animationend", () => el.remove(), { once: true });
      setTimeout(() => el.remove(), 500);
    };
    setTimeout(remove, 3200);
  }

  /* ------------------------------------------------------------------------
     Tema
     ------------------------------------------------------------------------ */

  const themeButtons = $$("[data-theme-toggle]");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function currentTheme() {
    return document.documentElement.dataset.theme || (systemDark.matches ? "dark" : "light");
  }

  function syncThemeButtons() {
    const next = currentTheme() === "dark" ? "terang" : "gelap";
    themeButtons.forEach((btn) => {
      btn.setAttribute("aria-label", `Ganti tema: aktifkan mode ${next}`);
      btn.setAttribute("aria-pressed", String(currentTheme() === "dark"));
    });
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    safeSet(STORAGE.theme, theme);
    syncThemeButtons();
  }

  function toggleTheme(event) {
    const next = currentTheme() === "dark" ? "light" : "dark";
    const btn = event.currentTarget;
    const apply = () => applyTheme(next);

    if (!document.startViewTransition || reduceMotion) {
      apply();
      return;
    }

    const rect = btn?.getBoundingClientRect?.();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40;
    const y = rect ? rect.top + rect.height / 2 : 40;
    document.documentElement.style.setProperty("--tx", `${x}px`);
    document.documentElement.style.setProperty("--ty", `${y}px`);
    document.documentElement.classList.add("theme-transition");
    const transition = document.startViewTransition(apply);
    transition.finished.finally(() => document.documentElement.classList.remove("theme-transition"));
  }

  themeButtons.forEach((btn) => btn.addEventListener("click", toggleTheme));
  systemDark.addEventListener?.("change", () => {
    if (!safeParse(STORAGE.theme, null)) syncThemeButtons();
  });
  syncThemeButtons();

  /* ------------------------------------------------------------------------
     Bookmark
     ------------------------------------------------------------------------ */

  let saved = safeParse(STORAGE.saved, []);
  if (!Array.isArray(saved)) saved = [];
  saved = saved.filter((id) => byId.has(id));

  const savedBadges = () => $$("[data-saved-count]");
  const bookmarksBody = $("#bookmarks-body");
  const bookmarksDialog = $("#bookmarks-dialog");

  function syncSavedUI() {
    savedBadges().forEach((badge) => {
      badge.textContent = String(saved.length);
      badge.classList.toggle("is-visible", saved.length > 0);
    });

    $$(".icon-btn[data-bookmarks-open]").forEach((btn) => {
      btn.setAttribute("aria-label", `Buka artikel tersimpan (${saved.length})`);
    });

    $$("[data-save]").forEach((btn) => {
      const id = btn.dataset.save;
      const on = saved.includes(id);
      btn.classList.toggle("is-saved", on);
      btn.setAttribute("aria-pressed", String(on));
      btn.setAttribute("aria-label", on ? "Hapus dari tersimpan" : "Simpan artikel");
      const icon = $("use", btn);
      if (icon) icon.setAttribute("href", on ? "#i-bookmark-filled" : "#i-bookmark");
      if (btn.classList.contains("icon-btn")) {
        btn.dataset.tip = on ? "Tersimpan" : "Simpan";
      }
    });

    if (bookmarksBody) renderSaved();
  }

  function renderSaved() {
    if (!bookmarksBody) return;
    if (!saved.length) {
      bookmarksBody.innerHTML = `
        <div class="sheet-empty">
          <div class="sheet-empty__icon"><svg class="icon" aria-hidden="true"><use href="#i-bookmark"/></svg></div>
          <strong>Belum ada artikel tersimpan</strong>
          <p>Ketuk ikon bookmark pada kartu berita untuk menyimpannya dan membaca nanti.</p>
        </div>`;
      return;
    }

    bookmarksBody.innerHTML = saved
      .map((id) => byId.get(id))
      .filter(Boolean)
      .map(
        (a) => `
        <article class="saved-item">
          <img src="assets/img/covers/${escapeHtml(a.id)}.svg" alt="" loading="lazy" />
          <div class="saved-item__text">
            <span class="saved-item__cat">${escapeHtml(catLabel(a.cat))}</span>
            <a class="saved-item__title" href="${articleUrl(a.id)}">${escapeHtml(a.title)}</a>
          </div>
          <button class="icon-btn icon-btn--sm" data-remove-saved="${escapeHtml(a.id)}" aria-label="Hapus dari tersimpan">
            <svg class="icon" aria-hidden="true"><use href="#i-trash"/></svg>
          </button>
        </article>`
      )
      .join("");
  }

  function toggleSave(id) {
    if (!byId.has(id)) return;
    const idx = saved.indexOf(id);
    if (idx >= 0) {
      saved.splice(idx, 1);
      toast("Dihapus dari tersimpan", "trash");
    } else {
      saved.unshift(id);
      toast("Disimpan ke daftar baca", "bookmark-filled");
    }
    safeSet(STORAGE.saved, saved);
    syncSavedUI();
  }

  document.addEventListener("click", (event) => {
    const saveBtn = event.target.closest("[data-save]");
    if (saveBtn) {
      event.preventDefault();
      event.stopPropagation();
      toggleSave(saveBtn.dataset.save);
      return;
    }

    const removeBtn = event.target.closest("[data-remove-saved]");
    if (removeBtn) {
      toggleSave(removeBtn.dataset.removeSaved);
    }
  });

  /* ------------------------------------------------------------------------
     Share
     ------------------------------------------------------------------------ */

  async function shareArticle(url, title) {
    if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* pengguna membatalkan */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      toast("Tautan disalin ke clipboard", "link");
    } catch {
      toast("Tidak dapat menyalin tautan", "info");
    }
  }

  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-share]");
    if (!btn) return;
    event.preventDefault();
    const id = btn.dataset.share;
    const article = byId.get(id);
    const url = new URL(btn.dataset.url || (article ? articleUrl(article.id) : location.href), location.href).href;
    shareArticle(url, article?.title || document.title);
  });

  /* ------------------------------------------------------------------------
     Dialog helper
     ------------------------------------------------------------------------ */

  let dialogTrigger = null;

  function openDialog(dialog) {
    if (!dialog || dialog.open) return;
    dialogTrigger = document.activeElement;
    dialog.classList.remove("is-closing");
    dialog.showModal();
    document.documentElement.classList.add("dialog-open");
  }

  function closeDialog(dialog) {
    if (!dialog || !dialog.open) return;
    dialog.classList.add("is-closing");
    const finish = () => {
      dialog.classList.remove("is-closing");
      if (dialog.open) dialog.close();
      document.documentElement.classList.remove("dialog-open");
      dialogTrigger?.focus?.({ preventScroll: true });
    };
    if (reduceMotion) finish();
    else setTimeout(finish, 190);
  }

  $$("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeDialog(dialog);
    });
    dialog.addEventListener("close", () => {
      document.documentElement.classList.remove("dialog-open");
    });
  });

  document.addEventListener("click", (event) => {
    const closeBtn = event.target.closest("[data-close-dialog]");
    if (closeBtn) {
      closeDialog(closeBtn.closest("dialog"));
    }
  });

  /* ------------------------------------------------------------------------
     Pencarian
     ------------------------------------------------------------------------ */

  const searchDialog = $("#search-dialog");
  const searchInput = $("#search-input");
  const searchResults = $("#search-results");
  const searchDefault = $("#search-default");
  const searchEmpty = $("#search-empty");
  const searchCount = $("#search-count");

  let searchCursor = -1;
  let recent = safeParse(STORAGE.recent, []);
  if (!Array.isArray(recent)) recent = [];

  const searchIndex = DATA.articles.map((a) => ({
    id: a.id,
    title: a.title,
    deck: a.deck,
    cat: a.cat,
    author: a.author,
    tags: a.tags || [],
    haystack: `${a.title} ${a.deck} ${a.author} ${(a.tags || []).join(" ")} ${catLabel(a.cat)}`.toLowerCase(),
  }));

  function rememberSearch(query) {
    const q = query.trim();
    if (!q) return;
    recent = [q, ...recent.filter((r) => r.toLowerCase() !== q.toLowerCase())].slice(0, 5);
    safeSet(STORAGE.recent, recent);
  }

  function highlight(text, query) {
    const safe = escapeHtml(text);
    if (!query) return safe;
    const q = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return safe.replace(new RegExp(`(${q})`, "ig"), "<mark>$1</mark>");
  }

  function renderRecent() {
    if (!searchDefault) return;
    const recentBlock = $("#search-recent-block");
    const recentList = $("#search-recent-list");
    if (!recentList) return;

    if (recent.length) {
      recentBlock.hidden = false;
      recentList.innerHTML = recent
        .map(
          (q) => `
          <button class="search-recent__item" type="button" data-recent="${escapeHtml(q)}">
            <svg class="icon" aria-hidden="true"><use href="#i-clock"/></svg>
            <span>${escapeHtml(q)}</span>
            <svg class="icon" aria-hidden="true"><use href="#i-arrow-up-left"/></svg>
          </button>`
        )
        .join("");
    } else {
      recentBlock.hidden = true;
    }
  }

  function renderSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      if (searchDefault) searchDefault.hidden = false;
      if (searchResults) searchResults.hidden = true;
      if (searchEmpty) searchEmpty.hidden = true;
      if (searchCount) searchCount.textContent = "";
      searchCursor = -1;
      renderRecent();
      return;
    }

    if (searchDefault) searchDefault.hidden = true;
    const matches = searchIndex
      .filter((a) => q.split(/\s+/).every((part) => a.haystack.includes(part)))
      .sort((a, b) => {
        const at = a.title.toLowerCase().indexOf(q);
        const bt = b.title.toLowerCase().indexOf(q);
        return (at < 0 ? 99 : at) - (bt < 0 ? 99 : bt);
      })
      .slice(0, 8);

    searchCursor = -1;
    if (!matches.length) {
      if (searchResults) {
        searchResults.hidden = true;
        searchResults.innerHTML = "";
      }
      if (searchEmpty) searchEmpty.hidden = false;
      if (searchCount) searchCount.textContent = "Tidak ada hasil";
      return;
    }

    if (searchEmpty) searchEmpty.hidden = true;
    if (searchResults) {
      searchResults.hidden = false;
      searchResults.innerHTML = matches
        .map(
          (a, i) => `
          <a class="search-result" href="${articleUrl(a.id)}" data-result-index="${i}" data-result-id="${a.id}">
            <img class="search-result__thumb" src="assets/img/covers/${a.id}.svg" alt="" loading="lazy" />
            <span class="search-result__text">
              <span class="search-result__cat">${escapeHtml(catLabel(a.cat))}</span>
              <span class="search-result__title">${highlight(a.title, query.trim())}</span>
            </span>
            <svg class="icon" aria-hidden="true"><use href="#i-arrow-right"/></svg>
          </a>`
        )
        .join("");
    }
    if (searchCount) {
      searchCount.textContent = `${matches.length} hasil untuk \u201c${query.trim()}\u201d`;
    }
  }

  function openSearch() {
    if (!searchDialog) return;
    openDialog(searchDialog);
    renderRecent();
    if (searchInput) {
      searchInput.value = "";
      renderSearch("");
      requestAnimationFrame(() => searchInput.focus({ preventScroll: true }));
    }
  }

  function closeSearch() {
    if (searchInput) {
      if (searchInput.value.trim()) rememberSearch(searchInput.value);
    }
    closeDialog(searchDialog);
  }

  $$("[data-search-open]").forEach((btn) => btn.addEventListener("click", openSearch));

  if (searchInput) {
    searchInput.addEventListener("input", () => renderSearch(searchInput.value));
    searchInput.addEventListener("keydown", (event) => {
      const results = $$(".search-result", searchResults || document);
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        if (!results.length) return;
        event.preventDefault();
        searchCursor = event.key === "ArrowDown"
          ? (searchCursor + 1) % results.length
          : (searchCursor - 1 + results.length) % results.length;
        results.forEach((r, i) => r.classList.toggle("is-cursor", i === searchCursor));
        results[searchCursor].scrollIntoView({ block: "nearest" });
      }
      if (event.key === "Enter") {
        if (searchCursor >= 0 && results[searchCursor]) {
          event.preventDefault();
          rememberSearch(searchInput.value);
          window.location.href = results[searchCursor].href;
        } else if (searchInput.value.trim()) {
          rememberSearch(searchInput.value);
        }
      }
    });
  }

  document.addEventListener("click", (event) => {
    const recentBtn = event.target.closest("[data-recent]");
    if (recentBtn && searchInput) {
      searchInput.value = recentBtn.dataset.recent;
      renderSearch(searchInput.value);
      searchInput.focus();
      return;
    }

    const topicBtn = event.target.closest("[data-topic]");
    if (topicBtn && searchInput) {
      searchInput.value = topicBtn.dataset.topic;
      renderSearch(searchInput.value);
      searchInput.focus();
      return;
    }

    const clearRecent = event.target.closest("[data-clear-recent]");
    if (clearRecent) {
      recent = [];
      safeSet(STORAGE.recent, recent);
      renderRecent();
      toast("Riwayat pencarian dibersihkan", "trash");
      return;
    }

    const result = event.target.closest(".search-result");
    if (result && searchInput?.value.trim()) rememberSearch(searchInput.value);
  });

  document.addEventListener("keydown", (event) => {
    const target = event.target;
    const typing = target.matches?.("input, textarea, select, [contenteditable='true']");
    if ((event.key === "k" || event.key === "K") && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      openSearch();
      return;
    }
    if (event.key === "/" && !typing) {
      event.preventDefault();
      openSearch();
      return;
    }
    if (event.key === "Escape" && searchDialog?.open) {
      closeSearch();
    }
  });

  $$("[data-search-close]").forEach((btn) => btn.addEventListener("click", closeSearch));

  /* ------------------------------------------------------------------------
     Sheet: tersimpan + menu
     ------------------------------------------------------------------------ */

  $$("[data-bookmarks-open]").forEach((btn) =>
    btn.addEventListener("click", () => {
      renderSaved();
      openDialog(bookmarksDialog);
    })
  );

  const menuDialog = $("#menu-dialog");
  $$("[data-menu-open]").forEach((btn) => btn.addEventListener("click", () => openDialog(menuDialog)));

  $$("#menu-dialog a, #bookmarks-dialog a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!link.getAttribute("href")?.startsWith("#")) {
        closeDialog(link.closest("dialog"));
      }
    });
  });

  document.addEventListener("click", (event) => {
    // Klik tautan beranda (brand, bottom nav Beranda, menu Beranda) pada halaman utama -> smooth scroll ke atas
    const homeLink = event.target.closest("a.brand, a.bottom-nav__item[href='index.html'], a.menu-link[href='index.html']");
    if (homeLink && (location.pathname.endsWith("/index.html") || location.pathname.endsWith("/") || location.pathname === "")) {
      const dialog = homeLink.closest("dialog");
      if (dialog) closeDialog(dialog);
      event.preventDefault();
      const chip = navChips[0];
      if (chip) setActiveChip(chip, { scroll: true });
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      history.replaceState(null, "", "index.html");
      return;
    }

    const anchor = event.target.closest("a[href^='#']:not([href='#'])");
    if (!anchor || anchor.closest(".chip-nav") || anchor.closest(".toc")) return;
    const hash = anchor.getAttribute("href").replace(/^#/, "");
    const target = document.getElementById(hash);
    if (!target) return;
    const dialog = anchor.closest("dialog");
    if (dialog) closeDialog(dialog);
    event.preventDefault();
    const chip = navChips.find((c) => c.dataset.target === hash);
    if (chip) setActiveChip(chip, { scroll: true });
    isNavigating = true;
    clearTimeout(navTimer);

    if (hash === "terbaru") {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      history.replaceState(null, "", "#terbaru");
    } else {
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `#${hash}`);
    }

    const onDone = () => {
      isNavigating = false;
      window.removeEventListener("scrollend", onDone);
      clearTimeout(navTimer);
    };
    window.addEventListener("scrollend", onDone, { once: true });
    navTimer = setTimeout(onDone, reduceMotion ? 50 : 2000);
  });

  /* ------------------------------------------------------------------------
     Kategori: blob + scrollspy
     ------------------------------------------------------------------------ */

  const navScroller = $("#category-scroller");
  const navBlob = $("#nav-blob");
  const navChips = $$(".chip-nav[data-nav]");
  const spySections = navChips
    .map((chip) => document.getElementById(chip.dataset.target || ""))
    .filter(Boolean);

  function positionBlob(chip, animate = true) {
    if (!navBlob || !chip || !navScroller) return;
    if (!animate) navBlob.style.transition = "none";
    navBlob.style.width = `${chip.offsetWidth}px`;
    navBlob.style.transform = `translate(${chip.offsetLeft}px, -50%)`;
    navBlob.classList.add("is-ready");
    if (!animate) requestAnimationFrame(() => (navBlob.style.transition = ""));
  }

  function setActiveChip(chip, { scroll = false } = {}) {
    if (!chip) return;
    navChips.forEach((c) => {
      const active = c === chip;
      c.classList.toggle("is-active", active);
      c.setAttribute("aria-current", active ? "page" : "false");
    });
    positionBlob(chip);
    if (scroll && navScroller) {
      const left = chip.offsetLeft - navScroller.clientWidth / 2 + chip.offsetWidth / 2;
      navScroller.scrollTo({ left, behavior: reduceMotion ? "auto" : "smooth" });
    }
  }

  let isNavigating = false;
  let navTimer = null;

  navChips.forEach((chip) => {
    chip.addEventListener("click", (event) => {
      const targetId = chip.dataset.target || "";
      event.preventDefault();
      isNavigating = true;
      clearTimeout(navTimer);
      setActiveChip(chip, { scroll: true });

      const onDone = () => {
        isNavigating = false;
        window.removeEventListener("scrollend", onDone);
        clearTimeout(navTimer);
      };
      window.addEventListener("scrollend", onDone, { once: true });
      navTimer = setTimeout(onDone, reduceMotion ? 50 : 2000);

      if (targetId === "terbaru") {
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
        history.replaceState(null, "", "#terbaru");
      } else {
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
          history.replaceState(null, "", `#${target.id}`);
        }
      }
    });
  });

  let spyTick = false;
  function updateSpy() {
    if (isNavigating || !spySections.length) return;

    // Bagian paling atas -> aktifkan chip pertama (Terbaru)
    if (window.scrollY < 300) {
      if (navChips[0] && !navChips[0].classList.contains("is-active")) {
        setActiveChip(navChips[0], { scroll: true });
      }
      return;
    }

    // Bagian paling bawah dokumen -> aktifkan chip terakhir
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 12) {
      const last = navChips[navChips.length - 1];
      if (last && !last.classList.contains("is-active")) {
        setActiveChip(last, { scroll: true });
      }
      return;
    }

    const appH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--appbar-h"), 10) || 72;
    const catH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--catbar-h"), 10) || 58;
    const triggerY = appH + catH + 60;

    let current = spySections[0];
    for (const section of spySections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= triggerY) {
        current = section;
      }
    }

    const chip = navChips.find((c) => c.dataset.target === current.id);
    if (chip && !chip.classList.contains("is-active")) {
      setActiveChip(chip, { scroll: true });
    }
  }

  function onScrollSpy() {
    if (isNavigating || spyTick) return;
    spyTick = true;
    requestAnimationFrame(() => {
      spyTick = false;
      if (!isNavigating) updateSpy();
    });
  }

  function syncNavToHash() {
    const hash = (location.hash || "").replace(/^#/, "");
    if (!hash) return false;
    const chip = navChips.find((c) => c.dataset.target === hash);
    if (chip) {
      setActiveChip(chip, { scroll: true });
      return true;
    }
    return false;
  }

  function onHashNavigate() {
    const hash = (location.hash || "").replace(/^#/, "");
    if (!hash) return;
    const chip = navChips.find((c) => c.dataset.target === hash);
    if (chip) setActiveChip(chip, { scroll: true });
    if (hash === "terbaru") {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      return;
    }
    const target = document.getElementById(hash);
    if (target) {
      isNavigating = true;
      clearTimeout(navTimer);
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      const onDone = () => {
        isNavigating = false;
        window.removeEventListener("scrollend", onDone);
        clearTimeout(navTimer);
      };
      window.addEventListener("scrollend", onDone, { once: true });
      navTimer = setTimeout(onDone, reduceMotion ? 50 : 2000);
    }
  }

  if (spySections.length) {
    window.addEventListener("scroll", onScrollSpy, { passive: true });
    window.addEventListener("resize", () => {
      const active = navChips.find((c) => c.classList.contains("is-active")) || navChips[0];
      if (active) positionBlob(active, false);
      onScrollSpy();
    });
    window.addEventListener("hashchange", onHashNavigate);
    window.addEventListener("load", () => {
      if (!syncNavToHash() && window.scrollY > 120) {
        updateSpy();
      }
    });
  }

  /* ------------------------------------------------------------------------
     Ticker
     ------------------------------------------------------------------------ */

  const ticker = $(".ticker");
  const tickerTrack = $(".ticker__track");
  if (ticker && tickerTrack && !tickerTrack.dataset.cloned) {
    tickerTrack.dataset.cloned = "true";
    Array.from(tickerTrack.children).forEach((node) => {
      const clone = node.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.setAttribute("tabindex", "-1");
      clone.querySelectorAll("a").forEach((a) => a.setAttribute("tabindex", "-1"));
      tickerTrack.append(clone);
    });
  }

  const tickerToggle = $("[data-ticker-toggle]");
  tickerToggle?.addEventListener("click", () => {
    const paused = ticker.classList.toggle("is-paused");
    tickerToggle.setAttribute("aria-pressed", String(paused));
    tickerToggle.setAttribute("aria-label", paused ? "Lanjutkan berita berjalan" : "Jeda berita berjalan");
    const use = $("use", tickerToggle);
    if (use) use.setAttribute("href", paused ? "#i-play" : "#i-pause");
  });

  /* ------------------------------------------------------------------------
     Ripple
     ------------------------------------------------------------------------ */

  const rippleSelector =
    ".btn, .icon-btn, .card__action, .chip, .chip-nav, .segmented__btn, .poll__option, .play-fab, .menu-link, .search-result, .bottom-nav__item";

  document.addEventListener("pointerdown", (event) => {
    const host = event.target.closest(rippleSelector);
    if (!host || reduceMotion || event.button !== 0) return;
    if (!host.classList.contains("ripple-host")) {
      host.classList.add("ripple-host");
    }
    const rect = host.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.1;
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    host.append(ripple);
    setTimeout(() => ripple.remove(), 650);
  });

  /* ------------------------------------------------------------------------
     Reveal on scroll
     ------------------------------------------------------------------------ */

  const revealTargets = $$("[data-reveal]");
  const groups = new Map();
  revealTargets.forEach((el) => {
    const parent = el.parentElement;
    const arr = groups.get(parent) || [];
    arr.push(el);
    groups.set(parent, arr);
  });
  groups.forEach((items) => {
    items.forEach((el, i) => {
      if (i > 0) el.style.setProperty("--reveal-delay", String(Math.min(i, 6)));
    });
  });

  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
          if (entry.target.matches("[data-counter]")) animateCounter(entry.target);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-revealed"));
  }

  /* ------------------------------------------------------------------------
     Counter
     ------------------------------------------------------------------------ */

  function animateCounter(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = "true";
    const target = parseFloat(el.dataset.counter || "0");
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const suffix = el.dataset.suffix || "";
    const prefix = el.dataset.prefix || "";
    const duration = reduceMotion ? 0 : 1400;
    const start = performance.now();

    const fmt = (value) =>
      prefix +
      new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value) +
      (suffix ? `<span>${suffix}</span>` : "");

    if (!duration) {
      el.innerHTML = fmt(target);
      return;
    }

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.innerHTML = fmt(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ------------------------------------------------------------------------
     Header + FAB
     ------------------------------------------------------------------------ */

  const appBar = $("#app-bar");
  const fab = $("#fab-top");
  const fabBar = $(".fab-top__ring .bar");
  const progressBar = $("#reading-progress span");

  function onScrollChrome() {
    const y = window.scrollY;
    if (appBar) appBar.classList.toggle("is-scrolled", y > 8);
    if (fab) fab.classList.toggle("is-visible", y > 640);

    if (fabBar) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(y / max, 1) : 0;
      fabBar.style.strokeDashoffset = String(145 - 145 * progress);
    }
    if (progressBar) {
      const article = $(".article-prose");
      if (article) {
        const top = article.getBoundingClientRect().top + y;
        const start = top - 120;
        const end = top + article.offsetHeight - window.innerHeight + 120;
        const p = Math.min(Math.max((y - start) / Math.max(end - start, 1), 0), 1);
        progressBar.style.width = `${p * 100}%`;
      }
    }
  }

  window.addEventListener("scroll", onScrollChrome, { passive: true });
  onScrollChrome();

  fab?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* ------------------------------------------------------------------------
     Newsletter
     ------------------------------------------------------------------------ */

  document.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-newsletter]");
    if (!form) return;
    event.preventDefault();
    const input = $("input[type='email']", form);
    const value = input?.value.trim() || "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      input?.focus();
      input?.setAttribute("aria-invalid", "true");
      toast("Masukkan alamat email yang valid", "info");
      return;
    }
    input?.removeAttribute("aria-invalid");
    const card = form.closest(".newsletter");
    card?.classList.add("is-done");
    if (input) input.value = "";
    toast("Berhasil berlangganan. Cek email untuk konfirmasi.", "mail");
  });

  /* ------------------------------------------------------------------------
     Polling
     ------------------------------------------------------------------------ */

  const poll = $("[data-poll]");
  if (poll) {
    const pollId = poll.dataset.poll;
    const options = $$(".poll__option", poll);
    const persisted = safeParse(STORAGE.poll, null);

    const paint = (pickedIndex) => {
      poll.classList.add("is-voted");
      options.forEach((opt, i) => {
        opt.classList.toggle("is-picked", i === pickedIndex);
        const fill = $(".poll__fill", opt);
        if (fill) fill.style.setProperty("--pct", `${opt.dataset.pct}%`);
        const pct = $(".poll__pct", opt);
        if (pct) pct.textContent = `${opt.dataset.pct}%`;
      });
    };

    if (persisted && typeof persisted.index === "number" && persisted.id === pollId) {
      paint(persisted.index);
    }

    options.forEach((opt, index) => {
      opt.addEventListener("click", () => {
        paint(index);
        safeSet(STORAGE.poll, { id: pollId, index });
        toast("Suara kamu tercatat. Terima kasih!", "check");
      });
    });

    $("[data-poll-reset]", poll)?.addEventListener("click", () => {
      poll.classList.remove("is-voted");
      options.forEach((opt) => {
        opt.classList.remove("is-picked");
        const fill = $(".poll__fill", opt);
        if (fill) fill.style.setProperty("--pct", "0%");
      });
      safeSet(STORAGE.poll, null);
      toast("Pilihan direset", "refresh");
    });
  }

  /* ------------------------------------------------------------------------
     Feed filter + load more
     ------------------------------------------------------------------------ */

  const feedTabs = $$("[data-feed-tab]");
  const feedItems = $$("[data-feed-item]");
  const feedHint = $("[data-feed-hint]");

  function filterFeed(filter) {
    feedItems.forEach((item, index) => {
      const tags = (item.dataset.tags || "baru").split(/\s+/);
      const show = filter === "semua" || tags.includes(filter);
      item.classList.toggle("is-hidden", !show);
      if (show) {
        item.style.setProperty("--reveal-delay", String(index % 6));
        item.classList.remove("is-entering");
        void item.offsetWidth;
        item.classList.add("is-entering");
      }
    });
    if (feedHint) {
      const count = feedItems.filter((i) => !i.classList.contains("is-hidden")).length;
      feedHint.textContent = `${count} artikel ditampilkan`;
    }
  }

  feedTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      feedTabs.forEach((t) => t.setAttribute("aria-selected", String(t === tab)));
      filterFeed(tab.dataset.feedTab);
    });
  });

  const loadMoreBtn = $("[data-load-more]");
  loadMoreBtn?.addEventListener("click", () => {
    const moreWrap = $(loadMoreBtn.dataset.loadMore) || $("#feed-more");
    if (!moreWrap) return;
    const hidden = $$("[data-feed-item][hidden]", moreWrap);
    hidden.forEach((item, i) => {
      item.hidden = false;
      item.style.setProperty("--reveal-delay", String(i));
      item.classList.add("is-entering");
    });
    loadMoreBtn.closest(".load-more")?.remove();
    toast("Semua artikel sudah dimuat", "check");
    hidden[0]?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  });

  /* ------------------------------------------------------------------------
     Bottom nav / menu actions
     ------------------------------------------------------------------------ */

  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]");
    if (!action) return;
    const name = action.dataset.action;
    if (name === "login") toast("Masuk ke akun demo sedang disiapkan", "user");
    if (name === "subscribe") toast("Halaman langganan segera hadir", "sparkle");
    if (name === "notifications") toast("Tidak ada notifikasi baru", "bell");
  });

  /* ------------------------------------------------------------------------
     Waktu relatif
     ------------------------------------------------------------------------ */

  function hydrateTimes(root = document) {
    $$("[data-time]", root).forEach((el) => {
      const iso = el.dataset.time;
      el.textContent = formatTime(iso);
      el.setAttribute("datetime", iso);
      el.setAttribute("title", fullTime(iso));
    });
  }

  /* ------------------------------------------------------------------------
     Ekspos API kecil untuk halaman artikel
     ------------------------------------------------------------------------ */

  window.RedawnUI = {
    $,
    $$,
    DATA,
    CATS,
    byId,
    articleUrl,
    catLabel,
    escapeHtml,
    formatTime,
    fullTime,
    hydrateTimes,
    toast,
    toggleSave,
    syncSavedUI,
    openDialog,
    closeDialog,
    reduceMotion,
    isSaved: (id) => saved.includes(id),
  };

  hydrateTimes();
  syncSavedUI();
  renderRecent();

  const hash = (location.hash || "").replace(/^#/, "");
  const hashChip = hash ? navChips.find((c) => c.dataset.target === hash) : null;
  const initialChip = hashChip || navChips.find((c) => c.classList.contains("is-active")) || navChips[0];
  if (initialChip) {
    if (hashChip) {
      setActiveChip(hashChip, { scroll: true });
      const target = document.getElementById(hash);
      if (target) {
        if (hash === "terbaru") {
          window.scrollTo(0, 0);
        } else {
          requestAnimationFrame(() => {
            target.scrollIntoView({ behavior: "instant", block: "start" });
          });
        }
      }
    } else {
      requestAnimationFrame(() => positionBlob(initialChip, false));
    }
  }

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      const active = navChips.find((c) => c.classList.contains("is-active")) || navChips[0];
      if (active) positionBlob(active, false);
      if (hash && hash !== "terbaru") {
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: "instant", block: "start" });
          if (active) positionBlob(active, false);
        }
      }
    });
  }

  if (isMac) {
    $$(".search-trigger kbd").forEach((kbd) => (kbd.textContent = "\u2318K"));
  }
})();
