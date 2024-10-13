mkdir -p out_large out_small

function mklarge {
	convert -gravity center -crop 360x360+0+0 +repage -colorspace RGB -resize 25% -colorspace sRGB $1 $2
}

function mksmall {
	convert -gravity center -crop 288x288+0+0 +repage -colorspace RGB -resize 25% -colorspace sRGB $1 $2
}

function large1() {
	S=$1
	ROW=$(printf %02d $2)
	COL=$(printf %02d $3)
	N=$4
	mklarge HIRES/tmp/sheet_${S}a_${ROW}_${COL}.ppm out_large/${N}.png
}

function large2() {
	S=$1
	ROW=$(printf %02d $2)
	COL=$(printf %02d $3)
	N=$4
	mklarge HIRES/tmp/sheet_${S}a_${ROW}_${COL}.ppm out_large/${N}.png
	mklarge HIRES/tmp/sheet_${S}b_${ROW}_${COL}.ppm out_large/${N}_back.png
}

function large3() {
	S=$1
	ROW=$(printf %02d $2)
	COL=$(printf %02d $3)
	N=$4
	M=$5
	mklarge HIRES/tmp/sheet_${S}a_${ROW}_${COL}.ppm out_large/${N}.png
	mklarge HIRES/tmp/sheet_${S}b_${ROW}_${COL}.ppm out_large/${M}.png
}

function small1() {
	S=$1
	ROW=$(printf %02d $2)
	COL=$(printf %02d $3)
	N=$4
	mksmall HIRES/tmp/sheet_${S}a_${ROW}_${COL}.ppm out_small/${N}.png
}

function small2() {
	S=$1
	ROW=$(printf %02d $2)
	COL=$(printf %02d $3)
	N=$4
	mksmall HIRES/tmp/sheet_${S}a_${ROW}_${COL}.ppm out_small/${N}.png
	mksmall HIRES/tmp/sheet_${S}b_${ROW}_${COL}.ppm out_small/${N}_back.png
}

function small3() {
	S=$1
	ROW=$(printf %02d $2)
	COL=$(printf %02d $3)
	N=$4
	M=$5
	mksmall HIRES/tmp/sheet_${S}a_${ROW}_${COL}.ppm out_small/${N}.png
	mksmall HIRES/tmp/sheet_${S}b_${ROW}_${COL}.ppm out_small/${M}.png
}

# SHEET 1 (LEFT)

large2 1 1 1 ge_army_01
large2 1 1 2 ge_army_02
large2 1 1 3 ge_army_03
large2 1 1 4 ge_army_04
large2 1 1 5 ge_army_05
large2 1 1 6 ge_army_06
large2 1 1 7 ge_army_07
large2 1 1 8 ge_army_08

large2 1 2 1 ge_army_09
large2 1 2 2 ge_army_10
large2 1 2 3 ge_army_11
large2 1 2 4 ge_army_12
large2 1 2 5 ge_army_14
large2 1 2 6 ge_army_17
large2 1 2 7 ge_army_18
large2 1 2 8 ah_army_01

large2 1 3 1 it_army_01
large2 1 3 2 it_army_02
large2 1 3 3 it_army_03
large2 1 3 4 tu_army_yld
large2 1 3 5 ah_army_02
large2 1 3 6 ah_army_03
large2 1 3 7 ah_army_04
large2 1 3 8 ah_army_05


large2 1 4 1 it_army_04
large2 1 4 2 it_army_05
# large2 1 4 3 junk
large2 1 4 4 tu_army_aol
large2 1 4 5 ah_army_06
large2 1 4 6 ah_army_07
large2 1 4 7 ah_army_10
large2 1 4 8 ah_army_11

large2 1 5 1 fr_army_01
large2 1 5 2 fr_army_02
large2 1 5 3 fr_army_03
large2 1 5 4 fr_army_04
large2 1 5 5 fr_army_05
large2 1 5 6 be_army_01
# large2 1 5 7 junk
large2 1 5 8 usa_army_01

large2 1 6 1 fr_army_06
large2 1 6 2 fr_army_07
large2 1 6 3 fr_army_09
large2 1 6 4 fr_army_10
large2 1 6 5 fr_army_orient
# large2 1 6 6 junk
# large2 1 6 7 junk
large2 1 6 8 usa_army_02

large2 1 7 1 ru_army_01
large2 1 7 2 ru_army_02
large2 1 7 3 ru_army_03
large2 1 7 4 ru_army_04
large2 1 7 5 ru_army_05
large2 1 7 6 ru_army_06
large2 1 7 7 ru_army_07
large2 1 7 8 sb_army_01

large2 1 8 1 ru_army_08
large2 1 8 2 ru_army_09
large2 1 8 3 ru_army_10
large2 1 8 4 ru_army_11
large2 1 8 5 ru_army_12
large2 1 8 6 ru_army_cau
# large2 1 8 7 junk
large2 1 8 8 sb_army_02

small2 1 9 1 ge_xxx

small2 1 11 1 tu_xxx
small2 1 11 6 ah_xxx

# SHEET 1 (RIGHT)

large2 1 1 9 br_army_01
large2 1 1 10 br_army_02
large2 1 1 11 br_army_03
large2 1 1 12 br_army_bef

large1 1 1 13 bu_rp
large2 1 1 14 ge_rp
large1 1 1 15 tu_rp
large2 1 1 16 br_rp

large2 1 2 9 br_army_04
large2 1 2 10 br_army_05
large2 1 2 11 br_army_ne
large2 1 2 12 br_army_mef

large1 1 2 13 fr_rp
large1 1 2 14 ru_rp
large1 1 2 15 us_rp
large1 1 2 16 it_rp

large1 1 3 9 blockade_vps
large3 1 3 10 allied_mandatory_offensive french_mutiny
large3 1 3 11 ap_bid cp_bid
large3 1 3 12 cp_mandatory_offensive cp_done

large3 1 3 13 cp_missed_mo ap_missed_mo
large1 1 3 14 sud_army
large1 1 3 15 allied_rp
large1 1 3 16 ah_rp

large1 1 4 9 lusitania
large1 1 4 10 allied_war_status
large2 1 4 11 combined_war_status
large1 1 4 12 cp_war_status

# large2 1 4 13 junk
large1 1 4 14 11th_army
large1 1 4 15 mef_beachhead
large1 1 4 16 sinai_pipeline

large3 1 5 9 ap_control cp_control

large1 1 5 15 stavka_timidity
large1 1 5 16 haig

large1 1 6 16 prince_max

small2 1 9 13 it_xxx

small2 1 10 13 sn_xxx

small3 1 10 19 move attack
small2 1 10 20 game_turn

small2 1 11 11 ru_xxx
small1 1 12 19 russian_capitulation
small2 1 12 20 mn_xxx

# SHEET 2

large1 2 2 12 vp

large3 2 1 1 fort_destroyed fort_besieged
large3 2 3 1 cp_trench_1 cp_trench_2
large3 2 3 9 ap_trench_1 ap_trench_2
large3 2 3 16 ap_oos cp_oos

small2 2 9 1 sb_xxx
small2 2 9 2 bu_xxx
small2 2 9 5 ro_xxx
small2 2 9 8 br_xxx

small1 2 9 14 current_cp_russian_vp
small1 2 9 15 allied_action_1
small1 2 9 16 allied_action_2
small1 2 9 17 allied_action_3
small1 2 9 18 allied_action_4
small1 2 9 19 allied_action_5
small1 2 9 20 allied_action_6

small2 2 10 11 gr_xxx
small2 2 10 12 be_xxx
small1 2 10 14 tsar_fell_cp_russian_vp
small1 2 10 15 cp_action_1
small1 2 10 16 cp_action_2
small1 2 10 17 cp_action_3
small1 2 10 18 cp_action_4
small1 2 10 19 cp_action_5
small1 2 10 20 cp_action_6

small2 2 11 11 usa_xxx
small2 2 11 15 ru_xxx_cav
small2 2 11 16 czl_xxx
small2 2 11 17 pol_xxx
small1 2 11 19 trench_attempt

small2 2 12 1 fr_xxx
small2 2 12 6 bef_xxx
small2 2 12 7 aus_xxx
small2 2 12 8 cnd_xxx
small2 2 12 9 pt_xxx
small2 2 12 10 ana_xxx

small3 2 12 13 us_entry us_points
small1 2 12 18 influenza
