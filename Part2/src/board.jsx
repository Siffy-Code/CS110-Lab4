import { useState } from "react";

function Square({ value, onSquareClick }) {

    return (
        <button
            className="square"
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

export default function Board() {

    const [xIsNext, setXIsNext] = useState(true);

    const [squares, setSquares] =
        useState(Array(9).fill(null));

    const [xScore, setXScore] = useState(0);

    const [oScore, setOScore] = useState(0);

    const winner = calculateWinner(squares);

    let status;

    const isTie =
        !winner &&
        squares.every(square => square !== null);

    if (winner) {

        status = `Winner: ${winner}`;

    }
    else if (isTie) {

        status = "Tie Game!";

    }
    else {

        status =
            `Next Player: ${xIsNext ? "X" : "O"}`;
    }


    function handleClick(i) {

        if (squares[i] || winner) {
            return;
        }

        const nextSquares = squares.slice();

        if (xIsNext) {
            nextSquares[i] = "X";
        }
        else {
            nextSquares[i] = "O";
        }

        setSquares(nextSquares);

        const newWinner =
            calculateWinner(nextSquares);

        if (newWinner === "X") {
            setXScore(xScore + 1);
        }

        if (newWinner === "O") {
            setOScore(oScore + 1);
        }

        setXIsNext(!xIsNext);
    }

    function newGame() {

        setSquares(Array(9).fill(null));

        setXIsNext(true);
    }

    function resetScores() {

        setSquares(Array(9).fill(null));

        setXIsNext(true);

        setXScore(0);

        setOScore(0);
    }

    return (
        <div className="game-container">

            <h1>Tic Tac Toe</h1>

            <div className="status">
                {status}
            </div>

            <div className="scoreboard">
                <div>X Score: {xScore}</div>
                <div>O Score: {oScore}</div>
            </div>

            <div className="board-row">

                <Square
                    value={squares[0]}
                    onSquareClick={() => handleClick(0)}
                />

                <Square
                    value={squares[1]}
                    onSquareClick={() => handleClick(1)}
                />

                <Square
                    value={squares[2]}
                    onSquareClick={() => handleClick(2)}
                />

            </div>

            <div className="board-row">

                <Square
                    value={squares[3]}
                    onSquareClick={() => handleClick(3)}
                />

                <Square
                    value={squares[4]}
                    onSquareClick={() => handleClick(4)}
                />

                <Square
                    value={squares[5]}
                    onSquareClick={() => handleClick(5)}
                />

            </div>

            <div className="board-row">

                <Square
                    value={squares[6]}
                    onSquareClick={() => handleClick(6)}
                />

                <Square
                    value={squares[7]}
                    onSquareClick={() => handleClick(7)}
                />

                <Square
                    value={squares[8]}
                    onSquareClick={() => handleClick(8)}
                />

            </div>

            <div className="button-group">

                <button
                    className="game-button"
                    onClick={newGame}
                >
                    New Game
                </button>

                <button
                    className="game-button"
                    onClick={resetScores}
                >
                    Reset Scores
                </button>

            </div>

        </div>
    );
}

function calculateWinner(squares) {

    const lines = [

        [0,1,2],
        [3,4,5],
        [6,7,8],

        [0,3,6],
        [1,4,7],
        [2,5,8],

        [0,4,8],
        [2,4,6]
    ];

    for (let i = 0; i < lines.length; i++) {

        const [a, b, c] = lines[i];

        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {

            return squares[a];
        }
    }

    return null;
}