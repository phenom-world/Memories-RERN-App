import { toast } from "react-toastify";
import * as api from "../../api/index.js";

import { AUTH } from "../constants/actionTypes";

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({
      type: AUTH,
      data,
    });
    toast.success("Login successful");
    history("/");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({
      type: AUTH,
      data,
    });
    toast.success("Login successful");
    history("/");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
