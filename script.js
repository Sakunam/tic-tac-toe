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

    const setBoard = () => {
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

const gameManager = (function() {
    const startGame = () => {
        gameboard.setBoard();
        let validMoves = 0;
        while (validMoves < 9 && !gameboard.someoneWon()) {
            const rowMove = prompt("row move?");
            const colMove = prompt("col move?");
            
            if (validMoves % 2 == 0) {
                if (gameboard.makeMove(rowMove, colMove, 'X')) {
                    validMoves++;
                }
            }
            else {
                if (gameboard.makeMove(rowMove, colMove, 'O')) {
                    validMoves++;
                }
            }

            alert(`${gameboard.getBoard()[0]}\n${gameboard.getBoard()[1]}\n${gameboard.getBoard()[2]}`)
        }

        if (!gameboard.someoneWon()) {
            alert("It's a tie!");
        }
    }

    return {
        startGame
    };
})();

gameManager.startGame();