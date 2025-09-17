const gameboard = (function() {
    const defaultChar = '';
    const board = [];

    const getBoard = () => board;

    const setBoard = () => {
        board = [[defaultChar, defaultChar, defaultChar],
                 [defaultChar, defaultChar, defaultChar],
                 [defaultChar, defaultChar, defaultChar]];
    }

    const someoneWon = () => {
        if ((board[0][0] != defaultChar && 
             board[0][0] == board[1][0] && board[1][0] == board[2][0]) ||
            (board[0][1] != defaultChar && 
             board[0][1] == board[1][1] && board[1][1] == board[2][1]) ||
            (board[0][2] != defaultChar && 
             board[0][2] == board[1][2] && board[1][2] == board[2][2]) ||
            (board[0][0] != defaultChar && 
             board[0][0] == board[0][1] && board[0][1] == board[0][2]) ||
            (board[1][0] != defaultChar && 
             board[1][0] == board[1][1] && board[1][1] == board[1][2]) ||
            (board[2][0] != defaultChar &&
             board[2][0] == board[2][1] && board[2][1] == board[2][2]) ||
            (board[0][0] != defaultChar && 
             board[0][0] == board[1][1] && board[1][1] == board[2][2]) ||
            (board[2][0] != defaultChar && 
             board[2][0] == board[1][1] && board[1][1] == board[0][2])) {
            return true;
        }
        else {
            return false;
        }
    }

    const makeMove = (row, col, char) => {
        if (board[row][col] == defaultChar) {
            board[row][col] = char;
            return true;
        }
        else {
            console.log("That spot is already taken!");
            return false;
        }
    }

    return { 
        getBoard,
        setBoard,
        someoneWon,
        makeMove
    };
})();

const Player = function(name) {
    this.name = name;
}

function createPlayer(name) {
    let score = 0;
    const getScore = () => score;
    const increaseScore = () => score++;
    return { name, increaseScore, getScore };
}