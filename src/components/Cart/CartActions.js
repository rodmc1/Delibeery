import React from 'react';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

const CartActions = ({ product, getTotalCartItems }) => {
  return (
    <div>
      <CardActionArea>
        <CardMedia
          style={{ height: 100 }}
          image={product.img}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h6">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Total ₱ {product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        style={{
          backgroundColor: 'lightgrey',
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
        <Button
          size="small"
          color="default"
          variant="contained"
          onClick={() => getTotalCartItems(product, 'REDUCE')}
          style={{ backgroundColor: 'white', height: '20px' }}>
          <RemoveRoundedIcon />
        </Button>
        <Typography
          variant="body2"
          component="p"
          style={{
            backgroundColor: '#E5E4E2',
            borderRadius: 5,
            width: '10%',
            textAlign: 'center',
            color: '#3D3C3A'
          }}>
          {product.quantity}
        </Typography>
        <Button
          size="small"
          color="default"
          variant="contained"
          onClick={() => getTotalCartItems(product, 'ADD')}
          style={{ backgroundColor: 'white', height: '20px' }}>
          <AddRoundedIcon />
        </Button>
      </CardActions>
    </div>
  );
};

export default CartActions;
