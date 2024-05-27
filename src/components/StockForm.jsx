import React, { useState, useContext, useCallback } from 'react';
import { StockContext } from './StockContext';

// const API_KEY = 'UU2S7UCOV8ON8C9E';
const API_KEY = 'demo';

function StockForm() {
  const { stocks, setStocks } = useContext(StockContext);
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleAddStock = useCallback(async (event) => {
    event.preventDefault();

    const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
    const data = await response.json();
    const currentPrice = data['Global Quote'] && data['Global Quote']['05. price'];

    if (currentPrice) {
      const numericCurrentPrice = parseFloat(currentPrice);
      const numericPurchasePrice = parseFloat(price);
      const numericQuantity = parseInt(quantity, 10);

      const profitLoss = (numericCurrentPrice - numericPurchasePrice) * numericQuantity;

      const newStock = { symbol, quantity, price, currentPrice: numericCurrentPrice.toFixed(2), profitLoss: profitLoss.toFixed(2) };
      setStocks([...stocks, newStock]);

      setSymbol('');
      setQuantity('');
      setPrice('');
    } else {
      console.error("Failed to fetch the stock price.");
    }
  }, [symbol, quantity, price, stocks, setStocks]);

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

export default StockForm;
