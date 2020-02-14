import * as React from "react";
import { AppBar, Toolbar } from "@material-ui/core";

import { SearchBar } from "../SearchBar/SearchBar";
import { HeaderButtons } from "../HeaderButtons/HeaderButtons";

export const Header = (props: any) => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <SearchBar />
        <HeaderButtons />
      </Toolbar>
    </AppBar>
  );
};
