import React from "react";
import { VStack, HStack, Heading, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import Auth from '../../utils/auth';
import { Redirect, Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_ARTICLE } from '../../utils/mutations';
import CategoryControl from './CategoryControl';
import DescriptionControl from './DescriptionControl';
import TagForm from './TagForm';
import ImageUploadControls from './ImageUploadControls';


const AddItemForm = () => {
  const [formState, setFormState] = useState(
    {
      description: "",
      category: "Top",
      tags: [],
      imageUploaded: false
    }
  );
  const [submitArticle, { loading }] = useMutation(ADD_ARTICLE, { onCompleted: () => { window.location.assign('/profile'); } });
  const toast = useToast();

  if (!Auth.loggedIn()) {
    return <Redirect to="/" />;
  }

  // if (called && !loading) {
  //   return <Redirect to="/profile" />;
  // }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!(formState.imageUploaded || formState.description.trim())) {
      toast({
        title: 'Cannot Add Item',
        description: "You need to upload an image or enter a description.",
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    submitArticle({
      variables: {
        category: formState.category,
        description: formState.description,
        tags: formState.tags
      }
    });
  };

  return (
    <VStack padding={4} spacing={6} align="stretch" mt={8} mb={10}>
      <Heading textColor='pink.500'>Add Item to Your Wardrobe</Heading>

      <CategoryControl setFormState={setFormState} formState={formState} />

      <ImageUploadControls setFormState={setFormState} formState={formState} />

      <DescriptionControl setFormState={setFormState} formState={formState} />

      <TagForm formState={formState} setFormState={setFormState} />

      <HStack spacing={4}>
        <Button
          my={8}
          colorScheme='pink'
          borderRadius={0}
          onClick={handleSubmit}
          isLoading={loading}
        >
          Register New Item
        </Button>
        <Button
          as={Link}
          to="/profile"
          variant='link'
          colorScheme='pink'
        >
          Go Back
        </Button>
      </HStack>
    </VStack>
  );
};

export default AddItemForm;
