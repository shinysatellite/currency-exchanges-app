"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [rate, setRate] = useState<number | null>(null);
  const [eurAmount, setEurAmount] = useState('');
  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchRate() {
      const res = await fetch('http://localhost:3001/exchange/rate');
      console.log("res", res);
      const data = await res.json();
      setRate(data.rate);
    }
    fetchRate();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('http://localhost:3001/exchange/transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amountEUR: Number(eurAmount) }),
    });
    const data = await res.json();
    setTransaction(data);
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">EUR to PLN Exchange</h1>
      <div className="mb-4">
        <span>Current rate: </span>
        {rate ? <strong>{rate.toFixed(4)}</strong> : 'Loading...'}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="eurAmount" className="block mb-1">Amount in EUR:</label>
          <input
            id="eurAmount"
            type="number"
            step="0.01"
            value={eurAmount}
            onChange={(e) => setEurAmount(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          Convert
        </button>
      </form>

      {transaction && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <p><strong>Amount EUR:</strong> {transaction.amountEUR.toFixed(2)}</p>
          <p><strong>Amount PLN:</strong> {transaction.amountPLN.toFixed(2)}</p>
          <p><strong>Exchange Rate:</strong> {transaction.rate.toFixed(4)}</p>
          <p><strong>Timestamp:</strong> {new Date(transaction.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}