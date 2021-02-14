import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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

const MenuLoader = ({ menu }) => {
  const classes = useStyles();

  return !menu.length ? (
    <div>
      <div className={classes.loaderBackground}></div>
      <div className={classes.loader}>
        <CircularProgress size={50} />
        <Typography variant="body2">Loading Menu</Typography>
      </div>
    </div>
  ) : (
    ''
  );
};

export default MenuLoader;
