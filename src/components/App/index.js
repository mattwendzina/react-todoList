import React, { Component } from "react";

import "./App.css";
import Input from "../Input";
import TodoList from "../TodoList";
import Navbar from "../Navbar";

import { create } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";

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
    this.state = {
      textInput: "",
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
  toggleEdit = idx => {
    const toChange = this.state.todos[idx];
    this.setState(state => ({
      todos: [
        ...state.todos.slice(0, idx),
        { ...toChange, selected: !toChange.selected },
        ...state.todos.slice(idx + 1)
      ]
    }));
  };

  deleteTodo = idx => {
    this.setState(
      state => ({
        todos: [...state.todos.slice(0, idx), ...state.todos.slice(idx + 1)]
      }),
      this.updateLocalStorage
    );
  };

  todoComplete = idx => {
    const toChange = this.state.todos[idx];
    this.setState(state => ({
      todos: [
        ...state.todos.slice(0, idx),
        { ...toChange, complete: !toChange.complete },
        ...state.todos.slice(idx + 1)
      ]
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
          <Input
            textInput={this.textInput}
            addItem={this.addItem}
            textInputValue={this.state.textInput}
          />
          <TodoList
            todos={this.state.todos}
            todoComplete={this.todoComplete}
            deleteTodo={this.deleteTodo}
            toggleEdit={this.toggleEdit}
            textInputValue={this.state.textInput}
            textInput={this.textInput}
          />
        </div>
      </JssProvider>
    );
  }
}

export default App;