import * as React from "react";
import {Square} from "./Square";
import {StringTable} from "../../StringTable";

export interface BoardProps extends React.Props<any> {
    squares: StringTable,
    onClick(rowIdx : number, clmIdx : number) : void,
}

export class Board extends React.Component<BoardProps, undefined>{

    renderSquare(rowIdx : number, clmIdx : number){
        return <Square value={this.props.squares.GetValue(rowIdx, clmIdx)} onClick={()=>this.props.onClick(rowIdx, clmIdx)}/>;
    }
    render() {
        let divs = [];

        for (let ri = 0; ri < this.props.squares.rowCount; ri++) {
            let sqs = [];

            var row = this.props.squares.sliceRow(ri);
            for (let ci = 0; ci < row.length; ci++) {
                sqs.push(this.renderSquare(ri, ci));
            }

            divs.push(<div className="board-row">{sqs}</div>);
        }

        return (
            <div>
                {divs}
            </div>
        );
    }
}
