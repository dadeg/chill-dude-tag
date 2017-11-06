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
  console.log('user connected', socket.id);
  
  socket.on('join', function () {
    console.log("user joined game", socket.id);
    io.emit('joined', socket.id + " joined the game!");
    game.addPlayer(socket.id);
    io.emit('board', game.getPlayerPositions());
  });
  socket.on('disconnect', function (msg) {
    console.log("user left game", socket.id);
    io.emit('left', socket.id + " left the game!");
    game.removePlayer(socket.id);
    io.emit('board', game.getPlayerPositions());
  });
  socket.on('move', function (msg) {
    console.log("user made a move", socket.id, msg.direction);
    game.addMove(socket.id, msg.direction);
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
