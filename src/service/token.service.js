import axios from "axios";

// import { APP_CODE, SITE_ID } from '@constants/app';

export function setToken(token) {
  axios.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : "";
}

export function clearToken() {
  axios.defaults.headers.common["Authorization"] = null;
  axios.defaults.headers.common["App-Code"] = null;
  axios.defaults.headers.common["Site-Id"] = null;
}
