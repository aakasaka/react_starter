import * as React from "react";
import {Board} from "./Board";
import "../../Linq";
import {StringTable} from "../../StringTable";
import {BoardConsts} from "./BoardConsts";
import {PointSet} from "../../PointSet";
import { Button } from 'react-bootstrap';
import * as styles from '../../css/delete.css';

export interface BoardState{
    squares:StringTable,
}

export interface GameState{
    history:BoardState[],
    xIsNext:boolean,
    stepNumber:number,
    isAsc:boolean,
}

export class Game extends React.Component<any,GameState>{
    constructor() {
        super();

        const squares = new StringTable(BoardConsts.ROW_COUNT, BoardConsts.COLUMN_COUNT);

        this.state = {
            history:[{squares:squares}],
            xIsNext: true,
            stepNumber: 0,
            isAsc: true,
        }
    }
    handleClick(rowIdx : number, clmIdx : number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        if (winner || current.squares.GetValue(rowIdx, clmIdx) != null) {
            return;
        }

        const val = this.state.xIsNext ? BoardConsts.X_SYMBOL : BoardConsts.O_SYMBOL;
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

    private toggleSort() {
        this.setState({
            isAsc: !this.state.isAsc,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner_points = calculateWinner(current.squares);
        const sortSymbol = this.state.isAsc ? "▲" : "▼";

        let status : string;
        let pointset : PointSet;
        if (winner_points) {
            status = 'Winner :' + winner_points[0];
            pointset = winner_points[1];
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? BoardConsts.X_SYMBOL : BoardConsts.O_SYMBOL);
            pointset = new PointSet(null);
        }

        const moves = history.map((s, i) => {
            const text = (i === 0) ? 'Game start' : ('Move #' + i);
            const clsName = i === this.state.stepNumber ? styles.historyCurrent : styles.history;

            return (
                <li key={i}>
                    <a className={clsName} href="#" onClick={() => this.jumpTo(i)}>{text}</a>
                </li>
            );
        });

        const olMoves = this.state.isAsc
                          ? <ol className={styles.ol}>{moves}</ol>
                          : <ol className={styles.ol} reversed>{moves.reverse()}</ol>;

        return (
            <div className={styles.game}>
                <div>
                    <Board squares={current.squares} onClick={(rowIdx: number, clmIdx: number) => this.handleClick(rowIdx, clmIdx)}
                           highlightedPoints={pointset} />
                </div>
                <div className={styles.gameInfo}>
                    <div className={styles.status}>{status}</div>

                    <Button className={styles.buttonSort} bsSize="xsmall" style={{padding:0}} onClick={() => this.toggleSort()}>{sortSymbol}</Button>

                    {olMoves}
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