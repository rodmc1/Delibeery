import React, { useState, useEffect } from 'react';
import moment from 'moment';
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  ScaleControl
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

import {
  fetchLocationData,
  fetchDistanceMatrix,
  API_KEY
} from '../../api/mapbox';
import PinAddress from './Marker';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const navStyle = {
  top: 72,
  left: 0,
  padding: '10px'
};

const scaleControlStyle = {
  bottom: 36,
  left: 0,
  padding: '10px'
};

export default function Map({ getMapDetails }) {
  const restaurantCoords = [121.0415983, 14.637202];
  const [selectedPlace, setSelectedPlace] = useState([]);
  const [pinnedLocationName, setPinnedLocationName] = useState(null);
  const [close, setClose] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState('');
  const [viewport, setViewport] = useState({
    width: '62vw',
    height: '80vh',
    latitude: 14.637202,
    longitude: 121.0415983,
    zoom: 15
  });

  useEffect(() => {
    getMapDetails(
      selectedPlace,
      restaurantCoords,
      deliveryTime,
      pinnedLocationName
    );
  }, [deliveryTime]);

  const onPinLocation = (event) => {
    setSelectedPlace(event.lngLat);
    const pinned = {
      lat: event.lngLat[1],
      long: event.lngLat[0]
    };

    const coordinates = `${restaurantCoords[0]},${restaurantCoords[1]};${pinned.long},${pinned.lat}`;
    fetchLocationData(coordinates).then((data) => {
      const hour = data.durations[0][1] < 3600 ? '' : 'H [hours,]';
      const prepareOrderTime = 600;
      const EstimatedDeliveryTime = moment
        .unix(data.durations[0][1] + prepareOrderTime)
        .utc()
        .format(`${hour} m [minutes]`);
      setDeliveryTime(EstimatedDeliveryTime);
    });

    fetchDistanceMatrix(pinned.long, pinned.lat).then((data) => {
      setPinnedLocationName(data.features[0].text);
    });
  };

  return (
    <div>
      <ReactMapGL
        onClick={onPinLocation}
        {...viewport}
        mapboxApiAccessToken={API_KEY}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}>
        <PinAddress
          selectedPlace={selectedPlace}
          deliveryTime={deliveryTime}
          pinnedLocationName={pinnedLocationName}
        />

        {close === false ? (
          <Popup
            offsetTop={-45}
            latitude={14.637202}
            longitude={121.0415983}
            onClose={() => setClose(true)}>
            DeliBeery
          </Popup>
        ) : (
          ''
        )}

        <Marker
          key={`1`}
          latitude={14.637202}
          longitude={121.0415983}
          onClick={() => setClose(false)}>
          <img
            src="https://cdn4.iconfinder.com/data/icons/map-pins-2/256/21-512.png"
            width="50px"
            height="50px"
            style={{ position: 'absolute', top: '-50px', left: '-30px' }}
          />
        </Marker>
        <NavigationControl style={navStyle} />
        <ScaleControl style={scaleControlStyle} />
      </ReactMapGL>
    </div>
  );
}
