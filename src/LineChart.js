import React, { Component } from "react";
import * as d3 from "d3";
import './App.css'

class App extends Component {
  componentDidMount() {
    var lineGenerator = d3.line().curve(d3.curveCardinal);
    var points = [
      [0, 80],
      [100, 100],
      [200, 30],
      [300, 50],
      [400, 40],
      [500, 80]
    ];

    var pathData = lineGenerator(points)

    // Select the path element and set its d attribute
    d3.select('path').attr('d', pathData).style("fill",'none').style("stroke",'gray')

  }

  render() {
    return (
      <svg width="700" height="110">
        <path></path>
      </svg>

    );
  }
}

export default App;