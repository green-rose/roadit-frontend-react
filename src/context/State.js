import React, { useReducer } from 'react';
import axios from 'axios';
import Context from './Context';
import Reducer from './Reducer';
import { GET_POSTS } from './Types';

const State = (props) => {

  const searchPosts = async () => {
    const res = await axios.get(`http://localhost:8080/api/v1/feed`);
    const {pageList, pages} = res.data;
    dispatch({
      type: GET_POSTS,
      payload:pageList,
    });
  };

  const initialState = {
    posts: [],
  };

  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider
      value={{
        posts: state.posts,
        searchPosts
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
