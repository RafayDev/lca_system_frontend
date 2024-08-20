import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  IconButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {  SquareDashedBottom } from "lucide-react";
import StudentCard from "../StudentCard";

function StudentCardModal({ student }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [qrCode, setQrCode] = useState(student.qrcode);

  return (
    <>
      <IconButton onClick={onOpen} colorScheme="gray">
        <SquareDashedBottom />
      </IconButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="1000px">
          <ModalHeader className="text-xl font-semibold">
            Student QR Code
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <StudentCard student={student} qrCode={qrCode} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default StudentCardModal;
