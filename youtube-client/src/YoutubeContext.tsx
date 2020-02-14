import * as React from "react";

import { authorizedFetch } from "./services/http/http";
import { useAuthPage, useUserPage, useUserData } from "./hooks";

export interface YoutubeContextInterface {
  isAuthPageOpened: boolean;
}

export const YoutubeContext = React.createContext<any>({
  isAuthPageOpened: false
});

const fetchCurrentUser = async () => await authorizedFetch("/users");

export const YoutubeProvider = (props: any) => {
  const [isAuthPageOpened, toggleAuthPage] = useAuthPage(false);
  const [isUserPageOpened, toggleUserPage] = useUserPage(false);
  const [userData, setUserData] = useUserData({});

  const onAuthSucceed = React.useCallback(async () => {
    const user = await fetchCurrentUser();

    (setUserData as Function)(user);
  }, []);

  const value = {
    // Auth page
    isAuthPageOpened,
    toggleAuthPage,
    // User page
    isUserPageOpened,
    toggleUserPage,
    // User data
    userData,
    // Login success callback
    onAuthSucceed
  };

  return (
    <YoutubeContext.Provider value={value}>
      {props.children}
    </YoutubeContext.Provider>
  );
};
