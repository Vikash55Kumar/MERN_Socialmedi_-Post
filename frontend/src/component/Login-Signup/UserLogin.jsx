import React from "react";
import { Form, Input, Button, Link } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../action/userAction";

export default function UserLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [action, setAction] = React.useState(null);

  const handleUserLogin = async (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));

    try {
        const response = await dispatch(userLogin(data));
        if (response.statusCode === 200) {
            toast.success(response.message || "User Login Successfully!");
            navigate("/");
        } else {
            toast.error(response.message || "Login failed!");
        }
    } catch (err) {
        toast.error(err.response?.data?.message || err.message || "Login failed!");
    }
};

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 m-2  w-full max-w-screen-sm md:max-w-xl">
        
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Student Login
        </h2>

        <Form
          className="w-full flex flex-col gap-6"
          validationBehavior="native"
          onReset={() => setAction("login reset")}
          onSubmit={handleUserLogin}
        >

          <Input
            isRequired
            errorMessage="Please enter a valid username"
            label="Username"
            labelPlacement="outside"
            name="username"
            placeholder="Enter your username"
            type="username"
            className="rounded-lg"
          />

           <Input
            isRequired
            errorMessage="Please enter a valid password"
            label="Password"
            labelPlacement="outside"
            name="password"
            placeholder="Enter your password"
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
          Don't have an account? <Link href="/userSignup" className="text-blue-700 underline" > Signup</Link>
        </p>
      </div>
    </div>
  );
}
