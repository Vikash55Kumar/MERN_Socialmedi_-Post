import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createPost, deletePost, getPost, updatePostDetails } from "../controllers/socialMedia.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router=Router();
// router.use(verifyJWT)

router.route("/createPost").post(verifyJWT, upload.fields([ { name: "avatar", maxCount: 1}]), createPost);

router.route("/updatePost").post(verifyJWT, updatePostDetails)

router.route("/getPost").get(getPost)

router.route("/deletePost").post(verifyJWT, deletePost)

export default router
