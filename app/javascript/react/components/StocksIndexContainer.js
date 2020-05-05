import React, { useState, useEffect, Component } from 'react'
import classes from "./LineGraph.module.css";
import ChartTile from './ChartTile'
import LineChart from './LineChart'

const StocksIndexContainer = props => {
  const [priceData, setPriceData] = useState([1])
  const [timeData, setTimeData] = useState([1])

  const socket = new WebSocket('wss://ws.finnhub.io?token=bqjd6h7rh5r89luqup70');

  // Connection opened -> Subscribe
  socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
  });

  // Listen for messages
  socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
    let newDataPoint = JSON.parse(event.data)
    if (newDataPoint.type == "trade") {
      let newPricePoint = newDataPoint.data[0].p
      let newTimePoint = newDataPoint.data[0].t
      setPriceData([...priceData, newPricePoint])
      setTimeData([...timeData, newTimePoint])
      debugger
    }
  });

  // Unsubscribe
  var unsubscribe = function(symbol) {
    socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
  }

  return(
    <div className={classes.container}>
      <h5>Stock Dashboard</h5>
      <LineChart
        labels={timeData}
        data={priceData}
      />
    </div>
  )
}

export default StocksIndexContainer;
