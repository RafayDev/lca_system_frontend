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

function AddModel({ teacher, getTeachers }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
  const toast = useToast();
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const formik = useFormik({
    initialValues: {
      name: teacher.name,
      email: teacher.email,
      phone: teacher.phone,
      // role: teacher.role,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phone: Yup.string().required("Required"),
      // role: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      // console.log(values)
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        };
        const response = await axios.post(
          `${BASE_URL}/teachers/update/${teacher._id}`,
          values,
          config
        );
        if (response.status === 200) {
          toast({
            title: "Teacher added successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          getTeachers();
          setIsOpen(false);
        } else {
          // Handle other status codes if needed
          toast({
            title: "Error",
            description: "An error occurred while adding the teacher",
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
    <>
      <button
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded"
        onClick={onOpen}
      >
        Edit
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Teacher</ModalHeader>
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
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <Box color="red" fontSize="sm">
                      {formik.errors.email}
                    </Box>
                  ) : null}
                </FormControl>
                <FormControl id="phone">
                  <FormLabel>Phone</FormLabel>
                  <Input
                    type="phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.password && formik.errors.phone ? (
                    <Box color="red" fontSize="sm">
                      {formik.errors.phone}
                    </Box>
                  ) : null}
                </FormControl>
                <FormControl id="image">
                  <FormLabel>Image</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={(e) =>
                      formik.setFieldValue("image", e.target.files[0])
                    }
                  />
                </FormControl>
                <FormControl id="resume">
                  <FormLabel>Resume</FormLabel>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    name="resume"
                    onChange={(e) =>
                      formik.setFieldValue("resume", e.target.files[0])
                    }
                  />
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="cyan" color={"white"} type="submit">
                Update
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddModel;