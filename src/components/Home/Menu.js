import React, { useEffect, useState } from 'react';
import { fetchMenu } from '../../api/jsonserver';
import Cards from './Cards';

const Menu = ({ onChangeProduct }) => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetchMenu().then((data) => {
      setMenu(data);
    });
  }, []);

  return (
    <div className="container">
      <Cards menu={menu} onChangeProduct={onChangeProduct} />
    </div>
  );
};

export default Menu;
