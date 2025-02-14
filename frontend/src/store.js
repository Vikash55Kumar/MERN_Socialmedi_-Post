import { configureStore } from "@reduxjs/toolkit";
import { userDetailsReducer, userReducer } from "./reducer/userReducer";
import { postDetailsReducer } from "./reducer/socialMediaReducer";


const store = configureStore ({
    reducer: {
        user: userReducer,
        userDetails: userDetailsReducer,
        postDetails: postDetailsReducer,

    }
})

export default store;

