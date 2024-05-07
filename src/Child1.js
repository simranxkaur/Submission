import React,{Component} from "react";
import * as d3 from "d3";

class Child1 extends Component{
    constructor(props){
      super(props);
      this.state = {};
    }

    componentDidMount(){
        console.log(this.props.data1);
    }

    componentDidUpdate(){
        //initialize data
        var data = this.props.data1;

    }

    render(){
      return <div>  
        <svg className ="scatterPlot"></svg>
    </div>
      }
}
    
export default Child1;