import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../imgs/delibeery.png';
import useStyles from './UseStyles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import Tooltip from '@material-ui/core/Tooltip';

const Appbar = ({ cartItemCount }) => {
  const classes = useStyles();
  let location = useLocation();

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}>
            <Typography className={classes.title} variant="h4" noWrap>
              <img
                style={{
                  width: 37,
                  height: 35,
                  borderRadius: 10,
                  marginRight: 5
                }}
                src={logo}
              />
              <span style={{ verticalAlign: 'center', float: 'right' }}>
                Delibeery
              </span>
            </Typography>
          </Link>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {location.pathname === '/manage/orders' ? (
              <Link
                to="/manage/products"
                style={{ color: 'inherit', textDecoration: 'inherit' }}>
                <Tooltip title="Manage Products" aria-label="Manage Products">
                  <IconButton aria-label="Manage Products" color="inherit">
                    <SettingsIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </Link>
            ) : (
              <Link
                to="/cart"
                style={{ color: 'inherit', textDecoration: 'inherit' }}>
                <IconButton aria-label="show product count" color="inherit">
                  <Badge badgeContent={cartItemCount} color="secondary">
                    <ShoppingCartOutlinedIcon fontSize="large" />
                  </Badge>
                </IconButton>
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Appbar;
