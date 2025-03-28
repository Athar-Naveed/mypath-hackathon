import {
  MessageSquare,
  Home,
  BookOpen,
  Heart,
  Users,
  FileText,
  Briefcase,
  PenTool,
  BarChart2,
  Calendar,
  Book,
} from "lucide-react";
import pla from "../assets/images/AllFeatures/pla.webp";
import aibr from "../assets/images/AllFeatures/aibr.webp";
import aih from "../assets/images/AllFeatures/aih.webp";
import ait from "../assets/images/AllFeatures/ait.webp";
import blog from "../assets/images/AllFeatures/blog.webp";
import chatbot from "../assets/images/AllFeatures/chatbot.webp";
import events from "../assets/images/AllFeatures/events.webp";
import hostels from "../assets/images/AllFeatures/hostels.webp";
import job from "../assets/images/AllFeatures/job.webp";
import sco from "../assets/images/AllFeatures/sco.webp";
import sta from "../assets/images/AllFeatures/sta.webp";
import {Card} from "@/types";

export const NavItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/#about",
  },
  {
    label: "Features",
    href: "/features",
  },
  {
    label: "Pricing",
    href: "/redirect",
  },
  {
    label: "Blogs",
    href: "/redirect",
  },
  {
    label: "Meet Our Team",
    href: "/#team",
  },
];

export const HomeHeroContent = {
  title1: "Your Personalized",
  title2: "Learning Companion",
  description:
    "MyPath is your personalized education companion, guiding students from Grade 9 to PhD with AI-powered tools. Whether you need learning support, mental wellness resources, accommodation details, or career-building features, MyPath is here to help you succeed at every step of your journey. Together, we pave the way to a brighter future.",
  Button1: "Book a Demo",
  Button2: "Join Waitlist",
};

const styles = {
  icons: {
    width: "5em",
    height: "5em",
  },
  socialIcons: {
    width: "2.5em",
    height: "2.5em",
  },
};

export const AboutHeroContent = {
  title: "Partnering for Innovation and Trust",
  acheivement: [
    {
      image: pla,
      id: 1,
      name: "Client 1",
    },
    {
      image: pla,
      id: 2,
      name: "Client 2",
    },
    {
      image: pla,
      id: 3,
      name: "Client 3",
    },
    {
      image: pla,
      id: 4,
      name: "Client 4",
    },
    {
      image: pla,
      id: 5,
      name: "Client 5",
    },
    {
      image: pla,
      id: 6,
      name: "Client 6",
    },
    {
      image: pla,
      id: 7,
      name: "Client 7",
    },
    {
      image: pla,
      id: 8,
      name: "Client 8",
    },
  ],
};

export const featureContent = {
  featureTitle: "Features",
  mainHeading: "Features That Boost Your Productivity",
  subHeading: "And Features That Foster Collaboration and Success",
  feature: [
    {
      title: "Intelligent Chatbot",
      description:
        "AI-powered chatbot with RAG technology for instant, accurate, and multilingual support. Enables hands-free interaction with voice recognition.",
      icon: <MessageSquare style={styles.icons} />,
      img: chatbot,
    },
    {
      title: "Student Matching Platform",
      description:
        "Matches students based on interests and goals. Offers chat and AI-suggested study groups.",
      icon: <Users style={styles.icons} />,
      img: sco,
    },
    {
      title: "Personalized Learning Assistant",
      description:
        "Tailored study materials and schedules using RAG. Tracks engagement and integrates with LMS for seamless access to course content.",
      icon: <BookOpen style={styles.icons} />,
      img: pla,
    },
    {
      title: "Mental Health and Wellness Support",
      description:
        "Empathetic AI-powered chatbot for mental health support. Ensures anonymity and links to relevant resources using RAG.",
      icon: <Heart style={styles.icons} />,
      img: aih,
    },
    {
      title: "AI-based Resume Builder",
      description:
        "ATS-friendly resume creation with AI customization based on student data and preferences.",
      icon: <FileText style={styles.icons} />,
      img: aibr,
    },
    {
      title: "Job Postings",
      description:
        "Integrates with job platforms, matches postings with student skills, and provides relevant alerts.",
      icon: <Briefcase style={styles.icons} />,
      img: job,
    },
    {
      title: "Student-Based Interactive Blog",
      description:
        "Platform for students to write, contribute, and collaborate on academic topics and projects.",
      icon: <PenTool style={styles.icons} />,
      img: blog,
    },
    {
      title: "AI Powered Virtual Tutoring",
      description:
        "Platform for students to write, contribute, and collaborate on academic topics and projects.",
      icon: <Book style={styles.icons} />,
      img: ait,
    },
    {
      title: "Accomodation",
      description:
        "Since we are a platform that takes care of a student throughout his/her learning journey. And without a roof on your head, how you are going to work! We provide details regarding hostels, flats, and co-working spaces.",
      icon: <Home style={styles.icons} />,
      img: hostels,
    },
    {
      title: "Comprehensive Student Analytics",
      description:
        "Visualizes student data using RAG, generates predictive insights, and offers customizable admin views.",
      icon: <BarChart2 style={styles.icons} />,
      img: sta,
    },
    {
      title: "Events Happening",
      description: "A platform where we'll keep you posted regarding events going on near you.",
      icon: <Calendar style={styles.icons} />,
      img: events,
    },
  ],
};

export const AboutContent = {
  featureTitle: "About",
  mainHeading: "From Classroom to Career, MyPath is Your Guide",
  subHeading:
    "MyPath is the world's first AI-powered unified, personalized learning platform made for students to learn, connect, and grow. Whether you want to study smarter, make friends, build a resume, find jobs, or discover local events, MyPath has it all in one place.",
  // buttonText: "Learn More",
};

export const OurTeam = {
  title: "Our Core Team",
  subTitle:
    "At our core, there is no Iron Man's nuclear reactor. These are the developers & designers whose hard work of day & night drives this AI Vision.",
  team: [
    {role: "Founder", img: "/Team/founder.webp", name: "Noor Ul Hassan"},
    {role: "Co-founder", img: "/Team/cofounder.webp", name: "Athar Naveed"},
    {role: "Gen AI Developer", img: "/Team/genai.webp", name: "Fahad Rashid"},
    {role: "Backend Developer", img: "/Team/backend.webp", name: "Khawaja M. Bilal"},
    {role: "Frontend Developer", img: "/Team/frontend.webp", name: "Hurr Ali"},
    {role: "Quality Assurance", img: "/Team/tester.webp", name: "M. Umair Tahir"},
    {role: "Graphic Designer", img: "/Team/uiux.webp", name: "Mohib Atif"},
    {role: "Social Media Manager", img: "/Team/ladies.webp", name: "Zunaira Maalik"},
  ],
};

export const quickLinks = [
  {
    title: "Try MyPath",
    href: "/mp",
  },
  {
    title: "Privacy Policy",
    href: "#",
  },
  {
    title: "Terms & Conditions",
    href: "#",
  },
];

export const pricingPlans = [
  {
    title: "Free",
    price: "Rs. 0",
    features: ["ChatBot (30 requests/day)", "Student Matching Platform"],
    buttonText: "Get Started",
  },
  {
    title: "Pro",
    price: "Rs. 1000",
    features: ["Full access", "All the Features"],
    buttonText: "Upgrade to Pro",
    highlighted: true,
    recommended: true,
  },
  {
    title: "Basic",
    price: "Rs. 600",
    features: ["Customize your Plan", "Chatbot + Blog"],
    buttonText: "Choose Basic",
  },
];
export const BannerContent = [
  {
    title: "Facebook",
    image: "/assets/images/socials/facebook.svg",
    href: "https://www.facebook.com/profile.php?id=61566506248800",
  },
  {
    title: "Instagram",
    image: "/assets/images/socials/instagram.svg",
    href: "https://www.instagram.com/mypath_ai",
  },
  {
    title: "YouTube",
    image: "/assets/images/socials/youtube.svg",
    href: "https://www.youtube.com/@mypathai",
  },
  {
    title: "LinkedIn",
    image: "/assets/images/socials/linkedin.svg",
    href: "https://www.linkedin.com/company/mypathai",
  },
];
export const slider = [
  {
    title: "What's the best way to teach someone about momentum?",
    description: "Give them a push 🫸! Similarly, let MyPath give your studies a little push.",
    buttonText: "Push them with MyPath",
    images: [
      "/assets/images/hero/physics/PI.svg",
      "/assets/images/hero/physics/ALPHA.svg",
      "/assets/images/hero/physics/LAMBDA.svg",
      "/assets/images/hero/physics/SIGMA.svg",
    ],
  },
  {
    title: "π π ka hisaab loun ga",
    description: "Hisaab seekhny ky baad😉",
    buttonText: "Try MyPath!",
    images: [
      "/assets/images/hero/physics/PI.svg",
      "/assets/images/hero/physics/ALPHA.svg",
      "/assets/images/hero/physics/LAMBDA.svg",
      "/assets/images/hero/physics/SIGMA.svg",
    ],
  },
  {
    title: "Why did the student bring a ladder to math class?",
    description:
      "Because they heard the class was going to be over their head! Don't let that happen; use MyPath to stay on top of things!",
    buttonText: "Try MyPath!",
    images: [
      "/assets/images/hero/physics/PI.svg",
      "/assets/images/hero/physics/ALPHA.svg",
      "/assets/images/hero/physics/LAMBDA.svg",
      "/assets/images/hero/physics/SIGMA.svg",
    ],
  },
  {
    title: "HTML, CSS seekh kr khud ko Web Developer samajhnay walon!",
    description: "MyPath pr ao, aur actual mein Web Development seekho!",
    buttonText: "Try MyPath!",
    images: [
      "/assets/images/hero/physics/PI.svg",
      "/assets/images/hero/physics/ALPHA.svg",
      "/assets/images/hero/physics/LAMBDA.svg",
      "/assets/images/hero/physics/SIGMA.svg",
    ],
  },
];

export const cards: Card[] = [
  {
    id: 1,
    title: "Personalized AI Chatbot",
    content:
      "This is the content for card one. When selected, this card expands to take more space.",
    description:
      "Our AI chatbot adapts to your learning style, providing personalized assistance and answering your questions 24/7. It helps you master concepts at your own pace and provides targeted feedback to enhance your learning experience.",
  },
  {
    id: 2,
    title: "Visualization",
    content: "This is the content for card two. Click to select this card.",
    description:
      "Complex concepts become simple with our interactive visualizations. See abstract ideas come to life through dynamic diagrams, charts, and models that make learning intuitive and engaging, helping you understand complex topics effortlessly.",
  },
  {
    id: 3,
    title: "Interactive Quizzes",
    content: "This is the content for card three. Click to select this card.",
    description:
      "Test your knowledge and reinforce learning with our adaptive quizzes. These interactive assessments adjust to your skill level, providing just the right challenge to maximize retention and help you identify areas that need additional focus.",
  },
];
