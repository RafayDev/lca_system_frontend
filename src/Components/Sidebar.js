// Sidebar.jsx
import React from "react";
import {
  Box,
  Flex,
  Text,
  CloseButton,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { routes } from "../routes";
import { Image } from "@chakra-ui/react";
// const LinkItems = [
//   { name: 'Home', icon: FiHome },
// ];
export default function Sidebar({ onClose, ...rest }) {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" my="4" justifyContent="space-between">
        <Box boxSize="sm" className="mt-20">
          <Image src="./logo.png" alt="Dan Abramov" className="mt-20 mb-5" />
        </Box>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <div className="mt-16">
      {routes.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.path}>
          {link.name}
        </NavItem>
      ))}
      </div>
    </Box>
  );
}

const NavItem = ({ icon, children, to, ...rest }) => {
  return (
    <Link
      to={to}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "yellow.500",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
