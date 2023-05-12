
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
        "effect": "2nd Army, 1 corps."
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
        "effect": "11th Army, 1 corps."
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
        "effect": "2 corps."
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
        "effect": "10th Army."
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
        "effect": "9th Army, 10th Army."
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
        "effect": "1st Army, 1 corps."
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
        "effect": "Place the two Russian Cavalry corps in any one space inside Russia containing a supplied Russian Army. They may not be placed in violation of the stacking limit."
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
        "effect": "4th Army, 1 corps."
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
        "effect": "AUS Corps, CND Corps."
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
        "effect": "May only be played after ITALY joins the Allies. 5th Army."
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
        "effect": "7th Army."
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
        "effect": "6th Army, 7th Army, 2 corps."
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
        "effect": "Place the Russian CAU Army in any supplied space in Russia on the Near East map."
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
        "effect": "May only be played if Turkey is at war and before \"Salonika\". Place the MEF Army at any MEF space. See 9.5.3.5."
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
        "effect": "12th Army."
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
        "effect": "3rd Army, 2 corps."
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
        "effect": "Remove from the game 1 AH Corps from the CP Eliminated/Replacement Box. Add the RU Czech Legion orps to the Allied Reserve Box."
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
        "effect": "Any one attack made by BR units tracing supply to Basra may fire on the Army Table."
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
        "effect": "May only be played after \"Over There\". 1 corps."
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
        "effect": "May only be played if Turkey is at war. Place the British ANA Corps in the Arabia space."
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
        "effect": "5th Army, 1 corps, PT Corps."
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
        "effect": "May only be played after \"Over There\". 1st Army, 2 corps."
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
        "effect": "May only be played after \"Over There\". 2nd Army, 1 corps."
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
        "effect": "May only be played after \"Sinai Pipeline\". Place the British NE Army in Alexandria."
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
        "effect": "May only be played after at least one of the following has occurred: \"Blucher,\" \"Michel\" or \"Peace Offensive\". Allied units in Italy, France and Belgium are considered one nationality for Activation for the rest of this turn (only)."
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
        "effect": "Place the French Orient Army in the Salonika space if Allied controlled, subject to stacking limits."
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
        "effect": "May only be played after \"Zimmerman Telegram\". Allows play of \"US Reinforcements\" on any following turns. ALL Allied RP cards played now include 1 US RP."
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
        "effect": "May only be played after 'Over There'. 2 Corps [2-1-4/1-1-4]"
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
        "effect": "9th Army."
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
        "effect": "10th Army, 2 corps."
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
        "effect": "Hungary Reinforcements - 7th Army, 2 corps."
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
        "effect": "An AH attack or defence adds +1drm."
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
        "effect": "Hungary Reinforcements - 10th Army."
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
        "effect": "11th Army, 1 corps."
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
        "effect": "12th Army, 1 corps."
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
        "effect": "11th Army."
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
        "effect": "(May only be played if there are no Allied units in the Libya space.) Place the SN unit in Libya."
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
        "effect": "Permanently remove 1 BR corps from the game or add 1 VP (Allied choice)."
    },
    {
        "num": 33,
        "faction": "cp",
        "commitment": "limited",
        "ops": 5,
        "sr": 5,
        "remove": true,
        "ws": 1,
        "rpah": 3,
        "rpbu": 1,
        "rpge": 4,
        "rptu": 2,
        "name": "Walter Rathenau",
        "effect": "Add 1 extra GE RP during the Replacement Phase of every turn."
    },
    {
        "num": 34,
        "faction": "cp",
        "commitment": "limited",
        "ops": 5,
        "sr": 5,
        "remove": true,
        "ws": 1,
        "rpah": 3,
        "rpge": 4,
        "rptu": 2,
        "name": "Bulgaria",
        "effect": "Bulgaria joins the CP."
    },
    {
        "num": 58,
        "faction": "cp",
        "commitment": "limited",
        "ops": 2,
        "sr": 2,
        "rpge": 1,
        "name": "Stavka Timidity",
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
        "effect": "Entrenched GE units in France/Belgium/Germany may ignore all retreat results vs. attacks with BR units this turn. No effect after play of Michel, Blucher, Peace Offensive."
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
        "name": "Hoffman",
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
        "effect": "2 corps."
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
        "effect": "2 corps."
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
        "effect": "14th Army."
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
        "effect": "YLD Army."
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
        "effect": "17th Army, 18th Army."
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
        "effect": "AoI Army."
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
        "name": "Michel",
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
        "effect": "Allows play of \"Michel\", \"Blucher\", \"Peace Offensive\", \"Hoffman\", and \"U-Boats Unleashed\". Prevents play of \"Place of Execution\"."
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
        "effect": "No BR attacks vs. Level 2 entrenched GE units may be made for the rest of this turn. This effect is canceled by play of MICHEL, BLUCHER, or PEACE OFFENSIVE events."
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
        "effect": "May not be used if Allies play \"Royal Tank Corps\" or \"Yanks and Tanks\".  Cancels any one Allied attack in France/Belgium. Any Allied CC cards are considered not played."
    },
    {
        "num": 65,
        "faction": "cp",
        "commitment": "total",
        "ops": 4,
        "sr": 4,
        "remove": true,
        "rpah": 2,
        "rpbu": 1,
        "rpge": 3,
        "rptu": 1,
        "name": "Prince Max",
        "effect": "May not be played after \"H-L Take Command\" or on or after Turn 13. The \"H-L Take Command\" card is permanently removed from the game. A draw is treated as a CP Victory (including tournament play)."
    }
]

const pieces = [
    {},
    {
        "faction": "cp",
        "nation": "ge",
        "name": "1 Army",
        "type": "army",
        "counter": "ge_1_army",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "2 Army",
        "type": "army",
        "counter": "ge_2_army",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "3 Army",
        "type": "army",
        "counter": "ge_3_army",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "4 Army",
        "type": "army",
        "counter": "ge_4_army",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "5 Army",
        "type": "army",
        "counter": "ge_5_army",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "6 Army",
        "type": "army",
        "counter": "ge_6_army",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "7 Army",
        "type": "army",
        "counter": "ge_7_army",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "8 Army",
        "type": "army",
        "counter": "ge_8_army",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "9 Army",
        "type": "army",
        "counter": "ge_9_army",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "10 Army",
        "type": "army",
        "counter": "ge_10_army",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "11 Army",
        "type": "army",
        "counter": "ge_11_army",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "12 Army",
        "type": "army",
        "counter": "ge_12_army",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "14 Army",
        "type": "army",
        "counter": "ge_14_army",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "17 Army",
        "type": "army",
        "counter": "ge_17_army",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "18 Army",
        "type": "army",
        "counter": "ge_18_army",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "1 Army",
        "type": "army",
        "counter": "ah_1_army",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "2 Army",
        "type": "army",
        "counter": "ah_2_army",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "3 Army",
        "type": "army",
        "counter": "ah_3_army",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "4 Army",
        "type": "army",
        "counter": "ah_4_army",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "5 Army",
        "type": "army",
        "counter": "ah_5_army",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "6 Army",
        "type": "army",
        "counter": "ah_6_army",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "7 Army",
        "type": "army",
        "counter": "ah_7_army",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "10 Army",
        "type": "army",
        "counter": "ah_10_army",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "11 Army",
        "type": "army",
        "counter": "ah_11_army",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "1 Army",
        "type": "army",
        "counter": "it_1_army",
        "cf": 2,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "2 Army",
        "type": "army",
        "counter": "it_2_army",
        "cf": 2,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "3 Army",
        "type": "army",
        "counter": "it_3_army",
        "cf": 2,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "4 Army",
        "type": "army",
        "counter": "it_4_army",
        "cf": 2,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "5 Army",
        "type": "army",
        "counter": "it_5_army",
        "cf": 2,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "YLD",
        "type": "army",
        "counter": "tu_yld_army",
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
        "name": "AoI",
        "type": "army",
        "counter": "tu_aoi_army",
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
        "name": "1 Army",
        "type": "army",
        "counter": "fr_1_army",
        "cf": 3,
        "lf": 3,
        "mf": 3,
        "rcf": 2,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "2 Army",
        "type": "army",
        "counter": "fr_2_army",
        "cf": 3,
        "lf": 3,
        "mf": 3,
        "rcf": 2,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "3 Army",
        "type": "army",
        "counter": "fr_3_army",
        "cf": 3,
        "lf": 3,
        "mf": 3,
        "rcf": 2,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "4 Army",
        "type": "army",
        "counter": "fr_4_army",
        "cf": 3,
        "lf": 3,
        "mf": 3,
        "rcf": 2,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "5 Army",
        "type": "army",
        "counter": "fr_5_army",
        "cf": 3,
        "lf": 3,
        "mf": 3,
        "rcf": 2,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "6 Army",
        "type": "army",
        "counter": "fr_6_army",
        "cf": 3,
        "lf": 3,
        "mf": 3,
        "rcf": 2,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "7 Army",
        "type": "army",
        "counter": "fr_7_army",
        "cf": 3,
        "lf": 3,
        "mf": 3,
        "rcf": 2,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "9 Army",
        "type": "army",
        "counter": "fr_9_army",
        "cf": 3,
        "lf": 3,
        "mf": 3,
        "rcf": 2,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "10 Army",
        "type": "army",
        "counter": "fr_10_army",
        "cf": 3,
        "lf": 3,
        "mf": 3,
        "rcf": 2,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "Orient",
        "type": "army",
        "counter": "fr_orient_army",
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
        "name": "1 Army",
        "type": "army",
        "counter": "br_1_army",
        "cf": 4,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "2 Army",
        "type": "army",
        "counter": "br_2_army",
        "cf": 4,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "3 Army",
        "type": "army",
        "counter": "br_3_army",
        "cf": 4,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "4 Army",
        "type": "army",
        "counter": "br_4_army",
        "cf": 4,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "5 Army",
        "type": "army",
        "counter": "br_5_army",
        "cf": 4,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BEF",
        "type": "army",
        "counter": "br_bef_army",
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
        "name": "NE",
        "type": "army",
        "counter": "br_ne_army",
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
        "name": "MEF",
        "type": "army",
        "counter": "br_mef_army",
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
        "name": "1 Army",
        "type": "army",
        "counter": "us_1_army",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "us",
        "name": "2 Army",
        "type": "army",
        "counter": "us_2_army",
        "cf": 5,
        "lf": 3,
        "mf": 3,
        "rcf": 3,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "1 Army",
        "type": "army",
        "counter": "ru_1_army",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "2 Army",
        "type": "army",
        "counter": "ru_2_army",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "3 Army",
        "type": "army",
        "counter": "ru_3_army",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "4 Army",
        "type": "army",
        "counter": "ru_4_army",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "5 Army",
        "type": "army",
        "counter": "ru_5_army",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "6 Army",
        "type": "army",
        "counter": "ru_6_army",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "7 Army",
        "type": "army",
        "counter": "ru_7_army",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "8 Army",
        "type": "army",
        "counter": "ru_8_army",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "9 Army",
        "type": "army",
        "counter": "ru_9_army",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "10 Army",
        "type": "army",
        "counter": "ru_10_army",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "11 Army",
        "type": "army",
        "counter": "ru_11_army",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "12 Army",
        "type": "army",
        "counter": "ru_12_army",
        "cf": 3,
        "lf": 2,
        "mf": 3,
        "rcf": 2,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "Cau",
        "type": "army",
        "counter": "ru_cau_army",
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
        "name": "1 Army",
        "type": "army",
        "counter": "be_1_army",
        "cf": 2,
        "lf": 3,
        "mf": 3,
        "rcf": 1,
        "rlf": 3,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "sb",
        "name": "1 Army",
        "type": "army",
        "counter": "sb_1_army",
        "cf": 2,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "sb",
        "name": "2 Army",
        "type": "army",
        "counter": "sb_2_army",
        "cf": 2,
        "lf": 2,
        "mf": 3,
        "rcf": 1,
        "rlf": 2,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE Corps",
        "type": "corps",
        "counter": "ge_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE Corps",
        "type": "corps",
        "counter": "ge_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE Corps",
        "type": "corps",
        "counter": "ge_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE Corps",
        "type": "corps",
        "counter": "ge_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE Corps",
        "type": "corps",
        "counter": "ge_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE Corps",
        "type": "corps",
        "counter": "ge_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE Corps",
        "type": "corps",
        "counter": "ge_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE Corps",
        "type": "corps",
        "counter": "ge_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE Corps",
        "type": "corps",
        "counter": "ge_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE Corps",
        "type": "corps",
        "counter": "ge_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE Corps",
        "type": "corps",
        "counter": "ge_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE Corps",
        "type": "corps",
        "counter": "ge_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE Corps",
        "type": "corps",
        "counter": "ge_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE Corps",
        "type": "corps",
        "counter": "ge_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE Corps",
        "type": "corps",
        "counter": "ge_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE Corps",
        "type": "corps",
        "counter": "ge_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE Corps",
        "type": "corps",
        "counter": "ge_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE Corps",
        "type": "corps",
        "counter": "ge_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "cp",
        "nation": "ge",
        "name": "GE Corps",
        "type": "corps",
        "counter": "ge_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "A-H Corps",
        "type": "corps",
        "counter": "ah_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "A-H Corps",
        "type": "corps",
        "counter": "ah_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "A-H Corps",
        "type": "corps",
        "counter": "ah_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "A-H Corps",
        "type": "corps",
        "counter": "ah_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "A-H Corps",
        "type": "corps",
        "counter": "ah_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "A-H Corps",
        "type": "corps",
        "counter": "ah_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "A-H Corps",
        "type": "corps",
        "counter": "ah_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "A-H Corps",
        "type": "corps",
        "counter": "ah_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "A-H Corps",
        "type": "corps",
        "counter": "ah_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "A-H Corps",
        "type": "corps",
        "counter": "ah_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "ah",
        "name": "A-H Corps",
        "type": "corps",
        "counter": "ah_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TU Corps",
        "type": "corps",
        "counter": "tu_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TU Corps",
        "type": "corps",
        "counter": "tu_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TU Corps",
        "type": "corps",
        "counter": "tu_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TU Corps",
        "type": "corps",
        "counter": "tu_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TU Corps",
        "type": "corps",
        "counter": "tu_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TU Corps",
        "type": "corps",
        "counter": "tu_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TU Corps",
        "type": "corps",
        "counter": "tu_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TU Corps",
        "type": "corps",
        "counter": "tu_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TU Corps",
        "type": "corps",
        "counter": "tu_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TU Corps",
        "type": "corps",
        "counter": "tu_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TU Corps",
        "type": "corps",
        "counter": "tu_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TU Corps",
        "type": "corps",
        "counter": "tu_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TU Corps",
        "type": "corps",
        "counter": "tu_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "tu",
        "name": "TU Corps",
        "type": "corps",
        "counter": "tu_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "IT Corps",
        "type": "corps",
        "counter": "it_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "IT Corps",
        "type": "corps",
        "counter": "it_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "IT Corps",
        "type": "corps",
        "counter": "it_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "IT Corps",
        "type": "corps",
        "counter": "it_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "IT Corps",
        "type": "corps",
        "counter": "it_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "IT Corps",
        "type": "corps",
        "counter": "it_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "it",
        "name": "IT Corps",
        "type": "corps",
        "counter": "it_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "us",
        "name": "US Corps",
        "type": "corps",
        "counter": "us_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "us",
        "name": "US Corps",
        "type": "corps",
        "counter": "us_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "us",
        "name": "US Corps",
        "type": "corps",
        "counter": "us_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "us",
        "name": "US Corps",
        "type": "corps",
        "counter": "us_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "mn",
        "name": "MN Corps",
        "type": "corps",
        "counter": "mn_corps",
        "cf": 1,
        "lf": 1,
        "mf": 0,
        "rcf": 0,
        "rlf": 1,
        "rmf": 0
    },
    {
        "faction": "cp",
        "nation": "sn",
        "name": "SN Corps",
        "type": "corps",
        "counter": "sn_corps",
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
        "name": "BE Corps",
        "type": "corps",
        "counter": "be_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU Corps",
        "type": "corps",
        "counter": "ru_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU Corps",
        "type": "corps",
        "counter": "ru_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU Corps",
        "type": "corps",
        "counter": "ru_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU Corps",
        "type": "corps",
        "counter": "ru_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU Corps",
        "type": "corps",
        "counter": "ru_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU Corps",
        "type": "corps",
        "counter": "ru_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU Corps",
        "type": "corps",
        "counter": "ru_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU Corps",
        "type": "corps",
        "counter": "ru_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU Corps",
        "type": "corps",
        "counter": "ru_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU Corps",
        "type": "corps",
        "counter": "ru_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU Corps",
        "type": "corps",
        "counter": "ru_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU Corps",
        "type": "corps",
        "counter": "ru_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU Corps",
        "type": "corps",
        "counter": "ru_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU Corps",
        "type": "corps",
        "counter": "ru_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU Corps",
        "type": "corps",
        "counter": "ru_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU Corps",
        "type": "corps",
        "counter": "ru_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU Corps",
        "type": "corps",
        "counter": "ru_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ru",
        "name": "RU Corps",
        "type": "corps",
        "counter": "ru_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FR Corps",
        "type": "corps",
        "counter": "fr_corps",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FR Corps",
        "type": "corps",
        "counter": "fr_corps",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FR Corps",
        "type": "corps",
        "counter": "fr_corps",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FR Corps",
        "type": "corps",
        "counter": "fr_corps",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FR Corps",
        "type": "corps",
        "counter": "fr_corps",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FR Corps",
        "type": "corps",
        "counter": "fr_corps",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FR Corps",
        "type": "corps",
        "counter": "fr_corps",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FR Corps",
        "type": "corps",
        "counter": "fr_corps",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FR Corps",
        "type": "corps",
        "counter": "fr_corps",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "fr",
        "name": "FR Corps",
        "type": "corps",
        "counter": "fr_corps",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BR Corps",
        "type": "corps",
        "counter": "br_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BR Corps",
        "type": "corps",
        "counter": "br_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BR Corps",
        "type": "corps",
        "counter": "br_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BR Corps",
        "type": "corps",
        "counter": "br_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BR Corps",
        "type": "corps",
        "counter": "br_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BR Corps",
        "type": "corps",
        "counter": "br_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BR Corps",
        "type": "corps",
        "counter": "br_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BR Corps",
        "type": "corps",
        "counter": "br_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BR Corps",
        "type": "corps",
        "counter": "br_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BR Corps",
        "type": "corps",
        "counter": "br_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 1,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "ANA Corps",
        "type": "corps",
        "counter": "ana_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "PT Corps",
        "type": "corps",
        "counter": "pt_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "AUS Corps",
        "type": "corps",
        "counter": "aus_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 2,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "CND Corps",
        "type": "corps",
        "counter": "cnd_corps",
        "cf": 2,
        "lf": 1,
        "mf": 4,
        "rcf": 2,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "br",
        "name": "BEF Corps",
        "type": "corps",
        "counter": "bef_corps",
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
        "name": "SB Corps",
        "type": "corps",
        "counter": "sb_corps",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 0,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "ap",
        "nation": "sb",
        "name": "SB Corps",
        "type": "corps",
        "counter": "sb_corps",
        "cf": 1,
        "lf": 1,
        "mf": 4,
        "rcf": 0,
        "rlf": 1,
        "rmf": 4
    },
    {
        "faction": "cp",
        "nation": "bu",
        "name": "BU Corps",
        "type": "corps",
        "counter": "bu_corps",
        "cf": 2,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "bu",
        "name": "BU Corps",
        "type": "corps",
        "counter": "bu_corps",
        "cf": 2,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "bu",
        "name": "BU Corps",
        "type": "corps",
        "counter": "bu_corps",
        "cf": 2,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "bu",
        "name": "BU Corps",
        "type": "corps",
        "counter": "bu_corps",
        "cf": 2,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "bu",
        "name": "BU Corps",
        "type": "corps",
        "counter": "bu_corps",
        "cf": 2,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "cp",
        "nation": "bu",
        "name": "BU Corps",
        "type": "corps",
        "counter": "bu_corps",
        "cf": 2,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ro",
        "name": "RO Corps",
        "type": "corps",
        "counter": "ro_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ro",
        "name": "RO Corps",
        "type": "corps",
        "counter": "ro_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ro",
        "name": "RO Corps",
        "type": "corps",
        "counter": "ro_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ro",
        "name": "RO Corps",
        "type": "corps",
        "counter": "ro_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ro",
        "name": "RO Corps",
        "type": "corps",
        "counter": "ro_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "ro",
        "name": "RO Corps",
        "type": "corps",
        "counter": "ro_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "gr",
        "name": "GR Corps",
        "type": "corps",
        "counter": "gr_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "gr",
        "name": "GR Corps",
        "type": "corps",
        "counter": "gr_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    },
    {
        "faction": "ap",
        "nation": "gr",
        "name": "GR Corps",
        "type": "corps",
        "counter": "gr_corps",
        "cf": 1,
        "lf": 1,
        "mf": 3,
        "rcf": 0,
        "rlf": 1,
        "rmf": 3
    }
]

const spaces = [
    {},
    {
        "id": 1,
        "map": "europe",
        "name": "London",
        "x": 361,
        "y": 1081,
        "w": 45,
        "h": 45,
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
        "x": 203,
        "y": 1349,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap",
        "apport": true
    },
    {
        "id": 3,
        "map": "europe",
        "name": "Caen",
        "x": 293,
        "y": 1457,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap"
    },
    {
        "id": 4,
        "map": "europe",
        "name": "Rennes",
        "x": 217,
        "y": 1580,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap"
    },
    {
        "id": 5,
        "map": "europe",
        "name": "Nantes",
        "x": 204,
        "y": 1710,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap",
        "apport": true
    },
    {
        "id": 6,
        "map": "europe",
        "name": "La Rochelle",
        "x": 280,
        "y": 1859,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap",
        "apport": true
    },
    {
        "id": 7,
        "map": "europe",
        "name": "Bordeaux",
        "x": 319,
        "y": 2030,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap",
        "apport": true
    },
    {
        "id": 8,
        "map": "europe",
        "name": "Poitiers",
        "x": 452,
        "y": 1837,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap"
    },
    {
        "id": 9,
        "map": "europe",
        "name": "Tours",
        "x": 458,
        "y": 1692,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap"
    },
    {
        "id": 10,
        "map": "europe",
        "name": "Le Mans",
        "x": 407,
        "y": 1570,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap"
    },
    {
        "id": 11,
        "map": "europe",
        "name": "Le Havre",
        "x": 406,
        "y": 1353,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap",
        "vp": 1,
        "apport": true
    },
    {
        "id": 12,
        "map": "europe",
        "name": "Rouen",
        "x": 524,
        "y": 1424,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 13,
        "map": "europe",
        "name": "Orleans",
        "x": 606,
        "y": 1617,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 14,
        "map": "europe",
        "name": "St. Amand",
        "x": 644,
        "y": 1790,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap"
    },
    {
        "id": 15,
        "map": "europe",
        "name": "Paris",
        "x": 665,
        "y": 1465,
        "w": 45,
        "h": 45,
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
        "x": 618,
        "y": 1308,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 17,
        "map": "europe",
        "name": "Calais",
        "x": 585,
        "y": 1180,
        "w": 45,
        "h": 45,
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
        "x": 705,
        "y": 1090,
        "w": 45,
        "h": 45,
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
        "x": 746,
        "y": 1310,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 20,
        "map": "europe",
        "name": "Chateau Thierry",
        "x": 825,
        "y": 1450,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap"
    },
    {
        "id": 21,
        "map": "europe",
        "name": "Melun",
        "x": 770,
        "y": 1594,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 22,
        "map": "europe",
        "name": "Nevers",
        "x": 803,
        "y": 1765,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap"
    },
    {
        "id": 23,
        "map": "europe",
        "name": "Lyon",
        "x": 914,
        "y": 1928,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap"
    },
    {
        "id": 24,
        "map": "europe",
        "name": "Avignon",
        "x": 870,
        "y": 2102,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap"
    },
    {
        "id": 25,
        "map": "europe",
        "name": "Marseilles",
        "x": 957,
        "y": 2278,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap",
        "apport": true
    },
    {
        "id": 26,
        "map": "europe",
        "name": "Nice",
        "x": 1121,
        "y": 2244,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap"
    },
    {
        "id": 27,
        "map": "europe",
        "name": "Grenoble",
        "x": 1055,
        "y": 1988,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 28,
        "map": "europe",
        "name": "Dijon",
        "x": 981,
        "y": 1745,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 29,
        "map": "europe",
        "name": "Bar le Duc",
        "x": 928,
        "y": 1571,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 30,
        "map": "europe",
        "name": "Sedan",
        "x": 887,
        "y": 1304,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap",
        "terrain": "forest",
        "vp": 1
    },
    {
        "id": 31,
        "map": "europe",
        "name": "Brussels",
        "x": 832,
        "y": 1177,
        "w": 45,
        "h": 45,
        "nation": "be",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 32,
        "map": "europe",
        "name": "Antwerp",
        "x": 901,
        "y": 1046,
        "w": 45,
        "h": 45,
        "nation": "be",
        "faction": "ap",
        "vp": 1,
        "fort": 1
    },
    {
        "id": 33,
        "map": "europe",
        "name": "Liege",
        "x": 995,
        "y": 1190,
        "w": 45,
        "h": 45,
        "nation": "be",
        "faction": "ap",
        "fort": 3
    },
    {
        "id": 34,
        "map": "europe",
        "name": "Verdun",
        "x": 987,
        "y": 1398,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap",
        "vp": 1,
        "fort": 3
    },
    {
        "id": 35,
        "map": "europe",
        "name": "Nancy",
        "x": 1056,
        "y": 1534,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap",
        "vp": 1,
        "fort": 2
    },
    {
        "id": 36,
        "map": "europe",
        "name": "Belfort",
        "x": 1118,
        "y": 1682,
        "w": 45,
        "h": 45,
        "nation": "fr",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 37,
        "map": "europe",
        "name": "Turin",
        "x": 1205,
        "y": 2012,
        "w": 45,
        "h": 45,
        "nation": "it",
        "faction": "ap"
    },
    {
        "id": 38,
        "map": "europe",
        "name": "Mulhouse",
        "x": 1257,
        "y": 1645,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 39,
        "map": "europe",
        "name": "Strasbourg",
        "x": 1228,
        "y": 1495,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp",
        "vp": 1,
        "fort": 3
    },
    {
        "id": 40,
        "map": "europe",
        "name": "Metz",
        "x": 1149,
        "y": 1350,
        "w": 45,
        "h": 45,
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
        "x": 1146,
        "y": 1208,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp",
        "vp": 1
    },
    {
        "id": 42,
        "map": "europe",
        "name": "Aachen",
        "x": 1061,
        "y": 1069,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp",
        "vp": 1
    },
    {
        "id": 43,
        "map": "europe",
        "name": "Essen",
        "x": 1204,
        "y": 1036,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp",
        "supply": true,
        "vp": 1
    },
    {
        "id": 44,
        "map": "europe",
        "name": "Frankfurt",
        "x": 1297,
        "y": 1211,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp",
        "vp": 1
    },
    {
        "id": 45,
        "map": "europe",
        "name": "Mannheim",
        "x": 1300,
        "y": 1365,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 46,
        "map": "europe",
        "name": "Stuttgart",
        "x": 1386,
        "y": 1475,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp",
        "vp": 1
    },
    {
        "id": 47,
        "map": "europe",
        "name": "Wilhelmshaven",
        "x": 1266,
        "y": 734,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp",
        "cpport": true
    },
    {
        "id": 48,
        "map": "europe",
        "name": "Bremen",
        "x": 1345,
        "y": 877,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 49,
        "map": "europe",
        "name": "Kassel",
        "x": 1397,
        "y": 1050,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 50,
        "map": "europe",
        "name": "Kiel",
        "x": 1475,
        "y": 666,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp",
        "cpport": true
    },
    {
        "id": 51,
        "map": "europe",
        "name": "Hamburg",
        "x": 1479,
        "y": 802,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 52,
        "map": "europe",
        "name": "Hannover",
        "x": 1594,
        "y": 970,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 53,
        "map": "europe",
        "name": "Erfurt",
        "x": 1574,
        "y": 1228,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 54,
        "map": "europe",
        "name": "Nuremberg",
        "x": 1575,
        "y": 1375,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 55,
        "map": "europe",
        "name": "Augsburg",
        "x": 1529,
        "y": 1501,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 56,
        "map": "europe",
        "name": "Innsbruck",
        "x": 1617,
        "y": 1699,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 57,
        "map": "europe",
        "name": "Trent",
        "x": 1494,
        "y": 1788,
        "w": 45,
        "h": 45,
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
        "x": 1368,
        "y": 1953,
        "w": 45,
        "h": 45,
        "nation": "it",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 59,
        "map": "europe",
        "name": "Genoa",
        "x": 1346,
        "y": 2113,
        "w": 45,
        "h": 45,
        "nation": "it",
        "faction": "ap",
        "vp": 1,
        "apport": true
    },
    {
        "id": 60,
        "map": "europe",
        "name": "Verona",
        "x": 1548,
        "y": 1961,
        "w": 45,
        "h": 45,
        "nation": "it",
        "faction": "ap"
    },
    {
        "id": 61,
        "map": "europe",
        "name": "Bologna",
        "x": 1590,
        "y": 2079,
        "w": 45,
        "h": 45,
        "nation": "it",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 62,
        "map": "europe",
        "name": "Florence",
        "x": 1582,
        "y": 2209,
        "w": 45,
        "h": 45,
        "nation": "it",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 63,
        "map": "europe",
        "name": "Viterbo",
        "x": 1670,
        "y": 2353,
        "w": 45,
        "h": 45,
        "nation": "it",
        "faction": "ap"
    },
    {
        "id": 64,
        "map": "europe",
        "name": "Rome",
        "x": 1724,
        "y": 2478,
        "w": 45,
        "h": 45,
        "nation": "it",
        "faction": "ap",
        "vp": 1,
        "capital": true
    },
    {
        "id": 65,
        "map": "europe",
        "name": "Naples",
        "x": 1912,
        "y": 2630,
        "w": 45,
        "h": 45,
        "nation": "it",
        "faction": "ap",
        "vp": 1,
        "apport": true
    },
    {
        "id": 66,
        "map": "europe",
        "name": "Taranto",
        "x": 2223,
        "y": 2690,
        "w": 45,
        "h": 45,
        "nation": "it",
        "faction": "ap",
        "apport": true
    },
    {
        "id": 67,
        "map": "europe",
        "name": "Foggia",
        "x": 2076,
        "y": 2571,
        "w": 45,
        "h": 45,
        "nation": "it",
        "faction": "ap"
    },
    {
        "id": 68,
        "map": "europe",
        "name": "Pescara",
        "x": 1909,
        "y": 2424,
        "w": 45,
        "h": 45,
        "nation": "it",
        "faction": "ap"
    },
    {
        "id": 69,
        "map": "europe",
        "name": "Ancona",
        "x": 1845,
        "y": 2288,
        "w": 45,
        "h": 45,
        "nation": "it",
        "faction": "ap"
    },
    {
        "id": 70,
        "map": "europe",
        "name": "Ravenna",
        "x": 1732,
        "y": 2164,
        "w": 45,
        "h": 45,
        "nation": "it",
        "faction": "ap"
    },
    {
        "id": 71,
        "map": "europe",
        "name": "Venice",
        "x": 1693,
        "y": 1981,
        "w": 45,
        "h": 45,
        "nation": "it",
        "faction": "ap",
        "apport": true
    },
    {
        "id": 72,
        "map": "europe",
        "name": "Udine",
        "x": 1811,
        "y": 1926,
        "w": 45,
        "h": 45,
        "nation": "it",
        "faction": "ap"
    },
    {
        "id": 73,
        "map": "europe",
        "name": "Asiago",
        "x": 1664,
        "y": 1833,
        "w": 45,
        "h": 45,
        "nation": "it",
        "faction": "ap"
    },
    {
        "id": 74,
        "map": "europe",
        "name": "Maggiore",
        "x": 1792,
        "y": 1808,
        "w": 45,
        "h": 45,
        "nation": "it",
        "faction": "ap"
    },
    {
        "id": 75,
        "map": "europe",
        "name": "Spittal",
        "x": 1771,
        "y": 1682,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 76,
        "map": "europe",
        "name": "Munich",
        "x": 1651,
        "y": 1553,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp",
        "terrain": "mountain",
        "vp": 1
    },
    {
        "id": 77,
        "map": "europe",
        "name": "Regensburg",
        "x": 1703,
        "y": 1438,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 78,
        "map": "europe",
        "name": "Leipzig",
        "x": 1721,
        "y": 1108,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 79,
        "map": "europe",
        "name": "Berlin",
        "x": 1806,
        "y": 918,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp",
        "vp": 1,
        "capital": true
    },
    {
        "id": 80,
        "map": "europe",
        "name": "Rostock",
        "x": 1684,
        "y": 700,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp",
        "cpport": true
    },
    {
        "id": 81,
        "map": "europe",
        "name": "Stettin",
        "x": 1955,
        "y": 733,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp",
        "cpport": true
    },
    {
        "id": 82,
        "map": "europe",
        "name": "Cottbus",
        "x": 1955,
        "y": 1017,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 83,
        "map": "europe",
        "name": "Dresden",
        "x": 1852,
        "y": 1139,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 84,
        "map": "europe",
        "name": "Prague",
        "x": 1929,
        "y": 1280,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 85,
        "map": "europe",
        "name": "Kolin",
        "x": 2056,
        "y": 1355,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 86,
        "map": "europe",
        "name": "Linz",
        "x": 1891,
        "y": 1572,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 87,
        "map": "europe",
        "name": "Villach",
        "x": 1913,
        "y": 1770,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 88,
        "map": "europe",
        "name": "Trieste",
        "x": 1941,
        "y": 1936,
        "w": 45,
        "h": 45,
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
        "x": 2042,
        "y": 1729,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 90,
        "map": "europe",
        "name": "Vienna",
        "x": 2135,
        "y": 1565,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp",
        "vp": 1,
        "capital": true
    },
    {
        "id": 91,
        "map": "europe",
        "name": "Brun",
        "x": 2176,
        "y": 1424,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 92,
        "map": "europe",
        "name": "Olmutz",
        "x": 2304,
        "y": 1321,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 93,
        "map": "europe",
        "name": "Oppeln",
        "x": 2359,
        "y": 1195,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp"
    },
    {
        "id": 94,
        "map": "europe",
        "name": "Breslau",
        "x": 2202,
        "y": 1137,
        "w": 45,
        "h": 45,
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
        "x": 2198,
        "y": 951,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp",
        "vp": 1,
        "fort": 2
    },
    {
        "id": 96,
        "map": "europe",
        "name": "Thorn",
        "x": 2294,
        "y": 813,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp",
        "fort": 2
    },
    {
        "id": 97,
        "map": "europe",
        "name": "Kolberg",
        "x": 2160,
        "y": 681,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp",
        "cpport": true
    },
    {
        "id": 98,
        "map": "europe",
        "name": "Danzig",
        "x": 2378,
        "y": 656,
        "w": 45,
        "h": 45,
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
        "x": 2559,
        "y": 598,
        "w": 45,
        "h": 45,
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
        "x": 2550,
        "y": 761,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp",
        "terrain": "forest"
    },
    {
        "id": 101,
        "map": "europe",
        "name": "Plock",
        "x": 2474,
        "y": 890,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 102,
        "map": "europe",
        "name": "Lodz",
        "x": 2454,
        "y": 1022,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 103,
        "map": "europe",
        "name": "Czestochowa",
        "x": 2544,
        "y": 1170,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 104,
        "map": "europe",
        "name": "Cracow",
        "x": 2504,
        "y": 1297,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp",
        "vp": 1,
        "fort": 2
    },
    {
        "id": 105,
        "map": "europe",
        "name": "Martin",
        "x": 2375,
        "y": 1472,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 106,
        "map": "europe",
        "name": "Budapest",
        "x": 2437,
        "y": 1660,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp",
        "vp": 1,
        "capital": true
    },
    {
        "id": 107,
        "map": "europe",
        "name": "Pecs",
        "x": 2343,
        "y": 1875,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 108,
        "map": "europe",
        "name": "Zagreb",
        "x": 2097,
        "y": 1910,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 109,
        "map": "europe",
        "name": "Banja Luka",
        "x": 2228,
        "y": 2062,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 110,
        "map": "europe",
        "name": "Mostar",
        "x": 2213,
        "y": 2279,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 111,
        "map": "europe",
        "name": "Cetinje",
        "x": 2401,
        "y": 2379,
        "w": 45,
        "h": 45,
        "nation": "mn",
        "faction": "ap",
        "terrain": "mountain",
        "capital": true
    },
    {
        "id": 112,
        "map": "europe",
        "name": "Tirana",
        "x": 2505,
        "y": 2523,
        "w": 45,
        "h": 45,
        "nation": "al",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 113,
        "map": "europe",
        "name": "Valona",
        "x": 2497,
        "y": 2697,
        "w": 45,
        "h": 45,
        "nation": "al",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 114,
        "map": "europe",
        "name": "Florina",
        "x": 2696,
        "y": 2742,
        "w": 45,
        "h": 45,
        "nation": "gr",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 115,
        "map": "europe",
        "name": "Larisa",
        "x": 2791,
        "y": 2841,
        "w": 45,
        "h": 45,
        "nation": "gr",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 116,
        "map": "europe",
        "name": "Athens",
        "x": 2926,
        "y": 3055,
        "w": 45,
        "h": 45,
        "nation": "gr",
        "faction": "ap",
        "apport": true,
        "capital": true
    },
    {
        "id": 117,
        "map": "europe",
        "name": "Salonika",
        "x": 2818,
        "y": 2688,
        "w": 45,
        "h": 45,
        "nation": "gr",
        "faction": "ap",
        "terrain": "mountain",
        "apport": true
    },
    {
        "id": 118,
        "map": "europe",
        "name": "Monastir",
        "x": 2697,
        "y": 2587,
        "w": 45,
        "h": 45,
        "nation": "sb",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 119,
        "map": "europe",
        "name": "Kavala",
        "x": 2970,
        "y": 2622,
        "w": 45,
        "h": 45,
        "nation": "gr",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 120,
        "map": "europe",
        "name": "Strumitsa",
        "x": 2903,
        "y": 2483,
        "w": 45,
        "h": 45,
        "nation": "bu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 121,
        "map": "europe",
        "name": "Skopje",
        "x": 2691,
        "y": 2449,
        "w": 45,
        "h": 45,
        "nation": "sb",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 122,
        "map": "europe",
        "name": "Nis",
        "x": 2685,
        "y": 2264,
        "w": 45,
        "h": 45,
        "nation": "sb",
        "faction": "ap"
    },
    {
        "id": 123,
        "map": "europe",
        "name": "Valjevo",
        "x": 2535,
        "y": 2243,
        "w": 45,
        "h": 45,
        "nation": "sb",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 124,
        "map": "europe",
        "name": "Sarajevo",
        "x": 2363,
        "y": 2180,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 125,
        "map": "europe",
        "name": "Belgrade",
        "x": 2623,
        "y": 2090,
        "w": 45,
        "h": 45,
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
        "x": 2496,
        "y": 1970,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 127,
        "map": "europe",
        "name": "Timisvar",
        "x": 2672,
        "y": 1924,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 128,
        "map": "europe",
        "name": "Szeged",
        "x": 2538,
        "y": 1815,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 129,
        "map": "europe",
        "name": "Debrecen",
        "x": 2710,
        "y": 1659,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp",
        "vp": 1
    },
    {
        "id": 130,
        "map": "europe",
        "name": "Miskolcz",
        "x": 2569,
        "y": 1541,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 131,
        "map": "europe",
        "name": "Gorlice",
        "x": 2620,
        "y": 1421,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 132,
        "map": "europe",
        "name": "Tarnow",
        "x": 2665,
        "y": 1296,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 133,
        "map": "europe",
        "name": "Ivangorod",
        "x": 2692,
        "y": 1147,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "fort": 1
    },
    {
        "id": 134,
        "map": "europe",
        "name": "Warsaw",
        "x": 2637,
        "y": 963,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "vp": 1,
        "fort": 2
    },
    {
        "id": 135,
        "map": "europe",
        "name": "Lomza",
        "x": 2751,
        "y": 830,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "fort": 1
    },
    {
        "id": 136,
        "map": "europe",
        "name": "Insterberg",
        "x": 2712,
        "y": 678,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp",
        "terrain": "forest"
    },
    {
        "id": 137,
        "map": "europe",
        "name": "Memel",
        "x": 2658,
        "y": 470,
        "w": 45,
        "h": 45,
        "nation": "ge",
        "faction": "cp",
        "cpport": true
    },
    {
        "id": 138,
        "map": "europe",
        "name": "Libau",
        "x": 2660,
        "y": 331,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "cpport": true
    },
    {
        "id": 139,
        "map": "europe",
        "name": "Szawli",
        "x": 2825,
        "y": 407,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 140,
        "map": "europe",
        "name": "Riga",
        "x": 2966,
        "y": 284,
        "w": 45,
        "h": 45,
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
        "x": 3181,
        "y": 139,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 142,
        "map": "europe",
        "name": "Pskov",
        "x": 3441,
        "y": 168,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 143,
        "map": "europe",
        "name": "Petrograd",
        "x": 3654,
        "y": 145,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "supply": true
    },
    {
        "id": 144,
        "map": "europe",
        "name": "Velikiye Luki",
        "x": 3637,
        "y": 343,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 145,
        "map": "europe",
        "name": "Opochka",
        "x": 3454,
        "y": 345,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 146,
        "map": "europe",
        "name": "Dvinsk",
        "x": 3230,
        "y": 449,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 147,
        "map": "europe",
        "name": "Kovno",
        "x": 2850,
        "y": 576,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "vp": 1,
        "fort": 1
    },
    {
        "id": 148,
        "map": "europe",
        "name": "Vilna",
        "x": 3014,
        "y": 571,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 149,
        "map": "europe",
        "name": "Moldechno",
        "x": 3188,
        "y": 639,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 150,
        "map": "europe",
        "name": "Polotsk",
        "x": 3419,
        "y": 563,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 151,
        "map": "europe",
        "name": "Vitebsk",
        "x": 3637,
        "y": 519,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 152,
        "map": "europe",
        "name": "Moscow",
        "x": 3990,
        "y": 562,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "supply": true
    },
    {
        "id": 153,
        "map": "europe",
        "name": "Smolensk",
        "x": 3833,
        "y": 609,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 154,
        "map": "europe",
        "name": "Orsha",
        "x": 3637,
        "y": 634,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 155,
        "map": "europe",
        "name": "Roslavl",
        "x": 3882,
        "y": 807,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 156,
        "map": "europe",
        "name": "Mogilev",
        "x": 3648,
        "y": 749,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 157,
        "map": "europe",
        "name": "Minsk",
        "x": 3359,
        "y": 735,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 158,
        "map": "europe",
        "name": "Gomel",
        "x": 3716,
        "y": 944,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 159,
        "map": "europe",
        "name": "Slutsk",
        "x": 3439,
        "y": 876,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "terrain": "forest"
    },
    {
        "id": 160,
        "map": "europe",
        "name": "Baranovichi",
        "x": 3168,
        "y": 780,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "terrain": "forest"
    },
    {
        "id": 161,
        "map": "europe",
        "name": "Grodno",
        "x": 2926,
        "y": 728,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "terrain": "forest",
        "fort": 1
    },
    {
        "id": 162,
        "map": "europe",
        "name": "Bialystok",
        "x": 2987,
        "y": 863,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 163,
        "map": "europe",
        "name": "Brest Litovsk",
        "x": 2873,
        "y": 980,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "fort": 1
    },
    {
        "id": 164,
        "map": "europe",
        "name": "Pinsk",
        "x": 3118,
        "y": 925,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "terrain": "swamp"
    },
    {
        "id": 165,
        "map": "europe",
        "name": "Lublin",
        "x": 2898,
        "y": 1144,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 166,
        "map": "europe",
        "name": "Kovel",
        "x": 3052,
        "y": 1055,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "terrain": "swamp"
    },
    {
        "id": 167,
        "map": "europe",
        "name": "Sarny",
        "x": 3262,
        "y": 1012,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "terrain": "swamp"
    },
    {
        "id": 168,
        "map": "europe",
        "name": "Mozyr",
        "x": 3521,
        "y": 1058,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "terrain": "swamp"
    },
    {
        "id": 169,
        "map": "europe",
        "name": "Chernigov",
        "x": 3745,
        "y": 1096,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 170,
        "map": "europe",
        "name": "Kharkov",
        "x": 3989,
        "y": 1227,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "supply": true
    },
    {
        "id": 171,
        "map": "europe",
        "name": "Kiev",
        "x": 3659,
        "y": 1229,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 172,
        "map": "europe",
        "name": "Zhitomir",
        "x": 3485,
        "y": 1227,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 173,
        "map": "europe",
        "name": "Rovno",
        "x": 3326,
        "y": 1163,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "terrain": "forest"
    },
    {
        "id": 174,
        "map": "europe",
        "name": "Lutsk",
        "x": 3110,
        "y": 1191,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "terrain": "forest",
        "fort": 1
    },
    {
        "id": 175,
        "map": "europe",
        "name": "Dubno",
        "x": 3234,
        "y": 1296,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "fort": 1
    },
    {
        "id": 176,
        "map": "europe",
        "name": "Przemysl",
        "x": 2824,
        "y": 1295,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp",
        "fort": 3
    },
    {
        "id": 177,
        "map": "europe",
        "name": "Lemberg",
        "x": 2976,
        "y": 1314,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp",
        "vp": 1
    },
    {
        "id": 178,
        "map": "europe",
        "name": "Uzhgorod",
        "x": 2773,
        "y": 1509,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 179,
        "map": "europe",
        "name": "Stanislau",
        "x": 2940,
        "y": 1471,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 180,
        "map": "europe",
        "name": "Tarnopol",
        "x": 3095,
        "y": 1416,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp"
    },
    {
        "id": 181,
        "map": "europe",
        "name": "Munkacs",
        "x": 2928,
        "y": 1605,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 182,
        "map": "europe",
        "name": "Czernowitz",
        "x": 3092,
        "y": 1572,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp",
        "vp": 1
    },
    {
        "id": 183,
        "map": "europe",
        "name": "Kamenets-Podolski",
        "x": 3240,
        "y": 1484,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 184,
        "map": "europe",
        "name": "Vinnitsa",
        "x": 3449,
        "y": 1421,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 185,
        "map": "europe",
        "name": "Belaya Tserkov",
        "x": 3688,
        "y": 1410,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 186,
        "map": "europe",
        "name": "Caucasus",
        "x": 3989,
        "y": 1651,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "supply": true
    },
    {
        "id": 187,
        "map": "europe",
        "name": "Uman",
        "x": 3691,
        "y": 1592,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 188,
        "map": "europe",
        "name": "Odessa",
        "x": 3688,
        "y": 1801,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "vp": 1,
        "fort": 3
    },
    {
        "id": 189,
        "map": "europe",
        "name": "Zhmerinka",
        "x": 3374,
        "y": 1592,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 190,
        "map": "europe",
        "name": "Jassy",
        "x": 3220,
        "y": 1682,
        "w": 45,
        "h": 45,
        "nation": "ro",
        "faction": "ap"
    },
    {
        "id": 191,
        "map": "europe",
        "name": "Schossburg",
        "x": 3051,
        "y": 1758,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 192,
        "map": "europe",
        "name": "Cluj",
        "x": 2900,
        "y": 1730,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp",
        "vp": 1
    },
    {
        "id": 193,
        "map": "europe",
        "name": "Hermannstadt",
        "x": 2894,
        "y": 1888,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 194,
        "map": "europe",
        "name": "Kronstadt",
        "x": 3048,
        "y": 1885,
        "w": 45,
        "h": 45,
        "nation": "ah",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 195,
        "map": "europe",
        "name": "Targu Jiu",
        "x": 2798,
        "y": 2021,
        "w": 45,
        "h": 45,
        "nation": "ro",
        "faction": "ap"
    },
    {
        "id": 196,
        "map": "europe",
        "name": "Carte de Arges",
        "x": 2946,
        "y": 2012,
        "w": 45,
        "h": 45,
        "nation": "ro",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 197,
        "map": "europe",
        "name": "Caracal",
        "x": 2976,
        "y": 2143,
        "w": 45,
        "h": 45,
        "nation": "ro",
        "faction": "ap"
    },
    {
        "id": 198,
        "map": "europe",
        "name": "Sofia",
        "x": 2886,
        "y": 2324,
        "w": 45,
        "h": 45,
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
        "x": 3260,
        "y": 1815,
        "w": 45,
        "h": 45,
        "nation": "ro",
        "faction": "ap"
    },
    {
        "id": 200,
        "map": "europe",
        "name": "Kishinev",
        "x": 3490,
        "y": 1738,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 201,
        "map": "europe",
        "name": "Ismail",
        "x": 3514,
        "y": 1901,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 202,
        "map": "europe",
        "name": "Galatz",
        "x": 3345,
        "y": 1984,
        "w": 45,
        "h": 45,
        "nation": "ro",
        "faction": "ap"
    },
    {
        "id": 203,
        "map": "europe",
        "name": "Ploesti",
        "x": 3165,
        "y": 1956,
        "w": 45,
        "h": 45,
        "nation": "ro",
        "faction": "ap",
        "terrain": "mountain",
        "vp": 1
    },
    {
        "id": 204,
        "map": "europe",
        "name": "Bucharest",
        "x": 3190,
        "y": 2107,
        "w": 45,
        "h": 45,
        "nation": "ro",
        "faction": "ap",
        "vp": 1,
        "capital": true
    },
    {
        "id": 205,
        "map": "europe",
        "name": "Constanta",
        "x": 3423,
        "y": 2118,
        "w": 45,
        "h": 45,
        "nation": "ro",
        "faction": "ap"
    },
    {
        "id": 206,
        "map": "europe",
        "name": "Varna",
        "x": 3368,
        "y": 2269,
        "w": 45,
        "h": 45,
        "nation": "bu",
        "faction": "cp"
    },
    {
        "id": 207,
        "map": "europe",
        "name": "Plevna",
        "x": 3054,
        "y": 2285,
        "w": 45,
        "h": 45,
        "nation": "bu",
        "faction": "cp"
    },
    {
        "id": 208,
        "map": "europe",
        "name": "Kazanlik",
        "x": 3136,
        "y": 2425,
        "w": 45,
        "h": 45,
        "nation": "bu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 209,
        "map": "europe",
        "name": "Burgas",
        "x": 3339,
        "y": 2403,
        "w": 45,
        "h": 45,
        "nation": "bu",
        "faction": "cp"
    },
    {
        "id": 210,
        "map": "europe",
        "name": "Adrianople",
        "x": 3349,
        "y": 2551,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 211,
        "map": "europe",
        "name": "Philippoli",
        "x": 3112,
        "y": 2575,
        "w": 45,
        "h": 45,
        "nation": "bu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 212,
        "map": "europe",
        "name": "Gallipoli",
        "x": 3215,
        "y": 2683,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 213,
        "map": "europe",
        "name": "Cana Kale",
        "x": 3231,
        "y": 2811,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 214,
        "map": "europe",
        "name": "Balikesir",
        "x": 3392,
        "y": 2837,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 215,
        "map": "europe",
        "name": "Izmir",
        "x": 3313,
        "y": 2989,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 216,
        "map": "europe",
        "name": "MEF1",
        "x": 3080,
        "y": 2764,
        "w": 45,
        "h": 45,
        "nation": "none",
        "faction": "ap"
    },
    {
        "id": 217,
        "map": "europe",
        "name": "MEF2",
        "x": 3112,
        "y": 2895,
        "w": 45,
        "h": 45,
        "nation": "none",
        "faction": "ap"
    },
    {
        "id": 218,
        "map": "europe",
        "name": "MEF3",
        "x": 3200,
        "y": 3091,
        "w": 45,
        "h": 45,
        "nation": "none",
        "faction": "ap"
    },
    {
        "id": 219,
        "map": "neareast",
        "name": "Constantinople",
        "x": 3703,
        "y": 2140,
        "w": 45,
        "h": 45,
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
        "x": 3712,
        "y": 2289,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 221,
        "map": "neareast",
        "name": "Adapazari",
        "x": 3829,
        "y": 2139,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 222,
        "map": "neareast",
        "name": "Eskidor",
        "x": 3828,
        "y": 2279,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 223,
        "map": "neareast",
        "name": "Sinope",
        "x": 3937,
        "y": 2091,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 224,
        "map": "neareast",
        "name": "Ankara",
        "x": 3943,
        "y": 2245,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 225,
        "map": "neareast",
        "name": "Samsun",
        "x": 4043,
        "y": 2074,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 226,
        "map": "neareast",
        "name": "Sivas",
        "x": 4094,
        "y": 2234,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 227,
        "map": "neareast",
        "name": "Giresun",
        "x": 4142,
        "y": 2108,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 228,
        "map": "neareast",
        "name": "Trebizond",
        "x": 4263,
        "y": 2147,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "fort": 1
    },
    {
        "id": 229,
        "map": "neareast",
        "name": "Erzingan",
        "x": 4267,
        "y": 2275,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 230,
        "map": "neareast",
        "name": "Rize",
        "x": 4391,
        "y": 2140,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 231,
        "map": "neareast",
        "name": "Batum",
        "x": 4494,
        "y": 2079,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 232,
        "map": "neareast",
        "name": "Kars",
        "x": 4597,
        "y": 2126,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 233,
        "map": "neareast",
        "name": "Poti",
        "x": 4414,
        "y": 1910,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 234,
        "map": "neareast",
        "name": "Grozny",
        "x": 4630,
        "y": 1920,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 235,
        "map": "neareast",
        "name": "Petrovsk",
        "x": 4838,
        "y": 1956,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 236,
        "map": "neareast",
        "name": "Tbilisi",
        "x": 4721,
        "y": 2075,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 237,
        "map": "neareast",
        "name": "Elizabethpol",
        "x": 4834,
        "y": 2158,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap"
    },
    {
        "id": 238,
        "map": "neareast",
        "name": "Baku",
        "x": 4956,
        "y": 2237,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "vp": 1
    },
    {
        "id": 239,
        "map": "neareast",
        "name": "Erivan",
        "x": 4721,
        "y": 2208,
        "w": 45,
        "h": 45,
        "nation": "ru",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 240,
        "map": "neareast",
        "name": "Eleskirt",
        "x": 4563,
        "y": 2262,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 241,
        "map": "neareast",
        "name": "Erzerum",
        "x": 4434,
        "y": 2252,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain",
        "fort": 1
    },
    {
        "id": 242,
        "map": "neareast",
        "name": "Dilman",
        "x": 4714,
        "y": 2355,
        "w": 45,
        "h": 45,
        "nation": "pe",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 243,
        "map": "neareast",
        "name": "Tabriz",
        "x": 4828,
        "y": 2441,
        "w": 45,
        "h": 45,
        "nation": "pe",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 244,
        "map": "neareast",
        "name": "Van",
        "x": 4581,
        "y": 2377,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 245,
        "map": "neareast",
        "name": "Bitlis",
        "x": 4467,
        "y": 2385,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 246,
        "map": "neareast",
        "name": "Diyarbakir",
        "x": 4361,
        "y": 2378,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 247,
        "map": "neareast",
        "name": "Kharput",
        "x": 4247,
        "y": 2387,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 248,
        "map": "neareast",
        "name": "Kayseri",
        "x": 4129,
        "y": 2373,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 249,
        "map": "neareast",
        "name": "Konya",
        "x": 3996,
        "y": 2394,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 250,
        "map": "neareast",
        "name": "Adana",
        "x": 4110,
        "y": 2493,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 251,
        "map": "neareast",
        "name": "Aleppo",
        "x": 4235,
        "y": 2548,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 252,
        "map": "neareast",
        "name": "Urfa",
        "x": 4346,
        "y": 2509,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 253,
        "map": "neareast",
        "name": "Mardin",
        "x": 4470,
        "y": 2506,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 254,
        "map": "neareast",
        "name": "Mosul",
        "x": 4583,
        "y": 2515,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "vp": 1
    },
    {
        "id": 255,
        "map": "neareast",
        "name": "Hamadan",
        "x": 4881,
        "y": 2603,
        "w": 45,
        "h": 45,
        "nation": "pe",
        "faction": "ap",
        "terrain": "mountain"
    },
    {
        "id": 256,
        "map": "neareast",
        "name": "Kermanshah",
        "x": 4753,
        "y": 2672,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 257,
        "map": "neareast",
        "name": "Kirkuk",
        "x": 4596,
        "y": 2650,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 258,
        "map": "neareast",
        "name": "Damascus",
        "x": 4250,
        "y": 2650,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "vp": 1
    },
    {
        "id": 259,
        "map": "neareast",
        "name": "Beirut",
        "x": 4130,
        "y": 2621,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 260,
        "map": "neareast",
        "name": "MEF4",
        "x": 3887,
        "y": 2626,
        "w": 45,
        "h": 45,
        "nation": "none",
        "faction": "ap"
    },
    {
        "id": 261,
        "map": "neareast",
        "name": "Nablus",
        "x": 4081,
        "y": 2768,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "terrain": "mountain"
    },
    {
        "id": 262,
        "map": "neareast",
        "name": "Amman",
        "x": 4204,
        "y": 2781,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 263,
        "map": "neareast",
        "name": "Baghdad",
        "x": 4641,
        "y": 2778,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "vp": 1
    },
    {
        "id": 264,
        "map": "neareast",
        "name": "Kut",
        "x": 4749,
        "y": 2827,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 265,
        "map": "neareast",
        "name": "Khorramabad",
        "x": 4894,
        "y": 2736,
        "w": 45,
        "h": 45,
        "nation": "pe",
        "faction": "ap"
    },
    {
        "id": 266,
        "map": "neareast",
        "name": "Ahwaz",
        "x": 4906,
        "y": 2881,
        "w": 45,
        "h": 45,
        "nation": "pe",
        "faction": "ap"
    },
    {
        "id": 267,
        "map": "neareast",
        "name": "Qurna",
        "x": 4794,
        "y": 2918,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 268,
        "map": "neareast",
        "name": "Samawah",
        "x": 4590,
        "y": 2917,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "terrain": "desert"
    },
    {
        "id": 269,
        "map": "neareast",
        "name": "Basra",
        "x": 4878,
        "y": 3031,
        "w": 45,
        "h": 45,
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
        "x": 4710,
        "y": 3070,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "terrain": "desert"
    },
    {
        "id": 271,
        "map": "neareast",
        "name": "Arabia",
        "x": 4359,
        "y": 3027,
        "w": 45,
        "h": 45,
        "nation": "ar",
        "faction": "ap",
        "terrain": "desert"
    },
    {
        "id": 272,
        "map": "neareast",
        "name": "Medina",
        "x": 4205,
        "y": 3192,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "terrain": "desert",
        "vp": 1
    },
    {
        "id": 273,
        "map": "neareast",
        "name": "Aqaba",
        "x": 4054,
        "y": 3111,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "terrain": "desert",
        "fort": 1
    },
    {
        "id": 274,
        "map": "neareast",
        "name": "Beersheba",
        "x": 4137,
        "y": 3005,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "terrain": "desert",
        "fort": 2
    },
    {
        "id": 275,
        "map": "neareast",
        "name": "Jerusalem",
        "x": 4155,
        "y": 2879,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp"
    },
    {
        "id": 276,
        "map": "neareast",
        "name": "Gaza",
        "x": 4025,
        "y": 2911,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "terrain": "desert",
        "fort": 2
    },
    {
        "id": 277,
        "map": "neareast",
        "name": "Sinai",
        "x": 3935,
        "y": 3016,
        "w": 45,
        "h": 45,
        "nation": "tu",
        "faction": "cp",
        "terrain": "desert"
    },
    {
        "id": 278,
        "map": "neareast",
        "name": "Cairo",
        "x": 3826,
        "y": 3073,
        "w": 45,
        "h": 45,
        "nation": "eg",
        "faction": "ap"
    },
    {
        "id": 279,
        "map": "neareast",
        "name": "Port Said",
        "x": 3815,
        "y": 2934,
        "w": 45,
        "h": 45,
        "nation": "eg",
        "faction": "ap",
        "apport": true
    },
    {
        "id": 280,
        "map": "neareast",
        "name": "Alexandria",
        "x": 3697,
        "y": 2988,
        "w": 45,
        "h": 45,
        "nation": "eg",
        "faction": "ap",
        "apport": true
    },
    {
        "id": 281,
        "map": "neareast",
        "name": "Libya",
        "x": 3555,
        "y": 2972,
        "w": 45,
        "h": 45,
        "nation": "eg",
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
    }
]

for (let i = 0; i < edges.length; i++) {
    let edge = edges[i]
    if (spaces[edge.a].connections === undefined) {
        spaces[edge.a].connections = []
    }
    if (spaces[edge.b].connections === undefined) {
        spaces[edge.b].connections = []
    }
    spaces[edge.a].connections.push(edge.b);
    spaces[edge.b].connections.push(edge.a);
}

if (typeof module !== 'undefined') module.exports = {cards,pieces,spaces}
