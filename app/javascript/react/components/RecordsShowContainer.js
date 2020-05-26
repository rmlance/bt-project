import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RecordsTable from './RecordsTable'

const RecordsShowContainer = (props) => {
  const [records, setRecords] = useState([])
  const fetchId = props.match.params.id

  useEffect(() => {
    fetch(`/api/v1/stocks/${fetchId}`, {
      credentials: "same-origin"
    })
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(parsedResponse => {
      setRecords(parsedResponse.stock.records)
    })
    .catch(error => console.error(`Error in fetch: ${errorMessage}`))
  }, [])

  const allRecords = records.map((record) => {
    return (
      <div key={record.id}>
        <RecordsTable
          defineRow={record.id}
          price={record.p}
          timestamp={record.t}
          quantity={record.quantity}
          format={record.format}
          transactionValue={record.transaction_value}
          returnValue={record.return_value}
        />
      </div>
    )
  })

  return (
    <div className="grid-container records-table">
      <div className="grid-x text-center record-headers">
        <div className="cell medium-3">
        Date, Time
        </div>
        <div className="cell medium-1">
        Format
        </div>
        <div className="cell medium-2">
        Holding Quantity
        </div>
        <div className="cell medium-2">
        Price
        </div>
        <div className="cell medium-2">
        Transaction Value
        </div>
        <div className="cell medium-2">
        Return Value
        </div>
      </div>
      {allRecords}
      <div className="text-center back-button">
        <Link to={`/stocks/${fetchId}`}>Back to Market</Link>
      </div>
    </div>
  )
}

export default RecordsShowContainer
