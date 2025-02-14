import React from "react";
import { Form, Input, Button, DatePicker, Link } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegister } from "../../action/userAction";
import { toast } from "react-toastify";

export default function UserSignup() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [action, setAction] = React.useState(null);

  const handleUserRegister = async (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));
    
    try {
        const response = await dispatch(userRegister(data));
        if (response.statusCode === 200) {
            toast.success(response.message || "User Register Successfully!");
            navigate("/userlogin");
        } else {
            toast.error(response.message || "Register failed!");
        }
    } catch (err) {
        toast.error(err.response?.data?.message || err.message || "Register failed!");
    }
  };
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-screen-sm md:max-w-xl  mt-14 mb-14">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Student Regestration
        </h2>
        <Form
          className="w-full flex flex-col gap-6"
          validationBehavior="native"
          onReset={() => setAction("register reset")}
          onSubmit={handleUserRegister}
        >

          <Input isRequired errorMessage="Please enter username in lowercase" label="Username" labelPlacement="outside" name="username" type="name" placeholder="Enter your full name" />
          <Input isRequired errorMessage="Please enter valid email" label="Email" labelPlacement="outside" name="email" type="email" placeholder="Enter your email" />
          <Input isRequired errorMessage="Please enter a valid password" label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
            type="password"
            className="rounded-lg"
          />

        <Input
            isRequired
            errorMessage="Please enter a valid confirmPassword"
            label="Confirm Password"
            labelPlacement="outside"
            name="confirmPassword"
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
        <p className="text-base font-bold text-left text-gray-600 mt-6">
          Already have an account? <Link href="/userLogin" className="text-blue-700 underline" > Login</Link>
        </p>
      </div>
    </div>
  );
}
