import React, { useEffect } from 'react';
import { VStack, StackDivider, Text, Heading } from '@chakra-ui/react';
import ProfileCategory from '../components/ProfileCategory';
import AddButton from '../components/AddButton';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { useClothingContext } from '../utils/clothingContext';

function Profile() {

    const { userClothing, addClothing } = useClothingContext();

    const { loading, error, data } = useQuery(GET_ME);

    const categories = [
        {
            id: 1,
            category: 'top',
            image: 'https://via.placeholder.com/160x256',
            description: 't-shirt'
        },
        {
            id: 2,
            category: 'top',
            image: 'https://via.placeholder.com/160x256',
            description: 'tank top'
        },
        {
            id: 3,
            category: 'top',
            image: 'https://via.placeholder.com/160x256',
            description: 'dress shirt'
        },
        {
            id: 4,
            category: 'top',
            image: 'https://via.placeholder.com/160x256',
            description: 'sweater'
        },
        {
            id: 5,
            category: 'bottom',
            image: 'https://via.placeholder.com/160x256',
            description: 'jeans'
        },
        {
            id: 6,
            category: 'bottom',
            image: 'https://via.placeholder.com/160x256',
            description: 'slacks'
        },
        {
            id: 7,
            category: 'bottom',
            image: 'https://via.placeholder.com/160x256',
            description: 'cargo shorts'
        },
        {
            id: 8,
            category: 'bottom',
            image: 'https://via.placeholder.com/160x256',
            description: 'sweatpants'
        },
    ]

    useEffect(() => {
        if(!data) {
            addClothing(categories);
        } else {
            addClothing(data.clothing);
        }
    }, [data]);

    if(loading) {
        return <Heading mt={10}>Searching Narnia...</Heading>
    }

    /* if(error) {
        return <Heading mt={10}>You aren't logged in!</Heading>
    } */

    /* if(!data.clothing) {
        return <Heading pt={4}>You haven't added any clothing yet...</Heading>
    } */

    return (
        <>
        <VStack spacing={5} p={4} divider={<StackDivider borderColor='gray.300' />}>
            
            {userClothing.map((category) => {
                if(category.items.length) {
                    return (
                        <ProfileCategory category={category.category} items={category.items} key={category.id} />
                    )
                }
            })}
        </VStack>
        <AddButton />
        </>
    );
};

export default Profile;