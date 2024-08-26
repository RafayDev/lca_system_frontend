import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { Text, Divider } from "@chakra-ui/react";
import TableRowLoading from "../../Components/TableRowLoading";
import { TableContainer } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAttendeesBySeminar,
  selectSeminarAttendees,
  setLimitFilter,
  setPageFilter,
  setQueryFilter,
} from "../../Features/seminarAttendeeSlice";
import moment from "moment";
import { downloadExcel } from "react-export-table-to-excel";
import TablePagination from "../../Components/TablePagination";

const AttendeesModal = ({ seminar }) => {
  const fileHeaders = [
    "No",
    "Name",
    "Phone",
    "City",
    "Qualification",
    "Attend Type",
    "age",
  ];

  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const [loading, setLoading] = useState(false);

  const { fetchStatus, pagination } = useSelector(
    (state) => state.seminarAttendees
  );
  const seminarAttendees = useSelector(selectSeminarAttendees);
  const dispatch = useDispatch();

  const handleModalOpen = () => {
    dispatch(fetchAttendeesBySeminar({ authToken, seminarId: seminar._id }));
    onOpen();
  };

  function handleDownloadExcel() {
    const tempLimit = pagination.limit;
    dispatch(setLimitFilter(pagination.totalDocs || 1000000));
    dispatch(setPageFilter(1));
    dispatch(setQueryFilter(""));
    setLoading(true);
    dispatch(fetchAttendeesBySeminar({ authToken, seminarId: seminar._id }))
      .unwrap()
      .then((data) => {
        const attendees = data.docs;
        console.log(attendees);
        downloadExcel({
          fileName:
            "AttendeesSheet[" + seminar.name + "][" + seminar.date + "]",
          sheet: seminar.name + " Attendees Sheet",
          tablePayload: {
            header: fileHeaders,
            body: attendees.map((attendee) => [
              attendees.indexOf(attendee) + 1,
              attendee.name,
              attendee.phone,
              attendee.city,
              attendee.qualification,
              attendee.age,
              attendee.attend_type.map(
                (type, index) =>
                  ("" + type)?.toString().replace(/,/g, "") +
                  (index < attendee.attend_type.length - 1 ? ", " : "")
              ),
            ]),
          },
        });
        setTimeout(() => {
          dispatch(setLimitFilter(tempLimit));
          setTimeout(() => {
            dispatch(fetchAttendeesBySeminar({ authToken, seminarId: seminar._id }));
            setLoading(false);
          }, 1000);
        }, 1000);
      });
  }

  return (
    <>
      <button
        className="hover:bg-[#7AEF85] hover:text-[#257947] font-medium p-[10px] rounded-xl transition-colors duration-300"
        onClick={handleModalOpen}
      >
        <Eye size={18} />
      </button>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-xl font-semibold">
            Seminar Attendees
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col gap-2 mb-6 border-l-4 border-blue-400 pl-6 ml-5 py-4">
              <div className="flex justify-start items-center gap-4">
                <Text as="b" className="w-[100px]" fontSize="md">
                  Event Name:
                </Text>
                <Text className="min-w-max">{seminar.name}</Text>
              </div>
              <div className="flex justify-start items-start gap-4">
                <Text as="b" className="w-[100px]" fontSize="md">
                  Description:
                </Text>
                <Text className="w-[calc(100%-200px)] text-wrap line-clamp-4">
                  {seminar.description}
                </Text>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Text as="b" className="w-[100px]" fontSize="md">
                  Date:
                </Text>
                <Text className="min-w-max">
                  {moment(seminar.date + " " + seminar.time).format(
                    "dddd DD, MMMM YYYY"
                  )}
                </Text>
              </div>
            </div>
            {fetchStatus === "loading" || loading ? (
              <div className="flex justify-center items-center h-40 rounded-xl border border-[#E0E8EC]">
                <Spinner />
              </div>
            ) : (
              <>
                <div className="w-full bg-white rounded-xl border border-[#E0E8EC] overflow-auto max-h-[50vh]">
                  {seminarAttendees.length === 0 ? (
                    <div className="p-4 text-center">No attendees found</div>
                  ) : (
                    <TableContainer>
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>No</Th>
                            <Th>Name</Th>
                            <Th>Phone</Th>
                            <Th>City</Th>
                            <Th>Qualification</Th>
                            <Th>Age</Th>
                            <Th>Attend Type</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {seminarAttendees?.map((attendee) => (
                            <Tr key={attendee._id}>
                              <Td>{seminarAttendees.indexOf(attendee) + 1}</Td>
                              <Td>{attendee.name}</Td>
                              <Td>{attendee.phone}</Td>
                              <Td>{attendee.city}</Td>
                              <Td>{attendee.qualification}</Td>
                              <Td>{attendee.age}</Td>
                              <Td>
                                {attendee.attend_type && attendee.attend_type.length > 0 ? (
                                  <span className="">
                                    {attendee.attend_type.map(
                                      (type, index) =>
                                        ("" + type)
                                          ?.toString()
                                          .replace(/,/g, "") +
                                        (index < attendee.attend_type.length - 1
                                          ? ", "
                                          : "")
                                    )}
                                  </span>
                                ) : (
                                  <span className="">N/A</span>
                                )}
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  )}
                </div>
                <TablePagination
                  pagination={pagination}
                  setLimitFilter={setLimitFilter}
                  setPageFilter={setPageFilter}
                  method={fetchAttendeesBySeminar}
                  payload={{ seminarId: seminar._id }}
                />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              mr={3}
              borderRadius={"0.75rem"}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              borderRadius={"0.75rem"}
              backgroundColor={"#7AEF85"}
              color={"#257947"}
              _hover={{
                backgroundColor: "#65C76E",
                color: "#184E2E",
              }}
              fontWeight={"500"}
              onClick={handleDownloadExcel}
              loadingText="Deleting"
              isLoading={loading}
            >
              Export Excel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AttendeesModal;
