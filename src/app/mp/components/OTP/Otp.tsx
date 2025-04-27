"use client";
import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {resendOTP, validateOTP} from "../../mpHandler/regloHandler";
import toast from "react-hot-toast";
import stateStore from "@/store/zuStore";
import Link from "next/link";

const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{6}$/, "OTP must be a 6-digit number")
    .required("OTP is required"),
});

const Otp = () => {
  const {email} = stateStore();
  const setReglo = stateStore((state) => state.setReglo);
  const [timer, setTimer] = useState<number>(0);
  const [resend, setResend] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const route = useRouter();

  useEffect(() => {
    const countdown = () => {
      if (timer < 30 && resend) {
        setTimer((prev) => prev + 1);
      } else {
        setResend(false);
        setTimer(0);
      }
    };
    const interval = setInterval(countdown, 1000);
    return () => clearInterval(interval);
  }, [timer, resend]);

  const handleResend = async () => {
    try {
      setResend(true);
      const res = await resendOTP(email);
      toast.success(res.message, {
        duration: 3000,
        position: "top-center",
      });
    } catch (error: any) {
      toast.error(error, {
        duration: 6000,
        position: "top-center",
      });
    }
  };

  if (email.length <= 0)
    return (
      <h1 className="text-dark-custom-dark-blue dark:text-light-light-white grid items-center justify-center mt-52">
        <span className="text-3xl pb-5">Please Register First </span>{" "}
        <Link className="text-dark-logo-primary" href={"/mp/login"}>
          Register
        </Link>
      </h1>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Enter OTP
        </h2>
        <Formik
          initialValues={{otp: ""}}
          validationSchema={otpSchema}
          onSubmit={async (values) => {
            setSubmitting(true);
            const payload = {email, otp: values.otp};
            try {
              const resp = await validateOTP(payload);
              if (resp.status === 200) {
                toast.success(resp.message, {
                  duration: 3000,
                  position: "top-center",
                });
                setReglo();
                route.push("/mp/login");
              } else {
                toast.error(resp.message, {
                  duration: 6000,
                  position: "top-center",
                });
              }
            } catch (error: any) {
              toast.error(error, {
                duration: 3000,
                position: "top-center",
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({isSubmitting}) => (
            <Form>
              <div className="mb-4">
                <Field
                  type="text"
                  name="otp"
                  maxLength={6}
                  inputMode="numeric"
                  pattern="\d*"
                  className="w-full p-3 text-center text-xl border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  placeholder="Enter 6-digit OTP"
                />
                <ErrorMessage name="otp" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex justify-between items-center mb-4">
                <button
                  type="button"
                  className={`${
                    resend ? "text-gray-500" : "text-blue-500"
                  } hover:underline text-sm`}
                  onClick={handleResend}
                  disabled={resend}
                >
                  Resend Code
                </button>
                <span className="text-dark-custom-dark-blue dark:text-dark-primary-text">
                  {timer < 30 && resend ? `${timer}s` : ""}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 rounded-md text-base hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Otp;
