import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import StocksIndexContainer from './StocksIndexContainer'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={StocksIndexContainer}></Route>
        <Route exact path='/dashboard' component={StocksIndexContainer}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
