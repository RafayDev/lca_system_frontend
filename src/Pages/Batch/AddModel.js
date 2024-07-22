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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { fetchBatches, addBatch } from "../../Features/batchSlice";

function AddModel({ isOpen, onClose }) {
  const [authToken, setAuthToken] = useState(Cookies.get("authToken") || sessionStorage.getItem("authToken"));
  const { addStatus } = useSelector((state) => state.batches);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      batch_type: "",
      startdate: "",
      enddate: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      startdate: Yup.string().required("Required"),
      enddate: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      dispatch(addBatch({ authToken, values }))
        .unwrap()
        .then(() => {
          onClose();
          dispatch(fetchBatches({ authToken }));
        });
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="text-xl font-semibold">Add Batch</ModalHeader>
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

              <FormControl id="batch_type">
                <FormLabel fontSize={14}>Batch Type</FormLabel>
                <Input
                  type="text"
                  name="batch_type"
                  borderRadius={"0.5rem"}
                  value={formik.values.batch_type}
                  onChange={formik.handleChange}
                />
                {formik.touched.batch_type && formik.errors.batch_type ? (
                  <Box color="red" fontSize="sm">
                    {formik.errors.batch_type}
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
