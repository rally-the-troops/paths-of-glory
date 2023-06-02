"use strict"

const data = require("./data")
const {cards} = require("./data");

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

const COMMITMENT_MOBILIZATION = "mobilization"
const COMMITMENT_LIMITED = "limited"
const COMMITMENT_TOTAL = "total"

// Card indices
const GUNS_OF_AUGUST = 66

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
        usc: game.usc,
        rc: game.rc,
        last_card: game.last_card,
        activated: game.activated,
        move: game.move,
        combat: game.combat,
        ap: {
            deck: game.ap.deck.length,
            hand: game.ap.hand.length,
            commitment: game.ap.commitment,
            mo: game.ap.mo,
            ws: game.ap.ws
        },
        cp: {
            deck: game.cp.deck.length,
            hand: game.cp.hand.length,
            commitment: game.cp.commitment,
            mo: game.cp.mo,
            ws: game.cp.ws
        },
        location: game.location,
        reduced: game.reduced,
        control: game.control,
        events: game.events
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

    game = {
        seed: seed,
        scenario: scenario,
        options: options,
        log: [],
        undo: [],
        active: null,
        phasing: null,
        state: null,
        turn: 1,
        vp: 10,
        usc: 0, // US commitment level
        rc: 0, // Russian capitulation level
        ops: 0,
        events: {},

        // Units
        location: data.pieces.map(() => 0),
        reduced: [],

        // Spaces
        activated: {
            move: [],
            attack: []
        },
        control: data.spaces.map((s) => s.faction === CP ? 1 : 0),

        // AP state
        ap: {
            deck: [],
            discard: [],
            removed: [],
            hand: [],
            commitment: COMMITMENT_MOBILIZATION,
            mo: NONE,
            ws: 0
        },

        // CP state
        cp: {
            deck: [],
            discard: [],
            removed: [],
            hand: [],
            commitment: COMMITMENT_MOBILIZATION,
            mo: NONE,
            ws: 0
        },
    }

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
    setup_piece('br', 'BEF', 'Brussels')

    log_h1(scenario)

    if (game.scenario == HISTORICAL) {
        game.options.hand_size = 8
        game.options.start_with_guns_of_august = 1
    } else {
        game.options.hand_size = 7
    }

    setup_initial_decks()

    start_turn()

    return game
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
    deal_cards()
}

function start_turn() {
    roll_mandated_offensives()

    game.state = 'action_phase'
    game.active = CP
    game.phasing = CP
    log_br()
    log_h2(`${game.active}`)
    log_br()
}

function deal_cards() {
    while (game.ap.hand.length < game.options.hand_size) {
        game.ap.hand.push(draw_card(game.ap.deck))
    }
    while (game.cp.hand.length < game.options.hand_size) {
        game.cp.hand.push(draw_card(game.cp.deck))
    }
}

function draw_card(deck) {
    if (deck.length == 0) {
        reshuffle_discard(deck)
    }
    let i = random(deck.length)
    let c = deck[i]
    deck.splice(i, 1)
    return c
}

function discard_card(card, reason) {
    let active_player = get_active_player()

    if (reason)
        log(`${game.active} discarded\n${card_name(card)}\n${reason}.`)
    else
        log(`${game.active} discarded\n${card_name(card)}.`)

    array_remove_item(active_player.hand, card)
    game.last_card = card
    active_player.discard.push(card)
}

function reshuffle_discard(deck) {
    let player

    if (deck == game.ap.deck) {
        player = game.ap
        game.log.push("Allied Powers deck reshuffled")
    } else if (deck == game.cp.deck) {
        player = game.cp
        game.log.push("Central Powers deck reshuffled")
    } else {
        throw new Error(`Attempt to reshuffle a deck that is not the ap or cp deck`)
    }

    game.last_card = 0
    player.deck = player.deck.concat(player.discard)
    player.discard = []
}

function end_turn() {
    deal_cards()

    // TODO: Check for end of game
}

function setup_piece(nation, unit, space, reduced) {
    let where = find_space(space)
    let who = find_unused_piece(nation, unit)
    game.location[who] = where
    if (reduced) {
        game.reduced.push(who)
    }
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
    // TODO
    return true
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
    while (!nation_eligible_for_mo(ap_mo) && ap_index < 7) {
        ap_index++
        ap_mo = AP_MO_TABLE[ap_index]
    }

    if (ap_mo == RUSSIA && game.events.bolshevik_revolution) {
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
    while (!nation_eligible_for_mo(cp_mo) && cp_index < 6) {
        cp_index++
        cp_mo = CP_MO_TABLE[cp_index]
    }

    if (cp_mo == AH_IT && !nation_at_war(ITALY)) {
        cp_mo = AUSTRIA_HUNGARY
    }

    if (cp_mo == GERMANY && game.events.h_l_take_command) {
        cp_mo = NONE
    }

    log_h2(`AP rolled ${ap_roll} resulting in a mandated offensive for ${ap_mo}`)
    log_h2(`CP rolled ${cp_roll} resulting in a mandated offensive for ${cp_mo}`)

    game.ap.mo = ap_mo
    game.cp.mo = cp_mo
}

function nation_eligible_for_mo(nation) {
    if (nation == NONE) return true
    if (nation == AH_IT) nation = AUSTRIA_HUNGARY

    // TODO: If the nation's capital(s) is/are captured, it is not eligible
    // TODO: If French Mutiny event has been played, France is not eligible
    return true
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

function get_piece_mf(p) {
    return game.reduced.includes(p) ? data.pieces[p].rmf : data.pieces[p].mf
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

function play_card(card) {
    log(`${game.active} played\n${card_name(card)}.`)
    let active_player = get_active_player()
    array_remove_item(active_player.hand, card)
    game.last_card = card
    // TODO: Deal with combat cards?
    if (cards[card].remove)
        active_player.removed.push(card)
    else
        active_player.discard.push(card)
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
        view.prompt = "Action Phase: Play a card or choose an action."
        let p = get_active_player()
        for (let i = 0; i < p.hand.length; ++i)
            gen_card_menu(p.hand[i])
        if (game.options.can_offer_peace) // TODO: Check for appropriate conditions?
            gen_action('offer_peace')
        gen_action('single_op')
    },
    play_event(card) {
        log_br()
        play_card(card)
        events[data.cards[card].event].play()
    },
    play_ops(card) {
        log_br()
        goto_play_ops(card)
    },
    play_sr(card) {
        log_br()
        goto_play_sr(card)
    },
    play_rps(card) {
        log_br()
        goto_play_rps(card)
    },
    offer_peace() {
        log_br()
        goto_offer_peace()
    },
    single_op() {
        log_br()
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
    let evt = events[data.cards[card].event]
    return (evt !== undefined && evt.can_play())
}

function can_play_sr(card) {
    // TODO: Check if previous card was used for SR
    return true
}

function can_play_rps(card) {
    // TODO: Check if previous card was used for RPs
    return true
}

function goto_play_ops(card) {
    if (card === undefined) {
        game.ops = 1
    } else {
        discard_card(card, 'for ops')
        game.ops = data.cards[card].ops
    }
    game.state = 'activate_spaces'
}

function goto_play_sr(card) {
    // TODO
}

function goto_play_rps(card) {
    // TODO
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
        game.ops = 0
        goto_next_activation()
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

function end_move_activation() {
    array_remove_item(game.activated.move, game.move.initial)
    game.move = null
}

function goto_next_activation() {
    if (game.activated.move.length > 0) {
        start_move_activation()
    } else if (game.activated.attack.length > 0) {
        game.state = 'choose_attack_space'
    } else {
        goto_end_activations()
    }
}

function goto_end_activations() {
    // TODO: This should go to the attrition phase
    game.active = game.active === CP ? AP : CP
    game.state = 'action_phase'
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
        view.prompt = `Choose the units to move from ${data.spaces[game.move.initial].name}`

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
            let space = data.spaces[game.move.current]
            space.connections.forEach((conn) => {
                if (can_move_to(conn))
                    gen_action_space(conn)
            })
        }

        game.move.pieces.forEach((p) => {
            if (can_drop_piece(p, game.move.current))
                gen_action_piece(p)
        })

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
        set_control(s, game.active)
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
    game.control[s] = faction === CP ? 1 : 0
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

function can_drop_piece(p, s) {
    // TODO: Determine if it's legal to drop units here
    return true
}

function can_end_move(s) {
    // TODO: Determine if it's legal to end the move here

    // Units may move through but not end their movement in a space containing an Attack marker.

    // Amiens, Calais & Ostend: Until either the Race to the Sea Event Card is played or the CP War Status is 4 or
    // higher, Central Powers units may neither end their move nor SR into Amiens, Calais, or Ostend, except as a
    // result of advance after combat. However they may move through and place control markers on these spaces.

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

// === CARD EVENTS ===

events.guns_of_august = {
    can_play() {
        // TODO: Check if it's the first action of the first turn
        return true
    },
    play() {
        const LIEGE = 33
        const KOBLENZ = 41
        const GE_1_ARMY = 1
        const GE_2_ARMY = 2

        push_undo()

        // TODO: Destroy the Liege fort
        // TODO: Update war status?

        game.location[GE_1_ARMY] = LIEGE
        game.location[GE_2_ARMY] = LIEGE
        game.activated.attack.push(LIEGE)
        game.activated.attack.push(KOBLENZ)

        goto_next_activation()
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
