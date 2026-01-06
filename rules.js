"use strict"

const data = require("./data.js")
const lz4 = require("./lz4.js")

let _assert_push_undo

let game, view

let states = {}
let events = {}

// === CONSTANTS ===

const MAX_ROLLBACK_TURNS = 2
const MAX_ROLLBACK_ACTION_ROUNDS = 4

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
const TREATY_OF_BREST_LITOVSK = 110
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
const ALLENBY = 50
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
const BRUSSELS = 31
const ANTWERP = 32
const LIEGE = 33
const KOBLENZ = 41
const ESSEN = 43
const TRENT = 57
const TARANTO = 66
const BERLIN = 79
const VILLACH = 87
const TRIESTE = 88
const BRESLAU = 94
const LODZ = 102
const CETINJE = 111
const TIRANA = 112
const VALONA = 113
const SALONIKA = 117
const KAVALA = 119
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
const GALLIPOLI = 212
const MEF1 = 216
const MEF2 = 217
const MEF3 = 218
const CONSTANTINOPLE = 219
const POTI = 233
const GROZNY = 234
const MEF4 = 260
const AMMAN = 262
const BASRA = 269
const ARABIA_SPACE = 271
const MEDINA = 272
const AQABA = 273
const JERUSALEM = 275
const SINAI = 277
const ALEXANDRIA = 280
const LIBYA = 281
const AP_RESERVE_BOX = 282
const CP_RESERVE_BOX = 283
const AP_ELIMINATED_BOX = 284
const CP_ELIMINATED_BOX = 285
const PERM_ELIMINATED_BOX = 360

function is_mef_space(s) {
    return (s >= MEF1 && s <= MEF3) || s === MEF4
}

const map_space_count = 282

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
const BRITISH_ANA_CORPS = find_piece('ana', 'BR ANAc')
const TURKISH_SN_CORPS = find_piece('sn', 'TU SNc')
const MONTENEGRIN_CORPS = find_piece('mn', 'MNc')

function is_minor_british_nation(piece) {
    return piece === AUS_CORPS || piece === CND_CORPS || piece === PT_CORPS || piece === BRITISH_ANA_CORPS
}

function is_bef_unit(p) {
    return p === BEF_ARMY || p === BEF_CORPS
}

function can_bef_enter(s) {
    const nation = data.spaces[s].nation
    return nation === BRITAIN || nation === FRANCE || nation === BELGIUM || nation === GERMANY
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
        case 'allied': return "Allied"
        case 'sn': return ""
        default: return nation
    }
}

const AP_ROLE = "Allied Powers"
const CP_ROLE = "Central Powers"

function faction_name(faction) {
    switch (faction) {
        case AP: return AP_ROLE
        case CP: return CP_ROLE
        default: return faction
    }
}

const all_pieces = Array.from(data.pieces, (_,ix) => ix)
const all_pieces_by_nation = object_group_by(all_pieces, p => data.pieces[p].nation)
const all_pieces_by_faction = object_group_by(all_pieces, p => data.pieces[p].faction)

const all_spaces = Array.from(data.spaces, (_,ix) => ix)
const all_spaces_by_nation = object_group_by(all_spaces, s => data.spaces[s].nation)
const all_capitals = all_spaces.filter(s => data.spaces[s].capital)
const all_capitals_by_nation = object_group_by(all_capitals, s => data.spaces[s].nation)
const all_supply_and_capitals = all_spaces.filter(s => data.spaces[s].capital || data.spaces[s].supply)
const all_supply_and_capitals_by_nation = object_group_by(all_supply_and_capitals, s => data.spaces[s].nation)

// === VIEW & QUERY ===

exports.roles = [ AP_ROLE, CP_ROLE ]

const HISTORICAL = "Historical"
const GREAT_WAR = "The Great War"
exports.scenarios = [ HISTORICAL, GREAT_WAR ]

function use_historical_scenario_rules() {
    return true // Other rules are not implemented
}

exports.action = function (state, current, action, arg) {
    _assert_push_undo = 0
    game = state
    update_supply_if_missing()

    if (action in states[game.state]) {
        states[game.state][action](arg, current)
        interrupt_ap_mo_confirmation()
    } else {
        if (action === "undo" && game.undo && game.undo.length > 0)
            pop_undo()
        else if (action === "propose_rollback")
            goto_propose_rollback(arg)
        else if (action === "flag_supply_warnings")
            goto_flag_supply_warnings()
        else
            throw new Error("Invalid action: " + action)
    }
    update_ana_vp()
    return game
}

exports.resign = function (state, current) {
    game = state
    update_supply_if_missing()
    if (game.state !== "game_over") {
        log_br()
        log(`${current} resigned.`)
        game.state = "game_over"
        set_active_faction(null)
        game.state = "game_over"
        game.result = other_faction(current)
        game.victory = current + " resigned."
    }
    return game
}

exports.query = function (state, _current, q) {
    if (q === 'cp_supply') {
        game = state
        update_supply_if_missing()
        return { spaces: query_supply([ESSEN, BRESLAU, SOFIA, CONSTANTINOPLE]) }
    }
    if (q === 'ap_supply')  {
        game = state
        update_supply_if_missing()
        return {
            western: query_supply([LONDON]),
            eastern: query_supply([PETROGRAD, MOSCOW, CAUCASUS, KHARKOV, BELGRADE])
        }
    }
    if (q === 'ap_cards') {
        return query_cards(state, AP)
    }
    if (q === 'cp_cards') {
        return query_cards(state, CP)
    }
    if (q === 'removed') {
        let removed = []
        removed.push(...state.ap.removed)
        removed.push(...state.cp.removed)
        return removed
    }
    return null
}

function query_cards(state, faction) {
    let cards = {
        discard: [],
        deck: [],
        removed: []
    }
    cards.discard.push(...state[faction].discard)
    cards.deck.push(...state[faction].deck)
    cards.deck.push(...state[faction].hand)
    cards.removed.push(...state[faction].removed)
    cards.discard.sort((a, b) => a - b)
    cards.deck.sort((a, b) => a - b)
    cards.removed.sort((a, b) => a - b)
    return cards
}

exports.view = function(state, current) {
    game = state
    update_supply_if_missing()

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
        activation_cost: game.activation_cost,
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
        removed_cards: {
            ap: game[AP].removed,
            cp: game[CP].removed,
        },
        entrenching: game.entrenching,
        failed_entrench: game.failed_entrench,
        forts: {
            destroyed: game.forts.destroyed,
            besieged: game.forts.besieged
        },
        control: game.control,
        events: game.events,
        combat_cards: game.combat_cards,
        mef_beachhead: game.mef_beachhead_captured ? null : game.mef_beachhead,
        tsar_fell_cp_russian_vp: game.tsar_fell_cp_russian_vp,

        oos_pieces: game.oos_pieces,

        ne_limits: game.ne_restrictions,

        violations: check_rule_violations(),

        score_events: game.score_events,

        supply_warnings: game.supply_warnings,

        action_state: game.action_state
    }

    if (current === AP_ROLE) {
        view.hand = game.ap.hand
    } else if (current === CP_ROLE) {
        view.hand = game.cp.hand
    } else {
        view.hand = []
    }

    if (!game.rollback)
        view.rollback = []
    else
        view.rollback = game.rollback.map((r) => {
            let name = r.turn_start ? `Turn ${r.turn} Start` : `Turn ${r.turn} ${r.active} Action ${r.action}`
            return {
                name: name,
                events: r.events
            }
        })

    if (game.rollback_proposal)
        view.rollback_proposal = { index: game.rollback_proposal.index }

    if (!states[game.state]) {
        view.prompt = "Invalid game state: " + game.state
        return view
    }

    if (current === 'Observer' || game.active !== current) {
        let inactive = states[game.state].inactive
        if (typeof inactive === 'function')
            states[game.state].inactive()
        else if (typeof inactive === 'string')
            view.prompt = `Waiting for ${faction_name(active_faction())} to ${inactive}.`
        else
            view.prompt = `Waiting for ${faction_name(active_faction())}.`
    } else {
        view.actions = {}
        states[game.state].prompt()
        if (view.actions.undo === undefined) {
            if (game.undo && game.undo.length > 0)
                view.actions.undo = 1
            else
                view.actions.undo = 0
        }

        // Rollback action
        if (!game.options.no_supply_warnings &&
            game.rollback_proposal === undefined &&
            game.rollback &&
            game.rollback.length > 0)
            view.actions.propose_rollback = view.rollback.map((_, i) => i)

        // Flag supply warnings
        if (!game.options.no_supply_warnings &&
            game.state !== "flag_supply_warnings")
            view.actions.flag_supply_warnings = 1
    }

    return view
}

exports.dont_snap = function (state) {
    return !!state.attack
}

// === SETUP ===

exports.setup = function (seed, scenario, options) {
    game = create_empty_game_state(seed, scenario)

    if (scenario !== GREAT_WAR) {
        if (options.optional_cards) {
            game.options.optional_cards = 1
        } else if (options.valiant) {
            game.options.valiant = 1
        }
    }

    // Current control of each space
    for (let i = 0; i < map_space_count; ++i)
        set_up_control(i, data.spaces[i].faction)

    log_h1("Paths of Glory")

    if (scenario === GREAT_WAR) {
        set_up_great_war_scenario()
    } else {
        set_up_historical_scenario()
    }

    if (globalThis.RTT_FUZZER)
        game.options.no_supply_warnings = 1

    if (options.no_supply_warnings) {
        game.options.no_supply_warnings = 1
        log("Supply warnings and rollbacks disabled.")
    }

    if (game.scenario === HISTORICAL) {
        game.options.hand_size = 8
        game.failed_entrench = []
        set_up_standard_decks(true)
        goto_start_turn()
    } else if (scenario === GREAT_WAR) {
        game.options.hand_size = 8
        game.failed_entrench = []
        set_up_great_war_scenario_decks()
        goto_start_great_war_scenario()
    } else {
        game.options.hand_size = 7
        set_up_standard_decks(false)
        goto_start_turn()
    }

    return game
}

function create_empty_game_state(seed, scenario) {
    return {
        seed: seed,
        scenario: scenario,
        options: {},
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
        location: Array(data.pieces.length).fill(0),
        reduced: [],
        removed: [],
        entrenching: [], // Units that are entrenching this turn
        failed_entrench: undefined, // Units that failed to entrench this turn (if using 11.2.10 optional rule)

        // Spaces
        activated: {
            move: [], // Spaces activated for movement
            attack: [] // Spaces activated for attack
        },
        activation_cost: [], // Cost space was activated for
        control: Array(Math.floor((map_space_count + 7) / 8)).fill(0),
        forts: { // data for spaces tells you strength of forts per space
            destroyed: [], // Spaces with destroyed forts
            besieged: [] // Spaces with besieged forts
        },
        broken_sieges: [], // Spaces where a siege was broken by combat losses. These spaces are ignored for warnings until a piece moves into or out of them. (15.2.4)

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
            trenches: [], // Trench levels per space
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
            trenches: [],
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

        // Track events that updated the score to display a summary in the client
        // Each score event should contain t, the turn it was played, vp, the VP change, and c, a card id (optional)
        score_events: [],
    }
}

function set_up_historical_scenario() {
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

    setup_piece('br', 'BRc', 'Basra', true)
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

    // Set up all the neutral pieces
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
    setup_piece('tu', 'TUc', 'Adrianople')
    setup_piece('it', 'ITc', 'Rome')
    setup_piece('it', 'ITc', 'Turin')
    setup_piece('it', 'ITc', 'Taranto')
    setup_piece('it', 'IT 1', 'Verona', true)
    setup_piece('it', 'IT 2', 'Udine', true)
    setup_piece('it', 'IT 3', 'Maggiore', true)
    setup_piece('it', 'IT 4', 'Asiago', true)
    setup_piece(BULGARIA, 'BUc', 'Sofia')
    setup_piece(BULGARIA, 'BUc', 'Sofia')
    setup_piece(ROMANIA, 'ROc', 'Bucharest')
    setup_piece(ROMANIA, 'ROc', 'Bucharest')

    set_trench_level(find_space('Strasbourg'), 1, CP)
    set_trench_level(find_space('Mulhouse'), 1, CP)
    set_trench_level(find_space('Metz'), 1, CP)
    set_trench_level(find_space('Trent'), 1, CP)
    set_trench_level(find_space('Trieste'), 1, CP)
    set_trench_level(find_space('Villach'), 1, CP)
    set_trench_level(find_space('Cracow'), 1, CP)
    set_trench_level(find_space('Konigsberg'), 1, CP)
    set_trench_level(find_space('Giresun'), 1, CP)
    set_trench_level(find_space('Gaza'), 1, CP)
    set_trench_level(find_space('Baghdad'), 1, CP)
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
}

function set_up_great_war_scenario() {
    game.turn = 10 // Start at replacement phase of turn 10
    game.state = 'replacement_phase'
    game.cp.commitment = COMMITMENT_TOTAL
    game.ap.commitment = COMMITMENT_TOTAL
    game.cp.ru_vp = 2

    // CP west front trenches and pieces
    set_up_control(LIEGE, CP)
    set_trench_level(BRUSSELS, 1, CP)
    set_trench_level(find_space('Cambrai'), 2, CP)
    set_trench_level(SEDAN, 2, CP)
    set_trench_level(find_space('Metz'), 1, CP)
    set_trench_level(find_space('Strasbourg'), 2, CP)
    set_trench_level(find_space('Mulhouse'), 1, CP)
    setup_piece(GERMANY, 'GE 1', 'Brussels', true)
    setup_piece(GERMANY, 'GE 2', 'Brussels')
    setup_piece(GERMANY, 'GE 3', 'Sedan')
    setup_piece(GERMANY, 'GE 4', 'Metz')
    setup_piece(GERMANY, 'GE 5', 'Strasbourg')
    setup_piece(GERMANY, 'GEc', 'Strasbourg', true)
    setup_piece(GERMANY, 'GE 6', 'Metz')
    setup_piece(GERMANY, 'GE 7', 'Cambrai', true)
    setup_piece(GERMANY, 'GE 9', 'Essen', true)
    setup_piece(GERMANY, 'GE 10', 'Metz', true)
    setup_piece(GERMANY, 'GE 12', 'Sedan')

    // CP Italian front pieces and trenches
    set_trench_level(VILLACH, 1, CP)
    set_trench_level(TRENT, 1, CP)
    set_trench_level(TRIESTE, 1, CP)
    setup_piece(GERMANY, 'GEc', 'Trent', true)
    setup_piece(GERMANY, 'GEc', 'Trent', true)
    setup_piece(AUSTRIA_HUNGARY, 'AH 1', 'Trent', true)
    setup_piece(GERMANY, 'GEc', 'Villach')
    setup_piece(AUSTRIA_HUNGARY, 'AH 2', 'Trieste')
    setup_piece(AUSTRIA_HUNGARY, 'AHc', 'Trieste', true)
    setup_piece(AUSTRIA_HUNGARY, 'AHc', 'Trieste', true)

    // CP Balkan front pieces and trenches
    set_up_control(find_space('Valjevo'), CP)
    set_up_control(find_space('Nis'), CP)
    set_up_control(find_space('Belgrade'), CP)
    setup_piece(AUSTRIA_HUNGARY, 'AH 7', 'Skopje', true)
    setup_piece(AUSTRIA_HUNGARY, 'AH 10', 'Skopje', true)
    setup_piece(BULGARIA, 'BUc', 'Sofia')
    setup_piece(BULGARIA, 'BUc', 'Kazanlik', true)
    setup_piece(BULGARIA, 'BUc', 'Philippoli', true)
    setup_piece(TURKEY, 'TUc', 'Gallipoli')
    setup_piece(TURKEY, 'TUc', 'Gallipoli')
    setup_piece(TURKEY, 'TUc', 'Gallipoli', true)

    // CP near east front pieces and trenches
    set_trench_level(find_space('Giresun'), 1, CP)
    set_trench_level(find_space('Baghdad'), 1, CP)
    set_trench_level(find_space('Gaza'), 1, CP)
    setup_piece(TURKEY, 'TU YLD', 'Constantinople')
    setup_piece(TURKEY, 'TUc', 'Trebizond')
    setup_piece(TURKEY, 'TUc', 'Erzerum')
    setup_piece(TURKEY, 'TUc', 'Erzerum', true)
    setup_piece(BULGARIA, 'BUc', 'Erzerum', true)
    setup_piece(TURKEY, 'TUc', 'Diyarbakir')
    setup_piece(TURKEY, 'TUc', 'Baghdad')
    setup_piece(TURKEY, 'TUc', 'Beersheba')
    setup_piece(TURKEY, 'TUc', 'Beersheba', true)
    setup_piece(BULGARIA, 'BUc', 'Gaza', true)
    setup_piece(TURKEY, 'TUc', 'Gaza')
    setup_piece(TURKEY, 'TUc', 'Medina')

    // CP Austrian front pieces and trenches
    set_trench_level(find_space('Cracow'), 1, CP)
    setup_piece(AUSTRIA_HUNGARY, 'AHc', 'Cracow')
    setup_piece(AUSTRIA_HUNGARY, 'AH 3', 'Uzhgorod')
    setup_piece(GERMANY, 'GEc', 'Gorlice', true)
    setup_piece(GERMANY, 'GEc', 'Gorlice', true)
    setup_piece(AUSTRIA_HUNGARY, 'AH 4', 'Gorlice', true)
    setup_piece(AUSTRIA_HUNGARY, 'AHc', 'Miskolcz', true)
    setup_piece(AUSTRIA_HUNGARY, 'AH 5', 'Budapest')
    setup_piece(AUSTRIA_HUNGARY, 'AH 6', 'Budapest', true)
    setup_piece(AUSTRIA_HUNGARY, 'AHc', 'Szeged', true)

    // CP German front pieces and trenches
    set_trench_level(BERLIN, 1, CP)
    set_trench_level(find_space('Konigsberg'), 1, CP)
    setup_piece(GERMANY, 'GE 11', 'Breslau')
    setup_piece(GERMANY, 'GE 17', 'Berlin', true)
    setup_piece(GERMANY, 'GE 18', 'Berlin', true)
    setup_piece(GERMANY, 'GEc', 'Warsaw', true)
    setup_piece(GERMANY, 'GEc', 'Czestochowa', true)
    setup_piece(GERMANY, 'GEc', 'Danzig')
    setup_piece(GERMANY, 'GEc', 'Konigsberg')
    set_up_control(find_space('Plock'), CP)
    set_up_control(LODZ, CP)

    // CP Reserve Box pieces
    setup_reserve_corps(GERMANY, 4, 1)
    setup_reserve_corps(AUSTRIA_HUNGARY, 3, 0)
    setup_reserve_corps(TURKEY, 1, 1)

    // CP eliminated box pieces
    setup_piece(GERMANY, 'GE 8', 'CP Eliminated Box')
    setup_piece(GERMANY, 'GE 14', 'CP Eliminated Box')
    setup_piece(GERMANY, 'GEc', 'CP Eliminated Box')
    setup_piece(AUSTRIA_HUNGARY, 'AHc', 'CP Eliminated Box')
    setup_piece(AUSTRIA_HUNGARY, 'AHc', 'CP Eliminated Box')
    setup_piece(AUSTRIA_HUNGARY, 'AHc', 'CP Eliminated Box')
    setup_piece(TURKEY, 'TUc', 'CP Eliminated Box')
    setup_piece(BULGARIA, 'BUc', 'CP Eliminated Box')

    // AP west front pieces and trenches
    set_trench_level(PARIS, 1, AP)
    set_trench_level(find_space('Verdun'), 1, AP)
    set_trench_level(find_space('Nancy'), 1, AP)
    set_trench_level(find_space('Belfort'), 1, AP)
    setup_piece(BRITAIN, 'BR 3', 'London', true)
    setup_piece(BRITAIN, 'BR BEF', 'Ostend')
    setup_piece(BELGIUM, 'BE 1', 'Ostend', true)
    setup_piece(BRITAIN, 'CNDc', 'Ostend')
    setup_piece(BRITAIN, 'BR 2', 'Amiens', true)
    setup_piece(FRANCE, 'FRc', 'Amiens', true)
    setup_piece(FRANCE, 'FR 6', 'Paris', true)
    setup_piece(FRANCE, 'FR 1', 'Nancy')
    setup_piece(FRANCE, 'FR 7', 'Nancy')
    setup_piece(FRANCE, 'FR 2', 'Chateau Thierry')
    setup_piece(FRANCE, 'FR 3', 'Chateau Thierry', true)
    setup_piece(FRANCE, 'FRc', 'Chateau Thierry')
    setup_piece(FRANCE, 'FRc', 'Belfort', true)
    setup_piece(FRANCE, 'FR 4', 'Verdun')
    setup_piece(FRANCE, 'FR 5', 'Verdun')
    setup_piece(FRANCE, 'FR 9', 'Verdun', true)

    // AP Italian front pieces and trenches
    set_trench_level(find_space('Verona'), 1, AP)
    set_trench_level(find_space('Asiago'), 1, AP)
    set_trench_level(find_space('Maggiore'), 1, AP)
    set_trench_level(find_space('Udine'), 1, AP)
    setup_piece(ITALY, 'IT 1', 'Verona', true)
    setup_piece(FRANCE, 'FRc', 'Verona')
    setup_piece(ITALY, 'ITc', 'Verona')
    setup_piece(ITALY, 'IT 4', 'Asiago', true)
    setup_piece(ITALY, 'ITc', 'Asiago')
    setup_piece(ITALY, 'ITc', 'Maggiore')
    setup_piece(ITALY, 'IT 2', 'Udine', true)
    setup_piece(ITALY, 'IT 3', 'Rome', true)
    setup_piece(FRANCE, 'FRc', 'Venice')

    // AP Balkan front pieces and trenches
    setup_piece(MONTENEGRO, 'MNc', 'Cetinje')
    setup_piece(SERBIA, 'SB 1', 'Monastir', true)
    setup_piece(SERBIA, 'SB 2', 'Monastir', true)
    setup_piece(FRANCE, 'FRc', 'Salonika')
    setup_piece(FRANCE, 'FRc', 'Salonika')
    setup_piece(BRITAIN, 'BRc', 'Salonika')
    setup_piece(GREECE, 'GRc', 'Athens')
    setup_piece(GREECE, 'GRc', 'Florina')
    setup_piece(GREECE, 'GRc', 'Larisa')
    setup_piece(BRITAIN, 'BR MEF', 'MEF1')
    setup_piece(BRITAIN, 'AUSc', 'MEF1')
    game.mef_beachhead = MEF1

    // AP near east front pieces and trenches
    set_trench_level(find_space('Basra'), 1, AP)
    set_trench_level(find_space('Port Said'), 1, AP)
    set_trench_level(find_space('Cairo'), 1, AP)
    setup_piece(RUSSIA, 'RUc', 'Rize')
    setup_piece(RUSSIA, 'RU CAU', 'Kars')
    setup_piece(RUSSIA, 'RUc', 'Kars', true)
    setup_piece(RUSSIA, 'RUc', 'Kars', true)
    setup_piece(RUSSIA, 'RUc', 'Erivan')
    setup_piece(BRITAIN, 'BRc', 'Basra')
    setup_piece(BRITAIN, 'BRc', 'Port Said', true)
    setup_piece(BRITAIN, 'BRc', 'Port Said', true)
    setup_piece(BRITAIN, 'BRc', 'Cairo')

    // AP Austrian front pieces and trenches
    set_up_control(find_space('Tarnow'), AP)
    set_up_control(find_space('Lemberg'), AP)
    set_up_control(find_space('Tarnopol'), AP)
    set_up_control(find_space('Cluj'), AP)
    set_up_control(find_space('Hermannstadt'), AP)
    set_up_control(find_space('Schossburg'), AP)
    set_up_control(find_space('Kronstadt'), AP)
    set_trench_level(find_space('Odessa'), 1, AP)
    setup_piece(RUSSIA, 'RUc', 'Ivangorod', true)
    setup_piece(RUSSIA, 'RU 7', 'Przemysl')
    setup_piece(RUSSIA, 'RU 9', 'Przemysl')
    setup_piece(RUSSIA, 'RU 8', 'Stanislau', true)
    setup_piece(RUSSIA, 'RU 10', 'Stanislau', true)
    setup_piece(RUSSIA, 'RUc', 'Munkacs')
    setup_piece(RUSSIA, 'RUc', 'Czernowitz', true)
    setup_piece(RUSSIA, 'RU 12', 'Caucasus', true)

    // AP German front pieces and trenches
    set_up_control(find_space('Memel'), AP)
    set_trench_level(find_space('Kovno'), 1, AP)
    set_trench_level(find_space('Riga'), 1, AP)
    setup_piece(RUSSIA, 'RU 2', 'Insterberg')
    setup_piece(RUSSIA, 'RU 3', 'Insterberg')
    setup_piece(RUSSIA, 'RU 4', 'Insterberg', true)
    setup_piece(RUSSIA, 'RU 6', 'Brest Litovsk')
    setup_piece(RUSSIA, 'RUc', 'Brest Litovsk', true)
    setup_piece(RUSSIA, 'RU 5', 'Lomza', true)
    setup_piece(RUSSIA, 'RU 1', 'Kovno', true)
    setup_piece(RUSSIA, 'RUc', 'Bialystok')

    // AP Reserve Box pieces
    setup_reserve_corps(ITALY, 4, 2)
    setup_reserve_corps(FRANCE, 3, 0)
    setup_piece(BRITAIN, 'BR BEFc', 'AP Reserve Box')
    setup_reserve_corps(BRITAIN, 2, 0)
    setup_reserve_corps(RUSSIA, 4, 2)
    setup_reserve_corps(BELGIUM, 1, 0)
    setup_reserve_corps(SERBIA, 2, 0)

    // AP eliminated box pieces
    setup_piece(BRITAIN, 'BR 1', 'AP Eliminated Box')
    setup_piece(BRITAIN, 'BR 4', 'AP Eliminated Box')
    setup_piece(BRITAIN, 'BRc', 'AP Eliminated Box')
    setup_piece(FRANCE, 'FR 10', 'AP Eliminated Box')
    setup_piece(RUSSIA, 'RU 11', 'AP Eliminated Box')
    setup_piece(RUSSIA, 'RUc', 'AP Eliminated Box')
    setup_piece(RUSSIA, 'RUc', 'AP Eliminated Box')
    setup_piece(RUSSIA, 'RUc', 'AP Eliminated Box')

    // One British corps has been sent to serve in Africa
    setup_piece(BRITAIN, 'BRc', 'AP Permanently Eliminated Box')

    // Bulgaria is at war
    game.war.bu = 7 //BR// Actual historic entry turn, just for the hell of it

    // Italy is at war
    game.war.it = 5 //BR// Actual historic entry turn, just for the hell of it

    // Turkey is at war
    game.war.tu = 3 //BR// Actual historic entry turn, just for the hell of it

    set_up_control(find_space('Libya'), AP)

    // Set control for all spaces containing a piece
    for (let p = 1; p < data.pieces.length; p++) {
        const piece_data = data.pieces[p]
        const loc = game.location[p]
        if (loc !== 0) {
            const space_data = data.spaces[loc]
            if (piece_data.faction !== space_data.faction)
                set_up_control(game.location[p], piece_data.faction)
        }
    }

    // Destroy forts occupied by enemies and set control where there is a trench
    for (let s = 1; s < map_space_count; s++) {
        if (is_controlled_by(s, CP) && get_trench_level(s, AP) > 0)
            set_up_control(s, AP)
        if (is_controlled_by(s, AP) && get_trench_level(s, CP) > 0)
            set_up_control(s, CP)
        if (has_undestroyed_fort(s, AP) && is_controlled_by(s, CP))
            game.forts.destroyed.push(s)
        if (has_undestroyed_fort(s, CP) && is_controlled_by(s, AP))
            game.forts.destroyed.push(s)
    }

    // Each player starts with a 5-ops card worth of RPs
    game.rp.fr = 3
    game.rp.br = 3
    game.rp.ru = 4
    game.rp.it = 2
    game.rp.allied = 1
    game.rp.ge = 4
    game.rp.ah = 3
    game.rp.tu = 2
    game.rp.bu = 1
}

function record_score_event(vp, card, turn = game.turn) {
    if (!game.score_events)
        game.score_events = []
    if (card)
        game.score_events.push([ turn, vp, card ])
    else
        game.score_events.push([ turn, vp ])
}



function set_up_standard_decks(start_with_guns_of_august) {
    for (let i = 1; i < data.cards.length; i++) {
        if (i === GUNS_OF_AUGUST && start_with_guns_of_august) {
            game.cp.hand.push(i)
        } else if (data.cards[i].commitment === COMMITMENT_MOBILIZATION && data.utils.is_card_allowed_to_deal(i, game.options)) {
            game[data.cards[i].faction].deck.push(i)
        }
    }

    shuffle(game.ap.deck)
    shuffle(game.cp.deck)
    deal_ap_cards()
    deal_cp_cards()
}

const great_war_scenario_played_cp_cards = [
    GUNS_OF_AUGUST,
    LANDWEHR,
    ENTRENCH_CP,
    REICHSTAG_TRUCE,
    SUD_ARMY,
    OBEROST,
    FALKENHAYN,
    CHLORINE_GAS,
    LIMAN_VON_SANDERS,
    MATA_HARI,
    FLAMETHROWERS,
    ELEVENTH_ARMY,
    WAR_IN_AFRICA,
    WALTER_RATHENAU,
    BULGARIA_ENTRY,
    MUSTARD_GAS,
    GERMAN_REINFORCEMENTS_1, // CP 7
    GERMAN_REINFORCEMENTS_2, // CP 12
    AH_REINFORCEMENTS_1, // CP 14
    AH_REINFORCEMENTS_2, // CP 20
    GERMAN_REINFORCEMENTS_3, // CP 21
    GERMAN_REINFORCEMENTS_4, // CP 22
    GERMAN_REINFORCEMENTS_7, // CP 41
    GERMAN_REINFORCEMENTS_8, // CP 46
    TURKISH_REINFORCEMENTS_1 // CP 42
]
const great_war_scenario_played_ap_cards = [
    BLOCKADE,
    PLEVE,
    WITHDRAWAL_AP,
    MOLTKE,
    RAPE_OF_BELGIUM,
    ITALY_ENTRY,
    PHOSGENE_GAS,
    CLOAK_AND_DAGGER,
    LUSITANIA,
    GREAT_RETREAT,
    YUDENITCH,
    SINAI_PIPELINE,
    SALONIKA_CARD,
    BRITISH_REINFORCEMENTS_1, // AP 1
    RUSSIAN_REINFORCEMENTS_1, // AP 3
    FRENCH_REINFORCEMENTS_1, // AP 10
    RUSSIAN_REINFORCEMENTS_3, // AP 11
    BRITISH_REINFORCEMENTS_2, // AP 14
    BRITISH_REINFORCEMENTS_4, // AP 20
    FRENCH_REINFORCEMENTS_2, // AP 24
    RUSSIAN_REINFORCEMENTS_4, // AP 25
    MEF, // AP 31
    BRITISH_REINFORCEMENTS_5, // AP 34
    BRITISH_REINFORCEMENTS_3, // AP 15
    RUSSIAN_REINFORCEMENTS_5 // AP 32

]
function set_up_great_war_scenario_decks() {
    for (let i = 1; i < data.cards.length; i++) {
        let c = data.cards[i]
        if (great_war_scenario_played_cp_cards.includes(i) || great_war_scenario_played_ap_cards.includes(i))
            set_up_played_event(i, great_war_scenario_turn_for_event(i))
        else if (data.utils.is_card_allowed_to_deal(i, game.options))
            game[c.faction].deck.push(i)
    }

    // Record "score events" for the played events
    record_score_event(-1, RAPE_OF_BELGIUM, great_war_scenario_turn_for_event(RAPE_OF_BELGIUM))
    record_score_event(1, REICHSTAG_TRUCE, great_war_scenario_turn_for_event(REICHSTAG_TRUCE))
    record_score_event(-1, LUSITANIA, great_war_scenario_turn_for_event(LUSITANIA))
    record_score_event(-1, BLOCKADE, 4)
    record_score_event(-1, BLOCKADE, 8)

    shuffle(game.ap.deck)
    shuffle(game.cp.deck)
    // Great War scenario starts with a replacement phase, and then cards are dealt
    //deal_ap_cards()
    //deal_cp_cards()
}

function great_war_scenario_turn_for_event(c) {
    // Most of these are based on the timing of the historical events represented on the card
    switch (c) {
        case GUNS_OF_AUGUST:
            return 1
        case LANDWEHR:
            return 2
        case ENTRENCH_CP:
            return 3
        case REICHSTAG_TRUCE:
            return 1
        case SUD_ARMY:
            return 4
        case OBEROST:
            return 3
        case FALKENHAYN:
            return 2
        case BLOCKADE:
            return 1
        case MOLTKE:
            return 1
        case RAPE_OF_BELGIUM:
            return 1
        case ITALY_ENTRY:
            return 5
        case LUSITANIA:
            return 5
        case SINAI_PIPELINE:
            return 4
        case ELEVENTH_ARMY:
            return 5
        case SALONIKA_CARD:
            return 7
        case GREAT_RETREAT:
            return 6
        default:
            return 9
    }
}

function set_up_played_event(c, turn = 1) {
    const card_data = data.cards[c]
    if (card_data.ws) {
        game[card_data.faction].ws += card_data.ws
    }

    if (card_data.remove)
        game[card_data.faction].removed.push(c)
    else
        game[card_data.faction].discard.push(c)

    if (c === ENTRENCH_CP || c === ENTRENCH_AP) {
        game.events.entrench = turn
    } else {
        game.events[card_data.event] = turn
    }
}

// === START TURN ===

function goto_start_turn() {
    game.state = 'confirm_mo'
    game.active = CP_ROLE
    game.ap_mo_confirmation_needed = true

    update_supply()

    log_br()
    log_h1(`Turn ${game.turn} -- ${turn_season_and_year(game.turn)}`)
    game.phase = "Start Turn"
    log_br()
    roll_mandated_offensives()
    log_br()
    update_russian_capitulation()
}

function goto_start_great_war_scenario() {
    log_br()
    log_h1(`The Great War`)
    log_br()
    game.ap.mo = NONE
    game.cp.mo = NONE
    update_russian_capitulation()
    apply_replacement_phase_events()
    goto_replacement_phase()
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
    if (game.ap.shuffle) {
        // Shuffle required because new cards added, but must be delayed until now to pick up CC discards, according to 2018 rules change
        reshuffle_discard(game.ap.deck)
        game.ap.shuffle = false
    }

    while (game.ap.hand.length < game.options.hand_size) {
        if (game.ap.deck.length === 0)
            reshuffle_discard(game.ap.deck)
        if (game.ap.deck.length === 0)
            break
        game.ap.hand.push(draw_card(game.ap.deck))
    }
}

function deal_cp_cards() {
    if (game.cp.shuffle) { // Same as AP shuffle above
        reshuffle_discard(game.cp.deck)
        game.cp.shuffle = false
    }

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
    array_remove_item(game[active_faction()].hand, card)
    game.last_card = card
    game[active_faction()].discard.push(card)
}

function reshuffle_discard(deck) {
    let player

    if (deck === game.ap.deck) {
        player = game.ap
        log(`${faction_name(AP)} deck reshuffled`)
    } else if (deck === game.cp.deck) {
        player = game.cp
        log(`${faction_name(CP)} deck reshuffled`)
    }

    game.last_card = 0
    player.deck = player.deck.concat(player.discard)
    player.discard = []
}

function goto_end_turn() {
    delete game.discarded_ccs

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

// === SETUP (2) ===

function setup_piece(nation, unit, space, reduced) {
    let where = find_space(space)
    let who = find_unused_piece(nation, unit)
    game.location[who] = where
    if (reduced) {
        set_add(game.reduced, who)
    }
}

function setup_reserve_corps(nation, total, num_reduced = 0) {
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
            space = 'CP Reserve Box'
            break
        case TURKEY:
            unit = 'TUc'
            space = 'CP Reserve Box'
            break
    }
    for (let i = 0; i < total; ++i) {
        setup_piece(nation, unit, space, i < num_reduced)
    }
}

function set_up_control(space, faction) {
    set_control_bit(space, faction === CP ? 1 : 0)
}

function find_unused_piece(nation, name) {
    const pieces = find_n_unused_pieces(nation, name, 1)
    return pieces[0]
}

function find_n_unused_pieces(nation, name, n) {
    return data.utils.find_n_pieces(nation, name, n, i => game.location[i] === 0)
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

// === NATION AT WAR ===

function nation_at_war(nation) {
    return game.war[nation] !== 0
}

function set_nation_at_war(nation) {
    if (nation_at_war(nation)) return

    game.war[nation] = game.turn

    if (nation === TURKEY) {
        log_h3("Turkey enters the war", CP)
    }

    if (nation === ITALY) {
        log_h3("Italy enters the war", AP)
    }

    if (nation === BULGARIA) {
        log_h3("Bulgaria enters the war", CP)
    }

    if (nation === ROMANIA) {
        log_h3("Romania enters the war", AP)
    }

    if (nation === GREECE) {
        log_h3("Greece enters the war", AP)
        if (!game.events.salonika) {
            setup_piece(GREECE, 'GRc', 'Athens')
            setup_piece(GREECE, 'GRc', 'Florina')
            setup_piece(GREECE, 'GRc', 'Larisa')
        }
    }
}

const limited_greek_entry_spaces = [SALONIKA, KAVALA]
function is_space_at_war(space) {
    let nation = data.spaces[space].nation
    if (!nation_at_war(nation)) {
        if (nation === GREECE && game.events.salonika > 0) {
            return limited_greek_entry_spaces.includes(space)
        }
        return false
    }

    if (is_mef_space(space) && game.mef_beachhead !== space) {
        return false
    }

    return true
}

// === MANDATED OFFENSIVES ===

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

    if (game.turn === 1 && ap_mo === BRITAIN && use_historical_scenario_rules()) {
        ap_mo = FRANCE
    }

    let cp_roll = roll_die(6)
    let cp_drm = 0
    if (game.events.hoffmann > 0)
        cp_drm = 1
    let cp_index = cp_roll + cp_drm > 6 ? 6 : cp_roll + cp_drm
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

    if (cp_mo === AH_IT && (!nation_at_war(ITALY) || all_capitals_occupied(ITALY))) {
        cp_mo = AUSTRIA_HUNGARY
    }

    if (cp_mo === GERMANY && game.events.h_l_take_command) {
        cp_mo = NONE
    }

    log(`Mandated offensives:`)
    log(`CP: ${fmt_roll(cp_roll, cp_drm)} -> ${nation_name(cp_mo)}`)
    if ((ap_mo == FRANCE) && (game.events.french_mutiny > 0)) {
        log(`AP: W${ap_roll} -> ${card_name(FRENCH_MUTINY)}`)
    } else {
        log(`AP: W${ap_roll} -> ${nation_name(ap_mo)}`)
    }
    log_event_for_rollback("Rolled Mandated Offensives")

    game.ap.mo = ap_mo
    game.cp.mo = cp_mo
}

function get_capitals(nation) {
    return all_capitals_by_nation[nation] ?? []
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

function satisfies_mo(mo, attackers, defenders, space) {
    if (defenders.length === 0)
        return false

    let attacker_nation = mo === AH_IT ? AUSTRIA_HUNGARY : mo
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

    let location = data.spaces[space].nation
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
        return false
    }

    return true
}

states.confirm_mo = {
    inactive: "review mandated offensive roll",
    prompt() {
        if (game[active_faction()].mo === NONE)
            view.prompt = `Turn ${game.turn}: No mandated offensive.`
        else if (game.events.french_mutiny > 0 && game[active_faction()].mo === FRANCE)
            view.prompt = `Turn ${game.turn}: ${card_name(FRENCH_MUTINY)} (instead of mandated offensive).`
        else
            view.prompt = `Turn ${game.turn}: Mandated offensive for ${nation_name(game[active_faction()].mo)}.`
        gen_action_next()
    },
    next() {
        if (game.active === AP_ROLE && game.ap_mo_return_state) {
            game.state = game.ap_mo_return_state
            delete game.ap_mo_return_state
            delete game.ap_mo_confirmation_needed
        } else {
            goto_review_supply_warnings()
        }
    }
}

function interrupt_ap_mo_confirmation() {
    if (game.ap_mo_confirmation_needed && game.active === AP_ROLE) {
        game.ap_mo_return_state = game.state
        game.state = 'confirm_mo'
    }
}

// === PIECE UTILITIES ===

function is_unit_reduced(p) {
    return set_has(game.reduced, p)
}

function is_unit_corps(p) {
    return data.pieces[p].type === CORPS
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

function is_unit_eliminated(p) {
    return game.location[p] === AP_ELIMINATED_BOX || game.location[p] === CP_ELIMINATED_BOX
}

function send_to_eliminated_box(p) {
    if (is_unit_reduced(p))
        set_delete(game.reduced, p)
    if (data.pieces[p].notreplaceable) {
        game.location[p] = PERM_ELIMINATED_BOX
    } else if (data.pieces[p].faction === AP) {
        game.location[p] = AP_ELIMINATED_BOX
    } else {
        game.location[p] = CP_ELIMINATED_BOX
    }
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

function has_unmoved_pieces_in_space(s) {
    for (let p = 1; p < data.pieces.length; ++p)
        if (game.location[p] === s && !set_has(game.moved, p) && !set_has(game.entrenching, p))
            return true
    return false
}

// === GAME UTILITIES ===

// Checks for game state that violates the game rules. In some cases, the game should allow players to get into a state
// that violates the rules temporarily, for example overstacking a space. When in this state, the rule violations are
// returned to the client so the spaces can be highlighted.
// Returns an array of objects with the following properties:
// space: The space that is in violation, or 0 if the violation is not space-specific
// piece: The piece that is in violation, or 0 if the violation is not piece-specific
// rule: The rule that is violated
function check_rule_violations() {
    let violations = []
    get_all_overstacked_spaces().forEach((s) => {
        violations.push({ space: s, piece: 0, rule: "Overstacked" })
    })

    // Check for intact fort spaces with insufficient enemy pieces to begin a siege
    for (let s = 1; s < map_space_count; ++s) {
        if ((has_undestroyed_fort(s, AP) || has_undestroyed_fort(s, CP)) && !is_besieged(s) && game.broken_sieges && !set_has(game.broken_sieges, s)) {
            const enemy_pieces = get_pieces_in_space(s).filter(p => data.pieces[p].faction !== data.spaces[s].faction)
            if (enemy_pieces.length > 0 && !can_besiege(s, enemy_pieces)) {
                violations.push({ space: s, piece: 0, rule: "Insufficient strength to begin a siege" })
            }
        }
    }

    if (game.events.treaty_of_brest_litovsk > 0) {
        for (let s = 1; s < map_space_count; ++s) {
            let has_russian = false
            let has_ap_non_russian = false

            for (let p of get_pieces_in_space(s)) {
                if (data.pieces[p].faction === AP) {
                    if (data.pieces[p].nation === RUSSIA) {
                        has_russian = true
                    } else {
                        has_ap_non_russian = true
                    }
                }
            }

            if (has_ap_non_russian && has_russian) {
                violations.push({ space: s, piece: 0, rule: "After Brest-Litovsk, RU may not stack with AP units"})
            }
        }
    }

    return violations
}

function active_faction() {
    return short_faction(game.active)
}

function short_faction(faction) {
    switch (faction) {
        case AP_ROLE: return AP
        case CP_ROLE: return CP
        default: return game.active
    }
}

function inactive_faction() {
    switch (game.active) {
        case AP_ROLE: return CP
        case CP_ROLE: return AP
        default: return undefined
    }
}

function switch_active_faction() {
    if (game.active === AP_ROLE) {
        game.active = CP_ROLE
    } else if (game.active === CP_ROLE) {
        game.active = AP_ROLE
    }
}

function set_active_faction(faction) {
    switch (faction) {
        case AP:
        case AP_ROLE:
            game.active = AP_ROLE
            break
        case CP:
        case CP_ROLE:
            game.active = CP_ROLE
            break
        default:
            game.active = faction
            break
    }
}

function record_action(type, card) {
    game[active_faction()].actions.push({ type: type, card: card })
}

function get_last_action() {
    let actions = game[active_faction()].actions
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

// === TRENCHES ===

function set_trench_level(s, level, faction) {
    if (faction === undefined)
        faction = is_controlled_by(s, AP) ? AP : CP
    if (level)
        map_set(game[faction].trenches, s, level)
    else
        map_delete(game[faction].trenches, s)
}

function get_trench_level(s, faction) {
    if (faction === undefined)
        faction = is_controlled_by(s, AP) ? AP : CP
    return map_get(game[faction].trenches, s, 0)
}

function get_trench_level_for_attack(s, faction) {
    const base_lvl = get_trench_level(s, faction)
    if (!game.attack)
        return base_lvl

    if (game.attack.trenches_canceled)
        return 0

    if (game.attack.turk_determination)
        return 1

    return base_lvl
}

// === ACTION PHASE ===

function goto_action_phase() {
    let round = game[active_faction()].actions.length + 1
    log_h3(`Turn ${game.turn} -- Action ${round}`)
    game.phase = "Action Phase"
    game.state = 'action_phase'
    save_rollback_point()
}

function is_ops_event_card(c) {
    // Take ops and yellow stripe event cards.
    return (
        /* cp events */
        c === MATA_HARI ||
        c === TSAR_TAKES_COMMAND ||
        c === FALL_OF_THE_TSAR ||
        c === BOLSHEVIK_REVOLUTION ||
        /* ap events */
        c === CLOAK_AND_DAGGER ||
        c === LANDSHIPS ||
        c === YANKS_AND_TANKS ||
        c === KERENSKY_OFFENSIVE ||
        c === BRUSILOV_OFFENSIVE ||
        c === ZIMMERMANN_TELEGRAM ||
        c === OVER_THERE ||
        (c === GREAT_RETREAT && game.options.valiant)
    )
}

states.action_phase = {
    inactive: "play a card",
    prompt() {
        let player_hand = game[active_faction()].hand
        let player_actions = game[active_faction()].actions
        view.prompt = `Turn ${game.turn}, Action ${player_actions.length+1}: Take one action.`
        if (game.turn === 1 && use_historical_scenario_rules() && player_actions.length === 0 && active_faction() === CP) {
            view.prompt += ` You must play "Guns of August"!`
            gen_card_menu(GUNS_OF_AUGUST, true)
        } else {
            const french_mutiny_active = (game.events.french_mutiny > 0 && game[active_faction()].mo === FRANCE)
            if (player_actions.length === 5 && game[active_faction()].mo !== NONE && !french_mutiny_active)
                view.prompt += ` Final round for ${nation_name(game[active_faction()].mo)} mandated offensive!`

            if (active_faction() === CP) {
                if ((game.vp <= 0) && player_actions.length === 5) {
                    view.prompt += ` Final round to avoid AP autovictory (VP is 0)!`
                } else if (game.vp <= 2) {
                    view.prompt += ` CAUTION: VP total now ${game.vp}.`
                }
            } else {
                if ((game.vp >= 20) && player_actions.length === 5) {
                    view.prompt += ` Final round to avoid CP autovictory (VP is ${game.vp})!`
                } else if (game.vp >= 18) {
                    view.prompt += ` CAUTION: VP total now ${game.vp}.`
                }
            }

            for(let card of player_hand) {
                gen_card_menu(card)
            }
            gen_action('single_op')
        }
        // If not playing the Historical scenario, add an action here for offering peace terms
    },
    play_event(card) {
        push_undo()
        if (!is_ops_event_card(card))
            remove_failed_entrench_markers()
        if (data.cards[card].reinfnation) {
            goto_play_reinf(card)
        } else {
            goto_play_event(card)
        }
    },
    play_ops(card) {
        push_undo()
        goto_play_ops(card)
    },
    play_sr(card) {
        push_undo()
        remove_failed_entrench_markers()
        goto_play_sr(card)
    },
    play_rps(card) {
        push_undo()
        remove_failed_entrench_markers()
        goto_play_rps(card)
    },
    single_op() {
        push_undo()
        goto_play_ops(undefined)
    }
}

function gen_card_menu(card, event_only) {
    // 9.5.2.5 - If CP is at Total War and AP is not, AP may only use the Italy and Romania cards for their event
    if ((card === ROMANIA_ENTRY || card === ITALY_ENTRY) && game.cp.commitment === COMMITMENT_TOTAL && game.ap.commitment !== COMMITMENT_TOTAL)
        event_only = true

    if (event_only) {
        if (can_play_event(card))
            gen_action('play_event', card)
    } else {
        if (can_play_event(card))
            gen_action('play_event', card)
        gen_action('play_ops', card)
        if (can_play_sr())
            gen_action('play_sr', card)
        if (can_play_rps())
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

        if (card === MEF && !nation_at_war(TURKEY))
            return false

        return nation_at_war(card_data.reinfnation)
    }

    let evt = events[data.cards[card].event]
    return (evt !== undefined && evt.can_play())
}

function can_play_sr() {
    let action = get_last_action()
    return action === undefined || action.type !== ACTION_SR
}

function can_play_rps() {
    if (game.turn === game.events.influenza)
        return false

    let action = get_last_action()
    return action === undefined || action.type !== ACTION_RP
}

function goto_play_event(card) {
    log(`${card_name(card)} -- Event`)
    let active_player = game[active_faction()]
    array_remove_item(active_player.hand, card)
    game.last_card = card

    if (data.cards[card].remove)
        active_player.removed.push(card)
    else
        active_player.discard.push(card)

    const card_data = data.cards[card]
    if (card_data.ws) {
        active_player.ws += card_data.ws
        logi(`War Status +${card_data.ws} to ${active_player.ws} (${game.ap.ws + game.cp.ws})`)
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
    if (card === undefined) {
        record_action(ACTION_1_OP, card)
        log(`Automatic Operation (1)`)
        game.ops = 1
    } else {
        record_action(ACTION_OP, card)
        log(`${card_name(card)} -- Operations (${data.cards[card].ops})`)
        play_card(card)
        game.ops = data.cards[card].ops
    }
    goto_activate_spaces()
}

// === STRATEGIC REDEPLOYMENT ===

function goto_play_sr(card) {
    record_action(ACTION_SR, card)
    let card_data = data.cards[card]
    game.sr = {
        pts: card_data.sr,
        unit: 0,
        done: []
    }

    log(`${card_name(card)} -- Strategic Redeployment (${card_data.sr})`)
    play_card(card)
    game.state = 'choose_sr_unit'
}

states.choose_sr_unit = {
    inactive: "use strategic redeployment",
    prompt() {
        view.prompt = `Strategic Redeployment: ${game.sr.pts} points left.`
        game.location.forEach((loc, p) => {
            if ((loc !== 0 && loc !== PERM_ELIMINATED_BOX) && data.pieces[p].faction === active_faction() && can_sr(p)) {
                gen_action_piece(p)
            }
        })

        const rule_violations = check_rule_violations()
        if (rule_violations.length === 0) {
            if (game.sr.pts > 0)
                gen_action("confirm_end_sr")
            else
                gen_action("end_action")
        } else {
            gen_action('reset_phase')
        }
    },
    piece(p) {
        push_undo()
        game.sr.unit = p
        game.sr.pts -= sr_cost(p)
        game.state = 'choose_sr_destination'
    },
    confirm_end_sr() {
        this.end_action()
    },
    end_action() {
        end_sr()
        goto_end_action()
    },
    reset_phase() {
        pop_all_undo()
    }
}

function sr_cost(p) {
    return data.pieces[p].type === ARMY ? 4 : 1
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

    // If unit is part of a siege, only allow SR when it would not break the siege
    if (is_besieged(game.location[p])) {
        let other_units = get_pieces_in_space(game.location[p]).filter(unit => unit !== p)
        if (!can_besiege(game.location[p], other_units))
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
    inactive: "use strategic redeployment",
    prompt() {
        view.prompt = `Strategic Redeployment: Move ${piece_name(game.sr.unit)}.`
        view.who = game.sr.unit
        let destinations = get_sr_destinations(game.sr.unit)
        destinations.forEach(gen_action_space)
        if (destinations.length === 0) {
            // (TOR) add faster check that a unit has a destination?
            view.prompt = `Strategic Redeployment: No valid destination for ${piece_name(game.sr.unit)}.`
            if (globalThis.RTT_FUZZER)
                gen_action_skip()
        }
    },
    space(s) {
        set_ne_restriction_flags_for_sr(game.sr.unit, game.location[game.sr.unit], s)
        set_add(game.sr.done, game.sr.unit)
        let from = game.location[game.sr.unit]
        game.location[game.sr.unit] = s
        if (from === AP_RESERVE_BOX || from === CP_RESERVE_BOX)
            log(`${piece_name(game.sr.unit)}${log_corps(game.sr.unit)} SR\n${space_name(from)} -> ${space_name(s)}`)
        else
            log(`${piece_name(game.sr.unit)} SR\n${space_name(from)} -> ${space_name(s)}`)
        game.sr.unit = 0
        game.state = 'choose_sr_unit'
        update_siege(from)
    },
    skip() {
        set_add(game.sr.done, game.sr.unit)
        game.sr.unit = 0
        game.state = 'choose_sr_unit'
    }
}

function get_sr_destinations(unit) {
    let destinations = []
    const start = game.location[unit]
    const nation = data.pieces[unit].nation
    const faction = data.pieces[unit].faction

    if (unit === MONTENEGRIN_CORPS) {
        if (start === AP_RESERVE_BOX && is_controlled_by(CETINJE, AP))
            return [ CETINJE ]
        if (start === CETINJE)
            return [ AP_RESERVE_BOX ]
        return []
    }

    if (start === AP_RESERVE_BOX || start === CP_RESERVE_BOX) {
        // Add all spaces containing a supplied unit of the correct nationality, except ANA Corps and SN Corps
        for (let p of all_pieces_by_nation[nation]) {
            let s = game.location[p]
            if (game.location[p] !== 0 &&
                is_unit_supplied(p) &&
                p !== BRITISH_ANA_CORPS &&
                p !== TURKISH_SN_CORPS) {

                // For Russian units, only allow destinations in Russian spaces
                if (nation === RUSSIA && data.spaces[s].nation !== RUSSIA) {
                    continue
                }

                // Don't allow BEF Corps to SR to spaces they can't enter
                if (is_bef_unit(unit) && !can_bef_enter(s))
                    continue

                set_add(destinations, s)
            }
        }

        // Add all capitals and supply sources in the nation, as long as they are in supply
        if (all_supply_and_capitals_by_nation[nation] !== undefined) {
            for (let s of all_supply_and_capitals_by_nation[nation]) {
                if (is_controlled_by(s, faction) && is_unit_supplied_in(unit, s)) {
                    set_add(destinations, s)
                }
            }
        }

        // If the nation is Serbia, add Salonika, when it is controlled by the allies and in supply
        if (nation === SERBIA && is_unit_supplied_in(unit, SALONIKA) && is_controlled_by(SALONIKA, AP)) {
            set_add(destinations, SALONIKA)
        }

        // If the nation is the US, add all Allied-controlled ports in France
        if (nation === US) {
            for (let s of all_spaces_by_nation[FRANCE]) {
                if (is_controlled_by(s, AP) && is_port(s, AP)) {
                    set_add(destinations, s)
                }
            }
        }

        destinations = destinations.filter(s => is_space_supplied_for_reserve_box_sr(s, unit))

    } else if (data.pieces[unit].type === CORPS && is_space_supplied_for_reserve_box_sr(game.location[unit], unit)) {
        // Corps can SR to the reserve box
        if (faction === AP) {
            set_add(destinations, AP_RESERVE_BOX)
        } else {
            set_add(destinations, CP_RESERVE_BOX)
        }
    }

    // Add spaces that have an overland path
    let overland_destinations = []
    let frontier = [start]
    const block_neareast = !is_neareast_space(start) && !can_enter_neareast([unit])
    while (frontier.length > 0) {
        let current = frontier.pop()
        get_connected_spaces(current, nation).forEach((n) => {
            if (!set_has(destinations, n)
                && is_unit_supplied_in(unit, n)
                && (is_controlled_by(n, faction) || is_besieged(n))) {
                if (nation === RUSSIA && data.spaces[n].nation !== RUSSIA)
                    return

                if (is_blocked_italian_space(n, [unit]) || is_blocked_italian_border_space(n, [unit]))
                    return

                if (is_brest_litovsk_restricted_one(unit, n)) {
                    return
                }

                if (block_neareast && is_neareast_space(n))
                    return

                if (is_bef_unit(unit) && !can_bef_enter(n))
                    return

                set_add(destinations, n)
                set_add(overland_destinations, n)
                frontier.push(n)
            }
        })
    }

    // AP can SR Corps to any friendly-controlled port, CP can SR using ports in Germany and Russia
    if (data.pieces[unit].type === CORPS) {
        if (is_port(start, active_faction())) {
            for (let s = 1; s < map_space_count; s++) {
                if (is_port(s, active_faction()) &&
                    is_controlled_by(s, active_faction()) &&
                    is_unit_supplied_in(unit, s) &&
                    (unit !== BEF_CORPS || can_bef_enter(s))) {
                    set_add(destinations, s)
                }
            }
        }
    }

    // 13.1.11 Capitals and SR: If the enemy controls or besieges a nation’s capital (Paris in the case of France,
    // Vienna or Budapest in the case of A-H), no Corps of that nation may SR to or from the Reserve Box as long as the
    // enemy control lasts. Exception: Belgian and Serb units are not affected by this restriction. The MN unit may not
    // use SR overland. It may SR to and from the Reserve Box.
    if (data.pieces[unit].nation !== BELGIUM && data.pieces[unit].nation !== SERBIA && any_capital_occupied_or_besieged(data.pieces[unit].nation)) {
        set_delete(destinations, AP_RESERVE_BOX)
        set_delete(destinations, CP_RESERVE_BOX)
    }

    // Block NE spaces from consideration
    const is_neareast_start = is_neareast_space(start)
    const all_destinations = [...destinations]
    for (let d of all_destinations) {
        // No special restrictions when SR is entirely within or entirely outside the Near East map
        if (is_neareast_space(d) === is_neareast_start) {
            continue
        }

        // No more than one CP Corps may SR to or from the Near East map per turn. Exception: Turkish Corps do not count against this limit.
        if (game.ne_restrictions.cp_sr && data.pieces[unit].faction === CP && nation !== TURKEY) {
            set_delete(destinations, d)
            continue
        }

        // No more than one Russian Corps (never an Army) may SR to or from the Near East map per turn.
        if (game.ne_restrictions.ru_sr && data.pieces[unit].nation === RUSSIA) {
            set_delete(destinations, d)
            continue
        }

        if (data.pieces[unit].nation === RUSSIA && data.pieces[unit].type === ARMY) {
            set_delete(destinations, d)
            continue
        }

        if (!set_has(overland_destinations, d)) {
            // No more than one British Corps (including the AUS Corps, but not including the CND, PT, or BEF Corps)
            // may use Reserve Box SR to or from Near East or SR by sea to or from the Near East per turn.
            const name = data.pieces[unit].name
            if (data.pieces[unit].nation === BRITAIN) {
                if (game.ne_restrictions.br_sr) {
                    set_delete(destinations, d)
                    continue
                } else if (name.startsWith('BR BEF') || name.startsWith('CND') || name.startsWith('PT')) {
                    set_delete(destinations, d)
                }
            }

            // It is not permitted to use Sea or Reserve Box SR of FR Corps, IT Corps, GR Corps, RO Corps, SB Corps,
            // US Corps, BE Corps, CND, PT, or BEF corps to or from the NE.
            if ([ITALY, FRANCE, GREECE, ROMANIA, SERBIA, US, BELGIUM].includes(data.pieces[unit].nation))
                set_delete(destinations, d)
        }
    }

    // 11.1.9 Amiens, Calais & Ostend restriction
    if (data.pieces[unit].faction === CP) {
        if (game.events.race_to_the_sea === undefined && game.cp.ws < 4) {
            set_delete(destinations, AMIENS)
            set_delete(destinations, CALAIS)
            set_delete(destinations, OSTEND)
        }
    }

    if (game.events.treaty_of_brest_litovsk > 0) {
        destinations = destinations.filter(d => !is_brest_litovsk_restricted_one(unit, d))
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
                && is_unit_supplied_in(p, n)
                && (is_controlled_by(n, active_faction()) || is_besieged(n))) {
                set_add(destinations, n)
                frontier.push(n)
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
        if ((is_neareast_space(game.location[u]) && destination === CAUCASUS) ||
            (is_neareast_space(destination) && game.location[u] === CAUCASUS)) {
            if (data.pieces[u].type === ARMY) {
                return false // Armies cannot cross the neareast/Russia boundary
            }
            if (data.pieces[u].nation === RUSSIA && data.pieces[u].type === CORPS) {
                ru_corps_crossing_count++
            }
        }
    }

    if (ru_corps_crossing_count === 0)
        return true

    // Once Fall of the Tsar has been played, no Russian corps can cross this boundary by move, advance, or retreat
    if (game.events.fall_of_the_tsar > 0)
        return false

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

function is_brest_litovsk_restricted_one(p, destination) {
    if (destination === AP_RESERVE_BOX || destination === CP_RESERVE_BOX)
        return false

    if (game.events.treaty_of_brest_litovsk > 0 && data.pieces[p].faction === AP) {
        return (
            (data.pieces[p].nation === RUSSIA && has_non_russian_ap_piece(destination)) ||
            (data.pieces[p].nation !== RUSSIA && has_russian_piece(destination))
        )
    }
    return false
}

function is_brest_litovsk_restricted_group(pieces, destination) {
    if (game.events.treaty_of_brest_litovsk > 0 && data.pieces[pieces[0]].faction === AP) {
        return (
            (pieces.some(p => data.pieces[p].nation === RUSSIA) && has_non_russian_ap_piece(destination)) ||
            (pieces.some(p => data.pieces[p].nation !== RUSSIA) && has_russian_piece(destination))
        )
    }
    return false
}

// === REPLACEMENTS ===

function goto_play_rps(card) {
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

    if (game.events.over_there > 0 && card_data.faction === AP) {
        game.rp.us += 1
    }

    log(`${card_name(card)} -- Replacement Points`)
    play_card(card)
    log('Total RPs:')
    if (active_faction() === AP) {
        ['fr', 'br', 'ru', 'it', 'us', 'allied'].forEach((type) => {
            if (game.rp[type] > 0)
                logi(`${nation_name(type)}: ${game.rp[type]}`)
        })
    } else {
        ['ge', 'ah', 'bu', 'tu'].forEach((type) => {
            if (game.rp[type] > 0)
                logi(`${nation_name(type)}: ${game.rp[type]}`)
        })
    }
    game.state = 'rps'
}

states.rps = {
    inactive: "record replacements",
    prompt() {
        if (active_faction() === AP) {
            view.prompt = `Replacements: ${game.rp.fr} FR, ${game.rp.br} BR, ${game.rp.ru} RU, ${game.rp.it} IT, ${game.rp.us} US, ${game.rp.allied} Allied.`
        }
        else {
            view.prompt = `Replacements: ${game.rp.ge} GE, ${game.rp.ah} AH, ${game.rp.bu} BU, ${game.rp.tu} TU.`
        }
        gen_action("end_action")
    },
    end_action() {
        goto_end_action()
    }
}

// === REINFORCEMENTS ===

function goto_play_reinf(card) {
    const card_data = data.cards[card]
    record_action(ACTION_REINF, card)
    game.reinf_this_turn[card_data.reinfnation] = 1

    log(`${card_name(card)} -- Reinforcement Event`)
    let active_player = game[active_faction()]
    array_remove_item(active_player.hand, card)
    game.last_card = card
    if (card_data.remove)
        active_player.removed.push(card)
    else
        active_player.discard.push(card)

    if (card_data.ws) {
        active_player.ws += card_data.ws
        logi(`War Status +${card_data.ws} to ${active_player.ws} (${game.ap.ws + game.cp.ws})`)
        update_us_entry()

        //BR// Turn track event markers for the WS-generating reinforcement cards
        if (card === BRITISH_REINFORCEMENTS_2) game.events.br1 = game.turn; // Yes BR1 is BR2 and BR2 is BR1.
        if (card === BRITISH_REINFORCEMENTS_1) game.events.br2 = game.turn;
        if (card === MEF) game.events.mef = game.turn;
        if (card === ALLENBY) game.events.allenby = game.turn;
    }

    if (!game.events.reinforcements)
        game.events.reinforcements = []
    game.events.reinforcements.push(card)

    let piece_nation = card_data.reinfnation
    if (card === LIBYAN_REVOLT)
        piece_nation = 'sn' // This card counts as Turkish reinforcements but places the 'sn' piece
    if (card === ARAB_NORTHERN_ARMY)
        piece_nation = 'ana' // This card counts as British reinforcements but places the 'ana' piece

    game.reinforcements = []
    let reinf_names = card_data.reinf.split('|')
    let quantities = {}
    reinf_names.forEach(name => {
        if (!quantities[name])
            quantities[name] = 0
        quantities[name]++
    })
    for (let name in quantities) {
        let pieces = find_n_unused_pieces(piece_nation, name, quantities[name])
        game.reinforcements.push(...pieces)
    }
    game.state = 'place_reinforcements'
}

states.place_reinforcements = {
    inactive: "place reinforcements",
    prompt() {
        if (game.reinforcements.length > 0) {
            const first_piece = game.reinforcements[0]
            const first_piece_data = data.pieces[first_piece]
            view.prompt = `Reinforcements: Place ${nation_name(first_piece_data.nation)} ${piece_name(first_piece)}.`

            const spaces = get_available_reinforcement_spaces(first_piece)
            spaces.forEach((s) => {
                gen_action_space(s)
            })

            if (spaces.length === 0) {
                view.prompt = `Reinforcements: No valid destination for ${piece_name(first_piece)}.`
                gen_action_skip()
            }
        } else {
            view.prompt = `Reinforcements: Done.`
            gen_action_done()
        }
    },
    space(s) {
        push_undo()
        const p = game.reinforcements.shift()
        game.location[p] = s
        set_delete(game.reduced, p)
        log(`${piece_name(p)}${log_corps(p)} placed in ${space_name(s)}`)

        if (neareast_armies.includes(p) && data.spaces[s].map !== 'neareast' && !is_mef_space(s) && s !== SALONIKA) {
            log(`${piece_name(p)} is a NE army placed outside the Near East, it will not be able to operate on the Near East map`)
            set_add(game.ne_armies_placed_outside_neareast, p)
        }

        if (is_mef_space(s)) {
            game.mef_beachhead = s
            log(`MEF beachhead established in ${space_name(s)}`)
        }
        set_control(s, active_faction())
    },
    skip() {
        push_undo()
        const p = game.reinforcements.shift()
        game.location[p] = 0
        log(`${piece_name(p)} could not be placed`)
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
    if (piece_data.name === 'FR Orient' && is_space_at_war(SALONIKA) && !is_fully_stacked(SALONIKA, active_faction()) && is_controlled_by(SALONIKA, AP)) {
        spaces.push(SALONIKA)
    } else if (piece_data.name === 'BR NE' && game.events.sinai_pipeline > 0 && !is_fully_stacked(ALEXANDRIA, active_faction()) && is_controlled_by(ALEXANDRIA, AP)) {
        spaces.push(ALEXANDRIA)
    } else if (piece_data.name === 'RU CAU') {
        // any supplied space in Russia on the NE map
        for (let s of all_spaces_by_nation[RUSSIA]) {
            if (data.spaces[s].map === 'neareast' && is_unit_supplied_in(p, s) && !is_fully_stacked(s, AP) && is_controlled_by(s, AP)) {
                if (!is_brest_litovsk_restricted_one(p, s)) {
                    spaces.push(s)
                }
            }
        }
    } else if (piece_data.name === 'BR MEF' && !game.events.salonika) {
        spaces.push(MEF1)
        spaces.push(MEF2)
        spaces.push(MEF3)
        spaces.push(MEF4)
    }

    // US Armies can only be placed at unbesieged ports in France
    if (nation === US) {
        for (let s of all_spaces_by_nation[FRANCE]) {
            if (is_port(s, AP) && is_controlled_by(s, active_faction()) && !is_besieged(s) && !is_fully_stacked(s, AP)) {
                spaces.push(s)
            }
        }
        return spaces
    }

    // Friendly-controlled capitals can receive armies
    const capitals = get_capitals(nation)
    for (let c of capitals) {
        if (is_controlled_by(c, active_faction()) && is_unit_supplied_in(p, c) && !is_fully_stacked(c, active_faction())) {
            spaces.push(c)
        }
    }

    // Friendly supply sources in the right nation can receive armies
    for (let s of all_spaces_by_nation[nation]) {
        if (data.spaces[s].supply && is_controlled_by(s, active_faction()) && is_unit_supplied_in(p, s) && !is_fully_stacked(s, active_faction())) {
            spaces.push(s)
        }
    }

    // If Paris is fully stacked, but not besieged or captured, French reinforcements can go in Orleans
    if (nation === FRANCE &&
        is_fully_stacked(PARIS, active_faction()) &&
        is_controlled_by(PARIS, active_faction()) &&
        is_controlled_by(ORLEANS, active_faction()) &&
        is_unit_supplied_in(p, ORLEANS) &&
        !is_fully_stacked(ORLEANS, active_faction())
    ) {
        spaces.push(ORLEANS)
    }

    return spaces
}

function roll_peace_terms(faction_offering, combined_war_status) {
    clear_undo()
    let roll = roll_die(6)
    let result = 'No effect'
    if (roll <= 2 || (roll === 3 && combined_war_status < 20)) {
        game.vp += faction_offering === AP ? -1 : 1
        result = faction_offering === AP ? '-1 VP' : '+1 VP'
    } else if (roll === 6) {
        game.vp += faction_offering === AP ? 1 : -1
        result = faction_offering === AP ? '+1 VP' : '-1 VP'
    }

    log(`Peace terms roll: ${fmt_roll(roll, 0, faction_offering)} -> ${result}`)
    log_event_for_rollback("Rolled peace terms")
}

function goto_activate_spaces() {
    game.state = 'activate_spaces'
    game.activation_cost = []
}

function push_activation_cost(space, cost) {
    if (!game.activation_cost) game.activation_cost = []
    map_set(game.activation_cost, space, cost)
}

function can_activate_piece_in_space_to_attack(p, s, used_ne_activation) {
    if (get_season() === SEASON_SUMMER && data.spaces[s].terrain === DESERT)
        // Cannot activate desert spaces to attack in the summer
        return false

    if (active_faction() === AP && used_ne_activation && is_neareast_space(s)) {
        // The Allied player may Activate only one space per Action Round for combat on the Near East
        // map. This applies to spaces actually on the NE map. Units in spaces not on the NE map may
        // still attack into the NE map. (e.g., Adrianople, Gallipoli, Balikesir.) Exceptions: The MEF
        // Beachhead space and the space containing the British NE Army do not count against this limit.
        if (is_mef_space(s) || game.location[BRITISH_NE_ARMY] === s) {
            if (get_attackable_spaces([p]).length > 0)
                return true
        }
        return false
    }

    // London must be exempt from this filtering based on attackable spaces, because it never has
    // an attackable space on its own, only in combination with units in France or Belgium.
    if (s === LONDON || get_attackable_spaces([p]).length > 0)
        return true

    // If the space is adjacent to a besieged space, allow activation to attack because the player could
    // move out of the besieged space and then attack.
    const connected = get_connected_spaces_for_pieces(s, [p])
    for (let conn of connected) {
        if (is_controlled_by(conn, inactive_faction()) && is_besieged(conn))
            return true
    }

    return false
}

states.activate_spaces = {
    inactive: "activate spaces",
    prompt() {
        view.prompt = `Activate spaces for movement or combat: ${game.ops} ops left.`

        const used_ne_activation = game.activated.attack.some(
            (s) => is_neareast_space(s) && !is_mef_space(s) && s !== game.location[BRITISH_NE_ARMY]
        )

        let move_spaces = []
        let attack_spaces = []

        for (let p of all_pieces_by_faction[active_faction()]) {
            if (set_has(game.oos_pieces, p))
                continue

            let s = game.location[p]
            if (s === 0 || s >= AP_RESERVE_BOX || !is_space_at_war(s))
                continue
            if (set_has(game.activated.move, s) || set_has(game.activated.attack, s))
                continue

            if (!set_has(move_spaces, s) && game.ops >= cost_to_activate(s, MOVE))
                set_add(move_spaces, s)

            if (!set_has(attack_spaces, s) && game.ops >= cost_to_activate(s, ATTACK) && can_activate_piece_in_space_to_attack(p, s, used_ne_activation))
                set_add(attack_spaces, s)
        }

        for (let s of move_spaces)
            gen_action("activate_move", s)

        for (let s of attack_spaces) {
            let menu_action = "activate_attack"
            if ((active_faction() === AP) && is_french_mutiny_mo()) {
                const nation = data.spaces[s].nation
                if ((nation === FRANCE || nation === BELGIUM || nation === GERMANY)) {
                    if (all_pieces_by_nation[FRANCE].some(p => game.location[p] === s) &&
                        !all_pieces_by_nation[US].some(p => game.location[p] === s)) {
                        menu_action = "activate_attack_mutiny"
                    }
                }
            }
            gen_action(menu_action, s)
        }

        gen_action_skip()
    },
    activate_move(s) {
        push_undo()
        set_add(game.activated.move, s)
        let cost = cost_to_activate(s, MOVE)
        game.ops -= cost
        push_activation_cost(s, cost)
        if (!game.sud_army_space && is_possible_sud_army_stack(get_pieces_in_space(s))) {
            game.sud_army_space = s
        }
        if (game.ops === 0)
            start_action_round()
    },
    activate_attack_mutiny(s) {
        this.activate_attack(s)
    },
    activate_attack(s) {
        push_undo()
        set_add(game.activated.attack, s)
        let cost = cost_to_activate(s, ATTACK)
        game.ops -= cost
        push_activation_cost(s, cost)
        if (!game.sud_army_space && is_possible_sud_army_stack(get_pieces_in_space(s))) {
            game.sud_army_space = s
        }
        if (game.ops === 0)
            start_action_round()
    },
    skip() {
        log(`Skipped ${game.ops} OPs`)
        start_action_round()
    }
}

// === ACTION ROUNDS ===

function start_action_round() {
    game.ops = 0
    game.eligible_attackers = []
    game.moved = []
    game.attacked = []
    game.ineligible_for_siege = []
    game.retreated = []

    if (game.activated.move.length > 0) {
        log("Move")
        for (let s of game.activated.move) {
            let cost = game.activation_cost ? map_get(game.activation_cost, s, 1) : 1
            log(">" + space_name(s) + ((cost > 1) ? " (" + cost + " OPs)" : ""))
        }
    }

    if (game.activated.attack.length > 0) {
        log("Attack")
        for (let s of game.activated.attack) {
            let cost = game.activation_cost ? map_get(game.activation_cost, s, 1) : 1
            log(">" + space_name(s) + ((cost > 1) ? " (" + cost + " OPs)" : ""))
        }
    }

    game.location.forEach((s, p) => {
        if (set_has(game.activated.attack, s) && !set_has(game.oos_pieces, p)) {
            set_add(game.eligible_attackers, p)
        }
    })
    next_move_activation()
}

function next_move_activation() {
    if (game.activated.move.length > 0) {
        start_move_activation()
    } else {
        if (check_rule_violations().length > 0) {
            game.state = 'confirm_move_violations'
        } else {
            goto_trench_rolls()
        }
    }
}

function next_attack_activation() {
    // filter out eligible attackers that have no remaining legal attacks
    game.eligible_attackers = game.eligible_attackers.filter(p =>
        game.location[p] === LONDON || get_attackable_spaces([p]).length > 0
    )

    // remove attack markers with no eligible attackers remaining
    game.activated.attack = game.activated.attack.filter(s => game.eligible_attackers.some(p => game.location[p] === s))

    if (game.eligible_attackers.length > 0) {
        start_attack_activation()
    } else {
        game.state = "end_operations"
    }
}

function start_move_activation() {
    game.move = {
        initial: 0,
        current: 0,
        spaces_moved: 0,
        pieces: []
    }
    game.state = 'choose_move_space'
}

function start_attack_activation() {
    update_supply()
    game.attack = {
        pieces: [],
        space: 0,
        attacker: active_faction(),
        attacker_drm: 0,
        defender_drm: 0,
        combat_cards: [], // Combat cards selected for use in this attack
        new_combat_cards: [] // CC played during this attack
    }
    game.state = 'choose_attackers'
}

function end_move_activation() {
    // update supply after each move (except the last, as the attack/end-action will update for us)
    if (game.activated.move.length + game.entrenching.length > 0)
        update_supply() // TODO -- move to after each stack moves instead for more granularity?
    if (game.move) {
        set_delete(game.activated.move, game.move.initial)
        game.move = null
    }
    next_move_activation()
}

function end_attack_activation() {
    if (game.attack.used_peace_offensive && !game.attack.did_advance) {
        log(`${faction_name(active_faction())} failed to advance after using ${card_name(PEACE_OFFENSIVE)}, -1 VP`)
        game.vp--
        record_score_event(-1, PEACE_OFFENSIVE)
    }

    log_br()

    if (game.eligible_attackers.length === 0)
        game.activated.attack = []

    // We set game.attack to 0 instead of null to signal to the client that we have attacked this round.
    // This is checked for the snapshot "last turn" quick view to decide if it should show the last snapshot
    // or the penultimate snapshot.
    // We need this because we skip snapshots for attack actions.
    game.attack = 0

    next_attack_activation()
}

function remove_failed_entrench_markers() {
    game.failed_entrench = game.failed_entrench.filter(p => data.pieces[p].faction !== active_faction())
}

function goto_trench_rolls() {
    if (game.failed_entrench) {
        // remove expiring failed attempt markers (where we won't be rolling again)
        game.failed_entrench = game.failed_entrench.filter(p =>
            data.pieces[p].faction !== active_faction() || set_has(game.entrenching, p)
        )
    }
    if (game.entrenching.length > 0)
        game.state = "trench_rolls"
    else
        next_attack_activation()
}

states.trench_rolls = {
    inactive: "entrench",
    prompt() {
        view.prompt = `Roll for entrench attempts in ${space_list(game.entrenching.map(p => game.location[p]))}.`
        for (let p of game.entrenching)
            gen_action_space(game.location[p])
    },
    space(s) {
        this.piece(game.entrenching.find(p => game.location[p] === s))
    },
    piece(p) {
        clear_undo()
        const roll = roll_die(6)
        let drm = 0
        if (game.failed_entrench) {
            if (set_has(game.failed_entrench, p))
                drm = -1
        }
        log(`Entrench attempt in ${space_name(game.location[p])}`)
        log_event_for_rollback(`Entrench roll in ${space_name(game.location[p])}`)
        const success = roll+drm <= get_piece_lf(p)
        if (success) {
            logi(`${fmt_roll(roll, drm)} -> Success`)
            let lvl = get_trench_level(game.location[p], active_faction())
            set_trench_level(game.location[p], lvl+1, active_faction())
            if (game.failed_entrench)
                set_delete(game.failed_entrench, p)
        } else {
            logi(`${fmt_roll(roll, drm)} -> Failure`)
            if (game.failed_entrench) {
                const nation = data.pieces[p].nation
                if (nation === GERMANY || nation === BRITAIN || nation === FRANCE || nation === ITALY) {
                    set_add(game.failed_entrench, p)
                }
            }
        }

        set_delete(game.entrenching, p)
        if (game.entrenching.length === 0)
            next_attack_activation()
    },
}

states.end_operations = {
    inactive: 'end operations',
    prompt() {
        view.prompt = "Operations: Done."
        gen_action("end_action")
    },
    end_action() {
        goto_end_action()
    },
}

function goto_end_action() {
    // Clean up state that is per action round
    delete game.moved
    delete game.attacked
    delete game.ineligible_for_siege
    delete game.retreated
    delete game.sud_army_space
    game.attack = null

    update_supply()

    game.action_state = {} // Reset any state that lasts for the action round

    clear_undo()

    if (active_faction() === AP && game.events.high_seas_fleet > 0) {
        log(`${faction_name(AP)} did not play ${card_name(GRAND_FLEET)} this action round, ${card_name(HIGH_SEAS_FLEET)} +1 VP`)
        game.vp++
        record_score_event(1, HIGH_SEAS_FLEET)
        delete game.events.high_seas_fleet
    }

    update_us_entry()
    update_russian_capitulation()

    if (game.ap.actions.length < 6 || game.cp.actions.length < 6) {
        clear_undo()
        switch_active_faction()
        goto_review_supply_warnings()
    } else {
        goto_attrition_phase()
    }
}

function can_entrench() {
    return game.events.entrench > 0
}

function update_us_entry() {
    const previous_level = game.us_entry
    if (game.events.over_there > 0) {
        game.us_entry = 3
        if (previous_level < 2) log_h3(`US Commitment Track has reached ${card_name(OVER_THERE)}!`) // (The ! is verbatim from the playing board)
    } else if (game.events.zimmermann_telegram > 0) {
        game.us_entry = 2
        if (previous_level < 2) log_h3(`US Commitment Track has reached ${card_name(ZIMMERMANN_TELEGRAM)}`)
    } else if (events.zimmermann_telegram.can_play()) {
        game.us_entry = 1
        if (previous_level < 1) log_h3(`US Commitment: ${card_name(ZIMMERMANN_TELEGRAM)} can now be played`)
    } else {
        game.us_entry = 0
    }
}

function update_russian_capitulation() {
    const previous_level = game.russian_capitulation
    if (game.events.treaty_of_brest_litovsk > 0) {
        game.russian_capitulation = 7
        if (previous_level < 7) {
            log_h3(`Russian Capitulation Track reaches ${card_name(TREATY_OF_BREST_LITOVSK)}`)
        }
    } else if (game.events.bolshevik_revolution > 0) {
        game.russian_capitulation = 6
        if (previous_level < 6) {
            log_h3(`Russian Capitulation Track reaches ${card_name(BOLSHEVIK_REVOLUTION)}`)
        }
    } else if (events.bolshevik_revolution.can_play()) {
        game.russian_capitulation = 5
        if (previous_level < 5) log_h3(`Russian Capitulation: ${card_name(BOLSHEVIK_REVOLUTION)} can now be played`)
    } else if (game.events.fall_of_the_tsar > 0) {
        game.russian_capitulation = 4
        if (previous_level > 4) {
            log_h3(`Russian Capitulation: ${card_name(BOLSHEVIK_REVOLUTION)} can no longer be played`)
        } else if (previous_level < 4) {
            log_h3(`Russian Capitulation Track reaches ${card_name(FALL_OF_THE_TSAR)}`)
        }
    } else if (events.fall_of_the_tsar.can_play()) {
        game.russian_capitulation = 3
        if (previous_level < 3) log_h3(`Russian Capitulation: ${card_name(FALL_OF_THE_TSAR)} can now be played`)
    } else if (game.events.tsar_takes_command > 0) {
        game.russian_capitulation = 2
        if (previous_level > 2) {
            log_h3(`Russian Capitulation: ${card_name(FALL_OF_THE_TSAR)} can no longer be played`)
        } else if (previous_level < 2) {
            log_h3(`Russian Capitulation Track reaches ${card_name(TSAR_TAKES_COMMAND)}`)
        }
    } else if (events.tsar_takes_command.can_play()) {
        game.russian_capitulation = 1
        if (previous_level < 1) log_h3(`Russian Capitulation: ${card_name(TSAR_TAKES_COMMAND)} can now be played`)
    } else {
        game.russian_capitulation = 0
        if (previous_level > 0) log_h3(`Russian Capitulation: ${card_name(TSAR_TAKES_COMMAND)} can no longer be played`)
    }
}

// === MOVE STATES ===

states.choose_move_space = {
    inactive: 'move',
    prompt() {
        if (can_entrench())
            view.prompt = `Move units (or entrench) in spaces activated for movement.`
        else
            view.prompt = `Move units in spaces activated for movement.`

        let can_move = false
        game.activated.move.forEach((s) => {
            for_each_piece_in_space(s, (p) => {
                if (get_piece_mf(p) > 0 && !set_has(game.entrenching, p) && !set_has(game.moved, p) && !set_has(game.oos_pieces, p)) {
                    gen_action_piece(p)
                    can_move = true
                }
            })
        })

        if (!can_move) {
            if (game.activated.attack.length + game.entrenching.length > 0)
                gen_action_done()
            else
                gen_action("end_action")
        }
    },
    piece(p) {
        push_undo()
        let s = game.location[p]
        log_br()
        log("Moved from " + space_name(s))
        game.move.initial = s
        game.move.current = s
        game.move.pieces = [ p ]
        game.state = "choose_pieces_to_move"
    },
    done() {
        push_undo()
        game.activated.move.length = 0
        end_move_activation()
    },
    end_action() {
        this.done()
        game.activated.move.length = 0
        end_move_activation()
    },
}

states.place_event_trench = {
    inactive: 'place trench',
    prompt() {
        view.prompt = `Place a trench in a space with a supplied friendly army.`

        let spaces = []
        for (let p = 1; p < data.pieces.length; p++) {
            if (game.location[p] !== 0 &&
                data.pieces[p].faction === active_faction() &&
                data.pieces[p].type === ARMY &&
                get_trench_level(game.location[p], active_faction()) === 0 &&
                is_unit_supplied(p) &&
                is_controlled_by(game.location[p], active_faction())) {
                set_add(spaces, game.location[p])
            }
        }
        spaces.forEach(gen_action_space)

        if (spaces.length === 0) {
            gen_action_skip()
        }

    },
    space(s) {
        push_undo()
        log(`Placed a trench in ${space_name(s)}`)
        set_trench_level(s, 1, active_faction())
        goto_end_event()
    },
    skip() {
        push_undo()
        goto_end_event()
    }
}

function can_entrench_with_selected() {
    if (!can_entrench())
        return false
    if (game.move.spaces_moved > 0 || game.move.pieces.length !== 1)
        return false
    let s = game.move.initial
    let p = game.move.pieces[0]
    return (
        data.pieces[p].type === ARMY &&
        (is_controlled_by(s, active_faction()) || is_besieged(s)) &&
        get_trench_level(s, active_faction()) < 2 &&
        game.entrenching.every(pp => game.location[pp] !== s)
    )
}

function better_entrencher_available() {
    let s = game.move.initial
    let p = game.move.pieces[0]
    if (!game.failed_entrench) return false
    if (set_has(game.failed_entrench, p)) return false
    return game.failed_entrench.some(pp => game.location[pp] === s)
}

states.choose_pieces_to_move = {
    inactive: 'move',
    prompt() {
        if (game.move.pieces.length > 0)
            view.prompt = `Move ${piece_list(game.move.pieces)} from ${space_name(game.move.initial)}.`
        else
            view.prompt = `Move units from ${space_name(game.move.initial)}.`
        for_each_piece_in_space(game.move.initial, (p) => {
            if (get_piece_mf(p) > 0 && !set_has(game.entrenching, p) && !set_has(game.moved, p) && !set_has(game.move.pieces, p) && !set_has(game.oos_pieces, p)) {
                gen_action_piece(p)
            }
        })

        if (can_entrench_with_selected()) {
            view.prompt = `Move ${piece_name(game.move.pieces[0])} from ${space_name(game.move.initial)} or attempt to entrench.`

            if (better_entrencher_available()) {
                gen_action("confirm_odd_entrench")
            } else {
                gen_action("entrench")
            }
        }

        if (game.move.pieces.length > 0) {
            let spaces = get_eligible_spaces_to_move()
            // A player should usually not get into a state where they
            // have activated a space for movement where they cannot move;
            // but the fuzzer will!
            // If armies in space have been chosen to entrench, you may not want to move the remaining corps.
            if (spaces.length === 0)
                gen_action("stop")
            spaces.forEach(gen_action_space)
        } else {
            view.actions.done = 1
        }
    },
    piece(p) {
        if (game.move.pieces.length === 0)
            push_undo()
        set_add(game.move.pieces, p)
    },
    confirm_odd_entrench() {
        this.entrench()
    },
    entrench() {
        push_undo()
        let p = game.move.pieces.pop()
        log(`>${piece_name(p)} entrench`)
        set_add(game.entrenching, p)
        // If there are no pieces left to move, deactivate the space
        if (get_pieces_in_space(game.location[p]).every((piece) => set_has(game.entrenching, piece) || set_has(game.moved, piece)))
            end_move_activation()
    },
    stop() {
        end_move_stack()
    },
    space(s) {
        push_undo()
        move_stack_to_space(s)
        if (must_stop_moving(s))
            end_move_stack()
        else
            game.state = 'move_stack'
    },
    done() {
        push_undo()
        end_move_activation()
    },
}

function get_eligible_spaces_to_move() {
    if (is_besieged(game.move.current)) {
        let units_in_space_after_move = []
        for_each_piece_in_space(game.move.current, (p) => {
            if (!set_has(game.move.pieces, p))
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

    let is_last_space = game.move.spaces_moved + 1 === lowest_mf
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
            const blocked_end_space = is_last_space && !can_end_move(conn, game.move.pieces)
            if (!blocked_end_space && can_move_to(conn, game.move.pieces))
                spaces.push(conn)
        })
    }
    return spaces
}

function can_take_control(pieces) {
    /* ANAc cannot take control */
    if (pieces.length === 1 && pieces[0] === BRITISH_ANA_CORPS)
        return false
    return true
}

function move_stack_to_space(s) {
    if (is_besieged(game.move.current)) {
        let pieces_remaining = []
        for_each_piece_in_space(game.move.current, (p) => {
            if (!set_has(game.move.pieces, p))
                pieces_remaining.push(p)
        })
        if (!can_besiege(game.move.current, pieces_remaining)) {
            set_delete(game.forts.besieged, game.move.current)
        }
    }

    if (set_has(game.broken_sieges, game.move.current)) {
        set_delete(game.broken_sieges, game.move.current)
    }

    update_russian_ne_restriction_flag(game.move.pieces, game.move.current, s)

    game.move.pieces.forEach((p) => {
        if (game.failed_entrench)
            set_delete(game.failed_entrench, p)
        game.location[p] = s
    })
    game.move.spaces_moved++
    game.move.current = s

    if (set_has(game.broken_sieges, s)) {
        set_delete(game.broken_sieges, s)
    }

    capture_trench(s, active_faction())

    if (!has_undestroyed_fort(s, other_faction(active_faction()))) {
        if (can_take_control(game.move.pieces))
            set_control(s, active_faction())
    }
}

function drop_off_moving_piece(p) {
    log_piece_move(p)
    set_delete(game.move.pieces, p)
    set_add(game.moved, p)
}

function must_stop_moving() {
    return (
        !is_controlled_by(game.move.current, active_faction()) &&
        has_undestroyed_fort(game.move.current, other_faction(active_faction())) &&
        !is_besieged(game.move.current)
    )
}

states.move_stack = {
    inactive: 'move',
    prompt() {
        view.prompt = `Move ${piece_list(game.move.pieces)} from ${space_name(game.move.current)}.`

        get_eligible_spaces_to_move().forEach(gen_action_space)

        if (can_end_move(game.move.current, game.move.pieces)) {
            game.move.pieces.forEach((p) => {
                gen_action_piece(p)
            })
            gen_action('stop')
        }
    },
    space(s) {
        push_undo()
        move_stack_to_space(s)

        if (must_stop_moving()) {
            end_move_stack()
            return
        }

        let to_stop = game.move.pieces.filter(p => get_piece_mf(p) === game.move.spaces_moved)
        for (let p of to_stop)
            drop_off_moving_piece(p)

        if (game.move.pieces.length === 0)
            end_move_stack()
    },
    piece(p) {
        push_undo()
        drop_off_moving_piece(p)
        if (game.move.pieces.length === 0)
            end_move_stack()
    },
    stop() {
        push_undo()
        end_move_stack()
    }
}

function set_control_bit(i, x) {
    var word = i >> 5
    var bit = i & 31
    if (x)
        game.control[word] |= (1 << bit)
    else
        game.control[word] &= ~(1 << bit)
}

function get_control_bit(i) {
    var word = i >> 5
    var bit = i & 31
    return (game.control[word] >>> bit) & 1
}

function set_control(s, faction) {
    const new_control = faction === CP ? 1 : 0
    if (get_control_bit(s) === new_control)
        return

    if (data.spaces[s].vp) {
        const is_russian = data.spaces[s].nation === RUSSIA
        if (faction === AP) {
            game.vp--
            logi(`-1 VP ${space_name(s)} captured`)
            if (is_russian) game.cp.ru_vp--
        } else {
            logi(`+1 VP ${space_name(s)} captured`)
            game.vp++
            if (is_russian) game.cp.ru_vp++
        }
    }

    if (s === game.mef_beachhead && !game.mef_beachhead_captured && faction === CP) {
        log(`MEF beachhead captured`)
        game.mef_beachhead_captured = true
    }

    set_control_bit(s, new_control)

    update_russian_capitulation()
}

function update_ana_vp() {
    if (game.ana_prev === game.location[BRITISH_ANA_CORPS])
        return

    // ANA was in this space, but it's now CP controlled. Update VP.
    if (game.ana_prev && is_controlled_by(game.ana_prev, CP) && data.spaces[game.ana_prev].vp) {
        game.vp++
        logi(`+1 VP ${space_name(game.ana_prev)} captured`)
    }

    // ANA is now controlling a new space, and it was CP controlled. Update VP.
    if (get_control_bit(game.location[BRITISH_ANA_CORPS]) === 1 && is_controlled_by(game.location[BRITISH_ANA_CORPS], AP) && data.spaces[game.location[BRITISH_ANA_CORPS]].vp) {
        game.vp--
        logi(`-1 VP ${space_name(game.location[BRITISH_ANA_CORPS])} captured`)
    }

    game.ana_prev = game.location[BRITISH_ANA_CORPS]
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

    let controlling_faction = get_control_bit(s) ? CP : AP
    if (game.location[BRITISH_ANA_CORPS] === s && !has_undestroyed_fort(s, CP)) {
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
    for (let p of all_pieces_by_nation[nation])
        if (game.location[p] === s)
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
    let contains_enemy = contains_piece_of_faction(s, other_faction(active_faction()))
    if (contains_enemy)
        return false

    if (is_blocked_italian_space(s, moving_pieces))
        return false

    // No units may enter a MEF space unless the MEF Beachhead marker is in the space.
    if (is_mef_space(s) && game.mef_beachhead !== s) {
        return false
    }

    // Units may not enter a space in a neutral nation, but all units may freely enter any nation immediately after it
    // enters the war.
    if (!is_space_at_war(s))
        return false

    // Neither the BEF Corps nor Army may move in or attack into any space outside Britain, France, Belgium, and Germany.
    if (moving_pieces.some(is_bef_unit) && !can_bef_enter(s))
        return false

    if (is_neareast_space(s) && !can_enter_neareast(moving_pieces)) {
        return false
    }

    //  15.1.12 Russian units may not attack, enter, or besiege a German fort space during the August 1914 turn.
    if (game.turn === 1
        && moving_pieces.some((p) => data.pieces[p].nation === RUSSIA)
        && data.spaces[s].nation === GERMANY
        && has_undestroyed_fort(s, CP)) {
        return false
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
        if (data.pieces[p].type === ARMY && (!neareast_armies.includes(p) || set_has(game.ne_armies_placed_outside_neareast, p))) {
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

function get_all_overstacked_spaces() {
    let stacks = new Array(map_space_count).fill(0)
    for (let p = 1; p < data.pieces.length; ++p) {
        stacks[game.location[p]]++
    }
    let overstacked = []
    for (let s = 1; s < map_space_count; ++s) {
        if (stacks[s] > STACKING_LIMIT) {
            overstacked.push(s)
        }
    }
    return overstacked
}

function can_end_move(s, pieces) {
    if (set_has(game.activated.attack, s))
        return false

    if (active_faction() === CP && !game.events.race_to_the_sea && (s === AMIENS || s === CALAIS || s === OSTEND) && game.cp.ws < 4)
        return false

    if (is_blocked_italian_border_space(s, pieces))
        return false

    return true
}

function is_blocked_italian_space(s, pieces) {
    if (game.ap.commitment === COMMITMENT_TOTAL)
        return false // Once AP is at Total War, there are no restrictions

    const space_nation = data.spaces[s].nation
    if (space_nation === ITALY) {
        // Only Italian and Austrian armies may enter Italian spaces
        return pieces.some((p) => data.pieces[p].type === ARMY && data.pieces[p].nation !== ITALY && data.pieces[p].nation !== AUSTRIA_HUNGARY)
    }

    return false
}

const italian_border_spaces = [TRENT, VILLACH, TRIESTE]
function is_blocked_italian_border_space(s, pieces) {
    if (game.ap.commitment === COMMITMENT_TOTAL)
        return false // Once AP is at Total War, there are no restrictions

    // German armies cannot move or SR to the three Italian border spaces until AP is at total war
    const has_german_army = pieces.some((p) => { return data.pieces[p].nation === GERMANY && data.pieces[p].type === ARMY })
    return has_german_army && italian_border_spaces.includes(s)
}

function end_move_stack() {
    if (game.move.pieces.length > 0)
        log_piece_move(game.move.pieces)

    if (!is_controlled_by(game.move.current, active_faction()) && has_undestroyed_fort(game.move.current, other_faction(active_faction()))) {
        if (can_besiege(game.move.current, get_pieces_in_space(game.move.current)))
            set_add(game.forts.besieged, game.move.current)
    }

    for (let p of game.move.pieces)
        set_add(game.moved, p)

    if (has_unmoved_pieces_in_space(game.move.initial)) {
        game.move.current = game.move.initial
        game.move.spaces_moved = 0
        game.move.pieces = []
        game.state = 'choose_pieces_to_move'
    } else {
        end_move_activation()
    }
}

states.confirm_move_violations = {
    inactive: 'move',
    prompt() {
        view.prompt = `You must correct rule violations before continuing.`
        gen_action('reset_phase')
    },
    reset_phase() {
        pop_all_undo()
    },
}

// === ATTACK STATES ===

function log_drm_card(c, n=1) {
    log(">+" + n + " " + card_name(c))
}

function get_defenders_pieces() {
    let pieces = []
    for (let p = 1; p < data.pieces.length; ++p)
        if (game.location[p] === game.attack.space && data.pieces[p].faction !== game.attack.attacker)
            pieces.push(p)
    return pieces
}

states.choose_attackers = {
    inactive: 'attack',
    prompt() {
        view.prompt = `Choose units and a space to attack.`

        for (let p of game.eligible_attackers)
            if (!set_has(game.attack.pieces, p))
                if (get_attackable_spaces([p, ...game.attack.pieces]).length > 0)
                    gen_action_piece(p)

        if (game.attack.pieces.length > 0) {
            for (let s of get_attackable_spaces(game.attack.pieces))
                gen_action_space(s)
            gen_action("no_attack")
        }

        // If no attackers selected and all eligible pieces can attack the same space, add a select all button
        // Don't show this if any attackers are attacking out of a besieged space because then the calculation of whether
        // they can join the attack might depend on which other pieces have already joined from the besieged space, so
        // the participants must be chosen one at a time.
        const attacking_from_siege = game.eligible_attackers.some((p) => is_besieged(game.location[p]))
        if (!attacking_from_siege && game.attack.pieces.length === 0 && get_attackable_spaces(game.eligible_attackers).length > 0) {
            gen_action('select_all')
        }

        if (game.attack.pieces.length === 0) {
            if (game.eligible_attackers.length > 0)
                gen_action("confirm_pass_attack")
            else
                gen_action_pass()
        }
    },
    no_attack() {
        push_undo()
        for (let p of game.attack.pieces)
            set_delete(game.eligible_attackers, p)
        game.attack.pieces = []
        end_attack_activation()
    },
    piece(p) {
        if (game.attack.pieces.length === 0)
            push_undo()
        set_add(game.attack.pieces, p)
    },
    space(s) {
        push_undo()
        game.attack.space = s
        set_add(game.attacked, s)
        game.state = 'confirm_attack'
    },
    select_all() {
        push_undo()
        game.eligible_attackers.forEach((p) => {
            set_add(game.attack.pieces, p)
        })
    },
    confirm_pass_attack() {
        this.pass()
    },
    pass() {
        push_undo()
        game.eligible_attackers = []
        end_attack_activation()
    }
}

states.confirm_pass_attack = {
    inactive: 'attack',
    prompt() {
        view.prompt = `You still have units eligible to attack!`
        gen_action('pass')
    },
    pass() {
        game.eligible_attackers = []
        end_attack_activation()
    }
}

function fmt_attack_odds() {
    const defender = other_faction(game.attack.attacker)
    const attack_factors = game.attack.pieces.reduce((sum, p) => sum + get_piece_cf(p), 0)

    const defender_pieces = get_defenders_pieces()
    let defense_factors = defender_pieces.reduce((sum, p) => {
        if (set_has(game.retreated, p))
            return sum
        return sum + get_piece_cf(p)
    }, 0)

    const attacker_table = game.attack.pieces.some(p => data.pieces[p].type === ARMY) ? fire_table.army : fire_table.corps
    const defender_table = defender_pieces.some(p => data.pieces[p].type === ARMY && !set_has(game.retreated, p)) ? fire_table.army : fire_table.corps

    if (has_undestroyed_fort(game.attack.space, defender))
        defense_factors += data.spaces[game.attack.space].fort
    let attacker_shifts = 0
    let defender_shifts = 0

    const trench_lvl = get_trench_level_for_attack(game.attack.space, defender)
    const trench_shift_canceled = attacking_unoccupied_fort() || game.attack.trenches_canceled || game.attack.trench_shift_canceled
    if (!trench_shift_canceled) {
        if (trench_lvl === 2) {
            attacker_shifts -= 2
            defender_shifts++
        } else if (trench_lvl === 1) {
            attacker_shifts--
            defender_shifts++
        }
    }

    let terrain = data.spaces[game.attack.space].terrain
    if (terrain === MOUNTAIN || terrain === SWAMP)
        attacker_shifts--

    const attacker_col = get_fire_col(attacker_table, attack_factors, attacker_shifts)
    const defender_col = get_fire_col(defender_table, defense_factors, defender_shifts)
    return `${attacker_col.name} vs ${defender_col.name}`
}

states.confirm_attack = {
    inactive: 'attack',
    prompt() {
        view.prompt = `Attack ${space_name(game.attack.space)} with ${piece_list(game.attack.pieces)} at ${fmt_attack_odds()}?`
        if (french_mutiny_penalty_should_be_awarded()) {
            view.prompt += ' (1 VP penalty for French Mutiny will be applied)'
        }
        view.where = game.attack.space
        if (french_mutiny_penalty_should_be_awarded()) {
            gen_action('confirm_mutiny_attack')
        } else {
            gen_action('attack')
        }
    },
    confirm_mutiny_attack() {
        this.attack()
    },
    attack() {
        goto_attack()
    }
}

function is_french_mutiny_mo() {
    return game.events.french_mutiny > 0 && game.ap.mo === FRANCE
}

function french_mutiny_penalty_should_be_awarded() {
    const nation = data.spaces[game.attack.space].nation
    if (!is_french_mutiny_mo() || (nation !== FRANCE && nation !== BELGIUM && nation !== GERMANY)) {
        return false
    }
    const us_placed_spaces = []
    for (let p = 1; p < data.pieces.length; ++p) {
        if (data.pieces[p].nation === US) {
            us_placed_spaces[game.location[p]] = true
        }
    }
    return game.attack.pieces.filter((p) => data.pieces[p].nation === FRANCE)
        .map((p) => game.location[p])
        .some((p) => us_placed_spaces[p] !== true)
}

function goto_attack() {
    game.attack.pieces.forEach((p) => {
        set_delete(game.eligible_attackers, p)
    })

    let attack_sources = []
    game.attack.pieces.forEach((p) => { set_add(attack_sources, game.location[p]) })
    attack_sources.forEach((source) => {
        update_russian_ne_restriction_flag(game.attack.pieces, source, game.attack.space)
    })

    //BR// Moved up here to appear *before* the attack (so it can be log_h3 without breaking the attack box)
    if (game.attack.attacker === AP && is_french_mutiny_mo()) {
        if (french_mutiny_penalty_should_be_awarded()) {
            game.vp += 1
            log_h3(`${card_name(FRENCH_MUTINY)} -- +1 VP -- French unit not stacked with US unit attacked a space in France/Belgium/Germany during French Mutiny`)
            game[active_faction()].mo = NONE
            game.ap.missed_mo.push(game.turn)      //BR// This should be marked on the turn track as a missed MO (unless we later make special FR Mutiny counters, in which case use those)
            //record_score_event(1, FRENCH_MUTINY) //BR// Now covered in score summary by the missed MO marker
        }
    }

    log_attack(`${space_name(game.attack.space)}`)
    log(`Attackers:`)
    attack_sources.forEach((source) => {
        let attackers_in_space = game.attack.pieces.filter((p) => game.location[p] === source)
        logi(`${piece_list(attackers_in_space)} (${space_name(source)})`)
    })

    log(`Defenders:`)
    let defenders = get_defenders_pieces()
    if (has_undestroyed_fort(game.attack.space, other_faction(game.attack.attacker))) {
        if (defenders.length > 0)
            logi(`${piece_list(defenders)}, Fort`)
        else
            logi(`Fort`)
    } else {
        logi(piece_list(defenders))
    }

    const mo = active_faction() === AP ? game.ap.mo : game.cp.mo

    if (mo !== NONE && ((game.attack.attacker !== AP) || !is_french_mutiny_mo()) && satisfies_mo(mo, game.attack.pieces, defenders, game.attack.space)) {
        game[active_faction()].mo = NONE
        log(`*Mandated offensive satisfied!`)
    }

    goto_attack_step_great_retreat()
}

function goto_attack_step_great_retreat() {
    if (game.turn === game.events.great_retreat && get_defenders_pieces().some((p) => data.pieces[p].nation === RUSSIA)) {
        clear_undo()
        switch_active_faction()
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
    if (get_trench_level_for_attack(game.attack.space, other_faction(game.attack.attacker)) > 0 &&
        has_trench_negating_card_in_hand(game.attack.attacker)) {
        // if defending space has a trench, go to 'negate_trench'
        game.state = 'negate_trench'
    } else {
        goto_attack_step_flank()
    }
}

function has_trench_negating_card_in_hand(faction) {
    let hand = game[faction].hand
    for (let c of TRENCH_NEGATING_CARDS) {
        if (hand.includes(c) && can_play_event(c))
            return true
    }
    return false
}

function goto_attack_step_flank() {
    if (attacker_can_flank()) {
        // if attacker can flank, go to 'choose_flank_attack'
        game.state = 'choose_flank_attack'
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
    if (could_have_usable_combat_card(game.attack.attacker, true)) {
        game.state = 'attacker_combat_cards'
    } else if (get_defenders_pieces().some(p => !set_has(game.oos_pieces, p)) && could_have_usable_combat_card(other_faction(game.attack.attacker))) {
        clear_undo()
        set_active_faction(other_faction(game.attack.attacker))
        game.state = 'defender_combat_cards'
    } else {
        begin_combat()
    }
}

function could_apply_combat_card(c) {
    let card_data = data.cards[c]
    if (!card_data.cc)
        return false
    let evt = events[card_data.event]
    return !!(evt && evt.can_apply())
}

function could_have_usable_combat_card(faction, skip_deck) {
    // If there are any cards already in play that could apply, return true
    for (let c of game.combat_cards) {
        if (data.cards[c].faction === faction && could_apply_combat_card(c))
            return true
    }

    // No cards in hand, so there can't be any to play
    if (game[faction].hand.length === 0) {
        return false
    }

    // If there are any cards in hand that could apply, return true
    for (let c of game[faction].hand) {
        if (could_apply_combat_card(c))
            return true
    }

    if (!skip_deck) {
        // Finally, if there are any cards in the deck that could apply, return true so no information is leaked to the other player
        for (let c of game[faction].deck) {
            if (could_apply_combat_card(c))
                return true
        }
    }

    return false
}

function attacking_unoccupied_fort() {
    let unretreated_defenders = get_defenders_pieces().filter((p) => !set_has(game.retreated, p))
    return (data.spaces[game.attack.space].fort > 0 &&
        !set_has(game.forts.destroyed, game.attack.space) &&
        unretreated_defenders.length === 0)
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

    // Cannot flank a trench
    if (get_trench_level_for_attack(game.attack.space, other_faction(game.attack.attacker)) > 0)
        return false

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

function can_withdraw() {
    return get_retreat_options(get_defenders_pieces(), game.attack.space, 1).length > 0
}

function get_attackable_spaces(attackers) {
    if (attackers.length === 0)
        return []

    let eligible_spaces = []
    for (let i = 0; i < attackers.length; ++i) {
        let attacker = attackers[i]
        let attackable_spaces = get_attackable_spaces_for_piece(attacker)
        if (i === 0) // First attacker's spaces are all eligible
            eligible_spaces.push(...attackable_spaces)
        else // Subsequent attackers subtract ineligible spaces
            eligible_spaces = eligible_spaces.filter((s) => attackable_spaces.includes(s))
    }

    // 15.1.3 If all the attackers are besieging a space, then they can attack the space they are besieging
    if (is_besieged(game.location[attackers[0]]) && attackers.every((p) => game.location[p] === game.location[attackers[0]])) {
        const siege_space = game.location[attackers[0]]
        const remaining_besieging_pieces = get_pieces_in_space(siege_space).filter((p) => !attackers.includes(p))
        if (can_besiege(siege_space, remaining_besieging_pieces))
            eligible_spaces.push(siege_space) // Sufficient besieging force is not part of the attack, so add the siege space to the eligible targets
        else
            eligible_spaces = [siege_space] // Insufficient force remains to maintain the siege, so the only eligible target is the besieged space
    }

    // If some attackers are in a besieged space and won't leave sufficient force to maintain the siege, then they
    // can only attack the besieged space
    let besieged_spaces = attackers.map((p) => game.location[p]).filter((s) => is_besieged(s))
    for (let besieged_space of besieged_spaces) {
        // Remaining besieging force cannot include pieces designated to attack or pieces that already attacked
        const remaining_besieging_pieces = get_pieces_in_space(besieged_space).filter((p) => !attackers.includes(p) && is_eligible_for_siege(p))
        if (!can_besiege(besieged_space, remaining_besieging_pieces)) {
            // If any attacker is attacking out of a besieged space, and the remaining pieces in that space cannot
            // maintain the siege, then remove other spaces from the eligible targets
            eligible_spaces = eligible_spaces.filter((s) => s === besieged_space)
        }
    }

    if (is_invalid_multinational_attack(attackers)) {
        return []
    }

    // Units in London may conduct a Combat only if the Combat also involves friendly units located in a space in
    // either France or Belgium.
    const attacking_from_london = attackers.some(p => game.location[p] === LONDON)
    if (attacking_from_london) {
        const attacking_from_france_belgium = attackers.some(p => {
            const loc = game.location[p]
            return data.spaces[loc].nation === FRANCE || data.spaces[loc].nation === BELGIUM
        })
        if (!attacking_from_france_belgium) {
            return []
        }
    }

    const russian_attacker = attackers.some((p) => data.pieces[p].nation === RUSSIA)
    const german_attacker = attackers.some((p) => data.pieces[p].nation === GERMANY)
    const lloyd_george = is_lloyd_george_active() && attackers.some((p) => data.pieces[p].nation === BRITAIN)
    const stavka_timidity = game.turn === game.events.stavka_timidity && russian_attacker
    const is_summer = get_season() === SEASON_SUMMER
    eligible_spaces = eligible_spaces.filter((s) => {
        // Neutral nations
        if (!is_space_at_war(s))
            return false

        if (is_summer && data.spaces[s].terrain === DESERT)
            return false

        // Already attacked this turn
        if (game.attacked && set_has(game.attacked, s))
            return false

        // Until AP is at Total War, only Italian and Austrian units may attack into Italian spaces
        if (is_blocked_italian_space(s, attackers))
            return false

        //  15.1.12 Russian units may not attack, enter, or besiege a German fort space during the August 1914 turn.
        if (game.turn === 1 && russian_attacker && data.spaces[s].nation === GERMANY && has_undestroyed_fort(s, CP))
            return false

        // 15.1.11 Russian Forts: German units may not attack spaces containing Russian forts until the OberOst Event
        // Card is played or the Central Powers War Status is 4 or higher. German units may, however, besiege unoccupied
        // Russian forts. Austro-Hungarian units are not restricted by this rule.
        if (german_attacker && data.spaces[s].nation === RUSSIA && has_undestroyed_fort(s, AP)) {
            if (game.cp.ws < 4 && game.events.oberost === undefined)
                return false
        }

        if (!check_russian_ne_restriction(attackers, s))
            return false

        // Lloyd George prevents attacks against German defenders with level 2 trenches while active
        if (lloyd_george && get_trench_level(s, CP) === 2 && contains_piece_of_nation(s, GERMANY))
            return false

        // Stavka Timidity prevents Russian attacks against entrenched German defenders for the turn it is played
        if (stavka_timidity && get_trench_level(s, CP) > 0 && contains_only_pieces_of_nation(s, GERMANY))
            return false

        return true
    })

    return eligible_spaces
}

function is_eligible_for_siege(p) {
    if (!game.ineligible_for_siege)
        return true
    return !set_has(game.ineligible_for_siege, p)
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
        case "ana":
            return BRITAIN
        default:
            return nation // Aus, Cnd, and Pt units are already marked as British in data
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

function has_non_russian_ap_piece(s) {
    for (let p of all_pieces_by_faction[AP])
        if (data.pieces[p].nation !== RUSSIA && game.location[p] === s)
            return true
    return false
}

function has_russian_piece(s) {
    for (let p of all_pieces_by_nation[RUSSIA])
        if (game.location[p] === s)
            return true
    return false
}

function get_attackable_spaces_for_piece(p) {
    let attackable_spaces = []
    for (let conn of get_connected_spaces(game.location[p], data.pieces[p].nation)) {
        if (is_attackable_space_for_piece(conn, p)) {
            set_add(attackable_spaces, conn)
        }
    }
    return attackable_spaces
}

function is_attackable_space_for_piece(s, p) {
    // 11.3.1 Near East restriction
    if (is_neareast_space(s) && data.pieces[p].type === ARMY && !data.pieces[p].neareast) {
        return false
    }

    if (game.events.treaty_of_brest_litovsk > 0) {
        // Brest Litovsk - RU can't attack
        if (data.pieces[p].nation === RUSSIA) {
            return false
        }
        // Brest Litovsk - RU can only be attacked by TU in Near East
        if (data.pieces[p].faction === CP) {
            if ((data.pieces[p].nation !== TURKEY || !is_neareast_space(s)) && has_russian_piece(s))
                return false
        }
    }

    if (is_bef_unit(p) && !can_bef_enter(s))
        return false

    // Check if space has an attackable fort
    if (has_undestroyed_fort(s, other_faction(active_faction())) && is_controlled_by(s, other_faction(active_faction())) && !is_besieged(s)) {
        return true
    }

    // Can't have only units that retreated this round
    if (game.retreated) {
        const defending_pieces = get_pieces_in_space(s).filter((p) => data.pieces[p].faction !== active_faction())
        if (defending_pieces.length > 0 && defending_pieces.every((p) => set_has(game.retreated, p))) {
            return false
        }
    }

    // Has enemy piece
    for (let p of all_pieces_by_faction[other_faction(active_faction())])
        if (game.location[p] === s)
            return true

    return false
}

const TRENCH_NEGATING_CARDS = [ROYAL_TANK_CORPS, VON_BELOW, VON_HUTIER, MICHAEL, BLUCHER, PEACE_OFFENSIVE]

states.negate_trench = {
    inactive: 'play trench-negating combat cards',
    prompt() {

        game[active_faction()].hand.forEach((c) => {
            if (TRENCH_NEGATING_CARDS.includes(c) && events[data.cards[c].event].can_play()) {
                gen_action_card(c)
            }
        })

        if (view.actions.card && view.actions.card.length > 0)
            view.prompt = `You may play trench-negating combat cards: ${card_list(view.actions.card)}.`
        else
            view.prompt = `You may play trench-negating combat cards (none possible).`

        gen_action_next()
    },
    card(c) {
        push_undo()
        log(`${faction_name(active_faction())} played ${card_name(c)}`)
        play_combat_card(c)
    },
    next() {
        goto_attack_step_flank()
    }
}

states.choose_flank_attack = {
    inactive: 'flank attack',
    prompt() {
        let flanking_spaces = get_flanking_spaces(get_attack_spaces(game.attack.pieces), game.attack.space, game.attack.attacker)
        let flank_roll_target = 4 - flanking_spaces.length

        if (game.attack.combat_cards.includes(WIRELESS_INTERCEPTS)) {
            gen_action_done()
            view.prompt = `Wireless Intercepts played -- flank attack automatically successful.`
        } else {
            gen_action('flank')
            gen_action_pass()
            if (can_play_wireless_intercepts()) {
                gen_action_card(WIRELESS_INTERCEPTS)
                view.prompt = `You may play Wireless Intercepts or attempt a flank attack (success on ${Math.max(flank_roll_target, 1)}+).`
            } else {
                view.prompt = `You may attempt a flank attack (success on ${Math.max(flank_roll_target, 1)}+).`
            }
        }
    },
    flank() {
        roll_flank_attack()
    },
    card(c) {
        push_undo()
        array_remove_item(game[active_faction()].hand, c)
        game.combat_cards.push(c)
        game.attack.combat_cards.push(c)
        log(`${faction_name(active_faction())} played ${card_name(c)}`)
        log('Flank attack successful')
        game.attack.is_flank = true
    },
    pass() {
        goto_attack_step_kerensky_offensive()
    },
    done() {
        goto_attack_step_kerensky_offensive()
    }
}

function can_play_wireless_intercepts() {
    return game[active_faction()].hand.includes(WIRELESS_INTERCEPTS) &&
        game.attack.pieces.some((p) => data.pieces[p].nation === GERMANY) &&
        contains_piece_of_nation(game.attack.space, RUSSIA)
}

function get_flanking_spaces(attack_spaces, defending_space, attacker) {
    let flanking_spaces = []
    for (let s of attack_spaces) {
        if (adds_flanking_drm(s, attacker, defending_space)) {
            flanking_spaces.push(s)
        }
    }

    if (attack_spaces.length === flanking_spaces.length) {
        flanking_spaces.length = flanking_spaces.length - 1 // Just remove one space's DRM if all spaces could provide a DRM
    }

    return flanking_spaces
}

function get_attack_spaces(pieces) {
    let attack_spaces = []
    for (let p of pieces)
        set_add(attack_spaces, game.location[p])
    return attack_spaces
}

function roll_flank_attack() {
    clear_undo()

    game.attack.attempt_flank = true

    log(`Flank attempt:`)
    let attack_spaces = get_attack_spaces(game.attack.pieces)

    let flanking_spaces = get_flanking_spaces(attack_spaces, game.attack.space, game.attack.attacker)
    let flank_drm = flanking_spaces.length
    const roll = roll_die(6)

    for (var s of flanking_spaces)
        logi("+1 " + space_name(s))

    if (roll + flank_drm >= 4) {
        logi(fmt_roll(roll) + " Success")
        game.attack.is_flank = true
    } else {
        logi(fmt_roll(roll) + " Fail")
        game.attack.failed_flank = true
    }

    //log_event_for_rollback(`Flank roll at ${space_name(game.attack.space)}`) // Don't log this because it is always paired with a combat roll

    goto_attack_step_kerensky_offensive()
}

function is_usable_combat_card(c) {
    if (!data.cards[c].cc)
        return false
    const evt = events[data.cards[c].event]
    return !!(evt && evt.can_apply() && !used_cc_this_round(c))
}

function card_list(list) {
    return list.map(c => card_name(c)).join(", ")
}

function prompt_combat_cards() {
    for (let c of game[active_faction()].hand) {
        if (is_usable_combat_card(c))
            gen_action_card(c)
    }

    for (let c of game.combat_cards) {
        if (data.cards[c].faction === active_faction() && !game.attack.combat_cards.includes(c))
            if (is_usable_combat_card(c))
                gen_action_card(c)
    }

    if (view.actions.card && view.actions.card.length > 0)
        view.prompt = `You may play combat cards: ${card_list(view.actions.card)}.`
    else
        view.prompt = `You may play combat cards (none possible).`

    gen_action_done()
}

function play_combat_card(c) {
    if (game.combat_cards.includes(c)) {
        // This is a previously played combat card
        game.attack.combat_cards.push(c)
    } else {
        // Card was not played yet, so add it to the played combat cards and make it active for this attack
        array_remove_item(game[active_faction()].hand, c)

        const card_data = data.cards[c]
        if (card_data.ws) {
            let active_player = game[active_faction()]
            active_player.ws += card_data.ws
            logi(`War Status +${card_data.ws} to ${active_player.ws} (${game.ap.ws + game.cp.ws})`)
            update_us_entry()
        }

        game.combat_cards.push(c)
        game.attack.combat_cards.push(c)
        game.attack.new_combat_cards.push(c)
        let evt = events[data.cards[c].event]
        if (evt && evt.play)
            evt.play()
    }
}

states.attacker_combat_cards = {
    inactive: 'play combat cards',
    prompt() {
        prompt_combat_cards()
    },
    card(c) {
        push_undo()
        play_combat_card(c)
    },
    done() {
        clear_undo()
        if (game.attack.combat_cards.length > 0) {
            log("Attacker combat cards:")
            for (let c of game.attack.combat_cards) {
                if (data.cards[c].faction === active_faction())
                    logi(`${card_name(c)}`)
            }
        }
        set_active_faction(other_faction(game.attack.attacker))
        if (get_defenders_pieces().some(p => !set_has(game.oos_pieces, p)) && could_have_usable_combat_card(active_faction()))
            game.state = 'defender_combat_cards'
        else
            begin_combat()
    }
}

states.defender_combat_cards = {
    inactive: 'play combat cards',
    prompt() {
        prompt_combat_cards()
    },
    card(c) {
        push_undo()
        play_combat_card(c)
    },
    done() {
        if (game.attack.combat_cards.length > 0) {
            log("Defender combat cards:")
            for (let c of game.attack.combat_cards) {
                if (data.cards[c].faction === active_faction())
                    logi(`${card_name(c)}`)
            }
        }
        begin_combat()
    }
}

function used_cc_this_round(c) {
    return game.action_state.used_ccs !== undefined && set_has(game.action_state.used_ccs, c)
}

function begin_combat() {
    // TODO: remove this backward compatibility hotfix
    game.ineligible_for_siege ??= []

    if (game.attack.combat_cards.length > 0) {
        if (game.action_state.used_ccs === undefined)
            game.action_state.used_ccs = []
        game.attack.combat_cards.forEach((c) => set_add(game.action_state.used_ccs, c))
    }

    if (is_haig_active() &&
        get_trench_level(game.attack.space, CP) > 0 &&
        contains_piece_of_nation(game.attack.space, GERMANY) &&
        [FRANCE, BELGIUM, GERMANY].includes(data.spaces[game.attack.space].nation) &&
        game.attack.pieces.some((p) => data.pieces[p].nation === BRITAIN)
    ) {
        game.attack.haig_cancels_ge_retreat = true
    }

    // Mark all attackers as ineligible for siege duties this round, unless they are attacking their own space
    for (let p of game.attack.pieces) {
        if (game.location[p] !== game.attack.space)
            set_add(game.ineligible_for_siege, p)
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

function log_combat_winner() {
    var a_hits = game.attack.defender_losses
    var d_hits = game.attack.attacker_losses
    if (a_hits > d_hits)
        log(`*${a_hits}:${d_hits} attacker victory`)
    else if (a_hits < d_hits)
        log(`*${a_hits}:${d_hits} defender victory`)
    else
        log(`*${a_hits}:${d_hits} no combat winner`)
}

function resolve_fire() {
    const von_hutier_active = game.attack.combat_cards.includes(VON_HUTIER)
    if (game.attack.failed_flank) {
        resolve_defenders_fire()
        set_active_faction(game.attack.attacker)
        goto_attacker_losses()
    } else if (game.attack.is_flank || von_hutier_active) {
        if (von_hutier_active)
            log(`${card_name(VON_HUTIER)}: attacker fires first`)
        resolve_attackers_fire()
        goto_defender_losses()
    } else {
        resolve_attackers_fire()
        resolve_defenders_fire()
        log_combat_winner()
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
        {factors: 6, result:  [3, 3, 4, 4, 5, 5], name: "6 (Army)"},
        {factors: 9, result:  [3, 4, 4, 5, 5, 7], name: "9 (Army)"},
        {factors: 12, result: [4, 4, 5, 5, 7, 7], name: "12 (Army)"},
        {factors: 15, result: [4, 5, 5, 7, 7, 7], name: "15 (Army)"},
        {factors: 16, result: [5, 5, 7, 7, 7, 7], name: "16+ (Army)"}
    ]
}

function get_fire_col(table, cf, shifts) {
    let col = 1
    while (col < table.length && table[col].factors <= cf) { col++ } // Find first column where column factors > combat factors
    col-- // Back up one column
    col += shifts
    col = Math.min(Math.max(col, 0), table.length-1)
    return table[col]
}

function get_fire_result(faction, base_roll, t, cf, shifts, roll) {
    let table = fire_table[t]
    let column = get_fire_col(table, cf, shifts)
    let losses = column.result[roll-1]
    logi(`${fmt_roll(base_roll,0,faction)} \xd7 ${column.name} = ${losses}`)
    return losses
}

function resolve_attackers_fire() {
    let attacker_cf = 0
    game.attack.attacker_table = CORPS

    for (let p of game.attack.pieces) {
        attacker_cf += get_piece_cf(p)
        if (data.pieces[p].type === ARMY)
            game.attack.attacker_table = ARMY
    }

    log(`Attacker's fire (${attacker_cf} CF):`)

    let attacker_shifts = 0

    // Terrain shifts
    let terrain = data.spaces[game.attack.space].terrain
    if (terrain === MOUNTAIN) {
        attacker_shifts -= 1
        logi(`1L for Mountains`)
    }
    if (terrain === SWAMP) {
        attacker_shifts -= 1
        logi(`1L for Swamp`)
    }

    // Trench shifts
    if (!attacking_unoccupied_fort() && !(game.attack.trenches_canceled || game.attack.trench_shift_canceled)) {
        if (get_trench_level_for_attack(game.attack.space, other_faction(game.attack.attacker)) === 2) {
            attacker_shifts -= 2
            logi(`2L for Trenches`)
        } else if (get_trench_level_for_attack(game.attack.space, other_faction(game.attack.attacker)) === 1) {
            attacker_shifts -= 1
            logi(`1L for Trenches`)
        }
    }

    let base_roll = roll_die(6)

    // Determine DRM based on played combat cards
    game.attack.combat_cards.forEach((c) => {
        if (data.cards[c].faction === game.attack.attacker) {
            let evt = events[data.cards[c].event]
            if (evt && evt.can_apply !== undefined && evt.can_apply())
                evt.apply()
        }
    })

    if (game.action_state.yanks_and_tanks) {
        if (events.yanks_and_tanks.can_apply())
            events.yanks_and_tanks.apply()
    }

    if (game.action_state.brusilov_active) {
        events.brusilov_offensive.apply_drm()
    }

    // -3 DRM if all attackers are in the Sinai space
    if (game.attack.pieces.every((p) => game.location[p] === SINAI) && !(game.attack.attacker === AP && game.events.sinai_pipeline > 0)) {
        game.attack.attacker_drm -= 3
        logi("-3 Attackers in Sinai")
    }

    let modified_roll = base_roll + game.attack.attacker_drm
    let clamped_roll = modified_roll > 6 ? 6 : modified_roll < 1 ? 1 : modified_roll
    game.attack.defender_losses = get_fire_result(game.attack.attacker, base_roll, game.attack.attacker_table, attacker_cf, attacker_shifts, clamped_roll)
    game.attack.defender_losses_taken = 0
    game.attack.defender_loss_pieces = []
    game.attack.defender_replacements = {}

    clear_undo()
}

function resolve_defenders_fire() {
    const defender = other_faction(game.attack.attacker)
    let defender_cf = 0
    game.attack.defender_table = CORPS

    log_event_for_rollback(`Combat at ${space_name(game.attack.space)}`)

    const defender_pieces = get_pieces_in_space(game.attack.space).filter(p => data.pieces[p].faction === defender)
    defender_pieces.forEach(p => {
        if (!set_has(game.retreated, p)) {
            defender_cf += get_piece_cf(p)
            if (data.pieces[p].type === ARMY)
                game.attack.defender_table = ARMY
        }
    })

    const space_data = data.spaces[game.attack.space]
    if (space_data.fort > 0 && !set_has(game.forts.destroyed, game.attack.space) && space_data.faction === defender)
        defender_cf += space_data.fort

    // If there are no defender pieces left and the fort did not contribute its CF, defender does not shoot back
    if (defender_pieces.length === 0 && defender_cf === 0) {
        game.attack.attacker_losses = 0
        game.attack.attacker_losses_taken = 0
        clear_undo()
        return
    }

    log(`Defender's fire (${defender_cf} CF):`)

    game.attack.combat_cards.forEach((c) => {
        if (data.cards[c].faction === defender) {
            let evt = events[data.cards[c].event]
            if (evt && evt.can_apply()) {
                evt.apply()
            }
        }
    })

    // Remember that Turk Determination applies, even after the card is discarded
    if (get_trench_level(game.attack.space, CP) === 0 &&
        game.attack.attacker === AP &&
        game.attack.combat_cards.includes(TURK_DETERMINATION) &&
        events[data.cards[TURK_DETERMINATION].event].can_apply()) {
        game.attack.turk_determination = true
    }

    let defender_shifts = 0
    let trench_shift_canceled = game.attack.trenches_canceled || game.attack.trench_shift_canceled
    if (get_trench_level_for_attack(game.attack.space, defender) > 0 && !trench_shift_canceled && !attacking_unoccupied_fort()) {
        defender_shifts += 1
        logi(`1R for Trenches`)
    }

    let base_roll = roll_die(6)
    let modified_roll = base_roll + game.attack.defender_drm
    let clamped_roll = modified_roll > 6 ? 6 : modified_roll < 1 ? 1 : modified_roll
    game.attack.attacker_losses = get_fire_result(other_faction(game.attack.attacker), base_roll, game.attack.defender_table, defender_cf, defender_shifts, clamped_roll)
    game.attack.attacker_losses_taken = 0
    clear_undo()
}

states.eliminate_retreated_units = {
    inactive: 'eliminate previously retreated units',
    prompt() {
        let has_pieces_to_eliminate = false
        for_each_piece_in_space(game.attack.space, (p) => {
            if (data.pieces[p].faction !== other_faction(game.attack.attacker))
                return
            if (set_has(game.retreated, p)) {
                gen_action_piece(p)
                has_pieces_to_eliminate = true
            }
        })

        view.prompt = 'Eliminate units that previously retreated.'
        if (!has_pieces_to_eliminate) {
            gen_action_done()
        }
    },
    piece(p) {
        push_undo()
        // Pieces eliminated in this condition are sent to the eliminated box and not replaced (12.5.6)
        if (data.pieces[p].notreplaceable) {
            log(`>*${piece_name(p)} in ${space_name(game.location[p])} permanently eliminated`)
            set_add(game.removed, p)
            game.location[p] = PERM_ELIMINATED_BOX
        } else {
            log(`>${piece_name(p)} in ${space_name(game.location[p])} eliminated`)
            send_to_eliminated_box(p)
        }
        set_delete(game.retreated, p)
    },
    done() {
        game.state = 'apply_defender_losses'
    }
}

states.apply_defender_losses = {
    inactive: 'take losses',
    prompt() {
        let loss_options = []
        if (game.attack.defender_losses - game.attack.defender_losses_taken > 0) {
            const fort_strength = has_undestroyed_fort(game.attack.space, active_faction()) ? data.spaces[game.attack.space].fort : 0
            loss_options = get_loss_options(true, game.attack.defender_losses - game.attack.defender_losses_taken, get_defenders_pieces(), fort_strength)
        }
        if (loss_options.length > 0) {
            view.prompt = `Take losses in attack on ${space_name(game.attack.space)}: ${game.attack.defender_losses_taken} / ${game.attack.defender_losses}.`
            loss_options.forEach((option) => {
                if (option === FORT_LOSS) {
                    gen_action_space(game.attack.space)
                } else {
                    gen_action_piece(option)
                }
            })
        } else {
            view.prompt = `Take losses in attack on ${space_name(game.attack.space)}: Done.`
            gen_action_done()
        }
    },
    piece(p) {
        push_undo()
        game.attack.defender_losses_taken += get_piece_lf(p)
        set_add(game.attack.defender_loss_pieces, p)
        if (is_unit_reduced(p)) {
            const location = game.location[p]
            let replacement_options = eliminate_piece(p)
            // If there are multiple options, defender must choose one
            if (replacement_options.length > 1) {
                game.attack.replacement = { p: p, s: location, options: replacement_options }
                game.state = 'choose_defender_replacement'
            } else if (replacement_options.length === 1) {
                replace_defender_unit(p, location, replacement_options[0])
            }
        } else {
            reduce_piece_defender(p)
        }
    },
    space(s) {
        push_undo()
        game.attack.defender_losses_taken += data.spaces[s].fort
        set_add(game.forts.destroyed, s)
        logi(`Fort destroyed`)
        if (is_besieged(s)) {
            set_delete(game.forts.besieged, s)
            set_control(s, inactive_faction())
        } else if (game.broken_sieges && set_has(game.broken_sieges, s) && contains_piece_of_faction(s, inactive_faction())) {
            set_delete(game.broken_sieges, s)
            set_control(s, inactive_faction())
        }
    },
    done() {
        clear_undo()

        update_siege(game.attack.space)

        if (has_undestroyed_fort(game.attack.space, game.attack.attacker) && !is_besieged(game.attack.space)) {
            // Fort is no longer besieged due to losses, but the remaining pieces are allowed to continue occupying the space
            // until the player moves them out or moves another piece in, so we have to remember this space is a "broken siege". (15.2.4)
            set_add(game.broken_sieges, game.attack.space)
        }

        const flank_attack_active = game.attack.is_flank || (game.attack.combat_cards.includes(VON_HUTIER) && events.von_hutier.can_play())
        if (!flank_attack_active && is_withdrawal_active() && game.attack.defender_loss_pieces.length > 0) {
            // If this is not a flank attack and the defender played Withdrawal, they choose a step loss to negate
            // If this was a flank attack, then the defender will not negate the step loss until the attacker has taken
            // their losses
            game.state = 'withdrawal_negate_step_loss'
        } else if (game.attack.failed_flank) {
            set_active_faction(game.attack.attacker)
            determine_combat_winner()
        } else if (game.attack.is_flank || game.attack.combat_cards.includes(VON_HUTIER)) {
            resolve_defenders_fire()
            log_combat_winner()
            set_active_faction(game.attack.attacker)
            goto_attacker_losses()
        } else {
            set_active_faction(game.attack.attacker)
            goto_attacker_losses()
        }
    }
}

states.choose_defender_replacement = {
    inactive: 'take losses',
    prompt() {
        view.prompt = `Take losses: Choose a replacement for ${piece_name(game.attack.replacement.p)} in ${space_name(game.attack.replacement.s)}.`
        game.attack.replacement.options.forEach(gen_action_piece)
    },
    piece(p) {
        push_undo()
        replace_defender_unit(game.attack.replacement.p, game.attack.replacement.s, p)
        delete game.attack.replacement
        game.state = 'apply_defender_losses'
    }
}

function replace_defender_unit(unit, location, replacement) {
    game.location[replacement] = location
    game.attack.defender_replacements[unit] = replacement
    logi(`${piece_name(unit, true)} broke to ${piece_name(replacement)}${log_corps(replacement)}`)
    check_rb_empty(replacement)
}

states.withdrawal_negate_step_loss = {
    inactive: 'negate step loss',
    prompt() {
        view.prompt = 'Withdrawal: Choose a step loss to negate.'

        const has_corps_option = game.attack.defender_loss_pieces.some((p) => data.pieces[p].type === CORPS)
        let can_negate = false
        game.attack.defender_loss_pieces.forEach((p) => {
            if (data.pieces[p].type === CORPS || !has_corps_option) {
                can_negate = true
                gen_action_piece(p)
            }
        })

        if (!can_negate)
            gen_action_pass()
    },
    piece(p) {
        push_undo()
        // Restore the step that was previously lost, restoring the piece to the attack location on the map and
        //  removing it from the eliminated pieces area if necessary
        log(`${card_name(game.attack.attacker === CP ? WITHDRAWAL_AP : WITHDRAWAL_CP)}\n${piece_name(p)} loss negated`)
        if (set_has(game.removed, p) || is_unit_eliminated(p)) {
            set_delete(game.removed, p)
            set_add(game.reduced, p)

            // If the piece was replaced, move the replacement back to the reserve box
            if (game.attack.defender_replacements[p]) {
                let replacement = game.attack.defender_replacements[p]
                game.location[replacement] = active_faction() === CP ? CP_RESERVE_BOX : AP_RESERVE_BOX
            }

            game.location[p] = game.attack.space
        } else {
            set_delete(game.reduced, p)
        }
        game.state = "withdrawal_negate_step_loss_confirm"
    },
    pass() {
        push_undo()
        game.state = "withdrawal_negate_step_loss_confirm"
    },
}

states.withdrawal_negate_step_loss_confirm = {
    inactive: 'negate step loss',
    prompt() {
        view.prompt = "Withdrawal: Done."
        gen_action_done()
    },
    done() {
        if (game.attack.failed_flank || game.attack.is_flank || (game.attack.combat_cards.includes(VON_HUTIER) && events.von_hutier.can_play())) {
            // This was a flank attack, so the attacker already took losses (before or after the defender, depending on
            // whether the flank failed)
            determine_combat_winner()
        } else {
            // Not a flank attack, so we now proceed to the attacker's losses
            clear_undo()
            set_active_faction(game.attack.attacker)
            goto_attacker_losses()
        }
    }
}

function eliminate_piece(p, force_permanent_elimination, reason) {
    let here = ""
    if (!game.attack)
    // if (!game.attack || game.attack.space !== game.location[p]) // TODO - log location of attacker losses
        here = ` in ${space_name(game.location[p])}`

    if (game.failed_entrench)
        set_delete(game.failed_entrench, p)

    if (data.pieces[p].type === CORPS) {
        if (data.pieces[p].notreplaceable) {
            log(`>*${piece_name(p)}${here} permanently eliminated`)
            set_add(game.removed, p)
            game.location[p] = PERM_ELIMINATED_BOX
        } else {
            log(`>${piece_name(p)}${here} eliminated`)
            send_to_eliminated_box(p)
        }
        return []
    }

    force_permanent_elimination = force_permanent_elimination || false
    let replacement_options = get_replacement_options(p, get_units_in_reserve())
    if (force_permanent_elimination || replacement_options.length === 0 || data.pieces[p].notreplaceable || !is_unit_supplied(p)) {
        // Permanently eliminate piece
        if (!reason && !data.pieces[p].notreplaceable) {
            if (replacement_options.length === 0) {
                reason = 'no replacement corps'
            } else if (!is_unit_supplied(p)) {
                reason = 'out of supply'
            }
        }
        if (reason && reason !== "") {
            log(`>*${piece_name(p)}${here} permanently eliminated - ${reason}`)
        } else {
            log(`>*${piece_name(p)}${here} permanently eliminated`)
        }
        set_add(game.removed, p)
        game.location[p] = PERM_ELIMINATED_BOX
        return replacement_options
    } else {
        // already logged as replacement break-down
        send_to_eliminated_box(p)
    }

    return replacement_options
}

function reduce_piece(p) {
    // TODO - log location of attacker losses
    // log(`>${piece_name(p)} in ${space_name(game.location[p])} reduced`)
    log(`>${piece_name(p)} reduced`)
    set_add(game.reduced, p)
}

function reduce_piece_defender(p) {
    log(`>${piece_name(p)} reduced`)
    set_add(game.reduced, p)
}

function goto_attacker_losses() {
    if (game.attack.attacker_losses > 0 && get_loss_options(false, game.attack.attacker_losses, game.attack.pieces, 0).length > 0)
        log("Attacker losses:")
    game.state = "apply_attacker_losses"
}

states.apply_attacker_losses = {
    inactive: 'take losses',
    prompt() {
        let loss_options = []
        if (game.attack.attacker_losses - game.attack.attacker_losses_taken > 0)
            loss_options = get_loss_options(false, game.attack.attacker_losses - game.attack.attacker_losses_taken, game.attack.pieces, 0)
        if (loss_options.length > 0) {
            view.prompt = `Take losses in attack on ${space_name(game.attack.space)}: ${game.attack.attacker_losses_taken} / ${game.attack.attacker_losses}.`
            loss_options.forEach((p) => {
                gen_action_piece(p)
            })
        } else {
            view.prompt = `Take losses in attack on ${space_name(game.attack.space)}: Done.`
            gen_action_done()
        }
    },
    piece(p) {
        push_undo()
        game.attack.attacker_losses_taken += get_piece_lf(p)
        if (is_unit_reduced(p)) {
            const location = game.location[p]
            let replacement_options = eliminate_piece(p)
            set_delete(game.attack.pieces, p)
            // If there are multiple options, player must choose a replacement
            if (replacement_options.length > 1) {
                game.attack.replacement = { p: p, s: location, options: replacement_options }
                game.state = 'choose_attacker_replacement'
            } else if (replacement_options.length === 1) {
                replace_attacker_unit(p, location, replacement_options[0])
            }
        } else {
            reduce_piece(p)
        }
    },
    done() {
        push_undo()
        if (game.attack.failed_flank) {
            resolve_attackers_fire()
            log_combat_winner()
            goto_defender_losses()
        } else if (is_withdrawal_active() && game.attack.defender_loss_pieces.length > 0 && (game.attack.is_flank || (game.attack.combat_cards.includes(VON_HUTIER) && events.von_hutier.can_play()))) {
            // If this was a flank attack and the defender played Withdrawal, they now choose their step loss to negate
            clear_undo()
            switch_active_faction()
            game.state = 'withdrawal_negate_step_loss'
        } else {
            determine_combat_winner()
        }
    }
}

states.choose_attacker_replacement = {
    inactive: 'take losses',
    prompt() {
        view.prompt = `Choose a replacement for ${piece_name(game.attack.replacement.p)} in ${space_name(game.attack.replacement.s)}.`
        game.attack.replacement.options.forEach(gen_action_piece)
    },
    piece(p) {
        push_undo()
        replace_attacker_unit(game.attack.replacement.p, game.attack.replacement.s, p)
        delete game.attack.replacement
        goto_attacker_losses()
    }
}

function replace_attacker_unit(unit, location, replacement) {
    logi(`${piece_name(unit, true)} broke to ${piece_name(replacement)}${log_corps(replacement)}`)
    check_rb_empty(replacement)
    set_add(game.attack.pieces, replacement)
    game.location[replacement] = location
}

function goto_defender_losses() {
    clear_undo()
    set_active_faction(other_faction(game.attack.attacker))

    if (game.attack.defender_losses > 0) {
        const fort_strength = has_undestroyed_fort(game.attack.space, active_faction()) ? data.spaces[game.attack.space].fort : 0
        let loss_options = get_loss_options(true, game.attack.defender_losses, get_defenders_pieces(), fort_strength)
        if (loss_options.length > 0)
            log("Defender losses:")
    }

    if (game.attack.defender_losses > 0 && get_defenders_pieces().some((p) => set_has(game.retreated, p)))
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
            return path.picked.some((p) => data.pieces[p].type === CORPS)
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

function get_reserve_units_by_nation(nation) {
    let reduced = 0, full = 0
    for (let p of all_pieces_by_nation[nation]) {
        if (game.location[p] === AP_RESERVE_BOX || game.location[p] === CP_RESERVE_BOX) {
            if (is_unit_reduced(p))
                ++reduced
            else
                ++full
        }
    }
    return `(${full},${reduced})`
}

function check_rb_empty(replacement) {
    let nation = data.pieces[replacement].nation
    let reduced = 0, full = 0
    for (let p of all_pieces_by_nation[nation]) {
        if (game.location[p] === AP_RESERVE_BOX || game.location[p] === CP_RESERVE_BOX) {
            if (is_unit_reduced(p))
                ++reduced
            else
                ++full
        }
    }

    if ((full <= 0) && (reduced <= 0)) {
        log (`*Reserve Box EMPTY for ${nation_name(nation)}!`)
    }
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

            const full_replacement = find_any_replacement(unit, node.full_replacements)
            const reduced_replacement = find_any_replacement(unit, node.reduced_replacements)
            if (full_replacement !== 0) {
                array_remove_item(node.full_replacements, full_replacement)
                node.full_strength.push(full_replacement)
            } else if (reduced_replacement !== 0) {
                array_remove_item(node.reduced_replacements, reduced_replacement)
                node.reduced.push(reduced_replacement)
            } else if (!is_unit_corps(unit) && node.to_satisfy >= 1) {
                // 12.4.4.2 If a space with multiple armies that do not have replacement corps in the Reserve Box
                // suffers a Loss Number greater than can be applied, the losses must be applied to one army before
                // they can be applied to another unit. (This will result in at least one army being permanently
                // eliminated.) The same principle applies in any similar situation where the full LP result cannot be
                // satisfied but could have been satisfied had there been at least a reduced Corps available in the
                // reserve box—the result must include an Army being permanently eliminated.
                //
                // In other words, if we are choosing between multiple options in the loss tree that satisfy the same
                // number of losses, but this option could have satisfied additional losses if a corps had been
                // in the reserve box, then we should prefer this option. Set a flag here to use as a tiebreaker later.
                node.could_satisfy_additional_loss = true
            }
            parent.options.push(node)
        }
    }

    // If there are no units left in the space and the remaining losses to satisfy are greater than the value of the
    // fort, add a fort loss option
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
        let current_best_could_satisfy_additional_loss = valid_paths.length === 0 ? parent.could_satisfy_additional_loss : valid_paths[0].could_satisfy_additional_loss
        let option = parent.options[i]

        // If this option is strictly better than the current best option, then clear out the valid paths.
        if (option.to_satisfy < current_best)
            valid_paths.length = 0

        // If this option satisfies the same number of losses, but could have satisfied an additional loss with a corps
        // available, and the current best could not have satisfied an additional loss, then this option is strictly
        // better, so clear out valid paths.
        if (option.to_satisfy === current_best && option.could_satisfy_additional_loss && !current_best_could_satisfy_additional_loss)
            valid_paths.length = 0

        // If this option is as good as the current best, add it to the valid paths
        if (option.to_satisfy <= current_best)
            valid_paths.push(option)

        build_loss_tree(option, valid_paths)
    }
}

function find_any_replacement(unit, available_replacements) {
    const options = get_replacement_options(unit, available_replacements)
    if (options.length === 0)
        return 0

    return options[0]
}

function get_replacement_options(unit, available_replacements) {
    let options = []
    let unit_data = data.pieces[unit]
    if (unit_data.type !== ARMY)
        return options

    if (unit === BEF_ARMY) {
        if (available_replacements.includes(BEF_CORPS))
            options.push(BEF_CORPS)
        return options
    }

    let full_options = []
    let reduced_options = []
    for (let i = 0; i < available_replacements.length; ++i) {
        let replacement_data = data.pieces[available_replacements[i]]
        if (replacement_data.type !== CORPS)
            continue
        if (replacement_data.name === 'RU CAVc' || replacement_data.name === 'RU Czlc')
            continue // Russian cavalry corps and Czech Legion cannot be used as replacements
        if ((unit_data.nation === BRITAIN && replacement_data.name === 'BRc') ||
            (unit_data.nation !== BRITAIN && replacement_data.nation === unit_data.nation)) {
            if (is_unit_reduced(available_replacements[i]))
                reduced_options.push(available_replacements[i])
            else
                full_options.push(available_replacements[i])
        }
    }

    if (full_options.length > 1) {
        let names = []
        // Filter out duplicate units by name
        full_options = full_options.filter((p) => {
            if (set_has(names, data.pieces[p].name))
                return false
            else {
                set_add(names, data.pieces[p].name)
                return true
            }
        })
    }

    if (reduced_options.length > 1) {
        let names = []
        reduced_options = reduced_options.filter((p) => {
            if (set_has(names, data.pieces[p].name))
                return false
            else {
                set_add(names, data.pieces[p].name)
                return true
            }
        }) // Filter out duplicate units by name
    }

    return full_options.length > 0 ? full_options : reduced_options
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
        to_discard = to_discard.concat(game.attack.combat_cards.filter((c) => data.cards[c].faction === defender))
    }
    if (game.attack.attacker_losses >= game.attack.defender_losses)
        to_discard = to_discard.concat(game.attack.combat_cards.filter((c) => data.cards[c].faction === game.attack.attacker))
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

    // Now do the actual discard
    to_discard.forEach((c) => {
        array_remove_item(game.combat_cards, c)
        array_remove_item(game.attack.combat_cards, c)
        if (data.cards[c].remove) {
            log("Removed " + card_name(c))
            game[data.cards[c].faction].removed.push(c)
        } else {
            log("Discarded " + card_name(c))
            game[data.cards[c].faction].discard.push(c)
        }
    })

    // Check for a full strength attacker
    let attacker_has_full_strength_unit = game.attack.pieces.some((p) => !is_unit_reduced(p))

    // Decide if the defender should retreat, attacker should advance, or if the combat is over
    let defender_pieces = get_defenders_pieces()

    // Not sure if the non-German pieces should still retreat if Haig cancels the German retreat
    if (game.attack.haig_cancels_ge_retreat &&
        get_trench_level_for_attack(game.attack.space, CP) > 0 &&
        defender_pieces.some((p) => data.pieces[p].nation === GERMANY)) {
        log(`${card_name(HAIG)} cancels the retreat`)
        end_attack_activation()
        return
    }

    if (game.attack.retreat_canceled && defender_pieces.length > 0) {
        end_attack_activation()
        return
    }

    let intact_unoccupied_fort = attacking_unoccupied_fort() && game.attack.defender_losses_taken === 0
    if ((game.attack.defender_losses > game.attack.attacker_losses && attacker_has_full_strength_unit && defender_pieces.length > 0) || was_withdrawal_active) {
        clear_undo()
        set_active_faction(other_faction(game.attack.attacker))
        game.attack.to_retreat = defender_pieces
        game.attack.retreating_pieces = []
        if (was_withdrawal_active)
            game.attack.retreat_length = 1
        else
            game.attack.retreat_length = (game.attack.defender_losses - game.attack.attacker_losses === 1) ? 1 : 2
        game.attack.retreat_paths = []
        game.attack.to_advance = game.attack.pieces.filter((p) => !is_unit_reduced(p))
        game.attack.advancing_pieces = []
        if (defender_can_cancel_retreat() && !was_withdrawal_active) {
            game.state = 'cancel_retreat'
        } else {
            goto_defender_retreat()
        }
    } else if (attacker_has_full_strength_unit && defender_pieces.length === 0 && game.location[game.attack.pieces[0]] !== game.attack.space && !intact_unoccupied_fort) { // If the attacker is already in the attack space, it means they just attacked a besieged fort
        clear_undo()
        set_active_faction(game.attack.attacker)
        game.attack.to_retreat = []
        game.attack.retreating_pieces = []
        game.attack.retreat_length = 1
        game.attack.retreat_paths = []
        game.attack.to_advance = game.attack.pieces.filter((p) => !is_unit_reduced(p))
        goto_attacker_advance()
    } else {
        end_attack_activation()
    }
}

// === RETREATS AND ADVANCES ===

function defender_can_cancel_retreat() {
    const terrain = data.spaces[game.attack.space].terrain
    const defender_faction = other_faction(game.attack.attacker)
    const has_uncanceled_trench = get_trench_level_for_attack(game.attack.space, defender_faction) > 0 && !game.attack.trenches_canceled
    if (terrain === MOUNTAIN ||
        terrain === SWAMP ||
        terrain === DESERT ||
        terrain === FOREST ||
        has_uncanceled_trench) {
        let step_count = 0
        const pieces = get_pieces_in_space(game.attack.space).filter((p) => data.pieces[p].faction === defender_faction)
        // Cannot remove the last step to cancel a retreat
        for (let p of pieces) {
            if (!is_unit_reduced(p))
                return true // Any full strength unit allows canceling the retreat
            if (data.pieces[p].type === ARMY && has_replacement_available(p))
                return true // Any army that has a replacement available allows canceling the retreat
            step_count++
            if (step_count > 1)
                return true
        }
    }
    return false
}

function has_replacement_available(p) {
    return get_replacement_options(p, get_units_in_reserve()).length > 0
}

states.cancel_retreat = {
    inactive: 'retreat',
    prompt() {
        view.prompt = `You may cancel the retreat by taking an extra step loss.`
        for_each_piece_in_space(game.attack.space, (p) => {
            if (data.pieces[p].faction === other_faction(game.attack.attacker))
                gen_action_piece(p)
        })
        gen_action("retreat")
    },
    piece(p) {
        push_undo()
        log(`Retreat canceled:`)
        if (is_unit_reduced(p)) {
            const location = game.location[p]
            let replacement_options = eliminate_piece(p)
            // If there are multiple options, player must choose a replacement
            if (replacement_options.length > 1) {
                game.attack.replacement = { p: p, s: location, options: replacement_options }
                game.state = 'choose_retreat_canceling_replacement'
                return
            } else if (replacement_options.length === 1) {
                replace_retreat_canceling_unit(p, location, replacement_options[0])
            }
            update_siege(location)
            if (has_undestroyed_fort(location, game.attack.attacker) && !is_besieged(location)) {
                // Fort is no longer besieged due to losses, but the remaining pieces are allowed to continue occupying the space
                // until the player moves them out or moves another piece in, so we have to remember this space is a "broken siege". (15.2.4)
                set_add(game.broken_sieges, location)
            }
        } else {
            reduce_piece_defender(p)
        }
        game.state = "cancel_retreat_confirm"
    },
    retreat() {
        push_undo()
        goto_defender_retreat()
    },
}

states.cancel_retreat_confirm = {
    inactive: 'retreat',
    prompt() {
        view.prompt = "Retreat canceled."
        gen_action_done()
    },
    done() {
        clear_undo()
        switch_active_faction()
        end_attack_activation()
    },
}

states.choose_retreat_canceling_replacement = {
    inactive: 'retreat',
    prompt() {
        view.prompt = `Choose a replacement for ${piece_name(game.attack.replacement.p)} in ${space_name(game.attack.replacement.s)}.`
        game.attack.replacement.options.forEach(gen_action_piece)
    },
    piece(p) {
        push_undo()
        replace_retreat_canceling_unit(game.attack.replacement.p, game.attack.replacement.s, p)
        delete game.attack.replacement
        end_attack_activation()
    }
}

function replace_retreat_canceling_unit(unit, location, replacement) {
    game.location[replacement] = location
    logi(`${piece_name(unit, true)} in ${space_name(location)} broke to ${piece_name(replacement)}${log_corps(replacement)}`)
    check_rb_empty(replacement)
}

function goto_defender_retreat() {
    log("Retreat:")
    game.attack.retreat_path = []
    game.state = 'defender_retreat'
}

states.defender_retreat = {
    inactive: 'retreat',
    prompt() {
        const dist = game.attack.retreat_length - game.attack.retreat_path.length

        if (game.attack.retreating_pieces.length > 0)
            view.prompt = `Retreat ${dist} spaces with ${piece_list(game.attack.retreating_pieces)}.`
        else if (game.attack.to_retreat.length === 0)
            view.prompt = `Retreat: Done.`
        else
            view.prompt = `Retreat from ${space_name(game.attack.space)}.`

        if (game.attack.retreating_pieces.length > 0) {
            let from = game.location[game.attack.retreating_pieces[0]]
            let options = get_retreat_options(game.attack.retreating_pieces, from, game.attack.retreat_length - game.attack.retreat_path.length)
            if (options.length > 0)
                options.forEach(gen_action_space)
            else
                gen_action("eliminate")
        } else {
            for (let p of game.attack.to_retreat)
                gen_action_piece(p)
        }

        if (game.attack.retreating_pieces.length + game.attack.to_retreat.length === 0)
            gen_action("done")
    },
    select_all() {
        push_undo()
        game.attack.retreating_pieces = game.attack.to_retreat
        game.attack.to_retreat = []
    },
    piece(p) {
        if (game.attack.retreating_pieces.length === 0)
            push_undo()
        set_delete(game.attack.to_retreat, p)
        set_add(game.attack.retreating_pieces, p)
    },
    eliminate() {
        push_undo()
        let eliminated = []
        for (let p of game.attack.retreating_pieces) {
            let options_for_piece = get_retreat_options([p], game.location[p], game.attack.retreat_length - game.attack.retreat_path.length)
            if (options_for_piece.length > 0)
                continue // Only eliminate pieces that have no valid retreat options
            eliminate_piece(p, true, 'failure to retreat')
            eliminated.push(p)
            // 12.4.7, section 2
            // When an army is replaced by a corps and then that corps cannot fulfill a mandatory retreat, the army is
            // permanently eliminated
            for (let replaced in game.attack.defender_replacements) {
                let replacement = game.attack.defender_replacements[replaced]
                if (replacement === p) {
                    let replaced_piece = parseInt(replaced)
                    if (!set_has(game.removed, replaced_piece))
                        eliminate_piece(parseInt(replaced), true, 'failure to retreat')
                }
            }
        }

        eliminated.forEach((p) => { set_delete(game.attack.retreating_pieces, p) })
        if (game.attack.retreating_pieces.length === 0)
            this._next()
    },
    space(s) {
        update_russian_ne_restriction_flag(game.attack.retreating_pieces, game.location[game.attack.retreating_pieces[0]], s)

        game.attack.retreat_path.push(s)

        for (let p of game.attack.retreating_pieces) {
            if (set_has(game.broken_sieges, game.location[p]))
                set_delete(game.broken_sieges, game.location[p])
            game.location[p] = s
            if (game.failed_entrench)
                set_delete(game.failed_entrench, p)
        }

        if (game.attack.retreat_path.length === game.attack.retreat_length) {
            for (let p of game.attack.retreating_pieces)
                set_add(game.retreated, p)
            this._next()
        }
    },
    _next() {
        if (game.attack.retreat_path.length > 0) {
            const end_space = game.attack.retreat_path[game.attack.retreat_path.length - 1]
            if (!is_controlled_by(end_space, active_faction()) && !has_undestroyed_fort(end_space, game.attack.attacker)) {
                if (can_take_control(game.attack.retreating_pieces))
                    set_control(end_space, active_faction())
            }
            update_siege(end_space)

            game.attack.retreat_paths.push(game.attack.retreat_path)
        }

        if (game.attack.retreating_pieces.length > 0)
            logi(piece_list(game.attack.retreating_pieces) + " -> " + space_list(game.attack.retreat_path))

        game.attack.retreat_path = []
        game.attack.retreating_pieces.length = 0

        update_siege(game.attack.space)

        update_supply() // to warn if retreating OOS
    },
    done() {
        clear_undo()
        switch_active_faction()
        goto_attacker_advance()
    },
}

function get_retreat_options(pieces, from, spaces_to_retreat = 1) {
    if (pieces.length === 0 || spaces_to_retreat === 0)
        return []

    let faction = other_faction(game.attack.attacker)
    let options = []

    if (pieces.includes(MONTENEGRIN_CORPS))
        return [] // MNC cannot retreat (also prevents play of Withdrawal)

    get_connected_spaces_for_pieces(from, pieces).forEach((conn) => {
        if (conn === from)
            return

        if (conn === game.attack.space)
            return

        if (spaces_to_retreat === 1 && would_overstack(conn, pieces, faction))
            return

        if (is_blocked_italian_space(conn, pieces))
            return

        if (contains_piece_of_faction(conn, game.attack.attacker))
            return

        if (has_undestroyed_fort(conn, game.attack.attacker) && !is_besieged(conn))
            return

        // Remove any spaces that would violate the Russian NE (non-SR) restriction
        if (!check_russian_ne_restriction(pieces, conn))
            return

        if (is_brest_litovsk_restricted_group(pieces, conn))
            return

        if (!is_space_at_war(conn))
            return

        if (is_neareast_space(conn) && !can_enter_neareast(pieces)) {
            return
        }

        set_add(options, conn)
    })

    // If retreat length is 2 and any spaces allow a second space, remove those that don't
    if (spaces_to_retreat === 2) {
        let has_second_space = options.filter((first) => get_retreat_options(pieces, first, 1).length > 0 )
        if (has_second_space.length > 0)
            options = has_second_space
    }

    // if any options are friendly controlled, remove all enemy-controlled options
    let friendly_options = options.filter((s) => is_controlled_by(s, faction) || is_besieged(s))
    if (friendly_options.length > 0)
        options = friendly_options

    // if any spaces are in supply, remove all oos spaces
    let in_supply_options = options.filter((s) => is_every_unit_supplied_in(pieces, s))
    if (in_supply_options.length > 0)
        options = in_supply_options

    return options
}

function goto_attacker_advance() {
    // MNc can never move!
    set_delete(game.attack.to_advance, MONTENEGRIN_CORPS)

    if (game.attack.to_advance.length > 0) {
        game.attack.advancing_pieces = []
        game.attack.advance_length = 0
        game.state = 'attacker_advance'
    } else {
        end_attack_activation()
    }
}

states.attacker_advance = {
    inactive: 'advance',
    prompt() {
        const spaces = get_possible_advance_spaces(game.attack.advancing_pieces)
        const remaining_length = game.attack.retreat_length - game.attack.advance_length

        if (globalThis.RTT_FUZZER)
            gen_action_done()

        if (game.attack.advancing_pieces.length > 0) {
            if (spaces.length === 0)
                view.prompt = `Advance with ${piece_list(game.attack.advancing_pieces)} is not possible.`
            else if (remaining_length > 1)
                view.prompt = `Advance with ${piece_list(game.attack.advancing_pieces)} up to ${remaining_length} spaces.`
            else
                view.prompt = `Advance with ${piece_list(game.attack.advancing_pieces)} into ${space_list(spaces)}.`
        } else if (game.attack.to_advance.length === 0) {
            view.prompt = `Advance: Done.`
        } else {
            view.prompt = `You may advance into ${space_name(game.attack.space)}.`
        }

        if (game.attack.advance_length === 0) {
            game.attack.to_advance.forEach(gen_action_piece)
            if (game.attack.advancing_pieces.length === 0) {
                // TODO: select all
                gen_action_done()
            }
        } else if (game.attack.advance_length > 0) {
            let current_space = game.location[game.attack.advancing_pieces[0]]

            // Can only drop a piece if the current space is not overstacked
            let pieces_in_space_not_advancing = get_pieces_in_space(current_space).filter((p) => !game.attack.advancing_pieces.includes(p))
            if (pieces_in_space_not_advancing.length < STACKING_LIMIT)
                for (let p of game.attack.advancing_pieces)
                    gen_action_piece(p)

            // If stopping here would overstack, must not stop
            if (!is_overstacked(current_space, game.attack.attacker))
                gen_action("stop")
        }

        if (game.attack.advancing_pieces.length > 0) {
            if (spaces.length > 0)
                spaces.forEach(gen_action_space)
            else
                gen_action("stop")
        }
    },
    piece(p) {
        if (set_has(game.attack.advancing_pieces, p)) {
            const end_space = game.location[p]
            logi(piece_name(p) + " -> " + space_name(end_space))
            if (has_undestroyed_fort(end_space, other_faction(game.attack.attacker))) {
                set_add(game.forts.besieged, end_space)
            }
            set_delete(game.attack.advancing_pieces, p)
            if (game.attack.advancing_pieces.length === 0)
                game.attack.advance_length = 0
        } else {
            if (game.attack.advancing_pieces.length === 0) {
                push_undo()
                if (!game.attack.advanced) {
                    log("Advance:")
                    game.attack.advanced = 1
                }
            }
            set_add(game.attack.advancing_pieces, p)
            set_delete(game.attack.to_advance, p)
        }
    },
    space(s) {
        let leaving_spaces = []
        update_siege(s) // Remove besiege marke if space is friendly
        game.attack.did_advance = true
        game.attack.advancing_pieces.forEach((p) => {
            set_add(leaving_spaces, game.location[p])
            game.location[p] = s
        })
        game.attack.advance_length++
        if (has_undestroyed_fort(s, other_faction(active_faction()))) {
            if (can_besiege(s, get_pieces_in_space(s))) {
                set_add(game.forts.besieged, s)
            }
        } else {
            if (can_take_control(game.attack.advancing_pieces))
                set_control(s, game.attack.attacker)
        }
        capture_trench(s, game.attack.attacker)

        leaving_spaces.forEach(update_siege) // Update any forts in the spaces left by the advancing pieces

        const remaining_length = game.attack.retreat_length - game.attack.advance_length
        let terrain = data.spaces[s].terrain
        if (
            terrain === MOUNTAIN ||
            terrain === SWAMP ||
            terrain === FOREST ||
            terrain === DESERT ||
            remaining_length === 0 ||
            get_possible_advance_spaces(game.attack.advancing_pieces).length === 0
        )
            this.stop()

        update_supply() // to warn if advancing OOS
    },
    stop() {
        const end_space = game.location[game.attack.advancing_pieces[0]]
        logi(piece_list(game.attack.advancing_pieces) + " -> " + space_name(end_space))
        if (has_undestroyed_fort(end_space, other_faction(game.attack.attacker))) {
            set_add(game.forts.besieged, end_space)
        }
        game.attack.advancing_pieces.length = 0
        game.attack.advance_length = 0
    },
    done() {
        push_undo()
        end_attack_activation()
    },
}

function get_possible_advance_spaces(pieces) {
    if (game.attack.advance_length >= game.attack.retreat_length)
        return []

    if (pieces.length === 0)
        return []

    // If the attacking pieces haven't entered the attack space (always true if this is a 1-space advance), that is the only choice
    let location_of_advancing_units = game.location[pieces[0]]
    if (game.attack.space !== location_of_advancing_units) {
        if (game.attack.retreat_length > 1 && can_advance_through(game.attack.space, pieces, game.attack.retreat_paths))
            return [game.attack.space]
        else if (can_advance_into(game.attack.space, pieces))
            return [game.attack.space]
        else
            return []
    }

    if (is_besieged(location_of_advancing_units)) {
        if (!can_besiege(location_of_advancing_units, get_pieces_in_space(location_of_advancing_units).filter(p => !pieces.includes(p)))) {
            return [] // If leaving a besieged space and the remaining pieces are insufficient to maintain the siege, do not allow the advance
        }
    }

    let terrain = data.spaces[game.attack.space]
    let terrain_allows_advance = terrain !== MOUNTAIN && terrain !== SWAMP && terrain !== FOREST && terrain !== DESERT

    // If the terrain prevents a second advance
    if (!terrain_allows_advance)
        return []

    let spaces = []
    for (let path of game.attack.retreat_paths) {
        if (can_advance_into(path[0], pieces))
            set_add(spaces, path[0]) // Add the first retreat space from each retreated path
    }

    // 12.7.7 Central Powers units may advance into Amiens, Calais, or Ostend only if one of the following applies:
    // • if it was the defending space in the Combat.
    // • if the Race to the Sea Event has been played.
    // • if the Central Powers War Status is 4 or higher.
    if (game.attack.attacker === CP && !game.events.race_to_the_sea && game.cp.ws < 4) {
        if (game.attack.space !== AMIENS)
            set_delete(spaces, AMIENS)
        if (game.attack.space !== CALAIS)
            set_delete(spaces, CALAIS)
        if (game.attack.space !== OSTEND)
            set_delete(spaces, OSTEND)
    }

    // Filter out any spaces that do not have a valid connection. This could happen if the retreating pieces crossed
    // a nation-specific connection, such as Russians retreating into one of their supply centers.
    let connected = get_connected_spaces_for_pieces(location_of_advancing_units, pieces)
    spaces = spaces.filter(s => connected.includes(s))

    return spaces
}

function can_advance_into(space, units, can_overstack = false) {
    // Advance into a fort is only allowed if you have sufficient advancing units to besiege the fort (12.7.6)
    if (has_undestroyed_fort(space, other_faction(game.attack.attacker)) && !is_besieged(space) && !can_besiege(space, units))
        return false

    if (contains_piece_of_faction(space, other_faction(game.attack.attacker)))
        return false

    // Cannot advance into neutral nations
    if (!is_space_at_war(space))
        return false

    if (!can_overstack && would_overstack(space, units, game.attack.attacker))
        return false

    if (is_blocked_italian_space(space, units))
        return false

    return true
}

function can_advance_through(space, units, retreat_paths) {
    if (!can_advance_into(space, units, true))
        return false

    return retreat_paths.some((path) => can_advance_into(path[0], units))
}

function eliminate_ru_units_violating_treaty_of_brest_litovsk() {
    if (game.events.treaty_of_brest_litovsk === 0)
        return

    log('RU units cannot stack with AP after Brest-Litovsk')

    for (let s = 1; s < map_space_count; ++s) {
        let has_ap_non_russian = false
        let russian_units = []

        for (let p of get_pieces_in_space(s)) {
            if (data.pieces[p].faction === AP) {
                if (data.pieces[p].nation === RUSSIA) {
                    russian_units.push(p)
                } else {
                    has_ap_non_russian = true
                }
            }
        }

        if (has_ap_non_russian && russian_units.length > 0) {
            for (let p of russian_units) {
                // Send to eliminated box, but don't call eliminate_piece since we don't want to permanently eliminate
                // the piece, even if there are no corps remaining in the reserve box
                log(`>${piece_name(p)} in ${space_name(game.location[p])} eliminated`)
                send_to_eliminated_box(p)
            }
        }
    }

    log('RU units can only operate in Russia, Germany, Turkey, Austria and Romania')

    const allowed_nations = [RUSSIA, GERMANY, TURKEY, AUSTRIA_HUNGARY, ROMANIA]
    for (let p of all_pieces_by_nation[RUSSIA]) {
        const location = game.location[p]
        if (location >= AP_RESERVE_BOX || location === 0)
            continue
        const nation = data.spaces[location].nation
        if (!allowed_nations.includes(nation)) {
            log(`>${piece_name(p)} in ${space_name(location)} eliminated`)
            send_to_eliminated_box(p)
        }
    }
}

// === FORTS AND SIEGES ===

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
        if (data.pieces[p].faction === data.spaces[space].faction) {
            return false
        }
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
    }
}

function is_possible_sud_army_stack(pieces) {
    // Sud army stack may be any 1 AH piece (army or corps) with at least 1 GE corps and any other corps
    let ge_corps = 0
    let ah_corps = 0
    let ah_armies = 0

    for (let p of pieces) {
        const nation = data.pieces[p].nation
        const type = data.pieces[p].type
        if (nation === AUSTRIA_HUNGARY) {
            if (type === ARMY)
                ah_armies++
            else
                ah_corps++
        } else if (type === ARMY) {
            return false // Any non-AH army means this cannot be a Sud Army stack
        } else if (nation === GERMANY) {
            ge_corps++
        }
    }

    return (ah_armies + ah_corps > 0 && ah_armies <= 1 && ge_corps >= 1)
}

function get_sud_army_activation_cost(pieces) {
    if (!is_possible_sud_army_stack(pieces))
        return undefined

    let ge = 0
    let ah = 0
    let other = 0
    pieces.forEach((p) => {
        const nation = data.pieces[p].nation
        if (nation === GERMANY)
            ge++
        else if (nation === AUSTRIA_HUNGARY)
            ah++
        else
            other++
    })
    if (ah === 1 && ge >= 1 && other === 0)
        return 1
    else
        return 2
}

function get_piece_nation_for_activation(p) {
    if (p === BRITISH_ANA_CORPS) return BRITAIN
    if (p === MONTENEGRIN_CORPS) return SERBIA
    if (p === TURKISH_SN_CORPS) return TURKEY
    return data.pieces[p].nation
}

function cost_to_activate(space, type) {
    let nations = []
    let pieces = []
    let num_russians = 0
    let num_pieces = 0
    let faction = AP
    for_each_piece_in_space(space, (piece) => {
        num_pieces++
        let n = get_piece_nation_for_activation(piece)
        if (n === RUSSIA) num_russians++
        set_add(nations, n)
        pieces.push(piece)
        if (data.pieces[piece].faction === CP) faction = CP
    })
    let cost = nations.length

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

    // Everyone into Battle modifies the activation cost for Allied units in Italy, France, and Belgium
    // Apply this cost after the cost reductions for British units stacked with Belgians and French units
    // stacked with US, to avoid a zero-cost activation.
    if (faction === AP &&
        game.turn === game.events.everyone_into_battle &&
        [ITALY, FRANCE, BELGIUM].includes(data.spaces[space].nation)) {
        cost = 1
    }

    // Sud Army modifies the activation cost for one stack per action round
    if (active_faction() === CP && game.events.sud_army > 0 && is_possible_sud_army_stack(pieces)) {
        if (!game.sud_army_space || game.sud_army_space === space) {
            cost = get_sud_army_activation_cost(pieces)
        }
    }

    if (active_faction() === CP && game.events.moltke > 0 && !game.events.falkenhayn) {
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
    let fall_of_the_tsar_attack = game.events.fall_of_the_tsar > 0 && num_russians > 0 && type === ATTACK
    if (fall_of_the_tsar_attack) {
        cost = num_russians + nations.length - 1
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
        pieces.forEach((p) => {
            if (p === MEF_ARMY) {
                cost += 3
            } else if (data.pieces[p].nation === BRITAIN || fall_of_the_tsar_attack) {
                cost++
            }
        })
        if (!fall_of_the_tsar_attack) {
            cost += nations.length - 1
        }
    }

    return cost
}

// === ATTRITION PHASE ===

function goto_attrition_phase() {

    log_h2("Attrition Phase")
    game.phase = "Attrition Phase"

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

    // Get all OOS pieces that should suffer attrition
    let turkish_units_in_medina = false
    for (let p of game.oos_pieces) {
        const faction = data.pieces[p].faction
        if (game.location[p] === MEDINA && data.pieces[p].nation === TURKEY) {
            // Turkish units in Medina do not suffer attrition, even though they may be OOS
            turkish_units_in_medina = true
        } else {
            set_add(game.attrition[faction].pieces, p)
        }
    }

    // Get all OOS spaces that should flip control
    for (let s = 1; s < map_space_count; ++s) {
        const controlling_faction = is_controlled_by(s, AP) ? AP : CP
        if (controlling_faction === AP && data.spaces[s].nation === SERBIA) {
            continue // Under rule 14.1.5, Serbian spaces only convert when CP units enter the spaces.
        }
        if (!is_space_at_war(s))
            continue
        if (s >= AP_RESERVE_BOX)
            continue
        if (is_mef_space(s)) {
            continue // MEF spaces do not flip control
        }
        if (s === ARABIA_SPACE)
            continue
        if (s === MEDINA && turkish_units_in_medina)
            continue
        if (has_undestroyed_fort(s, controlling_faction)) {
            continue // Under rule 14.3.6, spaces with undestroyed forts do not flip control
        }
        if (controlling_faction === CP && game.location[TURKISH_SN_CORPS] === s) // SN corps keeps its space safe from attrition per 11.1.16
            continue
        if (!is_space_supplied_or_has_supplied_unit(s, controlling_faction)) {
            set_add(game.attrition[controlling_faction].spaces, s)
        }
    }

    if (game.attrition.ap.spaces.length > 0 || game.attrition.ap.pieces.length > 0) {
        game.state = 'attrition_phase'
        set_active_faction(AP)
    } else if (game.attrition.cp.spaces.length > 0 || game.attrition.cp.pieces.length > 0) {
        game.state = 'attrition_phase'
        set_active_faction(CP)
    } else {
        goto_siege_phase()
    }
}

states.attrition_phase = {
    inactive: 'remove OOS pieces and flip OOS spaces',
    prompt() {
        let pieces = game.attrition[active_faction()].pieces
        let spaces = game.attrition[active_faction()].spaces
        const pieces_str = pieces.length <= 3 && pieces.length > 0 ? ` (${piece_list(pieces)})` : ""
        const spaces_str = spaces.length <= 3 && spaces.length > 0 ? ` (${space_list(spaces)})` : ""
        view.prompt = `Attrition Phase: Remove OOS pieces${pieces_str} and flip OOS spaces${spaces_str}.`
        pieces.forEach((p) => { gen_action_piece(p) })
        spaces.forEach((s) => { gen_action_space(s) })
    },
    piece(p) {
        let loc = game.location[p]
        set_delete(game.attrition[active_faction()].pieces, p)
        if (data.pieces[p].type === ARMY) {
            log_alert(`Permanently removed ${piece_name(p)} from ${space_name(game.location[p])}`)
            game.location[p] = PERM_ELIMINATED_BOX
            set_add(game.removed, p)
        } else {
            log(`Removed ${piece_name(p)} from ${space_name(game.location[p])}`)
            send_to_eliminated_box(p)
        }

        update_siege(loc)

        if (game.attrition[active_faction()].spaces.length === 0 && game.attrition[active_faction()].pieces.length === 0) {
            if (game.attrition[other_faction(active_faction())].spaces.length > 0 || game.attrition[other_faction(active_faction())].pieces.length > 0) {
                clear_undo()
                switch_active_faction()
            } else {
                goto_siege_phase()
            }
        }
    },
    space(s) {
        set_delete(game.attrition[active_faction()].spaces, s)
        log(`Flipped control of ${space_name(s)}`)
        set_control(s, other_faction(active_faction()))

        if (get_trench_level(s, active_faction()) > 0) {
            log(`Removed trench in ${space_name(s)}`)
            set_trench_level(s, 0, active_faction())
        }

        if (game.attrition[active_faction()].spaces.length === 0 && game.attrition[active_faction()].pieces.length === 0) {
            if (game.attrition[other_faction(active_faction())].spaces.length > 0 || game.attrition[other_faction(active_faction())].pieces.length > 0) {
                clear_undo()
                switch_active_faction()
            } else {
                goto_siege_phase()
            }
        }
    }
}

// === SIEGE PHASE ===

function goto_siege_phase() {
    if (game.forts.besieged.length > 0) {
        log_h2("Siege Phase")
        game.phase = "Siege Phase"
        game.state = 'siege_phase'
        const ap_has_sieges = game.forts.besieged.some((s) => data.spaces[s].faction === CP)
        set_active_faction(ap_has_sieges ? AP : CP)
        game.sieges_to_roll = [...game.forts.besieged]
    } else {
        goto_war_status_phase()
    }
}

states.siege_phase = {
    inactive: 'roll for besieged forts',
    prompt() {
        let siege_spaces = game.sieges_to_roll.filter((s) => data.spaces[s].faction === inactive_faction())
        siege_spaces.forEach(gen_action_space)
        view.prompt = `Roll for besieged forts: ${space_list(siege_spaces)}.`
    },
    space(s) {
        array_remove_item(game.sieges_to_roll, s)
        let roll = roll_die(6)
        const drm = game.turn <= 2 ? -2 : 0
        const fort_str = data.spaces[s].fort
        log(`Siege at ${space_name(s)} (${data.spaces[s].fort} CF): ${fmt_roll(roll, drm)}`)
        if (roll + drm > fort_str) {
            logi(`Fort destroyed`)
            array_remove_item(game.forts.besieged, s)
            set_add(game.forts.destroyed, s)
            set_control(s, active_faction())
            capture_trench(s, active_faction())
        } else {
            logi(`Fort holds`)
        }
        log_event_for_rollback(`Siege roll at ${space_name(s)}`)

        if (game.sieges_to_roll.length === 0) {
            goto_war_status_phase()
        } else if (!game.sieges_to_roll.some((s) => data.spaces[s].faction === inactive_faction()) && game.sieges_to_roll.some((s) => data.spaces[s].faction === active_faction())) {
            clear_undo()
            switch_active_faction()
        }
    }
}

// === WAR STATUS PHASE ===

function goto_war_status_phase() {
    // E. War Status Phase
    log_h2("War Status Phase")
    game.phase = "War Status Phase"

    // E.1. Check the Victory Point table and make any changes called for under the “During the War Status Phase”
    // section of the table.
    // If blockade event active and it's a winter turn, -1 VP
    if (game.events.blockade >= 1 && game.turn % 4 === 0) {
        game.vp -= 1
        record_score_event(-1, BLOCKADE)
        log(`-1 VP -- ${card_name(BLOCKADE)} in effect`)
    }
    // If CP failed to conduct their mandated offensive, -1 VP
    if (game.cp.mo !== NONE) {
        game.vp -= 1
        game.cp.missed_mo.push(game.turn)
        log(`-1 VP -- ${faction_name(CP)} failed to conduct their mandated offensive (${nation_name(game.cp.mo)})`)
    }
    // If Italy is still neutral but AP at Total War, +1 VP
    if (!nation_at_war(ITALY) && game.ap.commitment === COMMITMENT_TOTAL) {
        game.vp += 1
        record_score_event(1, ITALY_ENTRY)
        log(`+1 VP -- ${nation_name(ITALY)} is still neutral but ${faction_name(AP)} at Total War`)
    }

    const french_mutiny_active = game.events.french_mutiny > 0 && game.ap.mo === FRANCE
    // If AP failed to conduct their mandated offensive, +1 VP (except FR after French Mutiny event)
    if (game.ap.mo !== NONE && !french_mutiny_active) {
        game.vp += 1
        game.ap.missed_mo.push(game.turn)
        log(`+1 VP -- ${faction_name(AP)} failed to conduct their mandated offensive (${nation_name(game.ap.mo)})`)
    }

    // E.4. Each player determines if his War Commitment Level has increased. This is not checked on the August 1914
    // turn (turn 1). If the appropriate War Status conditions are met, Limited War or Total War cards may be added
    // to the Draw Pile at this time.
    if (game.turn !== 1) {
        if (game.ap.ws >= 4 && game.ap.commitment === COMMITMENT_MOBILIZATION) {
            game.ap.commitment = COMMITMENT_LIMITED
            log_h3(`${faction_name(AP)} War Commitment Level rises to Limited War`, AP)
            add_cards_to_deck(AP, COMMITMENT_LIMITED, game.ap.deck)
            game.ap.shuffle = true
        }
        if (game.cp.ws >= 4 && game.cp.commitment === COMMITMENT_MOBILIZATION) {
            game.cp.commitment = COMMITMENT_LIMITED
            log_h3(`${faction_name(CP)} War Commitment Level rises to Limited War`, CP)
            add_cards_to_deck(CP, COMMITMENT_LIMITED, game.cp.deck)
            game.cp.shuffle = true
            set_nation_at_war(TURKEY)
        }
        if (game.ap.ws >= 11 && game.ap.commitment === COMMITMENT_LIMITED) {
            game.ap.commitment = COMMITMENT_TOTAL
            log_h3(`${faction_name(AP)} War Commitment Level rises to Total War`, AP)
            add_cards_to_deck(AP, COMMITMENT_TOTAL, game.ap.deck)
            game.ap.shuffle = true
        }
        if (game.cp.ws >= 11 && game.cp.commitment === COMMITMENT_LIMITED) {
            game.cp.commitment = COMMITMENT_TOTAL
            log_h3(`${faction_name(CP)} War Commitment Level rises to Total War`, CP)
            add_cards_to_deck(CP, COMMITMENT_TOTAL, game.cp.deck)
            game.cp.first_total_war = true // First turn at Total War CP is not eligible for the Sedan bonus RP
            game.cp.shuffle = true
        }
    }

    // E.2. Determine if either player has won an Automatic Victory.
    if (game.vp <= 0) {
        goto_game_over(AP, get_result_message("Automatic Victory: ", AP))
        return
    }
    else if (game.vp >= 20) {
        goto_game_over(CP, get_result_message("Automatic Victory: ", CP))
        return
    }
    // E.3. Determine winner if an Armistice has been declared.
    else if (game.ap.ws + game.cp.ws >= 40) {
        let result = get_game_result_by_vp()
        goto_game_over(result, get_result_message("Armistice Declared: ", result))
    }
    else {
        apply_replacement_phase_events()
        goto_replacement_phase()
    }
}

function add_cards_to_deck(faction, commitment, deck) {
    for (let i = 1; i < data.cards.length; i++) {
        if (data.cards[i].commitment === commitment && data.cards[i].faction === faction && data.utils.is_card_allowed_to_deal(i, game.options)) {
            deck.push(i)
        }
    }
}

// === VICTORY ===

function get_game_result_by_vp() {
    if (use_historical_scenario_rules()) {
        // In the historical scenario, certain unplayed cards affect the final VP tally, per 5.7.4
        [USA_REINFORCEMENTS_2, USA_REINFORCEMENTS_3].forEach((c) => {
            if (!game.events.reinforcements || !game.events.reinforcements.includes(c)) {
                game.vp++ // Each unplayed US army reinforcement card adds 1 VP
                log(`+1 VP -- Unplayed US army reinforcement card - ${card_name(c)}`)
            }
        })

        if (!game.events.fall_of_the_tsar > 0) {
            game.vp -= 2 // If the Fall of the Tsar event was not played, subtract 2 VP
            log(`-2 VP -- ${card_name(FALL_OF_THE_TSAR)} was not played`)
        }
    }

    let cp_threshold = game.events.treaty_of_brest_litovsk > 0 ? 11 : 13
    let ap_threshold = 9
    if (game.vp >= cp_threshold) {
        return CP
    } else if (use_historical_scenario_rules() || game.vp <= ap_threshold) {
        return AP
    } else {
        return "Draw" // Historical scenario draws go to the Allies, so this is future-proofing for other scenarios
    }
}

function get_result_message(prefix, result) {
    if (result === AP)
        return `${prefix}${faction_name(AP)} won.`
    if (result === CP)
        return `${prefix}${faction_name(CP)} won.`
    if (result === "Draw")
        return `${prefix}Game ended in a draw.`
    return `${prefix}Game result unknown.`
}

function goto_game_over(result, victory) {
    log_br()
    log(victory)
    game.state = 'game_over'
    game.active = 'None'
    game.result = faction_name(result)
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

// === REPLACEMENT PHASE ===

function apply_replacement_phase_events() {
    if (game.turn === game.events.zeppelin_raids) {
        game.rp.br = Math.max(game.rp.br - 4, 0)
        log(`${card_name(ZEPPELIN_RAIDS)} subtracts 4 British RP`)
        delete game.events.zeppelin_raids
    }

    // 5.7.3 The CP receives 1 German RP each turn during Total War (i.e., after it has drawn TW cards) if it controls
    // Sedan and two additional French or Belgian spaces during the RP interphase.
    if (game.cp.commitment === COMMITMENT_TOTAL && is_controlled_by(SEDAN, CP) && !game.cp.first_total_war) {
        let cp_fr_be_spaces = 0
        cp_fr_be_spaces += all_spaces_by_nation[FRANCE].filter((s => is_controlled_by(s, CP))).length
        cp_fr_be_spaces += all_spaces_by_nation[BELGIUM].filter((s => is_controlled_by(s, CP))).length
        if (cp_fr_be_spaces >= 3) {
            game.rp.ge++
            log(`${faction_name(CP)} gains 1 German RP for controlling Sedan and 2 other French/Belgian spaces`)
        }
    } else {
        delete game.cp.first_total_war
    }

    if (game.events.walter_rathenau > 0 && !game.events.independent_air_force) {
        game.rp.ge++
        log(`${card_name(WALTER_RATHENAU)} adds 1 German RP`)
    }

    if (game.rp.br >= 1 && game.events.uboats_unleashed > 0 && !game.events.convoy) {
        game.rp.br--
        log(`${card_name(U_BOATS_UNLEASHED)} subtracts 1 British RP`)
    }
}

function goto_replacement_phase() {
    clear_undo()
    update_supply()
    game.phase = "Replacement Phase"
    if (has_rps(AP)) {
        log_h2(`${faction_name(AP)} Replacement Phase`)
        set_active_faction(AP)
        game.state = 'replacement_phase'
        if (game.rp.ru > 1 && game.events.bolshevik_revolution > 0) {
            game.rp.ru = 1
            log("Russian RP are set to 1 due to the Bolshevik Revolution")
        }
    } else if (has_rps(CP)) {
        log_h2(`${faction_name(CP)} Replacement Phase`)
        set_active_faction(CP)
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
        if (game.rp.us > 0) return true
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
        game.rp.us = 0
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

function summarize_rps(faction) {
    let rp_string = (num, type) => {
        if (num === Math.floor(num)) {
            return `${num} ${type}`
        } else {
            return `${Math.floor(num)} ${type} +1 corps`
        }
    }

    let summary = []
    if (faction === AP) {
        if (game.rp.fr > 0) summary.push(`${rp_string(game.rp.fr, 'FR')}`)
        if (game.rp.br > 0) summary.push(`${rp_string(game.rp.br, 'BR')}`)
        if (game.rp.ru > 0) summary.push(`${rp_string(game.rp.ru, 'RU')}`)
        if (game.rp.allied > 0) summary.push(`${rp_string(game.rp.allied, 'Allied')}`)
        if (game.rp.it > 0) summary.push(`${rp_string(game.rp.it, 'IT')}`)
        if (game.rp.us > 0) summary.push(`${rp_string(game.rp.us, 'US')}`)
    } else if (faction === CP) {
        if (game.rp.ge > 0) summary.push(`${rp_string(game.rp.ge, 'GE')}`)
        if (game.rp.ah > 0) summary.push(`${rp_string(game.rp.ah, 'AH')}`)
        if (game.rp.bu > 0) summary.push(`${rp_string(game.rp.bu, 'BU')}`)
        if (game.rp.tu > 0) summary.push(`${rp_string(game.rp.tu, 'TU')}`)
    }
    return summary.join(', ')
}

states.replacement_phase = {
    inactive: 'spend replacement points',
    prompt() {
        if (game.army_to_rebuild) {
            view.prompt = `Replacement Phase: Rebuild ${piece_name(game.army_to_rebuild)}.`
            get_army_replacement_spaces(game.army_to_rebuild).forEach(gen_action_space)
        } else {
            const replaceable_units = get_replaceable_units()
            if (has_rps(active_faction()) && replaceable_units.length > 0) {
                view.prompt = `Replacement Phase: Spend RPs to rebuild or flip units (${summarize_rps(active_faction())}).`
                replaceable_units.forEach(gen_action_piece)
                gen_action("confirm_end_rp")
            } else {
                view.prompt = `Replacement Phase: Done.`
                gen_action("end_rp")
            }
        }
    },
    piece(p) {
        push_undo()
        const piece_data = data.pieces[p]
        if (piece_data.type === ARMY) {
            if (is_unit_eliminated(p)) {
                game.army_to_rebuild = p
            } else {
                set_delete(game.reduced, p)
                log(`Flipped ${piece_name(p)} in ${space_name(game.location[p])} to full strength`)
                spend_rps(get_rp_type(p), 1)
            }
        } else {
            if (is_unit_eliminated(p)) {
                set_add(game.reduced, p)
                if (p === BRITISH_ANA_CORPS)
                    game.location[p] = ARABIA_SPACE
                else
                    game.location[p] = active_faction() === AP ? AP_RESERVE_BOX : CP_RESERVE_BOX
                spend_rps(get_rp_type(p), 0.5)
                log(`Rebuilt ${piece_name(p)}${log_corps(p)} `)
            } else {
                set_delete(game.reduced, p)
                spend_rps(get_rp_type(p), 0.5)
                log(`Flipped ${piece_name(p)}${log_corps(p)} in ${space_name(game.location[p])} to full strength`)
            }
        }
    },
    space(s) {
        push_undo()
        set_add(game.reduced, game.army_to_rebuild)
        game.location[game.army_to_rebuild] = s
        spend_rps(get_rp_type(game.army_to_rebuild), 1)
        log(`Rebuilt ${piece_name(game.army_to_rebuild)} at ${space_name(s)}`)
        delete game.army_to_rebuild
    },
    done() {
        this.end_rp()
    },
    confirm_end_rp() {
        this.end_rp()
    },
    end_rp() {
        remove_rps(active_faction())
        if (active_faction() === AP) {
            set_active_faction(CP)
        }
        delete game.army_to_rebuild
        goto_replacement_phase()
    },
}

function get_replaceable_units() {
    let units = []
    for (let i = 1; i < data.pieces.length; ++i) {
        let s = game.location[i]
        const piece_data = data.pieces[i]
        if (piece_data.faction !== active_faction())
            continue

        if (piece_data.notreplaceable)
            continue

        const rp_type = get_rp_type(i)
        const rps_available = get_rps_of_type(rp_type)
        if (rps_available === 0)
            continue

        if (s === 0)
            continue

        // If any capital been occupied, the nation cannot use rps
        if (any_capital_occupied_or_besieged(piece_data.nation) && piece_data.nation !== SERBIA)
            continue

        if (is_controlled_by(WARSAW, AP) && piece_data.name === 'PLc')
            continue

        if (piece_data.type === ARMY) {
            if ((s === AP_ELIMINATED_BOX || s === CP_ELIMINATED_BOX) && get_army_replacement_spaces(i).length === 0)
                continue
            if (rps_available < 1)
                continue
        }

        if (is_unit_eliminated(i)) {
            units.push(i)
        } else if (is_unit_reduced(i)) {
            if (s === AP_RESERVE_BOX || s === CP_RESERVE_BOX) {
                units.push(i)
            } else if (s < map_space_count) {
                // TODO: 17.1.4.1 check
                if (is_unit_supplied_for_rp_in(i, s))
                    units.push(i)
            }
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

function get_army_replacement_spaces(p) {
    let spaces = []

    if (data.pieces[p].nation === BELGIUM) {
        //  17.1.5: Belgian Army units may be rebuilt in Brussels, Antwerp, or Ostend. The Belgian Army may not be built in Antwerp
        //  if a line of supply does not exist. If none of these spaces are Allied controlled and in supply, the Belgian
        //  Army may be rebuilt in Calais. (Calais also represents the corner of Belgium held by the Allies after October
        //  1914.)
        const belgian_spaces = [BRUSSELS, ANTWERP, OSTEND, LIEGE]
        for (let s of belgian_spaces) {
            if (is_controlled_by(s, AP) && is_unit_supplied_in(p, s) && !is_fully_stacked(s, AP))
                set_add(spaces, s)
        }
        if (spaces.length === 0) {
            if (is_controlled_by(CALAIS, AP) && is_unit_supplied_in(p, CALAIS) && !is_fully_stacked(CALAIS, AP))
                set_add(spaces, CALAIS)
        }
        return spaces
    }

    get_available_reinforcement_spaces(p).forEach((s) => set_add(spaces, s))

    if (data.pieces[p].nation === SERBIA) {
        //  Also 17.1.5: Serbian Army units may be recreated at Salonika if the Salonika or Greece Neutral Entry Event
        //  Cards have been played and Salonika is under Allied control. They may also be recreated in Belgrade
        //  following normal reinforcement restrictions.
        if (game.events.salonika > 0 || game.events.greece_entry > 0) {
            if (is_controlled_by(SALONIKA, AP) && is_unit_supplied_in(p, SALONIKA) && !is_fully_stacked(SALONIKA, AP))
                set_add(spaces, SALONIKA)
        }

        // Exception: Serb armies may not be recreated at Belgrade if Nis is under CP control.
        if (is_controlled_by(NIS, CP))
            set_delete(spaces, BELGRADE)
    }

    return spaces
}

// === DRAW CARDS PHASE ===

function goto_draw_cards_phase() {
    // All played combat cards are discarded
    game.combat_cards.forEach((c) => {
        game[data.cards[c].faction].discard.push(c)
    })
    game.combat_cards.length = 0
    log_h2(`Draw Strategy Cards Phase`)
    game.phase = "Draw Strategy Cards Phase"
    goto_ap_draw_cards_phase()
}

function goto_ap_draw_cards_phase() {
    if (game.ap.hand.length > 0 && game.turn !== 20) {
        game.state = 'draw_cards_phase'
        set_active_faction(AP)
        game.discarded_ccs = []
    } else {
        deal_ap_cards()
        goto_cp_draw_cards_phase()
    }
}

function goto_cp_draw_cards_phase() {
    if (game.cp.hand.length > 0 && game.turn !== 20) {
        game.state = 'draw_cards_phase'
        set_active_faction(CP)
        game.discarded_ccs = []
    } else {
        deal_cp_cards()
        goto_end_turn()
    }
}

states.draw_cards_phase = {
    inactive: 'discard combat cards',
    prompt() {
        view.prompt = `You may discard combat cards before drawing new cards.`
        game[active_faction()].hand.forEach((c) => {
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
        array_remove_item(game[active_faction()].hand, c)
        game[active_faction()].discard.push(c)
        game.discarded_ccs.push(c)
    },
    done() {
        clear_undo()
        if (active_faction() === AP) {
            if (game.discarded_ccs.length > 0) {
                log(`${faction_name(AP)} discarded:`)
                for (let c of game.discarded_ccs) {
                    logi(`${card_name(c)}`)
                }
            }

            deal_ap_cards()
            goto_cp_draw_cards_phase()
        } else {
            if (game.discarded_ccs.length > 0) {
                log(`${faction_name(CP)} discarded:`)
                for (let c of game.discarded_ccs) {
                    logi(`${card_name(c)}`)
                }
            }

            deal_cp_cards()
            goto_end_turn()
        }
    }
}

function other_faction(faction) {
    return faction === CP ? AP : CP
}

// === ACTIONS ===

function gen_action_next() {
    gen_action('next')
}

function gen_action_done() {
    gen_action('done')
}

function gen_action_skip() {
    gen_action('skip')
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

// === NAMES ===

function card_name(card) {
    return `c${card}`
}

function piece_name(piece, show_as_reduced) {
    if (show_as_reduced || is_unit_reduced(piece)) {
        return `p${piece}`
    }
    else {
        return `P${piece}`
    }
}

function piece_list(pieces) {
    return pieces.map((p) => piece_name(p)).join(', ')
}

function space_name(space) {
    return `s${space}`
}

function space_list(spaces) {
    return spaces.map((s) => space_name(s)).join(', ')
}

// === MAP UTILITIES ===

function get_connected_spaces_for_pieces(s, pieces) {
    if (pieces.length > 0 && pieces.every((p) => data.pieces[p].nation === data.pieces[pieces[0]].nation)) {
        return get_connected_spaces(s, data.pieces[pieces[0]].nation)
    } else {
        return get_connected_spaces(s)
    }
}

function get_connected_spaces(s, nation) {
    if (nation === undefined)
        return data.spaces[s].connections
    return data.spaces[s].limited_connections[nation] ?? data.spaces[s].connections
}

function is_port(s, faction, is_supply_check = false) {
    if (faction === AP && s === game.mef_beachhead && !game.mef_beachhead_captured)
        return true

    if (is_supply_check && s === RIGA && faction === CP && is_besieged(s))
        return false // Besieged Riga does not function as a CP port for supply purposes

    if (s === CONSTANTINOPLE && faction === AP && !is_controlled_by(GALLIPOLI, AP))
        return false // AP cannot use Constantinople as a port unless they control Gallipoli

    return (faction === AP && data.spaces[s].apport) || (faction === CP && data.spaces[s].cpport)
}

function is_neareast_space(s) {
    return data.spaces[s].map === 'neareast'
}

function current_card_name() {
    return data.cards[game.last_card].name
}

states.place_new_neutral_units = {
    inactive() {
        view.prompt = `execute "${current_card_name()}"`
    },
    prompt() {
        if (game.units_to_place.length > 0) {
            view.prompt = `${current_card_name()}: Place ${game.units_to_place.length} new units.`
            let available_spaces = []
            const nation = data.pieces[game.units_to_place[0]].nation
            for (let s of all_spaces_by_nation[nation]) {
                set_add(available_spaces, s)
            }
            for (let i = 0; i < game.location.length; ++i) {
                set_delete(available_spaces, game.location[i])
            }
            available_spaces.forEach((s) => {
                gen_action_space(s)
            })
        } else {
            view.prompt = current_card_name() + ": Done."
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

const SUPPLY_MASK = {
    NonItalianPath: 1 << 0,
    NonMEFPath: 1 << 1,
    Essen: 1 << 2,
    Breslau: 1 << 3,
    Sofia: 1 << 4,
    Constantinople: 1 << 5,
    Petrograd: 1 << 6,
    Moscow: 1 << 7,
    Kharkov: 1 << 8,
    Caucasus: 1 << 9,
    Belgrade: 1 << 10,
    London: 1 << 11,
    Salonika: 1 << 12,
    Basra: 1 << 13,
    London_Italian: 1 << 14, // Special case for Italian supply
}

function get_supply_mask(source) {
    switch (source) {
        case ESSEN: return SUPPLY_MASK.Essen
        case BRESLAU: return SUPPLY_MASK.Breslau
        case SOFIA: return SUPPLY_MASK.Sofia
        case CONSTANTINOPLE: return SUPPLY_MASK.Constantinople
        case PETROGRAD: return SUPPLY_MASK.Petrograd
        case MOSCOW: return SUPPLY_MASK.Moscow
        case KHARKOV: return SUPPLY_MASK.Kharkov
        case CAUCASUS: return SUPPLY_MASK.Caucasus
        case BELGRADE: return SUPPLY_MASK.Belgrade
        case LONDON: return SUPPLY_MASK.London
        case SALONIKA: return SUPPLY_MASK.Salonika
        case BASRA: return SUPPLY_MASK.Basra
    }
    return 0 // Default case, should not happen
}

// Fill the supply cache for a given faction based on the sources provided.
// Options can include:
// - use_ports: whether to consider ports as connections
// - national_connections: a specific nation to use for limited connections
// - override_mask: a mask to override the default supply mask for the source
// - set_nonitalian_path: whether to set the NonItalianPath mask for spaces reachable without passing through Italy
// - set_nonmef_path: whether to set the NonMEFPath mask for spaces reachable without passing through the MEF

let blocked_spaces = new Array(map_space_count).fill(0) // allocate once and re-use
let visited = new Array(map_space_count).fill(0) // allocate once and re-use

function fill_supply_cache(faction, cache, sources, options) {
    options = options || {}
    const use_ports = options.use_ports || false
    const national_connections = options.national_connections || undefined
    const override_mask = options.override_mask || undefined
    const set_nonitalian_path = options.set_nonitalian_path || false
    const set_nonmef_path = options.set_nonmef_path || false

    let friendly_ports = []

    blocked_spaces.fill(0)

    // Block spaces containing an enemy unit
    for (let p = 1; p < data.pieces.length; ++p) {
        if (game.location[p] !== 0 && data.pieces[p].faction !== faction) {
            blocked_spaces[game.location[p]] = 1
        }
    }

    // Block spaces that are in nations not yet at war
    for (let s = 1; s < map_space_count; ++s) {
        if (!is_space_at_war(s))
            blocked_spaces[s] = 1
    }

    // Block enemy controlled spaces, unless occupying an enemy fort in the space
    let occupied_forts = []
    for (let p = 1; p < data.pieces.length; ++p) {
        if (data.pieces[p].faction === faction) {
            const occupied_location = game.location[p]
            if (has_undestroyed_fort(occupied_location, other_faction(faction))) {
                set_add(occupied_forts, occupied_location)
            }
        }
    }
    for (let s = 1; s < map_space_count; ++s) {
        if (!is_controlled_by(s, faction) && !set_has(occupied_forts, s)) {
            blocked_spaces[s] = 1
        } else if (use_ports) {
            // If this type of supply can use ports, build a set of friendly port spaces
            if (is_port(s, faction, true)) {
                set_add(friendly_ports, s)
            }
        }
    }

    // For each supply source, populate the set of supplied spaces
    for (let source of sources) {
        let mask = override_mask || get_supply_mask(source)
        let frontier = [source]
        visited.fill(0)
        visited[source] = 0
        while (frontier.length > 0) {
            let current = frontier.pop()
            if (!blocked_spaces[current]) {
                cache[current] |= mask
                for (let conn of get_connected_spaces(current, national_connections))  {
                    if (!visited[conn]) {
                        frontier.push(conn)
                        visited[conn] = 1
                    }
                }
                if (set_has(friendly_ports, current)) {
                    for (let port of friendly_ports) {
                        if (!visited[port]) {
                            frontier.push(port)
                            visited[port] = 1
                        }
                    }
                }
            }
        }
    }

    if (set_nonitalian_path) {
        // Now mark the set of spaces that can be reached without passing through Italy
        let mask = SUPPLY_MASK.NonItalianPath
        for (let source of sources) {
            let frontier = [source]
            visited.fill(0)
            visited[source] = 1
            while (frontier.length > 0) {
                let current = frontier.pop()
                if (!is_italian_space(current) && !blocked_spaces[current]) {
                    cache[current] |= mask
                    for (let conn of get_connected_spaces(current, national_connections)) {
                        if (!visited[conn]) {
                            frontier.push(conn)
                            visited[conn] = 1
                        }
                    }
                    if (set_has(friendly_ports, current)) {
                        for (let port of friendly_ports) {
                            if (!visited[port]) {
                                frontier.push(port)
                                visited[port] = 1
                            }
                        }
                    }
                }
            }
        }
    }

    if (set_nonmef_path) {
        // Mark the set of spaces that can be reached without passing through the MEF
        let mask = SUPPLY_MASK.NonMEFPath
        for (let source of sources) {
            let frontier = [source]
            visited.fill(0)
            visited[source] = 1
            while (frontier.length > 0) {
                let current = frontier.pop()
                if (!blocked_spaces[current]) {
                    cache[current] |= mask
                    for (let conn of get_connected_spaces(current, national_connections)) {
                        if (!visited[conn]) {
                            frontier.push(conn)
                            visited[conn] = 1
                        }
                    }
                    if (set_has(friendly_ports, current)) {
                        for (let port of friendly_ports) {
                            if (!visited[port] && !is_mef_space(port)) {
                                frontier.push(port)
                                visited[port] = 1
                            }
                        }
                    }
                }
            }
        }
    }
}

function is_italian_space(s) {
    return data.spaces[s].nation === ITALY
}

function update_supply_if_missing() {
    if (!game.supply)
        update_supply()
}

function update_supply() {
    let cp_sources = [ESSEN, BRESLAU]
    if (nation_at_war(BULGARIA))
        cp_sources.push(SOFIA)
    if (nation_at_war(TURKEY))
        cp_sources.push(CONSTANTINOPLE)

    game.supply = new Array(map_space_count).fill(0)

    // Supply for CP, western, and eastern units is saved in the same cache, kept distinct by the separate supply sources
    fill_supply_cache(CP, game.supply, cp_sources, { use_ports:true, national_connections: TURKEY }) // Not all CP supply can follow Turkish connections, but this only applied to Medina, so it's easier to add a special check for non-Turkish units in Medina
    fill_supply_cache(AP, game.supply, [PETROGRAD, MOSCOW, KHARKOV, CAUCASUS, BELGRADE], { national_connections: RUSSIA })
    fill_supply_cache(AP, game.supply, [LONDON], { use_ports: true, set_nonitalian_path: true, set_nonmef_path: true })

    // Special mask applied when searching spaces using Italian connections
    fill_supply_cache(AP, game.supply, [LONDON], { use_ports: true, national_connections: ITALY, override_mask: SUPPLY_MASK.London_Italian })

    // These are also special cases, but don't need a separate mask because they use separate sources
    fill_supply_cache(AP, game.supply, [SALONIKA])
    fill_supply_cache(AP, game.supply, [BASRA], { national_connections: BRITAIN })

    update_oos_pieces()
}

function is_unit_supplied(p) {
    let location = game.location[p]
    if (location === 0 || location === PERM_ELIMINATED_BOX)
        return true
    return is_unit_supplied_in(p, game.location[p])
}

function is_every_unit_supplied_in(list, s) {
    return list.every(p => is_unit_supplied_in(p, s))
}

function is_supply_blocked_by_units(s, faction) {
    let opp = other_faction(faction)
    for (let p of all_pieces_by_faction[opp])
        if (game.location[p] === s)
            return true
    return false
}

function is_supply_blocked_by_control(s, faction) {
    let opp = other_faction(faction)
    if (is_controlled_by(opp)) {
        if (has_undestroyed_fort(s, other_faction(faction))) {
            for (let p of all_pieces_by_faction[faction])
                if (game.location[p] === s)
                    return false
        }
        return true
    }
    return false
}

function is_supply_not_blocked(s, faction) {
    return (
        !is_supply_blocked_by_control(s, faction) &&
        !is_supply_blocked_by_units(s, faction)
    )
}

function is_unit_supplied_in(p, s, for_rp = false) {
    if (p === BRITISH_ANA_CORPS && data.spaces[s].map && data.spaces[s].map === "neareast")
        return !is_supply_blocked_by_units(s, AP)

    if (p === TURKISH_SN_CORPS && data.spaces[s].map && data.spaces[s].map === "neareast")
        return is_supply_not_blocked(s, CP)

    if (p === MONTENEGRIN_CORPS && s === CETINJE)
        return is_supply_not_blocked(s, AP)

    let nation = data.pieces[p].nation

    if (nation === GREECE && !nation_at_war(GREECE)) // Limited Greek entry
        return true

    // CP can only trace supply to Medina over a Turkish connection, so non-Turkish CP units in Medina are OOS
    if (s === MEDINA && data.pieces[p].faction === CP && nation !== TURKEY)
        return false

    if (nation === SERBIA) {
        if (data.spaces[s].nation === SERBIA)
            return is_supply_not_blocked(s, AP) // Serbian units are always in supply in Serbia
        if (check_supply_cache(game.supply, s, [SALONIKA]))
            return true // Serbian units can trace supply to Salonika if it is friendly controlled
    }

    if (nation === ITALY)
        return check_supply_cache(game.supply, s, [LONDON], SUPPLY_MASK.London_Italian)

    if (data.pieces[p].faction === AP && is_space_supplied_through_mef(s) && piece_requires_london_supply(p)) {
        let name = data.pieces[p].name
        return p === MEF_ARMY || name === 'BRc' || name === 'AUSc' // Only MEF army, British corps, and the Australian corps can be supplied through the MEF beachhead
    }

    if (for_rp)
        return check_supply_cache(game.supply, s, get_supply_sources_for_piece_rp(p))
    return check_supply_cache(game.supply, s, get_supply_sources_for_piece(p))
}

function is_unit_supplied_for_rp_in(p, s) {
    return is_unit_supplied_in(p, s, true)
}

function is_space_supplied(s, faction) {
    if (faction === CP) {
        return check_supply_cache(game.supply, s, [ESSEN, BRESLAU, SOFIA, CONSTANTINOPLE])
    } else {
        if (data.spaces[s].nation === ALBANIA && (!is_space_at_war(TARANTO) || is_space_supplied(TARANTO, AP))) {
            // Albanian spaces may supply from Taranto even while Italy is neutral.
            if (s === VALONA)
                return true
            if (s === TIRANA && is_controlled_by(VALONA, AP))
                return true
        }

        if (s === MEDINA) {
            // AP supply in Medina is complicated by the connections being ANA-only. Instead of calculating a whole
            // supply network for ANA, just directly check if the spaces that could supply Medina are supplied. This
            // includes Aqaba, which can supply Medina directly, or the neighbors of Arabia, Jerusalem and Amman. Unit
            // supply doesn't matter here, because the only AP unit that can be supplied in Medina is the ANA corps,
            // which already has its own exception in is_unit_supplied_in().
            return (is_space_supplied(JERUSALEM, AP) || is_space_supplied(AMMAN, AP) || is_space_supplied(AQABA, AP))
        }
        return check_supply_cache(game.supply, s, [LONDON, PETROGRAD, MOSCOW, KHARKOV, CAUCASUS, BELGRADE, SALONIKA], SUPPLY_MASK.London_Italian)
    }
}

const all_supply_sources = [ESSEN, BRESLAU, SOFIA, CONSTANTINOPLE, PETROGRAD, MOSCOW, KHARKOV, CAUCASUS, BELGRADE, LONDON]

function check_supply_cache(cache, location, sources = all_supply_sources, additional_mask) {
    let source_mask = 0

    if (additional_mask)
        source_mask |= additional_mask

    for (let source of sources)
        source_mask |= get_supply_mask(source)
    return !!(cache[location] & source_mask)
}

function get_supply_sources_for_piece(p) {
    let nation = data.pieces[p].nation
    switch (nation) {
        case RUSSIA:
        case ROMANIA:
        case SERBIA:
            return [PETROGRAD, MOSCOW, KHARKOV, CAUCASUS, BELGRADE]
    }
    if (data.pieces[p].faction === AP)
        return [LONDON]
    return [ESSEN, BRESLAU, SOFIA, CONSTANTINOPLE]
}

function piece_requires_london_supply(p) {
    let nation = data.pieces[p].nation
    switch (nation) {
        case RUSSIA:
        case ROMANIA:
        case SERBIA:
            return false
    }
    if (data.pieces[p].faction !== AP)
        return false
    return true
}

function get_supply_sources_for_piece_rp(p) {
    let nation = data.pieces[p].nation
    switch (nation) {
        // 17.1.4.1 exceptions
        case GERMANY:
        case AUSTRIA_HUNGARY:
            return [ ESSEN, BRESLAU ]
        case TURKEY:
            return [ CONSTANTINOPLE]
        case BULGARIA:
            return [ SOFIA ]
        case RUSSIA:
        case ROMANIA:
            return [ PETROGRAD, MOSCOW, KHARKOV, CAUCASUS ]

        // 14.2.2 (14.2.3 is handled elsewhere)
        case SERBIA:
            return [PETROGRAD, MOSCOW, KHARKOV, CAUCASUS, BELGRADE]
    }
    if (data.pieces[p].faction === AP)
        return [LONDON]
    return [ESSEN, BRESLAU, SOFIA, CONSTANTINOPLE]
}

function is_unit_supplied_through_italy(p) {
    if (!is_unit_supplied(p))
        return false

    const nation = data.pieces[p].nation
    if (nation === SERBIA || nation === RUSSIA || nation === ROMANIA)
        return false // These nations do not trace supply from London

    let supplied_from_london = game.supply[game.location[p]] & SUPPLY_MASK.London_Italian
    let has_only_italian_path = !(game.supply[game.location[p]] & SUPPLY_MASK.NonItalianPath)
    return supplied_from_london && has_only_italian_path
}

function is_space_supplied_through_mef(s) {
    if (!is_space_supplied(s, AP))
        return false
    let supplied_from_london = !!(game.supply[s] & SUPPLY_MASK.London)
    let non_mef_path = !!(game.supply[s] & SUPPLY_MASK.NonMEFPath)
    return supplied_from_london && !non_mef_path
}

function is_space_supplied_or_has_supplied_unit(s, faction) {
    if (is_space_supplied(s, faction))
        return true
    for (let p of all_pieces_by_faction[faction])
        if (game.location[p] === s)
            if (is_unit_supplied_in(p, s))
                return true
    return false
}

// Units may not SR to or from the Reserve box under the following conditions: German and Austrian
//  units tracing supply to Sofia or Constantinople, Turkish units tracing supply to Essen, Breslau or Sofia,
//  Bulgarian units tracing supply to Essen, Breslau or Constantinople, and Russian and Romanian units tracing
//  supply to Belgrade.
function is_space_supplied_for_reserve_box_sr(s, p) {
    let nation = data.pieces[p].nation
    if (nation === GERMANY || nation === AUSTRIA_HUNGARY) {
        return check_supply_cache(game.supply, s, [ESSEN, BRESLAU])
    } else if (nation === TURKEY) {
        return check_supply_cache(game.supply, s, [CONSTANTINOPLE])
    } else if (nation === BULGARIA) {
        return check_supply_cache(game.supply, s, [SOFIA])
    } else if (nation === RUSSIA || nation === ROMANIA) {
        return check_supply_cache(game.supply, s, [PETROGRAD, MOSCOW, KHARKOV, CAUCASUS])
    } else {
        return is_unit_supplied_in(p, s)
    }
}

function query_supply(sources) {
    let mask = 0
    for (let source of sources) {
        if (source === LONDON)
            mask |= SUPPLY_MASK.London_Italian
        else
            mask |= get_supply_mask(source)
    }
    let spaces = [ 0 ]
    for (let i = 1; i < map_space_count; ++i) {
        spaces[i] = (game.supply[i] & mask) ? 1 : 0
    }
    return spaces
}

function update_oos_pieces() {
    game.oos_pieces = []
    const moving_pieces = game.move ? game.move.pieces : []
    for (let p = 1; p < data.pieces.length; ++p) {
        if (!nation_at_war(data.pieces[p].nation))
            continue
        if (game.location[p] !== 0 && game.location[p] < map_space_count && !is_unit_supplied(p) && !set_has(moving_pieces, p)) {
            game.oos_pieces.push(p)
        }
    }
}

// === CARD EVENTS ===

function goto_end_event() {
    game.state = "confirm_event"
}

states.confirm_event = {
    inactive() {
        view.prompt = `execute "${current_card_name()}."`
    },
    prompt() {
        view.prompt = current_card_name() + ": Done."
        view.actions.end_action = 1
    },
    end_action() {
        goto_end_action()
    },
}

// CP #1
events.guns_of_august = {
    can_play() {
        return (game.turn === 1 && game.cp.actions.length === 0)
    },
    play() {
        game.events.guns_of_august = game.turn
        game.state = 'guns_of_august'
    }
}

states.guns_of_august = {
    inactive: 'execute "Guns of August"',
    prompt() {
        if (!set_has(game.activated.attack, LIEGE)) {
            view.prompt = "Guns of August: Destroy fort and place armies in Liege."
            gen_action('space', LIEGE)
        } else if (!set_has(game.activated.attack, KOBLENZ)) {
            view.prompt = "Guns of August: Activate Koblenz."
            gen_action('space', KOBLENZ)
        }
    },
    space(s) {
        if (s === LIEGE) {
            set_control(LIEGE, CP)
            set_add(game.forts.destroyed, LIEGE)
            game.location[GE_1_ARMY] = LIEGE
            game.location[GE_2_ARMY] = LIEGE
            set_add(game.activated.attack, LIEGE)
            update_supply()
        }
        if (s === KOBLENZ) {
            set_add(game.activated.attack, KOBLENZ)
            start_action_round()
        }
    },
}

// CP #3
events.von_francois = {
    can_play() {
        if (!game.attack || game.attack.attacker !== CP || undefined === game.attack.pieces.find(p => data.pieces[p].nation === GERMANY))
            return false

        return get_defenders_pieces().some(p => data.pieces[p].nation === RUSSIA)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log_drm_card(VON_FRANCOIS, 1)
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
        log_drm_card(SEVERE_WEATHER_CP, 2)
        game.attack.defender_drm += 2
    }
}

// CP #5
events.landwehr = {
    can_play() {
        return (is_space_supplied(BERLIN, CP) && is_controlled_by(BERLIN, CP))
    },
    play() {
        game.landwehr_pieces = []
        game.state = 'landwehr'
    }
}

function is_unit_eligible_for_landwehr(p) {
    if (data.pieces[p].nation !== GERMANY)
        return false
    if (!is_unit_reduced(p))
        return false
    return is_unit_supplied(p) || game.location[p] === CP_RESERVE_BOX
}

states.landwehr = {
    inactive: 'execute "Landwehr"',
    prompt() {
        let spent_rp = game.landwehr_pieces.reduce((acc, p) => { return acc + (data.pieces[p].type === CORPS ? 0.5 : 1)}, 0)
        if (spent_rp >= 2) {
            view.prompt = `Landwehr: Done.`
            view.actions.end_action = 1
        } else {
            let pieces = all_pieces_by_nation[GERMANY].filter(is_unit_eligible_for_landwehr)
            const has_half_rp = spent_rp !== Math.floor(spent_rp)
            const remaining_rp = Math.floor(2 - spent_rp)
            if (remaining_rp === 0) {
                view.prompt = `Landwehr: Choose a reduced corps to flip.`
                pieces = pieces.filter(is_unit_corps)
            } else {
                view.prompt = `Landwehr: Choose a reduced unit to flip (${remaining_rp} RP${has_half_rp ? ' plus 1 corps': ''}).`
            }

            if (pieces.length === 0) {
                view.prompt = `Landwehr: Done.`
                view.actions.end_action = 1
            } else {
                gen_action_pass()
                pieces.forEach(gen_action_piece)
            }
        }
    },
    piece(p) {
        push_undo()
        set_delete(game.reduced, p)
        log(`Flipped ${piece_name(p)} (${space_name(game.location[p])}) to full strength`)
        game.landwehr_pieces.push(p)
    },
    pass() {
        this.end_action()
    },
    end_action() {
        delete game.landwehr_pieces
        goto_end_action() // Don't go to the end event prompt, just end the action, since we already prompted
    }
}

// CP #6
events.cp_entrench = {
    can_play() {
        return !game.events.entrench && game.turn > 1
    },
    play() {
        game.events.entrench = game.turn | 256
        game.state = 'place_event_trench'
    }
}

// CP #8
events.race_to_the_sea = {
    can_play() {
        return true
    },
    play() {
        game.events.race_to_the_sea = game.turn
        goto_end_event()
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
        game.events.reichstag_truce = game.turn
        game.vp += 1
        record_score_event(1, REICHSTAG_TRUCE)
        logi(`+1 VP for ${card_name(REICHSTAG_TRUCE)}`)
        goto_end_event()
    }
}

// CP #10
events.sud_army = {
    can_play() {
        return true
    },
    play() {
        game.events.sud_army = game.turn
        goto_end_event()
    }
}

// CP #11
events.oberost = {
    can_play() {
        return true
    },
    play() {
        game.events.oberost = game.turn
        goto_end_event()
    }
}

// CP #13
events.falkenhayn = {
    can_play() {
        return game.turn >= 3 || game.events.moltke
    },
    play() {
        game.events.falkenhayn = game.turn
        goto_end_event()
    }
}

// CP #15
events.chlorine_gas = {
    can_play() {
        return (game.attack && game.attack.attacker === CP && game.attack.pieces.some(p => data.pieces[p].nation === GERMANY))
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log_drm_card(CHLORINE_GAS, 1)
        game.attack.attacker_drm += 1
    }
}

// CP #16
events.liman_von_sanders = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.pieces.some(p => data.pieces[p].nation === TURKEY))
            return true
        return (get_defenders_pieces().some(p => data.pieces[p].nation === TURKEY))
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log_drm_card(LIMAN_VON_SANDERS, 1)
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
        log(`${card_name(MATA_HARI)} reveals the contents of the ${faction_name(AP)} hand:`)
        for (let c of game.ap.hand) {
            log(`${card_name(c)}`)
        }
        game.ops = data.cards[MATA_HARI].ops
        goto_activate_spaces()
    }
}

// CP #18
events.fortified_machine_guns = {
    can_play() {
        return (game.attack &&
                game.attack.attacker !== CP &&
                get_trench_level(game.attack.space, CP) > 0 &&
                get_defenders_pieces().some(p => data.pieces[p].nation === GERMANY))
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log_drm_card(FORTIFIED_MACHINE_GUNS, 1)
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

        return game.attack.pieces.some(p => data.pieces[p].nation === GERMANY)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log_drm_card(FLAMETHROWERS, 1)
        game.attack.attacker_drm += 1
    }
}

// CP #25
events.high_seas_fleet = {
    can_play() {
        return true
    },
    play() {
        game.events.high_seas_fleet = game.turn
        goto_end_event()
    }
}

// CP #26
events.place_of_execution = {
    can_play() {
        if (all_french_forts_destroyed())
            return true
        return false
    },
    can_apply() {
        if (!game.events.falkenhayn)
            return false

        if (game.events.h_l_take_command > 0)
            return false

        if (game.attack.attacker !== CP)
            return false

        const space_data = data.spaces[game.attack.space]
        return space_data.nation === FRANCE && space_data.fort > 0 && !game.forts.destroyed.includes(game.attack.space)
    },
    apply() {
        log_drm_card(PLACE_OF_EXECUTION, 2)
        game.attack.attacker_drm += 2
    },
    play() {
        if (!game.attack)
            goto_end_event()
    }
}

function all_french_forts_destroyed() {
    for (let s of all_spaces_by_nation[FRANCE]) {
        if (data.spaces[s].fort > 0 && !game.forts.destroyed.includes(s)) {
            return false
        }
    }
    return true
}

// CP #27
events.zeppelin_raids = {
    can_play() {
        return true
    },
    play() {
        game.events.zeppelin_raids = game.turn
        goto_end_event()
    }
}

// CP #28
events.tsar_takes_command = {
    can_play() {
        return game.cp.ru_vp >= 3
    },
    play() {
        game.events.tsar_takes_command = game.turn
        game.ops = data.cards[TSAR_TAKES_COMMAND].ops
        update_russian_capitulation()
        goto_activate_spaces()
    }
}

// CP #29
events.eleventh_army = {
    can_play() {
        return true
    },
    play() {
        game.events.eleventh_army = game.turn
        goto_end_event()
    }
}

// CP #30
events.alpenkorps = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker === CP &&
            game.attack.pieces.some(p =>
                data.pieces[p].nation === GERMANY &&
                (data.spaces[game.location[p]].terrain === MOUNTAIN || data.spaces[game.attack.space].terrain === MOUNTAIN)
            )
        ) {
            return true
        }
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log_drm_card(ALPENKORPS, 1)
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
        return (get_defenders_pieces().some(p => data.pieces[p].nation === TURKEY && get_piece_cf(p) > 0))
    },
    can_apply() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== AP)
            return false
        return (get_defenders_pieces().some(p => data.pieces[p].nation === TURKEY && get_piece_cf(p) > 0))
    },
    apply() {
        log(`${card_name(KEMAL)} -- defender fires on the Army table`)
        game.attack.defender_table = ARMY
    }
}

// CP #32
events.war_in_africa = {
    can_play() {
        return true
    },
    play() {
        game.state = 'war_in_africa_confirm'
    }
}

states.war_in_africa_confirm = {
    inactive: 'execute "War in Africa"',
    prompt() {
        view.prompt = 'Confirm play of War in Africa.'
        gen_action_done()
    },
    done() {
        set_active_faction(AP)
        game.state = 'war_in_africa'
        game.war_in_africa_removed = 0
        game.events.war_in_africa = game.turn
        clear_undo()
    }
}

states.war_in_africa = {
    inactive: 'execute "War in Africa"',
    prompt() {
        if (game.war_in_africa_removed === undefined) {
            view.prompt = 'War in Africa: Done'
            gen_action_done()
        } else if (game.war_in_africa_removed === 0) {
            view.prompt = 'War in Africa: Remove a British Corps or pass to lose 1 VP.'
            let full_strength_piece = false
            let pieces = []
            for (let p = 1; p < data.pieces.length; ++p) {
                if (data.pieces[p].nation === BRITAIN &&
                    data.pieces[p].type === CORPS &&
                    game.location[p] !== 0 &&
                    game.location[p] !== AP_ELIMINATED_BOX &&
                    !is_minor_british_nation(p) &&
                    p !== BEF_CORPS) {
                    if (!is_unit_reduced(p))
                        full_strength_piece = true
                    pieces.push(p)
                }
            }
            if (full_strength_piece)
                pieces = pieces.filter(p => !is_unit_reduced(p))
            pieces.forEach(gen_action_piece)
            gen_action_pass()
        } else {
            view.prompt = 'War in Africa: Done.'
            gen_action_done()
        }
    },
    piece(p) {
        push_undo()
        const space = game.location[p]
        log_alert_i(`Permanently removed ${piece_name(p)} (${space_name(space)})`)
        game.location[p] = PERM_ELIMINATED_BOX
        set_add(game.removed, p)
        game.war_in_africa_removed = p
        update_siege(space)
    },
    pass() {
        push_undo()
        logi(`+1 VP for ${card_name(WAR_IN_AFRICA)}`)
        game.vp++
        record_score_event(1, WAR_IN_AFRICA)
        delete game.war_in_africa_removed
    },
    done() {
        delete game.war_in_africa_removed
        set_active_faction(CP)
        goto_end_action() // Skip the end event confirmation because it adds an extra control handoff just for the CP player to click "Done"
    }
}

// CP #33
events.walter_rathenau = {
    can_play() {
        return true
    },
    play() {
        game.events.walter_rathenau = game.turn
        goto_end_event()
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

        return game.attack.pieces.some(p => data.pieces[p].nation === GERMANY)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log_drm_card(MUSTARD_GAS, 1)
        game.attack.attacker_drm += 1
    }
}

// CP #36
events.uboats_unleashed = {
    can_play() {
        return game.events.h_l_take_command > 0
    },
    play() {
        game.events.uboats_unleashed = game.turn
        goto_end_event()
    }
}

// CP #37
events.hoffmann = {
    can_play() {
        return game.events.h_l_take_command > 0
    },
    play() {
        game.events.hoffmann = game.turn
        goto_end_event()
    }
}

// CP #39
events.cp_air_superiority = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== CP)
            return false

        return game.attack.pieces.some(p => data.pieces[p].nation === GERMANY)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log_drm_card(AIR_SUPERIORITY_CP, 1)
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
        let defenders = get_defenders_pieces()
        if (defenders.length === 0)
            return false
        for (let d of defenders) {
            if (data.pieces[d].nation !== ITALY)
                return false
        }
        let german_in_attack = false
        for (let a of game.attack.pieces) {
            if (data.pieces[a].nation === GERMANY) {
                german_in_attack = true
                break
            }
        }
        return german_in_attack
    },

    can_apply() {
        return this.can_play() && !game.attack.trenches_canceled
    },
    apply() {
    },
    play() {
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
        return game.attack.pieces.some(p => data.pieces[p].nation === GERMANY)
    },
    play() {
        log(`${card_name(VON_HUTIER)} cancels trenches`)
        game.attack.trenches_canceled = true
    },
    can_apply() {
        return this.can_play() && !game.attack.trenches_canceled
    },
    apply() {
    }
}

// CP #45
events.treaty_of_brest_litovsk = {
    can_play() {
        return game.events.bolshevik_revolution > 0
    },
    play() {
        game.events.treaty_of_brest_litovsk = game.turn
        eliminate_ru_units_violating_treaty_of_brest_litovsk()
        goto_end_event()
    }
}

// CP #47
events.french_mutiny = {
    can_play() {
        return true
    },
    play() {
        game.events.french_mutiny = game.turn
        goto_end_event()
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
        return (game.attack.pieces.some(p => data.pieces[p].nation === GERMANY))
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        game.attack.attacker_drm++
        log_drm_card(MICHAEL, 1)
    },
    play() {
        game.events.michael = game.turn
        if (is_lloyd_george_active()) {
            cancel_lloyd_george(MICHAEL)
        }
        log(`${card_name(MICHAEL)} cancels trenches`)
        game.attack.trenches_canceled = true
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
        return (game.attack.pieces.some(p => data.pieces[p].nation === GERMANY))
    },
    can_apply() {
        return this.can_play() && !game.attack.trenches_canceled
    },
    apply() {
    },
    play() {
        game.events.blucher = game.turn
        if (is_lloyd_george_active()) {
            cancel_lloyd_george(BLUCHER)
        }
        log(`${card_name(BLUCHER)} cancels trenches`)
        game.attack.trenches_canceled = true
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
        return (game.attack.pieces.some(p => data.pieces[p].nation === GERMANY))
    },
    can_apply() {
        return this.can_play() && !game.attack.trenches_canceled
    },
    apply() {
    },
    play() {
        game.events.peace_offensive = game.turn
        if (is_lloyd_george_active()) {
            cancel_lloyd_george(PEACE_OFFENSIVE)
        }
        log(`${card_name(PEACE_OFFENSIVE)} cancels trenches`)
        game.attack.trenches_canceled = true
        game.attack.used_peace_offensive = true
    }
}

// CP #52
events.fall_of_the_tsar = {
    can_play() {
        return game.events.tsar_takes_command > 0 && (game.cp.ru_vp + game.ap.ws + game.cp.ws >= 33)
    },
    play() {
        game.events.fall_of_the_tsar = game.turn
        game.tsar_fell_cp_russian_vp = game.cp.ru_vp
        if (!nation_at_war(ROMANIA)) {
            game.vp += 3
            record_score_event(3, FALL_OF_THE_TSAR)
            logi(`${card_name(FALL_OF_THE_TSAR)} +3 VP (Romania not at war)`)
        } else {
            game.vp++
            record_score_event(1, FALL_OF_THE_TSAR)
            logi(`+1 VP for ${card_name(FALL_OF_THE_TSAR)}`)
        }

        game.ops = data.cards[FALL_OF_THE_TSAR].ops
        update_russian_capitulation()
        goto_activate_spaces()
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
        game.events.bolshevik_revolution = game.turn
        if (game.ap.mo === RUSSIA) {
            game.ap.mo = NONE
        }

        game.ops = data.cards[BOLSHEVIK_REVOLUTION].ops
        update_russian_capitulation()
        goto_activate_spaces()
    }
}

// CP #54
events.h_l_take_command = {
    can_play() {
        return true
    },
    play() {
        game.events.h_l_take_command = game.turn
        if (game.cp.mo === GERMANY) {
            game.cp.mo = NONE
        }
        goto_end_event()
    }
}

// CP #55
events.lloyd_george = {
    can_play() {
        return !(game.events.michael > 0 || game.events.blucher > 0 || game.events.peace_offensive > 0)
    },
    play() {
        game.events.lloyd_george = game.turn
        goto_end_event()
    }
}

function is_lloyd_george_active() {
    return game.events.lloyd_george === game.turn && !game.events.lloyd_george_canceled
}

function cancel_lloyd_george(card) {
    game.events.lloyd_george_canceled = true
    log(`${card_name(card)} cancels Lloyd George`)
}

// CP #56

events.cp_withdrawal = {
    can_play() {
        return false
    },
    can_apply() {
        return (game.attack.attacker !== CP) && can_withdraw()
    },
    apply() {
        // nothing now
    },
}

// CP #57
events.kaisertreu = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker === CP)
            return game.attack.pieces.some(p => data.pieces[p].nation === AUSTRIA_HUNGARY)
        else
            return get_defenders_pieces().some(p => data.pieces[p].nation === AUSTRIA_HUNGARY)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        if (game.attack.attacker === CP) {
            log_drm_card(KAISERTREU, 1)
            game.attack.attacker_drm += 1
        } else {
            log_drm_card(KAISERTREU, 1)
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
        goto_end_event()
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
        record_score_event(-1, POLISH_RESTORATION)
        logi(`-1 VP for ${card_name(POLISH_RESTORATION)}`)
        const polish_corps = find_n_unused_pieces(GERMANY, 'PLc', 3)
        for (let p of polish_corps) {
            game.location[p] = CP_RESERVE_BOX
        }
        goto_end_event()
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
        goto_end_event()
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

        return (undefined === data.spaces[game.attack.space].terrain && game.attack.pieces.some(p => data.pieces[p].nation === GERMANY))
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log_drm_card(ACHTUNG_PANZER, 1)
        game.attack.attacker_drm += 1
    }
}

// CP #63
events.russian_desertions = {
    can_play() {
        return game.events.fall_of_the_tsar > 0
    },
    play() {
        game.state = 'russian_desertions'
        game.russian_desertions_remaining = 4
    }
}

states.russian_desertions = {
    inactive: 'execute "Russian Desertions"',
    prompt() {
        view.prompt = `Russian Desertions: Reduce a Russian unit (${game.russian_desertions_remaining} remaining).`
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
        set_add(game.reduced, p)
        log(`Flipped ${piece_name(p)} in ${space_name(game.location[p])}`)
        game.russian_desertions_remaining--
    },
    done() {
        delete game.russian_desertions_remaining
        goto_end_event()
    }
}

// CP #64
events.alberich = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== AP)
            return false
        if (game.attack.combat_cards.includes(ROYAL_TANK_CORPS) || game.action_state.yanks_and_tanks)
            return false
        return [FRANCE, BELGIUM].includes(data.spaces[game.attack.space].nation)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
    },
    play() {
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
        game.state = "alberich"
    }
}

states.alberich = {
    inactive: 'play combat cards',
    prompt() {
        view.prompt = 'Alberich: Cancel the attack.'
        gen_action_done()
    },
    done() {
        switch_active_faction()
        next_attack_activation()
    }
}

// CP #65
events.prince_max = {
    can_play() {
        if (game.options.valiant) {
            return game.ap.ws + game.cp.ws >= 30
        }
        return game.turn <= 16
    },
    play() {
        game.events.prince_max = game.turn
        goto_end_event()
    }
}

// === ALLIED POWER EVENTS ===

// AP #2
events.blockade = {
    can_play() {
        return true
    },
    play() {
        game.events.blockade = game.turn
        goto_end_event()
    }
}

// AP #4
events.pleve = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker === AP)
            return game.attack.pieces.some(p => data.pieces[p].nation === RUSSIA)
        else
            return get_defenders_pieces().some(p => data.pieces[p].nation === RUSSIA)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        if (game.attack.attacker === AP) {
            log_drm_card(PLEVE, 1)
            game.attack.attacker_drm += 1
        } else {
            log_drm_card(PLEVE, 1)
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
            return game.attack.pieces.some(p => data.pieces[p].nation === SERBIA)
        else
            return get_defenders_pieces().some(p => data.pieces[p].nation === SERBIA)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log_drm_card(PUTNIK, 1)
        if (game.attack.attacker === AP)
            game.attack.attacker_drm += 1
        else
            game.attack.defender_drm += 1
    }
}

// AP #6 -- see CP #56

events.ap_withdrawal = {
    can_play() {
        return false
    },
    can_apply() {
        return (game.attack.attacker !== AP) && can_withdraw()
    },
    apply() {
        // nothing now
    },
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
        log_drm_card(SEVERE_WEATHER_AP, 2)
        game.attack.defender_drm += 2
    }
}

// AP #9
events.moltke = {
    can_play() {
        return game.turn <= 2
    },
    play() {
        game.events.moltke = game.turn
        goto_end_event()
    }
}

// AP #12
events.ap_entrench = {
    can_play() {
        return !game.events.entrench && game.turn > 1
    },
    play() {
        game.events.entrench = game.turn | 128
        game.state = 'place_event_trench'
    }
}

// AP #13
events.rape_of_belgium = {
    can_play() {
        return game.events.guns_of_august && game.ap.commitment === COMMITMENT_MOBILIZATION
    },
    play() {
        game.events.rape_of_belgium = game.turn
        logi(`-1 VP for ${card_name(RAPE_OF_BELGIUM)}`)
        game.vp -= 1
        record_score_event(-1, RAPE_OF_BELGIUM)
        goto_end_event()
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
        goto_end_event()
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
        log_drm_card(HURRICANE_BARRAGE, 1)
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
        log_drm_card(AIR_SUPERIORITY_AP, 1)
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

        return game.attack.pieces.some(p => data.pieces[p].nation === FRANCE)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log_drm_card(PHOSGENE_GAS, 1)
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
        log(`${card_name(CLOAK_AND_DAGGER)} reveals the contents of the CP hand:`)
        for (let c of game.cp.hand) {
            log(`${card_name(c)}`)
        }
        game.ops = data.cards[CLOAK_AND_DAGGER].ops
        goto_activate_spaces()
    }
}

// AP #26
events.lusitania = {
    can_play() {
        return game.events.blockade && !game.events.zimmermann_telegram
    },
    play() {
        game.vp -= 1
        record_score_event(-1, LUSITANIA)
        logi(`-1 VP for ${card_name(LUSITANIA)}`)
        game.events.lusitania = game.turn
        goto_end_event()
    }
}

// AP #27
events.great_retreat = {
    can_play() {
        return true
    },
    play() {
        game.events.great_retreat = game.turn
        if (game.options.valiant) {
            game.ops = data.cards[GREAT_RETREAT].ops
            goto_activate_spaces()
        } else {
            goto_end_event()
        }
    }
}

states.great_retreat_option = {
    inactive: 'use "Great Retreat"',
    prompt() {
        view.prompt = 'Great Retreat: You may retreat Russian units before combat.'
        gen_action_pass()
        get_defenders_pieces().filter(p => data.pieces[p].nation === RUSSIA).forEach(gen_action_piece)
    },
    piece(p) {
        push_undo()
        log("Great Retreat:")
        game.state = 'great_retreat'
        game.attack.great_retreat = p
        set_add(game.retreated, p)
    },
    pass() {
        set_active_faction(game.attack.attacker)
        goto_attack_step_brusilov_offensive()
    }
}

states.great_retreat = {
    inactive: 'execute "Great Retreat"',
    prompt() {
        if (game.attack.great_retreat !== 0) {
            view.who = game.attack.great_retreat
            let options = get_retreat_options([game.attack.great_retreat], game.attack.space, 1)
            if (options.length > 0) {
                view.prompt = `Great Retreat: Retreat ${piece_name(game.attack.great_retreat)}.`
                options.forEach(gen_action_space)
            } else {
                view.prompt = `Great Retreat: Eliminate ${piece_name(game.attack.great_retreat)} (no retreat possible).`
                gen_action('eliminate')
            }
        } else {
            let pieces_to_retreat = get_defenders_pieces().filter(p => data.pieces[p].nation === RUSSIA)
            if (pieces_to_retreat.length === 0) {
                view.prompt = `Great Retreat: Done.`
                gen_action_done()
            } else {
                view.prompt = `Great Retreat: Choose a Russian unit to retreat.`
                pieces_to_retreat.forEach(gen_action_piece)
            }
        }
    },
    piece(p) {
        push_undo()
        game.attack.great_retreat = p
        set_add(game.retreated, p)
    },
    space(s) {
        push_undo()
        logi(`${piece_name(game.attack.great_retreat)} -> ${space_name(s)}`)
        const from  = game.location[game.attack.great_retreat]
        update_russian_ne_restriction_flag([game.attack.great_retreat], from, s)
        if (set_has(game.broken_sieges, from))
            set_delete(game.broken_sieges, from)

        game.location[game.attack.great_retreat] = s
        if (!is_controlled_by(s, AP) && !has_undestroyed_fort(s, CP) && can_take_control([game.attack.great_retreat]))
            set_control(s, AP)
        update_siege(game.attack.space)
        update_siege(s)
        game.attack.great_retreat = 0
        update_supply()
    },
    eliminate() {
        push_undo()
        eliminate_piece(game.attack.great_retreat, true, 'failure to retreat')
        game.attack.great_retreat = 0
    },
    done() {
        clear_undo()
        // If the Great Retreat ends and there is still something left to attack, continue the next attack step
        if (has_undestroyed_fort(game.attack.space, AP) || get_defenders_pieces().length > 0) {
            goto_attack_step_brusilov_offensive()
        } else {
            // If there are full strength attackers, let them advance
            set_active_faction(game.attack.attacker)
            let full_strength_attackers = game.attack.pieces.filter((p) => !is_unit_reduced(p))
            if (full_strength_attackers.length > 0) {
                game.attack.retreat_length = 1
                game.attack.to_advance = full_strength_attackers
                goto_attacker_advance()
            } else {
                // If no full strength attackers, end the attack
                end_attack_activation()
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
        game.events.landships = game.turn
        game.ops = data.cards[LANDSHIPS].ops
        goto_activate_spaces()
    }
}

// AP #30
events.salonika = {
    can_play() {
        return (!game.events.greece_entry || (is_controlled_by(SALONIKA, AP) && !is_fully_stacked(SALONIKA, AP)))
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
    inactive: 'execute "Salonika"',
    prompt() {
        view.prompt = `Use strategic redeployment to Salonika (${game.salonika_sr_remaining} remaining).`
        if (!is_fully_stacked(SALONIKA, AP) && game.salonika_sr_remaining > 0) {
            for (let p = 1; p < data.pieces.length; ++p) {
                const loc = game.location[p]
                const nation = data.pieces[p].nation
                if (loc !== 0 &&
                    loc !== SALONIKA &&
                    data.pieces[p].type === CORPS &&
                    !is_bef_unit(p) &&
                    (nation === FRANCE || (nation === BRITAIN && !is_minor_british_nation(p))) &&
                    (is_port(loc, AP) || AP_RESERVE_BOX === loc)
                ) {
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
        log(`${piece_name(p)} SR\n${space_name(game.location[p])} -> ${space_name(SALONIKA)}`)
        game.location[p] = SALONIKA
        set_control(SALONIKA, AP)
    },
    done() {
        delete game.salonika_sr_remaining
        const num_actions = game.ap.actions.length
        game.ap.actions[num_actions - 1].type = ACTION_SR
        goto_end_event()
    }
}

// AP #33
events.grand_fleet = {
    can_play() {
        return game.events.high_seas_fleet > 0
    },
    play() {
        game.events.grand_fleet = game.turn
        delete game.events.high_seas_fleet
        goto_end_event()
    }
}

// AP #35
events.yanks_and_tanks = {
    can_play() {
        return true
    },
    play() {
        game.ops = data.cards[YANKS_AND_TANKS].ops
        game.action_state.yanks_and_tanks = true
        goto_activate_spaces()
    },
    can_apply() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== AP)
            return false
        return (game.attack.pieces.some(p => data.pieces[p].nation === US))
    },
    apply() {
        log_drm_card(YANKS_AND_TANKS, 2)
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

        return (get_trench_level(game.attack.space, CP) > 0 && game.attack.pieces.some(p => data.pieces[p].nation === BRITAIN))
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log_drm_card(MINE_ATTACK, 1)
        game.attack.attacker_drm += 1
    }
}

// AP #37
events.independent_air_force = {
    can_play() {
        return true
    },
    play() {
        game.events.independent_air_force = game.turn
        goto_end_event()
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
        return get_defenders_pieces().some(p => data.pieces[p].nation === FRANCE)
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
        record_score_event(-1, FOURTEEN_POINTS)
        logi(`-1 VP for ${card_name(FOURTEEN_POINTS)}`)
        goto_end_event()
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
        goto_end_event()
    }
}

// AP #45
events.kerensky_offensive = {
    can_play() {
        return game.events.fall_of_the_tsar > 0 && !game.events.bolshevik_revolution > 0
    },
    play() {
        game.ops = data.cards[KERENSKY_OFFENSIVE].ops
        game.action_state.kerensky_available = true
        goto_activate_spaces()
    },
    can_apply() {
        if (!game.attack.pieces.some(p => data.pieces[p].nation === RUSSIA))
            return false
        if (!get_defenders_pieces().some(p => data.pieces[p].nation === AUSTRIA_HUNGARY || data.pieces[p].nation === BULGARIA || data.pieces[p].nation === TURKEY))
            return false
        return true
    }
}

states.kerensky_offensive_option = {
    inactive: 'use "Kerensky Offensive"',
    prompt() {
        view.prompt = 'Use Kerensky Offensive for +2 DRM?'
        gen_action('use')
        gen_action_pass()
    },
    use() {
        delete game.action_state.kerensky_available
        game.attack.attacker_drm += 2
        log_drm_card(KERENSKY_OFFENSIVE, 2)
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
        game.ops = data.cards[BRUSILOV_OFFENSIVE].ops
        game.action_state.brusilov_active = true
        game.action_state.brusilov_available = true
        game.events.brusilov_offensive = game.turn
        goto_activate_spaces()
    },
    can_apply() {
        if (!game.attack.pieces.some(p => data.pieces[p].nation === RUSSIA))
            return false
        if (get_defenders_pieces().some(p => data.pieces[p].nation === GERMANY))
            return false
        return get_trench_level_for_attack(game.attack.space, CP) > 0
    },
    apply_drm() {
        if (game.attack.pieces.some(p => data.pieces[p].nation === RUSSIA)) {
            game.attack.attacker_drm += 1
            log_drm_card(BRUSILOV_OFFENSIVE, 1)
        }
    }
}

states.brusilov_offensive_option = {
    inactive: 'use "Brusilov Offensive"',
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
        if (!game.events.landships && !game.options.valiant)
            return false
        if (!game.attack.pieces.some(p => data.pieces[p].nation === BRITAIN))
            return false
        const nation = data.spaces[game.attack.space].nation
        if (nation !== FRANCE && nation !== BELGIUM && nation !== GERMANY)
            return false
        return (!data.spaces[game.attack.space].terrain)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        game.attack.trench_shift_canceled = true
    },
    play() {
        // Ignore CRT shift but not other trench effects
        game.attack.trench_shift_canceled = true
    }
}

// AP #49
events.sinai_pipeline = {
    can_play() {
        return true
    },
    play() {
        game.events.sinai_pipeline = game.turn
        goto_end_event()
    }
}

// AP #51
events.everyone_into_battle = {
    can_play() {
        return (game.events.michael > 0 || game.events.blucher > 0 || game.events.peace_offensive > 0)
    },
    play() {
        game.events.everyone_into_battle = game.turn
        goto_end_event()
    }
}

// AP #52
events.convoy = {
    can_play() {
        return game.events.uboats_unleashed > 0
    },
    play() {
        game.events.convoy = game.turn
        game.vp--
        record_score_event(-1, CONVOY)
        logi(`-1 VP for ${card_name(CONVOY)}`)
        goto_end_event()
    }
}

// AP #54
events.zimmermann_telegram = {
    can_play() {
        return game.cp.ws + game.ap.ws >= 30
    },
    play() {
        game.events.zimmermann_telegram = game.turn
        game.vp--
        record_score_event(-1, ZIMMERMANN_TELEGRAM)
        logi(`-1 VP for ${card_name(ZIMMERMANN_TELEGRAM)}`)
        game.ops = data.cards[ZIMMERMANN_TELEGRAM].ops
        goto_activate_spaces()
    }
}

// AP #55
events.over_there = {
    can_play() {
        return game.events.zimmermann_telegram > 0 && game.turn > game.events.zimmermann_telegram
    },
    play() {
        game.events.over_there = game.turn
        set_nation_at_war(US)
        game.ops = data.cards[OVER_THERE].ops
        goto_activate_spaces()
    }
}

// AP #56
events.paris_taxis = {
    can_play() {
        const spaces = [PARIS, AMIENS, ROUEN, CHATEAU_THIERRY, ORLEANS, MELUN]
        for (let p of all_pieces_by_nation[FRANCE])
            if (data.pieces[p].type === ARMY && is_unit_reduced(p) && spaces.includes(game.location[p]))
                return true
        return false
    },
    play() {
        game.state = 'paris_taxis'
    }
}

states.paris_taxis = {
    inactive: 'execute "Paris Taxis"',
    prompt() {
        view.prompt = 'Paris Taxis: Flip a reduced French army in or adjacent to Paris.'
        const spaces = [PARIS, AMIENS, ROUEN, CHATEAU_THIERRY, ORLEANS, MELUN]
        for (let p of all_pieces_by_nation[FRANCE])
            if (data.pieces[p].type === ARMY && is_unit_reduced(p) && spaces.includes(game.location[p]))
                gen_action_piece(p)
    },
    piece(p) {
        set_delete(game.reduced, p)
        log(`Flipped ${piece_name(p)} in ${space_name(game.location[p])} to full strength`)
        goto_end_event()
    },
}

// AP #57
events.russian_cavalry = {
    can_play() {
        return true
    },
    play() {
        game.units_to_place = find_n_unused_pieces(RUSSIA, 'RU CAVc', 2)
        game.state = 'russian_cavalry'
    }
}

states.russian_cavalry = {
    inactive: 'execute "Russian Cavalry"',
    prompt() {
        if (game.units_to_place.length > 0) {
            view.prompt = 'Russian Cavalry: Place the two Russian cavalry corps.'
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
            view.prompt = 'Russian Cavalry: Done.'
            gen_action_done()
        }
    },
    space(s) {
        push_undo()
        logi(`RU Cavc placed in ` +  data.spaces[s].name)
        game.units_to_place.forEach((p) => {
            game.location[p] = s
        })
        game.units_to_place.length = 0
    },
    done() {
        goto_end_event()
    }
}

// AP #58
events.russian_guards = {
    can_play() {
        if (!game.attack)
            return false
        if (game.attack.attacker !== AP)
            return false

        return game.attack.pieces.some(p => data.pieces[p].nation === RUSSIA)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log_drm_card(RUSSIAN_GUARDS, 1)
        game.attack.attacker_drm += 1
    }
}

// AP #59
events.alpine_troops = {
    can_play() {
        if (!game.attack)
            return false
        return !!(game.attack.attacker === AP && game.attack.pieces.every(p => data.pieces[p].nation === ITALY))
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log_drm_card(ALPINE_TROOPS, 1)
        game.attack.attacker_drm += 1
    }
}

// AP #60
events.czech_legion = {
    can_play() {
        return true
    },
    play() {
        for (let p = 1; p < data.pieces.length; ++p) {
            const piece_data = data.pieces[p]
            if (is_unit_eliminated(p) && piece_data.nation === AUSTRIA_HUNGARY && piece_data.type === CORPS) {
                game.location[p] = PERM_ELIMINATED_BOX
                set_add(game.removed, p)
                log_alert(`Permanently removed ${piece_name(p)} from the game`)
                break
            }
        }
        const czech_legion = find_piece(RUSSIA, 'RU Czlc')
        game.location[czech_legion] = AP_RESERVE_BOX
        goto_end_event()
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

        return can_trace_ap_supply_through_basra(attacking_british_pieces)
    },
    can_apply() {
        return this.can_play()
    },
    apply() {
        log(`${card_name(MAUDE)} -- attacker fires on the Army table`)
        game.attack.attacker_table = ARMY
    }
}

function can_trace_ap_supply_through_basra(list) {
    // Check if all units are supplied
    if (list.some(p => !is_unit_supplied(p)))
        return false

    // Check if Basra is supplied
    if (!is_space_supplied(BASRA, AP))
        return false

    let spaces = []
    list.forEach(p => set_add(spaces, game.location[p]))

    let visited = []
    let frontier = [...spaces]
    let found_basra = false
    while (frontier.length > 0 && !found_basra) {
        let current = frontier.pop()
        let connected = get_connected_spaces(current, BRITAIN)
        for (let conn of connected) {
            if (set_has(visited, conn))
                continue
            if (!is_controlled_by(conn, AP) && !is_besieged(conn))
                continue
            if (conn === BASRA) {
                found_basra = true
                break
            }
            set_add(visited, conn)
            frontier.push(conn)
        }
    }
    return found_basra
}

// AP #62
events.the_sixtus_affair = {
    can_play() {
        return game.turn <= 16 || !game.options.valiant
    },
    play() {
        roll_peace_terms(AP, 0)
        goto_end_event()
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
        return get_defenders_pieces().some(p => data.pieces[p].nation === BRITAIN && data.pieces[p].type === ARMY)
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
        goto_end_event()
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
    return random(sides) + 1
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

function array_delete_pair(array, index) {
    var i, n = array.length
    for (i = index + 2; i < n; ++i)
        array[i - 2] = array[i]
    array.length = n - 2
}

function array_insert_pair(array, index, key, value) {
    for (var i = array.length; i > index; i -= 2) {
        array[i] = array[i-2]
        array[i+1] = array[i-1]
    }
    array[index] = key
    array[index+1] = value
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
    // optimize fast case of appending items in order
    if (item > set[b]) {
        set[b+1] = item
        return
    }
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

function map_get(map, key, missing) {
    var a = 0
    var b = (map.length >> 1) - 1
    while (a <= b) {
        var m = (a + b) >> 1
        var x = map[m<<1]
        if (key < x)
            b = m - 1
        else if (key > x)
            a = m + 1
        else
            return map[(m<<1)+1]
    }
    return missing
}

function map_set(map, key, value) {
    var a = 0
    var b = (map.length >> 1) - 1
    while (a <= b) {
        var m = (a + b) >> 1
        var x = map[m<<1]
        if (key < x)
            b = m - 1
        else if (key > x)
            a = m + 1
        else {
            map[(m<<1)+1] = value
            return
        }
    }
    array_insert_pair(map, a<<1, key, value)
}

function map_delete(map, key) {
    var a = 0
    var b = (map.length >> 1) - 1
    while (a <= b) {
        var m = (a + b) >> 1
        var x = map[m<<1]
        if (key < x)
            b = m - 1
        else if (key > x)
            a = m + 1
        else {
            array_delete_pair(map, m<<1)
            return
        }
    }
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

function object_group_by(items, callback) {
    var item, key
    var groups = {}
    if (typeof callback === "function") {
        for (item of items) {
            key = callback(item)
            if (key in groups)
                groups[key].push(item)
            else
                groups[key] = [ item ]
        }
    } else {
        for (item of items) {
            key = item[callback]
            if (key in groups)
                groups[key].push(item)
            else
                groups[key] = [ item ]
        }
    }
    return groups
}

function clear_undo() {
    if (game.undo.length > 0)
        game.undo = []
}

function push_undo() {
    if (_assert_push_undo)
        throw new Error("duplicate undo point!")
    _assert_push_undo = 1

    let copy = {}
    for (let k in game) {
        let v = game[k]
        if (k === "undo")
            continue
        else if (k === "rollback")
            continue
        else if (k === "rollback_state")
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
    let save_rollback = game.rollback
    let save_rollback_state = game.rollback_state
    game = save_undo.pop()
    save_log.length = game.log
    game.log = save_log
    game.undo = save_undo

    // This is safe because rollback checkpoints are only generated at the start of an action round,
    // so it should be impossible to undo past a rollback point
    game.rollback = save_rollback
    game.rollback_state = save_rollback_state
}

function pop_all_undo() {
    if (game.undo.length > 1)
        game.undo.length = 1
    pop_undo()
}

// === ROLLBACK ===

const textdec = new TextDecoder()

function base64_encode(binary) {
    if (Uint8Array.prototype.toBase64)
        return binary.toBase64()
    return Buffer.from(binary).toString("base64")
}

function base64_decode(ascii) {
    if (Uint8Array.fromBase64)
        return Uint8Array.fromBase64(ascii)
    return Buffer.from(ascii, "base64")
}

function compress_state(state) {
    if (typeof state !== "string")
        return base64_encode(lz4.compressBlob(JSON.stringify(state)))
    return state
}

function decompress_state(state_str) {
    if (typeof state_str === "string")
        return JSON.parse(textdec.decode(lz4.uncompressBlob(base64_decode(state_str))))
    return state_str
}

function save_rollback_point() {
    if (game.options.no_supply_warnings)
        return

    // Load the compressed state array or create a new array of states
    let rollback_state = decompress_state(game.rollback_state) || []
    if (!game.rollback) {
        game.rollback = []
    }

    const is_turn_start = (game.ap.actions.length  === 0 && game.cp.actions.length === 0)

    let copy = {}
    for (let k in game) {
        let v = game[k]
        if (k === "undo")
            continue
        else if (k === "rollback")
            continue
        else if (k === "rollback_state")
            continue
        else if (k === "log")
            v = v.length
        else if (typeof v === "object" && v !== null)
            v = object_copy(v)
        copy[k] = v
    }

    // Push metadata for the rollback point and the state copy
    game.rollback.push({
        turn: copy.turn,
        active: copy.active,
        action: copy[short_faction(copy.active)].actions.length+1,
        events: [],
        turn_start: is_turn_start
    })
    rollback_state.push(copy)

    // Limit the number of rollback points, with separate limits for turn starts and action rounds
    if (is_turn_start) {
        const count_turns = game.rollback.filter((r) => r.turn_start).length
        if (count_turns > MAX_ROLLBACK_TURNS) {
            // Remove the first rollback point that is a turn start
            const first_turn_start = game.rollback.findIndex((r) => r.turn_start)
            array_remove(game.rollback, first_turn_start)
            array_remove(rollback_state, first_turn_start)
        }
    } else {
        const count_action_rounds = game.rollback.filter((r) => !r.turn_start).length
        if (count_action_rounds > MAX_ROLLBACK_ACTION_ROUNDS) {
            const first_action_round = game.rollback.findIndex((r) => !r.turn_start)
            let removed_events = game.rollback[first_action_round].events
            array_remove(game.rollback, first_action_round)
            array_remove(rollback_state, first_action_round)
            // If the removed action round had events, append them to the previous rollback point so they aren't lost
            if (first_action_round > 0)
                game.rollback[first_action_round - 1].events.push(...removed_events)
        }
    }

    // Write the compressed array of rollback states back to the game object
    game.rollback_state = compress_state(rollback_state)
}

function restore_rollback(index) {
    if (!game.rollback || game.rollback.length <= index || index < 0)
        return

    let rollback_state = decompress_state(game.rollback_state) || []

    let save_rollback = game.rollback
    let save_seed = game.seed
    let save_log = game.log

    // we need to make a copy here, because we keep the rollback point!
    game = object_copy(rollback_state[index])

    save_log.length = game.log
    game.log = save_log

    // Rollback always wipes out the undo stack
    game.undo = []

    // We do NOT want to restore the random seed!
    game.seed = save_seed

    // keep older rollback points, as well as the one we restored
    game.rollback = save_rollback.slice(0, index+1)
    game.rollback_state = compress_state(rollback_state.slice(0, index+1))
}

function goto_propose_rollback(rollback_index) {
    if (!game.rollback || game.rollback.length === 0)
        return

    game.rollback_proposal = { faction: game.active, save_state: game.state, index: rollback_index }
    switch_active_faction()
    game.state = "review_rollback_proposal"
}

states.review_rollback_proposal = {
    inactive: 'review rollback proposal',
    prompt() {
        const rollback = game.rollback[game.rollback_proposal.index]
        const turn = rollback.turn
        const faction = short_faction(rollback.active)
        const action = rollback.action
        view.prompt = `${game.rollback_proposal.faction} proposed rolling back to Turn ${turn}, ${faction_name(faction)} Action ${action}.`
        gen_action('accept')
        gen_action('reject')
    },
    accept() {
        const prev_turn = game.turn

        let phase = game.phase || ""
        if (phase === "Action Phase") {
            // Figure out whose action round it is
            let ar_faction = game.ap.actions.length === game.cp.actions.length ? AP : CP
            if (game.rollback_proposal.save_state === 'action_phase') {
                // Usually, if the count of actions is the same, it's the AP player's action round, but there's a
                // special case for the action phase state: the active player hasn't recorded an action yet, so the
                // count of actions tells the wrong story.
                ar_faction = other_faction(ar_faction)
            }
            let round = ar_faction === AP ? game.ap.actions.length : game.cp.actions.length
            phase = `${faction_name(ar_faction)} Action ${round}`
        }

        restore_rollback(game.rollback_proposal.index)

        game.rollback_confirmation = {
            msg: `Rolled back from Turn ${prev_turn} ${phase}`,
            state: game.state
        }
        game.state = 'confirm_rollback'
    },
    reject() {
        game.active = game.rollback_proposal.faction
        game.state = game.rollback_proposal.save_state
        delete game.rollback_proposal
    }
}

states.confirm_rollback = {
    inactive: 'confirm rollback',
    prompt() {
        view.prompt = game.rollback_confirmation.msg
        gen_action('next')
    },
    next() {
        log_h2(game.rollback_confirmation.msg)
        game.state = game.rollback_confirmation.state
        delete game.rollback_confirmation
    }
}

function log_event_for_rollback(description) {
    if (!game.rollback || game.rollback.length === 0)
        return
    game.rollback[game.rollback.length-1].events.push(description)
}

// === SUPPLY WARNINGS ===

function goto_flag_supply_warnings() {
    game.save_state = game.state
    game.state = 'flag_supply_warnings'
}

states.flag_supply_warnings = {
    inactive: 'flag supply warnings',
    prompt() {
        view.prompt = 'Flag spaces where supply lines are threatened.'
        for (let s = 1; s < map_space_count; ++s) {
            gen_action_space(s)
        }
        gen_action_done()
    },
    space(s) {
        if (game.supply_warnings === undefined)
            game.supply_warnings = []
        set_toggle(game.supply_warnings, s)
    },
    done() {
        game.state = game.save_state
        delete game.save_state
    }
}

function has_supply_warnings() {
    return game.supply_warnings && game.supply_warnings.length > 0
}

function goto_review_supply_warnings() {
    if (has_supply_warnings()) {
        log("Supply warnings flagged:")
        game.supply_warnings.forEach((s) => { logi(`${space_name(s)}`) })
        game.state = 'review_supply_warnings'
    } else {
        goto_action_phase()
    }
}

states.review_supply_warnings = {
    inactive: 'review supply warnings',
    prompt() {
        view.prompt = 'Review supply warnings.'
        if (game.supply_warnings && game.supply_warnings.length < 4)
            view.prompt += ` (${space_list(game.supply_warnings)})`
        gen_action_done()
    },
    done() {
        delete game.supply_warnings
        goto_action_phase()
    }
}

// === LOG HELPERS ===

function log(msg) {
    game.log.push(msg)
}

function log_br() {
    if (game.log.length > 0 && game.log[game.log.length-1] !== "")
        game.log.push("")
}

function logi(msg) {
    game.log.push(">" + msg)
}
function logii(msg) {
    game.log.push(">>" + msg)
}

function log_alert(msg) {
    game.log.push("!" + msg)
}

function log_alert_i(msg) {
    game.log.push(">!" + msg)
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
    faction = faction || active_faction()
    log_br()
    if (faction === AP)
        log(".h3ap " + msg)
    else if (faction === CP)
        log(".h3cp " + msg)
    else
        log(".h3 " + msg)
    log_br()
}

function log_attack(msg) {
    log_br()
    if (active_faction() === AP)
        log("#ap " + msg)
    else
        log("#cp " + msg)
}

function log_corps(p) {
    if (is_unit_corps(p))
        return get_reserve_units_by_nation(data.pieces[p].nation)
    return ""
}

function log_piece_move(p) {
    if (Array.isArray(p))
        logi(piece_list(p) + " -> " + space_name(game.location[p[0]]))
    else
        logi(piece_name(p) + " -> " + space_name(game.location[p]))
}

function die_color(faction) {
    if (faction === AP)
        return 'W'
    else
        return 'B'
}

function fmt_roll(roll, drm, faction) {
    faction = faction || active_faction()
    let s = '' + die_color(faction) + roll
    if (drm !== undefined && drm !== 0) {
        if (drm > 0)
            s = s + ` + ${drm} = ${roll + drm}`
        else
            s = s + ` - ${-drm} = ${roll + drm}`
    }
    return s
}

// === ASSERTS ===

function assert_stacking_limits() {
    const rule_text = "10.1.2 Stacking limits are in effect at all times except during SR and movement"

    if (game.state in ['move_stack', 'choose_sr_unit', 'choose_sr_destination'])
        return

    for (const faction of [AP, CP]) {
        for (let s = 1; s < map_space_count; ++s) {
            if (is_overstacked(s, faction)) {
                throw new Error(`Rule violation by ${faction} in S${s} ${space_name(s)}: ${rule_text}`)
            }
        }
    }
}

function assert_opposing_sides_not_stacked() {
    const rule_text = "10.1.5 Units of opposing sides may never be stacked together. (unless besieged)"

    for (let s = 1; s < map_space_count; ++s) {
        if (is_besieged(s))
            continue
        let has_ap = false
        let has_cp = false
        for (const p of get_pieces_in_space(s)) {
            const faction = data.pieces[p].faction
            if (faction === AP)
                has_ap = true
            else if (faction === CP)
                has_cp = true
        }
        if (has_ap && has_cp) {
            throw new Error(`Rule violation in S${s} ${space_name(s)}: ${rule_text}`)
        }
    }
}

function assert_trench_level() {
    const rule_text = "11.2.3 [...] Trench levels may never be more than Level 2."

    for (let s = 1; s < map_space_count; ++s) {
        if (get_trench_level(s) > 2) {
            throw new Error(`Rule violation in S${s} ${space_name(s)}: ${rule_text}`)
        }
    }
}

function assert_reinforcement_rules() {
    const rule_text = "9.5.3.3 Reinforcing Armies must be in supply when placed."
    // XXX this is more of an example assertion, since there are so many exceptions in PoG.

    if (game.state !== 'place_reinforcements')
        return

    if (!game.reinforcements.length)
        return

    const first_piece = game.reinforcements[0]
    const first_piece_data = data.pieces[first_piece]
    if (first_piece_data.type !== ARMY)
        return

    const spaces = get_available_reinforcement_spaces(first_piece)
    spaces.forEach((s) => {
        if (first_piece_data.name === 'BR MEF' && is_mef_space(s))
            return
        if (!is_space_supplied(s, active_faction())) {
            throw new Error(`Rule violation by allowing reinforcement of ${piece_name(first_piece)} in S${s} ${space_name(s)}: ${rule_text}`)
        }
    })
}

function assert_italian_operation() {
    const rule_text = "5.7.4 part 6, until AP is at Total War only Austrian and Italian armies may operate in Italy"

    if (game.ap.commitment === COMMITMENT_TOTAL)
        return

    for (let p = 1; p < data.pieces.length; ++p) {
        let space_data = data.spaces[game.location[p]]
        if (space_data &&
            space_data.nation === ITALY &&
            data.pieces[p].nation !== ITALY &&
            data.pieces[p].nation !== AUSTRIA_HUNGARY)
            throw new Error(`Rule violation by ${piece_name(p)} in S${game.location[p]} ${space_name(game.location[p])}: ${rule_text}`)
    }
}

function assert_brest_litovsk() {
    const rule_text = "Treaty of Brest-Litovsk, Russian units cannot stack with non-Russian AP units"

    if (game.events.treaty_of_brest_litovsk > 0) {
        for (let s = 1; s < map_space_count; ++s) {
            let has_russian = false
            let has_ap_non_russian = false

            for (let p of get_pieces_in_space(s)) {
                if (data.pieces[p].faction === AP) {
                    if (data.pieces[p].nation === RUSSIA) {
                        has_russian = true
                    } else {
                        has_ap_non_russian = true
                    }
                }
            }

            if (has_ap_non_russian && has_russian) {
                throw new Error(`Rule violation in S${s} ${space_name(s)}: ${rule_text}`)
            }
        }
    }
}

exports.assert_state = function(state) {
    game = state
    assert_stacking_limits()
    assert_opposing_sides_not_stacked()
    assert_trench_level()
    assert_reinforcement_rules()
    assert_italian_operation()
    assert_brest_litovsk()
}

/* vim:set sts=4 sw=4 expandtab: */
