"use strict"

const data = require("./data")
const {cards} = require("./data")

let game, view

let states = {}
let events = {}
let supply_cache

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
const ANTWERP = 32
const LIEGE = 33
const KOBLENZ = 41
const ESSEN = 43
const BRESLAU = 94
const LODZ = 102
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
const GE_1_ARMY = 1
const GE_2_ARMY = 2

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
        tsar_fell_cp_russian_vp: game.tsar_fell_cp_russian_vp
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
        states[game.state].prompt()
    }

    return view
}

exports.setup = function (seed, scenario, options) {
    scenario = HISTORICAL

    game = create_empty_game_state(seed, scenario, options)

    log_h1("Paths of Glory")

    setup_piece('ge', '1 Army', 'Aachen')
    setup_piece('ge', '2 Army', 'Koblenz')
    setup_piece('ge', '3 Army', 'Koblenz')
    setup_piece('ge', '4 Army', 'Metz')
    setup_piece('ge', '5 Army', 'Metz')
    setup_piece('ge', '6 Army', 'Strasbourg')
    setup_piece('ge', '7 Army', 'Mulhouse', true)
    setup_piece('ge', 'GE Corps', 'Bremen', true)
    setup_piece('fr', '1 Army', 'Nancy')
    setup_piece('fr', '2 Army', 'Nancy')
    setup_piece('fr', '3 Army', 'Verdun')
    setup_piece('fr', '4 Army', 'Verdun')
    setup_piece('fr', '5 Army', 'Sedan')
    setup_piece('fr', '6 Army', 'Paris', true)
    setup_piece('fr', '9 Army', 'Bar le Duc', true)
    setup_piece('fr', 'FR Corps', 'Belfort')
    setup_piece('fr', 'FR Corps', 'Belfort')
    setup_piece('fr', 'FR Corps', 'Grenoble')
    setup_piece('be', '1 Army', 'Antwerp')
    setup_piece('br', 'BEF Army', 'Brussels')

    setup_piece('ge', '8 Army', 'Insterberg')
    setup_piece('ge', 'GE Corps', 'Insterberg')
    setup_piece('ge', 'GE Corps', 'Oppeln', true)
    setup_piece('ah', 'A-H Corps', 'Cracow')
    setup_piece('ah', '1 Army', 'Tarnow')
    setup_piece('ah', '4 Army', 'Przemysl')
    setup_piece('ah', 'A-H Corps', 'Stanislau')
    setup_piece('ah', '2 Army', 'Munkacs', true)
    setup_piece('ah', '3 Army', 'Tarnopol')
    setup_piece('ah', 'A-H Corps', 'Czernowitz')
    setup_piece('ah', 'A-H Corps', 'Timisvar')
    setup_piece('ah', 'A-H Corps', 'Villach')
    setup_piece('ah', '6 Army', 'Sarajevo')
    setup_piece('ah', '5 Army', 'Novi Sad')

    setup_piece('mn', 'MN Corps', 'Cetinje')
    setup_piece('sb', '2 Army', 'Valjevo')
    setup_piece('sb', '1 Army', 'Belgrade')

    setup_piece('ru', 'RU Corps', 'Odessa')
    setup_piece('ru', 'RU Corps', 'Lutsk')
    setup_piece('ru', 'RU Corps', 'Szawli')
    setup_piece('ru', 'RU Corps', 'Riga')
    setup_piece('ru', 'RU Corps', 'Grodno')
    setup_piece('ru', '1 Army', 'Kovno')
    setup_piece('ru', '2 Army', 'Lomza')
    setup_piece('ru', '4 Army', 'Ivangorod')
    setup_piece('ru', '5 Army', 'Lublin')
    setup_piece('ru', '3 Army', 'Dubno')
    setup_piece('ru', '8 Army', 'Kamenets-Podolski')
    setup_piece('ru', 'RU Corps', 'Kars')
    setup_piece('ru', 'RU Corps', 'Erivan')
    setup_piece('ru', 'RU Corps', 'Batum')

    setup_piece('br', 'BR Corps', 'Basra')
    setup_piece('br', 'BR Corps', 'Cairo', true)
    setup_piece('br', 'BR Corps', 'Port Said', true)

    setup_piece('br', 'BEF Corps', 'AP Reserve Box')
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

        reinf_this_turn: {}, // Which nations have received reinforcements this turn
        mef_beachhead: null, // Which space contains the MEF beachhead, if any
        mef_beachhead_captured: false, // Has the MEF beachhead been captured by CP?
        ne_armies_placed_outside_neareast: [], // NE armies which have been placed outside the Near East, used to block them from operating on the NE map
        tsar_fell_cp_russian_vp: 0, // How many Russian VP were controlled by CP when the Fall of the Tsar event was played
    }
}

function setup_initial_decks() {
    for (let i = 1; i < data.cards.length; i++) {
        if (i == GUNS_OF_AUGUST && game.options.start_with_guns_of_august) {
            game.cp.hand.push(i)
        } else if (data.cards[i].commitment == COMMITMENT_MOBILIZATION) {
            if (data.cards[i].faction == AP) {
                game.ap.deck.push(i)
            } else if (data.cards[i].faction == CP) {
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
    roll_mandated_offensives()

    game.state = 'action_phase'
    game.active = CP
    log_br()
    log_h1(`Turn ${game.turn} - ${turn_season_and_year(game.turn)}`)
    log_br()
    log_h1(`${faction_name(game.active)} Action ${game[game.active].actions.length+1}`)
}

function turn_season_and_year(turn) {
    if (turn === 1) return "August 1914"
    if (turn === 2) return "September 1914"
    const year = 1915 + Math.floor((turn-4)/4)
    const season = ["Winter", "Spring", "Summer", "Fall"][turn%4]
    return `${season} ${year}`
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

function discard_card(card, reason) {
    let active_player = get_active_player()

    if (reason)
        log(`${faction_name(game.active)} discarded\n${card_name(card)}\n${reason}`)
    else
        log(`${faction_name(game.active)} discarded\n${card_name(card)}`)

    array_remove_item(active_player.hand, card)
    game.last_card = card
    active_player.discard.push(card)
}

function reshuffle_discard(deck) {
    let player

    if (deck == game.ap.deck) {
        player = game.ap
        log("Allied Powers deck reshuffled")
    } else if (deck == game.cp.deck) {
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
            unit = 'IT Corps'
            break
        case FRANCE:
            unit = 'FR Corps'
            break
        case BRITAIN:
            unit = 'BR Corps'
            break
        case RUSSIA:
            unit = 'RU Corps'
            break
        case BELGIUM:
            unit = 'BE Corps'
            break
        case SERBIA:
            unit = 'SB Corps'
            break
        case AUSTRIA_HUNGARY:
            unit = 'A-H Corps'
            space = 'CP Reserve Box'
            break
        case GERMANY:
            unit = 'GE Corps'
            space - 'CP Reserve Box'
            break
    }
    for (let i = 0; i < quantity; ++i) {
        setup_piece(nation, unit, space)
    }
}

function find_unused_piece(nation, name) {
    const pieces = find_n_unused_pieces(nation, name, 1)
    if (pieces.length == 0) {
        throw new Error(`Could not find unused piece for nation ${nation} and name ${name}`)
    }
    return pieces[0]
}

function find_n_unused_pieces(nation, name, n) {
    let pieces = []
    let found = 0
    for (let i = 0; i < data.pieces.length; i++) {
        let piece = data.pieces[i]
        if (piece.name === name && piece.nation === nation && game.location[i] == 0) {
            pieces.push(i)
            found++
        }
        if (found == n) {
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

    if (nation == TURKEY) {
        setup_piece('tu', 'TU Corps', 'Constantinople')
        setup_piece('tu', 'TU Corps', 'Balikesir')
        setup_piece('tu', 'TU Corps', 'Gallipoli')
        setup_piece('tu', 'TU Corps', 'Ankara')
        setup_piece('tu', 'TU Corps', 'Erzerum')
        setup_piece('tu', 'TU Corps', 'Rize')
        setup_piece('tu', 'TU Corps', 'Van')
        setup_piece('tu', 'TU Corps', 'Adana')
        setup_piece('tu', 'TU Corps', 'Mosul')
        setup_piece('tu', 'TU Corps', 'Damascus')
        setup_piece('tu', 'TU Corps', 'Gaza')
        setup_piece('tu', 'TU Corps', 'Medina')
        setup_piece('tu', 'TU Corps', 'Baghdad')
    }

    if (nation == ITALY) {
        setup_piece('it', 'IT Corps', 'Rome')
        setup_piece('it', 'IT Corps', 'Turin')
        setup_piece('it', 'IT Corps', 'Taranto')
        setup_piece('it', '1 Army', 'Verona', true)
        setup_piece('it', '2 Army', 'Udine', true)
        setup_piece('it', '3 Army', 'Maggiore', true)
        setup_piece('it', '4 Army', 'Asiago', true)
    }

    if (nation == BULGARIA) {
        setup_piece(BULGARIA, 'BU Corps', 'Sofia')
        setup_piece(BULGARIA, 'BU Corps', 'Sofia')
        // Other 4 Bulgarian pieces are setup by player choice
    }

    if (nation == ROMANIA) {
        setup_piece(ROMANIA, 'RO Corps', 'Bucharest')
        setup_piece(ROMANIA, 'RO Corps', 'Bucharest')
        // Other 4 Romanian pieces are setup by player choice
    }

    if (nation == GREECE) {
        setup_piece(GREECE, 'GR Corps', 'Athens')
        setup_piece(GREECE, 'GR Corps', 'Florina')
        setup_piece(GREECE, 'GR Corps', 'Larisa')
    }
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

    if (ap_mo == ITALY && !nation_at_war(ITALY)) {
        ap_mo = NONE
    }

    if (ap_mo == FRANCE && all_capitals_occupied(FRANCE)) {
        ap_mo = BRITAIN
    }
    if (ap_mo == BRITAIN && all_capitals_occupied(BRITAIN)) {
        ap_mo = ITALY
    }
    if (ap_mo == ITALY) {
        if (!nation_at_war(ITALY)) {
            ap_mo = NONE
        } else if (all_capitals_occupied(ITALY)) {
            ap_mo = RUSSIA
        }
    }
    if (ap_mo == RUSSIA && (all_capitals_occupied(RUSSIA) || game.events.bolshevik_revolution)) {
        ap_mo = NONE
    }

    if (game.turn == 1 && ap_mo == BRITAIN && game.scenario == HISTORICAL) {
        ap_mo = FRANCE
    }

    let cp_roll = roll_die(6)
    if (game.events.hoffman) {
        cp_roll++;
    }
    let cp_index = cp_roll > 6 ? 6 : cp_roll;
    let cp_mo = CP_MO_TABLE[cp_index]

    if ((cp_mo == AUSTRIA_HUNGARY || cp_mo == AH_IT) && all_capitals_occupied(AUSTRIA_HUNGARY)) {
        cp_mo = TURKEY
    }
    if (cp_mo == TURKEY) {
        if (!nation_at_war(TURKEY)) {
            cp_mo = NONE
        } else if (all_capitals_occupied(TURKEY)) {
            cp_mo = GERMANY
        }
    }
    if (cp_mo == GERMANY && all_capitals_occupied(GERMANY)) {
        cp_mo = NONE
    }

    if (cp_mo == AH_IT && !nation_at_war(ITALY)) {
        cp_mo = AUSTRIA_HUNGARY
    }

    if (cp_mo == GERMANY && game.events.h_l_take_command) {
        cp_mo = NONE
    }

    log_h2(`AP rolled ${ap_roll} resulting in a mandated offensive for ${nation_name(ap_mo)}`)
    log_h2(`CP rolled ${cp_roll} resulting in a mandated offensive for ${nation_name(cp_mo)}`)

    game.ap.mo = ap_mo
    game.cp.mo = cp_mo
}

function get_capitals(nation) {
    let capitals = []
    for (let i = 1; i < data.spaces.length; i++) {
        if (data.spaces[i].capital && data.spaces[i].nation == nation) {
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
        if (attacker_nation === BRITAIN &&
            (piece.counter.startsWith('cnd') ||
                piece.counter.startsWith('pt') ||
                piece.counter.startsWith('aus') ||
                piece.counter.startsWith('ana'))) {
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
        }
        if (attacker_nation === GERMANY) {
            return piece.nation === BELGIUM || piece.nation === FRANCE || piece.nation === BRITAIN || piece.nation === US
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
    if (actions.length == 0)
        return undefined

    return actions[actions.length-1]
}

function can_play_neutral_entry() {
    for (let action of game.ap.actions) {
        if (action.type == ACTION_NEUTRAL_ENTRY)
            return false
    }
    for (let action of game.cp.actions) {
        if (action.type == ACTION_NEUTRAL_ENTRY)
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

// === GAME STATES ===

states.action_phase = {
    inactive: "Action Phase",
    prompt() {
        let p = get_active_player()
        view.prompt = `Turn ${game.turn} Action ${p.actions.length+1}: Play a card or choose an action`
        for (let i = 0; i < p.hand.length; ++i)
            gen_card_menu(p.hand[i])
        gen_action('single_op')
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
    if (can_play_event(card))
        gen_action('play_event', card)
    gen_action('play_ops', card)
    if (can_play_sr(card))
        gen_action('play_sr', card)
    if (can_play_rps(card))
        gen_action('play_rps', card)
}

function can_play_event(card) {
    const card_data = data.cards[card]

    if (card_data.reinfnation) {
        if (game.turn == 1)
            return false

        if (game.reinf_this_turn && game.reinf_this_turn[card_data.reinfnation])
            return false

        if (!nation_at_war(card_data.reinfnation))
            return false

        return true
    }

    let evt = events[data.cards[card].event]
    return (evt !== undefined && evt.can_play())
}

function can_play_sr(card) {
    let action = get_last_action()
    return action === undefined || action.type != ACTION_SR
}

function can_play_rps(card) {
    let action = get_last_action()
    return action === undefined || action.type != ACTION_RP
}

function goto_play_event(card) {
    push_undo()
    log(`${faction_name(game.active)} played\n${card_name(card)} for the event`)
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
    if (card === undefined) {
        record_action(ACTION_1_OP, card)
        game.ops = 1
    } else {
        record_action(ACTION_OP, card)
        discard_card(card, 'for ops')
        game.ops = data.cards[card].ops
    }
    game.state = 'activate_spaces'
}

function goto_play_sr(card) {
    record_action(ACTION_SR, card)
    let card_data = data.cards[card]
    game.sr = {
        pts: card_data.sr,
        unit: 0,
        done: []
    }

    discard_card(card, 'for strategic redeployment')
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
        gen_action_undo()
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

    // TODO: No more than 1 British Corps (incl Aus, excl PT, CND, and BEF) may use SR to or from Near East or SR by sea
    //  to or from Near East per turn (13.2.1)
    // TODO: No sea or Reserve Box SR to or from NE for FR, IT, GR, RO, SB, US, BE, CND, PT, BEF (13.2.1)
    // TODO: No sea SR for RU corps to or from NE (Reserve Box allowed) (13.2.1)
    // TODO: No more than one RU corps to or from Near East map per turn (13.2.2)

    // TODO: No more than one CP corps SR to or from NE map per turn (excl TU) (13.2.3)

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
        gen_action_undo()
    },
    space(s) {
        push_undo()
        log(`${piece_name(game.who)} SR from ${space_name(game.location[game.who])} to ${space_name(s)}`)
        set_add(game.sr.done, game.sr.unit)
        game.location[game.sr.unit] = s
        game.sr.unit = 0
        game.who = 0
        game.state = 'choose_sr_unit'
    }
}

const BRITISH_ANA_CORPS = find_piece(BRITAIN, 'ANA Corps')
const TURKISH_SN_CORPS = find_piece('sn', 'SN Corps')

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
    } else if (data.pieces[game.sr.unit].type === CORPS) {
        // Corps can SR to the reserve box
        if (game.active === AP) {
            set_add(destinations, AP_RESERVE_BOX)
        } else {
            set_add(destinations, CP_RESERVE_BOX)
        }
    }

    // Add spaces that have an overland path
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

    // TODO: 13.1.12 Units may not SR to or from the Reserve box under the following conditions: German and Austrian
    //  units tracing supply to Sofia or Constantinople, Turkish units tracing supply to Essen, Breslau or Sofia,
    //  Bulgarian units tracing supply to Essen, Breslau or Constantinople, and Russian and Romanian units tracing
    //  supply to Belgrade.

    // Remove fully-stacked spaces from consideration
    const all_destinations = [...destinations]
    for (let d of all_destinations) {
        if (is_fully_stacked(d, game.active)) {
            set_delete(destinations, d)
        }
    }

    return destinations
}

function end_sr() {
    delete game.sr
}

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

    if (game.events.over_there > 0) {
        game.rp.us += 1
    }

    discard_card(card, 'for replacement points')
    goto_end_action()
}

function goto_play_reinf(card) {
    push_undo()
    const card_data = data.cards[card]
    record_action(ACTION_REINF, card)
    game.reinf_this_turn[card_data.reinfnation] = 1

    log(`${faction_name(game.active)} played\n${card_name(card)} for reinforcements`)
    let active_player = get_active_player()
    array_remove_item(active_player.hand, card)
    game.last_card = card
    if (card.removed)
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
            gen_action_undo()
        } else {
            view.prompt = `Place reinforcements - Done`
            gen_action_undo()
            gen_action_done()
        }
    },
    space(s) {
        push_undo()
        const p = game.reinforcements.shift()
        game.location[p] = s
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
    if (piece_data.name === 'Orient Army') {
        spaces.push(SALONIKA_SPACE)
    } else if (piece_data.name === 'NE Army') {
        spaces.push(ALEXANDRIA)
    } else if (piece_data.name === 'CAU Army') {
        // any supplied space in Russia on the NE map
        for (let s = 1; s < data.spaces.length; s++) {
            if (data.spaces[s].nation === RUSSIA && data.spaces[s].map === 'neareast' && is_space_supplied(AP, s))
                spaces.push(s)
        }
    } else if (piece_data.name === 'MEF Army') {
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

states.activate_spaces = {
    inactive: "Activate Spaces",
    prompt() {
        view.prompt = `Activate spaces: click spaces to activate (${game.ops} ops remaining)`
        let spaces = []
        game.location.forEach((loc, p) => {
            if (loc !== 0 && data.pieces[p].faction === game.active) {
                set_add(spaces, loc)
            }
        })
        spaces.forEach((s) => {
            if (set_has(game.activated.move, s) || set_has(game.activated.attack, s)) {
                gen_action('deactivate', s)
            } else {
                if (is_space_supplied(game.active, s)) {
                    if (game.ops >= cost_to_activate(s, MOVE))
                        gen_action('activate_move', s)
                    if (game.ops >= cost_to_activate(s, ATTACK))
                        gen_action('activate_attack', s)
                }
            }
        })
        gen_action_undo()
        gen_action_next()
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
    },
    activate_move(s) {
        push_undo()
        set_add(game.activated.move, s)
        game.ops -= cost_to_activate(s, MOVE)
    },
    activate_attack(s) {
        push_undo()
        set_add(game.activated.attack, s)
        game.ops -= cost_to_activate(s, ATTACK)
    },
    next() {
        start_action_round()
    }
}

function start_action_round() {
    game.ops = 0
    game.eligible_attackers = []
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
    game.state = 'choose_move_space'
}

function start_attack_activation() {
    game.attack = {
        pieces: [],
        space: 0,
        attacker: game.active,
        attacker_drm: 0,
        defender_drm: 0
    }
    game.state = 'choose_attackers'
}

function end_move_activation() {
    array_remove_item(game.activated.move, game.move.initial)
    game.move = null
}

function end_attack_activation() {
    if (game.eligible_attackers.length == 0)
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
    const failed_previously = game.failed_entrench
    game.failed_entrench = failed_previously.filter((p) => data.pieces[p].faction !== game.active)
    if (game.entrenching.length > 0) {
        clear_undo()
        game.entrenching.forEach((p) => {
            const roll = roll_die(6)
            const drm = failed_previously.includes(p) ? -1 : 0
            const success = roll+drm <= get_piece_lf(p)
            if (success) {
                log(`${piece_name(p)} successfully entrenches in ${space_name(game.location[p])} with a roll of ${roll+drm}${drm != 0 ? ` (including ${drm} DRM)` : ''}`)
                let lvl = get_trench_level(game.location[p], game.active)
                set_trench_level(game.location[p], lvl+1, game.active)
            } else {
                const nation = data.pieces[p].nation
                if (game.options.failed_entrench && (nation == GERMANY || nation == BRITAIN || nation == FRANCE || nation == ITALY))
                    game.failed_entrench.push(p)
                log(`${piece_name(p)} fails to entrench in ${space_name(game.location[p])} with a roll of ${roll+drm}${drm != 0 ? ` (including ${drm} DRM)` : ''}`)
            }
        })
        game.entrenching.length = 0
    }

    update_us_entry()
    update_russian_capitulation()

    if (game.ap.actions.length < 6 || game.cp.actions.length < 6) {
        game.active = other_faction(game.active)
        game.state = 'action_phase'
        log_h1(`${faction_name(game.active)} Action ${game[game.active].actions.length+1}`)
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
        if (previous_level > 2) log(`${card_name(BOLSHEVIK_REVOLUTION)} can no longer be played`)
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
    inactive: 'Choose Space to Move',
    prompt() {
        if (can_entrench()) {
            view.prompt = `Choose which space to begin moving or entrench`
            gen_action('entrench')
        } else {
            view.prompt = `Choose which space to begin moving`
        }
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
        gen_action_undo()
    },
    entrench() {
        push_undo()
        game.state = 'choose_entrench_unit'
    },
    space(s) {
        push_undo()
        game.move.initial = s
        game.move.current = s
        game.state = 'choose_pieces_to_move'
    },
    done() {
        push_undo()
        game.activated.move.length = 0
        end_move_activation()
        goto_next_activation()
    }
}

states.choose_entrench_unit = {
    inactive: 'Choose Unit to Entrench',
    prompt() {
        view.prompt = `Choose a unit to entrench`
        let entrenching_spaces = game.entrenching.map((p) => game.location[p])
        game.activated.move.forEach((s) => {
            let trench_lvl = get_trench_level(s, game.active)
            if (trench_lvl < 2 && !entrenching_spaces.includes(s)) {
                for_each_piece_in_space(s, (p) => {
                    if (data.pieces[p].type == ARMY) {
                        gen_action_piece(p)
                    }
                })
            }
        })
        gen_action_undo()
    },
    piece(p) {
        push_undo()
        log(`${piece_name(p)} will attempt to entrench in ${space_name(game.location[p])}`)
        game.entrenching.push(p)
        game.state = 'choose_move_space'
    }
}

states.place_event_trench = {
    inactive: 'Place trench for the Entrench event',
    prompt() {
        view.prompt = `Place a trench in a space with a supplied friendly army`

        let spaces = []
        for (let p = 1; p < data.pieces.length; p++) {
            if (game.location[p] != 0 &&
                data.pieces[p].faction == game.active &&
                data.pieces[p].type == ARMY &&
                get_trench_level(game.location[p], game.active) == 0 &&
                is_unit_supplied(p)) {
                set_add(spaces, game.location[p])
            }
        }
        spaces.forEach(gen_action_space)

        if (spaces.length == 0) {
            gen_action_done()
        }

        gen_action_undo()
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
    inactive: 'Choose Units to Move',
    prompt() {
        view.prompt = `Choose the units to move from ${space_name(game.move.initial)}`

        let selected_all = true
        for_each_piece_in_space(game.move.initial, (p) => {
            if (get_piece_mf(p) > 0 && !game.entrenching.includes(p)) {
                if (!game.move.pieces.includes(p))
                    selected_all = false
                gen_action_piece(p)
            }
        })

        if (!selected_all)
            gen_action('pick_up_all')

        if (game.move.pieces.length > 0)
            gen_action('move')
        else
            gen_action('done')
        gen_action_undo()
    },
    pick_up_all() {
        for_each_piece_in_space(game.move.initial, (p) => {
            if (!game.entrenching.includes(p))
                game.move.pieces.push(p)
        })
    },
    piece(p) {
        if (game.move.pieces.includes(p)) {
            array_remove_item(game.move.pieces, p)
        } else {
            game.move.pieces.push(p)
        }
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

states.move_stack = {
    inactive: 'Move Stack',
    prompt() {
        view.prompt = 'Move the stack'
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
            if (moving_nations.length == 1) {
                connections = get_connected_spaces(game.move.current, moving_nations[0])
            } else {
                connections = get_connected_spaces(game.move.current)
            }
            connections.forEach((conn) => {
                if (can_move_to(conn, game.move.pieces))
                    gen_action_space(conn)
            })
        }

        if (!is_fully_stacked(game.move.current, game.active)) {
            game.move.pieces.forEach((p) => { gen_action_piece(p) })
        }

        gen_action_undo()

        if (can_end_move(game.move.current))
            gen_action('end_move')
    },
    space(s) {
        push_undo()
        game.move.pieces.forEach((p) => {
            game.location[p] = s
        })
        game.move.spaces_moved++
        game.move.current = s
        if (!has_undestroyed_fort(s, other_faction(game.active))) {
            set_control(s, game.active)
            capture_trench(s, game.active)
        }
    },
    piece(p) {
        push_undo()
        array_remove_item(game.move.pieces, p)
        if (game.move.pieces.length == 0) {
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
        log(`${faction_name(faction)} gains ${space_name(s)} for 1 VP`)
    }

    if (s === game.mef_beachhead && !game.mef_beachhead_captured && faction === CP) {
        log(`MEF beachhead captured`)
        game.mef_beachhead_captured = true
    }

    game.control[s] = new_control
    supply_cache = null

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
    if (is_mef_space(s) && !game.mef_beachhead === s) {
        return false
    }

    // Units may not enter a space in a neutral nation, but all units may freely enter any nation immediately after it
    // enters the war.
    // TODO: Exceptions: Limited Greek Entry
    if (!nation_at_war(data.spaces[s].nation))
        return false

    // TODO: Units may always enter Albania. Albanian spaces are considered Allied Controlled at Start for SR purposes.
    //  Albanian spaces check Attrition supply by tracing normally to an Allied supply source or tracing to Taranto
    //  even while Italy is still Neutral.

    // Neither the BEF Corps nor Army may move in or attack into any space outside Britain, France, Belgium, and Germany.
    if (moving_pieces.includes(find_piece(BRITAIN, 'BEF Corps')) || moving_pieces.includes(find_piece(BRITAIN, 'BEF Army'))) {
        if (data.spaces[s].nation !== BRITAIN && data.spaces[s].nation !== FRANCE && data.spaces[s].nation !== BELGIUM && data.spaces[s].nation !== GERMANY) {
            return false
        }
    }

    if (data.spaces[s].map === 'neareast' && !can_enter_neareast(moving_pieces)) {
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

    return true
}

const neareast_armies = [
    find_piece(RUSSIA, 'CAU Army'),
    find_piece(BRITAIN, 'NE Army'),
    find_piece(FRANCE, 'Orient Army'),
    find_piece(BRITAIN, 'MEF Army'),
    find_piece(TURKEY, 'YLD Army'),
    find_piece(TURKEY, 'AoI Army')
]

function can_enter_neareast(pieces) {
    for (let p of pieces) {
        // if any pieces is an army and it's either not a neareast army or it's a neareast army that was initially
        // placed outside the neareast map, then the stack can't enter the neareast map
        if (data.pieces[p].type === ARMY && (!neareast_armies.includes(p) || game.ne_armies_placed_outside_neareast.includes(p))) {
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

    if (matches > STACKING_LIMIT)
        return true
    return false
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
    }

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

states.choose_attackers = {
    inactive: 'Choose Units to Attack',
    prompt() {
        view.prompt = `Choose which units will attack next`
        game.eligible_attackers.forEach((p) => {
            gen_action_undo()
            gen_action_piece(p)
        })
        gen_action_next()
        gen_action('finish_attacks')
    },
    piece(p) {
        push_undo()
        if (game.attack.pieces.includes(p))
            array_remove_item(game.attack.pieces, p)
        else
            game.attack.pieces.push(p)
    },
    next() {
        push_undo()
        game.state = 'choose_defending_space'
    },
    finish_attacks() {
        game.eligible_attackers = []
        end_attack_activation()
        goto_next_activation()
    }
}

states.choose_defending_space = {
    inactive: 'Choose Space to Attack',
    prompt() {
        view.prompt = `Choose which space to attack`

        let attackable_spaces = get_attackable_spaces(game.attack.pieces)
        attackable_spaces.forEach((s) => {
            gen_action_space(s)
        })

        gen_action_undo()
    },
    space(s) {
        push_undo()
        game.attack.space = s
        goto_attack()
    },
    piece(p) {
        push_undo()
        game.attack.space = game.location[p]
        goto_attack()
    }
}

function goto_attack() {
    game.attack.pieces.forEach((p) => {
        array_remove_item(game.eligible_attackers, p)
    })

    log_h2(`${faction_name(game.active)} attacks ${space_name(game.attack.space)} with ${game.attack.pieces.map((p) => piece_name(p)).join(', ')}`)

    const mo = game.active === AP ? game.ap.mo : game.cp.mo
    if (mo !== NONE && satisfies_mo(mo, game.attack.pieces, get_pieces_in_space(game.attack.space), game.attack.space)) {
        game[game.active].mo = NONE
        log(`${faction_name(game.active)} satisfied mandatory offensive`)
    }

    if (can_play_combat_cards() && get_trench_level(game.attack.space, other_faction(game.attack.attacker)) > 0) {
        // if defending space has a trench, go to 'negate_trench'
        game.state = 'negate_trench'
    } else if (attacker_can_flank()) {
        // if attacker can flank, go to 'choose_flank_attack'
        game.state = 'choose_flank_attack'
    } else if (defender_can_withdraw()) {
        // if defender can withdraw, go to 'choose_withdrawal'
        game.active = other_faction(game.active)
        game.state = 'choose_withdrawal'
    } else if (can_play_combat_cards()) {
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

    // TODO: Units in London may conduct a Combat only if the Combat also involves friendly units located in a
    //  space in either France or Belgium. Italian units may attack across the Taranto–Valona dotted line without
    //  friendly units located in Albania or Greece.

    if (is_invalid_multinational_attack(attackers)) {
        return []
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
    })

    return eligible_spaces
}

function get_nation_for_multinational_attacks(piece) {
    let nation = data.pieces[piece].nation
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
        // TODO: Russian Armies cannot make attacks from the Caucasus space to the Near East. One Russian
        //  corps may attack/retreat between the Caucasus space and the Near East per turn; this counts as the
        //  “one move” allowed under 11.3.2

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

states.negate_trench = {
    inactive: 'Attacker Choosing Whether to Negate Trenches',
    prompt() {
        view.prompt = 'Play any combat cards that would negate trenches'

        const trench_negating_cards = [ROYAL_TANK_CORPS, VON_BELOW, VON_HUTIER, MICHAEL, BLUCHER, PEACE_OFFENSIVE]
        game[game.active].hand.forEach((c) => {
            if (trench_negating_cards.includes(c)) {
                gen_action_card(c)
            }
        })

        gen_action_next()
    },
    card(c) {
        clear_undo()
        array_remove_item(game[game.active].hand, c)
        game.combat_cards.push(c)
        log(`${faction_name(game.active)} plays ${card_name(c)}`)
        this.next()
    },
    next() {
        if (attacker_can_flank()) {
            // if attacker can flank, go to 'choose_flank_attack'
            game.state = 'choose_flank_attack'
        } else if (defender_can_withdraw()) {
            // if defender can withdraw, go to 'choose_withdrawal'
            game.active = other_faction(game.active)
            game.state = 'choose_withdrawal'
        } else if (can_play_combat_cards()) {
            game.state = 'attacker_combat_cards'
        } else {
            begin_combat()
        }
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
        gen_action_undo()
        gen_action_pass()
    },
    space(s) {
        game.attack.pinning_space = s
        if (can_play_wireless_intercepts())
            game.state = 'play_wireless_intercepts'
        else
            this.pass()
    },
    pass() {
        if (defender_can_withdraw()) {
            // if defender can withdraw, go to 'choose_withdrawal'
            game.active = other_faction(game.active)
            game.state = 'choose_withdrawal'
        } else if (can_play_combat_cards()) {
            game.state = 'attacker_combat_cards'
        } else {
            begin_combat()
        }
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
        gen_action_undo()
        gen_action_next()
    },
    card(c) {
        array_remove_item(game[game.active].hand, c)
        game.combat_cards.push(c)
        log(`${faction_name(game.active)} plays ${card_name(c)}`)
    },
    next() {
        roll_flank_attack()
    }
}

function roll_flank_attack() {
    if (game.attack.pinning_space) {
        log(`Attempting to flank ${space_name(game.attack.space)}, pinning from ${space_name(game.attack.pinning_space)}`)
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
            log(`Flanking from ${space_name(s)} ${add_drm ? '+1 DRM' : 'adds no DRM'}`)
            if (add_drm)
                flank_drm++
        })
        const roll = roll_die(6)
        log(`Flank roll: ${roll} + ${flank_drm} DRM = ${roll+flank_drm}`)
        if (roll + flank_drm >= 4) {
            log('Flank attack successful')
            game.attack.is_flank = true
        } else {
            log('Flank attack failed')
            game.attack.failed_flank = true
        }
        clear_undo()
    }

    if (defender_can_withdraw()) {
        // if defender can withdraw, go to 'choose_withdrawal'
        game.active = other_faction(game.active)
        game.state = 'choose_withdrawal'
    } else if (can_play_combat_cards()) {
        game.state = 'attacker_combat_cards'
    } else {
        begin_combat()
    }
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
        log(`${faction_name(game.active)} plays ${card_name(c)}`)
        this.pass()
    },
    pass() {
        game.active = other_faction(game.active)
        game.state = 'attacker_combat_cards'
    }
}

states.attacker_combat_cards = {
    inactive: 'Attacker Combat Cards',
    prompt() {
        view.prompt = `Play combat cards`

        game[game.active].hand.forEach((c) => {
            if (data.cards[c].cc) {
                let evt = events[data.cards[c].event]
                if (evt && evt.can_play())
                    gen_action_card(c)
            }
        })
        gen_action_done()
    },
    card(c) {
        clear_undo()
        array_remove_item(game[game.active].hand, c)
        game.combat_cards.push(c)
        log(`${faction_name(game.active)} plays ${card_name(c)}`)
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
        gen_action_done()
    },
    card(c) {
        clear_undo()
        array_remove_item(game[game.active].hand, c)
        game.combat_cards.push(c)
        log(`${faction_name(game.active)} plays ${card_name(c)}`)
    },
    done() {
        begin_combat()
    }
}

function begin_combat() {
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
    if (game.attack.failed_flank) {
        resolve_defenders_fire()
        game.active = game.attack.attacker
        game.state = 'apply_attacker_losses'
    } else if (game.attack.is_flank) {
        resolve_attackers_fire()
        game.active = other_faction(game.attack.attacker)
        game.state = 'apply_defender_losses'
    } else {
        resolve_attackers_fire()
        resolve_defenders_fire()
        game.active = other_faction(game.attack.attacker)
        game.state = 'apply_defender_losses'
    }
}

const fire_table = {
    corps: [
        {factors: 0, result: [0, 0, 0, 0, 1, 1]},
        {factors: 1, result: [0, 0, 0, 1, 1, 1]},
        {factors: 2, result: [0, 1, 1, 1, 1, 1]},
        {factors: 3, result: [1, 1, 1, 1, 2, 2]},
        {factors: 4, result: [1, 1, 1, 2, 2, 2]},
        {factors: 5, result: [1, 1, 2, 2, 2, 3]},
        {factors: 6, result: [1, 1, 2, 2, 3, 3]},
        {factors: 7, result: [1, 2, 2, 3, 3, 4]},
        {factors: 8, result: [2, 2, 3, 3, 4, 4]}
    ],
    army: [
        {factors: 1, result:  [0, 1, 1, 1, 2, 2]},
        {factors: 2, result:  [1, 1, 2, 2, 3, 3]},
        {factors: 3, result:  [1, 2, 2, 3, 3, 4]},
        {factors: 4, result:  [2, 2, 3, 3, 4, 4]},
        {factors: 5, result:  [2, 3, 3, 4, 4, 5]},
        {factors: 6, result:  [3, 3, 4, 4, 5, 5]},
        {factors: 9, result:  [3, 4, 4, 5, 5, 7]},
        {factors: 12, result: [4, 4, 5, 5, 7, 7]},
        {factors: 15, result: [4, 5, 5, 7, 7, 7]},
        {factors: 16, result: [5, 5, 7, 7, 7, 7]}
    ]
}

function get_fire_result(t, cf, shifts, roll) {
    let table = fire_table[t]
    let col = 0
    while (col < table.length) {
        if (table[col].factors > cf) break
        col++
    }
    col += shifts
    col = col < 0 ? 0 : col >= table.length ? table.length-1 : col
    return table[col].result[roll-1]
}

function resolve_attackers_fire() {
    let attacker_cf = 0
    let table = "corps"

    for (let p of game.attack.pieces) {
        attacker_cf += get_piece_cf(p)
        if (data.pieces[p].type === ARMY)
            table = "army"
    }

    // Determine DRM based on played combat cards
    game.combat_cards.forEach((c) => {
        if (data.cards[c].faction === game.attack.attacker) {
            let evt = events[data.cards[c].event]
            if (evt && evt.can_apply_drm())
                evt.apply_drm()
        }
    })

    // -3 DRM if all attackers are in the Sinai space
    if (game.attack.pieces.every((p) => game.location[p] === SINAI)) {
        game.attack.attacker_drm -= 3
        log(`All attackers in Sinai, -3 DRM`)
    }

    log(`Attacking with ${attacker_cf} combat factors`)

    let attacker_shifts = 0

    // Terrain shifts
    let terrain = data.spaces[game.attack.space].terrain;
    if (terrain === MOUNTAIN) {
        attacker_shifts -= 1
        log(`Attacker's fire shifts 1L for Mountains`)
    }
    if (terrain === SWAMP) {
        attacker_shifts -= 1
        log(`Attacker's fire shifts 1L for Swamps`)
    }

    // Trench shifts
    if (!attacking_unoccupied_fort()) {
        if (get_trench_level(game.attack.space, other_faction(game.attack.attacker)) === 2) {
            attacker_shifts -= 2
            log(`Attacker's fire shifts 2L for Trenches`)
        } else if (get_trench_level(game.attack.space, other_faction(game.attack.attacker)) === 1) {
            attacker_shifts -= 1
            log(`Attacker's fire shifts 1L for Trenches`)
        }
    }

    let roll = roll_die(6) + game.attack.attacker_drm
    let clamped_roll = roll > 6 ? 6 : roll < 1 ? 1 : roll
    game.attack.defender_losses = get_fire_result(table, attacker_cf, attacker_shifts, clamped_roll)
    game.attack.defender_losses_taken = 0

    clear_undo()

    log(`Roll of ${roll} on the ${table} table causes ${game.attack.defender_losses} losses for the defender`)
}

function resolve_defenders_fire() {
    let defender_cf = 0
    let table = "corps"

    for_each_piece_in_space(game.attack.space, (p) => {
        defender_cf += get_piece_cf(p)
        if (data.pieces[p].type === ARMY)
            table = "army"
    })

    const space_data = data.spaces[game.attack.space]
    if (space_data.fort > 0 && !set_has(game.forts.destroyed, game.attack.space)) {
        defender_cf += space_data.fort
    }

    log(`Defending with ${defender_cf} combat factors`)

    let defender_shifts = 0
    if (get_trench_level(game.attack.space, other_faction(game.attack.attacker)) > 0) {
        defender_shifts += 1
        log(`Defender's fire shifts 1R for trench`)
    }

    game.combat_cards.forEach((c) => {
        if (data.cards[c].faction === other_faction(game.attack.attacker)) {
            let evt = events[data.cards[c].event]
            if (evt && evt.can_apply_drm())
                evt.apply_drm()
        }
    })

    let roll = roll_die(6) + game.attack.defender_drm
    let clamped_roll = roll > 6 ? 6 : roll < 1 ? 1 : roll
    game.attack.attacker_losses = get_fire_result(table, defender_cf, defender_shifts, clamped_roll)
    game.attack.attacker_losses_taken = 0

    clear_undo()

    log(`Roll of ${roll} on the ${table} table causes ${game.attack.attacker_losses} losses for the attacker`)
}

states.apply_defender_losses = {
    inactive: 'Defender Applying Losses',
    prompt() {
        view.prompt = `Take losses (${game.attack.defender_losses_taken}/${game.attack.defender_losses})`

        let loss_options = []
        if (game.attack.defender_losses - game.attack.defender_losses_taken > 0) {
            const fort_strength = has_undestroyed_fort(game.attack.space, game.active) ? data.spaces[game.attack.space].fort : 0
            loss_options = get_loss_options(game.attack.defender_losses - game.attack.defender_losses_taken, get_pieces_in_space(game.attack.space), fort_strength)
        }
        if (loss_options.length > 0) {
            loss_options.forEach((option) => {
                if (option === FORT_LOSS) {
                    gen_action_space(game.attack.space)
                } else {
                    gen_action_piece(option)
                }
            })
        } else {
            gen_action_undo()
            gen_action_done()
        }
    },
    piece(p) {
        push_undo()
        game.attack.defender_losses_taken += get_piece_lf(p)
        if (is_unit_reduced(p)) {
            let replacement = find_replacement(p, get_units_in_reserve())
            if (replacement === 0) {
                // eliminate piece
                log(`Eliminated ${piece_name(p)} in ${space_name(game.location[p])}`)
                game.removed.push(p)
                game.location[p] = 0
            } else {
                game.location[replacement] = game.location[p]
                log(`Replaced ${piece_name(p)} in ${space_name(game.location[p])} with ${piece_name(replacement)}`)
                game.location[p] = game.active === AP ? AP_ELIMINATED_BOX : CP_ELIMINATED_BOX
            }
        } else {
            log(`Reduced ${piece_name(p)} in ${space_name(game.location[p])}`)
            game.reduced.push(p)
        }
    },
    space(s) {
        push_undo()
        game.attack.defender_losses_taken += data.spaces[s].fort
        set_add(game.forts.destroyed, s)
        log(`Destroyed fort in ${space_name(s)}`)
    },
    done() {
        if (game.attack.failed_flank) {
            determine_combat_winner()
        } else if (game.attack.is_flank) {
            resolve_defenders_fire()
            game.active = game.attack.attacker
            game.state = 'apply_attacker_losses'
        } else {
            game.active = game.attack.attacker
            game.state = 'apply_attacker_losses'
        }
    }
}

states.apply_attacker_losses = {
    inactive: 'Attacker Applying Losses',
    prompt() {
        view.prompt = `Take losses (${game.attack.attacker_losses_taken}/${game.attack.attacker_losses})`

        let loss_options = []
        if (game.attack.attacker_losses - game.attack.attacker_losses_taken > 0)
            loss_options = get_loss_options(game.attack.attacker_losses - game.attack.attacker_losses_taken, game.attack.pieces)
        if (loss_options.length > 0) {
            loss_options.forEach((p) => {
                gen_action_piece(p)
            })
        } else {
            gen_action_undo()
            gen_action_done()
        }
    },
    piece(p) {
        game.attack.attacker_losses_taken += get_piece_lf(p)
        if (is_unit_reduced(p)) {
            let replacement = find_replacement(p, get_units_in_reserve())
            if (replacement === 0) {
                // eliminate piece
                log(`Eliminated ${piece_name(p)} in ${space_name(game.location[p])}`)
                game.removed.push(p)
                game.location[p] = 0
            } else {
                game.location[replacement] = game.location[p]
                log(`Replaced ${piece_name(p)} in ${space_name(game.location[p])} with ${piece_name(replacement)}`)
                game.location[p] = game.active === AP ? AP_ELIMINATED_BOX : CP_ELIMINATED_BOX
            }
            array_remove_item(game.attack.pieces, p)
        } else {
            log(`Reduced ${piece_name(p)} in ${space_name(game.location[p])}`)
            game.reduced.push(p)
        }
    },
    done() {
        if (game.attack.failed_flank) {
            resolve_attackers_fire()
            game.active = other_faction(game.attack.attacker)
            game.state = 'apply_defender_losses'
        } else {
            determine_combat_winner()
        }
    }
}

const FORT_LOSS = -1

function get_loss_options(to_satisfy, units, fort_strength) {
    // TODO: Priority units for taking losses, for example BEF
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

    let valid_units = []
    valid_paths.forEach((path) => valid_units.push(path.picked[0]))
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
                full_replacements: parent.full_replacements,
                reduced_replacements: parent.reduced_replacements,
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

function find_bef_army() {
    for (let i = 1; i < data.pieces.length; ++i) {
        if (data.pieces[i].name === "BEF Army") return i
    }
    return 0
}

function find_bef_corps() {
    for (let i = 1; i < data.pieces.length; ++i) {
        if (data.pieces[i].name === "BEF Corps") return i
    }
    return 0
}

function find_replacement(unit, available_replacements) {
    let unit_data = data.pieces[unit]
    if (unit_data.type !== ARMY)
        return 0

    if (unit === find_bef_army()) {
        let bef_corps = find_bef_corps()
        if (available_replacements.includes(bef_corps))
            return bef_corps
        else
            return 0
    }

    // British armies cannot be replaced by CND, AUS, or PT corps, so selecting on the name instead of nation
    if (unit_data.nation === BRITAIN) {
        for (let i = 0; i < available_replacements.length; ++i) {
            let replacement_data = data.pieces[available_replacements[i]]
            if (replacement_data.name === "BR Corps") {
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

function determine_combat_winner() {
    // Discard the loser's combat cards, or both player's cards if it's a tie
    let to_discard = []
    if (game.attack.defender_losses >= game.attack.attacker_losses) {
        const defender = other_faction(game.attack.attacker)
        to_discard.concat(game.combat_cards.filter((c) => data.cards[c].faction === defender))
    }
    if (game.attack.attacker_losses >= game.attack.defender_losses)
        to_discard.concat(game.combat_cards.filter((c) => data.cards[c].faction === game.attack.attacker))
    // Some combat cards are discarded or removed, even when the card's owner wins the combat
    game.combat_cards.forEach((c) => {
        // Any * cards that are removed after use
        if (data.cards[c].remove && !to_discard.includes(c))
            to_discard.push(c)
        // MINE_ATTACK and KEMAL are discarded after use
        if ((c === MINE_ATTACK || c === KEMAL) && !to_discard.includes(c))
            to_discard.push(c)
    })
    // "They shall not pass" is not discarded when the result is a tie (12.2.11)
    if (game.attack.attacker_losses === game.attack.defender_losses && to_discard.includes(THEY_SHALL_NOT_PASS))
        array_remove_item(to_discard, THEY_SHALL_NOT_PASS)

    // Now do the actual discard
    to_discard.forEach((c) => {
        array_remove_item(game.combat_cards, c)
        if (data.cards[c].remove)
            game[data.cards[c].faction].removed.push(c)
        else
            game[data.cards[c].faction].discard.push(c)
    })

    // Check for a full strength attacker
    let attacker_has_full_strength_unit = game.attack.pieces.find((p) => !is_unit_reduced(p)) !== undefined

    // Decide if the defender should retreat, attacker should advance, or if the combat is over
    let defender_pieces = get_pieces_in_space(game.attack.space)
    if (game.attack.defender_losses > game.attack.attacker_losses && attacker_has_full_strength_unit && defender_pieces.length > 0) {
        game.active = other_faction(game.attack.attacker)
        game.attack.to_retreat = defender_pieces
        game.attack.retreating_pieces = []
        game.attack.retreat_length = (game.attack.defender_losses - game.attack.attacker_losses === 1) ? 1 : 2
        game.attack.retreat_paths = []
        game.attack.to_advance = game.attack.pieces.filter((p) => !is_unit_reduced(p))
        game.attack.advancing_pieces = []
        // TODO: Offer option to take an extra loss to cancel the retreat, when available
        game.state = 'defender_retreat'
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
        gen_action_undo()
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

        gen_action_undo()
        if (game.attack.retreat_path.length === game.attack.retreat_length) {
            view.prompt = `End retreat?`
            gen_action_done()
        } else {
            if (game.attack.retreat_path.length === 0) {
                view.prompt = `Choose space to retreat through`
            } else {
                view.prompt = `Choose space to retreat to`
            }

            let options = get_retreat_options()
            options.forEach((s) => {
                gen_action_space(s)
            })
        }
    },
    space(s) {
        push_undo()
        game.attack.retreat_path.push(s)
        game.attack.retreating_pieces.forEach((p) => {
            game.location[p] = s
        })
    },
    done() {
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

function get_retreat_options() {
    let p = game.attack.retreating_pieces[0]
    let options = []
    let s = game.location[p]
    let has_friendly_option = false
    let has_in_supply_option = false

    get_connected_spaces_for_pieces(s, game.attack.retreating_pieces).forEach((conn) => {
        if (conn === game.attack.space)
            return

        if (game.attack.retreat_path.length === 1 && would_overstack(conn, game.attack.retreating_pieces, game.active))
            return

        if (game.attack.retreat_path.length === 1 && !is_controlled_by(conn, game.active))
            return

        if (is_controlled_by(conn, game.active))
            has_friendly_option = true

        if (is_space_supplied(game.active, conn))
            has_in_supply_option = true

        set_add(options, conn)
    })

    // if any options are friendly controlled, remove all enemy-controlled options
    if (has_friendly_option) {
        options = options.filter((s) => {
            return is_controlled_by(s, game.active)
        })
    }

    // if any spaces are in supply, remove all oos spaces
    if (has_in_supply_option) {
        options = options.filter((s) => {
            return is_space_supplied(game.active, s)
        })
    }

    // TODO: if any enemy spaces would result in the retreating unit being in supply, remove enemy spaces that would
    //  leave the retreating unit oos

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
        gen_action_undo()
        gen_action_done()
    },
    space(s) {
        push_undo()
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

function cost_to_activate(space, type) {
    let nations = []
    let has_russians = false
    let num_pieces = 0
    for_each_piece_in_space(space, (piece) => {
        num_pieces++
        let n = data.pieces[piece].nation
        if (n === "sn") n = TURKEY
        if (n === MONTENEGRO) n = SERBIA
        if (n === RUSSIA) has_russians = true
        set_add(nations, n)
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

    // TODO: Sud Army and 11th Army events modify the activation cost

    if (game.active === CP && game.events.moltke > 0 && !game.events.falkenhayn) {
        // Moltke modifies the activation cost, unless Falkenhayn also played
        if (nation === BELGIUM || nation === FRANCE) {
            cost = num_pieces
        }
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
    if (game.active === AP && is_space_supplied_through_mef(space)) {
        cost = 0
        const mef_army = find_piece(BRITAIN, "MEF Army")
        for_each_piece_in_space(space, (p) => {
            if (p === mef_army) {
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
    supply_cache = null
    get_oos_pieces().forEach((p) => {
        const faction = data.pieces[p].faction
        if (game.location[p] == MEDINA && data.pieces[p].nation == TURKEY) {
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
        if (data.pieces[p].type == ARMY) {
            game.location[p] = 0
            game.removed.push(p)
        } else {
            game.location[p] = game.active == AP ? AP_ELIMINATED_BOX : CP_ELIMINATED_BOX
        }
        if (game.attrition[game.active].spaces.length == 0 && game.attrition[game.active].pieces.length == 0) {
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
        let roll = roll_die(6)
        const drm = game.turn <= 2 ? -2 : 0
        const fort_str = data.spaces[s].fort
        if (roll + drm > fort_str) {
            log(`${faction_name(game.active)} successfully besiege ${space_name(s)} with a roll of ${roll+drm}`)
            array_remove_item(game.forts.besieged, s)
            set_add(game.forts.destroyed, s)
            set_control(s, game.active)
            capture_trench(s, game.active)
        } else {
            log(`${faction_name(game.active)} fail to besiege ${space_name(s)} with a roll of ${roll+drm}`)
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
    // If AP failed to conduct their mandated offensive, +1 VP (except FR after French Mutiny event)
    if (game.ap.mo !== NONE && !(game.ap.mo === FRANCE && game.events.french_mutiny)) {
        game.vp += 1
        game.ap.missed_mo.push(game.turn)
        log_h2(`${faction_name(AP)} failed to conduct their mandated offensive, +1 VP`)
    }
    // TODO: If French unit attacked without US support after French Mutiny, when FR MO, +1 VP

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
            log_h2("Allied Powers' War Commitment Level rises to Limited War")
            add_cards_to_deck(AP, COMMITMENT_LIMITED, game.ap.deck)
            game.ap.shuffle = true
        }
        if (game.cp.ws >= 4 && game.cp.commitment === COMMITMENT_MOBILIZATION) {
            game.cp.commitment = COMMITMENT_LIMITED
            log_h2("Central Powers' War Commitment Level rises to Limited War")
            add_cards_to_deck(CP, COMMITMENT_LIMITED, game.cp.deck)
            game.cp.shuffle = true
            set_nation_at_war(TURKEY)
        }
        if (game.ap.ws >= 11 && game.ap.commitment === COMMITMENT_LIMITED) {
            game.ap.commitment = COMMITMENT_TOTAL
            log_h2("Allied Powers' War Commitment Level rises to Total War")
            add_cards_to_deck(AP, COMMITMENT_TOTAL, game.ap.deck)
            game.ap.shuffle = true
        }
        if (game.cp.ws >= 11 && game.cp.commitment === COMMITMENT_LIMITED) {
            game.cp.commitment = COMMITMENT_TOTAL
            log_h2("Central Powers' War Commitment Level rises to Total War")
            add_cards_to_deck(CP, COMMITMENT_TOTAL, game.cp.deck)
            game.cp.shuffle = true
        }
    }

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
        view.prompt = 'Choose a unit to receive replacements, or choose an eliminated unit to return to play'
        let units = get_replaceable_units()
        units.forEach((p) => {
            gen_action_piece(p)
        })
        gen_action_undo()
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

        gen_action_undo()
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
        gen_action_undo()
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
        if (game.events.salonika > 0 || game.events.greece_neutral_entry > 0) {
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
        // TODO: Highlight cards that can be discarded, including the Italy and Romania cards under certain circumstances (9.5.2.5)
        game[game.active].hand.forEach((c) => {
            if (data.cards[c].cc) {
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

function gen_action_undo() {
    if (!view.actions)
        view.actions = {}
    if (game.undo && game.undo.length > 0)
        view.actions.undo = 1
    else
        view.actions.undo = 0
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
    if (nation !== undefined && data.spaces[s].limited_connections[nation])
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
                if (data.spaces[s].nation == nation) {
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
        gen_action_undo()

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
        if (!nation_at_war(nation))
            set_add(blocked_spaces, s)
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
    supply_cache = {}
    supply_cache.cp = {}
    supply_cache.eastern = {}
    supply_cache.western = {}
    supply_cache.salonika = {}
    // Italian units get a separate supply cache to allow for tracing supply across the Taranto-Valona connection
    supply_cache.italian = {}
    for (let s = 0; s < data.spaces.length; ++s) {
        supply_cache.cp[s] = { sources: [], non_italian_path: false, non_mef_path: false }
        supply_cache.eastern[s] = { sources: [], non_italian_path: false, non_mef_path: false }
        supply_cache.western[s] = { sources: [], non_italian_path: false, non_mef_path: false }
        supply_cache.salonika[s] = { sources: [], non_italian_path: false, non_mef_path: false }
        supply_cache.italian[s] = { sources: [], non_italian_path: false, non_mef_path: false }
    }
    let cp_sources = [ESSEN, BRESLAU]
    if (nation_at_war(BULGARIA))
        cp_sources.push(SOFIA)
    if (nation_at_war(TURKEY))
        cp_sources.push(CONSTANTINOPLE)
    generate_supply_cache(CP, supply_cache.cp, cp_sources, true)

    const eastern_supply_sources = [PETROGRAD, MOSCOW, KHARKOV, CAUCASUS, BELGRADE]
    generate_supply_cache(AP, supply_cache.eastern, eastern_supply_sources, false, RUSSIA)
    if (is_controlled_by(SALONIKA_SPACE, AP))
        generate_supply_cache(AP, supply_cache.salonika, [SALONIKA_SPACE], false) // Separate cache for Serbian units only

    const western_supply_sources = [LONDON]
    generate_supply_cache(AP, supply_cache.western, western_supply_sources, true)
    generate_supply_cache(AP, supply_cache.italian, western_supply_sources, true, ITALY)
}

function is_unit_supplied(p) {
    let faction = data.pieces[p].faction
    let nation = data.pieces[p].nation
    let location = game.location[p]
    if (location === 0)
        return true

    if (data.pieces[p].name === "ANA Corps" && data.spaces[location].map === "neareast")
        return true

    if (nation === MONTENEGRO)
        return true

    if (nation === "sn" && data.spaces[location].map === "neareast")
        return true

    if (!supply_cache) search_supply()
    const cache = get_supply_cache_for_piece(p)

    if (nation === SERBIA) {
        if (data.spaces[location].nation === SERBIA)
            return true // Serbian units are always in supply in Serbia
        else if (is_controlled_by(SALONIKA_SPACE, AP) && supply_cache.salonika[location].sources.length > 0)
            return true // Serbian units can trace supply to Salonika if it is friendly controlled
    }

    return cache[location].sources.length > 0
}

function get_supply_cache_for_piece(p) {
    let faction = data.pieces[p].faction
    let nation = data.pieces[p].nation
    let cache = (faction === CP) ? supply_cache.cp : supply_cache.western
    if (nation === ITALY)
        cache = supply_cache.italian
    else if (nation === RUSSIA || nation === SERBIA || nation === ROMANIA) {
        cache = supply_cache.eastern
    }
    return cache
}

function is_unit_supplied_through_italy(p) {
    if (!supply_cache) search_supply()

    if (!is_unit_supplied(p))
        return false

    const cache = get_supply_cache_for_piece(p)
    return !cache[game.location[p]].non_italian_path
}

function is_space_supplied_through_mef(s) {
    if (!supply_cache) search_supply()

    if (!is_space_supplied(AP, s))
        return false

    return !supply_cache.western[s].non_mef_path
}

function is_space_supplied(faction, s) {
    if (!supply_cache) search_supply()
    if (faction === CP) {
        return supply_cache.cp[s].sources.length > 0
    } else {
        return supply_cache.eastern[s].sources.length > 0
            || supply_cache.western[s].sources.length > 0
            || supply_cache.italian[s].sources.length > 0
            || is_controlled_by(SALONIKA_SPACE, AP) && supply_cache.salonika[s].sources.length > 0
    }
}

function query_supply() {
    if (!supply_cache) search_supply()
    supply_cache.oos_pieces = get_oos_pieces()
    return supply_cache
}

function get_oos_pieces() {
    let oos_pieces = []
    for (let p = 1; p < data.pieces.length; ++p) {
        if (game.location[p] !== 0 && game.location[p] < AP_RESERVE_BOX && !is_unit_supplied(p)) {
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
        gen_action_undo()
        if (game.landwehr_replacements > 0) {
            for (let p = 1; p < data.pieces.length; ++p) {
                if (data.pieces[p].faction === CP && is_unit_reduced(p) && is_unit_supplied(p)) {
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

// CP #17
events.mata_hari = {
    can_play() {
        return true
    },
    play() {
        clear_undo()
        game.events.mata_hari = game.turn
        log("Mata Hari reveals the contents of the Allied hand:")
        for (let c of game.ap.hand) {
            log(`${card_name(c)}`)
        }
        game.ops = data.cards[MATA_HARI].ops
        game.state = 'activate_spaces'
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

// CP #34
events.bulgaria_entry = {
    is_neutral_entry: true,
    can_play() {
        return can_play_neutral_entry()
    },
    play() {
        set_nation_at_war(BULGARIA)
        game.units_to_place = find_n_unused_pieces(BULGARIA, 'BU Corps', 4)
        game.state = 'place_new_neutral_units'
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
    can_apply_drm() {
        return this.can_play()
    },
    apply_drm() {
        if (game.attack.attacker === CP) {
            log(`${card_name(KAISERTREU)} adds +1 DRM`)
            game.attack.attacker_drm += 1
        } else {
            log(`${card_name(KAISERTREU)} adds +1 DRM`)
            game.attack.defender_drm += 1
        }
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
    can_apply_drm() {
        return this.can_play()
    },
    apply_drm() {
        if (game.attack.attacker === AP) {
            log(`${card_name(PLEVE)} adds +1 DRM`)
            game.attack.attacker_drm += 1
        } else {
            log(`${card_name(PLEVE)} adds +1 DRM`)
            game.attack.defender_drm += 1
        }
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
        game.units_to_place = find_n_unused_pieces(ROMANIA, 'RO Corps', 4)
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

// AP #28
events.landships = {
    can_play() {
        return true
    },
    play() {
        push_undo()
        game.events.landships = game.turn
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
        set_nation_at_war(GREECE)
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
        gen_action_undo()
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

// AP #59
events.alpine_troops = {
    can_play() {
        if (!game.attack)
            return false
        return !!(game.attack.attacker === AP && game.attack.pieces.every(p => data.pieces[p].nation === ITALY));
    },
    can_apply_drm() {
        return this.can_play()
    },
    apply_drm() {
        log(`${card_name(ALPINE_TROOPS)} adds +1 DRM`)
        game.attack.attacker_drm += 1
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
    game.log.push(">" + msg)
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
