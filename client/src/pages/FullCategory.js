import React from 'react';
import { Heading, Container, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import ProfileBox from '../components/ProfileBox';
import AddButton from '../components/AddButton';
import { useClothingContext } from '../utils/clothingContext';

function FullCategory() {
    //get category from URL
    const { category } = useParams();
    //get current context
    const { userClothing, addClothing } = useClothingContext();

    //TODO: if context hasn't been set - query database

    //get index in context of current category
    const index = userClothing.map(el => el.type).indexOf(category.toLowerCase());
    //populate currCategory with correct items
    const currCategory = userClothing[index];
    //if no items, say they don't have any articles in there
    if(!currCategory) {
        return <Heading mt={10}>You haven't added any {category.toLowerCase()}</Heading>
    }

    return (
        <>
        <Heading as='h1' textColor='pink.500' marginTop={8}>Your {category}</Heading>
        <Flex justify='space-around' flexWrap='wrap' my={4}>
            {currCategory.items.map((item) => {
                return <ProfileBox image={item.image} desc={item.description} key={item.id} />
            })}
        </Flex>
        <AddButton />
        </>
    )
}

export default FullCategory;