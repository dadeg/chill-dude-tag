var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const Game = require('./game');

io.origins('*:*');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

let game = new Game(10,10);

io.on('connection', function (socket) {
    console.log("USER CONNECTED");
  socket.on('join', function (msg) {
      console.log("In on join", msg.name);
    io.emit('joined', msg.name + " joined the game!");
    game.addPlayer(msg.name);
    console.log("GAme player", game.getPlayerPositions())
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