import React, { Component } from "react";
import { CustomInput } from "reactstrap";
import Actions from "./Components/Actions";
import Star from "./Components/Star";
import { FormControl } from 'react-bootstrap';

export class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHiddenContent: false,
      editMode: false,
      targetTask: {
        id: 0,
        task: "",
        isCompleted: false,
        date: "",
        categury: "inbox",
        isStared: false
      }
    };
    this.showContent = this.showContent.bind(this);
    this.hideContent = this.hideContent.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.handleAction = this.handleAction.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
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

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      let newTask = this.state.targetTask;
      newTask.task = e.target.value;
      this.setState({
       targetTask: newTask,
          editMode: false,
      }, this.handleAction("update", this.state.targetTask.id, this.state.targetTask));
    }
  }
  handleEdit(taskId) {
    let newTask = this.state.targetTask;
    newTask.id = taskId;
    this.setState({
      editMode: true,
      targetTask: newTask,
    })
  }


  handleAction = (action, taskId, newValue) => {
    this.props.action(action, taskId, newValue);
  }

  render() {
    return (
      <div className="d-flex justify-content-between"
        onMouseLeave={this.hideContent}
        onMouseEnter={this.showContent}
      >
        <div className="clearfix d-flex justify-content-start">
          <div className="w-10">
            <Star
              taskId={this.props.id}
              isStared={this.props.isStared}
              action={this.handleAction}
            />
          </div>
          <div className="d-flex flex-row justifty-content-between w-80">
            <div className="d-flex flex-row justify-content-start">
              <CustomInput
                className={`${this.props.isCompleted
                    ? "text-muted text-strike-through"
                    : "text-light "
                  }`}
                type="checkbox"
                id={this.props.id}
                defaultChecked={this.props.isCompleted}
                onClick={this.toggleCompleted}
              />
              <span className={this.state.editMode ? "d-none" : "d-block"} >
                {this.props.task}
              </span>
              <FormControl
                id={this.props.id}
                className={this.state.editMode ? "d-block no-border trans-bg" : "d-none"}
                placeholder={this.props.task}
                aria-label={this.props.task}
                aria-describedby="modify-a-task"
                onKeyDown={this.handleKeyDown}
              />
            </div>
          </div>
        </div>
        <div className="clearfix d-flex justify-content-end ">
          <div className={this.state.showHiddenContent ? "float-right   mr-1 cursor-pointer" : "d-none   mr-1"}>
            <Actions
              taskId={this.props.id}
              action={this.handleAction}
              edit={this.handleEdit} />
          </div>
        </div>
      </div>
    );
  }
}

export default TodoList;
