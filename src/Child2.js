import React,{Component} from "react";
import * as d3 from "d3";

class Child2 extends Component{
    constructor(props){
      super(props);
      this.state={
        target: "category",
      };
    }


    componentDidMount() {
        console.log(this.props.data2);
      }

    componentDidUpdate(){
        var data = this.props.data2;
        
          const margin = { top: 50, right: 50, bottom: 50, left: 50 };
          const width = 1200 - margin.left - margin.right;
          const height = 600 - margin.top - margin.bottom;
    
          const svg = d3.select('.scatterPlot')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
    
          const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.x)])
            .range([0, width]);
    
          const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.y)])
            .range([height, 0]);
    
          svg.selectAll('circle')
            .data(data)
            .enter().append('circle')
            .attr('cx', d => xScale(d.x))
            .attr('cy', d => yScale(d.y))
            .attr('r', 5)
            .attr('fill', 'grey');
    
          svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale));
    
          svg.append('g')
            .call(d3.axisLeft(yScale));
    
          svg.append("text")
            .text("x")
            .attr("x", width / 2)
            .attr("y", 550);
    
          svg.append("text")
            .text("y")
            .attr("x", -50)
            .attr("y", 250);

    }


    render(){
        return <div>
            <div>
            <select value={this.state.target} onChange={this.targetDropdown}>
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>

            </select>
            </div>
          <svg className ="scatterPlot"> </svg>

        </div>
      }
}
    
export default Child2;