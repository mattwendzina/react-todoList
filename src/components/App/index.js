import React, { Component } from "react";

import "./App.css";
import Input from "../Input";
import TodoList from "../TodoList";
import Navbar from "../Navbar";

import { create } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";
import { CSSTransitionGroup } from "react-transition-group";

// This function enables material UI to be moved higher in the html <head> to allow for custom CSS to take priority
const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: document.getElementById("jss-insertion-point")
});

class App extends Component {
  constructor(props) {
    super(props);
    this.myInput = React.createRef();
    this.state = {
      textInput: "",
      editTextInput: "",
      nowEditing: null,
      filterCompleted: false,
      todos: []
    };
  }

  componentDidMount() {
    // If there are items in localStorage set them to state
    if (localStorage.getItem("todos")) {
      const todos = localStorage.getItem("todos");
      this.setState(() => ({
        todos: JSON.parse(todos)
      }));
    }
  }

  textInput = e => {
    const { value } = e.target;
    this.setState(() => ({
      textInput: value
    }));
  };

  addItem = e => {
    // e.key and e.key!== checks to see if a key has been pressed/isn't enter and then returns
    if ((e.key && e.key !== "Enter") || !this.state.textInput.trim()) {
      return;
    }

    this.setState(
      state => ({
        todos: [
          ...state.todos,
          {
            todo: state.textInput,
            complete: false,
            selected: false,
            blur: true,
            id: Date.now()
          }
        ],
        textInput: ""
      }),
      this.updateLocalStorage
    );
  };

  updateItem = (e, idx) => {
    const newValue = e.target.value;
    const currentValue = this.state.todos[idx];

    this.setState(
      state => ({
        editTextInput: newValue,
        todos: [
          ...state.todos.slice(0, idx),
          { ...currentValue, todo: newValue },
          ...state.todos.slice(idx + 1)
        ]
      }),
      this.updateLocalStorage
    );
  };

  toggleEdit = (e, idx) => {
    // e.key and e.key!== checks to see if a key has been pressed/isn't enter and then returns
    if (e.key && e.key !== "Enter") {
      return;
    }

    const toChange = this.state.todos[idx];
    const nowEditing = !this.state.nowEditing ? this.state.todos[idx].id : null;
    const editTextInput = !this.state.nowEditing
      ? this.state.todos[idx].todo
      : "";
    this.setState(
      state => ({
        todos: [
          ...state.todos.slice(0, idx),
          { ...toChange, selected: !toChange.selected },
          ...state.todos.slice(idx + 1)
        ],
        nowEditing: nowEditing,
        editTextInput: editTextInput
      }),
      this.updateLocalStorage
    );
    if (this.state.todos[idx].todo === "") {
      this.deleteTodo(idx);
    }
  };

  deleteTodo = idx => {
    this.setState(
      state => ({
        todos: [...state.todos.slice(0, idx), ...state.todos.slice(idx + 1)]
      }),
      this.updateLocalStorage
    );
  };

  deleteCompleted = () => {
    const incomplete = this.state.todos.filter(todo => !todo.complete);
    console.log(incomplete);
    this.setState(
      state => ({
        todos: [...incomplete]
      }),
      this.updateLocalStorage
    );
  };

  getFocus = event => {
    // listItem grabs the input element to ensure the correct element gets focus() applied
    const listItem = event.target.parentNode.parentNode.childNodes[1];
    // set timeout added because it otherwise doesn't hold focus long enough. I think it applies focus, then re-renders the page view and loses focus. This means it waits before settings focus.
    setTimeout(function() {
      listItem.focus();
    }, 1);
  };

  todoComplete = idx => {
    const toChange = this.state.todos[idx];
    this.setState(
      state => ({
        todos: [
          ...state.todos.slice(0, idx),
          { ...toChange, complete: !toChange.complete },
          ...state.todos.slice(idx + 1)
        ]
      }),
      this.updateLocalStorage
    );
  };

  filterCompleted = () => {
    this.setState(() => ({
      filterCompleted: !this.state.filterCompleted
    }));
  };

  updateLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  };

  render() {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <div className="App">
          <Navbar />
          <div className="todolistContainer">
            <Input
              style={{ borderRadius: "5px" }}
              textInput={this.textInput}
              addItem={this.addItem}
              textInputValue={this.state.textInput}
            />
            <CSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={1000}
            >
              <TodoList
                todos={this.state.todos}
                todoComplete={this.todoComplete}
                deleteTodo={this.deleteTodo}
                deleteCompleted={this.deleteCompleted}
                toggleEdit={this.toggleEdit}
                textInputValue={this.state.textInput}
                updateItem={this.updateItem}
                textInput={this.state.textInput}
                myInput={this.myInput}
                getFocus={this.getFocus}
                editTextInput={this.state.editTextInput}
                filterCompleted={this.state.filterCompleted}
              />
            </CSSTransitionGroup>
            <div className="filtersContainer">
              <div
                onClick={this.filterCompleted}
                className={
                  this.state.filterCompleted ? "showIncomplete" : "incomplete"
                }
              >
                Incompleted
              </div>
              <div onClick={this.deleteCompleted} className="deleteCompleted">
                Delete Completed
              </div>
            </div>
          </div>
        </div>
      </JssProvider>
    );
  }
}

export default App;
