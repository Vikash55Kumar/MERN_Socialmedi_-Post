import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import { SocialMedia } from "../models/socialMedia.model.js";
import { User } from "../models/user.model.js";

const createPost = asyncHandler( async (req, res) => {

    const {title, description} = req.body
    console.log(title, description);
    

    if ([title, description].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findById(req.user._id)

    const avatarLocalPath = req.files?.avatar[0]?.path;

    if (!avatarLocalPath) {
      throw new ApiError(400, "Image file is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
      throw new ApiError(400, "Avatar not required from cloudinary");
    }
   
    const post = await SocialMedia.create({
        title,
        description,
        avatar: avatar.url,
        owner:req.user._id,
    })

    if (!post) {
        throw new ApiError(500, "Something went wrong while creating post")
    }

    user.socialMedia = post._id;
    user.save()

    return res.status(201).json(
        new ApiResponse(200, post, "Post created Successfully")
    )
});

const updatePostDetails = asyncHandler(async (req, res) => {
  const { title, description, postId } = req.body;

  console.log(title, description, postId);
  

  // Validate required fields
  if (!title || !description) {
      throw new ApiError(400, "Title and description are required");
  }

  // Find post by ID
  const post = await SocialMedia.findById(postId);
  if (!post) {
      throw new ApiError(404, "Post not found");
  }

  // Ensure only the owner can update the post
  if (post.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not authorized to update this post");
  }

  // Update the post
  const updatedPost = await SocialMedia.findByIdAndUpdate(
    postId,
      { $set: { title, description } },
      { new: true }
  ).select("-avatar"); // Exclude avatar from response

  return res
      .status(200)
      .json(new ApiResponse(200, updatedPost, "Post updated successfully"));
});

const getPost = asyncHandler(async(req, res) => {
    const post =await SocialMedia.find().populate();
    return res
      .status(200)
      .json(new ApiResponse(200, post, "current post fetched successfully"))
})


const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.body;
  
    // console.log(postId);
    
    const user = await User.findById(req.user._id)
  
    const post = await SocialMedia.findById(postId);

    if (!post) {
      throw new ApiError("Post not found");
    }

    // console.log(user._id, post.owner);


    if (user._id.toString() !== post.owner.toString()) {
      throw new ApiError(400, "You are not the owner of this Post");
  }

    const currentAvatarUrl = post.avatar;
  
    // Extract publicId from URL
    const publicIdMatch = currentAvatarUrl.match(
      /\/v\d+\/([^\/]+)\.[a-z]{3,4}$/i
    );
    if (!publicIdMatch) {
      throw new ApiError(400, "Invalid avatar URL format");
    }
  
    const publicId = publicIdMatch[1];
    
    // console.log("delete ", publicId);
  
    await deleteFromCloudinary(publicId);
  
    // Find all sections containing this assignment and remove the assignment ID from their arrays
    await User.updateMany(
      { socialMedia: post._id },
      { $pull: { socialMedia: post._id } }
    );
  
    const postDeleted = await SocialMedia.findByIdAndDelete(post._id);
  
    if (!postDeleted) {  
      throw new ApiError(500, "error while deleting post");
    }
  
    return res
      .status(200)
      .json(
        new ApiResponse(200, postDeleted, "Post delete successfull")
      );
  });

export { 
    createPost,
    getPost,
    updatePostDetails,
    deletePost
 };
