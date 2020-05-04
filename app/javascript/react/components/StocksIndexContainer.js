import React, { useState, useEffect, Component } from 'react'
import classes from "./LineGraph.module.css";
import ChartTile from './ChartTile'
import LineChart from './LineChart'

const StocksIndexContainer = props => {


  return(
    <div className={classes.container}>
      <h5>Stock Dashboard</h5>
      <LineChart />
    </div>
  )
}

export default StocksIndexContainer;
