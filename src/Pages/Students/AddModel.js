import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";
import { selectAllBatches } from "../../Features/batchSlice";

function AddStudnet({ isOpen, onClose, getStudnets }) {
  const batches = useSelector(selectAllBatches);
  
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
  const toast = useToast();
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phone: Yup.string().required("Required"),
      paid_fee: Yup.number().required("Required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("total_fee", values.total_fee);
      formData.append("pending_fee", values.pending_fee);
      formData.append("paid_fee", values.paid_fee);
      formData.append("batch", values.batch);

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        };
        const response = await axios.post(
          `${BASE_URL}/students/add`,
          formData,
          config
        );
        if (response.status === 200) {
          toast({
            title: "Studnet added successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          getStudnets();
          onClose();
        } else {
          toast({
            title: "Error",
            description: "An error occurred while adding the student",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
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
      {/* <Button onClick={onOpen}>Add Studnet</Button> */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-xl font-semibold">Add Studnet</ModalHeader>
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
                <FormControl id="phone">
                  <FormLabel fontSize={14}>Phone</FormLabel>
                  <Input
                    type="phone"
                    name="phone"
                    borderRadius={"0.5rem"}
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <Box color="red" fontSize="sm">
                      {formik.errors.phone}
                    </Box>
                  ) : null}
                </FormControl>
                <FormControl id="paid_fee">
                  <FormLabel fontSize={14}>Paid Fee</FormLabel>
                  <Input
                    type="number"
                    name="paid_fee"
                    borderRadius={"0.5rem"}
                    value={formik.values.paid_fee}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.paid_fee && formik.errors.paid_fee ? (
                    <Box color="red" fontSize="sm">
                      {formik.errors.paid_fee}
                    </Box>
                  ) : null}
                </FormControl>
              <FormControl id="batch">
                <FormLabel fontSize={14}>Batch</FormLabel>
                <Select placeholder="Select Batch" name="batch" borderRadius={"0.5rem"} onChange={formik.handleChange} value={formik.values.batch}>
                  {batches.map((batch) => (
                    <option key={batch._id} value={batch._id}>
                      {batch.name}
                    </option>
                  ))}
                </Select>
                {formik.touched.batch && formik.errors.batch ? (
                  <Box color="red" fontSize="sm">
                    {formik.errors.batch}
                  </Box>
                ) : null}
              </FormControl>
                
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} borderRadius={"0.75rem"} onClick={onClose}>
                Close
              </Button>
              <Button borderRadius={"0.75rem"} backgroundColor={"#FFCB82"} color={"#85652D"} _hover={{
              backgroundColor: "#E3B574",
              color: "#654E26",
            }} fontWeight={"500"} type="submit">
                Add Studnet
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddStudnet;
