import React, { useEffect } from 'react';
import { Button, FormControl, FormLabel, Input, VStack, Box, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Login = () => {
  const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if authToken is present in cookies
    const authToken = Cookies.get('authToken');
    if (authToken) {
      // Redirect to dashboard or the page the user came from
      navigate('/dashboard');
    }
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${BASE_URL}/users/login`, values);
        if (response.status === 200) {
          // Login successful
          toast({
            title: 'Logged in',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          // Save authToken to cookies securely
          const authToken = response.data.authToken;
          const permissions = response.data.permissions;
          Cookies.set('authToken', authToken, { expires: 7, secure: true }); // Expires in 7 days and secure flag set to true
          sessionStorage.setItem('authToken', authToken);
          sessionStorage.setItem('permissions', permissions);
          // Redirect to dashboard with react router
          navigate('/dashboard');
        } else {
          // Handle other status codes if needed
          toast({
            title: 'Error',
            description: 'An error occurred during login',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        // Handle network errors or server errors
        toast({
          title: 'Error',
          description: 'An error occurred during login',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    },
  });

  return (
    <Box bgGradient="linear(to-b, #43B8AA, white)" minHeight="100vh">
      <VStack spacing={6} align="stretch" width="100%" maxW="400px" margin="auto" paddingX="4">
        <Box textAlign="center" fontSize="2xl" fontWeight="bold" paddingTop="50px" marginTop="100px">
          Welcome to LCA System
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="email" isInvalid={formik.touched.email && formik.errors.email}>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              borderColor="black"
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email ? (
              <Box color="red" fontSize="sm">
                {formik.errors.email}
              </Box>
            ) : null}
          </FormControl>
          <FormControl id="password" isInvalid={formik.touched.password && formik.errors.password} marginTop="10px">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              borderColor="black"
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password ? (
              <Box color="red" fontSize="sm">
                {formik.errors.password}
              </Box>
            ) : null}
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full" mt="4">
            Sign in
          </Button>
        </form>
      </VStack>
    </Box>
  );
};

export default Login;
