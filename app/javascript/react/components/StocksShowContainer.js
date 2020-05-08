import React, { useState, useEffect, Component } from 'react'
import ChartTile from './ChartTile'
import DataTile from './DataTile'
import TradeForm from './TradeForm'

const StocksShowContainer = props => {
  const [stockData, setStockData] = useState([
      {
        "p":"",
        "t":""
      }
  ])
  const [tickerSymbol, setTickerSymbol] = useState({})
  const [newTrade, setNewTrade] = useState({})

  const fetchId = props.match.params.id

  useEffect(()=> {
    fetch(`/api/v1/stocks/${fetchId}`, {
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
      setStockData(parsedStockData.stock.records)
      setTickerSymbol(parsedStockData.stock.symbol)
    })
    .catch(error => console.error(`Error in fetch: ${errorMessage}`))
  }, [])

  const apiKey = "bqqknmfrh5rcj5178tl0"
  const socket = new WebSocket(`wss://ws.finnhub.io?token=bqqknmfrh5rcj5178tl0`);

  socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': tickerSymbol}))
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


  const submitTrade = (formPayload) => {
    formPayload.p = stockData[stockData.length-1].p
    formPayload.t = stockData[stockData.length-1].t
    fetch(`/api/v1/stocks/${fetchId}/records`, {
      credentials: "same-origin",
      method: 'POST',
      body: JSON.stringify(formPayload),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if(response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error)
      }
    })
    // .then(response => response.json())
    // .then(parsedNewStock => {
    //   let stock = parsedNewStock.stock
    //   setNewTrade(stock)
    // })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return(
    <div className="grid-container">
      <h5>Stock Dashboard</h5>
      <div className="grid-x">
        <div className="cell medium-6">
          <ChartTile
            data={stockData}
          />
        </div>
        <div className="cell medium-5">
          <DataTile
            data={stockData}
          />
        </div>
      </div>
      <div className="grid-x">
        <div className="cell medium-6">
          <TradeForm
            submitTrade={submitTrade}
          />
        </div>
      </div>
    </div>
  )
}

export default StocksShowContainer;
