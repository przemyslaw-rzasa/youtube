import { useState } from "react";

export const useAuthPage = function(isOpenedByDefault: boolean) {
  const [isOpened, toggle] = useState(isOpenedByDefault);

  return [isOpened, toggle];
};
