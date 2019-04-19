import React from "react";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./todoItem.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
library.add(faCheckCircle, faTrash);

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changeItemWithEnterKey: false
    };
  }

  render() {
    const {
      todos,
      todoComplete,
      toggleEdit,
      getFocus,
      deleteTodo,
      myInput,
      editTextInput,
      updateItem,
      filterCompleted
    } = this.props;

    if (!filterCompleted) {
      return (
        <TransitionGroup>
          {todos.map((todoItem, idx) => {
            return (
              <CSSTransition key={todoItem.id} classNames="move" timeout={600}>
                <li key={todoItem.id}>
                  <div
                    className={
                      !todoItem.selected ? "showTodoItem" : "hideTodoItem"
                    }
                  >
                    <div className="completeContainer">
                      <FontAwesomeIcon
                        icon="check-circle"
                        className={
                          todoItem.complete
                            ? "completeButton"
                            : "incompleteButton"
                        }
                        onClick={() => todoComplete(idx)}
                      />
                    </div>

                    <label
                      className={
                        todoItem.complete ? "itemComplete" : "itemIncomplete"
                      }
                      onDoubleClick={event => {
                        toggleEdit(event, idx);
                        getFocus(event);
                        this.setState(() => ({
                          changeItemWithEnterKey: false
                        }));
                      }}
                    >
                      {todoItem.todo}
                    </label>

                    <FontAwesomeIcon
                      style={{ color: "gainsboro" }}
                      icon={"trash"}
                      className="deleteButton"
                      color="secondary"
                      variant="raised"
                      onClick={() => deleteTodo(idx)}
                    />
                  </div>
                  <input
                    className={
                      todoItem.selected ? "editTextDisplay" : "editTextHidden"
                    }
                    ref={myInput}
                    value={editTextInput}
                    onChange={event => {
                      updateItem(event, idx);
                    }}
                    onKeyDown={event => {
                      if (event.key === "Enter") {
                        this.setState(state => ({
                          changeItemWithEnterKey: !state.changeItemWithEnterKey
                        }));
                      }
                      toggleEdit(event, idx);
                    }}
                    onBlur={
                      !this.state.changeItemWithEnterKey
                        ? event => {
                            toggleEdit(event, idx);
                          }
                        : null
                    }
                  />
                </li>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      );
    } else {
      const filtered = todos.filter(todoItem => !todoItem.complete);

      return filtered.map((todoItem, idx) => {
        return (
          <li key={todoItem.id}>
            <div
              className={!todoItem.selected ? "showTodoItem" : "hideTodoItem"}
            >
              <div className="completeContainer">
                <FontAwesomeIcon
                  icon="check-circle"
                  className={
                    todoItem.complete ? "completeButton" : "incompleteButton"
                  }
                  onClick={() => todoComplete(idx)}
                />
              </div>

              <label
                className={
                  todoItem.complete ? "itemComplete" : "itemIncomplete"
                }
                onDoubleClick={event => {
                  toggleEdit(event, idx);
                  getFocus(event);
                  this.setState(() => ({
                    changeItemWithEnterKey: false
                  }));
                }}
              >
                {todoItem.todo}
              </label>

              <FontAwesomeIcon
                style={{ color: "gainsboro" }}
                icon={"trash"}
                className="deleteButton"
                color="secondary"
                variant="raised"
                onClick={() => deleteTodo(idx)}
              />
            </div>
            <input
              className={
                todoItem.selected ? "editTextDisplay" : "editTextHidden"
              }
              ref={myInput}
              value={editTextInput}
              onChange={event => {
                updateItem(event, idx);
              }}
              onKeyDown={event => {
                if (event.key === "Enter") {
                  this.setState(state => ({
                    changeItemWithEnterKey: !state.changeItemWithEnterKey
                  }));
                }
                toggleEdit(event, idx);
              }}
              onBlur={
                !this.state.changeItemWithEnterKey
                  ? event => {
                      toggleEdit(event, idx);
                    }
                  : null
              }
            />
          </li>
        );
      });
    }
  }
}

export default TodoItem;
