/* eslint-disable*/
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Sidebar, Segment, Button, Menu, Image, Header, Table, Icon, Label } from 'semantic-ui-react';
import HeaderMain from '../../components/Header';
import SideBarMain from '../../components/SideBarMain';

export default class Dashboard extends Component {
  constructor(props) {
   super(props);
   this.state = {visible: false};
 }

  static get propTypes() {
    return {
      dispatch: PropTypes.func,
      user: PropTypes.object,
    };
  }

   toggleVisibility = () => {
     this.setState({ visible: !this.state.visible })
   }

  render() {
    const { user } = this.props;
    return (
        <div>
            <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
            <Sidebar.Pushable as={Segment}>
              <SideBarMain visible={this.state.visible} />

             <Sidebar.Pusher>
                <TableExamplePagination />
             </Sidebar.Pusher>
           </Sidebar.Pushable>
       </div>
    );
  }
}

const TableExamplePagination = () => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Header</Table.HeaderCell>
          <Table.HeaderCell>Header</Table.HeaderCell>
          <Table.HeaderCell>Header</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Label ribbon>First</Label>
          </Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
          <Table.Cell>Cell</Table.Cell>
        </Table.Row>
      </Table.Body>

      <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='left chevron' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a'>4</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='right chevron' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
      </Table.Footer>
    </Table>
  )
}
