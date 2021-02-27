import { fetchBase } from "./fetchBase"
import { API_URL } from "../config";
import cookie from "js-cookie"

export interface UserDataTypes {
  name: string,
  username: string,
  email: string,
  hashedPassword?: string,
  role?: number,
  salt?: string,
  about?: string,
  photo?: any,
  createdAt?: string,
  updatedAt?: string,
}

export const signin = (payload: any) => {
  return fetchBase(`${API_URL}/auth/signin`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload)
  })
}

export const signup = (payload: any) => {
  return fetchBase(`${API_URL}/auth/signup`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload)
  })
}

export const signout = () => {
  return fetchBase(`${API_URL}/auth/signout`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  }).then(() => {
    removeCookie('token');
    removeLocalStorage('user');
  })
}


// set cookie
export const setCookie = (key: string, value: string) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1
    });
  }
}

// remove cookie
export const removeCookie = (key: string) => {
  if (process.browser) {
    cookie.remove(key);
  }
}

// get cookie
export const getCookie = (key: string) => {
  if (process.browser) {
    return cookie.get(key);
  }
}

// localStorage
export const setLocalStorage = (key: string, value: string) => {
  if (process.browser) {
    const stringifyUser = JSON.stringify(value);
    localStorage.setItem(key, stringifyUser)
  }
}

export const getLocalStorage = (key: string) => {
  if (process.browser) {
    return localStorage.getItem(key)
  }
}

// remove localStorage
export const removeLocalStorage = (key: string) => {
  if (process.browser) {
    localStorage.removeItem(key)
  }
}

// authenticate user by pass data to cookie and localStorage
export const authenticate = (data: any, callback: Function) => {
  setCookie('token', data.data.token);
  setLocalStorage('user', data.data);
  callback();
}
