import { Router } from "express";
import { forgotPassword, getCurrentUser, loginUser, logoutUser, registerUser} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser)

router.route("/forgetPassword").post(verifyJWT, forgotPassword)

router.route("/getUser").get(getCurrentUser)

// secure routers
router.route("/logout").post(verifyJWT, logoutUser)

export default router;