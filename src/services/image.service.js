import axios from "axios";
import {API} from "../constants/API";

export function postGenerateImage(name) {
  let api = `${API.API_HOST + API.SING_BOX}`
  let dectect_path ='/uploads/image_traffic/'+ name
  let data = {dectect_path:dectect_path}
 
  return axios
    .post(api,data)
    .then((response) => {
      if (response && response.status === 200) {
        return response?.data;
      }
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}
