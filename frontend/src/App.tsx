import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

export default function App() {
  return (
    <div>
      <h1>🛒 Store Product Manager</h1>
      <ProductForm />
      <hr />
      <ProductList />
    </div>
  );
}
