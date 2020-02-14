import { useState } from "react";

export const useUserPage = function(isOpenedByDefault: boolean) {
  const [isOpened, toggle] = useState(isOpenedByDefault);

  return [isOpened, toggle];
};
