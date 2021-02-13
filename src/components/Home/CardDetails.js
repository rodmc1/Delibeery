import React, { useEffect, useState } from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import CardActionContent from './CardActionContent';

const CardDetails = ({ product, getTotalCartItems, itemCount }) => {
  const [productCount, setProductCount] = useState(0);
  const getAddedProduct = {
    ...product,
    quantity: 1
  };

  useEffect(() => {
    if (itemCount) {
      setProductCount(itemCount.quantity);
    }
  }, []);

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
        <CardActionContent
          product={product}
          onChangeProduct={onChangeProduct}
          productCount={productCount}
        />
      </CardActions>
    </div>
  );
};

export default CardDetails;
