import React from "react";
import { 
    Box, 
    Text, 
    Image, 
    Flex,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button, 
    Icon } from '@chakra-ui/react';
import { FaEllipsisH, FaEdit, FaTrashAlt } from 'react-icons/fa';
import placeholder from '../images/no_image_uploaded.png';

function ProfileBox({image, desc}) {

    //if no image is passed as prop or if image url is empty use placeholder instead
    const articleImage = (image || image !== '' ) ? image : placeholder;

    return (
        <Box m={4} p={0} bg='#F8F9F1' borderRadius='md' boxShadow="base">
            <Image src={articleImage} w='160px' h='256px' borderTopRadius='md' />
            <Flex justify='space-between' p={2}>
                <Text textColor='#000022'>{desc}</Text>
                <Menu closeOnBlur>
                    <MenuButton as={Button} size='xs' colorScheme='pink'>
                        <Icon as={FaEllipsisH} boxSize={5} />
                    </MenuButton>
                    <MenuList>
                        {/* will link to respective pages */}
                        <MenuItem icon={<Icon as={FaEdit} />}>Edit</MenuItem> 
                        <MenuItem icon={<Icon as={FaTrashAlt} />}>Delete </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Box>
    )
}

export default ProfileBox;