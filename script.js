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

    const getTile = (row, col) => board[row][col];

    const setTile = (row, col, char) => {
        board[row][col] = char;
        displayController.updateBoardElement(row, col, char);
    }

    const initializeBoard = () => {
        const row = [defaultChar, defaultChar, defaultChar];
        board = [[...row], [...row], [...row]];
        displayController.initializeBoardElements();
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

    const isValidMove = (row, col) => {
        return getTile(row, col) == defaultChar;
    }

    return { 
        getTile,
        setTile,
        initializeBoard,
        someoneWon,
        isValidMove
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

    const switchActivePlayer = () => {
        activePlayer == playerOne ? activePlayer = playerTwo : activePlayer = playerOne;
    }

    const startGame = () => {
        gameboard.initializeBoard();
        activePlayer = players[0];
    }

    const makeMove = (row, col) => {
        if (gameboard.isValidMove(row, col)) {
            gameboard.setTile(row, col, activePlayer.symbol);
            if (gameboard.someoneWon()) {
                activePlayer.increaseScore();
                alert(`${activePlayer.name} won!`);
                startGame();
            }
            switchActivePlayer();
        }
    }

    return {
        startGame,
        makeMove
    };
})();

const displayController = (function() {
    let tileElements = [];

    const initializeBoardElements = () => {
        const board = document.querySelector(".board");
        board.innerHTML = '';
        for (i = 0; i < 3; i++) {
            const row = document.createElement("div")
            board.appendChild(row);
            const rowElements = [];
            for (j = 0; j < 3; j++) {
                const tile = document.createElement("button");
                tile.innerHTML = gameboard.getTile(i, j);
                row.appendChild(tile);
                rowElements.push(tile);
            }
            tileElements.push(rowElements);
        }
    }

    const updateBoardElement = (row, col, symbol) => {
        tileElements[row][col].innerHTML = symbol;
    }

    return {
        initializeBoardElements,
        updateBoardElement
    }
})();

gameManager.startGame();