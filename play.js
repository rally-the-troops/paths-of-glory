"use strict"

const DEBUG_SPACES = false
const DEBUG_CONNECTIONS = false

const AP = "ap"
const CP = "cp"

const ARMY = "army"
const CORPS = "corps"

const AP_MO_MARKER = "marker ap_mandatory_offensive "
const CP_MO_MARKER = "marker cp_mandatory_offensive "

const US_ENTRY_MARKER = "marker small us_entry us_entry_"
const RC_MARKER = "marker small russian_capitulation rc_"

const AP_RESERVE_BOX = 282
const CP_RESERVE_BOX = 283
const AP_ELIMINATED_BOX = 284
const CP_ELIMINATED_BOX = 285

const ITALY = 'it'
const BRITAIN = 'br'
const FRANCE = 'fr'
const RUSSIA = 'ru'
const GERMANY = 'ge'
const AUSTRIA_HUNGARY = 'ah'
const TURKEY = 'tu'
const MINOR = 'minor'

function check_menu(id, x) {
    document.getElementById(id).className = x ? "menu_item checked" : "menu_item unchecked"
}

const HIGHEST_AP_CARD = 65;

// LAYOUT AND STYLE OPTIONS

let layout = 0
let style = "bevel"
let mouse_focus = 0

function set_layout(x) {
    layout = x
    window.localStorage[params.title_id + "/layout"] = layout
    check_menu("stack_v", layout === 0)
    check_menu("stack_h", layout === 1)
    check_menu("stack_d", layout === 2)
    if (view)
        update_map()
}

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

set_layout(window.localStorage[params.title_id + "/layout"] | 0)
set_style(window.localStorage[params.title_id + "/style"] || "bevel")
set_mouse_focus(window.localStorage[params.title_id + "/mouse_focus"] | 0)

let focus = null
let focus_box = document.getElementById("focus")

// SUPPLY LINE DISPLAY

let showing_supply = false

function show_ap_supply(supply) {
    if (showing_supply)
        hide_supply()
    showing_supply = true
    for (let s = 1; s < spaces.length; ++s) {
        const western = supply.western.sources[s].length > 0
        const eastern = supply.eastern.sources[s].length > 0
        spaces[s].element.classList.toggle("western_supply", western)
        spaces[s].element.classList.toggle("eastern_supply", eastern)
        spaces[s].element.classList.toggle("no_supply", !western && !eastern)
    }
    supply.oos_pieces.forEach(p => pieces[p].element.classList.add("oos"))
}

function show_cp_supply(supply) {
    if (showing_supply)
        hide_supply()
    showing_supply = true
    for (let s = 1; s < spaces.length; ++s) {
        const cp = supply.cp.sources[s].length > 0
        spaces[s].element.classList.toggle("cp_supply", cp)
        spaces[s].element.classList.toggle("no_supply", !cp)
    }
    supply.oos_pieces.forEach(p => pieces[p].element.classList.add("oos"))
}

function hide_supply() {
    if (showing_supply) {
        showing_supply = false
        for (let s = 1; s < spaces.length; ++s) {
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

function print(x) {
    console.log(JSON.stringify(x, (k,v)=>k==='log'?undefined:v))
}

function faction_card_number(card_number) {
    let faction = card_number > HIGHEST_AP_CARD ? "cp" : "ap";
    let faction_card_number = card_number > HIGHEST_AP_CARD ? card_number - HIGHEST_AP_CARD : card_number;
    return `${faction}_${faction_card_number}`
}

function on_focus_card_tip(card_number) {
    document.getElementById("tooltip").className = `card show card_${faction_card_number(card_number)}`
}

function on_blur_card_tip() {
    document.getElementById("tooltip").classList = "card"
}

function on_focus_last_card() {
    //console.log("focus", view.last_card)
    if (typeof view.last_card === 'number') {
        document.getElementById("tooltip").className = `card show card_${faction_card_number(view.last_card)}`
    }
}

function on_blur_last_card() {
    document.getElementById("tooltip").classList = "card"
}

function on_log_line(text, cn) {
    let p = document.createElement("div")
    if (cn) p.className = cn
    p.innerHTML = text
    return p
}

function sub_space_name(match, p1, offset, string) {
    let s = p1 | 0
    let n = spaces[s].name
    return `<span class="spacetip" onmouseenter="on_focus_space_tip(${s})" onmouseleave="on_blur_space_tip(${s})" onclick="on_click_space_tip(${s})">${n}</span>`
}


function show_card_list(id, list) {
    document.getElementById(id).classList.remove("hide")
    let body = document.getElementById(id + "_body")
    while (body.firstChild)
        body.removeChild(body.firstChild)
    if (list.length === 0) {
        body.innerHTML = "<div>None</div>"
    }
    for (let c of list) {
        let p = document.createElement("div")
        p.className = "tip"
        p.onmouseenter = () => on_focus_card_tip(c)
        p.onmouseleave = on_blur_card_tip
        p.textContent = `#${c} ${cards[c].name} [${cards[c].ops}/${cards[c].sr}]`
        body.appendChild(p)
    }
}

function hide_card_list(id) {
    document.getElementById(id).classList.add("hide")
}

function on_reply(q, params) {
    if (q === 'cp_supply')
        show_cp_supply(params)
    if (q === 'ap_supply')
        show_ap_supply(params)
    if (q === 'discard')
        show_card_list("discard", params)
    if (q === 'removed')
        show_card_list("removed", params)
}

let ui = {
    map: document.getElementById("map"),
    status: document.getElementById("status"),
    spaces: document.getElementById("spaces"),
    markers: document.getElementById("markers"),
    pieces: document.getElementById("pieces"),
    cards: document.getElementById("cards"),
    combat_cards: document.getElementById("combat_cards"),
    last_card: document.getElementById("last_card"),
    turn_track: document.getElementById("turn_track"),
    general_records: document.getElementById("general_records"),
    space_list: [],
}

const marker_info = {
    move: { name: "Move", counter: "marker small move", size: 36 },
    attack: { name: "Attack", counter: "marker small attack", size: 36 },
    control: {
        ap: { name: "AP Control", type: "ap_control", counter: "marker small ap_control", size: 36 },
        cp: { name: "CP Control", type: "cp_control", counter: "marker small cp_control", size: 36 }
    },
    trench: {
        ap: {
            1: { name: "AP Trench Level 1", type: "ap_trench_1", counter: "marker small ap_trench_1", size: 36 },
            2: { name: "AP Trench Level 2", type: "ap_trench_2", counter: "marker small ap_trench_2", size: 36 }
        },
        cp: {
            1: { name: "CP Trench Level 1", type: "cp_trench_1", counter: "marker small cp_trench_1", size: 36 },
            2: { name: "CP Trench Level 2", type: "cp_trench_2", counter: "marker small cp_trench_2", size: 36 }
        }
    },
    oos: {
        ap: { name: "AP OOS", type: "ap_oos", counter: "marker ap_oos", size: 45 },
        cp: { name: "CP OOS", type: "cp_oos", counter: "marker cp_oos", size: 45 }
    },
    vp: { name: "VP", type: "vp", counter: "marker vps ", size: 45 },

    // War status markers
    ap_war_status: { name: "AP War Status", type: "ap_war_status", counter: "marker ap_war_status ", size: 45 },
    cp_war_status: { name: "CP War Status", type: "cp_war_status", counter: "marker cp_war_status ", size: 45 },
    combined_war_status: { name: "Combined War Status", type: "combined_war_status", counter: "marker combined_war_status ", size: 45 },

    // Replacement points markers
    ge_rp: { name: "German Replacements", type: "ge_rp", counter: "marker ge_rp ", size: 45 },
    ah_rp: { name: "Austria-Hungary Replacements", type: "ah_rp", counter: "marker ah_rp ", size: 45 },
    fr_rp: { name: "French Replacements", type: "fr_rp", counter: "marker fr_rp ", size: 45 },
    br_rp: { name: "British Replacements", type: "br_rp", counter: "marker br_rp ", size: 45 },
    ru_rp: { name: "Russian Replacements", type: "ru_rp", counter: "marker ru_rp ", size: 45 },
    allied_rp: { name: "Allied Replacements", type: "allied_rp", counter: "marker allied_rp ", size: 45 },
    bu_rp: { name: "Bulgarian Replacements", type: "bu_rp", counter: "marker bu_rp ", size: 45 },
    tu_rp: { name: "Turkish Replacements", type: "tu_rp", counter: "marker tu_rp ", size: 45 },
    it_rp: { name: "Italian Replacements", type: "it_rp", counter: "marker it_rp ", size: 45 },
    us_rp: { name: "United States Replacements", type: "us_rp", counter: "marker us_rp ", size: 45 },

    current_cp_russian_vp: { name: "CP Russian VP", type: "current_cp_russian_vp", counter: "marker small current_cp_russian_vp ", size: 36 },
    tsar_fell_cp_russian_vp: { name: "Tsar Fell CP Russian VP", type: "tsar_fell_cp_russian_vp", counter: "marker small tsar_fell_cp_russian_vp ", size: 36 },
    action: { name: "Action", counter: "marker small action ", size: 36 },
    fort_destroyed: { name: "Destroyed Fort", counter: "marker fort_destroyed ", size: 45 },
    fort_besieged: { name: "Besieged Fort", counter: "marker fort_besieged ", size: 45 },
    turn: { name: "Turn", counter: "marker small game_turn ", size: 36 },
    ap_missed_mo: { name: "AP Missed Mandatory Offensive", counter: "marker ap_missed_mo ", size: 45 },
    cp_missed_mo: { name: "CP Missed Mandatory Offensive", counter: "marker cp_missed_mo ", size: 45 },
    failed_entrench: { name: "Failed Entrench", counter: "marker small trench_attempt ", size: 36 },
    mef_beachhead: { name: "MEF Beachhead", counter: "marker mef_beachhead ", size: 45 },

    // Event markers
    blockade: { name: "Blockade", counter: "marker blockade_vps ", size: 45 },
    influenza: { name: "Influenza", counter: "marker influenza ", size: 45 },
    prince_max: { name: "Prince Max", counter: "marker prince_max ", size: 45 },
    us_points: { name: "US Points", counter: "marker us_points ", size: 45 },
    lusitania: { name: "Lusitania", counter: "marker lusitania ", size: 45 },
    sinai_pipeline: { name: "Sinai Pipeline", counter: "marker sinai_pipeline ", size: 45 },
    stavka_timidity: { name: "Stavka Timidity", counter: "marker stavka_timidity ", size: 45 },
    salonika: { name: "Salonika", counter: "marker salonika ", size: 45 },
    falkenhayn: { name: "Falkenhayn", counter: "marker falkenhayn ", size: 45 },
    h_l_take_command: { name: "H-L Take Command", counter: "marker h_l_take_command ", size: 45 },
    zeppelin_raids: { name: "Zeppelin Raids", counter: "marker zeppelin_raids ", size: 45 },
    peace_offensive: { name: "Peace Offensive", counter: "marker peace_offensive ", size: 45 },
    hoffmann: { name: "Hoffmann", counter: "marker hoffmann ", size: 45 },
    guns_of_august: { name: "Guns of August", counter: "marker guns_of_august ", size: 45 },
    landships: { name: "Landships", counter: "marker landships ", size: 45 },
    race_to_the_sea: { name: "Race to the Sea", counter: "marker race_to_the_sea ", size: 45 },
    michael: { name: "Michael", counter: "marker michael ", size: 45 },
    entrench: { name: "Entrench", counter: "marker entrench ", size: 45 },
    _11th_army: { name: "11th Army", counter: "marker _11th_army ", size: 45 },
    independent_air_force: { name: "Independent Air Force", counter: "marker independent_air_force ", size: 45 },
    blucher: { name: "Blucher", counter: "marker blucher ", size: 45 },
    moltke: { name: "Moltke", counter: "marker moltke ", size: 45 },
    oberost: { name: "Oberost", counter: "marker oberost ", size: 45 },
    great_retreat: { name: "Great Retreat", counter: "marker great_retreat ", size: 45 },
}

let markers = {
    ap: {
    },
    cp: {
    },
    move: [],
    attack: [],
    control: {
        ap: [],
        cp: []
    },
    general_records: [],
    turn_track: [],
    missed_mo: {
        ap: [],
        cp: []
    },
    failed_entrench: [],
    actions: [],
    forts: {
        destroyed: [],
        besieged: []
    },
    trench: {
        ap: { 1: [], 2: [] },
        cp: { 1: [], 2: [] }
    },
    oos: {
        ap: [],
        cp: []
    },
    mef_beachhead: []
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
        if (view.actions && view.actions.space && view.actions.space.includes(evt.target.space)) {
            event.stopPropagation()
            send_action('space', evt.target.space)
        } else if (view.actions && (view.actions.activate_move || view.actions.activate_attack || view.actions.deactivate)) {
            let options = activation_menu_options.filter((option) => {
                return view.actions[option] && view.actions[option].includes(evt.target.space)
            })
            if (options.length > 0) {
                show_popup_menu(evt, "activation_popup", evt.target.space)
            }
        }
    }
}

const activation_menu_options = [
    'activate_move',
    'activate_attack',
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
        if (space.apport !== undefined) text += `, Allied Powers Port`
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
    // evt.target.style.zIndex = 300
    if (view.reduced.includes(id))
        ui.status.textContent = piece.rdesc
    else
        ui.status.textContent = piece.desc
    if (mouse_focus)
        focus_stack(evt.target.my_stack)
}

function on_blur_piece(evt) {
    let id = evt.target.piece
    let piece = pieces[id]
    // evt.target.style.zIndex = piece.z
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

function on_focus_card(evt) {
    let id = evt.target.card
    let card = cards[id]
    ui.status.textContent = `#${id} ${card.name} [${card.ops}/${card.sr}]`
}

function on_blur_card(evt) {
    ui.status.textContent = ""
}

// CARD MENU

let card_action_menu = Array.from(document.getElementById("popup").querySelectorAll("li[data-action]")).map(e => e.dataset.action)

function is_popup_menu_action(menu_id, target_id) {
    let menu = document.getElementById(menu_id)
    for (let item of menu.querySelectorAll("li")) {
        let action = item.dataset.action
        if (action)
            return true
    }
    return false
}

function show_popup_menu(evt, menu_id, target_id, title) {
    let menu = document.getElementById(menu_id)

    let show = false
    for (let item of menu.querySelectorAll("li")) {
        let action = item.dataset.action
        if (action) {
            if (is_action(action, target_id)) {
                show = true
                item.classList.add("action")
                item.classList.remove("disabled")
                item.onclick = function () {
                    send_action(action, target_id)
                    hide_popup_menu()
                    evt.stopPropagation()
                }
            } else {
                item.classList.remove("action")
                item.classList.add("disabled")
                item.onclick = null
            }
        }
    }

    if (show) {
        menu.onmouseleave = hide_popup_menu
        menu.style.display = "block"
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
        menu.style.display = "none"
    }
}

function hide_popup_menu() {
    document.getElementById("popup").style.display = "none"
    document.getElementById("activation_popup").style.display = "none"
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
    return view.actions && view.actions[action] && view.actions[action].includes(card)
}

function on_click_card(evt) {
    let card = evt.target.card
    if (is_action('card', card)) {
        send_action('card', card)
    } else {
        show_popup_menu(evt, "popup", card, cards[card].name)
    }
}

// BUILD UI

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
    let ix = list.findIndex(find)
    if (ix >= 0) {
        list[ix].element.remove()
        list.splice(ix, 1)
    }
}

function build_activation_marker(space_id, activation_type) {
    return build_marker(
        markers[activation_type],
        e => e.space_id === space_id,
        { space_id: space_id },
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
        { space_id: space_id },
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
        { space_id: space_id },
        marker_info.trench[faction][level],
        true
    )
}

function destroy_trench_marker(space_id, faction) {
    destroy_marker(markers.trench[faction][1], e => e.space_id === space_id)
    destroy_marker(markers.trench[faction][2], e => e.space_id === space_id)
}

function build_oos_marker(space_id, faction) {
    return build_marker(
        markers.oos[faction],
        e => e.space_id === space_id,
        { space_id: space_id },
        marker_info.oos[faction]
    )
}

function destroy_oos_marker(space_id, faction) {
    destroy_marker(markers.oos[faction], e => e.space_id === space_id)
}

function build_fort_destroyed_marker(space_id) {
    return build_marker(markers.forts.destroyed, e => e.space_id === space_id, { space_id: space_id }, marker_info.fort_destroyed, true)
}

function destroy_fort_destroyed_marker(space_id) {
    destroy_marker(markers.forts.destroyed, e => e.space_id === space_id)
}

function build_fort_besieged_marker(space_id) {
    return build_marker(markers.forts.besieged, e => e.space_id === space_id, { space_id: space_id }, marker_info.fort_besieged, true)
}

function destroy_fort_besieged_marker(space_id) {
    destroy_marker(markers.forts.besieged, e => e.space_id === space_id)
}

function build_general_records_marker(type) {
    return build_marker(markers.general_records, e => e.type === type, { type: type }, marker_info[type])
}

function destroy_general_records_marker(type) {
    destroy_marker(markers.general_records, e => e.type === type)
}

function build_turn_track_marker(type) {
    return build_marker(markers.turn_track, e => e.type === type, { type: type }, marker_info[type])
}

function destroy_turn_track_marker(type) {
    destroy_marker(markers.turn_track, e => e.type === type)
}

function build_missed_mo_marker(faction, turn) {
    return build_marker(markers.missed_mo[faction], e => e.turn === turn, { turn: turn }, marker_info[faction + "_missed_mo"])
}

function destroy_missed_mo_marker(faction, turn) {
    destroy_marker(markers.missed_mo[faction], e => e.turn === turn)
}

function build_failed_entrench_marker(piece_id) {
    return build_marker(markers.failed_entrench, e => e.piece_id === piece_id, { piece_id: piece_id }, marker_info.failed_entrench)
}

function destroy_failed_entrench_marker(piece_id) {
    destroy_marker(markers.failed_entrench, e => e.piece_id === piece_id)
}

function build_action_marker(faction, round) {
    let elt = build_marker(markers.actions, e => e.faction === faction && e.round === round, { faction: faction, round: round }, marker_info.action)
    elt.classList.add(faction)
    elt.classList.add(`round${round}`)
    return elt
}

function destroy_action_marker(faction, round) {
    destroy_marker(markers.actions, e => e.faction === faction && e.round === round)
}

function build_space(id) {
    let space = spaces[id]

    let w = space.w
    let h = space.h

    let x = space.x - w / 2 - 4
    let y = space.y - h / 2 - 4 // 4 px border space

    space.stack = []
    space.stack.name = spaces[id].name

    let elt = space.element = document.createElement("div")
    elt.space = id
    elt.style.left = x + "px"
    elt.style.top = y + "px"
    elt.style.width = w + "px"
    elt.style.height = h + "px"
    elt.addEventListener("mousedown", on_click_space)
    elt.addEventListener("mouseenter", on_focus_space)
    elt.addEventListener("mouseleave", on_blur_space)

    ui.spaces.appendChild(elt)

    ui.space_list[id] = elt
}

function build_eliminated_box(id) {
    let space = spaces[id]

    let w = space.w
    let h = space.h

    let x = space.x - w / 2 - 4
    let y = space.y - h / 2 - 4 // 4 px border space

    space.stack = []
    space.stack.name = spaces[id].name

    let elt = space.element = document.createElement("div")
    elt.space = id
    elt.style.left = x + "px"
    elt.style.top = y + "px"
    elt.style.width = w + "px"
    elt.style.height = h + "px"
    elt.addEventListener("mousedown", on_click_space)
    elt.addEventListener("mouseenter", on_focus_space)
    elt.addEventListener("mouseleave", on_blur_space)

    ui.spaces.appendChild(elt)

    ui.space_list[id] = elt
}

function build_reserve_box(id) {
    let space = spaces[id]

    let w = space.w
    let h = space.h

    let x = space.x - w / 2 - 4
    let y = space.y - h / 2 - 4 // 4 px border space

    space.stacks = {}
    if (id === AP_RESERVE_BOX) {
        space.stacks[ITALY] = []
        space.stacks[BRITAIN] = []
        space.stacks[FRANCE] = []
        space.stacks[RUSSIA] = []
        space.stacks[MINOR] = []
    } else {
        space.stacks[GERMANY] = []
        space.stacks[AUSTRIA_HUNGARY] = []
        space.stacks[TURKEY] = []
        space.stacks[MINOR] = []
    }

    let elt = space.element = document.createElement("div")
    elt.space = id
    elt.style.left = x + "px"
    elt.style.top = y + "px"
    elt.style.width = w + "px"
    elt.style.height = h + "px"
    elt.addEventListener("mousedown", on_click_space)
    elt.addEventListener("mouseenter", on_focus_space)
    elt.addEventListener("mouseleave", on_blur_space)

    ui.spaces.appendChild(elt)

    ui.space_list[id] = elt
}

function build_unit(id) {
    let unit = pieces[id]
    let elt = unit.element = document.createElement("div")
    elt.piece = id
    elt.className = "offmap unit " + unit.type + " " + unit.counter
    elt.addEventListener("mousedown", on_click_piece)
    elt.addEventListener("mouseenter", on_focus_piece)
    elt.addEventListener("mouseleave", on_blur_piece)
    ui.pieces.insertBefore(elt, ui.pieces.firstChild)
}

function build_card(id) {
    let card = cards[id]
    let elt = card.element = document.createElement("div")
    elt.card = id
    elt.className = "card card_" + faction_card_number(id)
    elt.addEventListener("click", on_click_card)
    elt.addEventListener("mouseenter", on_focus_card)
    elt.addEventListener("mouseleave", on_blur_card)
    ui.cards.appendChild(elt)

    if (card.cc) {
        let cc_elt = card.cc_element = document.createElement("div")
        cc_elt.card = id
        cc_elt.className = "card combat_card card_" + faction_card_number(id)
        cc_elt.addEventListener("click", on_click_card)
        cc_elt.addEventListener("mouseenter", on_focus_card)
        cc_elt.addEventListener("mouseleave", on_blur_card)
        ui.combat_cards.appendChild(cc_elt)
    }
}

for (let c = 1; c < cards.length; ++c) {
    build_card(c)
}
for (let s = 1; s < spaces.length; ++s) {
    if (s === AP_RESERVE_BOX || s === CP_RESERVE_BOX)
        build_reserve_box(s)
    else if (s === AP_ELIMINATED_BOX || s === CP_ELIMINATED_BOX)
        build_eliminated_box(s)
    else
        build_space(s)
}
for (let p = 0; p < pieces.length; ++p)
    build_unit(p)

document.getElementById("last_card").addEventListener("mouseenter", on_focus_last_card)
document.getElementById("last_card").addEventListener("mouseleave", on_blur_last_card)

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
        width: 47,
        gap: 2,
        thresh: [ 24, 16, 10,  8,  6,  0 ],
        offset: [  1,  2,  3,  4,  5,  6 ],
        focus_margin: 5,
    },
    bevel: {
        width: 49,
        gap: 4,
        thresh: [ 24, 16, 10,  8,  6,  0 ],
        offset: [  1,  2,  3,  4,  5,  6 ],
        focus_margin: 6,
    },
}

const MINX = 15
const MINY = 15
const MAXX = 2550 - 15


function layout_stack(stack, x, y, dx) {
    //console.log(`layout_stack: ${x}, ${y}, ${dx}. ${stack}`)

    let dim = style_dims[style]
    let z = (stack === focus) ? 101 : 1

    let n = stack.length
    if (n > 32) n = Math.ceil(n / 4)
    else if (n > 24) n = Math.ceil(n / 3)
    else if (n > 10) n = Math.ceil(n / 2)
    let m = Math.ceil(stack.length / n)

    // Lose focus if stack is small.
    if (stack === focus && is_small_stack(stack))
        focus = null

    if (stack === focus) {
        let w, h
        if (layout === 0) {
            h = (dim.width + dim.gap) * (n-1)
            w = (dim.width + dim.gap) * (m-1)
        }
        if (layout === 1) {
            h = (dim.width + dim.gap) * (m-1)
            w = (dim.width + dim.gap) * (n-1)
        }
        if (y - h < MINY)
            y = h + MINY
        focus_box.style.top = (y-h-dim.focus_margin) + "px"
        if (dx > 0) {
            if (x + w > MAXX - dim.width)
                x = MAXX - dim.width - w
            focus_box.style.left = (x-dim.focus_margin) + "px"
        } else {
            if (x - w < MINX)
                x = w + MINX
            focus_box.style.left = (x-w-dim.focus_margin) + "px"
        }
        focus_box.style.width = (w+dim.width + 2*dim.focus_margin) + "px"
        focus_box.style.height = (h+dim.width + 2*dim.focus_margin) + "px"
    }

    let start_x = x
    let start_y = y

    for (let i = stack.length-1; i >= 0; --i, ++z) {
        let ii = stack.length - i
        let [p, elt] = stack[i]
        let next_p = i > 0 ? stack[i-1][0] : 0

        if (layout === 2 && stack === focus) {
            if (y < MINY) y = MINY
            if (x < MINX) x = MINX
            if (x > MAXX - dim.width) x = MAXX - dim.width
        }

        let ex = x
        let ey = y
        if (p <= 0) {
            ex += Math.floor((45-elt.my_size) / 2)
            ey += Math.floor((45-elt.my_size) / 2)
        }

        //console.log("ex: " + ex + " ey: " + ey);
        elt.style.left = Math.round(ex) + "px"
        elt.style.top = Math.round(ey) + "px"
        elt.style.zIndex = z

        if (p > 0)
            pieces[p].z = z

        if (stack === focus ||  is_small_stack(stack)) {
            switch (layout) {
                case 2: // Diagonal
                    if (y <= MINY + 25) {
                        x -= (dim.width + dim.gap)
                        y = MINY
                        continue
                    }
                    if (x <= MINX + 25) {
                        y -= (dim.width + dim.gap)
                        x = MINX
                        continue
                    }
                    if (x >= MAXX - dim.width - 25) {
                        y -= (dim.width + dim.gap)
                        x = MAXX - dim.width
                        continue
                    }
                    if (p > 0) {
                        x += dx * 20
                        y -= 20
                    } else {
                        x += dx * 15
                        y -= 15
                    }
                    break

                case 0: // Vertical
                    x = start_x + dx * (dim.width + dim.gap) * Math.floor(ii / n)
                    y = start_y - (dim.width + dim.gap) * (ii % n)
                    break

                case 1: // Horizontal
                    x = start_x + dx * (dim.width + dim.gap) * (ii % n)
                    y = start_y - (dim.width + dim.gap) * Math.floor(ii / n)
                    break
            }
        } else {
            for (let k = 0; k <= dim.offset.length; ++k) {
                if (stack.length > dim.thresh[k]) {
                    x += dx * dim.offset[k]
                    y -= dim.offset[k]
                    break
                }
            }
        }
    }
}

function push_stack(stk, pc, elt) {
    stk.push([pc, elt])
    elt.my_stack = stk
}

function unshift_stack(stk, pc, elt) {
    stk.unshift([pc, elt])
    elt.my_stack = stk
}

function remove_from_stack(elt) {
    if (elt.my_stack === undefined)
        return
    let ix = elt.my_stack.find((e) => e[1] === elt)
    if (ix >= 0) {
        array_remove(elt.my_stack, ix)
    }
    elt.my_stack = undefined
}

function update_space(s) {
    let dim = style_dims[style]
    let space = spaces[s]
    let stack = space.stack
    stack.length = 0

    let sx = space.x + Math.round(space.w/2) - 45
    let sy = space.y + Math.round(space.h/2) - 45

    let ap_oos = false
    let cp_oos = false

    for_each_piece_in_space(s, p => {
        let is_corps = pieces[p].type === CORPS
        let pe = pieces[p].element
        pe.classList.remove('offmap')
        pe.classList.remove("inside")
        if (view.reduced.includes(p))
            pe.classList.add("reduced")
        else
            pe.classList.remove("reduced")
        if (is_corps) {
            unshift_stack(stack, p, pe)
        } else {
            if (view.failed_entrench.includes(p)) {
                push_stack(stack, 0, build_failed_entrench_marker(p))
            } else {
                destroy_failed_entrench_marker(p)
            }
            push_stack(stack, p, pe)
        }
        if (view.oos_pieces && view.oos_pieces.length > 0 && view.oos_pieces.includes(p)) {
            if (pieces[p].faction === AP) ap_oos = true
            if (pieces[p].faction === CP) cp_oos = true
        }
    })

    if (view.mef_beachhead === s) {
        push_stack(stack, 0, build_marker(markers.mef_beachhead, e => e.space_id === s, { space_id: s }, marker_info.mef_beachhead))
    } else {
        destroy_marker(markers.mef_beachhead, e => e.space_id === s)
    }

    if (space.faction === AP) {
        if (view.control[s])
            push_stack(stack, 0, build_control_marker(s, CP))
        else
            destroy_control_marker(s, CP)
    }

    if (space.faction === CP) {
        if (!view.control[s])
            push_stack(stack, 0, build_control_marker(s, AP))
        else
            destroy_control_marker(s, AP)
    }

    if (view.forts.destroyed.includes(s)) {
        push_stack(stack, 0, build_fort_destroyed_marker(s))
    } else {
        destroy_fort_destroyed_marker(s)
    }

    if (view.forts.besieged.includes(s)) {
        push_stack(stack, 0, build_fort_besieged_marker(s))
    } else {
        destroy_fort_besieged_marker(s)
    }

    if (view.ap.trenches[s] !== undefined && view.ap.trenches[s] > 0) {
        push_stack(stack, 0, build_trench_marker(s, view.ap.trenches[s], AP))
    } else {
        destroy_trench_marker(s, AP)
    }

    if (view.cp.trenches[s] !== undefined && view.cp.trenches[s] > 0) {
        push_stack(stack, 0, build_trench_marker(s, view.cp.trenches[s], CP))
    } else {
        destroy_trench_marker(s, CP)
    }

    if (ap_oos) {
        unshift_stack(stack, 0, build_oos_marker(s, AP))
    } else {
        destroy_oos_marker(s, AP)
    }

    if (cp_oos) {
        unshift_stack(stack, 0, build_oos_marker(s, CP))
    } else {
        destroy_oos_marker(s, CP)
    }

    if (view.activated.move.includes(s)) {
        unshift_stack(stack, 0, build_activation_marker(s, 'move'))
    } else {
        destroy_activation_marker(s, 'move')
    }

    if (view.activated.attack.includes(s)) {
        unshift_stack(stack, 0, build_activation_marker(s, 'attack'))
    } else {
        destroy_activation_marker(s, 'attack')
    }

    layout_stack(stack, sx, sy, 1)
    update_space_highlight(s)
}

function get_reserve_box_stack(nation) {
    switch (nation) {
        case ITALY: return ITALY
        case BRITAIN: return BRITAIN
        case FRANCE: return FRANCE
        case RUSSIA: return RUSSIA
        case GERMANY: return GERMANY
        case AUSTRIA_HUNGARY: return AUSTRIA_HUNGARY
        case TURKEY: return TURKEY
        default: return MINOR
    }
}

function update_reserve_boxes() {
    let ap_space = spaces[AP_RESERVE_BOX]
    let cp_space = spaces[CP_RESERVE_BOX]
    const ap_order = [ITALY, FRANCE, BRITAIN, RUSSIA, MINOR]
    const cp_order = [GERMANY, AUSTRIA_HUNGARY, TURKEY, MINOR]

    for (let nation of ap_order)
        ap_space.stacks[nation].length = 0
    for (let nation of cp_order)
        cp_space.stacks[nation].length = 0

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
        let stack = space.stacks[get_reserve_box_stack(nation)]
        if (is_corps)
            unshift_stack(stack, p, pe)
        else
            push_stack(stack, p, pe)
    }
    for_each_piece_in_space(AP_RESERVE_BOX, insert_piece_in_stack)
    for_each_piece_in_space(CP_RESERVE_BOX, insert_piece_in_stack)


    const stride = 60
    const ap_x = ap_space.x - stride * 2.5
    const ap_y = ap_space.y
    for (let i = 0; i < ap_order.length; ++i) {
        let nation = ap_order[i]
        let stack = ap_space.stacks[nation]
        if (stack.length > 0) {
            layout_stack(stack, ap_x+i*stride, ap_y, 1)
        }
    }
    const cp_x = cp_space.x - stride * 2
    const cp_y = cp_space.y
    for (let i = 0; i < cp_order.length; ++i) {
        let nation = cp_order[i]
        let stack = cp_space.stacks[nation]
        if (stack.length > 0) {
            layout_stack(stack, cp_x+i*stride, cp_y, 1)
        }
    }

    update_space_highlight(AP_RESERVE_BOX)
    update_space_highlight(CP_RESERVE_BOX)
}

function update_eliminated_boxes() {
    let ap_space = spaces[AP_ELIMINATED_BOX]
    let cp_space = spaces[CP_ELIMINATED_BOX]

    ap_space.stack.length = 0
    cp_space.stack.length = 0

    let insert_piece_in_stack = function (p) {
        let is_corps = pieces[p].type === CORPS
        let pe = pieces[p].element
        pe.classList.remove('offmap')
        if (view.reduced.includes(p))
            pe.classList.add("reduced")
        else
            pe.classList.remove("reduced")

        const space = pieces[p].faction === CP ? cp_space : ap_space
        if (is_corps)
            unshift_stack(space.stack, p, pe)
        else
            push_stack(space.stack, p, pe)
    }
    for_each_piece_in_space(AP_ELIMINATED_BOX, insert_piece_in_stack)
    for_each_piece_in_space(CP_ELIMINATED_BOX, insert_piece_in_stack)

    layout_stack(ap_space.stack, ap_space.x, ap_space.y, 1)
    layout_stack(cp_space.stack, cp_space.x, cp_space.y, 1)
}

function update_space_highlight(s) {
    let space = spaces[s]
    if (should_highlight_space(s))
        space.element.classList.add("highlight")
    else
        space.element.classList.remove("highlight")

    if (view.where === s)
        space.element.classList.add("selected")
    else
        space.element.classList.remove("selected")
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

    if (view.actions.deactivate && view.actions.deactivate.includes(s))
        return true

    return false
}

function update_card(id) {
    let card = cards[id]
    if (is_card_enabled(id))
        card.element.classList.add('enabled')
    else
        card.element.classList.remove('enabled')
    if (view.actions && view.actions.card && view.actions.card.includes(id))
        card.element.classList.add('highlight')
    else
        card.element.classList.remove('highlight')
    if (view.hand.includes(id))
        card.element.classList.add("show")
    else
        card.element.classList.remove("show")

    if (card.cc_element) {
        if (view.combat_cards.includes(id))
            card.cc_element.classList.add("show")
        else
            card.cc_element.classList.remove("show")

        if (view.attack && view.attack.combat_cards.includes(id))
            card.cc_element.classList.add("active")
        else
            card.cc_element.classList.remove("active")
    }
}

function update_piece(id) {
    let piece = pieces[id]
    if (view.actions && view.actions.piece && view.actions.piece.includes(id))
        piece.element.classList.add('highlight')
    else
        piece.element.classList.remove('highlight')

    if ((view.activation && view.activation.includes(id)) ||
        (view.move && view.move.pieces.includes(id)) ||
        (view.attack && view.attack.pieces.includes(id)))
        piece.element.classList.add('activated')
    else
        piece.element.classList.remove('activated')

    if (view.who === id ||
        (view.attack && view.attack.retreating_pieces && view.attack.retreating_pieces.includes(id)) ||
        (view.attack && view.attack.advancing_pieces && view.attack.advancing_pieces.includes(id)))
        piece.element.classList.add('selected')
    else
        piece.element.classList.remove('selected')
}

let turn_track_stacks = new Array(20)
for (let i = 0; i < 20; ++i) {
    turn_track_stacks[i] = []
    turn_track_stacks[i].name = `Turn Track ${i+1}`
}

function turn_track_pos(value) {
    let row = Math.floor((value-1) / 5)
    let col = (value-1) % 5
    let x = 71 + col * 59
    let y = 106 + row * 92
    return [x, y]
}

function update_turn_track_marker(type, value, remove = false) {
    if (remove) {
        destroy_turn_track_marker(type)
    } else {
        let marker = build_turn_track_marker(type)
        push_stack(turn_track_stacks[value-1], 0, marker)
    }
}

function update_turn_track() {
    turn_track_stacks.forEach((stack) => stack.length = 0)

    update_turn_track_marker("turn", view.turn)

    view.ap.missed_mo.forEach((missed_mo) => {
        push_stack(turn_track_stacks[missed_mo-1], 0, build_missed_mo_marker(AP, missed_mo))
    })

    view.cp.missed_mo.forEach((missed_mo) => {
        push_stack(turn_track_stacks[missed_mo-1], 0, build_missed_mo_marker(CP, missed_mo))
    })

    const event_markers = [
        "blockade", "influenza", "prince_max", "us_points", "lusitania",
        "sinai_pipeline", "stavka_timidity", "salonika", "falkenhayn",
        "h_l_take_command", "zeppelin_raids", "peace_offensive", "hoffmann",
        "guns_of_august", "landships", "race_to_the_sea", "michael",
        "entrench", "_11th_army", "independent_air_force", "blucher",
        "moltke", "oberost", "great_retreat"
    ]
    event_markers.forEach((marker) => {
        if (view.events[marker] > 0) {
            update_turn_track_marker(marker, view.events[marker])
        } else {
            update_turn_track_marker(marker, 0, true)
        }
    })

    turn_track_stacks.forEach((stack, ix) => {
        if (stack.length > 0) {
            let [x, y] = turn_track_pos(ix+1)
            layout_stack(stack, x, y, 1)
        }
    })
}

let general_records_stacks = new Array(41)
for (let i = 0; i <= 40; ++i) {
    general_records_stacks[i] = []
    general_records_stacks[i].name = `General Records ${i}`
}

function general_records_pos(value) {
    let row = Math.floor(value / 10)
    let col = value % 10
    if (value === 40) {
        row = 3
        col = 10
    }
    let x = col * 56 + 62
    let y = row * 66 + 1350
    return [x, y]
}

function update_general_record(type, value, remove = false) {
    if (remove) {
        destroy_general_records_marker(type)
    } else {
        let marker = build_general_records_marker(type)
        push_stack(general_records_stacks[value], 0, marker)
    }
}

function update_general_records_track() {
    general_records_stacks.forEach((stack) => stack.length = 0)

    update_general_record("vp", view.vp)

    update_general_record("combined_war_status", view.cp.ws + view.ap.ws)
    update_general_record("ap_war_status", view.ap.ws)
    update_general_record("cp_war_status", view.cp.ws)
    update_general_record("current_cp_russian_vp", view.cp.ru_vp)
    update_general_record("tsar_fell_cp_russian_vp", view.tsar_fell_cp_russian_vp, !view.tsar_fell_cp_russian_vp)

    // RPs
    update_general_record("ge_rp", view.rp.ge, !view.rp.ge)
    update_general_record("ah_rp", view.rp.ah, !view.rp.ah)
    update_general_record("fr_rp", view.rp.fr, !view.rp.fr)
    update_general_record("br_rp", view.rp.br, !view.rp.br) // TODO: Check for uboats event and apply the uboats class
    update_general_record("ru_rp", view.rp.ru, !view.rp.ru)
    update_general_record("allied_rp", view.rp.allied, !view.rp.allied)

    // RPs for countries that may not be at war: bu, tu, it, us
    update_general_record("bu_rp", view.rp.bu, !view.war.bu || !view.rp.bu)
    update_general_record("tu_rp", view.rp.tu, !view.war.tu || !view.rp.tu)
    update_general_record("it_rp", view.rp.it, !view.war.it || !view.rp.it)
    update_general_record("us_rp", view.rp.us, !view.war.us || !view.rp.us)

    general_records_stacks.forEach((stack, ix) => {
        if (stack.length > 0) {
            let [x, y] = general_records_pos(ix)
            layout_stack(stack, x, y, 1)
        }
    })
}

const ACTION_REINF = "reinf"

function update_action_round_marker(faction, round, action) {
    let marker = build_action_marker(faction, round)
    marker.classList.add(action.type)
    if (action.type === ACTION_REINF) {
        marker.classList.add(cards[action.card].reinfnation)
    }
}

function update_action_round_tracks() {
    for (let i = 0; i < 6; ++i) {
        if (i < view.ap.actions.length) {
            update_action_round_marker(AP, i+1, view.ap.actions[i])
        } else {
            destroy_action_marker(AP, i+1)
        }
        if (i < view.cp.actions.length) {
            update_action_round_marker(CP, i+1, view.cp.actions[i])
        } else {
            destroy_action_marker(CP, i+1)
        }
    }
}

function toggle_marker(id, show) {
    let element = document.getElementById(id)
    if (show)
        element.classList.add("show")
    else
        element.classList.remove("show")
}

function on_click_space_tip(s) {
    scroll_into_view(ui.space_list[s])
}


const ICONS_SVG = {
	B0: '<span class="black d0"></span>',
	B1: '<span class="black d1"></span>',
	B2: '<span class="black d2"></span>',
	B3: '<span class="black d3"></span>',
	B4: '<span class="black d4"></span>',
	B5: '<span class="black d5"></span>',
	B6: '<span class="black d6"></span>',
	W0: '<span class="white d0"></span>',
	W1: '<span class="white d1"></span>',
	W2: '<span class="white d2"></span>',
	W3: '<span class="white d3"></span>',
	W4: '<span class="white d4"></span>',
	W5: '<span class="white d5"></span>',
	W6: '<span class="white d6"></span>',
}

const ICONS_TXT = {
	B0: "\u25cf",
	B1: "\u2776",
	B2: "\u2777",
	B3: "\u2778",
	B4: "\u2779",
	B5: "\u277A",
	B6: "\u277B",
	W0: "\u25cb",
	W1: "\u2460",
	W2: "\u2461",
	W3: "\u2462",
	W4: "\u2463",
	W5: "\u2464",
	W6: "\u2465",
}

function sub_icon(match) {
	return ICONS_SVG[match]
}

function on_log(text) {
    let p = document.createElement("div")

    if (text.match(/^>>/)) {
		text = text.substring(2)
		p.className = "ii"
	}

	if (text.match(/^>/)) {
		text = text.substring(1)
		p.className = "i"
	}

    text = text.replace(/&/g, "&amp;")
    text = text.replace(/</g, "&lt;")
    text = text.replace(/>/g, "&gt;")
    text = text.replace(/#(\d+)[^\]]*\]/g,
        '<span class="tip" onmouseenter="on_focus_card_tip($1)" onmouseleave="on_blur_card_tip()">$&</span>')
    text = text.replace(/%(\d+)/g, sub_space_name)

    text = text.replace(/\b[BW]\d\b/g, sub_icon)

    if (text.match(/^\.h1/)) {
        text = text.substring(4)
        p.className = 'h1'
    }
    if (text.match(/^\.h2/)) {
        text = text.substring(4)
        if (text === 'AP')
            p.className = 'h2 ap'
        else if (text === 'CP')
            p.className = 'h2 cp'
        else
            p.className = 'h2'
    }

    if (text.match(/^\.h3cp/)) {
		text = text.substring(6)
		p.className = "h3 cp"
	} else if (text.match(/^\.h3ap/)) {
		text = text.substring(6)
		p.className = "h3 ap"
	} else if (text.match(/^\.h3/)) {
		text = text.substring(4)
		p.className = "h3"
    }



    if (text.indexOf("\n") < 0) {
        p.innerHTML = text
    } else {
        text = text.split("\n")
        p.appendChild(on_log_line(text[0]))
        for (let i = 1; i < text.length; ++i)
            p.appendChild(on_log_line(text[i], "indent"))
    }
    return p
}




function update_map() {
    if (!view)
        return

    // Hide Dead and unused pieces
    for_each_piece_in_space(0, p => pieces[p].element.classList.add('offmap'))

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

    if (focus === null || layout > 1)
        focus_box.className = "hide"
    else
        focus_box.className = "show"

    ui.last_card.className = "card show card_" + faction_card_number(view.last_card)

    // Update tracks
    update_general_records_track()
    let ap_mo = document.getElementById("ap_mandatory_offensive")
    ap_mo.className = AP_MO_MARKER + view.ap.mo + (view.events.french_mutiny ? " fr_mutiny" : "")
    let cp_mo = document.getElementById("cp_mandatory_offensive")
    cp_mo.className = CP_MO_MARKER + view.cp.mo
    let us_entry_marker = document.getElementById("us_entry")
    us_entry_marker.className = US_ENTRY_MARKER + view.us_entry
    let russian_capitulation_marker = document.getElementById("russian_capitulation")
    russian_capitulation_marker.className = RC_MARKER + view.russian_capitulation
    update_turn_track()
    update_action_round_tracks()


    document.getElementById("cp_hand").textContent = view.cp.hand
    document.getElementById("ap_hand").textContent = view.ap.hand
    document.getElementById("ap_deck_size").textContent = view.ap.deck
    document.getElementById("cp_deck_size").textContent = view.cp.deck

    action_button("offer_peace", "Offer Peace")
    action_button("single_op", "Automatic Operation (1 Op)")
    action_button("use", "Use")
    action_button("pass", "Pass")
    action_button("next", "Next")
    action_button("pick_up_all", "Pick Up All")
    action_button("entrench", "Entrench")
    action_button("move", "Begin Move")
    action_button("end_move", "End Move")
    action_button("finish_attacks", "End Attack Phase")
    action_button("done", "Done")
    action_button("undo", "Undo")
}

function on_update() {
    hide_supply()
    update_map()
}

// INITIALIZE CLIENT

drag_element_with_mouse("#removed", "#removed_header")
drag_element_with_mouse("#discard", "#discard_header")

