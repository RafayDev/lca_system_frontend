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
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers, selectAllTeachers } from "../../Features/teacherSlice";
import {
  assignTeachersToBatch,
  fetchBatchTeachers,
  fetchBatches,
  selectBatchTeachers,
} from "../../Features/batchSlice";

const AssignTeachersModal = ({ batchId }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));

  const { assignTeachersStatus, fetchBatchTeachersStatus } = useSelector(
    (state) => state.batches
  );
  const batchTeachers = useSelector(selectBatchTeachers);
  const teachers = useSelector(selectAllTeachers);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      teachers: batchTeachers,
    },
    validationSchema: Yup.object({
      teachers: Yup.array().required("Required"),
    }),
    onSubmit: async (values) => {
      dispatch(
        assignTeachersToBatch({
          authToken,
          batchId,
          teacherIds: values.teachers,
        })
      )
        .unwrap()
        .then(() => {
          onClose();
          dispatch(fetchBatches({ authToken }));
        });
    },
  });

  const handleOpenModal = () => {
    dispatch(fetchBatchTeachers({ authToken, batchId }))
      .unwrap()
      .then((data) => {
        const teacherIds = data.map((teacher) => teacher._id);
        formik.setFieldValue("teachers", teacherIds);
      });
    onOpen();
  };

  useEffect(() => {
    dispatch(fetchTeachers({ authToken }));
  }, []);
  return (
    <>
      <button
        className="hover:bg-[#7AEF85] hover:text-[#257947] font-medium p-[10px] rounded-xl transition-colors duration-300 flex flex-nowrap items-center gap-1.5 pr-3"
        onClick={handleOpenModal}
      >
        <Check size={18} />
        <span>Teachers</span>
      </button>

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-xl font-semibold">
            Assign Teachers to Batch
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody>
              {/* courses name list with checkbox */}
              <div>
                {fetchBatchTeachersStatus === "loading" ? (
                  <Spinner />
                ) : (
                  <VStack spacing={2} align="stretch" w="full" maxH="60vh" overflowY="auto">
                    {teachers.map((teacher) => (
                      <Checkbox
                        key={teacher._id}
                        colorScheme="green"
                        py={2}
                        px={3}
                        borderWidth="1px"
                        className="flex-1"
                        rounded="md"
                        type="checkbox"
                        id={teacher._id}
                        name="teachers"
                        value={teacher._id}
                        onChange={formik.handleChange}
                        isChecked={formik.values.teachers.includes(teacher._id)}
                        borderColor={
                          formik.values.teachers.includes(teacher._id)
                            ? "#7AEF85"
                            : "#CBD5E0"
                        }
                      >
                        {teacher.name}
                      </Checkbox>
                    ))}
                  </VStack>
                )}
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
                isLoading={assignTeachersStatus === "loading"}
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

export default AssignTeachersModal;
