import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalFooter,
  Select,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  fetchTimeTableEvents,
  updateTimeTableEvent,
} from "../Features/timetableSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

function TimeTableEventEditForm({
  event,
  teachers,
  courses,
  batches,
  onClose,
}) {
  const [authToken, setAuthToken] = useState(Cookies.get("authToken") || sessionStorage.getItem("authToken"));
  const { updateStatus } = useSelector((state) => state.timetable);
  const dispatch = useDispatch();

  const [selectedBatch, setSelectedBatch] = useState(batches.find((batch) => batch._id === event.batch._id));

  const batchChangeHandler = (e) => {
    formik.handleChange(e);
    setSelectedBatch(batches.find((batch) => batch._id === e.target.value));
  };

  const formik = useFormik({
    initialValues: {
      day: event.day,
      start_time: event.start_time,
      end_time: event.end_time,
      teacher: event.teacher._id,
      course: event.course._id,
      batch: event.batch._id,
    },
    validationSchema: Yup.object({
      day: Yup.string().required("Required"),
      start_time: Yup.string().required("Required"),
      end_time: Yup.string().required("Required"),
      teacher: Yup.string().required("Required"),
      course: Yup.string().required("Required"),
      batch: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      dispatch(
        updateTimeTableEvent({
          authToken,
          timeTable: { ...values, _id: event._id },
        })
      )
        .unwrap()
        .then(() => {
          onClose();
          window.location.reload();
        });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <ModalBody className="!p-0">
          <VStack spacing={4}>
            <FormControl id="day">
              <FormLabel fontSize={14}>Day</FormLabel>
              <Input
                type="date"
                name="day"
                borderRadius={"0.5rem"}
                value={formik.values.day}
                onChange={formik.handleChange}
              />
              {formik.touched.day && formik.errors.day ? (
                <Box color="red" fontSize="sm">
                  {formik.errors.day}
                </Box>
              ) : null}
            </FormControl>
            <FormControl id="start_time">
              <FormLabel fontSize={14}>Start Time</FormLabel>
              <Input
                type="time"
                name="start_time"
                borderRadius={"0.5rem"}
                value={formik.values.start_time}
                onChange={formik.handleChange}
              />
              {formik.touched.start_time && formik.errors.start_time ? (
                <Box color="red" fontSize="sm">
                  {formik.errors.start_time}
                </Box>
              ) : null}
            </FormControl>
            <FormControl id="end_time">
              <FormLabel fontSize={14}>End Time</FormLabel>
              <Input
                type="time"
                name="end_time"
                borderRadius={"0.5rem"}
                value={formik.values.end_time}
                onChange={formik.handleChange}
              />
              {formik.touched.end_time && formik.errors.end_time ? (
                <Box color="red" fontSize="sm">
                  {formik.errors.end_time}
                </Box>
              ) : null}
            </FormControl>
            <FormControl id="batch">
              <FormLabel fontSize={14}>Batch</FormLabel>
              <Select
                placeholder="Select Batch"
                name="batch"
                borderRadius={"0.5rem"}
                value={formik.values.batch}
                onChange={batchChangeHandler}
              >
                {batches.map((batch) => (
                  <option key={batch._id} value={batch._id}>
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
            <FormControl id="course">
              <FormLabel fontSize={14}>Course</FormLabel>
              <Select
                placeholder="Select Course"
                name="course"
                borderRadius={"0.5rem"}
                value={formik.values.course}
                onChange={formik.handleChange}
              >
                {selectedBatch.courses?.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </Select>
              {formik.touched.course && formik.errors.course ? (
                <Box color="red" fontSize="sm">
                  {formik.errors.course}
                </Box>
              ) : null}
            </FormControl>
            <FormControl id="teacher">
              <FormLabel fontSize={14}>Teacher</FormLabel>
              <Select
                placeholder="Select Teacher"
                name="teacher"
                borderRadius={"0.5rem"}
                value={formik.values.teacher}
                onChange={formik.handleChange}
              >
                {selectedBatch.teachers?.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.name}
                  </option>
                ))}
              </Select>
              {formik.touched.teacher && formik.errors.teacher ? (
                <Box color="red" fontSize="sm">
                  {formik.errors.teacher}
                </Box>
              ) : null}
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter className="!px-0 !pb-0">
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
            loadingText="Saving"
            isLoading={updateStatus === "loading"}
          >
            Save
          </Button>
        </ModalFooter>
      </form>
    </>
  );
}

export default TimeTableEventEditForm;
