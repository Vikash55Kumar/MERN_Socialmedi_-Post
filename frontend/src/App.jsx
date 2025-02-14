import { useEffect, useState } from 'react'
import {ToastContainer} from "react-toastify"
import Nav from './component/Navbar/Nav'
import { Foot } from './component/Footer/Foot'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Home from './component/Home/Home';
import UserLogin from './component/Login-Signup/UserLogin';
import UserSignup from './component/Login-Signup/UserSignup';
import { getUserDetails } from './action/userAction';
import { getPostDetails } from './action/socialMediaAction';
import ForgetPassword from './component/Login-Signup/ForgetPassword';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails());
    dispatch(getPostDetails())
  }, [dispatch]);

  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated) || false;

  const { postDetails } = useSelector((state) => state.postDetails);
  const { userDetails } = useSelector((state) => state.userDetails)
  
  // console.log(postDetails?.data);
  
  return (
    <>
      <ToastContainer 
        position="top-center"  // This will show the toast in the center of the screen
        autoClose={3000}  // Toast will disappear after 4 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
          <Nav/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/userLogin" element={<UserLogin />} />
            <Route path="/userSignup" element={<UserSignup />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
          </Routes>
          <Foot />
      </Router>
    </>
  );
}

export default App
