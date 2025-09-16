const gameboard = (function() {
    const board = [['_', '_', '_'], ['_', '_', '_'], ['_', '_', '_']];

    const getBoard = function() {
        return board;
    }
    
    return { 
        getBoard
    };
})();