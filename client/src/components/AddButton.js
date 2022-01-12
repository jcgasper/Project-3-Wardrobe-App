import React from "react";
import { Flex, Icon, Button } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';

function AddButton() {

    return (
        <Flex colorScheme='pink' as={Button} justify='center' align='center' position='fixed' bottom='50px' right='50px' boxSize={12} borderRadius='full'>
            <Icon boxSize={8} as={FaPlus} />
        </Flex>
    )
}

export default AddButton;