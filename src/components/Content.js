import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import Map from './Map'

class Content extends Component {

    render() {
        return (
            <div style={{height: '768px'}}>
                <Map {...this.props}/>
            </div>                
        )
    }
}

export default Content
