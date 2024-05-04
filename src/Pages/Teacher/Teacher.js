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

function Teacher() {
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const [isAddOpen, setIsAddOpen] = useState(false);
  const onAddOpen = () => setIsAddOpen(true);
  const onAddClose = () => setIsAddOpen(false);
  const [teachers, setTeachers] = useState([]);
  const getTeachers = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(`${BASE_URL}/teachers`, config)
      .then((response) => {
        console.log(response.data);
        setTeachers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTeachers();
  }, []);
  return (
    <>
      <h1 className="text-2xl font-bold">All Teachers</h1>
      <div className="flex flex-wrap justify-end">
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded" onClick={onAddOpen}>
          Add Teacher
        </button>
      </div>
      <div className="w-full p-4 bg-white mt-5">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Resume</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                teachers.map((teacher) => (
                  <Tr key={teacher._id}>
                    <Td>{teacher.name}</Td>
                    <Td>{teacher.email}</Td>
                    <Td>{teacher.resume}</Td>
                    <Td>
                      <UpdateModal teacher={teacher} getteachers={getTeachers}/>
                      <DeleteModal teacherId={teacher._id} getteachers={getTeachers}/>
                    </Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <AddModel isOpen={isAddOpen} onClose={onAddClose} getTeachers={getTeachers} />
    </>
  );
}

export default Teacher;
