import { apiKey, apiUrl } from "~/constants/Config";

export interface FetchConfig {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: BodyInit;
}

export const getJSON = <T>({ url, body, method }: FetchConfig): Promise<T> =>
  fetch(`${apiUrl}/${url}${url.includes("?") ? "&" : "?"}api_key=${apiKey}`, {
    body,
    headers: createHeader(),
    method: method || "GET"
  }).then(response => handleApiResponse<T>(response));

const handleApiResponse = async <T>(response: Response): Promise<T> => {
  if (response.status >= 200 && response.status <= 204) {
    return await response.json();
  }
  if (response.body) {
    throw await response.json();
  } else {
    throw response;
  }
};

const createHeader = (): HeadersInit => ({
  "Content-Type": "application/json",
  Accept: "*/*"
});
