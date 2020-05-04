import React, { Component } from 'react'
import Chart from "chart.js";

export default class LineGraph extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: ["Time1", "Time2", "Time3"],
        datasets: [
          {label: "Apple", data: [199.24, 255.2, 223.34]}
        ]
      },
      options: {
          //Customize chart options
      }
    });
  }

  render() {
    return (
      <div>
        <canvas
          id="myChart"
          ref={this.chartRef}
        />
      </div>
    )
  }
}
