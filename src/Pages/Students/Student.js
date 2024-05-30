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
} from "@chakra-ui/react";
import AddModel from "./AddModel";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchBatches } from "../../Features/batchSlice";
import QrCodeModal from "../../Components/Modals/Student/QrCodeModal";
import { Plus } from "lucide-react";
import { fetchStudents, selectAllStudents } from "../../Features/studentSlice";
import TableRowLoading from "../../Components/TableRowLoading";

function Student() {
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const [isAddOpen, setIsAddOpen] = useState(false);
  const onAddOpen = () => setIsAddOpen(true);
  const onAddClose = () => setIsAddOpen(false);

  const { fetchStatus } = useSelector((state) => state.students);
  const students = useSelector(selectAllStudents);
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
        <h1 className="text-xl font-semibold ml-6">All Students</h1>
        <div className="flex flex-wrap justify-end">
          {hasPermission(["Add_Student"]) && (
            <button
              className="bg-white hover:bg-[#FFCB82] hover:text-[#85652D] font-medium pl-[14px] pr-[18px] py-[10px] rounded-xl flex gap-1.5 transition-colors duration-300 border border-[#E0E8EC] hover:border-[#FFCB82]"
              onClick={onAddOpen}
            >
              <Plus size={24} />
              Add Student
            </button>
          )}
        </div>
      </div>
      <div className="w-full bg-white mt-3 rounded-xl border border-[#E0E8EC]">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>QR</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th isNumeric>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {fetchStatus === "loading" ? (
                <TableRowLoading
                  nOfColumns={5}
                  actions={["w-10", "w-10"]}
                />
              ) : (
                students.map((student) => (
                  <Tr key={student._id}>
                    <Td>{students.indexOf(student) + 1}</Td>
                    <Td>
                      <QrCodeModal student={student} />
                    </Td>
                    <Td>{student.name}</Td>
                    <Td>{student.email}</Td>
                    <Td>{student.phone}</Td>
                    <Td className="space-x-3" isNumeric>
                      {hasPermission(["Update_Student"]) && (
                        <UpdateModal
                          student={student}
                        />
                      )}
                      {hasPermission(["Delete_Student"]) && (
                        <DeleteModal
                          studentId={student._id}
                        />
                      )}
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <AddModel
        isOpen={isAddOpen}
        onClose={onAddClose}
      />
    </>
  );
}

export default Student;
