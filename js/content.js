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
      email: "holydoughnut@siteprofree.email",
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
};
