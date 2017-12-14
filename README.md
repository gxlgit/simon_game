# Simon Game

### About
A hommage to the classic 80s game of Simon comes to life in this programmer expandable web version.

### How to play
The player clicks **'Start'** to start the game.  Simon then flashes a random color pattern, which the user must then repeat exactly in order to move to the next level.

If the user gets a **'high score'** then they will be added to their local **Hall of Fame**.

### How to modify game
The current script.js gives the game 5 different levels of difficulty.  Each level gets progressively harder by flashing a longer series of color flashes that the player must replicate. Level 1 starts with four flashes, Level 2 with five flashes, and so on.

Script.js can be easily customized to change the number and color of circles available to flash, as well as the number of flashes in each level.

Currently levels are set like this:
```let levels = [{level:1, flashes:4},
              {level:2, flashes:5},
              {level:3, flashes:6},
              {level:4, flashes:7},
              {level:5, flashes:8}]
 ```

Currently the number of circles and the color are set like this. The code will make a new circle for every color in the array.

```let colorsAvailable = ['red', 'blue', 'yellow', 'green']```

### Future fixes
This game is still a work on progress, and I'm still working on finessing the timing of flashes as well as dialogs, tweaking the look of the html, and I'm also looking for a  way to deactivate pseudo classes so that you can't hover over the circles unless it's the player's turn.



