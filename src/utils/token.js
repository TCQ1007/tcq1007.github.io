import { useCookies } from "vue3-cookies";
const {cookies} = useCookies();
const TokenKey = "User-Token";

export function getToken() {
  return cookies.get(TokenKey);
}

export function setToken(token) {
  return cookies.set(TokenKey, token);
}

export function removeToken() {
  return cookies.remove(TokenKey);
}