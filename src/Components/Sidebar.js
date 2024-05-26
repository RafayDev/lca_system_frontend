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
      <Flex alignItems="center" mx="8" my="0" justifyContent="space-between">
        <Box boxSize="sm" h={20}>
          <Image src="./logo.png" alt="Dan Abramov" className="w-36 mx-auto" />
        </Box>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <div className="mt-16 flex flex-col gap-2">
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
        px="4"
        py="2"
        mx="4"
        borderRadius="xl"
        role="group"
        cursor="pointer"
        _hover={{
          bg: to !== window.location.pathname ? "gray.100" : "",
          color: to !== window.location.pathname ? "gray.900" : "",
        }}
        bg={to === window.location.pathname ? "#FFCB82" : ""}
        color={to === window.location.pathname ? "#5B451F" : ""}
        {...rest}
      >
        {icon && (
          <Icon
            mr="5"
            fontSize="20"
            _groupHover={{
              color: to !== window.location.pathname ? "gray.900" : "",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
