import React,{Component} from "react";
import * as d3 from "d3";

class Child2 extends Component{
    constructor(props){
      super(props);
      this.state={
        target: "total_bill",
      };
    }


    componentDidMount() {
        console.log(this.props.data2);
      }

    componentDidUpdate(){
        var data = this.props.data2;
    }


    render(){
        return <div>
            <h1>Hello</h1>
          <svg className ="barChart"> </svg>
        </div>
      }
}
    
export default Child2;