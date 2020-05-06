import React, { useState, useEffect } from 'react'

const DataTile = props => {

let currentPrice;

  if (props.price.length) {
    currentPrice = props.price[props.price.length-1]
    currentPrice = currentPrice.toFixed(2)

  }

  return (
    <div>
      Current Price:
      <h1>$ {currentPrice}</h1>
    </div>
  )
}

export default DataTile
