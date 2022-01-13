import React from 'react';
import { Link as reactLink } from 'react-router-dom';
import { Box, Heading, Flex, Button } from '@chakra-ui/react';
import ProfileBox from './ProfileBox';

function ProfileCategory({category, items}) {

    return (
        <>
        <Box width='full' p={4} boxShadow="base" borderRadius='md' wrap>
            <Heading textColor='#000022' as="h2" size="xl">{category}</Heading>
                <Flex justify='space-around'  flexWrap='wrap'>
                    {items.map((item) => {
                        return <ProfileBox image={item.image} desc={item.description} />
                    })}
                </Flex>
            <Flex justify='start'>
                <Button as={reactLink} colorScheme='pink' to={`/profile/${category}`}>More</Button>
            </Flex>
        </Box>        
        </>

    )
}

export default ProfileCategory;