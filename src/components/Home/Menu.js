import React from 'react';
import Cards from './Cards';

const Menu = ({ onChangeProduct, cartData, cartItemCount, menu }) => {
  return (
    <div className="container">
      <Cards
        menu={menu}
        onChangeProduct={onChangeProduct}
        cartData={cartData}
        cartItemCount={cartItemCount}
      />
    </div>
  );
};

export default Menu;
