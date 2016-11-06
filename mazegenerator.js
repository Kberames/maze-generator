let mazeBody = document.getElementById('mazeBody');
let bodyHTML = "";
let selector = "";

// build random maze
let disp = newMaze(10,10);

//create innerHTML for table
for (var i = 0; i < disp.length; i++) {
    bodyHTML += "<tr>";
    for (var j = 0; j < disp[i].length; j++) {
        selector = i+"-"+j;
        bodyHTML += "<td id='"+selector+"'>&nbsp;</td>";
    }
    bodyHTML += "</tr>";
  }

mazeBody.innerHTML = bodyHTML;

//change style borders for td elements
for (var i = 0; i < disp.length; i++) {
  for (var j = 0; j < disp[i].length; j++) {
      selector = i+"-"+j;
      //let temp = document.getElementById(selector).style.borderTopColor;
      //console.log(temp);

      if (disp[i][j][0] == 0) {
        document.getElementById(selector).style.borderTopWidth ='2px';
        document.getElementById(selector).style.borderTopStyle ='solid';
        document.getElementById(selector).style.borderTopColor ='black';
        //document.getElementById(selector).style.border-top='2px solid black';
      }
      if (disp[i][j][1] == 0) {
        document.getElementById(selector).style.borderRightWidth ='2px';
        document.getElementById(selector).style.borderRightStyle ='solid';
        document.getElementById(selector).style.borderRightColor ='black';
        //document.getElementById(selector).style.border-right='2px solid black';
      }
      if (disp[i][j][2] == 0) {
        document.getElementById(selector).style.borderBottomWidth ='2px';
        document.getElementById(selector).style.borderBottomStyle ='solid';
        document.getElementById(selector).style.borderBottomColor ='black';
        //document.getElementById(selector).style.border-bottom='2px solid black';
      }
      if (disp[i][j][3] == 0) {
        document.getElementById(selector).style.borderLeftWidth ='2px';
        document.getElementById(selector).style.borderLeftStyle ='solid';
        document.getElementById(selector).style.borderLeftColor ='black';
        //document.getElementById(selector).style.border-left='2px solid black';
      }
    }
  }




function newMaze(x, y) {

    // Establish variables and starting grid
    var totalCells = x*y;
    var cells = new Array();
    var unvis = new Array();
    for (var i = 0; i < y; i++) {
        cells[i] = new Array();
        unvis[i] = new Array();
        for (var j = 0; j < x; j++) {
            cells[i][j] = [0,0,0,0];
            unvis[i][j] = true;
        }
    }

    // Set a random position to start from
    var currentCell = [Math.floor(Math.random()*y), Math.floor(Math.random()*x)];
    var path = [currentCell];
    unvis[currentCell[0]][currentCell[1]] = false;
    var visited = 1;

    // Loop through all available cell positions
    while (visited < totalCells) {
        // Determine neighboring cells
        var pot = [[currentCell[0]-1, currentCell[1], 0, 2],
                [currentCell[0], currentCell[1]+1, 1, 3],
                [currentCell[0]+1, currentCell[1], 2, 0],
                [currentCell[0], currentCell[1]-1, 3, 1]];
        var neighbors = new Array();

        // Determine if each neighboring cell is in game grid, and whether it has already been checked
        for (var l = 0; l < 4; l++) {
            if (pot[l][0] > -1 && pot[l][0] < y && pot[l][1] > -1 && pot[l][1] < x && unvis[pot[l][0]][pot[l][1]]) { neighbors.push(pot[l]); }
        }

        // If at least one active neighboring cell has been found
        if (neighbors.length) {
            // Choose one of the neighbors at random
            let next = neighbors[Math.floor(Math.random()*neighbors.length)];

            // Remove the wall between the current cell and the chosen neighboring cell
            cells[currentCell[0]][currentCell[1]][next[2]] = 1;
            cells[next[0]][next[1]][next[3]] = 1;

            // Mark the neighbor as visited, and set it as the current cell
            unvis[next[0]][next[1]] = false;
            visited++;
            currentCell = [next[0], next[1]];
            path.push(currentCell);
        }
        // Otherwise go back up a step and keep going
        else {
            currentCell = path.pop();
        }
    }
    return cells;
}
