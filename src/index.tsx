import * as React from "react";
import * as ReactDOM from "react-dom";
import {Game} from "./components/reacttutorial/Game"
import { Helloworld } from "./components/Hello";


ReactDOM.render(
    //たぶんrenderするもの
    <Helloworld compiler="typescript" framework="react"/>,
    //たぶんrenderする先
    document.getElementById("first")
)

//React Tutorial
ReactDOM.render(
    <Game/>,
    document.getElementById("game")
);