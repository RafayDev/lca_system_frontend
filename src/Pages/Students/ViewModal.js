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
  FormControl,
  FormLabel,
  Input,
  VStack,
  Box,
  IconButton,
  Image,
  Grid,
  GridItem,
  Flex
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { selectAllBatches } from "../../Features/batchSlice.js";
import { View } from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchStudents, basicUpdate } from "../../Features/studentSlice";

function ViewModal({ student }) {
  const batches = useSelector(selectAllBatches);
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const [authToken] = useState(Cookies.get("authToken"));
  const dispatch = useDispatch();

  return (
    <>
      <IconButton
        onClick={onOpen}
        colorScheme="gray"
        style={student.image ? { backgroundColor: "#ffcb82" } : {}}
      >
        <View />
      </IconButton>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-xl font-semibold">
            View Student
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Grid Layout */}
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              {/* Left Column (Form Fields) */}
              <GridItem colSpan={1}>
                <VStack spacing={4}>
                  <FormControl id="name">
                    <FormLabel fontSize={14}>Name</FormLabel>
                    <Input
                      type="text"
                      name="name"
                      borderRadius={"0.5rem"}
                      value={student.name}
                      isReadOnly
                    />
                  </FormControl>
                  <FormControl id="phone">
                    <FormLabel fontSize={14}>Phone</FormLabel>
                    <Input
                      type="phone"
                      name="phone"
                      borderRadius={"0.5rem"}
                      value={student.phone}
                      isReadOnly
                    />
                  </FormControl>
                  <FormControl id="email">
                    <FormLabel fontSize={14}>Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      borderRadius={"0.5rem"}
                      value={student.email}
                      isReadOnly
                    />
                  </FormControl>
                  <FormControl id="university">
                    <FormLabel fontSize={14}>University</FormLabel>
                    <Input
                      type="text"
                      name="university"
                      borderRadius={"0.5rem"}
                      value={student.university}
                      isReadOnly
                    />
                  </FormControl>
                  <FormControl id="date_of_birth">
                    <FormLabel fontSize={14}>Date of Birth</FormLabel>
                    <Input
                      type="text"
                      name="date_of_birth"
                      borderRadius={"0.5rem"}
                      value={student.date_of_birth}
                      isReadOnly
                    />
                  </FormControl>
                  <FormControl id="father_name">
                    <FormLabel fontSize={14}>Father's Name</FormLabel>
                    <Input
                      type="text"
                      name="father_name"
                      borderRadius={"0.5rem"}
                      value={student.father_name}
                      isReadOnly
                    />
                  </FormControl>
                  <FormControl id="father_phone">
                    <FormLabel fontSize={14}>Father's Phone</FormLabel>
                    <Input
                      type="text"
                      name="father_phone"
                      borderRadius={"0.5rem"}
                      value={student.father_phone}
                      isReadOnly
                    />
                  </FormControl>
                  <FormControl id="cnic">
                    <FormLabel fontSize={14}>CNIC</FormLabel>
                    <Input
                      type="text"
                      name="cnic"
                      borderRadius={"0.5rem"}
                      value={student.cnic}
                      isReadOnly
                    />
                  </FormControl>
                </VStack>
              </GridItem>
              {/* Right Column (Images) */}
              <GridItem colSpan={1}>
                <VStack spacing={4}>
                  <FormControl id="image">
                    <FormLabel fontSize={14}>Student Image</FormLabel>
                    {student.image ? (
                      <Flex align="center">
                        <Image
                          src={student.image}
                          alt="Student Image"
                          boxSize="150px"
                          objectFit="cover"
                        />
                        <IconButton
                          icon={<View />} // Replace <View /> with an actual icon component
                          onClick={() => window.open(student.image, "_blank")}
                          colorScheme="blue"
                          aria-label="View Student Image"
                          size="sm"
                          ml={2}
                        />
                      </Flex>
                    ) : (
                      <Box color="red.500">No image available</Box>
                    )}
                  </FormControl>

                  <FormControl id="cnic_image">
                    <FormLabel fontSize={14}>CNIC Front Image</FormLabel>
                    {student.cnic_image ? (
                      <Flex align="center">
                        <Image
                          src={student.cnic_image}
                          alt="CNIC Front"
                          objectFit="cover"
                        />
                        <IconButton
                          icon={<View />}
                          onClick={() =>
                            window.open(student.cnic_image, "_blank")
                          }
                          colorScheme="blue"
                          aria-label="View CNIC Front Image"
                          size="sm"
                          ml={2}
                        />
                      </Flex>
                    ) : (
                      <Box color="red.500">No CNIC front image available</Box>
                    )}
                  </FormControl>

                  <FormControl id="cnic_back_image">
                    <FormLabel fontSize={14}>CNIC Back Image</FormLabel>
                    {student.cnic_back_image ? (
                      <Flex align="center">
                        <Image
                          src={student.cnic_back_image}
                          alt="CNIC Back"
                          objectFit="cover"
                        />
                        <IconButton
                          icon={<View />}
                          onClick={() =>
                            window.open(student.cnic_back_image, "_blank")
                          }
                          colorScheme="blue"
                          aria-label="View CNIC Back Image"
                          size="sm"
                          ml={2}
                        />
                      </Flex>
                    ) : (
                      <Box color="red.500">No CNIC back image available</Box>
                    )}
                  </FormControl>

                  <FormControl id="latest_degree_image">
                    <FormLabel fontSize={14}>Latest Degree Image</FormLabel>
                    {student.latest_degree_image ? (
                      <Flex align="center">
                        <Image
                          src={student.latest_degree_image}
                          alt="Latest Degree"
                          objectFit="cover"
                        />
                        <IconButton
                          icon={<View />}
                          onClick={() =>
                            window.open(student.latest_degree_image, "_blank")
                          }
                          colorScheme="blue"
                          aria-label="View Latest Degree Image"
                          size="sm"
                          ml={2}
                        />
                      </Flex>
                    ) : (
                      <Box color="red.500">
                        No latest degree image available
                      </Box>
                    )}
                  </FormControl>
                </VStack>
              </GridItem>
            </Grid>
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ViewModal;
