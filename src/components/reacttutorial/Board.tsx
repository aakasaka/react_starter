import * as React from "react";
import {Square} from "./Square";

export interface BoardProps extends React.Props<any> {
    squares: string[][],    //TODO ファーストクラスコレクションに
    onClick(rowIdx : number, clmIdx : number) : void,
}

export class Board extends React.Component<BoardProps, undefined>{

    renderSquare(rowIdx : number, clmIdx : number){
        return <Square value={this.props.squares[rowIdx][clmIdx]} onClick={()=>this.props.onClick(rowIdx, clmIdx)}/>;
    }
    render() {
        return (
            <div>
                {/*TODO ループに*/}
                <div className="board-row">
                    {this.renderSquare(0, 0)}
                    {this.renderSquare(0, 1)}
                    {this.renderSquare(0, 2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(1, 0)}
                    {this.renderSquare(1, 1)}
                    {this.renderSquare(1, 2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(2, 0)}
                    {this.renderSquare(2, 1)}
                    {this.renderSquare(2, 2)}
                </div>
            </div>
        );
    }
}
