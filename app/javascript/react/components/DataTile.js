import React, { useState, useEffect } from 'react'

const DataTile = props => {
let currentPrice = "Establishing network connection..."

  if (props.data.length > 1) {
    currentPrice = props.data[props.data.length - 1].p
  }

  return (
    <div>
      Current Price:
      <p>$ {currentPrice}</p>
      <div className="callout">
        More data coming here soon...
      </div>
    </div>
  )
}

export default DataTile
