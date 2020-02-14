import { defaultsDeep } from "lodash";

import { DEV_SERVER_URL, JWT_KEY, DEFAULT_FETCH_OPTIONS } from "./constants";

const getAuthToken = () => `Bearer ${localStorage.getItem(JWT_KEY)}`;

const SERVER_URL = DEV_SERVER_URL;

export const unauthorizedFetch = async (path: string, userOptions: unknown) => {
  const options = defaultsDeep(userOptions, DEFAULT_FETCH_OPTIONS);

  const res = await fetch(`${SERVER_URL}${path}`, options);

  const body = await res.json();

  if (String(res.status).startsWith("2")) {
    return body;
  }

  const errorMessage = body.error;

  throw new Error(errorMessage);
};

export const authorizedFetch = async (path: string, userOptions?: unknown) => {
  const options = defaultsDeep(userOptions, DEFAULT_FETCH_OPTIONS);

  options.headers.Authorization = getAuthToken();

  const res = await fetch(`${SERVER_URL}${path}`, options);

  const body = await res.json();

  if (String(res.status).startsWith("2")) {
    return body;
  }

  const errorMessage = body.error;

  throw new Error(errorMessage);
};

export const authorize = async (email: string, password: string) => {
  const res = await fetch(`${DEV_SERVER_URL}/auth`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const body = await res.json();

  if (res.status === 201) {
    localStorage.setItem(JWT_KEY, body.jwt_token);

    return body.jwt_token;
  }

  const errorMessage = body.error;

  throw new Error(errorMessage);
};
