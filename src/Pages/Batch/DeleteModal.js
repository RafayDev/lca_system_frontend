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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
const DeleteModal = ({batchId, getbatchs}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const toast = useToast();

  const deleteBatch = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .delete(`${BASE_URL}/batches/delete/${batchId}`, config)
      .then((response) => {
        // console.log(response.data);
        getbatchs();
        onClose();
        toast({
          title: "batch deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        // console.log(error);
        toast({
          title: "Error",
          description: "An error occurred while deleting the batch",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2" onClick={onOpen}>
        Delete
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete batch</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Are you sure you want to delete this batch?</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" onClick={deleteBatch}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
