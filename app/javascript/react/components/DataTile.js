import React, { useState, useEffect } from 'react'

const DataTile = props => {

  let currentPrice = props.price[props.price.length-1]

  return (
    <div>
      Current Price:
      <h1>$ {currentPrice}</h1>
    </div>
  )
}

export default DataTile
