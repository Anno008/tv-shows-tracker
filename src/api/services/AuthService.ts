import { getJSON } from "~/api/ApiCall";
import { RequestTokenResponse, SessionResponse, User } from "~/types";

export const login = async (username: string, password: string): Promise<RequestTokenResponse> => {
  const data = await getJSON<RequestTokenResponse>({
    url: "authentication/token/new"
  });

  const loginValidationResult = await getJSON<RequestTokenResponse>({
    method: "POST",
    url: "authentication/token/validate_with_login",
    body: JSON.stringify({
      username,
      password,
      request_token: data.request_token
    })
  });

  return loginValidationResult;
};

export const getSessionId = (requestToken: string): Promise<SessionResponse> => {
  return getJSON<SessionResponse>({
    url: "authentication/session/new",
    method: "POST",
    body: JSON.stringify({
      request_token: requestToken
    })
  });
};

export const getUserInfo = (sessionId: string): Promise<User> => {
  const getUserDetails = getJSON<User>({
    url: `account?session_id=${sessionId}`
  });

  return getUserDetails;
};
