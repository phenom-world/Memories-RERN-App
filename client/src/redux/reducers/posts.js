import {
  CREATE,
  DELETE,
  FETCH_ALL,
  FETCH_POST,
  COMMENT,
  LIKE,
  UPDATE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  SETCURRENTID,
  getSuggestion,
} from "../constants/actionTypes";

const postReducer = (state = { isLoading: false, posts: [], currentId: null }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action?.payload?.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_POST:
      return {
        ...state,
        post: action?.payload?.data,
      };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action?.payload?.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case CREATE:
      return {
        posts: [...state, action?.payload],
      };
    case UPDATE:
      return {
        ...state,
        posts: state?.posts?.map((post) => (post?.id === action?.payload?.id ? action?.payload : post)),
      };
    case COMMENT:
      return {
        ...state,
        posts: state?.posts?.map((post) => {
          if (post?.id === action?.payload?.id) return action?.payload;
          return post;
        }),
      };
    case LIKE:
      return {
        ...state,
        posts: state?.posts?.map((post) => (post?.id === action?.payload?.id ? action?.payload : post)),
      };
    case DELETE:
      return {
        ...state,
        posts: state?.posts?.filter((post) => post?.id !== action?.payload),
      };
    case SETCURRENTID:
      return { ...state, currentId: action.payload };
    case getSuggestion:
      return { ...state, posts: action.payload.data.sort(() => Math.random() - 0.5).slice(0, 5) };
    default:
      return state;
  }
};

export default postReducer;
