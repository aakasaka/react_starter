import * as React from "react";
import {Board} from "./Board";
import "../../Linq";
import {StringTable} from "../../StringTable";
import {BoardConsts} from "./BoardConsts";

export interface BoardState{
    squares:StringTable,
}

export interface GameState{
    history:BoardState[],
    xIsNext:boolean,
    stepNumber:number,
}

export class Game extends React.Component<any,GameState>{
    constructor() {
        super();

        const squares = new StringTable(BoardConsts.ROW_COUNT, BoardConsts.COLUMN_COUNT);

        this.state = {
            history:[{squares:squares}],
            xIsNext: true,
            stepNumber: 0,
        }
    }
    handleClick(rowIdx : number, clmIdx : number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        if (winner || current.squares.GetValue(rowIdx, clmIdx) != null) {
            return;
        }

        const val = this.state.xIsNext ? 'x' : 'o';
        var sq = current.squares.NewUpdatedTable(rowIdx, clmIdx, val);

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


function calculateWinner(squares: StringTable) {

    //横
    for (let i = 0; i < squares.rowCount; i++) {
        const row = squares.sliceRow(i);
        if (row[0] && row.every(c => row[0] === c)) return row[0];
    }

    //縦
    for (let i = 0; i < squares.columnCount; i++) {
        const clm = squares.sliceColumn(i);

        if (clm[0] && clm.every(c => clm[0] === c)) return clm[0]; 
    }

    //斜め
    const skewLen = squares.rowCount <= squares.columnCount ? squares.rowCount : squares.columnCount;

    // //左上→右下
    for (let ri = 0; ri < squares.rowCount; ri++) {
        const restRowLen = squares.rowCount - ri;
        if (restRowLen < skewLen) break;

        for (let ci = 0; ci < squares.columnCount; ci++) {
            const restClmLen = squares.columnCount - ci;
            if (restClmLen < skewLen) break;

            let val : string = null;
            let isAllMatched = true;
            for (let i = 0; i < skewLen; i++) {
                const tmpVal = squares.GetValue(ri + i, ci + i);
                if (tmpVal == null) {
                    isAllMatched = false;
                    break;
                }
                if (val == null) {
                    val = tmpVal;
                    continue;
                }
                if (val !== tmpVal) {
                    isAllMatched = false;
                    break;
                }
            }
            if (isAllMatched) return val;
        }
    }

    // //右上→左下
    for (let ri = 0; ri < squares.rowCount; ri++) {
        const restRowLen = squares.rowCount - ri;
        if (restRowLen < skewLen) break;

        for (let ci = squares.columnCount - 1; 0 <= ci; ci--) {
            const restClmLen = ci + 1;
            if (restClmLen < skewLen) break;

            let val : string = null;
            let isAllMatched = true;
            for (let i = 0; i < skewLen; i++) {
                const tmpVal = squares.GetValue(ri + i, ci - i);
                if (tmpVal == null) {
                    isAllMatched = false;
                    break;
                }
                if (val == null) {
                    val = tmpVal;
                    continue;
                }
                if (val !== tmpVal) {
                    isAllMatched = false;
                    break;
                }
            }
            if (isAllMatched) return val;
        }
    }

    return null;
}