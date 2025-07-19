import React from "react";
import { useForm } from "react-hook-form";
import { Lock, Mail } from "lucide-react";

const SimpleLoginPage = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm();

  const onSubmit = (data) => {
    alert("Login submitted:\n" + JSON.stringify(data, null, 2));
    // Place login logic here!
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow max-w-sm w-full space-y-4"
      >
        <div>
          <label className="block mb-1 text-gray-700">Email</label>
          <div className="relative">
            <Mail className="absolute left-2 top-3 text-gray-400" size={18} />
            <input
              {...register("email", { 
                required: "Email is required", 
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address"
                }
              })}
              type="email"
              placeholder="Enter your email"
              className={`pl-8 pr-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded w-full`}
            />
          </div>
          {errors.email && (
            <span className="block mt-1 text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Password</label>
          <div className="relative">
            <Lock className="absolute left-2 top-3 text-gray-400" size={18} />
            <input
              {...register("password", { 
                required: "Password is required" 
              })}
              type="password"
              placeholder="Enter your password"
              className={`pl-8 pr-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded w-full`}
            />
          </div>
          {errors.password && (
            <span className="block mt-1 text-sm text-red-500">{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-yellow-600 text-white w-full py-2 rounded font-semibold hover:bg-yellow-700 transition"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SimpleLoginPage;
