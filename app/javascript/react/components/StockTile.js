import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const StockTile = props => {
// debugger
  const handleDelete = event => {
    event.preventDefault()
    props.delete(props.stock)
  }

  return(
    <div className="grid-x callout">
      <h3 className="stock-title">
        <Link to={`/stocks/${props.stock.id}`} className="">{props.stock.symbol}</Link>
      </h3>
      <div className="cell medium-2">
        Starting Capital: ${props.stock.starting_capital}
      </div>
      <div className="cell medium-2">
        Another Statistic:
      </div>
        <button className="button alert index-button" onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default StockTile;
