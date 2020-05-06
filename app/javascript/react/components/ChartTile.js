import React, { useState, useEffect } from 'react'
import Chart from "chart.js";

const ChartTile = props => {
  let chartRef = React.createRef();

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "line",
      data: {
        labels: props.labels,
        datasets: [
          {
            label: "Apple",
            fill: false,
            lineTension: 0,
            backgroundColor: 'rgb(51, 153, 51)',
            borderColor: 'rgb(51, 153, 51)',
            data: props.data
        }
        ]
      },
      options: {
        responsive: true,
        animation: false,
        maintainAspectRatio: false,
        events: false,
        scales: {
          xAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 3
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 3
              }
            }
          ]
        }
      }
    });
  }, [props])

  return (
    <div className="">
      <div className="">
        <canvas
          id="myChart"
          ref={chartRef}
        />
      </div>
    </div>
  )
}

export default ChartTile
