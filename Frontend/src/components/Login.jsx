import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    await axios
      .post("https://bookstoreapp-master.onrender.com/user/login", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("Loggedin Successfully");
          document.getElementById("my_modal_3").close();
          setTimeout(() => {
            window.location.reload();
            localStorage.setItem("Users", JSON.stringify(res.data.user));
          }, 1000);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
          setTimeout(() => {}, 2000);
        }
      });
  };
  const handleCloseModal = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal) {
      modal.close();
    }
  };
  return (
    
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-sm w-[90%] p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            method="dialog"
            className="space-y-4"
          >
            {/* Close button */}
            <button
  type="button" // Add type to distinguish from form submit
  className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400"
  onClick={handleCloseModal}
  aria-label="Close modal"
>
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
</button>

            {/* Header */}
            <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
              Login
            </h3>

            {/* Email field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-sm text-red-500 mt-1">
                  This field is required
                </span>
              )}
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-sm text-red-500 mt-1">
                  This field is required
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Login
              </button>

              <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                Not registered?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                  onClick={() => document.getElementById("my_modal_3").close()}
                >
                  Create an account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    
  );
}

export default Login;
