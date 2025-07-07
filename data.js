
const cards = [
    {},
    {
        "num": 1,
        "faction": "ap",
        "commitment": "mobilization",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "ws": 1,
        "rpa": 1,
        "rpbr": 2,
        "rpfr": 2,
        "rpit": 1,
        "rpru": 3,
        "name": "British Reinforcements",
        "effect": "2nd Army, 1 corps.",
        "reinfnation": "br",
        "reinf": "BR 2|BRc"
    },
    {
        "num": 2,
        "faction": "ap",
        "commitment": "mobilization",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "ws": 2,
        "rpa": 1,
        "rpbr": 2,
        "rpfr": 2,
        "rpit": 1,
        "rpru": 3,
        "name": "Blockade",
        "event": "blockade",
        "effect": "Subtract 1 VP during the War Status Phase of each Winter turn."
    },
    {
        "num": 3,
        "faction": "ap",
        "commitment": "mobilization",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpit": 1,
        "rpru": 2,
        "name": "Russian Reinforcements",
        "effect": "11th Army, 1 corps.",
        "reinfnation": "ru",
        "reinf": "RU 11|RUc"
    },
    {
        "num": 4,
        "faction": "ap",
        "commitment": "mobilization",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "cc": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpru": 1,
        "name": "Pleve",
        "event": "pleve",
        "effect": "A RU attack or defense adds a +1 drm."
    },
    {
        "num": 5,
        "faction": "ap",
        "commitment": "mobilization",
        "ops": 2,
        "sr": 2,
        "cc": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpru": 1,
        "name": "Putnik",
        "event": "putnik",
        "effect": "May only be played in 1914 and 1915. A SB attack or defense adds a +1 drm."
    },
    {
        "num": 6,
        "faction": "ap",
        "commitment": "mobilization",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "cc": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpru": 1,
        "name": "Withdrawal",
        "event": "ap_withdrawal",
        "effect": "Defending units negate one required Corps step loss and instead retreat 1 space. This also cancels any retreat caused by losing the combat. If not Corps step(s) lost, an Army step loss may be negated."
    },
    {
        "num": 7,
        "faction": "ap",
        "commitment": "mobilization",
        "ops": 2,
        "sr": 2,
        "cc": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpru": 1,
        "name": "Severe Weather",
        "event": "ap_severe_weather",
        "effect": "Defending units in a mountain space in Fall/Winter or a swamp space in Spring/Fall get a +2 drm."
    },
    {
        "num": 8,
        "faction": "ap",
        "commitment": "mobilization",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpru": 1,
        "name": "Russian Reinforcements",
        "effect": "2 corps.",
        "reinfnation": "ru",
        "reinf": "RUc|RUc"
    },
    {
        "num": 9,
        "faction": "ap",
        "commitment": "mobilization",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpit": 1,
        "rpru": 2,
        "name": "Moltke",
        "event": "moltke",
        "effect": "May only be played in August or September 1914. CP Activation in Belgium or France costs 1 OPS per unit (not space) until the Falkenhayn card is played."
    },
    {
        "num": 10,
        "faction": "ap",
        "commitment": "mobilization",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpit": 1,
        "rpru": 2,
        "name": "French Reinforcements",
        "effect": "10th Army.",
        "reinfnation": "fr",
        "reinf": "FR 10"
    },
    {
        "num": 11,
        "faction": "ap",
        "commitment": "mobilization",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpit": 1,
        "rpru": 2,
        "name": "Russian Reinforcements",
        "effect": "9th Army, 10th Army.",
        "reinfnation": "ru",
        "reinf": "RU 9|RU 10"
    },
    {
        "num": 12,
        "faction": "ap",
        "commitment": "mobilization",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpit": 1,
        "rpru": 2,
        "name": "Entrench",
        "event": "ap_entrench",
        "effect": "Place a Level 1 Trench in any space occupied by a supplied friendly Army. Both players may now Entrench."
    },
    {
        "num": 13,
        "faction": "ap",
        "commitment": "mobilization",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "ws": 2,
        "rpa": 1,
        "rpbr": 2,
        "rpfr": 2,
        "rpit": 1,
        "rpru": 3,
        "name": "Rape of Belgium",
        "event": "rape_of_belgium",
        "effect": "May only be played if CP played \"Guns of August\". Subtract 1VP."
    },
    {
        "num": 14,
        "faction": "ap",
        "commitment": "mobilization",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "ws": 1,
        "rpa": 1,
        "rpbr": 2,
        "rpfr": 2,
        "rpit": 1,
        "rpru": 3,
        "name": "British Reinforcements",
        "effect": "1st Army, 1 corps.",
        "reinfnation": "br",
        "reinf": "BR 1|BRc"
    },
    {
        "num": 15,
        "faction": "ap",
        "commitment": "limited",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpit": 1,
        "rpru": 2,
        "name": "British Reinforcements",
        "effect": "4th Army, 1 corps.",
        "reinfnation": "br",
        "reinf": "BR 4|BRc"
    },
    {
        "num": 16,
        "faction": "ap",
        "commitment": "limited",
        "ops": 5,
        "sr": 5,
        "remove": true,
        "ws": 1,
        "rpa": 1,
        "rpbr": 3,
        "rpfr": 3,
        "rpit": 2,
        "rpru": 4,
        "name": "Romania",
        "event": "romania_entry",
        "effect": "May not be played after \"Fall of the Tsar\". Romania joins the Allies."
    },
    {
        "num": 17,
        "faction": "ap",
        "commitment": "limited",
        "ops": 5,
        "sr": 5,
        "remove": true,
        "ws": 2,
        "rpa": 1,
        "rpbr": 3,
        "rpfr": 3,
        "rpru": 4,
        "name": "Italy",
        "event": "italy_entry",
        "effect": "Italy joins the Allies. Add 1 VP during the War Status Phase of each turn if unplayed after Allied War Commitment Level is Total War."
    },
    {
        "num": 18,
        "faction": "ap",
        "commitment": "limited",
        "ops": 2,
        "sr": 2,
        "cc": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpru": 1,
        "name": "Hurricane Barrage",
        "event": "hurricane_barrage",
        "effect": "A BR attack adds a +1 drm."
    },
    {
        "num": 19,
        "faction": "ap",
        "commitment": "limited",
        "ops": 2,
        "sr": 2,
        "cc": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpru": 1,
        "name": "Air Superiority",
        "event": "ap_air_superiority",
        "effect": "A BR or FR attack adds +1 drm."
    },
    {
        "num": 20,
        "faction": "ap",
        "commitment": "limited",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpru": 1,
        "name": "British Reinforcements",
        "effect": "AUS Corps, CND Corps.",
        "reinfnation": "br",
        "reinf": "AUSc|CNDc"
    },
    {
        "num": 21,
        "faction": "ap",
        "commitment": "limited",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "cc": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpru": 1,
        "name": "Phosgene Gas",
        "event": "phosgene_gas",
        "effect": "A FR attack adds +1 drm."
    },
    {
        "num": 22,
        "faction": "ap",
        "commitment": "limited",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpit": 1,
        "rpru": 2,
        "name": "Italian Reinforcements",
        "effect": "May only be played after ITALY joins the Allies. 5th Army.",
        "reinfnation": "it",
        "reinf": "IT 5"
    },
    {
        "num": 23,
        "faction": "ap",
        "commitment": "limited",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpru": 1,
        "name": "Cloak and Dagger",
        "event": "cloak_and_dagger",
        "effect": "Allied player may examine all cards in the CP player's hand and then conduct Operations using this card."
    },
    {
        "num": 24,
        "faction": "ap",
        "commitment": "limited",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpit": 1,
        "rpru": 2,
        "name": "French Reinforcements",
        "effect": "7th Army.",
        "reinfnation": "fr",
        "reinf": "FR 7"
    },
    {
        "num": 25,
        "faction": "ap",
        "commitment": "limited",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpit": 1,
        "rpru": 2,
        "name": "Russian Reinforcements",
        "effect": "6th Army, 7th Army, 2 corps.",
        "reinfnation": "ru",
        "reinf": "RU 6|RU 7|RUc|RUc"
    },
    {
        "num": 26,
        "faction": "ap",
        "commitment": "limited",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "ws": 2,
        "rpbr": 1,
        "rpfr": 1,
        "rpit": 1,
        "rpru": 2,
        "name": "Lusitania",
        "event": "lusitania",
        "effect": "May only be played after \"Blockade\" and before \"Zimmermann Telegram\". Subtract 1 VP."
    },
    {
        "num": 27,
        "faction": "ap",
        "commitment": "limited",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "ws": 1,
        "rpbr": 1,
        "rpfr": 1,
        "rpit": 1,
        "rpru": 2,
        "name": "Great Retreat",
        "event": "great_retreat",
        "effect": "All RU units attacked this turn may retreat before combat. This must be announced before the die is rolled for each combat. No combat takes place. The RU unit(s) must retreat 1 space. Full strength CP units may advance."
    },
    {
        "num": 28,
        "faction": "ap",
        "commitment": "limited",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "rpa": 1,
        "rpbr": 2,
        "rpfr": 2,
        "rpit": 1,
        "rpru": 3,
        "name": "Landships",
        "event": "landships",
        "effect": "Allows play of \"Royal Tank Corps\"."
    },
    {
        "num": 29,
        "faction": "ap",
        "commitment": "limited",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "rpa": 1,
        "rpbr": 2,
        "rpfr": 2,
        "rpit": 1,
        "rpru": 3,
        "name": "Yudenitch (RU Reinforcements)",
        "effect": "Place the Russian CAU Army in any supplied space in Russia on the Near East map.",
        "reinfnation": "ru",
        "reinf": "RU CAU"
    },
    {
        "num": 30,
        "faction": "ap",
        "commitment": "limited",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "ws": 1,
        "rpa": 1,
        "rpbr": 2,
        "rpfr": 2,
        "rpit": 1,
        "rpru": 3,
        "name": "Salonika",
        "event": "salonika",
        "effect": "May SR up to 3 BR/FR Corps (from the map and/or Reserve) to Salonika. This card counts as a SR card play."
    },
    {
        "num": 31,
        "faction": "ap",
        "commitment": "limited",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "ws": 1,
        "rpa": 1,
        "rpbr": 2,
        "rpfr": 2,
        "rpit": 1,
        "rpru": 3,
        "name": "MEF (BR Reinforcements)",
        "effect": "May only be played if Turkey is at war and before \"Salonika\". Place the MEF Army at any MEF space. See 9.5.3.5.",
        "reinfnation": "br",
        "reinf": "BR MEF"
    },
    {
        "num": 32,
        "faction": "ap",
        "commitment": "limited",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpru": 1,
        "name": "Russian Reinforcements",
        "effect": "12th Army.",
        "reinfnation": "ru",
        "reinf": "RU 12"
    },
    {
        "num": 33,
        "faction": "ap",
        "commitment": "limited",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpru": 1,
        "name": "Grand Fleet",
        "event": "grand_fleet",
        "effect": "If played in the Allied Action Round immediately following the \"High Seas Fleet\", cancel that card."
    },
    {
        "num": 34,
        "faction": "ap",
        "commitment": "limited",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpit": 1,
        "rpru": 2,
        "name": "British Reinforcements",
        "effect": "3rd Army, 2 corps.",
        "reinfnation": "br",
        "reinf": "BR 3|BRc|BRc"
    },
    {
        "num": 35,
        "faction": "ap",
        "commitment": "total",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "rpa": 1,
        "rpbr": 2,
        "rpfr": 2,
        "rpit": 1,
        "rpru": 3,
        "name": "Yanks and Tanks",
        "event": "yanks_and_tanks",
        "effect": "Allied player conducts Operations using this card and all Combats involving a US unit during this Action Round get a +2 drm."
    },
    {
        "num": 36,
        "faction": "ap",
        "commitment": "total",
        "ops": 2,
        "sr": 2,
        "cc": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpru": 1,
        "name": "Mine Attack",
        "event": "mine_attack",
        "effect": "A BR attack vs. an entrenched Defender adds a +1 drm. May only be used in one Combat per turn."
    },
    {
        "num": 37,
        "faction": "ap",
        "commitment": "total",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "ws": 1,
        "rpbr": 1,
        "rpfr": 1,
        "rpru": 1,
        "name": "Independent Air Force",
        "event": "independent_air_force",
        "effect": "Cancel or prevent Rathenau Event bonus GE RP."
    },
    {
        "num": 38,
        "faction": "ap",
        "commitment": "total",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpru": 1,
        "name": "USA Reinforcements",
        "effect": "May only be played after \"Over There\". 1 corps.",
        "reinfnation": "us",
        "reinf": "USc"
    },
    {
        "num": 39,
        "faction": "ap",
        "commitment": "total",
        "ops": 2,
        "sr": 2,
        "cc": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpru": 1,
        "name": "They Shall Not Pass",
        "event": "they_shall_not_pass",
        "effect": "Cancels any retreat for losing a combat if defending in a FR fort space."
    },
    {
        "num": 40,
        "faction": "ap",
        "commitment": "total",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpru": 1,
        "name": "14 Points",
        "event": "fourteen_points",
        "effect": "May only be played after \"Zimmermann Telegram\". Only the Allied player may offer Peace Terms for the rest of the game. Subtract 1 VP."
    },
    {
        "num": 41,
        "faction": "ap",
        "commitment": "total",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpit": 1,
        "rpru": 2,
        "name": "Arab Northern Army (BR Reinforcements)",
        "effect": "May only be played if Turkey is at war. Place the British ANA Corps in the Arabia space.",
        "reinfnation": "br",
        "reinf": "BR ANAc"
    },
    {
        "num": 42,
        "faction": "ap",
        "commitment": "total",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpit": 1,
        "rpru": 2,
        "name": "British Reinforcements",
        "effect": "5th Army, 1 corps, PT Corps.",
        "reinfnation": "br",
        "reinf": "BR 5|BRc|PTc"
    },
    {
        "num": 43,
        "faction": "ap",
        "commitment": "total",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpit": 1,
        "rpru": 2,
        "name": "USA Reinforcements",
        "effect": "May only be played after \"Over There\". 1st Army, 2 corps.",
        "reinfnation": "us",
        "reinf": "US 1|USc|USc"
    },
    {
        "num": 44,
        "faction": "ap",
        "commitment": "total",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "ws": 1,
        "rpbr": 1,
        "rpfr": 1,
        "rpit": 1,
        "rpru": 2,
        "name": "Greece",
        "event": "greece_entry",
        "effect": "Greece joins the Allies."
    },
    {
        "num": 45,
        "faction": "ap",
        "commitment": "total",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "cc": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpit": 1,
        "rpru": 2,
        "name": "Kerensky Offensive",
        "event": "kerensky_offensive",
        "effect": "May only be played after \"Fall of Tsar\" and before the \"Bolshevik Revolution\". Allied player conducts Operations using this card and one RU attack vs. a space with any AH, BU or TU units adds a +2 drm."
    },
    {
        "num": 46,
        "faction": "ap",
        "commitment": "total",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "ws": 2,
        "rpa": 1,
        "rpbr": 2,
        "rpfr": 2,
        "rpit": 1,
        "rpru": 3,
        "name": "Brusilov Offensive",
        "event": "brusilov_offensive",
        "effect": "Allied player conducts Operations using this card and adds a +1 drm to ALL RU attacks this Action Round. Also, for 1 RU attack vs. only non-GE CP units cancel all trench effects."
    },
    {
        "num": 47,
        "faction": "ap",
        "commitment": "total",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "rpa": 1,
        "rpbr": 2,
        "rpfr": 2,
        "rpit": 1,
        "rpru": 3,
        "name": "USA Reinforcements",
        "effect": "May only be played after \"Over There\". 2nd Army, 1 corps.",
        "reinfnation": "us",
        "reinf": "US 2|USc"
    },
    {
        "num": 48,
        "faction": "ap",
        "commitment": "total",
        "ops": 4,
        "sr": 4,
        "cc": true,
        "rpa": 1,
        "rpbr": 2,
        "rpfr": 2,
        "rpit": 1,
        "rpru": 3,
        "name": "Royal Tank Corps",
        "event": "royal_tank_corps",
        "effect": "May only be played after \"Landships\". Cancels trench column shifts for a BR attack against a clear space in France/Belgium. May only be used in 1 Combat per turn."
    },
    {
        "num": 49,
        "faction": "ap",
        "commitment": "total",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "rpa": 1,
        "rpbr": 2,
        "rpfr": 2,
        "rpit": 1,
        "rpru": 3,
        "name": "Sinai Pipeline",
        "event": "sinai_pipeline",
        "effect": "Cancels Sinai -3 drm for Allied units only. Summer turn desert effects remain. Allows play of \"Allenby\"."
    },
    {
        "num": 50,
        "faction": "ap",
        "commitment": "total",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "ws": 1,
        "rpa": 1,
        "rpbr": 2,
        "rpfr": 2,
        "rpit": 1,
        "rpru": 3,
        "name": "Allenby (BR Reinforcements)",
        "effect": "May only be played after \"Sinai Pipeline\". Place the British NE Army in Alexandria.",
        "reinfnation": "br",
        "reinf": "BR NE"
    },
    {
        "num": 51,
        "faction": "ap",
        "commitment": "total",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "ws": 1,
        "rpa": 1,
        "rpbr": 2,
        "rpfr": 2,
        "rpit": 1,
        "rpru": 3,
        "name": "Everyone Into Battle",
        "event": "everyone_into_battle",
        "effect": "May only be played after at least one of the following has occurred: \"Blucher,\" \"Michael\" or \"Peace Offensive\". Allied units in Italy, France and Belgium are considered one nationality for Activation for the rest of this turn (only)."
    },
    {
        "num": 52,
        "faction": "ap",
        "commitment": "total",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "rpa": 1,
        "rpbr": 2,
        "rpfr": 2,
        "rpit": 1,
        "rpru": 3,
        "name": "Convoy",
        "event": "convoy",
        "effect": "May only be played after \"U-Boats Unleashed\". Cancels effects of that card. Subtract 1VP."
    },
    {
        "num": 53,
        "faction": "ap",
        "commitment": "total",
        "ops": 5,
        "sr": 5,
        "remove": true,
        "rpa": 1,
        "rpbr": 3,
        "rpfr": 3,
        "rpit": 2,
        "rpru": 4,
        "name": "Army of the Orient (FR Reinforcements)",
        "effect": "Place the French Orient Army in the Salonika space if Allied controlled, subject to stacking limits.",
        "reinfnation": "fr",
        "reinf": "FR Orient"
    },
    {
        "num": 54,
        "faction": "ap",
        "commitment": "total",
        "ops": 5,
        "sr": 5,
        "remove": true,
        "ws": 2,
        "rpa": 1,
        "rpbr": 3,
        "rpfr": 3,
        "rpit": 2,
        "rpru": 4,
        "name": "Zimmermann Telegram",
        "event": "zimmermann_telegram",
        "effect": "May only be played if U.S. entry marker is in the \"Zimmerman Telegram Allowed\" box. Subtract 1 VP. US joins the Allies. Allows play of \"Over There\" card on any following turn."
    },
    {
        "num": 55,
        "faction": "ap",
        "commitment": "total",
        "ops": 5,
        "sr": 5,
        "remove": true,
        "rpa": 1,
        "rpbr": 3,
        "rpfr": 3,
        "rpit": 2,
        "rpru": 4,
        "name": "Over There",
        "event": "over_there",
        "effect": "May only be played after \"Zimmerman Telegram\". Allows play of \"US Reinforcements\" on any following turns. ALL Allied RP cards played now include 1 US RP."
    },
    {
        "num": 56,
        "faction": "ap",
        "commitment": "mobilization",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpru": 1,
        "name": "Paris Taxis",
        "event": "paris_taxis",
        "effect": "Allied player receives 1 extra RP to immediately flip a reduced French Army in or adjacent to Paris to its full strength side. The RP may not be spent to replace an eliminated unit."
    },
    {
        "num": 57,
        "faction": "ap",
        "commitment": "mobilization",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpit": 1,
        "rpru": 2,
        "name": "Russian Cavalry",
        "event": "russian_cavalry",
        "effect": "Place the two Russian Cavalry corps in any one space inside Russia containing a supplied Russian Army. They may not be placed in violation of the stacking limit."
    },
    {
        "num": 58,
        "faction": "ap",
        "commitment": "limited",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "cc": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpru": 1,
        "name": "Russian Guards",
        "event": "russian_guards",
        "effect": "A Russian attack adds +1drm."
    },
    {
        "num": 59,
        "faction": "ap",
        "commitment": "limited",
        "ops": 2,
        "sr": 2,
        "cc": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpru": 1,
        "name": "Alpine Troops",
        "event": "alpine_troops",
        "effect": "An attack with IT units (only) adds +1drm."
    },
    {
        "num": 60,
        "faction": "ap",
        "commitment": "limited",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpit": 1,
        "rpru": 2,
        "name": "Czech Legion",
        "event": "czech_legion",
        "effect": "Remove from the game 1 AH Corps from the CP Eliminated/Replacement Box. Add the RU Czech Legion corps to the Allied Reserve Box."
    },
    {
        "num": 61,
        "faction": "ap",
        "commitment": "limited",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "cc": true,
        "rpa": 1,
        "rpbr": 2,
        "rpfr": 2,
        "rpit": 1,
        "rpru": 3,
        "name": "Maude",
        "event": "maude",
        "effect": "Any one attack made by BR units tracing supply to Basra may fire on the Army Table."
    },
    {
        "num": 62,
        "faction": "ap",
        "commitment": "total",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "ws": 1,
        "rpbr": 1,
        "rpfr": 1,
        "rpru": 1,
        "name": "The Sixtus Affair",
        "event": "the_sixtus_affair",
        "effect": "Roll on the Allied 0-19 Peace Term Table. This is not a normal Peace Offer and may not be accepted for a draw."
    },
    {
        "num": 63,
        "faction": "ap",
        "commitment": "total",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "cc": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpit": 1,
        "rpru": 2,
        "name": "Backs To The Wall",
        "event": "backs_to_the_wall",
        "effect": "A space with a BR Army in France/Belgium may cancel any one mandated retreat."
    },
    {
        "num": 64,
        "faction": "ap",
        "commitment": "total",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpbr": 1,
        "rpfr": 1,
        "rpit": 1,
        "rpru": 2,
        "name": "USA Reinforcements",
        "effect": "May only be played after 'Over There'. 2 Corps [2-1-4/1-1-4]",
        "reinfnation": "us",
        "reinf": "USc|USc"
    },
    {
        "num": 65,
        "faction": "ap",
        "commitment": "total",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "rpa": 1,
        "rpbr": 2,
        "rpfr": 2,
        "rpit": 1,
        "rpru": 3,
        "name": "Influenza",
        "event": "influenza",
        "effect": "May be played if Combined War status is 30+. Neither side may perform RP actions for the rest of this turn. Already played RPs are not lost."
    },
    {
        "num": 1,
        "faction": "cp",
        "commitment": "mobilization",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "ws": 2,
        "rpah": 1,
        "rpge": 2,
        "rptu": 1,
        "name": "Guns of August",
        "event": "guns_of_august",
        "effect": "May only be played in the first Action Round of the August 1914 turn. The Liege fort is destroyed. Place the GE 1st and 2nd Armies in the Liege space. The GE 1st, 2nd, and 3rd Armies are activated for Combat."
    },
    {
        "num": 2,
        "faction": "cp",
        "commitment": "mobilization",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "cc": true,
        "rpge": 1,
        "name": "Wireless Intercepts",
        "event": "wireless_intercepts",
        "effect": "A GE Flank Attack Attempt vs. a space containing only RU units is automatically successful."
    },
    {
        "num": 3,
        "faction": "cp",
        "commitment": "mobilization",
        "ops": 2,
        "sr": 2,
        "cc": true,
        "rpge": 1,
        "name": "Von Francois",
        "event": "von_francois",
        "effect": "A GE attack vs. RU units adds a +1 drm."
    },
    {
        "num": 4,
        "faction": "cp",
        "commitment": "mobilization",
        "ops": 2,
        "sr": 2,
        "cc": true,
        "rpge": 1,
        "name": "Severe Weather",
        "event": "cp_severe_weather",
        "effect": "Defending units in a mountain space in Fall/Winter or a swamp space in Spring/Fall get a +2 drm."
    },
    {
        "num": 5,
        "faction": "cp",
        "commitment": "mobilization",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "rpge": 1,
        "name": "Landwehr",
        "event": "landwehr",
        "effect": "CP player receives 2 extra RPs to immediately flip reduced strength units to their full side. They may not be spent to replace eliminated units."
    },
    {
        "num": 6,
        "faction": "cp",
        "commitment": "mobilization",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpah": 1,
        "rpge": 2,
        "rptu": 1,
        "name": "Entrench",
        "event": "cp_entrench",
        "effect": "Place a Level 1 Trench in any space occupied by a supplied friendly Army. Both players may now Entrench."
    },
    {
        "num": 7,
        "faction": "cp",
        "commitment": "mobilization",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpah": 1,
        "rpge": 2,
        "rptu": 1,
        "name": "German Reinforcements",
        "effect": "9th Army.",
        "reinfnation": "ge",
        "reinf": "GE 9"
    },
    {
        "num": 8,
        "faction": "cp",
        "commitment": "mobilization",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpah": 1,
        "rpge": 2,
        "rptu": 1,
        "name": "Race to the Sea",
        "event": "race_to_the_sea",
        "effect": "CP units may now end movement in Ostend, Calais, and Amiens."
    },
    {
        "num": 9,
        "faction": "cp",
        "commitment": "mobilization",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "ws": 1,
        "rpah": 2,
        "rpbu": 1,
        "rpge": 3,
        "rptu": 1,
        "name": "Reichstag Truce",
        "event": "reichstag_truce",
        "effect": "May not be played after CP War Commitment Level is Total War. Add 1 VP."
    },
    {
        "num": 10,
        "faction": "cp",
        "commitment": "mobilization",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpah": 1,
        "rpge": 2,
        "rptu": 1,
        "name": "SUD Army",
        "event": "sud_army",
        "effect": "Up to 2 GE corps may stack with any 1 AH unit and be Activated as a single nationality. A different stack may be chosen each Action Round."
    },
    {
        "num": 11,
        "faction": "cp",
        "commitment": "mobilization",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "ws": 1,
        "rpge": 1,
        "name": "Oberost",
        "event": "oberost",
        "effect": "German units may now attack spaces containing RU forts. (They may always besiege such spaces.)"
    },
    {
        "num": 12,
        "faction": "cp",
        "commitment": "mobilization",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "rpah": 2,
        "rpbu": 1,
        "rpge": 3,
        "rptu": 1,
        "name": "German Reinforcements",
        "effect": "10th Army, 2 corps.",
        "reinfnation": "ge",
        "reinf": "GE 10|GEc|GEc"
    },
    {
        "num": 13,
        "faction": "cp",
        "commitment": "mobilization",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "ws": 2,
        "rpah": 2,
        "rpbu": 1,
        "rpge": 3,
        "rptu": 1,
        "name": "Falkenhayn",
        "event": "falkenhayn",
        "effect": "May only be played on Aug/Sep 1914 turns only after the \"Moltke\" is played or without restriction beginning in Fall 1914. Cancels the effects of \"Moltke\". Allows play of \"Place of Execution\""
    },
    {
        "num": 14,
        "faction": "cp",
        "commitment": "mobilization",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "rpah": 2,
        "rpbu": 1,
        "rpge": 3,
        "rptu": 1,
        "name": "Austria",
        "effect": "Hungary Reinforcements - 7th Army, 2 corps.",
        "reinfnation": "ah",
        "reinf": "AH 7|AHc|AHc"
    },
    {
        "num": 15,
        "faction": "cp",
        "commitment": "limited",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "cc": true,
        "rpge": 1,
        "name": "Chlorine Gas",
        "event": "chlorine_gas",
        "effect": "A GE attack adds +1 drm."
    },
    {
        "num": 16,
        "faction": "cp",
        "commitment": "limited",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "cc": true,
        "rpge": 1,
        "name": "Liman Von Sanders",
        "event": "liman_von_sanders",
        "effect": "A TU attack or defense adds a +1 drm."
    },
    {
        "num": 17,
        "faction": "cp",
        "commitment": "limited",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "rpge": 1,
        "name": "Mata Hari",
        "event": "mata_hari",
        "effect": "CP player may examine all cards in the Allied player's hand and then conduct Operations using this card."
    },
    {
        "num": 18,
        "faction": "cp",
        "commitment": "limited",
        "ops": 2,
        "sr": 2,
        "cc": true,
        "rpge": 1,
        "name": "Fortified Machine Guns",
        "event": "fortified_machine_guns",
        "effect": "A GE entrenched defender adds a +1 drm."
    },
    {
        "num": 19,
        "faction": "cp",
        "commitment": "limited",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "cc": true,
        "rpge": 1,
        "name": "Flamethrowers",
        "event": "flamethrowers",
        "effect": "A GE attack adds +1 drm."
    },
    {
        "num": 20,
        "faction": "cp",
        "commitment": "limited",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpah": 1,
        "rpge": 2,
        "rptu": 1,
        "name": "Austria",
        "effect": "Hungary Reinforcements - 10th Army.",
        "reinfnation": "ah",
        "reinf": "AH 10"
    },
    {
        "num": 21,
        "faction": "cp",
        "commitment": "limited",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpah": 1,
        "rpge": 2,
        "rptu": 1,
        "name": "German Reinforcements",
        "effect": "11th Army, 1 corps.",
        "reinfnation": "ge",
        "reinf": "GE 11|GEc"
    },
    {
        "num": 22,
        "faction": "cp",
        "commitment": "limited",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpah": 1,
        "rpge": 2,
        "rptu": 1,
        "name": "German Reinforcements",
        "effect": "12th Army, 1 corps.",
        "reinfnation": "ge",
        "reinf": "GE 12|GEc"
    },
    {
        "num": 23,
        "faction": "cp",
        "commitment": "limited",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpah": 1,
        "rpge": 2,
        "rptu": 1,
        "name": "Austria - Hungary Reinforcements",
        "effect": "11th Army.",
        "reinfnation": "ah",
        "reinf": "AH 11"
    },
    {
        "num": 24,
        "faction": "cp",
        "commitment": "limited",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpah": 1,
        "rpge": 2,
        "rptu": 1,
        "name": "Libyan Revolt (TU Reinforcements)",
        "effect": "(May only be played if there are no Allied units in the Libya space.) Place the SN unit in Libya.",
        "reinfnation": "tu",
        "reinf": "TU SNc"
    },
    {
        "num": 25,
        "faction": "cp",
        "commitment": "limited",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "rpah": 2,
        "rpbu": 1,
        "rpge": 3,
        "rptu": 1,
        "name": "High Seas Fleet",
        "event": "high_seas_fleet",
        "effect": "High Seas Fleet sorties. Unless the Allied player plays the \"Grand Fleet\" as his next action, add 1 VP."
    },
    {
        "num": 26,
        "faction": "cp",
        "commitment": "limited",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "cc": true,
        "ws": 1,
        "rpah": 2,
        "rpbu": 1,
        "rpge": 3,
        "rptu": 1,
        "name": "Place of Execution",
        "event": "place_of_execution",
        "effect": "May only be played after the \"Falkenhayn\" and before the \"H-L Take Command\". An attack vs. FR fort space adds a +2 drm."
    },
    {
        "num": 27,
        "faction": "cp",
        "commitment": "limited",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "ws": 1,
        "rpah": 2,
        "rpbu": 1,
        "rpge": 3,
        "rptu": 1,
        "name": "Zeppelin Raids",
        "event": "zeppelin_raids",
        "effect": "Subtract 4 BR RPs (down to 0) during the Replacement Phase of this turn."
    },
    {
        "num": 28,
        "faction": "cp",
        "commitment": "limited",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "ws": 1,
        "rpah": 2,
        "rpbu": 1,
        "rpge": 3,
        "rptu": 1,
        "name": "Tsar Takes Command",
        "event": "tsar_takes_command",
        "effect": "May only be played if the Russian Capitulation marker is in the \"Tsar Takes Command Allowed\" box."
    },
    {
        "num": 29,
        "faction": "cp",
        "commitment": "limited",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "rpge": 1,
        "name": "11th Army",
        "event": "eleventh_army",
        "effect": "The GE 11th Army (only) may freely stack with any CP corps and be treated as 1 unit for Activation purposes."
    },
    {
        "num": 30,
        "faction": "cp",
        "commitment": "limited",
        "ops": 2,
        "sr": 2,
        "cc": true,
        "rpge": 1,
        "name": "Alpenkorps",
        "event": "alpenkorps",
        "effect": "A GE attack to or from a mountain space adds +1 drm."
    },
    {
        "num": 31,
        "faction": "cp",
        "commitment": "limited",
        "ops": 3,
        "sr": 4,
        "cc": true,
        "rpah": 1,
        "rpge": 2,
        "rptu": 1,
        "name": "Kemal",
        "event": "kemal",
        "effect": "A TU defender with a combat factor of 1 or more may fire on the Army Table. May only be used in one Combat per turn."
    },
    {
        "num": 32,
        "faction": "cp",
        "commitment": "limited",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "ws": 1,
        "rpah": 1,
        "rpge": 2,
        "rptu": 1,
        "name": "War in Africa",
        "event": "war_in_africa",
        "effect": "Permanently remove 1 BR corps from the game or add 1 VP (Allied choice)."
    },
    {
        "num": 33,
        "faction": "cp",
        "commitment": "limited",
        "ops": 5,
        "sr": 5,
        "remove": true,
        "ws": 2,
        "rpah": 3,
        "rpbu": 1,
        "rpge": 4,
        "rptu": 2,
        "name": "Walter Rathenau",
        "event": "walter_rathenau",
        "effect": "Add 1 extra GE RP during the Replacement Phase of every turn."
    },
    {
        "num": 34,
        "faction": "cp",
        "commitment": "limited",
        "ops": 5,
        "sr": 5,
        "remove": true,
        "ws": 2,
        "rpah": 3,
        "rpge": 4,
        "rptu": 2,
        "name": "Bulgaria",
        "event": "bulgaria_entry",
        "effect": "Bulgaria joins the CP."
    },
    {
        "num": 35,
        "faction": "cp",
        "commitment": "total",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "cc": true,
        "rpge": 1,
        "name": "Mustard Gas",
        "event": "mustard_gas",
        "effect": "A GE attack adds a +1 drm."
    },
    {
        "num": 36,
        "faction": "cp",
        "commitment": "total",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "ws": 2,
        "rpge": 1,
        "name": "U-Boats Unleashed",
        "event": "uboats_unleashed",
        "effect": "May only be played after \"H-L Take Command\". Subtract 1 BR RP during the Repl. Phase of each turn and prevent play of US Reinforcements until \"Convoy\" is played."
    },
    {
        "num": 37,
        "faction": "cp",
        "commitment": "total",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "ws": 1,
        "rpge": 1,
        "name": "Hoffmann",
        "event": "hoffmann",
        "effect": "May only be played after \"H-L Take Command\". Adds +1 to all future CP Mandated Offensive die rolls."
    },
    {
        "num": 38,
        "faction": "cp",
        "commitment": "total",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "rpge": 1,
        "name": "German Reinforcements",
        "effect": "2 corps.",
        "reinfnation": "ge",
        "reinf": "GEc|GEc"
    },
    {
        "num": 39,
        "faction": "cp",
        "commitment": "total",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "rpge": 1,
        "name": "German Reinforcements",
        "effect": "2 corps.",
        "reinfnation": "ge",
        "reinf": "GEc|GEc"
    },
    {
        "num": 40,
        "faction": "cp",
        "commitment": "total",
        "ops": 3,
        "sr": 4,
        "cc": true,
        "rpah": 1,
        "rpge": 2,
        "rptu": 1,
        "name": "Air Superiority",
        "event": "cp_air_superiority",
        "effect": "A GE attack adds +1 drm."
    },
    {
        "num": 41,
        "faction": "cp",
        "commitment": "total",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpah": 1,
        "rpge": 2,
        "rptu": 1,
        "name": "German Reinforcements",
        "effect": "14th Army.",
        "reinfnation": "ge",
        "reinf": "GE 14"
    },
    {
        "num": 42,
        "faction": "cp",
        "commitment": "total",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpah": 1,
        "rpge": 2,
        "rptu": 1,
        "name": "Turkish Reinforcements",
        "effect": "YLD.",
        "reinfnation": "tu",
        "reinf": "TU YLD"
    },
    {
        "num": 43,
        "faction": "cp",
        "commitment": "total",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "cc": true,
        "rpah": 1,
        "rpge": 2,
        "rptu": 1,
        "name": "Von Below",
        "event": "von_below",
        "effect": "Cancels all trench effects for 1 attack against only IT unit(s)."
    },
    {
        "num": 44,
        "faction": "cp",
        "commitment": "total",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "cc": true,
        "rpah": 1,
        "rpge": 2,
        "rptu": 1,
        "name": "Von Hutier",
        "event": "von_hutier",
        "effect": "Attacker fires first and cancels all trench effects for an attack against RU unit(s)."
    },
    {
        "num": 45,
        "faction": "cp",
        "commitment": "total",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "ws": 1,
        "rpah": 2,
        "rpbu": 1,
        "rpge": 3,
        "rptu": 1,
        "name": "Treaty of Brest Litovsk",
        "event": "treaty_of_brest_litovsk",
        "effect": "May only be played after \"Bolshevik Revolution\". RU units may no longer attack. CP units may not attack RU units except TU units may attack on the Near East map. Also see 5.5.2."
    },
    {
        "num": 46,
        "faction": "cp",
        "commitment": "total",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "rpah": 2,
        "rpbu": 1,
        "rpge": 3,
        "rptu": 1,
        "name": "German Reinforcements",
        "effect": "17th Army, 18th Army.",
        "reinfnation": "ge",
        "reinf": "GE 17|GE 18"
    },
    {
        "num": 47,
        "faction": "cp",
        "commitment": "total",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "ws": 1,
        "rpah": 2,
        "rpbu": 1,
        "rpge": 3,
        "rptu": 1,
        "name": "French Mutiny",
        "event": "french_mutiny",
        "effect": "Effects of Mandated FR Offensives are reversed. If any FR units not stacked with US units attack on a FR MO turn, add 1 VP."
    },
    {
        "num": 48,
        "faction": "cp",
        "commitment": "total",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "rpah": 2,
        "rpbu": 1,
        "rpge": 3,
        "rptu": 1,
        "name": "Turkish Reinforcements",
        "effect": "AoI Army.",
        "reinfnation": "tu",
        "reinf": "TU AoI"
    },
    {
        "num": 49,
        "faction": "cp",
        "commitment": "total",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "cc": true,
        "ws": 1,
        "rpah": 2,
        "rpbu": 1,
        "rpge": 3,
        "rptu": 1,
        "name": "Michael",
        "event": "michael",
        "effect": "May only be played after \"H-L Take Command\". Cancels all trench effects fro 1 GE attack and adds a + 1 drm for that attack."
    },
    {
        "num": 50,
        "faction": "cp",
        "commitment": "total",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "cc": true,
        "rpah": 2,
        "rpbu": 1,
        "rpge": 3,
        "rptu": 1,
        "name": "Blucher",
        "event": "blucher",
        "effect": "May only be played after \"H-L Take Command\". Cancels all trench effects for 1 GE attack."
    },
    {
        "num": 51,
        "faction": "cp",
        "commitment": "total",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "cc": true,
        "rpah": 2,
        "rpbu": 1,
        "rpge": 3,
        "rptu": 1,
        "name": "Peace Offensive",
        "event": "peace_offensive",
        "effect": "May only be played after \"H-L Take Command\". Cancels all trench effects for 1 GE attack. If attacker does not advance into the space, subtract 1 VP."
    },
    {
        "num": 52,
        "faction": "cp",
        "commitment": "total",
        "ops": 5,
        "sr": 5,
        "remove": true,
        "rpah": 3,
        "rpbu": 1,
        "rpge": 4,
        "rptu": 2,
        "name": "Fall of the Tsar",
        "event": "fall_of_the_tsar",
        "effect": "May only be played if Russian Capitulation marker is in the \"Fall of Tsar Allowed\" box. Add 1 VP plus an additional 2 VP if RO is still neutral. RU Activation costs 1 OPS per unit, not space, for Combat only."
    },
    {
        "num": 53,
        "faction": "cp",
        "commitment": "total",
        "ops": 5,
        "sr": 5,
        "remove": true,
        "rpah": 3,
        "rpbu": 1,
        "rpge": 4,
        "rptu": 2,
        "name": "Bolshevik Revolution",
        "event": "bolshevik_revolution",
        "effect": "May only be played if Russian Capitulation marker is in the \"Bolshevik Revolution Allowed\" box. No more than 1 RU RP may be spent each turn."
    },
    {
        "num": 54,
        "faction": "cp",
        "commitment": "total",
        "ops": 5,
        "sr": 5,
        "remove": true,
        "ws": 2,
        "rpah": 3,
        "rpbu": 1,
        "rpge": 4,
        "rptu": 2,
        "name": "H-L Take Command",
        "event": "h_l_take_command",
        "effect": "Allows play of \"Michael\", \"Blucher\", \"Peace Offensive\", \"Hoffman\", and \"U-Boats Unleashed\". Prevents play of \"Place of Execution\"."
    },
    {
        "num": 55,
        "faction": "cp",
        "commitment": "total",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "rpah": 2,
        "rpbu": 1,
        "rpge": 3,
        "rptu": 1,
        "name": "Lloyd George",
        "event": "lloyd_george",
        "effect": "No BR attacks vs. Level 2 entrenched GE units may be made for the rest of this turn. This effect is canceled by play of MICHAEL, BLUCHER, or PEACE OFFENSIVE events."
    },
    {
        "num": 56,
        "faction": "cp",
        "commitment": "mobilization",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "cc": true,
        "rpge": 1,
        "name": "Withdrawal",
        "event": "cp_withdrawal",
        "effect": "Defending units negate one required Corps step loss and instead retreat 1 space. This also cancels any retreat caused by losing the combat. If no Corps step(s) lost, an Army step loss may be negated."
    },
    {
        "num": 57,
        "faction": "cp",
        "commitment": "mobilization",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "cc": true,
        "rpah": 1,
        "rpge": 2,
        "rptu": 1,
        "name": "Kaisertreu",
        "event": "kaisertreu",
        "effect": "An AH attack or defence adds +1drm."
    },
    {
        "num": 58,
        "faction": "cp",
        "commitment": "limited",
        "ops": 2,
        "sr": 2,
        "rpge": 1,
        "name": "Stavka Timidity",
        "event": "stavka_timidity",
        "effect": "May be played after \"Tsar Takes Command\". No RU attacks vs. entrenched GE units (only) the rest of this turn. Mixed CP stacks may be attacked."
    },
    {
        "num": 59,
        "faction": "cp",
        "commitment": "limited",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpah": 1,
        "rpge": 2,
        "rptu": 1,
        "name": "Polish Restoration",
        "event": "polish_restoration",
        "effect": "May be played if the CP currently controls Warsaw. Subtract 1 VP. Add the three Polish Corps to the CP Reserve Box. These Corps are treated as German for all purposes but may not be relpaced if Warsaw is Allied."
    },
    {
        "num": 60,
        "faction": "cp",
        "commitment": "limited",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "cc": true,
        "rpah": 1,
        "rpge": 2,
        "rptu": 1,
        "name": "Turk Determination",
        "event": "turk_determination",
        "effect": "A TU Defender in any non-trench space is considered at Trench Level 1 for all purposes for that combat only."
    },
    {
        "num": 61,
        "faction": "cp",
        "commitment": "limited",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "rpah": 2,
        "rpbu": 1,
        "rpge": 3,
        "rptu": 1,
        "name": "Haig",
        "event": "haig",
        "effect": "Entrenched GE units in France/Belgium/Germany may ignore all retreat results vs. attacks with BR units this turn. No effect after play of Michael, Blucher, Peace Offensive."
    },
    {
        "num": 62,
        "faction": "cp",
        "commitment": "total",
        "ops": 2,
        "sr": 2,
        "remove": true,
        "cc": true,
        "rpge": 1,
        "name": "Achtung: Panzer",
        "event": "achtung_panzer",
        "effect": "A GE attack vs. a clear space adds +1 drm."
    },
    {
        "num": 63,
        "faction": "cp",
        "commitment": "total",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "rpah": 1,
        "rpge": 2,
        "rptu": 1,
        "name": "Russian Desertions",
        "event": "russian_desertions",
        "effect": "May be played after \"Fall Of The Tsar\".  CP may reduce four 2-step RU units."
    },
    {
        "num": 64,
        "faction": "cp",
        "commitment": "total",
        "ops": 3,
        "sr": 4,
        "remove": true,
        "cc": true,
        "rpah": 1,
        "rpge": 2,
        "rptu": 1,
        "name": "Alberich",
        "event": "alberich",
        "effect": "May not be used if Allies play \"Royal Tank Corps\" or \"Yanks and Tanks\".  Cancels any one Allied attack in France/Belgium. Any Allied CC cards are considered not played."
    },
    {
        "num": 65,
        "faction": "cp",
        "commitment": "total",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "ws": 3,
        "rpah": 2,
        "rpbu": 1,
        "rpge": 3,
        "rptu": 1,
        "name": "Prince Max",
        "event": "prince_max",
        "effect": "May not be played after turn 16. Increases War Status by 3."
    }
]

const pieces = [
    {},
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE 1",
        "type": "army",
        "counter": "army_ge army_ix_1",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE 2",
        "type": "army",
        "counter": "army_ge army_ix_2",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE 3",
        "type": "army",
        "counter": "army_ge army_ix_3",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE 4",
        "type": "army",
        "counter": "army_ge army_ix_4",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE 5",
        "type": "army",
        "counter": "army_ge army_ix_5",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE 6",
        "type": "army",
        "counter": "army_ge army_ix_6",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE 7",
        "type": "army",
        "counter": "army_ge army_ix_7",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE 8",
        "type": "army",
        "counter": "army_ge army_ix_8",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE 9",
        "type": "army",
        "counter": "army_ge army_ix_9",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE 10",
        "type": "army",
        "counter": "army_ge army_ix_10",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE 11",
        "type": "army",
        "counter": "army_ge army_ix_11",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE 12",
        "type": "army",
        "counter": "army_ge army_ix_12",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE 14",
        "type": "army",
        "counter": "army_ge army_ix_13",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE 17",
        "type": "army",
        "counter": "army_ge army_ix_14",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE 18",
        "type": "army",
        "counter": "army_ge army_ix_15",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "AH 1",
        "type": "army",
        "counter": "army_ah army_ix_1",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3,
        "rptype": "ah"
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "AH 2",
        "type": "army",
        "counter": "army_ah army_ix_2",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3,
        "rptype": "ah"
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "AH 3",
        "type": "army",
        "counter": "army_ah army_ix_3",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3,
        "rptype": "ah"
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "AH 4",
        "type": "army",
        "counter": "army_ah army_ix_4",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3,
        "rptype": "ah"
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "AH 5",
        "type": "army",
        "counter": "army_ah army_ix_5",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3,
        "rptype": "ah"
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "AH 6",
        "type": "army",
        "counter": "army_ah army_ix_6",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3,
        "rptype": "ah"
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "AH 7",
        "type": "army",
        "counter": "army_ah army_ix_7",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3,
        "rptype": "ah"
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "AH 10",
        "type": "army",
        "counter": "army_ah army_ix_8",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3,
        "rptype": "ah"
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "AH 11",
        "type": "army",
        "counter": "army_ah army_ix_9",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3,
        "rptype": "ah"
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "IT 1",
        "type": "army",
        "counter": "army_it army_ix_1",
        "cf": 2,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3,
        "rptype": "it"
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "IT 2",
        "type": "army",
        "counter": "army_it army_ix_2",
        "cf": 2,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3,
        "rptype": "it"
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "IT 3",
        "type": "army",
        "counter": "army_it army_ix_3",
        "cf": 2,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3,
        "rptype": "it"
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "IT 4",
        "type": "army",
        "counter": "army_it army_ix_4",
        "cf": 2,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3,
        "rptype": "it"
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "IT 5",
        "type": "army",
        "counter": "army_it army_ix_5",
        "cf": 2,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3,
        "rptype": "it"
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TU YLD",
        "type": "army",
        "counter": "army_tu army_ix_2",
        "cf": 1,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 2,
        "notreplaceable": true,
        "neareast": true
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TU AoI",
        "type": "army",
        "counter": "army_tu army_ix_1",
        "cf": 1,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 2,
        "notreplaceable": true,
        "neareast": true
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FR 1",
        "type": "army",
        "counter": "army_fr army_ix_1",
        "cf": 3,
        "lf": 3,
        "mf": 3,
        "rcf": 2,
        "rlf": 3,
        "rmf": 3,
        "rptype": "fr"
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FR 2",
        "type": "army",
        "counter": "army_fr army_ix_2",
        "cf": 3,
        "lf": 3,
        "mf": 3,
        "rcf": 2,
        "rlf": 3,
        "rmf": 3,
        "rptype": "fr"
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FR 3",
        "type": "army",
        "counter": "army_fr army_ix_3",
        "cf": 3,
        "lf": 3,
        "mf": 3,
        "rcf": 2,
        "rlf": 3,
        "rmf": 3,
        "rptype": "fr"
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FR 4",
        "type": "army",
        "counter": "army_fr army_ix_4",
        "cf": 3,
        "lf": 3,
        "mf": 3,
        "rcf": 2,
        "rlf": 3,
        "rmf": 3,
        "rptype": "fr"
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FR 5",
        "type": "army",
        "counter": "army_fr army_ix_5",
        "cf": 3,
        "lf": 3,
        "mf": 3,
        "rcf": 2,
        "rlf": 3,
        "rmf": 3,
        "rptype": "fr"
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FR 6",
        "type": "army",
        "counter": "army_fr army_ix_6",
        "cf": 3,
        "lf": 3,
        "mf": 3,
        "rcf": 2,
        "rlf": 3,
        "rmf": 3,
        "rptype": "fr"
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FR 7",
        "type": "army",
        "counter": "army_fr army_ix_7",
        "cf": 3,
        "lf": 3,
        "mf": 3,
        "rcf": 2,
        "rlf": 3,
        "rmf": 3,
        "rptype": "fr"
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FR 9",
        "type": "army",
        "counter": "army_fr army_ix_8",
        "cf": 3,
        "lf": 3,
        "mf": 3,
        "rcf": 2,
        "rlf": 3,
        "rmf": 3,
        "rptype": "fr"
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FR 10",
        "type": "army",
        "counter": "army_fr army_ix_9",
        "cf": 3,
        "lf": 3,
        "mf": 3,
        "rcf": 2,
        "rlf": 3,
        "rmf": 3,
        "rptype": "fr"
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FR Orient",
        "type": "army",
        "counter": "army_fr army_ix_10",
        "cf": 3,
        "lf": 3,
        "mf": 3,
        "rcf": 2,
        "rlf": 3,
        "rmf": 3,
        "notreplaceable": true,
        "neareast": true
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BR 1",
        "type": "army",
        "counter": "army_br army_ix_1",
        "cf": 4,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "rptype": "br"
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BR 2",
        "type": "army",
        "counter": "army_br army_ix_2",
        "cf": 4,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "rptype": "br"
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BR 3",
        "type": "army",
        "counter": "army_br army_ix_3",
        "cf": 4,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "rptype": "br"
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BR 4",
        "type": "army",
        "counter": "army_br army_ix_4",
        "cf": 4,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "rptype": "br"
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BR 5",
        "type": "army",
        "counter": "army_br army_ix_5",
        "cf": 4,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "rptype": "br"
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BR BEF",
        "type": "army",
        "counter": "army_br army_ix_6",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 4,
        "rlf": 3,
        "rmf": 3,
        "notreplaceable": true
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BR NE",
        "type": "army",
        "counter": "army_br army_ix_8",
        "cf": 4,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "notreplaceable": true,
        "neareast": true
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BR MEF",
        "type": "army",
        "counter": "army_br army_ix_7",
        "cf": 1,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3,
        "notreplaceable": true,
        "neareast": true
    },
    {
        "faction": "ap",
        "nation": "us",
        "name": "US 1",
        "type": "army",
        "counter": "army_us army_ix_1",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "rptype": "us"
    },
    {
        "faction": "ap",
        "nation": "us",
        "name": "US 2",
        "type": "army",
        "counter": "army_us army_ix_2",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3,
        "rptype": "us"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU 1",
        "type": "army",
        "counter": "army_ru army_ix_1",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU 2",
        "type": "army",
        "counter": "army_ru army_ix_2",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU 3",
        "type": "army",
        "counter": "army_ru army_ix_3",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU 4",
        "type": "army",
        "counter": "army_ru army_ix_4",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU 5",
        "type": "army",
        "counter": "army_ru army_ix_5",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU 6",
        "type": "army",
        "counter": "army_ru army_ix_6",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU 7",
        "type": "army",
        "counter": "army_ru army_ix_7",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU 8",
        "type": "army",
        "counter": "army_ru army_ix_8",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU 9",
        "type": "army",
        "counter": "army_ru army_ix_9",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU 10",
        "type": "army",
        "counter": "army_ru army_ix_10",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU 11",
        "type": "army",
        "counter": "army_ru army_ix_11",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU 12",
        "type": "army",
        "counter": "army_ru army_ix_12",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU CAU",
        "type": "army",
        "counter": "army_ru army_ix_13",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3,
        "notreplaceable": true,
        "neareast": true
    },
    {
        "faction": "ap",
        "nation": "be",
        "name": "BE 1",
        "type": "army",
        "counter": "army_be army_ix_1",
        "cf": 2,
        "lf": 3,
        "mf": 3,
        "rcf": 1,
        "rlf": 3,
        "rmf": 3,
        "rptype": "allied"
    },
    {
        "faction": "ap",
        "nation": "sb",
        "name": "SB 1",
        "type": "army",
        "counter": "army_sb army_ix_1",
        "cf": 2,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3,
        "rptype": "allied"
    },
    {
        "faction": "ap",
        "nation": "sb",
        "name": "SB 2",
        "type": "army",
        "counter": "army_sb army_ix_2",
        "cf": 2,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3,
        "rptype": "allied"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GEc",
        "type": "corps",
        "counter": "corps_ge corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GEc",
        "type": "corps",
        "counter": "corps_ge corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GEc",
        "type": "corps",
        "counter": "corps_ge corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GEc",
        "type": "corps",
        "counter": "corps_ge corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GEc",
        "type": "corps",
        "counter": "corps_ge corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GEc",
        "type": "corps",
        "counter": "corps_ge corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GEc",
        "type": "corps",
        "counter": "corps_ge corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GEc",
        "type": "corps",
        "counter": "corps_ge corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GEc",
        "type": "corps",
        "counter": "corps_ge corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GEc",
        "type": "corps",
        "counter": "corps_ge corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GEc",
        "type": "corps",
        "counter": "corps_ge corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GEc",
        "type": "corps",
        "counter": "corps_ge corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GEc",
        "type": "corps",
        "counter": "corps_ge corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GEc",
        "type": "corps",
        "counter": "corps_ge corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GEc",
        "type": "corps",
        "counter": "corps_ge corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GEc",
        "type": "corps",
        "counter": "corps_ge corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GEc",
        "type": "corps",
        "counter": "corps_ge corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GEc",
        "type": "corps",
        "counter": "corps_ge corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GEc",
        "type": "corps",
        "counter": "corps_ge corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "AHc",
        "type": "corps",
        "counter": "corps_ah corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ah"
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "AHc",
        "type": "corps",
        "counter": "corps_ah corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ah"
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "AHc",
        "type": "corps",
        "counter": "corps_ah corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ah"
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "AHc",
        "type": "corps",
        "counter": "corps_ah corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ah"
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "AHc",
        "type": "corps",
        "counter": "corps_ah corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ah"
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "AHc",
        "type": "corps",
        "counter": "corps_ah corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ah"
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "AHc",
        "type": "corps",
        "counter": "corps_ah corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ah"
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "AHc",
        "type": "corps",
        "counter": "corps_ah corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ah"
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "AHc",
        "type": "corps",
        "counter": "corps_ah corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ah"
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "AHc",
        "type": "corps",
        "counter": "corps_ah corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ah"
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "AHc",
        "type": "corps",
        "counter": "corps_ah corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ah"
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TUc",
        "type": "corps",
        "counter": "corps_tu corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "tu"
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TUc",
        "type": "corps",
        "counter": "corps_tu corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "tu"
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TUc",
        "type": "corps",
        "counter": "corps_tu corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "tu"
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TUc",
        "type": "corps",
        "counter": "corps_tu corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "tu"
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TUc",
        "type": "corps",
        "counter": "corps_tu corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "tu"
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TUc",
        "type": "corps",
        "counter": "corps_tu corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "tu"
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TUc",
        "type": "corps",
        "counter": "corps_tu corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "tu"
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TUc",
        "type": "corps",
        "counter": "corps_tu corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "tu"
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TUc",
        "type": "corps",
        "counter": "corps_tu corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "tu"
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TUc",
        "type": "corps",
        "counter": "corps_tu corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "tu"
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TUc",
        "type": "corps",
        "counter": "corps_tu corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "tu"
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TUc",
        "type": "corps",
        "counter": "corps_tu corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "tu"
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TUc",
        "type": "corps",
        "counter": "corps_tu corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "tu"
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TUc",
        "type": "corps",
        "counter": "corps_tu corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "tu"
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "ITc",
        "type": "corps",
        "counter": "corps_it corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "it"
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "ITc",
        "type": "corps",
        "counter": "corps_it corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "it"
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "ITc",
        "type": "corps",
        "counter": "corps_it corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "it"
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "ITc",
        "type": "corps",
        "counter": "corps_it corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "it"
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "ITc",
        "type": "corps",
        "counter": "corps_it corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "it"
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "ITc",
        "type": "corps",
        "counter": "corps_it corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "it"
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "ITc",
        "type": "corps",
        "counter": "corps_it corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "it"
    },
    {
        "faction": "ap",
        "nation": "us",
        "name": "USc",
        "type": "corps",
        "counter": "corps_us corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "us"
    },
    {
        "faction": "ap",
        "nation": "us",
        "name": "USc",
        "type": "corps",
        "counter": "corps_us corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "us"
    },
    {
        "faction": "ap",
        "nation": "us",
        "name": "USc",
        "type": "corps",
        "counter": "corps_us corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "us"
    },
    {
        "faction": "ap",
        "nation": "us",
        "name": "USc",
        "type": "corps",
        "counter": "corps_us corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "us"
    },
    {
        "faction": "ap",
        "nation": "mn",
        "name": "MNc",
        "type": "corps",
        "counter": "corps_mn corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 0,
        "rcf": 0,
        "rlf": 1,
        "rmf": 0,
        "rptype": "allied"
    },
    {
        "faction": "cp",
        "nation": "sn",
        "name": "TU SNc",
        "type": "corps",
        "counter": "corps_tu corps_ix_2",
        "cf": 1,
        "lf": 1,
        "mf": 1,
        "rcf": 0,
        "rlf": 1,
        "rmf": 1,
        "notreplaceable": true
    },
    {
        "faction": "ap",
        "nation": "be",
        "name": "BEc",
        "type": "corps",
        "counter": "corps_be corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "allied"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RUc",
        "type": "corps",
        "counter": "corps_ru corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RUc",
        "type": "corps",
        "counter": "corps_ru corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RUc",
        "type": "corps",
        "counter": "corps_ru corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RUc",
        "type": "corps",
        "counter": "corps_ru corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RUc",
        "type": "corps",
        "counter": "corps_ru corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RUc",
        "type": "corps",
        "counter": "corps_ru corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RUc",
        "type": "corps",
        "counter": "corps_ru corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RUc",
        "type": "corps",
        "counter": "corps_ru corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RUc",
        "type": "corps",
        "counter": "corps_ru corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RUc",
        "type": "corps",
        "counter": "corps_ru corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RUc",
        "type": "corps",
        "counter": "corps_ru corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RUc",
        "type": "corps",
        "counter": "corps_ru corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RUc",
        "type": "corps",
        "counter": "corps_ru corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RUc",
        "type": "corps",
        "counter": "corps_ru corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RUc",
        "type": "corps",
        "counter": "corps_ru corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RUc",
        "type": "corps",
        "counter": "corps_ru corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RUc",
        "type": "corps",
        "counter": "corps_ru corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RUc",
        "type": "corps",
        "counter": "corps_ru corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FRc",
        "type": "corps",
        "counter": "corps_fr corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "fr"
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FRc",
        "type": "corps",
        "counter": "corps_fr corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "fr"
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FRc",
        "type": "corps",
        "counter": "corps_fr corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "fr"
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FRc",
        "type": "corps",
        "counter": "corps_fr corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "fr"
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FRc",
        "type": "corps",
        "counter": "corps_fr corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "fr"
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FRc",
        "type": "corps",
        "counter": "corps_fr corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "fr"
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FRc",
        "type": "corps",
        "counter": "corps_fr corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "fr"
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FRc",
        "type": "corps",
        "counter": "corps_fr corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "fr"
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FRc",
        "type": "corps",
        "counter": "corps_fr corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "fr"
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FRc",
        "type": "corps",
        "counter": "corps_fr corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "fr"
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BRc",
        "type": "corps",
        "counter": "corps_br corps_ix_4",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "br"
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BRc",
        "type": "corps",
        "counter": "corps_br corps_ix_4",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "br"
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BRc",
        "type": "corps",
        "counter": "corps_br corps_ix_4",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "br"
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BRc",
        "type": "corps",
        "counter": "corps_br corps_ix_4",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "br"
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BRc",
        "type": "corps",
        "counter": "corps_br corps_ix_4",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "br"
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BRc",
        "type": "corps",
        "counter": "corps_br corps_ix_4",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "br"
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BRc",
        "type": "corps",
        "counter": "corps_br corps_ix_4",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "br"
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BRc",
        "type": "corps",
        "counter": "corps_br corps_ix_4",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "br"
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BRc",
        "type": "corps",
        "counter": "corps_br corps_ix_4",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "br"
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BRc",
        "type": "corps",
        "counter": "corps_br corps_ix_4",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "br"
    },
    {
        "faction": "ap",
        "nation": "ana",
        "name": "BR ANAc",
        "type": "corps",
        "counter": "corps_br corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "allied"
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "PTc",
        "type": "corps",
        "counter": "corps_br corps_ix_6",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "allied"
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "AUSc",
        "type": "corps",
        "counter": "corps_br corps_ix_2",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 2,
        "rlf": 1,
        "rmf": 4,
        "rptype": "allied"
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "CNDc",
        "type": "corps",
        "counter": "corps_br corps_ix_5",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 2,
        "rlf": 1,
        "rmf": 4,
        "rptype": "allied"
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BR BEFc",
        "type": "corps",
        "counter": "corps_br corps_ix_3",
        "cf": 2,
        "lf": 2,
        "mf": 4,
        "rcf": 2,
        "rlf": 1,
        "rmf": 4,
        "notreplaceable": true
    },
    {
        "faction": "ap",
        "nation": "sb",
        "name": "SBc",
        "type": "corps",
        "counter": "corps_sb corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 0,
        "rlf": 1,
        "rmf": 4,
        "rptype": "allied"
    },
    {
        "faction": "ap",
        "nation": "sb",
        "name": "SBc",
        "type": "corps",
        "counter": "corps_sb corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 0,
        "rlf": 1,
        "rmf": 4,
        "rptype": "allied"
    },
    {
        "faction": "cp",
        "nation": "bu",
        "name": "BUc",
        "type": "corps",
        "counter": "corps_bu corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "bu"
    },
    {
        "faction": "cp",
        "nation": "bu",
        "name": "BUc",
        "type": "corps",
        "counter": "corps_bu corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "bu"
    },
    {
        "faction": "cp",
        "nation": "bu",
        "name": "BUc",
        "type": "corps",
        "counter": "corps_bu corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "bu"
    },
    {
        "faction": "cp",
        "nation": "bu",
        "name": "BUc",
        "type": "corps",
        "counter": "corps_bu corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "bu"
    },
    {
        "faction": "cp",
        "nation": "bu",
        "name": "BUc",
        "type": "corps",
        "counter": "corps_bu corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "bu"
    },
    {
        "faction": "cp",
        "nation": "bu",
        "name": "BUc",
        "type": "corps",
        "counter": "corps_bu corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "bu"
    },
    {
        "faction": "ap",
        "nation": "ro",
        "name": "ROc",
        "type": "corps",
        "counter": "corps_ro corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "allied"
    },
    {
        "faction": "ap",
        "nation": "ro",
        "name": "ROc",
        "type": "corps",
        "counter": "corps_ro corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "allied"
    },
    {
        "faction": "ap",
        "nation": "ro",
        "name": "ROc",
        "type": "corps",
        "counter": "corps_ro corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "allied"
    },
    {
        "faction": "ap",
        "nation": "ro",
        "name": "ROc",
        "type": "corps",
        "counter": "corps_ro corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "allied"
    },
    {
        "faction": "ap",
        "nation": "ro",
        "name": "ROc",
        "type": "corps",
        "counter": "corps_ro corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "allied"
    },
    {
        "faction": "ap",
        "nation": "ro",
        "name": "ROc",
        "type": "corps",
        "counter": "corps_ro corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "allied"
    },
    {
        "faction": "ap",
        "nation": "gr",
        "name": "GRc",
        "type": "corps",
        "counter": "corps_gr corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "allied"
    },
    {
        "faction": "ap",
        "nation": "gr",
        "name": "GRc",
        "type": "corps",
        "counter": "corps_gr corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "allied"
    },
    {
        "faction": "ap",
        "nation": "gr",
        "name": "GRc",
        "type": "corps",
        "counter": "corps_gr corps_ix_1",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3,
        "rptype": "allied"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU CAVc",
        "type": "corps",
        "counter": "corps_ru corps_ix_2",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 0,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU CAVc",
        "type": "corps",
        "counter": "corps_ru corps_ix_2",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 0,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ru"
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU Czlc",
        "type": "corps",
        "counter": "corps_czl corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ru"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "PLc",
        "type": "corps",
        "counter": "corps_pol corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "PLc",
        "type": "corps",
        "counter": "corps_pol corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ge"
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "PLc",
        "type": "corps",
        "counter": "corps_pol corps_ix_1",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4,
        "rptype": "ge"
    }
]

const spaces = [
    {},
    {
        "id": 1,
        "map": "europe",
        "name": "London",
        "x": 181,
        "y": 541,
        "w": 44,
        "h": 44,
        "nation": "br",
        "faction": "ap",
        "supply": true,
        "apport": true,
        "capital": true
    },
    {
        "id": 2,
        "map": "europe",
        "name": "Cherbourg",
        "x": 102,
        "y": 675,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap",
        "apport": true
    },
    {
        "id": 3,
        "map": "europe",
        "name": "Caen",
        "x": 147,
        "y": 729,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap"
    },
    {
        "id": 4,
        "map": "europe",
        "name": "Rennes",
        "x": 109,
        "y": 790,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap"
    },
    {
        "id": 5,
        "map": "europe",
        "name": "Nantes",
        "x": 102,
        "y": 855,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap",
        "apport": true
    },
    {
        "id": 6,
        "map": "europe",
        "name": "La Rochelle",
        "x": 140,
        "y": 930,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap",
        "apport": true
    },
    {
        "id": 7,
        "map": "europe",
        "name": "Bordeaux",
        "x": 160,
        "y": 1015,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap",
        "apport": true
    },
    {
        "id": 8,
        "map": "europe",
        "name": "Poitiers",
        "x": 226,
        "y": 919,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap"
    },
    {
        "id": 9,
        "map": "europe",
        "name": "Tours",
        "x": 229,
        "y": 846,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap"
    },
    {
        "id": 10,
        "map": "europe",
        "name": "Le Mans",
        "x": 204,
        "y": 785,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap"
    },
    {
        "id": 11,
        "map": "europe",
        "name": "Le Havre",
        "x": 203,
        "y": 677,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap",
        "vp": 1,
        "apport": true
    },
    {
        "id": 12,
        "map": "europe",
        "name": "Rouen",
        "x": 262,
        "y": 712,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 13,
        "map": "europe",
        "name": "Orleans",
        "x": 303,
        "y": 809,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 14,
        "map": "europe",
        "name": "St. Amand",
        "x": 322,
        "y": 895,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap"
    },
    {
        "id": 15,
        "map": "europe",
        "name": "Paris",
        "x": 333,
        "y": 733,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap",
        "vp": 1,
        "fort": 1,
        "capital": true
    },
    {
        "id": 16,
        "map": "europe",
        "name": "Amiens",
        "x": 309,
        "y": 654,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 17,
        "map": "europe",
        "name": "Calais",
        "x": 293,
        "y": 590,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap",
        "terrain": "swamp",
        "vp": 1,
        "apport": true
    },
    {
        "id": 18,
        "map": "europe",
        "name": "Ostend",
        "x": 353,
        "y": 545,
        "w": 44,
        "h": 44,
        "nation": "be",
        "faction": "ap",
        "terrain": "swamp",
        "vp": 1,
        "apport": true
    },
    {
        "id": 19,
        "map": "europe",
        "name": "Cambrai",
        "x": 373,
        "y": 655,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 20,
        "map": "europe",
        "name": "Chateau Thierry",
        "x": 413,
        "y": 725,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap"
    },
    {
        "id": 21,
        "map": "europe",
        "name": "Melun",
        "x": 385,
        "y": 797,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 22,
        "map": "europe",
        "name": "Nevers",
        "x": 402,
        "y": 883,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap"
    },
    {
        "id": 23,
        "map": "europe",
        "name": "Lyon",
        "x": 457,
        "y": 964,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap"
    },
    {
        "id": 24,
        "map": "europe",
        "name": "Avignon",
        "x": 435,
        "y": 1051,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap"
    },
    {
        "id": 25,
        "map": "europe",
        "name": "Marseilles",
        "x": 479,
        "y": 1139,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap",
        "apport": true
    },
    {
        "id": 26,
        "map": "europe",
        "name": "Nice",
        "x": 561,
        "y": 1122,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap"
    },
    {
        "id": 27,
        "map": "europe",
        "name": "Grenoble",
        "x": 528,
        "y": 994,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 28,
        "map": "europe",
        "name": "Dijon",
        "x": 491,
        "y": 873,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 29,
        "map": "europe",
        "name": "Bar le Duc",
        "x": 464,
        "y": 786,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 30,
        "map": "europe",
        "name": "Sedan",
        "x": 444,
        "y": 652,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap",
        "terrain": "forest",
        "vp": 1
    },
    {
        "id": 31,
        "map": "europe",
        "name": "Brussels",
        "x": 416,
        "y": 589,
        "w": 44,
        "h": 44,
        "nation": "be",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 32,
        "map": "europe",
        "name": "Antwerp",
        "x": 451,
        "y": 523,
        "w": 44,
        "h": 44,
        "nation": "be",
        "faction": "ap",
        "vp": 1,
        "fort": 1
    },
    {
        "id": 33,
        "map": "europe",
        "name": "Liege",
        "x": 498,
        "y": 595,
        "w": 44,
        "h": 44,
        "nation": "be",
        "faction": "ap",
        "fort": 3
    },
    {
        "id": 34,
        "map": "europe",
        "name": "Verdun",
        "x": 494,
        "y": 699,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap",
        "vp": 1,
        "fort": 3
    },
    {
        "id": 35,
        "map": "europe",
        "name": "Nancy",
        "x": 528,
        "y": 767,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap",
        "vp": 1,
        "fort": 2
    },
    {
        "id": 36,
        "map": "europe",
        "name": "Belfort",
        "x": 559,
        "y": 841,
        "w": 44,
        "h": 44,
        "nation": "fr",
        "faction": "ap",
        "terrain": "mountain",
        "fort": 2
    },
    {
        "id": 37,
        "map": "europe",
        "name": "Turin",
        "x": 603,
        "y": 1006,
        "w": 44,
        "h": 44,
        "nation": "it",
        "faction": "ap"
    },
    {
        "id": 38,
        "map": "europe",
        "name": "Mulhouse",
        "x": 629,
        "y": 823,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 39,
        "map": "europe",
        "name": "Strasbourg",
        "x": 614,
        "y": 748,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "vp": 1,
        "fort": 3
    },
    {
        "id": 40,
        "map": "europe",
        "name": "Metz",
        "x": 575,
        "y": 675,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "terrain": "forest",
        "vp": 1,
        "fort": 3
    },
    {
        "id": 41,
        "map": "europe",
        "name": "Koblenz",
        "x": 573,
        "y": 604,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "vp": 1
    },
    {
        "id": 42,
        "map": "europe",
        "name": "Aachen",
        "x": 531,
        "y": 535,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "vp": 1
    },
    {
        "id": 43,
        "map": "europe",
        "name": "Essen",
        "x": 602,
        "y": 518,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "supply": true,
        "vp": 1
    },
    {
        "id": 44,
        "map": "europe",
        "name": "Frankfurt",
        "x": 649,
        "y": 606,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "vp": 1
    },
    {
        "id": 45,
        "map": "europe",
        "name": "Mannheim",
        "x": 650,
        "y": 683,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 46,
        "map": "europe",
        "name": "Stuttgart",
        "x": 693,
        "y": 738,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "vp": 1
    },
    {
        "id": 47,
        "map": "europe",
        "name": "Wilhelmshaven",
        "x": 633,
        "y": 367,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "cpport": true
    },
    {
        "id": 48,
        "map": "europe",
        "name": "Bremen",
        "x": 673,
        "y": 439,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 49,
        "map": "europe",
        "name": "Kassel",
        "x": 699,
        "y": 525,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 50,
        "map": "europe",
        "name": "Kiel",
        "x": 738,
        "y": 333,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "cpport": true
    },
    {
        "id": 51,
        "map": "europe",
        "name": "Hamburg",
        "x": 740,
        "y": 401,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 52,
        "map": "europe",
        "name": "Hannover",
        "x": 797,
        "y": 485,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 53,
        "map": "europe",
        "name": "Erfurt",
        "x": 787,
        "y": 614,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 54,
        "map": "europe",
        "name": "Nuremberg",
        "x": 788,
        "y": 688,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 55,
        "map": "europe",
        "name": "Augsburg",
        "x": 765,
        "y": 751,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 56,
        "map": "europe",
        "name": "Innsbruck",
        "x": 809,
        "y": 850,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 57,
        "map": "europe",
        "name": "Trent",
        "x": 747,
        "y": 894,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain",
        "vp": 1,
        "fort": 3
    },
    {
        "id": 58,
        "map": "europe",
        "name": "Milan",
        "x": 684,
        "y": 977,
        "w": 44,
        "h": 44,
        "nation": "it",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 59,
        "map": "europe",
        "name": "Genoa",
        "x": 673,
        "y": 1057,
        "w": 44,
        "h": 44,
        "nation": "it",
        "faction": "ap",
        "vp": 1,
        "apport": true
    },
    {
        "id": 60,
        "map": "europe",
        "name": "Verona",
        "x": 774,
        "y": 981,
        "w": 44,
        "h": 44,
        "nation": "it",
        "faction": "ap"
    },
    {
        "id": 61,
        "map": "europe",
        "name": "Bologna",
        "x": 795,
        "y": 1040,
        "w": 44,
        "h": 44,
        "nation": "it",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 62,
        "map": "europe",
        "name": "Florence",
        "x": 791,
        "y": 1105,
        "w": 44,
        "h": 44,
        "nation": "it",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 63,
        "map": "europe",
        "name": "Viterbo",
        "x": 835,
        "y": 1177,
        "w": 44,
        "h": 44,
        "nation": "it",
        "faction": "ap"
    },
    {
        "id": 64,
        "map": "europe",
        "name": "Rome",
        "x": 862,
        "y": 1239,
        "w": 44,
        "h": 44,
        "nation": "it",
        "faction": "ap",
        "vp": 1,
        "capital": true
    },
    {
        "id": 65,
        "map": "europe",
        "name": "Naples",
        "x": 956,
        "y": 1315,
        "w": 44,
        "h": 44,
        "nation": "it",
        "faction": "ap",
        "vp": 1,
        "apport": true
    },
    {
        "id": 66,
        "map": "europe",
        "name": "Taranto",
        "x": 1112,
        "y": 1345,
        "w": 44,
        "h": 44,
        "nation": "it",
        "faction": "ap",
        "apport": true
    },
    {
        "id": 67,
        "map": "europe",
        "name": "Foggia",
        "x": 1038,
        "y": 1286,
        "w": 44,
        "h": 44,
        "nation": "it",
        "faction": "ap"
    },
    {
        "id": 68,
        "map": "europe",
        "name": "Pescara",
        "x": 955,
        "y": 1212,
        "w": 44,
        "h": 44,
        "nation": "it",
        "faction": "ap"
    },
    {
        "id": 69,
        "map": "europe",
        "name": "Ancona",
        "x": 923,
        "y": 1144,
        "w": 44,
        "h": 44,
        "nation": "it",
        "faction": "ap"
    },
    {
        "id": 70,
        "map": "europe",
        "name": "Ravenna",
        "x": 866,
        "y": 1082,
        "w": 44,
        "h": 44,
        "nation": "it",
        "faction": "ap"
    },
    {
        "id": 71,
        "map": "europe",
        "name": "Venice",
        "x": 847,
        "y": 991,
        "w": 44,
        "h": 44,
        "nation": "it",
        "faction": "ap",
        "apport": true
    },
    {
        "id": 72,
        "map": "europe",
        "name": "Udine",
        "x": 906,
        "y": 963,
        "w": 44,
        "h": 44,
        "nation": "it",
        "faction": "ap"
    },
    {
        "id": 73,
        "map": "europe",
        "name": "Asiago",
        "x": 832,
        "y": 917,
        "w": 44,
        "h": 44,
        "nation": "it",
        "faction": "ap"
    },
    {
        "id": 74,
        "map": "europe",
        "name": "Maggiore",
        "x": 896,
        "y": 904,
        "w": 44,
        "h": 44,
        "nation": "it",
        "faction": "ap"
    },
    {
        "id": 75,
        "map": "europe",
        "name": "Spittal",
        "x": 886,
        "y": 841,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 76,
        "map": "europe",
        "name": "Munich",
        "x": 826,
        "y": 777,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "terrain": "mountain",
        "vp": 1
    },
    {
        "id": 77,
        "map": "europe",
        "name": "Regensburg",
        "x": 852,
        "y": 719,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 78,
        "map": "europe",
        "name": "Leipzig",
        "x": 861,
        "y": 554,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 79,
        "map": "europe",
        "name": "Berlin",
        "x": 903,
        "y": 459,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "vp": 1,
        "capital": true
    },
    {
        "id": 80,
        "map": "europe",
        "name": "Rostock",
        "x": 842,
        "y": 350,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "cpport": true
    },
    {
        "id": 81,
        "map": "europe",
        "name": "Stettin",
        "x": 978,
        "y": 367,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "cpport": true
    },
    {
        "id": 82,
        "map": "europe",
        "name": "Cottbus",
        "x": 978,
        "y": 509,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 83,
        "map": "europe",
        "name": "Dresden",
        "x": 926,
        "y": 570,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 84,
        "map": "europe",
        "name": "Prague",
        "x": 965,
        "y": 640,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 85,
        "map": "europe",
        "name": "Kolin",
        "x": 1028,
        "y": 678,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 86,
        "map": "europe",
        "name": "Linz",
        "x": 946,
        "y": 786,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 87,
        "map": "europe",
        "name": "Villach",
        "x": 957,
        "y": 885,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 88,
        "map": "europe",
        "name": "Trieste",
        "x": 971,
        "y": 968,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain",
        "vp": 1,
        "fort": 3
    },
    {
        "id": 89,
        "map": "europe",
        "name": "Graz",
        "x": 1021,
        "y": 865,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 90,
        "map": "europe",
        "name": "Vienna",
        "x": 1068,
        "y": 783,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "vp": 1,
        "capital": true
    },
    {
        "id": 91,
        "map": "europe",
        "name": "Brun",
        "x": 1088,
        "y": 712,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 92,
        "map": "europe",
        "name": "Olmutz",
        "x": 1152,
        "y": 661,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 93,
        "map": "europe",
        "name": "Oppeln",
        "x": 1180,
        "y": 598,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 94,
        "map": "europe",
        "name": "Breslau",
        "x": 1101,
        "y": 569,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "supply": true,
        "vp": 1,
        "fort": 2
    },
    {
        "id": 95,
        "map": "europe",
        "name": "Posen",
        "x": 1099,
        "y": 476,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "vp": 1,
        "fort": 2
    },
    {
        "id": 96,
        "map": "europe",
        "name": "Thorn",
        "x": 1147,
        "y": 407,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "fort": 2
    },
    {
        "id": 97,
        "map": "europe",
        "name": "Kolberg",
        "x": 1080,
        "y": 341,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "cpport": true
    },
    {
        "id": 98,
        "map": "europe",
        "name": "Danzig",
        "x": 1189,
        "y": 328,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "vp": 1,
        "fort": 2,
        "cpport": true
    },
    {
        "id": 99,
        "map": "europe",
        "name": "Konigsberg",
        "x": 1280,
        "y": 299,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "vp": 1,
        "fort": 3,
        "cpport": true
    },
    {
        "id": 100,
        "map": "europe",
        "name": "Tannenberg",
        "x": 1275,
        "y": 381,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "terrain": "forest"
    },
    {
        "id": 101,
        "map": "europe",
        "name": "Plock",
        "x": 1237,
        "y": 445,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 102,
        "map": "europe",
        "name": "Lodz",
        "x": 1227,
        "y": 511,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 103,
        "map": "europe",
        "name": "Czestochowa",
        "x": 1272,
        "y": 585,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 104,
        "map": "europe",
        "name": "Cracow",
        "x": 1252,
        "y": 649,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "vp": 1,
        "fort": 2
    },
    {
        "id": 105,
        "map": "europe",
        "name": "Martin",
        "x": 1188,
        "y": 736,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 106,
        "map": "europe",
        "name": "Budapest",
        "x": 1219,
        "y": 830,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "vp": 1,
        "capital": true
    },
    {
        "id": 107,
        "map": "europe",
        "name": "Pecs",
        "x": 1172,
        "y": 938,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 108,
        "map": "europe",
        "name": "Zagreb",
        "x": 1049,
        "y": 955,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 109,
        "map": "europe",
        "name": "Banja Luka",
        "x": 1114,
        "y": 1031,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 110,
        "map": "europe",
        "name": "Mostar",
        "x": 1107,
        "y": 1140,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 111,
        "map": "europe",
        "name": "Cetinje",
        "x": 1201,
        "y": 1190,
        "w": 44,
        "h": 44,
        "nation": "mn",
        "faction": "ap",
        "terrain": "mountain",
        "capital": true
    },
    {
        "id": 112,
        "map": "europe",
        "name": "Tirana",
        "x": 1253,
        "y": 1262,
        "w": 44,
        "h": 44,
        "nation": "al",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 113,
        "map": "europe",
        "name": "Valona",
        "x": 1249,
        "y": 1349,
        "w": 44,
        "h": 44,
        "nation": "al",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 114,
        "map": "europe",
        "name": "Florina",
        "x": 1348,
        "y": 1371,
        "w": 44,
        "h": 44,
        "nation": "gr",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 115,
        "map": "europe",
        "name": "Larisa",
        "x": 1396,
        "y": 1421,
        "w": 44,
        "h": 44,
        "nation": "gr",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 116,
        "map": "europe",
        "name": "Athens",
        "x": 1463,
        "y": 1528,
        "w": 44,
        "h": 44,
        "nation": "gr",
        "faction": "ap",
        "apport": true,
        "capital": true
    },
    {
        "id": 117,
        "map": "europe",
        "name": "Salonika",
        "x": 1409,
        "y": 1344,
        "w": 44,
        "h": 44,
        "nation": "gr",
        "faction": "ap",
        "terrain": "mountain",
        "apport": true
    },
    {
        "id": 118,
        "map": "europe",
        "name": "Monastir",
        "x": 1349,
        "y": 1294,
        "w": 44,
        "h": 44,
        "nation": "sb",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 119,
        "map": "europe",
        "name": "Kavala",
        "x": 1485,
        "y": 1311,
        "w": 44,
        "h": 44,
        "nation": "gr",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 120,
        "map": "europe",
        "name": "Strumitsa",
        "x": 1452,
        "y": 1242,
        "w": 44,
        "h": 44,
        "nation": "bu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 121,
        "map": "europe",
        "name": "Skopje",
        "x": 1346,
        "y": 1225,
        "w": 44,
        "h": 44,
        "nation": "sb",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 122,
        "map": "europe",
        "name": "Nis",
        "x": 1343,
        "y": 1132,
        "w": 44,
        "h": 44,
        "nation": "sb",
        "faction": "ap"
    },
    {
        "id": 123,
        "map": "europe",
        "name": "Valjevo",
        "x": 1268,
        "y": 1122,
        "w": 44,
        "h": 44,
        "nation": "sb",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 124,
        "map": "europe",
        "name": "Sarajevo",
        "x": 1182,
        "y": 1090,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 125,
        "map": "europe",
        "name": "Belgrade",
        "x": 1312,
        "y": 1045,
        "w": 44,
        "h": 44,
        "nation": "sb",
        "faction": "ap",
        "supply": true,
        "vp": 1,
        "fort": 1,
        "capital": true
    },
    {
        "id": 126,
        "map": "europe",
        "name": "Novi Sad",
        "x": 1248,
        "y": 985,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 127,
        "map": "europe",
        "name": "Timisvar",
        "x": 1336,
        "y": 962,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 128,
        "map": "europe",
        "name": "Szeged",
        "x": 1269,
        "y": 908,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 129,
        "map": "europe",
        "name": "Debrecen",
        "x": 1355,
        "y": 830,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "vp": 1
    },
    {
        "id": 130,
        "map": "europe",
        "name": "Miskolcz",
        "x": 1285,
        "y": 771,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 131,
        "map": "europe",
        "name": "Gorlice",
        "x": 1310,
        "y": 711,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 132,
        "map": "europe",
        "name": "Tarnow",
        "x": 1333,
        "y": 648,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 133,
        "map": "europe",
        "name": "Ivangorod",
        "x": 1346,
        "y": 574,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap",
        "fort": 1
    },
    {
        "id": 134,
        "map": "europe",
        "name": "Warsaw",
        "x": 1319,
        "y": 482,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap",
        "vp": 1,
        "fort": 2
    },
    {
        "id": 135,
        "map": "europe",
        "name": "Lomza",
        "x": 1376,
        "y": 415,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap",
        "fort": 1
    },
    {
        "id": 136,
        "map": "europe",
        "name": "Insterberg",
        "x": 1356,
        "y": 339,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "terrain": "forest"
    },
    {
        "id": 137,
        "map": "europe",
        "name": "Memel",
        "x": 1329,
        "y": 235,
        "w": 44,
        "h": 44,
        "nation": "ge",
        "faction": "cp",
        "cpport": true
    },
    {
        "id": 138,
        "map": "europe",
        "name": "Libau",
        "x": 1330,
        "y": 166,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap",
        "cpport": true
    },
    {
        "id": 139,
        "map": "europe",
        "name": "Szawli",
        "x": 1413,
        "y": 204,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 140,
        "map": "europe",
        "name": "Riga",
        "x": 1483,
        "y": 142,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap",
        "vp": 1,
        "fort": 3,
        "cpport": true
    },
    {
        "id": 141,
        "map": "europe",
        "name": "Reval",
        "x": 1591,
        "y": 65,
        "w": 84,
        "h": 62,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 142,
        "map": "europe",
        "name": "Pskov",
        "x": 1721,
        "y": 84,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 143,
        "map": "europe",
        "name": "Petrograd",
        "x": 1828,
        "y": 65,
        "w": 84,
        "h": 62,
        "nation": "ru",
        "faction": "ap",
        "supply": true
    },
    {
        "id": 144,
        "map": "europe",
        "name": "Velikiye Luki",
        "x": 1819,
        "y": 172,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 145,
        "map": "europe",
        "name": "Opochka",
        "x": 1727,
        "y": 173,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 146,
        "map": "europe",
        "name": "Dvinsk",
        "x": 1615,
        "y": 225,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 147,
        "map": "europe",
        "name": "Kovno",
        "x": 1425,
        "y": 288,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap",
        "vp": 1,
        "fort": 1
    },
    {
        "id": 148,
        "map": "europe",
        "name": "Vilna",
        "x": 1507,
        "y": 286,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 149,
        "map": "europe",
        "name": "Moldechno",
        "x": 1594,
        "y": 320,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 150,
        "map": "europe",
        "name": "Polotsk",
        "x": 1710,
        "y": 282,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 151,
        "map": "europe",
        "name": "Vitebsk",
        "x": 1819,
        "y": 260,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 152,
        "map": "europe",
        "name": "Moscow",
        "x": 1995,
        "y": 279,
        "w": 62,
        "h": 84,
        "nation": "ru",
        "faction": "ap",
        "supply": true
    },
    {
        "id": 153,
        "map": "europe",
        "name": "Smolensk",
        "x": 1917,
        "y": 305,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 154,
        "map": "europe",
        "name": "Orsha",
        "x": 1819,
        "y": 317,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 155,
        "map": "europe",
        "name": "Roslavl",
        "x": 1941,
        "y": 404,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 156,
        "map": "europe",
        "name": "Mogilev",
        "x": 1824,
        "y": 375,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 157,
        "map": "europe",
        "name": "Minsk",
        "x": 1680,
        "y": 368,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 158,
        "map": "europe",
        "name": "Gomel",
        "x": 1858,
        "y": 472,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 159,
        "map": "europe",
        "name": "Slutsk",
        "x": 1720,
        "y": 438,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap",
        "terrain": "forest"
    },
    {
        "id": 160,
        "map": "europe",
        "name": "Baranovichi",
        "x": 1584,
        "y": 390,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap",
        "terrain": "forest"
    },
    {
        "id": 161,
        "map": "europe",
        "name": "Grodno",
        "x": 1463,
        "y": 364,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap",
        "terrain": "forest",
        "fort": 1
    },
    {
        "id": 162,
        "map": "europe",
        "name": "Bialystok",
        "x": 1494,
        "y": 432,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 163,
        "map": "europe",
        "name": "Brest Litovsk",
        "x": 1437,
        "y": 490,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap",
        "fort": 1
    },
    {
        "id": 164,
        "map": "europe",
        "name": "Pinsk",
        "x": 1559,
        "y": 463,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap",
        "terrain": "swamp"
    },
    {
        "id": 165,
        "map": "europe",
        "name": "Lublin",
        "x": 1449,
        "y": 572,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 166,
        "map": "europe",
        "name": "Kovel",
        "x": 1526,
        "y": 528,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap",
        "terrain": "swamp"
    },
    {
        "id": 167,
        "map": "europe",
        "name": "Sarny",
        "x": 1631,
        "y": 506,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap",
        "terrain": "swamp"
    },
    {
        "id": 168,
        "map": "europe",
        "name": "Mozyr",
        "x": 1761,
        "y": 529,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap",
        "terrain": "swamp"
    },
    {
        "id": 169,
        "map": "europe",
        "name": "Chernigov",
        "x": 1873,
        "y": 548,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 170,
        "map": "europe",
        "name": "Kharkov",
        "x": 1995,
        "y": 613,
        "w": 62,
        "h": 84,
        "nation": "ru",
        "faction": "ap",
        "supply": true
    },
    {
        "id": 171,
        "map": "europe",
        "name": "Kiev",
        "x": 1830,
        "y": 615,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 172,
        "map": "europe",
        "name": "Zhitomir",
        "x": 1743,
        "y": 614,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 173,
        "map": "europe",
        "name": "Rovno",
        "x": 1663,
        "y": 582,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap",
        "terrain": "forest"
    },
    {
        "id": 174,
        "map": "europe",
        "name": "Lutsk",
        "x": 1555,
        "y": 596,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap",
        "terrain": "forest",
        "fort": 1
    },
    {
        "id": 175,
        "map": "europe",
        "name": "Dubno",
        "x": 1617,
        "y": 648,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap",
        "fort": 1
    },
    {
        "id": 176,
        "map": "europe",
        "name": "Przemysl",
        "x": 1412,
        "y": 648,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "fort": 3
    },
    {
        "id": 177,
        "map": "europe",
        "name": "Lemberg",
        "x": 1488,
        "y": 657,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "vp": 1
    },
    {
        "id": 178,
        "map": "europe",
        "name": "Uzhgorod",
        "x": 1387,
        "y": 755,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 179,
        "map": "europe",
        "name": "Stanislau",
        "x": 1470,
        "y": 736,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 180,
        "map": "europe",
        "name": "Tarnopol",
        "x": 1548,
        "y": 708,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 181,
        "map": "europe",
        "name": "Munkacs",
        "x": 1464,
        "y": 803,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 182,
        "map": "europe",
        "name": "Czernowitz",
        "x": 1546,
        "y": 786,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "vp": 1
    },
    {
        "id": 183,
        "map": "europe",
        "name": "Kamenets-Podolski",
        "x": 1620,
        "y": 742,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 184,
        "map": "europe",
        "name": "Vinnitsa",
        "x": 1725,
        "y": 711,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 185,
        "map": "europe",
        "name": "Belaya Tserkov",
        "x": 1844,
        "y": 705,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 186,
        "map": "europe",
        "name": "Caucasus",
        "x": 1995,
        "y": 826,
        "w": 62,
        "h": 84,
        "nation": "ru",
        "faction": "ap",
        "supply": true
    },
    {
        "id": 187,
        "map": "europe",
        "name": "Uman",
        "x": 1846,
        "y": 796,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 188,
        "map": "europe",
        "name": "Odessa",
        "x": 1844,
        "y": 901,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap",
        "vp": 1,
        "fort": 3
    },
    {
        "id": 189,
        "map": "europe",
        "name": "Zhmerinka",
        "x": 1687,
        "y": 796,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 190,
        "map": "europe",
        "name": "Jassy",
        "x": 1610,
        "y": 841,
        "w": 44,
        "h": 44,
        "nation": "ro",
        "faction": "ap"
    },
    {
        "id": 191,
        "map": "europe",
        "name": "Schossburg",
        "x": 1526,
        "y": 879,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 192,
        "map": "europe",
        "name": "Cluj",
        "x": 1450,
        "y": 865,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "vp": 1
    },
    {
        "id": 193,
        "map": "europe",
        "name": "Hermannstadt",
        "x": 1447,
        "y": 944,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 194,
        "map": "europe",
        "name": "Kronstadt",
        "x": 1524,
        "y": 943,
        "w": 44,
        "h": 44,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 195,
        "map": "europe",
        "name": "Targu Jiu",
        "x": 1399,
        "y": 1011,
        "w": 44,
        "h": 44,
        "nation": "ro",
        "faction": "ap"
    },
    {
        "id": 196,
        "map": "europe",
        "name": "Carte de Arges",
        "x": 1473,
        "y": 1006,
        "w": 44,
        "h": 44,
        "nation": "ro",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 197,
        "map": "europe",
        "name": "Caracal",
        "x": 1488,
        "y": 1072,
        "w": 44,
        "h": 44,
        "nation": "ro",
        "faction": "ap"
    },
    {
        "id": 198,
        "map": "europe",
        "name": "Sofia",
        "x": 1443,
        "y": 1162,
        "w": 44,
        "h": 44,
        "nation": "bu",
        "faction": "cp",
        "supply": true,
        "vp": 1,
        "capital": true
    },
    {
        "id": 199,
        "map": "europe",
        "name": "Barlad",
        "x": 1630,
        "y": 908,
        "w": 44,
        "h": 44,
        "nation": "ro",
        "faction": "ap"
    },
    {
        "id": 200,
        "map": "europe",
        "name": "Kishinev",
        "x": 1745,
        "y": 869,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 201,
        "map": "europe",
        "name": "Ismail",
        "x": 1757,
        "y": 951,
        "w": 44,
        "h": 44,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 202,
        "map": "europe",
        "name": "Galatz",
        "x": 1673,
        "y": 992,
        "w": 44,
        "h": 44,
        "nation": "ro",
        "faction": "ap"
    },
    {
        "id": 203,
        "map": "europe",
        "name": "Ploesti",
        "x": 1583,
        "y": 978,
        "w": 44,
        "h": 44,
        "nation": "ro",
        "faction": "ap",
        "terrain": "mountain",
        "vp": 1
    },
    {
        "id": 204,
        "map": "europe",
        "name": "Bucharest",
        "x": 1595,
        "y": 1054,
        "w": 44,
        "h": 44,
        "nation": "ro",
        "faction": "ap",
        "vp": 1,
        "capital": true
    },
    {
        "id": 205,
        "map": "europe",
        "name": "Constanta",
        "x": 1712,
        "y": 1059,
        "w": 44,
        "h": 44,
        "nation": "ro",
        "faction": "ap"
    },
    {
        "id": 206,
        "map": "europe",
        "name": "Varna",
        "x": 1684,
        "y": 1135,
        "w": 44,
        "h": 44,
        "nation": "bu",
        "faction": "cp"
    },
    {
        "id": 207,
        "map": "europe",
        "name": "Plevna",
        "x": 1527,
        "y": 1143,
        "w": 44,
        "h": 44,
        "nation": "bu",
        "faction": "cp"
    },
    {
        "id": 208,
        "map": "europe",
        "name": "Kazanlik",
        "x": 1568,
        "y": 1213,
        "w": 44,
        "h": 44,
        "nation": "bu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 209,
        "map": "europe",
        "name": "Burgas",
        "x": 1670,
        "y": 1202,
        "w": 44,
        "h": 44,
        "nation": "bu",
        "faction": "cp"
    },
    {
        "id": 210,
        "map": "europe",
        "name": "Adrianople",
        "x": 1675,
        "y": 1276,
        "w": 44,
        "h": 44,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 211,
        "map": "europe",
        "name": "Philippoli",
        "x": 1556,
        "y": 1288,
        "w": 44,
        "h": 44,
        "nation": "bu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 212,
        "map": "europe",
        "name": "Gallipoli",
        "x": 1608,
        "y": 1342,
        "w": 44,
        "h": 44,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 213,
        "map": "europe",
        "name": "Cana Kale",
        "x": 1616,
        "y": 1406,
        "w": 44,
        "h": 44,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 214,
        "map": "europe",
        "name": "Balikesir",
        "x": 1696,
        "y": 1419,
        "w": 44,
        "h": 44,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 215,
        "map": "europe",
        "name": "Izmir",
        "x": 1657,
        "y": 1495,
        "w": 44,
        "h": 44,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 216,
        "map": "europe",
        "name": "MEF1",
        "x": 1540,
        "y": 1382,
        "w": 44,
        "h": 44,
        "nation": "none",
        "faction": "ap"
    },
    {
        "id": 217,
        "map": "europe",
        "name": "MEF2",
        "x": 1556,
        "y": 1448,
        "w": 44,
        "h": 44,
        "nation": "none",
        "faction": "ap"
    },
    {
        "id": 218,
        "map": "europe",
        "name": "MEF3",
        "x": 1600,
        "y": 1546,
        "w": 44,
        "h": 44,
        "nation": "none",
        "faction": "ap"
    },
    {
        "id": 219,
        "map": "neareast",
        "name": "Constantinople",
        "x": 1852,
        "y": 1070,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "supply": true,
        "vp": 1,
        "apport": true,
        "capital": true
    },
    {
        "id": 220,
        "map": "neareast",
        "name": "Bursa",
        "x": 1856,
        "y": 1145,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 221,
        "map": "neareast",
        "name": "Adapazari",
        "x": 1915,
        "y": 1070,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 222,
        "map": "neareast",
        "name": "Eskidor",
        "x": 1914,
        "y": 1140,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 223,
        "map": "neareast",
        "name": "Sinope",
        "x": 1969,
        "y": 1046,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 224,
        "map": "neareast",
        "name": "Ankara",
        "x": 1972,
        "y": 1123,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 225,
        "map": "neareast",
        "name": "Samsun",
        "x": 2022,
        "y": 1037,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 226,
        "map": "neareast",
        "name": "Sivas",
        "x": 2047,
        "y": 1117,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 227,
        "map": "neareast",
        "name": "Giresun",
        "x": 2071,
        "y": 1054,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 228,
        "map": "neareast",
        "name": "Trebizond",
        "x": 2132,
        "y": 1074,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "fort": 1
    },
    {
        "id": 229,
        "map": "neareast",
        "name": "Erzingan",
        "x": 2134,
        "y": 1138,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 230,
        "map": "neareast",
        "name": "Rize",
        "x": 2196,
        "y": 1070,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 231,
        "map": "neareast",
        "name": "Batum",
        "x": 2247,
        "y": 1040,
        "w": 38,
        "h": 38,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 232,
        "map": "neareast",
        "name": "Kars",
        "x": 2299,
        "y": 1063,
        "w": 38,
        "h": 38,
        "nation": "ru",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 233,
        "map": "neareast",
        "name": "Poti",
        "x": 2207,
        "y": 955,
        "w": 38,
        "h": 38,
        "nation": "ru",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 234,
        "map": "neareast",
        "name": "Grozny",
        "x": 2315,
        "y": 960,
        "w": 38,
        "h": 38,
        "nation": "ru",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 235,
        "map": "neareast",
        "name": "Petrovsk",
        "x": 2419,
        "y": 978,
        "w": 38,
        "h": 38,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 236,
        "map": "neareast",
        "name": "Tbilisi",
        "x": 2361,
        "y": 1038,
        "w": 38,
        "h": 38,
        "nation": "ru",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 237,
        "map": "neareast",
        "name": "Elizabethpol",
        "x": 2417,
        "y": 1079,
        "w": 38,
        "h": 38,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 238,
        "map": "neareast",
        "name": "Baku",
        "x": 2478,
        "y": 1119,
        "w": 38,
        "h": 38,
        "nation": "ru",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 239,
        "map": "neareast",
        "name": "Erivan",
        "x": 2361,
        "y": 1104,
        "w": 38,
        "h": 38,
        "nation": "ru",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 240,
        "map": "neareast",
        "name": "Eleskirt",
        "x": 2282,
        "y": 1131,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 241,
        "map": "neareast",
        "name": "Erzerum",
        "x": 2217,
        "y": 1126,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain",
        "fort": 1
    },
    {
        "id": 242,
        "map": "neareast",
        "name": "Dilman",
        "x": 2357,
        "y": 1178,
        "w": 38,
        "h": 38,
        "nation": "pe",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 243,
        "map": "neareast",
        "name": "Tabriz",
        "x": 2414,
        "y": 1221,
        "w": 38,
        "h": 38,
        "nation": "pe",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 244,
        "map": "neareast",
        "name": "Van",
        "x": 2291,
        "y": 1189,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 245,
        "map": "neareast",
        "name": "Bitlis",
        "x": 2234,
        "y": 1193,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 246,
        "map": "neareast",
        "name": "Diyarbakir",
        "x": 2181,
        "y": 1189,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 247,
        "map": "neareast",
        "name": "Kharput",
        "x": 2124,
        "y": 1194,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 248,
        "map": "neareast",
        "name": "Kayseri",
        "x": 2065,
        "y": 1187,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 249,
        "map": "neareast",
        "name": "Konya",
        "x": 1998,
        "y": 1197,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 250,
        "map": "neareast",
        "name": "Adana",
        "x": 2055,
        "y": 1247,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 251,
        "map": "neareast",
        "name": "Aleppo",
        "x": 2118,
        "y": 1274,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 252,
        "map": "neareast",
        "name": "Urfa",
        "x": 2173,
        "y": 1255,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 253,
        "map": "neareast",
        "name": "Mardin",
        "x": 2235,
        "y": 1253,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 254,
        "map": "neareast",
        "name": "Mosul",
        "x": 2292,
        "y": 1258,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "vp": 1
    },
    {
        "id": 255,
        "map": "neareast",
        "name": "Hamadan",
        "x": 2441,
        "y": 1302,
        "w": 38,
        "h": 38,
        "nation": "pe",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 256,
        "map": "neareast",
        "name": "Kermanshah",
        "x": 2377,
        "y": 1336,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 257,
        "map": "neareast",
        "name": "Kirkuk",
        "x": 2298,
        "y": 1325,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 258,
        "map": "neareast",
        "name": "Damascus",
        "x": 2125,
        "y": 1325,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "vp": 1
    },
    {
        "id": 259,
        "map": "neareast",
        "name": "Beirut",
        "x": 2065,
        "y": 1311,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 260,
        "map": "neareast",
        "name": "MEF4",
        "x": 1944,
        "y": 1313,
        "w": 44,
        "h": 44,
        "nation": "none",
        "faction": "ap"
    },
    {
        "id": 261,
        "map": "neareast",
        "name": "Nablus",
        "x": 2041,
        "y": 1384,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 262,
        "map": "neareast",
        "name": "Amman",
        "x": 2102,
        "y": 1391,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 263,
        "map": "neareast",
        "name": "Baghdad",
        "x": 2321,
        "y": 1389,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "vp": 1
    },
    {
        "id": 264,
        "map": "neareast",
        "name": "Kut",
        "x": 2375,
        "y": 1414,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 265,
        "map": "neareast",
        "name": "Khorramabad",
        "x": 2447,
        "y": 1368,
        "w": 38,
        "h": 38,
        "nation": "pe",
        "faction": "ap"
    },
    {
        "id": 266,
        "map": "neareast",
        "name": "Ahwaz",
        "x": 2453,
        "y": 1441,
        "w": 38,
        "h": 38,
        "nation": "pe",
        "faction": "ap"
    },
    {
        "id": 267,
        "map": "neareast",
        "name": "Qurna",
        "x": 2397,
        "y": 1459,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 268,
        "map": "neareast",
        "name": "Samawah",
        "x": 2295,
        "y": 1459,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "terrain": "desert"
    },
    {
        "id": 269,
        "map": "neareast",
        "name": "Basra",
        "x": 2439,
        "y": 1516,
        "w": 38,
        "h": 38,
        "nation": "pe",
        "faction": "ap",
        "vp": 1,
        "fort": 1,
        "apport": true
    },
    {
        "id": 270,
        "map": "neareast",
        "name": "An Nasiriya",
        "x": 2355,
        "y": 1535,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "terrain": "desert"
    },
    {
        "id": 271,
        "map": "neareast",
        "name": "Arabia",
        "x": 2180,
        "y": 1514,
        "w": 38,
        "h": 38,
        "nation": "ar",
        "faction": "ap",
        "terrain": "desert"
    },
    {
        "id": 272,
        "map": "neareast",
        "name": "Medina",
        "x": 2103,
        "y": 1596,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "terrain": "desert",
        "vp": 1
    },
    {
        "id": 273,
        "map": "neareast",
        "name": "Aqaba",
        "x": 2027,
        "y": 1556,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "terrain": "desert",
        "fort": 1
    },
    {
        "id": 274,
        "map": "neareast",
        "name": "Beersheba",
        "x": 2069,
        "y": 1503,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "terrain": "desert",
        "fort": 2
    },
    {
        "id": 275,
        "map": "neareast",
        "name": "Jerusalem",
        "x": 2078,
        "y": 1440,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 276,
        "map": "neareast",
        "name": "Gaza",
        "x": 2013,
        "y": 1456,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "terrain": "desert",
        "fort": 2
    },
    {
        "id": 277,
        "map": "neareast",
        "name": "Sinai",
        "x": 1968,
        "y": 1508,
        "w": 38,
        "h": 38,
        "nation": "tu",
        "faction": "cp",
        "terrain": "desert"
    },
    {
        "id": 278,
        "map": "neareast",
        "name": "Cairo",
        "x": 1913,
        "y": 1537,
        "w": 38,
        "h": 38,
        "nation": "eg",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 279,
        "map": "neareast",
        "name": "Port Said",
        "x": 1908,
        "y": 1467,
        "w": 38,
        "h": 38,
        "nation": "eg",
        "faction": "ap",
        "apport": true,
        "vp": 1,
    },
    {
        "id": 280,
        "map": "neareast",
        "name": "Alexandria",
        "x": 1849,
        "y": 1494,
        "w": 38,
        "h": 38,
        "nation": "eg",
        "faction": "ap",
        "apport": true,
        "vp": 1
    },
    {
        "id": 281,
        "map": "neareast",
        "name": "Libya",
        "x": 1778,
        "y": 1486,
        "w": 38,
        "h": 38,
        "nation": "eg",
        "faction": "cp"
    },
    {
        "id": 282,
        "name": "AP Reserve Box",
        "x": 2315,
        "y": 743,
        "w": 370,
        "h": 190,
        "faction": "ap"
    },
    {
        "id": 283,
        "name": "CP Reserve Box",
        "x": 2315,
        "y": 521,
        "w": 370,
        "h": 190,
        "faction": "cp"
    },
    {
        "id": 284,
        "name": "AP Eliminated Box",
        "x": 1047,
        "y": 1535,
        "w": 220,
        "h": 124,
        "faction": "ap"
    },
    {
        "id": 285,
        "name": "CP Eliminated Box",
        "x": 633,
        "y": 119,
        "w": 220,
        "h": 124,
        "faction": "cp"
    }
]

const edges = [
    {
        "a": 1,
        "b": 2,
        "nations": "br"
    },
    {
        "a": 1,
        "b": 11,
        "nations": "br"
    },
    {
        "a": 1,
        "b": 17,
        "nations": "br"
    },
    {
        "a": 2,
        "b": 3
    },
    {
        "a": 3,
        "b": 10
    },
    {
        "a": 3,
        "b": 12
    },
    {
        "a": 4,
        "b": 10
    },
    {
        "a": 4,
        "b": 5
    },
    {
        "a": 5,
        "b": 6
    },
    {
        "a": 5,
        "b": 9
    },
    {
        "a": 5,
        "b": 10
    },
    {
        "a": 6,
        "b": 7
    },
    {
        "a": 6,
        "b": 8
    },
    {
        "a": 8,
        "b": 9
    },
    {
        "a": 9,
        "b": 10
    },
    {
        "a": 9,
        "b": 13
    },
    {
        "a": 9,
        "b": 14
    },
    {
        "a": 10,
        "b": 12
    },
    {
        "a": 10,
        "b": 13
    },
    {
        "a": 11,
        "b": 12
    },
    {
        "a": 12,
        "b": 15
    },
    {
        "a": 12,
        "b": 16
    },
    {
        "a": 13,
        "b": 14
    },
    {
        "a": 13,
        "b": 15
    },
    {
        "a": 13,
        "b": 21
    },
    {
        "a": 14,
        "b": 22
    },
    {
        "a": 15,
        "b": 16
    },
    {
        "a": 15,
        "b": 20
    },
    {
        "a": 15,
        "b": 21
    },
    {
        "a": 16,
        "b": 17
    },
    {
        "a": 16,
        "b": 19
    },
    {
        "a": 17,
        "b": 18
    },
    {
        "a": 17,
        "b": 19
    },
    {
        "a": 18,
        "b": 31
    },
    {
        "a": 18,
        "b": 32
    },
    {
        "a": 19,
        "b": 20
    },
    {
        "a": 19,
        "b": 30
    },
    {
        "a": 19,
        "b": 31
    },
    {
        "a": 20,
        "b": 21
    },
    {
        "a": 20,
        "b": 29
    },
    {
        "a": 20,
        "b": 30
    },
    {
        "a": 20,
        "b": 34
    },
    {
        "a": 21,
        "b": 22
    },
    {
        "a": 21,
        "b": 29
    },
    {
        "a": 22,
        "b": 23
    },
    {
        "a": 22,
        "b": 28
    },
    {
        "a": 23,
        "b": 24
    },
    {
        "a": 23,
        "b": 27
    },
    {
        "a": 24,
        "b": 25
    },
    {
        "a": 25,
        "b": 26
    },
    {
        "a": 26,
        "b": 37
    },
    {
        "a": 27,
        "b": 37
    },
    {
        "a": 28,
        "b": 29
    },
    {
        "a": 28,
        "b": 36
    },
    {
        "a": 29,
        "b": 34
    },
    {
        "a": 29,
        "b": 35
    },
    {
        "a": 30,
        "b": 31
    },
    {
        "a": 30,
        "b": 33
    },
    {
        "a": 30,
        "b": 41
    },
    {
        "a": 30,
        "b": 40
    },
    {
        "a": 30,
        "b": 34
    },
    {
        "a": 31,
        "b": 32
    },
    {
        "a": 31,
        "b": 33
    },
    {
        "a": 33,
        "b": 41
    },
    {
        "a": 33,
        "b": 42
    },
    {
        "a": 34,
        "b": 35
    },
    {
        "a": 34,
        "b": 40
    },
    {
        "a": 35,
        "b": 36
    },
    {
        "a": 35,
        "b": 39
    },
    {
        "a": 35,
        "b": 40
    },
    {
        "a": 36,
        "b": 38
    },
    {
        "a": 37,
        "b": 58
    },
    {
        "a": 37,
        "b": 59
    },
    {
        "a": 38,
        "b": 39
    },
    {
        "a": 39,
        "b": 40
    },
    {
        "a": 39,
        "b": 45
    },
    {
        "a": 40,
        "b": 41
    },
    {
        "a": 41,
        "b": 42
    },
    {
        "a": 41,
        "b": 44
    },
    {
        "a": 42,
        "b": 43
    },
    {
        "a": 43,
        "b": 48
    },
    {
        "a": 43,
        "b": 49
    },
    {
        "a": 44,
        "b": 45
    },
    {
        "a": 44,
        "b": 49
    },
    {
        "a": 45,
        "b": 46
    },
    {
        "a": 46,
        "b": 55
    },
    {
        "a": 47,
        "b": 48
    },
    {
        "a": 48,
        "b": 51
    },
    {
        "a": 48,
        "b": 52
    },
    {
        "a": 49,
        "b": 52
    },
    {
        "a": 49,
        "b": 53
    },
    {
        "a": 50,
        "b": 51
    },
    {
        "a": 51,
        "b": 80
    },
    {
        "a": 52,
        "b": 79
    },
    {
        "a": 53,
        "b": 54
    },
    {
        "a": 53,
        "b": 78
    },
    {
        "a": 54,
        "b": 55
    },
    {
        "a": 54,
        "b": 77
    },
    {
        "a": 55,
        "b": 56
    },
    {
        "a": 55,
        "b": 77
    },
    {
        "a": 56,
        "b": 57
    },
    {
        "a": 56,
        "b": 75
    },
    {
        "a": 57,
        "b": 60
    },
    {
        "a": 57,
        "b": 73
    },
    {
        "a": 58,
        "b": 59
    },
    {
        "a": 58,
        "b": 60
    },
    {
        "a": 59,
        "b": 61
    },
    {
        "a": 60,
        "b": 61
    },
    {
        "a": 60,
        "b": 71
    },
    {
        "a": 61,
        "b": 62
    },
    {
        "a": 61,
        "b": 71
    },
    {
        "a": 62,
        "b": 63
    },
    {
        "a": 62,
        "b": 70
    },
    {
        "a": 63,
        "b": 64
    },
    {
        "a": 64,
        "b": 65
    },
    {
        "a": 65,
        "b": 67
    },
    {
        "a": 66,
        "b": 67
    },
    {
        "a": 66,
        "b": 113,
        "nations": "it"
    },
    {
        "a": 67,
        "b": 68
    },
    {
        "a": 68,
        "b": 69
    },
    {
        "a": 69,
        "b": 70
    },
    {
        "a": 70,
        "b": 71
    },
    {
        "a": 71,
        "b": 72
    },
    {
        "a": 71,
        "b": 73
    },
    {
        "a": 72,
        "b": 74
    },
    {
        "a": 72,
        "b": 88
    },
    {
        "a": 73,
        "b": 74
    },
    {
        "a": 74,
        "b": 87
    },
    {
        "a": 75,
        "b": 76
    },
    {
        "a": 75,
        "b": 87
    },
    {
        "a": 76,
        "b": 77
    },
    {
        "a": 77,
        "b": 86
    },
    {
        "a": 78,
        "b": 79
    },
    {
        "a": 78,
        "b": 83
    },
    {
        "a": 79,
        "b": 80
    },
    {
        "a": 79,
        "b": 81
    },
    {
        "a": 79,
        "b": 82
    },
    {
        "a": 80,
        "b": 81
    },
    {
        "a": 81,
        "b": 97
    },
    {
        "a": 82,
        "b": 83
    },
    {
        "a": 82,
        "b": 94
    },
    {
        "a": 82,
        "b": 95
    },
    {
        "a": 83,
        "b": 84
    },
    {
        "a": 84,
        "b": 85
    },
    {
        "a": 85,
        "b": 91
    },
    {
        "a": 86,
        "b": 89
    },
    {
        "a": 86,
        "b": 90
    },
    {
        "a": 87,
        "b": 88
    },
    {
        "a": 87,
        "b": 89
    },
    {
        "a": 88,
        "b": 108
    },
    {
        "a": 89,
        "b": 90
    },
    {
        "a": 89,
        "b": 108
    },
    {
        "a": 90,
        "b": 91
    },
    {
        "a": 90,
        "b": 106
    },
    {
        "a": 91,
        "b": 92
    },
    {
        "a": 92,
        "b": 93
    },
    {
        "a": 92,
        "b": 105
    },
    {
        "a": 93,
        "b": 94
    },
    {
        "a": 93,
        "b": 103
    },
    {
        "a": 93,
        "b": 104
    },
    {
        "a": 94,
        "b": 95
    },
    {
        "a": 94,
        "b": 102
    },
    {
        "a": 95,
        "b": 96
    },
    {
        "a": 95,
        "b": 102
    },
    {
        "a": 96,
        "b": 98
    },
    {
        "a": 96,
        "b": 100
    },
    {
        "a": 96,
        "b": 101
    },
    {
        "a": 96,
        "b": 102
    },
    {
        "a": 97,
        "b": 98
    },
    {
        "a": 98,
        "b": 100
    },
    {
        "a": 99,
        "b": 100
    },
    {
        "a": 99,
        "b": 136
    },
    {
        "a": 100,
        "b": 101
    },
    {
        "a": 100,
        "b": 136
    },
    {
        "a": 100,
        "b": 135
    },
    {
        "a": 101,
        "b": 102
    },
    {
        "a": 101,
        "b": 134
    },
    {
        "a": 101,
        "b": 135
    },
    {
        "a": 102,
        "b": 103
    },
    {
        "a": 102,
        "b": 134
    },
    {
        "a": 103,
        "b": 104
    },
    {
        "a": 103,
        "b": 133
    },
    {
        "a": 104,
        "b": 105
    },
    {
        "a": 104,
        "b": 132
    },
    {
        "a": 105,
        "b": 106
    },
    {
        "a": 105,
        "b": 131
    },
    {
        "a": 106,
        "b": 107
    },
    {
        "a": 106,
        "b": 128
    },
    {
        "a": 106,
        "b": 130
    },
    {
        "a": 107,
        "b": 108
    },
    {
        "a": 107,
        "b": 126
    },
    {
        "a": 107,
        "b": 128
    },
    {
        "a": 108,
        "b": 109
    },
    {
        "a": 109,
        "b": 124
    },
    {
        "a": 110,
        "b": 111
    },
    {
        "a": 110,
        "b": 124
    },
    {
        "a": 111,
        "b": 112
    },
    {
        "a": 112,
        "b": 113
    },
    {
        "a": 112,
        "b": 121
    },
    {
        "a": 113,
        "b": 114
    },
    {
        "a": 114,
        "b": 115
    },
    {
        "a": 114,
        "b": 117
    },
    {
        "a": 114,
        "b": 118
    },
    {
        "a": 115,
        "b": 116
    },
    {
        "a": 117,
        "b": 118
    },
    {
        "a": 117,
        "b": 119
    },
    {
        "a": 117,
        "b": 120
    },
    {
        "a": 118,
        "b": 120
    },
    {
        "a": 118,
        "b": 121
    },
    {
        "a": 119,
        "b": 120
    },
    {
        "a": 119,
        "b": 211
    },
    {
        "a": 120,
        "b": 198
    },
    {
        "a": 120,
        "b": 211
    },
    {
        "a": 121,
        "b": 122
    },
    {
        "a": 121,
        "b": 198
    },
    {
        "a": 122,
        "b": 123
    },
    {
        "a": 122,
        "b": 125
    },
    {
        "a": 122,
        "b": 198
    },
    {
        "a": 123,
        "b": 124
    },
    {
        "a": 123,
        "b": 125
    },
    {
        "a": 124,
        "b": 126
    },
    {
        "a": 125,
        "b": 126
    },
    {
        "a": 125,
        "b": 127
    },
    {
        "a": 126,
        "b": 128
    },
    {
        "a": 127,
        "b": 128
    },
    {
        "a": 127,
        "b": 195
    },
    {
        "a": 128,
        "b": 129
    },
    {
        "a": 129,
        "b": 130
    },
    {
        "a": 129,
        "b": 192
    },
    {
        "a": 130,
        "b": 131
    },
    {
        "a": 130,
        "b": 178
    },
    {
        "a": 131,
        "b": 132
    },
    {
        "a": 131,
        "b": 178
    },
    {
        "a": 132,
        "b": 133
    },
    {
        "a": 132,
        "b": 176
    },
    {
        "a": 133,
        "b": 134
    },
    {
        "a": 133,
        "b": 165
    },
    {
        "a": 134,
        "b": 135
    },
    {
        "a": 134,
        "b": 163
    },
    {
        "a": 135,
        "b": 162
    },
    {
        "a": 136,
        "b": 137
    },
    {
        "a": 136,
        "b": 147
    },
    {
        "a": 136,
        "b": 161
    },
    {
        "a": 137,
        "b": 138
    },
    {
        "a": 137,
        "b": 139
    },
    {
        "a": 138,
        "b": 139
    },
    {
        "a": 139,
        "b": 140
    },
    {
        "a": 139,
        "b": 146
    },
    {
        "a": 139,
        "b": 147
    },
    {
        "a": 140,
        "b": 141,
        "nations": "ru"
    },
    {
        "a": 140,
        "b": 146
    },
    {
        "a": 141,
        "b": 143,
        "nations": "ru"
    },
    {
        "a": 142,
        "b": 143,
        "nations": "ru"
    },
    {
        "a": 142,
        "b": 145
    },
    {
        "a": 143,
        "b": 144,
        "nations": "ru"
    },
    {
        "a": 144,
        "b": 145
    },
    {
        "a": 144,
        "b": 151
    },
    {
        "a": 144,
        "b": 152,
        "nations": "ru"
    },
    {
        "a": 145,
        "b": 146
    },
    {
        "a": 145,
        "b": 150
    },
    {
        "a": 146,
        "b": 148
    },
    {
        "a": 146,
        "b": 149
    },
    {
        "a": 146,
        "b": 150
    },
    {
        "a": 147,
        "b": 148
    },
    {
        "a": 147,
        "b": 161
    },
    {
        "a": 148,
        "b": 149
    },
    {
        "a": 148,
        "b": 161
    },
    {
        "a": 149,
        "b": 150
    },
    {
        "a": 149,
        "b": 157
    },
    {
        "a": 150,
        "b": 151
    },
    {
        "a": 150,
        "b": 154
    },
    {
        "a": 151,
        "b": 153
    },
    {
        "a": 151,
        "b": 154
    },
    {
        "a": 152,
        "b": 153,
        "nations": "ru"
    },
    {
        "a": 153,
        "b": 154
    },
    {
        "a": 153,
        "b": 155
    },
    {
        "a": 154,
        "b": 156
    },
    {
        "a": 154,
        "b": 157
    },
    {
        "a": 155,
        "b": 156
    },
    {
        "a": 155,
        "b": 158
    },
    {
        "a": 156,
        "b": 158
    },
    {
        "a": 156,
        "b": 159
    },
    {
        "a": 157,
        "b": 159
    },
    {
        "a": 157,
        "b": 160
    },
    {
        "a": 158,
        "b": 169
    },
    {
        "a": 159,
        "b": 160
    },
    {
        "a": 159,
        "b": 168
    },
    {
        "a": 160,
        "b": 161
    },
    {
        "a": 161,
        "b": 162
    },
    {
        "a": 162,
        "b": 163
    },
    {
        "a": 163,
        "b": 164
    },
    {
        "a": 163,
        "b": 165
    },
    {
        "a": 163,
        "b": 166
    },
    {
        "a": 164,
        "b": 166
    },
    {
        "a": 164,
        "b": 167
    },
    {
        "a": 165,
        "b": 166
    },
    {
        "a": 165,
        "b": 174
    },
    {
        "a": 165,
        "b": 176
    },
    {
        "a": 166,
        "b": 167
    },
    {
        "a": 166,
        "b": 174
    },
    {
        "a": 167,
        "b": 173
    },
    {
        "a": 168,
        "b": 172
    },
    {
        "a": 169,
        "b": 171
    },
    {
        "a": 170,
        "b": 171,
        "nations": "ru"
    },
    {
        "a": 171,
        "b": 172
    },
    {
        "a": 171,
        "b": 185
    },
    {
        "a": 172,
        "b": 173
    },
    {
        "a": 172,
        "b": 175
    },
    {
        "a": 172,
        "b": 185
    },
    {
        "a": 173,
        "b": 174
    },
    {
        "a": 173,
        "b": 175
    },
    {
        "a": 174,
        "b": 175
    },
    {
        "a": 174,
        "b": 177
    },
    {
        "a": 175,
        "b": 180
    },
    {
        "a": 175,
        "b": 183
    },
    {
        "a": 176,
        "b": 177
    },
    {
        "a": 176,
        "b": 178
    },
    {
        "a": 176,
        "b": 179
    },
    {
        "a": 177,
        "b": 179
    },
    {
        "a": 177,
        "b": 180
    },
    {
        "a": 178,
        "b": 179
    },
    {
        "a": 178,
        "b": 181
    },
    {
        "a": 179,
        "b": 180
    },
    {
        "a": 179,
        "b": 181
    },
    {
        "a": 179,
        "b": 182
    },
    {
        "a": 180,
        "b": 182
    },
    {
        "a": 180,
        "b": 183
    },
    {
        "a": 181,
        "b": 182
    },
    {
        "a": 181,
        "b": 192
    },
    {
        "a": 182,
        "b": 183
    },
    {
        "a": 183,
        "b": 184
    },
    {
        "a": 183,
        "b": 189
    },
    {
        "a": 184,
        "b": 185
    },
    {
        "a": 184,
        "b": 187
    },
    {
        "a": 184,
        "b": 189
    },
    {
        "a": 185,
        "b": 187
    },
    {
        "a": 186,
        "b": 187,
        "nations": "ru"
    },
    {
        "a": 186,
        "b": 188,
        "nations": "ru"
    },
    {
        "a": 186,
        "b": 233,
        "nations": "ru"
    },
    {
        "a": 186,
        "b": 234,
        "nations": "ru"
    },
    {
        "a": 187,
        "b": 188
    },
    {
        "a": 188,
        "b": 201
    },
    {
        "a": 189,
        "b": 190
    },
    {
        "a": 189,
        "b": 200
    },
    {
        "a": 190,
        "b": 199
    },
    {
        "a": 191,
        "b": 192
    },
    {
        "a": 191,
        "b": 194
    },
    {
        "a": 192,
        "b": 193
    },
    {
        "a": 193,
        "b": 194
    },
    {
        "a": 193,
        "b": 196
    },
    {
        "a": 194,
        "b": 203
    },
    {
        "a": 195,
        "b": 196
    },
    {
        "a": 195,
        "b": 197
    },
    {
        "a": 196,
        "b": 197
    },
    {
        "a": 196,
        "b": 203
    },
    {
        "a": 197,
        "b": 204
    },
    {
        "a": 197,
        "b": 207
    },
    {
        "a": 198,
        "b": 208
    },
    {
        "a": 199,
        "b": 200
    },
    {
        "a": 199,
        "b": 202
    },
    {
        "a": 199,
        "b": 203
    },
    {
        "a": 200,
        "b": 201
    },
    {
        "a": 201,
        "b": 202
    },
    {
        "a": 202,
        "b": 204
    },
    {
        "a": 202,
        "b": 205
    },
    {
        "a": 203,
        "b": 204
    },
    {
        "a": 204,
        "b": 206
    },
    {
        "a": 204,
        "b": 207
    },
    {
        "a": 205,
        "b": 206
    },
    {
        "a": 206,
        "b": 207
    },
    {
        "a": 206,
        "b": 208
    },
    {
        "a": 206,
        "b": 209
    },
    {
        "a": 207,
        "b": 208
    },
    {
        "a": 208,
        "b": 209
    },
    {
        "a": 208,
        "b": 211
    },
    {
        "a": 209,
        "b": 210
    },
    {
        "a": 210,
        "b": 211
    },
    {
        "a": 210,
        "b": 212
    },
    {
        "a": 210,
        "b": 219
    },
    {
        "a": 212,
        "b": 216,
        "nations": "mef"
    },
    {
        "a": 212,
        "b": 219
    },
    {
        "a": 213,
        "b": 217,
        "nations": "mef"
    },
    {
        "a": 213,
        "b": 214
    },
    {
        "a": 214,
        "b": 215
    },
    {
        "a": 214,
        "b": 220
    },
    {
        "a": 215,
        "b": 218,
        "nations": "mef"
    },
    {
        "a": 219,
        "b": 220
    },
    {
        "a": 219,
        "b": 221
    },
    {
        "a": 219,
        "b": 222
    },
    {
        "a": 220,
        "b": 222
    },
    {
        "a": 221,
        "b": 223
    },
    {
        "a": 222,
        "b": 224
    },
    {
        "a": 222,
        "b": 249
    },
    {
        "a": 223,
        "b": 225
    },
    {
        "a": 224,
        "b": 225
    },
    {
        "a": 224,
        "b": 226
    },
    {
        "a": 225,
        "b": 226
    },
    {
        "a": 225,
        "b": 227
    },
    {
        "a": 226,
        "b": 229
    },
    {
        "a": 226,
        "b": 248
    },
    {
        "a": 227,
        "b": 228
    },
    {
        "a": 228,
        "b": 229
    },
    {
        "a": 228,
        "b": 230
    },
    {
        "a": 229,
        "b": 241
    },
    {
        "a": 229,
        "b": 247
    },
    {
        "a": 230,
        "b": 231
    },
    {
        "a": 231,
        "b": 232
    },
    {
        "a": 231,
        "b": 233
    },
    {
        "a": 232,
        "b": 236
    },
    {
        "a": 232,
        "b": 241
    },
    {
        "a": 234,
        "b": 235
    },
    {
        "a": 234,
        "b": 236
    },
    {
        "a": 235,
        "b": 236
    },
    {
        "a": 236,
        "b": 237
    },
    {
        "a": 236,
        "b": 239
    },
    {
        "a": 237,
        "b": 238
    },
    {
        "a": 239,
        "b": 240
    },
    {
        "a": 239,
        "b": 242
    },
    {
        "a": 240,
        "b": 241
    },
    {
        "a": 240,
        "b": 244
    },
    {
        "a": 241,
        "b": 246
    },
    {
        "a": 242,
        "b": 243
    },
    {
        "a": 242,
        "b": 244
    },
    {
        "a": 243,
        "b": 255
    },
    {
        "a": 244,
        "b": 245
    },
    {
        "a": 245,
        "b": 246
    },
    {
        "a": 246,
        "b": 247
    },
    {
        "a": 246,
        "b": 253
    },
    {
        "a": 247,
        "b": 248
    },
    {
        "a": 247,
        "b": 252
    },
    {
        "a": 248,
        "b": 250
    },
    {
        "a": 249,
        "b": 250
    },
    {
        "a": 250,
        "b": 260,
        "nations": "mef"
    },
    {
        "a": 250,
        "b": 251
    },
    {
        "a": 251,
        "b": 252
    },
    {
        "a": 251,
        "b": 258
    },
    {
        "a": 251,
        "b": 259
    },
    {
        "a": 252,
        "b": 253
    },
    {
        "a": 253,
        "b": 254
    },
    {
        "a": 254,
        "b": 257
    },
    {
        "a": 255,
        "b": 256
    },
    {
        "a": 255,
        "b": 265
    },
    {
        "a": 256,
        "b": 263
    },
    {
        "a": 256,
        "b": 265
    },
    {
        "a": 257,
        "b": 263
    },
    {
        "a": 258,
        "b": 261
    },
    {
        "a": 258,
        "b": 262
    },
    {
        "a": 259,
        "b": 261
    },
    {
        "a": 261,
        "b": 275
    },
    {
        "a": 261,
        "b": 276
    },
    {
        "a": 262,
        "b": 271,
        "nations": "ana"
    },
    {
        "a": 262,
        "b": 275
    },
    {
        "a": 263,
        "b": 264
    },
    {
        "a": 263,
        "b": 268
    },
    {
        "a": 264,
        "b": 267
    },
    {
        "a": 265,
        "b": 266
    },
    {
        "a": 266,
        "b": 267
    },
    {
        "a": 266,
        "b": 269
    },
    {
        "a": 267,
        "b": 269
    },
    {
        "a": 267,
        "b": 270
    },
    {
        "a": 268,
        "b": 270
    },
    {
        "a": 271,
        "b": 275,
        "nations": "ana"
    },
    {
        "a": 271,
        "b": 272,
        "nations": "ana"
    },
    {
        "a": 271,
        "b": 273,
        "nations": "ana"
    },
    {
        "a": 272,
        "b": 273,
        "nations": "ana|tu"
    },
    {
        "a": 273,
        "b": 274
    },
    {
        "a": 274,
        "b": 275
    },
    {
        "a": 274,
        "b": 276
    },
    {
        "a": 274,
        "b": 277
    },
    {
        "a": 276,
        "b": 277
    },
    {
        "a": 277,
        "b": 278
    },
    {
        "a": 277,
        "b": 279
    },
    {
        "a": 278,
        "b": 279
    },
    {
        "a": 278,
        "b": 280
    },
    {
        "a": 279,
        "b": 280
    },
    {
        "a": 280,
        "b": 281
    },
    {
        "a": 216,
        "b": 212,
    },
    {
        "a": 217,
        "b": 213,
    },
    {
        "a": 218,
        "b": 215,
    },
    {
        "a": 260,
        "b": 250,
    }
]

for (let i = 1; i < spaces.length; i++) {
    spaces[i].connections = []
    spaces[i].limited_connections = { br: [], it: [], ru: [], mef: [], ana: [], tu: [] }
}

for (let i = 0; i < edges.length; i++) {
    let edge = edges[i]
    if (edge.nations) {
        edge.nations.split('|').forEach(nation => {
            spaces[edge.a].limited_connections[nation].push(edge.b)
            spaces[edge.b].limited_connections[nation].push(edge.a)
        })
    } else {
        spaces[edge.a].connections.push(edge.b)
        spaces[edge.b].connections.push(edge.a)
    }
}

if (typeof module !== 'undefined') module.exports = {cards,pieces,spaces}
