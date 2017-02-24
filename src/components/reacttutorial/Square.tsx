import * as React from "react";

//Squareのプロパティ
export interface SquareProps extends React.Props<Square> {
    value: string, onClick: any//どうすりゃいいんだ？ 
};
//
export class Square extends React.Component<SquareProps, undefined> {
    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        )
    }
}
