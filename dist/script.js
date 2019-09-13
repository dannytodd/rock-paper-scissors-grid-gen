var gridWidth = 5;
var colours = ["red", "blue", "green"];

function reset() {
  console.log("HELLO");
  for (const y of Array(gridWidth).keys()) {
    row = document.getElementById("table").rows[y].cells;
    for (const x of Array(gridWidth).keys()) {
      var cell = row.item(x);
      alert(cell);
      cell.style.backgroundColor = colours[Math.floor(Math.random()*items.length)]
    }
  }
}

function start() {
  console.log("START");
  for (const y of Array(gridWidth).keys()) {
    row = document.getElementById("table").rows[y].cells;
    for (const x of Array(gridWidth).keys()) {
      var cell = row.item(x);
      rockPaperScissors(cell, x, y);
    }
  }
}

function rockPaperScissors(cell, x, y) {
  var neighbours = [[x,y-1], [x+1,y], [x,y+1], [x-1,y]];
  var nColours = [];
  for (coord of neighbours) {
    if (0 <= coord[0] <= gridWidth && - <= coord[1] <= gridWidth) {
      colour = document.getElementById("table").rows[coord[1]].cells(coord[0]).style.backgroundColor;
      nColours.push(colour);
    }
  }
  cell.style.backgroundColor = mostCommon(nColours);
}

function mostCommon(arr) {
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
  return item;
}