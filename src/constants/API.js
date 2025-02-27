export const API = {
  API_HOST: "http://localhost:7000",
  REGISTER: "/api/users/register",
  LOGIN: "/api/users/login",
  FOLDER: "/api/uploads/all",
  FOLDERS: "/api/uploads/",
  GET_ALL_FODER: "/api/file/foder",


  FILE: "/api/file/upload",
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
  // USERS: "/api/users/user",
  USERS_INFO: "/api/users/user_info",
  USERS_UPDATE: "/api/users/update",

  // AI Services
  API_AI: "http://icai.ailabs.io.vn",
  // API_AI: "http://localhost:7000",
  API_IMG: "http://icai.ailabs.io.vn/v1/api/images/",
  API_DETECTION: "/v1/api/detection",
  API_LOG: "/api/log/systemlogs",
 

};
