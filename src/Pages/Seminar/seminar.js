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
import { useDispatch, useSelector } from "react-redux";
import { fetchSeminars, selectAllSeminars } from "../../Features/seminarSlice";
import TableRowLoading from "../../Components/TableRowLoading";
import moment from "moment";
import AttendeesModal from "./AttendeesModal";

function Seminar() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const onAddOpen = () => setIsAddOpen(true);
  const onAddClose = () => setIsAddOpen(false);

  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));

  const { fetchStatus } = useSelector((state) => state.seminars);
  const { seminars } = useSelector((state) => state.seminars);
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
    dispatch(fetchSeminars({ authToken }));
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold ml-6">All Seminars</h1>
        <div className="flex flex-wrap justify-end">
          {hasPermission(["Add_Seminar"]) && (
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
                <Th>Time</Th>
                <Th>Date</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {fetchStatus === "loading" ? (
                <TableRowLoading nOfColumns={5} actions={["w-10", "w-10"]} />
              ) : (
                seminars?.map((seminar) => (
                  <Tr key={seminar._id}>
                    <Td>{seminars.indexOf(seminar) + 1}</Td>
                    <Td>
                      <p className="line-clamp-2 w-[200px] text-wrap">
                        {seminar.name}
                      </p>
                    </Td>
                    <Td>
                      <p className="line-clamp-2 w-[500px] text-wrap">
                      {seminar.description}
                      </p>
                    </Td>
                    <Td>{moment(seminar.time, "HH:mm").format("hh:mm A")}</Td>
                    <Td>{moment(seminar.date).format("DD MMM YYYY")}</Td>

                    <Td className="space-x-3" isNumeric>
                      <AttendeesModal seminar={seminar} />
                      {hasPermission(["Update_Seminar"]) && (
                        <UpdateModal
                          seminar={seminar}
                        />
                      )}
                      {hasPermission(["Delete_Seminar"]) && (
                        <DeleteModal
                          seminarId={seminar._id}
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

export default Seminar;