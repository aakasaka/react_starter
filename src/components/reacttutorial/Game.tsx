import * as React from "react";
import {Board} from "./Board";
import "../../Linq";
import {StringTable} from "../../StringTable";
import {BoardConsts} from "./BoardConsts";
import {PointSet} from "../../PointSet";

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
        const winner_points = calculateWinner(current.squares);

        let status : string;
        let pointset : PointSet;
        if (winner_points) {
            status = 'Winner :' + winner_points[0];
            pointset = winner_points[1];
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            pointset = new PointSet(null);
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
                    <Board squares={current.squares} onClick={(rowIdx: number, clmIdx: number) => this.handleClick(rowIdx, clmIdx)}
                           highlightedPoints={pointset} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}


function calculateWinner(squares: StringTable) : [string, PointSet] {

    //横
    for (let ri = 0; ri < squares.rowCount; ri++) {
        const row = squares.sliceRow(ri);
        if (row[0] && row.every(c => row[0] === c)) {

            var points = row.map((_,ci) => ({row : ri, clm : ci}));

            return [ row[0], new PointSet(points) ];
        }
    }

    //縦
    for (let ci = 0; ci < squares.columnCount; ci++) {
        const clm = squares.sliceColumn(ci);

        if (clm[0] && clm.every(c => clm[0] === c)) {
            var points = clm.map((_,ri) => ({row:ri, clm:ci}));
            return [ clm[0], new PointSet(points) ];
        }
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
            const points = new Array<{ row : number, clm : number}>();
            let isAllMatched = true;
            for (let i = 0; i < skewLen; i++) {

                const pt = { row : ri + i, clm : ci + i };
                const tmpVal = squares.GetValue(pt.row, pt.clm);

                if (tmpVal == null) {
                    isAllMatched = false;
                    break;
                }
                if (val == null) {
                    val = tmpVal;
                    points.push(pt);
                    continue;
                }
                if (val !== tmpVal) {
                    isAllMatched = false;
                    break;
                }
                points.push(pt);
            }
            if (isAllMatched) {
                return [val, new PointSet(points)];
            }
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
            const points = new Array<{row:number, clm:number}>();
            let isAllMatched = true;
            for (let i = 0; i < skewLen; i++) {
                const pt = { row : ri + i, clm : ci - i };
                const tmpVal = squares.GetValue(pt.row, pt.clm);
                if (tmpVal == null) {
                    isAllMatched = false;
                    break;
                }
                if (val == null) {
                    val = tmpVal;
                    points.push(pt);
                    continue;
                }
                if (val !== tmpVal) {
                    isAllMatched = false;
                    break;
                }
                points.push(pt);
            }
            if (isAllMatched) return [ val, new PointSet(points) ];
        }
    }

    return null;
}