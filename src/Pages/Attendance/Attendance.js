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
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { selectAttendances } from "../../Features/attendanceSlice";
import { Box, FileX } from "lucide-react";
import { fetchAttendances } from "../../Features/attendanceSlice";
import { fetchBatches, selectAllBatches, setQueryFilter } from "../../Features/batchSlice";
import { fetchCourses, selectAllCourses } from "../../Features/courseSlice";
import TableSearch from "../../Components/TableSearch";
import TableRowLoading from "../../Components/TableRowLoading";

function Attendance() {
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const [selectedBatch, setSelectedBatch] = useState("");

  const [formCourse, setFormCourse] = useState("");
  const [formBatch, setFormBatch] = useState("");
  const [formDate, setFormDate] = useState("");

  const attendances = useSelector(selectAttendances);
  const batches = useSelector(selectAllBatches);
  const { status } = useSelector((state) => state.attendance);
  const dispatch = useDispatch();

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
        <h1 className="text-xl font-semibold ml-6 text-nowrap">Attendance <span className="text-red-500 uppercase">[This Page is under development]</span></h1>
        <div className="w-full flex justify-end gap-3">
          <div>
            <TableSearch setQueryFilter={setQueryFilter} method={fetchAttendances} />
          </div>
          <HStack spacing={4}>
            <FormControl>
              <Select
                placeholder="Select Batch"
                w={48}
                onChange={(e) => {
                  setFormBatch(e.target.value);
                  setSelectedBatch(
                    batches.find((batch) => batch._id === e.target.value)
                  );
                  dispatch(
                    fetchAttendances({
                      authToken,
                      course_id: "",
                      batch_id: e.target.value,
                      date: formDate,
                    })
                  );
                }}
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
                  onChange={(e) => {
                    setFormCourse(e.target.value);
                    dispatch(
                      fetchAttendances({
                        authToken,
                        course_id: e.target.value,
                        batch_id: formBatch,
                        date: formDate,
                      })
                    );
                  }}
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
                onChange={(e) => {
                  setFormDate(e.target.value);
                  dispatch(
                    fetchAttendances({
                      authToken,
                      course_id: formCourse,
                      batch_id: formBatch,
                      date: e.target.value,
                    })
                  );
                }}
              />
            </FormControl>
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
    </>
  );
}

export default Attendance;
