import React from 'react'

const RecordsTable = (props) => {

  let rowColor = "row-color-light"
  if (props.defineRow % 2 == 0) {
    rowColor = "row-color-dark"
  }

  let time = new Date(parseInt(props.timestamp)).toLocaleString()

  return (
    <div className={`grid-x text-center record-entry ${rowColor}`}>
      <div className="cell medium-3 border">
      {time}
      </div>
      <div className="cell medium-1 border">
      {props.format}
      </div>
      <div className="cell medium-2 border">
      {props.quantity}
      </div>
      <div className="cell medium-2 border">
      $ {props.price}
      </div>
      <div className="cell medium-2 border">
      $ {props.transactionValue}
      </div>
      <div className="cell medium-2 border">
      $ {props.returnValue}
      </div>
    </div>
  )
}

export default RecordsTable
