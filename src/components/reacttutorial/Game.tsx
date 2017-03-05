import * as React from "react";
import {Board} from "./Board";
import "../../Linq";

export interface BoardState{
    squares:string[][]
}

export interface GameState{
    history:BoardState[],
    xIsNext:boolean,
    stepNumber:number,
}

export class Game extends React.Component<any,GameState>{
    constructor() {
        super();

        //TODO 定数化
        var squares = new Array<string[]>(3);
        squares[0] = [null, null, null];
        squares[1] = [null, null, null];
        squares[2] = [null, null, null];

        this.state = {
            history:[{squares:squares}],
            xIsNext: true,
            stepNumber: 0,
        }
    }
    handleClick(rowIdx : number, clmIdx : number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const sq = current.squares.slice();
        const winner = calculateWinner(sq);
        if (winner || sq[rowIdx][clmIdx] != null) {
            return;
        }

        //TODO クラス化して隠蔽
        var row = sq[rowIdx].slice();
        row[clmIdx] = this.state.xIsNext ? 'x' : 'o';
        sq[rowIdx] = row;

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
                    <Board squares={current.squares} onClick={(rowIdx: number, clmIdx: number) => this.handleClick(rowIdx, clmIdx)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}


function calculateWinner(squares: string[][]) {

    //横
    for (let i = 0; i < squares.length; i++) {
        const row = squares[i];
        if (row[0] && row.every(c => row[0] === c)) return row[0];
    }

    //縦
    //TODO 要素数が統一されていることのアサーション（または配列のクラス化） 
    const clmLen = squares.minOr(r => r.length, 0);
    for (let i = 0; i < clmLen; i++) {
        const clm = squares.map(r => r[i]);

        if (clm.every(c => clm[0] === c)) return clm[0]; 
    }

    //TODO
    // //斜め
    // const skewLen = squares.length <= clmLen ? squares.length : clmLen;
    // if (squares.length == clmLen) {
    //     //左上→右下
    //     for (let ri = 0; ri < squares.length; ri++) {
    //         if (squares.length - ri < skewLen) break;

    //         let val : string;
    //         let matched = 0;
    //         for (let ci = 0; ci < clmLen; ci++) {
    //             const row = squares[ri + matched];

    //         }
    //     }
    // }

    return null;
}