import React, { useEffect, useState } from 'react';
import Home from './Home';
import Cart from './Cart';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './Checkout';
import ConfirmedOrder from './Checkout/ConfirmedOrder';
import ManageOrders from './ManageOrders';
import ManageProducts from './ManageProducts';
import { fetchOrders, fetchMenu } from '../api/jsonserver';

const App = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [orderUpdate, setOrderUpdate] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [menu, setMenu] = useState([]);

  const onChangeProduct = (cartSelectedItems, cartTotalCount) => {
    setCartItemCount(cartTotalCount);
    setCartData(cartSelectedItems);
  };

  const handleOrder = (id) => {
    setOrderUpdate(id);
  };

  useEffect(() => {
    fetchMenu().then((data) => {
      setMenu(data);
    });
  }, []);

  useEffect(() => {
    fetchOrders().then((data) => setOrderData(data));
  }, [orderUpdate]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home
            onChangeProduct={onChangeProduct}
            cartData={cartData}
            cartItemCount={cartItemCount}
            menu={menu}
          />
        </Route>
        <Route path="/cart" exact>
          <Cart
            cartData={cartData}
            cartItemCount={cartItemCount}
            onChangeProduct={onChangeProduct}
          />
        </Route>
        <Route path="/checkout" exact>
          <Checkout
            cartData={cartData}
            handleOrder={handleOrder}
            cartItemCount={cartItemCount}
            onChangeProduct={onChangeProduct}
          />
        </Route>
        <Route path="/manage/orders" exact>
          <ManageOrders handleOrder={handleOrder} orderData={orderData} />
        </Route>
        <Route path="/manage/products" exact>
          <ManageProducts orderData={orderData} menu={menu} />
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
