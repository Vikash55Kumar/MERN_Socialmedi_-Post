import {Like} from "../models/like.model.js"
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { SocialMedia } from "../models/socialMedia.model.js";

const togglePostLike = asyncHandler(async (req, res) => {
    
    const { postId } = req.body;
    const userId = req.user?.id;

    if (!postId) {
        throw new ApiError(400, "Post ID is required");
    }

    // Check if the post exists
    const post = await SocialMedia.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    // Check if the user already liked the post
    const existingLike = await Like.findOne({ socialMedia: postId, likedBy: userId });

    if (existingLike) {
        // Unlike the post
        await Like.deleteOne({ socialMedia: postId, likedBy: userId });

        // Get updated like count
        const updatedLikeCount = await Like.countDocuments({ socialMedia: postId });

        return res.status(200).json(
            new ApiResponse(200, { liked: false, likeCount: updatedLikeCount }, "Post unliked successfully")
        );
    } else {
        // Like the post
        await Like.create({ socialMedia: postId, likedBy: userId });

        // Get updated like count
        const updatedLikeCount = await Like.countDocuments({ socialMedia: postId });

        return res.status(200).json(
            new ApiResponse(200, { liked: true, likeCount: updatedLikeCount }, "Post liked successfully")
        );
    }
});

const getPostLikesCount = asyncHandler(async (req, res) => {
    const { postId } = req.body;

    if (!postId) {
        throw new ApiError(400, "Post ID is required");
    }

    const likeCount = await Like.countDocuments({ socialMedia: postId });

    return res.status(200).json(new ApiResponse(200, { likeCount }, "Total likes fetched successfully"));
});

const likePost = asyncHandler(async (req, res) => {
    const { postId } = req.body;

    console.log("heeeeeeeeeeee",postId);
    
    const userId = req.user._id; // Ensure user authentication
  
    const post = await SocialMedia.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
  
    const isLiked = post.likes.includes(userId);
  
    if (isLiked) {
      // Unlike the post
      post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    } else {
      // Like the post
      post.likes.push(userId);
    }
  
    await post.save();
    
    res.status(200).json({
      liked: !isLiked,
      likeCount: post.likes.length,
      message: isLiked ? "Post unliked" : "Post liked"
    });
  });
  
export {
    togglePostLike,
    getPostLikesCount,
    likePost
}