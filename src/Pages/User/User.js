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

function User() {
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const [isAddOpen, setIsAddOpen] = useState(false);
  const onAddOpen = () => setIsAddOpen(true);
  const onAddClose = () => setIsAddOpen(false);
  const [users, setUsers] = useState([]);
  const getUsers = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(`${BASE_URL}/users`, config)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <h1 className="text-2xl font-bold">All Users</h1>
      <div className="flex flex-wrap justify-end">
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded" onClick={onAddOpen}>
          Add User
        </button>
      </div>
      <div className="w-full p-4 bg-white mt-5">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>User Role</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                users.map((user) => (
                  <Tr>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.role}</Td>
                    <Td>
                      <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded">
                        Edit
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2">
                        Delete
                      </button>
                    </Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <AddModel isOpen={isAddOpen} onClose={onAddClose} getUsers={getUsers} />
    </>
  );
}

export default User;
