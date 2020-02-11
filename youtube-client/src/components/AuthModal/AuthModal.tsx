import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import { YoutubeContext } from "../../YoutubeProvider";

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

export const AuthModal = () => {
  const classes = useStyles();
  const rootRef = React.useRef(null);

  return (
    <YoutubeContext.Consumer>
      {(context: any) => (
        <div className={classes.root}>
          <Modal
            disableEnforceFocus
            disableAutoFocus
            open={context.state.authModalOpened}
            aria-labelledby="server-modal-title"
            aria-describedby="server-modal-description"
            className={classes.modal}
            container={() => rootRef.current}
            onBackdropClick={() => context.callbacks.toggleAuthModal(false)}
          >
            <div className={classes.paper}>
              <h2 id="server-modal-title">Server-side modal</h2>
              <p id="server-modal-description">
                If you disable JavaScript, you will still see me.
              </p>
            </div>
          </Modal>
        </div>
      )}
    </YoutubeContext.Consumer>
  );
};
