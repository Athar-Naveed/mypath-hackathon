"use client";
// ------------------------
// Imports
// ------------------------
import Image from "next/image";
import {useState} from "react";
import stateStore from "@/store/zuStore";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {userProfileHandler} from "../../mpHandler/userProfileHandler";
import UserImage from "../../components/UserImage";

// ------------------------
// Validating user profile form
// ------------------------
const validationSchema = Yup.object().shape({
  bio: Yup.string().max(255, "Bio must be less than 255 characters"),
  degree: Yup.string(),
  department: Yup.string(),
  institution: Yup.string(),
  profilePicture: Yup.string(),
  userProfile: Yup.string(),
});

// ------------------------
// Profile settings code start here
// ------------------------
const ProfileSettings = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage,setSuccessMessage] = useState<string>("");
  const [errorMessage,setErrorMessage] = useState<string>("");
  const {user, userName} = stateStore();

  return (
    <div className="bg-white dark:bg-dark-custom-dark-blue">
      <main className="mx-auto max-w-4xl pt-32 mb-10">
        {/* 
        // ------------------------
        // Profile Section starts here
        // ------------------------
        */}
        <div className="relative ml-4 mb-20 flex items-center gap-4">
          <UserImage {...user} />
          <div>
            <h2 className="text-xl font-semibold text-dark-custom-dark-blue dark:text-light-light-white">
              {userName}
            </h2>
            <p className="text-dark-secondary-text">{user?.bio}</p>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>
            {/* 
            // ------------------------
            // Profile Section ends here
            // ------------------------
            */}

            {/* 
            // ------------------------
            // User Profile Form starts here
            // ------------------------
            */}
        <Formik
          initialValues={{
            bio: "",
            degree: "",
            department: "",
            institution: "",
            profilePicture: "",
            userProfile: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              const res = await userProfileHandler(values);
              if (res.status === 200){
                setSuccessMessage(res.message);
              }
            } catch (error: any) {
              setErrorMessage(error.message);
            } finally {
              setLoading(false);
            }
          }}
          >
          {() => (
            // ------------------------
            // Form starts here
            // ------------------------
            <Form className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {/*
              // ------------------------ 
              // Bio 
              // ------------------------ 
              */}
              <div className="relative m-3 col-span-2">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-dark-custom-dark-blue dark:text-light-light-white"
                >
                  Bio
                </label>
                <Field
                  type="text"
                  id="bio"
                  name="bio"
                  placeholder="Enter a brief bio"
                  className="profile-input-field mt-1"
                />
                <ErrorMessage name="bio" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              {/* 
              // ------------------------
              // Degree
              // ------------------------
              */}
              <div className="relative m-3 col-span-2 md:col-span-1">
                <label
                  htmlFor="degree"
                  className="block text-sm font-medium text-dark-custom-dark-blue dark:text-light-light-white"
                >
                  Degree
                </label>
                <Field
                  type="text"
                  id="degree"
                  name="degree"
                  placeholder="Enter your degree"
                  className="profile-input-field mt-1"
                />
                <ErrorMessage name="degree" component="div" className="text-sm text-red-600 mt-1" />
              </div>

              {/*
              // ------------------------
              // Department 
              // ------------------------
              // */}
              <div className="relative m-3 col-span-2 md:col-span-1">
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-dark-custom-dark-blue dark:text-light-light-white"
                >
                  Department
                </label>
                <Field
                  type="text"
                  id="department"
                  name="department"
                  placeholder="Enter your department"
                  className="profile-input-field mt-1"
                  />
                <ErrorMessage
                  name="department"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              {/*
              // ------------------------ 
              // Institution 
              // ------------------------
              // 
              // */}
              <div className="relative m-3 col-span-2 md:col-span-1">
                <label
                  htmlFor="institution"
                  className="block text-sm font-medium text-dark-custom-dark-blue dark:text-light-light-white"
                >
                  Institution
                </label>
                <Field
                  type="text"
                  id="institution"
                  name="institution"
                  placeholder="Enter your institution"
                  className="profile-input-field mt-1"
                />
                <ErrorMessage
                  name="institution"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                  />
              </div>

              {/* 
              // ------------------------
              // User Profile 
              // ------------------------
              */}
              <div className="relative m-3 col-span-2 md:col-span-1">
  <label
    htmlFor="sim"
    className="block text-sm font-medium text-dark-custom-dark-blue dark:text-light-light-white"
  >
    You are
  </label>
  <Field name="sim">
    {({ field, form }: { field: any; form: any }) => (
      <div className="relative">
        {/* Input field */}
        <input
          {...field}
          list="options"
          id="sim"
          className="profile-input-field mt-1 w-full"
          placeholder="You are"
          onChange={(e) => {
            form.setFieldValue("sim", e.target.value); // Update formik value
          }}
        />
        {/* Datalist for dropdown options */}
        <datalist id="options">
          <option value="Student" />
          <option value="Instructor" />
          <option value="Mentor" />
        </datalist>
      </div>
    )}
  </Field>
  <ErrorMessage
    name="sim"
    component="div"
    className="text-red-500 text-sm mt-1"
  />
</div>


              {/* 
              // ------------------------
              // Submit Button 
              // ------------------------
              */}
              <div className="col-span-full flex justify-end mb-20 md:mb-0">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full lg:w-auto bg-dark-logo-primary hover:bg-blue-800 text-white py-2 px-6 rounded-md transition duration-300 ${
                    loading && "bg-gray-500"
                  }`}
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </Form>
        // ------------------------
        // Form ends here
        // ------------------------
          )}
        </Formik>
        {/* 
        // ------------------------
        // User Profile Form ends here
        // ------------------------
        */}
        {successMessage && (
          <div className="text-center text-white bg-dark-logo-primary mt-4 p-4 rounded-lg">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="text-center text-white bg-red-600 mt-4 p-4 rounded-lg">
            {errorMessage}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfileSettings;
