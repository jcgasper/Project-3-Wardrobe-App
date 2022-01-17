import React, { useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Navbar, Nav, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';
import { Link, Box, Flex, Text, Button, Stack, Container } from "@chakra-ui/react";

//import Logo from "./Logo";


const AppNavbar = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const loggedIn = Auth.loggedIn();
    const toggle = () => setIsOpen(!isOpen);
  
    return (
      <NavBarContainer {...props} bg='pink.100'>
        <Container maxW='container.lg' display='flex' justify='center'>
        {/* <Logo
          w="100px"
          color={["white", "white", "primary.500", "primary.500"]}
        /> */}
        <MenuToggle toggle={toggle} isOpen={isOpen} />
        <MenuLinks isOpen={isOpen} />
        </Container>
      </NavBarContainer>
    );
  };
  
  const CloseIcon = () => (
    <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <title>Close</title>
      <path
        fill="white"
        d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
      />
    </svg>
  );
  
  const MenuIcon = () => (
    <svg
      width="24px"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
    >
      <title>Menu</title>
      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    </svg>
  );
  
  const MenuToggle = ({ toggle, isOpen }) => {
    return (
      <Box display={{ base: "block", md: "none" }} onClick={toggle}>
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </Box>
    );
  };
  
  const MenuItem = ({ children, isLast, to = "/", pointer, ...rest }) => {
    return (
      <Link as={ReactLink} to={to} pointerEvents={pointer}>
        <Text display="block" {...rest} textColor='pink.800'  fontSize='lg'>
          {children}
        </Text>
      </Link>
    );
  };
  
  const MenuLinks = ({ isOpen }) => {
    return (
      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Stack
          spacing={8}
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="/Profile" pointer={Auth.loggedIn() ? 'auto' : 'none'}>My Wardrobe </MenuItem>
          <MenuItem to="/addItem" pointer={Auth.loggedIn() ? 'auto' : 'none'}>Add Item </MenuItem>
          {(!Auth.loggedIn()) ? 
          <>
            <MenuItem to="/login" pointer='auto'>
            <Button
              size="sm"
              rounded="md"
              color={["primary.500", "primary.500", "pink.800", "pink.800"]}
              bg={["white", "white", "primary.500", "primary.500"]}
              _hover={{
                bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
              }}
              fontSize='lg'
            >
              Login
            </Button>
          </MenuItem>
          <MenuItem to="/signup" pointer='auto' isLast>
          <Button
            size="sm"
            rounded="md"
            color={["primary.500", "primary.500", "pink.800", "pink.800"]}
            bg={["white", "white", "primary.500", "primary.500"]}
            _hover={{
              bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
            }}
            fontSize='lg'
          >
            Signup
          </Button>
        </MenuItem>
          </>
           :
          <MenuItem pointer='auto' isLast>
            <Button
          size="sm"
          rounded="md"
          color={["primary.500", "primary.500", "pink.800", "pink.800"]}
          bg={["white", "white", "primary.500", "primary.500"]}
          _hover={{
            bg: ["primary.100", "primary.100", "primary.600", "primary.600"]
          }}
          fontSize='lg'
          onClick={() => Auth.logout()}
        >
          Logout
        </Button>
          </MenuItem>
          
          }
        </Stack>
      </Box>
    );
  };
  
  const NavBarContainer = ({ children, ...props }) => {
    return (
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        w="100%"
        mb={8}
        p={8}
        bg={["primary.500", "primary.500", "transparent", "transparent"]}
        color={["white", "white", "primary.700", "primary.700"]}
        {...props}
      >
        {children}
      </Flex>
    );
  };

export default AppNavbar;

