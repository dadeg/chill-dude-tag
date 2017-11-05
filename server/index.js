var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const Game = require('./game');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

let game = new Game(10,10);

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

// ===== Test code to get REACT hookedup
// const io = require('socket.io')();
//
// io.on('connection', (client) => {
//     client.on('subscribeToTimer', (interval) => {
//         console.log('client is subscribing to timer with interval ', interval);
//         setInterval(() => {
//             client.emit('timer', new Date());
//         }, interval);
//     });
// });
//
// const port = 8000;
// io.listen(port);
// console.log('listening on port ', port);