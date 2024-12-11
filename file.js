let tog = 1; 
let gameState = Array(9).fill(""); 
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function winner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
            gameState[a] !== "" &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        ) {
            highlightWinningCombination(combination);
            return gameState[a]; 
        }
    }
    return null; 
}

function highlightWinningCombination(combination) {
    combination.forEach(index => {
        document.getElementById(index).classList.add("highlight"); 
    });
}

function resetGame() {
    gameState.fill(""); 
    document.querySelectorAll(".box").forEach(box => {
        box.innerHTML = "";
        box.classList.remove("highlight"); 
    });
    tog = 1; 
    document.getElementById("message").textContent = ""; 
}

function checkDraw() {
    return gameState.every(state => state !== "") && !winner();
}

const boxes = document.querySelectorAll(".box");
boxes.forEach((box, index) => {
    box.addEventListener("click", e => {
        if (gameState[index] === "") {
            const symbol = tog === 1 ? "X" : "O";
            e.target.innerHTML = `<i class="fa-solid fa-${symbol === "X" ? "check" : "xmark"}"></i>`;
            gameState[index] = symbol;
            tog = 1 - tog; 

            const winnerSymbol = winner();
            if (winnerSymbol) {
                document.getElementById("message").textContent = `${winnerSymbol} Wins!`;
                setTimeout(resetGame, 2000); 
                return;
            }

            if (checkDraw()) {
                document.getElementById("message").textContent = "It's a Draw!";
                setTimeout(resetGame, 2000); 
            }
        }
    });
});
