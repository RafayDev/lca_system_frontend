import { FiHome } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';
import Home from './Pages/Home.js';
import User from './Pages/User/User.js';

export const routes = [
    { name: 'Home', icon: FiHome , component:<Home />, path: '/dashboard'},
    { name: 'Users', icon: FaUsers , component:<User />, path: '/user'},


  ];