import {
  GET_POSTS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_ALERT,
  REMOVE_ALERT,
  CLEAR_ERRORS,
} from './Types';

export default (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.username,
        isAuthenticated: true,
      };
    case LOG_OUT:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        loading: false,
        token: null,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload.pageList,
        page: action.payload.page,
        loading: false,
      };
    case SET_ALERT:
      console.log(state.alerts);
      return {
        ...state,
        alerts: [action.payload, ...state.alerts],
        loading: false,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter((alert) => alert.id !== action.payload),
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
