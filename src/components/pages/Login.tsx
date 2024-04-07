import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import bannerHero from "../../assets/bannerHero.jpg";
import Logo from "../navbar/Logo";
import { useLoginMutation } from "../../api/userApi";
import { useFormik } from "formik";
import { notify } from "../../utils/utils";
import { useDispatch } from "react-redux";
import Spinner from '../../assets/Circles-menu-3.gif'

import { login as authLogin } from '../../api/store/authSlice'
import { LoginSchema } from "../../utils/yupSchema";
import ErrorPage from "./ErrorPage";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const response = await login(values).unwrap()
        console.log({ response })
        if (response) {
          dispatch(authLogin({ userData: response }))
          notify('success', 'Login Successful', 0)
          setTimeout(() => {
            navigate('/')
          })
        }
      } catch (error) {
        notify('error', 'Login Failed', 0)
        console.log(error)
      }
    },
  })

  return (
    <>
      {
        isLoading ? (
          <img src={Spinner} alt="Loading..." />
        ) : (
          < main className="grid  grid-rows-1 lg:grid-cols-2 w-full  h-screen m-auto" >
            <section className=" hidden lg:block max-h-screen  rounded-lg">
              <img src={bannerHero} alt="" className="w-full h-full object-cover" />
            </section>
            <div className="flex items-center justify-center w-full px-5">
              <section className="px-7 py-10 rounded-md shadow-md bg-white/[0.7] flex flex-col gap-6 w-full max-w-lg">
                <Logo />
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-bold mb-3 ">Login</h1>

                  <form
                    action=""
                    className="flex flex-col gap-3"
                    onSubmit={formik.handleSubmit}
                  >
                    <label className="flex flex-col">
                      Email
                      <input
                        type="email"
                        className="border rounded-md p-1.5 shadow-sm"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="email"
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="flext justify-center item-center text-red-500 text-sm">{formik.errors.email}</div>
                      ) : null}
                    </label>
                    <label className="flex flex-col">
                      Password
                      <input
                        type="password"
                        className="border rounded-md p-1.5 shadow-sm"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="password"
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="flext justify-center item-center text-red-500 text-sm">{formik.errors.password}</div>
                      ) : null}
                    </label>
                    <div className="w-full py-2   flex flex-col gap-4 items-center ">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold px-6 py-2 rounded-md shadow-md hover:from-yellow-500 hover:to-pink-500 transition-all duration-300 cursor-pointer"
                        disabled={
                          !formik.values.email || !formik.values.password
                        }
                      >
                        Login
                      </button>
                      <Link to="/signup" className="underline text-gray-600">
                        Create New Account
                      </Link>
                    </div>
                  </form>
                </div>
              </section>
            </div>
          </main >
        )

      }
    </>
  );
};

export default Login;
