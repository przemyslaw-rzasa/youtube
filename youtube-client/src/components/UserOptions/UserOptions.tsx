import * as React from "react";
import { Button } from "@material-ui/core";
import { Person, AddBox } from "@material-ui/icons";

import { YoutubeContext } from "../../YoutubeProvider";
import { AuthModal } from "../AuthModal/AuthModal";

import "./UserOptions.scss";

export const UserOptions = (props: any) => {
  const BUTTON_STYLES = {
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px"
  };

  const authButton = (
    <YoutubeContext.Consumer>
      {({ state, callbacks }: any) => (
        <div className="user-options">
          <Button
            color="default"
            size="small"
            onClick={() => true}
            style={BUTTON_STYLES}
            disabled={!state.userAuthenticated}
          >
            <AddBox />
          </Button>
          <Button
            color="default"
            size="small"
            onClick={() => callbacks.toggleAuthModal(true)}
            style={BUTTON_STYLES}
          >
            <Person />
          </Button>
        </div>
      )}
    </YoutubeContext.Consumer>
  );

  return (
    <div className="user-options">
      {authButton}
      {<AuthModal />}
    </div>
  );
};
