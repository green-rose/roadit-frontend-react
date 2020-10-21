import React, { useReducer } from 'react';
import axios from 'axios';
import Context from './Context';
import Reducer from './Reducer';
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

const State = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    posts: [],
    page: 0,
    loading: false,
    isAuthenticated: null,
    user: null,
    alerts: [],
    error: null,
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const getPosts = async () => {
    load();
    //const res = await axios.get(`https://roaditbeck.herokuapp.com/api/v1/feed`);
    const res = await axios.get(
      process.env.REACT_APP_BACKEND_URL + `/api/v1/feed`
    );
    const { pageList, pages } = res.data;
    dispatch({
      type: GET_POSTS,
      payload: { pageList, pages },
    });
  };

  const setAlert = (msg, type, timeout = 5000) => {
    const id = msg + Math.floor(Math.random() * 101);
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };
  // eslint-disable-next-line
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  };

  const login = async (formData) => {
    load();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        process.env.REACT_APP_BACKEND_URL + '/login',
        formData,
        config
      );
      //const res = await axios.post('https://roaditbeck.herokuapp.com/login', formData, config);
      const { token } = res.data;
      const username = formData.username;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token, username },
      });
      setAuthToken(localStorage.token);
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.message,
      });
    }
  };

  const register = async ({ username, password }) => {
    load();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      await axios.post(
        process.env.REACT_APP_BACKEND_URL + '/register',
        { username, password },
        config
      );
      //const res = await axios.post('https://roaditbeck.herokuapp.com/register', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
      });
      login({ username, password });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.message,
      });
    }
  };
  const logout = () => {
    dispatch({
      type: LOG_OUT,
      payload: '',
    });
  };

  const load = () => {
    dispatch({
      type: LOADING,
    });
  };

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <Context.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        posts: state.posts,
        page: state.page,
        loading: state.loading,
        user: state.user,
        error: state.error,
        alerts: state.alerts,
        getPosts,
        login,
        logout,
        load,
        register,
        clearErrors,
        setAlert,
      }}>
      {props.children}
    </Context.Provider>
  );
};

export default State;
