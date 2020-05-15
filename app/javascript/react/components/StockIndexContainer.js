import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import StockTile from './StockTile'
import Instructions from './Instructions'

const StockIndexContainer = props => {
  const [stocks, setStocks] = useState([])
  const [errors, setErrors] = useState(null)
  const [redirect, setRedirect] = useState(false)

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
  }, [redirect])

  const deleteStock = (stock) =>  {
    if (window.confirm(`Are you sure you would like to delete ${stock.symbol}?`)) {
      fetch(`/api/v1/stocks/${stock.id}`, {
        credentials: "same-origin",
        method: 'DELETE',
        headers: {
          "Accept": "application/json",
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
      .then(body => {
        if (body.notification) {
          setRedirect(true)
          alert(body.notification)
        } else {
          setErrors(body.error)
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }
  }

  const stockList = stocks.map(stock => {
    return (
      <StockTile
      key={stock.symbol}
      stock={stock}
      delete={deleteStock}
      />
    )
  })

  let portfolioTitle = "My Portfolio"
  let instructionsBlock;
  if (stockList.length == 0) {
    portfolioTitle = ""
    instructionsBlock = <Instructions/>
  }


  return(
    <div className="grid-container index-container">
      <div className="my-portfolio">
        <h3>{portfolioTitle}</h3>
      </div>
      {instructionsBlock}
      {stockList}
      <div className="text-center button-bar">
        <Link to="/stocks/new" className="button track-button">Track a new Stock!</Link>
      </div>
    </div>
  )
}

export default StockIndexContainer;
