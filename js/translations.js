/* =====================================================================
   TRANSLATIONS: fixed UI text (menu, headings, buttons, receipt).

   In index.html an element with  data-i18n="hero.cta"  gets its text
   from  id.hero.cta  or  en.hero.cta  below.
   Use data-i18n-html instead when the text contains HTML such as <br>.

   Placeholders in {curly braces} are filled in by js/main.js from
   js/content.js, so counts stay correct automatically.

   To add a language: copy the whole "en" block, rename the key
   (e.g. "ja"), translate it, and add the same key to every text block
   in js/content.js.
   ===================================================================== */

window.HD_TRANSLATIONS = {
  id: {
    meta: {
      title: "MAGICION · Holy Doughnut Studio",
      description: "MAGICION, game aksi mantra kartu dari Holy Doughnut Studio. Segera hadir di Android.",
      logoAlt: "Logo Holy Doughnut Studio",
    },
    nav: {
      label: "Utama",
      play: "Main",
      gameplay: "Gameplay",
      loot: "Item",
      bestiary: "Bestiary",
      bosses: "Bos",
      contact: "Kontak",
      switchTo: "EN",
      switchLabel: "Switch to English",
    },
    hero: {
      eyebrow: "Game baru dari Holy Doughnut Studio",
      cta: "Kabari saya saat rilis",
      ctaStore: "Lihat di toko",
      ctaGameplay: "Lihat gameplay",
      ctaPlay: "Main di browser",
      note: "topinya penting. nanti kamu paham.",
    },
    facts: {
      label: "Ringkasan game",
      genre: "Genre",
      platform: "Platform",
      status: "Status",
      realms: "Realm",
      enemies: "Jenis musuh",
      bosses: "Bos",
    },
    pillars: {
      title: "Satu dek, tiga hal",
      intro: "Semua di MAGICION berputar di sekitar kartu remi. Ini tiga hal yang membuat setiap run terasa berbeda.",
      reactionsTitle: "Resep reaksi",
    },
    play: {
      title: "Main sekarang",
      intro: "Versi browser lengkap, langsung di halaman ini. Progresmu tersimpan otomatis di browser ini.",
      note: "gratis. tanpa install.",
      loading: "Memuat game…",
      ready: "Klik di dalam game untuk mulai. Suara menyala setelah klik pertama. Tombol di pojok kiri bawah untuk layar penuh.",
      lastRun: "Run terakhir",
      win: "Menang",
      loss: "Kalah",
      level: "level {value}",
      kills: "{value} musuh",
      reactions: "{value} reaksi",
      bosses: "{value} bos",
    },
    gameplay: {
      title: "Seperti ini rasanya",
      intro: "Realm Cinder Forge, level 19. Klik angka di gambar untuk tahu apa yang sedang terjadi di layar.",
      note: "iya, sebanyak ini musuhnya.",
    },
    loot: {
      title: "Elite Spoils",
      intro: "Kalahkan musuh elite, lalu pilih satu dari tiga item. Setiap item berbentuk kartu remi: makin tinggi kartunya, makin langka itemnya. Item baru menggantikan item lama di slot yang sama, jadi setiap pilihan ada untung-ruginya.",
      rarityLabel: "Tingkat kelangkaan",
      skip: "Tidak suka semuanya? Lewati dan ambil 25 emas.",
      note: "saran kami: selalu ambil topinya.",
    },
    bestiary: {
      title: "The Bestiary",
      intro: "{enemies} jenis musuh: manusia, mayat hidup, dan monster dari {realms} realm.",
      listToggle: "Lihat semua nama musuh",
    },
    bosses: {
      title: "{bosses} realm, {bosses} bos",
      intro: "Setiap realm dijaga satu penguasa dengan gaya bertarung sendiri.",
      realm: "Realm",
    },
    contact: {
      title: "Mau main duluan?",
      text: "MAGICION masih kami garap. Kirim pesan kalau mau dikabari saat rilis, mau meliput, atau mau ngobrol soal publishing. Biasanya kami balas dalam 2 hari kerja.",
      receiptNo: "Nota no. 0043 · pesanan: MAGICION",
      itemNews: "1x Kabar rilis MAGICION",
      itemPress: "1x Liputan media & kreator",
      itemPublish: "1x Ngobrol soal publishing",
      itemDonut: "1x Donat (opsional)",
      priceFree: "GRATIS",
      priceNego: "nego",
      priceDonut: "Rp 8.000",
      sendTo: "Kirim pesanan ke:",
      copy: "salin",
      copied: "tersalin",
      copyFallback: "ctrl+c",
      join: "gabung",
      thanks: "Terima kasih sudah mampir!<br>Simpan nota ini sebagai bukti.",
      stamp: "LUNAS",
    },
    footer: {
      note: "dibuat sambil ngemil, beneran.",
    },
  },

  en: {
    meta: {
      title: "MAGICION · Holy Doughnut Studio",
      description: "MAGICION, an action card-spell game by Holy Doughnut Studio. Coming soon to Android.",
      logoAlt: "Holy Doughnut Studio logo",
    },
    nav: {
      label: "Main",
      play: "Play",
      gameplay: "Gameplay",
      loot: "Items",
      bestiary: "Bestiary",
      bosses: "Bosses",
      contact: "Contact",
      switchTo: "ID",
      switchLabel: "Ganti ke Bahasa Indonesia",
    },
    hero: {
      eyebrow: "A new game from Holy Doughnut Studio",
      cta: "Tell me when it's out",
      ctaStore: "See it in the store",
      ctaGameplay: "See gameplay",
      ctaPlay: "Play in your browser",
      note: "the hat matters. you'll see.",
    },
    facts: {
      label: "Game summary",
      genre: "Genre",
      platform: "Platform",
      status: "Status",
      realms: "Realms",
      enemies: "Enemy types",
      bosses: "Bosses",
    },
    pillars: {
      title: "One deck, three ideas",
      intro: "Everything in MAGICION revolves around playing cards. These three things make every run feel different.",
      reactionsTitle: "Reaction recipes",
    },
    play: {
      title: "Play it now",
      intro: "The full browser version, right on this page. Your progress is saved in this browser automatically.",
      note: "free. no install.",
      loading: "Loading the game…",
      ready: "Click inside the game to start. Sound turns on after your first click. Use the button in the bottom-left corner for fullscreen.",
      lastRun: "Last run",
      win: "Victory",
      loss: "Defeated",
      level: "level {value}",
      kills: "{value} kills",
      reactions: "{value} reactions",
      bosses: "{value} bosses",
    },
    gameplay: {
      title: "What it feels like",
      intro: "The Cinder Forge realm, level 19. Click a number on the image to see what's happening on screen.",
      note: "yes, that many enemies.",
    },
    loot: {
      title: "Elite Spoils",
      intro: "Beat an elite enemy, then pick one of three items. Every item is a playing card: the higher the card, the rarer the item. A new item replaces the old one in the same slot, so every pick is a trade-off.",
      rarityLabel: "Rarity",
      skip: "Don't like any of them? Skip and take 25 gold.",
      note: "our advice: always take the hat.",
    },
    bestiary: {
      title: "The Bestiary",
      intro: "{enemies} kinds of enemies: humans, undead and monsters across {realms} realms.",
      listToggle: "See every enemy name",
    },
    bosses: {
      title: "{bosses} realms, {bosses} bosses",
      intro: "Each realm is guarded by one ruler with a fighting style of its own.",
      realm: "Realm",
    },
    contact: {
      title: "Want to play first?",
      text: "We're still building MAGICION. Send us a message if you want to hear when it launches, cover it, or talk publishing. We usually reply within 2 working days.",
      receiptNo: "Receipt no. 0043 · order: MAGICION",
      itemNews: "1x MAGICION launch news",
      itemPress: "1x Press & creator coverage",
      itemPublish: "1x Publishing chat",
      itemDonut: "1x Doughnut (optional)",
      priceFree: "FREE",
      priceNego: "let's talk",
      priceDonut: "Rp 8,000",
      sendTo: "Send your order to:",
      copy: "copy",
      copied: "copied",
      copyFallback: "ctrl+c",
      join: "join",
      thanks: "Thanks for stopping by!<br>Keep this receipt as proof.",
      stamp: "PAID",
    },
    footer: {
      note: "made while snacking. really.",
    },
  },
};
