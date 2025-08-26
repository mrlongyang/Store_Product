import { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

interface Product {
  product_code: string;
  product_type: string;
  product_name_la: string;
  product_name_en: string;
  price: number;
  quantity: number;
  date_received: string;
  status: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await api.get<Product[]>('/products');
      setProducts(res.data); 

    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  const deleteProduct = async (code: string) => {
    if (!window.confirm(`Delete product ${code}?`)) return;
    try {
      await api.delete(`/products/${code}`);
      setProducts(products.filter(p => p.product_code !== code));
    } catch (err) {
      console.error('Failed to delete product', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>📦 Product List</h2>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Code</th>
            <th>Type</th>
            <th>Name (LA)</th>
            <th>Name (EN)</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Date Received</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.product_code}>
              <td>{p.product_code}</td>
              <td>{p.product_type}</td>
              <td>{p.product_name_la}</td>
              <td>{p.product_name_en}</td>
              <td>{p.price}</td>
              <td>{p.quantity}</td>
              <td>{p.date_received}</td>
              <td>{p.status}</td>
              <td>
                <button onClick={() => deleteProduct(p.product_code)}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
