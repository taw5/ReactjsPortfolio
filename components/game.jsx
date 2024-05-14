import React, { useState, useEffect } from 'react';
const Game = () => {
    const [gameBoardSize, setGameBoardSize] = useState(2);
    const [gameBoard, setGameBoard] = useState(null);
    const [time, setTime] = useState(0);
    const [moves, setMoves] = useState(0);
    const [score, setScore] = useState(0);
    const [hasGameStarted, setHasGameStarted] = useState(false);
    const [isGamePaused, setIsGamePaused] = useState(false);
    const [hasGameEnded, setHasGameEnded] = useState(false);


    useEffect(() => {
        createGameBoard(gameBoardSize);
    }, [gameBoardSize]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (gameBoard && !checkIfGameEnded()) {
                setTime(prevTime => prevTime + 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [gameBoard, time]);

    useEffect(() => {
        createGameBoard(gameBoardSize);
    }, []);

    const createGameBoard = (size) => {
        document.getElementById('highScoreAlert').style.visibility = 'hidden';
        setHasGameStarted(true);
        setIsGamePaused(false);
        setHasGameEnded(false);
        setTime(0);
        setMoves(0);
    
        const board = [];
        for (let i = 0; i < size * size - 1; i++) {
            board.push(i);
        }
        board.push(-1); // Representing the empty tile
        board.sort(() => 0.5 - Math.random());
    
        const newGameBoard = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                const col = document.createElement('div');
                col.classList.add('col');
                col.addEventListener('click', move);
                col.id = 'col-' + i + '-' + j;
    
                if (board[(i * size) + j] === -1) {
                    col.classList.add('empty');
                } else {
                    col.classList.add('tile');
                }
                col.innerText = board[(i * size) + j] + 1;  // not sure what's going on in this line and why it's not working...
                row.push(col);
            }
            newGameBoard.push(row);
        }
        setGameBoard(newGameBoard);
    };
    


    const handleGameSizeSelect = (size) => {
        setGameBoardSize(size);
    };

    const checkIfGameEnded = () => {
        
        return score >= 100; // place holder for now 
    };

    const moveTile = (movement) => {
        const emptyTile = document.querySelector('.empty');
        const [emptyRow, emptyCol] = emptyTile.id.split('-').slice(1).map(Number);

        let newRow = emptyRow;
        let newCol = emptyCol;

        switch (movement) {
            case 'UP': // basically does what it says, switches the movement parameter that's a string, if it's UP it makes the row go up then breaks.
                newRow++;
                break;
            case 'DOWN':
                newRow--;
                break;
            case 'LEFT':
                newCol++;
                break; // much simpler in react
            case 'RIGHT':
                newCol--;
                break;
            default:
                return;
        }

        // Check if the new position is within the bounds of the game board
        if (newRow >= 0 && newRow < gameBoardSize && newCol >= 0 && newCol < gameBoardSize) {
            // Swap the empty tile with the tile in the new position
            const newTile = document.getElementById(`col-${newRow}-${newCol}`);
            swapTiles(newTile);
        }
    };


    const swapTiles = (tile) => {
        const emptyTile = document.querySelector('.empty');

        // Swap the text content and classes of the clicked tile and the empty tile
        const tempText = tile.innerText;
        tile.innerText = emptyTile.innerText;
        emptyTile.innerText = tempText;

        tile.classList.remove('empty');
        tile.classList.add('empty');
        emptyTile.classList.remove('tile');
        emptyTile.classList.add('empty');

        // update the empty tile position
        emptyTile.id = tile.id;
    };

    const move = (event) => {
        const target = event.target;
        const id = target.id;
        const [row, col] = id.split('-').slice(1).map(Number); // same as old javascript just using map(a number).

        if (target.classList.contains('empty')) {
            return; // do nothing if the clicked tile is already empty
        }

        const emptyTile = document.querySelector('.empty');
        const emptyId = emptyTile.id;
        const [emptyRow, emptyCol] = emptyId.split('-').slice(1).map(Number);

        // Check if the clicked tile is adjacent to the empty tile
        if (
            (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
            (Math.abs(col - emptyCol) === 1 && row === emptyRow)
        ) {
            // Swap the clicked tile and the empty tile
            const tempValue = gameBoard[row][col];
            gameBoard[row][col] = gameBoard[emptyRow][emptyCol];
            gameBoard[emptyRow][emptyCol] = tempValue;

            setMoves(prevMoves => prevMoves + 1);
            setGameBoard([...gameBoard]);
        }
    };

    const onGameSelect = (event) => {
        const selectedSize = parseInt(event.target.innerText.split('x')[0]);
        setGameBoardSize(selectedSize);
        createGameBoard(selectedSize);
    };
    const addScoreToLocalStorage = (scoreData) => {
        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        scores.push(scoreData);
        localStorage.setItem('scores', JSON.stringify(scores));
    };

    const checkHighScore = (scoreData) => {
        const scores = JSON.parse(localStorage.getItem('scores')) || [];

        if (scores.length > 0) {
            const lowestScore = Math.min(...scores.map(score => score.totalScore));

            if (scoreData.totalScore < lowestScore) {
                // Display high score message
                return true;
            }
        } else {
            // No scores yet, so it's automatically a high score
            return true;
        }

        return false;
    };

    const displayScores = () => {
        const scores = JSON.parse(localStorage.getItem('scores')) || [];
        let scoresTable = '<table id="scoresTable"><tr><th>Moves</th><th>Time</th><th>Total Score</th><th>Game Type</th></tr>';

        scores.forEach(score => {
            scoresTable += `<tr><td>${score.moves}</td><td>${score.time}s</td><td>${score.totalScore}</td><td>${score.Game_Type}x${score.Game_Type}</td></tr>`;
        });

        scoresTable += '</table>';

        // Display scores table in the 'scores' div
        document.getElementById('scores').innerHTML = scoresTable;
    };

    const shuffleGameBoard = () => {
        const board = [];
        for (let i = 0; i < gameBoardSize * gameBoardSize - 1; i++) {
            board.push(i);
        }
        board.push(-1); // Representing the empty tile
        board.sort(() => 0.5 - Math.random());

        const newGameBoard = [];
        for (let i = 0; i < gameBoardSize; i++) {
            const row = [];
            for (let j = 0; j < gameBoardSize; j++) {
                row.push(board[i * gameBoardSize + j]);
            }
            newGameBoard.push(row);
        }
        setGameBoard(newGameBoard);
    };



    return (
        <div className="container">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h4>Tile Puzzle Game</h4>
                </div>
                <ul id="games">
                    <li><a href="#" onClick={(e) => onGameSelect(e)}>2x2</a></li> {/* e for event*/}
                    <li><a href="#" onClick={(e) => onGameSelect(e)}>3x3</a></li>
                    <li><a href="#" onClick={(e) => onGameSelect(e)}>4x4</a></li>
                    <li><a href="#" onClick={(e) => onGameSelect(e)}>5x5</a></li>
                    <li><a href="#">Custom</a></li>
                </ul>
                <ul>
                    <li><a id="scores" href="#">scores</a></li>
                </ul>
            </div>
            <div className="main-content">
                <div id="on_start">
                    <h1>Tile Puzzle Game</h1>
                    <p>Click on the tiles to move them around and put them in order.</p>
                </div>
                <div id="game-screen">
                    <div className="header">
                        <div className="header-left">
                            <h4>Tile Puzzle Game</h4>
                        </div>
                        <div className="header-right">
                            <button id="shuffle" onClick={() => shuffleGameBoard()}>Reset</button>
                            <button id="timer">Time: {time}s</button>
                            <p id="movecount">Moves: {moves}</p>
                        </div>
                    </div>
                    <div id="tiles">
                        {gameBoard && gameBoard.map((row, rowIndex) => (
                            <div key={`row-${rowIndex}`} className="row">
                                {row.map((tile, colIndex) => (
                                    <div key={`col-${rowIndex}-${colIndex}`} className={`col ${tile === -1 ? 'empty' : 'tile'}`} id={`col-${rowIndex}-${colIndex}`}>
                                        {tile !== -1 && tile + 1}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div id="win" className="win-screen">
                    You Win!
                    <div id="winMessage"></div>
                    <p id="winScore">Moves: Time:</p>
                    <button id="tryAgain" style={{ width: '100%', marginTop: '10px' }}>Try Again</button>
                </div>
                <div id="highScoreAlert" style={{ visibility: 'hidden' }}>
                    <h2>Congratulations!</h2>
                    <p>You achieved a new high score !</p>
                </div>
            </div>
        </div>
    );
};

export default Game;
