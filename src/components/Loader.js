import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  loader: {
    position: 'fixed',
    zIndex: 999,
    height: '100vh',
    width: '100vw',
    overflow: 'show',
    textAlign: 'center',
    marginTop: '50%',
    verticalAlign: 'center',
    transform: 'translateY(-70%)',
    color: 'white'
  },
  loaderBackground: {
    position: 'fixed',
    zIndex: 998,
    height: '100vh',
    width: '100vw',
    overflow: 'show',
    backgroundColor: 'rgba(0, 0, 0, 0.7);',
    textAlign: 'center',
    verticalAlign: 'center',
    color: 'white'
  }
}));

const Loader = (props) => {
  const classes = useStyles();
  let location = useLocation();
  let isLoading = true;

  if (location.pathname === '/manage/orders') {
    isLoading = !props.orderData.length;
  }
  if (location.pathname === '/') {
    isLoading = !props.menu.length;
  }

  return isLoading ? (
    <div>
      <div className={classes.loaderBackground}></div>
      <div className={classes.loader}>
        <CircularProgress size={50} />
        <Typography variant="body2">{props.message}</Typography>
      </div>
    </div>
  ) : (
    ''
  );
};

export default Loader;
