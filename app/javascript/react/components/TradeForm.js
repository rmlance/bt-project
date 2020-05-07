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
    format: ""
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
    setErrors(submitErrors)
    return _.isEmpty(submitErrors)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (validForSubmission()) {
      props.submitTrade(newFormPayload)
      setNewFormPayload({
        quantity: "",
        format: ""
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
                value={newFormPayload.name}
              />
            </label>

            <label className="format">
              Select Buy or Sell
              <input
                name="format"
                id="format"
                type="text"
                onChange={handleInputChange}
                value={newFormPayload.name}
              />
            </label>

          <div className="button-group">
            <input className="button" type="submit" value="Subimt Trade" />
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
