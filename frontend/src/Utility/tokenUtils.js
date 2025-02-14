import Cookies from "js-cookie";

// Save token to cookies
export const saveTokenToCookies = (token) => {
  Cookies.set("token", token, { expires: 7 }); // Token expires in 7 days
};

// Get token from cookies
export const getTokenFromCookies = () => {
  return Cookies.get("token");
};

// Remove token from cookies
export const removeTokenFromCookies = () => {
  Cookies.remove("token");
};

export const getAccessToken = () => localStorage.getItem('accessToken');

export const deleteAllCookies = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
};