import axios from "axios";
import {API} from "../constants/API";
import { Button, notification, Space } from 'antd';







export function postGenerateImage(image) {
  console.log("image",image)
  
  let api = `${API.API_HOST + API.SING_BOX}`
  let dectect_path = image.name
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
      // openNotificationWithIcon('error')
      return null;
    });
}
