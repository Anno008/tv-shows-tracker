import React, { useContext, useEffect, useState } from "react";

import { Location } from "history";
import { useHistory, useLocation } from "react-router-dom";
import { useTheme } from "styled-components";

import { login, getSessionId, getUserInfo } from "~/api/services/AuthService";
import { Button, FlexGrid, Label, MainLayout, Paragraph } from "~/components/atoms";
import Input from "~/components/Input";
import UserSessionContext from "~/contexts/UserSessionContext";
import locators from "~/testUtils/locators";
import { setTestId } from "~/testUtils/setTestId";

type LocationState = {
  from: Location;
};

const LoginPage: React.FC = () => {
  const history = useHistory();
  const { userSessionData, setUserSessionData } = useContext(UserSessionContext);
  const location: Location<LocationState> = useLocation();
  const theme = useTheme();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string>();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    login(username, password)
      .then(loginResponse =>
        getSessionId(loginResponse.request_token).then(sessionResponse =>
          getUserInfo(sessionResponse.session_id).then(userInfo =>
            setUserSessionData({ userInfo, sessionId: sessionResponse.session_id }, rememberMe)
          )
        )
      )
      .catch(e => setError(e.status_message));
  };

  useEffect(() => {
    if (userSessionData?.sessionId && userSessionData?.userInfo) {
      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    }
  }, [history, location.state, userSessionData?.sessionId, userSessionData?.userInfo]);

  return (
    <MainLayout flexDirection="column">
      <form onSubmit={handleLogin} {...setTestId(locators.loginPageLoginForm)}>
        <FlexGrid flexDirection="column" flex="1" width="100" gap="20px">
          <Input
            placeholder="Username"
            type="text"
            value={username}
            testId={locators.loginPageUsernameInput}
            onTextChange={e => setUsername(e)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            testId={locators.loginPagePasswordInput}
            onTextChange={e => setPassword(e)}
          />
          <FlexGrid alignItems="center" justifyContent="flex-start" gap="10px">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
            />
            <Label>Remember me?</Label>
          </FlexGrid>
          <Button type="submit" {...setTestId(locators.loginPageLoginButton)}>
            Login
          </Button>
          {error && <Paragraph color={theme.errorColor}>{error}</Paragraph>}
        </FlexGrid>
      </form>
    </MainLayout>
  );
};

export default LoginPage;
