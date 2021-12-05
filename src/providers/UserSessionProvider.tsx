import React, { useEffect, useState } from "react";

import { userInfoKey } from "~/constants/Config";
import UserSessionContext, { UserSessionValue } from "~/contexts/UserSessionContext";

const UserSessionProvider: React.FC = ({ children }) => {
  const [userSessionData, setUserSessionData] = useState<UserSessionValue>();

  useEffect(() => {
    const userInfo = localStorage.getItem(userInfoKey);
    if (!!userInfo) {
      const parsedUserInfo = JSON.parse(userInfo) as UserSessionValue;
      if (parsedUserInfo.sessionId && parsedUserInfo.userInfo) {
        setUserSessionData(parsedUserInfo);
      }
    }
  }, []);

  const handleSetUserSessionData = (data: UserSessionValue, rememberMe: boolean) => {
    if (rememberMe) {
      localStorage.setItem(userInfoKey, JSON.stringify(data));
    }
    setUserSessionData(data);
  };
  const handleClearSessionData = () => {
    localStorage.removeItem(userInfoKey);
    setUserSessionData(undefined);
  };

  return (
    <UserSessionContext.Provider
      value={{
        userSessionData: userSessionData,
        setUserSessionData: handleSetUserSessionData,
        clearUserSession: handleClearSessionData
      }}>
      {children}
    </UserSessionContext.Provider>
  );
};

export default UserSessionProvider;
