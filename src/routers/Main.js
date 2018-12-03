import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout'
import * as actions from '../redux/actions'
import hamiltonAccomadationData from '../hamiltonAccomadation.json'; 
import bgImage from '../card-2.jpeg'

const fullPage =  {
    backgroundImage: "url(" + bgImage + ")",
    padding: "120px 0",
    position: "relative",
    minHeight: "100vh",
    display: "flex!important",
    margin: "0",
    border: "0",
    color: "#fff",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    height: "100%",
    "& footer": {
      position: "absolute",
      bottom: "0",
      width: "100%",
      border: "none !important"
    },
    "&:before": {
      backgroundColor: "rgba(0, 0, 0, 0.65)"
    },
    "&:before,&:after": {
      display: "block",
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      zIndex: "2"
    }
  }

class Main extends Component {

    state = { 
        disLatLng: {},
        markers: [],
        mapShow: ''             // direction, markers
    }

    getCurrentPosition = (options = {}) => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
    };

    componentDidMount = async() => {
        this.props.dispatch(actions.updateAccomadationData(hamiltonAccomadationData));
        try {
            const position = await this.getCurrentPosition();
            this.props.dispatch(actions.updateLatLng(position.coords));
        } catch (error) {
            console.log(error);
        }

    }

    addDefaultValue = (ls) => {
        var nLs = ls.map(obj => {
            return Object.assign({isOpen: false}, obj);
        })

        return nLs
    }

    getAccomadationList = (keyWords, types) => {
        this.props.dispatch(actions.updateKeyWords(keyWords));
        this.props.dispatch(actions.updateTypes(types));

        var ls = [];
        if(keyWords){
            ls = this.props.data.filter(obj => {
                var address = obj.LOCATION.toLowerCase().includes(keyWords.toLowerCase());
                var name = obj.NAME.toLowerCase().includes(keyWords.toLowerCase());;
                return name || address;
            })
        }
        if(types && types.length>0){
            if(keyWords){
                ls = ls.filter(obj => {
                    let match = false;
                    for (var i = 0; i < types.length; i++) {
                        let t = types[i];
                        if (obj.TYPE.split(" ").join("").toLowerCase() === t.toLowerCase()) {
                            match = true;
                            break;
                        }
                    }
                    return match;
                })
            }else{
                ls = this.props.data.filter(obj => {
                    let match = false;
                    for (var i = 0; i < types.length; i++) {
                        let t = types[i];
                        if (obj.TYPE.split(" ").join("").toLowerCase() === t.toLowerCase()) {
                            match = true;
                            break;
                        }
                    }
                    return match;
                })
            }
        }

        var nLs = this.addDefaultValue(ls);
        this.setState({markers: nLs});
        this.setMapContent('markers');
        return ls;
    }

    distance = (lat1, lon1, lat2, lon2, unit) => {
        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist
    }

    getNearByAccomadationList = (distance) => {
        this.props.dispatch(actions.updateDistance(distance));
        // this.props.curLatLng
        var ls = this.props.data.filter(obj => {
            var {latitude, longitude} = this.props.curLatLng;
            var d = this.distance(obj.LATITUDE, obj.LONGITUDE, latitude, longitude, 'K');
            return d <= distance;
        })

        var nLs = this.addDefaultValue(ls);
        this.setState({markers: nLs});
        this.setMapContent('markers');
        return ls;
    }

    selectAccomadation = (obj) => {
        this.props.dispatch(actions.updateSelectedAccomadation(obj));
    }

    getAccomadationDirection = (obj) => {
        this.props.dispatch(actions.updateSelectedAccomadation(obj));
    }

    handleToggleInfoBox = (marker) => {
        console.log(marker);

        if(this.state.markers && this.state.markers.length > 0)
        {
            var newMarkers = JSON.parse(JSON.stringify(this.state.markers));
            newMarkers = newMarkers.map(obj => {
                if(obj.OBJECTID === marker.OBJECTID){
                    obj.isOpen = !obj.isOpen;
                } else {
                    obj.isOpen = false;
                }

                return obj;
            })
            
            this.setState({markers: newMarkers});
        }

    }

    setMapContent = (type) => {
        this.setState({mapShow: type});
    }

    render() {
        return (
            <div>
            <Layout
                mapShow={this.state.mapShow}
                getAccomadationList={this.getAccomadationList}
                getNearByAccomadationList={this.getNearByAccomadationList}
                selectAccomadation={this.selectAccomadation}
                getAccomadationDirection={this.getAccomadationDirection}
                selectedAccomadation={this.props.selectedAccomadation}
                disLatLng={this.state.disLatLng}
                curLatLng={this.props.curLatLng}
                markers={this.state.markers}
                handleToggleInfoBox={this.handleToggleInfoBox}
                setMapContent={this.setMapContent}
            />
            </div>
        )
    }
}

export default connect(
    (state) => ({
        data: state.root.accomadationData,
        curLatLng: state.root.currentLatLng,
        selectedAccomadation: state.root.selectedAccomadation,
    }),
    null
)(Main);
