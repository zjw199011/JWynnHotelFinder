import React, { Component } from 'react';
import { Container, Responsive } from 'semantic-ui-react'
import SidebarNavigation from './SidebarNavigation'
import Content from './Content'
import Footer from './Footer'
import SidebarContent from './SidebarContent'

const SidebarNavigationHOC = SidebarNavigation(Content);

class Layout extends Component {

    render() {
        return (
            <Container>
                <Responsive maxWidth={767}>
                    <SidebarNavigationHOC
                        {...this.props}
                    />
                </Responsive>
                <Responsive minWidth={768}>
                    <SidebarContent {...this.props} />
                    <br/>
                    <Content {...this.props} />
                    <Footer />
                </Responsive>
            </Container>
        )
    }
}

export default Layout
