import React, { Component, Fragment } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import Notifications from "./Components/Notifications";
import SettingMenu from "./Components/SettingMenu";

export class Actions extends Component {

  handleAction = (action, taskId, newValue) => {
    this.props.action(action, taskId, newValue);
  }
  
  render() {
    return (
      <Fragment>
        <Nav>
          <NavItem>
            <NavLink className="text-white cursor-pointer">
              <Notifications />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-white cursor-pointer">
              <SettingMenu />
            </NavLink>
          </NavItem>
        </Nav>
      </Fragment>
    );
  }
}

export default Actions;