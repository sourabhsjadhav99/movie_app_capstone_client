

import { useState } from "react";
import { MdMovieCreation } from "react-icons/md";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../../helper/axiosInstancs";
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

function Signup() {
  let navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      let response = await  axiosInstance.post(
        "/user/register",
        values
      );
    //   resetForm();
    //  toast.success(response.data.message);
    //   navigate("/signin");
      toast.success(response.data.message, { autoClose: 2000 }); // Toast closes after 2000ms (2 seconds)
      setTimeout(() => {
        resetForm(); // Reset form fields
        navigate('/signin');
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center bg-[#10141e] px-3 h-screen">
      <div className="container">
        <h1 className="text-5xl mb-8 flex items-center justify-center text-[#fc4747]">
          <MdMovieCreation />
        </h1>
        <div className="bg-[#161d2f] shadow mx-auto px-4 py-8 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 rounded-lg drop-shadow-xl ">
          <h1 className="text-4xl text-white mb-2">Signup</h1>
          <Formik
            initialValues={{ email: "", password: "", confirmPassword: "" }}
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
                <div className="border-b-2 border-[#5a698f] my-4">
                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className=" block w-full rounded-md border-gray-300 text-white bg-[#161d2f] outline-0 h-[30px] px-2"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="small"
                    className="text-red-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#fc4747] text-white hover:font-bold mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating account..." : "Create an account"}
                </button>
              </Form>
            )}
          </Formik>
          <div className="text-white text-center">
            <p>
              Already have an account?{" "}
              <Link
                to={"/signin"}
                className="text-[#fc4747] hover:border-b-2 hover:border-[#fc4747]"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
