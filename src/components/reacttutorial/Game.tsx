import * as React from "react";
import {Boad} from "./Boad";


export interface BordState{
    squares:string[]
}

export interface GameState{
    history:BordState[],
    xIsNext:boolean
}

export interface history{
    square:string[]
}

export class Game extends React.Component<any,GameState>{
    constructor() {
        super();
        this.state = {
            // history: [{ squares: Array[9].fill(null) }],
            history:[{squares:[null,null,null,null,null,null,null,null,null]}],
            xIsNext: true,
        }
    }
    handleClick(i: number) {
        const history = this.state.history;
        const current = this.state.history[history.length - 1];
        const squares = current.squares.slice();
        const winner = calculateWinner(current.squares);
        if (calculateWinner(current.squares) || current.squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'x' : 'o';

        this.setState({
            history: history.concat([{ squares: squares }]),
            xIsNext: !this.state.xIsNext,
        });
    }
  render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        let status;
        if (winner) {
            status = 'Winner :' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Boad squares={current.squares} onClick={(i:number) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{}</ol>
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