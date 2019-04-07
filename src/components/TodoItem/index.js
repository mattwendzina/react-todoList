import React from "react";
import Button from "@material-ui/core/Button";

import CSS from "./todoItem.module.css";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return this.props.todos.map((todoItem, idx) => {
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
              onClick={() => this.props.todoComplete(idx)}
            >
              Complete
            </Button>

            <label
              onDoubleClick={event => {
                const { toggleEdit } = this.props;
                toggleEdit(idx);
                this.props.getFocus(event);
              }}
            >
              {todoItem.todo}
            </label>

            <Button
              color="secondary"
              variant="raised"
              onClick={() => this.props.deleteTodo(idx)}
            >
              Delete
            </Button>
          </div>
          <input
            className={
              todoItem.selected ? CSS.editTextDisplay : CSS.editTextHidden
            }
            ref={this.props.myInput}
            style={{ width: "218px", height: "35px" }}
            value={this.props.todos[idx].todo}
            onBlur={() => this.props.toggleEdit(idx)}
          />
        </li>
      );
    });
  }
}

export default TodoItem;
