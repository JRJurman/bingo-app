/*
	Server file
	Created by: Jesse Jurman
*/

var express = require('express')
var app = require('express')();
var http = require('http').Server(app);

var board = {
};

app.use(express.static(__dirname + '/public/'));

app.get("/mark/:position", function(req, res){
  if (board[req.params.position] == undefined) {
    board[req.params.position] = 0
  }

  board[req.params.position] += 1
  res.send("" + board[req.params.position]);
});

app.get("/get/:position", function(req, res){
  if (board[req.params.position] == undefined) {
    board[req.params.position] = 0
  }
  res.send("" + board[req.params.position]);
});

app.get("/get", function(req, res){
  res.send("" + JSON.stringify(board));
});

app.get("/clear", function(req, res){
  board = {};
  res.send("" + JSON.stringify(board));
});

http.listen(3000, function () {
  console.log('Example app listening');
});
