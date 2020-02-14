import * as React from "react";
import { Button } from "@material-ui/core";
import { Person, AddBox } from "@material-ui/icons";
import { isEmpty } from "lodash";

import { YoutubeContext } from "../../YoutubeContext";
import { Page as AuthPage } from "../../pages/AuthPage";

import "./HeaderButtons.scss";

export const HeaderButtons = () => {
  const context = React.useContext(YoutubeContext);

  const BUTTON_STYLES = {
    maxWidth: "30px",
    maxHeight: "30px",
    minWidth: "30px",
    minHeight: "30px"
  };

  const onPersonButtonClick = () => {
    context.toggleAuthPage(true);
    if (isEmpty(context.userData)) {
      context.toggleAuthModal(true);
    } else {
      context.toggleUserModal(true);
    }
  };

  const authButton = (
    <div className="user-options">
      <Button
        color="default"
        size="small"
        onClick={() => true}
        style={BUTTON_STYLES}
        disabled={true}
      >
        <AddBox />
      </Button>
      <Button
        color="default"
        size="small"
        onClick={onPersonButtonClick}
        style={BUTTON_STYLES}
      >
        <Person />
      </Button>
    </div>
  );

  return (
    <div className="user-options">
      {authButton}
      {<AuthPage />}
    </div>
  );
};
