import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings } from 'react-icons/fi';
import Home from './Pages/Home.js';
import User from './Pages/User.js';

export const routes = [
    { name: 'Home', icon: FiHome , component:<Home />, path: '/dashboard'},
    { name: 'User', icon: FiHome , component:<User />, path: '/user'},


  ];