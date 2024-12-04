import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    await axios
      .post("https://bookstoreapp-master.onrender.com/user/signup", userInfo)
      .then((res) => {
        if (res.data) {
          toast.success("Signup Successfully");
          navigate(from, { replace: true });
        }
        localStorage.setItem("Users", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          if (Array.isArray(err.response.data.errors)) {
            err.response.data.errors.forEach((error) => {
              toast.error(error);
            });
          } else {
            toast.error("Error: " + err.response.data.message);
          }
        }
      });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          <div className="modal-box bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="dialog"
              className="relative"
            >
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-0 top-0"
              >
                ✕
              </Link>

              <h3 className="font-bold text-2xl mb-6 text-center">Signup</h3>

              {/* Name Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-pink-500"
                  {...register("fullname", { required: true })}
                />
                {errors.fullname && (
                  <span className="text-sm text-red-500 mt-1 block">
                    This field is required
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-pink-500"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-sm text-red-500 mt-1 block">
                    This field is required
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-pink-500"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-sm text-red-500 mt-1 block">
                    This field is required
                  </span>
                )}

                {/* Password Requirements */}
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-3 bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                  <p className="font-semibold mb-2">Password must contain:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>At least 8 characters</li>
                    <li>Maximum 100 characters</li>
                    <li>At least one uppercase letter</li>
                    <li>At least one lowercase letter</li>
                    <li>At least 2 numbers</li>
                    <li>At least 1 special character</li>
                    <li>No spaces allowed</li>
                  </ul>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
                <button className="w-full sm:w-auto bg-pink-500 text-white rounded-md px-6 py-2 hover:bg-pink-700 transition-colors duration-200 font-medium">
                  Signup
                </button>
                <div className="text-center sm:text-right">
                  <span className="text-sm sm:text-base">Have account? </span>
                  <button
                    className="text-sm sm:text-base text-pink-500 hover:text-pink-700 underline font-medium"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Login
                  </button>
                  <Login />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
