import React, { useState, useEffect } from 'react'
import Chart from "chart.js";

const BackupChartNoWrapper = props => {
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
        scales: {
          xAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 5
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 5
              }
            }
          ]
        }
      }
    });
  }, [props.data])

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

export default BackupChartNoWrapper

// useEffect(()=> {
//   fetch('/api/v1/stocks', {
//     credentials: "same-origin"
//   })
//   .then(response => {
//     if(response.ok) {
//       return response
//     } else {
//       let errorMessage = `${response.status} (${response.statusText})`
//       error = new Error(errorMessage)
//       throw(error)
//     }
//   })
//   .then(response => response.json())
//   .then(parsedStockData => {
//     parsedStockData.stocks[0].records.forEach((record) => {
//       let newPricePoint = parseFloat(record.pice)
//       setPriceData([...priceData, newPricePoint])
//     })
//     setTimeData(parsedStockData)
//   })
//   .catch(error => console.error(`Error in fetch: ${errorMessage}`))
// }, [])
