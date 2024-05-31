import React, { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom'; // Import Outlet from react-router-dom
import Cookies from 'js-cookie';
import { Box, useColorModeValue, Drawer, DrawerContent } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import Sidebar from '../Components/Sidebar.js';
import MobileNav from '../Components/MobileNav.js';
import { extractUserIdFromToken } from '../utlls/useful.js';
import { useDispatch } from 'react-redux';
import { fetchUserById } from '../Features/authSlice.js';

function Dashboard() {
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();
  const { hash, pathname, search } = location;
  useEffect(() => {
    // Check if authToken is present in cookies
    const authToken = Cookies.get('authToken');
    if (!authToken) {
      // Redirect to the login page if not authenticated
      navigate('/login');
    } else {
      const userId = extractUserIdFromToken(authToken);
      dispatch(fetchUserById({ userId, authToken }));
    }

    if(pathname=='/'){
      navigate('/dashboard')
    }
  }, [pathname]); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  return (
    <Box minH="100vh" bg={useColorModeValue('#F9FBFC', 'gray.900')}>
      <Sidebar onClose={onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="6">
        <Outlet /> {/* This renders nested child routes */}
      </Box>
    </Box>
  );
}

export default Dashboard;
