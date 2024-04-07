import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bannerHero from "../../assets/bannerHero.jpg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Logo from "../navbar/Logo";
import { useSignupMutation } from "../../api/userApi";
import { useFormik } from 'formik';
import { notify } from "../../utils/utils";
import { SignUpCredentialsValidationSchema } from "../../utils/yupSchema";
import ErrorPage from "./ErrorPage";
const Signup = () => {
  const [signupService, { isLoading, error }] = useSignupMutation()
  const navigate = useNavigate();
  const signupYupSchema = SignUpCredentialsValidationSchema;

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  if (error) {
    return <ErrorPage />
  }

  const formik = useFormik({
    initialValues: {
      first_name: "",
      email: "",
      password: "",
      mobile_no: "",
    },
    validationSchema: signupYupSchema,
    onSubmit: async (values) => {
      try {
        await signupService(values).unwrap()
        if (isLoading) {
          return <p>Loading...</p>
        }
        notify('success', 'Signup Successful', 0)
        navigate('/login')
      } catch (error) {
        console.log(error)
      }
    },
  });



  const isDisabled = !formik.values.first_name || !formik.values.email || !formik.values.password || !formik.values.mobile_no





  return (
    <main className="grid  grid-rows-1 md:grid-cols-2 w-full  h-screen m-auto ">
      <section className=" hidden md:block max-h-screen  rounded-lg">
        <img src={bannerHero} alt="" className="w-full h-full object-cover" />
      </section>
      <div className="flex items-center justify-center w-full px-5">
        <section className="px-10 py-10 rounded-md shadow-md bg-white/[0.7] flex flex-col gap-6 w-full max-w-lg">
          <Logo />
          <div className="flex flex-col gap-2 ">
            <h1 className="text-4xl font-bold mb-3">Sign up</h1>

            <form
              action=""
              className="flex flex-col gap-4 py-5"
              onSubmit={formik.handleSubmit}
            >
              <label className="flex flex-col">
                <input
                  type="text"
                  required
                  placeholder="Name"
                  className="border rounded-md p-1.5 shadow-sm"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="first_name"
                />
                {formik.touched.first_name && formik.errors.first_name ? (
                  <div className="flex justify-center item-center text-red-700">{formik.errors.first_name}</div>
                ) : null}
              </label>
              <label className="flex flex-col">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  className="border rounded-md p-1.5 shadow-sm"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="flex justify-center item-center text-red-700">{formik.errors.email}</div>
                ) : null}
              </label>
              <label className="flex flex-col relative">
                <input
                  required
                  placeholder="Password"
                  type={showPassword.password ? "text" : "password"}
                  className="border rounded-md p-1.5 shadow-sm"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                />
                <span
                  className="absolute right-2 top-3 cursor-pointer"
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      password: !showPassword.password,
                    })
                  }
                >
                  {showPassword.password ? (
                    <AiFillEye />
                  ) : (
                    <AiFillEyeInvisible />
                  )}
                </span>
                {formik.touched.password && formik.errors.password ? (
                  <div className="flex justify-center item-center text-red-700">{formik.errors.password}</div>
                ) : null}
              </label>

              <label className="flex flex-col">
                <input
                  type="text"
                  required
                  placeholder="Mobile Number"
                  className="border rounded-md p-1.5 shadow-sm"
                  value={formik.values.mobile_no}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="mobile_no"
                />
                {formik.touched.mobile_no && formik.errors.mobile_no ? (
                  <div className="flex justify-center item-center text-red-700">{formik.errors.mobile_no}</div>
                ) : null}
              </label>

              <div className="w-full py-2   flex flex-col gap-4 items-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold px-6 py-2 rounded-md shadow-md hover:from-yellow-500 hover:to-pink-500 transition-all duration-300 cursor-pointer"
                  disabled={isDisabled}

                >
                  <label>Create Account</label>
                </button>
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="underline text-base"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Signup;
