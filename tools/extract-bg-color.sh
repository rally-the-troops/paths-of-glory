for F in pieces/*.png
do
    B=$(basename $F .png)
    echo $(convert -format "#%[hex:u.p{0,0}]\n" $F info:) $B
done
