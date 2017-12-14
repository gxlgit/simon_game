# Simon Game
A hommage to the classic 80s game of Simon comes to life in this expandable web version.

The player clicks 'Start' to start the game.  Simon then flashes a random color pattern, which the user must then repeat exactly in order to move to the next level.

The current script.js gives the game 5 different levels of difficulty.  Each level gets progressively harder by flashing a longer series of color flashes that the player must replicate. Level 1 starts with four flashes, Level 2 with five flashes, and so on.

Script.js can be easily customized to change the number and color of circles available to flash, as well as the number of flashes in each level.

Currently levels are set like this:
```let levels = [{level:1, flashes:4},
              {level:2, flashes:5},
              {level:3, flashes:6},
              {level:4, flashes:7},
              {level:5, flashes:8}]
 ```

Currently the number of circles and the color are set like this.
```let colorsAvailable = ['red', 'blue', 'yellow', 'green']```

This game is still a work on progress. And I'm working on finessing the timing of flashes as well as dialogs.  I'm also looking for a better way to deactivate pseudo classes.



