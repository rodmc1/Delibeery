import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Map from '../Map';
import OrderDetails from './OrderDetails';
import Appbar from '../Appbar';

const CheckoutPage = ({
  cartData,
  handleOrder,
  onChangeProduct,
  cartItemCount
}) => {
  const [restaurantCoords, setRestaurantCoords] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState([]);
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState([]);
  const [pinnedLoc, setPinnedLoc] = useState([]);

  const getMapDetails = (
    selected,
    coordinates,
    deliveryTime,
    pinnedLocationName
  ) => {
    setRestaurantCoords(coordinates);
    setSelectedPlace(selected);
    setEstimatedDeliveryTime(deliveryTime);
    setPinnedLoc(pinnedLocationName);
  };

  return (
    <div>
      <Appbar cartItemCount={cartItemCount} />
      <Grid container spacing={2} style={{ marginTop: '5%' }}>
        {!cartData.length ? (
          <div>
            <h1>Your cart is empty</h1>
          </div>
        ) : (
          <>
            <Grid item xs={12} md={8} lg={8}>
              <Grid
                item
                xs={6}
                md={4}
                lg={4}
                style={{ maxWidth: '300px', margin: '1%' }}>
                <Map getMapDetails={getMapDetails} />
              </Grid>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <OrderDetails
                selectedPlace={selectedPlace}
                restaurantCoords={restaurantCoords}
                estimatedDeliveryTime={estimatedDeliveryTime}
                cartData={cartData}
                pinnedLoc={pinnedLoc}
                handleOrder={handleOrder}
                onChangeProduct={onChangeProduct}
              />
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default CheckoutPage;
