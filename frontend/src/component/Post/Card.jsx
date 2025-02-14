import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createComment, LikeUnlike } from "../../action/commentLikeAction";
import { toast } from "react-toastify";
import api from "../../Utility/api";
import Cookies from 'js-cookie'

function PostCard({ post, onEdit, onDelete }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [liked, setLiked] = useState(post.liked);  // Track if the post is liked by the user
  const [likeCount, setLikeCount] = useState(post.likeCount); // Store like count post.likes is an array of user IDs 

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

    useEffect(() => {
      const fetchComments = async () => {
        try {
          const response = await api.get(`/comments/getCommentPost/${post._id}`);
          // console.log(response);
          const {data} = response;
          
          if (data.statusCode === 200) {
            // console.log("heee");
            
            setComments(data.data || []);
          }
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      };
    
      if (post._id) {
        fetchComments();
      }
    }, [post._id]);    

    const handleLike = async (e) => {
      e.preventDefault();
      
      if (!post._id) {
        console.error("Post ID not found!");
        return;
      }

      try {
        const response = await dispatch(LikeUnlike(post._id));
        if (response.statusCode === 200 || response.success === true) {
            toast.success(response.message || "You Liked");
            
            navigate("/");
        } else {
            toast.error(response.message || "Liked failed!");
        }
      } catch (err) {
          toast.error(err.response?.data?.message || err.message || "Liked failed!");
      }
    };

    const handleComment = async (e) => {
      e.preventDefault();
      if (!post._id) {
        console.error("Post ID not found!");
        return;
      }
      console.log(post);
      const myForm = new FormData();
  
      myForm.append("content", newComment);
      myForm.append("postId", post._id);
      try {
          const response = await dispatch(createComment(myForm));
          if (response.statusCode === 200 || response.success === true) {
              toast.success(response.message || "Comment created Successfully!");
              
              navigate("/");
          } else {
              toast.error(response.message || "Comment failed! to create");
          }
      } catch (err) {
          toast.error(err.response?.data?.message || err.message || "Comment failed! to create");
      }
    };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-2xl mx-auto my-6 transition-transform transform hover:scale-[1.02] hover:shadow-xl">
      {/* Post Image */}
      <img src={post.avatar} alt="Post" className="w-full h-64 object-fill rounded-lg" />

      {/* Post Content */}
      <div className="p-4">
        {/* Title & Actions */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{post.title}</h2>
          <div className="flex gap-3">
            <button onClick={() => onEdit(post)} className="text-blue-500 hover:text-blue-700 transition">
              <FaEdit size={20} />
            </button>
            <button onClick={() => onDelete(post._id)} className="text-red-500 hover:text-red-700 transition">
              <FaTrash size={20} />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm sm:text-base mt-3 leading-relaxed">{post.description}</p>

        {/* Separator */}
        <div className="border-t my-4"></div>

        {/* Like & Comment Buttons */}
        <div className="flex justify-between items-center">
         
          <button 
              onClick={handleLike} 
              className={`p-2 rounded-md ${liked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"}`}
          >
              {liked ? "❤️ Unlike" : "🤍 Like"} ({likeCount})
          </button>

          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition">
            <FaComment />
            <span className="text-sm font-medium">Comment</span>
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-4">
          <input
            type="text"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleComment}
            className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition"
          >
            Post
          </button>

          {/* Show Comments */}
          {comments.length > 0 && (
            <>
              <div className="border-t my-3"></div>
              <div className="mt-2 space-y-2">
                {comments.map((comment, index) => (
                  <div key={index} className="text-gray-700 text-sm bg-gray-100 p-2 rounded-md">
                    <p className="font-semibold">{comment.owner.username}:</p> 
                    <p>{comment.content}</p> {/* ✅ Access content correctly */}
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default PostCard;
