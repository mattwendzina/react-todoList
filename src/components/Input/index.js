import React from "react";
import TextField from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import CSS from "./input.module.css";

const Input = props => {
  const { textInput, addItem, textInputValue } = props;
  return (
    <>
      <div className={CSS.inputContainer}>
        <TextField
          className={CSS.textInput}
          onChange={textInput}
          onKeyUp={addItem}
          placeholder={"Enter todo"}
          value={textInputValue}
        />
        <Button
          className={CSS.button}
          variant="extendedFab"
          color="primary"
          onClick={addItem}
        >
          Add Todo{" "}
        </Button>
      </div>
    </>
  );
};

export default Input;
