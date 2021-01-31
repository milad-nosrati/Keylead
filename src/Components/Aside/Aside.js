import React, { Component } from "react";
import { ListGroup, ListGroupItem, Badge } from "reactstrap";

export class Aside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSelected: true,
      todaySelected: false,
      importantSelected: false,
      allTasks: this.props.allTasks
    };
    this.showAllTasks = this.showAllTasks.bind(this);
    this.showTodayTasks = this.showTodayTasks.bind(this);
    this.showImportantTasks = this.showImportantTasks.bind(this);
  }

  showAllTasks = () => {
    this.setState({
      allSelected: true,
      todaySelected: false,
      importantSelected: false,
    });
    this.props.updateList("all");
  };
  showTodayTasks = () => {
    this.setState({
      allSelected: false,
      todaySelected: true,
      importantSelected: false,
    });
    this.props.updateList("today");
  };
  showImportantTasks = () => {
    this.setState({
      allSelected: false,
      todaySelected: false,
      importantSelected: true,
    });
    this.props.updateList("important");
  };
  renderItems = (selectedItem, title, taskCount, faIcon ,  callBackFunction) => {
    return (
      <ListGroupItem
        className={`d-flex justify-content-start align-items-center cat-bg
          ${
            selectedItem
              ? "cursor-default active"
              : "cursor-pointer "
          }`}
        onClick={callBackFunction}
      >
        <i className={`fa fa-${faIcon}`} />
        <span className="ml-1 aside-cat">{title}</span>
        <Badge pill className="ml-2 badge-text">{taskCount}</Badge>
        
      </ListGroupItem>
    );
  };

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
