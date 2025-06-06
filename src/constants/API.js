export const API = {
  API_HOST: "http://localhost:7000",
  REGISTER: "/api/users/register",
  LOGIN: "/api/users/login",
  Forgot_Password: "/api/users/forgot-password",
  RESET_PASSWORD: "/api/users/reset-password",
  FOLDER: "/api/uploads/all",
  FOLDERS: "/api/uploads/getdatafolder",
  


  GET_ALL_FODER: "/api/file/foder",
  DELETE_FOLDER:"/api/file/delete-folder",
  API_DOWLOAD: "/api/describe/create_json?folderName=",
  USERS_LOGOUT : "/api/users/logout",

  GET_FILE_ID: "/api/file/get-file-id",
  FILE: "/api/file/upload",
  DELETE_FILE: "/api/file/delete-file",
  UPDATE_FILE: "/api/file/updatefile",
  SING_BOX: "/api/file/singbox",
  GET_ALL_IMAGE_NAME: "/api/image/image?folder={0}&page={1}&limit={2}",
  GET_ALL_IMAGE_NAME_NEW:
    "/api/file/get-file-name?folder={0}&page={1}&limit={2}&sort={2}&includes={4}",

  UPLOAD_IMAGE: "/api/image/upload",
  VIEW_IMAGE: "/api/image/view-image?folder={0}&name={1}",

  ADD_DESCRIBE: "/api/describe/describe",
  GET_DESCRIBE: "/api/describe/describe?name={0}",
  GET_ALL_DESCRIBE_BY_FOLDER:
    "/api/describe/describe_all_by_folder?folder={0}&page={1}&limit={2}",
  EXPORT_FILE: "/api/describe/create_json",
  DOWNLOAD: "/api/image/download-json?name={0}&subMenu={1}",

  CATEGORIES: "/api/categories/categories_all",

  USERS: "/api/users/user",
  USERS_CREAT: "/api/users/register",
  USERS_INFO: "/api/users/user_info",
  USERS_UPDATE: "/api/users/update",
  USERS_DELETE: "/api/users/delete",
  USERS_EDIT: "/api/users/edit",

  // AI Services
  API_AI: "https://icai.ailabs.io.vn",
  API_IMG: "https://icai.ailabs.io.vn/v1/api/images/",
  API_DETECTION: "/v1/api/detection",
  API_LOG: "/api/log/systemlogs",
 

};
