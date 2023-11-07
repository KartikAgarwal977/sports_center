import React from 'react';
// Import the file
import SigninForm from "./SigninForm"

const Signin: React.FC = () => {
  // And use it after the h2 tag
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-amber-100">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-amber-700 mb-4">Sign In</h1>
        <SigninForm />
      </div>
    </div>
  );
}
export default Signin;