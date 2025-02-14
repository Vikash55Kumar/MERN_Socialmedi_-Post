import React from "react";
import { Form, Input, Button, Link } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgetPassword } from "../../action/userAction";

export default function ForgetPassword() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [action, setAction] = React.useState(null);

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));
    // console.log(data);

    try {
        const response = await dispatch(forgetPassword(data));
        if (response.statusCode === 200 || response.success === true) {
            toast.success("Password forget Successfully!");
            navigate("/");
        } else {
            toast.error(response.message || "Forget Password failed!");
        }
    } catch (err) {
        toast.error(err.response?.data?.message || err.message || "Forget Password failed!");
    }
};

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 m-2  w-full max-w-screen-sm md:max-w-xl">
        
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Forget Password
        </h2>

        <Form
          className="w-full flex flex-col gap-6"
          validationBehavior="native"
          onReset={() => setAction("login reset")}
          onSubmit={handleForgetPassword}
        >

          <Input
            isRequired
            errorMessage="Please enter a valid username"
            label="Old Password"
            labelPlacement="outside"
            name="oldPassword"
            placeholder="Enter your oldPassword"
            type="oldPassword"
            className="rounded-lg"
          />

           <Input
            isRequired
            errorMessage="Please enter a valid password"
            label="New Password"
            labelPlacement="outside"
            name="newPassword"
            placeholder="Enter new password"
            type="password"
            className="rounded-lg"
          />

          <Input
            isRequired
            errorMessage="Please enter a valid confirmPassword"
            label="Confirm Password"
            labelPlacement="outside"
            name="conformPassword"
            placeholder="Enter your confirmPassword"
            type="password"
            className="rounded-lg"
          />
          <div className="flex gap-4">
            <Button color="primary" type="submit" className="w-full">
              Submit
            </Button>
            <Button type="reset" variant="flat" className="w-full">
              Reset
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
