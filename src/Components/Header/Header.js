import React, { Component } from "react";
import Logo from "./Components/Logo";
import Search from "./Components/Search";
import Actions from "./Components/Actions";
import { Navbar } from "reactstrap";

export class Header extends Component {

  handleAction = (action, taskId, newValue) => {
    this.props.action(action, taskId, newValue);
  }

  render() {
    return (
      <Navbar
        expand="md"
        className="d-flex justify-content-between align-items-center nav-bg"
      >
        <Logo />
        <div className="d-none d-md-block">
          <Search action={this.handleAction} />
        </div>
        <Actions action={this.handleAction} />
      </Navbar>
    );
  }
}

export default Header;
