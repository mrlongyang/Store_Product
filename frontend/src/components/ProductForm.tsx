// src/components/ProductForm.tsx
import React, { useState } from 'react';
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

const initialForm: Product = {
  product_code: '',
  product_type: '',
  product_name_la: '',
  product_name_en: '',
  price: 0,
  quantity: 0,
  date_received: '',
  status: 'active',
};

export default function ProductForm() {
  const [form, setForm] = useState<Product>(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/products', form);
      alert('✅ Product added');
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add product');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <input name="product_code" value={form.product_code} onChange={handleChange} placeholder="Product Code" />
      <input name="product_type" value={form.product_type} onChange={handleChange} placeholder="Product Type" />
      <input name="product_name_la" value={form.product_name_la} onChange={handleChange} placeholder="Name (Lao)" />
      <input name="product_name_en" value={form.product_name_en} onChange={handleChange} placeholder="Name (Eng)" />
      <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" />
      <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" />
      <input type="date" name="date_received" value={form.date_received} onChange={handleChange} />
      <input name="status" value={form.status} onChange={handleChange} placeholder="Status" />
      <button type="submit">Save</button>
    </form>
  );
}
