import { Router } from "express";

import { getPostLikesCount, likePost, togglePostLike } from "../controllers/like.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// router.use(verifyJWT);

router.route("/postLike").post(verifyJWT, togglePostLike)

router.route("/postCount").get(getPostLikesCount)

router.route("/likePost").post(verifyJWT, likePost)

export default router