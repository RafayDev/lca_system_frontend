import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  ButtonGroup,
} from "@chakra-ui/react";
import AddModel from "./AddModel";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBatches,
  selectCurrentActiveBatch,
} from "../../Features/batchSlice";
import QrCodeModal from "../../Components/Modals/Student/QrCodeModal";
import { FileX, Plus } from "lucide-react";
import {
  fetchStudents,
  selectAllStudents,
  setLimitFilter,
  setPageFilter,
  setQueryFilter,
} from "../../Features/studentSlice";
import TableRowLoading from "../../Components/TableRowLoading";
import EnrollmentModal from "./EnrollmentModal";
import TableSearch from "../../Components/TableSearch";
import TablePagination from "../../Components/TablePagination";
import StudentCardModal from "../../Components/Modals/Student/StudentCardModal";
import ViewModal from "./ViewModal";
import ExportModal from "./ExportModal";

function Student() {
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const [isAddOpen, setIsAddOpen] = useState(false);
  const onAddOpen = () => setIsAddOpen(true);
  const onAddClose = () => setIsAddOpen(false);

  const { fetchStatus, pagination } = useSelector((state) => state.students);
  const students = useSelector(selectAllStudents);
  const activeBatch = useSelector(selectCurrentActiveBatch);
  const dispatch = useDispatch();

  const hasPermission = (permissionsToCheck) => {
    const storedPermissions = sessionStorage.getItem("permissions");
    const permissionsArray = storedPermissions
      ? storedPermissions.split(",")
      : [];
    return permissionsToCheck.some((permission) =>
      permissionsArray.includes(permission)
    );
  };

  useEffect(() => {
    dispatch(fetchStudents({ authToken }));
    dispatch(fetchBatches({ authToken }));
  }, []);
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold ml-6 text-nowrap">All Students</h1>
        <div className="w-full flex justify-end gap-3">
          <div>
            <TableSearch setQueryFilter={setQueryFilter} method={fetchStudents} />
          </div>
          {hasPermission(["Add_Student"]) && (
            <button
              className="bg-white hover:bg-[#FFCB82] hover:text-[#85652D] font-medium pl-[14px] pr-[18px] py-[10px] rounded-xl flex gap-1.5 transition-colors duration-300 border border-[#E0E8EC] hover:border-[#FFCB82]"
              onClick={onAddOpen}
            >
              <Plus size={24} />
              Add Student
            </button>
          )}
          <ExportModal />
        </div>
      </div>
      <div className="w-full bg-white mt-3 rounded-xl border border-[#E0E8EC]">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>View | QR | Card</Th>
                <Th data-searchable>Name</Th>
                <Th data-searchable>Email</Th>
                <Th data-searchable>Phone</Th>
                {/* <Th>Total Fee</Th>
                <Th>Paid Fee</Th>
                <Th>Remaining Fee</Th> */}
                <Th>Last Active Batch</Th>
                <Th isNumeric>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {fetchStatus === "loading" ? (
                <TableRowLoading
                  nOfColumns={9}
                  actions={["w-10", "w-10", "w-20"]}
                />
              ) : students.length === 0 ? (
                <Tr>
                  <Td colSpan={10}>
                    <span className="flex justify-center items-center gap-2 text-[#A1A1A1]">
                      <FileX />
                      No student records found
                    </span>
                  </Td>
                </Tr>
              ) : (
                students.map((student) => (
                  <Tr key={student._id}>
                    <Td>{students.indexOf(student) + 1}</Td>
                    <Td>
                      <ButtonGroup variant='outline'>
                        <ViewModal student={student} />
                        <QrCodeModal student={student} />
                        <StudentCardModal student={student} />
                      </ButtonGroup>
                    </Td>
                    <Td>{student.name}</Td>
                    <Td>{student.email}</Td>
                    <Td>{student.phone}</Td>
                    {/* <Td>{student.total_fee}</Td>
                    <Td>{student.paid_fee}</Td>
                    <Td>{student.pending_fee}</Td> */}
                    <Td>{student.batch ? student.batch.name : "No Batch"}</Td>
                    <Td className="space-x-3" isNumeric>
                      <div className="flex flex-nowrap justify-end items-center gap-2">
                        {hasPermission(["Update_Student"]) && (
                          <UpdateModal student={student} />
                        )}
                        {hasPermission(["Delete_Student"]) && (
                          <DeleteModal studentId={student._id} />
                        )}
                        <EnrollmentModal studentId={student._id} />
                      </div>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      {fetchStatus !== "loading" && (
        <TablePagination
          pagination={pagination}
          setLimitFilter={setLimitFilter}
          setPageFilter={setPageFilter}
          method={fetchStudents}
        />
      )}
      <AddModel isOpen={isAddOpen} onClose={onAddClose} />
    </>
  );
}

export default Student;
