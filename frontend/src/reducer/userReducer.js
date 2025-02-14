import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    
    SIGNUP_REQUEST, 
    SIGNUP_SUCCESS, 
    SIGNUP_FAIL, 

    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_REQUEST,

    CLEAR_ERRORS,

    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    
    FORGOTPASSWORD_REQUEST,
    FORGOTPASSWORD_SUCCESS,
    FORGOTPASSWORD_FAIL,
    
} from "../constrants/ATSConstrants.js"
import { getTokenFromCookies } from "../Utility/tokenUtils.js";
const initialState = {
    student: null,
    isAuthenticated: !!getTokenFromCookies(),
    loading: false,
    error: null,
  };
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGNUP_REQUEST:
      case LOGIN_REQUEST:
      case LOGOUT_REQUEST:
      case FORGOTPASSWORD_REQUEST:
        return {
          ...state,
          loading: true,
          isAuthenticated: false,
        };
  
      case LOGIN_SUCCESS:
      case FORGOTPASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          student: action.payload,
        };
  
      case SIGNUP_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,  // ✅ Fixed
          student: action.payload,
        };
  
      case LOGOUT_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,  // ✅ Fixed
          student: null,
        };
  
      case SIGNUP_FAIL:
      case LOGIN_FAIL:
      case LOGOUT_FAIL:
      case FORGOTPASSWORD_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          student: null,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  

const initialState2 = {
    userDetails: {
      data: [],  // Initialize it as an empty array or any default value
    },
    loading: false,
    error: null,
  };

export const userDetailsReducer = (state = initialState2, action) => {
    switch (action.type) {

        case GET_USER_REQUEST:
            return {
                ...state,
                loading : true,
            }
        
        case GET_USER_SUCCESS:
            return {
                ...state,
                loading : false,
                userDetails : action.payload
            }
        
        case GET_USER_FAIL:
            return {
                ...state,
                loading : false,
                userDetails : null,
                error : action.payload
        }
    
        default:
            return state;
    }
}
