/* =====================================================================
   MAIN: renders the page from js/content.js and js/translations.js.
   You normally do NOT need to edit this file to change content.

   Sections in this file:
     1. Setup & language
     2. Small helpers
     3. Static text (data-i18n attributes)
     4. Hero: key art, pitch, facts
     5. Pillars (playing cards) & reaction recipes
     5b. Play: the browser build of the game
     6. Gameplay callouts
     7. Loot, bestiary, bosses
     8. Contact copy buttons
     9. Start
   ===================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------
     1. Setup & language
     --------------------------------------------------------------- */
  const { SITE, GAME } = window.HD_CONTENT;
  const TRANSLATIONS = window.HD_TRANSLATIONS;

  // Enabled languages from SITE.languages (only those that have translations)
  const LANGUAGES = (SITE.languages || Object.keys(TRANSLATIONS)).filter((lang) => TRANSLATIONS[lang]);
  const STORAGE_KEY = "hd-language";
  const SUITS = { spade: "♠", heart: "♥", diamond: "♦", club: "♣" };

  /* Counts used in texts like "{realms} realm", always taken from the data */
  const COUNTS = {
    realms: GAME.realms.length,
    bosses: GAME.realms.length,
    enemies: GAME.bestiary.length,
  };

  const state = {
    language: pickStartLanguage(),
    activeCallout: 0,
  };

  /* Order: #en / #id in the URL, then the visitor's last choice, then SITE.defaultLanguage */
  function pickStartLanguage() {
    const fromHash = location.hash.replace("#", "");
    if (LANGUAGES.includes(fromHash)) return fromHash;
    const saved = readStorage(STORAGE_KEY);
    if (LANGUAGES.includes(saved)) return saved;
    return LANGUAGES.includes(SITE.defaultLanguage) ? SITE.defaultLanguage : LANGUAGES[0];
  }

  function setLanguage(language) {
    state.language = language;
    writeStorage(STORAGE_KEY, language);
    renderAll();
  }

  /* ---------------------------------------------------------------
     2. Small helpers
     --------------------------------------------------------------- */

  /* Fill {placeholders} in a string */
  function fill(text, values = {}) {
    return text.replace(/\{(\w+)\}/g, (match, name) => (name in values ? values[name] : match));
  }

  /* t("hero.cta") -> UI text in the current language */
  function t(key, values = COUNTS) {
    const text = key.split(".").reduce((obj, part) => (obj ? obj[part] : undefined), TRANSLATIONS[state.language]);
    if (text === undefined) {
      console.warn(`Missing translation: ${state.language}.${key}`);
      return key;
    }
    return fill(text, values);
  }

  /* The current-language block of a content entry, falling back to the first language */
  function local(entry) {
    return entry[state.language] || entry[LANGUAGES[0]] || {};
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  /* localStorage can be blocked (private mode), so never let it break the page */
  function readStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }
  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      /* ignore */
    }
  }

  const $ = (selector) => document.querySelector(selector);

  function setImage(selector, src, alt) {
    const img = $(selector);
    if (img.getAttribute("src") !== src) img.src = src;
    img.alt = alt;
  }

  /* ---------------------------------------------------------------
     3. Static text from data-i18n attributes in index.html
     --------------------------------------------------------------- */
  function renderStaticText() {
    document.documentElement.lang = state.language;
    document.title = t("meta.title");
    $('meta[name="description"]').content = t("meta.description");

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.dataset.i18nHtml); // only trusted text from translations.js
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(el.dataset.i18nAria));
    });

    $("#language-switch").hidden = LANGUAGES.length < 2;
    $(".brand img").alt = t("meta.logoAlt");
    $("#year").textContent = new Date().getFullYear();

    const { email, discordUrl } = SITE.contact;
    $("#contact-email").textContent = email;
    $("#copy-email").dataset.copy = email;
    $("#contact-discord").textContent = discordUrl.replace(/^https?:\/\//, ""); // shown without https://
    $("#contact-discord-link").href = discordUrl;
  }

  /* ---------------------------------------------------------------
     4. Hero: key art, pitch, facts
     --------------------------------------------------------------- */
  function renderHero() {
    const text = local(GAME.text);

    $("#game-title").textContent = GAME.title;
    $("#game-tagline").textContent = GAME.tagline;
    setImage("#key-art", GAME.images.keyArt, text.keyArtAlt);
    $("#game-status").textContent = text.status;
    $("#game-pitch").textContent = fill(text.pitch, COUNTS);

    // Main button: store page if GAME.storeUrl is set, otherwise "Play" if the
    // browser build is enabled, otherwise "Tell me when it's out"
    const cta = $("#hero-cta");
    cta.removeAttribute("target");
    if (GAME.storeUrl) {
      cta.href = GAME.storeUrl;
      cta.target = "_blank";
      cta.rel = "noopener";
      cta.textContent = t("hero.ctaStore");
    } else if (GAME.playUrl) {
      cta.href = "#play";
      cta.textContent = t("hero.ctaPlay");
    } else {
      cta.href = "#contact";
      cta.textContent = t("hero.cta");
    }

    const facts = [
      [t("facts.genre"), text.genre],
      [t("facts.platform"), GAME.platforms.join(", ")],
      [t("facts.status"), text.status],
      [t("facts.realms"), COUNTS.realms],
      [t("facts.enemies"), COUNTS.enemies],
      [t("facts.bosses"), COUNTS.bosses],
    ];
    $("#facts").innerHTML = facts
      .map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`)
      .join("");
  }

  /* ---------------------------------------------------------------
     5. Pillars, drawn as playing cards
     --------------------------------------------------------------- */
  function renderPillars() {
    $("#pillar-cards").innerHTML = GAME.pillars.map((pillar) => {
      const text = local(pillar);
      const corner = `<span class="corner">${pillar.rank}<br>${SUITS[pillar.suit]}</span>`;
      return `
        <article class="playing-card suit-${pillar.suit}">
          ${corner}
          <span class="big-suit" aria-hidden="true">${SUITS[pillar.suit]}</span>
          <h3>${escapeHtml(text.title)}</h3>
          <p>${escapeHtml(text.body)}</p>
          ${corner.replace("corner", "corner corner-bottom")}
        </article>`;
    }).join("");

    const element = (name) => `<span class="element el-${name}">${name}</span>`;
    $("#reaction-list").innerHTML = GAME.reactions.map((reaction) => `
      <li>
        <span class="recipe">${element(reaction.a)} + ${element(reaction.b)}</span>
        <b>${escapeHtml(reaction.name)}</b>
        <span>${escapeHtml(local(reaction).body)}</span>
      </li>`).join("");
    $("#reaction-note").textContent = local(GAME.reactionNote);
  }

  /* ---------------------------------------------------------------
     5b. Play: loads magicion/embed.js, which turns the
         <div data-magicion> into the game player (see magicion/README
         in the embed package). We only add a status line under it.
     --------------------------------------------------------------- */
  const play = { loaded: false, lastRun: null, ready: false };

  /* ---------------------------------------------------------------
     5c. Visitor stats (GoatCounter). Counts page views, plus game
         events from the player: run started, boss defeated, run ended.
     --------------------------------------------------------------- */
  function setupStats() {
    const code = (SITE.goatcounter || "").trim();
    if (!code) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://gc.zgo.at/count.js";
    script.dataset.goatcounter = `https://${code}.goatcounter.com/count`;
    document.body.appendChild(script);
  }

  function countEvent(path, title) {
    if (!SITE.goatcounter || !window.goatcounter || !window.goatcounter.count) return;
    window.goatcounter.count({ path, title, event: true });
  }

  function slug(text) {
    return String(text || "unknown").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function setupPlay() {
    if (!GAME.playUrl) {
      $("#play").hidden = true;
      document.querySelector('.nav-play').parentElement.hidden = true;
      return;
    }
    const player = $("#game-player");
    player.addEventListener("magicion:ready", () => {
      play.ready = true;
      renderPlayStatus();
    });
    player.addEventListener("magicion:runStart", (event) => {
      countEvent(`game/run-start/${slug(event.detail.spell)}`, "Run started");
    });
    player.addEventListener("magicion:bossDefeated", (event) => {
      countEvent(`game/boss-defeated/${slug(event.detail.boss)}`, "Boss defeated");
    });
    player.addEventListener("magicion:runEnd", (event) => {
      play.lastRun = event.detail;
      renderPlayStatus();
      const run = event.detail;
      countEvent(`game/run-end/${run.win ? "win" : "loss"}/realm-${run.realm}`, run.win ? "Run won" : "Run lost");
    });

    const script = document.createElement("script");
    script.src = GAME.playUrl;
    script.defer = true;
    document.body.appendChild(script);
    play.loaded = true;
  }

  function renderPlayStatus() {
    if (!play.loaded) return;
    const status = $("#play-status");
    const run = play.lastRun;
    if (!run) {
      status.textContent = play.ready ? t("play.ready") : t("play.loading");
      return;
    }
    const parts = [
      run.win ? t("play.win") : t("play.loss"),
      typeof run.realm === "string" ? run.realm : null,
      run.level != null ? t("play.level", { value: run.level }) : null,
      run.kills != null ? t("play.kills", { value: run.kills }) : null,
      run.reactions != null ? t("play.reactions", { value: run.reactions }) : null,
      run.bosses ? t("play.bosses", { value: run.bosses }) : null,
      typeof run.time === "number" ? formatTime(run.time) : null,
    ].filter(Boolean);
    status.textContent = `${t("play.lastRun")}: ${parts.join(" · ")}`;
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  /* ---------------------------------------------------------------
     6. Gameplay callouts: numbered markers on the screenshot,
        linked to the numbered list next to it
     --------------------------------------------------------------- */
  function renderGameplay() {
    setImage("#gameplay-image", GAME.images.gameplay, local(GAME.text).gameplayAlt);

    $("#hud-markers").innerHTML = GAME.hud.map((spot, index) => `
      <button class="hud-marker" type="button" data-callout="${index}"
        style="left:${spot.x}%;top:${spot.y}%"
        aria-label="${index + 1}. ${escapeHtml(local(spot).title)}">${index + 1}</button>`).join("");

    $("#hud-legend").innerHTML = GAME.hud.map((spot, index) => {
      const text = local(spot);
      return `
        <li data-callout="${index}">
          <span class="hud-number" aria-hidden="true">${index + 1}</span>
          <div>
            <h3>${escapeHtml(text.title)}</h3>
            <p>${escapeHtml(text.body)}</p>
          </div>
        </li>`;
    }).join("");

    highlightCallout(state.activeCallout);
  }

  function highlightCallout(index) {
    state.activeCallout = index;
    document.querySelectorAll("[data-callout]").forEach((el) => {
      el.classList.toggle("active", Number(el.dataset.callout) === index);
    });
  }

  /* ---------------------------------------------------------------
     7. Loot, bestiary, bosses
     --------------------------------------------------------------- */
  function renderLoot() {
    setImage("#loot-image", GAME.images.loot, local(GAME.text).lootAlt);
    $("#rarities").innerHTML = GAME.rarities.map((r) => `
      <li style="--c:var(--${r.color})">
        <b>${escapeHtml(r.name)}</b>
        <span>${escapeHtml(r.example)}</span>
      </li>`).join("");
  }

  function renderBestiary() {
    setImage("#bestiary-image", GAME.images.bestiary, local(GAME.text).bestiaryAlt);
    $("#enemy-names").innerHTML = GAME.bestiary.map((name) => `<li>${escapeHtml(name)}</li>`).join("");
  }

  function renderBosses() {
    setImage("#bosses-image", GAME.images.bosses, local(GAME.text).bossesAlt);
    $("#realm-list").innerHTML = GAME.realms.map((r) => `
      <li style="--c:var(--${r.color})">
        <span class="pixel muted">${t("bosses.realm")}</span>
        <b class="realm-name">${escapeHtml(r.realm)}</b>
        <span class="boss-name">${escapeHtml(r.boss)}</span>
        <span class="boss-title">${escapeHtml(r.title)}</span>
      </li>`).join("");
  }

  /* ---------------------------------------------------------------
     8. Contact copy buttons
     --------------------------------------------------------------- */
  function copyAddress(button) {
    const showDone = () => {
      button.textContent = t("contact.copied");
      setTimeout(() => (button.textContent = t("contact.copy")), 1600);
    };
    const selectText = () => {
      const code = button.parentElement.querySelector("code");
      const range = document.createRange();
      range.selectNodeContents(code);
      getSelection().removeAllRanges();
      getSelection().addRange(range);
      button.textContent = t("contact.copyFallback");
    };
    try {
      navigator.clipboard.writeText(button.dataset.copy).then(showDone, selectText);
    } catch (error) {
      selectText();
    }
  }

  /* ---------------------------------------------------------------
     9. Start
     --------------------------------------------------------------- */
  function renderAll() {
    renderStaticText();
    renderHero();
    renderPillars();
    renderPlayStatus();
    renderGameplay();
    renderLoot();
    renderBestiary();
    renderBosses();
  }

  // One click listener for the whole page
  document.addEventListener("click", (event) => {
    const callout = event.target.closest("[data-callout]");
    if (callout) return highlightCallout(Number(callout.dataset.callout));

    const copyButton = event.target.closest("[data-copy]");
    if (copyButton) return copyAddress(copyButton);

    if (event.target.closest("#language-switch")) {
      const next = LANGUAGES[(LANGUAGES.indexOf(state.language) + 1) % LANGUAGES.length];
      setLanguage(next);
    }
  });

  setupStats();
  setupPlay();
  renderAll();
})();
