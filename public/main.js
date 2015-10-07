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

    // mark the square on the server
    var markRequest = new XMLHttpRequest();
    markRequest.open('GET', '/mark/'+id);
    markRequest.onload = function() {
        if (markRequest.status === 200) {
          console.log("marked position")
        }
        else {
          // request failed
        }
    };
    markRequest.send();
  }
};

// turn localstorage from string to javascript object
localStorageClicked = JSON.parse(localStorage.clicked);

// click all the items that we've clicked in previous sessions
localStorageClicked.forEach(function(id) {
  clickSquare(id);
});

// click all the items that others have clicked
var getRequest = new XMLHttpRequest();
getRequest.open('GET', '/get/');
getRequest.onload = function() {
    if (getRequest.status === 200) {
      boardString = getRequest.responseText;
      board = JSON.parse(boardString);
      Object.keys(board).forEach(function(id) {
        clickSquare(id, "#4C2B50", false)
      });
    }
    else {
      // request failed
    }
};
getRequest.send();

var clearServer = function() {
  var getRequest = new XMLHttpRequest();
  getRequest.open('GET', '/clear');
  getRequest.onload = function() {
      if (getRequest.status === 200) {
        boardString = getRequest.responseText;
        board = JSON.parse(boardString);
        Object.keys(board).forEach(function(id) {
          clickSquare(id, "#4C2B50", false)
        });
      }
      else {
        // request failed
      }
  };
  getRequest.send();
}
