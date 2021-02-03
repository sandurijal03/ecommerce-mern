import { useEffect, useState } from 'react';

const ProductAPI = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products: [products, setProducts],
  };
};

export default ProductAPI;
