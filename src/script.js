var colours = ["red", "blue", "green", "yellow", "purple", "orange"];
var threshold = 4;
var gridSize;
var numColours;
var preprocessing;

var tableArray = new Array();
var processedTableArray = new Array();

document.addEventListener('DOMContentLoaded', (event) => {
})

function reset() {
  console.log("RESET");

  gridSize = parseInt(document.getElementById("gridSize").value);
  numColours = parseInt(document.getElementById("numColours").value);
  preprocessing = document.getElementById("preprocessing").value;

  createTable();

  colours = colours.slice(0, numColours+1);
  console.log(colours);
  for (const y of Array(gridSize).keys()) {
    row = document.getElementById("table").rows[y].cells;
    for (const x of Array(gridSize).keys()) {
      var cell = row.item(x);
      tableArray.push(cell);
      cell.style.backgroundColor = colours[Math.floor(Math.random()*numColours)];
    }
  }
  processedTableArray = preprocessTable(tableArray);
}

function createTable() {
  console.log('Creating table with size: ' + gridSize);

  table = document.getElementById("table");
  table.innerHTML = "";
  for (i=0;i<gridSize;i++) {
    row = table.insertRow(i);
    for (j=0;j<gridSize;j++) {
      row.insertCell(j);
    }
  }
}

function preprocessTable(table) {
  if (preprocessing == "none"){
  }
  else if (preprocessing == "shuffle")
    table = shuffle(table);
  else if (preprocessing == "reverse"){
  }

  return table;
}

function start() {
  console.log("START");
  //step(processedTableArray);
  for (i=0; i<100; i++) {
    setTimeout(step, 2000)
  }
}

function step() {
  for (cell of processedTableArray) {
    rockPaperScissors(cell, cell.cellIndex, cell.parentNode.rowIndex)
  }

  //for (const y of Array(gridSize).keys()) {
  //  row = document.getElementById("table").rows[y].cells;
  //  for (const x of Array(gridSize).keys()) {
  //    var cell = row.item(x);
  //    rockPaperScissors(cell, cell.cellIndex, cell.parentNode.rowIndex);
  //  }
  //}
}

function rockPaperScissors(cell, x, y) {
  var neighbours = [[x,y-1], [x+1,y], [x,y+1], [x-1,y], [x-1,y-1], [x-1,y+1], [x+1,y-1], [x+1,y+1]];
  var nColours = [];
  for (coord of neighbours) {
    if (0 <= coord[0] && coord[0] <= gridSize - 1 && 0 <= coord[1] && coord[1] <= gridSize - 1 || 1) {
      //console.log("x = " + coord[0] + " y = " + coord[1]);
      colour = document.getElementById("table").rows[checkWrapAround(coord[1])].cells[checkWrapAround(coord[0])].style.backgroundColor;
      nColours.push(colour);
    }
  }
  mostCommonColour = mostCommon(nColours, cell.style.backgroundColor);
  if (Math.random() > 0.25)
    mostCommonColour = nColours[Math.floor(Math.random() * nColours.length)];

  if (cell.style.backgroundColor != mostCommonColour)
    cell.style.backgroundColor = mostCommonColour
}

function checkWrapAround(x) {
    if (x == -1)
      return x + gridSize;
    else if (x == gridSize)
      return 0;
    else
      return x;
}

function mostCommon(arr, backup) {
  n = [...new Set(arr)]
  var mf = 1;
  var m = 0;
  var item;
  for (var i=0; i<arr.length; i++) {
    for (var j=i; j<arr.length; j++) {
      if (arr[i] == arr[j])
        m++;
      if (mf<m) {
        mf=m;
        item = arr[i];
      }
    }
    m=0;
  }
  if (mf >= threshold)
    return item;
  else
    return backup;
}


// Processing Methods
function shuffle2(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.fl,oor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
