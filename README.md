# Weave Playset (Lord Joe's Markdown Format)

## Overview
Weave is a 21st century storytelling platform for everyone. You can find more information and purchase a copy of the game [here](https://weave.game/)

This is the playset template used by creator Lord Joe, author of the Iron & Salt playset for Weave. Joe likes the Markdown format for its portability and convertibility. You'll find a handful of utilities to aid you in playtesting in this template. I hope you get as much use out of this as I did. It definitely made writing Iron & Salt easier for me.

## What is Markdown?
Markdown is a lightweight markup language with plain text formatting syntax. It is designed so that it can be converted to many other formats, such as the Weave playset format. It is simple to read and very easy to write in. We chose markdown because we want writers to work in the editor of their choice, and not be initially encumbered with yet another app to learn.

You can learn more about markdown at:
- [Github: Basic Writing and Formatting](https://help.github.com/articles/basic-writing-and-formatting-syntax)
- [The Markdown Guide](https://www.markdownguide.org/)
- [Daring Fireball](https://daringfireball.net/projects/markdown/).

## Card Stats
A card has a number of qualities:
- 3 Backstories
- 4 Talents
- 4 Flaws
- 1 Signature Move
- 2 Items
- 2 NPCs
- 2 Enemies
- 2 Plot Twists
- 2 Location
- 1 Theme
- 1 Boss

Under each quality, there can be different types of traits:
- Title
- Description
- Suits - The suit bonus the player, enemy, or boss gets from this quality. Applies to Backstories
- Mechanic - The in-game effect of using this quality. Applies to Talents, Flaws, Signature Moves, and Items
- Enhancement - A secondary possible in-game effect of using this quality.  Applies to Talents, Flaws, Signature Moves, and Items
- Trigger - The list of suits or other conditions that will trigger the Enhancement for this quality.  Applies to Talents, Flaws, Signature Moves, and Items
- Range - The range of effect of this quality. Applies to  Applies to Talents, Signature Moves, and Items

## How do I Start?
First, download the set! You can do that by clicking the big button in the upper-right of this page that says `Clone or download` and clicking on `Download ZIP`. Then you get to writing! Personally, I'd recommend you get familiar with Git, create an account on Github.com, and click the `Use this template` button instead. If those words didn't mean anything to you, you can either ignore them and write with your favorite text editor or learn more at [GitHub Guides](https://guides.github.com/).

After that, you should take a look at these files to get an idea how to use the templates.
- index.md
- glossary.md
- notes/outline.csv
- cards/Dawn/card.md
- cards/Dawn/boss.md
- cards/Dawn/Enemies/Enemy1.md
- cards/Dawn/Enemies/Enemy2.md
- cards/Dawn/NPCs/NPC1.md
- cards/Dawn/NPCs/NPC2.md

Additionally if you are looking for some great editors to use that really take advantage of markdown, here are some that we suggest:
- [Atom](https://atom.io) \(free, universal. Lord Joe really likes this one\)
- [Visual Studio Code](https://code.visualstudio.com) \(free, universal\)
- [iA Writer](http://iawriter.com) \(paid, universal\)

Personally, I recommend starting by filling in the `notes/outline.csv` file with as many ideas as you have for qualities in your set, then copying those ideas into the card files and fleshing them out. The `notes/outline.csv` file will help you keep your total progress all in one place. You can fill it in with whatever you like, but I prefer to keep it to just the quality titles and create additional files in the notes folder for details until I'm ready to move things into the actual cards.

## Using the Builder Scripts
So you're most of the way through writing your playset and you want to try playtesting it. I've included a handful of scripts that could be useful for you in the `builders` folder:
- `character-builder.bat` - Runs the Character Builder script
- `character-builder.js` - The Character Builder script. Generates a Weave Level 10 Character with 1 Item by randomly picking cards and qualities.
- `character-template-2019.bat` - Runs the Character Template Generator script
- `character-template-2019.js` - Generates a character template (series of text files) that you can send to your players for them to build a character out of. It's as if they scanned the cards and got their choices from the Weave app itself.
- `playset-dumper.bat` - Runs the Playset Dumper script
- `playset-dumper.js` - Dumps your entire playset to a YAML file for easy importing into a secret project Lord Joe is working on.
- `storybase-builder.bat` - Runs the Storybase Builder script
- `storybase-builder.js` - The Storybase Builder script. Randomly selects a Theme, Location, and Boss for an episode of Weave play.

If your computer doesn't recognize the `.bat` files above, then you're probably on a Mac or Linux computer. In that case, just run the command written in the `.bat` file in your command line tool.

### Caveats
For the scripts in the builders folder to work, you have to strictly adhere to the layout of the cards in this template. That means making sure your attribute titles have the right number of hash tags to denote the beginning of the section (\# Talents), the title of an quality (\## Silver Blood), and the title of an attribute on that quality (\### Trigger), and making sure that you use dividers properly (this guy:)

\------------------------------

### Prerequisites
There are a few things you have to do in order to run these scripts
- Install [Node](https://nodejs.org/)
- Open this folder in your command-line program and run the `npm install` command

### Editing the Scripts
Now, most of these scripts run fine on their own without any editing, but there are is one that you will have to make edits to.

#### Character Template Generator
The `character-template-2019.js` includes space for you, as the storyteller, to make decisions on what cards your players draw. About 30 lines into the file, you'll see a section starting with `var characterName = "Quincy"`. That is the section where you make edits. Replace "Quincy" with the player's character name, replace "Brooks" on the next line with the character's Core Suit, and replace "3" on the next line with whatever level you would like the character to start at (1-11).

After that, you have to make card selections. After the line `var cardsPicked = [` are a whole list of "Dawn"s. Replace those with the cards your player will pick as they build their character and delete the rest. The list of possible cards is at the top of the `character-template-2019.js` file. Next to each card under `var cardsPicked = [` is also a comment telling you what level that card is picked at and what quality type (Backstory, Talent, Flaw, etc) the player picks from that card. **The first four saying "1" is not a mistake. Players pick four cards at Level 1.**

After you make your edits and run the `character-template-2019.bat` script (or run the command `node character-template-2019.js` in your command line tool if you're not on Windows), the script will create a folder for the character filled with text files that you can send to your player. The title of each text file will have the order the card was drawn in, then the number and type of qualities for the character to pick. For instance, "3 - 1 Flaw.txt" indicates that this card was picked 3rd and that the player mush pick 1 Flaw from the choices in the file. Also included in the folder is `character.txt`, which is a base character sheet for the player to copy their choices in to. The sheet has the character's name and core suit as well as all the cards they picked (you may want to delete some if you didn't delete them from `character-template.js` before running it).

## Questions?
If you have any questions about how to use this template or the builder scripts, you can reach me on Discord @ LordJoe#6741.
