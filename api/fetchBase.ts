import fetch from "isomorphic-unfetch";


export const fetchBase = (url: string, options: RequestInit) => {
  return fetch(url, options)
    .then(res => res.json())
    .catch(err => err);
}