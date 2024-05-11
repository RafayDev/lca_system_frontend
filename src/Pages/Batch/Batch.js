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

function Batch() {
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const [isAddOpen, setIsAddOpen] = useState(false);
  const onAddOpen = () => setIsAddOpen(true);
  const onAddClose = () => setIsAddOpen(false);
  const [batchs, setBatchs] = useState([]);
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
      <h1 className="text-2xl font-bold">All Batchs</h1>
      <div className="flex flex-wrap justify-end">
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded" onClick={onAddOpen}>
          Add Batch
        </button>
      </div>
      <div className="w-full p-4 bg-white mt-5">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Start Date</Th>
                <Th>End Date</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                batchs.map((batch) => (
                  <Tr key={batch._id}>
                    <Td>{batch.name}</Td>
                    <Td>{batch.description}</Td>
                    <Td>{batch.startdate}</Td>
                    <Td>{batch.enddate}</Td>
                    <Td>
                      <UpdateModal batch={batch} getbatchs={getBatchs}/>
                      <DeleteModal batchId={batch._id} getbatchs={getBatchs}/>
                      <AssignCourses batchId={batch._id}/>
                    </Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <AddModel isOpen={isAddOpen} onClose={onAddClose} getbatchs={getBatchs} />
    </>
  );
}

export default Batch;
