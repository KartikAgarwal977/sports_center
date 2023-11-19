import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { API_ENDPOINT } from "../../config/constants";
export type FormValues = {
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
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Sign-in failed");
      }
      console.log("sign in successful");
      const resdata = await response.json();
      console.log("this is the token", resdata.auth_token);
      localStorage.setItem("authToken", resdata.auth_token);
      localStorage.setItem("userData", JSON.stringify(resdata.user));
      navigate("/dashboard");
      window.location.reload();
      console.log("sign-in successful");
    } catch (error) {
      console.error("sign-in failed", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-amber-500 font-semibold mb-2">
            Email:
          </label>
          <div className="flex items-center border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-amber-800 focus:shadow-outline-amber">
            <svg
              className="h-5 w-5 text-gray-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-amber-800 focus:shadow-outline-amber"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-amber-500 font-semibold mb-2">
            Password:
          </label>
          <div className="flex items-center border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-amber-800 focus:shadow-outline-amber">
            <svg
              className="h-5 w-5 text-gray-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>

            <input
              type="password"
              id="password"
              {...register("password", { required: true })}
              className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-amber-800 focus:shadow-outline-amber"
            />
          </div>
        </div>
        {errors.password && <p>This is required</p>}
        <div>
          <button
            type="submit"
            className="w-full bg-amber-700 hover:bg-amber-800 active:bg-amber-900 text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4 transition duration-200"
          >
            Sign in
          </button>
        </div>
        <Link
          to={"/signup"}
          className="block w-full text-center bg-amber-100 hover:bg-amber-200 text-amber-700 font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4 transition duration-200"
        >
          Not have a account
        </Link>
        <Link
          to={"../"}
          className="block w-full text-center bg-amber-100 hover:bg-amber-200 text-amber-700 font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4 transition duration-200"
        >
          back to home
        </Link>
      </form>
    </div>
  );
};
export default SigninForm;
