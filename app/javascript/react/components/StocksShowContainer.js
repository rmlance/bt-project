import React, { useState, useEffect, Component } from 'react'
import ChartTile from './ChartTile'
import DataTile from './DataTile'

const StocksShowContainer = props => {
  const [stockData, setStockData] = useState([
      {
        "p":"",
        "t":""
      }
  ])

  useEffect(()=> {
    fetch('/api/v1/stocks', {
      credentials: "same-origin"
    })
    .then(response => {
      if(response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(parsedStockData => {
      setStockData(parsedStockData.stocks[0].records)
    })
    .catch(error => console.error(`Error in fetch: ${errorMessage}`))
  }, [])


  const socket = new WebSocket('wss://ws.finnhub.io?token=bqjd6h7rh5r89luqup70');

  socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
  });

  socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
    let parsedData = JSON.parse(event.data)
    if (parsedData.type == "trade") {
      let newDataPoint = parsedData.data[0]
      // let newTimePoint = new Date(newDataPoint.t).toLocaleString()
      setStockData([...stockData, newDataPoint])
    }
  });

  var unsubscribe = function(symbol) {
    socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
  }

  return(
    <div className="grid-container">
      <h5>Stock Dashboard</h5>
      <div className="grid-x">
        <div className="cell medium-6">
          <ChartTile
            data={stockData}
            // labels={labelsArray}
          />
        </div>
        <div className="cell medium-5">
          <DataTile
            data={stockData}
          />
        </div>
      </div>
    </div>
  )
}

export default StocksShowContainer;
