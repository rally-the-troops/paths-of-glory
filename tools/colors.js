const oklab = require("rally-the-troops/tools/oklab")

function bevel(sel, color) {
        console.log(oklab.css_bevel(sel, color))
}

function flat(sel, color) {
        console.log(`${sel} { background-color: ${color}; }`)
}

/* VASSAL TOKENS THAT NEED CLEANING:
#00000000 br_ne_sr2
#00000000 br_ne_sr_used2
#00000000 cp_ne_sr
#00000000 cp_ne_sr2
#00000000 cp_ne_sr_used
#00000000 cp_ne_sr_used2
#00000000 neutral
#00000000 ru_ne_move3
#00000000 ru_ne_move_fall
#00000000 ru_ne_move_used3
#00000000 ru_ne_sr2
#00000000 ru_ne_sr_used2
*/

var data = `
#f0f0f0 .marker
#f0f0f0 .marker.action.cp
#f0f0f0 .marker.action.ap
#57a6c5 .marker.cp
#e6e2d0 .marker.ap
#fff200 .marker.game_turn
#fff200 .marker.move
#fff200 .marker.vp
#d1b682 .marker.russian_capitulation
#ed1c23 .marker.attack
#ed1c23 .marker.game_turn.back
#fff327 .marker.fort_destroyed
#fff684 .marker.fort_besieged
#91b466 .marker.us_entry
#91b466 .marker.us_points
#95b0be .marker.cp.control
#95b0be .marker.cp.oos
#b8d0dc .marker.cp.trench_1
#b8d0dc .marker.cp.trench_2
#0090d5 .unit.corps_gr
#06a890 .unit.corps_ro
#63beeb .unit.army_fr
#63beeb .unit.corps_fr
#91b466 .unit.army_us
#91b466 .unit.corps_us
#a06c46 .unit.corps_mn
#a4c9d9 .unit.corps_pol
#a8b8bf .unit.army_ge
#a8b8bf .unit.corps_ge
#b08659 .unit.army_sb
#b08659 .unit.corps_sb
#bae6fb .unit.army_be
#bae6fb .unit.corps_be
#c12546 .unit.corps_bu
#d1b682 .unit.army_ru
#d1b682 .unit.corps_czl
#d1b682 .unit.corps_ru
#dbd2b1 .unit.army_br
#dbd2b1 .unit.corps_br
#e7e8e8 .unit.army_ah
#e7e8e8 .unit.corps_ah
#f3c576 .unit.army_tu
#f3c576 .unit.corps_tu
#fff9b8 .unit.army_it
#fff9b8 .unit.corps_it
#9e9e9e .marker.neutral
#e3ecf1 .marker.cp-marker
#efebe0 .marker.ap-marker
`

data.trim().split("\n").map(line=>line.split(" ")).map(([c,s])=>bevel("body.bevel " + s,c))
data.trim().split("\n").map(line=>line.split(" ")).map(([c,s])=>flat("body.flat " + s,c))
