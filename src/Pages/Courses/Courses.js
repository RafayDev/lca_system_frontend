import React, { useEffect, useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { fetchCourses, selectAllCourses } from "../../Features/courseSlice";
import TableRowLoading from "../../Components/TableRowLoading";

function Course() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const onAddOpen = () => setIsAddOpen(true);
  const onAddClose = () => setIsAddOpen(false);

  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));

  const courses = useSelector(selectAllCourses);
  const { status } = useSelector((state) => state.courses);
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
    dispatch(fetchCourses({ authToken }));
  }, []);
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold ml-6">All Courses</h1>
        <div className="flex flex-wrap justify-end">
          {hasPermission(["Add_Course"]) && (
            <button
              className="bg-white hover:bg-[#FFCB82] hover:text-[#85652D] font-medium pl-[14px] pr-[18px] py-[10px] rounded-xl flex gap-1.5 transition-colors duration-300 border border-[#E0E8EC] hover:border-[#FFCB82]"
              onClick={onAddOpen}
            >
              <Plus size={24} />
              Add Course
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
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {status === "loading" ? (
                <TableRowLoading
                  nOfColumns={7}
                  actions={["w-10", "w-10", "w-20", "w-20"]}
                />
              ) : (
                courses.map((course) => (
                  <Tr key={course._id}>
                    <Td>{courses.indexOf(course) + 1}</Td>
                    <Td>{course.name}</Td>
                    <Td>{course.description}</Td>
                    <Td className="space-x-3" isNumeric>
                      {hasPermission(["Update_Course"]) && (
                        <UpdateModal course={course} />
                      )}
                      {hasPermission(["Delete_Course"]) && (
                        <DeleteModal
                          courseId={course._id}
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

export default Course;
