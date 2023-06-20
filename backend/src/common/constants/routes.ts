export const ROUTES = {
  AUTH: 'auth',
  USERS: 'users',
  POSTS: 'posts',
  FILES: 'files',
};

export const SUBROUTES = {
  REGISTER: 'register',
  LOGIN: 'login',
  LOGOUT: 'logout',
  REFRESH: 'refresh',
  FORGOT_PASSWORD: 'forgot-password',
  FORGOT_PASSWORD_TOKEN: 'forgot-password/:token',
  CHANGE_PASSWORD: 'change-password',

  ACTIVATE: 'activate',
  ACTIVATE_TOKEN: 'activate/:token',

  GET_FAVORITES_POSTS: 'favorites',
  GET_POST: ':postId',
  DELETE_POST: ':postId',
  UPDATE_POST: ':postId',
  TOGGLE_FAVORITE: 'toggle-favorite/:postId',

  CHANGE_STATUS: 'change-status',
};
