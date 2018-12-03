import React, { Component } from 'react';
import { Container, Menu, Segment, Form, Dropdown, Grid, Button, Item, Header } from 'semantic-ui-react'

const typeOptions = [
    { key: 'motel', text: 'Motel', value: 'motel' },
    { key: 'hotel', text: 'Hotel', value: 'hotel' },
    { key: 'campus', text: 'Campus', value: 'campus' },
    { key: 'bedAndBreakfast', text: 'Bed and Breakfast', value: 'bedAndBreakfast' },
    { key: 'other', text: 'Other', value: 'other' },
];

const distanceOptions = [
    { key: '1', text: '1km', value: '1' },
    { key: '3', text: '3km', value: '3' },
    { key: '5', text: '5km', value: '5' },
    { key: '10', text: '10km', value: '10' },
    { key: '20', text: '20km', value: '20' },
    { key: '50', text: '50km', value: '50' },
];

const R = require('ramda');

class SidebarContent extends Component {

    state = { 
        activeItem: 'search',
        state: 'menu',          // menu, list, detail
        keywords: '',
        types: [],
        distance: '',
        listAccomadation: [],
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleSearchClicked = async(e, data) => {
        var {keywords, types} = this.state;
        if(keywords || (types && types.length > 0)){
            var result = await this.props.getAccomadationList(keywords, types);
            if(result && result.length > 0){
                console.log(result);
                this.setState({listAccomadation: result, state: 'list'});
            }else{
                console.log('no result');
            }
        }
    }

    handleSearchNearbyClicked = (e, data) => {
        var distance = 0;
        try{
            distance = parseInt(this.state.distance);
        }catch(err){
            console.log(err);
        }
        if(distance > 0){
            var result = this.props.getNearByAccomadationList(distance);
            this.setState({listAccomadation: result, state: 'list'});
        }
    }

    handleChange = (e, {name, value} ) => {
        this.setState({[name]: value});
    }

    handleBackToMenu = (e) => {
        this.setState({state: 'menu'});
    }

    handleBackToList = (e) => {
        this.setState({state: 'list'});
    }

    handleSelectedAccomadation = (obj) => {
        this.props.selectAccomadation(obj);
        this.setState({state: 'detail'});
    }

    handleGetAccomadationDirection = (obj) => {
        this.props.getAccomadationDirection(obj);
    }
    
    render() {
        const { activeItem, state, listAccomadation } = this.state
    
        return (
            <div style={{padding: '10px 5px 0 5px'}}>
                {
                    state === 'menu'
                        &&
                            <div>
                                <Menu attached='top' tabular>
                                    <Menu.Item name='search' active={activeItem === 'search'} onClick={this.handleItemClick} />
                                    <Menu.Item name='nearby' active={activeItem === 'nearby'} onClick={this.handleItemClick} />
                                </Menu>
                                {
                                    activeItem === 'search'
                                        &&
                                            <Segment attached='bottom'>
                                                <Form>
                                                    <Form.Input fluid label='Search' name='keywords' placeholder='Name or Address' onChange={this.handleChange}/>
                                                    <Form.Field>
                                                        <label>Accomadation Type</label>
                                                        <Dropdown 
                                                            name='types'
                                                            placeholder='Accomandation Types' 
                                                            fluid multiple selection 
                                                            options={typeOptions} 
                                                            onChange={this.handleChange}
                                                        />
                                                    </Form.Field>
                                                    <Form.Button primary onClick={this.handleSearchClicked}>Search</Form.Button>
                                                </Form>
                                            </Segment>
                                }
                                {
                                    activeItem === 'nearby'
                                        &&
                                            <Segment attached='bottom'>
                                                {
                                                    this.props.curLatLng != null && !R.isEmpty(this.props.curLatLng)
                                                        ?
                                                        <Form>
                                                            <Form.Select fluid label='Distance' name='distance' options={distanceOptions} placeholder='Distance' onChange={this.handleChange} />
                                                            <Form.Button primary onClick={this.handleSearchNearbyClicked}>Search</Form.Button>
                                                        </Form>
                                                        :
                                                        <h3>In order to use this feature, please allow access to your current location.</h3>
                                                }
                                                
                                            </Segment>
                                }
                            </div>
                }
                {
                    state === 'list'
                        &&
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column>
                                        <a style={{ textDecoration: 'underline' }} onClick={this.handleBackToMenu}>Back to Menu</a>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                {
                                    listAccomadation && listAccomadation.length > 0
                                        &&
                                            listAccomadation.map((obj, index) => {
                                                return(
                                                    <Grid.Column mobile={16} tablet={8} computer={8} key={index} onClick={()=>this.handleSelectedAccomadation(obj)}>
                                                        <Segment>
                                                            <Header>{obj.NAME}</Header>
                                                            <p>{obj.LOCATION}</p>
                                                            <Button primary onClick={()=>this.handleSelectedAccomadation(obj)}>View Detail</Button>
                                                        </Segment>
                                                    </Grid.Column>
                                                );
                                            })
                                }
                                </Grid.Row>
                            </Grid>
                }
                {
                    state === 'detail'
                        &&
                        <Grid>
                            <Grid.Row>
                                <Grid.Column>
                                    <a style={{ textDecoration: 'underline', marginBottom: '10px'}} onClick={this.handleBackToList}>Back to list</a>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Segment>
                                        <Item style={{clear: 'both'}}>
                                            <Item.Content>
                                                <Item.Header as='a'>{this.props.selectedAccomadation.NAME}</Item.Header>
                                                <Item.Meta>{this.props.selectedAccomadation.TYPE}</Item.Meta>
                                                <Item.Description>Address: {this.props.selectedAccomadation.LOCATION}</Item.Description>
                                                <Item.Extra>Phone: {this.props.selectedAccomadation.PHONE || ''}</Item.Extra>
                                                <Item.Extra>Fax: {this.props.selectedAccomadation.FAX || ''}</Item.Extra>
                                            </Item.Content>
                                        </Item>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                }
            </div>
        )
    }
}

export default SidebarContent
