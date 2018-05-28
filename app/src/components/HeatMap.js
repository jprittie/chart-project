/* global google */
import React from 'react';

import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
// import HeatmapLayer from 'react-google-maps/lib/visualization/HeatmapLayer';
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 37.782, lng: -122.44 }}
  >
    <HeatmapLayer
      data={[
        // {location: new google.maps.LatLng(37.782, -122.447), weight: 0.5},
        new google.maps.LatLng(37.782551, -122.445368),
        new google.maps.LatLng(37.782745, -122.444586),
        new google.maps.LatLng(37.782842, -122.443688),
        new google.maps.LatLng(37.782919, -122.442815),
        new google.maps.LatLng(37.782992, -122.442112),
        new google.maps.LatLng(37.783100, -122.441461)
      ]}
    />

  </GoogleMap>
));

const HeatMap = () => (
  <MyMapComponent
    googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places,visualization'
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
);

export default HeatMap;

