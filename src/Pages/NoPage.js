import React from 'react';
import { ChakraProvider, Box, Heading, Text, Button, Image } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NoPage = () => {
  return (
    <ChakraProvider>
      <Box textAlign="center" p="8">
        <Heading as="h1" size="xl" mb="4">
          Oops! Page Not Found
        </Heading>
        <Text fontSize="lg" mb="8">
          The page you're looking for might have been removed or doesn't exist.
        </Text>
        <Image src="/404-image.jpg" alt="404 image" maxW="400px" mx="auto" mb="8" />
        <Button as={RouterLink} to="/" colorScheme='teal' size="lg">
          Go Back Home
        </Button>
      </Box>
    </ChakraProvider>
  );
};

export default NoPage;
