import {
    GET_SOCIAL_MEDIA_POST_REQUEST,
    GET_SOCIAL_MEDIA_POST_SUCCESS,
    GET_SOCIAL_MEDIA_POST_FAIL,
    
   

} from "../constrants/ATSConstrants"

// export const teacherReducer = (state = {teacher : {}}, action) => {
//     switch (action.type) {
//         case SIGNUP_REQUEST:
//         case LOGIN_REQUEST:
//         case LOGOUT_REQUEST:
//         case GOOGLE_LOGIN_REQUEST:
//         case LOAD_TEACHER_REQUEST:
//         case FORGOTPASSWORD_REQUEST:
//             return {
//                 ...state,
//                 loading : true,
//                 isAuthenticated: false,
//             }

//         case LOGIN_SUCCESS:
//         case GOOGLE_LOGIN_SUCCESS:
//         case LOAD_TEACHER_SUCCESS:
//         case FORGOTPASSWORD_SUCCESS:
//         case LOGOUT_FAIL:
//             return {
//                 ...state,
//                 loading : false,
//                 isAuthenticated: true,
//                 teacher : action.payload
//             };
//         case SIGNUP_FAIL:
//         case LOGIN_FAIL:
//         case GOOGLE_LOGIN_FAIL:
//         case FORGOTPASSWORD_FAIL:
//             return {
//                 ...state,
//                 loading : false,
//                 isAuthenticated: false,
//                 teacher:null,
//                 error: action.payload,
//             };

//         case AUTH_ERROR:
//         case SIGNUP_SUCCESS:
//         case LOGOUT_SUCCESS:
//             return {
//                 ...state,
//                 loading : false,
//                 isAuthenticated: false,
//                 teacher : action.payload
//             };
        
//         case LOAD_TEACHER_FAIL:
//             return {
//                 ...state,
//                 loading : false,
//                 isAuthenticated: false,
//                 teacher:null,
//                 error: action.payload,
//             }
        
//         case CLEAR_ERRORS:
//             return {
//                 ...state,
//                 error: null,
//             };     
    
//         default:
//             return state;
//     }
// }

export const postDetailsReducer = (state = {postDetails : {}}, action) => {
    switch (action.type) {
     
        case GET_SOCIAL_MEDIA_POST_REQUEST:
            return {
                ...state,
                loading : true,
            }
        
        case GET_SOCIAL_MEDIA_POST_SUCCESS:
            return {
                ...state,
                loading : false,
                postDetails : action.payload
            }
        
        case GET_SOCIAL_MEDIA_POST_FAIL:
            return {
                ...state,
                loading : false,
                postDetails : null,
                error : action.payload
        }
    
        default:
            return state;
    }
}
