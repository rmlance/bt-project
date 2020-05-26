import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import StocksIndexContainer from './StockIndexContainer'
import StocksShowContainer from './StocksShowContainer'
import NewStockContainer from './NewStockContainer'
import RecordsShowContainer from "./RecordsShowContainer"

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={StocksIndexContainer}></Route>
        <Route exact path='/stocks/new' component={NewStockContainer}></Route>
        <Route exact path='/stocks/:id' component={StocksShowContainer}></Route>
        <Route exact path='/stocks/:id/records' component={RecordsShowContainer}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
