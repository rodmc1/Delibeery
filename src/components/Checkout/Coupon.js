import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0, 0, 1),
      width: '30ch'
    }
  }
}));

const CouponInput = ({ handleCoupon }) => {
  const [couponText, setCouponText] = useState('');
  const classes = useStyles();
  let disable = couponText.length > 0 ? false : true;

  const onCouponSubmit = (e) => {
    e.preventDefault();
    handleCoupon(couponText);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="standard-basic"
        label="Have a coupon code?"
        value={couponText}
        onChange={(e) => setCouponText(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        size="small"
        disabled={disable}
        onClick={(e) => onCouponSubmit(e)}>
        Submit Coupon
      </Button>
    </form>
  );
};

export default CouponInput;
