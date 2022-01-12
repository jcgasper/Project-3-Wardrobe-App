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
        <Box m={4} p={0}>
            <Image src={articleImage} w='160px' h='256px' />
            <Flex justify='space-between' py={2}>
                <Text>{desc}</Text>
                <Menu>
                    <MenuButton as={Button} size='sm' colorScheme='pink'>
                        <Icon as={FaEllipsisH} />
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