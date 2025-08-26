import express from 'express';
import cors from 'cors';
import productRoutes from './routes/product.route';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
