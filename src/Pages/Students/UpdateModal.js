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
import { useSelector } from "react-redux";
import { selectAllBatches } from "../../Features/batchSlice.js";
import { Pen } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateStudent, fetchStudents } from "../../Features/studentSlice";

function AddModel({ student }) {
  const batches = useSelector(selectAllBatches);

  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));

  const { updateStatus } = useSelector((state) => state.students);
  const dispatch = useDispatch();
  
  const formik = useFormik({
    initialValues: {
      name: student.name,
      email: student.email,
      phone: student.phone,
      batch: student.batch,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phone: Yup.string().required("Required"),
      batch: Yup.string().required("Required"),
      // role: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      dispatch(updateStudent({ authToken, student: values }))
        .unwrap()
        .then(() => {
          dispatch(fetchStudents({ authToken }));
          onClose();
        });
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
            Update Student
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
                  {formik.touched.password && formik.errors.phone ? (
                    <Box color="red" fontSize="sm">
                      {formik.errors.phone}
                    </Box>
                  ) : null}
                </FormControl>
                <FormControl id="batch">
                  <FormLabel fontSize={14}>Batch</FormLabel>
                  <Select
                    placeholder="Select Batch"
                    name="batch"
                    borderRadius={"0.5rem"}
                    onChange={formik.handleChange}
                    value={formik.values.batch}
                  >
                    {batches.map((batch) => (
                      <option
                        key={batch._id}
                        value={batch._id}
                        selected={batch._id === student.batch}
                      >
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
                isDisabled={true}
                loadingText="Updating"
                isLoading={updateStatus === "loading"}
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
