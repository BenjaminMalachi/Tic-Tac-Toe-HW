document.addEventListener('DOMContentLoaded', function () {

const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(e) {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);

    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer; // Use textContent to display X or O
        cell.dataset.cell = currentPlayer;
        togglePlayer();
        checkWinner();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.innerText = `Player ${currentPlayer}, it's your turn`;
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            message.innerText = `Player ${currentPlayer} wins!`;
            gameActive = false;
        }
    }

    if (!gameBoard.includes('') && gameActive) {
        message.innerText = "It's a draw!";
        gameActive = false;
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = ''; // Clear the cell content
        cell.dataset.cell = '';
    });
    message.innerText = `Player ${currentPlayer}, it's your turn`;
}

board.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', resetGame);

});