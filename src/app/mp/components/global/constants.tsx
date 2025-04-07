// ----------------------------
// Imports
// ----------------------------
import {Role, StateType} from "@/types";
import {Bot, Users2, User2, MessagesSquare, Settings, FolderPen, History} from "lucide-react";

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
  {
    title: "New Chat",
    icon: FolderPen,
  },
  {
    title: "Chat History",
    icon: History,
  },
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

// Get initials from username
export const getInitials = (userName: string) => {
  if (!userName) return "";

  const names = userName.split(" ");
  if (names.length > 1) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  }
  return userName[0].toUpperCase();
};

// Generate a consistent color based on username
export const generateColor = (name: string) => {
  const colors = [
    "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300",
    "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300",
    "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300",
    "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300",
    "bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300",
    "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-300",
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};

export const generateSessionId = () => {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

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
