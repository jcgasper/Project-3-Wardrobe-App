import React from 'react';
import { VStack, Container } from '@chakra-ui/react';
import ProfileCategory from '../components/ProfileCategory';

function Profile() {

    const categories = [
        {
            name: 'Tops',
            id: 1,
            items: [
                {
                    image: 'https://via.placeholder.com/150x250',
                    description: 't-shirt'
                },
                {
                    image: 'https://via.placeholder.com/150x250',
                    description: 'tank top'
                },
                {
                    image: 'https://via.placeholder.com/150x250',
                    description: 'dress shirt'
                },
                {
                    image: 'https://via.placeholder.com/150x250',
                    description: 'sweater'
                },
            ]
        },
        {
            name: 'Bottoms',
            id: 2,
            items: [
                {
                    image: 'https://via.placeholder.com/150x250',
                    description: 'jeans'
                },
                {
                    image: 'https://via.placeholder.com/150x250',
                    description: 'slacks'
                },
                {
                    image: 'https://via.placeholder.com/150x250',
                    description: 'cargo shorts'
                },
                {
                    image: 'https://via.placeholder.com/150x250',
                    description: 'sweatpants'
                },
            ]
        },
        {
            name: 'Outerwear',
            id: 3,
            items: [
                {
                    image: 'https://via.placeholder.com/150x250',
                    description: 'jacket'
                },
                {
                    image: 'https://via.placeholder.com/150x250',
                    description: 'coat'
                },
                {
                    image: 'https://via.placeholder.com/150x250',
                    description: 'vest'
                },
                {
                    image: 'https://via.placeholder.com/150x250',
                    description: 'hoodie'
                },
            ]
        },
    ];

    return (
        <>
            <Container maxW="container.lg">
                <VStack spacing={5} p={4}>
                    {categories.map((category) => {
                        return (
                            <ProfileCategory category={category.name} items={category.items} key={category.id} />
                        )
                    })}
                </VStack>
            </Container>
        </>
    );
};

export default Profile;