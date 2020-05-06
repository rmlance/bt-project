import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'

const ChartTile = props => {
let title;
let priceArray = []
let labelsArray = []
props.data.map((newPoint) => {
  title = newPoint.s
  priceArray.push(newPoint.p)
  let newTimePoint = new Date(newPoint.t).toLocaleString()
  labelsArray.push(newTimePoint)
})

priceArray.shift()
labelsArray.shift()


  const chartData = {
  labels: labelsArray,
  datasets: [
    {
      label: title,
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: priceArray
    }
  ]
}

  return (
    <div className="">
      <div>
      <Line
        data={chartData}
        options={{
          title:{
            display:true,
            text:'APPL',
            fontSize:20
          },
          legend:{
            display:true,
            position:'right'
          }
        }}
      />
      </div>
    </div>
  )
}

export default ChartTile
