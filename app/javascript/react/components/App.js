import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import StocksIndexContainer from './StockIndexContainer'
import StocksShowContainer from './StocksShowContainer'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={StocksIndexContainer}></Route>
        <Route exact path='/dashboard' component={StocksIndexContainer}></Route>
        <Route exact path='/stocks/:id' component={StocksShowContainer}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
