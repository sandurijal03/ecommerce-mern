import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../../utils/productItem/ProductItem';
import './Products.css';

const Products = () => {
  const state = useContext(GlobalState);

  // const [products] = state.productsAPI.products;
  const [products] = state.ProductAPI.products;

  return (
    <div className='products'>
      {/* <h1>Hello</h1> */}
      {products.map((product) => {
        return <ProductItem key={product._id} product={product} />;
      })}
    </div>
  );
};

export default Products;
