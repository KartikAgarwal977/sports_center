import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { API_ENDPOINT } from "../../config/constants";
type FormValues = {
  userName: string;
  userEmail: string;
  userPassword: string;
};

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { userName, userEmail, userPassword } = data;
    try {
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          password: userPassword,
        }),
      });
      if (!response.ok) {
        throw new Error("Sign-up failed");
      }
      const data = await response.json();
      localStorage.setItem("authToken", data.auth_token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      navigate("/dashboard");
      window.location.reload();
      console.log("sign-up successful");
    } catch (error) {
      console.error("sign-up failed", error);
    }
  };
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-amber-500 font-semibold mb-2">
            Your Name:
          </label>
          <input
            type="text"
            id="userName"
            {...register("userName", { required: true })}
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-amber-800 focus:shadow-outline-amber"
          />
        </div>
        <div className="mb-4">
          <label className="block text-amber-500 font-semibold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="userEmail"
            {...register("userEmail", { required: true })}
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-amber-800 focus:shadow-outline-amber"
          />
        </div>
        <div className="mb-4">
          <label className="block text-amber-500 font-semibold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="userPassword"
            {...register("userPassword", { required: true })}
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-amber-800 focus:shadow-outline-amber"
          />
        </div>
        {errors.userPassword && <p>This is required</p>}
        <div>
          <button
            type="submit"
            className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
          >
            Sign up
          </button>
        </div>
        <Link to={'/signin'} className="block w-full text-center bg-amber-100 hover:bg-amber-200 text-amber-700 font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4 transition duration-200">
          Already have an account
        </Link>
        <Link to={'../'} className="block w-full text-center bg-amber-100 hover:bg-amber-200 text-amber-700 font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4 transition duration-200">
          Back to home
        </Link>
      </form>
    </div>
  );
  
};
export default SignupForm;