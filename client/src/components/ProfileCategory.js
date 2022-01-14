import React from 'react';
import { Link as reactLink } from 'react-router-dom';
import { Box, Heading, Flex, Button } from '@chakra-ui/react';
import ProfileBox from './ProfileBox';

function ProfileCategory({category, items}) {

    return (
        <>
        <Box width='full' py={4} >
            <Heading textColor='pink.500' as="h2" size="xl">{category}</Heading>
            <Flex justify='space-around' flexWrap='wrap' marginTop={4}>
                {items.map((item) => {
                    return <ProfileBox image={item.image} desc={item.description} id={item.id} />
                })}
            </Flex>
            <Flex justify='start' marginTop={4}>
                <Button as={reactLink} borderRadius='0' colorScheme='pink' to={`/profile/${category}`}>More</Button>
            </Flex>
        </Box>        
        </>

    )
}

export default ProfileCategory;