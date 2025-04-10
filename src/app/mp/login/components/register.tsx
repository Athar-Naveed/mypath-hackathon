"use client";
// -------------------------------
// Imports
// -------------------------------
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {Eye, EyeOff, Mail, Lock, User2Icon, LockKeyhole, ArrowLeft} from "lucide-react";
import stateStore from "@/store/zuStore";
import {UserRegisterHandler} from "../../mpHandler/regloHandler";
import GoogleAuth from "../../components/global/GoogleAuth";
import * as Yup from "yup";
import Link from "next/link";
import Image from "next/image";
// -------------------------------
// Register code starts here
// -------------------------------
const Register = () => {
  // -------------------------------
  // Setting var
  // -------------------------------
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>("");
  const [persmission, setPermission] = useState<boolean>(false);
  const setReglo = stateStore((state) => state.setReglo);

  const route = useRouter();
  // -------------------------------
  // Validation for user registeration form fields
  // -------------------------------
  const registerValidation = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must not exceed 50 characters")
      .matches(
        /^[a-zA-Z\s]*$/,
        "Name must only contain alphabets and spaces. Special characters are not allowed.",
      ),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    gender: Yup.string().required("Gender is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!#%*?&.]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character. \nAllowed special characters: @, $, !, %, *, #, ?, &, .",
      ),
    cpassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), ""], "Password & Confirm Password must match"),
  });

  return (
    <div className="flex gap-10 lg:gap-2 mx-2 lg:mx-0 h-screen items-center">
      <div className="img hidden lg:flex">
        <div className="box w-[51vw] h-screen bg-gradient-to-b from-dark-logo-primary-gradient to-dark-logo-primary">
          <Image
            src={"/assets/images/auth/register.jpg"}
            alt="login"
            width={1500}
            height={1500}
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="register-form mx-auto lg:mx-5">
        <div className="details my-4">
          <Link
            href={"/"}
            className="my-2 text-dark-logo-primary flex items-center hover:underline"
          >
            <ArrowLeft /> &nbsp;Go to Home
          </Link>
          <h1 className="text-3xl font-bold text-dark-logo-primary">Create an Account</h1>
          <p className="text-sm text-dark-custom-dark-blue">
            Glad to have you on board. Please register to start your learning path!
          </p>
        </div>
        <Formik
          initialValues={{email: "", password: "", rememberMe: false}}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              const resp = await UserRegisterHandler(values);
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
                toast.error(resp.message ?? "An error occurred", {
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
                  type="name"
                  name="name"
                  placeholder="Your full name here"
                  className="reglo-input-field"
                  required
                />
                <User2Icon className="absolute left-3 top-2.5 h-5 w-5 text-dark-custom-blue" />
              </div>
              <div className="relative">
                <Field
                  type="email"
                  name="email"
                  placeholder="info@mypath.one"
                  className="reglo-input-field"
                  required
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-dark-custom-blue" />
              </div>

              <div className="my-4 relative">
                <User2Icon className="absolute left-3 top-2.5 h-5 w-5 text-dark-custom-blue z-10" />
                <Field
                  as="select"
                  name="gender"
                  id="gender"
                  className="reglo-input-field p-2 pl-10" // Add left padding to make room for the icon
                >
                  <option value="" disabled>
                    Select a Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Field>
                <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••"
                  className="reglo-input-field"
                  required
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-dark-custom-blue" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
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
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="cpassword"
                  placeholder="••••"
                  className="reglo-input-field"
                  required
                />
                <LockKeyhole className="absolute left-3 top-2.5 h-5 w-5 text-dark-custom-blue" />
                <ErrorMessage
                  name="cpassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
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
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={persmission}
                  onChange={(e) => setPermission(e.target.checked)}
                  className="mt-1 h-4 w-4 text-dark-logo-primary focus:ring-dark-logo-primary border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  By using MyPath you agree to our{" "}
                  <Link href={"#"} className="underline text-dark-logo-primary">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href={"#"} className="underline text-dark-logo-primary">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={!persmission || loading}
                className={`w-full bg-blue-600 text-white py-2 rounded-md transition duration-300 ${loading && "bg-gray-500"}`}
              >
                {loading ? "Registering..." : "Register"}
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

        <p className="mt-4 text-center text-sm text-dark-custom-dark-blue">
          Already have an account?{" "}
          <button
            onClick={setReglo}
            className="text-dark-custom-dark-blue font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
