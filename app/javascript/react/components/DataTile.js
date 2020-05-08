import React, { useState, useEffect } from 'react'
import _ from 'lodash'

const DataTile = props => {
  let price = "Establishing network connection..."
  let startingCapital;
  let buyingPower;
  let holdingValue;
  let totalAssetValue;
  let shares = 0;
  let marketGrowth;
  let capitalGrowth;
  let relativeReturn;


// stock-level:
  if (!_.isEmpty(props.staticData)) {
    startingCapital = props.staticData.starting_capital
// record-level:
    if (!_.isEmpty(props.staticData.records)) {
      let mostRecent = props.staticData.records[props.staticData.records.length - 1]
      let starting = props.staticData.records[0]
      shares = mostRecent.quantity
      buyingPower = mostRecent.capital
      holdingValue = (mostRecent.quantity * props.liveData[props.liveData.length - 1].p).toFixed(2)
      totalAssetValue = (parseFloat(buyingPower) + parseFloat(holdingValue)).toFixed(2)
      marketGrowth = ((parseFloat(mostRecent.p) - parseFloat(starting.p)) / parseFloat(starting.p) * 100).toFixed(3)
      capitalGrowth = ((parseFloat(mostRecent.capital) - parseFloat(starting.capital)) / parseFloat(starting.capital) * 100).toFixed(3)
      relativeReturn = ((capitalGrowth - marketGrowth) / marketGrowth ).toFixed(3)
    }
// live-data-level:
    if (props.liveData.length > 1) {
      // let mostRecent = props.liveData[props.liveData.length - 1]
      // let starting = props.staticData.records[0]
      // price = props.liveData[props.liveData.length-1].p
      // marketGrowth = ((price - parseFloat(props.staticData.records[0].p)) / parseFloat(props.staticData.records[0].p) * 100).toFixed(3)
      // capitalGrowth = ((parseFloat(props.liveData[props.liveData.length - 1].capital) - parseFloat(props.staticData.records[0].capital)) / parseFloat(props.staticData.records[0].capital) * 100).toFixed(3)
      // relativeReturn = ((parseFloat(capitalGrowth) - parseFloat(marketGrowth)) / parseFloat(marketGrowth)).toFixed(3)
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
