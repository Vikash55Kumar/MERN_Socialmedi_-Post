
import api from "../Utility/api";
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'
import { CREATE_COMMENT_FAIL, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, GET_COMMENT_FAIL, GET_COMMENT_REQUEST, GET_COMMENT_SUCCESS, LIKES_FAIL, LIKES_REQUEST, LIKES_SUCCESS } from "../constrants/ATSConstrants";



export const getCommentDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_COMMENT_REQUEST });

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

    const { data } = await api.get("/comments/getCommentPost"); // Adjust the endpoint if necessary
    
    dispatch({
      type: GET_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_COMMENT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const createComment = (credentials) => async (dispatch) => {
  try {
    dispatch({ type:  CREATE_COMMENT_REQUEST });

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

    const response = await api.post("/comments/createComment", credentials, config);
    // console.log(response);
    
    const { data } = response;

    dispatch({
      type: CREATE_COMMENT_SUCCESS,
      payload: data,
    });
    return data;

  } catch (error) {
    dispatch({
      type: CREATE_COMMENT_FAIL,
      payload: error.response.data.message || error.message,
    });
    throw error;
  }
};

export const LikeUnlike = (id) => async (dispatch) => {
  try {
    dispatch({ type:  LIKES_REQUEST });

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

    const response = await api.post("/likes/postLike", {postId:id}, config);
    console.log(response);
    
    const { data } = response;

    dispatch({
      type: LIKES_SUCCESS,
      payload: data,
    });
    return data;

  } catch (error) {
    dispatch({
      type: LIKES_FAIL,
      payload: error.response.data.message || error.message,
    });
    throw error;
  }
};