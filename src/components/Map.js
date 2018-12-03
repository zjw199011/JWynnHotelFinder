import React, { Component } from 'react';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import DirectoryMapMarker from './DirectoryMapMarker';
const { compose, withProps, withState, lifecycle, withHandlers, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker, 
} = require("react-google-maps");

var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

const MapWithADirectionsRenderer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAz86Y8N8LqOljkAc8pmIjhsjXraMnsTZc&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `768px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withState('directions', 'updateDirections', null),
    withHandlers({
        onMarkerClustererClick: () => (markerClusterer) => {
            const clickedMarkers = markerClusterer.getMarkers()
            console.log(`Current clicked markers length: ${clickedMarkers.length}`)
            console.log(clickedMarkers)
        },
        requestRenderDirection: ({ updateDirections }) => (curLatLng, marker) => {
            const DirectionsService = new window.google.maps.DirectionsService();
            DirectionsService.route({
                    origin: new window.google.maps.LatLng(curLatLng.latitude, curLatLng.longitude),
                    destination: new window.google.maps.LatLng(marker.LATITUDE, marker.LONGITUDE),
                    travelMode: window.google.maps.TravelMode.DRIVING,
                }, (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        console.log('fetching directions', result);
                        updateDirections(result)
                    } else {
                        console.error(`error fetching directions`, result);
                }
            });
        }
    }),
    withStateHandlers(
        () => ({ isOpen: false, }), 
        { 
            showInfo(index){
                this.setState({showInfoIndex: index })
            }
        }
    ),
    withScriptjs,
    withGoogleMap,
  )(props =>
    <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: props.curLatLng && props.curLatLng.latitude ? props.curLatLng.latitude : 43.23869, lng: props.curLatLng && props.curLatLng.longitude ? props.curLatLng.longitude : -79.8902597 }}
    >
        {
            props.curLatLng && props.curLatLng.latitude && props.curLatLng.longitude
                &&
                    <Marker
                        position={{ lat: props.curLatLng.latitude, lng: props.curLatLng.longitude }}
                        icon={image}
                    />
        }
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={40}
        >
            {
                props.mapShow === 'markers'
                    &&
                    props.markers && props.markers.map((marker, index) => (
                        <DirectoryMapMarker
                            key={index}
                            index={index}
                            marker={marker}
                            curLatLng={props.curLatLng}
                            handleToggleInfoBox={props.handleToggleInfoBox}
                            requestRenderDirection = {props.requestRenderDirection}
                            setMapContent={props.setMapContent}
                        />                   
                    ))
            }
            {
                props.mapShow === 'direction'
                    &&
                    props.directions && <DirectionsRenderer directions={props.directions} /> 
            }
        </MarkerClusterer>
    </GoogleMap>
);

class Map extends Component {

    render() {
        
        return (
            <div>
                <MapWithADirectionsRenderer 
                    curLatLng={this.props.curLatLng}
                    markers={this.props.markers}
                    disLatLng={this.props.disLatLng}
                    handleToggleInfoBox={this.props.handleToggleInfoBox}
                    mapShow={this.props.mapShow}
                    setMapContent={this.props.setMapContent}
                />
            </div>
        );
    }
};
export default Map;

