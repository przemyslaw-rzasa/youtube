import { useState } from "react";

interface UserData {
  id?: number;
  email?: string;
  role?: string;
}

export const useUserData = function(initialUserData: UserData) {
  const [userData, setUserData] = useState(initialUserData);

  return [userData, setUserData];
};
