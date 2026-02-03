let grid = document.getElementsByClassName("square");
let boardAray = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
let currentTurn = "X";
let gameIsOver = false;

for (const item of grid) {
  item.addEventListener("click", function () {
    if (gameIsOver) return;

    let value = item.getAttribute("value");
    let index = value - 1;
    if (boardAray[index] == "X" || boardAray[index] == "O") return;

    //   filling the value visually
    let squareContent = document.querySelector(`.square[value="${value}"]`);
    squareContent.innerHTML = currentTurn;
    // filling the value logically

    boardAray[index] = currentTurn;
    console.log(boardAray);
    evaluateWinner();
    if (currentTurn === "X") {
      currentTurn = "O";
    } else {
      currentTurn = "X";
    }
    document.getElementById("instruction").innerHTML = `${currentTurn} turn`;
  });
  function evaluateWinner() {
    if (
      // rows --------------------------------------------------
      (boardAray[0] == boardAray[1] && boardAray[1] == boardAray[2]) ||
      (boardAray[3] == boardAray[4] && boardAray[4] == boardAray[5]) ||
      (boardAray[6] == boardAray[7] && boardAray[7] == boardAray[8]) ||
      // columns --------------------------------------------------
      (boardAray[0] == boardAray[3] && boardAray[3] == boardAray[6]) ||
      (boardAray[1] == boardAray[4] && boardAray[4] == boardAray[7]) ||
      (boardAray[2] == boardAray[5] && boardAray[5] == boardAray[8]) ||
      // diagonal------------------------------------------
      (boardAray[0] == boardAray[4] && boardAray[4] == boardAray[8]) ||
      (boardAray[2] == boardAray[4] && boardAray[4] == boardAray[6])
    ) {
      var winner = currentTurn == "O" ? "O" : "X";
      alert(`${winner} wins`);
    }

    var isDraw = false;
    for (square of boardAray) {
      if (square == "X" || square == "O") {
        isDraw = true;
      } else {
        isDraw = false;
        break;
      }
    }
    if (isDraw) {
      gameIsOver = true;
      alert("Draw");
    }
  }
}

document.getElementById("reset-button").addEventListener("click", function () {
  reset();
});
function reset() {
  for (item of grid) {
    let value = item.getAttribute("value");
    let squareContent = document.querySelector(`.square[value="${value}"]`);
    squareContent.innerHTML = "";
    boardAray = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  }
  gameIsOver = false;
  currentTurn = "X";
  document.getElementById("instruction").innerHTML = `${currentTurn} turn`;
}
