import { FiHome } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiBookstack } from "react-icons/si";
import { SiGoogleclassroom } from "react-icons/si";
import Home from "./Pages/Home.js";
import User from "./Pages/User/User.js";
import Teacher from "./Pages/Teacher/Teacher.js";
import Courses from "./Pages/Courses/Courses.js";
import Batches from "./Pages/Batch/Batch.js";

export const routes = [
  { name: "Home", icon: FiHome, component: <Home />, path: "/dashboard" },
  { name: "Users", icon: FaUsers, component: <User />, path: "/user" },
  {
    name: "Teachers",
    icon: LiaChalkboardTeacherSolid,
    component: <Teacher />,
    path: "/teacher",
  },
  {
    name: "Batches",
    icon: SiGoogleclassroom,
    component: <Batches />,
    path: "/batch",
  },
  {
    name: "Courses",
    icon: SiBookstack,
    component: <Courses />,
    path: "/course",
  },
];
