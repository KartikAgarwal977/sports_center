
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { API_ENDPOINT } from "../../config/constants";
type FormValues = {
  email: string;
  password: string;
};

const SigninForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error("Sign-in failed");
      }
      console.log("sign in successful")
      const resdata = await response.json();
      localStorage.setItem("authToken", resdata.token);
      localStorage.setItem("userData", JSON.stringify(resdata.user));
      navigate("/account");
      console.log("sign-in successful");
    } catch (error) {
      console.error("sign-in failed", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      
      <div>
        <label className="block text-cyan-500 font-semibold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          {...register("email", {required: true})}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-cyan-800 focus:shadow-outline-blue"
        />
      </div>
      <div>
        <label className="block text-cyan-500 font-semibold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          {...register("password", {required: true})}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-cyan-800 focus:shadow-outline-blue"
        />
          </div>
          {errors.password && <p>This is required</p>}
      <div>
        <button
          type="submit"
          className="w-full bg-cyan-700 hover:bg-cyan-800 text-cyan-100 font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};
export default SigninForm;