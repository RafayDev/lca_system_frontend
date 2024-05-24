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
  useToast,
  Checkbox,
  CheckboxGroup,
  VStack
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as Yup from "yup";

const AssignPermissions = ({ roleId }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const toast = useToast();
  const [permissions, setPermissions] = useState([]);
  const [assignedPermissions, setAssignedPermissions] = useState([]);

  const getPermissions = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(`${BASE_URL}/permissions`, config)
      .then((response) => {
        setPermissions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAssignedPermissions = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(`${BASE_URL}/roles/permissions/${roleId}`, config)
      .then((response) => {
        const assignedPermissionsIds = response.data.map((permission) => permission._id);
        setAssignedPermissions(assignedPermissionsIds);
        formik.setFieldValue("permissions", assignedPermissionsIds);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (authToken) {
      getPermissions();
      getAssignedPermissions();
    }
  }, [authToken]);

  const formik = useFormik({
    initialValues: {
      permissions: assignedPermissions,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      permissions: Yup.array().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };
        const body = {
          roleId: roleId,
          permissionIds: values.permissions,
        };
        const response = await axios.post(
          `${BASE_URL}/roles/assignPermissions`,
          body,
          config
        );
        if (response.status === 200) {
          toast({
            title: "Permissions assigned successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          onClose();
        } else {
          throw new Error("Failed to assign permissions");
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Failed to assign permissions",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
  });

  return (
    <>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-2"
        onClick={onOpen}
      >
        Assign Permissions
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Assign Permissions to Role</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              <VStack align="start">
                {permissions.map((permission) => (
                  <Checkbox
                    key={permission._id}
                    id={permission._id}
                    name="permissions"
                    value={permission._id}
                    onChange={formik.handleChange}
                    isChecked={formik.values.permissions.includes(permission._id)}
                  >
                    {permission.name}
                  </Checkbox>
                ))}
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="yellow" type="submit">
                Assign
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AssignPermissions;