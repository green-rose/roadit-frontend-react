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
} from './Types';

const State = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    posts: [],
    page: 0,
    loading: false,
    isAuthenticated: null,
    user: null,
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  const getPosts = async () => {
    load();
    const res = await axios.get(`https://roaditbeck.herokuapp.com/api/v1/feed`);
    //const res = await axios.get(`http://localhost:8080/api/v1/feed`);
    const { pageList, pages } = res.data;
    dispatch({
      type: GET_POSTS,
      payload: { pageList, pages },
    });
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
        'http://localhost:8080/login',
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
      console.error(err.message);
      dispatch({
        type: LOGIN_FAIL,
        payload: err.data,
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
      const res = await axios.post(
        'http://localhost:8080/register',
        { username, password },
        config
      );
      //const res = await axios.post('https://roaditbeck.herokuapp.com/register', formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
      });
      login(res.data);
    } catch (err) {
      console.error(err.message);
      dispatch({
        type: REGISTER_FAIL,
        payload: err.data,
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

  return (
    <Context.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        posts: state.posts,
        page: state.page,
        loading: state.loading,
        user: state.user,
        getPosts,
        login,
        logout,
        load,
        register,
      }}>
      {props.children}
    </Context.Provider>
  );
};

export default State;
