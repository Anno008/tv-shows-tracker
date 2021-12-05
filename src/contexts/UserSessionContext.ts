import { createContext } from "react";

import { User } from "~/types";

export type UserSessionValue = {
  sessionId?: string;
  userInfo?: User;
};
export type UserSessionContextValue = {
  userSessionData?: UserSessionValue;
  setUserSessionData: (data: UserSessionValue, rememberMe: boolean) => void;
  clearUserSession: () => void;
};
export default createContext<UserSessionContextValue>({
  setUserSessionData: () => null,
  clearUserSession: () => null
});
