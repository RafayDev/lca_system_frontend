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

function Course() {
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const [isAddOpen, setIsAddOpen] = useState(false);
  const onAddOpen = () => setIsAddOpen(true);
  const onAddClose = () => setIsAddOpen(false);
  const [courses, setCourses] = useState([]);
  const getCourses = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get(`${BASE_URL}/courses`, config)
      .then((response) => {
        console.log(response.data);
        setCourses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCourses();
  }, []);
  return (
    <>
      <h1 className="text-2xl font-bold">All Courses</h1>
      <div className="flex flex-wrap justify-end">
        <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={onAddOpen}>
          Add Course
        </button>
      </div>
      <div className="w-full p-4 bg-white mt-5">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                courses.map((course) => (
                  <Tr key={course._id}>
                    <Td>{course.name}</Td>
                    <Td>{course.description}</Td>
                    <Td>
                      <UpdateModal course={course} getcourses={getCourses}/>
                      <DeleteModal courseId={course._id} getcourses={getCourses}/>
                    </Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <AddModel isOpen={isAddOpen} onClose={onAddClose} getCourses={getCourses} />
    </>
  );
}

export default Course;
