import { Button, Input } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../action/socialMediaAction";
import { toast } from "react-toastify";

const CreatePost = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus(); // Auto-focus on the first input when modal opens
    }
  }, [isOpen]);

  if (!isOpen) return null;

    const handleCreatePost = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      // console.log(formData);
  
      try {
          const response = await dispatch(createPost(formData));
          if (response.statusCode === 200 || response.success === true) {
              toast.success(response.message || "Post created Successfully!");
              
              e.target.reset();  // Reset the form after successful submission

              onClose();  // Close modal
              navigate("/");
          } else {
              toast.error(response.message || "Post created failed!");
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
        <h2 className="text-3xl font-bold mb-6 text-center">Create Post</h2>

        {/* Form Section */}
        <form 
          className="flex flex-col gap-6 w-full md:w-3/4 mx-auto"
          onSubmit={handleCreatePost}
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

          <Input
            isRequired
            errorMessage="Please upload a valid image"
            label="Avatar"
            labelPlacement="outside"
            name="avatar"
            type="file"
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

export default CreatePost;
