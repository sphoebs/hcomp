import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {Menu, Input} from 'semantic-ui-react'

export default class Navbar extends Component {

    logoItemStyle = {
        paddingRight: '0'
    }

    render() {
        return (
        <Menu secondary>
            <Menu.Item style={this.logoItemStyle}>
                <h3>Social Human Computation</h3>
            </Menu.Item>
            <Menu.Item name='home' as={Link} to='/' />
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>
                <Menu.Item name='logout' />
            </Menu.Menu>
        </Menu>)
    }
}
