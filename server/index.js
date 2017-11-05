var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// let game = new Game();

io.on('connection', function (socket) {
  socket.on('join', function (msg) {
    io.emit('joined', msg.user + " joined the game!");
    game.addPlayer(msg.user);
    io.emit('board', game.getBoard());
  });
  socket.on('leave', function (msg) {
    io.emit('left', msg.user + " left the game!");
    game.removePlayer(msg.user);
    io.emit('board', game.getBoard());
  });
  socket.on('move', function (msg) {
    game.addMove(msg.user, msg.direction);

    io.emit('board', game.getBoard());
  });
});

http.listen(3001, function () {
  console.log('listening on *:3001');
});
