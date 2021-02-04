import React, { Component } from "react";
import Header from "./Components/Header";
import Aside from "./Components/Aside";
import TodoListBox from "./Components/TodoListBox";
import AddNewTask from "./Components/AddNewTask";
import ReactPlayer from 'react-player';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

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
      videoLink: '',
      playAd: false,
      editMode: false,
      targetTask: 0,
    };
  }

  componentDidMount() {
    this.taskCounter();
  }

  //change the default formaty to date object
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

  //rearrange the task ids to avoid duplicate ids.
  rearrangeIDs = () => {
    let newMasterList = this.state.masterList;
    for (let i = 0; i < newMasterList.length; ++i) {
      newMasterList[i].id = i
    }
    this.setState({
      masterlist: newMasterList,
    });
  }

  //add new item to the list
  handleNewItem = (newTask) => {
    this.rearrangeIDs();
    if (this.state.masterList.length > 0) {
      newTask.id = (this.state.masterList[this.state.masterList.length - 1].id) + 1;
    } else {
      newTask.id = 1;
    }
    const newMasterList = [...this.state.masterList, newTask];
    const newCounter = this.state.addCounter + 1;
    this.setState({
      masterList: newMasterList,
      addCounter: newCounter
    }, this.checkAdPlayback);
    toast('Task successfully has been added');
  }

  //after adding a task, check the counter and show the video player
  checkAdPlayback = () => {
    if (this.state.addCounter > 4) {
      //PLease Note, aparat will not let you get the api from development environment - API can only be fetched from server.
      axios.get(`https://api.aparat.com/fa/v1/video/video/mostViewedVideos`)
        .then(res => {
          console.log(res.data);
          const linkToVideo = res.data.data[0].attributes.preview_src;
          this.setState({
            videoLink: linkToVideo,
          });
        })
        .catch(err => {
          //this cathch the error and set a valid link to videolink.
          //only for development environment and should be removed in  production.
          //const defaultVideoLink = "https://static.cdn.asset.aparat.com/avt/29593961_15s.mp4";
          //this.setState({
          //  videoLink: defaultVideoLink,
          //})
        })
      this.setState({
        addCounter: 0,
        playAd: true
      })
    } else {
      this.setState({
        playAd: false,
      })
    }
    this.updateCurrentList("all");
  }

  handleModalClose = () => {
    this.setState({
      playAd: false,
    })
  }

  //update the current list according to the selected section
  updateCurrentList = (currentState) => {
    this.rearrangeIDs();
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
    if (currentState === "search") {
      filteredList = this.state.currentList;
    }
    this.setState({
      currentSection: currentState,
      currentList: filteredList
    }, this.taskCounter());
  }

  //check the task and devide them into active and completed list
  taskCounter = () => {
    const active = this.state.masterList.filter((task) => task.isCompleted !== true);
    const imp = active.filter((task) => task.isStared === true);
    const today = active.filter((task) => this.formatDate(task.date));
    this.setState({
      totalTasksCount: active.length,
      todayTasksCount: today.length,
      importantTasksCount: imp.length,
    }, this.updateContents());
  }

  //write the masterlist in the browser cache
  updateContents = () => {
    localStorage.setItem('masterList', JSON.stringify(this.state.masterList));
  }

  //this function handles the tasks and pass the values to the relevant functions
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
      case "update":
        this.handleUpdate(taskId, newValue);
        return;
      default:
        return;
    }
  }

  handleUpdate = (taskId, newValue) => {
    const newMasterList = this.updateTitle(taskId, this.state.masterList, newValue.task)
    this.setState(
      {
        masterList: newMasterList,
      },
      this.updateCurrentList(this.state.currentSection)
    )
  }

  updateTitle = (taskId, list, title) => {
    for (let index = 0; index < list.length; index++) {
      if (list[index].id === taskId) {
        list[index].task = title;
      }
    }
    return list
  }

  //following functions handle actions on the list
  handleSearch = (SearchPhrase) => {
    var results = [];
    for (let index = 0; index < this.state.masterList.length; index++) {
      if (this.state.masterList[index].task.includes(SearchPhrase)) {
        results.push(this.state.masterList[index]);
      }
    }
    this.setState({
      currentList: results,
      currentSection: "search",
    }, this.updateCurrentList(this.state.currentSection));
  }


  deleteTask = (taskId) => {
    const newMasterList = this.state.masterList.filter(
      (task) => task.id !== taskId
    );
    toast('Task successfully has been deleted');
    this.setState(
      {
        masterList: newMasterList,
      },
      this.updateCurrentList(this.state.currentSection)
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
    this.updateCurrentList(this.state.currentSection);
  }


  toggleCompleted = (taskId) => {
    const completedTask = this.state.masterList.filter(
      (task) => String(task.id) === String(taskId)
    );
    completedTask[0].isCompleted = !completedTask[0].isCompleted;
    let newMasterList = this.state.masterList.filter(
      (task) => task.id !== taskId
    );
    this.setState({
      masterList: newMasterList,
    });
    this.updateCurrentList(this.state.currentSection);
  }

  render() {
    return (
      <div className="App">
        <Header action={this.handleAction} />
        <div className="wrapper">
          <nav className="d-none d-sm-block">
            <Aside
              updateList={this.updateCurrentList}
              allTasks={this.state.masterList}
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
              allTasks={this.state.currentSection !== "search" ? this.state.masterList : this.state.currentList}
              currentSection={this.state.currentSection}
              action={this.handleAction}
            />
          </div>
          <Modal
            show={this.state.playAd}
            onHide={this.handleModalClose}
            dialogClassName="modal-640"
          >
            <Modal.Header closeButton>
              <Modal.Title>Promotional Video</Modal.Title>
            </Modal.Header>
            <Modal.Body >
              <ReactPlayer url={this.state.videoLink}
                playing={true}
              />
            </Modal.Body>
          </Modal>
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    );
  }
}

export default TodoApp;
