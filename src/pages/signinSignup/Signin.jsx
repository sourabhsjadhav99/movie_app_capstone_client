
import React, { useEffect, useState } from "react";
import { MdMovieCreation } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInSuccess } from "../../store/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../../helper/axiosInstancs";

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


  useEffect(() => {
    if (isAuthenticated === true) {
      navigate(-1); // Redirect to the previous page
    }
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axiosInstance.post(
        "/user/login",
        values
      );
      const { token, data, message } = response.data; // Assuming your backend returns a JWT token
      dispatch(signInSuccess({ token, data }));  // You'll need to define this action in your Redux setup

      toast.success(message, { autoClose: 1000 }); 
      setTimeout(() => {
        resetForm(); 
        navigate('/');
      }, 1000);

    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center px-3 bg-[#10141e] h-screen">
      <div className="container">
        <h1 className="text-5xl mb-8 flex items-center justify-center text-[#fc4747]">
          <MdMovieCreation />
        </h1>
        <div className="bg-[#161d2f] shadow mx-auto px-4 py-8 w-full sm:w-2/3 md:w-1/2 lg:w-1/3  rounded-lg drop-shadow-xl ">
          <h1 className="text-4xl text-white mb-2">Login</h1>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="w-full mx-auto py-3">
                <div className="border-b-2 border-[#5a698f] my-4">
                  <Field
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    className=" block w-full rounded-md border-gray-300 text-white bg-[#161d2f] outline-0 h-[30px] px-2"
                  />
                  <ErrorMessage
                    name="email"
                    component="small"
                    className="text-red-500"
                  />
                </div>
                <div className="border-b-2 border-[#5a698f] my-4">
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className=" block w-full rounded-md border-gray-300 text-white bg-[#161d2f] outline-0 h-[30px] px-2"
                  />
                  <ErrorMessage
                    name="password"
                    component="small"
                    className="text-red-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#fc4747] text-white hover:font-bold mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login to your account"}
                </button>
              </Form>
            )}
          </Formik>
          <div className="text-white text-center">
            <p className="mb-2">
              Dont have an account ?{" "}
              <Link
                to={"/signup"}
                className="text-[#fc4747]  hover:border-b-2 hover:border-[#fc4747]"
              >
                {" "}
                Sign Up
              </Link>
            </p>
            <Link to={"/"} className="text-[#fc4747]  hover:border-b-2 hover:border-[#fc4747]">Go to Home</Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signin;
