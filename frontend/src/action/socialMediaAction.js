import api from "../Utility/api";
import Cookies from 'js-cookie';

import {
  GET_SOCIAL_MEDIA_POST_REQUEST,
  GET_SOCIAL_MEDIA_POST_SUCCESS,
  GET_SOCIAL_MEDIA_POST_FAIL,

  DELETE_POST_REQUEST,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,

  CREATE_POST_FAIL,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,

  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAIL,

} from "../constrants/ATSConstrants";
import { toast } from "react-toastify";

export const getPostDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SOCIAL_MEDIA_POST_REQUEST });

    const { data } = await api.get("/socialMedia/getPost"); // Adjust the endpoint if necessary
    
    dispatch({
      type: GET_SOCIAL_MEDIA_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SOCIAL_MEDIA_POST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const createPost = (credentials) => async (dispatch) => {
  try {
    dispatch({ type:  CREATE_POST_REQUEST });

    const accessToken = localStorage.getItem('accessToken') || Cookies.get('token');
    if (!accessToken) {
        throw new Error("Access token not found");
    }
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`, // Include JWT token
        }
    };

    const response = await api.post("/socialMedia/createPost", credentials, config);
    // console.log(response);
    
    const { data } = response;

    dispatch({
      type: CREATE_POST_SUCCESS,
      payload: data,
    });
    return data;

  } catch (error) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload: error.response.data.message || error.message,
    });
    throw error;
  }
};

export const deletePost = (id) => async (dispatch) => {
  
  try {
    dispatch({ type: DELETE_POST_REQUEST });

    const accessToken = localStorage.getItem('accessToken') || Cookies.get('token');
    if (!accessToken) {
        throw new Error("Access token not found");
    }
    const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // Include JWT token
        }
    };

    const response = await api.post( "/socialMedia/deletePost", {postId:id}, config);
    console.log(response);
    
    const { data } = response;
    dispatch({
        type: DELETE_POST_SUCCESS,
        payload: data,
    });

    return data;

  } catch (error) {
    if (error.response && error.response.data) {
      // Attempt to extract text from HTML response
      const parser = new DOMParser();
      const doc = parser.parseFromString(error.response.data, "text/html");
      const preTag = doc.querySelector("pre");
  
      const errorMessage = preTag ? preTag.innerText.trim() : "An unknown error occurred";
  
      toast.error(errorMessage);

    }
    // console.error('Error during post deletion:', error.response?.data || error.message);
    dispatch({
        type: DELETE_POST_FAIL,
        payload: error.response?.data?.message || error.message,
    });
    throw error;
  }

};

export const updatePost = (formData) => async (dispatch) => {
  try {
    dispatch({ type:  UPDATE_POST_REQUEST });

    const accessToken = localStorage.getItem('accessToken') || Cookies.get('token');
    if (!accessToken) {
        throw new Error("Access token not found");
    }
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`, // Include JWT token
        }
    };
    const response = await api.post("/socialMedia/updatePost", formData, config);
    console.log(response);

    const { data } = response;

    
    dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: UPDATE_POST_FAIL,
      payload: error.response.data.message || error.message,
    });
    throw error;
  }
};

