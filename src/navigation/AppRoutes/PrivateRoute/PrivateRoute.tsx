import React, { useContext } from "react";

import { Redirect, Route, RouteProps } from "react-router";

import UserSessionContext from "~/contexts/UserSessionContext";
import { loginRoute } from "~/navigation/routes";

const ProtectedRoute: React.FC<RouteProps> = ({ ...routeProps }) => {
  const { userSessionData } = useContext(UserSessionContext);
  if (userSessionData?.sessionId && userSessionData?.userInfo) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: loginRoute, state: { from: routeProps.location } }} />;
  }
};

export default ProtectedRoute;
