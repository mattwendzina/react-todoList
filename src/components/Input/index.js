import React, { Component } from "react";
import TextField from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import CSS from "./input.module.css";

const styles = {
  root: {
    padding: "12.5px 14px",
    fontSize: "18px",
    height: "30px ",
    borderRadius: "0",
    boxShadow: "inset 0 -2px 1px rgba(0, 0, 0, 0.1)"
  }
};

// .MuiPrivateNotchedOutline-root-107 {

// }

class Input extends Component {
  render() {
    console.log(this.props.classes);
    const { textInput, addItem, textInputValue } = this.props;

    return (
      <>
        <div className={CSS.inputContainer}>
          <TextField
            classes={{ root: this.props.classes.root }}
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
  }
}

// export default Input;
export default withStyles(styles)(Input);
