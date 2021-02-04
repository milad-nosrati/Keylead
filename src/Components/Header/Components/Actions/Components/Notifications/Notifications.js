import React from 'react';
import {  Popover, PopoverBody } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popoverOpen: false
    }
  }

  toggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return (
      <div>
        <span id="notification" >
        <span  className="fa fa-bell" />
        </span>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target="notification" toggle={this.toggle}>
          <PopoverBody >No new notification!</PopoverBody>
        </Popover>
      </div>
    );
  }
}