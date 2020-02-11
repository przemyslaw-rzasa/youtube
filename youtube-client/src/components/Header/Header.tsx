import * as React from "react";
import { AppBar, Toolbar } from "@material-ui/core";

import { SearchBar } from "../SearchBar/SearchBar";
import { UserOptions } from "../UserOptions/UserOptions";

export const Header = (props: any) => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <SearchBar />
        <UserOptions />
      </Toolbar>
    </AppBar>
  );
};
