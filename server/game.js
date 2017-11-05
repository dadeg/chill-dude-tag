function getRandomPosition(max) {
  return Math.floor(Math.random() * max);
}

function filterOutTaggedPlayers(players) {
  const seekers = players.filter(player => player.isSeeker);
  return players.filter(player => {
    if (player.isSeeker) {
      return true;
    }
    for (let i = 0; i < seekers.length; i++) {
      const seeker = seekers[i];
      if (seeker.x === player.x && seeker.y === player.y) {
        return false;
      }
    }
    return true;
  });
}

module.exports = class Game {

  constructor(boardWidth, boardHeight) {
    if (!boardWidth || !boardHeight) { throw new Error("specify board size"); }
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.players = [];
  }
  
  getPlayerPositions() {
    return this.players;
  }

  addPlayer(name) {
    let shouldBeSeeker = false;
    if (!this.players.find(player => player.isSeeker)) {
      shouldBeSeeker = true;
    }
    
    const player = {
      name: name,
      x: getRandomPosition(this.boardWidth),
      y: getRandomPosition(this.boardHeight),
      isSeeker: shouldBeSeeker
    }
    this.players.push(player);
  }

  removePlayer(name) {
    this.players = this.players.filter(player => name !== player.name);
  }

  addMove(name, direction) {
    this.players = this.players.map(player => {
      if (player.name === name) {
        if (direction === "up" && player.y < this.boardHeight) {
          player.y++;
        }
        if (direction === "down" && player.y > 0) {
          player.y--;
        }
        if (direction === "left" && player.x > 0) {
          player.x--;
        }
        if (direction === "right" && player.x < this.boardWidth) {
          player.x++;
        }
      }
      
      return player;
    });
    this.players = filterOutTaggedPlayers(this.players);
  }
}
