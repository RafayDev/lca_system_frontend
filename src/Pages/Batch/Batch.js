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
import AssignCourses from "./AssignCourses";
import AssignTeachers from "./AssignTeachers";
import { Plus } from "lucide-react";

function Batch() {
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const [isAddOpen, setIsAddOpen] = useState(false);
  const onAddOpen = () => setIsAddOpen(true);
  const onAddClose = () => setIsAddOpen(false);
  const [batchs, setBatchs] = useState([]);

  const hasPermission = (permissionsToCheck) => {
    const storedPermissions = sessionStorage.getItem("permissions");
    const permissionsArray = storedPermissions
      ? storedPermissions.split(",")
      : [];
    return permissionsToCheck.some((permission) =>
      permissionsArray.includes(permission)
    );
  };
  const getBatchs = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(`${BASE_URL}/batches`, config)
      .then((response) => {
        console.log(response.data);
        setBatchs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getBatchs();
  }, []);
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold ml-6">All Batchs</h1>
        <div className="flex flex-wrap justify-end">
          {hasPermission(["Add_Batch"]) && (
            <button
              className="bg-white hover:bg-[#FFCB82] hover:text-[#85652D] font-medium pl-[14px] pr-[18px] py-[10px] rounded-xl flex gap-1.5 transition-colors duration-300 border border-[#E0E8EC] hover:border-[#FFCB82]"
              onClick={onAddOpen}
            >
              <Plus size={24} />
              Add Batch
            </button>
          )}
        </div>
      </div>
      <div className="w-full bg-white mt-3 rounded-xl border border-[#E0E8EC]">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Start Date</Th>
                <Th>End Date</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {batchs.map((batch) => (
                <Tr key={batch._id}>
                  <Td>{batch.name}</Td>
                  <Td>{batch.description}</Td>
                  <Td>{batch.startdate}</Td>
                  <Td>{batch.enddate}</Td>
                  <Td className="space-x-3 flex justify-end" isNumeric>
                    {hasPermission(["Update_Batch"]) && (
                      <UpdateModal batch={batch} getbatchs={getBatchs} />
                    )}
                    {hasPermission(["Delete_Batch"]) && (
                      <DeleteModal batchId={batch._id} getbatchs={getBatchs} />
                    )}
                    {hasPermission(["Delete_Batch"]) && (
                      <AssignCourses batchId={batch._id} />
                    )}
                    {hasPermission(["Delete_Batch"]) && (
                      <AssignTeachers batchId={batch._id} />
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <AddModel isOpen={isAddOpen} onClose={onAddClose} getbatchs={getBatchs} />
    </>
  );
}

export default Batch;
