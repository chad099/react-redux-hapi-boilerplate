/* eslint-disable*/
import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';

export default class SideBarMain extends Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <Sidebar as={Menu} animation='push' width='thin' visible={this.props.visible} icon='labeled' vertical inverted>
        <Menu.Item name='home'>
          <Icon name='home' />
          Home
        </Menu.Item>
        <Menu.Item name='gamepad'>
          <Icon name='gamepad' />
          Games
        </Menu.Item>
        <Menu.Item name='camera'>
          <Icon name='camera' />
          Channels
        </Menu.Item>
      </Sidebar>
    );
  }
}
