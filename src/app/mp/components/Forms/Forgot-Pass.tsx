"use client";
import {useEffect, useState} from "react";
import {CheckCircle} from "lucide-react";
import ForgotEmail from "./Forgot-Email";
import Link from "next/link";
import stateStore from "@/store/zuStore";
import {forgotPasswordEmail} from "../../mpHandler/forgotPasswordHandler";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [timer, setTimer] = useState<number>(0);
  const [resend, setResend] = useState<boolean>(false);
  const {email} = stateStore();
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
  const handleResend = async () => {
    try {
      setResend(true);
      const res = await forgotPasswordEmail(email);
      toast.success(res.data.message, {
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
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md">
        {!isSubmitted ? (
          <ForgotEmail setIsSubmitted={setIsSubmitted} setSubmittedEmail={setSubmittedEmail} />
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all animate-fade-in-up">
            <div className="p-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6 mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to
                <br />
                <span className="font-medium text-gray-900">{submittedEmail}</span>
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Back to reset password
                </button>
                <p className="text-sm text-gray-500">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button
                    onClick={handleResend}
                    className={`${resend ? "text-gray-500" : "text-blue-500"} hover:underline text-sm `}
                    disabled={resend}
                  >
                    Try again&nbsp;&nbsp;
                    <span className="text-dark-custom-dark-blue dark:text-dark-primary-text">
                      {timer < 30 && resend ? timer + "s" : ""}
                    </span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-gray-500 text-sm mt-8">
          Need help?{" "}
          <Link
            href="mailto:info2mypath@gmail.com"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
