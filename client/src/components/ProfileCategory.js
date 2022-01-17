import React from 'react';
import { Box, Heading, Flex, Button } from '@chakra-ui/react';
import ProfileBox from './ProfileBox';

function ProfileCategory({category, items, setCurrCategory}) {

    //category = category.substring(0,1).toUpperCase() + category.substring(1);

    items = items.filter((item, index) => index < 4);

    const goToFull = () => {
        setCurrCategory(category);
    }

    return (
        <>
        <Box width='full' py={4} >
            <Heading textColor='pink.500' as="h2" size="xl">{category}</Heading>
            <Flex justify='start' align='start' minW='full' gap='38px' flexWrap='wrap' marginTop={8}>
                {items.map((item) => {
                    return <ProfileBox image={item.imageFile} desc={item.description} id={item._id} key={item._id} />
                })}
            </Flex>
            <Flex justify='start' marginTop={8}>
                <Button borderRadius='0' colorScheme='pink' onClick={goToFull}>More</Button>
            </Flex>
        </Box>        
        </>

    )
}

export default ProfileCategory;