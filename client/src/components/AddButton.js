import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Icon, Button, useMediaQuery } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

function AddButton() {

    const [under768] = useMediaQuery('(max-width: 768px)');

    return (
        <Link to={`/addItem`}>
            <Flex display={under768 ? 'flex' : 'none'} boxShadow="md" colorScheme='pink' as={Button} justify='center' align='center' position='fixed' bottom='50px' right='50px' boxSize={12} borderRadius='full'>
                <Icon boxSize={8} as={FaPlus} />
            </Flex>
        </Link>
        
    )
}

export default AddButton;