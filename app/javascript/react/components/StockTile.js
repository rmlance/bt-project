import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const StockTile = props => {
console.log(props.stock);
  return(
    <div className="cell">
      <h3>
        <Link to={`/stocks/${props.stock.id}`} className="">{props.stock.symbol}</Link>
      </h3>
    </div>
  )
}

export default StockTile;
