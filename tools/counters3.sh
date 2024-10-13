mkdir -p out

function army() {
	A=$(ls out_large/${1}_army_*.png | grep -v back)
	B=$(ls out_large/${1}_army_*.png | grep back)
	montage -mode concatenate -tile x1 $A tmp1.png
	montage -mode concatenate -tile x1 $B tmp2.png
	montage -mode concatenate -tile 1x tmp1.png tmp2.png out/army_${1}.png
}

function army2() {
	OUT=$1
	shift
	A=
	B=
	for XXX in $*
	do
		A="$A out_large/${XXX}.png"
		B="$B out_large/${XXX}_back.png"
	done
	montage -mode concatenate -tile x2 $A $B out/army_$OUT.png
}

function corps() {
	OUT=$1
	shift
	A=
	B=
	for XXX in $*
	do
		A="$A out_small/${XXX}.png"
		B="$B out_small/${XXX}_back.png"
	done
	montage -mode concatenate -tile x2 $A $B out/corps_$OUT.png
}

army ah
army be
army br
army fr
army ge
army it
army ru
army sb
army usa
army2 tu tu_army_aol tu_army_yld

corps br ana_xxx aus_xxx bef_xxx br_xxx cnd_xxx pt_xxx
corps ah ah_xxx
corps be be_xxx
corps bu bu_xxx
corps czl czl_xxx
corps fr fr_xxx
corps ge ge_xxx
corps gr gr_xxx
corps it it_xxx
corps mn mn_xxx
corps pol pol_xxx
corps ro ro_xxx
corps ru ru_xxx ru_xxx_cav
corps sb sb_xxx
corps tu tu_xxx sn_xxx
corps usa usa_xxx

cp \
	out_large/allied_rp.png \
	out_large/ah_rp.png \
	out_large/br_rp.png \
	out_large/bu_rp.png \
	out_large/fr_rp.png \
	out_large/ge_rp.png \
	out_large/it_rp.png \
	out_large/ru_rp.png \
	out_large/tu_rp.png \
	out_large/us_rp.png \
	out_large/br_rp_back.png \
	out_large/ge_rp_back.png \
	out_large/ap_missed_mo.png \
	out_large/cp_missed_mo.png \
	out_large/11th_army.png \
	out_large/sud_army.png \
	out_large/haig.png \
	out_large/mef_beachhead.png \
	out_large/prince_max.png \
	out_large/sinai_pipeline.png \
	out_large/stavka_timidity.png \
	out_large/ap_oos.png \
	out_large/ap_control.png \
	out

cp \
	out_large/allied_war_status.png \
	out_large/allied_mandatory_offensive.png \
	out_large/french_mutiny.png \
	out_large/ap_trench_1.png \
	out_large/ap_trench_2.png \
	out_large/blockade_vps.png \
	out_large/lusitania.png \
	out_large/ap_bid.png \
	out_large/cp_war_status.png \
	out_large/cp_mandatory_offensive.png \
	out_large/cp_done.png \
	out_large/cp_bid.png \
	out_large/combined_war_status.png \
	out_large/combined_war_status_back.png \
	out

montage -mode concatenate -tile 6x \
	out_small/allied_action_1.png \
	out_small/allied_action_2.png \
	out_small/allied_action_3.png \
	out_small/allied_action_4.png \
	out_small/allied_action_5.png \
	out_small/allied_action_6.png \
	out_small/cp_action_1.png \
	out_small/cp_action_2.png \
	out_small/cp_action_3.png \
	out_small/cp_action_4.png \
	out_small/cp_action_5.png \
	out_small/cp_action_6.png \
	out/action.png

cp out_large/vp.png out

cp out_large/cp_control.png out
cp out_large/cp_oos.png out
cp out_large/cp_trench_1.png out
cp out_large/cp_trench_2.png out
cp out_large/fort_destroyed.png out
cp out_large/fort_besieged.png out

cp out_small/current_cp_russian_vp.png out
cp out_small/influenza.png out
cp out_small/trench_attempt.png out
cp out_small/tsar_fell_cp_russian_vp.png out
cp out_small/attack.png out
cp out_small/russian_capitulation.png out
cp out_small/game_turn.png out
cp out_small/game_turn_back.png out
cp out_small/move.png out
cp out_small/us_entry.png out
cp out_small/us_points.png out
