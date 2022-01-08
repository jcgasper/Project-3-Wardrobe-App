import React from 'react';
import { VStack, Container, Box, Heading, Flex, Text, useMediaQuery } from '@chakra-ui/react';

function Profile() {

    const [bigScreen] = useMediaQuery('(min-width:640px')

    return (
        <>
            <Container maxW="container.lg">
                <VStack spacing={5} p={4}>
                    <Box width={'full'} bg="red.50" p={4} boxShadow="base">
                        <Heading as="h2" size="xl">Tops</Heading>
                        {/* Layout for each clothing item */}
                        <Flex>
                            <Box m={5}>
                                <img src="https://via.placeholder.com/150x250" />
                                {bigScreen && <Text>Description</Text>}
                            </Box>
                            <Box m={5}>
                                <img src="https://via.placeholder.com/150x250" />
                                {bigScreen && <Text>Description</Text>}
                            </Box>
                            <Box m={5}>
                                <img src="https://via.placeholder.com/150x250" />
                                {bigScreen && <Text>Description</Text>}
                            </Box>
                        </Flex>
                    </Box>
                    <Box width={'full'} bg="red.50" p={4} boxShadow="base">
                        <Heading as="h2" size="xl">Bottoms</Heading>
                        {/* Layout for each clothing item */}
                        <Flex>
                            <Box m={5}>
                                <img src="https://via.placeholder.com/150x250" />
                                {bigScreen && <Text>Description</Text>}
                            </Box>
                            <Box m={5}>
                                <img src="https://via.placeholder.com/150x250" />
                                {bigScreen && <Text>Description</Text>}
                            </Box>
                            <Box m={5}>
                                <img src="https://via.placeholder.com/150x250" />
                                {bigScreen && <Text>Description</Text>}
                            </Box>
                        </Flex>
                    </Box>
                    <Box width={'full'} bg="red.50" p={4} boxShadow="base">
                        <Heading as="h2" size="xl">Outerwear</Heading>
                        {/* Layout for each clothing item */}
                        <Flex>
                            <Box m={5}>
                                <img src="https://via.placeholder.com/150x250" />
                                {bigScreen && <Text>Description</Text>}
                            </Box>
                            <Box m={5}>
                                <img src="https://via.placeholder.com/150x250" />
                                {bigScreen && <Text>Description</Text>}
                            </Box>
                            <Box m={5}>
                                <img src="https://via.placeholder.com/150x250" />
                                {bigScreen && <Text>Description</Text>}
                            </Box>
                        </Flex>
                    </Box>
                </VStack>
            </Container>
        </>
    );
};

export default Profile;