import axios from "axios";
import {API} from "../constants/API";

export function postGenerateImage(image) {
  let api = `${API.API_HOST + API.SING_BOX}`
  let dectect_path ='/uploads/image_traffic/'+ image.name
  let data = {
    id:image._id,
    dectect_path:dectect_path
  
  }
 
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
