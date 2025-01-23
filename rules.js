"use strict"

const data = require("./data")
const {cards} = require("./data")

let game, view

let states = {}
let events = {}

const AP = "ap"
const CP = "cp"

const FRANCE = "fr"
const BRITAIN = "br"
const BELGIUM = "be"
const ITALY = "it"
const GERMANY = "ge"
const AUSTRIA_HUNGARY = "ah"
const RUSSIA = "ru"
const MONTENEGRO = "mn"
const SERBIA = "sb"
const BULGARIA = "bu"
const ALBANIA = "al"
const GREECE = "gr"
const ROMANIA = "ro"
const TURKEY = "tu"
const PERSIA = "pe"
const ARABIA = "ar"
const EGYPT = "eg"
const US = "us"

const NONE = "none"
const ARMY = "army"
const CORPS = "corps"

const STACKING_LIMIT = 3

const COMMITMENT_MOBILIZATION = "mobilization"
const COMMITMENT_LIMITED = "limited"
const COMMITMENT_TOTAL = "total"

const MOVE = 'move'
const ATTACK = 'attack'

const ACTION_EVENT = "evt"
const ACTION_OP = "op"
const ACTION_SR = "sr"
const ACTION_RP = "rp"
const ACTION_REINF = "reinf"
const ACTION_NEUTRAL_ENTRY = "entry"
const ACTION_1_OP = "oneop"
const ACTION_PEACE_TERMS = "peace"

// Central powers
const GUNS_OF_AUGUST = 66
const WIRELESS_INTERCEPTS = 67
const VON_FRANCOIS = 68
const SEVERE_WEATHER_CP = 69
const LANDWEHR = 70
const ENTRENCH_CP = 71
const GERMAN_REINFORCEMENTS_1 = 72
const RACE_TO_THE_SEA = 73
const REICHSTAG_TRUCE = 74
const SUD_ARMY = 75
const OBEROST = 76
const GERMAN_REINFORCEMENTS_2 = 77
const FALKENHAYN = 78
const AH_REINFORCEMENTS_1 = 79
const CHLORINE_GAS = 80
const LIMAN_VON_SANDERS = 81
const MATA_HARI = 82
const FORTIFIED_MACHINE_GUNS = 83
const FLAMETHROWERS = 84
const AH_REINFORCEMENTS_2 = 85
const GERMAN_REINFORCEMENTS_3 = 86
const GERMAN_REINFORCEMENTS_4 = 87
const AH_REINFORCEMENTS_3 = 88
const LIBYAN_REVOLT = 89
const HIGH_SEAS_FLEET = 90
const PLACE_OF_EXECUTION = 91
const ZEPPELIN_RAIDS = 92
const TSAR_TAKES_COMMAND = 93
const ELEVENTH_ARMY = 94
const ALPENKORPS = 95
const KEMAL = 96
const WAR_IN_AFRICA = 97
const WALTER_RATHENAU = 98
const BULGARIA_ENTRY = 99
const MUSTARD_GAS = 100
const U_BOATS_UNLEASHED = 101
const HOFFMAN = 102
const GERMAN_REINFORCEMENTS_5 = 103
const GERMAN_REINFORCEMENTS_6 = 104
const AIR_SUPERIORITY_CP = 105
const GERMAN_REINFORCEMENTS_7 = 106
const TURKISH_REINFORCEMENTS_1 = 107
const VON_BELOW = 108
const VON_HUTIER = 109
const TREATY_OF_BRESK_LITOVSK = 110
const GERMAN_REINFORCEMENTS_8 = 111
const FRENCH_MUTINY = 112
const TURKISH_REINFORCEMENTS_2 = 113
const MICHAEL = 114
const BLUCHER = 115
const PEACE_OFFENSIVE = 116
const FALL_OF_THE_TSAR = 117
const BOLSHEVIK_REVOLUTION = 118
const H_L_TAKES_COMMAND = 119
const LLOYD_GEORGE = 120
const WITHDRAWAL_CP = 121
const KAISERTREU = 122
const STAVKA_TIMIDITY = 123
const POLISH_RESTORATION = 124
const TURK_DETERMINATION = 125
const HAIG = 126
const ACHTUNG_PANZER = 127
const RUSSIAN_DESERTIONS = 128
const ALBERICH = 129
const PRINCE_MAX = 130
// Allied powers
const BRITISH_REINFORCEMENTS_1 = 1
const BLOCKADE = 2
const RUSSIAN_REINFORCEMENTS_1 = 3
const PLEVE = 4
const PUTNIK = 5
const WITHDRAWAL_AP = 6
const SEVERE_WEATHER_AP = 7
const RUSSIAN_REINFORCEMENTS_2 = 8
const MOLTKE = 9
const FRENCH_REINFORCEMENTS_1 = 10
const RUSSIAN_REINFORCEMENTS_3 = 11
const ENTRENCH_AP = 12
const RAPE_OF_BELGIUM = 13
const BRITISH_REINFORCEMENTS_2 = 14
const BRITISH_REINFORCEMENTS_3 = 15
const ROMANIA_ENTRY = 16
const ITALY_ENTRY = 17
const HURRICANE_BARRAGE = 18
const AIR_SUPERIORITY_AP = 19
const BRITISH_REINFORCEMENTS_4 = 20
const PHOSGENE_GAS = 21
const ITALIAN_REINFORCEMENTS_1 = 22
const CLOAK_AND_DAGGER = 23
const FRENCH_REINFORCEMENTS_2 = 24
const RUSSIAN_REINFORCEMENTS_4 = 25
const LUSITANIA = 26
const GREAT_RETREAT = 27
const LANDSHIPS = 28
const YUDENITCH = 29
const SALONIKA_CARD = 30
const MEF = 31
const RUSSIAN_REINFORCEMENTS_5 = 32
const GRAND_FLEET = 33
const BRITISH_REINFORCEMENTS_5 = 34
const YANKS_AND_TANKS = 35
const MINE_ATTACK = 36
const INDEPENDANT_AIR_FORCE = 37
const USA_REINFORCEMENTS_1 = 38
const THEY_SHALL_NOT_PASS = 39
const FOURTEEN_POINTS = 40
const ARAB_NORTHERN_ARMY = 41
const BRITISH_REINFORCEMENTS_6 = 42
const USA_REINFORCEMENTS_2 = 43
const GREECE_ENTRY = 44
const KERENSKY_OFFENSIVE = 45
const BRUSILOV_OFFENSIVE = 46
const USA_REINFORCEMENTS_3 = 47
const ROYAL_TANK_CORPS = 48
const SINAI_PIPELINE = 49
const ALLEBY = 50
const EVERYONE_INTO_BATTLE = 51
const CONVOY = 52
const ARMY_OF_THE_ORIENT = 53
const ZIMMERMANN_TELEGRAM = 54
const OVER_THERE = 55
const PARIS_TAXIS = 56
const RUSSIAN_CAVALRY = 57
const RUSSIAN_GUARDS = 58
const ALPINE_TROOPS = 59
const CZECH_LEGION = 60
const MAUDE = 61
const THE_SIXTUS_AFFAIR = 62
const BACKS_TO_THE_WALL = 63
const USA_REINFORCEMENTS_4 = 64
const INFLUENZA = 65

// Space indices
const LONDON = 1
const ROUEN = 12
const ORLEANS = 13
const PARIS = 15
const AMIENS = 16
const CALAIS = 17
const OSTEND = 18
const CHATEAU_THIERRY = 20
const MELUN = 21
const SEDAN = 30
const ANTWERP = 32
const LIEGE = 33
const KOBLENZ = 41
const ESSEN = 43
const TARANTO = 66
const BRESLAU = 94
const LODZ = 102
const CETINJE = 111
const TIRANA = 112
const VALONA = 113
const SALONIKA_SPACE = 117
const NIS = 122
const BELGRADE = 125
const WARSAW = 134
const RIGA = 140
const PETROGRAD = 143
const KOVNO = 147
const VILNA = 148
const MOSCOW = 152
const KHARKOV = 170
const KIEV = 171
const CAUCASUS = 186
const ODESSA = 188
const SOFIA = 198
const MEF1 = 216
const MEF2 = 217
const MEF3 = 218
const CONSTANTINOPLE = 219
const POTI = 233
const GROZNY = 234
const MEF4 = 260
const BASRA = 269
const ARABIA_SPACE = 271
const MEDINA = 272
const SINAI = 277
const ALEXANDRIA = 280
const LIBYA = 281
const AP_RESERVE_BOX = 282
const CP_RESERVE_BOX = 283
const AP_ELIMINATED_BOX = 284
const CP_ELIMINATED_BOX = 285

function is_mef_space(s) {
    return (s >= MEF1 && s <= MEF3) || s === MEF4
}

// Terrain
const MOUNTAIN = "mountain"
const SWAMP = "swamp"
const DESERT = "desert"
const FOREST = "forest"

// Piece indices
const GE_1_ARMY = find_piece(GERMANY, 'GE 1')
const GE_2_ARMY = find_piece(GERMANY, 'GE 2')
const GE_11_ARMY = find_piece(GERMANY, 'GE 11')
const BRITISH_NE_ARMY = find_piece(BRITAIN, 'BR NE')
const BEF_ARMY = find_piece(BRITAIN, 'BR BEF')
const BEF_CORPS = find_piece(BRITAIN, 'BR BEFc')
const MEF_ARMY = find_piece(BRITAIN, 'BR MEF')
const AUS_CORPS = find_piece(BRITAIN, 'AUSc')
const CND_CORPS = find_piece(BRITAIN, 'CNDc')
const PT_CORPS = find_piece(BRITAIN, 'PTc')
const CAU_ARMY = find_piece(RUSSIA, 'RU CAU')
const BRITISH_ANA_CORPS = find_piece(BRITAIN, 'BR ANAc')
const TURKISH_SN_CORPS = find_piece('sn', 'TU SNc')

function is_minor_british_nation(piece) {
    return piece === AUS_CORPS || piece === CND_CORPS || piece === PT_CORPS || piece === BRITISH_ANA_CORPS
}

function nation_name(nation) {
    switch (nation) {
        case FRANCE: return "France"
        case BRITAIN: return "Britain"
        case BELGIUM: return "Belgium"
        case ITALY: return "Italy"
        case GERMANY: return "Germany"
        case AUSTRIA_HUNGARY: return "Austria-Hungary"
        case RUSSIA: return "Russia"
        case SERBIA: return "Serbia"
        case MONTENEGRO: return "Montenegro"
        case BULGARIA: return "Bulgaria"
        case ROMANIA: return "Romania"
        case GREECE: return "Greece"
        case TURKEY: return "Turkey"
        case PERSIA: return "Persia"
        case ARABIA: return "Arabia"
        case EGYPT: return "Egypt"
        case US: return "US"
        case NONE: return "None"
        case AH_IT: return "Austria-Hungary (Italy)"
        case 'sn': return ""
        default: return nation
    }
}

function faction_name(faction) {
    switch (faction) {
        case AP: return "Allied Powers"
        case CP: return "Central Powers"
        default: return faction
    }
}

const HISTORICAL = "Historical"
exports.scenarios = [ HISTORICAL ]

exports.roles = [ AP, CP ]

exports.action = function (state, current, action, arg) {
    game = state
    if (action in states[game.state]) {
        states[game.state][action](arg, current)
    } else {
        if (action === "undo" && game.undo && game.undo.length > 0)
            pop_undo()
        else
            throw new Error("Invalid action: " + action)
    }
    return game
}

exports.resign = function (state, current) {
    game = state
    if (game.state !== "game_over") {
        log_br()
        log(`${current} resigned.`)
        game.state = "game_over"
        game.active = null
        game.state = "game_over"
        game.result = other_faction(current)
        game.victory = current + " resigned."
    }
    return game
}

exports.is_checkpoint = function (a, b) {
    let x = b.log[b.log.length-2]
    if (x === ".h2 cp") return true
    if (x === ".h2 ap") return true
    return false
}

exports.query = function (state, current, q) {
    if (q === 'supply') {
        game = state
        return query_supply()
    }
    return null
}

function inactive_prompt(name, who, where) {
    view.prompt = `Waiting for ${faction_name(game.active)} \u2014 ${name}...`
    if (who)
        view.who = who
    if (where)
        view.where = where
}

exports.view = function(state, current) {
    game = state

    view = {
        active: game.active,
        log: game.log,
        prompt: null,
        actions: null,
        turn: game.turn,
        vp: game.vp,
        us_entry: game.us_entry,
        russian_capitulation: game.russian_capitulation,
        last_card: game.last_card,
        activated: game.activated,
        move: game.move,
        attack: game.attack,
        ap: {
            deck: game.ap.deck.length,
            hand: game.ap.hand.length,
            commitment: game.ap.commitment,
            mo: game.ap.mo,
            ws: game.ap.ws,
            actions: game.ap.actions,
            trenches: game.ap.trenches,
            missed_mo: game.ap.missed_mo
        },
        cp: {
            deck: game.cp.deck.length,
            hand: game.cp.hand.length,
            commitment: game.cp.commitment,
            mo: game.cp.mo,
            ws: game.cp.ws,
            actions: game.cp.actions,
            ru_vp: game.cp.ru_vp,
            trenches: game.cp.trenches,
            missed_mo: game.cp.missed_mo
        },
        rp: game.rp,
        war: game.war,
        location: game.location,
        reduced: game.reduced,
        entrenching: game.entrenching,
        failed_entrench: game.failed_entrench,
        forts: {
            destroyed: game.forts.destroyed,
            besieged: game.forts.besieged
        },
        control: game.control,
        events: game.events,
        who: game.who,
        combat_cards: game.combat_cards,
        mef_beachhead: game.mef_beachhead_captured ? null : game.mef_beachhead,
        tsar_fell_cp_russian_vp: game.tsar_fell_cp_russian_vp,

        oos_pieces: get_oos_pieces(),
    }

    if (current === AP) {
        view.hand = game.ap.hand
    } else if (current === CP) {
        view.hand = game.cp.hand
    } else {
        view.hand = []
    }

    if (!states[game.state]) {
        view.prompt = "Invalid game state: " + game.state
        return view
    }

    if (current === 'Observer' || game.active !== current) {
        let inactive = states[game.state].inactive
        if (typeof inactive === 'function')
            states[game.state].inactive()
        else if (typeof inactive === 'string')
            inactive_prompt(inactive)
        else
            inactive_prompt(game.state.replace(/_/g, " "))
    } else {
        view.actions = {}
        states[game.state].prompt()
        if (view.actions.undo === undefined) {
            if (game.undo && game.undo.length > 0)
                view.actions.undo = 1
            else
                view.actions.undo = 0
        }
    }

    return view
}

exports.setup = function (seed, scenario, options) {
    scenario = HISTORICAL

    game = create_empty_game_state(seed, scenario, options)

    log_h1("Paths of Glory")

    setup_piece('ge', 'GE 1', 'Aachen')
    setup_piece('ge', 'GE 2', 'Koblenz')
    setup_piece('ge', 'GE 3', 'Koblenz')
    setup_piece('ge', 'GE 4', 'Metz')
    setup_piece('ge', 'GE 5', 'Metz')
    setup_piece('ge', 'GE 6', 'Strasbourg')
    setup_piece('ge', 'GE 7', 'Mulhouse', true)
    setup_piece('ge', 'GEc', 'Bremen', true)
    setup_piece('fr', 'FR 1', 'Nancy')
    setup_piece('fr', 'FR 2', 'Nancy')
    setup_piece('fr', 'FR 3', 'Verdun')
    setup_piece('fr', 'FR 4', 'Verdun')
    setup_piece('fr', 'FR 5', 'Sedan')
    setup_piece('fr', 'FR 6', 'Paris', true)
    setup_piece('fr', 'FR 9', 'Bar le Duc', true)
    setup_piece('fr', 'FRc', 'Belfort')
    setup_piece('fr', 'FRc', 'Belfort')
    setup_piece('fr', 'FRc', 'Grenoble')
    setup_piece('be', 'BE 1', 'Antwerp')
    setup_piece('br', 'BR BEF', 'Brussels')

    setup_piece('ge', 'GE 8', 'Insterberg')
    setup_piece('ge', 'GEc', 'Insterberg')
    setup_piece('ge', 'GEc', 'Oppeln', true)
    setup_piece('ah', 'AHc', 'Cracow')
    setup_piece('ah', 'AH 1', 'Tarnow')
    setup_piece('ah', 'AH 4', 'Przemysl')
    setup_piece('ah', 'AHc', 'Stanislau')
    setup_piece('ah', 'AH 2', 'Munkacs', true)
    setup_piece('ah', 'AH 3', 'Tarnopol')
    setup_piece('ah', 'AHc', 'Czernowitz')
    setup_piece('ah', 'AHc', 'Timisvar')
    setup_piece('ah', 'AHc', 'Villach')
    setup_piece('ah', 'AH 6', 'Sarajevo')
    setup_piece('ah', 'AH 5', 'Novi Sad')

    setup_piece('mn', 'MNc', 'Cetinje')
    setup_piece('sb', 'SB 2', 'Valjevo')
    setup_piece('sb', 'SB 1', 'Belgrade')

    setup_piece('ru', 'RUc', 'Odessa')
    setup_piece('ru', 'RUc', 'Lutsk')
    setup_piece('ru', 'RUc', 'Szawli')
    setup_piece('ru', 'RUc', 'Riga')
    setup_piece('ru', 'RUc', 'Grodno')
    setup_piece('ru', 'RU 1', 'Kovno')
    setup_piece('ru', 'RU 2', 'Lomza')
    setup_piece('ru', 'RU 4', 'Ivangorod')
    setup_piece('ru', 'RU 5', 'Lublin')
    setup_piece('ru', 'RU 3', 'Dubno')
    setup_piece('ru', 'RU 8', 'Kamenets-Podolski')
    setup_piece('ru', 'RUc', 'Kars')
    setup_piece('ru', 'RUc', 'Erivan')
    setup_piece('ru', 'RUc', 'Batum')

    setup_piece('br', 'BRc', 'Basra')
    setup_piece('br', 'BRc', 'Cairo', true)
    setup_piece('br', 'BRc', 'Port Said', true)

    setup_piece('br', 'BR BEFc', 'AP Reserve Box')
    setup_reserve_corps(ITALY, 4)
    setup_reserve_corps(FRANCE, 7)
    setup_reserve_corps(BRITAIN, 1)
    setup_reserve_corps(RUSSIA, 5)
    setup_reserve_corps(BELGIUM, 1)
    setup_reserve_corps(SERBIA, 2)
    setup_reserve_corps(AUSTRIA_HUNGARY, 4)
    setup_reserve_corps(GERMANY, 8)

    set_trench_level(find_space('Strasbourg'), 1, CP)
    set_trench_level(find_space('Mulhouse'), 1, CP)
    set_trench_level(find_space('Metz'), 1, CP)
    set_trench_level(find_space('Trent'), 1, CP)
    set_trench_level(find_space('Trieste'), 1, CP)
    set_trench_level(find_space('Villach'), 1, CP)
    set_trench_level(find_space('Cracow'), 1, CP)
    set_trench_level(find_space('Konigsberg'), 1, CP)
    set_trench_level(find_space('Verona'), 1, AP)
    set_trench_level(find_space('Asiago'), 1, AP)
    set_trench_level(find_space('Maggiore'), 1, AP)
    set_trench_level(find_space('Udine'), 1, AP)
    set_trench_level(find_space('Verdun'), 1, AP)
    set_trench_level(find_space('Nancy'), 1, AP)
    set_trench_level(find_space('Paris'), 1, AP)
    set_trench_level(find_space('Belfort'), 1, AP)
    set_trench_level(find_space('Odessa'), 1, AP)
    set_trench_level(find_space('Riga'), 1, AP)
    set_trench_level(find_space('Port Said'), 1, AP)
    set_trench_level(find_space('Cairo'), 1, AP)
    set_trench_level(find_space('Basra'), 1, AP)

    if (game.scenario === HISTORICAL) {
        game.options.hand_size = 8
        game.options.start_with_guns_of_august = 1
        game.options.failed_entrench = 1
    } else {
        game.options.hand_size = 7
    }

    setup_initial_decks()

    goto_start_turn()

    return game
}

function create_empty_game_state(seed, scenario, options) {
    return {
        seed: seed,
        scenario: scenario,
        options: object_copy(options),
        log: [],
        undo: [],

        active: null, // Active faction, AP or CP
        state: null, // Current state in the state machine

        turn: 1, // Turn number
        vp: 10, // Current VP, can move up or down
        us_entry: 0, // US commitment level
        russian_capitulation: 0, // Russian capitulation level
        ops: 0, // Ops points for the current action

        events: {}, // Event flags for remembering which events have been played

        // Replacement points
        rp: {
            ge: 0,
                ah: 0,
                fr: 0,
                br: 0,
                ru: 0,
                allied: 0,
                bu: 0,
                tu: 0,
                it: 0,
                us: 0
        },

        // Which nations are at war
        war: {
            it: 0,
            tu: 0,
            bu: 0,
            us: 0,
            ro: 0,
            gr: 0
        },

        // Units
        location: data.pieces.map(() => 0),
        reduced: [],
        removed: [],
        entrenching: [], // Units that are entrenching this turn
        failed_entrench: [], // Units that failed to entrench this turn

        // Spaces
        activated: {
            move: [], // Spaces activated for movement
            attack: [] // Spaces activated for attack
        },
        control: data.spaces.map((s) => s.faction === CP ? 1 : 0), // Current control of each space
        forts: { // data for spaces tells you strength of forts per space
            destroyed: [], // Spaces with destroyed forts
            besieged: [] // Spaces with besieged forts
        },

        // Allied Powers' state
        ap: {
            deck: [], // Cards in the deck
            discard: [], // Cards in the discard pile
            removed: [], // Cards that have been removed from the game
            hand: [], // Cards in the hand
            commitment: COMMITMENT_MOBILIZATION, // Current commitment level
            mo: NONE, // Mandatory offensive for this turn. Is set to None once it has been satisfied
            ws: 0, // War status level
            actions: [], // Actions played this turn, tracked for display on the action round tracker and to limit which actions are available
            shuffle: false, // Should the deck be shuffled before the next draw
            trenches: {}, // Trench levels per space
            missed_mo: [] // Turns on which AP missed their MO
        },

        // Central Powers' state (same as Allied Powers)
        cp: {
            deck: [],
            discard: [],
            removed: [],
            hand: [],
            commitment: COMMITMENT_MOBILIZATION,
            mo: NONE,
            ws: 0,
            ru_vp: 0,
            actions: [],
            shuffle: false,
            trenches: {},
            missed_mo: []
        },

        combat_cards: [], // Face-up played combat cards

        action_state: {}, // State for the current action, cleared after each action

        reinf_this_turn: {}, // Which nations have received reinforcements this turn
        mef_beachhead: null, // Which space contains the MEF beachhead, if any
        mef_beachhead_captured: false, // Has the MEF beachhead been captured by CP?
        ne_armies_placed_outside_neareast: [], // NE armies which have been placed outside the Near East, used to block them from operating on the NE map
        tsar_fell_cp_russian_vp: 0, // How many Russian VP were controlled by CP when the Fall of the Tsar event was played

        // Per-turn Near East map restrictions
        ne_restrictions: {
            // It is not permitted to use Sea or Reserve Box SR of FR Corps, IT Corps, GR Corps, RO Corps, SB Corps, US Corps, BE Corps, CND, PT, or BEF corps to or from the NE.
            br_sr: false, // No more than one British Corps (including the AUS Corps, but not including the CND, PT, or BEF Corps) may use Reserve Box SR to or from Near East or SR by sea to or from the Near East per turn.
            cp_sr: false, // No more than one CP Corps may SR to or from the Near East map per turn. Exception: Turkish Corps do not count against this limit.
            ru_sr: false, // No more than one Russian Corps (never an Army) may SR to or from the Near East map per turn.
            ru_non_sr: false, // Only one Russian Corps per turn may move in either direction between the “Caucasus” space and the Near East. One Russian corps may attack/retreat between the Caucasus space and the Near East per turn; this counts as the “one move” allowed.
        },
    }
}

function setup_initial_decks() {
    for (let i = 1; i < data.cards.length; i++) {
        if (i === GUNS_OF_AUGUST && game.options.start_with_guns_of_august) {
            game.cp.hand.push(i)
        } else if (data.cards[i].commitment === COMMITMENT_MOBILIZATION) {
            if (data.cards[i].faction === AP) {
                game.ap.deck.push(i)
            } else if (data.cards[i].faction === CP) {
                game.cp.deck.push(i)
            }
        }
    }

    shuffle(game.ap.deck)
    shuffle(game.cp.deck)
    deal_ap_cards()
    deal_cp_cards()
}

function goto_start_turn() {

    game.state = 'action_phase'
    game.active = CP
    log_br()
    log_h1(`Turn ${game.turn} - ${turn_season_and_year(game.turn)}`)
    log_br()
    roll_mandated_offensives()
    log_br()
    log_h2(`${faction_name(game.active)} Action ${game[game.active].actions.length+1}`)

    update_russian_capitulation()
}

const SEASON_NONE = "None"
const SEASON_WINTER = "Winter"
const SEASON_SPRING = "Spring"
const SEASON_SUMMER = "Summer"
const SEASON_FALL = "Fall"
const SEASONS = [ SEASON_WINTER, SEASON_SPRING, SEASON_SUMMER, SEASON_FALL ]

function turn_season_and_year(turn) {
    if (turn === 1) return "August 1914"
    if (turn === 2) return "September 1914"
    const year = 1915 + Math.floor((turn-4)/4)
    return `${get_season(turn)} ${year}`
}

function get_season(turn) {
    turn = turn || game.turn
    if (turn === 1) return SEASON_NONE
    if (turn === 2) return SEASON_NONE
    return SEASONS[turn%4]
}

function deal_ap_cards() {
    while (game.ap.hand.length < game.options.hand_size) {
        if (game.ap.deck.length === 0)
            reshuffle_discard(game.ap.deck)
        if (game.ap.deck.length === 0)
            break
        game.ap.hand.push(draw_card(game.ap.deck))
    }
}

function deal_cp_cards() {
    while (game.cp.hand.length < game.options.hand_size) {
        if (game.cp.deck.length === 0)
            reshuffle_discard(game.cp.deck)
        if (game.cp.deck.length === 0)
            break
        game.cp.hand.push(draw_card(game.cp.deck))
    }
}

function draw_card(deck) {
    let i = random(deck.length)
    let c = deck[i]
    deck.splice(i, 1)
    return c
}

function play_card(card) {
    let active_player = get_active_player()
    array_remove_item(active_player.hand, card)
    game.last_card = card
    active_player.discard.push(card)
}

function reshuffle_discard(deck) {
    let player

    if (deck === game.ap.deck) {
        player = game.ap
        log("Allied Powers deck reshuffled")
    } else if (deck === game.cp.deck) {
        player = game.cp
        log("Central Powers deck reshuffled")
    }

    game.last_card = 0
    player.deck = player.deck.concat(player.discard)
    player.discard = []
}

function goto_end_turn() {
    game.ap.actions = []
    game.cp.actions = []

    game.reinf_this_turn = {}
    clear_ne_restriction_flags()

    // Check for game end
    if (game.turn === 20) {
        let result = get_game_result_by_vp()
        goto_game_over(result, get_result_message("Turn Limit: ", result))
        return
    }

    game.turn++
    goto_start_turn()
}

function setup_piece(nation, unit, space, reduced) {
    let where = find_space(space)
    let who = find_unused_piece(nation, unit)
    game.location[who] = where
    if (reduced) {
        game.reduced.push(who)
    }
}

function setup_reserve_corps(nation, quantity) {
    let unit = ''
    let space = 'AP Reserve Box'
    switch (nation) {
        case ITALY:
            unit = 'ITc'
            break
        case FRANCE:
            unit = 'FRc'
            break
        case BRITAIN:
            unit = 'BRc'
            break
        case RUSSIA:
            unit = 'RUc'
            break
        case BELGIUM:
            unit = 'BEc'
            break
        case SERBIA:
            unit = 'SBc'
            break
        case AUSTRIA_HUNGARY:
            unit = 'AHc'
            space = 'CP Reserve Box'
            break
        case GERMANY:
            unit = 'GEc'
            space - 'CP Reserve Box'
            break
    }
    for (let i = 0; i < quantity; ++i) {
        setup_piece(nation, unit, space)
    }
}

function find_unused_piece(nation, name) {
    const pieces = find_n_unused_pieces(nation, name, 1)
    if (pieces.length === 0) {
        throw new Error(`Could not find unused piece for nation ${nation} and name ${name}`)
    }
    return pieces[0]
}

function find_n_unused_pieces(nation, name, n) {
    let pieces = []
    let found = 0
    for (let i = 0; i < data.pieces.length; i++) {
        let piece = data.pieces[i]
        if (piece.name === name && piece.nation === nation && game.location[i] === 0) {
            pieces.push(i)
            found++
        }
        if (found === n) {
            return pieces
        }
    }
    throw new Error(`Could not find ${n} unused pieces for nation ${nation} and name ${name}`)
}

function find_piece(nation, name) {
    for (let i = 0; i < data.pieces.length; i++) {
        let piece = data.pieces[i]
        if (piece.name === name && piece.nation === nation) {
            return i
        }
    }
    throw new Error(`Could not find piece for nation ${nation} and name ${name}`)
}

function find_space(name) {
    for (let i = 0; i < data.spaces.length; i++) {
        if (data.spaces[i].name === name) {
            return i
        }
    }
    throw new Error(`Could not find space named ${name}`)
}

function for_each_piece_in_space(s, f) {
    for (let p = 1; p < data.pieces.length; ++p)
        if (game.location[p] === s)
            f(p)
}

function get_pieces_in_space(s) {
    let pieces = []
    for (let p = 1; p < data.pieces.length; ++p)
        if (game.location[p] === s)
            pieces.push(p)
    return pieces
}

function nation_at_war(nation) {
    return game.war[nation] !== 0
}

function set_nation_at_war(nation) {
    game.war[nation] = 1

    if (nation === TURKEY) {
        setup_piece('tu', 'TUc', 'Constantinople')
        setup_piece('tu', 'TUc', 'Balikesir')
        setup_piece('tu', 'TUc', 'Gallipoli')
        setup_piece('tu', 'TUc', 'Ankara')
        setup_piece('tu', 'TUc', 'Erzerum')
        setup_piece('tu', 'TUc', 'Rize')
        setup_piece('tu', 'TUc', 'Van')
        setup_piece('tu', 'TUc', 'Adana')
        setup_piece('tu', 'TUc', 'Mosul')
        setup_piece('tu', 'TUc', 'Damascus')
        setup_piece('tu', 'TUc', 'Gaza')
        setup_piece('tu', 'TUc', 'Medina')
        setup_piece('tu', 'TUc', 'Baghdad')
    }

    if (nation === ITALY) {
        setup_piece('it', 'ITc', 'Rome')
        setup_piece('it', 'ITc', 'Turin')
        setup_piece('it', 'ITc', 'Taranto')
        setup_piece('it', 'IT 1', 'Verona', true)
        setup_piece('it', 'IT 2', 'Udine', true)
        setup_piece('it', 'IT 3', 'Maggiore', true)
        setup_piece('it', 'IT 4', 'Asiago', true)
    }

    if (nation === BULGARIA) {
        setup_piece(BULGARIA, 'BUc', 'Sofia')
        setup_piece(BULGARIA, 'BUc', 'Sofia')
        // Other 4 Bulgarian pieces are setup by player choice
    }

    if (nation === ROMANIA) {
        setup_piece(ROMANIA, 'ROc', 'Bucharest')
        setup_piece(ROMANIA, 'ROc', 'Bucharest')
        // Other 4 Romanian pieces are setup by player choice
    }

    if (nation === GREECE && !game.events.salonika) {
        setup_piece(GREECE, 'GRc', 'Athens')
        setup_piece(GREECE, 'GRc', 'Florina')
        setup_piece(GREECE, 'GRc', 'Larisa')
    }

    game.supply_cache = null
}

// === Mandated Offensives ===

const AP_MO_TABLE = {
    1: FRANCE,
    2: FRANCE,
    3: BRITAIN,
    4: ITALY,
    5: ITALY,
    6: RUSSIA,
    7: NONE
}

const AH_IT = "ah_it"
const CP_MO_TABLE = {
    1: AUSTRIA_HUNGARY,
    2: AH_IT,
    3: TURKEY,
    4: GERMANY,
    5: NONE,
    6: NONE
}

function roll_mandated_offensives() {
    let ap_roll = roll_die(6)
    let ap_index = ap_roll
    let ap_mo = AP_MO_TABLE[ap_index]

    if (ap_mo === ITALY && !nation_at_war(ITALY)) {
        ap_mo = NONE
    }

    if (ap_mo === FRANCE && all_capitals_occupied(FRANCE)) {
        ap_mo = BRITAIN
    }
    if (ap_mo === BRITAIN && all_capitals_occupied(BRITAIN)) {
        ap_mo = ITALY
    }
    if (ap_mo === ITALY) {
        if (!nation_at_war(ITALY)) {
            ap_mo = NONE
        } else if (all_capitals_occupied(ITALY)) {
            ap_mo = RUSSIA
        }
    }
    if (ap_mo === RUSSIA && (all_capitals_occupied(RUSSIA) || game.events.bolshevik_revolution)) {
        ap_mo = NONE
    }

    if (game.turn === 1 && ap_mo === BRITAIN && game.scenario === HISTORICAL) {
        ap_mo = FRANCE
    }

    let cp_roll = roll_die(6)
    if (game.events.hoffman > 0) {
        cp_roll++;
    }
    let cp_index = cp_roll > 6 ? 6 : cp_roll;
    let cp_mo = CP_MO_TABLE[cp_index]

    if ((cp_mo === AUSTRIA_HUNGARY || cp_mo === AH_IT) && all_capitals_occupied(AUSTRIA_HUNGARY)) {
        cp_mo = TURKEY
    }
    if (cp_mo === TURKEY) {
        if (!nation_at_war(TURKEY)) {
            cp_mo = NONE
        } else if (all_capitals_occupied(TURKEY)) {
            cp_mo = GERMANY
        }
    }
    if (cp_mo === GERMANY && all_capitals_occupied(GERMANY)) {
        cp_mo = NONE
    }

    if (cp_mo === AH_IT && !nation_at_war(ITALY)) {
        cp_mo = AUSTRIA_HUNGARY
    }

    if (cp_mo === GERMANY && game.events.h_l_take_command) {
        cp_mo = NONE
    }

    log(`Mandated offensives:`)
    log(`CP: B${cp_roll} -> ${nation_name(cp_mo)}`)
    log(`AP: W${ap_roll} -> ${nation_name(ap_mo)}`)

    game.ap.mo = ap_mo
    game.cp.mo = cp_mo
}

function get_capitals(nation) {
    let capitals = []
    for (let i = 1; i < data.spaces.length; i++) {
        if (data.spaces[i].capital && data.spaces[i].nation === nation) {
            capitals.push(i)
        }
    }
    return capitals
}

function all_capitals_occupied(nation) {
    const capitals = get_capitals(nation)
    if (capitals.length === 0)
        return false
    for (let c of capitals) {
        if (is_controlled_by(c, data.spaces[c].faction)) {
            return false
        }
    }
    return true
}

function any_capitals_occupied(nation) {
    const capitals = get_capitals(nation)
    const faction = data.spaces[capitals[0]].faction
    for (let c of capitals) {
        if (!is_controlled_by(c, faction)) {
            return true
        }
    }
    return false
}

function satisfies_mo(mo, attackers, defenders, space) {
    let attacker_nation = mo === AH_IT ? AUSTRIA_HUNGARY : mo;
    let valid_attacker = attackers.find((a) => {
        let piece = data.pieces[a]
        if (piece.nation !== attacker_nation)
            return false
        if (attacker_nation === BRITAIN && is_minor_british_nation(a)) {
            return false
        }
        return true
    })
    if (valid_attacker === undefined)
        return false

    let valid_defender = defenders.find((d) => {
        let piece = data.pieces[d]
        if (attacker_nation === FRANCE || attacker_nation === BRITAIN) {
            return piece.nation === GERMANY
        } else if (attacker_nation === GERMANY) {
            return piece.nation === BELGIUM || piece.nation === FRANCE || piece.nation === BRITAIN || piece.nation === US
        } else {
            return true
        }
    })
    if (valid_defender === undefined)
        return false

    let location = data.spaces[space].nation;
    if (attacker_nation === FRANCE || attacker_nation === BRITAIN || attacker_nation === GERMANY) {
        if (location !== FRANCE && location !== BELGIUM && location !== GERMANY) {
            return false
        }
    }

    if (mo === AH_IT) {
        // All other conditions have passed, so the attack satisfies the MO if the defender is Italian, the attacked
        // space is Italian, *or* the attacked space traces supply through Italy
        if (location === ITALY)
            return true

        for (let d of defenders) {
            if (data.pieces[d].nation === ITALY || is_unit_supplied_through_italy(d))
                return true
        }
    }

    return true
}

function is_unit_reduced(p) {
    return game.reduced.includes(p)
}

function get_piece_mf(p) {
    return is_unit_reduced(p) ? data.pieces[p].rmf : data.pieces[p].mf
}

function get_piece_cf(p) {
    return is_unit_reduced(p) ? data.pieces[p].rcf : data.pieces[p].cf
}

function get_piece_lf(p) {
    return is_unit_reduced(p) ? data.pieces[p].rlf : data.pieces[p].lf
}

function get_active_player() {
    if (game.active === AP) {
        return game.ap
    }
    if (game.active === CP) {
        return game.cp
    }
    throw new Error("Active player is not AP or CP")
}

function record_action(type, card) {
    let actions = game[game.active].actions
    actions.push({ type: type, card: card })
}

function get_last_action() {
    let actions = game[game.active].actions
    if (actions.length === 0)
        return undefined

    return actions[actions.length-1]
}

function can_play_neutral_entry() {
    for (let action of game.ap.actions) {
        if (action.type === ACTION_NEUTRAL_ENTRY)
            return false
    }
    for (let action of game.cp.actions) {
        if (action.type === ACTION_NEUTRAL_ENTRY)
            return false
    }
    return true
}

// === Trenches ===

function set_trench_level(s, level, faction) {
    if (faction === undefined)
        faction = is_controlled_by(s, AP) ? AP : CP

    game[faction].trenches[s] = level
}

function get_trench_level(s, faction) {
    if (faction === undefined)
        faction = is_controlled_by(s, AP) ? AP : CP

    let level = game[faction].trenches[s]
    return level ?? 0
}

function get_trench_level_for_attack(s, faction) {
    const base_lvl = get_trench_level(s, faction)
    if (!game.attack)
        return base_lvl

    if (base_lvl === 0 &&
        game.attack.attacker === AP &&
        game.attack.combat_cards.includes(TURK_DETERMINATION) &&
        events[data.cards[TURK_DETERMINATION].event].can_apply()) {
        return 1
    }

    return base_lvl
}

// === GAME STATES ===

states.action_phase = {
    inactive: "Action Phase",
    prompt() {
        let p = get_active_player()
        view.prompt = `Turn ${game.turn} Action ${p.actions.length+1}: Play a card or choose an action`
        for (let i = 0; i < p.hand.length; ++i)
            gen_card_menu(p.hand[i])
        gen_action('single_op')
        // If not playing the Historical scenario, add an action here for offering peace terms
    },
    play_event(card) {
        if (data.cards[card].reinfnation) {
            goto_play_reinf(card)
        } else {
            goto_play_event(card)
        }
    },
    play_ops(card) {
        goto_play_ops(card)
    },
    play_sr(card) {
        goto_play_sr(card)
    },
    play_rps(card) {
        goto_play_rps(card)
    },
    single_op() {
        goto_play_ops(undefined)
    }
}

function gen_card_menu(card) {
    // 9.5.2.5 - If CP is at Total War and AP is not, AP may only use the Italy and Romania cards for their event
    if ((card === ROMANIA_ENTRY || card === ITALY_ENTRY) && game.cp.commitment === COMMITMENT_TOTAL && game.ap.commitment !== COMMITMENT_TOTAL) {
        if (can_play_event(card))
            gen_action('play_event', card)
    } else {
        if (can_play_event(card))
            gen_action('play_event', card)
        gen_action('play_ops', card)
        if (can_play_sr(card))
            gen_action('play_sr', card)
        if (can_play_rps(card))
            gen_action('play_rps', card)
    }
}

function can_play_event(card) {
    const card_data = data.cards[card]

    if (card_data.reinfnation) {
        if (game.turn === 1)
            return false

        if (game.reinf_this_turn && game.reinf_this_turn[card_data.reinfnation])
            return false

        if (game.events.uboats_unleashed > 0 && !game.events.convoy && card_data.reinfnation === US)
            return false

        if (card === MEF && (!nation_at_war(TURKEY) || game.events.salonika > 0))
            return false

        return nation_at_war(card_data.reinfnation)
    }

    let evt = events[data.cards[card].event]
    return (evt !== undefined && evt.can_play())
}

function can_play_sr(card) {
    let action = get_last_action()
    return action === undefined || action.type !== ACTION_SR
}

function can_play_rps(card) {
    if (game.turn === game.events.influenza)
        return false

    let action = get_last_action()
    return action === undefined || action.type !== ACTION_RP
}

function goto_play_event(card) {
    push_undo()
    log(`${card_name(card)} - Event`)
    let active_player = get_active_player()
    array_remove_item(active_player.hand, card)
    game.last_card = card

    if (cards[card].remove)
        active_player.removed.push(card)
    else
        active_player.discard.push(card)

    const card_data = data.cards[card]
    if (card_data.ws) {
        active_player.ws += card_data.ws
        update_us_entry()
    }

    let evt = events[card_data.event]
    if (evt.is_neutral_entry)
        record_action(ACTION_NEUTRAL_ENTRY, card)
    else
        record_action(ACTION_EVENT, card)
    evt.play()
}

function goto_play_ops(card) {
    push_undo()
    if (card === undefined) {
        record_action(ACTION_1_OP, card)
        game.ops = 1
    } else {
        record_action(ACTION_OP, card)
        log(`${card_name(card)} - Operations`)
        play_card(card)
        game.ops = data.cards[card].ops
    }
    game.state = 'activate_spaces'
}

function goto_play_sr(card) {
    push_undo()
    record_action(ACTION_SR, card)
    let card_data = data.cards[card]
    game.sr = {
        pts: card_data.sr,
        unit: 0,
        done: []
    }

    log(`${card_name(card)} - Strategic Redeployment`)
    play_card(card)
    game.state = 'choose_sr_unit'
}

states.choose_sr_unit = {
    inactive: "Selecting Unit to SR",
    prompt() {
        view.prompt = `Select a unit to move by SR (${game.sr.pts} points remaining)`
        game.location.forEach((loc, p) => {
            if (loc !== 0 && data.pieces[p].faction === game.active && can_sr(p)) {
                gen_action_piece(p)
            }
        })
        gen_action_done()
    },
    piece(p) {
        if (game.sr.unit === 0) {
            push_undo()
            game.sr.unit = p
            game.sr.pts -= sr_cost(p)
            game.who = p
        }
        game.state = 'choose_sr_destination'
    },
    done() {
        end_sr()
        goto_end_action()
    }
}

function sr_cost(p) {
    return data.pieces[p].type === ARMY ? 4 : 1;
}

function can_sr(p) {
    let piece_data = data.pieces[p]
    if (sr_cost(p) > game.sr.pts) return false
    if (set_has(game.sr.done, p)) return false
    if (game.location[p] === AP_RESERVE_BOX || game.location[p] === CP_RESERVE_BOX) {
        // If enemy controls or besieges a nation's capital, no corps can SR from the Reserve Box (13.1.11)
        if (piece_data.nation !== BELGIUM && piece_data.nation !== SERBIA && any_capital_occupied_or_besieged(piece_data.nation)) {
            return false
        }

        // TODO: Units may not SR to or from Reserve Box if German/Austrian tracing supply from Sofia/Constantinople,
        //  Turkish tracing supply to Essen, Breslau, or Sofia, Bulgarian tracing supply to Essen, Breslau, or
        //  Constantinople, and Russian/Romanian tracing supply to Belgrade (13.1.12)
    } else {
        // If not in reserve box, must be supplied
        if (!is_unit_supplied(p)) return false
    }

    // if unit is from a nation not at war
    if (!nation_at_war(piece_data.nation)) return false

    // If unit is Russian, SR only if they are in Russia or Reserve Box (13.1.6)
    if (piece_data.nation === RUSSIA &&
        !(game.location[p] === AP_RESERVE_BOX || data.spaces[game.location[p]].nation === RUSSIA)) {
        return false
    }

    return true
}

function any_capital_occupied_or_besieged(nation) {
    const capitals = get_capitals(nation)
    for (let c of capitals) {
        if (!is_controlled_by(c, data.spaces[c].faction) || is_besieged(c)) {
            return true
        }
    }
    return false
}

states.choose_sr_destination = {
    inactive: "Choosing destination for Strategic Redeployment",
    prompt() {
        view.prompt = `Choose destination for Strategic Redeployment`
        let destinations = find_sr_destinations()
        destinations.forEach(gen_action_space)
    },
    space(s) {
        push_undo()
        log(`${piece_name(game.sr.unit)} SR from ${space_name(game.location[game.sr.unit])} to ${space_name(s)}`)
        set_ne_restriction_flags_for_sr(game.sr.unit, game.location[game.sr.unit], s)
        set_add(game.sr.done, game.sr.unit)
        game.location[game.sr.unit] = s
        game.sr.unit = 0
        game.who = 0
        game.state = 'choose_sr_unit'
    }
}

function find_sr_destinations() {
    let destinations = []
    const start = game.location[game.sr.unit]
    const nation = data.pieces[game.sr.unit].nation

    if (start === AP_RESERVE_BOX || start === CP_RESERVE_BOX) {
        // Add all spaces containing a supplied unit of the correct nationality, except ANA Corps and SN Corps
        for (let i = 0; i < game.location.length; i++) {
            if (game.location[i] !== 0 &&
                data.pieces[i].nation === nation &&
                is_unit_supplied(i) &&
                i !== BRITISH_ANA_CORPS &&
                i !== TURKISH_SN_CORPS) {
                set_add(destinations, game.location[i])
            }
        }

        // Add all capitals and supply sources in the nation, as long as they are in supply
        for (let s = 1; s < data.spaces.length; s++) {
            if (data.spaces[s].nation === nation &&
                is_space_supplied(game.active, s) &&
                (data.spaces[s].capital || data.spaces[s].supply)) {
                set_add(destinations, s)
            }
        }

        // If the nation is Serbia, add Salonika, when it is controlled by the allies and in supply
        const salonika = find_space('Salonika')
        if (nation === SERBIA && is_space_supplied(AP, salonika) && is_controlled_by(salonika, AP)) {
            set_add(destinations, salonika)
        }

        // If the nation is the US, add all Allied-controlled ports in France
        if (nation === US) {
            for (let s = 1; s < data.spaces.length; s++) {
                if (data.spaces[s].nation === FRANCE &&
                    is_controlled_by(s, AP) &&
                    is_port(s, AP)) {
                    set_add(destinations, s)
                }
            }
        }

        // TODO: 13.1.12 Units may not SR to or from the Reserve box under the following conditions: German and Austrian
        //  units tracing supply to Sofia or Constantinople, Turkish units tracing supply to Essen, Breslau or Sofia,
        //  Bulgarian units tracing supply to Essen, Breslau or Constantinople, and Russian and Romanian units tracing
        //  supply to Belgrade.
    } else if (data.pieces[game.sr.unit].type === CORPS) {
        // Corps can SR to the reserve box
        if (game.active === AP) {
            set_add(destinations, AP_RESERVE_BOX)
        } else {
            set_add(destinations, CP_RESERVE_BOX)
        }
    }

    // Add spaces that have an overland path
    let overland_destinations = []
    let frontier = [start]
    while (frontier.length > 0) {
        let current = frontier.pop()
        get_connected_spaces(current, nation).forEach((n) => {
            if (!set_has(destinations, n)
                && is_space_supplied(game.active, n)
                && (is_controlled_by(n, game.active) || is_besieged(n))) {
                if (nation === RUSSIA && data.spaces[n].nation !== RUSSIA)
                    return
                set_add(destinations, n)
                set_add(overland_destinations, n)
                set_add(frontier, n)
            }
        })
    }

    // AP can SR Corps to any friendly-controlled port, CP can SR using ports in Germany and Russia
    if (data.pieces[game.sr.unit].type === CORPS) {
        if (is_port(start, game.active)) {
            for (let s = 1; s < data.spaces.length; s++) {
                if (is_port(s, game.active) && is_controlled_by(s, game.active)) {
                    set_add(destinations, s)
                }
            }
        }
    }

    // 13.1.11 Capitals and SR: If the enemy controls or besieges a nation’s capital (Paris in the case of France,
    // Vienna or Budapest in the case of A-H), no Corps of that nation may SR to or from the Reserve Box as long as the
    // enemy control lasts. Exception: Belgian and Serb units are not affected by this restriction. The MN unit may not
    // use SR overland. It may SR to and from the Reserve Box.
    if (data.pieces[game.sr.unit].nation !== BELGIUM && data.pieces[game.sr.unit].nation !== SERBIA && any_capital_occupied_or_besieged(data.pieces[game.sr.unit].nation)) {
        set_delete(destinations, AP_RESERVE_BOX)
        set_delete(destinations, CP_RESERVE_BOX)
    }

    // Remove fully-stacked spaces and block NE spaces from consideration
    const is_neareast_start = is_neareast_space(start)
    const all_destinations = [...destinations]
    for (let d of all_destinations) {
        if (is_fully_stacked(d, game.active)) {
            set_delete(destinations, d)
            continue
        }

        if (is_neareast_space(d) !== is_neareast_start) {
            // No more than one CP Corps may SR to or from the Near East map per turn. Exception: Turkish Corps do not count against this limit.
            if (game.ne_restrictions.cp_sr && data.pieces[game.sr.unit].faction === CP && nation !== TURKEY) {
                set_delete(destinations, d)
                continue
            }

            // No more than one Russian Corps (never an Army) may SR to or from the Near East map per turn.
            if (game.ne_restrictions.ru_sr && data.pieces[game.sr.unit].nation === RUSSIA) {
                set_delete(destinations, d)
                continue
            }


            if (!set_has(overland_destinations, d)) {
                // No more than one British Corps (including the AUS Corps, but not including the CND, PT, or BEF Corps)
                // may use Reserve Box SR to or from Near East or SR by sea to or from the Near East per turn.
                if (data.pieces[game.sr.unit].nation === BRITAIN) {
                    if (game.ne_restrictions.br_sr) {
                        set_delete(destinations, d)
                        continue
                    } else if (!data.pieces[game.sr.unit].name.startsWith('BR') && !data.pieces[game.sr.unit].name.startsWith('AUS')) {
                        set_delete(destinations, d)
                    }
                }

                // It is not permitted to use Sea or Reserve Box SR of FR Corps, IT Corps, GR Corps, RO Corps, SB Corps,
                // US Corps, BE Corps, CND, PT, or BEF corps to or from the NE.
                if ([ITALY, FRANCE, GREECE, ROMANIA, SERBIA, US, BELGIUM].includes(data.pieces[game.sr.unit].nation)) {
                    set_delete(destinations, d)
                }
            }
        }
    }

    set_delete(destinations, start)

    return destinations
}

function set_ne_restriction_flags_for_sr(p, start, destination) {
    if (is_neareast_space(start) === is_neareast_space(destination)) {
        return
    }

    if (data.pieces[p].faction === CP && data.pieces[p].nation !== TURKEY) {
        game.ne_restrictions.cp_sr = true
        return
    }

    if (data.pieces[p].nation === RUSSIA) {
        game.ne_restrictions.ru_sr = true
        return
    }

    let has_overland_path = false
    let nation = data.pieces[p].nation
    let destinations = []
    let frontier = [start]
    while (frontier.length > 0) {
        let current = frontier.pop()
        if (current === destination) {
            has_overland_path = true
            break
        }
        get_connected_spaces(current, nation).forEach((n) => {
            if (!set_has(destinations, n)
                && is_space_supplied(game.active, n)
                && (is_controlled_by(n, game.active) || is_besieged(n))) {
                set_add(destinations, n)
                set_add(frontier, n)
            }
        })
    }

    if (!has_overland_path && nation === BRITAIN) {
        game.ne_restrictions.br_sr = true
    }
}

function update_russian_ne_restriction_flag(units, source, destination) {
    let ru_corps_count = 0
    for (let u of units) {
        if (data.pieces[u].nation === RUSSIA && data.pieces[u].type === CORPS) {
            ru_corps_count++
        }
    }

    if (ru_corps_count > 0) {
        if ((source === CAUCASUS && is_neareast_space(destination)) ||
            (destination === CAUCASUS && is_neareast_space(source))) {
            game.ne_restrictions.ru_non_sr = true
        }
    }
}

function check_russian_ne_restriction(units, destination) {
    let ru_corps_crossing_count = 0
    for (let u of units) {
        if (data.pieces[u].nation === RUSSIA && data.pieces[u].type === CORPS) {
            if ((is_neareast_space(game.location[u]) && destination === CAUCASUS) ||
                (is_neareast_space(destination) && game.location[u] === CAUCASUS))
            {
                ru_corps_crossing_count++
            }
        }
    }

    if (ru_corps_crossing_count === 0)
        return true

    if (ru_corps_crossing_count > 1)
        return false

    if (ru_corps_crossing_count === 1)
        return !game.ne_restrictions.ru_non_sr
}

function clear_ne_restriction_flags() {
    game.ne_restrictions = {
        br_sr: false,
        cp_sr: false,
        ru_sr: false,
        ru_non_sr: false
    }
}

function end_sr() {
    delete game.sr
}

function goto_play_rps(card) {
    push_undo()
    record_action(ACTION_RP, card)
    let card_data = data.cards[card]

    game.rp.ge += card_data.rpge ?? 0
    game.rp.ah += card_data.rpah ?? 0
    game.rp.fr += card_data.rpfr ?? 0
    game.rp.br += card_data.rpbr ?? 0
    game.rp.ru += card_data.rpru ?? 0
    game.rp.allied += card_data.rpa ?? 0
    game.rp.bu += card_data.rpbu !== undefined && nation_at_war(BULGARIA) ? card_data.rpbu : 0
    game.rp.it += card_data.rpit !== undefined && nation_at_war(ITALY) ? card_data.rpit : 0
    game.rp.tu += card_data.rptu !== undefined && nation_at_war(TURKEY) ? card_data.rptu : 0

    if (game.events.over_there > 0) {
        game.rp.us += 1
    }

    log(`Played ${card_name(card)} for Replacements`)
    play_card(card)
    goto_end_action()
}

function goto_play_reinf(card) {
    push_undo()
    const card_data = data.cards[card]
    record_action(ACTION_REINF, card)
    game.reinf_this_turn[card_data.reinfnation] = 1

    log(`Played ${card_name(card)} for the reinforcement event`)
    let active_player = get_active_player()
    array_remove_item(active_player.hand, card)
    game.last_card = card
    if (card_data.remove)
        active_player.removed.push(card)
    else
        active_player.discard.push(card)

    if (card_data.ws) {
        active_player.ws += card_data.ws
        update_us_entry()
    }

    const piece_nation = card === LIBYAN_REVOLT ? 'sn' : card_data.reinfnation // This card counts as Turkish reinforcements but places the 'sn' piece
    game.reinforcements = []
    card_data.reinf.split('|').forEach((name) => {
        let p = find_unused_piece(piece_nation, name)
        game.reinforcements.push(p)
    })
    game.state = 'place_reinforcements'
}

states.place_reinforcements = {
    inactive: "Place Reinforcements",
    prompt() {
        if (game.reinforcements.length > 0) {
            const first_piece = game.reinforcements[0]
            const first_piece_data = data.pieces[first_piece]
            view.prompt = `Place reinforcements: ${nation_name(first_piece_data.nation)} ${piece_name(first_piece)}`

            const spaces = get_available_reinforcement_spaces(first_piece)
            spaces.forEach((s) => {
                gen_action_space(s)
            })
        } else {
            view.prompt = `Place reinforcements - Done`
            gen_action_done()
        }
    },
    space(s) {
        push_undo()
        const p = game.reinforcements.shift()
        game.location[p] = s
        if (game.reduced.includes(p)) {
            array_remove_item(game.reduced, p)
        }
        log(`${piece_name(p)} placed in ${space_name(s)}`)

        if (neareast_armies.includes(p) && data.spaces[s].map !== 'neareast' && !is_mef_space(s)) {
            log(`${piece_name(p)} is a NE army placed outside the Near East, it will not be able to operate on the Near East map`)
            game.ne_armies_placed_outside_neareast.push(p)
        }

        if (is_mef_space(s)) {
            game.mef_beachhead = s
            log(`MEF beachhead established in ${space_name(s)}`)
        }
        set_control(s, game.active)
    },
    done() {
        clear_undo()
        goto_end_action()
    }
}

function get_available_reinforcement_spaces(p) {
    const piece_data = data.pieces[p]
    const nation = piece_data.nation
    const spaces = []

    // Special placement for SN corps
    if (p === TURKISH_SN_CORPS) {
        let libya_available = true
        for_each_piece_in_space(LIBYA, (p) => {
            if (data.pieces[p].faction === AP)
                libya_available = false
        })
        return libya_available ? [LIBYA] : []
    }

    // ANA Corps always goes in Arabia
    if (p === BRITISH_ANA_CORPS) {
        return [ARABIA_SPACE]
    }

    // Corps can be placed in the reserve box
    if (piece_data.type === CORPS) {
        if (piece_data.faction === AP)
            spaces.push(AP_RESERVE_BOX)
        else
            spaces.push(CP_RESERVE_BOX)
        return spaces
    }

    // Special placement options for French Orient Army, British NE Army, Russian CAU Army, and British MEF Army
    if (piece_data.name === 'FR Orient') {
        spaces.push(SALONIKA_SPACE)
    } else if (piece_data.name === 'BR NE') {
        spaces.push(ALEXANDRIA)
    } else if (piece_data.name === 'RU CAU') {
        // any supplied space in Russia on the NE map
        for (let s = 1; s < data.spaces.length; s++) {
            if (data.spaces[s].nation === RUSSIA && data.spaces[s].map === 'neareast' && is_space_supplied(AP, s))
                spaces.push(s)
        }
    } else if (piece_data.name === 'BR MEF') {
        spaces.push(MEF1)
        spaces.push(MEF2)
        spaces.push(MEF3)
        spaces.push(MEF4)
    }

    // US Armies can only be placed at unbesieged ports in France
    if (nation === US) {
        for (let s = 1; s < data.spaces.length; s++) {
            const space = data.spaces[s]
            if (space.nation === FRANCE && is_port(s, AP) && is_controlled_by(s, game.active) && !is_besieged(s)) {
                spaces.push(s)
            }
        }
        return spaces
    }

    // Friendly-controlled capitals can receive armies
    const capitals = get_capitals(nation)
    for (let c of capitals) {
        if (is_controlled_by(c, game.active) && is_space_supplied(game.active, c) && !is_fully_stacked(c, game.active)) {
            spaces.push(c)
        }
    }

    // Friendly supply sources in the right nation can receive armies
    for (let s = 1; s < data.spaces.length; s++) {
        const space = data.spaces[s]
        if (space.nation === nation && space.supply && is_controlled_by(s, game.active) && is_space_supplied(game.active, s) && !is_fully_stacked(s, game.active)) {
            spaces.push(s)
        }
    }

    // If Paris is fully stacked, but not besieged or captured, French reinforcements can go in Orleans
    const paris = find_space('Paris')
    const orleans = find_space('Orleans')
    if (nation === FRANCE &&
        is_fully_stacked(paris, game.active) &&
        is_controlled_by(paris, game.active) &&
        is_controlled_by(orleans, game.active &&
        is_space_supplied(game.active, orleans))) {
        spaces.push(orleans)
    }

    return spaces
}

function roll_peace_terms(faction_offering, combined_war_status) {
    clear_undo()
    let roll = roll_die(6)
    log(`Peace terms roll: ${fmt_roll(roll, 0, faction_offering)}`)
    if (roll <= 2 || (roll === 3 && combined_war_status < 20)) {
        game.vp += faction_offering === AP ? 1 : -1
        logi(`Success, 1 VP for ${faction_name(faction_offering)}`)
    } else if (roll === 6) {
        game.vp += faction_offering === AP ? -1 : 1
        logi(`Failure, 1 VP for ${faction_name(other_faction(faction_offering))}`)
    } else {
        logi(`No effect`)
    }
}

function is_neareast_space(s) {
    return data.spaces[s].map === 'neareast'
}

states.activate_spaces = {
    inactive: "Activate Spaces",
    prompt() {
        view.prompt = `Activate spaces to move or attack — ${game.ops} ops remaining`
        let spaces = []
        game.location.forEach((loc, p) => {
            if (loc !== 0 && data.pieces[p].faction === game.active) {
                set_add(spaces, loc)
            }
        })

        const used_ne_activation = game.activated.attack.find((s) => is_neareast_space(s) && !is_mef_space(s) && s !== game.location[BRITISH_NE_ARMY]) !== undefined
        spaces.forEach((s) => {
            if (set_has(game.activated.move, s) || set_has(game.activated.attack, s)) {
                gen_action('deactivate', s)
            } else {
                if (is_space_supplied(game.active, s)) {
                    if (!nation_at_war(GREECE) && game.events.salonika > 0) {
                        // Limited Greek entry: prevent activating spaces with Greek units
                        if (contains_piece_of_nation(s, GREECE))
                            return
                    }

                    if (game.ops >= cost_to_activate(s, MOVE))
                        gen_action('activate_move', s)

                    if (game.ops >= cost_to_activate(s, ATTACK)) {
                        if (game.active === AP && used_ne_activation && is_neareast_space(s)) {
                            // The Allied player may Activate only one space per Action Round for combat on the Near East
                            // map. This applies to spaces actually on the NE map. Units in spaces not on the NE map may
                            // still attack into the NE map. (e.g., Adrianople, Gallipoli, Balikesir.) Exceptions: The MEF
                            // Beachhead space and the space containing the British NE Army do not count against this limit.
                            if (is_mef_space(s) || game.location[BRITISH_NE_ARMY] === s) {
                                gen_action('activate_attack', s)
                            }
                        } else {
                            gen_action('activate_attack', s)
                        }
                    }
                }
            }
        })
        gen_action_done()
    },
    deactivate(s) {
        push_undo()
        if (set_has(game.activated.move, s)) {
            game.ops += cost_to_activate(s, MOVE)
            set_delete(game.activated.move, s)
        } else if (set_has(game.activated.attack, s)) {
            game.ops += cost_to_activate(s, ATTACK)
            set_delete(game.activated.attack, s)
        }
        if (game.sud_army_space === s) {
            delete game.sud_army_space
        }
    },
    activate_move(s) {
        push_undo()
        set_add(game.activated.move, s)
        game.ops -= cost_to_activate(s, MOVE)
        if (!game.sud_army_space && is_possible_sud_army_stack(get_pieces_in_space(s))) {
            game.sud_army_space = s
        }
    },
    activate_attack(s) {
        push_undo()
        set_add(game.activated.attack, s)
        game.ops -= cost_to_activate(s, ATTACK)
        if (!game.sud_army_space && is_possible_sud_army_stack(get_pieces_in_space(s))) {
            game.sud_army_space = s
        }
    },
    done() {
        start_action_round()
    }
}

function start_action_round() {
    game.ops = 0
    game.eligible_attackers = []
    game.moved = []
    game.attacked = []
    game.retreated = []
    game.location.forEach((s, p) => {
        if (game.activated.attack.includes(s)) {
            game.eligible_attackers.push(p)
        }
    })
    goto_next_activation()
}

function start_move_activation() {
    game.move = {
        initial: 0,
        current: 0,
        spaces_moved: 0,
        pieces: []
    }
    if (can_entrench() && get_units_eligible_to_entrench().length > 0)
        game.state = 'choose_entrench_units'
    else
        game.state = 'choose_move_space'
}

function start_attack_activation() {
    game.attack = {
        pieces: [],
        space: 0,
        attacker: game.active,
        attacker_drm: 0,
        defender_drm: 0,
        combat_cards: [], // Combat cards selected for use in this attack
        new_combat_cards: [] // CC played during this attack
    }
    game.state = 'choose_attackers'
}

function end_move_activation() {
    array_remove_item(game.activated.move, game.move.initial)
    game.move = null
}

function end_attack_activation() {
    if (game.attack.used_peace_offensive && !game.attack.did_advance) {
        log(`${faction_name(game.active)} failed to advance after using ${card_name(PEACE_OFFENSIVE)}, -1 VP`)
        game.vp--
    }

    if (game.eligible_attackers.length === 0)
        game.activated.attack = []
    game.attack = null
}

function goto_next_activation() {
    if (game.activated.move.length > 0) {
        start_move_activation()
    } else if (game.activated.attack.length > 0) {
        start_attack_activation()
    } else {
        goto_end_action()
    }
}

function goto_end_action() {
    // Clean up state that is per action round
    delete game.moved
    delete game.attacked
    delete game.retreated
    delete game.sud_army_space

    game.action_state = {} // Reset any state that lasts for the action round

    clear_undo()

    const failed_previously = game.failed_entrench
    game.failed_entrench = failed_previously.filter((p) => data.pieces[p].faction !== game.active)
    if (game.entrenching.length > 0) {
        clear_undo()
        game.entrenching.forEach((p) => {
            const roll = roll_die(6)
            const drm = failed_previously.includes(p) ? -1 : 0
            log(`Entrench attempt in ${space_name(game.location[p])}`)
            const success = roll+drm <= get_piece_lf(p)
            if (success) {
                logi(`${fmt_roll(roll, drm)} -> Success`)
                let lvl = get_trench_level(game.location[p], game.active)
                set_trench_level(game.location[p], lvl+1, game.active)
            } else {
                const nation = data.pieces[p].nation
                if (game.options.failed_entrench && (nation === GERMANY || nation === BRITAIN || nation === FRANCE || nation === ITALY))
                    game.failed_entrench.push(p)
                logi(`${fmt_roll(roll, drm)} -> Failure`)
            }
        })
        game.entrenching.length = 0
    }

    if (game.active === AP && game.events.high_seas_fleet > 0) {
        log(`${faction_name(AP)} did not play ${card_name(GRAND_FLEET)} this action round, ${card_name(HIGH_SEAS_FLEET)} adds 1 VP`)
        game.vp++
        delete game.events.high_seas_fleet
    }

    update_us_entry()
    update_russian_capitulation()

    if (game.ap.actions.length < 6 || game.cp.actions.length < 6) {
        game.active = other_faction(game.active)
        game.state = 'action_phase'
        log_h3(`${faction_name(game.active)} Action ${game[game.active].actions.length+1}`)
    } else {
        goto_attrition_phase()
    }
}

function can_entrench() {
    return game.activated.move.length > 0 && game.events.entrench > 0
}

function update_us_entry() {
    const previous_level = game.us_entry
    if (game.events.over_there > 0) {
        game.us_entry = 3
    } else if (game.events.zimmermann_telegram > 0) {
        game.us_entry = 2
    } else if (events.zimmermann_telegram.can_play()) {
        game.us_entry = 1
        if (previous_level < 1) log(`${card_name(ZIMMERMANN_TELEGRAM)} can now be played`)
    } else {
        game.us_entry = 0
    }
}

function update_russian_capitulation() {
    const previous_level = game.russian_capitulation
    if (game.events.treaty_of_brest_litovsk > 0) {
        game.russian_capitulation = 7
    } else if (game.events.bolshevik_revolution > 0) {
        game.russian_capitulation = 6
    } else if (events.bolshevik_revolution.can_play()) {
        game.russian_capitulation = 5
        if (previous_level < 5) log(`${card_name(BOLSHEVIK_REVOLUTION)} can now be played`)
    } else if (game.events.fall_of_the_tsar > 0) {
        game.russian_capitulation = 4
        if (previous_level > 4) log(`${card_name(BOLSHEVIK_REVOLUTION)} can no longer be played`)
    } else if (events.fall_of_the_tsar.can_play()) {
        game.russian_capitulation = 3
        if (previous_level < 3) log(`${card_name(FALL_OF_THE_TSAR)} can now be played`)
    } else if (game.events.tsar_takes_command > 0) {
        game.russian_capitulation = 2
        if (previous_level > 2) log(`${card_name(FALL_OF_THE_TSAR)} can no longer be played`)
    } else if (events.tsar_takes_command.can_play()) {
        game.russian_capitulation = 1
        if (previous_level < 1) log(`${card_name(TSAR_TAKES_COMMAND)} can now be played`)
    } else {
        game.russian_capitulation = 0
        if (previous_level > 0) log(`${card_name(TSAR_TAKES_COMMAND)} can no longer be played`)
    }
}

states.choose_move_space = {
    inactive: 'Choosing a space to move',
    prompt() {
        view.prompt = `Choose an activated space to begin moving`
        let space_eligible_to_move = false
        game.activated.move.forEach((s) => {
            let piece_eligible_to_move = false
            for_each_piece_in_space(s, (p) => {
                if (get_piece_mf(p) > 0 && !game.entrenching.includes(p)) {
                    piece_eligible_to_move = true
                }
            })
            if (piece_eligible_to_move) {
                space_eligible_to_move = true
                gen_action_space(s)
            }
        })
        if (!space_eligible_to_move) { // This can happen if all spaces are entrenching, for example
            gen_action_done()
        }
    },
    space(s) {
        push_undo()
        game.move.initial = s
        game.move.current = s
        for_each_piece_in_space(game.move.initial, (p) => {
            if (get_piece_mf(p) > 0 && !game.entrenching.includes(p) && !game.moved.includes(p))
                game.move.pieces.push(p)
        })
        game.state = 'choose_pieces_to_move'
    },
    done() {
        push_undo()
        game.activated.move.length = 0
        end_move_activation()
        goto_next_activation()
    }
}

function get_units_eligible_to_entrench() {
    let units = []
    let entrenching_spaces = game.entrenching.map((p) => game.location[p])
    game.activated.move.forEach((s) => {
        let trench_lvl = get_trench_level(s, game.active)
        if (is_controlled_by(s, game.active) && trench_lvl < 2 && !entrenching_spaces.includes(s)) {
            for_each_piece_in_space(s, (p) => {
                if (data.pieces[p].type === ARMY && !game.moved.includes(p)) {
                    units.push(p)
                }
            })
        }
    })
    return units
}

states.choose_entrench_units = {
    inactive: 'Choosing units to entrench',
    prompt() {
        view.prompt = `Choose units to entrench`

        get_units_eligible_to_entrench().forEach((p) => {
            gen_action_piece(p)
        })
        gen_action_done()
    },
    piece(p) {
        push_undo()
        log(`${piece_name(p)} will attempt to entrench in ${space_name(game.location[p])}`)
        game.entrenching.push(p)
    },
    done() {
        push_undo()
        game.state = 'choose_move_space'
    }
}

states.place_event_trench = {
    inactive: 'Place trench for the Entrench event',
    prompt() {
        view.prompt = `Place a trench in a space with a supplied friendly army`

        let spaces = []
        for (let p = 1; p < data.pieces.length; p++) {
            if (game.location[p] !== 0 &&
                data.pieces[p].faction === game.active &&
                data.pieces[p].type === ARMY &&
                get_trench_level(game.location[p], game.active) === 0 &&
                is_unit_supplied(p)) {
                set_add(spaces, game.location[p])
            }
        }
        spaces.forEach(gen_action_space)

        if (spaces.length === 0) {
            gen_action_done()
        }

    },
    space(s) {
        log(`Placed a trench in ${space_name(s)}`)
        set_trench_level(s, 1, game.active)
        goto_end_action()
    },
    done() {
        goto_end_action()
    }
}

states.choose_pieces_to_move = {
    inactive: 'Choose units to move',
    prompt() {
        view.prompt = `Choose units to move from ${space_name(game.move.initial)} or choose a space to begin moving`

        for_each_piece_in_space(game.move.initial, (p) => {
            if (get_piece_mf(p) > 0 && !game.entrenching.includes(p) && !game.moved.includes(p)) {
                gen_action_piece(p)
            }
        })

        if (game.move.pieces.length > 0) {
            get_eligible_spaces_to_move().forEach((s) => {
                gen_action_space(s)
            })
        } else {
            gen_action('done')
        }
    },
    piece(p) {
        if (game.move.pieces.includes(p)) {
            array_remove_item(game.move.pieces, p)
        } else {
            game.move.pieces.push(p)
        }
    },
    space(s) {
        push_undo()
        move_stack_to_space(s)
        game.state = 'move_stack'
    },
    move() {
        push_undo()
        game.state = 'move_stack'
    },
    done() {
        push_undo()
        end_move_activation()
        goto_next_activation()
    }
}

function get_eligible_spaces_to_move() {
    if (is_besieged(game.move.current)) {
        let units_in_space_after_move = []
        for_each_piece_in_space(game.move.current, (p) => {
            if (!game.move.pieces.includes(p))
                units_in_space_after_move.push(p)
        })
        if (units_in_space_after_move.length > 0 && !can_besiege(game.move.current, units_in_space_after_move))
            return [] // Can't move out of this space because it would break the siege, unless moving all units out of the space
    }

    let spaces = []
    let lowest_mf = 1000
    game.move.pieces.forEach((p) => {
        let mf = get_piece_mf(p)
        if (mf < lowest_mf)
            lowest_mf = mf
    })

    if (game.move.spaces_moved < lowest_mf) {
        let moving_nations = []
        game.move.pieces.forEach((p) => { set_add(moving_nations, data.pieces[p].nation) })
        let connections = null
        if (moving_nations.length === 1) {
            connections = get_connected_spaces(game.move.current, moving_nations[0])
        } else {
            connections = get_connected_spaces(game.move.current)
        }
        connections.forEach((conn) => {
            if (can_move_to(conn, game.move.pieces))
                spaces.push(conn)
        })
    }
    return spaces
}

function move_stack_to_space(s) {
    if (is_besieged(game.move.current)) {
        let pieces_remaining = []
        for_each_piece_in_space(game.move.current, (p) => {
            if (!game.move.pieces.includes(p))
                pieces_remaining.push(p)
        })
        if (!can_besiege(game.move.current, pieces_remaining)) {
            set_delete(game.forts.besieged, game.move.current)
        }
    }

    update_russian_ne_restriction_flag(game.move.pieces, game.move.current, s)

    game.move.pieces.forEach((p) => {
        game.location[p] = s
    })
    game.move.spaces_moved++
    game.move.current = s

    if (!has_undestroyed_fort(s, other_faction(game.active))) {
        set_control(s, game.active)
        capture_trench(s, game.active)
    }
}

states.move_stack = {
    inactive: 'Moving a stack of units',
    prompt() {
        view.prompt = 'Move the stack of units'

        get_eligible_spaces_to_move().forEach((s) => {
            gen_action_space(s)
        })

        if (!is_overstacked(game.move.current, game.active)) {
            game.move.pieces.forEach((p) => { gen_action_piece(p) })
        }


        if (can_end_move(game.move.current))
            gen_action('end_move')
    },
    space(s) {
        push_undo()
        move_stack_to_space(s)
    },
    piece(p) {
        push_undo()
        array_remove_item(game.move.pieces, p)
        game.moved.push(p)
        if (game.move.pieces.length === 0) {
            end_move_stack()
        }
    },
    end_move() {
        push_undo()
        end_move_stack()
    }
}

function set_control(s, faction) {
    const new_control = faction === CP ? 1 : 0
    if (game.control[s] === new_control)
        return

    if (data.spaces[s].vp) {
        const is_russian = data.spaces[s].nation === RUSSIA
        if (faction === AP) {
            game.vp--
            if (is_russian) game.cp.ru_vp--
        } else {
            game.vp++
            if (is_russian) game.cp.ru_vp++
        }
        log(`${faction_name(faction)} take ${space_name(s)} (1 VP)`)
    }

    if (s === game.mef_beachhead && !game.mef_beachhead_captured && faction === CP) {
        log(`MEF beachhead captured`)
        game.mef_beachhead_captured = true
    }

    game.control[s] = new_control
    game.supply_cache = null

    update_russian_capitulation()
}

function capture_trench(s, faction) {
    const trench_lvl = get_trench_level(s, other_faction(faction))
    if (trench_lvl === 2) {
        set_trench_level(s, 1, faction)
    }
    if (trench_lvl > 0) {
        set_trench_level(s, 0, other_faction(faction))
    }
}

function is_controlled_by(s, faction) {
    // The ANA unit is an exception to case 11.1.14. The ANA does not convert CP spaces it enters. Instead any CP space
    // (except for a besieged fort space) the ANA occupies is considered under Allied control. The instant the ANA
    // leaves such a space it reverts back to CP control. The ANA has no effect on spaces converted by other Allied
    // units—these remain Allied after the ANA exits.

    let controlling_faction = game.control[s] === 1 ? CP : AP
    if (game.location[BRITISH_ANA_CORPS] === s) {
        controlling_faction = AP
    }
    return faction === controlling_faction
}

function contains_piece_of_faction(s, faction) {
    for (let p = 1; p < data.pieces.length; ++p)
        if (game.location[p] === s && data.pieces[p].faction === faction)
            return true

    return false
}

function contains_piece_of_nation(s, nation) {
    for (let p = 1; p < data.pieces.length; ++p)
        if (game.location[p] === s && data.pieces[p].nation === nation)
            return true

    return false
}

// Returns false if there are no pieces in the space
function contains_only_pieces_of_nation(s, nation) {
    let found_piece = false
    for (let p = 1; p < data.pieces.length; ++p)
        if (game.location[p] === s) {
            if (data.pieces[p].nation === nation)
                found_piece = true
            else
                return false
        }
    return found_piece
}

function can_move_to(s, moving_pieces) {
    let contains_enemy = contains_piece_of_faction(s, other_faction(game.active))
    if (contains_enemy)
        return false

    if (would_overstack(s, moving_pieces, game.active))
        return false

    if (!is_controlled_by(s, game.active) && has_undestroyed_fort(s, other_faction(game.active)) && !is_besieged(s) && !can_besiege(s, moving_pieces)) {
        return false
    }

    // No units may enter a MEF space unless the MEF Beachhead marker is in the space.
    if (is_mef_space(s) && game.mef_beachhead !== s) {
        return false
    }

    // Units may not enter a space in a neutral nation, but all units may freely enter any nation immediately after it
    // enters the war.
    if (!nation_at_war(data.spaces[s].nation)) {
        if (data.spaces[s].nation === GREECE && game.events.salonika > 0) {
            if (contains_piece_of_nation(s, GREECE))
                return false
        } else {
            return false
        }
    }

    // TODO: Units may always enter Albania. Albanian spaces are considered Allied Controlled at Start for SR purposes.
    //  Albanian spaces check Attrition supply by tracing normally to an Allied supply source or tracing to Taranto
    //  even while Italy is still Neutral.

    // Neither the BEF Corps nor Army may move in or attack into any space outside Britain, France, Belgium, and Germany.
    if (moving_pieces.includes(find_piece(BRITAIN, 'BR BEFc')) || moving_pieces.includes(find_piece(BRITAIN, 'BR BEF'))) {
        if (data.spaces[s].nation !== BRITAIN && data.spaces[s].nation !== FRANCE && data.spaces[s].nation !== BELGIUM && data.spaces[s].nation !== GERMANY) {
            return false
        }
    }

    if (is_neareast_space(s) && !can_enter_neareast(moving_pieces)) {
        return false
    }

    //  15.1.12 Russian units may not attack, enter, or besiege a German fort space during the August 1914 turn.
    if (game.turn === 1
        && moving_pieces.find((p) => data.pieces[p].nation === RUSSIA) !== undefined
        && data.spaces[s].nation === GERMANY
        && has_undestroyed_fort(s, CP)) {
        return false
    }

    // Once Fall of the Tsar is played, Russian corps cannot move between the Caucasus box and the near east map
    if (game.events.fall_of_the_tsar > 0 && moving_pieces.find((p) => data.pieces[p].nation === RUSSIA && data.pieces[p].type === CORPS) !== undefined) {
        const from = game.location[moving_pieces[0]]
        if (s === CAUCASUS && (from === POTI || from === GROZNY)) {
            return false
        }
        if (from === CAUCASUS && (s === POTI || s === GROZNY)) {
            return false
        }
    }

    // Check for the Russian Near East restriction
    if (!check_russian_ne_restriction(moving_pieces, s)) {
        return false
    }

    return true
}

const neareast_armies = [
    find_piece(RUSSIA, 'RU CAU'),
    find_piece(BRITAIN, 'BR NE'),
    find_piece(FRANCE, 'FR Orient'),
    find_piece(BRITAIN, 'BR MEF'),
    find_piece(TURKEY, 'TU YLD'),
    find_piece(TURKEY, 'TU AoI')
]

function can_enter_neareast(pieces) {
    for (let p of pieces) {
        // if any pieces is an army and it's either not a neareast army or it's a neareast army that was initially
        // placed outside the neareast map, then the stack can't enter the neareast map
        if (data.pieces[p].type === ARMY && (!neareast_armies.includes(p) || game.ne_armies_placed_outside_neareast.includes(p))) {
            return false
        }

        // Per the event card that brings them into play, the Russian Cavalry Corps units cannot enter the Near East map
        if (data.pieces[p].name === "RU CAVc") {
            return false
        }
    }
    return true
}

function is_fully_stacked(s, faction) {
    if (s === AP_RESERVE_BOX || s === CP_RESERVE_BOX)
        return false

    let matches = 0
    for (let p = 1; p < game.location.length; ++p) {
        if (game.location[p] === s && data.pieces[p].faction === faction) {
            matches++
        }
        if (matches === STACKING_LIMIT)
            return true
    }
    return false
}

function is_overstacked(s, faction) {
    return would_overstack(s, [], faction)
}

function would_overstack(s, pieces, faction) {
    let matches = 0
    pieces.forEach((p) => {
        if (data.pieces[p].faction === faction) {
            matches++
        }
    })
    for (let p = 1; p < game.location.length; ++p) {
        if (game.location[p] === s && data.pieces[p].faction === faction) {
            matches++
        }
    }

    return (matches > STACKING_LIMIT)
}

function can_end_move(s) {
    if (game.activated.attack.includes(s))
        return false

    if (!game.events.race_to_the_sea && (s === AMIENS || s === CALAIS || s === OSTEND) && game.cp.ws < 4) {
        return false
    }

    if (is_overstacked(s, game.active))
        return false

    return true
}

function end_move_stack() {
    if (!is_controlled_by(game.move.current, game.active) && has_undestroyed_fort(game.move.current, other_faction(game.active))) {
        set_add(game.forts.besieged, game.move.current)
        game.supply_cache = null
    }

    game.move.pieces.forEach((p) => {
        game.moved.push(p)
    })

    if (get_pieces_in_space(game.move.initial).length > 0) {
        game.move.current = game.move.initial
        game.move.spaces_moved = 0
        game.move.pieces = []
        game.state = 'choose_pieces_to_move'
    } else {
        end_move_activation()
        goto_next_activation()
    }
}

function piece_can_join_attack_without_breaking_siege(piece) {
    if (!is_besieged(game.location[piece]))
        return true

    let pieces_remaining = []
    for_each_piece_in_space(game.location[piece], (p) => {
        if (piece !== p && !game.attack.pieces.includes(p))
            pieces_remaining.push(p)
    })

    return can_besiege(game.location[piece], pieces_remaining)
}

states.choose_attackers = {
    inactive: 'Choosing units and space to attack',
    prompt() {
        view.prompt = `Select which units will attack then select a space to begin the attack`

        game.eligible_attackers.forEach((p) => {
            if (game.attack.pieces.includes(p)) {
                gen_action_piece(p)
            } else if (piece_can_join_attack_without_breaking_siege(p)) {
                gen_action_piece(p)
            }
        })
        get_attackable_spaces(game.attack.pieces).forEach((s) => {
            gen_action_space(s)
        })
        gen_action_pass()
    },
    piece(p) {
        push_undo()
        if (game.attack.pieces.includes(p))
            array_remove_item(game.attack.pieces, p)
        else
            game.attack.pieces.push(p)
    },
    space(s) {
        push_undo()
        game.attack.space = s
        game.attacked.push(s)
        goto_attack()
    },
    pass() {
        game.eligible_attackers = []
        end_attack_activation()
        goto_next_activation()
    }
}

function goto_attack() {
    game.attack.pieces.forEach((p) => {
        array_remove_item(game.eligible_attackers, p)
    })

    let attack_sources = []
    game.attack.pieces.forEach((p) => { set_add(attack_sources, game.location[p]) })
    attack_sources.forEach((source) => {
        update_russian_ne_restriction_flag(game.attack.pieces, source, game.attack.space)
    })

    log_h3(`Attack on ${space_name(game.attack.space)}`)
    log(`Attackers:`)
    for (let p of game.attack.pieces) {
        logi(`${piece_name(p)} (${space_name(game.location[p])})`)
    }

    const mo = game.active === AP ? game.ap.mo : game.cp.mo
    if (mo !== NONE && satisfies_mo(mo, game.attack.pieces, get_pieces_in_space(game.attack.space), game.attack.space)) {
        game[game.active].mo = NONE
        log(`${faction_name(game.attack.attacker)} satisfy Mandated Offensive`)
    }

    if (game.events.french_mutiny > 0 && game.attack.attacker === AP) {
        const french_attacking = undefined !== game.attack.pieces.find((p) => data.pieces[p].nation === FRANCE)
        const us_supporting = undefined !== game.attack.pieces.find((p) => data.pieces[p].nation === US)
        if (french_attacking && !us_supporting) {
            game.french_attacked_without_us_support = true // Set a flag to track this for the French Mutiny event, which will update the VP at end of turn
        }
    }

    goto_attack_step_great_retreat()
}

function goto_attack_step_great_retreat() {
    if (game.turn === game.events.great_retreat && undefined !== get_pieces_in_space(game.attack.space).find((p) => data.pieces[p].nation === RUSSIA)) {
        game.active = other_faction(game.active)
        game.state = 'great_retreat_option'
    } else {
        goto_attack_step_brusilov_offensive()
    }
}

function goto_attack_step_brusilov_offensive() {
    if (game.action_state.brusilov_available && events.brusilov_offensive.can_apply()) {
        game.state = 'brusilov_offensive_option'
    } else {
        goto_attack_step_trench_negation()
    }
}

function goto_attack_step_trench_negation() {
    if (can_play_combat_cards() && get_trench_level_for_attack(game.attack.space, other_faction(game.attack.attacker)) > 0) {
        // if defending space has a trench, go to 'negate_trench'
        game.state = 'negate_trench'
    } else {
        goto_attack_step_flank()
    }
}

function goto_attack_step_flank() {
    if (attacker_can_flank()) {
        // if attacker can flank, go to 'choose_flank_attack'
        game.state = 'choose_flank_attack'
    } else {
        goto_attack_step_withdrawal()
    }
}

function goto_attack_step_withdrawal() {
    if (defender_can_withdraw()) {
        // if defender can withdraw, go to 'choose_withdrawal'
        game.active = other_faction(game.active)
        game.state = 'choose_withdrawal'
    } else {
        goto_attack_step_kerensky_offensive()
    }
}

function goto_attack_step_kerensky_offensive() {
    if (game.action_state.kerensky_available && events.kerensky_offensive.can_apply()) {
        game.state = 'kerensky_offensive_option'
    } else {
        goto_attack_step_combat_cards()
    }
}

function goto_attack_step_combat_cards() {
     if (can_play_combat_cards()) {
        // Start with all eligible combat cards selected
        for (let cc of game.combat_cards) {
            let evt = events[data.cards[cc].event]
            if (evt && evt.can_apply()) {
                game.attack.combat_cards.push(cc)
            }
        }
        game.state = 'attacker_combat_cards'
    } else {
        begin_combat()
    }
}

function attacking_unoccupied_fort() {
    return (data.spaces[game.attack.space].fort > 0 &&
        !set_has(game.forts.destroyed, game.attack.space) &&
        get_pieces_in_space(game.attack.space).length === 0)
}

function attacker_can_flank() {
    const space_data = data.spaces[game.attack.space]
    // Mountains and swamps cannot be flanked
    if (space_data.terrain === MOUNTAIN || space_data.terrain === SWAMP)
        return false

    // Unoccupied forts cannot be flanked
    if (attacking_unoccupied_fort()) {
        return false
    }

    // Attacker must have an army and attack from at least two spaces to flank
    let has_army = false
    let attack_spaces = []
    game.attack.pieces.forEach((p) => {
        if (data.pieces[p].type === ARMY)
            has_army = true
        set_add(attack_spaces, game.location[p])
    })
    if (!has_army || attack_spaces.length < 2)
        return false

    return true
}

function defender_can_withdraw() {
    if (game.attack.attacker === CP && (game.ap.removed.includes(WITHDRAWAL_AP) || game.ap.discard.includes(WITHDRAWAL_AP)))
        return false

    if (game.attack.attacker === AP && (game.cp.removed.includes(WITHDRAWAL_CP) || game.cp.discard.includes(WITHDRAWAL_CP)))
        return false

    const withdrawal_spaces = get_retreat_options(get_pieces_in_space(game.attack.space), game.attack.space)
    if (withdrawal_spaces.length === 0)
        return false

    return !attacking_unoccupied_fort()
}

function can_play_combat_cards() {
    return !attacking_unoccupied_fort()
}

function get_attackable_spaces(attackers) {
    let eligible_spaces = []
    for (let i = 0; i < attackers.length; ++i) {
        let attacker = attackers[i]
        let attackable_spaces = get_attackable_spaces_for_piece(attacker)
        if (i === 0) { // First attacker's spaces are all eligible
            eligible_spaces.push(...attackable_spaces)
        } else { // Subsequent attackers subtract ineligible spaces
            let to_remove = []
            eligible_spaces.forEach((s) => {
                if (!attackable_spaces.includes(s)) {
                    to_remove.push(s)
                }
            })
            to_remove.forEach((s) => { array_remove_item(eligible_spaces, s) })
        }
    }

    // Remove spaces that have already been attacked this action round
    eligible_spaces = eligible_spaces.filter((s) => game.attacked.includes(s) === false )

    // TODO: Units in London may conduct a Combat only if the Combat also involves friendly units located in a
    //  space in either France or Belgium. Italian units may attack across the Taranto–Valona dotted line without
    //  friendly units located in Albania or Greece.

    if (is_invalid_multinational_attack(attackers)) {
        return []
    }

    // Limited Greek entry
    if (!nation_at_war(GREECE) && game.events.salonika > 0) {
        eligible_spaces = eligible_spaces.filter((s) => data.spaces[s].nation !== GREECE || !contains_piece_of_nation(s, GREECE))
    }

    const russian_attacker = attackers.find((p) => data.pieces[p].nation === RUSSIA) !== undefined
    const german_attacker = attackers.find((p) => data.pieces[p].nation === GERMANY) !== undefined
    eligible_spaces.filter((s) => {
        //  15.1.12 Russian units may not attack, enter, or besiege a German fort space during the August 1914 turn.
        if (game.turn === 1 && russian_attacker && data.spaces[s].nation === GERMANY && has_undestroyed_fort(s, CP)) {
            return false
        }

        // 15.1.11 Russian Forts: German units may not attack spaces containing Russian forts until the OberOst Event
        // Card is played or the Central Powers War Status is 4 or higher. German units may, however, besiege unoccupied
        // Russian forts. Austro-Hungarian units are not restricted by this rule.
        if (german_attacker && data.spaces[s].nation === RUSSIA && has_undestroyed_fort(s, AP)) {
            if (game.cp.ws < 4 && game.events.oberost === undefined)
                return false
        }

        if (!check_russian_ne_restriction(attackers, s)) {
            return false
        }
    })

    // Lloyd George prevents attacks against German defenders with level 2 trenches while active
    if (is_lloyd_george_active() && attackers.find((p) => data.pieces[p].nation === BRITAIN) !== undefined) {
        eligible_spaces = eligible_spaces.filter((s) => !(get_trench_level(s, CP) === 2 && contains_piece_of_nation(s, GERMANY)))
    }

    // Stavka Timidity prevents Russian attacks against entrenched German defenders for the turn it is played
    if (game.turn === game.events.stavka_timidity && attackers.find((p) => data.pieces[p].nation === RUSSIA) !== undefined) {
        eligible_spaces = eligible_spaces.filter((s) => !(get_trench_level(s, CP) > 0 && contains_only_pieces_of_nation(s, GERMANY)))
    }

    return eligible_spaces
}

function get_nation_for_multinational_attacks(piece) {
    let nation = data.pieces[piece].nation

    if (data.pieces[piece].faction === AP && game.turn === game.events.everyone_into_battle) {
        return AP
    }

    switch (nation) {
        case "sn":
            return TURKEY
        case MONTENEGRO:
            return SERBIA
        default:
            return nation // ANA, Aus, Cnd, and Pt units are already marked as British in data
    }
}

function is_invalid_multinational_attack(attackers) {
    // Multi-national Attacks can occur from more than one space if one of the spaces in the attack contains
    //  units of all involved nationalities. Any other space(s) involved in the same Combat may contain units from
    //  any of the nationalities in the common space. Each participating nation must have a unit in the common
    //  space participating in the attack. Due to this restriction and stacking limits, no Combat may involve more
    //  than three nationalities on each side.
    let all_nations = []
    let nations_in_space = {}
    for (let p of attackers) {
        let nation = get_nation_for_multinational_attacks(p)
        let space = game.location[p]
        set_add(all_nations, nation) // Collect all unique nations
        if (nations_in_space[space] === undefined)
            nations_in_space[space] = []
        set_add(nations_in_space[space], nation) // Collect unique nations per space
    }

    if (all_nations.length <= 1)
        return false // Not a multinational attack

    for (const s in nations_in_space) {
        // Found one space with the same number of nations as the whole attack, so this is a valid attack
        if (nations_in_space[s].length >= all_nations.length)
            return false
    }
    return true
}

function get_attackable_spaces_for_piece(p) {
    let attackable_spaces = []
    let s = game.location[p]
    get_connected_spaces(s, data.pieces[p].nation).forEach((conn) => {
        if (can_be_attacked(conn)) {
            set_add(attackable_spaces, conn)
        }
    })
    return attackable_spaces
}

function can_be_attacked(s) {
    let retval = false

    // Check if space has an attackable fort
    if (has_undestroyed_fort(s, other_faction(game.active)) && is_controlled_by(s, other_faction(game.active)) && !is_besieged(s)) {
        return true
    }

    for (let p = 0; p < game.location.length; ++p) {
        if (game.location[p] === s && data.pieces[p].faction !== game.active) {
            retval = true
            break
        }
    }

    // TODO: Can't have only units that retreated this round
    return retval
}

const TRENCH_NEGATING_CARDS = [ROYAL_TANK_CORPS, VON_BELOW, VON_HUTIER, MICHAEL, BLUCHER, PEACE_OFFENSIVE]

states.negate_trench = {
    inactive: 'Attacker Choosing Whether to Negate Trenches',
    prompt() {
        view.prompt = 'Play any combat cards that would negate trenches'

        game[game.active].hand.forEach((c) => {
            if (TRENCH_NEGATING_CARDS.includes(c) && events[data.cards[c].event].can_play()) {
                gen_action_card(c)
            }
        })

        gen_action_next()
    },
    card(c) {
        clear_undo()
        array_remove_item(game[game.active].hand, c)
        game.combat_cards.push(c)
        game.attack.combat_cards.push(c)
        log(`${faction_name(game.active)} plays ${card_name(c)}`)
    },
    next() {
        goto_attack_step_flank()
    }
}

states.choose_flank_attack = {
    inactive: 'Attacker Choosing Whether to Attempt a Flank Attack',
    prompt() {
        view.prompt = 'Choose a pinning space to attempt a flanking attack, or pass to skip flanking'
        let attack_spaces = []
        game.attack.pieces.forEach((p) => {
            set_add(attack_spaces, game.location[p])
        })
        attack_spaces.forEach(gen_action_space)
        gen_action_pass()
    },
    space(s) {
        game.attack.pinning_space = s
        log(`Flank attack, pinning from ${space_name(s)}`)
        if (can_play_wireless_intercepts())
            game.state = 'play_wireless_intercepts'
        else
            roll_flank_attack()
    },
    pass() {
        goto_attack_step_withdrawal()
    }
}

function can_play_wireless_intercepts() {
    return game[game.active].hand.includes(WIRELESS_INTERCEPTS) &&
        game.attack.pieces.find((p) => data.pieces[p].nation === GERMANY) &&
        contains_piece_of_nation(game.attack.space, RUSSIA)
}

states.play_wireless_intercepts = {
    inactive: 'Attacker Choosing Whether to Attempt a Flank Attack',
    prompt() {
        view.prompt = 'Play Wireless Intercepts?'
        if (game[game.active].hand.includes(WIRELESS_INTERCEPTS)) {
            gen_action_card(WIRELESS_INTERCEPTS)
        }
        gen_action_pass()
    },
    card(c) {
        array_remove_item(game[game.active].hand, c)
        game.combat_cards.push(c)
        game.attack.combat_cards.push(c)
        log(`${faction_name(game.active)} plays ${card_name(c)}`)
        log('Flank attack successful')
        game.attack.is_flank = true
        goto_attack_step_withdrawal()
    },
    pass() {
        roll_flank_attack()
    }
}

function roll_flank_attack() {
    if (game.attack.pinning_space) {
        log(`Flanking:`)
        logi(`Pinning space: ${space_name(game.attack.pinning_space)}`)
        const flanking_spaces = []
        let flank_drm = 0
        game.attack.pieces.forEach((p) => {
            if (game.location[p] !== game.attack.pinning_space) {
                set_add(flanking_spaces, game.location[p])
            }
        })
        flanking_spaces.forEach((s) => {
            let add_drm = true
            if (adds_flanking_drm(s, game.attack.attacker)) {
                add_drm = false
            }
            logi(`${space_name(s)}: ${add_drm ? '+1 DRM' : 'no DRM'}`)
            if (add_drm)
                flank_drm++
        })
        const roll = roll_die(6)
        logi(`${fmt_roll(roll, flank_drm)}`)
        if (roll + flank_drm >= 4) {
            logi('Successful')
            game.attack.is_flank = true
        } else {
            logi('Failed')
            game.attack.failed_flank = true
        }
        clear_undo()
    }

    goto_attack_step_withdrawal()
}

states.choose_withdrawal = {
    inactive: 'Defender Choosing Whether to Withdraw',
    prompt() {
        view.prompt = 'Play Withdrawal or pass'

        const active_withdrawal_card = game.active === AP ? WITHDRAWAL_AP : WITHDRAWAL_CP
        if (game[game.active].hand.includes(active_withdrawal_card)) {
            gen_action_card(active_withdrawal_card)
        }
        gen_action_pass()
    },
    card(c) {
        clear_undo()
        array_remove_item(game[game.active].hand, c)
        game.combat_cards.push(c)
        game.attack.combat_cards.push(c)
        log(`${faction_name(game.active)} plays ${card_name(c)}`)
        this.pass()
    },
    pass() {
        game.active = other_faction(game.active)
        goto_attack_step_kerensky_offensive()
    }
}

states.attacker_combat_cards = {
    inactive: 'Attacker Combat Cards',
    prompt() {
        view.prompt = `Select combat cards for this attack`

        game[game.active].hand.forEach((c) => {
            if (data.cards[c].cc) {
                let evt = events[data.cards[c].event]
                if (evt && evt.can_play())
                    gen_action_card(c)
            }
        })

        game.combat_cards.forEach((c) => {
            let evt = events[data.cards[c].event]
            if (data.cards[c].faction === game.active && evt && evt.can_apply())
                gen_action_card(c)
        })

        gen_action_done()
    },
    card(c) {
        if (game.combat_cards.includes(c)) {
            // This is a played combat card, so toggle whether it is active in this attack
            push_undo()
            if (game.attack.combat_cards.includes(c)) {
                array_remove_item(game.attack.combat_cards, c)
                log(`${faction_name(game.active)} chooses not to use ${card_name(c)}`)
            } else {
                game.attack.combat_cards.push(c)
                log(`${faction_name(game.active)} chooses to use ${card_name(c)}`)
            }
        } else {
            // Card was not played yet, so add it to the played combat cards and make it active for this attack
            clear_undo()
            array_remove_item(game[game.active].hand, c)
            game.combat_cards.push(c)
            game.attack.combat_cards.push(c)
            game.attack.new_combat_cards.push(c)
            log(`${faction_name(game.active)} plays ${card_name(c)}`)
            let evt = events[data.cards[c].event]
            if (evt && evt.play)
                evt.play()
        }
    },
    done() {
        game.active = other_faction(game.attack.attacker)
        game.state = 'defender_combat_cards'
    }
}

states.defender_combat_cards = {
    inactive: 'Defender Combat Cards',
    prompt() {
        view.prompt = `Play combat cards`
        game[game.active].hand.forEach((c) => {
            if (data.cards[c].cc) {
                let evt = events[data.cards[c].event]
                if (evt && evt.can_play())
                    gen_action_card(c)
            }
        })

        game.combat_cards.forEach((c) => {
            let evt = events[data.cards[c].event]
            if (data.cards[c].faction === game.active && evt && evt.can_apply())
                gen_action_card(c)
        })

        gen_action_done()
    },
    card(c) {
        if (game.combat_cards.includes(c)) {
            // This is a played combat card, so toggle whether it is active in this attack
            push_undo()
            if (game.attack.combat_cards.includes(c)) {
                array_remove_item(game.attack.combat_cards, c)
                log(`${faction_name(game.active)} chooses not to use ${card_name(c)}`)
            } else {
                game.attack.combat_cards.push(c)
                log(`${faction_name(game.active)} chooses to use ${card_name(c)}`)
            }
        } else {
            // Card was not played yet, so add it to the played combat cards and make it active for this attack
            clear_undo()
            array_remove_item(game[game.active].hand, c)
            game.combat_cards.push(c)
            game.attack.combat_cards.push(c)
            game.attack.new_combat_cards.push(c)
            log(`${faction_name(game.active)} plays ${card_name(c)}`)
            let evt = events[data.cards[c].event]
            if (evt && evt.play)
                evt.play()
        }
    },
    done() {
        begin_combat()
    }
}

function begin_combat() {
    if (is_haig_active() &&
        get_trench_level(game.attack.space, CP) > 0 &&
        contains_piece_of_nation(game.attack.space, GERMANY) &&
        [FRANCE, BELGIUM, GERMANY].includes(data.spaces[game.attack.space].nation) &&
        game.attack.pieces.find((p) => data.pieces[p].nation === BRITAIN) !== undefined) {
        game.attack.haig_cancels_ge_retreat = true
    }

    resolve_fire()
}

function adds_flanking_drm(space, attacking_faction, attack_space) {
    const spaces = get_connected_spaces(space)
    for (let i = 0; i < spaces.length; ++i) {
        if (spaces[i] !== attack_space && contains_piece_of_faction(spaces[i], other_faction(attacking_faction)))
            return false
    }
    return true
}

function resolve_fire() {
    const von_hutier_active = game.attack.combat_cards.includes(VON_HUTIER) && events.von_hutier.can_play()
    if (game.attack.failed_flank) {
        resolve_defenders_fire()
        game.active = game.attack.attacker
        game.state = 'apply_attacker_losses'
    } else if (game.attack.is_flank || von_hutier_active) {
        if (von_hutier_active)
            log(`${card_name(VON_HUTIER)}: attacker fires first`)
        resolve_attackers_fire()
        goto_defender_losses()
    } else {
        resolve_attackers_fire()
        resolve_defenders_fire()
        goto_defender_losses()
    }
}

const fire_table = {
    corps: [
        {factors: 0, result: [0, 0, 0, 0, 1, 1], name: "0 (Corps)"},
        {factors: 1, result: [0, 0, 0, 1, 1, 1], name: "1 (Corps)"},
        {factors: 2, result: [0, 1, 1, 1, 1, 1], name: "2 (Corps)"},
        {factors: 3, result: [1, 1, 1, 1, 2, 2], name: "3 (Corps)"},
        {factors: 4, result: [1, 1, 1, 2, 2, 2], name: "4 (Corps)"},
        {factors: 5, result: [1, 1, 2, 2, 2, 3], name: "5 (Corps)"},
        {factors: 6, result: [1, 1, 2, 2, 3, 3], name: "6 (Corps)"},
        {factors: 7, result: [1, 2, 2, 3, 3, 4], name: "7 (Corps)"},
        {factors: 8, result: [2, 2, 3, 3, 4, 4], name: "8+ (Corps)"}
    ],
    army: [
        {factors: 1, result:  [0, 1, 1, 1, 2, 2], name: "1 (Army)"},
        {factors: 2, result:  [1, 1, 2, 2, 3, 3], name: "2 (Army)"},
        {factors: 3, result:  [1, 2, 2, 3, 3, 4], name: "3 (Army)"},
        {factors: 4, result:  [2, 2, 3, 3, 4, 4], name: "4 (Army)"},
        {factors: 5, result:  [2, 3, 3, 4, 4, 5], name: "5 (Army)"},
        {factors: 6, result:  [3, 3, 4, 4, 5, 5], name: "6-8 (Army)"},
        {factors: 9, result:  [3, 4, 4, 5, 5, 7], name: "9-11 (Army)"},
        {factors: 12, result: [4, 4, 5, 5, 7, 7], name: "12-14 (Army)"},
        {factors: 15, result: [4, 5, 5, 7, 7, 7], name: "15 (Army)"},
        {factors: 16, result: [5, 5, 7, 7, 7, 7], name: "16+ (Army)"}
    ]
}

function get_fire_result(t, cf, shifts, roll) {
    let table = fire_table[t]
    let col = 0
    while (col < table.length && table[col].factors < cf) {
        col++
    }
    col += shifts
    col = col < 0 ? 0 : col >= table.length ? table.length-1 : col
    logi(`Column: ${table[col].name}`)
    return table[col].result[roll-1]
}

function resolve_attackers_fire() {
    let attacker_cf = 0
    game.attack.attacker_table = CORPS

    for (let p of game.attack.pieces) {
        attacker_cf += get_piece_cf(p)
        if (data.pieces[p].type === ARMY)
            game.attack.attacker_table = ARMY
    }

    // Determine DRM based on played combat cards
    game.attack.combat_cards.forEach((c) => {
        if (data.cards[c].faction === game.attack.attacker) {
            let evt = events[data.cards[c].event]
            if (evt && evt.can_apply !== undefined && evt.can_apply())
                evt.apply()
        }
    })

    if (game.action_state.brusilov_active) {
        events.brusilov_offensive.apply_drm()
    }

    // -3 DRM if all attackers are in the Sinai space
    if (game.attack.pieces.every((p) => game.location[p] === SINAI) && !(game.attack.attacker === AP && game.events.sinai_pipeline > 0)) {
        game.attack.attacker_drm -= 3
        logi(`Attackers in Sinai: -3 DRM`)
    }

    log(`Attacker's fire (${attacker_cf} cf):`)

    let attacker_shifts = 0

    // Terrain shifts
    let terrain = data.spaces[game.attack.space].terrain;
    if (terrain === MOUNTAIN) {
        attacker_shifts -= 1
        logi(`Mountains: shift 1L`)
    }
    if (terrain === SWAMP) {
        attacker_shifts -= 1
        logi(`Swamps: shift 1L`)
    }

    // Trench shifts
    if (!attacking_unoccupied_fort() && !game.attack.trenches_canceled) {
        if (get_trench_level_for_attack(game.attack.space, other_faction(game.attack.attacker)) === 2) {
            attacker_shifts -= 2
            logi(`Trenches: shift 2L`)
        } else if (get_trench_level_for_attack(game.attack.space, other_faction(game.attack.attacker)) === 1) {
            attacker_shifts -= 1
            logi(`Trenches: shift 1L`)
        }
    }

    let roll = roll_die(6) + game.attack.attacker_drm
    let clamped_roll = roll > 6 ? 6 : roll < 1 ? 1 : roll
    game.attack.defender_losses = get_fire_result(game.attack.attacker_table, attacker_cf, attacker_shifts, clamped_roll)
    game.attack.defender_losses_taken = 0
    game.attack.defender_loss_pieces = []
    game.attack.defender_replacements = {}

    clear_undo()

    logi(`Roll: ${fmt_roll(roll, game.attack.attacker_drm, game.attack.attacker)}`)
    logi(`Defender losses: ${game.attack.defender_losses}`)
}

function resolve_defenders_fire() {
    const defender = other_faction(game.attack.attacker)
    let defender_cf = 0
    game.attack.defender_table = CORPS

    for_each_piece_in_space(game.attack.space, (p) => {
        if (!set_has(game.retreated, p))
            defender_cf += get_piece_cf(p)
        if (data.pieces[p].type === ARMY)
            game.attack.defender_table = ARMY
    })

    const space_data = data.spaces[game.attack.space]
    if (space_data.fort > 0 && !set_has(game.forts.destroyed, game.attack.space)) {
        defender_cf += space_data.fort
    }

    log(`Defender's fire (${defender_cf} cf):`)

    game.attack.combat_cards.forEach((c) => {
        if (data.cards[c].faction === defender) {
            let evt = events[data.cards[c].event]
            if (evt && evt.can_apply()) {
                evt.apply()
            }
        }
    })

    let defender_shifts = 0
    if (get_trench_level_for_attack(game.attack.space, defender) > 0 && !game.attack.trenches_canceled) {
        defender_shifts += 1
        logi(`Trenches: shift 1R`)
    }

    let roll = roll_die(6) + game.attack.defender_drm
    let clamped_roll = roll > 6 ? 6 : roll < 1 ? 1 : roll
    game.attack.attacker_losses = get_fire_result(game.attack.defender_table, defender_cf, defender_shifts, clamped_roll)
    game.attack.attacker_losses_taken = 0

    clear_undo()

    logi(`Roll: ${fmt_roll(roll, game.attack.defender_drm, other_faction(game.attack.attacker))}`)
    logi(`Attacker losses: ${game.attack.attacker_losses}`)
}

states.eliminate_retreated_units = {
    inactive: 'Eliminating Units that Previously Retreated',
    prompt() {
        let has_pieces_to_eliminate = false
        for_each_piece_in_space(game.attack.space, (p) => {
            if (set_has(game.retreated, p)) {
                gen_action_piece(p)
                has_pieces_to_eliminate = true
            }
        })

        if (has_pieces_to_eliminate) {
            view.prompt = 'Eliminate units that previously retreated'
        } else {
            view.prompt = 'Eliminate units that previously retreated — Done'
            gen_action_done()
        }
    },
    piece(p) {
        push_undo()
        // Pieces eliminated in this condition are sent to the eliminated box and not replaced (12.5.6)
        game.location[p] = game.active === AP ? AP_ELIMINATED_BOX : CP_ELIMINATED_BOX
        array_remove_item(game.retreated, p)
    },
    done() {
        game.state = 'apply_defender_losses'
    }
}

states.apply_defender_losses = {
    inactive: 'Defender taking losses',
    prompt() {

        let loss_options = []
        if (game.attack.defender_losses - game.attack.defender_losses_taken > 0) {
            const fort_strength = has_undestroyed_fort(game.attack.space, game.active) ? data.spaces[game.attack.space].fort : 0
            loss_options = get_loss_options(true, game.attack.defender_losses - game.attack.defender_losses_taken, get_pieces_in_space(game.attack.space), fort_strength)
        }
        if (loss_options.length > 0) {
            view.prompt = `Take losses (${game.attack.defender_losses_taken}/${game.attack.defender_losses})`
            loss_options.forEach((option) => {
                if (option === FORT_LOSS) {
                    gen_action_space(game.attack.space)
                } else {
                    gen_action_piece(option)
                }
            })
        } else {
            view.prompt = `Take losses (${game.attack.defender_losses_taken}/${game.attack.defender_losses}) — Done`
            gen_action_done()
        }
    },
    piece(p) {
        push_undo()
        game.attack.defender_losses_taken += get_piece_lf(p)
        game.attack.defender_loss_pieces.push(p)
        if (is_unit_reduced(p)) {
            game.attack.defender_replacements[p] = eliminate_piece(p)
        } else {
            reduce_piece(p)
        }
    },
    space(s) {
        push_undo()
        game.attack.defender_losses_taken += data.spaces[s].fort
        set_add(game.forts.destroyed, s)
        log(`Destroyed fort in ${space_name(s)}`)
    },
    done() {
        push_undo()
        update_siege(game.attack.space)

        const flank_attack_active = game.attack.is_flank || (game.attack.combat_cards.includes(VON_HUTIER) && events.von_hutier.can_play())
        if (!flank_attack_active && is_withdrawal_active() && game.attack.defender_loss_pieces.length > 0) {
            // If this is not a flank attack and the defender played Withdrawal, they choose a step loss to negate
            // If this was a flank attack, then the defender will not negate the step loss until the attacker has taken
            // their losses
            game.state = 'withdrawal_negate_step_loss'
        } else if (game.attack.failed_flank) {
            determine_combat_winner()
        } else if (game.attack.is_flank || (game.attack.combat_cards.includes(VON_HUTIER) && events.von_hutier.can_play())) {
            resolve_defenders_fire()
            clear_undo()
            game.active = game.attack.attacker
            game.state = 'apply_attacker_losses'
        } else {
            clear_undo()
            game.active = game.attack.attacker
            game.state = 'apply_attacker_losses'
        }
    }
}

states.withdrawal_negate_step_loss = {
    inactive: 'Defender Choosing Step Loss to Negate from Withdrawal',
    prompt() {
        view.prompt = 'Choose a step loss to negate from withdrawal'

        const has_corps_option = game.attack.defender_loss_pieces.find((p) => data.pieces[p].type === CORPS) !== undefined
        game.attack.defender_loss_pieces.forEach((p) => {
            if (data.pieces[p].type === CORPS || !has_corps_option)
                gen_action_piece(p)
        })

        gen_action_done()
    },
    piece(p) {
        push_undo()
        // Restore the step that was previously lost, restoring the piece to the attack location on the map and
        //  removing it from the eliminated pieces area if necessary
        log(`${card_name(game.attack.attacker === CP ? WITHDRAWAL_AP : WITHDRAWAL_CP)} negates step loss for ${piece_name(p)}`)
        if (game.removed.includes(p) || game.location[p] === AP_ELIMINATED_BOX || game.location[p] === CP_ELIMINATED_BOX) {
            array_remove_item(game.removed, p)
            if (!game.reduced.includes(p)) {
                game.reduced.push(p)
            }

            // If the piece was replaced, move the replacement back to the reserve box
            if (game.attack.defender_replacements[p]) {
                let replacement = game.attack.defender_replacements[p]
                game.location[replacement] = game.active === CP ? CP_RESERVE_BOX : AP_RESERVE_BOX
            }

            game.location[p] = game.attack.space
        } else if (game.reduced.includes(p)) {
            array_remove_item(game.reduced, p)
        }
        this.done()
    },
    done() {
        if (game.attack.failed_flank || game.attack.is_flank || (game.attack.combat_cards.includes(VON_HUTIER) && events.von_hutier.can_play())) {
            // This was a flank attack, so the attacker already took losses (before or after the defender, depending on
            // whether the flank failed)
            determine_combat_winner()
        } else {
            // Not a flank attack, so we now proceed to the attacker's losses
            clear_undo()
            game.active = game.attack.attacker
            game.state = 'apply_attacker_losses'
        }
    }
}

function eliminate_piece(p, force_permanent_elimination) {
    force_permanent_elimination = force_permanent_elimination || false
    let replacement = find_replacement(p, get_units_in_reserve())
    if (force_permanent_elimination || replacement === 0 || data.pieces[p].notreplaceable || !is_unit_supplied(p)) {
        // Permanently eliminate piece
        log(`Permanently eliminated ${piece_name(p)} in ${space_name(game.location[p])}`)
        game.removed.push(p)
        game.location[p] = 0
    } else {
        game.location[replacement] = game.location[p]
        log(`Replaced ${piece_name(p)} in ${space_name(game.location[p])} with ${piece_name(replacement)}`)
        game.location[p] = game.active === AP ? AP_ELIMINATED_BOX : CP_ELIMINATED_BOX
    }
    return replacement
}

function reduce_piece(p) {
    log(`Reduced ${piece_name(p)} in ${space_name(game.location[p])}`)
    game.reduced.push(p)
}

states.apply_attacker_losses = {
    inactive: 'Attacker Applying Losses',
    prompt() {

        let loss_options = []
        if (game.attack.attacker_losses - game.attack.attacker_losses_taken > 0)
            loss_options = get_loss_options(false,game.attack.attacker_losses - game.attack.attacker_losses_taken, game.attack.pieces, 0)
        if (loss_options.length > 0) {
            view.prompt = `Take losses (${game.attack.attacker_losses_taken}/${game.attack.attacker_losses})`
            loss_options.forEach((p) => {
                gen_action_piece(p)
            })
        } else {
            view.prompt = `Take losses (${game.attack.attacker_losses_taken}/${game.attack.attacker_losses}) — Done`
            gen_action_done()
        }
    },
    piece(p) {
        push_undo()
        game.attack.attacker_losses_taken += get_piece_lf(p)
        if (is_unit_reduced(p)) {
            let replacement = eliminate_piece(p)
            if (replacement !== 0) {
                game.attack.pieces.push(replacement)
            }
            array_remove_item(game.attack.pieces, p)
        } else {
            reduce_piece(p)
        }
    },
    done() {
        if (game.attack.failed_flank) {
            resolve_attackers_fire()
            goto_defender_losses()
        } else if (is_withdrawal_active() && game.attack.defender_loss_pieces.length > 0 && (game.attack.is_flank || (game.attack.combat_cards.includes(VON_HUTIER) && events.von_hutier.can_play()))) {
            // If this was a flank attack and the defender played Withdrawal, they now choose their step loss to negate
            clear_undo()
            game.active = other_faction(game.active)
            game.state = 'withdrawal_negate_step_loss'
        } else {
            determine_combat_winner()
        }
    }
}

function goto_defender_losses() {
    game.active = other_faction(game.attack.attacker)
    if (game.attack.defender_losses > 0 && get_pieces_in_space(game.attack.space).find((p) => set_has(game.retreated, p)) !== undefined)
        game.state = 'eliminate_retreated_units'
    else
        game.state = 'apply_defender_losses'
}

const FORT_LOSS = -1

function get_loss_options(is_defender, to_satisfy, units, fort_strength) {
    const is_first_pick = (is_defender && game.attack.defender_losses_taken === 0) || (!is_defender && game.attack.attacker_losses_taken === 0)

    // If this is the attacker's first loss, check for priority units first
    if (!is_defender && is_first_pick) {
        if (units.includes(BEF_ARMY) && to_satisfy >= get_piece_lf(BEF_ARMY)) return [BEF_ARMY]
        if (units.includes(BEF_CORPS) && to_satisfy >= get_piece_lf(BEF_CORPS)) return [BEF_CORPS]
        let priority_units = []
        if (units.includes(MEF_ARMY) && to_satisfy >= get_piece_lf(MEF_ARMY)) priority_units.push(MEF_ARMY)
        if (units.includes(CAU_ARMY) && to_satisfy >= get_piece_lf(CAU_ARMY)) priority_units.push(CAU_ARMY)
        if (priority_units.length > 0) return priority_units
        if (units.includes(AUS_CORPS) && to_satisfy >= get_piece_lf(AUS_CORPS)) return [AUS_CORPS]
        if (units.includes(CND_CORPS) && to_satisfy >= get_piece_lf(CND_CORPS)) return [CND_CORPS]
        if (priority_units.length > 0) return priority_units
    }

    let reserve_units = get_units_in_reserve()
    let loss_tree = {
        picked: [],
        to_satisfy: to_satisfy,
        full_strength: units.filter((u) => !is_unit_reduced(u)),
        reduced: units.filter((u) => is_unit_reduced(u)),
        full_replacements: reserve_units.filter((u) => !is_unit_reduced(u)),
        reduced_replacements: reserve_units.filter((u) => is_unit_reduced(u)),
        fort_strength: fort_strength || 0,
        options: []
    }

    let valid_paths = []
    build_loss_tree(loss_tree, valid_paths)

    if (is_defender && is_first_pick && is_withdrawal_active()) {
        // If the defender is choosing losses and has played withdrawal, they must choose a path that includes a corps
        // step loss, if possible
        let valid_paths_with_corps = valid_paths.filter((path) => {
            return path.picked.find((p) => data.pieces[p].type === CORPS) !== undefined
        })
        if (valid_paths_with_corps.length > 0) {
            valid_paths = valid_paths_with_corps
        }
    }

    let valid_units = []
    valid_paths.forEach((path) => {
        valid_units.push(path.picked[0])
    })

    return valid_units
}

function get_units_in_reserve() {
    let reserve = []
    for_each_piece_in_space(AP_RESERVE_BOX, (p) => {
        reserve.push(p)
    })
    for_each_piece_in_space(CP_RESERVE_BOX, (p) => {
        reserve.push(p)
    })
    return reserve
}

// Recursively build a tree of possible options for choosing losses
function build_loss_tree(parent, valid_paths) {
    // For all full strength units, build out the option tree if they are reduced
    for (let i = 0; i < parent.full_strength.length; i++) {
        let unit = parent.full_strength[i]
        let unit_lf = data.pieces[unit].lf
        if (unit_lf <= parent.to_satisfy) {
            let node = {
                picked: [...parent.picked, unit],
                to_satisfy: parent.to_satisfy - unit_lf,
                full_strength: parent.full_strength.filter((u) => u !== unit),
                reduced: [...parent.reduced, unit],
                full_replacements: [...parent.full_replacements],
                reduced_replacements: [...parent.reduced_replacements],
                fort_strength: parent.fort_strength,
                options: []
            }
            parent.options.push(node)
        }
    }

    // For all reduced units, build out the tree if they are eliminated and possibly replaced
    for (let i = 0; i < parent.reduced.length; i++) {
        let unit = parent.reduced[i]
        let unit_lf = data.pieces[unit].rlf

        if (unit_lf <= parent.to_satisfy) {
            let node = {
                picked: [...parent.picked, unit],
                to_satisfy: parent.to_satisfy - unit_lf,
                full_strength: [...parent.full_strength],
                reduced: parent.reduced.filter((u) => u !== unit),
                full_replacements: [...parent.full_replacements],
                reduced_replacements: [...parent.reduced_replacements],
                fort_strength: parent.fort_strength,
                options: []
            }

            let selected_replacement = find_replacement(unit, node.full_replacements)
            if (selected_replacement !== 0) {
                array_remove_item(node.full_replacements, selected_replacement)
                node.full_strength.push(selected_replacement)
            } else {
                selected_replacement = find_replacement(unit, node.reduced_replacements)
                if (selected_replacement !== 0) {
                    array_remove_item(node.reduced_replacements, selected_replacement)
                    node.reduced.push(selected_replacement)
                }
            }
            parent.options.push(node)
        }
    }

    // If there are no units left in the space and the remaining losses to satisfy are greater than the value of the fort, add a fort loss option
    if (parent.full_strength.length === 0 &&
        parent.reduced.length === 0 &&
        parent.fort_strength > 0 &&
        parent.to_satisfy >= parent.fort_strength) {
        let node = {
            picked: [...parent.picked, FORT_LOSS],
            to_satisfy: parent.to_satisfy - parent.fort_strength,
            full_strength: [...parent.full_strength],
            reduced: [...parent.reduced],
            full_replacements: [...parent.full_replacements],
            reduced_replacements: [...parent.reduced_replacements],
            fort_strength: 0,
            options: []
        }
        parent.options.push(node)
    }

    // Recurse to continue building options, updating the best options as we go
    for (let i = 0; i < parent.options.length; i++) {
        let current_best = valid_paths.length === 0 ? parent.to_satisfy : valid_paths[0].to_satisfy
        let option = parent.options[i]
        if (option.to_satisfy < current_best) {
            valid_paths.length = 0
        }
        if (option.to_satisfy <= current_best) {
            valid_paths.push(option)
        }
        build_loss_tree(option, valid_paths)
    }
}

function find_replacement(unit, available_replacements) {
    let unit_data = data.pieces[unit]
    if (unit_data.type !== ARMY)
        return 0

    if (unit === BEF_ARMY) {
        if (available_replacements.includes(BEF_CORPS))
            return BEF_CORPS
        else
            return 0
    }

    // British armies cannot be replaced by CND, AUS, or PT corps, so selecting on the name instead of nation
    if (unit_data.nation === BRITAIN) {
        for (let i = 0; i < available_replacements.length; ++i) {
            let replacement_data = data.pieces[available_replacements[i]]
            if (replacement_data.name === 'BRc') {
                return available_replacements[i]
            }
        }
        return 0
    }

    for (let i = 0; i < available_replacements.length; ++i) {
        let replacement_data = data.pieces[available_replacements[i]]
        if (replacement_data.type === CORPS && replacement_data.nation === unit_data.nation) {
            return available_replacements[i]
        }
    }
    return 0
}

function is_withdrawal_active() {
    if (!game.attack)
        return false

    if (game.attack.attacker === CP)
        return game.attack.combat_cards.includes(WITHDRAWAL_AP)
    else
        return game.attack.combat_cards.includes(WITHDRAWAL_CP)
}

function determine_combat_winner() {
    const was_withdrawal_active = is_withdrawal_active()

    // Discard the loser's combat cards, or both player's cards if it's a tie
    let to_discard = []
    if (game.attack.defender_losses >= game.attack.attacker_losses) {
        const defender = other_faction(game.attack.attacker)
        to_discard.concat(game.attack.combat_cards.filter((c) => data.cards[c].faction === defender))
    }
    if (game.attack.attacker_losses >= game.attack.defender_losses)
        to_discard.concat(game.attack.combat_cards.filter((c) => data.cards[c].faction === game.attack.attacker))
    // Some combat cards are discarded or removed, even when the card's owner wins the combat
    game.attack.combat_cards.forEach((c) => {
        // Any * cards that are removed after use
        if (data.cards[c].remove && !to_discard.includes(c))
            to_discard.push(c)
        // MINE_ATTACK, KEMAL, and ROYAL_TANK_CORPS are discarded after use
        if ((c === MINE_ATTACK || c === KEMAL || c === ROYAL_TANK_CORPS) && !to_discard.includes(c))
            to_discard.push(c)
    })
    // "They shall not pass" is not discarded when the result is a tie (12.2.11)
    if (game.attack.attacker_losses === game.attack.defender_losses && to_discard.includes(THEY_SHALL_NOT_PASS))
        array_remove_item(to_discard, THEY_SHALL_NOT_PASS)
    // Yanks and Tanks is not really a combat card, but it behaves like one for the duration of the action round it is
    // played. However, it should not be discarded after the combat.
    if (to_discard.includes(YANKS_AND_TANKS))
        array_remove_item(to_discard, YANKS_AND_TANKS)

    // Now do the actual discard
    to_discard.forEach((c) => {
        array_remove_item(game.combat_cards, c)
        array_remove_item(game.attack.combat_cards, c)
        if (data.cards[c].remove)
            game[data.cards[c].faction].removed.push(c)
        else
            game[data.cards[c].faction].discard.push(c)
    })

    // Check for a full strength attacker
    let attacker_has_full_strength_unit = game.attack.pieces.find((p) => !is_unit_reduced(p)) !== undefined

    // Decide if the defender should retreat, attacker should advance, or if the combat is over
    let defender_pieces = get_pieces_in_space(game.attack.space)

    // Not sure if the non-German pieces should still retreat if Haig cancels the German retreat
    if (game.attack.haig_cancels_ge_retreat &&
        get_trench_level_for_attack(game.attack.space, CP) > 0 &&
        defender_pieces.find((p) => data.pieces[p].nation === GERMANY) !== undefined) {
        log(`${card_name(HAIG)} cancels the retreat`)
        end_attack_activation()
        goto_next_activation()
        return
    }

    if (game.attack.retreat_canceled && defender_pieces.length > 0) {
        end_attack_activation()
        goto_next_activation()
        return
    }

    if ((game.attack.defender_losses > game.attack.attacker_losses && attacker_has_full_strength_unit && defender_pieces.length > 0) || was_withdrawal_active) {
        game.active = other_faction(game.attack.attacker)
        game.attack.to_retreat = defender_pieces
        game.attack.retreating_pieces = []
        if (was_withdrawal_active)
            game.attack.retreat_length = 1
        else
            game.attack.retreat_length = (game.attack.defender_losses - game.attack.attacker_losses === 1) ? 1 : 2
        game.attack.retreat_paths = []
        game.attack.to_advance = game.attack.pieces.filter((p) => !is_unit_reduced(p))
        game.attack.advancing_pieces = []
        if (defender_can_cancel_retreat()) {
            game.state = 'cancel_retreat'
        } else {
            game.state = 'defender_retreat'
        }
        push_undo()
    } else if (attacker_has_full_strength_unit && defender_pieces.length === 0) {
        game.active = game.attack.attacker
        game.attack.to_retreat = []
        game.attack.retreating_pieces = []
        game.attack.retreat_length = 1
        game.attack.retreat_paths = []
        game.attack.to_advance = game.attack.pieces.filter((p) => !is_unit_reduced(p))
        game.attack.advancing_pieces = []
        game.state = 'attacker_advance'
    } else {
        end_attack_activation()
        goto_next_activation()
    }
}

function defender_can_cancel_retreat() {
    const terrain = data.spaces[game.attack.space].terrain
    if (terrain === MOUNTAIN || terrain === SWAMP || terrain === DESERT || terrain === FOREST || get_trench_level_for_attack(game.attack.space, other_faction(game.attacker)) > 0) {
        let step_count = 0
        for_each_piece_in_space(game.attack.space, (p) => {
            if (is_unit_reduced(p)) {
                step_count++
            } else {
                step_count += 2
            }
        })
        return step_count > 1
    }
    return false
}

states.cancel_retreat = {
    inactive: 'Defender Retreating',
    prompt() {
        view.prompt = `Cancel retreat by taking an extra step loss or pass to begin retreat`
        for_each_piece_in_space(game.attack.space, (p) => {
            gen_action_piece(p)
        })
        gen_action_pass()
    },
    piece(p) {
        push_undo()
        if (is_unit_reduced(p)) {
            eliminate_piece(p)
        } else {
            reduce_piece(p)
        }
        log(`Retreat canceled by taking an extra step loss to ${piece_name(p)}`)
        end_attack_activation()
        goto_next_activation()
    },
    pass() {
        push_undo()
        game.state = 'defender_retreat'
    }
}

states.defender_retreat = {
    inactive: 'Defender Retreating',
    prompt() {
        view.prompt = `Select units to retreat`
        game.attack.to_retreat.forEach((p) => {
            gen_action_piece(p)
        })
        game.attack.retreating_pieces.forEach((p) => {
            gen_action_piece(p)
        })
        if (game.attack.retreating_pieces.length > 0) {
            gen_action_next()
        } else {
            gen_action_done()
        }
    },
    piece(p) {
        if (set_has(game.attack.retreating_pieces, p)) {
            set_delete(game.attack.retreating_pieces, p)
            set_add(game.attack.to_retreat, p)
        } else {
            set_delete(game.attack.to_retreat, p)
            set_add(game.attack.retreating_pieces, p)
        }
    },
    next() {
        push_undo()
        game.attack.retreat_path = []
        game.state = 'choose_retreat_path'
    },
    done() {
        game.active = other_faction(game.active)
        game.state = 'attacker_advance'
    }
}

states.choose_retreat_path = {
    inactive: 'Defender Retreating',
    prompt() {

        if (game.attack.retreat_path.length === game.attack.retreat_length || game.attack.retreating_pieces.length === 0) {
            view.prompt = `End retreat?`
            gen_action_done()
        } else {
            if (game.attack.retreat_path.length === 0 && game.attack.retreat_length > 1) {
                view.prompt = `Choose space to retreat through`
            } else {
                view.prompt = `Choose space to retreat to`
            }

            let options = get_retreat_options()
            options.forEach((s) => {
                gen_action_space(s)
            })

            if (options.length === 0) {
                view.prompt = `No valid retreat options — eliminate retreating units`
                game.attack.retreating_pieces.forEach((p) => {
                    gen_action_piece(p)
                })
            }
        }
    },
    space(s) {
        push_undo()

        update_russian_ne_restriction_flag(game.attack.retreating_pieces, game.location[game.attack.retreating_pieces[0]], s)

        game.attack.retreat_path.push(s)
        game.attack.retreating_pieces.forEach((p) => {
            game.location[p] = s
        })
    },
    piece(p) {
        array_remove_item(game.attack.retreating_pieces, p)
        eliminate_piece(p, true)
    },
    done() {
        game.attack.retreating_pieces.forEach((p) => { set_add(game.retreated, p) })
        game.attack.retreat_paths.push(game.attack.retreat_path)
        game.attack.retreat_path = []
        game.attack.retreating_pieces.length = 0
        if (game.attack.to_retreat.length > 0) {
            game.state = 'defender_retreat'
        } else {
            game.active = other_faction(game.active)
            game.state = 'attacker_advance'
        }
    }
}

function get_retreat_options(pieces, from, length_retreated) {
    let retreating_pieces = pieces || game.attack.retreating_pieces
    let origin = from || game.attack.space
    let p = retreating_pieces[0]
    let options = []
    let s = game.location[p]
    length_retreated = length_retreated || 0
    let has_friendly_option = false
    let has_in_supply_option = false

    get_connected_spaces_for_pieces(s, retreating_pieces).forEach((conn) => {
        if (conn === origin)
            return

        if (length_retreated === 1 && would_overstack(conn, retreating_pieces, game.active))
            return

        if (length_retreated === 1 && !is_controlled_by(conn, game.active))
            return

        if (is_controlled_by(conn, game.active))
            has_friendly_option = true

        if (is_space_supplied(game.active, conn))
            has_in_supply_option = true

        set_add(options, conn)
    })

    // if any options are friendly controlled, remove all enemy-controlled options
    if (has_friendly_option) {
        const all_options = [...options]
        all_options.forEach((s) => {
            if (!is_controlled_by(s, game.active))
                set_delete(options, s)
        })
    }

    // if any spaces are in supply, remove all oos spaces
    if (has_in_supply_option) {
        const all_options = [...options]
        all_options.forEach((s) => {
            if (!is_space_supplied(game.active, s))
                set_delete(options, s)
        })
    }

    // TODO: if any enemy spaces would result in the retreating unit being in supply, remove enemy spaces that would
    //  leave the retreating unit oos

    // Remove any spaces that would violate the Russian NE (non-SR) restriction or stacking limits
    const all_options = [...options]
    all_options.forEach((s) => {
        if (!check_russian_ne_restriction(retreating_pieces, s))
            set_delete(options, s)

        if (would_overstack(s, retreating_pieces, game.active))
            set_delete(options, s)
    })

    return options
}

states.attacker_advance = {
    inactive: 'Attacker Advancing',
    prompt() {
        view.prompt = `Choose which units to advance`
        game.attack.to_advance.forEach((p) => {
            gen_action_piece(p)
        })
        game.attack.advancing_pieces.forEach((p) => {
            gen_action_piece(p)
        })
        gen_action_next()
    },
    piece(p) {
        if (game.attack.advancing_pieces.includes(p)) {
            array_remove_item(game.attack.advancing_pieces, p)
            game.attack.to_advance.push(p)
        } else {
            game.attack.advancing_pieces.push(p)
            array_remove_item(game.attack.to_advance, p)
        }
    },
    next() {
        if (game.attack.advancing_pieces.length > 0) {
            game.attack.advance_length = 0
            game.state = 'perform_advance'
        } else {
            end_attack_activation()
            goto_next_activation()
        }
    }
}

states.perform_advance = {
    inactive: 'Attacker Advancing',
    prompt() {
        view.prompt = `Choose next space to advance`
        get_possible_advance_spaces().forEach(gen_action_space)
        gen_action_done()
    },
    space(s) {
        push_undo()
        game.attack.did_advance = true
        game.attack.advancing_pieces.forEach((p) => {
            game.location[p] = s
        })
        game.attack.advance_length++
        if (!has_undestroyed_fort(s, other_faction(game.active))) {
            set_control(s, game.attack.attacker)
        }
        capture_trench(s, game.attack.attacker)
    },
    done() {
        if (game.attack.advancing_pieces.length > 0) {
            const end_space = game.location[game.attack.advancing_pieces[0]]
            if (has_undestroyed_fort(end_space, other_faction(game.attack.attacker))) {
                set_add(game.forts.besieged, end_space)
                game.supply_cache = null
            }
        }
        game.attack.advancing_pieces.length = 0
        game.attack.advance_length = 0
        if (game.attack.to_advance.length > 0)
            game.state = 'attacker_advance'
        else {
            end_attack_activation()
            goto_next_activation()
        }
    }
}

function get_possible_advance_spaces() {
    if (game.attack.advance_length >= game.attack.retreat_length)
        return []

    if (game.attack.advancing_pieces.length === 0)
        return []

    let location_of_advancing_units = game.location[game.attack.advancing_pieces[0]]
    // If the attacking pieces haven't entered the attack space (always true if this is a 1-space advance), that is the only choice
    if (game.attack.space !== location_of_advancing_units) {
        if (can_advance_into(game.attack.space, game.attack.advancing_pieces))
            return [game.attack.space]
        else
            return []
    }

    let terrain= data.spaces[game.attack.space]
    let terrain_allows_advance = terrain !== MOUNTAIN && terrain !== SWAMP && terrain !== FOREST && terrain !== DESERT

    // If the terrain prevents a second advance
    if (!terrain_allows_advance)
        return []


    let spaces = []
    for (let path of game.attack.retreat_paths) {
        if (can_advance_into(path[0], game.attack.advancing_pieces))
            set_add(spaces, path[0]) // Add the first retreat space from each retreated path
    }

    // 12.7.7 Central Powers units may advance into Amiens, Calais, or Ostend only if one of the following applies:
    // • if it was the defending space in the Combat.
    // • if the Race to the Sea Event has been played.
    // • if the Central Powers War Status is 4 or higher.
    if (game.attack.attacker === CP && !game.events.race_to_the_sea && game.cp.ws < 4) {
        set_delete(spaces, AMIENS)
        set_delete(spaces, CALAIS)
        set_delete(spaces, OSTEND)
    }

    return spaces
}

function can_advance_into(space, units) {
    // Advance into a fort is only allowed if you have sufficient advancing units to besiege the fort (12.7.6)
    if (has_undestroyed_fort(space, other_faction(game.attack.attacker)) && !can_besiege(space, units))
        return false

    if (contains_piece_of_faction(space, other_faction(game.attack.attacker)))
        return false

    return true
}

function has_undestroyed_fort(space, faction) {
    let space_data = data.spaces[space]
    return space_data.fort !== undefined && space_data.fort > 0 && space_data.faction === faction && !set_has(game.forts.destroyed, space)
}

function is_besieged(space) {
    return set_has(game.forts.besieged, space)
}

function can_besiege(space, units) {
    let count_corps = 0
    for (let p of units) {
        if (data.pieces[p].type === ARMY) {
            return true
        } else {
            count_corps++
        }
    }
    return count_corps >= data.spaces[space].fort
}

function update_siege(space) {
    if (!is_besieged(space))
        return
    let pieces_in_space = get_pieces_in_space(space)
    if (!can_besiege(space, pieces_in_space)) {
        set_delete(game.forts.besieged, space)
        game.supply_cache = null
    }
}

function is_possible_sud_army_stack(pieces) {
    let ge_corps = 0
    let ah_pieces = 0
    pieces.forEach((p) => {
        if (data.pieces[p].nation === GERMANY && data.pieces[p].type === CORPS)
            ge_corps++
        if (data.pieces[p].nation === AUSTRIA_HUNGARY)
            ah_pieces++
    })
    return ah_pieces === 1 && ge_corps >= 1 && ah_pieces + ge_corps === pieces.length
}

function cost_to_activate(space, type) {
    let nations = []
    let pieces = []
    let has_russians = false
    let num_pieces = 0
    let faction = AP
    for_each_piece_in_space(space, (piece) => {
        num_pieces++
        let n = data.pieces[piece].nation
        if (n === "sn") n = TURKEY
        if (n === MONTENEGRO) n = SERBIA
        if (n === RUSSIA) has_russians = true
        set_add(nations, n)
        pieces.push(piece)
        if (data.pieces[piece].faction === CP) faction = CP
    })
    let cost = nations.length

    if (faction === AP &&
        game.turn === game.events.everyone_into_battle &&
        [ITALY, FRANCE, BELGIUM].includes(data.spaces[space].nation)) {
        cost = 1
    }

    const spaces_where_belgian_units_treated_as_british = [
        AMIENS,
        CALAIS,
        OSTEND,
        ANTWERP
    ]
    if (spaces_where_belgian_units_treated_as_british.includes(space) &&
        nations.includes(BRITAIN) &&
        nations.includes(BELGIUM)) {
        cost--
    }

    const nation = data.spaces[space].nation
    if ((nation === GERMANY || nation === FRANCE) &&
        nations.includes(FRANCE) &&
        nations.includes(US)) {
        cost--
    }

    // Sud Army modifies the activation cost for one stack per action round
    if (game.active === CP && game.events.sud_army > 0 && is_possible_sud_army_stack(pieces)) {
        if (!game.sud_army_space || game.sud_army_space === space) {
            cost = 1
        }
    }

    if (game.active === CP && game.events.moltke > 0 && !game.events.falkenhayn) {
        // Moltke modifies the activation cost, unless Falkenhayn also played
        if (nation === BELGIUM || nation === FRANCE) {
            cost = num_pieces
        }
    }

    if (game.events.eleventh_army > 0 && pieces.includes(GE_11_ARMY)) {
        // Recalculate cost
        let nations_with_armies = []
        pieces.forEach((p) => {
            if (data.pieces[p].type === ARMY)
                set_add(nations_with_armies, data.pieces[p].nation)
        })
        cost = nations_with_armies.length
    }

    // After Fall of the Tsar, spaces with Russian units cost 1 per unit for combat only
    if (game.events.fall_of_the_tsar > 0 && has_russians && type === ATTACK) {
        cost = num_pieces
    }

    //  9.2.7.1 It costs 3 OPS to activate the MEF Army for movement or combat when tracing supply through the MEF Beachhead
    //  marker. It costs 1 OPS per corps to activate other Allied units tracing supply (at the moment of activation)
    //  through the MEF Beachhead marker. (For example, a stack that included the MEF and two corps would cost 5 OPS
    //  to activate.) A player may not pay to partially activate a stack under this rule; the entire OPS cost per
    //  activated space must be paid. This rule does not apply if the MEF is brought in as a normal reinforcement
    //  under 9.5.3.4. No Allied Army except the MEF may use the MEF Beachhead for supply. Only BR and AUS Corps
    //  may use the MEF Beachhead for supply.
    if (faction === AP && set_has(nations, BRITAIN) && is_space_supplied_through_mef(space)) {
        cost = 0
        for_each_piece_in_space(space, (p) => {
            if (p === MEF_ARMY) {
                cost += 3
            } else {
                cost++ // This might be incorrect if the player has units in the space that are not _allowed_ to trace supply through the MEF Beachhead
            }
        })
    }

    return cost;
}

function goto_attrition_phase() {
    game.attrition = {
        ap: {
            spaces: [],
            pieces: []
        },
        cp: {
            spaces: [],
            pieces: []
        }
    }

    // TODO: Pieces in Albania can trace supply from Italy even when Italy is still neutral
    //  11.1.12 Albania: Units may always enter Albania. Albanian spaces are considered Allied Controlled at Start
    //  for SR purposes. Albanian spaces check Attrition supply by tracing normally to an Allied supply source or
    //  tracing to Taranto even while Italy is still Neutral.

    // Get all OOS pieces that should suffer attrition
    game.supply_cache = null
    get_oos_pieces().forEach((p) => {
        const faction = data.pieces[p].faction
        if (game.location[p] === MEDINA && data.pieces[p].nation === TURKEY) {
            // Turkish units in Medina do not suffer attrition, even though they may be OOS
        } else {
            game.attrition[faction].pieces.push(p)
        }
    })

    // Get all OOS spaces that should flip control
    for (let s = 1; s < data.spaces.length; ++s) {
        const controlling_faction = is_controlled_by(s, AP) ? AP : CP
        if (controlling_faction === AP && data.spaces[s].nation === SERBIA) {
            continue // Under rule 14.1.5, Serbian spaces only convert when CP units enter the spaces.
        }
        if (!nation_at_war(data.spaces[s].nation)) {
            continue
        }
        if (s >= AP_RESERVE_BOX)
            continue
        if (is_mef_space(s)) {
            continue // MEF spaces do not flip control
        }
        if (s === ARABIA_SPACE)
            continue
        if (has_undestroyed_fort(s, controlling_faction)) {
            continue // Under rule 14.3.6, spaces with undestroyed forts do not flip control
        }
        if (!is_space_supplied(controlling_faction, s)) {
            game.attrition[controlling_faction].spaces.push(s)
        }
    }

    if (game.attrition.ap.spaces.length > 0 || game.attrition.ap.pieces.length > 0) {
        game.state = 'attrition_phase'
        game.active = AP
    } else if (game.attrition.cp.spaces.length > 0 || game.attrition.cp.pieces.length > 0) {
        game.state = 'attrition_phase'
        game.active = CP
    } else {
        goto_siege_phase()
    }
}

states.attrition_phase = {
    inactive: 'Remove OOS pieces and flip OOS spaces',
    prompt() {
        view.prompt = 'Remove OOS pieces and flip OOS spaces'
        game.attrition[game.active].pieces.forEach((p) => { gen_action_piece(p) })
        game.attrition[game.active].spaces.forEach((s) => { gen_action_space(s) })
    },
    piece(p) {
        array_remove_item(game.attrition[game.active].pieces, p)
        log(`Removed ${piece_name(p)} from ${space_name(game.location[p])} due to attrition`)
        if (data.pieces[p].type === ARMY) {
            game.location[p] = 0
            game.removed.push(p)
        } else {
            game.location[p] = game.active === AP ? AP_ELIMINATED_BOX : CP_ELIMINATED_BOX
        }
        if (game.attrition[game.active].spaces.length === 0 && game.attrition[game.active].pieces.length === 0) {
            if (game.attrition[other_faction(game.active)].spaces.length > 0 || game.attrition[other_faction(game.active)].pieces.length > 0) {
                game.active = other_faction(game.active)
            } else {
                goto_siege_phase()
            }
        }
    },
    space(s) {
        array_remove_item(game.attrition[game.active].spaces, s)
        log(`Flipped control of ${space_name(s)} due to attrition`)
        set_control(s, other_faction(game.active))
        if (game.attrition[game.active].spaces.length === 0 && game.attrition[game.active].pieces.length === 0) {
            if (game.attrition[other_faction(game.active)].spaces.length > 0 || game.attrition[other_faction(game.active)].pieces.length > 0) {
                game.active = other_faction(game.active)
            } else {
                goto_siege_phase()
            }
        }
    }
}

function goto_siege_phase() {
    if (game.forts.besieged.length > 0) {
        log_h1("Siege Phase")
        game.state = 'siege_phase'
        const ap_has_sieges = game.forts.besieged.find((s) => data.spaces[s].faction === CP) !== undefined
        game.active = ap_has_sieges ? AP : CP
        game.sieges_to_roll = [...game.forts.besieged]
    } else {
        goto_war_status_phase()
    }
}

states.siege_phase = {
    inactive: 'Roll sieges',
    prompt() {
        view.prompt = 'Roll sieges'
        const other  = other_faction(game.active)
        game.sieges_to_roll.filter((s) => data.spaces[s].faction === other).forEach((s) => { gen_action_space(s) })
    },
    space(s) {
        array_remove_item(game.sieges_to_roll, s)
        log(`Siege of ${space_name(s)}`)
        logi(`Fort strength: ${data.spaces[s].fort}`)
        let roll = roll_die(6)
        const drm = game.turn <= 2 ? -2 : 0
        const fort_str = data.spaces[s].fort
        logi(`Roll: ${fmt_roll(roll, drm)}`)
        if (roll + drm > fort_str) {
            logi(`Success`)
            array_remove_item(game.forts.besieged, s)
            set_add(game.forts.destroyed, s)
            set_control(s, game.active)
            capture_trench(s, game.active)
        } else {
            logi(`Failure`)
        }

        if (game.sieges_to_roll.length === 0) {
            goto_war_status_phase()
        } else if (game.sieges_to_roll.find((s) => data.spaces[s].faction === game.active) !== undefined) {
            game.active = other_faction(game.active)
        }
    }
}

function goto_war_status_phase() {
    // E. War Status Phase
    log_h1("War Status Phase")

    // E.1. Check the Victory Point table and make any changes called for under the “During the War Status Phase”
    // section of the table.
    // If blockade event active and it's a winter turn, -1 VP
    if (game.events.blockade >= 1 && game.turn % 4 === 0) {
        game.vp -= 1
        log_h2("Blockade event in effect during winter turn, -1 VP")
    }
    // If CP failed to conduct their mandated offensive, -1 VP
    if (game.cp.mo !== NONE) {
        game.vp -= 1
        game.cp.missed_mo.push(game.turn)
        log_h2(`${faction_name(CP)} failed to conduct their mandated offensive, -1 VP`)
    }
    // If Italy is still neutral but AP at Total War, +1 VP
    if (!nation_at_war(ITALY) && game.ap.commitment === COMMITMENT_TOTAL) {
        game.vp += 1
        log_h2(`${nation_name(ITALY)} is still neutral but ${faction_name(AP)} at Total War, +1 VP`)
    }

    const french_mutiny_active = game.events.french_mutiny > 0 && game.ap.mo === FRANCE
    // If AP failed to conduct their mandated offensive, +1 VP (except FR after French Mutiny event)
    if (game.ap.mo !== NONE && !french_mutiny_active) {
        game.vp += 1
        game.ap.missed_mo.push(game.turn)
        log_h2(`${faction_name(AP)} failed to conduct their mandated offensive, +1 VP`)
    }

    // If French unit attacked without US support after French Mutiny, when FR MO, +1 VP
    if (french_mutiny_active && game.french_attacked_without_us_support) {
        game.vp += 1
        log_h2(`French unit attacked without US support after French Mutiny, +1 VP`)
    }
    delete game.french_attacked_without_us_support

    // E.2. Determine if either player has won an Automatic Victory.
    if (game.vp <= 0) {
        goto_game_over(AP, get_result_message("Automatic Victory: ", AP))
        return
    }
    if (game.vp >= 20) {
        goto_game_over(CP, get_result_message("Automatic Victory: ", CP))
        return
    }

    // E.3. Determine winner if an Armistice has been declared.
    if (game.ap.ws + game.cp.ws >= 40) {
        let result = get_game_result_by_vp()
        goto_game_over(result, get_result_message("Armistice Declared: ", result))
    }

    // E.4. Each player determines if his War Commitment Level has increased. This is not checked on the August 1914
    // turn (turn 1). If the appropriate War Status conditions are met, Limited War or Total War cards may be added
    // to the Draw Pile at this time.
    if (game.turn !== 1) {
        if (game.ap.ws >= 4 && game.ap.commitment === COMMITMENT_MOBILIZATION) {
            game.ap.commitment = COMMITMENT_LIMITED
            log_h3("Allied Powers' War Commitment Level rises to Limited War", AP)
            add_cards_to_deck(AP, COMMITMENT_LIMITED, game.ap.deck)
            game.ap.shuffle = true
        }
        if (game.cp.ws >= 4 && game.cp.commitment === COMMITMENT_MOBILIZATION) {
            game.cp.commitment = COMMITMENT_LIMITED
            log_h3("Central Powers' War Commitment Level rises to Limited War", CP)
            add_cards_to_deck(CP, COMMITMENT_LIMITED, game.cp.deck)
            game.cp.shuffle = true
            set_nation_at_war(TURKEY)
        }
        if (game.ap.ws >= 11 && game.ap.commitment === COMMITMENT_LIMITED) {
            game.ap.commitment = COMMITMENT_TOTAL
            log_h3("Allied Powers' War Commitment Level rises to Total War", AP)
            add_cards_to_deck(AP, COMMITMENT_TOTAL, game.ap.deck)
            game.ap.shuffle = true
        }
        if (game.cp.ws >= 11 && game.cp.commitment === COMMITMENT_LIMITED) {
            game.cp.commitment = COMMITMENT_TOTAL
            log_h3("Central Powers' War Commitment Level rises to Total War", CP)
            add_cards_to_deck(CP, COMMITMENT_TOTAL, game.cp.deck)
            game.cp.shuffle = true
        }
    }

    apply_replacement_phase_events()
    goto_replacement_phase()
}

function get_game_result_by_vp() {
    let cp_threshold = game.events.treaty_of_brest_litovsk > 0 ? 11 : 13
    let ap_threshold = 9
    if (game.vp >= cp_threshold) {
        return CP
    } else if (game.scenario === HISTORICAL || game.vp <= ap_threshold) {
        return AP
    } else {
        return DRAW // Historical scenario draws go to the Allies, so this is future-proofing for other scenarios
    }
}

function get_result_message(prefix, result) {
    if (result === AP)
        return `${prefix}Allied Powers win`
    if (result === CP)
        return `${prefix}Central Powers win`
    if (result === DRAW)
        return `${prefix}Game ends in a draw`
    return `${prefix}Game result unknown`
}

function add_cards_to_deck(faction, commitment, deck) {
    for (let i = 1; i < data.cards.length; i++) {
        if (data.cards[i].commitment === commitment && data.cards[i].faction === faction) {
            deck.push(i)
        }
    }
}

function goto_game_over(result, victory) {
    log_br()
    log(victory)
    game.state = 'game_over'
    game.active = 'None'
    game.result = result
    game.victory = victory
}

states.game_over = {
    inactive() {
        view.prompt = game.victory
    },
    prompt() {
        view.prompt = game.victory
    }
}

function apply_replacement_phase_events() {
    if (game.turn === game.events.zeppelin_raids) {
        game.rp.br = Math.max(game.rp.br - 4, 0)
        log(`Zeppelin Raids event subtracts 4 British RP`)
    }

    // 5.7.3 The CP receives 1 German RP each turn during Total War (i.e., after it has drawn TW cards) if it controls
    // Sedan and two additional French or Belgian spaces during the RP interphase.
    if (game.cp.commitment === COMMITMENT_TOTAL && is_controlled_by(SEDAN, CP)) {
        let cp_controlled_french_and_belgian_spaces = 0
        for (let s = 1; s < data.spaces.length; ++s) {
            if (is_controlled_by(s, CP) && (data.spaces[s].nation === FRANCE || data.spaces[s].nation === BELGIUM)) {
                cp_controlled_french_and_belgian_spaces++
                if (cp_controlled_french_and_belgian_spaces >= 3) {
                    break
                }
            }
        }
        if (cp_controlled_french_and_belgian_spaces >= 3) {
            game.rp.ge++
            log(`${faction_name(CP)} gains 1 German RP for controlling Sedan and 2 other French/Belgian spaces`)
        }
    }

    if (game.events.walter_rathenau > 0 && !game.events.independent_air_force) {
        game.rp.ge++
        log("Walter Rathenau event adds 1 German RP")
    }

    if (game.rp.br >= 1 && game.events.uboats_unleashed > 0 && !game.events.convoy) {
        game.rp.br--
        log("U-Boats Unleashed event subtracts 1 British RP")
    }
}

function goto_replacement_phase() {
    if (has_rps(AP)) {
        log_h1(`${faction_name(AP)} Replacement Phase`)
        game.active = AP
        game.state = 'replacement_phase'
        if (game.rp.ru > 1 && game.events.bolshevik_revolution > 0) {
            game.rp.ru = 1
            log("Russian RP are set to 1 due to the Bolshevik Revolution")
        }
    } else if (has_rps(CP)) {
        log_h1(`${faction_name(CP)} Replacement Phase`)
        game.active = CP
        game.state = 'replacement_phase'
    } else {
        goto_draw_cards_phase()
    }
}

function has_rps(faction) {
    if (faction === AP) {
        if (game.rp.fr > 0) return true
        if (game.rp.br > 0) return true
        if (game.rp.ru > 0) return true
        if (game.rp.allied > 0) return true
        if (game.rp.it > 0) return true
    } else if (faction === CP) {
        if (game.rp.ge > 0) return true
        if (game.rp.ah > 0) return true
        if (game.rp.bu > 0) return true
        if (game.rp.tu > 0) return true
    }
    return false
}

function remove_rps(faction) {
    if (faction === AP) {
        game.rp.fr = 0
        game.rp.br = 0
        game.rp.ru = 0
        game.rp.allied = 0
        game.rp.it = 0
    } else if (faction === CP) {
        game.rp.ge = 0
        game.rp.ah = 0
        game.rp.bu = 0
        game.rp.tu = 0
    }
}

function get_rps_of_type(type) {
    if (type === undefined)
        return 0
    return game.rp[type]
}

function set_rps_of_type(type, value) {
    if (type === undefined)
        return
    game.rp[type] = value
}

states.replacement_phase = {
    inactive: 'Choose replacements',
    prompt() {
        if (has_rps(game.active)) {
            view.prompt = 'Choose a unit to receive replacements, or choose an eliminated unit to return to play'
        } else {
            view.prompt = 'Choose a unit to receive replacements, or choose an eliminated unit to return to play - Done'
        }

        let units = get_replaceable_units()
        units.forEach((p) => {
            gen_action_piece(p)
        })
        gen_action_done()
    },
    piece(p) {
        push_undo()
        const piece_data = data.pieces[p]
        game.who = p
        if (piece_data.type === ARMY) {
            if (game.location[p] === AP_ELIMINATED_BOX || game.location[p] === CP_ELIMINATED_BOX) {
                game.state = 'choose_replacement_army'
            } else {
                log(`Restored ${piece_name(p)} in ${space_name(game.location[p])} to full strength`)
                array_remove_item(game.reduced, p)
                spend_rps(get_rp_type(p), 1)
                game.who = 0
            }
        } else {
            game.state = 'choose_second_replacement_corps'
        }
    },
    done() {
        remove_rps(game.active)
        if (game.active === AP) {
            game.active = CP
        }
        goto_replacement_phase()
    }
}

function get_replaceable_units() {
    let units = []
    for (let i = 1; i < data.pieces.length; ++i) {
        const piece_data = data.pieces[i]
        if (piece_data.faction !== game.active)
            continue

        if (piece_data.notreplaceable)
            continue

        const rp_type = get_rp_type(i)
        if (get_rps_of_type(rp_type) === 0)
            continue

        if (game.location[i] === 0 || game.location === AP_RESERVE_BOX || game.location === CP_RESERVE_BOX)
            continue

        if (all_capitals_occupied(piece_data.nation))
            continue

        if (is_controlled_by(WARSAW, AP) && piece_data.name === 'PLc')
            continue

        if (game.location[i] === AP_ELIMINATED_BOX ||
            game.location[i] === CP_ELIMINATED_BOX ||
            (is_unit_reduced(i) && is_unit_supplied(i))) {
            units.push(i)
        }
    }

    return units
}

function get_rp_type(piece) {
    return data.pieces[piece].rptype
}

function spend_rps(type, amount) {
    if (type === undefined)
        return
    set_rps_of_type(type, get_rps_of_type(type) - amount)
}

states.choose_second_replacement_corps = {
    inactive: 'Choose second replacement corps',
    prompt() {
        view.prompt = 'Choose a second corps or send the selected corps to the reserve box'
        let units = get_replaceable_units()
        const elim_box = game.active === AP ? AP_ELIMINATED_BOX : CP_ELIMINATED_BOX
        const rp_type = get_rp_type(game.who)
        units.forEach((p) => {
            if (data.pieces[p].type === CORPS &&
                get_rp_type(p) === rp_type) {
                gen_action_piece(p)
            }
        })
        if (game.location[game.who] === elim_box) {
            if (game.who === BRITISH_ANA_CORPS)
                gen_action_space(ARABIA_SPACE)
            else
                gen_action_space(game.active === AP ? AP_RESERVE_BOX : CP_RESERVE_BOX)
        }

    },
    piece(p) {
        push_undo()
        // For each selected corps (game.who and p), if they were eliminated send them to the reserves and make sure
        // they are now reduced, if they were on the map, flip them to full strength
        let pieces = [game.who, p]
        pieces.forEach((corps) => {
            if (game.location[corps] === AP_ELIMINATED_BOX || game.location[corps] === CP_ELIMINATED_BOX) {
                if (!is_unit_reduced(corps))
                    game.reduced.push(corps)
                const space = corps === BRITISH_ANA_CORPS ? ARABIA_SPACE : game.active === AP ? AP_RESERVE_BOX : CP_RESERVE_BOX
                game.location[corps] = space
                log(`Returned ${piece_name(corps)} to ${space_name(space)} at reduced strength`)
            } else {
                array_remove_item(game.reduced, corps)
                log(`Restored ${piece_name(corps)} in ${space_name(game.location[corps])} to full strength`)
            }
        })
        spend_rps(get_rp_type(game.who), 1)
        game.who = 0
        game.state = 'replacement_phase'
    },
    space(s) {
        // Selected a space, so the single corps is flipped to full strength and sent there
        push_undo()
        if (is_unit_reduced(game.who))
            array_remove_item(game.reduced, game.who)
        game.location[game.who] = s
        spend_rps(get_rp_type(game.who), 1)
        log(`Returned ${piece_name(game.who)} to ${space_name(s)} at full strength`)
        game.who = 0
        game.state = 'replacement_phase'
    }
}

states.choose_replacement_army = {
    inactive: 'Choose replacement army',
    prompt() {
        view.prompt = 'Send to the map or select the unit again to toggle between full and reduced strength'
        const rp_type = get_rp_type(game.who)
        const full_replacement_allowed = get_rps_of_type(rp_type) >= 2
        if (is_unit_reduced(game.who) && full_replacement_allowed)
            gen_action_piece(game.who)
        get_army_replacement_spaces(game.who).forEach(gen_action_space)
    },
    piece(p) {
        if (is_unit_reduced(p)) {
            array_remove_item(game.reduced, p)
        } else {
            game.reduced.push(p)
            spend_rps(get_rp_type(p), 1)
        }
    },
    space(s) {
        push_undo()
        if (get_rps_of_type(get_rp_type(game.who)) < 2 && !is_unit_reduced(game.who))
            game.reduced.push(game.who)
        game.location[game.who] = s
        spend_rps(get_rp_type(game.who), is_unit_reduced(game.who) ? 1 : 2)
        log(`Returned ${piece_name(game.who)} to ${space_name(s)} at ${is_unit_reduced(game.who) ? 'reduced' : 'full'} strength`)
        game.who = 0
        game.state = 'replacement_phase'
    }
}

function get_army_replacement_spaces(p) {
    let spaces = []

    if (data.pieces[p].nation === BELGIUM) {
        //  17.1.5: Belgian Army units may be rebuilt in Brussels, Antwerp, or Ostend. The Belgian Army may not be built in Antwerp
        //  if a line of supply does not exist. If none of these spaces are Allied controlled and in supply, the Belgian
        //  Army may be rebuilt in Calais. (Calais also represents the corner of Belgium held by the Allies after October
        //  1914.)
        const belgian_spaces = [BRUSSELS, ANTWERP, OSTEND]
        for (let s of belgian_spaces) {
            if (is_controlled_by(s, AP) && is_space_supplied(AP, s))
                spaces.push(s)
        }
        if (spaces.length === 0) {
            if (is_controlled_by(CALAIS, AP) && is_space_supplied(AP, CALAIS))
                spaces.push(CALAIS)
        }
        return spaces
    }

    spaces = spaces.concat(get_available_reinforcement_spaces(p))

    if (data.pieces[p].nation === SERBIA) {
        //  Also 17.1.5: Serbian Army units may be recreated at Salonika if the Salonika or Greece Neutral Entry Event
        //  Cards have been played and Salonika is under Allied control. They may also be recreated in Belgrade
        //  following normal reinforcement restrictions.
        if (game.events.salonika > 0 || game.events.greece_entry > 0) {
            if (is_controlled_by(SALONIKA_SPACE, AP) && is_space_supplied(AP, SALONIKA_SPACE))
                spaces.push(SALONIKA_SPACE)
        }

        // Exception: Serb armies may not be recreated at Belgrade if Nis is under CP control.
        if (is_controlled_by(NIS, CP)) {
            array_remove_item(spaces, BELGRADE)
        }
    }

    return spaces
}

function goto_draw_cards_phase() {
    // All played combat cards are discarded
    game.combat_cards.forEach((c) => {
        game[data.cards[c].faction].discard.push(c)
    })
    game.combat_cards.length = 0
    game.state = 'draw_cards_phase'
    game.active = AP
}

states.draw_cards_phase = {
    inactive: 'Discarding combat cards',
    prompt() {
        view.prompt = 'Discard any Combat Cards you wish before drawing new cards'
        game[game.active].hand.forEach((c) => {
            if (data.cards[c].cc) {
                gen_action_discard(c)
            }

            // 9.5.2.5: If CP is at Total War and AP is not, the Italy and Romania cards may be discarded as if they are combat cards
            if ((c === ITALY_ENTRY || c === ROMANIA_ENTRY) && game.cp.commitment === COMMITMENT_TOTAL && game.ap.commitment !== COMMITMENT_TOTAL) {
                gen_action_discard(c)
            }
        })
        gen_action_done()
    },
    card(c) {
        push_undo()
        array_remove_item(game[game.active].hand, c)
        game[game.active].discard.push(c)
    },
    done() {
        clear_undo()
        if (game.active === AP) {
            if (game.ap.shuffle) {
                // Shuffle required because new cards added, but must be delayed until now to pick up CC discards, according to 2018 rules change
                reshuffle_discard(game.ap.deck)
                game.ap.shuffle = false
            }
            deal_ap_cards()
            game.active = CP
        } else {
            if (game.cp.shuffle) { // Same as AP shuffle above
                reshuffle_discard(game.cp.deck)
                game.cp.shuffle = false
            }
            deal_cp_cards()
            goto_end_turn()
        }
    }
}

function other_faction(faction) {
    return faction === CP ? AP : CP
}

function gen_action_next() {
    gen_action('next')
}

function gen_action_done() {
    gen_action('done')
}

function gen_action_pass() {
    gen_action('pass')
}

function gen_action_space(s) {
    gen_action('space', s)
}

function gen_action_piece(p) {
    gen_action('piece', p)
}

function gen_action_discard(c) {
    gen_action('card', c)
}

function gen_action_card(c) {
    gen_action('card', c)
}

function card_name(card) {
    return `#${card} ${cards[card].name} [${cards[card].ops}/${cards[card].sr}]`
}

function piece_name(piece) {
    return `${data.pieces[piece].name}`
}

function space_name(space) {
    return `${data.spaces[space].name}`
}

function get_connected_spaces_for_pieces(s, pieces) {
    if (pieces.length > 0 && pieces.every((p) => data.pieces[p].nation === data.pieces[pieces[0]].nation)) {
        return get_connected_spaces(s, data.pieces[pieces[0]].nation)
    } else {
        return get_connected_spaces(s)
    }
}

function get_connected_spaces(s, nation) {
    let connections = []
    if (data.spaces[s].connections)
        connections = connections.concat(data.spaces[s].connections)

    if (nation !== undefined && data.spaces[s].limited_connections.hasOwnProperty(nation))
        connections = connections.concat(data.spaces[s].limited_connections[nation])
    return connections
}

function is_port(s, faction) {
    if (faction === AP && s === game.mef_beachhead && !game.mef_beachhead_captured)
        return true
    return (faction === AP && data.spaces[s].apport) || (faction === CP && data.spaces[s].cpport)
}

states.place_new_neutral_units = {
    inactive: 'Place new units',
    prompt() {
        if (game.units_to_place.length > 0) {
            view.prompt = `Place ${game.units_to_place.length} new units`
            let available_spaces = []
            const nation = data.pieces[game.units_to_place[0]].nation
            for (let s = 1; s < data.spaces.length; ++s) {
                if (data.spaces[s].nation === nation) {
                    set_add(available_spaces, s)
                }
            }
            for (let i = 0; i < game.location.length; ++i) {
                set_delete(available_spaces, game.location[i])
            }
            available_spaces.forEach((s) => {
                gen_action_space(s)
            })
        } else {
            view.prompt = 'Done placing new units'
            gen_action_done()
        }

    },
    space(s) {
        push_undo()
        let p = game.units_to_place.shift()
        game.location[p] = s
    },
    done() {
        clear_undo()
        goto_end_action()
    }
}

// === SUPPLY ===

function generate_supply_cache(faction, cache, sources, use_ports, nation) {
    let blocked_spaces = []
    let friendly_ports = []

    // Block spaces containing an enemy unit
    for (let p = 1; p < data.pieces.length; ++p) {
        if (game.location[p] !== 0 && data.pieces[p].faction !== faction) {
            set_add(blocked_spaces, game.location[p])
        }
    }

    // Block spaces that are in nations not yet at war
    for (let s = 1; s < data.spaces.length; ++s) {
        let nation = data.spaces[s].nation
        if (!nation_at_war(nation)) {
            if (nation === GREECE && game.events.salonika > 0) {
                // Limited Greek entry (9.5.2.4): Greek units are on the map and they block move/supply, but empty
                // Greek spaces do not block supply
                if (contains_piece_of_nation(s, GREECE))
                    set_add(blocked_spaces, s)
            } else {
                set_add(blocked_spaces, s)
            }
        }
    }

    // Block enemy controlled spaces, unless besieging an enemy fort in the space
    for (let s = 1; s < data.spaces.length; ++s) {
        if (!is_controlled_by(s, faction) && !is_besieged(s)) {
            set_add(blocked_spaces, s)
        } else if (use_ports) {
            // If this type of supply can use ports, build a set of friendly port spaces
            if (is_port(s, faction)) {
                set_add(friendly_ports, s)
            }
        }
    }

    // For each supply source, populate the set of supplied spaces
    sources.forEach((source) => {
        let frontier = [source]
        while (frontier.length > 0) {
            let current = frontier.pop()
            if (!set_has(blocked_spaces, current)) {
                set_add(cache[current].sources, source)
                get_connected_spaces(current, nation).forEach((conn) => {
                    if (!set_has(cache[conn].sources, source)) {
                        set_add(frontier, conn)
                    }
                })
                if (set_has(friendly_ports, current)) {
                    friendly_ports.forEach((port) => {
                        if (!set_has(cache[port].sources, source)) {
                            set_add(frontier, port)
                        }
                    })
                }
            }
        }
    })

    // Now mark the set of spaces that can be reached without passing through Italy
    sources.forEach((source) => {
        let frontier = [source]
        let visited = []
        while (frontier.length > 0) {
            let current = frontier.pop()
            if (!set_has(visited, current)) {
                set_add(visited, current)
                if (!is_italian_space(current) && !set_has(blocked_spaces, current)) {
                    cache[current].non_italian_path = true
                    get_connected_spaces(current, nation).forEach((conn) => {
                        set_add(frontier, conn)
                    })
                    if (set_has(friendly_ports, current)) {
                        friendly_ports.forEach((port) => {
                            set_add(frontier, port)
                        })
                    }
                }
            }
        }
    })

    // Mark the set of spaces that can be reached without passing through the MEF
    sources.forEach((source) => {
        let frontier = [source]
        let visited = []
        while (frontier.length > 0) {
            let current = frontier.pop()
            if (!set_has(visited, current)) {
                set_add(visited, current)
                if (!is_mef_space(current) && !set_has(blocked_spaces, current)) {
                    cache[current].non_mef_path = true
                    get_connected_spaces(current, nation).forEach((conn) => {
                        set_add(frontier, conn)
                    })
                    if (set_has(friendly_ports, current)) {
                        friendly_ports.forEach((port) => {
                            set_add(frontier, port)
                        })
                    }
                }
            }
        }
    })
}

function is_italian_space(s) {
    return data.spaces[s].nation === ITALY
}

function search_supply() {
    game.supply_cache = {}
    game.supply_cache.cp = {}
    game.supply_cache.eastern = {}
    game.supply_cache.western = {}
    game.supply_cache.salonika = {}
    // Italian units get a separate supply cache to allow for tracing supply across the Taranto-Valona connection
    game.supply_cache.italian = {}
    // Separate supply cache for Basra to implement the Maude combat card
    game.supply_cache.basra = {}
    for (let s = 0; s < data.spaces.length; ++s) {
        game.supply_cache.cp[s] = { sources: [], non_italian_path: false, non_mef_path: false }
        game.supply_cache.eastern[s] = { sources: [], non_italian_path: false, non_mef_path: false }
        game.supply_cache.western[s] = { sources: [], non_italian_path: false, non_mef_path: false }
        game.supply_cache.salonika[s] = { sources: [], non_italian_path: false, non_mef_path: false }
        game.supply_cache.italian[s] = { sources: [], non_italian_path: false, non_mef_path: false }
        game.supply_cache.basra[s] = { sources: [], non_italian_path: false, non_mef_path: false }
    }

    let cp_sources = [ESSEN, BRESLAU]
    if (nation_at_war(BULGARIA))
        cp_sources.push(SOFIA)
    if (nation_at_war(TURKEY))
        cp_sources.push(CONSTANTINOPLE)
    generate_supply_cache(CP, game.supply_cache.cp, cp_sources, true)

    const eastern_supply_sources = [PETROGRAD, MOSCOW, KHARKOV, CAUCASUS, BELGRADE]
    generate_supply_cache(AP, game.supply_cache.eastern, eastern_supply_sources, false, RUSSIA)
    if (is_controlled_by(SALONIKA_SPACE, AP))
        generate_supply_cache(AP, game.supply_cache.salonika, [SALONIKA_SPACE], false) // Separate cache for Serbian units only

    const western_supply_sources = [LONDON]
    generate_supply_cache(AP, game.supply_cache.western, western_supply_sources, true)
    generate_supply_cache(AP, game.supply_cache.italian, western_supply_sources, true, ITALY)

    generate_supply_cache(AP, game.supply_cache.basra, [BASRA], false, BRITAIN)
}

function is_unit_supplied(p) {
    let nation = data.pieces[p].nation
    let location = game.location[p]
    if (location === 0)
        return true

    if (data.pieces[p].name === "BR ANAc" && data.spaces[location].map === "neareast")
        return true

    if (nation === MONTENEGRO)
        return true

    if (nation === "sn" && data.spaces[location].map === "neareast")
        return true

    if (nation === GREECE && !nation_at_war(GREECE) && game.events.salonika > 0) // Limited Greek entry
        return true

    if (!game.supply_cache) search_supply()
    const cache = get_supply_cache_for_piece(p)

    if (nation === SERBIA) {
        if (data.spaces[location].nation === SERBIA)
            return true // Serbian units are always in supply in Serbia
        else if (is_controlled_by(SALONIKA_SPACE, AP) && game.supply_cache.salonika[location].sources.length > 0)
            return true // Serbian units can trace supply to Salonika if it is friendly controlled
    }

    return cache[location].sources.length > 0
}

function get_supply_cache_for_piece(p) {
    let faction = data.pieces[p].faction
    let nation = data.pieces[p].nation
    let cache = (faction === CP) ? game.supply_cache.cp : game.supply_cache.western
    if (nation === ITALY)
        cache = game.supply_cache.italian
    else if (nation === RUSSIA || nation === SERBIA || nation === ROMANIA) {
        cache = game.supply_cache.eastern
    }
    return cache
}

function is_unit_supplied_through_italy(p) {
    if (!game.supply_cache) search_supply()

    if (!is_unit_supplied(p))
        return false

    const cache = get_supply_cache_for_piece(p)
    return !cache[game.location[p]].non_italian_path
}

function can_unit_trace_supply_to_basra(p) {
    if (!game.supply_cache) search_supply()
    return game.supply_cache.basra[game.location[p]].sources.length > 0
}

function is_space_supplied_through_mef(s) {
    if (!game.supply_cache) search_supply()

    if (!is_space_supplied(AP, s))
        return false

    return !game.supply_cache.western[s].non_mef_path
}

function is_space_supplied(faction, s) {
    if (!game.supply_cache) search_supply()
    if (faction === CP) {
        return game.supply_cache.cp[s].sources.length > 0
    } else {
        if (s === CETINJE) // Montenegro is always in supply
            return true

        if (data.spaces[s].nation === ALBANIA) {
            // Albanian spaces check Attrition supply by tracing normally to an Allied supply source or tracing to
            // Taranto even while Italy is still Neutral.
            if (is_controlled_by(TARANTO, AP)) {
                if (s === VALONA) return true
                if (s === TIRANA && is_controlled_by(VALONA, AP)) return true
            }
        }

        return game.supply_cache.eastern[s].sources.length > 0
            || game.supply_cache.western[s].sources.length > 0
            || game.supply_cache.italian[s].sources.length > 0
            || is_controlled_by(SALONIKA_SPACE, AP) && game.supply_cache.salonika[s].sources.length > 0
    }
}

function query_supply() {
    if (!game.supply_cache) search_supply()
    game.supply_cache.oos_pieces = get_oos_pieces()
    return game.supply_cache
}

function get_oos_pieces() {
    let oos_pieces = []
    const moving_pieces = game.move ? game.move.pieces : []
    for (let p = 1; p < data.pieces.length; ++p) {
        if (game.location[p] !== 0 && game.location[p] < AP_RESERVE_BOX && !is_unit_supplied(p) && !moving_pieces.includes(p)) {
            oos_pieces.push(p)
        }
    }
    return oos_pieces
}

// === CARD EVENTS ===

// CP #1
events.guns_of_august = {
    can_play() {
        return (game.turn === 1 && game.cp.actions.length === 0)
    },
    play() {
        push_undo()

        set_add(game.forts.destroyed, LIEGE)

        game.location[GE_1_ARMY] = LIEGE
        game.location[GE_2_ARMY] = LIEGE
        game.activated.attack.push(LIEGE)
        game.activated.attack.push(KOBLENZ)
        set_control(LIEGE, CP)
        game.events.guns_of_august = game.turn

        start_action_round()
    }
}

// CP #3
events.von_francois = {
    can_play() {
        if (!game.attack || game.attack.attacker !== CP || undefined === game.attack.pieces.find(p => data.pieces[p].nation === GERMANY))
            return false

        return undefined !== get_pieces_in_space(game.attack.space).find(p => data.pieces[p].nation === RUSSIA)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(VON_FRANCOIS)} adds +1 DRM`)
        game.attack.attacker_drm += 1
    }
}

// CP #4
events.cp_severe_weather = {
    can_play() {
        if (!game.attack || game.attack.attacker !== AP)
            return false

        const terrain = data.spaces[game.attack.space].terrain
        const season = get_season()
        if (terrain === MOUNTAIN && (season === SEASON_FALL || season === SEASON_WINTER))
            return true

        return (terrain === SWAMP && (season === SEASON_FALL || season === SEASON_SPRING))
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(SEVERE_WEATHER_CP)} adds +2 DRM`)
        game.attack.defender_drm += 2
    }
}

// CP #5
events.landwehr = {
    can_play() {
        return true
    },
    play() {
        game.landwehr_replacements = 2
        game.state = 'landwehr'
        push_undo()
    }
}

states.landwehr = {
    inactive: 'Choose units for the Landwehr event',
    prompt() {
        view.prompt = `Choose a reduced unit to strengthen (${game.landwehr_replacements} remaining)`
        if (game.landwehr_replacements > 0) {
            for (let p = 1; p < data.pieces.length; ++p) {
                if (data.pieces[p].nation === GERMANY && is_unit_reduced(p) && is_unit_supplied(p)) {
                    gen_action_piece(p)
                }
            }
            gen_action_pass()
        } else {
            gen_action_done()
        }
    },
    piece(p) {
        push_undo()
        array_remove_item(game.reduced, p)
        log(`Returned ${piece_name(p)} in ${space_name(game.location[p])} to full strength`)
        game.landwehr_replacements--
    },
    pass() {
        this.done()
    },
    done() {
        delete game.landwehr_replacements
        goto_end_action()
    }
}

// CP #6
events.cp_entrench = {
    can_play() {
        return !game.events.entrench && game.turn > 1
    },
    play() {
        push_undo()
        game.events.entrench = game.turn
        game.state = 'place_event_trench'
    }
}

// CP #8
events.race_to_the_sea = {
    can_play() {
        return true
    },
    play() {
        push_undo()
        game.events.race_to_the_sea = game.turn
        goto_end_action()
    }
}

// CP #9
events.reichstag_truce = {
    can_play() {
        if (game.turn === 1 & game.cp.actions.length > 0) {
            if (game.cp.commitment !== COMMITMENT_TOTAL)
                return true
        }
        else {
            if (game.cp.commitment !== COMMITMENT_TOTAL)
                return true
        }
        return false
    },
    play() {
        push_undo()
        game.vp += 1
        start_action_round()
    }
}

// CP #10
events.sud_army = {
    can_play() {
        return true
    },
    play() {
        push_undo()
        game.events.sud_army = game.turn
        goto_end_action()
    }
}

// CP #11
events.oberost = {
    can_play() {
        return true
    },
    play() {
        push_undo()
        game.events.oberost = game.turn
        goto_end_action()
    }
}

// CP #13
events.falkenhayn = {
    can_play() {
        return game.turn >= 3 || game.events.moltke
    },
    play() {
        push_undo()
        game.events.falkenhayn = game.turn
        goto_end_action()
    }
}

// CP #15
events.chlorine_gas = {
    can_play() {
        return (game.attack && game.attack.attacker === CP && undefined !== game.attack.pieces.find(p => data.pieces[p].nation === GERMANY))
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(CHLORINE_GAS)} adds +1 DRM`)
        game.attack.attacker_drm += 1
    }
}

// CP #16
events.liman_von_sanders = {
    can_play() {
        if (!game.attack)
            return false
        if (undefined !== game.attack.pieces.find(p => data.pieces[p].nation === TURKEY))
            return true
        return (undefined !== get_pieces_in_space(game.attack.space).find(p => data.pieces[p].nation === TURKEY))
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(LIMAN_VON_SANDERS)} adds +1 DRM`)
        if (game.attack.attacker === CP)
            game.attack.attacker_drm += 1
        else
            game.attack.defender_drm += 1
    }
}

// CP #17
events.mata_hari = {
    can_play() {
        return true
    },
    play() {
        clear_undo()
        game.events.mata_hari = game.turn
        log(`${card_name(MATA_HARI)} reveals the contents of the Allied hand:`)
        for (let c of game.ap.hand) {
            log(`${card_name(c)}`)
        }
        game.ops = data.cards[MATA_HARI].ops
        game.state = 'activate_spaces'
    }
}

// CP #18
events.fortified_machine_guns = {
    can_play() {
        return (game.attack &&
                game.attack.attacker !== CP &&
                get_trench_level(game.attack.space) > 0 &&
                undefined !== get_pieces_in_space(game.attack.space).find(p => data.pieces[p].nation === GERMANY))
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(FORTIFIED_MACHINE_GUNS)} adds +1 DRM`)
        game.attack.defender_drm += 1
    }
}

// CP #19
events.flamethrowers = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== CP)
            return false

        return undefined !== game.attack.pieces.find(p => data.pieces[p].nation === GERMANY)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(FLAMETHROWERS)} adds +1 DRM`)
        game.attack.attacker_drm += 1
    }
}

// CP #25
events.high_seas_fleet = {
    can_play() {
        return true
    },
    play() {
        push_undo()
        game.events.high_seas_fleet = game.turn
        goto_end_action()
    }
}

// CP #26
events.place_of_execution = {
    can_play() {
        if (!game.attack)
            return false

        if (!game.events.falkenhayn)
            return false

        if (game.events.h_l_take_command > 0)
            return false

        if (game.attack.attacker !== CP)
            return false

        const space_data = data.spaces[game.attack.space]
        return space_data.nation === FRANCE && space_data.fort > 0 && !game.forts.destroyed.includes(game.attack.space)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(PLACE_OF_EXECUTION)} adds +2 DRM`)
        game.attack.attacker_drm += 2
    }
}

// CP #27
events.zeppelin_raids = {
    can_play() {
        return true
    },
    play() {
        push_undo()
        game.events.zeppelin_raids = game.turn
        goto_end_action()
    }
}

// CP #28
events.tsar_takes_command = {
    can_play() {
        return game.cp.ru_vp >= 3
    },
    play() {
        push_undo()
        game.events.tsar_takes_command = game.turn
        game.ops = data.cards[TSAR_TAKES_COMMAND].ops
        game.state = 'activate_spaces'
    }
}

// CP #29
events.eleventh_army = {
    can_play() {
        return true
    },
    play() {
        push_undo()
        game.events.eleventh_army = game.turn
        goto_end_action()
    }
}

// CP #30
events.alpenkorps = {
    can_play() {
        if (!game.attack)
            return false

        if (game.attack.attacker === CP &&
            undefined !== game.attack.pieces.find(p => data.pieces[p].nation === GERMANY &&
            data.spaces[game.location[p]].terrain === MOUNTAIN)) {
            return true
        }

        return (game.attack.attacker === AP &&
                data.spaces[game.attack.space].terrain === MOUNTAIN &&
                undefined !== get_pieces_in_space(game.attack.space).find(p => data.pieces[p].nation === GERMANY))
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(ALPENKORPS)} adds +1 DRM`)
        if (game.attack.attacker === CP)
            game.attack.attacker_drm += 1
        else
            game.attack.defender_drm += 1
    }
}

// CP #31
events.kemal = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== AP)
            return false
        return (undefined !== get_pieces_in_space(game.attack.space).find(p => data.pieces[p].nation === TURKEY && get_piece_cf(p) > 0))
    },
    can_apply() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== AP)
            return false
        return (undefined !== get_pieces_in_space(game.attack.space).find(p => data.pieces[p].nation === TURKEY))
    },
    apply() {
        log(`${card_name(KEMAL)} - defender fires on the Army table`)
        game.attack.defender_table = ARMY
    }
}

// CP #32
events.war_in_africa = {
    can_play() {
        return true
    },
    play() {
        push_undo()
        game.events.war_in_africa = game.turn
        game.active = AP
        game.state = 'war_in_africa'
    }
}

states.war_in_africa = {
    inactive: 'War in Africa: Allied Powers choose to remove a British Corps or lose 1 VP',
    prompt() {
        view.prompt = 'War in Africa event: Remove a British Corps or pass to lose 1 VP'
        for (let p = 1; p < data.pieces.length; ++p) {
            if (data.pieces[p].nation === BRITAIN &&
                data.pieces[p].type === CORPS &&
                game.location[p] !== 0 &&
                !is_minor_british_nation(p))
                gen_action_piece(p)
        }
        gen_action_pass()
    },
    piece(p) {
        const space = game.location[p]
        log(`War in Africa event removes ${piece_name(p)} from ${space_name(space)}`)
        game.location[p] = 0
        game.removed.push(p)
        update_siege(space)
        game.active = CP
        goto_end_action()
    },
    pass() {
        log(`War in Africa event adds 1 VP`)
        game.vp++
        game.active = CP
        goto_end_action()
    }
}

// CP #33
events.walter_rathenau = {
    can_play() {
        return true
    },
    play() {
        push_undo()
        game.events.walter_rathenau = game.turn
        goto_end_action()
    }
}

// CP #34
events.bulgaria_entry = {
    is_neutral_entry: true,
    can_play() {
        return can_play_neutral_entry()
    },
    play() {
        set_nation_at_war(BULGARIA)
        game.units_to_place = find_n_unused_pieces(BULGARIA, 'BUc', 4)
        game.state = 'place_new_neutral_units'
    }
}

// CP #35
events.mustard_gas = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== CP)
            return false

        return undefined !== game.attack.pieces.find(p => data.pieces[p].nation === GERMANY)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(MUSTARD_GAS)} adds +1 DRM`)
        game.attack.attacker_drm += 1
    }
}

// CP #36
events.uboats_unleashed = {
    can_play() {
        return game.events.h_l_take_command > 0
    },
    play() {
        push_undo()
        game.events.uboats_unleashed = game.turn
        goto_end_action()
    }
}

// CP #37
events.hoffmann = {
    can_play() {
        return game.events.h_l_take_command > 0
    },
    play() {
        push_undo()
        game.events.hoffmann = game.turn
        goto_end_action()
    }
}

// CP #39
events.cp_air_superiority = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== CP)
            return false

        return undefined !== game.attack.pieces.find(p => data.pieces[p].nation === GERMANY)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(AIR_SUPERIORITY_CP)} adds +1 DRM`)
        game.attack.attacker_drm += 1
    }
}

// CP #43
events.von_below = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== CP)
            return false
        let defenders = get_pieces_in_space(game.attack.space)
        for (let d of defenders) {
            if (data.pieces[d].nation !== ITALY)
                return false
        }
        return true
    },
    can_apply() {
        return this.can_play() && !game.attack.trenches_canceled
    },
    apply() {
        log(`${card_name(VON_BELOW)} cancels trenches`)
        game.attack.trenches_canceled = true
    }
}

// CP #44
events.von_hutier = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== CP)
            return false
        if (!contains_piece_of_nation(game.attack.space, RUSSIA))
            return false
        return true
    },
    can_apply() {
        return this.can_play() && !game.attack.trenches_canceled
    },
    apply() {
        log(`${card_name(VON_HUTIER)} cancels trenches`)
        game.attack.trenches_canceled = true
    }
}

// CP #45
events.treaty_of_brest_litovsk = {
    can_play() {
        return game.events.bolshevik_revolution > 0
    },
    play() {
        push_undo()
        game.events.treaty_of_brest_litovsk = game.turn
        goto_end_action()
    }
}

// CP #47
events.french_mutiny = {
    can_play() {
        return true
    },
    play() {
        game.events.french_mutiny = game.turn
        goto_end_action()
    }
}

// CP #49
events.michael = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== CP)
            return false
        if (!game.events.h_l_take_command)
            return false
        return (undefined !== game.attack.pieces.find(p => data.pieces[p].nation === GERMANY))
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        game.attack.attacker_drm++
        if (!game.attack.trenches_canceled) {
            log(`${card_name(MICHAEL)} cancels trenches and adds +1 DRM`)
            game.attack.trenches_canceled = true
        } else {
            log(`${card_name(MICHAEL)} adds +1 DRM`)
        }
    },
    play() {
        game.events.michael = game.turn
        if (is_lloyd_george_active()) {
            cancel_lloyd_george(MICHAEL)
        }
    }
}

// CP #50
events.blucher = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== CP)
            return false
        if (!game.events.h_l_take_command)
            return false
        return (undefined !== game.attack.pieces.find(p => data.pieces[p].nation === GERMANY))
    },
    can_apply() {
        return this.can_play() && !game.attack.trenches_canceled
    },
    apply() {
        log(`${card_name(BLUCHER)} cancels trenches`)
        game.attack.trenches_canceled = true
    },
    play() {
        game.events.blucher = game.turn
        if (is_lloyd_george_active()) {
            cancel_lloyd_george(BLUCHER)
        }
    }
}

// CP #51
events.peace_offensive = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== CP)
            return false
        if (!game.events.h_l_take_command)
            return false
        return (undefined !== game.attack.pieces.find(p => data.pieces[p].nation === GERMANY))
    },
    can_apply() {
        return this.can_play() && !game.attack.trenches_canceled
    },
    apply() {
        log(`${card_name(PEACE_OFFENSIVE)} cancels trenches`)
        game.attack.trenches_canceled = true
        game.attack.used_peace_offensive = true
    },
    play() {
        game.events.peace_offensive = game.turn
        if (is_lloyd_george_active()) {
            cancel_lloyd_george(PEACE_OFFENSIVE)
        }
    }
}

// CP #52
events.fall_of_the_tsar = {
    can_play() {
        return game.events.tsar_takes_command > 0 && (game.cp.ru_vp + game.ap.ws + game.cp.ws >= 33)
    },
    play() {
        push_undo()
        game.events.fall_of_the_tsar = game.turn
        game.tsar_fell_cp_russian_vp = game.cp.ru_vp
        if (!nation_at_war(ROMANIA)) {
            game.vp += 3
            log(`Fall of the Tsar event adds 3 VP (Romania not at war)`)
        } else {
            game.vp++
            log(`Fall of the Tsar event adds 1 VP`)
        }

        game.ops = data.cards[FALL_OF_THE_TSAR].ops
        game.state = 'activate_spaces'
    }
}

// CP #53
events.bolshevik_revolution = {
    can_play() {
        const cp_controls_all_russian_vp_spaces = (
            is_controlled_by(RIGA, CP) &&
            is_controlled_by(KOVNO, CP) &&
            is_controlled_by(VILNA, CP) &&
            is_controlled_by(WARSAW, CP) &&
            is_controlled_by(LODZ, CP) &&
            is_controlled_by(KIEV, CP) &&
            is_controlled_by(ODESSA, CP))
        return game.events.fall_of_the_tsar > 0 &&
            game.turn > game.events.fall_of_the_tsar &&
            (game.cp.ru_vp > game.tsar_fell_cp_russian_vp || cp_controls_all_russian_vp_spaces)
    },
    play() {
        push_undo()
        game.events.bolshevik_revolution = game.turn

        game.ops = data.cards[BOLSHEVIK_REVOLUTION].ops
        game.state = 'activate_spaces'
    }
}

// CP #54
events.h_l_take_command = {
    can_play() {
        return true
    },
    play() {
        push_undo()
        game.events.h_l_take_command = game.turn
        goto_end_action()
    }
}

// CP #55
events.lloyd_george = {
    can_play() {
        return true
    },
    play() {
        game.events.lloyd_george = game.turn
        goto_end_action()
    }
}

function is_lloyd_george_active() {
    return game.events.lloyd_george === game.turn && !game.events.lloyd_george_canceled
}

function cancel_lloyd_george(card) {
    game.events.lloyd_george_canceled = true
    log(`${card_name(card)} cancels Lloyd George`)
}

// CP #57
events.kaisertreu = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker === CP)
            return undefined !== game.attack.pieces.find(p => data.pieces[p].nation === AUSTRIA_HUNGARY)
        else
            return undefined !== get_pieces_in_space(game.attack.space).find(p => data.pieces[p].nation === AUSTRIA_HUNGARY)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        if (game.attack.attacker === CP) {
            log(`${card_name(KAISERTREU)} adds +1 DRM`)
            game.attack.attacker_drm += 1
        } else {
            log(`${card_name(KAISERTREU)} adds +1 DRM`)
            game.attack.defender_drm += 1
        }
    }
}

// CP #58
events.stavka_timidity = {
    can_play() {
        return game.events.tsar_takes_command > 0
    },
    play() {
        game.events.stavka_timidity = game.turn
        goto_end_action()
    }
}

// CP #59
events.polish_restoration = {
    can_play() {
        return is_controlled_by(WARSAW, CP)
    },
    play() {
        game.events.polish_restoration = game.turn
        game.vp--
        const polish_corps = find_n_unused_pieces(GERMANY, 'PLc', 3)
        for (let p of polish_corps) {
            game.location[p] = CP_RESERVE_BOX
        }
        goto_end_action()
    }
}

// CP #60
events.turk_determination = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== AP)
            return false
        if (!contains_piece_of_nation(game.attack.space, TURKEY))
            return false
        return get_trench_level(game.attack.space, CP) === 0
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(TURK_DETERMINATION)} acts as a trench`)
    }
}

// CP #61
events.haig = {
    can_play() {
        return true
    },
    play() {
        game.events.haig = game.turn
        goto_end_action()
    }
}

function is_haig_active() {
    return game.events.haig === game.turn && !(game.events.michael > 0 || game.events.blucher > 0 || game.events.peace_offensive > 0)
}

// CP #62
events.achtung_panzer = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== CP)
            return false

        return (undefined === data.spaces[game.attack.space].terrain && undefined !== game.attack.pieces.find(p => data.pieces[p].nation === GERMANY))
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(ACHTUNG_PANZER)} adds +1 DRM`)
        game.attack.attacker_drm += 1
    }
}

// CP #63
events.russian_desertions = {
    can_play() {
        return game.events.fall_of_the_tsar > 0
    },
    play() {
        game.events.russian_desertions = game.turn
        game.state = 'russian_desertions'
        game.russian_desertions_remaining = 4
        push_undo()
    }
}

states.russian_desertions = {
    inactive: 'Russian Desertions: Choosing units to reduce',
    prompt() {
        view.prompt = `Choose a Russian unit to reduce (${game.russian_desertions_remaining} remaining)`
        if (game.russian_desertions_remaining > 0) {
            for (let p = 1; p < data.pieces.length; ++p) {
                if (game.location[p] !== 0 && data.pieces[p].nation === RUSSIA && !is_unit_reduced(p)) {
                    gen_action_piece(p)
                }
            }
        }
        gen_action_done()
    },
    piece(p) {
        push_undo()
        game.reduced.push(p)
        log(`Reduced ${piece_name(p)} in ${space_name(game.location[p])}`)
        game.russian_desertions_remaining--
    },
    done() {
        delete game.russian_desertions_remaining
        goto_end_action()
    }
}

// CP #64
events.alberich = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== AP)
            return false
        if (game.attack.combat_cards.includes(ROYAL_TANK_CORPS) || game.attack.combat_cards.includes(YANKS_AND_TANKS))
            return false
        return [FRANCE, BELGIUM].includes(data.spaces[game.attack.space].nation)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
    },
    play() {
        game.events.alberich = game.turn
        log(`${card_name(ALBERICH)} cancels the attack`)

        // Return any combat cards the Allies played in this attack
        for (let new_cc of game.attack.new_combat_cards) {
            const card_data = data.cards[new_cc]
            if (card_data.faction === AP) {
                game.ap.hand.push(new_cc)
                array_remove_item(game.combat_cards, new_cc)
            }
        }

        // Return Alberich card from play
        array_remove_item(game.combat_cards, ALBERICH)
        game.cp.removed.push(ALBERICH)

        // Cancel the attack
        end_attack_activation()
        goto_next_activation()
    }
}

// CP #65
events.prince_max = {
    can_play() {
        return game.turn <= 16
    },
    play() {
        push_undo()
        game.events.prince_max = game.turn
        goto_end_action()
    }
}

// === ALLIED POWER EVENTS ===

// AP #2
events.blockade = {
    can_play() {
        return true
    },
    play() {
        push_undo()
        game.events.blockade = game.turn
        goto_end_action()
    }
}

// AP #4
events.pleve = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker === AP)
            return undefined !== game.attack.pieces.find(p => data.pieces[p].nation === RUSSIA)
        else
            return undefined !== get_pieces_in_space(game.attack.space).find(p => data.pieces[p].nation === RUSSIA)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        if (game.attack.attacker === AP) {
            log(`${card_name(PLEVE)} adds +1 DRM`)
            game.attack.attacker_drm += 1
        } else {
            log(`${card_name(PLEVE)} adds +1 DRM`)
            game.attack.defender_drm += 1
        }
    }
}

// AP #5
events.putnik = {
    can_play() {
        if (game.turn > 7)
            return false

        if (!game.attack)
            return false

        if (game.attack.attacker === AP)
            return undefined !== game.attack.pieces.find(p => data.pieces[p].nation === SERBIA)
        else
            return undefined !== get_pieces_in_space(game.attack.space).find(p => data.pieces[p].nation === SERBIA)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(PUTNIK)} adds +1 DRM`)
        if (game.attack.attacker === AP)
            game.attack.attacker_drm += 1
        else
            game.attack.defender_drm += 1
    }
}

// AP #7
events.ap_severe_weather = {
    can_play() {
        if (!game.attack || game.attack.attacker !== CP)
            return false

        const terrain = data.spaces[game.attack.space].terrain
        const season = get_season()
        if (terrain === MOUNTAIN && (season === SEASON_FALL || season === SEASON_WINTER))
            return true

        return (terrain === SWAMP && (season === SEASON_FALL || season === SEASON_SPRING))
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(SEVERE_WEATHER_AP)} adds +2 DRM`)
        game.attack.defender_drm += 2
    }
}

// AP #9
events.moltke = {
    can_play() {
        return game.turn <= 2
    },
    play() {
        push_undo()
        game.events.moltke = game.turn
        goto_end_action()
    }
}

// AP #12
events.ap_entrench = {
    can_play() {
        return !game.events.entrench && game.turn > 1
    },
    play() {
        push_undo()
        game.events.entrench = game.turn
        game.state = 'place_event_trench'
    }
}

// AP #13
events.rape_of_belgium = {
    can_play() {
        return game.events.guns_of_august && game.ap.commitment === COMMITMENT_MOBILIZATION
    },
    play() {
        push_undo()
        game.vp -= 1
        goto_end_action()
    }
}

// AP #16
events.romania_entry = {
    is_neutral_entry: true,
    can_play() {
        return can_play_neutral_entry() && !game.events.fall_of_the_tsar
    },
    play() {
        set_nation_at_war(ROMANIA)
        game.units_to_place = find_n_unused_pieces(ROMANIA, 'ROc', 4)
        game.state = 'place_new_neutral_units'
    }
}

// AP #17
events.italy_entry = {
    is_neutral_entry: true,
    can_play() {
        return can_play_neutral_entry()
    },
    play() {
        set_nation_at_war(ITALY)
        goto_end_action()
    }
}

// AP #18
events.hurricane_barrage = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== AP)
            return false

        for (let p of game.attack.pieces) {
            if (data.pieces[p].nation === BRITAIN && !is_minor_british_nation(p))
                return true
        }
        return false
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(HURRICANE_BARRAGE)} adds +1 DRM`)
        game.attack.attacker_drm += 1
    }
}

// AP #19
events.ap_air_superiority = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== AP)
            return false

        for (let p of game.attack.pieces) {
            if (data.pieces[p].nation === FRANCE || (data.pieces[p].nation === BRITAIN && !is_minor_british_nation(p)))
                return true
        }
        return false
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(AIR_SUPERIORITY_AP)} adds +1 DRM`)
        game.attack.attacker_drm += 1
    }
}

// AP #21
events.phosgene_gas = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== AP)
            return false

        return undefined !== game.attack.pieces.find(p => data.pieces[p].nation === FRANCE)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(PHOSGENE_GAS)} adds +1 DRM`)
        game.attack.attacker_drm += 1
    }
}

// AP #23
events.cloak_and_dagger = {
    can_play() {
        return true
    },
    play() {
        clear_undo()
        game.events.cloak_and_dagger = game.turn
        log(`${card_name(CLOAK_AND_DAGGER)} reveals the contents of the CP hand:`)
        for (let c of game.cp.hand) {
            log(`${card_name(c)}`)
        }
        game.ops = data.cards[CLOAK_AND_DAGGER].ops
        game.state = 'activate_spaces'
    }
}

// AP #26
events.lusitania = {
    can_play() {
        return game.events.blockade && !game.events.zimmermann_telegram
    },
    play() {
        push_undo()
        game.vp -= 1
        game.events.lusitania = game.turn
        goto_end_action()
    }
}

// AP #27
events.great_retreat = {
    can_play() {
        return true
    },
    play() {
        game.events.great_retreat = game.turn
        goto_end_action()
    }
}

states.great_retreat_option = {
    inactive: 'Great Retreat: Choosing whether to retreat Russian units',
    prompt() {
        view.prompt = 'Great Retreat: Choose whether to retreat Russian units before combat'
        gen_action_pass()
        get_pieces_in_space(game.attack.space).filter(p => data.pieces[p].nation === RUSSIA).forEach(gen_action_piece)
    },
    piece(p) {
        push_undo()
        game.state = 'great_retreat'
        game.who = p
    },
    pass() {
        game.active = game.attack.attacker
        goto_attack_step_brusilov_offensive()
    }
}

states.great_retreat = {
    inactive: 'Great Retreat: Retreating Russian units',
    prompt() {
        if (game.who !== 0) {
            let options = get_retreat_options([game.who], game.attack.space, 0)
            if (options.length > 0) {
                view.prompt = `Choose a space to retreat ${piece_name(game.who)}`
                options.forEach(gen_action_space)
            } else {
                // TODO: Must eliminate the unit
            }
        } else {
            let pieces_to_retreat = get_pieces_in_space(game.attack.space).filter(p => data.pieces[p].nation === RUSSIA)
            if (pieces_to_retreat.length === 0) {
                view.prompt = `Great Retreat: done`
                gen_action_done()
            } else {
                view.prompt = `Great Retreat: Choose a Russian unit to retreat`
                pieces_to_retreat.forEach(gen_action_piece)
            }
        }
    },
    piece(p) {
        push_undo()
        game.who = p
    },
    space(s) {
        push_undo()
        log(`Retreat ${piece_name(game.who)} to ${space_name(s)}`)
        game.location[game.who] = s
        game.who = 0
    },
    done() {
        // If the Great Retreat ends and there is still something left to attack, continue the next attack step
        if (has_undestroyed_fort(game.attack.space, AP) || get_pieces_in_space(game.attack.space).length > 0) {
            goto_attack_step_brusilov_offensive()
        } else {
            // If there are full strength attackers, let them advance
            game.active = game.attack.attacker
            let full_strength_attackers = game.attack.pieces.filter((p) => !is_unit_reduced(p))
            if (full_strength_attackers.length > 0) {
                game.attack.retreat_length = 1
                game.attack.to_advance = full_strength_attackers
                game.attack.advancing_pieces = []
                game.state = 'attacker_advance'
            } else {
                // If no full strength attackers, end the attack
                end_attack_activation()
                goto_next_activation()
            }
        }
    }
}

// AP #28
events.landships = {
    can_play() {
        return true
    },
    play() {
        push_undo()
        game.events.landships = game.turn
        game.ops = data.cards[LANDSHIPS].ops
        game.state = 'activate_spaces'
    }
}

// AP #30
events.salonika = {
    can_play() {
        return (!game.events.greece_entry || (is_controlled_by(SALONIKA_SPACE, AP) && !is_fully_stacked(SALONIKA_SPACE, AP)))
    },
    play() {
        game.events.salonika = game.turn
        if (!game.events.greece_entry) {
            setup_piece(GREECE, 'GRc', 'Athens')
            setup_piece(GREECE, 'GRc', 'Florina')
            setup_piece(GREECE, 'GRc', 'Larisa')
        }
        game.salonika_sr_remaining = 3
        game.state = 'salonika'
    }
}

states.salonika = {
    inactive: 'Choosing units to SR to Salonika',
    prompt() {
        view.prompt = `Choose a unit to SR to Salonika (${game.salonika_sr_remaining} remaining)`
        if (!is_fully_stacked(SALONIKA_SPACE, AP) && game.salonika_sr_remaining > 0) {
            for (let p = 1; p < data.pieces.length; ++p) {
                const loc = game.location[p]
                const nation = data.pieces[p].nation
                if (loc !== 0 &&
                    loc !== SALONIKA_SPACE &&
                    data.pieces[p].type === CORPS &&
                    (nation === FRANCE || (nation === BRITAIN && !is_minor_british_nation(p))) &&
                    (is_port(loc, AP) || AP_RESERVE_BOX === loc)) {
                    gen_action_piece(p)
                }
            }
        }
        if (game.salonika_sr_remaining < 3) {
            gen_action_done()
        }
    },
    piece(p) {
        push_undo()

        game.salonika_sr_remaining--
        log(`SR ${piece_name(p)} from ${space_name(game.location[p])} to ${space_name(SALONIKA_SPACE)}`)
        game.location[p] = SALONIKA_SPACE
        set_control(SALONIKA_SPACE, AP)
    },
    done() {
        delete game.salonika_sr_remaining
        const num_actions = game.ap.actions.length
        game.ap.actions[num_actions - 1].type = ACTION_SR
        goto_end_action()
    }
}

// AP #33
events.grand_fleet = {
    can_play() {
        return game.events.high_seas_fleet > 0
    },
    play() {
        push_undo()
        delete game.event.high_seas_fleet
        goto_end_action()
    }
}

// AP #35
events.yanks_and_tanks = {
    can_play() {
        return true
    },
    play() {
        game.events.yanks_and_tanks = game.turn
        game.ops = data.cards[YANKS_AND_TANKS].ops
        game.state = 'activate_spaces'
        game.combat_cards.push(YANKS_AND_TANKS)
    },
    can_apply() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== AP)
            return false
        return (undefined !== game.attack.pieces.find(p => data.pieces[p].nation === US))
    },
    apply() {
        log(`${card_name(YANKS_AND_TANKS)} adds +2 DRM`)
        game.attack.attacker_drm += 2
    }
}

// AP #36
events.mine_attack = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== AP)
            return false

        return (get_trench_level(game.attack.space, CP) > 0 && undefined !== game.attack.pieces.find(p => data.pieces[p].nation === BRITAIN))
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(MINE_ATTACK)} adds +1 DRM`)
        game.attack.attacker_drm += 1
    }
}

// AP #37
events.independent_air_force = {
    can_play() {
        return true
    },
    play() {
        push_undo()
        game.events.independent_air_force = game.turn
        goto_end_action()
    }
}

// AP #39
events.they_shall_not_pass = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== CP)
            return false
        if (data.spaces[game.attack.space].nation !== FRANCE)
            return false
        if (!has_undestroyed_fort(game.attack.space, AP))
            return false
        return undefined !== get_pieces_in_space(game.attack.space).find(p => data.pieces[p].nation === FRANCE)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        game.attack.retreat_canceled = true
        log(`${card_name(THEY_SHALL_NOT_PASS)} cancels retreat`)
    }
}

// AP #40
events.fourteen_points = {
    can_play() {
        return game.events.zimmermann_telegram > 0
    },
    play() {
        // This event also prevents the Central Powers from offering peace terms, but offering peace terms is not
        // allowed at all in the Historical scenario (5.7.2), so there's no way to implement that currently.
        game.events.fourteen_points = game.turn
        game.vp--
        goto_end_action()
    }
}

// AP #44
events.greece_entry = {
    is_neutral_entry: true,
    can_play() {
        return can_play_neutral_entry()
    },
    play() {
        game.events.greece_entry = game.turn
        set_nation_at_war(GREECE)
        goto_end_action()
    }
}

// AP #45
events.kerensky_offensive = {
    can_play() {
        return game.events.fall_of_the_tsar > 0 && !game.events.bolshevik_revolution > 0
    },
    play() {
        game.events.kerensky_offensive = game.turn
        game.ops = data.cards[KERENSKY_OFFENSIVE].ops
        game.action_state.kerensky_available = true
        game.state = 'activate_spaces'
    },
    can_apply() {
        if (undefined === game.attack.pieces.find(p => data.pieces[p].nation === RUSSIA))
            return false
        if (undefined === get_pieces_in_space(game.attack.space).find(p => data.pieces[p].nation === AUSTRIA_HUNGARY || data.pieces[p].nation === BULGARIA || data.pieces[p].nation === TURKEY))
            return false
        return true
    }
}

states.kerensky_offensive_option = {
    inactive: 'Kerensky Offensive - Choosing whether to apply DRM',
    prompt() {
        view.prompt = 'Use Kerensky Offensive for +2 DRM?'
        gen_action('use')
        gen_action_pass()
    },
    use() {
        delete game.action_state.kerensky_available
        game.attack.attacker_drm += 2
        log(`${card_name(KERENSKY_OFFENSIVE)} adds +2 DRM`)
        goto_attack_step_combat_cards()
    },
    pass() {
        goto_attack_step_combat_cards()
    }
}

// AP #46
events.brusilov_offensive = {
    can_play() {
        return true
    },
    play() {
        game.events.brusilov_offensive = game.turn
        game.ops = data.cards[BRUSILOV_OFFENSIVE].ops
        game.action_state.brusilov_active = true
        game.action_state.brusilov_available = true
        game.state = 'activate_spaces'
    },
    can_apply() {
        if (undefined === game.attack.pieces.find(p => data.pieces[p].nation === RUSSIA))
            return false
        if (undefined !== get_pieces_in_space(game.attack.space).find(p => data.pieces[p].nation === GERMANY))
            return false
        return get_trench_level_for_attack(game.attack.space, CP) > 0
    },
    apply_drm() {
        if (undefined !== game.attack.pieces.find(p => data.pieces[p].nation === RUSSIA)) {
            game.attack.attacker_drm += 1
            log(`${card_name(BRUSILOV_OFFENSIVE)} adds +1 DRM`)
        }
    }
}

states.brusilov_offensive_option = {
    inactive: 'Brusilov Offensive - Choosing whether to cancel trenches',
    prompt() {
        view.prompt = 'Use Brusilov Offensive to cancel trench effects?'
        gen_action('use')
        gen_action_pass()
    },
    use() {
        delete game.action_state.brusilov_available
        game.attack.trenches_canceled = true
        log(`${card_name(BRUSILOV_OFFENSIVE)} cancels trench effects`)
        goto_attack_step_flank()
    },
    pass() {
        goto_attack_step_trench_negation()
    }
}

// AP #48
events.royal_tank_corps = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== AP)
            return false
        if (!game.events.h_l_take_command)
            return false
        if (undefined === game.attack.pieces.find(p => data.pieces[p].nation === BRITAIN))
            return false
        const nation = data.spaces[game.attack.space].nation
        if (nation !== FRANCE && nation !== BELGIUM)
            return false
        return (!data.spaces[game.attack.space].terrain)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(ROYAL_TANK_CORPS)} cancels trenches`)
        game.attack.trenches_canceled = true
    }
}

// AP #49
events.sinai_pipeline = {
    can_play() {
        return true
    },
    play() {
        game.events.sinai_pipeline = game.turn
        goto_end_action()
    }
}

// AP #51
events.everyone_into_battle = {
    can_play() {
        return (game.events.michael > 0 || game.events.blucher > 0 || game.events.peace_offensive > 0)
    },
    play() {
        game.events.everyone_into_battle = game.turn
        goto_end_action()
    }
}

// AP #52
events.convoy = {
    can_play() {
        return game.events.uboats_unleashed > 0
    },
    play() {
        push_undo()
        game.events.convoy = game.turn
        log(`${card_name(CONVOY)} subtracts 1 VP`)
        game.vp--
        goto_end_action()
    }
}

// AP #54
events.zimmermann_telegram = {
    can_play() {
        return game.cp.ws + game.ap.ws >= 30
    },
    play() {
        push_undo()
        game.events.zimmermann_telegram = game.turn
        game.vp--
        log(`Zimmermann Telegram event subtracts 1 VP`)
        game.ops = data.cards[ZIMMERMANN_TELEGRAM].ops
        game.state = 'activate_spaces'
    }
}

// AP #55
events.over_there = {
    can_play() {
        return game.events.zimmermann_telegram > 0 && game.turn > game.events.zimmermann_telegram
    },
    play() {
        push_undo()
        game.events.over_there = game.turn
        set_nation_at_war(US)
        game.ops = data.cards[OVER_THERE].ops
        game.state = 'activate_spaces'
    }
}

// AP #56
events.paris_taxis = {
    can_play() {
        return true
    },
    play() {
        push_undo()
        game.state = 'paris_taxis'
    }
}

states.paris_taxis = {
    inactive: 'Choose a units for the Paris Taxis event',
    prompt() {
        view.prompt = 'Choose a reduced Army to strengthen'
        const spaces = [PARIS, AMIENS, ROUEN, CHATEAU_THIERRY, ORLEANS, MELUN]
        for (let p = 1; p < data.pieces.length; ++p) {
            if (data.pieces[p].nation === FRANCE && data.pieces[p].type === ARMY && is_unit_reduced(p) && spaces.includes(game.location[p])) {
                gen_action_piece(p)
            }
        }
        gen_action_pass()
    },
    piece(p) {
        array_remove_item(game.reduced, p)
        log(`Returned ${piece_name(p)} in ${space_name(game.location[p])} to full strength`)
        goto_end_action()
    },
    pass() {
        goto_end_action()
    }
}

// AP #57
events.russian_cavalry = {
    can_play() {
        return true
    },
    play() {
        push_undo()
        game.units_to_place = find_n_unused_pieces(RUSSIA, 'RU CAVc', 2)
        game.state = 'russian_cavalry'
    }
}

states.russian_cavalry = {
    inactive: 'Placing Russian Cavalry',
    prompt() {
        if (game.units_to_place.length > 0) {
            view.prompt = 'Place the Russian Cavalry'
            for (let p = 1; p < data.pieces.length; ++p) {
                if (game.location[p] !== 0 &&
                    data.pieces[p].nation === RUSSIA &&
                    data.pieces[p].type === ARMY &&
                    data.spaces[game.location[p]].nation === RUSSIA &&
                    is_unit_supplied(p) &&
                    !would_overstack(game.location[p], game.units_to_place, AP)) {
                    gen_action_space(game.location[p])
                }
            }
        } else {
            view.prompt = 'Place the Russian Cavalry - Done'
            gen_action_done()
        }
    },
    space(s) {
        push_undo()
        logii(`RU Cavc placed in ` +  data.spaces[s].name)
        game.units_to_place.forEach((p) => {
            game.location[p] = s
        })
        game.units_to_place.length = 0
    },
    done() {
        goto_end_action()
    }
}

// AP #58
events.russian_guards = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== AP)
            return false

        return undefined !== game.attack.pieces.find(p => data.pieces[p].nation === RUSSIA)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(RUSSIAN_GUARDS)} adds +1 DRM`)
        game.attack.attacker_drm += 1
    }
}

// AP #59
events.alpine_troops = {
    can_play() {
        if (!game.attack)
            return false
        return !!(game.attack.attacker === AP && game.attack.pieces.every(p => data.pieces[p].nation === ITALY));
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(ALPINE_TROOPS)} adds +1 DRM`)
        game.attack.attacker_drm += 1
    }
}

// AP #60
events.czech_legion = {
    can_play() {
        return true
    },
    play() {
        push_undo()
        for (let p = 1; p < data.pieces.length; ++p) {
            const piece_data = data.pieces[p]
            if (game.location[p] === CP_ELIMINATED_BOX && piece_data.nation === AUSTRIA_HUNGARY && piece_data.type === CORPS) {
                game.location[p] = 0
                game.removed.push(p)
                break
            }
        }
        const czech_legion = find_piece(RUSSIA, 'RU Czlc')
        game.location[czech_legion] = AP_RESERVE_BOX
        goto_end_action()
    }
}

// AP #61
events.maude = {
    can_play() {
        if (!game.attack)
            return false
        let attacking_british_pieces = game.attack.pieces.filter(p => data.pieces[p].nation === BRITAIN)
        if (attacking_british_pieces.length === 0)
            return false

        let supplied_from_basra = false
        for (let p of attacking_british_pieces) {
            if (can_unit_trace_supply_to_basra(p)) {
                supplied_from_basra = true
                break
            }
        }

        return supplied_from_basra
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(MAUDE)} - attacker fires on the Army table`)
        game.attack.attacker_table = ARMY
    }
}

// AP #62
events.the_sixtus_affair = {
    can_play() {
        return true
    },
    play() {
        game.events.the_sixtus_affair = game.turn
        roll_peace_terms(AP, 0)
        goto_end_action()
    }
}

// AP #63
events.backs_to_the_wall = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== CP)
            return false
        if (![FRANCE, BELGIUM].includes(data.spaces[game.attack.space].nation))
            return false
        return undefined !== get_pieces_in_space(game.attack.space).find(p => data.pieces[p].nation === BRITAIN && data.pieces[p].type === ARMY)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(BACKS_TO_THE_WALL)} cancels retreat`)
        game.attack.retreat_canceled = true
    }
}

// AP #65
events.influenza = {
    can_play() {
        return game.ap.ws + game.cp.ws >= 30
    },
    play() {
        game.events.influenza = game.turn
        goto_end_action()
    }
}

// === COMMON LIBRARY ===

function gen_action(action, argument) {
    if (!view.actions)
        view.actions = {}
    if (argument !== undefined) {
        if (!(action in view.actions))
            view.actions[action] = []
        set_add(view.actions[action], argument)
    } else {
        view.actions[action] = 1
    }
}

function roll_die(sides) {
    return random(sides) + 1;
}

function random(range) {
    // An MLCG using integer arithmetic with doubles.
    // https://www.ams.org/journals/mcom/1999-68-225/S0025-5718-99-00996-5/S0025-5718-99-00996-5.pdf
    // m = 2**35 − 31
    return (game.seed = game.seed * 200105 % 34359738337) % range
}

function shuffle(list) {
    for (let i = list.length - 1; i > 0; --i) {
        let j = random(i + 1)
        let tmp = list[j]
        list[j] = list[i]
        list[i] = tmp
    }
}

// remove item at index (faster than splice)
function array_remove(array, index) {
    let n = array.length
    for (let i = index + 1; i < n; ++i)
        array[i - 1] = array[i]
    array.length = n - 1
    return array
}

// insert item at index (faster than splice)
function array_insert(array, index, item) {
    for (let i = array.length; i > index; --i)
        array[i] = array[i - 1]
    array[index] = item
    return array
}

function array_remove_item(array, item) {
    let i = array.indexOf(item)
    if (i >= 0)
        array_remove(array, i)
}

function set_clear(set) {
    set.length = 0
}

function set_has(set, item) {
    let a = 0
    let b = set.length - 1
    while (a <= b) {
        let m = (a + b) >> 1
        let x = set[m]
        if (item < x)
            b = m - 1
        else if (item > x)
            a = m + 1
        else
            return true
    }
    return false
}

function set_add(set, item) {
    let a = 0
    let b = set.length - 1
    while (a <= b) {
        let m = (a + b) >> 1
        let x = set[m]
        if (item < x)
            b = m - 1
        else if (item > x)
            a = m + 1
        else
            return set
    }
    return array_insert(set, a, item)
}

function set_delete(set, item) {
    let a = 0
    let b = set.length - 1
    while (a <= b) {
        let m = (a + b) >> 1
        let x = set[m]
        if (item < x)
            b = m - 1
        else if (item > x)
            a = m + 1
        else
            return array_remove(set, m)
    }
    return set
}

function set_toggle(set, item) {
    let a = 0
    let b = set.length - 1
    while (a <= b) {
        let m = (a + b) >> 1
        let x = set[m]
        if (item < x)
            b = m - 1
        else if (item > x)
            a = m + 1
        else
            return array_remove(set, m)
    }
    return array_insert(set, a, item)
}


// Fast deep copy for objects without cycles
function object_copy(original) {
    if (Array.isArray(original)) {
        let n = original.length
        let copy = new Array(n)
        for (let i = 0; i < n; ++i) {
            let v = original[i]
            if (typeof v === "object" && v !== null)
                copy[i] = object_copy(v)
            else
                copy[i] = v
        }
        return copy
    } else {
        let copy = {}
        for (let i in original) {
            let v = original[i]
            if (typeof v === "object" && v !== null)
                copy[i] = object_copy(v)
            else
                copy[i] = v
        }
        return copy
    }
}

function clear_undo() {
    if (game.undo.length > 0)
        game.undo = []
}

function push_undo() {
    let copy = {}
    for (let k in game) {
        let v = game[k]
        if (k === "undo")
            continue
        else if (k === "log")
            v = v.length
        else if (typeof v === "object" && v !== null)
            v = object_copy(v)
        copy[k] = v
    }
    game.undo.push(copy)
}

function pop_undo() {
    let save_log = game.log
    let save_undo = game.undo
    game = save_undo.pop()
    save_log.length = game.log
    game.log = save_log
    game.undo = save_undo
}

function log(msg) {
    game.log.push(msg)
}

function log_br() {
    if (game.log.length > 0 && game.log[game.log.length-1] !== "")
        game.log.push("")
}

function logi(msg) {
    game.log.push(">" + msg);
}
function logii(msg) {
    game.log.push(">>" + msg);
}

function log_h1(msg) {
    log_br()
    log(".h1 " + msg)
    log_br()
}

function log_h2(msg) {
    log_br()
    log(".h2 " + msg)
    log_br()
}

function log_h3(msg, faction) {
    faction = faction || game.active
    log_br();
    if (faction === AP)
        log(".h3ap " + msg);
    else if (faction === CP)
        log(".h3cp " + msg);
    else
        log(".h3 " + msg);
    log_br();
}

function die_color(faction) {
    if (faction === AP)
        return 'W'
    else
        return 'B'
}

function fmt_roll(roll, drm, faction) {
    faction = faction || game.active
    let s = '' + die_color(faction) + roll
    if (drm !== undefined && drm !== 0)
        s = s + ` + ${drm} = ${roll + drm}`
    return s
}
