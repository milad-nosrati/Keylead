import React from "react";
import { InputGroup, FormControl } from 'react-bootstrap';
import DatePicker from './components/Datepicker';

class AddNewTask extends React.Component {
  constructor(props) {
    super(props);
    const todayDate = new Date();
    this.state = {
      newTaskTitle: "",
      newTaskDate: {day: todayDate.getDate(),
                    month: todayDate.getMonth()+1 , 
                    year:todayDate.getFullYear()},
      newTaskisStared: false,
      addCounter: 0
    };

    this.handleCLickStar = this.handleCLickStar.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

    handleDateChange = date => {
      this.setState({
        newTaskDate: date
      });
    };


    handleAddItem = () => {
      const newTask = {
        id: 0 ,
        task: "",
        isCompleted: false,
        date: "",
        categury: "inbox",
        isStared: false
      }
      newTask.task = this.state.newTaskTitle;
      newTask.isStared = this.state.newTaskisStared;
      newTask.date = this.state.newTaskDate ;
      console.log(newTask)
      this.props.updateNewTask("addNewTask", "Task ID", newTask);
    }

    handleCLickStar = () => {
      this.setState({
        newTaskisStared: !this.state.newTaskisStared
      }, ()=> console.log(this.state.newTaskisStared))
    }

    handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        this.setState({
          newTaskTitle: e.target.value
        }, this.handleAddItem);
      }
    }

    render() {
      return (
        <div>
          <InputGroup className="mb-3 list-bg rounded ">
            <InputGroup.Prepend >
              <InputGroup.Text id="addNewTaskStar" className="no-border trans-bg">
                <span
                  onClick={this.handleCLickStar}
                  className={`mr-2 fa fa-star ${this.state.newTaskisStared ? "star-golden" : "star-lightgrey"}`}
                />
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
              <InputGroup.Text id="addNewTaskDate" className="no-border trans-bg">
                <DatePicker selectedDate={this.handleDateChange} />
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </div>
      );
    }
  }

  export default AddNewTask;
