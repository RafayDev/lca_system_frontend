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
  Select,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../../Features/userSlice";

function AddModel({ isOpen, onClose }) {
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));

  const { addStatus } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      role: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      dispatch(addUser({ formData: values, authToken }))
        .unwrap()
        .then(() => {
          onClose();
          dispatch(fetchUsers({ authToken }));
        });
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="text-xl font-semibold">Add User</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl id="name">
                <FormLabel fontSize={14}>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  borderRadius={"0.5rem"}
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
                <FormLabel fontSize={14}>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  borderRadius={"0.5rem"}
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
                <FormLabel fontSize={14}>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  borderRadius={"0.5rem"}
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
                <FormLabel fontSize={14}>Role</FormLabel>
                <Select
                  placeholder="Select Role"
                  borderRadius={"0.5rem"}
                  name="role"
                  onChange={formik.handleChange}
                >
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
            <Button
              variant="ghost"
              mr={3}
              borderRadius={"0.75rem"}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              borderRadius={"0.75rem"}
              backgroundColor={"#FFCB82"}
              color={"#85652D"}
              _hover={{
                backgroundColor: "#E3B574",
                color: "#654E26",
              }}
              fontWeight={"500"}
              type="submit"
              loadingText="Adding"
              isLoading={addStatus === "loading"}
            >
              Add
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default AddModel;
