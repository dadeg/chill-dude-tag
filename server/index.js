var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const Game = require('./game');

app.all('/', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

let game = new Game(10,10);

io.on('connection', function (socket) {
  socket.on('join', function (msg) {
    io.emit('joined', msg.name + " joined the game!");
    game.addPlayer(msg.name);
    io.emit('board', game.getPlayerPositions());
  });
  socket.on('leave', function (msg) {
    io.emit('left', msg.name + " left the game!");
    game.removePlayer(msg.name);
    io.emit('board', game.getPlayerPositions());
  });
  socket.on('move', function (msg) {
    game.addMove(msg.name, msg.direction);
    io.emit('board', game.getPlayerPositions());
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});
