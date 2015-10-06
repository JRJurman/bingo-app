// setup localStorage for client side data
localStorage.clicked = localStorage.clicked || "[]";

// click function to change color of a bingo square
var clickSquare = function(id, color, reMark) {
  if (color == undefined) {
    color = "#3E6D57";
  }
  if (id == undefined) {
    id = event.target.id;
  }
  console.log(id);
  document.getElementById(id).style.backgroundColor = color;

  if (reMark != false) {
    // turn localstorage from string to javascript object
    localStorageClicked = JSON.parse(localStorage.clicked);

    // push our id into localstorage
    localStorageClicked.push(id);

    // save the id array back into localstorage as a string
    localStorage.clicked = JSON.stringify(localStorageClicked);
  }
};

// apply click function to all bingo squares
document.getElementsByClassName("bingo-square").click = clickSquare

// turn localstorage from string to javascript object
localStorageClicked = JSON.parse(localStorage.clicked);

// click all the items that we've clicked in previous sessions
localStorageClicked.forEach(function(id) {
  clickSquare(id);
});
