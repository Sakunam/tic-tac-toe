const gameboard = (function() {
    const defaultChar = '_';
    let board = [];
    const boardLines = [[[0,0], [1,0], [2,0]],
                        [[0,1], [1,1], [2,1]],
                        [[0,2], [1,2], [2,2]],
                        [[0,0], [0,1], [0,2]],
                        [[1,0], [1,1], [1,2]],
                        [[2,0], [2,1], [2,2]],
                        [[0,0], [1,1], [2,2]],
                        [[0,2], [1,1], [2,0]]];

    const getBoard = () => board;

    const initializeBoard = () => {
        const row = [defaultChar, defaultChar, defaultChar];
        board = [[...row], [...row], [...row]];
    }

    const someoneWon = () => {
        for (line of boardLines) {
            const cellOne = board[line[0][0]][line[0][1]];
            const cellTwo = board[line[1][0]][line[1][1]];
            const cellThree = board[line[2][0]][line[2][1]];
            if (cellOne != defaultChar && 
                cellOne == cellTwo && cellTwo == cellThree) {
                alert("Someone won!");
                return true;
            }
        }
        return false;
    }

    const makeMove = (row, col, char) => {
        if (board[row][col] == defaultChar) {
            return true;
        }
        else {
            console.log("That spot is already taken!");
            return false;
        }
    }

    return { 
        getBoard,
        initializeBoard,
        someoneWon,
        makeMove
    };
})();

const Player = function(name, id, symbol) {
    this.name = name;
    this.id = id;
    this.symbol = symbol;
}

function createPlayer(name, id) {
    let score = 0;
    const getScore = () => score;
    const increaseScore = () => score++;
    let symbol;
    id == 1 ? symbol = 'X' : symbol = 'O';
    return { name, id, symbol, increaseScore, getScore };
}

const gameManager = (function() {
    const playerOne = createPlayer("Player One", 1);
    const playerTwo = createPlayer("Player Two", 2);
    const players = [playerOne, playerTwo];
    let activePlayer = players[0];

    const switchActivePlayers = () => {
        activePlayer == playerOne ? activePlayer = playerOne : activePlayer = playerTwo;
    }

    const startGame = () => {
        gameboard.initializeBoard();
        displayController.displayBoard();
    }

    return {
        startGame
    };
})();

const displayController = (function() {
    const displayBoard = () => {
        const rowElements = document.querySelectorAll(".row");
        const board = gameboard.getBoard();
        for (let i = 0; i < rowElements.length; i++) {
            console.log(board[i]);
            for (cell of board[i]) {
                const cellElement = document.createElement("button");
                cellElement.innerHTML = cell;
                cellElement.className = "cell";
                rowElements[i].appendChild(cellElement);
            }
        }
    }

    return {
        displayBoard
    }
})();

gameManager.startGame();