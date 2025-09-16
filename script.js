const gameboard = (function() {
    const board = [['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']];

    const getBoard = function() {
        return board;
    }

    const makeMove = (row, col, char) => {
        if (board[row][col] == '_') {
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