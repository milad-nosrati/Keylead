import React, { Component, Fragment } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import Notifications from "./Components/Notifications"

export class Actions extends Component {
  constructor(props){
    super(props);
    this.handleAction = this.handleAction.bind(this);

  }
  handleAction(action , taskId, newValue){
    this.props.action(action , taskId, newValue);
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
              <span  className="fa fa-cog" />
            </NavLink>
          </NavItem>
        </Nav>
      </Fragment>
    );
  }
}

export default Actions;