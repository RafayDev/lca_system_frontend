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
import { Check } from "lucide-react";
const AssignCourses = ({ batchId }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const toast = useToast();
  const [courses, setCourses] = useState([]);
  const [assignedCourses, setAssignedCourses] = useState([]);

  const getCourses = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(`${BASE_URL}/courses`, config)
      .then((response) => {
        console.log(response.data);
        setCourses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const formik = useFormik({
    initialValues: {
      courses: assignedCourses,
    },
    validationSchema: Yup.object({
      courses: Yup.array().required("Required"),
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
          courseIds: values.courses,
        };
        const response = await axios.post(
          `${BASE_URL}/batches/assignCourses`,
          body,
          config
        );
        if (response.status === 200) {
          toast({
            title: "Courses assigned successfully",
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
  const getAssignedCourses = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(`${BASE_URL}/batches/courses/${batchId}`, config)
      .then((response) => {
        console.log("assigned courses", response.data);
        const assignedCourseIds = response.data.map((course) => course._id);
        setAssignedCourses(assignedCourseIds); // Update assignedCourses state
        formik.setFieldValue("courses", assignedCourseIds);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getCourses();
    getAssignedCourses();
  }, []);
  return (
    <>
      <button
        className="hover:bg-[#7AEF85] hover:text-[#257947] font-medium p-[10px] rounded-xl transition-colors duration-300 flex flex-nowrap items-center gap-1.5 pr-3"
        onClick={onOpen}
      >
        <Check size={18} />
        <span>Courses</span>
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-xl font-semibold">
            Assign Courses to Batch
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              {/* courses name list with checkbox */}
              <div>
                {courses.map((course) => (
                  <div
                    key={course._id}
                    className="flex items-center justify-between"
                  >
                    <label htmlFor={course._id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={course._id}
                        name="courses"
                        value={course._id}
                        onChange={formik.handleChange}
                        className="mr-2"
                        checked={formik.values.courses.includes(course._id)}
                      />
                      {course.name}
                    </label>
                  </div>
                ))}
              </div>
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
                backgroundColor={"#7AEF85"}
                color={"#257947"}
                _hover={{
                  backgroundColor: "#65C76E",
                  color: "#184E2E",
                }}
                fontWeight={"500"}
                type="submit"
              >
                Assign
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AssignCourses;
