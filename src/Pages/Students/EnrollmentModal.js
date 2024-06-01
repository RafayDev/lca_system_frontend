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
  Spinner,
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Check } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourses } from "../../Features/courseSlice";
import { fetchStudentEnrollments, createEnrollment } from "../../Features/enrollmentSlice";

const EnrollmentModal = ({ studentId }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));

  const courses = useSelector((state) => state.courses.courses);
  const studentEnrollments = useSelector((state) => state.enrollments.studentEnrollments);
  const { fetchStudentEnrollmentsStatus, createEnrollmentStatus } = useSelector((state) => state.enrollments);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(fetchStudentEnrollments({ authToken, studentId }))
      .unwrap()
      .then((data) => {
        const enrolledCourseIds = data?.courses || [];
        formik.setFieldValue("courses", enrolledCourseIds);
      });
    onOpen();
  };

  useEffect(() => {
    dispatch(fetchCourses({ authToken }));
  }, []);

  const formik = useFormik({
    initialValues: {
      courses: studentEnrollments?.courses || [],
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      courses: Yup.array().required("Required"),
    }),
    onSubmit: async (values) => {
      dispatch(createEnrollment({ authToken, studentId, courseIds: values.courses }))
        .unwrap()
        .then((data) => {
          onClose();
          dispatch(fetchStudentEnrollments({ authToken, studentId }));
        });
    },
  });

  return (
    <>
      <button
        className="hover:bg-[#7AEF85] hover:text-[#257947] font-medium p-[10px] rounded-xl transition-colors duration-300 flex flex-nowrap items-center gap-1.5 pr-3"
        onClick={handleOpenModal}
      >
        <Check size={18} />
        <span>Enrollments</span>
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-xl font-semibold">
            Student Course Enrollment Management
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              <VStack align="start">
                {fetchStudentEnrollmentsStatus === "loading" ? (
                  <Spinner />
                ) : (
                  courses.map((course) => (
                    <Checkbox
                      key={course._id}
                      id={course._id}
                      name="courses"
                      value={course._id}
                      onChange={formik.handleChange}
                      isChecked={formik.values.courses?.includes(
                        course._id
                      )}
                    >
                      {course.name}
                    </Checkbox>
                  ))
                )}
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
                backgroundColor={"#7AEF85"}
                color={"#257947"}
                _hover={{
                  backgroundColor: "#65C76E",
                  color: "#184E2E",
                }}
                fontWeight={"500"}
                type="submit"
                loadingText="Assigning"
                isLoading={createEnrollmentStatus === "loading"}
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EnrollmentModal;
