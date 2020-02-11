import * as React from "react";

export interface Context {
  state: {
    authModalOpened: boolean;
  };
}

export const YoutubeContext = React.createContext({});

export const YoutubeProvider = (props: any) => {
  const [state, setState] = React.useState({
    userAuthenticated: false,
    authModalOpened: false
  });

  const toggleAuthModal = (isOpen: boolean) =>
    setState({
      ...state,
      authModalOpened: isOpen
    });

  const callbacks = { toggleAuthModal };

  return (
    <YoutubeContext.Provider
      value={{
        state,
        callbacks
      }}
    >
      {props.children}
    </YoutubeContext.Provider>
  );
};
