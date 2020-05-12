import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const StockTile = props => {
// debugger
  const handleDelete = event => {
    event.preventDefault()
    props.delete(props.stock)
  }

  return(
    <div className="grid-x callout index-callouts">
      <h3 className="stock-title">
        <Link to={`/stocks/${props.stock.id}`} className="stock-title">{props.stock.symbol}</Link>
      </h3>
      <div className="cell medium-2 index-data-cell">
        Starting Capital: ${props.stock.starting_capital}
      </div>
        <button className="button alert index-button" onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default StockTile;
