// ----------------------------
// Imports
// ----------------------------
import {Role, StateType} from "@/types";
import {Bot, Users2, User2, MessagesSquare, Settings, FolderPen} from "lucide-react";

import Cookies from "js-cookie";
import toast from "react-hot-toast";
// ----------------------------
// Types
// ----------------------------
interface sideNavigationType {
  title: string;
  icon: React.ReactNode;
  href: string;
}

// ----------------------------
// Sidebar Navigation
// ----------------------------
export const sideNavigation: sideNavigationType[] = [
  {title: "PathAI", icon: <Bot className="icon-color" />, href: "/mp/chatbot"},
  {
    title: "Student Matching Platform",
    icon: <Users2 className="icon-color" />,
    href: "/mp/matching_platform",
  },
  {title: "Messages", icon: <MessagesSquare className="icon-color" />, href: "/mp/messages"},
  // { title: "Resume Builder AI", icon: <Bot />, href: "/mp/resume-builder" },
  // { title: "Job Postings", icon: <BriefcaseIcon />, href: "/mp/jobs" },
  // { title: "Virtual Learning Platform", icon: <GraduationCap />, href: "/mp/learning" },
  // { title: "Upcoming Events", icon: <Calendar />, href: "/mp/events" },
  // { title: "Teacher Recommender", icon: <Users2 />, href: "/mp/teacher-recommend" },
];

export const navLinks = [
  // {
  //   title: "New Chat",
  //   icon: FolderPen,
  // },
];

// ----------------------------
// Profile dropdown links
// ----------------------------
export const profileDropdownLinks = [
  {
    title: "My Profile",
    href: "/mp/",
    icon: <User2 className="icon-color mr-3" />,
  },
  {
    title: "Settings",
    href: "/mp/settings",
    icon: <Settings className="icon-color mr-3" />,
  },
];

// ----------------------------
// Setting links
// ----------------------------
export const settings = [
  {
    title: "Support",
  },
  {
    title: "Billing",
  },
];

// ----------------------------
// When the session is expired, this function is called
// ----------------------------
export const removingToken = () => {
  toast.error("Session expired! Please login again.", {
    duration: 5000,
    position: "bottom-right",
  });
  Cookies.remove("serviceToken");
  location.reload();
};

// ----------------------------
// Getting user type to put limitation
// ----------------------------
export const getUserType = (store: StateType, request: string) => {
  const user = store.user;

  switch (user?.role) {
    case "user":
      if (request === "chat") {
        if (user.madeTextRequests == user.allowedTextRequests) {
          return false;
        }
        user.madeTextRequests += 1;
        return true;
      } else if (request === "visualize") {
        if (user.madeVisualRequests == user.allowedVisualRequests) {
          return false;
        }
        user.madeVisualRequests += 1;
        return true;
      }

    default:
      return true;
  }
};

export const dropUpOptions = [
  {
    title: "quiz",
    desc: "Generate quiz questions",
  },
  {
    title: "visualize",
    desc: "Stuck? Let AI explain visually",
  },
];

export const oneChabotMessage = (
  role: Role,
  category: string,
  content?: string,
  visualization?: string,
) => {
  const date = new Date();
  const message = {
    role: role,
    content: content,
    category: category,
    visualization: visualization,
    createdAt: date,
    updatedAt: date,
  };
  return message;
};
