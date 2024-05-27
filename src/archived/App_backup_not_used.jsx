import React, { useState } from 'react';
import './App.css';

// const API_KEY = 'UU2S7UCOV8ON8C9E'; 
const API_KEY = 'demo'; 

function App() {
  const [stocks, setStocks] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  async function handleAddStock(event) {
    event.preventDefault();

    // Fetch current stock price from Alpha Vantage API
    const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
    const data = await response.json();
    const currentPrice = data['Global Quote'] && data['Global Quote']['05. price'];

    if (currentPrice) {

      const numericCurrentPrice = parseFloat(currentPrice);
      const numericPurchasePrice = parseFloat(price);
      const numericQuantity = parseInt(quantity, 10);

      // Calculate profit/loss
      const profitLoss = (numericCurrentPrice - numericPurchasePrice) * numericQuantity;

      // Add the new stock with the fetched current price
      const newStock = { symbol, quantity, price, currentPrice: numericCurrentPrice.toFixed(2), profitLoss: profitLoss.toFixed(2) };
      setStocks([...stocks, newStock]);

      // Reset the form fields
      setSymbol('');
      setQuantity('');
      setPrice('');
    } else {
      console.error("Failed to fetch the stock price.");
    }
  }

  return (
    <div className="container">
      <h1>Finance Dashboard</h1>
      <StockForm
        symbol={symbol}
        setSymbol={setSymbol}
        quantity={quantity}
        setQuantity={setQuantity}
        price={price}
        setPrice={setPrice}
        handleAddStock={handleAddStock}
      />
      <StockList stocks={stocks} />
    </div>
  );
}

function StockForm({ symbol, setSymbol, quantity, setQuantity, price, setPrice, handleAddStock }) {
  return (
    <form onSubmit={handleAddStock}>
      <input
        type="text"
        placeholder="Stock Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        type="number"
        placeholder="Purchase Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit">Add Stock</button>
    </form>
  );
}

function StockList({ stocks }) {
  return (
    <div>
      <h2>Stock List</h2>
      {stocks.length === 0 ? (
        <p>No stocks added yet.</p>
      ) : (
        <ul>
          {stocks.map((stock, index) => (
            <li key={index}>
            <div>
              <p><strong>Stock Symbol:</strong> {stock.symbol}</p>
              <p><strong>Quantity:</strong> {stock.quantity}</p>
              <p><strong>Purchase Price:</strong> {stock.price}</p>
              <p><strong>Current Price:</strong> {stock.currentPrice}</p>
              <p className={stock.profitLoss < 0 ? 'loss' : ''}><strong>Profit/Loss:</strong> {stock.profitLoss}</p>
            </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
