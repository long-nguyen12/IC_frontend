export const API = {
  API_HOST: "http://localhost:7000",
  REGISTER: "/api/users/register",
  LOGIN: "/api/users/login",
  FOLDER: "/api/folder/folder",
  FILE: "/api/file/upload",
  GET_ALL_IMAGE_NAME: "/api/image/image?folder={0}&page={1}&limit={2}",
  GET_ALL_IMAGE_NAME_NEW:
    "/api/file/get-file-name?folder={0}&page={1}&limit={2}&sort={3}&includes={4}",

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
  // API_AI: "http://ai-service.ailabs.io.vn",
  API_AI: "http://localhost:7000",
  API_DETECTION: "/v1/api/detection",

  API_LOG: "/api/log/systemlogs",
 

};
