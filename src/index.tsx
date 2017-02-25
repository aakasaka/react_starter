import * as React from "react"; //load typescript define from react? or load libraries?
import * as ReactDOM from "react-dom";
import {Game} from "./components/reacttutorial/Game" //load components from components folder
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