// -----------------------
// Imports
// -----------------------
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import axios from "axios";
import {removingToken} from "../components/global/constants";

// -----------------------
// Fetching all the recommended people
// -----------------------

export const fetchRecommendedPeople = async () => {
  try {
    const res = await axios.get("https://campuscompanionserver.fly.dev/v1/recommendations", {
      // -----------------------
      // temporarily fetching all users instead of friends
      // -----------------------
      headers: {
        Authorization: `Bearer ${Cookies.get("serviceToken")}`,
      },
    });
    return res.data;
  } catch (error: any) {
    if (error.response.status == 401) {
      removingToken();
    }
    console.error("Error fetching users:", error?.response?.data?.error || error.message);
    toast.error("An error occurred while sending the friend request", {
      duration: 3000,
      position: "bottom-right",
    });
    return [];
  }
};

// -----------------------
// Fetching all the friend requests
// -----------------------
export const fetchFriendRequests = async () => {
  try {
    const res = await axios.get(
      "https://campuscompanionserver.fly.dev/v1/friends/requests/received",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("serviceToken")}`,
        },
      },
    );
    return res.data;
  } catch (error: any) {
    if (error.status !== 404) {
      console.error(
        "Error fetching friend requests:",
        error?.response?.data?.error || error.message,
      );
      toast.error("An error occurred while fetching the friend request", {
        duration: 3000,
        position: "bottom-right",
      });
    }
    return [];
  }
};

// -----------------------
// Fetching all the friends
// -----------------------
export const fetchFriends = async () => {
  try {
    const res = await axios.get("https://campuscompanionserver.fly.dev/v1/friends", {
      // -----------------------
      // temporarily fetching all users instead of friends
      // -----------------------
      headers: {
        Authorization: `Bearer ${Cookies.get("serviceToken")}`,
      },
    });
    
    return res.data;
  } catch (error: any) {
    console.error("Error fetching users:", error?.response?.data?.error || error.message);
    toast.error("An error occurred while fetching friends", {
      duration: 3000,
      position: "bottom-right",
    });
    return [];
  }
};

// -----------------------
// Send friend request to the friends
// -----------------------
export const sendFriendRequest = async (userId: string): Promise<boolean> => {
  try {
    await axios.post(
      "https://campuscompanionserver.fly.dev/v1/friends/request",
      {
        requested_user: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("serviceToken")}`,
        },
      },
    );

    toast.success("Friend request sent successfully", {
      duration: 3000,
      position: "bottom-right",
    });
    return true;
  } catch (error: any) {
    if (error.response.status == 401) {
      removingToken();
    } else {
      console.error("Error sending friend request:", error?.response?.data?.error || error.message);
      toast.error(error.response.data.error, {
        duration: 3000,
        position: "bottom-right",
      });
    }
    return false;
  }
};

// -----------------------
// In case you have accepted the friend request
// -----------------------
export const acceptFriendRequest = async (requestId: string, router: any) => {
  try {
    const res = await axios.post(
      "https://campuscompanionserver.fly.dev/v1/friends/accept",
      {
        requestId,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("serviceToken")}`,
        },
      },
    );
    toast.success("Friend request accepted successfully", {
      duration: 3000,
      position: "bottom-right",
    });
    router.refresh();
  } catch (error: any) {
    if (error.response.status == 401) {
      removingToken();
    } else {
      console.error(
        "Error accepting friend request:",
        error?.response?.data?.error || error.message,
      );
      toast.error("An error occurred while accepting friend request", {
        duration: 3000,
        position: "bottom-right",
      });
    }
  }
};

// -----------------------
// In case you have rejected the friend request
// -----------------------
export const rejectFriendRequest = async (requestId: string) => {
  try {
    const res = await axios.post(
      "https://campuscompanionserver.fly.dev/v1/friends/reject",
      {
        requestId,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("serviceToken")}`,
        },
      },
    );
    toast.success("Friend request rejected successfully", {
      duration: 3000,
      position: "bottom-right",
    });
  } catch (error: any) {
    if (error.response.status == 401) {
      removingToken();
    } else {
      toast.error(error, {
        duration: 3000,
        position: "bottom-right",
      });
      console.error(
        "Error rejecting friend request:",
        error?.response?.data?.error || error.message,
      );
    }
  }
};

// -----------------------
 // Unfriending a friend
 // -----------------------
export const removeFriend = async (friendId: string | undefined) => {
  try {
    const res = await axios.delete(
      `https://campuscompanionserver.fly.dev/v1/friends/remove/${friendId}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("serviceToken")}`,
        },
      },
    );
    toast.success("User unfriend successfully!", {
      duration: 3000,
      position: "bottom-right",
    });
  } catch (error: any) {
    if (error.response.status == 401) {
      removingToken();
    } else {
      toast.error(error, {
        duration: 3000,
        position: "bottom-right",
      });
      console.error("Error removing friend:", error?.response?.data?.error || error.message);
    }
  }
};
