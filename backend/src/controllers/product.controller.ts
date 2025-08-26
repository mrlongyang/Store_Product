import { Request, Response } from 'express';
import { db } from '../config/db';
import { Product } from '../models/product.model';

export const createProduct = async (req: Request, res: Response) => {
  const p: Product = req.body;
  await db.query(
    `INSERT INTO product 
     (product_code, product_type, product_name_la, product_name_en, price, quantity, date_received, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [p.product_code, p.product_type, p.product_name_la, p.product_name_en, p.price, p.quantity, p.date_received, p.status]
  );
  res.json({ message: 'Product created' });
};

export const getProducts = async (_req: Request, res: Response) => {
  const [rows] = await db.query('SELECT * FROM `product`');
  res.json(rows);
};


export const updateProduct = async (req: Request, res: Response) => {
  const code = req.params.code;
  const p: Product = req.body;
  await db.query(
    `UPDATE product SET product_type=?, product_name_la=?, product_name_en=?, price=?, quantity=?, date_received=?, status=? WHERE product_code=?`,
    [p.product_type, p.product_name_la, p.product_name_en, p.price, p.quantity, p.date_received, p.status, code]
  );
  res.json({ message: 'Product updated' });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const code = req.params.code;

  try {
    // 1️⃣ First, delete related sales rows (foreign key dependency)
    await db.query('DELETE FROM `sales` WHERE product_code = ?', [code]);

    // 2️⃣ Then delete the product itself
    const [result]: any = await db.query('DELETE FROM `product` WHERE product_code = ?', [code]);

    // 3️⃣ Check if anything was deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product and related sales deleted' });

  } catch (error) {
    console.error('❌ Delete product error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
