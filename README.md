# README
[![Codeship Status for rmlance/bt-project](https://app.codeship.com/projects/d4642f90-7531-0138-4fbf-0a880ae04a25/status?branch=master)](https://app.codeship.com/projects/395914)
# DevTrade
###### Trade stocks without the risk of investing real money.
DevTrade is a web application designed for users to learn about the stock market risk-free. Users can create an account and choose stocks to track by entering a valid New York Stock Exchange ticker symbol and indicating a "starting capital" amount to invest with. Users can then track real-time data from the stock market (during market hours) to buy and sell stocks using their starting capital. The app automatically calculates statistics about your trades based on live data from the stock market. In particular, you can identify how well your trades are performing relative to the market growth over the same period of your trades. Users can track multiple stocks and run multiple simulations at a time to test your skills against any company on the NYSE.
###### Try to beat the market!

# Author
* Reid Lance

## Built using the following technologies:
* Ruby on Rails
* Javascript
* React.js
* Chart.js (react-chartjs-2)
* PostgreSQL
* Finnhub API
* CSS
* HTML
* Devise
* RSpec

# Getting Started:

###### Versions:
* Ruby 2.6.5
* Rails 5.2.4.2
* PostgreSQL 12

###### 1. Clone this repository:
`git clone https://github.com/rmlance/bt-project`

###### 2. Build database:
`bundle exec rake db:create`
`bundle exec rake db:migrate`

###### 3. Running the test suite:
`bundle exec rspec`

###### 4. Running the app in your own local development environment:
* Start the rails server:
`bundle exec rails server`
* Start the webpack-dev-server:
`yarn run start`
* Navigate to `http://localhost:3000` in your broswer.


