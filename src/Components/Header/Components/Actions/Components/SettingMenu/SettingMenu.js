import React from 'react';
import {  Popover, PopoverBody } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return (
      <div>
        <span id="settingMenu" >
        <span  className="fa fa-cog" />
        </span>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target="settingMenu" toggle={this.toggle}>
          <PopoverBody >
            Setting<br/>
            My account<br/>
            <hr/>
            Log out<br/>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}