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
import Students from "./Pages/Students/Student.js";
import Roles from "./Pages/Roles/Roles.js";
import Permissions from "./Pages/Permissions/Permissions.js";

export const routes = [
  { name: "Home", icon: FiHome, component: <Home />, path: "/dashboard" },
  { name: "Users", icon: FaUsers, component: <User />, path: "/user" },
  {
    name: "Students",
    icon: FaUsers,
    component: <Students />,
    path: "/student",
  },
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
  {
    name: "Roles",
    icon: SiBookstack,
    component: <Roles />,
    path: "/role",
  },
  {
    name: "Permissions",
    icon: SiBookstack,
    component: <Permissions />,
    path: "/permission",
  },  
];
