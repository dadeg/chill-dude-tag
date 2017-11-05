import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3001');

function joinGame(cb) {
    const playerObj = {
        name: Math.random()
    }
    console.log("Inside Join game");
    // socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('join', playerObj);
    socket.on('board', board => cb(null, board));
}

export { joinGame };{ joinGame }