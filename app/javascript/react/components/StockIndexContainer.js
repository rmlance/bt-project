import React, { useState, useEffect } from 'react'
import StockTile from './StockTile'

const StockIndexContainer = props => {
  const [stocks, setStocks] = useState([])

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
      setStocks(parsedStockData.stocks)
    })
    .catch(error => console.error(`Error in fetch: ${errorMessage}`))
  }, [])

  const stockList = stocks.map(stock => {
    return (
      <StockTile
      key={stock.symbol}
      stock={stock}
      />
    )
  })


  return(
    <div className="grid-container">
      {stockList}
      <div>
        <Link to="/stocks/new">Track a new Stock!</Link>
      </div>
    </div>
  )
}

export default StockIndexContainer;
