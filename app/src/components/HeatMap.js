/* global google */
import React from 'react';
import { connect } from 'react-redux';

import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
// import HeatmapLayer from 'react-google-maps/lib/visualization/HeatmapLayer';
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer';

import { getMapData, getSelectedMapMetrics } from '../redux/selectors';
import { statsApiRequest } from '../redux/actions/stats.actions.js';
import './HeatMap.css';

// lat":43.6708,"lon":-79.3899

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
  const mapData = props.data;
  if (mapData) {
    var transformedData = mapData.map(dataRow => {
      return { location: new google.maps.LatLng(dataRow.lat, dataRow.lon), weight: dataRow.impressions };
    });
  }
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 43.6708, lng: -79.3899 }}
    >
      <HeatmapLayer data={transformedData} />

    </GoogleMap>
  );
}));

class HeatMap extends React.Component {
  componentDidMount () {
    this.props.statsApiRequest({statsType: 'heatMap', endpoint: '/mapping', queryParams: ``});
  }
  render () {
    return (
      <div className='Heatmap-container'>
        <MyMapComponent
          googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places,visualization'
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `500px`, width: '800px' }} />}
          mapElement={<div style={{ height: `100%` }} />}
          data={this.props.mapData}
        />
      </div>
    );
  }
}

/* Container */

const mapStateToProps = (state) => ({
  mapData: getMapData(state)
  // category: getSelectedMapMetrics(state)
});

const actions = {
  statsApiRequest
};

export default connect(mapStateToProps, actions)(HeatMap);
