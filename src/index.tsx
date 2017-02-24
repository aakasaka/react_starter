import * as React from "react";
import * as ReactDOM from "react-dom";

import { Helloworld } from "./components/Hello";

ReactDOM.render(
    //たぶんrenderするもの
    <Helloworld compiler="typescript" framework="react"/>,
    //たぶんrenderする先
    document.getElementById("first")
)