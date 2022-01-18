import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Auth from '../utils/auth';

const SignupForm = () => {
  const [addUser] = useMutation(ADD_USER);
  // set initial form state
  const [userFormData, setUserFormData] = useState({ displayname: '', email: '', password: '' });
  // set state for form validation
  //const [validated] = useState(false);
  // set state for alert
  //const [showAlert, setShowAlert] = useState(false);
  // set state for password visibility

  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!userFormData.displayname.trim() || !userFormData.email.trim() || !userFormData.password.trim()) {
      toast({
        title: "You must enter a display name, email address, password ",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // check if form has everything (as per react-bootstrap docs)
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    try {
      console.log(userFormData)
      const { data } = await addUser({ variables: userFormData });
      const { token, user } = data.addUser;
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      displayname: '',
      email: '',
      password: '',
    });
  };

  return (
    <Flex
      as="form"
      minH={"30vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      onSubmit={handleFormSubmit}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'} color={"pink.600"}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'pink.600'}>
            to use MyStyle!
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="displayname" isRequired>
                  <FormLabel color={"pink.800"}>Display Name</FormLabel>
                  <Input
                    type="text"
                    onChange={handleInputChange}
                    value={userFormData.displayname}
                    name="displayname" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel color={"pink.800"}>Email address</FormLabel>
              <Input
                type="email"
                onChange={handleInputChange}
                value={userFormData.email}
                name="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel color={"pink.800"}>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'}
                  onChange={handleInputChange}
                  value={userFormData.password}
                  name="password" />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                type='submit'
                loadingText="Submitting"
                size="lg"
                bg={'pink.500'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'} color={"pink.800"}>
                Already have an account? <Link as={ReactLink} to="/login" color={'pink.500'} >Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default SignupForm;
