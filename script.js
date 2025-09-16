const gameboard = (function() {
    const defaultChar = '';
    const board = [[defaultChar, defaultChar, defaultChar],
                   [defaultChar, defaultChar, defaultChar],
                   [defaultChar, defaultChar, defaultChar]];

    const getBoard = () => board;

    const makeMove = (row, col, char) => {
        if (board[row][col] == defaultChar) {
            board[row][col] = char;
        }
        else {
            console.log("That spot is already taken!");
        }
    }

    return { 
        getBoard,
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