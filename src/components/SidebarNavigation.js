import React, { Component } from 'react'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import SidebarContent from './SidebarContent'

const SidebarNavigationHOC = (WrappedComponent) => {

    return class extends Component{

        state = {
            visible: false,
        }

        toggleSideBar = () => this.setState({ visible: !this.state.visible })
      
        render() {

            return (
                <div>
                    <Sidebar.Pushable>
                        <Sidebar
                            as={Menu}
                            animation='push'
                            direction='left'
                            icon='labeled'
                            vertical
                            visible={this.state.visible}
                            width='wide'
                        >
                            <SidebarContent
                                {...this.props}
                            />
                        </Sidebar>
      
                        <Sidebar.Pusher>
                            <Button color='blue' icon='sidebar' onClick={() => this.toggleSideBar()}></Button>
                            <WrappedComponent
                                {...this.props}
                            />
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                  </div>
            )
        }
    }
}

export default SidebarNavigationHOC