import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../utils/NotFound/NotFound';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import DetailProduct from './detailProduct/DetailProduct';
import Products from './products/Products';

const Pages = () => {
  return (
    <Switch>
      <Route path='/' exact component={Products} />
      <Route path='/detail/:id' exact component={DetailProduct} />

      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/cart' component={Cart} />

      <Route path='*' exact component={NotFound} />
      <Cart />
    </Switch>
  );
};

export default Pages;
