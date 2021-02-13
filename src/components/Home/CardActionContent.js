import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

const CardActionContent = ({ productCount, product, onChangeProduct }) => {
  if (product.status == 'Out of stock') {
    return (
      <Typography
        variant="h6"
        component="p"
        style={{
          backgroundColor: '#E5E4E2',
          borderRadius: 5,
          width: '100%',
          textAlign: 'center',
          color: 'red'
        }}>
        Out of stock
      </Typography>
    );
  }

  return (
    <>
      <Button
        size="small"
        color="default"
        variant="contained"
        onClick={() => onChangeProduct('REDUCE')}
        style={{ backgroundColor: 'white' }}>
        <RemoveRoundedIcon />
      </Button>
      <Typography
        variant="h6"
        component="p"
        style={{
          backgroundColor: '#E5E4E2',
          borderRadius: 5,
          width: '20%',
          textAlign: 'center',
          color: '#3D3C3A'
        }}>
        {productCount}
      </Typography>
      <Button
        size="small"
        color="default"
        variant="contained"
        onClick={() => onChangeProduct('ADD')}
        style={{ backgroundColor: 'white' }}>
        <AddRoundedIcon />
      </Button>
    </>
  );
};
export default CardActionContent;
