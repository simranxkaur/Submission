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

        //initialize dimensions
        var margin = {top: 20, right: 20, bottom: 20, left: 50},
        w = 500,
        h=300;

        var container = d3.select(".scatterPlot")
        .attr("width", 700)
        .attr("height", 400);

        //set x data

        const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d.total_bill)])
        .range([0, 500]);

        //set y data
        const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d.tip)])
        .range([300, 0]);

        //bind to data 

        container.selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", function (d) {
        return xScale(d.total_bill);
        })
        .attr("cy", function (d) {
        return yScale(d.tip);
        })
        .attr("r",3)
        .style("fill", "#69b3a2");

        //show scales
        container.append('g')
        .attr('transform', `translate(20,300)`)
        .call(d3.axisBottom(xScale));

        container.append('g')
        .attr('transform', `translate(20,0)`)
        .call(d3.axisLeft(yScale));

        //add axis titles

        container.append("text")
        .text("Total Bill")
        .attr("x", 250)
        .attr("y", 350);

        container.append("text")
        .text("Total")
        .attr("x", -5)
        .attr("y", 175);

    }

    render(){
      return <div>
        <div>
      <input
        type="range"
        min="0"
        max="100"
        value="30"
      />
    </div>     
    <svg className ="scatterPlot"></svg>
 
    </div>
      }
}
    
export default Child1;