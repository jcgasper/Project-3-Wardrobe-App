import React from 'react';
import { VStack, Container, StackDivider } from '@chakra-ui/react';
import ProfileCategory from '../components/ProfileCategory';
import AddButton from '../components/AddButton';
import { FaPlus } from 'react-icons/fa';

function Profile() {

    const categories = [
        {
            name: 'Tops',
            id: 1,
            items: [
                {
                    image: 'https://via.placeholder.com/160x256',
                    description: 't-shirt'
                },
                {
                    image: 'https://via.placeholder.com/160x256',
                    description: 'tank top'
                },
                {
                    image: 'https://via.placeholder.com/160x256',
                    description: 'dress shirt'
                },
                {
                    image: 'https://via.placeholder.com/160x256',
                    description: 'sweater'
                },
            ]
        },
        {
            name: 'Bottoms',
            id: 2,
            items: [
                {
                    image: 'https://via.placeholder.com/160x256',
                    description: 'jeans'
                },
                {
                    image: 'https://via.placeholder.com/160x256',
                    description: 'slacks'
                },
                {
                    image: 'https://via.placeholder.com/160x256',
                    description: 'cargo shorts'
                },
                {
                    image: 'https://via.placeholder.com/160x256',
                    description: 'sweatpants'
                },
            ]
        },
        {
            name: 'Outerwear',
            id: 3,
            items: [
                {
                    image: '',
                    description: 'jacket'
                },
                {
                    image: 'https://via.placeholder.com/160x256',
                    description: 'coat'
                },
                {
                    image: 'https://via.placeholder.com/160x256',
                    description: 'vest'
                },
                {
                    image: 'https://via.placeholder.com/160x256',
                    description: 'hoodie'
                },
            ]
        },
    ];

    return (
        <>
            <Container maxW="container.lg" position='relative'>
                <VStack spacing={5} p={4} divider={<StackDivider borderColor='gray.300' />}>
                    {categories.map((category) => {
                        return (
                            <ProfileCategory category={category.name} items={category.items} key={category.id} />
                        )
                    })}
                </VStack>
                <AddButton />
            </Container>
        </>
    );
};

export default Profile;