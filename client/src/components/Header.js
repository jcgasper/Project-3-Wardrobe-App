import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Heading, VStack } from '@chakra-ui/react';

function Header() {
    return (
        <VStack spacing={5}>
            <ReactLink to={`/`}>
                <Heading fontFamily='Pacifico' textAlign='center' fontSize='64px' textColor='pink.500'>MyStyle</Heading>
            </ReactLink>
        </VStack>
    )
}

export default Header;