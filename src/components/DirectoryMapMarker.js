import React, { Component } from 'react';
import { Marker, InfoWindow } from "react-google-maps";
import PropTypes from 'prop-types';

const R = require('ramda');

class DirectoryMapMarker extends Component {

    handleMarkerClicked = (e) => {
        this.props.handleToggleInfoBox(this.props.marker);
    }

    handleGetDirectionClicked = (e, marker) => {
        this.props.requestRenderDirection(this.props.curLatLng, marker);
        this.props.setMapContent('direction');
    }
    
    render() {

        return (
            <Marker
                key={this.props.index}
                position={{ lat: parseFloat(this.props.marker.LATITUDE), lng: parseFloat(this.props.marker.LONGITUDE) }}
                onClick={(e) => this.handleMarkerClicked(e)}
            >

                {
                    this.props.marker.isOpen &&
                        <InfoWindow 
                            onCloseClick={this.props.handleCloseCall}
                        >
                            <div style={{ backgroundColor: `white`, opacity: 0.9, padding: `12px` }}>
                                <div style={{ fontSize: `16px`, fontColor: `#222222` }}>
                                    <h4>{this.props.marker.NAME}</h4>
                                    Tel: {this.props.marker.PHONE || ''}  | Fax: {this.props.marker.FAX || ''}
                                    <br/>
                                    Address: {this.props.marker.LOCATION || ''}
                                    <br/>
                                    {
                                        this.props.curLatLng != null && !R.isEmpty(this.props.curLatLng)
                                            ?
                                            <button onClick={(e)=>this.handleGetDirectionClicked(e, this.props.marker)}>Get Direction</button>
                                            :
                                            <h4>To access the direction feature, please allow access to your current location.</h4>
                                    }
                                </div>
                            </div>
                        </InfoWindow>
                }
            </Marker>
        )
    }
}

export default DirectoryMapMarker;