import React, { useState } from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import RemoveRoundedIcon from '@material-ui/icons/RemoveRounded';

const CardDetails = ({ product, getTotalCartItems }) => {
  const [productCount, setProductCount] = useState(0);
  const getAddedProduct = {
    ...product,
    quantity: 1
  };

  const onChangeProduct = (type) => {
    if (type === 'ADD') {
      setProductCount(productCount + 1);
    } else {
      setProductCount(productCount ? productCount - 1 : productCount);
    }
    getTotalCartItems(getAddedProduct, type);
  };

  return (
    <div>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={product.name}
          height="250"
          image={product.img}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <hr />
          <Typography gutterBottom variant="h6" component="h6">
            ₱ {Number(product.price).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Beer Details here
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        style={{
          backgroundColor: 'lightgrey',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
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
      </CardActions>
    </div>
  );
};

export default CardDetails;
