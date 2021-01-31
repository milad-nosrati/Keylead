import React, { Component } from "react";
import Header from "./Components/Header";
import Aside from "./Components/Aside";
import TodoListBox from "./Components/TodoListBox";
import AddNewTask from "./Components/AddNewTask";
import axios from 'axios';
import ReactPlayer from 'react-player';

export class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      masterList: JSON.parse(localStorage.getItem('masterList')) || [],
      currentList: JSON.parse(localStorage.getItem('masterList')) || [],
      todayTasksCount: 0,
      importantTasksCount: 0,
      totalTasksCount: 0,
      currentSection: "all",
      addCounter: 0,
      videoLink: 'https://static.cdn.asset.aparat.com/avt/29522670_15s.mp4'
    };

    this.updateContents = this.updateContents.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.handleNewItem = this.handleNewItem.bind(this);
    this.checkAdPlayback = this.checkAdPlayback.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.taskCounter = this.taskCounter.bind(this);
    this.updateCurrentList = this.updateCurrentList.bind(this);
  }

  componentDidMount() {
    this.taskCounter();
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



  sectionFix = () => {
    this.updateCurrentList(this.state.currentSection);
  };

  handleNewItem = (newTask) => {
    if (this.state.masterList.length > 0 ){
      newTask.id = (this.state.masterList[this.state.masterList.length-1].id)+1;
    } else {
      newTask.id = 1;
    }
    
    console.log(newTask);
    const newMasterList = [...this.state.masterList, newTask];
    const newCounter = this.state.addCounter + 1;
    this.setState({ 
      masterList: newMasterList,
      addCounter: newCounter
    }, this.checkAdPlayback);
  };

  checkAdPlayback=() =>{
    if(this.state.addCounter > 1){
      axios.get(`http://api.aparat.com/fa/v1/video/video/mostViewedVideos`)
      .then(res => {
        let link = res.data[0].attributes.preview_src;
        this.setState({
          videoLink: link
        })
      })
  
      console.log('show ads');
      this.setState({
        addCounter: 0
      })
    }
    this.playVideo(this.state.videoLink)
  }
  playVideo = (vlink)=>{
    
  } 
  updateCurrentList = (currentState) => {
    let filteredList = [];
    if (currentState === "all") {
      filteredList = this.state.masterList;
    }
    if (currentState === "today") {
      filteredList = this.state.masterList.filter((task) => this.formatDate(task.date));
    }
    if (currentState === "important") {
      filteredList = this.state.masterList.filter((task) => task.isStared === true);

    }
    this.setState({
      currentSection: currentState,
      currentList: filteredList
    }, this.taskCounter());
  };

  taskCounter() {
    const active = this.state.masterList.filter((task) => task.isCompleted !== true);
    const imp = active.filter((task) => task.isStared === true);
    const today = active.filter((task) => this.formatDate(task.date))
    this.setState({
      totalTasksCount: active.length,
      todayTasksCount: today.length,
      importantTasksCount: imp.length,
    });
    this.updateContents();
  }

  updateContents() {
    localStorage.setItem('masterList', JSON.stringify(this.state.masterList));
  }

  handleAction = (action, taskId, newValue) => {
    switch (action) {
      case "delete":
        this.deleteTask(taskId);
        return;
      case "star":
        this.starTask(taskId);
        return;
      case "complete":
        this.toggleCompleted(taskId);
        return;
      case "addNewTask":
        this.handleNewItem(newValue);
        return;
      case "search":
        this.handleSearch(newValue);
        return;
      default:
        return;
    }
  };

  handleSearch = (SearchPhrase) => {
    var results = [];
    for (let index = 0; index < this.state.masterList.length; index++) {
      if (this.state.masterList[index].task.includes(SearchPhrase)) {
        results.push(this.state.masterList[index]);
      }
    }
    this.setState({
      currentList: results
    });
    this.taskCounter();
  };
  deleteTask = (taskId) => {
    const newMasterList = this.state.masterList.filter(
      (task) => task.id !== taskId
    );
    this.setState(
      {
        masterList: newMasterList,
      },
      this.taskCounter
    );
  };

  starTask = (taskId) => {
    const masterListCopy = this.state.masterList;
    for (let index = 0; index < masterListCopy.length; index++) {
      if (masterListCopy[index].id === taskId) {
        masterListCopy[index].isStared = !masterListCopy[index].isStared;
      }
    }
    this.setState({
      masterList: masterListCopy,
    });
    this.taskCounter();
  };

  toggleCompleted = (taskId) => {
    const completedTask = this.state.masterList.filter(
      (task) => task.id === taskId
    );
    completedTask[0].isCompleted = !completedTask[0].isCompleted;
    const newMasterList = this.state.masterList.filter(
      (task) => task.id !== taskId
    );
    newMasterList.push(completedTask[0]);
    this.setState({
      masterList: newMasterList,
    });
    this.taskCounter();
  };

  render() {
    return (
      <div className="App">
        <Header action={this.handleAction} />
        <div className="wrapper">
          <nav id="sidebar">
            <Aside
              updateList={this.updateCurrentList}
              allTasks={this.state.currentList}
              taskCount={{
                total: this.state.totalTasksCount,
                today: this.state.todayTasksCount,
                important: this.state.importantTasksCount
              }}
            />
          </nav>
          <div id="content" className="d-flex flex-column justify-content-start pt-2">
            <AddNewTask
              updateNewTask={this.handleAction} />
            <TodoListBox
              allTasks={this.state.currentList}
              currentSection={this.state.currentSection}
              updateToCompleted={this.toggleCompleted}
              updateNewTask={this.handleNewItem}
              action={this.handleAction}
            />
          </div>
          <ReactPlayer url={this.state.videoLink}
                        playing = {true}
          />

        </div>
      </div>
    );
  }
}

export default TodoApp;
