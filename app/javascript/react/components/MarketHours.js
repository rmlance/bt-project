import React from 'react'

const MarketHours = props => {

  let presentDate = new Date()
  let day = presentDate.getDay()
  let time = parseFloat(presentDate.getHours() + "." + presentDate.getMinutes())
  let marketOpen = "market-open"
  let announcement = "MARKET OPEN"
  console.log(day);

  if (time <= 9.30 || time > 16.00 || day > 5) {
    marketOpen = "market-closed"
    announcement = "MARKET CLOSED"
  }

  return (
    <div className="market-hours">
      <div className={marketOpen}>
        {announcement}
      </div>
    </div>
  )
}

export default MarketHours
