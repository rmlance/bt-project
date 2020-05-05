import React, { useState, useEffect, Component } from 'react'
import ChartTile from './ChartTile'
import DataTile from './DataTile'

const StocksIndexContainer = props => {
  const [priceData, setPriceData] = useState([])
  const [timeData, setTimeData] = useState([])

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
      let newTimePoint = new Date(newDataPoint.data[0].t).toLocaleString()
      setPriceData([...priceData, newPricePoint])
      setTimeData([...timeData, newTimePoint])
    }
  });

  // Unsubscribe
  var unsubscribe = function(symbol) {
    socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
  }

  return(
    <div className="grid-container">
      <h5>Stock Dashboard</h5>
      <div className="grid-x">
        <div className="cell medium-6">
          <ChartTile
            labels={timeData}
            data={priceData}
          />
        </div>
        <div className="cell medium-6">
          <DataTile
            price={priceData}
          />
        </div>
      </div>
    </div>
  )
}

export default StocksIndexContainer;
