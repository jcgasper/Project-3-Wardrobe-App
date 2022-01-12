import React from 'react';
import { Heading, Container, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import ProfileBox from '../components/ProfileBox';
import AddButton from '../components/AddButton';

function FullCategory() {

    const { category } = useParams();

    const categories = [
        {
            name: 'Tops',
            id: 1,
            items: [
                {
                    image: '',
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
        }];

    return (
        <>
            <Container maxW="container.lg">
                <Heading>{category}</Heading>
                <Flex justify='space-around' flexWrap='wrap' bg="red.50" my={4} boxShadow="base" borderRadius='md'>
                    {categories[0].items.map((item) => {
                        return <ProfileBox image={item.image} desc={item.description} />
                    })}
                </Flex>
            </Container>
            <AddButton />
        </>
    )
}

export default FullCategory;