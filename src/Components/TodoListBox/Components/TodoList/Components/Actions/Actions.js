import React, { Component} from "react";

export class Actions extends Component {


  handleAction = (action) => {
    switch (action) {
      case "changeDate":
        console.log("DisplayDateModal");
        return;
      case "deleteTask":
        this.props.action("delete", this.props.taskId);
        return;
      case "changeFolder":
        console.log("Display change folder Modal");
        return;
      default:
        return;
    }
  };

  render() {
    return (
        <span onClick={() => this.handleAction("deleteTask")}>
          <span className="fa fa-trash mx-1 text-danger" />
        </span>
    );
  }
}

export default Actions;
