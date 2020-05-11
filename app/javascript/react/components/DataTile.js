import React, { useState, useEffect } from 'react'
import _ from 'lodash'

const DataTile = props => {
  let price = "Establishing network connection..."
  let startingCapital;
  let buyingPower;
  let holdingValue = 0;
  let totalAssetValue;
  let shares = 0;
  let marketGrowth;
  let capitalGrowth;
  let relativeReturn;
  let mostRecent;
  let starting;
  let mostRecentCapital;


  if (!_.isEmpty(props.staticData)) {
    startingCapital = props.staticData.starting_capital
    if (props.liveData.length > 1) {
      price = props.liveData[props.liveData.length-1].p
      buyingPower = startingCapital
      totalAssetValue = (parseFloat(buyingPower) + parseFloat(holdingValue)).toFixed(2)
    }
    if (!_.isEmpty(props.staticData.records)) {
      mostRecent = props.staticData.records[props.staticData.records.length - 1]
      starting = props.staticData.records[0]
      shares = mostRecent.quantity
      buyingPower = parseFloat(mostRecent.capital).toFixed(2)
      holdingValue = (mostRecent.quantity * props.liveData[props.liveData.length - 1].p).toFixed(2)
      totalAssetValue = (parseFloat(buyingPower) + parseFloat(holdingValue)).toFixed(2)
      marketGrowth = ((parseFloat(mostRecent.p) - parseFloat(starting.p)) / parseFloat(starting.p) * 100).toFixed(3)
      capitalGrowth = ((totalAssetValue - parseFloat(startingCapital)) / parseFloat(startingCapital) * 100).toFixed(3)
      relativeReturn = (capitalGrowth - marketGrowth).toFixed(3)
      price = props.liveData[props.liveData.length-1].p
    }
    if (!_.isEmpty(props.staticData.records) && props.liveData.length > 1) {
      mostRecent = props.liveData[props.liveData.length - 1]
      starting = props.staticData.records[0]
      mostRecentCapital = parseFloat(props.staticData.records[props.staticData.records.length - 1].capital)
      price = parseFloat(mostRecent.p)
      marketGrowth = ((price - parseFloat(starting.p)) / parseFloat(starting.p) * 100).toFixed(3)
      capitalGrowth = ((totalAssetValue - parseFloat(startingCapital)) / parseFloat(startingCapital) * 100).toFixed(3)
      relativeReturn = (parseFloat(capitalGrowth) - parseFloat(marketGrowth)).toFixed(3)
    }

  }


  return (
    <div className="grid-x data-tile">
      <div className="cell medium-12 data-cell">
        <p>Current Price:</p>
        <h3>$ {price}</h3>
      </div>
      <div className="cell medium-6 data-cell">
        <p>Starting Capital:</p>
        <h3>$ {startingCapital}</h3>
      </div>
      <div className="cell medium-6 data-cell">
        <p>Holding value:</p>
        <h3>$ {holdingValue}</h3>
      </div>
      <div className="cell medium-6 data-cell">
        <p>Buying Power:</p>
        <h3>$ {buyingPower}</h3>
      </div>
      <div className="cell medium-6 data-cell">
        <p>Total Asset Value:</p>
        <h3>$ {totalAssetValue}</h3>
      </div>
      <div className="cell medium-3 data-cell">
        <p>Current Shares:</p>
        <h3>{shares}</h3>
      </div>
      <div className="cell medium-3 data-cell">
        <p>Market Growth:</p>
        <h4>{marketGrowth} %</h4>
      </div>
      <div className="cell medium-3 data-cell">
        <p>Capital Growth:</p>
        <h4>{capitalGrowth} %</h4>
      </div>
      <div className="cell medium-3 data-cell">
        <p>Relative Return:</p>
        <h4>{relativeReturn} %</h4>
      </div>
    </div>
  )
}

export default DataTile
