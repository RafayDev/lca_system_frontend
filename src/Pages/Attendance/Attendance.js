import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { selectAttendances } from "../../Features/attendanceSlice";
import { FileX, FilterX } from "lucide-react";
import {
  fetchAttendances,
  setLimitFilter,
  setPageFilter,
  setQueryFilter,
} from "../../Features/attendanceSlice";
import { fetchBatches, selectAllBatches } from "../../Features/batchSlice";
import { fetchCourses, selectAllCourses } from "../../Features/courseSlice";
import TableSearch from "../../Components/TableSearch";
import TableRowLoading from "../../Components/TableRowLoading";
import TablePagination from "../../Components/TablePagination";

function Attendance() {
  const tableSearchRef = useRef();

  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const [selectedBatch, setSelectedBatch] = useState("");

  const [formCourse, setFormCourse] = useState("");
  const [formBatch, setFormBatch] = useState("");
  const [formDate, setFormDate] = useState("");

  const attendances = useSelector(selectAttendances);
  const batches = useSelector(selectAllBatches);
  const { status, pagination } = useSelector((state) => state.attendance);
  const dispatch = useDispatch();

  const handleFormBatchChange = (e) => {
    setFormCourse("");
    setFormDate("");
    setFormBatch(e.target.value);
    setSelectedBatch(batches.find((batch) => batch._id === e.target.value));
    dispatch(
      fetchAttendances({
        authToken,
        course_id: formCourse,
        batch_id: e.target.value,
        date: formDate,
      })
    );
  };

  const handleFormCourseChange = (e) => {
    setFormCourse(e.target.value);
    dispatch(
      fetchAttendances({
        authToken,
        course_id: e.target.value,
        batch_id: formBatch,
        date: formDate,
      })
    );
  };

  const handleFormDateChange = (e) => {
    setFormDate(e.target.value);
    dispatch(
      fetchAttendances({
        authToken,
        course_id: formCourse,
        batch_id: formBatch,
        date: e.target.value,
      })
    );
  };

  const handleClearFilters = () => {
    tableSearchRef.current.clearSearch();
    setFormCourse("");
    setFormBatch("");
    setFormDate("");
    dispatch(
      fetchAttendances({
        authToken,
        course_id: "",
        batch_id: "",
        date: "",
      })
    );
  };

  useEffect(() => {
    dispatch(fetchBatches({ authToken }));
    dispatch(
      fetchAttendances({
        authToken,
        course_id: formCourse,
        batch_id: formBatch,
        date: formDate,
      })
    );
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold ml-6 text-nowrap">Attendance</h1>
        <div className="w-full flex justify-end gap-3">
          <div>
            <TableSearch
              ref={tableSearchRef}
              setQueryFilter={setQueryFilter}
              method={fetchAttendances}
            />
          </div>
          <HStack spacing={3}>
            <FormControl>
              <Select
                placeholder="Select Batch"
                w={48}
                size={"lg"}
                borderRadius="xl"
                value={formBatch}
                onChange={(e) => handleFormBatchChange(e)}
              >
                {batches.map((batch) => (
                  <option key={batch._id} value={batch._id}>
                    {batch.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            {selectedBatch && selectedBatch.courses.length > 0 && (
              <FormControl>
                <Select
                  placeholder="Select Course"
                  w={48}
                  size={"lg"}
                  borderRadius="xl"
                  value={formCourse}
                  onChange={(e) => handleFormCourseChange(e)}
                >
                  {selectedBatch?.courses?.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}
            <FormControl>
              <Input
                type="date"
                w={48}
                size={"lg"}
                borderRadius="xl"
                value={formDate}
                onChange={(e) => handleFormDateChange(e)}
              />
            </FormControl>
            <Button
              size="icon"
              p={4}
              borderRadius="xl"
              onClick={(e) => handleClearFilters(e)}
            >
              <FilterX className="h-4 w-4" />
            </Button>
          </HStack>
        </div>
      </div>
      <div className="w-full bg-white mt-3 rounded-xl border border-[#E0E8EC]">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Date</Th>
                <Th data-searchable>Student Name</Th>
                <Th>Batch</Th>
                <Th>Course</Th>
                <Th>Sttendance Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {status == "loading" ? (
                <TableRowLoading nOfColumns={6} actions={[]} />
              ) : attendances.length === 0 ? (
                <Tr>
                  <Td colSpan={6}>
                    <span className="flex justify-center items-center gap-2 text-[#A1A1A1]">
                      <FileX />
                      No attendance record found
                    </span>
                  </Td>
                </Tr>
              ) : (
                attendances.map((attendance) => (
                  <Tr key={attendance._id}>
                    <Td>{attendances.indexOf(attendance) + 1}</Td>
                    <Td>{attendance.date}</Td>
                    <Td>{attendance.student.name}</Td>
                    <Td>{attendance.batch.name}</Td>
                    <Td>{attendance.course.name}</Td>
                    <Td>
                      <div className="bg-[#7AEF85] text-[#257947] font-medium p-[10px] rounded-xl transition-colors duration-300 flex flex-nowrap items-center gap-1.5 px-5 max-w-min">
                        Present
                      </div>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      {status === "succeeded" && (
        <TablePagination
          pagination={pagination}
          setLimitFilter={setLimitFilter}
          setPageFilter={setPageFilter}
          method={fetchAttendances}
        />
      )}
    </>
  );
}

export default Attendance;
