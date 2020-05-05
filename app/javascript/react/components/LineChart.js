import React, { Component } from 'react'
import Chart from "chart.js";

export default class LineGraph extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "line",
      data: {
        labels: [1, 2, 3],
        datasets: [
          {label: ["Apple"], data: [1, 2, 3]}
        ]
      },
      options: {
      }
    });
  }

  render() {
    return (
      <div>
        <div>
          <p>{this.props.labels}</p>
          <p>{this.props.data}</p>
        </div>
        <canvas
          id="myChart"
          ref={this.chartRef}
          width="400"
          height="100"
        />
      </div>
    )
  }
}
