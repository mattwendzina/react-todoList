import React from "react";
import TodoItem from "../TodoItem";

const TodoList = props => {
  const {
    todos,
    todoComplete,
    deleteTodo,
    toggleEdit,
    textInputValue,
    textInput,
    editTextInput,
    updateItem,
    myInput,
    getFocus
  } = props;
  return (
    <>
      <form>
        <TodoItem
          todos={todos}
          todoComplete={todoComplete}
          deleteTodo={deleteTodo}
          toggleEdit={toggleEdit}
          textInput={textInput}
          updateItem={updateItem}
          textInputValue={textInputValue}
          editTextInput={editTextInput}
          myInput={myInput}
          getFocus={getFocus}
        />
      </form>
    </>
  );
};

export default TodoList;
