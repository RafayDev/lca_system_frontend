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
  Box
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { Pen } from "lucide-react";
import { updateRole, fetchRoles } from "../../Features/roleSlice";
import { useDispatch, useSelector } from "react-redux";

function AddModel({ role }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const [authToken, setAuthToken] = useState(Cookies.get("authToken") || sessionStorage.getItem("authToken"));

  const { updateStatus } = useSelector((state) => state.roles);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: role.name,
      description: role.description,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      // email: Yup.string().email("Invalid email address").required("Required"),
      //   password: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      dispatch(updateRole({ authToken, role: values, id: role._id }))
        .unwrap()
        .then((data) => {
          onClose();
          dispatch(fetchRoles({ authToken }));
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
            Update Role
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
