import { Comment } from "../models/comment.model.js";
import { SocialMedia } from "../models/socialMedia.model.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createComment = asyncHandler(async (req, res) => {
    const { content, postId } = req.body;
    console.log(content, postId);
    
    const userId = req.user?.id; // Authenticated User ID

    if (!content) {
        throw new ApiError(400, "Comment content is required");
    }

    // Check if the post exists
    const post = await SocialMedia.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    // Create comment
    const comment = await Comment.create({
        content,
        socialMedia: postId,
        owner: userId
    });

    if(!comment) {
        throw new ApiError(500, "server error while creating post");
    }
    
    return res
    .status(201)
    .json(
        new ApiResponse(201, comment, "Comment added successfully")
    );
});

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user?.id;

    // Find comment and check ownership
    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }
    if (comment.owner.toString() !== userId) {
        throw new ApiError(403, "You are not authorized to delete this comment");
    }

    const commentDeleted = await comment.deleteOne();

    if(!commentDeleted) {
        throw new ApiError(500, "server error while deleting");
    }

    return res.status(200).json(
        new ApiResponse(200, null, "Comment deleted successfully")
    );
});

const getCommentsByPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    // Check if the post exists
    const post = await SocialMedia.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    const comments = await Comment.find({ socialMedia: postId })
        .populate("owner", "username avatar") // Include user info
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, comments, "Comments fetched successfully")
    );
});

export {
    createComment,
    deleteComment,
    getCommentsByPost
}

