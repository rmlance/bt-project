apple = Stock.create(symbol: "APPL")

record1 = Record.create(p: 255.68, t: "5/6/2020, 8:58:48 AM", quantity: 0, buy: 0, sell: 0, stock: apple)
record2 = Record.create(p: 255.75, t: "5/6/2020, 8:59:02 AM", quantity: 10, buy: 0, sell: 0, stock: apple)
record3 = Record.create(p: 255.33, t: "5/6/2020, 8:59:18 AM", quantity: 10, buy: 0, sell: 5, stock: apple)
record4 = Record.create(p: 256.12, t: "5/6/2020, 8:59:30 AM", quantity: 10, buy: 0, sell: 5, stock: apple)

tesla = Stock.create(symbol: "TSLA")

record5 = Record.create(p: 766.68, t: "5/6/2020, 8:58:48 AM", quantity: 0, buy: 0, sell: 0, stock: tesla)
record6 = Record.create(p: 780.75, t: "5/6/2020, 8:59:02 AM", quantity: 10, buy: 0, sell: 0, stock: tesla)
record7 = Record.create(p: 279.33, t: "5/6/2020, 8:59:18 AM", quantity: 10, buy: 0, sell: 5, stock: tesla)
record8 = Record.create(p: 769.12, t: "5/6/2020, 8:59:30 AM", quantity: 10, buy: 0, sell: 5, stock: tesla)
