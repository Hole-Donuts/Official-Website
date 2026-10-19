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
     8a. Studio home + Gamification panels
     8b. Donut Town (second game) + its game player
     8c. Game switcher (slides between MAGICION and Donut Town)
     9. Start
   ===================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------
     1. Setup & language
     --------------------------------------------------------------- */
  const { SITE, GAME, DONUT_TOWN, HOME, GAMIFICATION } = window.HD_CONTENT;
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
    game: "home", // panel on screen, set by showGame() (section 8c)
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
     8b. Donut Town: key art, description, gallery, roadmap
     --------------------------------------------------------------- */
  function renderDonutTown() {
    const game = DONUT_TOWN;
    if (!game) {
      $("#donut-town").hidden = true;
      return;
    }

    // Title: last word in the accent color ("Donut <span>Town</span>")
    const words = game.title.split(" ");
    const last = words.pop();
    $("#dt-title").innerHTML = `${escapeHtml(words.join(" "))} <span>${escapeHtml(last)}</span>`;

    setImage("#dt-key-art", game.keyArt.src, local(game.keyArt).alt);
    $("#dt-text").innerHTML = local(game).paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
    $("#dt-tags").innerHTML = game.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("");

    $("#dt-shots").innerHTML = game.screenshots.map((shot) => {
      const text = local(shot);
      return `
        <li>
          <figure>
            <a href="${escapeHtml(shot.src)}" target="_blank" rel="noopener">
              <img src="${escapeHtml(shot.src)}" alt="${escapeHtml(text.alt)}" width="1920" height="1080" loading="lazy">
            </a>
            <figcaption><b>${escapeHtml(text.title)}</b> ${escapeHtml(text.caption)}</figcaption>
          </figure>
        </li>`;
    }).join("");

    $("#dt-phones").innerHTML = game.phoneShots.map((shot) => {
      const text = local(shot);
      return `
        <figure>
          <img src="${escapeHtml(shot.src)}" alt="${escapeHtml(text.alt)}" width="780" height="1688" loading="lazy">
          <figcaption>${escapeHtml(text.caption)}</figcaption>
        </figure>`;
    }).join("");

    $("#dt-milestones").innerHTML = game.milestones.map((milestone, index) => {
      const text = local(milestone);
      return `
        <li class="dt-milestone status-${escapeHtml(milestone.status)}">
          <div class="dt-milestone-top">
            <span class="dt-step">${t("donutTown.milestone", { value: index + 1 })}</span>
            <span class="dt-status">${t("donutTown.status." + milestone.status)}</span>
          </div>
          <h4>${escapeHtml(text.title)}</h4>
          <p>${escapeHtml(text.why)}</p>
          <ul>${text.features.map((f) => `<li>${escapeHtml(f)}</li>`).join("")}</ul>
        </li>`;
    }).join("");
  }

  /* ---------------------------------------------------------------
     8a. Studio home (first panel) and Gamification panel
     --------------------------------------------------------------- */
  const GAME_TITLES = {
    "magicion": () => GAME.title,
    "donut-town": () => DONUT_TOWN.title,
  };

  function renderHome() {
    if (!HOME) return;
    const text = local(HOME);
    $("#home-eyebrow").textContent = text.eyebrow;
    $("#home-title").textContent = text.title;
    $("#home-intro").textContent = text.intro;
    $("#home-games-title").textContent = text.gamesTitle;

    // Two main buttons: one big card per game
    $("#home-cards").innerHTML = HOME.games.map((card) => {
      const c = local(card);
      const title = GAME_TITLES[card.game] ? GAME_TITLES[card.game]() : card.game;
      return `
        <a class="home-card home-card-${escapeHtml(card.game)}" href="#${escapeHtml(card.game)}">
          <img src="${escapeHtml(card.image)}" alt="" width="1920" height="1080" loading="lazy">
          <span class="home-card-body">
            <span class="home-card-status">${escapeHtml(c.status)}</span>
            <b class="home-card-title">${escapeHtml(title)}</b>
            <span class="home-card-pitch">${escapeHtml(c.pitch)}</span>
            <span class="home-card-button">${escapeHtml(c.button)} <span aria-hidden="true">→</span></span>
          </span>
        </a>`;
    }).join("");

    // Special button: Gamification
    const g = local(HOME.gamification);
    $("#home-gami").innerHTML = `
      <span class="gami-badges" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="gami-button-text">
        <span class="gami-button-label">${escapeHtml(g.label)}</span>
        <b>${escapeHtml(g.title)}</b>
        <span>${escapeHtml(g.text)}</span>
      </span>
      <span class="gami-button-go">${escapeHtml(g.button)} <span aria-hidden="true">→</span></span>`;
  }

  function renderGamification() {
    if (!GAMIFICATION) return;
    const text = local(GAMIFICATION);
    $("#gami-eyebrow").textContent = text.eyebrow;
    $("#gami-title").textContent = text.title;
    $("#gami-intro").textContent = text.intro;

    const projects = GAMIFICATION.projects || [];
    if (!projects.length) {
      $("#gami-list").innerHTML = `
        <div class="gami-empty">
          <span class="gami-badges gami-badges-big" aria-hidden="true"><i></i><i></i><i></i></span>
          <h3>${escapeHtml(text.emptyTitle)}</h3>
          <p>${escapeHtml(text.emptyText)}</p>
          <a class="btn" href="#contact">${escapeHtml(text.emptyButton)}</a>
        </div>`;
      return;
    }

    $("#gami-list").innerHTML = `<ul class="gami-grid">${projects.map((project) => {
      const p = local(project);
      const meta = [project.author && `By ${project.author}`, project.client, project.year].filter(Boolean).map(escapeHtml).join(" · ");
      const image = project.image ? `<img src="${escapeHtml(project.image)}" alt="" width="1600" height="900" loading="lazy">` : "";
      const title = project.link
        ? `<a href="${escapeHtml(project.link)}" target="_blank" rel="noopener">${escapeHtml(project.title)}</a>`
        : escapeHtml(project.title);
      return `
        <li class="gami-card">
          ${image}
          <div class="gami-card-body">
            ${meta ? `<span class="pixel gami-card-meta">${meta}</span>` : ""}
            <h3>${title}</h3>
            <p>${escapeHtml(p.summary || "")}</p>
            ${(project.tags || []).length ? `<ul class="gami-tags">${project.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")}</ul>` : ""}
          </div>
        </li>`;
    }).join("")}</ul>`;
  }

  /* Donut Town game player. With DONUT_TOWN.playUrl set it shows the game
     in an iframe (16:9, or 9:16 on phones) with a fullscreen button.
     Empty playUrl: a "coming soon" screen instead (renderDonutTownSoon). */
  function setupDonutTownPlayer() {
    const box = $("#dt-player");
    if (!DONUT_TOWN || !DONUT_TOWN.playUrl) {
      box.classList.add("is-soon");
      $("#dt-play-hint").hidden = true;
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.src = DONUT_TOWN.playUrl;
    iframe.title = DONUT_TOWN.title;
    iframe.setAttribute("allow", "autoplay; fullscreen; gamepad");
    iframe.setAttribute("loading", "lazy");
    box.appendChild(iframe);

    const fullscreen = document.createElement("button");
    fullscreen.type = "button";
    fullscreen.className = "dt-fullscreen";
    fullscreen.textContent = "⛶";
    fullscreen.dataset.i18nAria = "donutTown.fullscreen";
    fullscreen.addEventListener("click", () => {
      if (document.fullscreenElement) return document.exitFullscreen();
      const request = box.requestFullscreen || box.webkitRequestFullscreen;
      if (request) {
        const result = request.call(box);
        if (result && result.catch) result.catch(() => {});
      } else {
        window.open(DONUT_TOWN.playUrl, "_blank");
      }
      iframe.focus();
    });
    box.appendChild(fullscreen);
  }

  function renderDonutTownSoon() {
    const box = $("#dt-player");
    if (!box.classList.contains("is-soon")) return;
    box.innerHTML = `
      <img src="${escapeHtml(DONUT_TOWN.keyArt.src)}" alt="" width="1920" height="1080" loading="lazy">
      <div class="dt-soon">
        <span class="dt-soon-badge">${escapeHtml(DONUT_TOWN.title)}</span>
        <h4>${t("donutTown.soonTitle")}</h4>
        <p>${t("donutTown.soonText")}</p>
        <a class="dt-soon-button" href="${escapeHtml(SITE.contact.discordUrl)}" target="_blank" rel="noopener">${t("donutTown.soonButton")}</a>
      </div>`;
  }

  /* Ask the Donut Town game to pause (when its panel slides away).
     The game can listen for: { target: "donut-town", cmd: "pause" } */
  function pauseDonutTown() {
    const iframe = document.querySelector("#dt-player iframe");
    if (!iframe || !iframe.contentWindow) return;
    iframe.contentWindow.postMessage({ target: "donut-town", cmd: "pause" }, new URL(iframe.src, location.href).origin);
  }

  /* ---------------------------------------------------------------
     8c. Game switcher. Each game is a panel inside #games-track; the
         track slides sideways so one panel fills the screen. Opened
         by the tabs in the nav, the "other game" cards at the end of
         each panel, any #link that points inside a panel, or a
         sideways swipe on phones.
     --------------------------------------------------------------- */
  const games = $("#games");
  const track = $("#games-track");
  const panels = [...document.querySelectorAll(".game-panel")];
  const panelIds = panels.map((panel) => panel.dataset.game);
  const navBar = $(".nav");

  // Card info for the "our other game" links
  const GAME_CARDS = {
    "home": () => ({ title: SITE.studioName, art: "assets/og-image.png", label: t("switcher.home") }),
    "magicion": () => ({ title: GAME.title, art: GAME.images.keyArt }),
    "donut-town": () => ({ title: DONUT_TOWN.title, art: DONUT_TOWN.keyArt.src }),
  };

  function navHeight() {
    return navBar ? navBar.offsetHeight : 0;
  }

  function activePanel() {
    return panels[panelIds.indexOf(state.game)] || panels[0];
  }

  // The container is only as tall as the panel on screen
  function updateGamesHeight() {
    games.style.height = `${activePanel().offsetHeight}px`;
  }

  function scrollToElement(element, smooth) {
    const top = element.getBoundingClientRect().top + window.scrollY - navHeight() - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: smooth ? "smooth" : "auto" });
  }

  function showGame(game, { animate = true, target = null, scroll = true, updateHash = true, track: trackStats = true } = {}) {
    const index = panelIds.indexOf(game);
    if (index === -1) return;
    const changed = state.game !== game;
    state.game = game;

    if (!animate) track.style.transition = "none";
    track.style.transform = index ? `translateX(${-index * 100}%)` : "none";
    if (!animate) {
      void track.offsetWidth; // apply without animation, then restore it
      track.style.transition = "";
    }

    panels.forEach((panel) => {
      const on = panel.dataset.game === game;
      panel.inert = !on;
      panel.setAttribute("aria-hidden", on ? "false" : "true");
    });
    document.querySelectorAll("[data-game-tab]").forEach((tab) => {
      const on = tab.dataset.gameTab === game;
      tab.classList.toggle("active", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
      // on very narrow phones the tab row scrolls: keep the active tab visible
      if (on && tab.parentElement.scrollWidth > tab.parentElement.clientWidth) {
        tab.parentElement.scrollLeft = tab.offsetLeft - tab.parentElement.offsetLeft - 8;
      }
    });
    document.querySelectorAll(".nav li[data-game]").forEach((item) => {
      item.hidden = item.dataset.game !== game;
    });
    updateGamesHeight();
    if (game !== "donut-town") pauseDonutTown();

    // Bring the new game into view: the requested spot, or the top of the panel
    if (target) {
      requestAnimationFrame(() => scrollToElement(target, animate));
    } else if (scroll && window.scrollY > games.offsetTop - navHeight()) {
      scrollToElement(games, animate);
    }

    if (updateHash) history.replaceState(null, "", `#${target ? target.id : game}`);
    if (changed && trackStats) countEvent(`switch/${game}`, "Switched game");
  }

  /* #links: open the panel that holds the target first. Returns true when handled. */
  function followHashLink(id) {
    const target = id && document.getElementById(id);
    const panel = target && target.closest(".game-panel");
    if (!panel) return false; // contact, footer... normal anchor behaviour
    const isPanel = target === panel;
    if (panel.dataset.game !== state.game || isPanel) {
      showGame(panel.dataset.game, { target: isPanel ? null : target });
      return true;
    }
    return false;
  }

  function renderNextGameCards() {
    document.querySelectorAll("[data-next-game]").forEach((link) => {
      const to = link.dataset.nextGame;
      const from = link.closest(".game-panel").dataset.game;
      const card = GAME_CARDS[to] && GAME_CARDS[to]();
      if (!card) return;
      const arrow = panelIds.indexOf(to) > panelIds.indexOf(from) ? "→" : "←";
      link.innerHTML = `
        <img src="${escapeHtml(card.art)}" alt="" width="1920" height="1080" loading="lazy">
        <span class="next-game-text">
          <span class="next-game-label">${card.label || t("switcher.other")}</span>
          <b>${escapeHtml(card.title)}</b>
        </span>
        <span class="next-game-arrow" aria-hidden="true">${arrow}</span>`;
    });
  }

  function setupSwitcher() {
    // Re-measure when a panel changes height (images loading, window resize)
    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(() => updateGamesHeight());
      panels.forEach((panel) => observer.observe(panel));
    } else {
      window.addEventListener("resize", updateGamesHeight);
    }

    // Sideways swipe on phones (not inside the game player itself)
    let swipe = null;
    games.addEventListener("touchstart", (event) => {
      const touch = event.touches[0];
      swipe = event.touches.length === 1 && !event.target.closest("[data-magicion]")
        ? { x: touch.clientX, y: touch.clientY, time: Date.now() }
        : null;
    }, { passive: true });
    games.addEventListener("touchend", (event) => {
      if (!swipe) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - swipe.x;
      const dy = touch.clientY - swipe.y;
      const quick = Date.now() - swipe.time < 700;
      swipe = null;
      if (!quick || Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      const next = panelIds.indexOf(state.game) + (dx < 0 ? 1 : -1);
      if (next >= 0 && next < panelIds.length) showGame(panelIds[next]);
    }, { passive: true });

    // Start on the game the link points to (e.g. .../#donut-town or #bestiary).
    // Links outside the panels (#contact) or no link at all: first game, URL untouched.
    const target = location.hash && document.getElementById(location.hash.slice(1));
    const panel = target && target.closest(".game-panel");
    state.game = panelIds[0];
    showGame(panel ? panel.dataset.game : panelIds[0], {
      animate: false,
      target: panel && target !== panel ? target : null,
      scroll: false,
      updateHash: false,
      track: false,
    });
    if (target && !panel) requestAnimationFrame(() => scrollToElement(target, false));
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
    renderHome();
    renderGamification();
    renderDonutTown();
    renderDonutTownSoon();
    renderNextGameCards();
  }

  // One click listener for the whole page
  document.addEventListener("click", (event) => {
    const hashLink = event.target.closest('a[href^="#"]');
    if (hashLink && followHashLink(hashLink.getAttribute("href").slice(1))) {
      event.preventDefault();
      return;
    }

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
  setupDonutTownPlayer();
  renderAll();
  setupSwitcher();
})();
