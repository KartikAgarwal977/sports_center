import React from "react";
import { useNavigate } from "react-router-dom";
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
          user_name: userName,
          email: userEmail,
          password: userPassword,
        }),
      });
      if (!response.ok) {
        throw new Error("Sign-up failed");
      }
      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      navigate("/account");
      console.log("sign-up successful");
    } catch (error) {
      console.error("sign-up failed", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-cyan-500 font-semibold mb-2">
          Your Name:
        </label>
        <input
          type="text"
          id="userName"
          {...register("userName", {required: true})}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-cyan-800 focus:shadow-outline-cyan"
        />
      </div>
      <div>
        <label className="block text-cyan-500 font-semibold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="userEmail"
          {...register("userEmail", {required: true})}
          className="w-full border rounded-md py-2 px-3 text-cyan-500 leading-tight focus:outline-none focus:border-cyan-800 focus:shadow-outline-blue"
        />
      </div>
      <div>
        <label className="block text-cyan-500 font-semibold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="userPassword"
          {...register("userPassword", {required: true})}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-cyan-800 focus:shadow-outline-blue"
        />
          </div>
          {errors.userPassword && <p>This is required</p>}
      <div>
        <button
          type="submit"
          className="w-full bg-cyan-700 hover:bg-cyan-800 text-cyan-100 font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};
export default SignupForm;