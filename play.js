"use strict"

const DEBUG_CONNECTIONS = true

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
    console.log("focus", view.last_card)
    if (typeof view.last_card === 'number') {
        document.getElementById("tooltip").className = `card show card_${faction_card_number(view.last_card)}`
    }
}

function on_blur_last_card() {
    document.getElementById("tooltip").classList = "card"
}


function on_log(text) {
    let p = document.createElement("div")
    text = text.replace(/&/g, "&amp;")
    text = text.replace(/</g, "&lt;")
    text = text.replace(/>/g, "&gt;")
    text = text.replace(/#(\d+)[^\]]*\]/g,
        '<span class="tip" onmouseenter="on_focus_card_tip($1)" onmouseleave="on_blur_card_tip()">$&</span>')
    text = text.replace(/%(\d+)/g, sub_space_name)

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
        p.textContent = `#${c} ${cards[c].name} [${cards[c].activation}]`
        body.appendChild(p)
    }
}

function hide_card_list(id) {
    document.getElementById(id).classList.add("hide")
}

let ui = {
    map: document.getElementById("map"),
    status: document.getElementById("status"),
    spaces: document.getElementById("spaces"),
    markers: document.getElementById("markers"),
    pieces: document.getElementById("pieces"),
    cards: document.getElementById("cards"),
    last_card: document.getElementById("last_card"),
    space_list: [],
}


const marker_info = {
    ap: {
    },
    cp: {
    }
}

let markers = {
    ap: {
    },
    cp: {
    }
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
        }
    }
}

function on_focus_space(evt) {
    let id = evt.target.space
    let space = spaces[id]
    let text = space.name

    ui.status.textContent = text
    if (DEBUG_CONNECTIONS) {
        space.element.classList.add('highlight')
        //space.land.forEach(n => spaces[n].element.classList.add('highlight'))
        //space.river.forEach(n => spaces[n].element.classList.add('highlight'))
        //space.lakeshore.forEach(n => spaces[n].element.classList.add('highlight'))
    }
}

function on_blur_space(evt) {
    let id = evt.target.space
    ui.status.textContent = ""

    if (DEBUG_CONNECTIONS) {
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
    return stk.length <= 1 || (stack_piece_count(stk) === 1 && stk.length <= 2)
}

function focus_stack(stack) {
    if (focus !== stack) {
        // console.log("FOCUS STACK", stack ? stack.name : "null")
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
        //hide_supply()
        event.stopPropagation()
        if (focus_stack(evt.target.my_stack)) {
            send_action('piece', evt.target.piece)
        }
    }
}

function on_click_marker(evt) {
    if (evt.button === 0) {
        //hide_supply()
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
    ui.status.textContent = `#${id} ${card.name} [${card.activation}]`
}

function on_blur_card(evt) {
    ui.status.textContent = ""
}

// CARD MENU

const card_action_menu = [
    'play_event',
    'play_ops',
    'play_sr',
    'play_rps'
]

let current_popup_card = 0

function show_popup_menu(evt, list) {
    document.querySelectorAll("#popup div").forEach(e => e.classList.remove('enabled'))
    for (let item of list) {
        let e = document.getElementById("menu_" + item)
        e.classList.add('enabled')
    }
    let popup = document.getElementById("popup")
    popup.style.display = 'block'
    popup.style.left = (evt.clientX-50) + "px"
    popup.style.top = (evt.clientY-12) + "px"
    cards[current_popup_card].element.classList.add("selected")
}

function hide_popup_menu() {
    let popup = document.getElementById("popup")
    popup.style.display = 'none'
    if (current_popup_card) {
        cards[current_popup_card].element.classList.remove("selected")
        current_popup_card = 0
    }
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

function is_card_action(action, card) {
    return view.actions && view.actions[action] && view.actions[action].includes(card)
}

function on_click_card(evt) {
    let card = evt.target.card
    if (is_card_action('card', card)) {
        send_action('card', card)
    } else {
        let menu = card_action_menu.filter(a => is_card_action(a, card))
        if (menu.length > 0) {
            current_popup_card = card
            show_popup_menu(evt, menu)
        }
    }
}


function on_play_event() {
    send_action('play_event', current_popup_card)
    hide_popup_menu()
}

function on_play_ops() {
    send_action('play_ops', current_popup_card)
    hide_popup_menu()
}

function on_play_sr() {
    send_action('play_sr', current_popup_card)
    hide_popup_menu()
}

function on_play_rps() {
    send_action('play_rps', current_popup_card)
    hide_popup_menu()
}

// BUILD UI

function build_space(id) {
    let space = spaces[id]

    let w = space.w
    let h = space.h

    let x = space.x / 2 - w / 2
    let y = space.y / 2 - h / 2

    space.apStack = []
    space.apStack.name = spaces[id].name + "/ap"
    space.cpStack = []
    space.cpStack.name = spaces[id].name + "/cp"

    let elt = space.element = document.createElement("div")
    elt.space = id
    elt.className = space.type
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
    elt.className = "offmap unit " + unit.faction + " " + unit.counter
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
}

for (let c = 1; c < cards.length; ++c)
    build_card(c)
for (let s = 1; s < spaces.length; ++s)
    build_space(s)
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

        elt.style.left = Math.round(ex) + "px"
        elt.style.top = Math.round(ey) + "px"
        elt.style.zIndex = z

        if (p > 0)
            pieces[p].z = z

        if (stack === focus || is_small_stack(stack)) {
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

function update_space(s) {
    let dim = style_dims[style]
    let space = spaces[s]
    let apStack = space.apStack
    let cpStack = space.cpStack

    apStack.length = 0
    cpStack.length = 0

    let sx = space.x + Math.round(space.w/2) - 24
    let sy = space.y + Math.round(space.h/2) - 24
    sy += 12; // make room for label

    function marker(type) {
        if (view.cp[type].includes(s))
            push_stack(cpStack, 0, build_faction_marker(s, 'cp', type))
        else
            destroy_faction_marker(s, 'cp', type)
        if (view.ap[type].includes(s))
            push_stack(apStack, 0, build_faction_marker(s, 'ap', type))
        else
            destroy_faction_marker(s, 'ap', type)
    }

    for_each_piece_in_space(s, p => {
        let pe = pieces[p].element
        pe.classList.remove('offmap')
        pe.classList.remove("inside")
        if (view.reduced.includes(p))
            pe.classList.add("reduced")
        else
            pe.classList.remove("reduced")
        if (pieces[p].faction === 'cp')
            push_stack(cpStack, p, pe)
        else
            push_stack(apStack, p, pe)
    })

    if (apStack.length > 0 && cpStack.length > 0) {
        layout_stack(cpStack, sx - 27, sy, -1)
        layout_stack(apStack, sx + 27, sy, 1)
    } else {
        if (apStack.length > 0) {
            layout_stack(apStack, sx, sy, 1)
        }
        if (cpStack.length > 0) {
            layout_stack(cpStack, sx, sy, -1)
        }
    }

    if (view.actions && view.actions.space && view.actions.space.includes(s))
        space.element.classList.add("highlight")
    else
        space.element.classList.remove("highlight")

    if (view.where === s)
        space.element.classList.add("selected")
    else
        space.element.classList.remove("selected")
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
}

function update_piece(id) {
    let piece = pieces[id]
    if (view.actions && view.actions.piece && view.actions.piece.includes(id))
        piece.element.classList.add('highlight')
    else
        piece.element.classList.remove('highlight')
    if (view.activation && view.activation.includes(id))
        piece.element.classList.add('activated')
    else
        piece.element.classList.remove('activated')
    if (view.who === id)
        piece.element.classList.add('selected')
    else
        piece.element.classList.remove('selected')
}

function toggle_marker(id, show) {
    let element = document.getElementById(id)
    if (show)
        element.classList.add("show")
    else
        element.classList.remove("show")
}


function update_map() {
    if (!view)
        return

    // Hide Dead and unused pieces
    for_each_piece_in_space(0, p => pieces[p].element.classList.add('offmap'))

    for (let i = 1; i < cards.length; ++i)
        update_card(i)
    for (let i = 1; i < spaces.length; ++i)
        update_space(i, false)
    for (let i = 0; i < pieces.length; ++i)
        update_piece(i)

    if (focus && focus.length === 0)
        focus = null

    if (focus === null || layout > 1)
        focus_box.className = "hide"
    else
        focus_box.className = "show"

    ui.last_card.className = "card show card_" + faction_card_number(view.last_card)

    // TODO: Update VP and other tracks

    document.getElementById("cp_hand").textContent = view.cp.hand
    document.getElementById("ap_hand").textContent = view.ap.hand
    document.getElementById("ap_deck_size").textContent = view.ap.deck
    document.getElementById("cp_deck_size").textContent = view.cp.deck

    action_button("next", "Next")
    action_button("end_move", "End move")
    action_button("undo", "Undo")
}

function on_update() {
    //hide_supply()
    update_map()
}

// INITIALIZE CLIENT

drag_element_with_mouse("#removed", "#removed_header")
drag_element_with_mouse("#discard", "#discard_header")
scroll_with_middle_mouse("main")
