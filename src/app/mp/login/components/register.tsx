"use client";
// -------------------------------
// Imports
// -------------------------------
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {Eye, EyeOff, Mail, Lock, User, User2Icon, LockKeyhole} from "lucide-react";
import stateStore from "@/store/zuStore";
import {UserRegisterHandler} from "../../mpHandler/regloHandler";
import GoogleAuth from "../../components/global/GoogleAuth";
import AuthIntro from "../../components/AuthIntro";
import * as Yup from "yup";
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
  const setReglo = stateStore((state) => state.setReglo);
  const {setEmail} = stateStore();
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
    <div className="reglo-form">
      <Formik
        validationSchema={registerValidation}
        initialValues={{
          name: "",
          email: "",
          gender: "",
          password: "",
          cpassword: "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            const resp = await UserRegisterHandler(values);
            if (resp.status == 200) {
              toast.success(resp.message!, {
                duration: 6000,
                position: "top-center",
              });
              setLoading(false);
              setEmail(values.email);
              route.push("/mp/login/otp");
            }
            if (resp.status == 409) {
              setMessage("User already exists");
              setLoading(false);
            }
          } catch (error: any) {
            setMessage(error);
            setLoading(false);
          }
        }}
      >
        {({values}) => (
          <Form className="space-y-4">
            <AuthIntro value={values.name.split(" ")[0].toUpperCase()} />
            <div className="relative">
              <Field
                type="text"
                name="name"
                placeholder="Athar Naveed"
                className="reglo-input-field"
                required
              />
              <User className="absolute left-3 top-2.5 h-5 w-5 text-dark-custom-blue" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
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
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
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
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
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

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 rounded-md transition duration-300 ${loading && "bg-gray-500"}`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>

      {/* <GoogleAuth title={"Sign up"} /> */}
      {message && (
        <div className="bg-red-500 text-white text-center my-5 p-2">
          <p>{message}</p>
        </div>
      )}

      <p className="mt-8 text-center text-sm text-dark-custom-dark-blue">
        Don't have an account?{" "}
        <button
          onClick={setReglo}
          className="text-dark-custom-dark-blue font-semibold hover:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default Register;
