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
import { Plus } from "lucide-react";

function Seminar() {
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const [isAddOpen, setIsAddOpen] = useState(false);
  const onAddOpen = () => setIsAddOpen(true);
  const onAddClose = () => setIsAddOpen(false);
  const [seminars, setSeminars] = useState([]);

  const hasPermission = (permissionsToCheck) => {
    const storedPermissions = sessionStorage.getItem("permissions");
    const permissionsArray = storedPermissions
      ? storedPermissions.split(",")
      : [];
    return permissionsToCheck.some((permission) =>
      permissionsArray.includes(permission)
    );
  };
  const getSeminars = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(`${BASE_URL}/seminars`, config)
      .then((response) => {
        console.log(response.data);
        setSeminars(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSeminars();
  }, []);
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold ml-6">All Seminars</h1>
        <div className="flex flex-wrap justify-end">
          {hasPermission(["Add_seminar"]) && (
            <button
              className="bg-white hover:bg-[#FFCB82] hover:text-[#85652D] font-medium pl-[14px] pr-[18px] py-[10px] rounded-xl flex gap-1.5 transition-colors duration-300 border border-[#E0E8EC] hover:border-[#FFCB82]"
              onClick={onAddOpen}
            >
              <Plus size={24} />
              Add Seminar
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
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Start_Time</Th>
                <Th>End_Time</Th>
                <Th>Date</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {seminars.map((seminar) => (
                <Tr key={seminar._id}>
                  <Td>{seminars.indexOf(seminar) + 1}</Td>
                  <Td>{seminar.name}</Td>
                  <Td>{seminar.description}</Td>
                  <Td>{seminar.start_time}</Td>
                  <Td>{seminar.end_time}</Td>
                  <Td>{seminar.date}</Td>

                  <Td className="space-x-3" isNumeric>
                    {hasPermission(["Update_Seminar"]) && (
                      <UpdateModal seminar={seminar} getseminars={geSemminars} />
                    )}
                    {hasPermission(["Delete_seminar"]) && (
                      <DeleteModal
                        seminarId={seminar._id}
                        getseminars={getSeminars}
                      />
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <AddModel
        isOpen={isAddOpen}
        onClose={onAddClose}
        getSeminars={getSeminars}
      />
    </>
  );
}

export default Seminar;
