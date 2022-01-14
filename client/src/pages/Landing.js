import React from 'react';
import { VStack, Box, Heading, Flex, Button, Stack, StackDivider } from '@chakra-ui/react';
import heroImage from '../images/hero-image.jpg';

function Landing() {
    return (
        <VStack maxW='container.lg' spacing={10}>
            <Box w='full' height='25rem' marginTop='15%' backgroundImage={heroImage} backgroundPosition='center' backgroundSize='cover'>
                <Flex px={4} w='full' height='full' justify='center' align='center' flexDir='column' gap={5}>
                    <Heading p={5} bg='gray.50' textColor='pink.500'>Build your online wardrobe</Heading>
                    <Button borderRadius='0' size='lg' colorScheme='pink' textColor='gray.50'>Sign Up</Button>
                </Flex>
            </Box>
            <Stack direction={['column','row']} justify='space-between' align='stretch' w='full' divider={<StackDivider borderColor='gray.200' />}>
                <Box border='1px' w='200px'>
                    Hello
                </Box>
                <Box border='1px' w='200px'>
                    Hello
                </Box>
                <Box border='1px' w='200px'>
                    Hello
                </Box>
            </Stack>
        </VStack>
    )
}

export default Landing;