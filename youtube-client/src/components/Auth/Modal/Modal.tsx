import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal as MaterialModal } from "@material-ui/core";

import {
  YoutubeContext,
  YoutubeContextInterface
} from "../../../YoutubeContext";

const useStyles = makeStyles(theme => ({
  root: {
    height: 300,
    flexGrow: 1,
    minWidth: 300,
    transform: "translateZ(0)",
    position: "absolute",
    // The position fixed scoping doesn't work in IE 11.
    // Disable this demo to preserve the others.
    "@media all and (-ms-high-contrast: none)": {
      display: "none"
    }
  },
  modal: {
    display: "flex",
    padding: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export const Modal = (props: any) => {
  const classes = useStyles();
  const rootRef = React.useRef(null);

  return (
    <YoutubeContext.Consumer>
      {(context: YoutubeContextInterface) => (
        <div className={classes.root}>
          <MaterialModal
            disableEnforceFocus
            disableAutoFocus
            open={context.isAuthPageOpened}
            aria-labelledby="server-modal-title"
            aria-describedby="server-modal-description"
            className={classes.modal}
            container={() => rootRef.current}
            onBackdropClick={props.onBackdropClick}
          >
            <div className={classes.paper}>{props.children}</div>
          </MaterialModal>
        </div>
      )}
    </YoutubeContext.Consumer>
  );
};
