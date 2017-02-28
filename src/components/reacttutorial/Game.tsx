import * as React from "react";
import {Board} from "./Board";


export interface BoardState{
    squares:string[]
}

export interface GameState{
    history:BoardState[],
    xIsNext:boolean,
    stepNumber:number,
}

export interface history{
    square:string[]
}

export class Game extends React.Component<any,GameState>{
    constructor() {
        super();
        this.state = {
            history:[{squares:new Array<string>(9)}],
            xIsNext: true,
            stepNumber: 0,
        }
    }
    handleClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const sq = current.squares.slice();
        const winner = calculateWinner(sq);
        if (winner || sq[i]) {
            return;
        }
        sq[i] = this.state.xIsNext ? 'x' : 'o';

        this.setState({
            history: history.concat([{ squares: sq }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });
    }

    jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = 'Winner :' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        const moves = history.map((s, i) => {
            const text = (i === 0) ? 'Game start' : ('Move #' + i);

            return (
                <li key={i}>
                    <a href="#" onClick={() => this.jumpTo(i)}>{text}</a>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i:number) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}


function calculateWinner(squares: string[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}