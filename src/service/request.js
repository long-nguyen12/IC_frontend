// import NetInfo from '@react-native-community/netinfo';
import axios from "axios";
import { API } from "../constants/API";
import router from "../router";
import { message } from "antd";

let requestsCount = 0;

axios.defaults.baseURL = API.API_HOST;

const token = window.localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = token
  ? `Bearer ${JSON.parse(token)}`
  : "";

axios.interceptors.request.use(
  async function onRequest(config) {
    requestsCount = requestsCount + 1;
    if (!config?.hideLoading) {
      // startActivityLoading();
    }
    return config;
  },
  function onRequestError(error) {
    requestsCount = requestsCount - 1;
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async function onResponse(response) {
    requestsCount = requestsCount - 1;
    return response;
  },
  async function onResponseError(error) {
    requestsCount = requestsCount - 1;
    // updateActivityLoading();
    let errorText = "Lỗi xảy ra, vui lòng kiểm tra hoặc liên hệ quản trị viên";
    if (error.code === "ECONNABORTED") {
      errorText = "Thời gian chờ đã quá hạn, vui lòng thử lại";
    } else if (error.response) {
      // const { token } = getStore().getState().auth;
      if (error.response.status === 401) {
        console.log("--- token timeout ---");
        errorText = "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại";
        await window.localStorage.removeItem("token");
        router.navigate("/login");
        message.error(errorText);
        // getStore().dispatch(authActions.clear());
        // navigationService.replace(ROUTER.AUTH_NAVIGATOR);
      }
      if (error.response.status === 403) {
        // console.log("--- token timeout ---");
        errorText = "Bạn không có quyền truy cập chức năng này";
        message.error(errorText);
        // await window.localStorage.removeItem("token");
        // router.navigate("/login");
      }


      if (error.response.status === 304) {
        // console.log("--- token timeout ---");
        errorText = "đăng xuất thành công";
        message.error(errorText);
        // await window.localStorage.removeItem("token");
        // router.navigate("/login");
      }


      if (error.response.data?.message) {
        errorText = error.response.data.message;
        message.error(errorText);
        if (error.response.status === 401) {
          errorText = "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại";
          await window.localStorage.removeItem("token");
          router.navigate("/login");
        }
        // if (error.response.status === 403) {
        //   console.log("--- token timeout ---");
        //   errorText = "Bạn không có quyền truy cập chức năng này";
        //   await window.localStorage.removeItem("token");
        //   router.navigate("/login");
        // }
      }
      if (error.response.data?.body?.message) {
        errorText = error.response.data.message;
      }
      // if (error.response.data?.error_description) {
      //   errorText = error.response.data.error_description;
      //   if (errorText === "unregistered") {
      //     errorText = "Tài khoản chưa được đăng ký";
      //   }
      //   if (error.response.status === 401) {
      //     errorText = "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại";
      //     router.navigate("/login");
      //     window.localStorage.removeItem("token");
      //   }
      // }
    }

    const showError = error.config.showError ?? true;
    // if (showError) Toast.showText(errorText);
    if (showError) {
      console.log(errorText);
    }
    return Promise.reject(error);
  }
);

axios.interceptors.request.use(
  config => {
    config.withCredentials = true; 
    return config; 
  },
  error => {
    return Promise.reject(error);
  }
);
export default axios;
