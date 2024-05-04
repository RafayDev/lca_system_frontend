import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Box,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";

function AddModel({ isOpen, onClose, getBatchs }) {
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
  const toast = useToast();
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values) => {
      // console.log(values)
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };
        const response = await axios.post(
          `${BASE_URL}/batchs/add`,
          values,
          config
        );
        if (response.status === 200) {
          toast({
            title: "Batch added successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          getBatchs();
          onClose();
        } else {
          // Handle other status codes if needed
          toast({
            title: "Error",
            description: "An error occurred while adding the batch",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        // Handle network errors or server errors
        if (error.response) {
          toast({
            title: "Error",
            description: error.response.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    },
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Batch</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name ? (
                  <Box color="red" fontSize="sm">
                    {formik.errors.name}
                  </Box>
                ) : null}
              </FormControl>
              <FormControl id="description">
                <FormLabel>Description</FormLabel>
                <Input
                  type="description"
                  name="description"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email ? (
                  <Box color="red" fontSize="sm">
                    {formik.errors.email}
                  </Box>
                ) : null}
              </FormControl>
              
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="cyan" color={"white"} type="submit">
              Add
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default AddModel;
