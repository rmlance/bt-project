import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import NewStockForm from './NewStockForm'

const NewStockContainer = props => {
  const [redirect, setRedirect] = useState(false)
  const [newStock, setNewStock] = useState({})

  const addNewStock = (formPayload) => {
    debugger
    fetch('/api/v1/stocks', {
      credentials: "same-origin",
      method: 'POST',
      body: JSON.stringify(formPayload),
      headers: {
        Accept: "application/json",
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
    .then(parsedNewStock => {
      let stock = parsedNewStock.stock
      setNewStock(stock)
      setRedirect(true)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  if (redirect) {
    return <Redirect to={`/`} />
  }

  return (
    <div>
      <NewStockForm addNewStock={addNewStock} />
    </div>
  )
}

export default NewStockContainer
