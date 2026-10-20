/* =====================================================================
   CONTENT: the file you will edit most.

   Everything a visitor reads about the studio and MAGICION lives here.
   Text that differs per language has two versions:
     id = Bahasa Indonesia
     en = English
   UI labels (menu, headings, buttons, receipt) are in js/translations.js.

   In-game names (enemies, bosses, realms, items) stay in English in
   both languages, the same as inside the game.

   Images live in assets/magicion/. To replace one, overwrite the file
   with the same name, or change the path here.
   ===================================================================== */

window.HD_CONTENT = {

  /* ---------------------------------------------------------------
     SITE: general settings and contact details
     --------------------------------------------------------------- */
  SITE: {
    // Languages visitors can use. Only "en" = English-only site, no language button.
    // To bring Indonesian back: ["en", "id"]
    languages: ["en"],
    // Language shown on first visit (must be in the list above)
    defaultLanguage: "en",
    studioName: "Holy Doughnut Studio",
    // GoatCounter site code for visitor stats, e.g. "holydoughnut" for
    // https://holydoughnut.goatcounter.com. Leave empty "" to turn stats off.
    goatcounter: "holydoughnut",
    contact: {
      email: "holydoughnutofficial@gmail.com",
      discordUrl: "https://discord.gg/nP9xS3Ca9",
    },
  },

  /* ---------------------------------------------------------------
     GAME: MAGICION
     --------------------------------------------------------------- */
  GAME: {
    title: "MAGICION",
    tagline: "Cards · Spells · Reactions",
    platforms: ["Web browser", "Android (soon)"],
    // Set a URL when the store page exists; the page then shows a store button.
    storeUrl: "",
    // The playable browser build (folder magicion/ in this project).
    // Leave empty "" to hide the "Play" section.
    playUrl: "magicion/embed.js",

    images: {
      keyArt: "assets/magicion/key-art.webp",
      gameplay: "assets/magicion/gameplay.webp",
      loot: "assets/magicion/elite-spoils.webp",
      bestiary: "assets/magicion/bestiary.webp",
      bosses: "assets/magicion/bosses.webp",
    },

    text: {
      id: {
        status: "Segera hadir di Android",
        genre: "Action roguelite",
        pitch: "Seorang penyihir bertopi tinggi melawan gerombolan monster hanya dengan setumpuk kartu. Setiap kartu adalah mantra. Jelajahi {realms} realm, hadapi {enemies} jenis musuh, kalahkan {bosses} bos, dan susun dek yang paling cocok dengan gayamu.",
        keyArtAlt: "Key art MAGICION: logo MAGICION dengan topi tinggi dan kartu remi, di samping karakter penyihir bertopi biru di padang rumput malam berbulan purnama",
        gameplayAlt: "Screenshot gameplay MAGICION di realm Cinder Forge: penyihir dikepung ksatria, slime magma, dan anjing neraka, dengan angka damage beterbangan",
        lootAlt: "Layar Elite Spoils: tiga pilihan item berbentuk kartu remi, yaitu Moonwoven Grimoire, Twinned Top Hat, dan Lucky Cloak",
        bestiaryAlt: "Halaman The Bestiary: 40 jenis musuh MAGICION dari goblin sampai warlock",
        bossesAlt: "Halaman The Bosses: delapan bos MAGICION beserta gelarnya",
      },
      en: {
        status: "Coming soon to Android",
        genre: "Action roguelite",
        pitch: "A top-hatted magician takes on hordes of monsters with nothing but a deck of cards. Every card is a spell. Explore {realms} realms, face {enemies} kinds of enemies, beat {bosses} bosses, and build the deck that fits the way you play.",
        keyArtAlt: "MAGICION key art: the MAGICION logo with a top hat and playing cards, next to a blue-hatted magician on a moonlit meadow",
        gameplayAlt: "MAGICION gameplay in the Cinder Forge realm: the magician surrounded by knights, magma slimes and hellhounds, with damage numbers flying",
        lootAlt: "Elite Spoils screen: three item choices shaped like playing cards, Moonwoven Grimoire, Twinned Top Hat and Lucky Cloak",
        bestiaryAlt: "The Bestiary page: all 40 MAGICION enemies, from goblins to warlocks",
        bossesAlt: "The Bosses page: the eight MAGICION bosses and their titles",
      },
    },

    /* Three pillars, shown as playing cards. suit: "spade" | "heart" | "diamond" | "club" */
    pillars: [
      {
        suit: "spade",
        rank: "A",
        id: { title: "Kartu", body: "Mantramu berbentuk kartu remi, lengkap dengan simbol dan level. Bawa beberapa kartu sekaligus dan naikkan levelnya selama perjalanan." },
        en: { title: "Cards", body: "Your spells are playing cards, each with a suit and a level. Carry several at once and level them up as you go." },
      },
      {
        suit: "heart",
        rank: "K",
        id: { title: "Mantra", body: "Empat elemen: Fire, Frost, Storm, dan Arcane. Item seperti grimoire dan topi menambah Spell Power, mempercepat kartu, dan memangkas cooldown." },
        en: { title: "Spells", body: "Four elements: Fire, Frost, Storm and Arcane. Items like grimoires and hats raise Spell Power, speed up your cards and cut cooldowns." },
      },
      {
        suit: "diamond",
        rank: "Q",
        id: { title: "Reaksi", body: "Gabungkan dua elemen pada satu musuh untuk memicu reaksi. Reaksi menembus perisai dan memberi damage ganda pada musuh berarmor. Setiap musuh tahan terhadap elemen tertentu dan lemah terhadap yang lain." },
        en: { title: "Reactions", body: "Combine two elements on one enemy to trigger a reaction. Reactions break through shields and deal double damage to armored foes. Every enemy resists some elements and is weak to others." },
      },
    ],

    /* Elemental reactions, shown under the pillars.
       a + b = the two elements that trigger it. Element names must match
       a color in css/style.css: fire, frost, storm, arcane. */
    reactions: [
      {
        a: "fire", b: "frost", name: "Shatter",
        id: { body: "Pukulan besar ke satu musuh, lebih sakit lagi kalau musuhnya sedang membeku." },
        en: { body: "A huge hit on one enemy, even bigger if it is frozen." },
      },
      {
        a: "fire", b: "storm", name: "Overload",
        id: { body: "Ledakan yang melempar semua musuh di sekitarnya." },
        en: { body: "An explosion that knocks back every enemy nearby." },
      },
      {
        a: "frost", b: "storm", name: "Superconduct",
        id: { body: "Petir yang melompat ke musuh terdekat dan membuat mereka pingsan sesaat." },
        en: { body: "Lightning that jumps to nearby enemies and stuns them." },
      },
    ],
    reactionNote: {
      id: "Arcane tidak bereaksi sendiri, tapi musuh yang terkena hex Arcane menerima damage reaksi 50% lebih besar.",
      en: "Arcane doesn't react on its own, but enemies under an Arcane hex take 50% more reaction damage.",
    },

    /* Numbered callouts on the gameplay screenshot.
       x / y are the marker position in percent of the image (0-100). */
    hud: [
      {
        x: 7, y: 5,
        id: { title: "Nyawa, mana, dan level", body: "Bar merah untuk HP, bar biru untuk mana. Di bawahnya ada level, koin emas, dan jenis kartu yang sedang aktif." },
        en: { title: "Health, mana and level", body: "Red bar for HP, blue bar for mana. Below them: your level, gold, and the card type you are running." },
      },
      {
        x: 50, y: 4,
        id: { title: "Progres realm", body: "Nama realm dan titik-titik tahap. Selesaikan semua tahap untuk bertemu bos penjaganya." },
        en: { title: "Realm progress", body: "The realm name and its stages. Clear them all to meet the boss that guards it." },
      },
      {
        x: 74, y: 17,
        id: { title: "Musuh elite", body: "Musuh dengan nama sifat di atas kepalanya lebih kuat, dan mengalahkannya memberi Elite Spoils." },
        en: { title: "Elite enemies", body: "Enemies with traits above their heads hit harder, and beating them drops Elite Spoils." },
      },
      {
        x: 50, y: 50,
        id: { title: "Sang penyihir", body: "Kamu. Bergerak, menghindar, dan biarkan kartu-kartumu bekerja." },
        en: { title: "The magician", body: "That's you. Move, dodge, and let your cards do the work." },
      },
      {
        x: 91, y: 90,
        id: { title: "Kartu dan Dash", body: "Slot kartu mantra beserta levelnya, dan tombol Dash (Space) untuk lolos dari kepungan." },
        en: { title: "Cards and Dash", body: "Your spell card slots with their levels, and the Dash button (Space) to break out of a crowd." },
      },
    ],

    /* Item rarities seen in Elite Spoils, lowest to highest */
    rarities: [
      { name: "Rare", color: "blue", example: "Lucky Cloak" },
      { name: "Epic", color: "purple", example: "Moonwoven Grimoire" },
      { name: "Legendary", color: "gold", example: "Twinned Top Hat" },
    ],

    /* The eight realms and their bosses, in the order shown on The Bosses page */
    realms: [
      { realm: "Whispering Forest", boss: "Alpha Direwolf", title: "Pack Lord of the Whispering Forest", color: "grey" },
      { realm: "Hollow Graveyard", boss: "Lich Mortis", title: "Undying Lord of the Hollow Graveyard", color: "green" },
      { realm: "Murkmire Swamp", boss: "Bog Hydra", title: "Three Mouths of Murkmire", color: "green" },
      { realm: "Cinder Forge", boss: "Ignis the Forge Dragon", title: "Heart of the Cinder Forge", color: "orange" },
      { realm: "Metropolis", boss: "Wreck Titan", title: "Last Machine of the Metropolis", color: "orange" },
      { realm: "Frostveil Archive", boss: "Glacier Colossus", title: "Warden of the Frostveil Archive", color: "blue" },
      { realm: "Endless Dark", boss: "The Hollow King", title: "Lord of the Endless Dark", color: "purple" },
      { realm: "Observatory", boss: "The Starless Eye", title: "Eye Above the Observatory", color: "purple" },
    ],

    /* Every enemy in The Bestiary */
    bestiary: [
      "Goblin", "Goblin Archer", "Tusk Boar", "Spore Shroom", "Frost Wraith",
      "Rune Knight", "Frost Mage", "Crystal Ram", "Shade", "Cinder Knight",
      "Cultist", "Void Bat", "Skeleton", "Bone Archer", "Wailing Ghost",
      "Corpse Bloater", "Necromancer", "Bog Slime", "Spitter Toad", "Mire Lizard",
      "Raider", "Rubble Golem", "Gun Drone", "Rampager", "Scrap Bomb",
      "Magma Imp", "Pyromancer", "Magma Slime", "Starling", "Brass Automaton",
      "Star Stag", "Star Seer", "Dire Wolf", "Zombie", "Bog Spider",
      "Lizardfolk", "Ghoul", "Frost Wolf", "Hellhound", "Warlock",
    ],
  },

  /* ---------------------------------------------------------------
     DONUT_TOWN: the studio's second game (section "Donut Town")

     Images live in assets/donut-town/. Text is English only for now
     (the site runs in English); add an "id" block next to "en" if
     Indonesian is switched back on.
     --------------------------------------------------------------- */
  DONUT_TOWN: {
    title: "Donut Town",
    // Small labels under the description
    tags: ["Life sim", "Web · Android · iOS", "In development"],

    /* Playable build (section "Play Donut Town").
       1. Put the game in the folder donut-town/ (so the file is donut-town/index.html).
       2. Set playUrl to "donut-town/index.html".
       While it is empty "", the section shows a "coming soon" screen instead.
       Run the build through tools/protect-game.js first, like MAGICION. */
    playUrl: "donut-town/index.html",

    keyArt: {
      src: "assets/donut-town/key-art.webp",
      en: { alt: "Donut Town title screen: the Donut Town sign hanging over a sunny street with a doughnut shop wearing a giant doughnut, striped shop awnings and people walking by" },
    },

    en: {
      paragraphs: [
        "A life sim about one small town and one whole life. Get born in a kampung, grow up, find work, fall in love, buy a house, and one day hand it all to your kid.",
        "The clock never stops. Neighbours keep their own schedules, chat with each other, and remember what you told them. Your phone buzzes with job offers, favours and invites.",
      ],
    },

    /* Screenshot gallery (16:9). title is shown in bold before the caption. */
    screenshots: [
      {
        src: "assets/donut-town/gameplay.webp",
        en: { title: "Pusat Meses.", caption: "An afternoon downtown, on the way to a shift at Kopi Senja.", alt: "Afternoon in Pusat Meses: the player outside Restoran Padang while two neighbours chat" },
      },
      {
        src: "assets/donut-town/district-gula-aren.webp",
        en: { title: "Kampung Gula Aren.", caption: "Where every life starts.", alt: "Morning in Kampung Gula Aren with the family house, Taman Donat and a passing car" },
      },
      {
        src: "assets/donut-town/talk.webp",
        en: { title: "Say hi to anyone.", caption: "Find something you both like and they might give you their number.", alt: "Chatting with a stranger on the street, with an impression bar and topic choices" },
      },
      {
        src: "assets/donut-town/phone.webp",
        en: { title: "The phone.", caption: "Jobs, contacts, money and messages. Time pauses while it's open.", alt: "The in-game phone home screen with message notifications and apps" },
      },
      {
        src: "assets/donut-town/chat.webp",
        en: { title: "Plans for tonight.", caption: "Say yes, then actually show up.", alt: "The Messages app with an invite for coffee at Kopi Senja" },
      },
      {
        src: "assets/donut-town/family.webp",
        en: { title: "Family trees.", caption: "Everyone in town has one, you included.", alt: "A family tree spanning grandparents, parents and the player" },
      },
      {
        src: "assets/donut-town/district-kelapa.webp",
        en: { title: "Pantai Kelapa.", caption: "Grilled fish and a sunset after work.", alt: "Sunset at Pantai Kelapa with colourful beach umbrellas and the seafood stall" },
      },
      {
        src: "assets/donut-town/district-cokelat.webp",
        en: { title: "Distrik Cokelat.", caption: "The office lights stay on until midnight.", alt: "Night in Distrik Cokelat with lit office windows and street lamps" },
      },
    ],

    /* Portrait phone screenshots (780 x 1688) */
    phoneShots: [
      { src: "assets/donut-town/mobile-game.webp", en: { caption: "Plays on phones too.", alt: "Donut Town on a phone held upright" } },
      { src: "assets/donut-town/mobile-phone.webp", en: { caption: "A phone, on your phone.", alt: "The in-game phone open on a phone held upright" } },
    ],

    /* Roadmap, in the order they will be built.
       status: "next" | "planned" | "later" | "done"
       Move a feature between milestones by moving its line. */
    milestones: [
      {
        status: "next",
        en: {
          title: "Make it yours",
          why: "You already live a whole life in Donut Town. Next, it should look like your life.",
          features: ["Customize your character: hair, clothes and more", "Customize your house"],
        },
      },
      {
        status: "planned",
        en: {
          title: "Property",
          why: "Houses stop being just a place to sleep. Rent before you can buy, rent out what you own, or sell homes for a living.",
          features: ["Rent property", "Real estate agency"],
        },
      },
      {
        status: "planned",
        en: {
          title: "Your own business",
          why: "Stop working for someone else. Open a shop, hire your neighbours, and put your savings to work.",
          features: ["Open up a business", "Stock market"],
        },
      },
      {
        status: "later",
        en: {
          title: "Beyond the town",
          why: "Run for office and change how Donut Town works, or pack a bag and see what the next town over is like.",
          features: ["Become a politician and change town policy", "Travel to another town"],
        },
      },
    ],
  },
  /* ---------------------------------------------------------------
     HOME: the studio front page (first panel). Two big game buttons
     and one special button to the Gamification panel.
     --------------------------------------------------------------- */
  HOME: {
    en: {
      eyebrow: "Holy Doughnut Studio",
      title: "We make fun games",
      intro: "Holy Doughnut Studio is a small team with big ideas. Pick a game below, or see what we build beyond games.",
      gamesTitle: "Our games",
    },
    // One card per game. game = the id of its panel ("magicion", "donut-town").
    games: [
      {
        game: "magicion",
        image: "assets/magicion/key-art.webp",
        en: { pitch: "An action roguelite of cards, spells and elemental reactions.", status: "Play in your browser", button: "Explore MAGICION" },
      },
      {
        game: "donut-town",
        image: "assets/donut-town/key-art.webp",
        en: { pitch: "A life sim about one small town and one whole life.", status: "In development", button: "Visit Donut Town" },
      },
    ],
    gamification: {
      en: {
        label: "Beyond games",
        title: "Gamification projects",
        text: "Points, quests, badges and leaderboards for classrooms, teams and communities.",
        button: "See projects",
      },
    },
  },

  /* ---------------------------------------------------------------
     GAMIFICATION: list of gamification projects (panel "Gamification").
     While the list is empty the panel shows a "first projects coming
     soon" message. To add a project, copy this into projects: [ ... ]

       {
         title: "Project name",
         client: "Client or partner",          // optional
         year: 2026,                           // optional
         image: "assets/gamification/<name>.webp",  // optional, 16:9
         link: "https://...",                  // optional
         author: "Your name",                  // optional, shown as "By ..."
         tags: ["Education", "Badges"],
         en: { summary: "One or two sentences about what it does." },
       },
     --------------------------------------------------------------- */
  GAMIFICATION: {
    en: {
      eyebrow: "Holy Doughnut Studio · Beyond games",
      title: "Gamification",
      intro: "We use what we know from making games to make other things more fun: points, quests, badges, levels and leaderboards for learning, work and communities.",
      emptyTitle: "First projects coming soon",
      emptyText: "We're working on our first gamification projects. Have a class, an app or a community that could use some game magic? Let's talk.",
      emptyButton: "Get in touch",
    },
    projects: [
      {
        title: "Simulasi Audit Lapangan",
        author: "Ihsan Mahendra",
        client: "Internal audit training",
        year: 2026,
        image: "assets/gamification/audit-lapangan.webp",
        link: "audit-lapangan/",
        tags: ["Field audit", "Workplace safety", "Browser game"],
        en: { summary: "A first-person field audit game. Wear the PPE on the door sign, go in with the area PIC, inspect fire extinguishers, emergency exits, panels and more against the standard, photograph each finding, confirm it on site and rate the area by risk. Three mistakes and QA stops the audit, and every round brings new areas and new faults. Plays in English and Bahasa Indonesia." },
      },
      {
        title: "Internal Audit Simulation",
        author: "Ihsan Mahendra",
        client: "Internal audit training",
        year: 2026,
        image: "assets/gamification/internal-audit.webp",
        link: "internal-audit/",
        tags: ["Internal audit", "Compliance training", "Browser game"],
        en: { summary: "A first-person internal auditor's desk game. Check the assignment letter and your independence, match the documents, test samples against four criteria, refuse gifts and pressure, then give the right opinion. Three mistakes and QA stops the audit, and every round brings new auditees. Plays in English and Bahasa Indonesia." },
      },
      {
        title: "Meja Kasir",
        author: "Ihsan Mahendra",
        client: "Retail SOP training",
        year: 2026,
        image: "assets/gamification/meja-kasir.webp",
        link: "meja-kasir/",
        tags: ["Cashier SOP", "Retail training", "Browser game"],
        en: { summary: "A first-person cashier desk game for the checkout SOP. Greet, check the basket, scan and weigh, check ID for cigarettes, spot fake notes and fake QRIS proof, give the right change and a receipt. One mistake ends the shift, and every shift brings new customers. Plays in English and Bahasa Indonesia." },
      },
      {
        title: "Pos Jaga Lobi",
        author: "Ihsan Mahendra",
        client: "ISO 27001 awareness",
        year: 2026,
        image: "assets/gamification/pos-jaga-lobi.webp",
        link: "pos-jaga-lobi/",
        tags: ["ISO 27001", "Security awareness", "Browser game"],
        en: { summary: "A first-person lobby security desk game for the visitor reception SOP. Check IDs and letters, call the host, fill the guest book, give the right access card or refuse, then check CCTV and patrol the vital points. Three days, 15 visitors. Plays in English and Bahasa Indonesia." },
      },
      {
        title: "Clear Desk 17.00",
        author: "Ihsan Mahendra",
        client: "ISO 27001 awareness",
        year: 2026,
        image: "assets/gamification/clear-desk.webp",
        link: "clear-desk/",
        tags: ["ISO 27001", "Security awareness", "Browser game"],
        en: { summary: "A first-person desk game for the clear desk & clear screen SOP. Read each item's label, file, shred, bin or pack it before the clock runs out, then pass the audit. Every round is a new situation. Plays in English and Bahasa Indonesia." },
      },
    ],
  },
};
