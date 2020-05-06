import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import StocksShowContainer from './StocksShowContainer'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={StocksShowContainer}></Route>
        <Route exact path='/dashboard' component={StocksShowContainer}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
