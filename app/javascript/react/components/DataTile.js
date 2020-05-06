import React, { useState, useEffect } from 'react'

const DataTile = props => {
let currentPrice;

  if (props.data.length > 1) {
    currentPrice = props.data[props.data.length - 1].p
  }

  return (
    <div>
      Current Price:
      <h1>$ {currentPrice}</h1>
    </div>
  )
}

export default DataTile
