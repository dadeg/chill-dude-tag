function getRandomPosition(max) {
  return Math.floor(Math.random() * max);
}

class Game {
  players = [];
  seeker = null;
  boardWidth = null;
  boardHeight = null;

  constructor(boardWidth, boardHeight) {
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
  }
  
  getPlayerPositions() {
    return this.players;
  }

  addPlayer(player) {
    players.push({ user: player, x: getRandomPosition(this.boardWidth), y: getRandomPosition(this.boardHeight) });
  }

  removePlayer() {
    
  }
}
