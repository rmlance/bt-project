import React, { useState, useEffect, Component } from 'react'
import { Link } from 'react-router-dom'
import ChartTile from './ChartTile'
import DataTile from './DataTile'
import TradeForm from './TradeForm'
import MarketHours from './MarketHours'

const StocksShowContainer = props => {
  const [stockData, setStockData] = useState([
      {
        "p":"",
        "t":""
      }
  ])
  const [tickerSymbol, setTickerSymbol] = useState({})
  const [newTrade, setNewTrade] = useState({})
  const [staticData, setStaticData] = useState({})
  const [trigger, setTrigger] = useState(false)

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
      setStaticData(parsedStockData.stock)
      setStockData(parsedStockData.stock.records)
      setTickerSymbol(parsedStockData.stock.symbol)
      setTrigger(false)
    })
    .catch(error => console.error(`Error in fetch: ${errorMessage}`))
  }, [trigger])

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
      .then(response => response.json())
      .then(parsedStockData => {
        setTrigger(true)
      })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return(
    <div className="grid-container show-container">
      <h5 className="text-center stock-dashboard">Stock Dashboard</h5>
      <MarketHours/>
      <div className="grid-x show-grid">
        <div className="cell medium-6 chart-tile">
          <ChartTile
            data={stockData}
            staticData={staticData}
          />
        </div>
        <div className="cell medium-6">
          <DataTile
            liveData={stockData}
            staticData={staticData}
          />
        </div>
      </div>
      <div className="grid-x show-grid-2">
        <div className="cell medium-3 directions">
          <ol>
            <li className="direction-titles list">
              Start by entering the quantity of shares you'd like to purchase.
            </li>
            <li className="direction-titles list">
              Use the dropdown to select "Buy" or "Sell".
            </li>
            <li className="direction-titles list">
              Upon clicking "Submit Trade," your request will processed using
              the most recent price available.
            </li>
          </ol>
        </div>
        <div className="cell medium-6">
          <TradeForm
            submitTrade={submitTrade}
          />
        </div>
      </div>
      <div className="track-new-stock text-center">
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  )
}

export default StocksShowContainer;
