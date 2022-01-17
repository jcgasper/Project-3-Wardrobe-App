import React from 'react';
import { Heading, Flex, Text, Box } from '@chakra-ui/react';
import ProfileBox from '../components/ProfileBox';
import AddButton from '../components/AddButton';

function FullCategory({category, items, setCurrCategory}) {

    const goBack = () => {
        setCurrCategory(null);
    }

    //if no items, say they don't have any articles in there
    if(!items.length) {
        return <Heading mt={10}>You haven't added any {category.toLowerCase()}</Heading>
    }

    return (
        <Box minW='full'>
            
            <Heading as='h1' textColor='pink.500' marginTop={8}>Your {category}</Heading>
            <Text onClick={goBack} cursor='pointer'>&#8592;  Back to Profile</Text>
            <Flex justify='start' flexWrap='wrap' gap={6} my={4}>
                {items.map((item) => {
                    return <ProfileBox image={item.imageFile} desc={item.description} id={item._id} key={item._id} />
                })}
            </Flex>
            <Text onClick={goBack} cursor='pointer'>&#8592;  Back to Profile</Text>
            <AddButton />
        </Box>
    )
}

export default FullCategory;