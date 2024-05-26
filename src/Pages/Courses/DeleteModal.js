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
import { Trash } from "lucide-react";
const DeleteModal = ({ courseId, getcourses }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const BASE_URL = process.env.BASE_URL || "http://localhost:5000";
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const toast = useToast();

  const deleteCourse = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .delete(`${BASE_URL}/courses/delete/${courseId}`, config)
      .then((response) => {
        // console.log(response.data);
        getcourses();
        onClose();
        toast({
          title: "course deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        // console.log(error);
        toast({
          title: "Error",
          description: "An error occurred while deleting the course",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <button
        className="hover:bg-[#FF8A8A] hover:text-[#6D1F1F] font-medium p-[10px] rounded-xl transition-colors duration-300"
        onClick={onOpen}
      >
        <Trash size={18} />
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-xl font-semibold">
            Delete Course
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Are you sure you want to delete this course?</p>
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
              backgroundColor={"#FF8A8A"}
              color={"#6D1F1F"}
              _hover={{
                backgroundColor: "#E48080",
                color: "#561616",
              }}
              fontWeight={"500"}
              onClick={deleteCourse}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
