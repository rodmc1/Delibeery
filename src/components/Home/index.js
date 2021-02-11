import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Hero from '../../imgs/main.jpg';
import Menu from './Menu';

const useStyles = makeStyles(() => ({
  paperContainer: {
    backgroundImage: `url(${Hero})`,
    minHeight: '85vh',
    marginTop: 63,
    resizeMode: 'cover'
  }
}));

const Home = ({ onChangeProduct }) => {
  const classes = useStyles();

  return (
    <div>
      <Paper elevation={1} className={classes.paperContainer} />
      <Menu onChangeProduct={onChangeProduct} />
    </div>
  );
};

export default Home;
