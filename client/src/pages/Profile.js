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
                    id: 1,
                    image: 'https://via.placeholder.com/160x256',
                    description: 't-shirt'
                },
                {
                    id: 2,
                    image: 'https://via.placeholder.com/160x256',
                    description: 'tank top'
                },
                {
                    id: 3,
                    image: 'https://via.placeholder.com/160x256',
                    description: 'dress shirt'
                },
                {
                    id: 4,
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
                    id: 5,
                    image: 'https://via.placeholder.com/160x256',
                    description: 'jeans'
                },
                {
                    id: 6,
                    image: 'https://via.placeholder.com/160x256',
                    description: 'slacks'
                },
                {
                    id: 7,
                    image: 'https://via.placeholder.com/160x256',
                    description: 'cargo shorts'
                },
                {
                    id: 8,
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
        <VStack spacing={5} p={4} divider={<StackDivider borderColor='gray.300' />}>
            {categories.map((category) => {
                return (
                    <ProfileCategory category={category.name} items={category.items} key={category.id} />
                )
            })}
        </VStack>
        <AddButton />
        </>
    );
};

export default Profile;