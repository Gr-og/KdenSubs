#!/bin/bash

find_file(){
	n_files=$(ls *.$1 2>/dev/null | wc -l)

	if   [ "$n_files" == 0 ]; then 
		[ "$1" = "srt" ] && echo "No srt file found in current directory" || echo "No template file found in current directory"
		read -p "press Enter to exit"
		exit 1
	elif [ "$n_files" == 1 ]; then
		file=$(ls *.$1)
		[ "$1" = "srt" ] && echo "Converting \""$file"\" ..." || echo "Using \""$file"\" as template"
	else
		[ "$1" = "srt" ] && echo $'\n'"Multiple srt files found:" || echo $'\n'"Multiple template files found:"
		files=$(ls *.$1) ; COLUMNS=1 ; IFS=$'\n'
		select file in $files; do
			if [[ "$REPLY" == [1-$n_files] ]]; then
				[ $1 = "srt" ] && echo "Converting \""$file"\" ..." || echo "Using \""$file"\" as Template"
				break
			else
				echo "Invalid input"
			fi
		done
	fi
}

fps(){
	while : ; do
		read -p $"frame rate:"$'\n' frate
		[ -z "$frate" ] && frate=60 && echo -en "\033[1A\033[2K" && echo 'using 60 fps'
		[[ "$frate" =~ ^[0-9]*[1-9][0-9]*(\.[0-9]+)?$ ]] && break
		echo 'Invalid input'
	done
}

color(){
	echo
	echo "Change font color?"
	echo "(Empty: No  /  1 Color: font color  /  2 Colors: gradient)"
		while : ; do
			read -p "Color 1 (hex): #" color_1
			[[ $color_1 =~ ^[0-9|a-f]{6}$ || -z $color_1 ]] && break
			echo 'Invalid input'
		done
	if [[ -n $color_1 ]]; then
		while : ; do
			read -p "Color 2 (hex): #" color_2
			[[ $color_2 =~ ^[0-9|a-f]{6}$ || -z $color_2 ]] && break
			echo 'Invalid input'
		done
		[[ -z $color_2 ]] && color_1=$(printf "%d,%d,%d\n" 0x${color_1:0:2} 0x${color_1:2:2} 0x${color_1:4:2})
	fi
}

break_line(){
	sub_count=${#sub[i]}
	if [ $(bc <<< "$sub_count > $max_char") -eq 1 ]; then
	sub[i]=$(echo "${sub[i]}" | sed -e "s/.\{,$max_char\}[^ ]*/&\\\\n/g" -e "s/\\\\n /\\\\n/g" -e "s/\\\\n$//")
	break_count=$(echo "${sub[i]}" | grep -o '\\n' | wc -l)
	new_box_height=$(bc <<< "$box_height+$box_height*$break_count")
	new_y=$(bc <<< "$y-$box_height*$break_count")
	else
	break_count=0
	fi
}

convert(){
	mkdir -p "$folder"
	readarray -t frm < <( (sed -n '2~4p' ./"$srt") )
	readarray -t sub < <( (sed -n '3~4p' ./"$srt") )
	n=1
	w=$(bc<<<"length(${#sub[@]}*2)")
	project_width=$(grep -o ' width="[^"]*"' "$template" | tr -d ' width=')
	box_height=$(grep -o 'box-height="[^"]*"' "$template" | tr -d 'boxheight="-')
	y=$(grep -o 'y="[^"]*">' "$template" | tr -d 'y=">')

	for i in "${!frm[@]}"; do
		b=$(date -d "${frm[i]:0:12}" "+%S.%3N")
		e=$(date -d "${frm[i]:17:12}" "+%S.%3N")
		ee=$(date -d "${frm[i-1]:17:12}" "+%S.%3N")

		if [ "$i" -eq 0 ]; then ee=0; fi
		if [ "$(bc<<<"$b<$ee && $i!=0")" -eq 1 ]; then b="$(bc<<<"$b+60")"; fi
		if [ "$(bc<<<"$e<$b")" -eq 1 ]; then e="$(bc<<<"$e+60")"; fi

		blank="$(bc <<< "($b*$frate+0.5)/1-($ee*$frate+0.5)/1")"
		duration="$(bc <<< "($e*$frate+0.5)/1-($b*$frate+0.5)/1")"
		[[ -n $max_char ]] && break_line || break_count=0

		if [ "$blank" -gt 0 ]; then	
			sed \
			-e "s/duration=\"[^\"]*\"/duration=\""$blank"\"/" \
			-e "2,7d" \
			./"$template" > ./"$folder"/"$(printf "%0*d" "$w" "$n")"_.kdenlivetitle
			((n++))
		fi
		
		if [ -z $color_1 ]; then
			sed \
			-e "s/duration=\"[^\"]*\"/duration=\""$duration"\"/" \
			-e "s/<position x=\"[^\"]*\"/<position x=\"0\"/" \
			-e "s/content alignment=\".\"/content alignment=\"4\"/" \
			-e "s/box-width=\"[^\"]*\"/box-width="$project_width"/" \
			-e "s/>.*<\/content>$/>${sub[i]}<\/content>/" \
			./"$template" > ./"$folder"/"$(printf "%0*d" "$w" "$n")".kdenlivetitle
		elif [ -z $color_2 ]; then
			sed \
			-e "s/duration=\"[^\"]*\"/duration=\""$duration"\"/" \
			-e "s/<position x=\"[^\"]*\"/<position x=\"0\"/" \
			-e "s/content alignment=\".\"/content alignment=\"4\"/" \
			-e "s/box-width=\"[^\"]*\"/box-width="$project_width"/" \
			-e "s/>.*<\/content>$/>${sub[i]}<\/content>/" \
			-e "s/font-color=\"[^\"]*\"/font-color=\""$color_1",255\"/" \
			-e "s/\( gradient=\"[^\"]*\"\)\+ letter/ letter/"\
			./"$template" > ./"$folder"/"$(printf "%0*d" "$w" "$n")".kdenlivetitle
		else
			sed \
			-e "s/duration=\"[^\"]*\"/duration=\""$duration"\"/" \
			-e "s/<position x=\"[^\"]*\"/<position x=\"0\"/" \
			-e "s/content alignment=\".\"/content alignment=\"4\"/" \
			-e "s/box-width=\"[^\"]*\"/box-width="$project_width"/" \
			-e "s/>.*<\/content>$/>${sub[i]}<\/content>/" \
			-e "s/\( gradient=\"[^\"]*\"\)\? letter/ gradient=\"#ff$color_1;#ff$color_2;0;100;90\" letter/"\
			./"$template" > ./"$folder"/"$(printf "%0*d" "$w" "$n")".kdenlivetitle
		fi
			[ "$break_count" -gt 0 ] && sed -i -e "s/y=\"[^\"]*\">/y=\""$new_y"\">/" -e "s/box-height=\"[^\"]*\"/box-height=\""$new_box_height"\"/" ./"$folder"/"$(printf "%0*d" "$w" "$n")".kdenlivetitle
			((n++))
	done
	sleep 1
	touch ./"$folder"/*_*
	echo "Titles in "$PWD"/\""$folder"\""
}


find_file srt
srt="$file"
find_file kdenlivetitle
template="$file"
folder="${srt::-4}_Titles"

echo
fps
color
echo
while : ; do
	read -p 'Set max characters per line ? (Empty: None)'$'\n''max characters:' max_char
	[[ $max_char =~ ^[[:digit:]]*$ ]] && break
	echo 'Invalid input'
done
echo

echo "..."
convert
read -p "press Enter to exit"