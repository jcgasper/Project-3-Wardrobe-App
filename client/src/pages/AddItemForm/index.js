import React from "react";
import { VStack, Heading, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import Auth from '../../utils/auth';
import { Redirect } from 'react-router-dom';
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
  const [submitArticle, { loading: submittedArticleLoading }] = useMutation(ADD_ARTICLE, { onCompleted: () => { return <Redirect to="/" /> } });
  const toast = useToast();

  // TODO fix authentication
  if (!Auth.loggedIn()) {
    // return <Redirect to="/" />;
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formState.imageUploaded || !formState.description.trim()) {
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
        ...formState
      }
    });
  };

  return (
    <VStack padding={4} spacing={6} align="stretch" mb={10}>
      <Heading>Add Item to Your Wardrobe</Heading>

      <CategoryControl setFormState={setFormState} formState={formState} />

      <ImageUploadControls setFormState={setFormState} formState={formState} />

      <DescriptionControl setFormState={setFormState} formState={formState} />

      <TagForm formState={formState} setFormState={setFormState} />

      <Button my={8} onClick={handleSubmit} isLoading={submittedArticleLoading}>
        Register New Item
      </Button>
    </VStack>
  );
};

export default AddItemForm;
