import React, { Component, Fragment } from "react";

export class Star extends Component {

  handleCLick = () => {
    this.props.action("star", this.props.taskId);
  }

  render() {
    return (
      <Fragment>
        <span
          onClick={this.handleCLick}
          className={`mr-2 ${this.props.isStared ? "star-golden" : "star-lightgrey"}`}
        >
          <span className="fa fa-star" />
        </span>
      </Fragment>
    );
  }
}

export default Star;
