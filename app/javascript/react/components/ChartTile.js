import React, { Component } from 'react'
import Chart from "chart.js";


const ChartTile = props => {

  let chartRef = React.createRef();
  // const myChartRef = this.chartRef.current.getContext("2d");

  // new Chart(myChartRef, {
  //     type: "line",
  //     data: {
  //         //Bring in data
  //         labels: ["Time1", "Time2", "Time3"],
  //         datasets: [
  //             {label: "Apple", data: [199.24, 255.2, 223.34]}
  //         ]
  //     },
  //     options: {
  //         //Customize chart options
  //     }
  // });

  if (!props) {
    return (
      <div>
        <canvas
          id="myChart"
          ref={this.chartRef}
        />
      </div>
    )
  }else {
    return (
      <div className="grid-container">
      <canvas
      id="myChart"
      ref={this.chartRef}
      />
      </div>
    )
  }
}

export default ChartTile
