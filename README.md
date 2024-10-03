This is a simple bash script to convert ".srt" files to ".kdenlivetitle" files for use in Kdenlive.  

## How it works:
The script uses a **".kdenlivetitle"** template file to create multiple title files containing the subtitle text from an **".srt"** file.  
  
The resulting title files will have the same parameters as the template (Font, Size, Color, Position ...).  
  
Some titles have **"_"** in the name. these are blanks used for padding in the timeline so that the titles align with the subtitles, but can be removed later.  

## Features:
#### Change font color
You can input hex colors to change font color without modifing your template file.
- Empty: use template color
- Color 1: (#RRGGBB) changes font to color 1
- Color 2: (#RRGGBB) uses both colors for a gradient

#### Change vertical position
You can change the vertical position of the subtitles. y is the distance in pixels from the top.
- Empty: use same vertical position as template
- y=0: Top
- y=project height: Bottom

#### Max characters per line
You can set the maximum number of characters per line for long subtitles.
- Empty: Keep same number of lines as srt
- 0: Unlimited

## How to use:
- Download [kdensubs.sh](./kdensubs.sh)
- Add execute permission with ```chmod +x```
- Put the subtitle and template files in the same directory as the script
- Run the script
- Drag and drop the resulting folder to Kdenlive bin
- Sort by name
- drag and drop titles into the timeline
  
> you can optionally remove blank titles by sorting by date and removing titles with "_" in the name.

