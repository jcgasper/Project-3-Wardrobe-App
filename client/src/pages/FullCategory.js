import React from 'react';
import { Heading, Container, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import ProfileBox from '../components/ProfileBox';
import AddButton from '../components/AddButton';
import { useClothingContext } from '../utils/clothingContext';

function FullCategory({category, items}) {
    
    //get current context
    const { userClothing, addClothing } = useClothingContext();

    //if no items, say they don't have any articles in there
    if(!items.length) {
        return <Heading mt={10}>You haven't added any {category.toLowerCase()}</Heading>
    }

    return (
        <>
        <Heading as='h1' textColor='pink.500' marginTop={8}>Your {category}</Heading>
        <Flex justify='space-around' flexWrap='wrap' my={4}>
            {items.map((item) => {
                return <ProfileBox image={item.imageFile} desc={item.description} key={item._id} />
            })}
        </Flex>
        <AddButton />
        </>
    )
}

export default FullCategory;