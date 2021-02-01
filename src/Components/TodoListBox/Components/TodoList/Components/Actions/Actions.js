import React, { Component } from "react";

export class Actions extends Component {

  render() {
    return (
      <div className="d-flex flex-row">
        <div onClick={() =>this.props.edit(this.props.taskId)} >
              <span className="fa fa-edit mx-2 text-delete" />
        </div>
        <div onClick={() =>this.props.action("delete", this.props.taskId, null)}>
          <span className="fa fa-trash mx-2 text-delete" />
        </div>
      </div>
    );
  }
}

export default Actions;
