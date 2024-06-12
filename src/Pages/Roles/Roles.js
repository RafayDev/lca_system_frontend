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
import AssignPermissions from "./AssignPermissions";
import { Plus } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRoles, selectAllRoles } from "../../Features/roleSlice";
import TableRowLoading from "../../Components/TableRowLoading";
import TableSearch from "../../Components/TableSearch";

function Roles() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const onAddOpen = () => setIsAddOpen(true);
  const onAddClose = () => setIsAddOpen(false);

  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));

  const { fetchStatus } = useSelector((state) => state.roles);
  const roles = useSelector(selectAllRoles);
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
    dispatch(fetchRoles({ authToken }));
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold ml-6 text-nowrap">All Roles</h1>
        <div className="w-full flex justify-end gap-3">
          <div>
            <TableSearch method={fetchRoles} />
          </div>
          {hasPermission(["Add_Role"]) && (
            <button
              className="bg-white hover:bg-[#FFCB82] hover:text-[#85652D] font-medium pl-[14px] pr-[18px] py-[10px] rounded-xl flex gap-1.5 transition-colors duration-300 border border-[#E0E8EC] hover:border-[#FFCB82]"
              onClick={onAddOpen}
            >
              <Plus size={24} />
              Add Role
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
              {fetchStatus == "loading" ? (
                <TableRowLoading
                  nOfColumns={3}
                  actions={["w-10", "w-10", "w-20"]}
                />
              ) : (
                roles.map((role) => (
                  <Tr key={role._id}>
                    <Td>{roles.indexOf(role) + 1}</Td>
                    <Td>{role.name}</Td>
                    <Td>{role.description}</Td>
                    <Td className="space-x-3 flex justify-end" isNumeric>
                      {hasPermission(["Update_Role"]) && (
                        <UpdateModal role={role} />
                      )}
                      {hasPermission(["Delete_Role"]) && (
                        <DeleteModal roleId={role._id} />
                      )}
                      {hasPermission(["Assign_Permissions"]) && (
                        <AssignPermissions roleId={role._id} />
                      )}
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      <AddModel isOpen={isAddOpen} onClose={onAddClose} />
    </>
  );
}

export default Roles;
