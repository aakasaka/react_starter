import * as React from "react";
import { Button } from 'react-bootstrap';
import * as styles from "../../css/delete.css";

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
            <Button className={styles.square} onClick={() => this.props.onClick()} bsStyle={btnStyle}
                    style={{fontSize:28, padding:0}}>
                {this.props.value}
            </Button>
        )
    }
}
