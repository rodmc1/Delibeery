import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Map from '../Map';
import OrderDetails from './OrderDetails';
import ConfirmedOrder from './ConfirmedOrder';
import { Route } from 'react-router-dom';
import CouponInput from './Coupon';

const CheckoutPage = ({ cartData, handleOrder }) => {
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
      <Grid container spacing={2} style={{ marginTop: '5%' }}>
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
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CheckoutPage;
