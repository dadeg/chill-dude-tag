import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3001');

function joinGame(cb) {
    
    console.log("Inside Join game");
    // socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('join');
    socket.on('board', board => cb(null, board));
}

export { joinGame };{ joinGame }
