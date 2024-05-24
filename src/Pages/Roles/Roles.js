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
import AssignPermissions from "./AssignPermissions";

function Roles() {
    const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
    const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
    const [isAddOpen, setIsAddOpen] = useState(false);
    const onAddOpen = () => setIsAddOpen(true);
    const onAddClose = () => setIsAddOpen(false);
    const [roles, setRoles] = useState([]);

    const hasPermission = (permissionsToCheck) => {
        const storedPermissions = sessionStorage.getItem("permissions");
        const permissionsArray = storedPermissions ? storedPermissions.split(",") : [];
        return permissionsToCheck.some(permission => permissionsArray.includes(permission));
    };
    const getRoles = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        };
        axios
            .get(`${BASE_URL}/roles`, config)
            .then((response) => {
                console.log(response.data);
                setRoles(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getRoles();
    }, []);
    return (
        <>
            <h1 className="text-2xl font-bold">All Roles</h1>
            <div className="flex flex-wrap justify-end">
                {hasPermission(["Add_Role"]) && (
                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={onAddOpen}>
                        Add Role
                    </button>
                )}
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
                                roles.map((role) => (
                                    <Tr key={role._id}>
                                        <Td>{role.name}</Td>
                                        <Td>{role.description}</Td>
                                        <Td>
                                            {hasPermission(["Update_Role"]) && (
                                                <UpdateModal role={role} getroles={getRoles} />
                                            )}
                                            {hasPermission(["Delete_Role"]) && (
                                                <DeleteModal roleId={role._id} getroles={getRoles} />
                                            )}
                                            {hasPermission(["Assign_Permissions"]) && (
                                                <AssignPermissions roleId={role._id} />
                                            )}
                                        </Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
            <AddModel isOpen={isAddOpen} onClose={onAddClose} getRoles={getRoles} />
        </>
    );
}

export default Roles;
