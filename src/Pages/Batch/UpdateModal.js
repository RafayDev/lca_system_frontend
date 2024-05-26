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
import { Pen } from "lucide-react";

function AddModel({ batch, getbatchs }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
  const toast = useToast();
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const formik = useFormik({
    initialValues: {
      name: batch.name,
      description: batch.description,
      startdate: batch.startdate,
      enddate: batch.enddate,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      startdate: Yup.string().required("Required"),
      enddate: Yup.string().required("Required"),
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
          `${BASE_URL}/batches/update/${batch._id}`,
          values,
          config
        );
        if (response.status === 200) {
          toast({
            title: "batch added successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          getbatchs();
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
    <>
      <button
        className="hover:bg-[#FFCB82] hover:text-[#85652D] font-medium p-[10px] rounded-xl transition-colors duration-300"
        onClick={onOpen}
      >
        <Pen size={18} />
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-xl font-semibold">
            Update batch
          </ModalHeader>
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
                <FormControl id="description">
                  <FormLabel fontSize={14}>Description</FormLabel>
                  <Input
                    type="description"
                    name="description"
                    borderRadius={"0.5rem"}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <Box color="red" fontSize="sm">
                      {formik.errors.description}
                    </Box>
                  ) : null}
                </FormControl>
                <FormControl id="startdate">
                  <FormLabel fontSize={14}>Start Date</FormLabel>
                  <Input
                    placeholder="Select Start Date"
                    size="md"
                    type="date"
                    borderRadius={"0.5rem"}
                    value={formik.values.startdate}
                    onChange={(e) =>
                      formik.setFieldValue("startdate", e.target.value)
                    }
                  />
                  {formik.touched.startdate && formik.errors.startdate ? (
                    <Box color="red" fontSize="sm">
                      {formik.errors.startdate}
                    </Box>
                  ) : null}
                </FormControl>

                <FormControl id="enddate">
                  <FormLabel fontSize={14}>End Date</FormLabel>
                  <Input
                    placeholder="Select End Date"
                    size="md"
                    type="date"
                    borderRadius={"0.5rem"}
                    value={formik.values.enddate}
                    onChange={(e) =>
                      formik.setFieldValue("enddate", e.target.value)
                    }
                  />
                  {formik.touched.enddate && formik.errors.enddate ? (
                    <Box color="red" fontSize="sm">
                      {formik.errors.enddate}
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
                backgroundColor={"#82B4FF"}
                color={"#2D4185"}
                _hover={{
                  backgroundColor: "#74A0E3",
                  color: "#223163",
                }}
                fontWeight={"500"}
                type="submit"
              >
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
