import React, { useEffect, useState } from 'react';
import Home from './Home';
import Cart from './Cart';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Appbar from './Appbar';
import Checkout from './Checkout';
import ConfirmedOrder from './Checkout/ConfirmedOrder';
import ManageOrders from './ManageOrders';
import { fetchOrders } from '../api/jsonserver';

const App = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [orderUpdate, setOrderUpdate] = useState(null);
  const [orderData, setOrderData] = useState([]);

  const onChangeProduct = (cartSelectedItems, cartTotalCount) => {
    setCartItemCount(cartTotalCount);
    setCartData(cartSelectedItems);
  };

  const handleOrder = (id) => {
    setOrderUpdate(id);
  };

  useEffect(() => {
    fetchOrders().then((data) => setOrderData(data));
  }, [orderUpdate]);

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
          <Checkout cartData={cartData} handleOrder={handleOrder} />
        </Route>
        <Route path="/manage/orders" exact>
          <ManageOrders handleOrder={handleOrder} />
        </Route>
        {orderData.map((order) => {
          return (
            <Route key={order.id} path={`/track-order/${order.id}`} exact>
              <ConfirmedOrder order={order} />
            </Route>
          );
        })}
      </Switch>
    </Router>
  );
};

export default App;
