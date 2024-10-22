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
import { Download, Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  selectAllStudents,
  setLimitFilter,
  setPageFilter,
  setQueryFilter,
} from "../../Features/studentSlice";
import moment from "moment";
import { downloadExcel } from "react-export-table-to-excel";
import TablePagination from "../../Components/TablePagination";

const ExportModal = () => {
  const fileHeaders = [
    "No",
    "Name",
    "Email",
    "Phone",
    "CNIC",
    "Admission Date",
    "Date of Birth",
    "Father Name",
    "Father Phone",
    "Latest Degree",
    "University",
    "City",
    "Completion Year",
    "Marks CGPA",
    "CNIC Image",
    "CNIC Back Image",
    "Image",
    "Latest Degree Image",
    "QR Code",
  ];

  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const [loading, setLoading] = useState(false);

  const { fetchStatus, pagination } = useSelector((state) => state.students);
  const students = useSelector(selectAllStudents);
  const dispatch = useDispatch();

  const handleModalOpen = () => {
    dispatch(fetchStudents({ authToken }));
    onOpen();
  };

  function handleDownloadExcel() {
    const tempLimit = pagination.limit;
    dispatch(setLimitFilter(pagination.totalDocs || 1000000));
    dispatch(setPageFilter(1));
    dispatch(setQueryFilter(""));
    setLoading(true);
    dispatch(fetchStudents({ authToken }))
      .unwrap()
      .then((data) => {
        const students = data.docs;
        downloadExcel({
          fileName: "StudentsSheet[" + moment().format("DD/MM/YYYY") + "]",
          sheet: "Students Sheet",
          tablePayload: {
            header: fileHeaders,
            body: students.map((student) => [
              students.indexOf(student) + 1,
              student.name,
              student.email,
              student.phone,
              student.cnic,
              moment(student.admission_date).format("DD/MM/YYYY"),
              moment(student.dob).format("DD/MM/YYYY"),
              student.father_name,
              student.father_phone,
              student.latest_degree,
              student.university,
              student.city,
              student.completion_year,
              student.marks_cgpa,
              student.cnic_image,
              student.cnic_back_image,
              student.image,
              student.latest_degree_image,
              student.qr_code,
            ])
          },
        });
        setTimeout(() => {
          setLoading(false);
          onClose();
          dispatch(setQueryFilter(""));
          dispatch(setPageFilter(1));
          dispatch(setLimitFilter(tempLimit));
          // setTimeout(() => {
          //   dispatch(fetchStudents({ authToken }));
          // }, 1000);
        }, 1000);
      });
  }

  return (
    <>
      <button
        className="bg-white hover:bg-[#FFCB82] hover:text-[#85652D] font-medium pl-[14px] pr-[18px] py-[10px] rounded-xl flex gap-1.5 transition-colors duration-300 border border-[#E0E8EC] hover:border-[#FFCB82]"
        onClick={handleModalOpen}
      >
        <Download size={20} />
        Excel File
      </button>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-xl font-semibold">
            Export Student Records
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <div className="flex flex-col gap-2 mb-6 border-l-4 border-blue-400 pl-6 ml-5 py-4">
              // TODO: add checkbox filters for all the fields in the table here in the future. These will be used to filter the data in the table before exporting.
            </div> */}
            {fetchStatus === "loading" || loading ? (
              <div className="flex justify-center items-center h-40 rounded-xl border border-[#E0E8EC]">
                <Spinner />
              </div>
            ) : (
              <>
                <div className="w-full bg-white rounded-xl border border-[#E0E8EC] overflow-auto max-h-[50vh]">
                  {students.length === 0 ? (
                    <div className="p-4 text-center">No students found</div>
                  ) : (
                    <TableContainer>
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>No</Th>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Phone</Th>
                            <Th>CNIC</Th>
                            <Th>Admission Date</Th>
                            <Th>DOB</Th>
                            <Th>Father Name</Th>
                            <Th>Father Phone</Th>
                            <Th>Latest Degree</Th>
                            <Th>University</Th>
                            <Th>City</Th>
                            <Th>Completion Year</Th>
                            <Th>Marks CGPA</Th>
                            <Th>CNIC Image</Th>
                            <Th>CNIC Back Image</Th>
                            <Th>Image</Th>
                            <Th>Latest Degree Image</Th>
                            <Th>QR Code</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {students.map((student, index) => (
                            <Tr key={student._id}>
                              <Td>{index + 1}</Td>
                              <Td>{student.name}</Td>
                              <Td>{student.email}</Td>
                              <Td>{student.phone}</Td>
                              <Td>{student.cnic}</Td>
                              <Td>{moment(student.admission_date).format("DD/MM/YYYY")}</Td>
                              <Td>{moment(student.dob).format("DD/MM/YYYY")}</Td>
                              <Td>{student.father_name}</Td>
                              <Td>{student.father_phone}</Td>
                              <Td>{student.latest_degree}</Td>
                              <Td>{student.university}</Td>
                              <Td>{student.city}</Td>
                              <Td>{student.completion_year}</Td>
                              <Td>{student.marks_cgpa}</Td>
                              <Td>{student.cnic_image}</Td>
                              <Td>{student.cnic_back_image}</Td>
                              <Td>{student.image}</Td>
                              <Td>{student.latest_degree_image}</Td>
                              <Td>{student.qr_code}</Td>
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
                  method={fetchStudents}
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
              loadingText="Exporting"
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

export default ExportModal;
