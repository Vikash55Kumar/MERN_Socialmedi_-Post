import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { createComment, deleteComment, getCommentsByPost } from "../controllers/comment.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// router.use(verifyJWT);

router.route("/createComment").post(verifyJWT, upload.none(), createComment)

router.route("/deleteComment/:commentId").delete(deleteComment)

router.route("/getCommentPost/:postId").get(getCommentsByPost)

export default router;