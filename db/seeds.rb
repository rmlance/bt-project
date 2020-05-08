apple = Stock.create(symbol: "AAPL", starting_capital: 20000)

record1 = Record.create(p: 255.68, t: "5/6/2020, 8:58:48 AM", quantity: 5, format: "buy", capital: 10000, stock: apple)
record2 = Record.create(p: 255.75, t: "5/6/2020, 8:59:02 AM", quantity: 3, format: "sell", capital: 10000, stock: apple)
record3 = Record.create(p: 255.33, t: "5/6/2020, 8:59:18 AM", quantity: 1, format: "sell", capital: 10000, stock: apple)
record4 = Record.create(p: 256.12, t: "5/6/2020, 8:59:30 AM", quantity: 10, format: "buy", capital: 10000, stock: apple)

tesla = Stock.create(symbol: "TSLA", starting_capital: 50000)

record5 = Record.create(p: 766.68, t: "5/6/2020, 8:58:48 AM", quantity: 10, format: "buy", capital: 10000, stock: tesla)
record6 = Record.create(p: 767.38, t: "5/6/2020, 8:59:08 AM", quantity: 5, format: "sell", capital: 10000, stock: tesla)
record7 = Record.create(p: 761.56, t: "5/6/2020, 8:59:28 AM", quantity: 5, format: "sell", capital: 10000, stock: tesla)
record8 = Record.create(p: 768.68, t: "5/6/2020, 9:08:12 AM", quantity: 0, format: "buy", capital: 10000, stock: tesla)
