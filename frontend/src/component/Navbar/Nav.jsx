import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { IoMenu, IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../action/userAction";
import logo from "../../assets/logo.jpg"
import "./Nav.css";

export default function Nav() {

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated) || false;
  // console.log(isAuthenticated);
  
  const handleLogout = async (e) => {
    e.preventDefault();

    await dispatch(logout());

    navigate("/")
  };

  return (

    <Navbar className="navbar-custom" isBordered isBlurred={false}>
      {/* Logo and Toggle Button */}
      <NavbarContent className="flex justify-between w-full">
        <NavbarBrand>
          <a href="/">
          {/* <h2>Testing social</h2> */}
            <img src={logo} alt="logo" className="w-16" />
          </a>
        </NavbarBrand>
        
      </NavbarContent>

        <div className="flex-1 hidden md:block mx-4">
          <input 
            type="text" 
            placeholder="Search your favourate post..." 
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

      {/* Contact Button */}
      <NavbarContent justify="end" className="mr-4 sm:flex">
        {isAuthenticated ? 
          <NavbarItem>
            <Button color="danger" variant="flat" type="submit" onClick={handleLogout}>Logout</Button>
          </NavbarItem>
          :
          <NavbarItem>
            <Link href="/userLogin" color="foreground">
              <Button color="primary" variant="flat">Create account. It's free!</Button>
            </Link>
          </NavbarItem> 
        }
        {isAuthenticated ? 
          <NavbarItem>
          <Link href="/forgetPassword" color="foreground">
            <Button color="primary" variant="flat">Reset Password</Button>
          </Link>
        </NavbarItem> 
          : ""
        }
      </NavbarContent>
    </Navbar>
  );
}