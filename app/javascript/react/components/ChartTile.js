import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'

const ChartTile = props => {

let priceArray = []
let labelsArray = []
props.data.map((newPoint) => {
  priceArray.push(newPoint.p)
  let newTimePoint = new Date(parseInt(newPoint.t)).toLocaleString()
  labelsArray.push(newTimePoint)
})

  const chartData = {
    labels: labelsArray,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: 'rgba(0,0,0,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: priceArray
      }
    ]
  }
  const chartOptions = {
    title:{
      display:true,
      text:props.title,
      fontSize:20
    },
    legend:false,
    animation: false
  }

  return (
    <div className="">
      <div>
      <Line
        data={chartData}
        options={chartOptions}
        height={220}
      />
      </div>
    </div>
  )
}

export default ChartTile
