import api from "../Utility/api"
import Cookies from 'js-cookie';
import { deleteAllCookies } from "../Utility/tokenUtils";
import { toast } from 'react-toastify';

import {
    FORGOTPASSWORD_FAIL,
    FORGOTPASSWORD_REQUEST,
    FORGOTPASSWORD_SUCCESS,

    GET_USER_FAIL, 
    GET_USER_REQUEST, 
    GET_USER_SUCCESS, 

    LOGIN_FAIL, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 

    LOGOUT_FAIL, 
    LOGOUT_REQUEST, 
    LOGOUT_SUCCESS, 

    SIGNUP_FAIL, 
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
} from "../constrants/ATSConstrants";


export const getUserDetails = () => async (dispatch) => {
    try {
      dispatch({ type: GET_USER_REQUEST });
  
      const {data} = await api.get("/users/getUser"); // Adjust the endpoint if necessary

      dispatch({
        type: GET_USER_SUCCESS,
        payload: data,
      });
  
    } catch (error) {
      dispatch({
        type: GET_USER_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const userRegister = (credentials) => async (dispatch) => {
    try {
        dispatch({ type: SIGNUP_REQUEST });

        const response =await api.post("/users/register", credentials);

        // console.log(response);
        const { data } = response; // Entire response object

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: data
        });
        return data;

    } catch (error) {
        dispatch({
            type: SIGNUP_FAIL,
            payload: error.response.data.message || error.message
        });
        throw error;
    }
};

export const userLogin = (credentials) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const response = await api.post("/users/login", credentials);
        // console.log(response); 

        const { data } = response; // Entire response object
        const { accessToken, user } = data.data; // Correctly extracting tokens

        if (!accessToken) {
            throw new Error("Access token not found");
        }

        // Save token in cookies
        Cookies.set("token", accessToken, { expires: 7, path: "/" });

        dispatch({ type: LOGIN_SUCCESS, payload: user }); // Store user details in Redux

        return data; // Return only necessary data
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response?.data?.message || error.message });
        throw error;
    }
};

export const forgetPassword = (userData) => async (dispatch) => {
    try {
        dispatch({ type: FORGOTPASSWORD_REQUEST });

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

        const response = await api.post('/users/forgetPassword', userData, config);
        // console.log("data", response);

        const { data } = response;

        dispatch({
            type: FORGOTPASSWORD_SUCCESS,
            payload: data
        });
        return data;

    } catch (error) {
        dispatch({
            type: FORGOTPASSWORD_FAIL,
            payload: error.response.data.message || error.message,
        });
        throw error;
    }
};

export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: LOGOUT_REQUEST });

      // Clear cookies
        const deleteAllCookies = () => {
            const cookies = document.cookie.split(";");
    
            for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie =
                name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            }
        };
        deleteAllCookies();
    
        // Clear tokens from storage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        sessionStorage.clear();
    
        dispatch({ type: LOGOUT_SUCCESS });
            
        toast.success("Logout successful");
  
    } catch (error) {
      toast.error("Logout error: Please refresh the page to logout");
      dispatch({
        type: LOGOUT_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
