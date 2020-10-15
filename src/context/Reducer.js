import { GET_POSTS } from './Types';

export default (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload.pageList,
        page: action.payload.page
      };
    default:
      return state;
  }
};
