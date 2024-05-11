import React,{useState}from "react";
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

function AddModel({ user, getUsers }) {
 const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000"; 
  const toast = useToast();
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    //   password: Yup.string().required("Required"),
      role: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
        // console.log(values)
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          };
          const response = await axios.post(`${BASE_URL}/users/update/${user._id}`, values, config);
          if (response.status === 200) {
            toast({
              title: "User added successfully",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            getUsers();
            onClose();
          } else {
            // Handle other status codes if needed
            toast({
              title: "Error",
              description: "An error occurred while adding the user",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        } catch (error) {
          // Handle network errors or server errors
          if(error.response){
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
    <><button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={onOpen}>
    Edit
  </button>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update User</ModalHeader>
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
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password ? (
                  <Box color="red" fontSize="sm">
                    {formik.errors.password}
                  </Box>
                ) : null}
              </FormControl>
              <FormControl id="role">
                <FormLabel>Role</FormLabel>
                <Select placeholder="Select Role" name="role" onChange={formik.handleChange} value={formik.values.role}>
                  <option value="admin">Admin</option>
                  <option value="user">User </option>
                </Select>
                {formik.touched.role && formik.errors.role ? (
                  <Box color="red" fontSize="sm">
                    {formik.errors.role}
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
