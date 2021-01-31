import React, { Component } from "react";
import { CustomInput } from "reactstrap";
import Actions from "./Components/Actions";
import Star from "./Components/Star";

export class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHiddenContent: false,
    };
    this.showContent = this.showContent.bind(this);
    this.hideContent = this.hideContent.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.handleAction = this.handleAction.bind(this);
  }

  showContent = (e) => {
    this.setState({ showHiddenContent: true });
  }

  hideContent = (e) => {
    this.setState({ showHiddenContent: false });
  }

  toggleCompleted = (e) => {
    this.props.action("complete", e.target.id);
  }

  handleAction = (action, taskId, newValue) => {
    this.props.action(action, taskId, newValue);
  }

  render() {
    return (
      <div className="d-flex justify-content-start">
         <div className="clearfix d-flex justify-content-between"
          onMouseLeave={this.hideContent}
          onMouseEnter={this.showContent}
        >
          <div className="w-10">
            <Star
              taskId={this.props.id}
              isStared={this.props.isStared}
              action={this.handleAction}
            />
          </div>
          <div className="w-80">
            <CustomInput
              className={`${
                this.props.isCompleted
                  ? "text-muted text-strike-through"
                  : "text-light "
              }`}
              type="checkbox"
              id={this.props.id}
              defaultChecked={this.props.isCompleted}
              label={this.props.task}
              onClick={this.toggleCompleted}
            />
          </div>

          <div  className={this.state.showHiddenContent ? "float-right ml-auto w-10 mr-1" : "d-none ml-auto w-10 mr-1"}>
            <Actions taskId={this.props.id} action={this.handleAction} />
          </div>
        </div>
      </div>
    );
  }
}

export default TodoList;
