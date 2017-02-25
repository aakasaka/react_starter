import * as React from "react";//Load react define from @types

//interface of Props of Helloworld
export interface HelloProps { compiler: string; framework: string };

//<HelloProps,undefined> これなに？
//I think that <Props,State> if class is state less State will be set undefined. 
export class Helloworld extends React.Component<HelloProps,undefined>{
    render(){
        return <h1>Hello from {this.props.compiler} and {this.props.framework} </h1>
    }
}