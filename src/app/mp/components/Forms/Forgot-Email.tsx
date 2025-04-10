"use client";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {AlertCircle, ArrowRight, Mail} from "lucide-react";
import Link from "next/link";
import * as Yup from "yup";
import {forgotPasswordEmail} from "../../mpHandler/forgotPasswordHandler";
import {useState} from "react";
import stateStore from "@/store/zuStore";
// Validation schema
const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email address is required"),
});

const ForgotEmail = ({
  setIsSubmitted,
  setSubmittedEmail,
}: {
  setIsSubmitted: (value: boolean) => void;
  setSubmittedEmail: (email: string) => void;
}) => {
  const {setEmail} = stateStore();
  const [message, setMessage] = useState<string | undefined>("");

  const handleSubmit = async (
    values: {email: string},
    {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void},
  ) => {
    try {
      setEmail(values.email);
      const resp = await forgotPasswordEmail(values);
      if (resp.status === 200) {
        setIsSubmitted(true);
        setSubmittedEmail(values.email);
      } else if (resp.status === 404) {
        setMessage(resp.error);
      }
    } catch (err) {
      setMessage(err as string);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 text-white">
          <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4 mx-auto backdrop-blur-sm">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-center">Forgot Password?</h1>
          <p className="text-blue-100 mt-2 text-center">No worries, we'll send you reset link.</p>
        </div>

        {/* Form */}
        <div className="p-6 sm:p-8">
          <Formik
            initialValues={{email: ""}}
            validationSchema={ForgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({isSubmitting, errors, touched}) => (
              <Form className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      className={`w-full px-4 py-3 bg-gray-50 border ${
                        errors.email && touched.email ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pl-10`}
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  <ErrorMessage name="email">
                    {(msg) => (
                      <div className="flex items-center mt-1 text-sm text-red-500">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Reset Password
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>

                <div className="text-center">
                  <Link
                    href="/mp/login"
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Back to login
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
          {message && (
            <div className="bg-red-500 text-white text-center my-5 p-2">
              <p>{message}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ForgotEmail;
