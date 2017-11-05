function getRandomPosition(max) {
  return Math.floor(Math.random() * max);
}

module.exports = class Game {

  constructor(boardWidth, boardHeight) {
    if (!boardWidth || !boardHeight) { throw new Error("specify board size"); }
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.players = [];
    this.seeker = null;
  }
  
  getPlayerPositions() {
    return this.players;
  }

  addPlayer(name) {
    this.players.push({ name: name, x: getRandomPosition(this.boardWidth), y: getRandomPosition(this.boardHeight) });
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
    })
  }
}
