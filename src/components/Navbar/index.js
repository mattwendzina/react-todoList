import React from "react";

import Appbar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

// import CSS from "./navbar.module.css";

const Navbar = props => {
  return (
    <>
      <Appbar style={{ position: "initial" }}>
        <Toolbar>
          <Typography variant="title" color="inherit">
            Todo App
          </Typography>
        </Toolbar>
      </Appbar>
    </>
  );
};

export default Navbar;
