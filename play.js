"use strict"

/* globals data layout */

const { cards, spaces, pieces } = data

const map_space_count = 282

const DEBUG_SPACES = false
const DEBUG_CONNECTIONS = false

const AP = "ap"
const CP = "cp"

const ARMY = "army"
const CORPS = "corps"

const AP_MO_MARKER = "marker ap mandatory_offensive "
const CP_MO_MARKER = "marker cp mandatory_offensive "

const AP_RESERVE_BOX = 282
const PERM_ELIMINATED_BOX = 360
const CP_RESERVE_BOX = 283
const AP_ELIMINATED_BOX = 284
const CP_ELIMINATED_BOX = 285
const AP_PER_ELIMINATED_BOX = 'ap perm elim'
const CP_PER_ELIMINATED_BOX = 'cp perm elim'

const ITALY = 'it'
const BRITAIN = 'br'
const FRANCE = 'fr'
const RUSSIA = 'ru'
const GERMANY = 'ge'
const AUSTRIA_HUNGARY = 'ah'
const TURKEY = 'tu'
const MINOR = 'minor'
const BULGARIA = 'bu'
const ROMANIA = 'ro'
const GREECE = 'gr'

//event status
const NON_PLAYED = 'non_played'
const DISABLED = 'disabled'
const REMOVED = 'removed'

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

const CZECH_CORPS = data.utils.find_n_pieces('ru', 'RU Czlc', 1)[0]
const RUS_CAV_CORPS = data.utils.find_n_pieces('ru', 'RU CAVc', 1)[0]
const PL_CORPS = data.utils.find_n_pieces('ge', 'PLc', 1)[0]

let options = {}

function check_menu(id, x) {
    document.getElementById(id).className = x ? "menu_item checked" : "menu_item unchecked"
}

const HIGHEST_AP_CARD = 65

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


function array_insert_pair(array, index, key, value) {
    for (var i = array.length; i > index; i -= 2) {
        array[i] = array[i-2]
        array[i+1] = array[i-1]
    }
    array[index] = key
    array[index+1] = value
}

// LAYOUT AND STYLE OPTIONS

let style = "bevel"
let mouse_focus = 0

function set_style(x) {
    style = x
    window.localStorage[params.title_id + "/style"] = x
    check_menu("style_bevel", style === "bevel")
    check_menu("style_flat", style === "flat")
    let body = document.querySelector("body")
    body.classList.toggle("bevel", style === "bevel")
    body.classList.toggle("flat", style === "flat")
    if (view)
        update_map()
}

function set_mouse_focus(x) {
    if (x === undefined)
        mouse_focus = 1 - mouse_focus
    else
        mouse_focus = x
    window.localStorage[params.title_id + "/mouse_focus"] = mouse_focus
    check_menu("mouse_focus", mouse_focus === 1)
}

set_style(window.localStorage[params.title_id + "/style"] || "bevel")
set_mouse_focus(window.localStorage[params.title_id + "/mouse_focus"] | 0)

let focus = null
let focus_box = document.getElementById("focus")

const SINAI = spaces.find(s => s.name === "Sinai").id

// SUPPLY LINE DISPLAY

let showing_supply = false

function show_ap_supply(supply) {
    if (showing_supply)
        hide_supply()
    showing_supply = true
    for (let s = 1; s < map_space_count; ++s) {
        const western = supply.western[s] > 0
        const eastern = supply.eastern[s] > 0
        spaces[s].element.classList.toggle("western_supply", western)
        spaces[s].element.classList.toggle("eastern_supply", eastern)
        spaces[s].element.classList.toggle("no_supply", !western && !eastern)
    }
}

function show_cp_supply(supply) {
    if (showing_supply)
        hide_supply()
    showing_supply = true
    for (let s = 1; s < map_space_count; ++s) {
        const cp = supply.spaces[s] > 0
        spaces[s].element.classList.toggle("cp_supply", cp)
        spaces[s].element.classList.toggle("no_supply", !cp)
    }
}

function hide_supply() {
    if (showing_supply) {
        showing_supply = false
        for (let s = 1; s < map_space_count; ++s) {
            spaces[s].element.classList.remove("western_supply")
            spaces[s].element.classList.remove("eastern_supply")
            spaces[s].element.classList.remove("cp_supply")
            spaces[s].element.classList.remove("no_supply")
        }
        for (let p = 1; p < pieces.length; ++p) {
            pieces[p].element.classList.remove("oos")
        }
    }
}

function on_init(scenario, game_options, static_view){
    options=game_options
    for (let c = 1; c < cards.length; ++c) {
        build_card(c)
    }
    show_reinforcements()
}

function card_class_name(card_number) {
    let faction = card_number > HIGHEST_AP_CARD ? "cp" : "ap"
    let faction_card_number = card_number > HIGHEST_AP_CARD ? card_number - HIGHEST_AP_CARD : card_number
    let suffix = (options.valiant &&  [27, 48, 62, 130].includes(card_number))?'_v':''
    return `card_${faction}_${faction_card_number}${suffix}`
}

function on_click_card_tip(c) {
    scroll_into_view(cards[c].element)
}

function on_focus_card_tip(card_number) {
    document.getElementById("tooltip").className = `card ${card_class_name(card_number)}`
    document.getElementById("tooltip").hidden = false
}

function on_blur_card_tip() {
    document.getElementById("tooltip").hidden = true
}

function on_focus_piece_tip(p) {
    pieces[p].element.classList.add("tip")
}

function on_blur_piece_tip(p) {
    pieces[p].element.classList.remove("tip")
}

function on_click_piece_tip(p) {
    pieces[p].element.scrollIntoView({ block:"center", inline:"center", behavior:"smooth" })
    attract(pieces[p].element)
}

function on_focus_space_tip(s) {
    ui.space_list[s].classList.add("tip")
}

function on_blur_space_tip(s) {
    ui.space_list[s].classList.remove("tip")
}

function on_click_space_tip(s) {
    scroll_into_view(ui.space_list[s])
    attract(ui.space_list[s])
}

function attract(elt) {
    elt.classList.add("attract")
    window.setTimeout(() => elt.classList.remove("attract"), 1000)
}

function sub_space_name(match, p1, offset, string) {
    let s = p1 | 0
    let n = spaces[s].name
    return `<span class="spacetip" onmouseenter="on_focus_space_tip(${s})" onmouseleave="on_blur_space_tip(${s})" onclick="on_click_space_tip(${s})">${n}</span>`
}

function sub_card_name(match, p1, offset, string) {
    let c = p1 | 0
    let card = cards[c]
    if (card) {
        return `<span class="cardtip ${c <= HIGHEST_AP_CARD ? "ap-card" : "cp-card"}" onmouseenter="on_focus_card_tip(${c})" onmouseleave="on_blur_card_tip()" onclick="on_click_card_tip(${c})">${card.name}</span>`
    } else {
        return `Unknown Card`
    }
}

function sub_piece_name(match, p1, offset, string) {
    let p = p1 | 0
    let piece = pieces[p]
    if (piece) {
        return `<span class="piecetip ${piece.faction + "-unit"}" onmouseenter="on_focus_piece_tip(${p})" onmouseleave="on_blur_piece_tip(${p})" onclick="on_click_piece_tip(${p})">${piece.name}</span>`
    } else {
        return `Unknown Piece`
    }
}

function sub_piece_name_reduced(match, p1, offset, string) {
    let p = p1 | 0
    let piece = pieces[p]
    if (piece) {
        return `<span class="piecetip ${piece.faction + "-unit"}" onmouseenter="on_focus_piece_tip(${p})" onmouseleave="on_blur_piece_tip(${p})" onclick="on_click_piece_tip(${p})">(${piece.name})</span>`
    } else {
        return `Unknown Piece`
    }
}

function show_card_list(id, card_lists) {
    show_dialog(id, (body) => {
        let dl = document.createElement("dl")
        let append_header = (text) => {
            let header = document.createElement("dt")
            header.textContent = text
            dl.appendChild(header)
        }
        let append_card = (c) => {
            let p = document.createElement("dd")
            p.className = "cardtip"
            p.className = (c <= HIGHEST_AP_CARD) ? "cardtip ap-card" : "cardtip cp-card"
            p.onmouseenter = () => on_focus_card_tip(c)
            p.onmouseleave = on_blur_card_tip
            p.innerHTML = format_card_info(c)
            dl.appendChild(p)
        }

        append_header(`Discarded Cards (${card_lists.discard.length})`)
        card_lists.discard.forEach(append_card)
        append_header(`Removed from Play (${card_lists.removed.length})`)
        card_lists.removed.forEach(append_card)
        append_header(`In Hand or Deck (${card_lists.deck.length})`)
        card_lists.deck.forEach(append_card)
        body.appendChild(dl)
    })
}

function build_perm_elim_box(){
    let ap_space = spaces[360]
    let cp_space = spaces[361]

    ap_space.elements=[]
    ap_space.stacks={}
    cp_space.stacks={}
}

//get perm eliminated units from space 0, could be removed if all affected pieces placed at space №360
function get_perm_eliminated() {
    let result=[]
    let not_placed_pieces = []
    let war_africa = (view.removed_cards && view.removed_cards[CP].indexOf(97) >= 0)//war in africa
    let unplaced_br_corps = 0
    let off_map_br_corps = 0
    let br_corp_num = 0
    for (let i = 1; i < data.cards.length; i++) {
        let card_data = data.cards[i]
        if (card_data.reinf_pieces) {
            card_data.reinf_pieces.forEach(p => {
                let p_data = data.pieces[p]
                if (p_data.type === "army" || p_data.notreplaceable) {
                    not_placed_pieces.push(p)
                } else if (war_africa && p_data.name === "BRc") {
                    unplaced_br_corps++
                    br_corp_num = i
                }
            })
        }
    }
    for (let i = 1; i < data.pieces.length; i++) {
        let p_data = data.pieces[i]
        if (view.location[i] === 0 && (p_data.type === "army" || p_data.notreplaceable) && not_placed_pieces.indexOf(i) < 0) {
            result.push(i)
        } else if (view.location[i] === 0 && war_africa && p_data.name === "BRc") {
            off_map_br_corps++
        }
    }
    if (war_africa && off_map_br_corps > unplaced_br_corps) {
        result.push(br_corp_num)
    }
    return result
}

function update_perm_elim_box() {
    let ap_space = spaces[360].stacks
    let cp_space = spaces[361].stacks
    spaces[PERM_ELIMINATED_BOX].elements.forEach(e => {
        e.classList.add("offmap")
        e.my_stack.length = 0
    })
    let insert_piece_in_stack = function (p) {
        if (p <= 0) {
            return
        }
        const space = pieces[p].faction === CP ? cp_space : ap_space
        let is_corps = pieces[p].type === CORPS
        let pe = spaces[PERM_ELIMINATED_BOX].elements[p]
        if (!pe) {
            pe = spaces[PERM_ELIMINATED_BOX].elements[p] = build_unit(p, document.getElementById("reinforcements"))
        }
        const stack_name = pieces[p].nation + (pieces[p].notreplaceable ? 'n' : '')
        if (!space[stack_name]) {
            space[stack_name] = []
        }
        let stack = space[stack_name]
        if (is_corps)
            unshift_stack(stack, pe)
        else
            push_stack(stack, pe)
    }

    for_each_piece_in_space(PERM_ELIMINATED_BOX, insert_piece_in_stack)
    get_perm_eliminated().forEach(insert_piece_in_stack)

    let [ap_space_x, ap_space_y] = layout_center(layout[AP_PER_ELIMINATED_BOX])
    let [cp_space_x, cp_space_y] = layout_center(layout[CP_PER_ELIMINATED_BOX])


    const army_stride = 56
    const row_stride = 66

    let ap_array = Object.keys(ap_space)
    let cp_array = Object.keys(cp_space)
    let d = 0
    for (let i = 0; i < ap_array.length; i++) {
        if (ap_space[ap_array[i]].length <= 0) {
            continue
        }
        ap_space[ap_array[i]].forEach(pe => {
            pe.classList.remove('offmap')
            pe.classList.remove('reduced')
        })
        layout_stack(ap_space[ap_array[i]], ap_space_x + (d % 3) * army_stride, ap_space_y + Math.floor(d / 3) * (row_stride))
        d++
    }
    d = 0
    for (let i = 0; i < cp_array.length; i++) {
        if (cp_space[cp_array[i]].length <= 0) {
            continue
        }
        cp_space[cp_array[i]].forEach(pe => {
            pe.classList.remove('offmap')
            pe.classList.remove('reduced')
        })
        layout_stack(cp_space[cp_array[i]], cp_space_x + (d % 3) * army_stride, cp_space_y + Math.floor(d / 3) * (row_stride))
        d++
    }
}

function on_focus_event_space(evt) {
    let id = evt.target.space
    let space = spaces[id]
    let event = cards[space.event]
    let text = space.name
    if (event.reinf) {
        text += " " + event.reinf
    }
    if (event.status === REMOVED) {
        text += "(Played)"
    } else if (event.status === DISABLED) {
        text += "(Disabled)"
    }
    ui.status.textContent = text
}

function update_reinforcements_view() {
    for (let i = 0; i < data.cards.length; i++) {
        if (data.cards[i].status !== DISABLED) {
            data.cards[i].status = NON_PLAYED
        }
    }
    if (view.removed_cards) {
        for (let i = 0; i < view.removed_cards[AP].length; i++) {
            data.cards[view.removed_cards[AP][i]].status = REMOVED
        }
        for (let i = 0; i < view.removed_cards[CP].length; i++) {
            data.cards[view.removed_cards[CP][i]].status = REMOVED
        }
    }
    for (let i = 286; i <= 359; i++) {
        let space = spaces[i]
        let event = cards[space.event]
        if(!space.stack){
            space.stack = []
        }
        if (event.status === REMOVED) {
            space.stack.forEach(p => p.classList.add("offmap"))
            space.marker ? space.marker.classList.add("hide") : null
        } else if (event.status === NON_PLAYED) {
            space.stack.forEach(p => p.classList.remove("offmap"))
            let [space_x, space_y] = layout_center(layout[space.type + " " + space.event])
            layout_stack(space.stack, space_x, space_y)
            space.marker ? space.marker.classList.remove("hide") : null
        }
    }
}

function get_reinforcement_pieces(card) {
    let result = []
    const card_data = data.cards[card]

    let piece_nation = card_data.reinfnation
    if (card === LIBYAN_REVOLT)
        piece_nation = 'sn' // This card counts as Turkish reinforcements but places the 'sn' piece
    if (card === ARAB_NORTHERN_ARMY)
        piece_nation = 'ana' // This card counts as British reinforcements but places the 'ana' piece

    let reinf_names = card_data.reinf.split('|')
    let quantities = {}
    reinf_names.forEach(name => {
        if (!quantities[name])
            quantities[name] = 0
        quantities[name]++
    })
    for (let name in quantities) {
        let pieces = data.utils.find_n_pieces(piece_nation, name, quantities[name])
        result.push(...pieces)
    }
    return result
}

function show_reinforcements() {
    let reinf = []
    for (let i = 1; i < data.cards.length; i++) {
        let card_data = data.cards[i]

        if (card_data.reinf) {
            map_set(reinf, i, get_reinforcement_pieces(i))
        } else if (i === RUSSIAN_CAVALRY) {
            map_set(reinf, i, [RUS_CAV_CORPS, RUS_CAV_CORPS + 1])
        } else if (i === CZECH_LEGION) {
            map_set(reinf, i, [CZECH_CORPS])
        } else if (i === POLISH_RESTORATION) {
            map_set(reinf, i, [PL_CORPS, PL_CORPS + 1, PL_CORPS + 2])
        } else if (card_data.ws) {
        }

        if (!data.utils.is_card_allowed_to_deal(i, options)) {
            data.cards[i].status = DISABLED
        }
    }
    for (let i = 286; i <= 359; i++) {
        let space = spaces[i]
        let units = map_get(reinf, space.event)
        data.cards[space.event].reinf_pieces = units
        build_ws_event_space(i, units)
    }
    document.getElementById("reinforcements").addEventListener("mousedown", evt => {
        if (evt.button === 0) {
            blur_stack()
            update_map()
        }
    })
    update_map()
}

function show_dialog(id, dialog_generator) {
    document.getElementById(id).hidden = false
    let body = document.getElementById(id).querySelector(".dialog_body")
    body.replaceChildren()
    if (dialog_generator) {
        dialog_generator(body)
    }
}

function hide_dialog(id) {
    document.getElementById(id).hidden = true
}

function can_flag_supply_warnings() {
    return view.actions && 'flag_supply_warnings' in view.actions
}

function flag_supply_warnings() {
    if (!can_flag_supply_warnings())
        return

    send_action("flag_supply_warnings")
}

function can_propose_rollback() {
    return view.actions && 'propose_rollback' in view.actions
}

function propose_rollback() {
    if (!can_propose_rollback())
        return

    let form = document.getElementById('propose_rollback_form')
    form.checkpoint.innerHTML = ""
    view.rollback.forEach((rollback, i) => {
        form.checkpoint.add(new Option(rollback.name, i), 0)
        form.checkpoint.value = i;
    })
    update_rollback_dialog()
    document.getElementById('propose_rollback_dialog').showModal()
}

function update_rollback_dialog() {
    let form = document.getElementById('propose_rollback_form')
    let details = document.getElementById('propose_rollback_details')
    details.innerHTML = ""
    const rollback_header = document.createElement("div")
    rollback_header.className = "rollback_header"
    rollback_header.textContent = "This rollback will undo:"
    details.appendChild(rollback_header)
    let has_rollback_events = false
    for (let i = Number(form.checkpoint.value); i < view.rollback.length; i++) {
        view.rollback[i].events.forEach((event) => {
            has_rollback_events = true
            let detail = document.createElement("div")
            detail.className = 'rollback_event'
            detail.innerHTML = on_prompt(event)
            details.appendChild(detail)
        })
    }
    if (!has_rollback_events) {
        let detail = document.createElement("div")
        detail.className = 'rollback_event'
        detail.textContent = 'No die rolls will be undone'
        details.appendChild(detail)
    }
}

function propose_rollback_cancel(evt) {
    evt.preventDefault()
    document.getElementById('propose_rollback_dialog').close()
}

function propose_rollback_submit(evt) {
    evt.preventDefault()
    const form = document.getElementById('propose_rollback_form')
    send_action('propose_rollback', Number(form.checkpoint.value))
    document.getElementById('propose_rollback_dialog').close()
}

function review_rollback() {
    if (!view.rollback_proposal)
        return

    let details = document.getElementById('review_rollback_details')
    details.innerHTML = ""
    const index = view.rollback_proposal.index
    const rollback_header = document.createElement("div")
    rollback_header.className = "rollback_header"
    rollback_header.textContent = `Rollback to ${view.rollback[index].name} will undo:`
    details.appendChild(rollback_header)
    let has_rollback_events = false
    for (let i = index; i < view.rollback.length; i++) {
        view.rollback[i].events.forEach((event) => {
            has_rollback_events = true
            let detail = document.createElement("div")
            detail.className = 'rollback_event'
            detail.innerHTML = on_prompt(event)
            details.appendChild(detail)
        })
    }
    if (!has_rollback_events) {
        let detail = document.createElement("div")
        detail.className = 'rollback_event'
        detail.textContent = 'No die rolls will be undone'
        details.appendChild(detail)
    }
    document.getElementById('review_rollback_dialog').showModal()
}

function review_rollback_cancel() {
    document.getElementById('review_rollback_dialog').close()
}

function review_rollback_reject() {
    send_action('reject')
    document.getElementById('review_rollback_dialog').close()
}

function review_rollback_accept() {
    send_action('accept')
    document.getElementById('review_rollback_dialog').close()
}

function on_reply(q, params) {
    if (q === 'cp_supply')
        show_cp_supply(params)
    if (q === 'ap_supply')
        show_ap_supply(params)
    if (q === 'ap_cards')
        show_card_list("ap_card_dialog", params)
    if (q === 'cp_cards')
        show_card_list("cp_card_dialog", params)
}

function get_control_bit(i) {
    var word = i >> 5
    var bit = i & 31
    return (view.control[word] >>> bit) & 1
}

const BRITISH_ANA_CORPS = pieces.findIndex(p => p.name === "BR ANAc")
function get_control(i) {
    if (view.location[BRITISH_ANA_CORPS] === i) {
        const has_cp_fort = spaces[i].fort > 0 && spaces[i].faction === CP && !view.forts.destroyed.includes(i)
        return has_cp_fort ? CP : AP
    }

    return get_control_bit(i) ? CP : AP
}

function to_reinforcements(){
    scroll_into_view(document.getElementById("reinforcements"))
}

function show_score_summary() {
    show_dialog("score", (body) => {
        let dl = document.createElement("dl")
        let append_header = (text) => {
            let header = document.createElement("dt")
            header.className = "header"
            header.textContent = text
            dl.appendChild(header)
        }
        let append_score = (label, value) => {
            let p = document.createElement("dd")
            p.className = "score_row"
            p.innerHTML = `${label}: ${value > 0 ? '+' : ''}${value}`
            dl.appendChild(p)
        }

        let append_value = (label, value) => {
            let p = document.createElement("dd")
            p.className = "score_row"
            p.innerHTML = `${label}: ${value}`
            dl.appendChild(p)
        }

        let append_string = (label) => {
            let p = document.createElement("dd")
            p.className = "score_row"
            p.innerHTML = `${label}`
            dl.appendChild(p)
        }

        body.appendChild(dl)

        let current_score = 10;

        // Captured spaces
        let ap_captured = []
        let cp_captured = []
        for (let s = 1; s < map_space_count; s++) {
            if (get_control(s) === CP && spaces[s].faction === AP && spaces[s].vp > 0)
                cp_captured.push(s)
            if (get_control(s) === AP && spaces[s].faction === CP && spaces[s].vp > 0)
                ap_captured.push(s)
        }
        append_header(`CP Captured (+${cp_captured.length})`)
        cp_captured.forEach((s) => { append_score(sub_space_name('', s), spaces[s].vp) })
        append_header(`AP Captured (-${ap_captured.length})`)
        ap_captured.forEach((s) => { append_score(sub_space_name('', s), -spaces[s].vp) })

        current_score += cp_captured.length
        current_score -= ap_captured.length

        // Missed MOs
        append_header(`CP Missed MOs (-${view.cp.missed_mo.length})`)
        view.cp.missed_mo.forEach((turn) => { append_score(`Turn ${turn}`, -1) })
        append_header(`AP Missed MOs (+${view.ap.missed_mo.length})`)
        view.ap.missed_mo.forEach((turn) => { append_score(`Turn ${turn}`, 1) })

        current_score -= view.cp.missed_mo.length
        current_score += view.ap.missed_mo.length

        // Score events
        const score_events = view.score_events || []
        const event_total = score_events.reduce((total, score_event) => { return total + score_event[1] }, 0)
        append_header(`Score Events (${event_total>0?'+':''}${event_total})`)
        score_events.forEach((score_event) => {
            append_score(`Turn ${score_event[0]}: ${score_event.length > 2 ? sub_card_name('', score_event[2]) : ''}`, score_event[1])
        })

        current_score += event_total

        // Bid
        // TODO

        let endgame_score = current_score

        // Historical Scenario VPs that would score if the scenario ended by armistice or at turn 20
        append_header(`Historical Scenario End Game VPs`)
        if (!view.events.reinforcements || !view.events.reinforcements.includes(43)) {
            append_score(`${sub_card_name('', 43)} not played`, 1)
            endgame_score++
        }
        if (!view.events.reinforcements || !view.events.reinforcements.includes(47)) {
            append_score(`${sub_card_name('', 47)} not played`, 1)
            endgame_score++
        }
        if (!view.events.fall_of_the_tsar > 0) {
            append_score(`${sub_card_name('', 117)} not played`, -2)
            endgame_score -= 2
        }

        let future_blockades = 0;
        if ((view.events.blockade >= 1) && (view.state !== "game_over")) {
            future_blockades++;
            if (view.turn <= 16) future_blockades++
            if (view.turn <= 12) future_blockades++
            if (view.turn <= 8) future_blockades++
            if (view.turn <= 4) future_blockades++
        }
        append_score('Future Blockade points if game goes to Turn 20', -future_blockades)

        let final_score = endgame_score - future_blockades

        append_header(`TOTALS`)
        append_value(`Current Score`, current_score)
        append_value(`Scenario Score as of present turn`, endgame_score)

        if (view.state === "game_over") {
            append_value (`Final Score`, final_score)
        } else {
            append_value(`Turn 20 Score (w/ future Blockades)`, final_score)
        }

        if (view.events.treaty_of_brest_litovsk >= 1) {
            append_string(`Treaty of Brest-Litovsk PLAYED: Central Powers win with VP >= 11`)
        }
        else {
            append_string(`Treaty of Brest-Litovsk NOT PLAYED: Central Powers win with VP >= 13`)
        }
    })
}

let ui = {
    map: document.getElementById("map"),
    status: document.getElementById("status"),
    spaces: document.getElementById("spaces"),
    markers: document.getElementById("markers"),
    pieces: document.getElementById("pieces"),
    cards: document.getElementById("cards"),
    cc_list: document.getElementById("cc-list"),
    active_card_zone: document.getElementById("active_card_zone"),
    combat_cards: document.getElementById("combat_cards"),
    unused_combat_cards: document.getElementById("unused_combat_cards"),
    active_cards: document.getElementById("active_cards"),
    ne_limits: {
        br_sr: document.getElementsByClassName("br_ne_sr")[0],
        cp_sr: document.getElementsByClassName("cp_ne_sr")[0],
        ru_sr: document.getElementsByClassName("ru_ne_sr")[0],
        ru_move: document.getElementsByClassName("ru_ne_move")[0],
    },
    neutral: {
        it: document.getElementById("neutral_it"),
        bu: document.getElementById("neutral_bu"),
        ro: document.getElementById("neutral_ro"),
        gr: document.getElementById("neutral_gr"),
        tu: document.getElementById("neutral_tu"),
    },
    space_list: [],
    violations: document.getElementById("violations"),
}

/*
    list of small markers (36x36):
        - allied action 1-6
        - cp action 1-6
        - attack
        - move
        - game turn
        - current russian vp
        - tsar fell russian vp
        - influenza
        - failed entrench -1
        - russian capitulation
        - us entry
        - us points
*/

const marker_info = {
    move: {name: "Move", counter: "marker small move", size: 36},
    attack: {name: "Attack", counter: "marker small attack", size: 36},
    control: {
        ap: {name: "AP Control", type: "ap_control", counter: "marker ap control", size: 45},
        cp: {name: "CP Control", type: "cp_control", counter: "marker cp control", size: 45}
    },
    trench: {
        ap: {
            1: {name: "AP Trench Level 1", type: "ap_trench_1", counter: "marker ap trench_1", size: 45},
            2: {name: "AP Trench Level 2", type: "ap_trench_2", counter: "marker ap trench_2", size: 45}
        },
        cp: {
            1: {name: "CP Trench Level 1", type: "cp_trench_1", counter: "marker cp trench_1", size: 45},
            2: {name: "CP Trench Level 2", type: "cp_trench_2", counter: "marker cp trench_2", size: 45}
        }
    },
    oos: {
        ap: {name: "AP OOS", type: "ap_oos", counter: "marker ap oos", size: 45},
        cp: {name: "CP OOS", type: "cp_oos", counter: "marker cp oos", size: 45}
    },
    vp: {name: "VP", type: "vp", counter: "marker vp", size: 45},

    // War status markers
    ap_war_status: {name: "AP War Status", type: "ap_war_status", counter: "marker ap war_status", size: 45},
    cp_war_status: {name: "CP War Status", type: "cp_war_status", counter: "marker cp war_status", size: 45},
    combined_war_status: {
        name: "Combined War Status",
        type: "combined_war_status",
        counter: "marker ap combined_war_status",
        size: 45
    },

    // Replacement points markers
    ge_rp: {name: "German Replacements", type: "ge_rp", counter: "marker ge_rp", size: 45},
    ge_rp_back: {name: "German Replacements Rathenau", type: "ge_rp_back", counter: "marker ge_rp back", size: 45},
    ah_rp: {name: "Austria-Hungary Replacements", type: "ah_rp", counter: "marker ah_rp", size: 45},
    fr_rp: {name: "French Replacements", type: "fr_rp", counter: "marker fr_rp", size: 45},
    br_rp: {name: "British Replacements", type: "br_rp", counter: "marker br_rp", size: 45},
    br_rp_back: {name: "British Replacements U-Boats", type: "br_rp", counter: "marker br_rp back", size: 45},
    ru_rp: {name: "Russian Replacements", type: "ru_rp", counter: "marker ru_rp", size: 45},
    allied_rp: {name: "Allied Replacements", type: "allied_rp", counter: "marker allied_rp", size: 45},
    bu_rp: {name: "Bulgarian Replacements", type: "bu_rp", counter: "marker bu_rp", size: 45},
    tu_rp: {name: "Turkish Replacements", type: "tu_rp", counter: "marker tu_rp", size: 45},
    it_rp: {name: "Italian Replacements", type: "it_rp", counter: "marker it_rp", size: 45},
    us_rp: {name: "United States Replacements", type: "us_rp", counter: "marker us_rp", size: 45},

    current_cp_russian_vp: {
        name: "CP Russian VP",
        type: "current_cp_russian_vp",
        counter: "marker small current_cp_russian_vp",
        size: 36
    },
    tsar_fell_cp_russian_vp: {
        name: "Tsar Fell CP Russian VP",
        type: "tsar_fell_cp_russian_vp",
        counter: "marker small tsar_fell_cp_russian_vp",
        size: 36
    },
    action: {name: "Action", counter: "marker small action", size: 36},
    fort_destroyed: {name: "Destroyed Fort", counter: "marker fort_destroyed", size: 45},
    fort_destroyed_mini: {name: "Destroyed Fort Mini", counter: "marker mini fort_destroyed", size: 18},
    fort_besieged: {name: "Besieged Fort", counter: "marker fort_besieged", size: 45},
    turn: {name: "Turn", counter: "marker small game_turn", size: 36},
    ap_missed_mo: {name: "AP Missed Mandatory Offensive", counter: "marker ap_missed_mo", size: 45},
    cp_missed_mo: {name: "CP Missed Mandatory Offensive", counter: "marker cp_missed_mo", size: 45},
    failed_entrench: {name: "Failed Entrench", counter: "marker small trench_attempt", size: 36},
    mef_beachhead: {name: "MEF Beachhead", counter: "marker mef_beachhead", size: 45, cardIndex: 31 },

    // small event markers
    fourteen_points: {name: "US Points", counter: "marker small us_points", size: 36, cardIndex: 40},
    influenza: {name: "Influenza", counter: "marker small influenza", size: 36, cardIndex: 65},

    // printed event markers
    blockade: {name: "Blockade", counter: "marker blockade_vps", size: 45, cardIndex: 2},
    lusitania: {name: "Lusitania", counter: "marker lusitania", size: 45, cardIndex: 26},
    sinai_pipeline: {name: "Sinai Pipeline", counter: "marker sinai_pipeline", size: 45, cardIndex: 49},
    sud_army: {name: "Sud Army", counter: "marker sud_army", size: 45, cardIndex: 75},
    eleventh_army: {name: "11th Army", counter: "marker eleventh_army", size: 45, cardIndex: 94},
    stavka_timidity: {name: "Stavka Timidity", counter: "marker stavka_timidity", size: 45, cardIndex: 123},
    haig: {name: "Haig", counter: "marker haig", size: 45, cardIndex: 126},
    prince_max: {name: "Prince Max", counter: "marker prince_max", size: 45, cardIndex: 130},

    // synthesized ap event markers
    moltke: {name: "Moltke", counter: "ap-marker marker moltke", size: 45, cardIndex: 9},
    entrench_ap: {name: "Entrench", counter: "ap-marker marker entrench", size: 45, cardIndex: 12},
    rape_of_belgium: {name: "Rape of Belgium", counter: "ap-marker marker rape_of_belgium", size: 45, cardIndex: 13},
    great_retreat: {name: "Great Retreat", counter: "ap-marker marker great_retreat", size: 45, cardIndex: 27},
    landships: {name: "Landships", counter: "ap-marker marker landships", size: 45, cardIndex: 28},
    salonika: {name: "Salonika", counter: "ap-marker marker salonika", size: 45, cardIndex: 30},
    independent_air_force: {name: "Independent Air Force", counter: "ap-marker marker independent_air_force", size: 45, cardIndex: 37},
    convoy: {name: "Convoy", counter: "ap-marker marker convoy", size: 45, cardIndex: 52},
    everyone_into_battle: {name: "Everyone Into Battle", counter: "ap-marker marker everyone_into_battle", size: 45, cardIndex: 51},
    brusilov_offensive: {name: "Brusilov Offensive", counter: "ap-marker marker brusilov_offensive", size: 45, cardIndex: 46},
    zimmermann_telegram: {name: "Zimmermann Telegram", counter: "ap-marker marker zimmermann_telegram", size: 45, cardIndex: 54},
    over_there: {name: "Over There", counter: "ap-marker marker over_there", size: 45, cardIndex: 55},
    grand_fleet: {name: "Grand Fleet", counter: "ap-marker marker grand_fleet", size: 45, cardIndex: 33},

    italy: {name: "Italy", counter: "ap-marker marker italy", size: 45, cardIndex: 17},
    romania: {name: "Romania", counter: "ap-marker marker romania", size: 45, cardIndex: 16},
    greece: {name: "Greece", counter: "ap-marker marker greece", size: 45, cardIndex: 44},
    br1: {name: "BR 1", counter: "ap-marker marker br1", size: 45, cardIndex: 14},
    br2: {name: "BR 2", counter: "ap-marker marker br2", size: 45, cardIndex: 1},
    mef: {name: "MEF", counter: "ap-marker marker mef", size: 45, cardIndex: 31},
    allenby: {name: "Allenby", counter: "ap-marker marker allenby", size: 45, cardIndex: 50},
    the_sixtus_affair: {name: "The Sixtus Affair", counter: "ap-marker marker sixtus", size: 45, cardIndex: 62},

    // synthesized cp event markers
    guns_of_august: {name: "Guns of August", counter: "cp-marker marker guns_of_august", size: 45, cardIndex: 65 + 1},
    entrench_cp: {name: "Entrench", counter: "cp-marker marker entrench", size: 45, cardIndex: 65 + 6},
    race_to_the_sea: {name: "Race to the Sea", counter: "cp-marker marker race_to_the_sea", size: 45, cardIndex: 65 + 8},
    oberost: {name: "Oberost", counter: "cp-marker marker oberost", size: 45, cardIndex: 65 + 11},
    reichstag_truce: {name: "Reichstag Truce", counter: "cp-marker marker reichstag_truce", size: 45, cardIndex: 65 + 9},
    falkenhayn: {name: "Falkenhayn", counter: "cp-marker marker falkenhayn", size: 45, cardIndex: 65 + 13},
    high_seas_fleet: {name: "High Seas Fleet", counter: "cp-marker marker high_seas_fleet", size: 45, cardIndex: 65 + 25},
    zeppelin_raids: {name: "Zeppelin Raids", counter: "cp-marker marker zeppelin_raids", size: 45, cardIndex: 65 + 27},
    uboats_unleashed: {name: "U-Boats Unleashed", counter: "cp-marker marker uboats_unleashed", size: 45, cardIndex: 65 + 36},
    hoffmann: {name: "Hoffmann", counter: "cp-marker marker hoffmann", size: 45, cardIndex: 65 + 37},
    michael: {name: "Michael", counter: "cp-marker marker michael", size: 45, cardIndex: 65 + 49},
    blucher: {name: "Blucher", counter: "cp-marker marker blucher", size: 45, cardIndex: 65 + 50},
    peace_offensive: {name: "Peace Offensive", counter: "cp-marker marker peace_offensive", size: 45, cardIndex: 65 + 51},
    h_l_take_command: {name: "H-L Take Command", counter: "cp-marker marker h_l_take_command", size: 45, cardIndex: 65 + 54},
    polish_restoration: {name: "Polish Restoration", counter: "cp-marker marker polish_restoration", size: 45, cardIndex: 65 + 59},
    lloyd_george: {name: "Lloyd George", counter: "cp-marker marker lloyd_george", size: 45, cardIndex: 65 + 55},
    walter_rathenau: {name: "Walter Rathenau", counter: "cp-marker marker walter_rathenau", size: 45, cardIndex: 98},
    place_of_execution: {name: "Place of Execution", counter: "cp-marker marker place_of_execution", size: 45, cardIndex: 91},
    tsar_takes_command: {name: "Tsar Takes Command", counter: "cp-marker marker tsar_takes_command", size: 45, cardIndex: 93},
    war_in_africa: {name: "War in Africa", counter: "cp-marker marker war_in_africa", size: 45, cardIndex: 97},
    bolshevik_revolution: {name: "Bolshevik Revolution", counter: "cp-marker marker bolshevik_revolution", size: 45, cardIndex: 118},
    treaty_of_brest_litovsk: {name: "Treaty of Brest-Litovsk", counter: "cp-marker marker treaty_of_brest_litovsk", size: 45, cardIndex: 110},
    french_mutiny: {name: "French Mutiny", counter: "cp-marker marker french_mutiny", size: 45, cardIndex: 112},

    bulgaria: {name: "Bulgaria", counter: "cp-marker marker bulgaria", size: 45, cardIndex: 99},
}

let markers_by_card = []

Object.keys(marker_info).forEach(k => {
    if (marker_info[k].cardIndex) {
        markers_by_card[marker_info[k].cardIndex] = k
    }
})

let markers = {
    ap: {},
    cp: {},
    move: [],
    attack: [],
    control: {
        ap: [],
        cp: []
    },
    general_records: [],
    turn_track: [],
    reinforcements: [],
    missed_mo: {
        ap: [],
        cp: []
    },
    failed_entrench: [],
    actions: [],
    forts: {
        destroyed: [],
        destroyed_mini: [],
        besieged: []
    },
    trench: {
        ap: {1: [], 2: []},
        cp: {1: [], 2: []}
    },
    oos: {
        ap: [],
        cp: []
    },
    mef_beachhead: [],
    sinai: [],
}

function toggle_counters() {
    // Cycle between showing everything, only markers, and nothing.
    if (ui.map.classList.contains("hide_markers")) {
        ui.map.classList.remove("hide_markers")
        ui.map.classList.remove("hide_pieces")
    } else if (ui.map.classList.contains("hide_pieces")) {
        ui.map.classList.add("hide_markers")
    } else {
        ui.map.classList.add("hide_pieces")
    }
}

function abs(x) {
    return x < 0 ? -x : x
}

function for_each_piece_in_space(s, fun) {
    for (let p = 1; p < pieces.length; ++p)
        if (abs(view.location[p]) === s)
            fun(p)
}

// TOOLTIPS

function on_click_space(evt) {
    if (evt.button === 0) {
        let space = evt.target.space
        if (view.actions && view.actions.space && view.actions.space.includes(space)) {
            if (send_action('space', space))
                event.stopPropagation()
        } else if (view.actions && (view.actions.activate_move || view.actions.activate_attack || view.actions.activate_attack_mutiny || view.actions.deactivate)) {
            let options = activation_menu_options.filter((option) => {
                return view.actions[option] && view.actions[option].includes(space)
            })
            if (options.length > 0) {
                let hide = (view.actions.activate_attack_mutiny && view.actions.activate_attack_mutiny.includes(space)) ? 'activate_attack' : 'activate_attack_mutiny'
                show_popup_menu(evt, "activation_popup", space, spaces[space].name, hide)
            }
        }
    }
}

const activation_menu_options = [
    'activate_move',
    'activate_attack',
    'activate_attack_mutiny',
    'deactivate'
]

function on_focus_space(evt) {
    let id = evt.target.space
    let space = spaces[id]
    let text = space.name

    if (DEBUG_SPACES) {
        text = `[${space.id}] ${space.name}`
        if (space.capital !== undefined)
            text += ` (${space.nation.toUpperCase()} Capital)`
        else
            text += ` (${space.nation.toUpperCase()})`
        if (space.vp > 0) text += ` *VP*`
        if (space.supply !== undefined) text += `, Supply Source`
        if (space.terrain !== undefined) text += `, ${space.terrain}`
        if (space.fort !== undefined) text += `, Fort Lvl ${space.fort}`
        if (space.apport !== undefined) text += `, Allied Port`
        if (space.cpport !== undefined) text += `, Central Powers Port`
        space.element.classList.add('highlight')
    }
    if (DEBUG_CONNECTIONS) {
        if (space.connections !== undefined)
            space.connections.forEach(n => spaces[n].element.classList.add('highlight'))
    }

    ui.status.textContent = text
}

function on_blur_space(evt) {
    let id = evt.target.space
    ui.status.textContent = ""

    if (DEBUG_CONNECTIONS || DEBUG_SPACES) {
        spaces.forEach(n => n.element && n.element.classList.remove('highlight'))
    }
}

function stack_piece_count(stack) {
    let n = 0
    for (let i = 0; i < stack.length; ++i)
        if (stack[i][0] > 0)
            ++n
    return n
}

function blur_stack() {
    if (focus !== null) {
        // console.log("BLUR STACK")
        focus = null
    }
    update_map()
}

function is_small_stack(stk) {
    return stk.length <= 1 //|| (stack_piece_count(stk) === 1 && stk.length <= 2)
}

function focus_stack(stack) {
    if (focus !== stack) {
        //console.log("FOCUS STACK", stack ? stack.name : "null")
        focus = stack
        update_map()
        return is_small_stack(stack)
    }
    return true
}

document.getElementById("map").addEventListener("mousedown", evt => {
    if (evt.button === 0) {
        hide_supply()
        blur_stack()
    }
})

function on_click_piece(evt) {
    if (evt.button === 0) {
        hide_supply()
        event.stopPropagation()
        if (focus_stack(evt.target.my_stack)) {
            send_action('piece', evt.target.piece)
        }
    }
}

function on_click_marker(evt) {
    if (evt.button === 0) {
        hide_supply()
        event.stopPropagation()
        focus_stack(evt.target.my_stack)
    }
}

function on_focus_piece(evt) {
    let id = evt.target.piece
    let piece = pieces[id]
    if (view.reduced.includes(id))
        ui.status.textContent = `(${piece.name}) [${piece.rcf}-${piece.rlf}-${piece.rmf}]`
    else
        ui.status.textContent = `${piece.name} [${piece.cf}-${piece.lf}-${piece.mf}]`
    if (mouse_focus)
        focus_stack(evt.target.my_stack)
}

function on_blur_piece(evt) {
    let id = evt.target.piece
    let piece = pieces[id]
    ui.status.textContent = ""
}

function on_focus_marker(evt) {
    let marker = evt.target.marker
    let space = spaces[marker.space_id]
    let name = marker.name

    ui.status.textContent = name
    if (mouse_focus)
        focus_stack(evt.target.my_stack)
}

function on_blur_marker(evt) {
    let marker = evt.target.marker
    ui.status.textContent = ""
}

function format_card_info(c) {
    let card = cards[c]
    let text = `[${card.ops}/${card.sr}] ${card.name}`
    if (card.remove)
        text += "*"
    if (card.ws)
        text += ` (${card.ws})`
    if (card.cc)
        text += ` <span style="color:red">CC</span>`
    return text
}

function on_focus_card(evt) {
    ui.status.innerHTML = format_card_info(evt.target.card)
}

function on_blur_card(evt) {
    ui.status.textContent = ""
}

// CARD MENU

let card_action_menu = Array.from(document.getElementById("card_popup").querySelectorAll("li[data-action]")).map(e => e.dataset.action)

function show_popup_menu(evt, menu_id, target_id, title, hide = '') {
    let menu = document.getElementById(menu_id)

    let show = false
    for (let item of menu.querySelectorAll("li")) {
        let action = item.dataset.action
        if (action) {
            if (action === hide) {
              item.classList.remove("action")
              item.classList.add("hide")
              item.onclick = null
            } else {
                if (is_action(action, target_id)) {
                    show = true
                    item.classList.add("action")
                    item.classList.remove("disabled")
                    item.classList.remove("hide")
                    item.onclick = function() {
                      send_action(action, target_id)
                      hide_popup_menu()
                      evt.stopPropagation()
                    }
                } else {
                    item.classList.remove("action")
                    item.classList.remove("hide")
                    item.classList.add("disabled")
                    item.onclick = null
                }
            }
        }
    }

    if (show) {
        menu.onmouseleave = hide_popup_menu
        menu.hidden = false
        if (title) {
            let item = menu.querySelector("li.title")
            if (item) {
                item.onclick = hide_popup_menu
                item.textContent = title
            }
        }

        let w = menu.clientWidth
        let h = menu.clientHeight
        let x = Math.max(5, Math.min(evt.clientX - w / 2, window.innerWidth - w - 5))
        let y = Math.max(5, Math.min(evt.clientY - 12, window.innerHeight - h - 40))
        menu.style.left = x + "px"
        menu.style.top = y + "px"

        evt.stopPropagation()
    } else {
        menu.hidden = true
    }
}

function hide_popup_menu() {
    document.getElementById("activation_popup").hidden = true
    document.getElementById("card_popup").hidden = true
}

function is_card_enabled(card) {
    if (view.actions) {
        if (card_action_menu.some(a => view.actions[a] && view.actions[a].includes(card)))
            return true
        if (view.actions.card && view.actions.card.includes(card))
            return true
    }
    return false
}

function is_action(action, card) {
    return !!(view.actions && view.actions[action] && view.actions[action].includes(card))
}

function on_click_card(evt) {
    let card = evt.target.card
    if (is_action('card', card)) {
        send_action('card', card)
    } else {
        show_popup_menu(evt, "card_popup", card, cards[card].name)
    }
}

// BUILD UI

function build_unique_marker(cn, size) {
    let elt = document.createElement("div")
    elt.className = cn + " hide"
    elt.my_size = size
    document.getElementById("markers").appendChild(elt)
    return elt
}

function build_disable_marker(id) {
    let space = spaces[id]
    let [ap_space_x, ap_space_y, width] = layout[space.type + " " + space.event]
    let pe = document.createElement("div")

    pe.classList.add("event")
    if (width <= 43) {
        pe.classList.add("small")
    }
    pe.classList.add(DISABLED)
    document.getElementById("reinforcements").appendChild(pe)
    pe.style.left = ap_space_x + "px"
    pe.style.top = ap_space_y + "px"
    pe.space = id
    pe.addEventListener("mouseenter", on_focus_event_space)
    pe.addEventListener("mouseleave", on_blur_space)
    return pe
}

ui.us_entry = build_unique_marker("marker small us_entry", 36)
ui.russian_capitulation = build_unique_marker("marker small russian_capitulation", 36)
ui.ap_mo = build_unique_marker("marker ap mandatory_offensive", 45)
ui.cp_mo = build_unique_marker("marker cp mandatory_offensive", 45)

function build_marker(list, find, new_marker, info, no_listeners) {
    let marker = list.find(find)
    if (marker)
        return marker.element

    marker = new_marker
    marker.name = info.name

    marker.element = document.createElement("div")
    marker.element.marker = marker
    marker.element.className = info.counter
    marker.element.my_size = info.size

    if (!no_listeners) {
        marker.element.addEventListener("mousedown", on_click_marker)
        marker.element.addEventListener("mouseenter", on_focus_marker)
        marker.element.addEventListener("mouseleave", on_blur_marker)
    }

    list.push(marker)
    ui.markers.appendChild(marker.element)
    return marker.element
}

function destroy_marker(list, find) {
    let ix = -1;
    do {
        ix = list.findIndex(find)
        if (ix >= 0) {
            list[ix].element.remove()
            list.splice(ix, 1)
        }
    } while (ix >= 0)
}

function build_activation_marker(space_id, activation_type, ix) {
    return build_marker(
        markers[activation_type],
        e => e.space_id === space_id && e.ix === ix,
        {space_id: space_id, ix: ix },
        marker_info[activation_type]
    )
}

function destroy_activation_marker(space_id, activation_type) {
    destroy_marker(markers[activation_type], e => e.space_id === space_id)
}

function build_control_marker(space_id, faction) {
    return build_marker(
        markers.control[faction],
        e => e.space_id === space_id,
        {space_id: space_id},
        marker_info.control[faction]
    )
}

function destroy_control_marker(space_id, faction) {
    destroy_marker(markers.control[faction], e => e.space_id === space_id)
}

function build_trench_marker(space_id, level, faction) {
    return build_marker(
        markers.trench[faction][level],
        e => e.space_id === space_id,
        {space_id: space_id},
        marker_info.trench[faction][level]
    )
}

function destroy_trench_marker(space_id, faction, level) {
    destroy_marker(markers.trench[faction][level], e => e.space_id === space_id)
}

function build_oos_marker(space_id, faction) {
    return build_marker(
        markers.oos[faction],
        e => e.space_id === space_id,
        {space_id: space_id},
        marker_info.oos[faction]
    )
}

function destroy_oos_marker(space_id, faction) {
    destroy_marker(markers.oos[faction], e => e.space_id === space_id)
}

function build_fort_destroyed_marker(space_id) {
    return build_marker(markers.forts.destroyed, e => e.space_id === space_id, {space_id: space_id}, marker_info.fort_destroyed)
}

function destroy_fort_destroyed_marker(space_id) {
    destroy_marker(markers.forts.destroyed, e => e.space_id === space_id)
}

function build_fort_destroyed_mini_marker(space_id) {
    return build_marker(markers.forts.destroyed_mini, e => e.space_id === space_id, {space_id: space_id}, marker_info.fort_destroyed_mini, true)
}

function destroy_fort_destroyed_mini_marker(space_id) {
    destroy_marker(markers.forts.destroyed_mini, e => e.space_id === space_id)
}

function build_fort_besieged_marker(space_id) {
    return build_marker(markers.forts.besieged, e => e.space_id === space_id, {space_id: space_id}, marker_info.fort_besieged)
}

function destroy_fort_besieged_marker(space_id) {
    destroy_marker(markers.forts.besieged, e => e.space_id === space_id)
}

function build_general_records_marker(type) {
    return build_marker(markers.general_records, e => e.type === type, {type: type}, marker_info[type])
}

function destroy_general_records_marker(type) {
    destroy_marker(markers.general_records, e => e.type === type)
}

function build_turn_track_marker(type) {
    let marker = build_marker(markers.turn_track, e => e.type === type, {type: type}, marker_info[type]);
    if (marker_info[type].cardIndex && marker_info[type].cardIndex > 0) {
        marker.setAttribute('onmouseenter', `on_focus_card_tip(${marker_info[type].cardIndex})`);
        marker.setAttribute('onmouseleave', 'on_blur_card_tip()');
    }
    return marker;
}

function build_event_marker(id) {
    let space = spaces[id]
    let space_layout = layout[space.type + " " + space.event]
    let type = markers_by_card[space.event]
    let marker = build_marker(markers.reinforcements, e => e.id === id, {id: id}, marker_info[type]);
    if (marker_info[type].cardIndex && marker_info[type].cardIndex > 0) {
        marker.setAttribute('onmouseenter', `on_focus_card_tip(${marker_info[type].cardIndex})`);
        marker.setAttribute('onmouseleave', 'on_blur_card_tip()');
    }
    space.marker = marker
    document.getElementById("reinforcements").appendChild(space.marker)
    let [ap_space_x, ap_space_y] = space_layout
    space.marker.style.left = ap_space_x + "px"
    space.marker.style.top = ap_space_y + "px"
    space.marker.space = id
    space.marker.my_stack = [space.my_stack]
    return marker
}

function destroy_turn_track_marker(type) {
    destroy_marker(markers.turn_track, e => e.type === type)
}

function build_missed_mo_marker(faction, turn) {
    return build_marker(markers.missed_mo[faction], e => e.turn === turn, {turn: turn}, marker_info[faction + "_missed_mo"])
}

function destroy_missed_mo_marker(faction, turn) {
    destroy_marker(markers.missed_mo[faction], e => e.turn === turn)
}

function build_failed_entrench_marker(piece_id) {
    return build_marker(markers.failed_entrench, e => e.piece_id === piece_id, {piece_id: piece_id, space_id:view.location[piece_id]}, marker_info.failed_entrench)
}

function destroy_failed_entrench_markers_in_space(space_id) {
    destroy_marker(markers.failed_entrench, e => e.space_id === space_id)
}

function build_action_marker(faction, round) {
    let elt = build_marker(markers.actions, e => e.faction === faction && e.round === round, {
        faction: faction,
        round: round
    }, marker_info.action)
    elt.classList.add(faction)
    elt.classList.add(`round${round}`)
    return elt
}

function destroy_action_marker(faction, round) {
    destroy_marker(markers.actions, e => e.faction === faction && e.round === round)
}

function grow_layout(rect, n) {
    let [ x, y, w, h ] = rect
    return [ x - n, y - n, w + n * 2, h  + n * 2]
}

function layout_center(rect, dx=0, dy=0) {
    let [ x, y, w, h ] = rect
    return [ Math.floor(x + w/2) + dx, Math.ceil(y + h/2) + dy ]
}

function build_space(id, space_layout) {
    let space = spaces[id]
    let [x, y, w, h] = (space_layout ? space_layout : grow_layout(layout[space.name], 8))

    space.stack = []
    space.stack.name = spaces[id].name

    let elt = space.element = document.createElement("div")
    elt.space = id
    if (space.fort && space.vp)
        elt.className = "space fort vp"
    else if (space.fort)
        elt.className = "space fort"
    else if (space.vp)
        elt.className = "space vp"
    else if (space.name === "MEF1" || space.name === "MEF2" || space.name === "MEF3" || space.name === "MEF4")
        elt.className = "space mef"
    else
        elt.className = "space"
    elt.style.left = x + "px"
    elt.style.top = y + "px"
    elt.style.width = w + "px"
    elt.style.height = h + "px"
    elt.addEventListener("click", on_click_space)
    elt.addEventListener("mouseenter", on_focus_space)
    elt.addEventListener("mouseleave", on_blur_space)

    ui.spaces.appendChild(elt)

    ui.space_list[id] = elt
    return elt
}

function build_ws_event_space(id, units) {
    let space = spaces[id]

    let card_data = data.cards[space.event]

    let elt = build_space(id, layout[space.type + " " + space.event])
    document.getElementById("reinforcements").appendChild(elt)

    if (card_data.status === DISABLED) {
        build_disable_marker(id)
        return
    }
    if (space.type === "ws") {
        space.marker = build_event_marker(id)
    }

    if (units && space.type === "reinf") {
        let insert_piece_in_stack = function (p) {
            let is_corps = pieces[p].type === CORPS
            let pe = build_unit(p, document.getElementById("reinforcements"))
            if (is_corps)
                unshift_stack(space.stack, pe)
            else
                push_stack(space.stack, pe)
        }
        units.forEach(p => insert_piece_in_stack(p))
    }
}

const OTHER = "other"
const ap_eliminated_box_order = [FRANCE, BRITAIN, RUSSIA, OTHER]
const cp_eliminated_box_order = [GERMANY, AUSTRIA_HUNGARY, TURKEY, OTHER]

function build_eliminated_box(id) {
    let space = spaces[id]
    let [ x, y, w, h ] = grow_layout(layout[space.name], 0)

    space.stacks = {}
    if (id === AP_ELIMINATED_BOX) {
        for (let group of ap_eliminated_box_order) {
            space.stacks[group] = {armies: [], corps: []}
        }
    } else {
        for (let group of cp_eliminated_box_order) {
            space.stacks[group] = {armies: [], corps: []}
        }
    }

    let elt = space.element = document.createElement("div")
    elt.className = "space box"
    elt.space = id
    elt.style.left = x + "px"
    elt.style.top = y + "px"
    elt.style.width = w + "px"
    elt.style.height = h + "px"
    elt.addEventListener("click", on_click_space)
    elt.addEventListener("mouseenter", on_focus_space)
    elt.addEventListener("mouseleave", on_blur_space)

    ui.spaces.appendChild(elt)

    ui.space_list[id] = elt
}

const ap_reserve_box_order = [ITALY, BRITAIN, FRANCE, RUSSIA, MINOR]
const cp_reserve_box_order = [GERMANY, AUSTRIA_HUNGARY, TURKEY, MINOR]

function build_reserve_box(id) {
    let space = spaces[id]
    let [ x, y, w, h ] = grow_layout(layout[space.name], 0)

    space.stacks = {}
    if (id === AP_RESERVE_BOX) {
        for (let nation of ap_reserve_box_order) {
            space.stacks[nation] = {full: [], reduced: []}
        }
    } else {
        for (let nation of cp_reserve_box_order) {
            space.stacks[nation] = {full: [], reduced: []}
        }
    }

    let elt = space.element = document.createElement("div")
    elt.className = "space box"
    elt.space = id
    elt.style.left = x + "px"
    elt.style.top = y + "px"
    elt.style.width = w + "px"
    elt.style.height = h + "px"
    elt.addEventListener("click", on_click_space)
    elt.addEventListener("mouseenter", on_focus_space)
    elt.addEventListener("mouseleave", on_blur_space)

    ui.spaces.appendChild(elt)

    ui.space_list[id] = elt
}

function build_unit(id, place) {
    let unit = pieces[id]
    let elt = document.createElement("div")
    elt.piece = id
    elt.className = "offmap unit " + unit.type + " " + unit.counter
    elt.addEventListener("mousedown", on_click_piece)
    elt.addEventListener("mouseenter", on_focus_piece)
    elt.addEventListener("mouseleave", on_blur_piece)
    if (unit.type === "army")
        elt.my_size = 45
    else
        elt.my_size = 36
    place.insertBefore(elt, place.firstChild)
    return elt
}

function build_card(id) {
    let card = cards[id]
    let elt = card.element = document.createElement("div")
    elt.card = id
    elt.className = `card ${id <= HIGHEST_AP_CARD ? "ap" : "cp"} ${card_class_name(id)}`
    elt.addEventListener("click", on_click_card)
    elt.addEventListener("mouseenter", on_focus_card)
    elt.addEventListener("mouseleave", on_blur_card)
}

for (let c = 1; c < cards.length; ++c) {
    build_card(c)
}

for (let s = 1; s < spaces.length; ++s) {
    if (s === AP_RESERVE_BOX || s === CP_RESERVE_BOX)
        build_reserve_box(s)
    else if (s === AP_ELIMINATED_BOX || s === CP_ELIMINATED_BOX)
        build_eliminated_box(s)
    else if(!spaces[s].hidden)
        build_space(s)
}
build_perm_elim_box()
for (let p = 0; p < pieces.length; ++p) {
    pieces[p].element = build_unit(p, ui.pieces)
}

// UPDATE UI

function is_action_piece(p) {
    if (view.actions && view.actions.piece && view.actions.piece.includes(p))
        return true
    if (view.who === p)
        return true
    return false
}

function is_different_piece(a, b) {
    if (a > 0 && b > 0) {
        if (pieces[a].type !== pieces[b].type)
            return true
        if (view.reduced.includes(a) !== view.reduced.includes(b))
            return true
        return false
    }
    return true
}

const style_dims = {
    flat: {
        border: 1,
        gap: 3,
        padding: 7,
        stack_dx: 9,
        stack_dy: 9,
        stack_dx_tight: 3,
        stack_dy_tight: 3,
    },
    bevel: {
        border: 2,
        gap: 5,
        padding: 7,
        stack_dx: 9,
        stack_dy: 9,
        stack_dx_tight: 3,
        stack_dy_tight: 3,
    },
}

const MINY = 50

function layout_stack(stack, start_x, start_y) {
    //console.log(`layout_stack: ${x}, ${y}, ${dx}. ${stack}`)

    if (stack.length === 0)
        return

    let dim = style_dims[style]
    let z = (stack === focus) ? 101 : 1

    let dx = stack.length > 5 ? dim.stack_dx_tight : dim.stack_dx
    let dy = stack.length > 5 ? dim.stack_dx_tight : dim.stack_dy
    let dz = stack.length > 5 ? 1 : 3

    // Lose focus if stack is small.
    if (stack === focus && is_small_stack(stack))
        focus = null

    if (stack === focus) {
        let x = start_x
        let y = start_y + (stack[0].my_size + dim.border*2)/2
        z += dz
        let minx = x, maxx = x, miny = y, maxy = y

        // compute focus box height and move down if it would go past the top
        let h = 0
        for (let i = 1; i < stack.length; ++i)
            h += stack[i].my_size + dim.border*2 + dim.gap
        if (y - h < MINY)
            y = MINY + h

        for (let elt of stack) {
            let ex = Math.floor(x - elt.my_size/2 - dim.border)
            let ey = Math.floor(y - elt.my_size - dim.border*2)
            minx = Math.min(minx, ex)
            miny = Math.min(miny, ey)
            maxx = Math.max(maxx, ex + elt.my_size + dim.border * 2)
            maxy = Math.max(maxy, ey + elt.my_size + dim.border * 2)
            elt.style.left = ex + "px"
            elt.style.top = ey + "px"
            elt.style.zIndex = z
            y -= elt.my_size + dim.border * 2 + dim.gap
        }

        focus_box.remove()
        focus_box = document.createElement("div")
        focus_box.id="focus"
        stack[0].parentNode.appendChild(focus_box)

        focus_box.style.left = (minx - dim.padding) + "px"
        focus_box.style.top = (miny - dim.padding) + "px"
        focus_box.style.width = (maxx-minx + dim.padding*2) + "px"
        focus_box.style.height = (maxy-miny + dim.padding*2) + "px"
    } else {
        let x = start_x - (stack[0].my_size + dim.border*2)/2
        let y = start_y + (stack[0].my_size + dim.border*2)/2
        for (let elt of stack) {
            let ex = Math.floor(x)
            let ey = Math.floor(y - elt.my_size - dim.border*2)
            elt.style.left = ex + "px"
            elt.style.top = ey + "px"
            elt.style.zIndex = z
            x += dx
            y -= dy
            z += dz
            if (y < MINY)
                y = MINY
        }
    }
}

function push_stack(stk, elt) {
    stk.unshift(elt)
    elt.my_stack = stk
}

function unshift_stack(stk, elt) {
    stk.push(elt)
    elt.my_stack = stk
}

function update_space(s) {
    let dim = style_dims[style]
    let space = spaces[s]
    let stack = space.stack
    stack.length = 0

    let [ x, y, w, h ] = layout[space.name]
    let xc = Math.round(x + w/2)
    let yc = Math.round(y + h/2)

    let ap_oos = false
    let cp_oos = false

    let full_armies = []
    let reduced_armies = []
    let full_corps = []
    let reduced_corps = []
    let trench

    let count_pieces = 0
    for_each_piece_in_space(s, p => {
        count_pieces++
        let is_corps = pieces[p].type === CORPS
        let is_reduced = view.reduced.includes(p)

        let pe = pieces[p].element
        pe.classList.remove('offmap')
        pe.classList.remove("inside")
        if (is_reduced)
            pe.classList.add("reduced")
        else
            pe.classList.remove("reduced")

        if (is_corps) {
            if (is_reduced) reduced_corps.push(p)
            else full_corps.push(p)
        } else {
            if (is_reduced) reduced_armies.push(p)
            else full_armies.push(p)
        }
    })

    destroy_failed_entrench_markers_in_space(s)
    let ordered_pieces = full_armies.concat(reduced_armies).concat(full_corps).concat(reduced_corps)
    ordered_pieces.forEach(p => {
        let pe = pieces[p].element

        unshift_stack(stack, pe)

        if (view.failed_entrench.includes(p)) {
            unshift_stack(stack, build_failed_entrench_marker(p))
        }

        if (view.oos_pieces && view.oos_pieces.length > 0 && view.oos_pieces.includes(p)) {
            if (pieces[p].faction === AP) ap_oos = true
            if (pieces[p].faction === CP) cp_oos = true
        }
    })

    if (view.mef_beachhead === s) {
        push_stack(stack, build_marker(markers.mef_beachhead, e => e.space_id === s, {space_id: s}, marker_info.mef_beachhead))
    } else {
        destroy_marker(markers.mef_beachhead, e => e.space_id === s)
    }

    // If the space contains pieces of one faction, but is controlled by the other faction, and it's not besieged,
    // then this is a broken siege, and we need to show a control marker.
    let is_broken_siege = false
    if (ordered_pieces.length > 0) {
        const occupying_faction = pieces[ordered_pieces[0]].faction
        const is_besieged = view.forts.besieged.includes(s)
        is_broken_siege = occupying_faction !== get_control(s) && !is_besieged
    }

    if ((space.faction !== get_control(s) && count_pieces === 0) || is_broken_siege)
        push_stack(stack, build_control_marker(s, get_control(s)))
    else {
        destroy_control_marker(s, AP)
        destroy_control_marker(s, CP)
    }

    if (s === SINAI && view.events.sinai_pipeline > 0) {
        push_stack(stack, build_marker(markers.sinai, e => e.space_id === s, {space_id: s}, marker_info.sinai_pipeline))
    } else {
        destroy_marker(markers.sinai, e => e.space_id === s)
    }

    if (view.forts.destroyed.includes(s)) {
        push_stack(stack, build_fort_destroyed_marker(s))
        let mini = build_fort_destroyed_mini_marker(s)
        mini.style.left = `${xc - 10}px`
        mini.style.top = `${y + h + 5}px`
    } else {
        destroy_fort_destroyed_marker(s)
        destroy_fort_destroyed_mini_marker(s)
    }

    if (view.forts.besieged.includes(s)) {
        push_stack(stack, build_fort_besieged_marker(s))
    } else {
        destroy_fort_besieged_marker(s)
    }

    trench = map_get(view.ap.trenches, s, 0)
    if (trench === 2) {
        destroy_trench_marker(s, AP, 1)
        push_stack(stack, build_trench_marker(s, trench, AP))
    } else if (trench === 1) {
        destroy_trench_marker(s, AP, 2)
        push_stack(stack, build_trench_marker(s, trench, AP))
    } else {
        destroy_trench_marker(s, AP, 2)
        destroy_trench_marker(s, AP, 1)
    }

    trench = map_get(view.cp.trenches, s, 0)
    if (trench === 2) {
        destroy_trench_marker(s, CP, 1)
        push_stack(stack, build_trench_marker(s, trench, CP))
    } else if (trench === 1) {
        destroy_trench_marker(s, CP, 2)
        push_stack(stack, build_trench_marker(s, trench, CP))
    } else {
        destroy_trench_marker(s, CP, 2)
        destroy_trench_marker(s, CP, 1)
    }

    if (ap_oos) {
        unshift_stack(stack, build_oos_marker(s, AP))
    } else {
        destroy_oos_marker(s, AP)
    }

    if (cp_oos) {
        unshift_stack(stack, build_oos_marker(s, CP))
    } else {
        destroy_oos_marker(s, CP)
    }

    if (view.activated.move.includes(s)) {
        let markers = view.activation_cost ? map_get(view.activation_cost, s, 1) : 1;
        for (let i = 0; i < markers; i++) {
            unshift_stack(stack, build_activation_marker(s, 'move', i))
        }
    } else {
        destroy_activation_marker(s, 'move')
    }

    if (view.activated.attack.includes(s)) {
        let markers = view.activation_cost ? map_get(view.activation_cost, s, 1) : 1;
        for (let i = 0; i < markers; i++) {
            unshift_stack(stack, build_activation_marker(s, 'attack', i))
        }
    } else {
        destroy_activation_marker(s, 'attack')
    }

    layout_stack(stack, xc, yc)
    update_space_highlight(s)
}

function is_neutral(p) {
    switch (pieces[p].nation) {
        case ITALY:
        case BULGARIA:
        case ROMANIA:
        case TURKEY:
        case GREECE:
            return !view.war[pieces[p].nation]
        default:
            return false
    }
}

function get_reserve_box_stack(nation, p) {
    if (pieces[p].rptype === 'allied') {
        return MINOR //BR// Put the BR minor allies in the stack where their RPs come from (also helps avoid player error thinking BR has plenty of Reserve Corps when it actually has none)
    }
    if ((nation === ITALY) || (nation === BRITAIN) || (nation === FRANCE) || (nation === RUSSIA) || (nation === GERMANY) || (nation === AUSTRIA_HUNGARY) || (nation === TURKEY)) {
        return nation
    }
    return MINOR
}

function update_reserve_boxes() {
    let ap_space = spaces[AP_RESERVE_BOX]
    let cp_space = spaces[CP_RESERVE_BOX]
    let [ ap_space_x, ap_space_y ] = layout_center(layout[ap_space.name])
    let [ cp_space_x, cp_space_y ] = layout_center(layout[cp_space.name])

    for (let nation of ap_reserve_box_order) {
        ap_space.stacks[nation].full.length = 0
        ap_space.stacks[nation].reduced.length = 0
    }
    for (let nation of cp_reserve_box_order) {
        cp_space.stacks[nation].full.length = 0
        cp_space.stacks[nation].reduced.length = 0
    }

    let insert_piece_in_stack = function (p) {
        let is_corps = pieces[p].type === CORPS
        let pe = pieces[p].element
        pe.classList.remove('offmap')
        pe.classList.remove("inside")
        if (view.reduced.includes(p))
            pe.classList.add("reduced")
        else
            pe.classList.remove("reduced")

        const nation = pieces[p].nation
        const space = pieces[p].faction === CP ? cp_space : ap_space
        const which_stack = get_reserve_box_stack(nation, p)
        let stack = view.reduced.includes(p) ? space.stacks[which_stack].reduced : space.stacks[which_stack].full
        if (is_corps)
            unshift_stack(stack, pe)
        else
            push_stack(stack, pe)
    }

    for_each_piece_in_space(AP_RESERVE_BOX, insert_piece_in_stack)
    for_each_piece_in_space(CP_RESERVE_BOX, insert_piece_in_stack)

    const stride = 60

    const ap_x = ap_space_x - 4 * stride/2
    const ap_y = ap_space_y - stride/2 + 20
    for (let i = 0; i < ap_reserve_box_order.length; ++i) {
        let nation = ap_reserve_box_order[i]
        if (ap_space.stacks[nation].full.length > 0) {
            layout_stack(ap_space.stacks[nation].full, ap_x + i * stride, ap_y)
        }
        if (ap_space.stacks[nation].reduced.length > 0) {
            layout_stack(ap_space.stacks[nation].reduced, ap_x + i * stride, ap_y + stride)
        }
    }

    const cp_x = cp_space_x - 3 * stride/2
    const cp_y = cp_space_y - stride/2 + 20
    for (let i = 0; i < cp_reserve_box_order.length; ++i) {
        let nation = cp_reserve_box_order[i]
        if (cp_space.stacks[nation].full.length > 0) {
            layout_stack(cp_space.stacks[nation].full, cp_x + i * stride, cp_y)
        }
        if (cp_space.stacks[nation].reduced.length > 0) {
            layout_stack(cp_space.stacks[nation].reduced, cp_x + i * stride, cp_y + stride)
        }
    }

    update_space_highlight(AP_RESERVE_BOX)
    update_space_highlight(CP_RESERVE_BOX)
}

function get_eliminated_box_group(p) {
    switch (pieces[p].nation) {
        case BRITAIN:
            return BRITAIN
        case FRANCE:
            return FRANCE
        case RUSSIA:
            return RUSSIA
        case GERMANY:
            return GERMANY
        case AUSTRIA_HUNGARY:
            return AUSTRIA_HUNGARY
        case TURKEY:
            return TURKEY
        default:
            return OTHER
    }
}

function update_eliminated_boxes() {
    let ap_space = spaces[AP_ELIMINATED_BOX]
    let cp_space = spaces[CP_ELIMINATED_BOX]
    let [ ap_space_x, ap_space_y ] = layout_center(layout[ap_space.name])
    let [ cp_space_x, cp_space_y ] = layout_center(layout[cp_space.name])

    for (let group of ap_eliminated_box_order) {
        ap_space.stacks[group].armies.length = 0
        ap_space.stacks[group].corps.length = 0
    }
    for (let group of cp_eliminated_box_order) {
        cp_space.stacks[group].armies.length = 0
        cp_space.stacks[group].corps.length = 0
    }

    let insert_piece_in_stack = function (p) {
        let is_corps = pieces[p].type === CORPS
        let pe = pieces[p].element
        pe.classList.remove('offmap')
        if (view.reduced.includes(p))
            pe.classList.add("reduced")
        else
            pe.classList.remove("reduced")

        const space = pieces[p].faction === CP ? cp_space : ap_space
        let stack = is_corps ? space.stacks[get_eliminated_box_group(p)].corps : space.stacks[get_eliminated_box_group(p)].armies
        unshift_stack(stack, pe)
    }
    for_each_piece_in_space(AP_ELIMINATED_BOX, insert_piece_in_stack)
    for_each_piece_in_space(CP_ELIMINATED_BOX, insert_piece_in_stack)

    for_each_piece_in_space(0, p => {
        if (is_action_piece(p))
            insert_piece_in_stack(p)
    })

    for_each_piece_in_space(PERM_ELIMINATED_BOX, p => {
        if (is_action_piece(p))
            insert_piece_in_stack(p)
    })

    const army_stride = 56
    const corp_stride = 48
    const row_stride = 60

    const ap_army_x = ap_space_x - 3 * army_stride/2
    const ap_corp_x = ap_space_x - 3 * corp_stride/2
    const ap_y = ap_space_y - row_stride/2 + 5
    for (let i = 0; i < ap_eliminated_box_order.length; ++i) {
        let group = ap_eliminated_box_order[i]
        if (ap_space.stacks[group].armies.length > 0) {
            layout_stack(ap_space.stacks[group].armies, ap_army_x + i * army_stride, ap_y)
        }
        if (ap_space.stacks[group].corps.length > 0) {
            layout_stack(ap_space.stacks[group].corps, ap_corp_x + i * corp_stride, ap_y + row_stride)
        }
    }

    const cp_army_x = cp_space_x - 2 * army_stride/2
    const cp_corp_x = cp_space_x - 3 * corp_stride/2
    const cp_y = cp_space_y - row_stride/2 + 5
    for (let i = 0; i < cp_eliminated_box_order.length; ++i) {
        let group = cp_eliminated_box_order[i]
        if (cp_space.stacks[group].armies.length > 0) {
            layout_stack(cp_space.stacks[group].armies, cp_army_x + i * army_stride, cp_y)
        }
        if (cp_space.stacks[group].corps.length > 0) {
            layout_stack(cp_space.stacks[group].corps, cp_corp_x + i * corp_stride, cp_y + row_stride)
        }
    }
}

function update_space_highlight(s) {
    let space = spaces[s]
    space.element.classList.toggle("highlight", should_highlight_space(s))
    space.element.classList.toggle("selected", view.where === s)
    space.element.classList.toggle("warning",
        view.violations.some(v => v.space === s) ||
        !!(view.supply_warnings && view.supply_warnings.includes(s))
    )
}

function should_highlight_space(s) {
    if (!view.actions)
        return false

    if (view.actions.space && view.actions.space.includes(s))
        return true

    if (view.actions.activate_move && view.actions.activate_move.includes(s))
        return true

    if (view.actions.activate_attack && view.actions.activate_attack.includes(s))
        return true

    if (view.actions.activate_attack_mutiny && view.actions.activate_attack_mutiny.includes(s))
        return true

    if (view.actions.activate_attack_mutiny && view.actions.activate_attack_mutiny.includes(s))
        return true

    if (view.actions.deactivate && view.actions.deactivate.includes(s))
        return true

    return false
}

function update_card(id) {
    let elt = cards[id].element
    elt.classList.toggle("enabled", is_card_enabled(id))
    elt.classList.toggle("highlight", is_action("card", id) || is_action("play_event", id))
}

function update_piece(id) {
	let piece = pieces[id]
	piece.element.classList.toggle("highlight", !!(view.actions && view.actions.piece && view.actions.piece.includes(id)))
	piece.element.classList.toggle("activated",
            !!(
                (view.attack && view.attack.pieces.includes(id)) ||
                (view.move && view.move.pieces.includes(id))
            )
	)
	piece.element.classList.toggle("selected",
            !!(
                (view.attack && view.attack.advancing_pieces && view.attack.advancing_pieces.includes(id)) ||
                (view.attack && view.attack.retreating_pieces && view.attack.retreating_pieces.includes(id)) ||
                (view.move && view.move.pieces.includes(id)) ||
                (view.who === id)
            ) && !is_action("piece", id)
        )
	piece.element.classList.toggle("entrenching", !!(view.entrenching && view.entrenching.includes(id)))
}

let turn_track_stacks = new Array(20)
for (let i = 0; i < 20; ++i) {
    turn_track_stacks[i] = []
    turn_track_stacks[i].name = `Turn Track ${i + 1}`
}

function update_turn_track_marker(type, value, remove = false) {
    if (remove) {
        destroy_turn_track_marker(type)
    } else {
        let marker = build_turn_track_marker(type)
        push_stack(turn_track_stacks[value - 1], marker)
    }
}

function update_turn_track() {
    turn_track_stacks.forEach((stack) => stack.length = 0)

    update_turn_track_marker("turn", view.turn)

    for (let i = 1; i <= 20; ++i) {
        if (view.ap.missed_mo.includes(i))
            push_stack(turn_track_stacks[i-1], build_missed_mo_marker(AP, i))
        else
            destroy_missed_mo_marker(AP, i)
        if (view.cp.missed_mo.includes(i))
            push_stack(turn_track_stacks[i-1], build_missed_mo_marker(CP, i))
        else
            destroy_missed_mo_marker(CP, i)
    }

    const event_markers = [
        // small markers on top
        "fourteen_points",
        "influenza",

        // important (printed) markers next
        "blockade",
        "lusitania",
        "sinai_pipeline",
        "sud_army",
        "eleventh_army",
        "stavka_timidity",
        "haig",
        "prince_max",

        // ap markers with no printed counter
        "moltke",
        "rape_of_belgium",
        "great_retreat",
        "landships",
        "salonika",
        "independent_air_force",
        "convoy",
        "everyone_into_battle",
        "brusilov_offensive",
        "zimmermann_telegram",
        "br1",
        "br2",
        "mef",
        "allenby",
        "grand_fleet",
        "over_there",
        "the_sixtus_affair",

        // cp markers with no printed counter
        "guns_of_august",
        "race_to_the_sea",
        "oberost",
        "reichstag_truce",
        "falkenhayn",
        "high_seas_fleet",
        "zeppelin_raids",
        "uboats_unleashed",
        "hoffmann",
        "michael",
        "blucher",
        "peace_offensive",
        "h_l_take_command",
        "polish_restoration",
        "lloyd_george",
        "walter_rathenau",
        "place_of_execution",
        "tsar_takes_command",
        "war_in_africa",
        "bolshevik_revolution",
        "treaty_of_brest_litovsk",
        "french_mutiny"
    ]

    event_markers.forEach((marker) => {
        if (view.events[marker] > 0) {
            update_turn_track_marker(marker, view.events[marker])
        } else {
            update_turn_track_marker(marker, 0, true)
        }
    })

    //BR// Markers for neutral entry events. If the turn is listed as "1" the game is from before these had game turns tracked
    update_turn_track_marker("italy", view.war[ITALY], !view.war[ITALY] || (view.war[ITALY] === 1))
    update_turn_track_marker("romania", view.war[ROMANIA], !view.war[ROMANIA] || (view.war[ROMANIA] === 1))
    update_turn_track_marker("bulgaria", view.war[BULGARIA], !view.war[BULGARIA] || (view.war[BULGARIA] === 1))
    update_turn_track_marker("greece", view.war[GREECE], !view.war[GREECE] || (view.war[GREECE] === 1))

    if (view.events.entrench & 128) {
        update_turn_track_marker("entrench_ap", view.events.entrench & 127)
        update_turn_track_marker("entrench_cp", 0, true)
    } else if (view.events.entrench & 256) {
        update_turn_track_marker("entrench_ap", 0, true)
        update_turn_track_marker("entrench_cp", view.events.entrench & 127)
    } else {
        update_turn_track_marker("entrench_ap", 0, true)
        update_turn_track_marker("entrench_cp", 0, true)
    }

    turn_track_stacks.forEach((stack, ix) => {
        if (stack.length > 0) {
            let [x, y] = layout_center(layout["Turn " + (ix + 1)])
            layout_stack(stack, x, y)
        }
    })
}

let general_records_stacks = new Array(41)
for (let i = 0; i <= 40; ++i) {
    general_records_stacks[i] = []
    general_records_stacks[i].name = `General Records ${i}`
}

function update_general_record(type, value, remove = false) {
    value = Math.floor(Math.min(value, 40))
    if (remove) {
        destroy_general_records_marker(type)
    } else {
        let marker = build_general_records_marker(type)
        push_stack(general_records_stacks[value], marker)
    }
}

function update_general_records_track() {
    general_records_stacks.forEach((stack) => stack.length = 0)

    update_general_record("vp", Math.max(0, Math.min(40, view.vp)))

    update_general_record("combined_war_status", view.cp.ws + view.ap.ws)
    update_general_record("ap_war_status", view.ap.ws)
    update_general_record("cp_war_status", view.cp.ws)
    update_general_record("current_cp_russian_vp", view.cp.ru_vp)
    update_general_record("tsar_fell_cp_russian_vp", view.tsar_fell_cp_russian_vp, !view.tsar_fell_cp_russian_vp)

    // RPs$
    if (view.events.walter_rathenau > 0 && !view.events.independent_air_force) {
        update_general_record("ge_rp_back", view.rp.ge, false)
        update_general_record("ge_rp", view.rp.ge, true)
    } else {
        update_general_record("ge_rp_back", view.rp.ge, true)
        update_general_record("ge_rp", view.rp.ge, !view.rp.ge)
    }

    if (view.events.uboats_unleashed > 0 && !view.events.convoy) {
        update_general_record("br_rp_back", view.rp.br, false)
        update_general_record("br_rp", view.rp.br, true)
    } else {
        update_general_record("br_rp_back", view.rp.br, true)
        update_general_record("br_rp", view.rp.br, !view.rp.br)
    }

    update_general_record("ah_rp", view.rp.ah, !view.rp.ah)
    update_general_record("fr_rp", view.rp.fr, !view.rp.fr)
    update_general_record("ru_rp", view.rp.ru, !view.rp.ru)
    update_general_record("allied_rp", view.rp.allied, !view.rp.allied)

    // RPs for countries that may not be at war: bu, tu, it, us
    update_general_record("bu_rp", view.rp.bu, !view.war.bu || !view.rp.bu)
    update_general_record("tu_rp", view.rp.tu, !view.war.tu || !view.rp.tu)
    update_general_record("it_rp", view.rp.it, !view.war.it || !view.rp.it)
    update_general_record("us_rp", view.rp.us, !view.war.us || !view.rp.us)

    general_records_stacks.forEach((stack, ix) => {
        if (stack.length > 0) {
            let [x, y] = layout_center(layout["GR " + ix])
            layout_stack(stack, x, y)
        }
    })
}

function update_ne_limits() {
    if (view.ne_limits.br_sr)
        ui.ne_limits.br_sr.classList.add("used")
    else
        ui.ne_limits.br_sr.classList.remove("used")

    if (view.ne_limits.cp_sr)
        ui.ne_limits.cp_sr.classList.add("used")
    else
        ui.ne_limits.cp_sr.classList.remove("used")

    if (view.ne_limits.ru_sr)
        ui.ne_limits.ru_sr.classList.add("used")
    else
        ui.ne_limits.ru_sr.classList.remove("used")

    if (view.ne_limits.ru_non_sr)
        ui.ne_limits.ru_move.classList.add("used")
    else
        ui.ne_limits.ru_move.classList.remove("used")
}

function update_neutral_markers() {
    for (let nation of ["it", "bu", "tu", "ro", "gr"]) {
        ui.neutral[nation].classList.toggle("hide", !!view.war[nation])
    }
}

const ACTION_REINF = "reinf"

let action_stacks = {
    "ap": {
        "entry": {xy: layout_center(layout["AP AR Neutral Entry"]), stack: []},
        "reinf_fr": {xy: layout_center(layout["AP AR FR Reinf"]), stack: []},
        "reinf_br": {xy: layout_center(layout["AP AR BR Reinf"]), stack: []},
        "reinf_ru": {xy: layout_center(layout["AP AR RU Reinf"]), stack: []},
        "reinf_it": {xy: layout_center(layout["AP AR IT Reinf"]), stack: []},
        "reinf_us": {xy: layout_center(layout["AP AR US Reinf"]), stack: []},
        "sr": {xy: layout_center(layout["AP AR SR Card"]), stack: []},
        "rp": {xy: layout_center(layout["AP AR RP Card"]), stack: []},
        "op": {xy: layout_center(layout["AP AR OPS Card"]), stack: []},
        "evt": {xy: layout_center(layout["AP AR Other Event"]), stack: []},
        "oneop": {xy: layout_center(layout["AP AR 1 Ops"]), stack: []},
        "peace": {xy: layout_center(layout["AP AR Peace Terms"]), stack: []}
    },
    "cp": {
        "entry": {xy: layout_center(layout["CP AR Neutral Entry"]), stack: []},
        "reinf_ge": {xy: layout_center(layout["CP AR GE Reinf"]), stack: []},
        "reinf_ah": {xy: layout_center(layout["CP AR AH Reinf"]), stack: []},
        "reinf_tu": {xy: layout_center(layout["CP AR TU Reinf"]), stack: []},
        "sr": {xy: layout_center(layout["CP AR SR Card"]), stack: []},
        "rp": {xy: layout_center(layout["CP AR RP Card"]), stack: []},
        "op": {xy: layout_center(layout["CP AR OPS Card"]), stack: []},
        "evt": {xy: layout_center(layout["CP AR Other Event"]), stack: []},
        "oneop": {xy: layout_center(layout["CP AR 1 Ops"]), stack: []},
        "peace": {xy: layout_center(layout["CP AR Peace Terms"]), stack: []}
    }
}


function update_action_round_marker(faction, round, action) {
    let action_type = action.type
    if (action_type === ACTION_REINF) {
        action_type = `reinf_${cards[action.card].reinfnation}`
    }
    let stack_info = action_stacks[faction][action_type]
    let marker = build_action_marker(faction, round)
    marker.classList.add(action.type)
    unshift_stack(stack_info.stack, marker)
}

function update_action_round_tracks() {
    for (let faction of [AP, CP]) {
        for (let action_type in action_stacks[faction]) {
            let stack_info = action_stacks[faction][action_type]
            stack_info.stack.length = 0
        }
    }

    for (let i = 0; i < 6; ++i) {
        if (i < view.ap.actions.length) {
            update_action_round_marker(AP, i + 1, view.ap.actions[i])
        } else {
            destroy_action_marker(AP, i + 1)
        }
        if (i < view.cp.actions.length) {
            update_action_round_marker(CP, i + 1, view.cp.actions[i])
        } else {
            destroy_action_marker(CP, i + 1)
        }
    }

    for (let faction of [AP, CP]) {
        for (let action_type in action_stacks[faction]) {
            let stack_info = action_stacks[faction][action_type]
            if (stack_info.stack.length > 0) {
                layout_stack(stack_info.stack, stack_info.xy[0], stack_info.xy[1])
            }
        }
    }
}

function update_violations() {
    if (view.violations.length > 0) {
        ui.violations.replaceChildren()
        let p = document.createElement("div")
        p.innerHTML = "<u><b>Rule Violations:</b></u>"
        ui.violations.appendChild(p)
        for (let v of view.violations) {
            let p = document.createElement("div")
            if (v.space > 0)
                p.innerHTML = escape_text(`s${v.space}: ${v.rule}`)
            else if (v.piece > 0)
                p.innerHTML = escape_text(`P${v.piece}: ${v.rule}`)
            else
                p.innerHTML = escape_text(v.rule)
            ui.violations.appendChild(p)
        }
    } else {
        ui.violations.replaceChildren()
    }
}

const ICONS_SVG = {
    B1: '<span class="die cp d1"></span>',
    B2: '<span class="die cp d2"></span>',
    B3: '<span class="die cp d3"></span>',
    B4: '<span class="die cp d4"></span>',
    B5: '<span class="die cp d5"></span>',
    B6: '<span class="die cp d6"></span>',
    W1: '<span class="die ap d1"></span>',
    W2: '<span class="die ap d2"></span>',
    W3: '<span class="die ap d3"></span>',
    W4: '<span class="die ap d4"></span>',
    W5: '<span class="die ap d5"></span>',
    W6: '<span class="die ap d6"></span>',
}

function sub_icon(match) {
    return ICONS_SVG[match]
}

var log_box_ap = 0
var log_box_cp = 0

function on_log(text, ix) {
    let p = document.createElement("div")

    // Reset group box counter (when log is rewound)
    if (ix < log_box_ap) log_box_ap = 0
    if (ix < log_box_cp) log_box_cp = 0

    if (text.startsWith(">")) {
        text = text.substring(1)
        p.classList.add("i")
    }

    if (text.startsWith("*")) {
        text = text.substring(1)
        p.classList.add("bold")
    }

    if (text.startsWith("!")) {
        text = "\u2757 " + text.substring(1)
    }

    else if (text.startsWith("#cp")) {
        text = text.substring(4)
        p.className = "h4"
        log_box_cp = ix
    }
    else if (text.startsWith("#ap")) {
        text = text.substring(4)
        p.className = "h4"
        log_box_ap = ix
    }

    else if (text.startsWith(".h1")) {
        text = text.substring(4)
        p.className = 'h1'
    }

    else if (text.startsWith(".h2")) {
        text = text.substring(4)
        if (text === 'AP')
            p.className = 'h2 ap'
        else if (text === 'CP')
            p.className = 'h2 cp'
        else
            p.className = 'h2'
    }

    else if (text.startsWith(".h3cp")) {
        text = text.substring(6)
        p.className = "h3 cp"
    }
    else if (text.startsWith(".h3ap")) {
        text = text.substring(6)
        p.className = "h3 ap"
    }
    else if (text.startsWith(".h3")) {
        text = text.substring(4)
        p.className = "h3"
    }

    else if (text === "") {
        log_box_ap = 0
        log_box_cp = 0
    }

    if (log_box_ap)
        p.classList.add("group", "ap")
    if (log_box_cp)
        p.classList.add("group", "cp")

    p.innerHTML = escape_text(text)
    return p
}

function escape_text(text) {
    text = text.replace(/---/g, "\u2014")
    text = text.replace(/--/g, "\u2013")
    text = text.replace(/->/g, "\u2192")
    text = text.replace(/-( ?[\d])/g, "\u2212$1")
    text = text.replace(/&/g, "&amp;")
    text = text.replace(/</g, "&lt;")
    text = text.replace(/>/g, "&gt;")
    text = text.replace(/s(\d+)/g, sub_space_name)
    text = text.replace(/p(\d+)/g, sub_piece_name_reduced)
    text = text.replace(/P(\d+)/g, sub_piece_name)
    text = text.replace(/c(\d+)/g, sub_card_name)
    text = text.replace(/\b[BW]\d\b/g, sub_icon)
    text = text.replace(" 1 spaces", " 1 space")
    text = text.replace(/\+\d VP/g, match => `<span class="cpvp">${match}</span>`)
    text = text.replace(/[-−]\d VP/g, match => `<span class="apvp">${match}</span>`)
    return text
}

function on_prompt(text) {
    return escape_text(text)
}

function add_review_rollback_button() {
    let button = document.getElementById("review_rollback_button")
    if (!button) {
        button = document.createElement("button")
        button.id = "review_rollback_button"
        button.textContent = "Review Proposal"
        button.addEventListener("click", () => { review_rollback() })
        document.getElementById("actions").append(button)
    }
    return button
}

function update_unique_marker(elt, [x,y,w,h]) {
    let dim = style_dims[style]
    x -= elt.my_size / 2 + dim.border
    y -= elt.my_size / 2 + dim.border
    elt.style.left = x + "px"
    elt.style.top = y + "px"
    elt.classList.remove("hide")
}

const layout_ap_mo = {
    fr: layout_center(layout["AP MO FR"], 0, -35),
    br: layout_center(layout["AP MO BR"], 0, -35),
    it: layout_center(layout["AP MO IT"], 0, -35),
    ru: layout_center(layout["AP MO RU"], 0, -35),
    none: layout_center(layout["AP MO None"], 0, -35),
}

const layout_cp_mo = {
    ah: layout_center(layout["CP MO AH"], 0, 35),
    ah_it: layout_center(layout["CP MO IT"], 0, 35),
    tu: layout_center(layout["CP MO TU"], 0, 35),
    ge: layout_center(layout["CP MO GE"], 0, 35),
    none: layout_center(layout["CP MO None"], 0, 35),
}

function update_map() {
    if (!view)
        return

    // Hide Dead and unused pieces
    for_each_piece_in_space(0, p => pieces[p].element.classList.add('offmap'))
    for_each_piece_in_space(PERM_ELIMINATED_BOX, p => pieces[p].element.classList.add('offmap'))

    update_card_zones()

    for (let i = 1; i < cards.length; ++i)
        update_card(i)
    for (let i = 1; i < AP_RESERVE_BOX; ++i)
        update_space(i, false)
    update_reserve_boxes()
    update_eliminated_boxes()
    for (let i = 0; i < pieces.length; ++i)
        update_piece(i)

    if (focus && focus.length <= 1)
        focus = null

    if (focus === null) {
        focus_box.remove()
    }

    // Update tracks
    update_general_records_track()


    ui.ap_mo.classList.toggle("fr_mutiny", !!view.events.french_mutiny)
    update_unique_marker(ui.ap_mo, layout_ap_mo[view.ap.mo])
    update_unique_marker(ui.cp_mo, layout_cp_mo[view.cp.mo])
    update_unique_marker(ui.us_entry, layout_center(layout["US Track " + (view.us_entry+1)]))
    update_unique_marker(ui.russian_capitulation, layout_center(layout["RC Track " + (view.russian_capitulation + 1)]))

    update_turn_track()
    update_action_round_tracks()

    update_ne_limits()
    update_neutral_markers()

    update_violations()

    update_reinforcements_view()
    update_perm_elim_box()

    document.getElementById("cp_hand").textContent = `${view.cp.hand} cards`
    document.getElementById("ap_hand").textContent = `${view.ap.hand} cards`
    document.getElementById("ap_deck_size").textContent = `Allied Powers deck: ${view.ap.deck} cards`
    document.getElementById("cp_deck_size").textContent = `Central Powers deck: ${view.cp.deck} cards`

    let rollback_menu = document.getElementById("propose_rollback_menu")
    if (can_propose_rollback()) {
        rollback_menu.classList.remove('disabled')
    } else {
        rollback_menu.classList.add('disabled')
    }

    let flag_supply_warning_menu = document.getElementById("flag_supply_warning_menu")
    if (can_flag_supply_warnings()) {
        flag_supply_warning_menu.classList.remove('disabled')
    } else {
        flag_supply_warning_menu.classList.add('disabled')
    }

    if (view.rollback_proposal && view.actions && 'accept' in view.actions && 'reject' in view.actions) {
        add_review_rollback_button()
    } else {
        let button = document.getElementById("review_rollback_button")
        if (button) {
            button.remove()
        }
    }

    action_button("single_op", "Automatic Operation")

    action_button("select_all", "Select all")
    action_button("use", "Use")
    action_button("eliminate", "Eliminate")
    action_button("retreat", "Retreat")
    action_button("entrench", "Entrench")
    action_button("flank", "Flank")
    action_button("attack", "Attack")
    action_button("stop", "Stop")
    action_button("no_attack", "No Attack")

    action_button("accept", "Accept")
    action_button("reject", "Reject")

    action_button("end_action", "End Action")

    confirm_action_button("confirm_end_sr", "End Action",
        "You still have strategic redeployment points left to spend!\nDo you still want to END the action round?"
    )

    action_button("end_rp", "End Replacement Phase")
    confirm_action_button("confirm_end_rp", "End Replacement Phase",
        "You still have replacement points left to spend!\nDo you still want to END the replacement phase?"
    )

    action_button("reset_phase", "Reset Phase")
    confirm_action_button("confirm_pass_attack", "Pass",
        "You still have units eligible to attack!\nDo you still want to PASS?"
    )

    confirm_action_button("confirm_mutiny_attack", "Attack",
        "1 VP French Mutiny penalty will be applied!\nDo you still want to Attack?"
    )

    confirm_action_button("confirm_odd_entrench", "Entrench",
        "A different unit in the same space has earned a -1 DRM marker to entrench here.\nDo you still want to entrench with this unit instead?"
    )

    action_button("pass", "Pass")

    action_button("skip", "Skip")
    action_button("next", "Next")
    action_button("done", "Done")
    action_button("undo", "Undo")
}

function update_card_zones() {
    // Update hand
    ui.cards.replaceChildren()
    if (view.hand)
        for (let i of view.hand)
            ui.cards.appendChild(cards[i].element)

    ui.combat_cards.replaceChildren()
    ui.unused_combat_cards.replaceChildren()
    ui.active_cards.replaceChildren()

    let show_ccs = false
    let show_active_cards = false

    // If in an attack, show combat cards split into used and unused
    if (view.attack) {
        show_ccs = true
        for (let i of view.combat_cards)
            if (view.attack.combat_cards.includes(i))
                ui.combat_cards.appendChild(cards[i].element)
            else
                ui.unused_combat_cards.appendChild(cards[i].element)
    } else if (view.combat_cards && view.combat_cards.length > 0) {
        show_active_cards = true
        for (let i of view.combat_cards)
            ui.active_cards.appendChild(cards[i].element)
    }

    if (view.action_state) {
        if (view.action_state.yanks_and_tanks) {
            show_active_cards = true
            ui.active_cards.appendChild(cards[YANKS_AND_TANKS].element)
        }

        if (view.action_state.brusilov_available) {
            show_active_cards = true
            ui.active_cards.appendChild(cards[BRUSILOV_OFFENSIVE].element)
        }

        if (view.action_state.kerensky_available) {
            show_active_cards = true
            ui.active_cards.appendChild(cards[KERENSKY_OFFENSIVE].element)
        }
    }

    if (view.events.great_retreat === view.turn) {
        show_active_cards = true
        ui.active_cards.appendChild(cards[GREAT_RETREAT].element)
    }

    if (view.events.influenza === view.turn) {
        show_active_cards = true
        ui.active_cards.appendChild(cards[INFLUENZA].element)
    }

    if (view.events.lloyd_george === view.turn && !view.events.lloyd_george_canceled) {
        show_active_cards = true
        ui.active_cards.appendChild(cards[LLOYD_GEORGE].element)
    }

    if (view.events.everyone_into_battle === view.turn) {
        show_active_cards = true
        ui.active_cards.appendChild(cards[EVERYONE_INTO_BATTLE].element)
    }

    ui.cc_list.classList.toggle("hide", !show_ccs)
    ui.active_card_zone.classList.toggle("hide", !show_active_cards)
}

function on_update() {
    hide_supply()
    update_map()
}

// INITIALIZE CLIENT

function on_snap_penultimate() {
    // Because we only snapshot at the start of each round instead of each move in PoG,
    // override the default snapshot quickview to always show the last snapshot instead
    // of the penultimate when we have an attack.
    if (view.attack !== null)
        on_snap_prev()
    else
	request_snap(snap_count - 1, on_snap_prev)
}

drag_element_with_mouse("#cp_card_dialog", "#cp_card_dialog .dialog_header")
drag_element_with_mouse("#ap_card_dialog", "#ap_card_dialog .dialog_header")
drag_element_with_mouse("#score", "#score .dialog_header")

/* vim:set sw=4 sts=4 expandtab: */
