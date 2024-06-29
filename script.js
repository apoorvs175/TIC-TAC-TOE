const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const messageElement = document.getElementById('message');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let isGameActive = true;

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

const handleClick = (e) => {
    const index = e.target.dataset.index;
    if (board[index] || !isGameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWinner = () => {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameActive = false;
            messageElement.textContent = `${board[a]} Wins 🏆`;
            return;
        }
    }

    if (!board.includes(null)) {
        isGameActive = false;
        messageElement.textContent = 'It\'s a draw!';
    }
};

const restartGame = () => {
    board = Array(9).fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    isGameActive = true;
    messageElement.textContent = '';
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
