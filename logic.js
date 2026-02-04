// Game State
const gameState = {
  board: Array(9).fill(null),
  currentPlayer: "X",
  gameOver: false,
  xWins: 0,
  oWins: 0,
  draws: 0,
};

// Winning Combinations
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Get DOM Elements
const squares = document.querySelectorAll(".square");
const instructionEl = document.getElementById("instruction");
const resetBtn = document.getElementById("reset-button");
const statusEl = document.getElementById("status");
const xWinsEl = document.getElementById("x-wins");
const oWinsEl = document.getElementById("o-wins");
const drawsEl = document.getElementById("draws");

// Load stats from localStorage
function loadStats() {
  const saved = localStorage.getItem("tictactoeStats");
  if (saved) {
    const stats = JSON.parse(saved);
    gameState.xWins = stats.xWins || 0;
    gameState.oWins = stats.oWins || 0;
    gameState.draws = stats.draws || 0;
    updateStatsDisplay();
  }
}

// Save stats to localStorage
function saveStats() {
  localStorage.setItem(
    "tictactoeStats",
    JSON.stringify({
      xWins: gameState.xWins,
      oWins: gameState.oWins,
      draws: gameState.draws,
    }),
  );
}

// Update stats display
function updateStatsDisplay() {
  xWinsEl.textContent = gameState.xWins;
  oWinsEl.textContent = gameState.oWins;
  drawsEl.textContent = gameState.draws;
}

// Check for winner
function checkWinner() {
  for (let combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (
      gameState.board[a] &&
      gameState.board[a] === gameState.board[b] &&
      gameState.board[a] === gameState.board[c]
    ) {
      return gameState.board[a];
    }
  }
  return null;
}

// Check for draw
function checkDraw() {
  return gameState.board.every((cell) => cell !== null);
}

// Update instruction
function updateInstruction() {
  if (gameState.gameOver) {
    return;
  }
  instructionEl.textContent = `${gameState.currentPlayer}'s Turn`;
}

// Handle square click
function handleSquareClick(e) {
  const square = e.target;
  const index = parseInt(square.dataset.index);

  // Check if game is over or square is occupied
  if (gameState.gameOver || gameState.board[index] !== null) {
    return;
  }

  // Update board
  gameState.board[index] = gameState.currentPlayer;

  // Update UI
  square.textContent = gameState.currentPlayer;
  square.classList.add("played");
  square.classList.add(gameState.currentPlayer.toLowerCase());
  square.classList.add("disabled");

  // Check for winner
  const winner = checkWinner();
  if (winner) {
    gameState.gameOver = true;
    instructionEl.textContent = `🎉 ${winner} Wins!`;
    statusEl.textContent = `${winner} is the Champion!`;
    instructionEl.classList.add("winner-animation");

    if (winner === "X") {
      gameState.xWins++;
    } else {
      gameState.oWins++;
    }
    saveStats();
    updateStatsDisplay();
    return;
  }

  // Check for draw
  if (checkDraw()) {
    gameState.gameOver = true;
    instructionEl.textContent = "🤝 It's a Draw!";
    statusEl.textContent = "Both players played well!";
    gameState.draws++;
    saveStats();
    updateStatsDisplay();
    return;
  }

  // Switch player
  gameState.currentPlayer = gameState.currentPlayer === "X" ? "O" : "X";
  updateInstruction();
}

// Reset game
function resetGame() {
  gameState.board = Array(9).fill(null);
  gameState.currentPlayer = "X";
  gameState.gameOver = false;
  statusEl.textContent = "";
  instructionEl.classList.remove("winner-animation");

  squares.forEach((square) => {
    square.textContent = "";
    square.classList.remove("played", "x", "o", "disabled");
  });

  updateInstruction();
}

// Event Listeners
squares.forEach((square) => {
  square.addEventListener("click", handleSquareClick);
});

resetBtn.addEventListener("click", resetGame);

// Initialize
loadStats();
updateInstruction();
