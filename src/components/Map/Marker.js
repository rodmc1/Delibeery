import * as React from 'react';
import { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-map-gl';
import Pin from '../../imgs/pin.png';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex'
  }
}));

const PinAddress = (props) => {
  const { selectedPlace, deliveryTime, pinnedLocationName, loading } = props;
  const [showPopup, togglePopup] = useState(true);
  const classes = useStyles();
  const selected = {
    lat: selectedPlace[1],
    long: selectedPlace[0]
  };

  useEffect(() => {
    togglePopup(true);
  }, [selectedPlace]);

  const popupDisplay = loading ? (
    <div className={classes.root}>
      <CircularProgress size={25} />
    </div>
  ) : (
    <div>
      <div>{pinnedLocationName}</div>
      <small>{deliveryTime}</small>
    </div>
  );

  const setPlace = (
    <div>
      <Marker
        key={selected.lat}
        latitude={selected.lat}
        longitude={selected.long}
        onClick={() => togglePopup(true)}>
        <img
          src={Pin}
          width="40px"
          height="40px"
          style={{ position: 'absolute', top: '-40px', left: '-20px' }}
        />
      </Marker>
      {showPopup && (
        <Popup
          offsetTop={-45}
          latitude={selected.lat}
          longitude={selected.long}
          closeButton={true}
          closeOnClick={true}
          onClose={() => togglePopup(false)}>
          {popupDisplay}
        </Popup>
      )}
    </div>
  );

  return <div>{!selectedPlace.length ? '' : setPlace}</div>;
};

export default PinAddress;
