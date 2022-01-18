import React, { useState, useRef, useEffect } from "react";
import { Link as ReactLink } from 'react-router-dom';
import { 
    Box, 
    Text, 
    Image, 
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay, 
    IconButton,
    Grid,
    GridItem } from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';
import { useMutation } from "@apollo/client";
import { getDownloadURLForImageFile } from '../utils/imageUploads';
import { REMOVE_ARTICLE } from '../utils/mutations';
import { GET_BY_CATEGORY } from '../utils/queries';

function ProfileBox({image, desc, id}) {
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => {
        setIsOpen(false)
    }

    const [removeArticle] = useMutation(REMOVE_ARTICLE, {
      refetchQueries: [
        GET_BY_CATEGORY
      ]
    });

    const handleDelete = (e) => {
        e.preventDefault();
        removeArticle({
          variables: {articleId: id}
        })
        onClose();
    }

    const cancelRef = useRef()
    
    const [imageURL, setImageURL] = useState('');
    useEffect(() => { getDownloadURLForImageFile(image).then(setImageURL) }, [image]);

    return (
        <>
        <Box p={0} bg='pink.50' boxShadow="md" borderTop="1px" borderLeft="1px" borderColor="gray.200" maxW='210px'>
          
          <ReactLink to={`/viewItem/${id}`}>
            <Image src={imageURL} fallbackSrc='https://via.placeholder.com/210x280?text=Loading...' w='210px' h='280px' fit='cover' alt={desc} />
          </ReactLink>
          
          <Grid templateColumns='1fr minMax(150px, 1fr)' pr={2} gap={2} maxW='160px'>
            <GridItem>
              <IconButton borderRadius='0' size='sm' icon={<FaTrashAlt />} aria-label='delete item' colorScheme='pink' onClick={() => setIsOpen(true)} />
            </GridItem>
            
            <GridItem display=''>
              <Text lineHeight='2em' noOfLines={1} as={ReactLink} to={`/viewItem/${id}`} overflow='clip' textColor='#000022'>{(desc) ? `${desc}` : ' '}</Text>
            </GridItem>
              
          </Grid>
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
              <Button borderRadius='0' ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button borderRadius='0' bg='red.400' onClick={handleDelete} ml={3}>
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