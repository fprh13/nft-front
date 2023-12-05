import "./App.css";
import { useState } from "react";

import axios from "axios";
import {
  useDisclosure,
  Box,
  Flex,
  HStack,
  IconButton,
  useColorModeValue,
  Stack,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Links = ["gallery", "community", "about"];

const NavLink = (props) => {
  const { children, currentPage, setLocation } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      color={currentPage ? "blue" : "grey"}
      onClick={() => {
        setLocation(children);
      }}
    >
      {children}
    </Box>
  );
};

const AppBar = (props) => {
  const { location, setLocation } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Box>Logo</Box>
          <HStack
            as={"nav"}
            spacing={4}
            display={{ base: "none", md: "flex" }}
          ></HStack>
        </HStack>
        <Flex alignItems={"center"}>
          {Links.map((link) => (
            <NavLink
              key={link}
              currentPage={link == location}
              setLocation={setLocation}
            >
              {link}
            </NavLink>
          ))}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <Link href={link}>
                <NavLink key={link} currentPage={link == location}>
                  {link}
                </NavLink>
              </Link>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default AppBar;
