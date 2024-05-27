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
  Spinner
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Check } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { assignCoursesToBatch, fetchBatchCourses, selectBatchCourses } from "../../Features/batchSlice";
import { fetchCourses, selectAllCourses } from "../../Features/courseSlice";

const AssignCoursesModal = ({ batchId }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));

  const { assignCoursesStatus } = useSelector((state) => state.batches);
  const { status } = useSelector((state) => state.courses);
  const batchCourses = useSelector(selectBatchCourses);
  const courses = useSelector(selectAllCourses);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      courses: batchCourses,
    },
    validationSchema: Yup.object({
      courses: Yup.array().required("Required"),
    }),
    onSubmit: async (values) => {
      dispatch(assignCoursesToBatch({ authToken, batchId, courseIds: values.courses }))
        .unwrap()
        .then(() => {
          onClose();
        });
    },
  });

  useEffect(() => {
    dispatch(fetchCourses({ authToken }));
    dispatch(fetchBatchCourses({ authToken, batchId }))
      .unwrap()
      .then((data) => {
        const courseIds = data.map((course) => course._id);
        formik.setFieldValue("courses", courseIds);
      });
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
                {status === "loading" && <Spinner />}
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
                loadingText="Assigning"
                isLoading={assignCoursesStatus === "loading"}
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

export default AssignCoursesModal;
