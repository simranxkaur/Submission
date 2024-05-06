import React,{Component} from "react";
import * as d3 from "d3";

class Child2 extends Component{
    constructor(props){
      super(props);
      this.state={
        target: "total_bill",
      };
    }

    targetDropdown = (event) => {
        const selectedVariable = event.target.value;
        this.setState({ target: selectedVariable }, () => {
          this.drawBarChart();
        });
      }

    componentDidMount() {
        console.log(this.props.data2);
      }

    componentDidUpdate(){
        this.drawBarChart();
    }

    drawBarChart = () => {
        var data = this.props.data2;
    var temp_data = d3.flatRollup(
        data,
        (d) => d.length,
        (d) => d.day
      );

    var margin = { top: 10, right: 10, bottom: 30, left: 20 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    var svg = d3
      .select(".barChart")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom);

      var x_data = temp_data.map((item) => item[0]);
      var x_scale = d3
        .scaleBand()
        .domain(x_data)
        .range([margin.left, w])
        .padding(0.2);

    var y_data = temp_data.map((selectedVariable) => selectedVariable[1]);
    var y_scale = d3
      .scaleLinear()
      .domain([0, d3.max(y_data)])
      .range([h, 0]);
    
    svg
      .selectAll("rect")
      .data(temp_data)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x_scale(d[0]);
      })
      .attr("y", function (d) {
        return y_scale(d[1]);
      })
      .attr("width", x_scale.bandwidth())
      .attr("height", function (d) {
        return h - y_scale(d[1]);
      })

      svg.append('g')
        .attr('transform', `translate(0,265)`)
        .call(d3.axisBottom(x_scale));

    svg.append('g')
        .attr('transform', `translate(20,4)`)
        .call(d3.axisLeft(y_scale));

        svg.append("text")
        .text("Day")
        .attr("x", 250)
        .attr("y", 290);

        svg.append("text")
        .text("Tips")
        .attr("x", -5)
        .attr("y", 150);
    }
    



    render(){
        return <div>
        <div>
            Select Target:
            <select value={this.state.target} onChange={this.targetDropdown}>
              <option value="total_bill">Total Bill</option>
              <option value="tip">Tip</option>
              <option value="size">Size</option>
            </select>
          </div>
          <svg className ="barChart"></svg>
        </div>
      }
}
    
export default Child2;