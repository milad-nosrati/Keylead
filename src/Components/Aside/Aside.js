import React, { Component } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge'

export class Aside extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allSelected: true,
      todaySelected: false,
      importantSelected: false,
      allTasks: this.props.allTasks
    }
  }

  showAllTasks = () => {
    this.setState({
      allSelected: true,
      todaySelected: false,
      importantSelected: false,
    });
    this.props.updateList("all");
  }

  showTodayTasks = () => {
    this.setState({
      allSelected: false,
      todaySelected: true,
      importantSelected: false,
    });
    this.props.updateList("today");
  }

  showImportantTasks = () => {
    this.setState({
      allSelected: false,
      todaySelected: false,
      importantSelected: true,
    });
    this.props.updateList("important");
  }

  renderItems = (selectedItem, title, taskCount, faIcon, callBackFunction) => {
    return (
      <ListGroup.Item
        className={`d-flex justify-content-start align-items-center 
          ${selectedItem
            ? "cursor-default"
            : "cursor-pointer cat-bg"
          }`}
          variant ="light"
        onClick={callBackFunction}
      >
        <i className={`fa fa-${faIcon}`} />
        <span className="ml-1 aside-cat">{title}</span>
        <Badge pill className="ml-2 badge-text">{taskCount}</Badge>
      </ListGroup.Item>
    );
  }

  render() {
    return (
      <ListGroup className="w-90 mx-2">
        {this.renderItems(
          this.state.allSelected,
          "Tasks",
          this.props.taskCount.total,
          "home",
          this.showAllTasks
        )}
        {this.renderItems(
          this.state.todaySelected,
          "Today",
          this.props.taskCount.today,
          "sun",
          this.showTodayTasks
        )}
        {this.renderItems(
          this.state.importantSelected,
          "Important",
          this.props.taskCount.important,
          "star",
          this.showImportantTasks
        )}
      </ListGroup>
    );
  }
}

export default Aside;
