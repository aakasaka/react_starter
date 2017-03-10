import * as React from "react";
import { Button } from 'react-bootstrap';

//Squareのプロパティ
export interface SquareProps extends React.Props<Square> {
    value: string,
    onClick(): void,
    isHighlighted: boolean,
};
//
export class Square extends React.Component<SquareProps, undefined> {
    render() {
        const btnStyle = this.props.isHighlighted ? "info" : "default";

        return (
            <Button className="square" onClick={() => this.props.onClick()} bsStyle={btnStyle}
                    style={{fontSize:28, padding:0}}>
                {this.props.value}
            </Button>
        )
    }
}
