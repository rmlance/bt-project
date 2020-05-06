import React, { useState } from 'react'
import _ from "lodash"
import { Link } from 'react-router-dom'
import ErrorList from "./ErrorList"


const NewStockForm = props => {
  const [errors, setErrors] = useState({})
  const [newFormPayload, setNewFormPayload] = useState({
    symbol: ""
  })

  const handleInputChange = event => {
    setNewFormPayload({
      ...newFormPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["symbol"]
    requiredFields.forEach(field => {
      if (newFormPayload[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        }
      }
    })
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (validForSubmission()) {
      props.addNewStock(newFormPayload)
      setNewFormPayload({
        symbol: ""
      })
      setErrors({})
    }
  }

    return(
      <div>
        <div className="grid-container new-form-box">
          <form onSubmit={handleSubmit}>
            <ErrorList errors={errors} />

            <label className="symbol">
              Enter Desired Stock Ticker Symbol (Example: "AAPL"):
              <input
                name="symbol"
                id="symbol"
                type="text"
                onChange={handleInputChange}
                value={newFormPayload.name}
              />
            </label>

          <div className="button-group">
            <input className="button" type="submit" value="Track This Stock" />
          </div>
          </form>
        </div>
        <div className="">
        <Link to="/">Back to Home</Link>
        </div>
      </div>
    )
  }

export default NewStockForm
