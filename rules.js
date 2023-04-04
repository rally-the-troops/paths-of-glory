"use strict"

const data = require("./data")

let game, view

let states = {}

const AP = "AP"
const CP = "CP"

exports.scenarios = [ "Standard", "Historical" ]

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
        game.result = (current === AP ? CP : AP)
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

function inactive_prompt(name, who, where) {
    view.prompt = `Waiting for ${game.active} \u2014 ${name}...`
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
        last_card: game.last_card,
        ap: {
            deck: game.ap.deck.length,
            hand: game.ap.hand.length,
            mo: game.ap.mo
        },
        cp: {
            deck: game.cp.deck.length,
            hand: game.cp.hand.length,
            mo: game.cp.mo
        },
        location: game.location,
        reduced: game.reduced
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
    game = {
        seed: seed,
        scenario: scenario,
        log: [],
        undo: [],
        active: null,
        state: null,
        turn: 1,
        vp: 0,
        last_card: 0,

        // Units
        location: data.pieces.map(() => 0),
        reduced: [],

        // AP state
        ap: {
            deck: [],
            discard: [],
            removed: [],
            hand: [],
            mo: 'none'
        },

        // CP state
        cp: {
            deck: [],
            discard: [],
            removed: [],
            hand: [],
            mo: 'none'
        }
    }

    log_h1("Paths of Glory")

    // TODO: Do real scenario setup and remove this
    setup_piece('ge', '1 Army', 'Berlin')
    setup_piece('ge', '2 Army', 'Sedan')
    setup_piece('fr', '1 Army', 'Paris')
    setup_piece('fr', '2 Army', 'Cambrai')
    setup_piece('fr', 'FR Corps', 'Milan')
    setup_piece('ge', 'GE Corps', 'Milan')
    setup_piece('fr', 'FR Corps', 'Rome')
    setup_piece('fr', 'FR Corps', 'Rome')
    setup_piece('fr', 'FR Corps', 'Rome')
    setup_piece('fr', 'FR Corps', 'Salonika')

    log_h1(scenario)

    // TODO: Options and other setup

    deal_cards()

    start_turn()

    return game
}

function start_turn() {
    // TODO: Roll mandatory offensives

    // TODO: Start action phase
    game.state = 'action_phase'
    game.active = CP
}

function deal_cards() {
    // TODO
}

function end_turn() {
    deal_cards()

    // TODO: Check for end of game
}

function setup_piece(nation, unit, space) {
    let where = find_space(space)
    let who = find_unused_piece(nation, unit)
    game.location[who] = where
}

function find_unused_piece(nation, name) {
    for (let i = 0; i < data.pieces.length; i++) {
        let piece = data.pieces[i]
        if (piece.name === name && piece.nation === nation && game.location[i] == 0) {
            return i
        }
    }
    throw new Error(`Could not find unused piece for nation ${nation} and name ${name}`)
}

function find_space(name) {
    for (let i = 0; i < data.spaces.length; i++) {
        if (data.spaces[i].name === name) {
            return i
        }
    }
    throw new Error(`Could not find space named ${name}`)
}

// === GAME STATES ===

//states.etc = {
//  inactive: "some text",
//  prompt() {
//
//  },
//  example_action() {
//
//  },
//  a_different_action() {
//
//  },
//}

states.action_phase = {
    inactive: "Action Phase",
    prompt() {
        view.prompt = "Action Phase: Play a card"
    },
}

function roll_mandated_offensives() {
    game.ap.mo = 'AP MO' // TODO
    game.cp.mo = 'CP MO' // TODO
}

function gen_action_next() {
    gen_action('next')
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
