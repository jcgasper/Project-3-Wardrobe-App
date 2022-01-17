import React, { useState, useRef } from "react";
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useMutation } from "@apollo/client";
import { REMOVE_ARTICLE } from '../../../utils/mutations';
import { GET_BY_CATEGORY } from '../../../utils/queries';

function DeleteButton({ article }) {
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
      variables: { articleId: article._id }
    }).then(() => {
      onClose();
      window.location.assign('/profile');
    })
  }

  const cancelRef = useRef()


  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Delete Item
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Article of Clothing
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete {(article.description) ? `your ${article.description}?` : `this item?`}
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

export default DeleteButton;