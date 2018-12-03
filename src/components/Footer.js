import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { Icon, Grid } from 'semantic-ui-react'

class Footer extends Component {

    static propTypes = {
        backgroundColor: PropTypes.string || '#ffffff'
    }

    render() {
        return(
            <div className='Footer' style={{ backgroundColor: this.props.backgroundColor, 'paddingTop': '3em', 'paddingBottom': '3em'}} >
                <Grid verticalAlign='middle' centered>
                    <Grid.Row>
                        <Icon name='facebook f' size='large' style={this.iconStyle} color='black'/>
                        <Icon name='instagram' size='large' style={this.iconStyle} color='black'/>
                        <Icon onClick={ ()=>window.open("https://twitter.com/ZhangZjw") } name='twitter' size='large' style={this.iconStyle} color='blue'/>
                        <Icon onClick={ ()=>window.open("http://www.linkedin.com/in/jiaweizhang1104") } name="linkedin" size='large' style={this.iconStyle} color='blue'/>
                    </Grid.Row>
                    <Grid.Row style={this.footerStyle}>
                        <span>© 2018&nbsp;</span><a href="https://jwynn-hotel-finder.herokuapp.com">JWynn Hotel Finder</a>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }

    iconStyle = {
        'marginLeft': '10px', 
        'marginRight': '10px', 
    }

    footerStyle = {
        'height': '16px',
        'width': '704px',
        'fontFamily': 'Montserrat, Arial',
        'fontSize': '11px',
        'letterSpacing': '0.2px',
        'lineHeight': '16px',
        'textAlign': 'center',
    };
        
}

export default Footer
