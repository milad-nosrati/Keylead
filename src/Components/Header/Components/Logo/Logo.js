import React, { Component, Fragment } from "react"
import { NavbarBrand } from "reactstrap"
import LogoImage from './logo.svg'

export class Logo extends Component {
  render() {
    return (
      <Fragment>
        <NavbarBrand href="/">
          <img src={LogoImage} alt='TodoList Logo' width='28px' height='28px' className="ml-2"/>
          <span id="logo-brand" className="text-white"> TodoList</span>
        </NavbarBrand>
      </Fragment>
    );
  }
}

export default Logo;
