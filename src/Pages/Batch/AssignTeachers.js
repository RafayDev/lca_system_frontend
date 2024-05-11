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
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as Yup from "yup";
import Batch from "./Batch";
const AssignTeachers = ({ batchId }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const toast = useToast();
  const [teachers, setTeachers] = useState([]);
  const [assignedTeachers, setAssignedTeachers] = useState([]);

  const getTeachers = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(`${BASE_URL}/teachers`, config)
      .then((response) => {
        console.log(response.data);
        setTeachers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const formik = useFormik({
    initialValues: {
      teachers: assignedTeachers,
    },
    validationSchema: Yup.object({
      teachers: Yup.array().required("Required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };
        const body = {
          batchId: batchId,
          teacherIds: values.teachers,
        };
        const response = await axios.post(
          `${BASE_URL}/batches/assignTeachers`,
          body,
          config
        );
        if (response.status === 200) {
          toast({
            title: "Teachers assigned successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  const getAssignedTeachers = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(`${BASE_URL}/batches/teachers/${batchId}`, config)
      .then((response) => {
        console.log("assigned teachers", response.data);
        const assignedTeacherIds = response.data.map((teacher) => teacher._id);
        setAssignedTeachers(assignedTeacherIds); // Update assignedCourses state
        formik.setFieldValue("teachers", assignedTeacherIds);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getTeachers();
    getAssignedTeachers();
  }, []);
  return (
    <>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-2"
        onClick={onOpen}
      >
        Assign Teachers
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Assign Teachers to Batch</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              {/* courses name list with checkbox */}
              <div>
                {teachers.map((teacher) => (
                  <div
                    key={teacher._id}
                    className="flex items-center justify-between"
                  >
                    <label htmlFor={teacher._id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={teacher._id}
                        name="teachers"
                        value={teacher._id}
                        onChange={formik.handleChange}
                        className="mr-2"
                        checked={formik.values.teachers.includes(teacher._id)}
                      />
                      {teacher.name}
                    </label>
                  </div>
                ))}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="cyan" color={"white"} type="submit">
                Assign
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AssignTeachers;
