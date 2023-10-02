document.addEventListener("DOMContentLoaded", function () {
    const grid = document.getElementById("grid");
    const message = document.getElementById("message");
    const resetButton = document.getElementById("reset");

    let currentPlayer = "X";
    let computerPlayer = "O"; // The computer's player
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameOver = false;

    // Create the game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.className = "grid-cell";
        cell.dataset.cellIndex = i;
        cell.addEventListener("click", handleCellClick);
        grid.appendChild(cell);
    }

    // Function to handle a cell click
    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute("data-cell-index"));

        if (board[cellIndex] === "" && !gameOver) {
            board[cellIndex] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add("occupied");

            if (checkWinner(currentPlayer)) {
                message.textContent = `${currentPlayer} wins!`;
                gameOver = true;
            } else if (board.indexOf("") === -1) {
                message.textContent = "It's a draw!";
                gameOver = true;
            } else {
                currentPlayer = "X"; // Switch back to human player
                message.textContent = `Player ${currentPlayer}'s turn`;
                setTimeout(computerMove, 1000); // Delay computer move for better UX
            }
        }
    }

    // Function to make the computer's move
    function computerMove() {
        const emptyCells = board.reduce((acc, val, index) => {
            if (val === "") acc.push(index);
            return acc;
        }, []);

        if (emptyCells.length > 0 && !gameOver) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const computerCellIndex = emptyCells[randomIndex];
            board[computerCellIndex] = computerPlayer;

            const computerCell = document.querySelector(`[data-cell-index="${computerCellIndex}"]`);
            computerCell.textContent = computerPlayer;
            computerCell.classList.add("occupied");

            if (checkWinner(computerPlayer)) {
                message.textContent = `${computerPlayer} wins!`;
                gameOver = true;
            } else if (board.indexOf("") === -1) {
                message.textContent = "It's a draw!";
                gameOver = true;
            } else {
                currentPlayer = "X"; // Switch back to human player
                message.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    }

    // Function to check if a player has won
    function checkWinner(player) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winningCombinations.some((combination) => {
            const [a, b, c] = combination;
            return board[a] === player && board[b] === player && board[c] === player;
        });
    }

    // Function to reset the game
    function resetGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameOver = false;

        message.textContent = `Player ${currentPlayer}'s turn`;

        const cells = document.querySelectorAll(".grid-cell");
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove("occupied");
        });
    }

    // Add click event listener to reset button
    resetButton.addEventListener("click", resetGame);

    // Initialize the game
    resetGame();
});
