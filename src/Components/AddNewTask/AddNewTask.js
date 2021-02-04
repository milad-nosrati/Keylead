import React from "react";
import { InputGroup, FormControl } from 'react-bootstrap';
import DatePicker from './components/Datepicker';

class AddNewTask extends React.Component {
  constructor(props) {
    super(props);

    const todayDate = new Date();

    this.state = {
      newTaskTitle: "",
      newTaskDate: {
        day: todayDate.getDate(),
        month: todayDate.getMonth() + 1,
        year: todayDate.getFullYear()
      },
      newTaskisStared: false,
    }
  }

  handleDateChange = date => {
    this.setState({
      newTaskDate: date
    });
  }

  handleAddItem = () => {
    const newTask = {
      id: 0,
      task: "",
      isCompleted: false,
      date: "",
      categury: "inbox",
      isStared: false
    }
    newTask.task = this.state.newTaskTitle;
    newTask.isStared = this.state.newTaskisStared;
    newTask.date = this.state.newTaskDate;
    this.setState({
      newTaskisStared: false,
    })
    this.props.updateNewTask("addNewTask", null, newTask);
  }

  handleCLickStar = () => {
    const starState = !this.state.newTaskisStared;
    this.setState({
      newTaskisStared: starState,
    });
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      let newValue = e.target.value;
      e.target.value = "";
      this.setState({
        newTaskTitle: newValue,
      }, this.handleAddItem);
    }
  }

  render() {
    return (
      <div>
        <InputGroup className="mb-3 list-bg rounded ">
          <InputGroup.Prepend >
            <InputGroup.Text id="addNewTaskStar" className="no-border trans-bg d-none d-sm-block">
              <div
                onClick={this.handleCLickStar}
                className={`${this.state.newTaskisStared ? "star-golden" : "star-lightgrey"}`}>
                <span className="mr-2 fa fa-star" />
              </div>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            id="addNewTaskinput"
            className="no-border trans-bg"
            placeholder="Add a new task"
            aria-label="Add a new task"
            aria-describedby="add-a-new-task"
            onKeyDown={this.handleKeyDown}
          />
          <InputGroup.Append>
            <InputGroup.Text id="addNewTaskDate" className="d-none d-sm-block no-border trans-bg light-text">
              <DatePicker selectedDate={this.handleDateChange} />
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
  }
}

export default AddNewTask;
