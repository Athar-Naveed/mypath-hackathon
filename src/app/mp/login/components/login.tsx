// ----------------------------
// Imports
// ----------------------------
"use client";
import {useRouter} from "next/navigation";
import {Formik, Form, Field} from "formik";
import {Eye, EyeOff, Mail, Lock, ChevronLeft} from "lucide-react";
import {useState} from "react";
import stateStore from "@/store/zuStore";
import {UserLoginHandler} from "../../mpHandler/regloHandler";
import GoogleAuth from "../../components/global/GoogleAuth";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
// ----------------------------
// Login code starts here
// ----------------------------
const Login = () => {
  // ----------------------------
  // Setting vars
  // ----------------------------
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>("");
  const setReglo = stateStore((state) => state.setReglo);
  const route = useRouter();
  return (
    <div className="flex flex-row-reverse gap-10 lg:gap-2 mx-2 lg:mx-0 h-screen items-center justify-between">
      <div className="img hidden lg:flex">
        <div className="box w-[51vw] h-screen bg-gradient-to-b from-dark-logo-primary-gradient to-dark-logo-primary">
          <Image
            src={"/assets/images/auth/login.jpeg"}
            alt="login"
            width={500}
            height={500}
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="login-form mx-auto lg:mx-5 xl:mx-auto">
        <div className="details my-4">
          <Link
            href={"/"}
            className="my-2 text-dark-logo-primary flex items-center hover:underline"
          >
            <ChevronLeft /> &nbsp;Go to Home
          </Link>
          <h1 className="text-3xl font-bold text-dark-logo-primary">Welcome back!</h1>
          <p className="text-sm text-dark-custom-dark-blue dark:text-light-light-white">
            Glad to have you back. Please login to continue your learning path!
          </p>
        </div>
        <Formik
          initialValues={{email: "", password: "", rememberMe: false}}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              const resp = await UserLoginHandler(values);
              if (resp.status === 200) {
                toast.success("Let's Learn!", {
                  duration: 3000,
                  position: "top-center",
                });
                route.push("/mp/chatbot");
              } else if (resp.status === 401) {
                setMessage(resp?.message);
                setLoading(false);
              } else if (resp.status === 403) {
                toast.error(resp?.message, {
                  duration: 3000,
                  position: "top-center",
                });
                setLoading(false);
                route.push("/mp/login/otp");
              }
            } catch (error: any) {
              setMessage(error);
            }
          }}
        >
          {() => (
            <Form className="space-y-4 reglo-form lg:my-10">
              <div className="relative">
                <Field
                  type="email"
                  name="email"
                  placeholder="info@mypath.one"
                  className="reglo-input-field"
                  required
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-dark-custom-blue dark:text-light-light-white" />
              </div>

              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••"
                  className="reglo-input-field"
                  required
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-dark-custom-blue dark:text-light-light-white" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400"
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5 text-dark-custom-blue" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-dark-custom-blue" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-end">
                {/* <label className="flex items-center">
                <Field type="checkbox" name="rememberMe" className="mr-2" />
                <span className="text-sm text-gray-600">Keep me sign in</span>
              </label> */}
                <Link
                  href="/mp/login/forgot_password"
                  className="text-sm text-dark-logo-primary hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-600 text-white py-2 rounded-md transition duration-300 ${loading && "bg-gray-500"}`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        {/* <GoogleAuth title={"Sign in"} /> */}
        {message && (
          <div className="bg-red-500 text-white text-center my-5 p-2">
            <p>{message}</p>
          </div>
        )}

        <p className="text-center text-sm mt-4 text-dark-custom-dark-blue dark:text-light-light-white lg:mt-5">
          Don't have an account?{" "}
          <button
            onClick={setReglo}
            className="text-dark-custom-dark-blue dark:text-light-light-white font-semibold hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
