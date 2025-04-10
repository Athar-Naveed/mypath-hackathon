"use client";
// ----------------------------
// Imports
// ----------------------------
import React, {useRef, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Formik, Form, Field} from "formik";
import {resendOTP, validateOTP} from "../../../mpHandler/regloHandler";
import toast from "react-hot-toast";
import stateStore from "@/store/zuStore";
import Link from "next/link";
// ----------------------------
// OTP component starts here
// ----------------------------
const Otp = () => {
  const {email} = stateStore();
  const setReglo = stateStore((state) => state.setReglo);
  const [timer, setTimer] = useState<number>(0);
  const [resend, setResend] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const route = useRouter();

  // ----------------------------
  // Focusing OTP's input field
  // ----------------------------
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // ----------------------------
  // Capturing keyboard events inside OTP input field
  // ----------------------------
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === "Backspace" && index > 0 && !event.currentTarget.value) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  // ----------------------------
  // Resending OTP
  // ----------------------------
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
  // ----------------------------
  // Clock timer to put lock on the chat
  // ----------------------------
  useEffect(() => {
    const countdown = () => {
      if (timer < 30 && resend) {
        setTimer(timer + 1);
      } else {
        setResend(false);
        setTimer(0);
      }
    };
    const interval = setInterval(countdown, 1000);
    return () => clearInterval(interval);
  });
  // ----------------------------
  // If the user tries to directly access the OTP page, without registering
  // ----------------------------
  if (email.length <= 0)
    return (
      <h1 className="text-dark-custom-dark-blue dark:text-light-light-white grid items-center justify-center mt-52">
        <span className="text-3xl pb-5">Please Register First </span>{" "}
        <Link className="text-dark-logo-primary" href={"/mp/login"}>
          {" "}
          Register
        </Link>
      </h1>
    );
  // ----------------------------
  // Else displaying the OTP page
  // ----------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-md w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[520px]">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-800 dark:text-white">
          Enter OTP
        </h2>
        {/* 
      // ----------------------------
      // Else displaying the OTP page
      // ---------------------------- 
      */}
        <Formik
          initialValues={{otp: ["", "", "", "", "", ""]}}
          onSubmit={async (values) => {
            setSubmitting(true);
            const value = {
              email: email,
              otp: values.otp.join(""),
            };
            try {
              const resp = await validateOTP(value);
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
          {({values, setFieldValue}) => (
            <Form>
              <div className="flex justify-between mb-4 sm:mb-6">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <Field
                    key={index}
                    name={`otp[${index}]`}
                    type="text"
                    maxLength={1}
                    className="w-8 h-10 sm:w-10 sm:h-12 md:w-12 md:h-14 lg:w-14 lg:h-16 text-center text-lg sm:text-xl md:text-2xl border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                      handleKeyDown(e, index)
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value;
                      if (/^\d?$/.test(value)) {
                        setFieldValue(`otp[${index}]`, value);
                        if (value && index < 5) {
                          inputRefs.current[index + 1]?.focus();
                        }
                      }
                    }}
                    innerRef={(el: HTMLInputElement) => (inputRefs.current[index] = el)}
                  />
                ))}
              </div>

              <div className="flex justify-between items-center mb-4">
                <button
                  type="button"
                  className={`${resend ? "text-gray-500" : "text-blue-500"} hover:underline text-sm `}
                  onClick={handleResend}
                  disabled={resend}
                >
                  Resend Code
                </button>
                <span className="text-dark-custom-dark-blue dark:text-dark-primary-text">
                  {timer < 30 && resend ? timer + "s" : ""}
                </span>
              </div>

              <button
                disabled={submitting}
                type="submit"
                className="w-full bg-blue-500 text-white p-2 sm:p-3 rounded-md text-sm sm:text-base hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 transition-colors duration-200"
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
