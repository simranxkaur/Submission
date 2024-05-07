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

        var temp_data = d3.flatRollup(
          data,
          (d) => d.length,
          (d) => d.category
        );

        var margin = { top: 10, right: 10, bottom: 30, left: 20 },
        w = 500 - margin.left - margin.right,
        h = 300 - margin.top - margin.bottom;

       var svg = d3
      .select(".barChart")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom);

      var x_scale = d3
        .scaleBand()
        .domain(temp_data.map(d => d.category))
        .range([margin.left, w])
        .padding(0.2);

        var y_scale = d3
          .scaleLinear()
          .domain([0, d3.max(temp_data, d => d.length)])
          .range([h, 0]);
        
        svg
          .selectAll("rect")
          .data(temp_data)
          .enter()
          .append("rect")
          .attr("x", d => x_scale(data.category))
          .attr("width", x_scale.bandwidth())
          .attr('y', d => y_scale(d.length))
          .attr('height', d => h - y_scale(d.length));
         
    
        svg.append('g')
            .attr('transform', `translate(0,265)`)
            .call(d3.axisBottom(x_scale));

            svg.append("text")
            .text("Category")
            .attr("x", 200)
            .attr("y", 290);
    }

    render(){
      return <div>  
        <svg className ="barChart"></svg>
    </div>
      }
}
    
export default Child1;