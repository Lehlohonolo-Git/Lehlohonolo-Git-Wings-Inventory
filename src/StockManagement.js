import React, { useEffect, useState } from 'react';

const StockManagement = () => {
  const [products, setProducts] = useState([]);
  const [transactionType, setTransactionType] = useState('add');
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchTransactions();
  }, []);

  // Fetch all products (with current stock)
  const fetchProducts = async () => {
    const response = await fetch('http://localhost:5000/products');
    const data = await response.json();
    setProducts(data);
  };

  // Fetch all stock transactions
  const fetchTransactions = async () => {
    const response = await fetch('http://localhost:5000/stock-transactions');
    const data = await response.json();
    setTransactions(data);
  };

  // Handle adding or deducting stock
  const handleStockTransaction = async (e) => {
    e.preventDefault();

    if (!selectedProduct || transactionAmount <= 0) {
      alert('Please select a product and enter a valid amount');
      return;
    }

    const type = transactionType;
    const productId = selectedProduct.id;

    const response = await fetch('http://localhost:5000/update-stock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, amount: transactionAmount, type }),
    });

    const result = await response.json();

    if (result.success) {
      alert('Stock updated successfully');
      fetchProducts(); // Refresh products
      fetchTransactions(); // Refresh transactions
    } else {
      alert(result.error);
    }
  };

  return (
    <div>
      <h2>Stock Management</h2>

      {/* Product Table */}
      <h3>Current Stock Levels</h3>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Stock Transaction Form */}
      <h3>Update Stock</h3>
      <form onSubmit={handleStockTransaction}>
        <select
          value={selectedProduct ? selectedProduct.id : ''}
          onChange={(e) =>
            setSelectedProduct(products.find((p) => p.id === parseInt(e.target.value)))
          }
        >
          <option value="">Select Product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="add">Add Stock</option>
          <option value="deduct">Deduct Stock</option>
        </select>

        <input
          type="number"
          value={transactionAmount}
          onChange={(e) => setTransactionAmount(e.target.value)}
          placeholder="Amount"
        />

        <button type="submit">Submit Transaction</button>
      </form>

      {/* Transaction History */}
      <h3>Transaction History</h3>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => {
            const product = products.find((p) => p.id === transaction.productId);
            return (
              <tr key={index}>
                <td>{product ? product.name : 'Unknown'}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.type}</td>
                <td>{new Date(transaction.date).toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StockManagement;
