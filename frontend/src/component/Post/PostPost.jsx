import { useEffect, useRef, useState } from "react";
import PostCard from "./Card";
import TOPOLOGY from "vanta/dist/vanta.topology.min";
import UpdatePost from "../SocialMedia/UpdatePost";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../../action/socialMediaAction";
import { toast } from "react-toastify";

// Example Usage
const PostPost = ({ postDetails = [] }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [posts, setPosts] = useState(postDetails);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // useEffect(() => {
  //   setPosts(postDetails); // Update state when postDetails changes
  // }, [postDetails]);
  useEffect(() => {
    setPosts(prevPosts => {
      if (JSON.stringify(prevPosts) !== JSON.stringify(postDetails)) {
        return postDetails; // Only update if there's an actual change
      }
      return prevPosts;
    });
  }, [postDetails]);
  
  

  // Edit Post
  const handleEdit = (post) => {
    // console.log("post", post);
    setSelectedPost(post)
    setIsModalOpen(true)
  };

  // Delete Post
  const handleDelete = async (id) => {
    // console.log("id", id);

    try {
      const response = await dispatch(deletePost(id));
      if (response.statusCode === 200) {
        toast.success(response.message || "Post Delete Successfully!");
        navigate("/");
      } else {
        toast.error(response.message || "Post Delete failed!");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Post Delete failed!"
      );
    }

    navigate("/");
  };

  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaRef.current) return;

    const vantaEffect = TOPOLOGY({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: true,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x50919f,
      backgroundColor: 0xebefef,
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <>
      <div ref={vantaRef} className="p-6 bg-gray-100">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <UpdatePost postDetails={selectedPost} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default PostPost;
