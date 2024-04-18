export const API = {
  API_HOST: "http://localhost:3000",
  REGISTER: "/api/users/register",
  LOGIN: "/api/users/login",
  FOLDER: "/api/folder/folder",
  FILE: "/api/file/upload",
  GET_ALL_IMAGE_NAME: "/api/image/image?folder={0}&page={1}&limit={2}",
  VIEW_IMAGE: "/api/image/view-image?folder={0}&name={1}",

  ADD_DESCRIBE: "/api/describe/describe",
  GET_DESCRIBE: "/api/describe/describe?name={0}",

  USERS: "/api/users/user",
  USERS_INFO: "/api/users/user_info",
};