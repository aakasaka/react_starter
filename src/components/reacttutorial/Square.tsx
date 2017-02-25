import * as React from "react";
import { Button } from 'react-bootstrap';

//Squareのプロパティ
export interface SquareProps extends React.Props<Square> {
    value: string, onClick: any//どうすりゃいいんだ？ 
};
//
export class Square extends React.Component<SquareProps, undefined> {
    render() {
        return (
            <Button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </Button>
        )
    }
}
