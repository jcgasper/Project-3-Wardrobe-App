// refactored, need to adjust handleInput/handleForm to use Chakra UI
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import {
  Flex,
  Heading,
  Input,
  Button,
  Stack,
  chakra,
  Box,
  Link,
  FormControl,
  Text,
  FormLabel,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  //const [validated] = useState(false);
  //const [showAlert, setShowAlert] = useState(false);
  const [loginUser, {error}] = useMutation(LOGIN_USER);
  const toast = useToast();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!userFormData.email.trim() || !userFormData.password.trim()) {
      toast({
        title: "You must enter a email address and password ",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      console.log(userFormData)
      const { data } = await loginUser({ variables: {email: userFormData.email, password: userFormData.password} });
      const { token, user } = data.login;

      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(error);
      toast({
        title: "Something went wrong with your login credentials!",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      //setShowAlert(true);
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };

  //const [showPassword, setShowPassword] = useState(false);

  //const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      as="form"
      minH={"30vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      onSubmit={handleFormSubmit}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your MyStyle account!</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={handleInputChange}
                value={userFormData.email}
                name="email"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={handleInputChange}
                value={userFormData.password}
                name="password"
              />
            </FormControl>
            <Button
              type="submit"
              isDisabled={!(userFormData.email && userFormData.password)}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Sign in
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginForm;
