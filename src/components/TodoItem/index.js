import React from "react";
import Button from "@material-ui/core/Button";

import CSS from "./todoItem.module.css";

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
      updateItem
    } = this.props;
    return todos.map((todoItem, idx) => {
      return (
        <li
          key={todoItem.id}
          className={todoItem.complete ? CSS.complete : CSS.incomplete}
        >
          <div
            className={!todoItem.selected ? CSS.showTodoItem : CSS.hideTodoItem}
          >
            <Button
              color="primary"
              variant="raised"
              onClick={() => todoComplete(idx)}
            >
              Complete
            </Button>

            <label
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

            <Button
              color="secondary"
              variant="raised"
              onClick={() => deleteTodo(idx)}
            >
              Delete
            </Button>
          </div>
          <input
            className={
              todoItem.selected ? CSS.editTextDisplay : CSS.editTextHidden
            }
            ref={myInput}
            style={{ width: "218px", height: "35px" }}
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

export default TodoItem;
