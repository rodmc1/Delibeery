import React, { useState } from 'react';
import Home from './Home';
import Cart from './Cart';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Appbar from './Appbar';
import Checkout from './Checkout';
import ConfirmedOrder from './Checkout/ConfirmedOrder';

const App = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartData, setCartData] = useState([]);

  const onChangeProduct = (cartSelectedItems, cartTotalCount) => {
    setCartItemCount(cartTotalCount);
    setCartData(cartSelectedItems);
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Appbar cartItemCount={cartItemCount} />
          <Home onChangeProduct={onChangeProduct} />
        </Route>
        <Route path="/cart" exact>
          <Appbar cartItemCount={cartItemCount} />
          <Cart cartData={cartData} onChangeProduct={onChangeProduct} />
        </Route>
        <Route path="/checkout" exact>
          <Appbar cartItemCount={cartItemCount} />
          <Checkout cartData={cartData} />
        </Route>
        <Route path="/checkout/confirmed" exact>
          <Appbar />
          <ConfirmedOrder />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
