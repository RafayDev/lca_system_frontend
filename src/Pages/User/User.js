import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

function User() {
  return (
    <>
      <h1 className="text-2xl font-bold">All Users</h1>
      <div className="flex flex-wrap justify-end">
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded">
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
              <Tr>
                <Td>John Doe</Td>
                <Td>2w5Yz@example.com</Td>
                <Td>Admin</Td>
                <Td>
                  <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2">
                    Delete
                  </button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default User;
