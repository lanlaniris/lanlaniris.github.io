// StockList.js
import React, { useContext } from 'react';
import { StockContext } from './StockContext';

function StockList() {
  const { stocks } = useContext(StockContext);

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

export default StockList;
