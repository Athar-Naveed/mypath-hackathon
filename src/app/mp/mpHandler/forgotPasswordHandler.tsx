import axios from "axios";

export const forgotPasswordEmail = async (value: any) => {
  try {
    const res = await axios.post("https://campuscompanionserver.fly.dev/v1/auth/forgot", value);
    const data = res.data.message;
    return {data, status: res.status};
  } catch (error: any) {
    if (error.response.status == 404) {
      return {
        error: "User not found",
        status: 404,
      };
    }
    return {error, status: error.status};
  }
};
