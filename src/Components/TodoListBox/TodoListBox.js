import React, { Component } from "react";
import TodoList from "./Components/TodoList";
import { Accordion, Card } from 'react-bootstrap';

export class TodoListBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTasks: [],
      completedTasks: [],
    }
  }

  componentDidMount() {
    this.filterTasks(this.props.currentSection);
  }

  componentDidUpdate(prevprops) {
    if (this.props.allTasks !== prevprops.allTasks || this.props.currentSection !== prevprops.currentSection) {
      this.filterTasks(this.props.currentSection);
    }
  }

  formatDate = (taskDate) => {
    const today = new Date();
    if ((taskDate.year === today.getFullYear()) &&
      (taskDate.month === Number(today.getMonth()) + 1) &&
      (taskDate.day === today.getDate())) {
      return true
    } else {
      return false
    }
  }

  filterTasks(status) {
    let filteredData = [];
    if (status === "all" || status === "search") {
      filteredData = this.props.allTasks;
    }
    if (status === "today") {
      filteredData = this.props.allTasks.filter((task) => this.formatDate(task.date));
    }
    if (status === "important") {
      filteredData = this.props.allTasks.filter((task) => task.isStared === true);
    }
    this.arrangeTasks(filteredData);
  }

  arrangeTasks = (data, prevprops) => {
    const active = data.filter((task) => task.isCompleted !== true);
    const completed = data.filter((task) => task.isCompleted === true);
    this.setState({
      activeTasks: active,
      completedTasks: completed
    });
  }

  handleAction = (action, taskId, newValue) => {
    this.props.action(action, taskId, newValue);
  }

  render() {
    return (
      <div >
        {this.state.activeTasks.length === 0 ? (
          <div
            id="no-active-task"
            className="text-center my-5 mx-auto text-muted">
            {this.props.currentSection === 'search' ? 'Sorry, No results' : 'Hurray, all done and dusted'}
          </div>
        ) : (
            <Accordion defaultActiveKey="0">
              <Card className="trans-bg">
                <Accordion.Toggle as={Card.Header} eventKey="0" >
                  Active Tasks <span className="fa fa-angle-double-right" />
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <ul className="list-group w-100 pt-1  ">
                    {this.state.activeTasks.map(item => (
                      <li
                        key={item.id}
                        className="list-group-item list-bg"
                      >
                        <TodoList
                          id={item.id}
                          task={item.task}
                          date={item.date}
                          isCompleted={item.isCompleted}
                          categury={item.categury}
                          isStared={item.isStared}
                          action={this.handleAction}
                        />
                      </li>
                    ))}
                  </ul>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          )}
        <div className={this.state.completedTasks.length === 0 ? "d-none" : ""}>
          <Accordion defaultActiveKey="1">
            <Card className="trans-bg">
              <Accordion.Toggle as={Card.Header} eventKey="0" >
                Completed Tasks <span className="fa fa-angle-double-right" />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <ul className="list-group w-100 pt-1 ">
                  {this.state.completedTasks.map(item => (
                    <li
                      key={item.id}
                      className="list-group-item list-bg"
                    >
                      <TodoList
                        id={item.id}
                        task={item.task}
                        date={item.date}
                        isCompleted={item.isCompleted}
                        categury={item.categury}
                        isStared={item.isStared}
                        action={this.handleAction}
                      />
                    </li>
                  ))}
                </ul>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
    );
  }
}

export default TodoListBox;
