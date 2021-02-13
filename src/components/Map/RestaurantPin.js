import { Marker } from 'react-map-gl';
import Pin from '../../imgs/delibeery-pin.webp';
import React from 'react';

const RestaurantPin = () => {
  return (
    <Marker key={`1`} latitude={14.637202} longitude={121.0415983}>
      <img
        src={Pin}
        width="50px"
        height="50px"
        style={{ position: 'absolute', top: '-50px', left: '-30px' }}
      />
    </Marker>
  );
};

export default RestaurantPin;
