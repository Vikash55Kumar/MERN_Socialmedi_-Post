import { Button, Input } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePost } from "../../action/socialMediaAction";
import { toast } from "react-toastify";

const UpdatePost = ({ isOpen, onClose, postDetails }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus(); // Auto-focus on the first input when modal opens
    }
  }, [isOpen]);

  if (!isOpen) return null;

    const handlePostUpdate = async (e) => {
      e.preventDefault();
      if (!postDetails?._id) {
        console.error("Post ID not found!");
        return;
      }
    
      const id = postDetails._id;
      const formData = new FormData(e.currentTarget); // Get form data
    
      // Append ID to formData
      formData.append("postId", id); 
  
      try {
          const response = await dispatch(updatePost(formData));
          if (response.statusCode === 200 || response.success === true) {
              toast.success(response.message || "Post Updated Successfully!");
              
              e.target.reset();  // Reset the form after successful submission

              onClose();  // Close modal
              navigate("/");
          } else {
              toast.error(response.message || "Post updation failed!");
          }
      } catch (err) {
          toast.error(err.response?.data?.message || err.message || "Post created failed!");
      }
    };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-3xl relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✖
        </button>

        {/* Modal Content */}
        <h2 className="text-3xl font-bold mb-6 text-center">Update Post</h2>

        {/* Form Section */}
        <form 
          className="flex flex-col gap-6 w-full md:w-3/4 mx-auto"
          onSubmit={handlePostUpdate}
        >
          <Input
            isRequired
            errorMessage="Please enter a valid title"
            label="Title"
            labelPlacement="outside"
            name="title"
            placeholder="Enter post title"
            type="text"
            className="rounded-lg"
            ref={firstInputRef} // Autofocus here
          />

          <Input
            isRequired
            errorMessage="Please enter a valid description"
            label="Description"
            labelPlacement="outside"
            name="description"
            placeholder="Enter post description"
            type="text"
            className="rounded-lg"
          />

          {/* Button Section */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button color="primary" type="submit" className="w-full md:w-1/2">
              Submit
            </Button>
            <Button type="reset" variant="flat" className="w-full md:w-1/2">
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
