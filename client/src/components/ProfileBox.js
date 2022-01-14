import React, { useState, useRef } from "react";
import { 
    Box, 
    Text, 
    Image, 
    Flex,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay, 
    IconButton } from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';
import placeholder from '../images/no_image_uploaded.png';

function ProfileBox({image, desc, id}) {

    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => {
        setIsOpen(false)
    }

    const handleDelete = (id) => {
        onClose();
        console.log(id);
    }

    const cancelRef = useRef()

    //if no image is passed as prop or if image url is empty use placeholder instead
    const articleImage = (image || image !== '' ) ? image : placeholder;

    return (
        <>
        <Box m={4} p={0} bg='pink.50' borderRadius='md' boxShadow="md" borderTop="1px" borderLeft="1px" borderColor="gray.200">
            <Image src={articleImage} w='160px' h='256px' borderTopRadius='md' />
            <Flex justify='space-between' align='center' p={2}>
                <Text textColor='#000022'>{(desc) ? `${desc}` : ' '}</Text>
                <IconButton size='sm' icon={<FaTrashAlt />} aria-label='delete item' colorScheme='pink' onClick={() => setIsOpen(true)} />
            </Flex>
        </Box>
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Article of Clothing
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete {(desc) ? `your ${desc}?` : `this item?`}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={() => handleDelete(id)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
        </>
        
    )
}

export default ProfileBox;