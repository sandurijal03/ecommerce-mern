import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../utils/NotFound/NotFound';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import Products from './products/Products';

const Pages = () => {
  return (
    <Switch>
      <Route path='/products' component={Products} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/cart' component={Cart} />
      <Route path='*' component={NotFound} />
      <Cart />
    </Switch>
  );
};

export default Pages;
