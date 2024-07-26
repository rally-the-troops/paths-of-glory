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
const LYBIAN_REVOLT = 89
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
const SALONIKA = 30
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
const AMIENS = 16
const CALAIS = 17
const OSTEND = 18
const LIEGE = 33
const KOBLENZ = 41
const ESSEN = 43
const BRESLAU = 94
const BELGRADE = 125
const PETROGRAD = 143
const MOSCOW = 152
const KHARKOV = 170
const CAUCASUS = 186
const SOFIA = 198
const GALLIPOLI = 212
const CONSTANTINOPLE = 219
const ARABIA_SPACE = 271
const AP_RESERVE_BOX = 282
const CP_RESERVE_BOX = 283
const AP_ELIMINATED_BOX = 284
const CP_ELIMINATED_BOX = 285

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
        // TODO: Add actions that can be done at any time, regardless of state
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
        usc: game.usc,
        rc: game.rc,
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
            trenches: game.ap.trenches
        },
        cp: {
            deck: game.cp.deck.length,
            hand: game.cp.hand.length,
            commitment: game.cp.commitment,
            mo: game.cp.mo,
            ws: game.cp.ws,
            actions: game.cp.actions,
            ru_vp: game.cp.ru_vp,
            trenches: game.cp.trenches
        },
        rp: game.rp,
        war: game.war,
        location: game.location,
        reduced: game.reduced,
        forts: {
            destroyed: game.forts.destroyed,
            besieged: game.forts.besieged
        },
        control: game.control,
        events: game.events,
        who: game.who
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
    // TODO: Actually use scenarios
    scenario = HISTORICAL

    game = create_empty_game_state(seed, scenario, options)

    log_h1("Paths of Glory")

    // TODO: Do real scenario setup and remove this
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

    if (game.scenario == HISTORICAL) {
        game.options.hand_size = 8
        game.options.start_with_guns_of_august = 1
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
        usc: 0, // US commitment level
        rc: 0, // Russian capitulation level
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
            trenches: {} // Trench levels per space
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
            trenches: {}
        },

        reinf_this_turn: {}, // Which nations have received reinforcements this turn
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
    log_h1(`Turn ${game.turn}`)
    log_br()
    log_h1(`${faction_name(game.active)} Action ${game[game.active].actions.length+1}`)
}

function deal_ap_cards() {
    while (game.ap.hand.length < game.options.hand_size) {
        if (game.ap.deck.length == 0)
            reshuffle_discard(game.ap.deck)
        if (game.ap.deck.length == 0)
            break
        game.ap.hand.push(draw_card(game.ap.deck))
    }
}

function deal_cp_cards() {
    while (game.cp.hand.length < game.options.hand_size) {
        if (game.cp.deck.length == 0)
            reshuffle_discard(game.cp.deck)
        if (game.cp.deck.length == 0)
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

    // TODO: Clean up other lingering game state

    // Check for game end
    if (game.turn == 20) { // TODO: Other scenarios have other turn limits
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
    const faction = data.spaces[capitals[0]].faction
    for (let c of capitals) {
        if (is_friendly_control(c, faction)) {
            return false
        }
    }
    return true
}

function any_capitals_occupied(nation) {
    const capitals = get_capitals(nation)
    const faction = data.spaces[capitals[0]].faction
    for (let c of capitals) {
        if (is_enemy_control(c, faction)) {
            return true
        }
    }
    return false
}

function satisfies_mo(mo, attackers, defenders, space) {
    let attacker_nation = mo == AH_IT ? AUSTRIA_HUNGARY : mo;
    let valid_attacker = attackers.find((a) => {
        let piece = data.pieces[a]
        if (piece.nation != attacker_nation)
            return false
        if (attacker_nation == BRITAIN &&
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
        if (attacker_nation == FRANCE || attacker_nation == BRITAIN) {
            return piece.nation == GERMANY
        }
        if (attacker_nation == GERMANY) {
            return piece.nation == BELGIUM || piece.nation == FRANCE || piece.nation == BRITAIN || piece.nation == US
        }
    })
    if (valid_defender === undefined)
        return false

    let location = data.spaces[space].nation;
    if (attacker_nation == FRANCE || attacker_nation == BRITAIN || attacker_nation == GERMANY) {
        if (location != FRANCE && location != BELGIUM && location != GERMANY) {
            return false
        }
    }

    if (mo == AH_IT) {
        // All other conditions have passed, so the attack satisfies the MO if the defender is Italian, the attacked
        // space is Italian, *or* the attacked space traces supply through Italy
        for (let d of defenders) {
            if (data.pieces[d].nation == ITALY)
                return true
        }

        if (location == ITALY)
            return true

        let supply_path = get_supply_path(AP, space)
        for (let s of supply_path) {
            if (data.pieces[s].nation == ITALY)
                return true
        }
    }

    return true
}

function get_supply_path(faction, space) {
    // TODO
    return []
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
    if (game.active == AP) {
        return game.ap
    }
    if (game.active == CP) {
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
        faction = is_friendly_control(s, AP) ? AP : CP

    game[faction].trenches[s] = level
}

function get_trench_level(s, faction) {
    if (faction === undefined)
        faction = is_friendly_control(s, AP) ? AP : CP

    let level = game[faction].trenches[s]
    return level ?? 0
}

// === GAME STATES ===

states.action_phase = {
    inactive: "Action Phase",
    prompt() {
        let p = get_active_player()
        view.prompt = `Action ${p.actions.length+1}: Play a card or choose an action`
        for (let i = 0; i < p.hand.length; ++i)
            gen_card_menu(p.hand[i])
        if (game.options.can_offer_peace) // TODO: Check for appropriate conditions?
            gen_action('offer_peace')
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
    offer_peace() {
        goto_offer_peace()
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
    // TODO: Deal with combat cards?
    if (cards[card].remove)
        active_player.removed.push(card)
    else
        active_player.discard.push(card)

    const card_data = data.cards[card]
    if (card_data.ws) {
        active_player.ws += card_data.ws
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

    discard_card(card, 'for sr')
    game.state = 'choose_sr_unit'
}

states.choose_sr_unit = {
    inactive: "Selecting Unit to SR",
    prompt() {
        view.prompt = `Select a unit to move by SR (${game.sr.pts} points remaining)`
        game.location.forEach((loc, p) => {
            if (loc != 0 && data.pieces[p].faction == game.active && can_sr(p)) {
                gen_action_piece(p)
            }
        })
        gen_action_undo()
        gen_action_done()
    },
    piece(p) {
        if (game.sr.unit == 0) {
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
    return data.pieces[p].type == ARMY ? 4 : 1;
}

function can_sr(p) {
    let piece_data = data.pieces[p]
    if (sr_cost(p) > game.sr.pts) return false
    if (set_has(game.sr.done, p)) return false
    if (game.location[p] == AP_RESERVE_BOX || game.location[p] == CP_RESERVE_BOX) {
        // TODO: if enemy controls or besieges a nation's capital, no corps can SR from the Reserve Box (13.1.11)

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
    if (piece_data.nation == RUSSIA &&
        !(game.location[p] == AP_RESERVE_BOX || data.spaces[game.location[p]].nation == RUSSIA)) {
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

    if (start == AP_RESERVE_BOX || start == CP_RESERVE_BOX) {
        // Add all spaces containing a supplied unit of the correct nationality, except ANA Corps and SN Corps
        for (let i = 0; i < game.location.length; i++) {
            if (game.location[i] != 0 &&
                data.pieces[i].nation == nation &&
                is_unit_supplied(i) &&
                i != BRITISH_ANA_CORPS &&
                i != TURKISH_SN_CORPS) {
                set_add(destinations, game.location[i])
            }
        }

        // Add all capitals and supply sources in the nation, as long as they are in supply
        for (let s = 1; s < data.spaces.length; s++) {
            if (data.spaces[s].nation == nation &&
                is_space_supplied(game.active, s) &&
                (data.spaces[s].capital == true || data.spaces[s].supply == true)) {
                set_add(destinations, s)
            }
        }

        // If the nation is Serbia, add Salonika, when it is controlled by the allies and in supply
        const salonika = find_space('Salonika')
        if (nation == SERBIA && is_space_supplied(AP, salonika) && is_friendly_control(salonika, AP)) {
            set_add(destinations, salonika)
        }

        // If the nation is the US, add all Allied-controlled ports in France
        if (nation == US) {
            for (let s = 1; s < data.spaces.length; s++) {
                if (data.spaces[s].nation == FRANCE &&
                    is_friendly_control(s, AP) &&
                    data.spaces[s].apport == true) {
                    set_add(destinations, s)
                }
            }
        }
    } else if (data.pieces[game.sr.unit].type == CORPS) {
        // Corps can SR to the reserve box
        if (game.active == AP) {
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
            // TODO: Check for restrictions based on besieged forts
            if (!set_has(destinations, n) && is_space_supplied(game.active, n)) {
                if (nation == RUSSIA && data.spaces[n].nation != RUSSIA)
                    return
                set_add(destinations, n)
                set_add(frontier, n)
            }
        })
    }

    // AP can SR Corps to any friendly-controlled port, CP can SR using ports in Germany and Russia
    if (data.pieces[game.sr.unit].type == CORPS) {
        if (game.active == AP && data.spaces[start].apport == true) {
            for (let s = 1; s < data.spaces.length; s++) {
                if (data.spaces[s].apport == true &&
                    is_friendly_control(s, AP)) {
                    set_add(destinations, s)
                }
            }
        } else if (game.active == CP && data.spaces[start].cpport == true) {
            for (let s = 1; s < data.spaces.length; s++) {
                if (data.spaces[s].cpport == true &&
                    is_friendly_control(s, CP)) {
                    set_add(destinations, s)
                }
            }
        }
    }

    // TODO: 13.1.11 Capitals and SR: If the enemy controls or besieges a nation’s capital (Paris in the case of France,
    // Vienna or Budapest in the case of A-H), no Corps of that nation may SR to or from the Reserve Box as long as the
    // enemy control lasts. Exception: Belgian and Serb units are not affected by this restriction. The MN unit may not
    // use SR overland. It may SR to and from the Reserve Box.

    // TODO: 13.1.12 Units may not SR to or from the Reserve box under the following conditions: German and Austrian
    //  units tracing supply to Sofia or Constantinople, Turkish units tracing supply to Essen, Breslau or Sofia,
    //  Bulgarian units tracing supply to Essen, Breslau or Constantinople, and Russian and Romanian units tracing
    //  supply to Belgrade.

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

    // TODO: If "over there" is in effect, add 1 to the US RP total

    discard_card(card, 'for rps')
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
    }

    game.reinforcements = []
    card_data.reinf.split('|').forEach((name) => {
        let p = find_unused_piece(card_data.reinfnation, name)
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

    // TODO: Special placement rules for certain corps units

    // Corps can be placed in the reserve box
    if (piece_data.type == CORPS) {
        // TODO: Handle special corps placement rules
        if (piece_data.faction == AP)
            spaces.push(AP_RESERVE_BOX)
        else
            spaces.push(CP_RESERVE_BOX)
        return spaces
    }

    // TODO: Special placement rules for French Orient Army, British NE Army, Russian CAU Army, and British MEF Army

    // US Armies can only be placed at unbesieged ports in France
    if (nation == US) {
        for (let s = 1; s < data.spaces.length; s++) {
            const space = data.spaces[s]
            if (space.nation == FRANCE && space.apport && is_friendly_control(s, game.active) && !is_besieged(s)) {
                spaces.push(s)
            }
        }
        return spaces
    }

    // Friendly-controlled capitals can receive armies
    const capitals = get_capitals(nation)
    for (let c of capitals) {
        if (is_friendly_control(c, game.active) && is_space_supplied(game.active, c) && !is_fully_stacked(c, game.active)) {
            spaces.push(c)
        }
    }

    // Friendly supply sources in the right nation can receive armies
    for (let s = 1; s < data.spaces.length; s++) {
        const space = data.spaces[s]
        if (space.nation == nation && space.supply && is_friendly_control(s, game.active) && is_space_supplied(game.active, s) && !is_fully_stacked(s, game.active)) {
            spaces.push(s)
        }
    }

    // If Paris is fully stacked, but not besieged or captured, French reinforcements can go in Orleans
    const paris = find_space('Paris')
    const orleans = find_space('Orleans')
    if (nation == FRANCE &&
        is_fully_stacked(paris, game.active) &&
        is_friendly_control(paris, game.active) &&
        is_friendly_control(orleans, game.active &&
        is_space_supplied(game.active, orleans))) {
        spaces.push(orleans)
    }

    return spaces
}

function goto_offer_peace() {
    // TODO
}

states.activate_spaces = {
    inactive: "Activate Spaces",
    prompt() {
        view.prompt = `Activate spaces: click spaces to activate (${game.ops} ops remaining)`
        let spaces = []
        game.location.forEach((loc, p) => {
            if (loc != 0 && data.pieces[p].faction == game.active) {
                set_add(spaces, loc)
            }
        })
        spaces.forEach((s) => {
            if (set_has(game.activated.move, s) || set_has(game.activated.attack, s)) {
                gen_action('deactivate', s)
            } else if (game.ops >= cost_to_activate(s)) {
                gen_action('activate_move', s)
                gen_action('activate_attack', s)
            }
        })
        gen_action_undo()
        gen_action_next()
    },
    deactivate(s) {
        push_undo()
        if (set_has(game.activated.move, s)) {
            game.ops += cost_to_activate(s)
            set_delete(game.activated.move, s)
        } else if (set_has(game.activated.attack, s)) {
            game.ops += cost_to_activate(s)
            set_delete(game.activated.attack, s)
        }
    },
    activate_move(s) {
        push_undo()
        set_add(game.activated.move, s)
        game.ops -= cost_to_activate(s)
    },
    activate_attack(s) {
        push_undo()
        set_add(game.activated.attack, s)
        game.ops -= cost_to_activate(s)
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
        attacker: game.active
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
    if (game.ap.actions.length < 6 || game.cp.actions.length < 6) {
        game.active = other_faction(game.active)
        game.state = 'action_phase'
        log_h1(`${faction_name(game.active)} Action ${game[game.active].actions.length+1}`)
    } else {
        goto_attrition_phase()
    }
}

states.choose_move_space = {
    inactive: 'Choose Space to Move',
    prompt() {
        view.prompt = `Choose which space to begin moving`
        game.activated.move.forEach((s) => {
            gen_action_space(s)
        })
        game.location.forEach((loc, piece) => {
            if (game.activated.move.includes(loc)) {
                gen_action_piece(piece)
            }
        })
        gen_action_undo()
    },
    space(s) {
        push_undo()
        game.move.initial = s
        game.move.current = s
        game.state = 'choose_pieces_to_move'
    },
    piece(p) {
        push_undo()
        let s = game.location[p]
        game.move.initial = s
        game.move.current = s
        game.state = 'choose_pieces_to_move'
    }
}

states.choose_pieces_to_move = {
    inactive: 'Choose Units to Move',
    prompt() {
        view.prompt = `Choose the units to move from ${space_name(game.move.initial)}`

        let selected_all = true
        for_each_piece_in_space(game.move.initial, (p) => {
            if (get_piece_mf(p) > 0) {
                if (!game.move.pieces.includes(p))
                    selected_all = false
                gen_action_piece(p)
            }
        })
        // TODO: Add an entrench action when appropriate

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
            // TODO: Pass nation to get_connected_spaces if appropriate
            get_connected_spaces(game.move.current).forEach((conn) => {
                if (can_move_to(conn))
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
        if (!data.spaces[s].fort || set_has(game.forts.destroyed, s)) {
            set_control(s, game.active)
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
    // TODO: Handle special cases for control:
    //
    // The ANA unit is an exception to case 11.1.14. The ANA does not convert CP spaces it enters. Instead any CP space
    // (except for a besieged fort space) the ANA occupies is considered under Allied control. The instant the ANA
    // leaves such a space it reverts back to CP control. The ANA has no effect on spaces converted by other Allied
    // units—these remain Allied after the ANA exits.
    //
    // The Turkish SN Corps converts spaces per 11.1.14. However, during the Attrition Phase, any spaces it converts
    // (other than the space it occupies) that cannot trace a supply line suffer Attrition. The Libya space suffers
    // normal attrition and can be controlled by the Allied player through normal movement.

    const new_control = faction === CP ? 1 : 0
    if (game.control[s] == new_control)
        return

    if (data.spaces[s].vp) {
        if (faction == AP) {
            game.vp--
        } else {
            game.vp++
        }
        log(`${faction_name(faction)} gains ${space_name(s)} for 1 VP`)
    }

    game.control[s] = new_control
    supply_cache = null
}

function is_friendly_control(s, faction) {
    return game.control[s] == (faction == CP ? 1 : 0)
}

function is_enemy_control(s, faction) {
    return !is_friendly_control(s, faction)
}

function can_move_to(s) {
    let contains_enemy = false
    for_each_piece_in_space(s, (p) => {
        if (data.pieces[p].faction !== game.active)
            contains_enemy = true
    })
    if (contains_enemy)
        return false

    // Dashed lines indicate there are restrictions as to which nationalities may move (or attack) across those lines.

    // No units may enter a MEF space unless the MEF Beachhead marker is in the space.

    // Units may not enter a space in a neutral nation, but all units may freely enter any nation immediately after it
    // enters the war. Exceptions: Limited Greek Entry

    // Units may always enter Albania. Albanian spaces are considered Allied Controlled at Start for SR purposes.
    // Albanian spaces check Attrition supply by tracing normally to an Allied supply source or tracing to Taranto
    // even while Italy is still Neutral.

    // Neither the BEF Corps nor Army may move in or attack into any space outside Britain, France, Belgium, and
    // Germany.

    // TODO: Check for legality of move
    return true
}

function is_fully_stacked(s, faction) {
    let matches = 0
    for (let p = 1; p < game.location.length; ++p) {
        if (game.location[p] == s && data.pieces[p].faction == faction) {
            matches++
        }
        if (matches == STACKING_LIMIT)
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
        if (data.pieces[p].faction == faction) {
            matches++
        }
    })
    for (let p = 1; p < game.location.length; ++p) {
        if (game.location[p] == s && data.pieces[p].faction == faction) {
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

    if (!game.events.race_to_the_sea && (s == AMIENS || s == CALAIS || s == OSTEND) && game.cp.ws < 4) {
        return false
    }

    if (is_overstacked(s, game.active))
        return false

    return true
}

function end_move_stack() {
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

    const mo = game.active == AP ? game.ap.mo : game.cp.mo
    if (mo != NONE && satisfies_mo(mo, game.attack.pieces, get_pieces_in_space(game.attack.space), game.attack.space)) {
        if (game.active == AP)
            game.ap.mo = NONE
        if (game.active == CP)
            game.cp.mo = NONE
    }

    if (get_trench_level(game.attack.space, other_faction(game.attack.attacker)) > 0) {
        // if defending space has a trench, go to 'negate_trench'
        game.state = 'negate_trench'
    } else if (attacker_can_flank()) {
        // if attacker can flank, go to 'choose_flank_attack'
        game.state = 'choose_flank_attack'
    } else if (defender_can_withdraw()) {
        // if defender can withdraw, go to 'choose_withdrawal'
        game.active = other_faction(game.active)
        game.state = 'choose_withdrawal'
    } else {
        game.state = 'attacker_combat_cards'
    }
}

function attacker_can_flank() {
    const space_data = data.spaces[game.attack.space]
    // Mountains and swamps cannot be flanked
    if (space_data.terrain === MOUNTAIN || space_data.terrain === SWAMP)
        return false

    // Unoccupied forts cannot be flanked
    if (space_data.fort > 0 && !set_has(game.forts.destroyed, game.attack.space) && get_pieces_in_space(game.attack.space).length == 0) {
        return false
    }

    // Attacker must have an army and attack from at least two spaces to flank
    let has_army = false
    let attack_spaces = []
    game.attack.pieces.forEach((p) => {
        if (data.pieces[p].type == ARMY)
            has_army = true
        set_add(attack_spaces, game.location[p])
    })
    if (!has_army || attack_spaces.length < 2)
        return false

    return true
}

function defender_can_withdraw() {
    // TODO
    return false
}

function get_attackable_spaces(attackers) {
    let eligible_spaces = []
    for (let i = 0; i < attackers.length; ++i) {
        let attacker = attackers[i]
        let attackable_spaces = get_attackable_spaces_for_piece(attacker)
        if (i == 0) { // First attacker's spaces are all eligible
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

    // TODO: Multi-national Attacks can occur from more than one space if one of the spaces in the attack contains
    //  units of all involved nationalities. Any other space(s) involved in the same Combat may contain units from
    //  any of the nationalities in the common space. Each participating nation must have a unit in the common
    //  space participating in the attack. Due to this restriction and stacking limits, no Combat may involve more
    //  than three nationalities on each side.

    return eligible_spaces
}

function get_attackable_spaces_for_piece(p) {
    let attackable_spaces = []
    let s = game.location[p]
    get_connected_spaces(s, data.pieces[p].nation).forEach((conn) => {
        // TODO: Russian Armies cannot make attacks from the Caucasus space to the Near East. One Russian
        //  corps may attack/retreat between the Caucasus space and the Near East per turn; this counts as the
        //  “one move” allowed under 11.3.2

        if (can_be_attacked(conn)) {
            // TODO: 15.1.11: German units may not attack spaces containing Russian forts until the OberOst Event Card
            //  is played or the Central Powers War Status is 4 or higher. German units may, however, besiege unoccupied
            //  Russian forts. Austro- Hungarian units are not restricted by this rule.
            set_add(attackable_spaces, conn)
        }
    })
    return attackable_spaces
}

function can_be_attacked(s) {
    let retval = false

    // Check if space has an attackable fort
    if (data.spaces[s].fort > 0 && is_enemy_control(s, game.active) && !set_has(game.forts.destroyed, s) && !set_has(game.forts.besieged)) {
        return true
    }

    for (let p = 0; p < game.location.length; ++p) {
        if (game.location[p] == s && data.pieces[p].faction !== game.active) {
            retval = true
            break
        }
    }

    // TODO: Can't have only units that retreated this round
    return retval
}

// TODO
states.negate_trench = {
    inactive: 'Attacker Choosing Whether to Negate Trenches',
    prompt() {
        // TODO: If attacker has a card that would negate trenches, allow them to play it
        //view.prompt = 'Negate trenches?'
        // else
        view.prompt = 'You cannot negate trenches'
        gen_action_undo()
        gen_action_next()
    },
    next() {
        if (attacker_can_flank()) {
            // if attacker can flank, go to 'choose_flank_attack'
            game.state = 'choose_flank_attack'
        } else if (defender_can_withdraw()) {
            // if defender can withdraw, go to 'choose_withdrawal'
            game.active = other_faction(game.active)
            game.state = 'choose_withdrawal'
        } else {
            game.state = 'attacker_combat_cards'
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
        if (defender_can_withdraw()) {
            // if defender can withdraw, go to 'choose_withdrawal'
            game.active = other_faction(game.active)
            game.state = 'choose_withdrawal'
        } else {
            game.state = 'attacker_combat_cards'
        }
    },
    pass() {
        if (defender_can_withdraw()) {
            // if defender can withdraw, go to 'choose_withdrawal'
            game.active = other_faction(game.active)
            game.state = 'choose_withdrawal'
        } else {
            game.state = 'attacker_combat_cards'
        }
    }
}

// TODO
states.choose_withdrawal = {
    inactive: 'Defender Choosing Whether to Withdraw',
    prompt() {
        view.prompt = 'Withdraw?'
        gen_action_undo()
        gen_action_next()
    },
    next() {
        game.state = 'defender_combat_cards'
    }
}

// TODO
states.attacker_combat_cards = {
    inactive: 'Attacker Combat Cards',
    prompt() {
        view.prompt = `Play combat cards`

        gen_action_undo()
        gen_action_next()
    },
    next() {
        game.active = other_faction(game.attack.attacker)
        game.state = 'defender_combat_cards'
    }
}

// TODO
states.defender_combat_cards = {
    inactive: 'Defender Combat Cards',
    prompt() {
        view.prompt = `Play combat cards`
        gen_action_next()
    },
    next() {
        begin_combat()
    }
}

function begin_combat() {
    log_h2(`${faction_name(game.attack.attacker)} attacking ${space_name(game.attack.space)}`)
    if (game.attack.pinning_space) {
        log(`Attempting flanking attack: ${space_name(game.attack.pinning_space)} is the pinning space`)
        const flanking_spaces = []
        let flank_drm = 0
        game.attack.pieces.forEach((p) => {
            if (game.location[p] != game.attack.pinning_space) {
                set_add(flanking_spaces, game.location[p])
            }
        })
        flanking_spaces.forEach((s) => {
            let add_drm = true
            if (adjacent_to_enemy_occupied_space(s, game.attack.attacker)) {
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
    resolve_fire()
}

function adjacent_to_enemy_occupied_space(s, faction) {
    const spaces = get_connected_spaces(s)
    for (let i = 0; i < spaces.length; ++i) {
        if (contains_enemy_piece(spaces[i], faction))
            return true
    }
    return false
}

function contains_enemy_piece(s, faction) {
    const pieces = get_pieces_in_space(s)
    for (let i = 0; i < pieces.length; ++i) {
        if (data.pieces[pieces[i]].faction !== faction)
            return true
    }
    return false
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
        if (data.pieces[p].type == "army")
            table = "army"
    }

    // TODO: Determine DRM based on played combat cards
    game.attack.attacker_drm = 0
    // TODO: -3 DRM if all attackers are in the Sinai space

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
    if (get_trench_level(game.attack.space, other_faction(game.attack.attacker)) == 2) {
        attacker_shifts -= 2
        log(`Attacker's fire shifts 2L for Trenches`)
    } else if (get_trench_level(game.attack.space, other_faction(game.attack.attacker)) == 1) {
        attacker_shifts -= 1
        log(`Attacker's fire shifts 1L for Trenches`)
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
        if (data.pieces[p].type == "army")
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

    // TODO: Determine DRM based on played combat cards
    game.attack.defender_drm = 0

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
        if (game.attack.defender_losses - game.attack.defender_losses_taken > 0)
            loss_options = get_loss_options(game.attack.defender_losses - game.attack.defender_losses_taken, get_pieces_in_space(game.attack.space))
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
        game.attack.defender_losses_taken += get_piece_lf(p)
        if (is_unit_reduced(p)) {
            let replacement = find_replacement(p, get_units_in_reserve())
            if (replacement == 0) {
                // eliminate piece
                game.removed.push(p)
                game.location[p] = 0
            } else {
                game.location[replacement] = game.location[p]
                game.location[p] = game.active == AP ? AP_ELIMINATED_BOX : CP_ELIMINATED_BOX
            }
        } else {
            game.reduced.push(p)
        }
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
            if (replacement == 0) {
                // eliminate piece
                game.removed.push(p)
                game.location[p] = 0
            } else {
                game.location[replacement] = game.location[p]
                // TODO: put p in the replaceable units box instead of removing it
                game.removed.push(p)
                game.location[p] = 0
            }
            array_remove_item(game.attack.pieces, p)
        } else {
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

function get_loss_options(to_satisfy, units) {
    // TODO: Forts
    let reserve_units = get_units_in_reserve()
    let loss_tree = {
        picked: [],
        to_satisfy: to_satisfy,
        full_strength: units.filter((u) => !is_unit_reduced(u)),
        reduced: units.filter((u) => is_unit_reduced(u)),
        full_replacements: reserve_units.filter((u) => !is_unit_reduced(u)),
        reduced_replacements: reserve_units.filter((u) => is_unit_reduced(u)),
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
                full_strength: parent.full_strength.filter((u) => u != unit),
                reduced: [...parent.reduced, unit],
                full_replacements: [...parent.full_replacements],
                reduced_replacements: [...parent.reduced_replacements],
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
            let full_replacements = [...parent.full_replacements]
            let reduced_replacements = [...parent.reduced_replacements]
            let selected_replacement = find_replacement(unit, full_replacements)
            if (selected_replacement != 0) {
                array_remove_item(full_replacements, selected_replacement)
                reduced_replacements.push(selected_replacement)
            } else {
                selected_replacement = find_replacement(unit, reduced_replacements)
                if (selected_replacement != 0) {
                    array_remove_item(reduced_replacements, selected_replacement)
                }
            }

            let node = {
                picked: [...parent.picked, unit],
                to_satisfy: parent.to_satisfy - unit_lf,
                full_strength: [...parent.full_strength],
                reduced: parent.reduced.filter((u) => u != unit),
                full_replacements: full_replacements,
                reduced_replacements: reduced_replacements,
                options: []
            }
            parent.options.push(node)
        }
    }

    // Recurse to continue building options, updating the best options as we go
    for (let i = 0; i < parent.options.length; i++) {
        let current_best = valid_paths.length == 0 ? parent.to_satisfy : valid_paths[0].to_satisfy
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
        if (data.pieces[i].name == "BEF Army") return i
    }
    return 0
}

function find_bef_corps() {
    for (let i = 1; i < data.pieces.length; ++i) {
        if (data.pieces[i].name == "BEF Corps") return i
    }
    return 0
}

function find_replacement(unit, available_replacements) {
    let unit_data = data.pieces[unit]
    if (unit_data.type != ARMY)
        return 0

    if (unit == find_bef_army()) {
        let bef_corps = find_bef_corps()
        if (available_replacements.includes(bef_corps))
            return bef_corps
        else
            return 0
    }

    // British armies cannot be replaced by CND, AUS, or PT corps, so selecting on the name instead of nation
    if (unit_data.nation == BRITAIN) {
        for (let i = 0; i < available_replacements.length; ++i) {
            let replacement_data = data.pieces[available_replacements[i]]
            if (replacement_data.name == "BR Corps") {
                return available_replacements[i]
            }
        }
        return 0
    }

    for (let i = 0; i < available_replacements.length; ++i) {
        let replacement_data = data.pieces[available_replacements[i]]
        if (replacement_data.type == CORPS && replacement_data.nation == unit_data.nation) {
            return available_replacements[i]
        }
    }
    return 0
}

function determine_combat_winner() {
    // TODO: "They shall not pass" is not discarded when losing the combat (12.2.11)
    if (game.attack.defender_losses >= game.attack.attacker_losses) {
        // TODO: Discard defender's combat cards
    }
    if (game.attack.attacker_losses >= game.attack.defender_losses) {
        // TODO: Discard attacker's combat cards
    }

    let attacker_has_full_strength_unit = false
    for (let p in game.attack.pieces) {
        if (!is_unit_reduced(p)) {
            attacker_has_full_strength_unit = true
            break
        }
    }

    let defender_pieces = get_pieces_in_space(game.attack.space)
    if (game.attack.defender_losses > game.attack.attacker_losses && attacker_has_full_strength_unit && defender_pieces.length > 0) {
        game.active = other_faction(game.attack.attacker)
        game.attack.to_retreat = defender_pieces
        game.attack.retreating_pieces = []
        game.state = 'defender_retreat'
        push_undo()
    } else if (defender_pieces.length == 0) {
        game.active = game.attack.attacker
        game.state = 'attacker_advance'
    } else {
        end_attack_activation()
        goto_next_activation()
    }
}

states.defender_retreat = {
    inactive: 'Defender Retreating',
    prompt() {
        view.prompt = `Select unit(s) to retreat`
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
        game.attack.retreat_length = game.attack.defender_losses - game.attack.attacker_losses == 1 ? 1 : 2
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
        if (game.attack.retreat_length == 0) {
            view.prompt = `End retreat?`
        } else {
            if (game.attack.retreat_length > 1) {
                view.prompt = `Choose space to retreat through`
            } else {
                view.prompt = `Choose space to retreat to`
            }

            let options = get_retreat_options()
            options.forEach((s) => {
                gen_action_space(s)
            })
        }
        gen_action_undo()
        if (game.attack.retreat_length == 0) {
            gen_action_done()
        }
    },
    space(s) {
        push_undo()
        game.attack.retreat_length--
        game.attack.retreating_pieces.forEach((p) => {
            game.location[p] = s
        })
        if (game.attack.retreat_length > 0)
            game.attack.first_retreat_space = s
    },
    done() {
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

    get_connected_spaces(s).forEach((conn) => {
        // TODO: check for national restrictions on the connection

        if (conn == game.attack.space)
            return

        if (game.attack.retreat_length == 1 && would_overstack(conn, game.attack.retreating_pieces, game.active))
            return

        if (game.attack.retreat_length == 1 && is_enemy_control(conn, game.active))
            return

        if (is_friendly_control(conn, game.active))
            has_friendly_option = true

        if (is_space_supplied(game.active, conn))
            has_in_supply_option = true

        set_add(options, conn)
    })

    // if any options are friendly controlled, remove all enemy-controlled options
    if (has_friendly_option) {
        options = options.filter((s) => {
            return is_friendly_control(s, game.active)
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
        game.attack.pieces.forEach((p) => {
            if (!is_unit_reduced(p))
                gen_action_piece(p)
        })
        gen_action_next()
    },
    piece(p) {
        if (!game.attack.advancing_units)
            game.attack.advancing_units = []
        if (set_has(game.attack.advancing_units, p))
            set_delete(game.attack.advancing_units, p)
        else
            set_add(game.attack.advancing_units, p)
    },
    next() {
        if (game.attack.advancing_units && game.attack.advancing_units.length > 0)
            game.state = 'perform_advance'
        else {
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
        game.attack.advancing_units.forEach((p) => {
            game.location[p] = s
        })
        set_control(s, game.attack.attacker)
    },
    done() {
        end_attack_activation()
        goto_next_activation()
    }
}



function get_possible_advance_spaces() {
    let spaces = []
    if (game.attack.advancing_units.length == 0)
        return spaces

    let location_of_advancing_units = game.location[game.attack.advancing_units[0]]

    // If advancing units are not in the space where the attack occurred, they can only advance to that space
    if (game.attack.space != location_of_advancing_units) {
        if (has_undestroyed_fort(game.attack.space, other_faction(game.attack.attacker))) {
            // Advance into a fort is only allowed if you have sufficient advancing units to besiege the fort (12.7.6)
            if (could_besiege(game.attack.space, game.attack.advancing_units)) {
                spaces.push(game.attack.space)
            }
        } else {
            spaces.push(game.attack.space)
        }
        return spaces
    }

    let terrain= data.spaces[game.attack.space]
    let terrain_allows_advance = terrain != MOUNTAIN && terrain != SWAMP && terrain != FOREST && terrain != DESERT

    // If the first_retreat_space is not set (retreat was one space), or if the terrain prevents a second advance
    if (!game.attack.first_retreat_space || !terrain_allows_advance)
        return spaces

    // 12.7.7 Central Powers units may advance into Amiens, Calais, or Ostend only if one of the following applies:
    // • if it was the defending space in the Combat.
    // • if the Race to the Sea Event has been played.
    // • if the Central Powers War Status is 4 or higher.
    const cp_restricted_advance = [
        16, // Amiens
        17, // Calais
        18, // Ostend
    ]
    if (game.attack.attacker === CP && cp_restricted_advance.includes(game.attack.first_retreat_space)) {
        if (game.events.race_to_the_sea || game.cp.ws >= 4) {
            spaces.push(game.attack.first_retreat_space) // Don't need to worry about forts here because these spaces do not have forts
        }
        return spaces
    }

    if (has_undestroyed_fort(game.attack.first_retreat_space, other_faction(game.attack.attacker))) {
        // Advance into a fort is only allowed if you have sufficient advancing units to besiege the fort (12.7.6)
        if (could_besiege(game.attack.first_retreat_space, game.attack.advancing_units)) {
            spaces.push(game.attack.first_retreat_space)
        }
    } else {
        spaces.push(game.attack.first_retreat_space)
    }
    return spaces
}

function has_undestroyed_fort(space, faction) {
    let space_data = data.spaces[space]
    return space_data.fort > 0 && space_data.faction == faction && !set_has(game.forts.destroyed, space)
}

function could_besiege(space, units) {
    let retval = false
    let count_corps = 0
    units.forEach((p) => {
        if (data.pieces[p].type == ARMY) {
            retval = true
            return
        } else {
            count_corps++
        }
    })
    if (!retval && count_corps >= data.space[space].fort) {
        retval = true
    }
    return retval
}

const spaces_where_belgian_units_treated_as_british = [
    16, // Amiens
    17, // Calais
    18, // Ostend
    32  // Antwerp
]

function cost_to_activate(space, type) {
    let nations = []
    for_each_piece_in_space(space, (piece) => {
        let n = data.pieces[piece].nation
        if (n === "sn") n = TURKEY
        if (n === MONTENEGRO) n = SERBIA
        set_add(nations, n)
    })
    let cost = nations.length

    if (spaces_where_belgian_units_treated_as_british.includes(space) &&
        nations.includes(BRITAIN) &&
        nations.includes(BELGIUM)) {
        cost--
    }

    if ((data.spaces[space].nation == GERMANY || data.spaces[space].nation == FRANCE) &&
        nations.includes(FRANCE) &&
        nations.includes(US)) {
        cost--
    }

    // TODO: Sud Army and 11th Army events modify the activation cost

    // TODO: After Fall of the Tsar, spaces with Russian units cost 1 per unit for combat only

    // TODO: Cost for activating the MEF army activating supply through the MEF beachhead

    return cost;
}

function goto_attrition_phase() {
    game.attrition = {
        ap: [],
        cp: []
    }
    // TODO: Calculate the OOS units for both sides and save the lists in the game state

    // TODO: Turkish units in Medina are always in supply for attrition purposes only (may not activate, SR, take
    //  replacements, or use combat cards)

    // TODO: Update control of spaces and save in the game state
    // Spaces may use any of their side's supply sources when checking attrition

    if (game.attrition.ap.length > 0) {
        game.state = 'attrition_phase'
        game.active = AP
    } else if (game.attrition.cp.length > 0) {
        game.state = 'attrition_phase'
        game.active = CP
    } else {
        goto_siege_phase()
    }
}

states.attrition_phase = {
    inactive: 'Remove OOS units',
    prompt() {
        view.prompt = 'Remove OOS units'

        game.attrition[game.active].forEach((p) => { gen_action_piece(p) })

        if (game.attrition[game.active].length == 0)
            gen_action_done()
    },
    piece(p) {
        array_remove(game.attrition[game.active], p)
        // TODO: Eliminate selected piece, permanently for armies, to replaceable box for corps
    },
    done() {
        if (game.active == AP && game.attrition.cp.length > 0) {
            game.active == CP
        } else {
            goto_siege_phase()
        }
    }
}

function goto_siege_phase() {
    game.siege = {
        ap: [],
        cp: []
    }
    // TODO: Determine which spaces need siege rolls

    if (game.siege.ap.length > 0 || game.siege.cp.length > 0) {
        game.state = 'siege_roll'
        if (game.siege[game.active].length == 0)
            game.active = other_faction(game.active)
    } else {
        goto_war_status_phase()
    }
}

states.siege_roll = {
    inactive: 'Roll sieges',
    prompt() {
        view.prompt = 'Roll sieges'

        game.siege[game.active].forEach((s) => { gen_action_space(s) })

        if (game.siege[game.active].length == 0)
            gen_action_done()
    },
    space(p) {
        array_remove(game.siege[game.active], s)
        // TODO: Roll for siege in space
    },
    done() {
        let other = other_faction(game.active)
        if (game.siege[other].length > 0) {
            game.active == other
        } else {
            goto_war_status_phase()
        }
    }
}

function goto_war_status_phase() {
    // E. War Status Phase
    log_h1("War Status Phase")

    // E.1. Check the Victory Point table and make any changes called for under the “During the War Status Phase”
    // section of the table.
    // If blockade event active and it's a winter turn, -1 VP
    if (game.events.blockade == 1 && game.turn % 4 == 0) {
        game.vp -= 1
        log_h2("Blockade event in effect during winter turn, -1 VP")
    }
    // If CP failed to conduct their mandated offensive, -1 VP
    if (game.cp.mo != NONE) {
        game.vp -= 1
        log_h2(`${faction_name(CP)} failed to conduct their mandated offensive, -1 VP`)
    }
    // If Italy is still neutral but AP at Total War, +1 VP
    if (!nation_at_war(ITALY) && game.ap.commitment == COMMITMENT_TOTAL) {
        game.vp += 1
        log_h2(`${nation_name(ITALY)} is still neutral but ${faction_name(AP)} at Total War, +1 VP`)
    }
    // If AP failed to conduct their mandated offensive, +1 VP (except FR after French Mutiny event)
    if (game.ap.mo != NONE && !(game.ap.mo == FRANCE && game.events.french_mutiny)) {
        game.vp += 1
        log_h2(`${faction_name(AP)} failed to conduct their mandated offensive, +1 VP`)
    }
    // TODO: If French unit attacked without US support after French Mutiny, when FR MO, +1 VP

    // E.2. Determine if either player has won an Automatic Victory.
    if (game.vp == 0) {
        goto_game_over(AP, get_result_message("Automatic Victory: ", AP))
        return
    }
    if (game.vp == 20) {
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
    if (game.turn != 1) {
        if (game.ap.ws >= 4 && game.ap.commitment == COMMITMENT_MOBILIZATION) {
            game.ap.commitment = COMMITMENT_LIMITED
            log_h2("Allied Powers' War Commitment Level rises to Limited War")
            add_cards_to_deck(AP, COMMITMENT_LIMITED, game.ap.deck)
            game.ap.shuffle = true
        }
        if (game.cp.ws >= 4 && game.cp.commitment == COMMITMENT_MOBILIZATION) {
            game.cp.commitment = COMMITMENT_LIMITED
            log_h2("Central Powers' War Commitment Level rises to Limited War")
            add_cards_to_deck(CP, COMMITMENT_LIMITED, game.cp.deck)
            game.cp.shuffle = true
            set_nation_at_war(TURKEY)
        }
        if (game.ap.ws >= 11 && game.ap.commitment == COMMITMENT_LIMITED) {
            game.ap.commitment = COMMITMENT_TOTAL
            log_h2("Allied Powers' War Commitment Level rises to Total War")
            add_cards_to_deck(AP, COMMITMENT_TOTAL, game.ap.deck)
            game.ap.shuffle = true
        }
        if (game.cp.ws >= 11 && game.cp.commitment == COMMITMENT_LIMITED) {
            game.cp.commitment = COMMITMENT_TOTAL
            log_h2("Central Powers' War Commitment Level rises to Total War")
            add_cards_to_deck(CP, COMMITMENT_TOTAL, game.cp.deck)
            game.cp.shuffle = true
        }
    }

    goto_replacement_phase()
}

function get_game_result_by_vp() {
    // TODO: Other scenarios may have different VP counts
    let cp_threshold = game.events.brest_litovsk == 1 ? 11 : 13
    let ap_threshold = 9
    if (game.vp >= cp_threshold) {
        return CP
    } else if (game.scenario == HISTORICAL || game.vp <= ap_threshold) {
        return AP
    } else {
        return DRAW
    }
}

function get_result_message(prefix, result) {
    if (result == AP)
        return `${prefix}Allied Powers win`
    if (result == CP)
        return `${prefix}Central Powers win`
    if (result == DRAW)
        return `${prefix}Game ends in a draw`
    return `${prefix}Game result unknown`
}

function add_cards_to_deck(faction, commitment, deck) {
    for (let i = 1; i < data.cards.length; i++) {
        if (data.cards[i].commitment == commitment && data.cards[i].faction == faction) {
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
    } else if (has_rps(CP)) {
        log_h1(`${faction_name(CP)} Replacement Phase`)
        game.active = CP
        game.state = 'replacement_phase'
    } else {
        goto_draw_cards_phase()
    }
}

function has_rps(faction) {
    if (faction == AP) {
        if (game.rp.fr > 0) return true
        if (game.rp.br > 0) return true
        if (game.rp.ru > 0) return true
        if (game.rp.allied > 0) return true
        if (game.rp.it > 0) return true
    } else if (faction == CP) {
        if (game.rp.ge > 0) return true
        if (game.rp.ah > 0) return true
        if (game.rp.bu > 0) return true
        if (game.rp.tu > 0) return true
    }
    return false
}

function remove_rps(faction) {
    if (faction == AP) {
        game.rp.fr = 0
        game.rp.br = 0
        game.rp.ru = 0
        game.rp.allied = 0
        game.rp.it = 0
    } else if (faction == CP) {
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
        if (piece_data.type == ARMY) {
            if (game.location[p] == AP_ELIMINATED_BOX || game.location[p] == CP_ELIMINATED_BOX) {
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
        if (game.active == AP) {
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
        if (get_rps_of_type(rp_type) == 0)
            continue

        if (game.location[i] === 0 || game.location == AP_RESERVE_BOX || game.location == CP_RESERVE_BOX)
            continue

        if (game.location[i] == AP_ELIMINATED_BOX ||
            game.location[i] == CP_ELIMINATED_BOX ||
            is_unit_reduced(i)) {
            // TODO: check for valid supply path if on map
            // TODO: check for capital control
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
        const elim_box = game.active == AP ? AP_ELIMINATED_BOX : CP_ELIMINATED_BOX
        const rp_type = get_rp_type(game.who)
        units.forEach((p) => {
            if (data.pieces[p].type == CORPS &&
                get_rp_type(p) == rp_type) {
                gen_action_piece(p)
            }
        })
        if (game.location[game.who] === elim_box) {
            if (game.who == BRITISH_ANA_CORPS)
                gen_action_space(ARABIA_SPACE)
            else
                gen_action_space(game.active == AP ? AP_RESERVE_BOX : CP_RESERVE_BOX)
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
                const space = corps === BRITISH_ANA_CORPS ? ARABIA_SPACE : game.active == AP ? AP_RESERVE_BOX : CP_RESERVE_BOX
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
    let spaces = get_available_reinforcement_spaces(p)
    // TODO: May need to modify this list based on the exceptions from 17.1.5:
    //  Serbian Army units may be recreated at Salonika if the Salonika or Greece Neutral Entry Event Cards have been
    //  played and Salonika is under Allied control. They may also be recreated in Belgrade following normal
    //  reinforcement restrictions.
    //  The Belgian Army may be rebuilt in Brussels, Antwerp, or Ostend. The Belgian Army may not be built in Antwerp
    //  if a line of supply does not exist. If none of these spaces are Allied controlled and in supply, the Belgian
    //  Army may be rebuilt in Calais. (Calais also represents the corner of Belgium held by the Allies after October
    //  1914.)
    return spaces

}

function goto_draw_cards_phase() {
    game.state = 'draw_cards_phase'
    game.active = AP
}

states.draw_cards_phase = {
    inactive: 'Discarding combat cards',
    prompt() {
        view.prompt = 'Discard any Combat Cards you wish before drawing new cards'
        // TODO: Highlight cards that can be discarded, including combat cards and the Italy and Romania cards under certain circumstances
        gen_action_done()
    },
    // TODO: discard a card
    done() {
        if (game.active == AP) {
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

function get_connected_spaces(s, nation) {
    if (nation !== undefined) {
        // TODO: account for nation-specific connections
    }
    if (data.spaces[s].connections)
        return data.spaces[s].connections
    return []
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

function generate_supply_cache(faction, cache, sources, use_ports) {
    let blocked_spaces = []
    let friendly_ports = []

    // Block spaces containing an enemy unit
    for (let p = 1; p < data.pieces.length; ++p) {
        if (game.location[p] != 0 && data.pieces[p].faction != faction) {
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
        if (is_enemy_control(s, faction) && !set_has(game.forts.besieged, s)) {
            set_add(blocked_spaces, s)
        } else if (use_ports) {
            // If this type of supply can use ports, build a set of friendly port spaces
            if (faction == AP && data.spaces[s].apport) {
                set_add(friendly_ports, s)
            } else if (faction == CP && data.spaces[s].cpport) {
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
                // TODO: account for nation-specific connections
                get_connected_spaces(current).forEach((conn) => {
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
}

const cp_supply_sources = [ESSEN, BRESLAU, SOFIA, CONSTANTINOPLE]
// AP supply sources depend on nationality. Russian, Serbian, and Romanian units are supplied from the eastern supply
// sources, all other AP units from the western supply source.
const eastern_supply_sources = [PETROGRAD, MOSCOW, KHARKOV, CAUCASUS, BELGRADE]
const western_supply_sources = [LONDON]

function search_supply() {
    supply_cache = {}
    supply_cache.cp = {}
    supply_cache.eastern = {}
    supply_cache.western = {}
    supply_cache.salonika = {}
    for (let s = 0; s < data.spaces.length; ++s) {
        supply_cache.cp[s] = { sources: [] }
        supply_cache.eastern[s] = { sources: [] }
        supply_cache.western[s] = { sources: [] }
        supply_cache.salonika[s] = { sources: [] }
    }
    generate_supply_cache(CP, supply_cache.cp, cp_supply_sources, true)
    generate_supply_cache(AP, supply_cache.eastern, eastern_supply_sources, false)
    generate_supply_cache(AP, supply_cache.western, western_supply_sources, true)
    if (is_friendly_control(SALONIKA, AP))
        generate_supply_cache(AP, supply_cache.salonika, [SALONIKA], false) // Separate cache for Serbian units only
}

function is_unit_supplied(p) {
    let faction = data.pieces[p].faction
    let nation = data.pieces[p].nation
    let location = game.location[p]
    if (location == 0)
        return true

    if (!supply_cache) search_supply()
    let cache = (faction == CP) ? supply_cache.cp : supply_cache.western
    if (nation == RUSSIA || nation == SERBIA || nation == ROMANIA) {
        cache = supply_cache.eastern
    }

    if (nation == SERBIA) {
        if (data.spaces[location].nation == SERBIA)
            return true // Serbian units are always in supply in Serbia
        else if (is_friendly_control(SALONIKA, AP), supply_cache.salonika[location].sources.length > 0)
            return true // Serbian units can trace supply to Salonika if it is friendly controlled
    }

    if (data.pieces[p].name == "ANA Corps" && data.spaces[location].map == "neareast")
        return true

    if (nation == MONTENEGRO)
        return true

    if (nation == "sn" && data.spaces[location].map == "neareast")
        return true

    if (cache[location].sources.length > 0)
        return true

    return false
}

function is_space_supplied(faction, s) {
    if (!supply_cache) search_supply()
    if (faction == CP) {
        return supply_cache.cp[s].sources.length > 0
    } else {
        return supply_cache.eastern[s].sources.length > 0 || supply_cache.western[s].sources.length > 0
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
        if (game.location[p] != 0 && game.location[p] < AP_RESERVE_BOX && !is_unit_supplied(p)) {
            oos_pieces.push(p)
        }
    }
    return oos_pieces
}

// === CARD EVENTS ===

// CP #1
events.guns_of_august = {
    can_play() {
        return (game.turn == 1 && game.cp.actions.length == 0)
    },
    play() {
        push_undo()

        set_add(game.forts.destroyed, LIEGE)

        game.location[GE_1_ARMY] = LIEGE
        game.location[GE_2_ARMY] = LIEGE
        game.activated.attack.push(LIEGE)
        game.activated.attack.push(KOBLENZ)
        set_control(LIEGE, CP)
        game.events.guns_of_august = true

        start_action_round()
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

// === ALLIED POWER EVENTS ===

// AP #2
events.blockade = {
    can_play() {
        return true
    },
    play() {
        push_undo()
        game.events.blockade = 1
        // TODO: Add blockade marker to the Turn Track
        goto_end_action()
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
