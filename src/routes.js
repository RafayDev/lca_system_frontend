import { FiHome } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { SiBookstack } from "react-icons/si";
import { SiGoogleclassroom } from "react-icons/si";
import { FaList } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import Home from "./Pages/Home.js";
import User from "./Pages/User/User.js";
import Teacher from "./Pages/Teacher/Teacher.js";
import Courses from "./Pages/Courses/Courses.js";
import Batches from "./Pages/Batch/Batch.js";
import Students from "./Pages/Students/Student.js";
import Roles from "./Pages/Roles/Roles.js";
import Permissions from "./Pages/Permissions/Permissions.js";
import { Boxes, BrainCircuit, GraduationCap, Layers, LayoutDashboard, ListChecks, School, UserRoundCog, Users, UsersRound } from "lucide-react";

export const routes = [
  { name: "Home", icon: LayoutDashboard, component: <Home />, path: "/dashboard" },
  { name: "Users", icon: UsersRound, component: <User />, path: "/user" },
  {
    name: "Students",
    icon: GraduationCap,
    component: <Students />,
    path: "/student",
  },
  {
    name: "Teachers",
    icon: School,
    component: <Teacher />,
    path: "/teacher",
  },
  {
    name: "Batches",
    icon: Boxes,
    component: <Batches />,
    path: "/batch",
  },
  {
    name: "Courses",
    icon: Layers,
    component: <Courses />,
    path: "/course",
  },
  {
    name: "Roles",
    icon: UserRoundCog,
    component: <Roles />,
    path: "/role",
  },
  {
    name: "Permissions",
    icon: ListChecks,
    component: <Permissions />,
    path: "/permission",
  },
];
