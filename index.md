# Conway's Colorful Game of Life
## Generate new boards and click cells to change the game of life as it runs to make interest visual patterns. You can start from a clean board or a randomly generated one. Make changes while it runs or pause to make several changes at once. 
## Fun Fact: Each color counts as a different amount of neighbors. 

<iframe src = "https://aquarica.github.io/ProgrammingDigitalMedia/FinalProject/1/index.html" style="width:600px; height: 400px"></iframe>

### You can click a cell to change the color and different colors correspond to neighbor counts 
###  black = 0 (considered a dead cell)
###  white = 1
###  red = 2
###  green = 3
 ### blue = 4

###  Pressing R toggles between 2 sets of rules.
 ### At default the rules are as follows:
###  If a cell is dead and has a 3 count for neighbors, then cell will become a count of 4 neighbors, if it has 4 neighbors it becomes a count of 3, 5 and it becomes a count of 2, 6 and it becomes a count of 1.
###  If a cell has less than 4 count of neighbors or more than 10 then it dies.
### Otherwise the cell remains the same. 


### The second set of rules that can be toggled to uses a bit more randomization and the rules is as follows.
### If a cell is dead and has a count of 3 neighbors then it becomes a random count from 1-4.
### If a live cell has less than 2 neighbors or more than 3, then it dies.
### Living cells have a 1% chance of dying randomly every turn. 
### Beyond that the cell remains the same. 
