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
import { Box } from "lucide-react";
import { fetchAttendances } from "../../Features/attendanceSlice";
import { fetchBatches, selectAllBatches } from "../../Features/batchSlice";
import { fetchCourses, selectAllCourses } from "../../Features/courseSlice";

function Attendance() {
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const [selectedBatch, setSelectedBatch] = useState("");

  const [formCourse, setFormCourse] = useState("");
  const [formBatch, setFormBatch] = useState("");
  const [formDate, setFormDate] = useState("");

  console.log(formCourse, formBatch, formDate);

  const attendances = useSelector(selectAttendances);
  const batches = useSelector(selectAllBatches);
  const { status } = useSelector((state) => state.attendance);
  const dispatch = useDispatch();

  console.log(batches);

  useEffect(() => {
    dispatch(fetchBatches({ authToken }));
    dispatch(fetchAttendances({ authToken, course_id: formCourse, batch_id: formBatch, date: formDate }));
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold ml-6">Attendance</h1>
        <div className="flex flex-wrap justify-end">
          <HStack spacing={4}>
            <FormControl>
              <Select placeholder="Select Batch" w={48} onChange={(e) => {setFormBatch(e.target.value); setSelectedBatch(batches.find((batch) => batch._id === e.target.value)); dispatch(fetchAttendances({ authToken, course_id: "", batch_id: e.target.value, date: formDate }));}}>
                {batches.map((batch) => (
                  <option key={batch._id} value={batch._id}>
                    {batch.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            {selectedBatch && selectedBatch.courses.length > 0 && (
            <FormControl>
              <Select placeholder="Select Course" w={48} onChange={(e) => {setFormCourse(e.target.value); dispatch(fetchAttendances({ authToken, course_id: e.target.value, batch_id: formBatch, date: formDate }));}}>
                {selectedBatch?.courses?.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            )}
            <FormControl>
              <Input type="date" w={48} onChange={(e) => {setFormDate(e.target.value); dispatch(fetchAttendances({ authToken, course_id: formCourse, batch_id: formBatch, date: e.target.value }));}} />
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
                <Th>Student Name</Th>
                <Th>Batch</Th>
                <Th>Course</Th>
                <Th>Sttendance Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {status == "loading" ? (
                <Tr>
                  <Td>Loading...</Td>
                </Tr>
              ) : (
                // <TableRowLoading
                //   nOfColumns={3}
                //   actions={["w-10", "w-10", "w-20"]}
                // />
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
