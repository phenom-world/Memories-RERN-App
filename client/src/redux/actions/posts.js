import { toast } from "react-toastify";
import * as api from "../../api/index.js";
import {
  CREATE,
  DELETE,
  FETCH_ALL,
  FETCH_POST,
  LIKE,
  UPDATE,
  COMMENT,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  getSuggestion,
} from "../constants/actionTypes";

//Action Creators
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
  }
};
export const getSuggestedPosts = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchSuggestedPosts(searchQuery);
    dispatch({ type: getSuggestion, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: END_LOADING });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
    dispatch({ type: END_LOADING });
  }
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.createPost(post);

    history(`/posts/${data.id}`);

    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
    toast.success("Post successfully added");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    dispatch({ type: END_LOADING });
  }
};

export const updatePost = (id, post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
    dispatch({ type: END_LOADING });
    toast.success("Post successfully updated");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    dispatch({ type: END_LOADING });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
    toast.success("Post successfully deleted");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.likePost(id);
    dispatch({
      type: LIKE,
      payload: data,
    });
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.comment(value, id);

    dispatch({
      type: COMMENT,
      payload: data,
    });

    return data.comments;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
