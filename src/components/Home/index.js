import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Hero from '../../imgs/main.jpg';
import Menu from './Menu';
import Loader from '../Loader';
import Appbar from '../Appbar';

const useStyles = makeStyles(() => ({
  paperContainer: {
    backgroundImage: `url(${Hero})`,
    minHeight: '85vh',
    marginTop: 63,
    resizeMode: 'cover'
  }
}));

const Home = ({ onChangeProduct, cartData, cartItemCount, menu }) => {
  const classes = useStyles();

  return (
    <div>
      <Loader menu={menu} message="Loading Menu" />
      <Appbar cartItemCount={cartItemCount} />
      <Paper elevation={1} className={classes.paperContainer} />
      <Menu
        onChangeProduct={onChangeProduct}
        cartData={cartData}
        cartItemCount={cartItemCount}
        menu={menu}
      />
    </div>
  );
};

export default Home;
