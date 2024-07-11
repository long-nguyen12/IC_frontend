import axios from "axios";
import * as BASE_API from "../constants/API";

export function postGenerateImage(data) {
  let api = `${BASE_API.API.API_AI}${BASE_API.API.API_DETECTION}?file_id=${data}`
  return axios
    .get(api)
    .then((response) => {
      if (response && response.status === 200) {
        console.log(response);
        return response?.data;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}
