import React, { useState } from 'react'
import _ from "lodash"
import { Link } from 'react-router-dom'
import ErrorList from "./ErrorList"


const NewStockForm = props => {
  const [errors, setErrors] = useState({})
  const [newFormPayload, setNewFormPayload] = useState({
    p: "",
    t: "",
    quantity: "",
    format: "buy"
  })

  const handleInputChange = event => {
    setNewFormPayload({
      ...newFormPayload,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const validForSubmission = () => {
    let submitErrors = {}
    const requiredFields = ["quantity", "format"]
    requiredFields.forEach(field => {
      if (newFormPayload[field].trim() === "") {
        submitErrors = {
          ...submitErrors,
          [field]: "is blank"
        }
      }
    })
    if (isNaN(newFormPayload["quantity"].trim())) {
      submitErrors = {
        ...submitErrors,
        ["quantity"]: "must be a number"
      }
    }
      if (!_.isEmpty(props.staticData.records)) {
        let quantityCheck = props.staticData.records[props.staticData.records.length - 1].quantity
        if (newFormPayload["format"] == "sell" && (quantityCheck - parseInt(newFormPayload["quantity"].trim())) < 0) {
          submitErrors = {
            ...submitErrors,
            ["quantity"]: "must less than or equal to quantity of current shares"
          }
        }
      }
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (validForSubmission()) {
      props.submitTrade(newFormPayload)
      setNewFormPayload({
        quantity: "",
        format: "buy"
      })
      setErrors({})
    }
  }

    return(
      <div>
        <div className="grid-container new-form-box">
          <form onSubmit={handleSubmit}>
            <ErrorList errors={errors} />

            <label className="quantity">
              Enter Trade Quantity
              <input
                name="quantity"
                id="quantity"
                type="text"
                onChange={handleInputChange}
                value={newFormPayload.quantity}
              />
            </label>

            <select
              name="format"
              id="format"
              type="text"
              value={newFormPayload.format}
              onChange={handleInputChange}
            >
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>

          <div className="button-group">
            <input className="button submit-trade-button" type="submit" value="Submit Trade" />
          </div>
          </form>
        </div>
      </div>
    )
  }

export default NewStockForm
